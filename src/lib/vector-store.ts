/**
 * Vector store for AIfa's semantic memory (RAG) — Neon Postgres + pgvector.
 *
 * This is a SEARCH INDEX, not the source of truth. The durable store remains
 * the Arweave storage. Everything here can be rebuilt.
 *
 * Storage: halfvec(1536) (2 bytes/dim) + HNSW cosine index.
 *
 * Connection: @neondatabase/serverless HTTP driver.
 * Uses DATABASE_URL_VECTOR or VECTOR_DATABASE_URL.
 *
 * ── ВНИМАНИЕ, ОСОБЕННОСТЬ ИМЕННО ЭТОГО САЙТА ────────────────────────────────
 * На radiocode.space имя `chat_memory` носят ДВЕ РАЗНЫЕ таблицы в РАЗНЫХ базах:
 *   • в базе кабинета (SUBMISSIONS_DB_URL) — `chat_memory(email, chat_type,
 *     ciphertext)`, личный архив человека под его собственным ключом;
 *   • в базе памяти (DATABASE_URL_VECTOR) — `chat_memory(user_key, embedding,
 *     msg_ts, …)`, общий на все сайты поисковый индекс, вот этот файл.
 * Тот же факт уже записан в `heir.ts`: «База памяти — ОТДЕЛЬНАЯ база».
 * Ниже стоит защита от того, чтобы эти две базы совпали: `ensureSchema()`
 * выполняет ALTER и CREATE INDEX, и на базе кабинета это правило испортило бы
 * живую таблицу с перепиской людей.
 */

import { sanitizeEmail } from './chat-logger';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { EMBED_DIM } from './embeddings';
import crypto from 'crypto';
import { encryptText, decryptText } from './encryption';

const VECTOR_DB_URL = process.env.DATABASE_URL_VECTOR || process.env.VECTOR_DATABASE_URL || '';

/**
 * Совпала ли база памяти с базой кабинета.
 *
 * Проверка добавлена ИМЕННО здесь и нигде больше: на остальных сайтах таблицы
 * `chat_memory` в базе кабинета нет, а тут есть. Если однажды в
 * DATABASE_URL_VECTOR по ошибке окажется строка подключения кабинета,
 * `ensureSchema()` добавит живой таблице чужой столбец и упадёт на построении
 * индекса по несуществующему `embedding`. Лучше громко отказаться от памяти,
 * чем молча тронуть переписку людей.
 */
function базыСовпали(): boolean {
  if (!VECTOR_DB_URL) return false;
  const кабинет = [process.env.SUBMISSIONS_DB_URL, process.env.DATABASE_URL].filter(Boolean) as string[];
  return кабинет.some((u) => u.trim() === VECTOR_DB_URL.trim());
}

export function isVectorStoreConfigured(): boolean {
  if (!/^postgres(ql)?:\/\//.test(VECTOR_DB_URL)) return false;
  if (базыСовпали()) {
    console.error(
      '[VectorStore] DATABASE_URL_VECTOR совпадает с базой кабинета — семантическая ' +
      'память ОТКЛЮЧЕНА. В базе кабинета таблица chat_memory это личный архив ' +
      '(email, chat_type, ciphertext), а не поисковый индекс; работа по ней испортила бы ' +
      'переписку людей. Заведите отдельную базу памяти.'
    );
    return false;
  }
  return true;
}

function hashUserKey(key: string): string {
  if (key === '__brain__') return key;
  return crypto.createHash('sha256').update(key).digest('hex');
}

let _sql: NeonQueryFunction<false, false> | null = null;
function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (!isVectorStoreConfigured()) {
      throw new Error('[VectorStore] DATABASE_URL_VECTOR is not configured');
    }
    _sql = neon(VECTOR_DB_URL);
  }
  return _sql;
}

/** pgvector literal: "[a,b,c]" (cast to ::halfvec at the call site). */
function toVectorLiteral(v: number[]): string {
  return `[${v.join(',')}]`;
}

let schemaReady = false;

