import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { sanitizeEmail, parseChunkContent } from './chat-logger';
import { embedText, embedBatch, isEmbeddingConfigured } from './embeddings';
import {
  isVectorStoreConfigured,
  upsertMemory,
  existingHashes,
  type MemoryRow,
} from './vector-store';

const CHAT_TYPES = ['main', 'terminal', 'oracle'] as const;
const MIN_CONTENT_LEN = 12;

/**
 * СЕКРЕТЫ НЕ ПОПАДАЮТ В ПОИСКОВЫЙ ИНДЕКС (16.08.2026).
 *
 * ЗАЧЕМ. База знаний Мозга подмешивается в разговор ЛЮБОМУ посетителю, без
 * входа: смысловой поиск идёт по общему ключу `__brain__`. Замер 16.08.2026
 * нашёл в индексе 185 записей с настоящими ключами — строки подключения с
 * паролем, тела приватных ключей, токены GitHub, Slack, Telegram, Google, xAI.
 * Их не нужно было даже выманивать: достаточно задать вопрос так, чтобы поиск
 * вытащил кусок, и модель увидела бы его у себя в наставлении.
 *
 * Записи удалены, а этот сторож не даёт им вернуться при следующей индексации.
 * Пропускаем ВЕСЬ кусок целиком: вырезать ключ из середины ненадёжно, а потеря
 * одного куска знаний дешевле утечки.
 */
const СЕКРЕТЫ: RegExp[] = [
  /ghp_[A-Za-z0-9]{20,}/,                      // токен GitHub
  /github_pat_[A-Za-z0-9_]{20,}/,
  /AIza[A-Za-z0-9_-]{20,}/,                    // ключ Google
  /xai-[A-Za-z0-9]{15,}/,                      // ключ xAI
  /sk-[A-Za-z0-9_-]{20,}/,                     // ключ OpenAI/Anthropic (в т.ч. sk-proj-, sk-ant-)
  /postgres(ql)?:\/\/[^\s]+:[^@\s]+@/,        // строка подключения с паролем
  /npg_[A-Za-z0-9]{15,}/,                      // пароль Neon
  /MII[A-Za-z0-9+/]{40,}/,                     // тело приватного ключа
  /BEGIN [A-Z ]*PRIVATE KEY/,                  // заголовок PEM
  /xox[bpsa]-[A-Za-z0-9-]{20,}/,               // токен Slack
  /AKIA[A-Z0-9]{12,}/,                         // ключ AWS
  /\b[0-9]{8,12}:[A-Za-z0-9_-]{25,}\b/,        // токен Telegram
  /gsk_[A-Za-z0-9]{20,}/,                      // ключ Groq
  /hf_[A-Za-z0-9]{30,}/,                       // ключ HuggingFace
  /r8_[A-Za-z0-9]{20,}/,                       // ключ Replicate
  /(sk|rk)_(live|test)_[A-Za-z0-9]{20,}/,      // ключ Stripe
  /vcp_[A-Za-z0-9]{20,}/,                      // токен Vercel
  /moltbook_sk_[A-Za-z0-9]{15,}/,              // ключ Moltbook
  /(mysql|mongodb(\+srv)?|redis|amqps?):\/\/[^\s]+:[^@\s]+@/, // прочие строки подключения с паролем
  /BEGIN (OPENSSH|PGP) PRIVATE KEY/,
  /"kty"\s*:\s*"RSA"[\s\S]{0,400}"d"\s*:/,
  /WALLET_ENCRYPTED_MASTER_KEY|MASTER_KEY_BACKUP/, // бэкап мастер-ключа: шифр, но в общий поиск ему незачем     // тело кошелька Arweave
  // Старый запасной ключ шифрования: строка человекочитаемая, энтропия низкая,
  // ни одна общая проверка её не поймает — только по имени. Им до 27.07.2026
  // шифровалась память людей, поэтому в общий поиск он не идёт.
  /CODE-Eternal-Secret-Key-2026/,
  // Ключ, набранный группами через дефис (так выглядят ключи NOWPayments и
  // многих платёжных шлюзов). Ни одна приставка его не ловит.
  /\b[A-Z0-9]{6,8}-[A-Z0-9]{6,8}-[A-Z0-9]{6,8}-[A-Z0-9]{6,8}\b/,
  // Имя с шестнадцатеричным хвостом — так выглядели секрет вебхука Telegram
  // (`aifa_webhook_7f3a9c2b1e5d`) и подобные ему.
  /\b[a-z][a-z0-9]*_[a-z0-9]+_[a-f0-9]{12,}\b/,
];