/** Creates the extension, table and indexes. Idempotent; runs once per cold start. */
export async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  const sql = getSql();
  await sql`CREATE EXTENSION IF NOT EXISTS vector`;
  await sql.query(
    `CREATE TABLE IF NOT EXISTS chat_memory (
      id           bigserial PRIMARY KEY,
      user_key     text NOT NULL,
      chat_type    text NOT NULL,
      role         text NOT NULL,
      speaker      text,
      content      text NOT NULL,
      content_hash text NOT NULL,
      msg_ts       timestamptz,
      embedding    halfvec(${EMBED_DIM}) NOT NULL,
      source       text NOT NULL DEFAULT '',
      created_at   timestamptz DEFAULT now(),
      UNIQUE (user_key, content_hash)
    )`
  );
  // Additive migration for tables created before the cross-site `source` tag.
  await sql`ALTER TABLE chat_memory ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT ''`;
  await sql`CREATE INDEX IF NOT EXISTS chat_memory_embedding_idx
            ON chat_memory USING hnsw (embedding halfvec_cosine_ops)`;
  await sql`CREATE INDEX IF NOT EXISTS chat_memory_user_idx
            ON chat_memory (user_key, chat_type)`;
  // Recency lookups ("what did we say last / on site X") use this.
  await sql`CREATE INDEX IF NOT EXISTS chat_memory_recent_idx
            ON chat_memory (user_key, msg_ts DESC)`;

  schemaReady = true;
}

export interface MemoryRow {
  userKey: string;
  chatType: string;
  role: string;
  speaker?: string | null;
  content: string;
  contentHash: string;
  msgTs?: string | null;
  embedding: number[];
  /** Origin site (e.g. "radiocode.space") so memories can be attributed across sites. */
  source?: string | null;
}

/** Inserts memory rows, skipping any (user_key, content_hash) already present. */
export async function upsertMemory(rows: MemoryRow[]): Promise<number> {
  if (rows.length === 0) return 0;
  await ensureSchema();
  const sql = getSql();
  let inserted = 0;
  for (const r of rows) {
    const hashedKey = hashUserKey(r.userKey);
    // 🔴 В БАЗЕ ПЕРЕПИСКА ЛЕЖИТ ОТКРЫТЫМ ТЕКСТОМ. Решение Архитектора 08.08.2026.
    //
    // 27.08.2026: это решение было применено ТОЛЬКО на центральном сайте, а
    // здесь строка продолжала шифровать. Правило Четырёх Сайтов (раздел 9
    // Конституции) нарушалось полгода, и нарушение было не бумажным:
    //
    //   * запись, сделанная через этот сайт, шифровалась ЕГО ключом;
    //   * у сайтов ключи выводятся по-разному (у aifa.works есть
    //     ARWEAVE_ENCRYPTION_SECRET, у центрального его нет и ключ берётся
    //     как sha256(ARWEAVE_WALLET_KEY));
    //   * поэтому центральный сайт не мог прочитать то, что записал этот, —
    //     а раздел 34 требует одной памяти на все четыре двери кабинета.
    //
    // Так и вышло: записи #535424 и #535425 (источник aifa.works) не читались
    // сторожем памяти и открылись только секретом aifa.works.
    //
    // ПОЧЕМУ ОТКРЫТЫЙ ТЕКСТ ПРАВИЛЬНЕЕ. Шифрование здесь защищало ровно от
    // одного случая: доступ к базе без доступа к приложению. А ключ живёт в
    // переменных того же приложения. Защита узкая, цена несоразмерная:
    // 25.07.2026 из кода убрали запасной ключ, и 227 реплик из 665 стали
    // нечитаемы — снаружи это выглядело как «AIfa не помнит начало разговоров».
    //
    // ГДЕ ШИФРОВАНИЕ ОСТАЁТСЯ: при заливке в Arweave. Там сеть публичная и
    // вечная, и шифрование защищает от всего мира, а не от узкого случая.
    //
    // Чтение по-прежнему понимает оба вида: старые зашифрованные записи
    // расшифровываются на лету.
    const res = await sql`
      INSERT INTO chat_memory
        (user_key, chat_type, role, speaker, content, content_hash, msg_ts, source, embedding)
      VALUES
        (${hashedKey}, ${r.chatType}, ${r.role}, ${r.speaker ?? null}, ${r.content},
         ${r.contentHash}, ${r.msgTs ?? null}, ${r.source ?? ''}, ${toVectorLiteral(r.embedding)}::halfvec)
      ON CONFLICT (user_key, content_hash) DO NOTHING
      RETURNING id`;
    inserted += res.length;
  }
  return inserted;
}

export interface MemoryHit {
  content: string;
  role: string;
  speaker: string | null;
  chat_type: string;
  msg_ts: string | null;
  source?: string | null;
  score: number;
}

/**
 * Returns the top-k most semantically similar stored messages for a user,
 * ordered by cosine similarity (highest first). Uses the HNSW index.
 */
export async function searchMemory(
  userKey: string,
  queryEmbedding: number[],
  k = 8,
  chatType?: string
): Promise<MemoryHit[]> {
  await ensureSchema();
  const sql = getSql();
  const vec = `${toVectorLiteral(queryEmbedding)}`;
  const hashedKey = hashUserKey(userKey);
  /**
   * 🔴 СМЫСЛОВОЙ ПОИСК ИДЁТ ПО ВСЕЙ ПАМЯТИ, А НЕ ПО ОДНОМУ КАНАЛУ.
   *
   * Здесь стояла развилка: при заданном `chatType` поиск ограничивался этим
   * каналом. То есть на вопрос «о чём мы говорили» в Терминале не находилось
   * ничего из главного чата, хотя разговор лежит в той же таблице.
   *
   * Конституция, раздел 34 пункт 9: память человека ОДНА, канал — метка
   * внутри одной последовательности, а не отдельная память. Канал приходит
   * в каждой найденной строке (`chat_type`), поэтому различать записи по
   * происхождению по-прежнему можно — но искать надо по всему.
   */
  void chatType; // канал больше не сужает поиск — см. разбор выше
  const rows = await sql`
        SELECT content, role, speaker, chat_type, msg_ts, source,
               1 - (embedding <=> ${vec}::halfvec) AS score
        FROM chat_memory
        WHERE user_key = ${hashedKey}
        ORDER BY embedding <=> ${vec}::halfvec
        LIMIT ${k}`;

  // Decrypt content at rest if not brain knowledge base
  for (const h of rows as MemoryHit[]) {
    if (userKey !== '__brain__' && h.content) {
      try {
        h.content = await decryptText(h.content);
      } catch (err) {
        // Fallback for legacy plaintext entries
      }
    }
  }

  return rows as MemoryHit[];
}

/**
 * Returns the most RECENT stored messages for a user (newest first), across all
 * sites. This complements semantic search: "quote our last conversation / what
 * did we say on aifa.works" is a recency+source query that similarity can't
 * answer. Content is decrypted; `source` lets the caller attribute each line.
 */
export async function recentMemory(userKey: string, limit = 12): Promise<MemoryHit[]> {
  await ensureSchema();
  const sql = getSql();
  const hashedKey = hashUserKey(userKey);
  const rows = (await sql`
    SELECT content, role, speaker, chat_type, msg_ts, source, 1 AS score
    FROM chat_memory
    WHERE user_key = ${hashedKey} AND msg_ts IS NOT NULL
    ORDER BY msg_ts DESC
    LIMIT ${limit}`) as MemoryHit[];

  for (const h of rows) {
    if (userKey !== '__brain__' && h.content) {
      try {
        h.content = await decryptText(h.content);
      } catch {
        /* legacy plaintext */
      }
    }
  }
  return rows;
}