/**
 * ВТОРОЙ СТОРОЖ — БЕЗ СПИСКА ПОСТАВЩИКОВ.
 *
 * Список приставок выше ловит только то, о чём уже подумали. 16.08.2026 это
 * подтвердил замер: перебор по 49 известным приставкам нашёл в индексе
 * 2 записи, а перебор по ПОВЕДЕНИЮ текста — ещё 140, среди них рабочие ключи
 * NOWPayments, секрет вебхука Telegram, токен Vercel, ключ Helius RPC и ключ
 * Moltbook. Ни один из них не начинается с приставки, которую кто-то заранее
 * внёс бы в список.
 *
 * Поэтому здесь ищем не приставку, а образ действия: рядом стоят слово про
 * ключ, знак присваивания и длинное значение, похожее на случайное. «Похоже на
 * случайное» проверяем энтропией Шеннона: у настоящего ключа она высокая, у
 * `token: process.env.X`, `password: undefined` и путей файлов — низкая.
 */
const ПРИСВОЕНИЕ_КЛЮЧА =
  /(api[_-]?key|apikey|secret|token|password|passwd|pwd|credential|private[_-]?key|access[_-]?key|пароль|токен|секрет)["']?\s*[=:]\s*["']?([A-Za-z0-9_/+.=-]{24,})/gi;

/**
 * ЗАПАСНОЕ ЗНАЧЕНИЕ В КОДЕ — ОТДЕЛЬНЫЙ СЛУЧАЙ.
 *
 * Ключ часто написан не как `KEY = "…"`, а как `process.env.KEY || "…"`. Тогда
 * сразу после знака равенства стоит безобидное `process.env.…`, проверка по
 * присваиванию отступает, а настоящее значение прячется за `||`. Именно так в
 * индексе остались 5 кусков с рабочим ключом NOWPayments.
 *
 * Замер 16.08.2026: без этого правила сторож задерживал 101 кусок из 107 с
 * настоящими ключами, с ним — все 107.
 */
const ЗАПАСНОЕ_ЗНАЧЕНИЕ = /\|\|\s*["']([A-Za-z0-9_/+.=-]{16,})["']/g;

const НЕ_КЛЮЧ = /^(process\.env|import\.meta|undefined|null|true|false|your[_-]|xxx|placeholder|REDACTED|\$\{|<|\.\.?\/|https?:)/i;
const ЗАГЛУШКА = /(REDACTED|EXAMPLE|PLACEHOLDER|YOUR_|CHANGEME|xxxxxx|\.\.\.)/i;

function энтропия(s: string): number {
  const ч: Record<string, number> = {};
  for (const c of s) ч[c] = (ч[c] || 0) + 1;
  let e = 0;
  for (const k in ч) { const p = ч[k] / s.length; e -= p * Math.log2(p); }
  return e;
}

/**
 * ТРЕТИЙ СТОРОЖ — СПИСКИ ЛОГИНОВ И ПАРОЛЕЙ.
 *
 * Первые два слоя ищут ключи служб. Но 16.08.2026 сплошной перебор индекса
 * нашёл кое-что хуже ключей: выгрузки личных учётных записей — адрес почты и
 * пароль в столбик, десятками. Ни одна приставка и ни одно слово «secret»
 * рядом с ними не стоят, поэтому оба прежних слоя проходили мимо.
 *
 * Признак списка, а не случайного совпадения: в одном куске ТРИ и более
 * адреса почты И ТРИ и более коротких строки, похожей на пароль. Одиночная
 * пара «почта + слово» встречается в обычном тексте постоянно, а таблица из
 * десятка строк — почти никогда.
 */
const ПОЧТА_В_ТЕКСТЕ = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const ПОХОЖЕ_НА_ПАРОЛЬ =
  /(?:^|[\s\t|,;])((?=[^\s]{7,24}(?:[\s\t|,;]|$))(?=[^\s]*[0-9])(?=[^\s]*[A-Za-z])[A-Za-z0-9!@#$%^&*_.+-]{7,24})(?=[\s\t|,;]|$)/gm;

function похожНаСписокУчёток(исходный: string): boolean {
  // Образец пароля построен на просмотрах вперёд, и на очень длинном тексте он
  // уходит в перебор с возвратами: проверка одного файла в 25 МБ не кончилась
  // и за полчаса. В индекс идут куски по ~1500 знаков, поэтому ограничение
  // ничего не меняет по существу, но делает функцию безопасной по построению —
  // никакой кусок не сможет подвесить индексацию.
  const текст = исходный.length > 20000 ? исходный.slice(0, 20000) : исходный;
  const почты = new Set(текст.match(ПОЧТА_В_ТЕКСТЕ) || []);
  if (почты.size < 3) return false;
  ПОХОЖЕ_НА_ПАРОЛЬ.lastIndex = 0;
  const пароли = new Set((текст.match(ПОХОЖЕ_НА_ПАРОЛЬ) || []).map((s) => s.trim()));
  return пароли.size >= 3;
}

/** true, если в тексте есть что-то похожее на настоящий ключ или пароль. */
export function похоженаСекрет(текст: string): boolean {
  if (СЕКРЕТЫ.some((о) => о.test(текст))) return true;
  if (похожНаСписокУчёток(текст)) return true;
  ПРИСВОЕНИЕ_КЛЮЧА.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ПРИСВОЕНИЕ_КЛЮЧА.exec(текст))) {
    const зн = m[2];
    if (НЕ_КЛЮЧ.test(зн) || ЗАГЛУШКА.test(зн)) continue;
    if (!/[0-9]/.test(зн) || !/[A-Za-z]/.test(зн)) continue;
    if (/^[a-f0-9]{40,}$/i.test(зн)) continue;      // хеш сборки, не секрет
    if (энтропия(зн) < 3.2) continue;
    return true;
  }
  ЗАПАСНОЕ_ЗНАЧЕНИЕ.lastIndex = 0;
  while ((m = ЗАПАСНОЕ_ЗНАЧЕНИЕ.exec(текст))) {
    const зн = m[1];
    if (НЕ_КЛЮЧ.test(зн) || ЗАГЛУШКА.test(зн)) continue;
    if (!/[0-9]/.test(зн) || !/[A-Za-z]/.test(зн)) continue;
    if (/^[a-f0-9]{40,}$/i.test(зн)) continue;
    if (энтропия(зн) < 3.2) continue;
    return true;
  }
  return false;
}


export function hashMessage(role: string, content: string): string {
  return crypto.createHash('sha256').update(`${role}\n${content}`).digest('hex');
}

export function memoryEnabled(): boolean {
  return isEmbeddingConfigured() && isVectorStoreConfigured();
}

function tsToIso(ts?: string): string | null {
  if (!ts) return null;
  const d = new Date(ts.replace(' ', 'T') + 'Z');
  return isNaN(d.getTime()) ? null : d.toISOString();
}

export interface IndexableMessage {
  role: string;
  content: string;
  speaker?: string | null;
  timestamp?: string;
}

/**
 * Which site this deployment is. Stamped onto every memory row so AIfa can tell
 * the three sites apart ("on aifa.works we said…"). Each site sets SITE_ID in its
 * Vercel env; defaults to this site. All sites share ONE vector DB + archive, so
 * this tag is what distinguishes their messages within the shared store.
 */
export function getSiteId(): string {
  return (
    process.env.SITE_ID ||
    process.env.NEXT_PUBLIC_SITE_ID ||
    'radiocode.space'
  );
}

export async function indexMessages(
  userEmail: string,
  chatType: string,
  messages: IndexableMessage[],
  source: string = getSiteId()
): Promise<number> {
  if (!userEmail || !memoryEnabled() || messages.length === 0) return 0;
  try {
    const userKey = sanitizeEmail(userEmail);
    const rows: MemoryRow[] = [];
    for (const m of messages) {
      const content = (m.content || '').trim();
      if (content.length < MIN_CONTENT_LEN) continue;
      // Кусок с настоящим ключом в поиск не попадает НИКОГДА: он был бы виден
      // любому посетителю через общую базу знаний (16.08.2026).
      if (похоженаСекрет(content)) {
        console.warn('[индекс] кусок пропущен: похож на ключ или пароль');
        continue;
      }
      const contentHash = hashMessage(m.role, content);
      const embedding = await embedText(content, 'RETRIEVAL_DOCUMENT');
      if (!embedding) continue;
      rows.push({
        userKey,
        chatType,
        role: m.role,
        speaker: m.speaker ?? null,
        content,
        contentHash,
        msgTs: tsToIso(m.timestamp),
        source,
        embedding,
      });
    }
    return await upsertMemory(rows);
  } catch (e) {
    console.warn('[Memory Index] indexMessages failed:', e);
    return 0;
  }
}

export async function indexTurn(
  userEmail: string,
  chatType: string,
  userMessage: string,
  assistantResponse: string,
  userLabel = 'User',
  source: string = getSiteId()
): Promise<number> {
  return indexMessages(
    userEmail,
    chatType,
    [
      { role: 'user', content: userMessage, speaker: userLabel },
      { role: 'assistant', content: assistantResponse, speaker: 'AIfa' },
    ],
    source
  );
}

function getChatsDir(): string {
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;
  if (isVercel) {
    return path.join(os.tmpdir(), 'aifa-data', 'chats');
  }
  return path.join(process.cwd(), 'data', 'chats');
}

export async function backfillUser(userEmail: string): Promise<{ scanned: number; inserted: number }> {
  if (!memoryEnabled()) return { scanned: 0, inserted: 0 };
  const userKey = sanitizeEmail(userEmail);
  const chatsDir = getChatsDir();
  if (!fs.existsSync(chatsDir)) return { scanned: 0, inserted: 0 };

  const known = await existingHashes(userKey);
  const files = fs.readdirSync(chatsDir);

  let scanned = 0;
  let inserted = 0;

  // КАНАЛЫ БЕРЁМ ИЗ ИМЁН ФАЙЛОВ, А НЕ ИЗ СПИСКА В КОДЕ.
  //
  // Здесь наполняется ПАМЯТЬ AIfa. Пока перечень был вписан руками (`main`,
  // `terminal`, `oracle`), новый канал не индексировался вовсе — AIfa о нём
  // просто не знала. Замер 15.08.2026: в смысловой базе лежит четвёртый канал
  // `telegram_chat`, 164 реплики у 3 человек.
  //
  // Почта известна (`userKey`), файл называется `почта_канал_chunk_N.md` —
  // значит канал вырезается однозначно даже с подчёркиванием внутри имени.
  const типыИзФайлов = new Set<string>(CHAT_TYPES);
  for (const f of files) {
    if (!f.startsWith(`${userKey}_`) || !f.endsWith('.md')) continue;
    const где = f.lastIndexOf('_chunk_');
    if (где <= userKey.length) continue;
    const канал = f.slice(userKey.length + 1, где);
    if (канал && канал.length <= 24) типыИзФайлов.add(канал);
  }

  for (const type of типыИзФайлов) {
    const prefix = `${userKey}_${type}_chunk_`;
    const chunkFiles = files
      .filter((f) => f.startsWith(prefix) && f.endsWith('.md'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    for (const fileName of chunkFiles) {
      const filePath = path.join(chatsDir, fileName);
      let fileContent = fs.readFileSync(filePath, 'utf8');
      if (fileContent.trim() && !fileContent.trim().startsWith('#')) {
        // Server-encrypted archive chunk — decrypt with the server key to backfill.
        try {
          const { decryptText } = await import('./encryption');
          fileContent = decryptText(fileContent);
        } catch {
          continue; // legacy client-E2EE chunk — not server-readable
        }
      }
      const messages = parseChunkContent(fileContent);
      scanned += messages.length;

      const fresh = messages.filter((m) => {
        const content = (m.content || '').trim();
        if (content.length < MIN_CONTENT_LEN) return false;
        return !known.has(hashMessage(m.role, content));
      });
      if (fresh.length === 0) continue;

      const embeddings = await embedBatch(
        fresh.map((m) => m.content.trim()),
        'RETRIEVAL_DOCUMENT'
      );
      const rows: MemoryRow[] = [];
      for (let i = 0; i < fresh.length; i++) {
        const emb = embeddings[i];
        if (!emb) continue;
        const content = fresh[i].content.trim();
        const contentHash = hashMessage(fresh[i].role, content);
        known.add(contentHash);
        rows.push({
          userKey,
          chatType: type,
          role: fresh[i].role,
          speaker: fresh[i].name ?? null,
          content,
          contentHash,
          msgTs: tsToIso(fresh[i].timestamp),
          embedding: emb,
        });
      }
      inserted += await upsertMemory(rows);
    }
  }
  return { scanned, inserted };
}

export async function backfillAll(): Promise<{ users: number; scanned: number; inserted: number }> {
  if (!memoryEnabled()) return { users: 0, scanned: 0, inserted: 0 };
  const chatsDir = getChatsDir();
  if (!fs.existsSync(chatsDir)) return { users: 0, scanned: 0, inserted: 0 };

  const files = fs.readdirSync(chatsDir);

  const typeAlt = CHAT_TYPES.join('|');
  const re = new RegExp(`^(.*)_(?:${typeAlt})_chunk_\\d+\\.md$`);
  const userKeys = new Set<string>();
  for (const f of files) {
    const m = f.match(re);
    if (m) userKeys.add(m[1]);
  }

  let scanned = 0;
  let inserted = 0;
  const userKeysArray = Array.from(userKeys);
  for (const userKey of userKeysArray) {
    const r = await backfillUser(userKey);
    scanned += r.scanned;
    inserted += r.inserted;
  }
  return { users: userKeys.size, scanned, inserted };
}