/**
 * ВСЯ память человека, по времени, от первого сообщения до последнего.
 *
 * ЗАЧЕМ ЭТО ЕСТЬ. Смысловой поиск отвечает на вопрос «что похоже на этот
 * вопрос». Он не отвечает на вопрос «что вообще было» — а именно это значит
 * «помнить разговор». Пока вся память человека меньше порога, выбирать куски
 * не нужно: AIfa держит её ВСЮ и может свободно ходить по ней в любую сторону.
 * Смысловой поиск включается только тогда, когда человек наговорил больше
 * порога, — и тогда он уже честно работает по назначению.
 *
 * `пределЗнаков` — в ЗНАКАХ, а не в кусках: куски бывают от ста знаков до
 * четырнадцати тысяч, и считать их — значит не знать, сколько на самом деле
 * уйдёт в запрос. Возвращает null, если память в предел не помещается: тогда
 * вызывающий сам решает, чем её заменить (карта памяти + свежие + смысловой).
 *
 * 🔴 ЗАМЕР ДЛИНЫ ИДЁТ ПО ТОМУ, ЧТО ЛЕЖИТ В БАЗЕ. На этом сайте запись всё ещё
 * шифруется (см. upsertMemory выше), поэтому `length(content)` — это длина
 * ШИФРОТЕКСТА, а он длиннее открытого текста. Значит проверка строгая в
 * безопасную сторону: кто прошёл порог по шифротексту, тот тем более пройдёт
 * его по расшифрованному. Занизить объём эта мерка не может.
 */
export async function fullMemory(userKey: string, пределЗнаков: number): Promise<MemoryHit[] | null> {
  await ensureSchema();
  const sql = getSql();
  const hashedKey = hashUserKey(userKey);

  const мера = (await sql`
    SELECT COALESCE(SUM(length(content)), 0)::int AS знаков, COUNT(*)::int AS кусков
      FROM chat_memory WHERE user_key = ${hashedKey}`) as unknown as Array<{ знаков: number; кусков: number }>;
  const всего = Number(мера[0]?.знаков ?? 0);
  if (!всего || всего > пределЗнаков) return null;

  const rows = (await sql`
    SELECT content, role, speaker, chat_type, msg_ts, source, 1 AS score
    FROM chat_memory
    WHERE user_key = ${hashedKey}
    ORDER BY msg_ts ASC NULLS FIRST, id ASC`) as MemoryHit[];

  for (const h of rows) {
    if (userKey !== '__brain__' && h.content) {
      try { h.content = await decryptText(h.content); } catch { /* старые записи открытым текстом */ }
    }
  }
  return rows;
}

/**
 * КАРТА памяти: по одной строке на день — сколько было сказано и о чём примерно.
 *
 * Нужна ровно тогда, когда вся память в запрос не влезла. Без карты AIfa не
 * знает даже, ЧТО у неё есть: смысловой поиск покажет десяток похожих кусков, и
 * на вопрос «а помнишь, мы в июне говорили про...» она честно ответит «нет»,
 * хотя запись лежит рядом. С картой она видит очертания всей истории и может
 * сказать «да, 15 июня был длинный разговор про Терминал» — и попросить
 * уточнить, чтобы найти точнее.
 */
export async function memoryMap(userKey: string, днейМакс = 400): Promise<Array<{ день: string; кусков: number; каналы: string; начало: string }>> {
  await ensureSchema();
  const sql = getSql();
  const hashedKey = hashUserKey(userKey);
  const rows = (await sql`
    SELECT to_char(msg_ts, 'YYYY-MM-DD') AS день,
           COUNT(*)::int AS кусков,
           string_agg(DISTINCT chat_type, ', ') AS каналы,
           (ARRAY_AGG(content ORDER BY msg_ts ASC))[1] AS начало
      FROM chat_memory
     WHERE user_key = ${hashedKey} AND msg_ts IS NOT NULL
     GROUP BY 1 ORDER BY 1 ASC
     LIMIT ${днейМакс}`) as unknown as Array<{ день: string; кусков: number; каналы: string; начало: string }>;
  for (const r of rows) {
    if (userKey !== '__brain__' && r.начало) {
      try { r.начало = await decryptText(r.начало); } catch { /* старые записи */ }
    }
    r.начало = String(r.начало || '').replace(/\s+/g, ' ').slice(0, 110);
  }
  return rows;
}

/** Returns the set of content hashes already stored for a user (backfill dedup). */
export async function existingHashes(userKey: string): Promise<Set<string>> {
  await ensureSchema();
  const sql = getSql();
  const hashedKey = hashUserKey(userKey);
  const rows = await sql`SELECT content_hash FROM chat_memory WHERE user_key = ${hashedKey}`;
  return new Set((rows as Array<{ content_hash: string }>).map((r) => r.content_hash));
}

/** Count of stored memory rows for a user (0 when none / table missing). */
export async function countMemory(userKey: string): Promise<number> {
  if (!isVectorStoreConfigured()) return 0;
  try {
    await ensureSchema();
    const sql = getSql();
    const hashedKey = hashUserKey(userKey);
    const rows = await sql`SELECT count(*)::int AS n FROM chat_memory WHERE user_key = ${hashedKey}`;
    return (rows as Array<{ n: number }>)[0]?.n ?? 0;
  } catch {
    return 0;
  }
}

/**
 * Читает переписку человека из памяти — таблицы chat_memory.
 *
 * Появилась потому, что кабинет брал историю из файлов, а на Vercel файлы
 * лежат во временной папке: она стирается между запусками функции и при
 * каждом развёртывании. Реплики при этом исправно писались сюда, в базу —
 * то есть память была цела, а кабинет смотрел не туда и показывал пустоту.
 *
 * Берём хвост разговора, а не начало: человеку нужно то, на чём остановились.
 * Строки роли `document` пропускаем — это зеркало Мозга, файлы проекта, а не
 * сказанное в диалоге.
 */
export async function readTurnsFromMemory(
  userEmail: string,
  /**
   * 🔴 КАНАЛ БОЛЬШЕ НЕ РЕЖЕТ ПАМЯТЬ — он остаётся МЕТКОЙ, а не границей.
   *
   * Здесь стояло `AND chat_type = ${chatType}`: память читалась только того
   * канала, в котором человек пишет сейчас. Поговорил в главном чате, зашёл
   * в Семантический Терминал — и AIfa его там не помнит, хотя вся переписка
   * лежит в базе целиком.
   *
   * Замер 04.09.2026 на боевой базе: шесть человек из восьми имеющих память
   * говорят более чем в одном канале; у Архитектора 412 реплик в трёх
   * каналах (main, oracle, terminal), у самого активного — 463 в трёх.
   *
   * Конституция, раздел 34 пункт 9: «Айфа помнит весь диалог с пользователем,
   * не зависимо от того где он ей пишет… единой последовательной базой».
   */
  chatType?: string,
  limit = 400,
): Promise<Array<{ role: 'user' | 'assistant'; content: string; timestamp: string; chatType: string }>> {
  if (!userEmail || !isVectorStoreConfigured()) return [];
  void chatType; // канал не фильтрует — см. разбор выше
  const sql = getSql();
  // Ключ считается ровно так же, как при ЗАПИСИ: сначала почта приводится к
  // безопасному виду (собака и точки заменяются подчёркиванием), и только
  // потом хешируется. Сначала я взяла сырую почту — хеш выходил другой, и
  // запрос возвращал пусто при полной базе. Проверка на живых данных это
  // поймала; чтение исходника — нет.
  const key = hashUserKey(sanitizeEmail(userEmail));
  const rows = (await sql`
    SELECT role, content, chat_type, msg_ts, created_at
      FROM chat_memory
     WHERE user_key = ${key}
       AND role IN ('user','assistant')
     ORDER BY COALESCE(msg_ts, created_at) DESC
     LIMIT ${limit}`) as Array<Record<string, unknown>>;
  return rows
    .map((r) => ({
      role: (r.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: String(r.content || ''),
      timestamp: new Date(String(r.msg_ts || r.created_at)).toISOString(),
      chatType: String(r.chat_type || 'main'),
    }))
    .filter((m) => m.content)
    .reverse();
}
