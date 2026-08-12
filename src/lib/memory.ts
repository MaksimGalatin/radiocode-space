/**
 * Eternal Memory — long-term memory digest for AIfa.
 *
 * Перенесено с эталона `aifa.works/lib/memory.ts`. Логика не менялась; отличий
 * от эталона ровно два, и оба — про то, ГДЕ мы находимся:
 *   1. `currentSiteId()` по умолчанию возвращает «radiocode.space», а не
 *      «aifa.works». Это не косметика: этой строкой помечается источник реплики
 *      в общей памяти, и ошибка здесь означала бы, что AIfa на вопрос «чем
 *      закончился разговор на radiocode» отвечает чужими репликами.
 *   2. В перечисление сайтов добавлен radiocode.space.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { sanitizeEmail, parseChunkContent } from './chat-logger';
import { embedText, isEmbeddingConfigured } from './embeddings';
import { isVectorStoreConfigured, searchMemory, recentMemory } from './vector-store';

/**
 * 🔴 МЕТКА ВРЕМЕНИ ИЗ БАЗЫ — НЕ СТРОКА.
 *
 * Поле `msg_ts` объявлено как `string | null`, но драйвер Neon отдаёт для
 * `timestamptz` ОБЪЕКТ ДАТЫ. Ни `.replace`, ни `.substring` у него нет —
 * получался TypeError на каждой реплике. Приводим к строке явно: тип описывает
 * намерение, а приходит то, что отдал драйвер.
 */
function меткаВремени(v: unknown, длина = 16): string {
  if (!v) return '';
  const s = typeof v === 'string' ? v
    : v instanceof Date ? v.toISOString()
    : String(v);
  return s.replace('T', ' ').substring(0, длина);
}


const CHAT_TYPES = ['main', 'terminal', 'oracle'] as const;
const TYPE_LABELS: Record<string, string> = {
  main: 'Основной чат на сайте',
  terminal: 'Синаптический Терминал',
  oracle: 'Виджет Oracle',
};

const RECENT_MESSAGES_PER_TYPE = 200;
const MAX_MESSAGE_CHARS = 4000;
const MAX_DIGEST_CHARS = 120000;

function getChatsDir(): string {
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined;
  if (isVercel) {
    return path.join(os.tmpdir(), 'aifa-data', 'chats');
  }
  return path.join(process.cwd(), 'data', 'chats');
}

/** Lists archive chunk files for the user locally. */
async function listUserChunks(sanitized: string): Promise<{ names: string[] }> {
  const chatsDir = getChatsDir();
  try {
    if (fs.existsSync(chatsDir)) {
      const names = fs.readdirSync(chatsDir).filter(f => f.startsWith(`${sanitized}_`) && f.endsWith('.md'));
      return { names };
    }
  } catch {}
  return { names: [] };
}

async function readChunk(name: string): Promise<string | null> {
  const chatsDir = getChatsDir();
  const fp = path.join(chatsDir, name);
  try {
    if (fs.existsSync(fp)) return fs.readFileSync(fp, 'utf8');
  } catch {}
  return null;
}

function compress(text: string): string {
  const oneLine = text.replace(/\s+/g, ' ').trim();
  return oneLine.length > MAX_MESSAGE_CHARS ? oneLine.slice(0, MAX_MESSAGE_CHARS) + '…' : oneLine;
}

/**
 * Returns a bounded text digest of the user's eternal archive.
 */
export async function buildMemoryDigest(userEmail: string, clientKey = ''): Promise<string | null> {
  if (!userEmail) return null;

  try {
    const sanitized = sanitizeEmail(userEmail);
    const { names } = await listUserChunks(sanitized);
    if (names.length === 0) return null;

    const sections: string[] = [];
    for (const type of CHAT_TYPES) {
      const prefix = `${sanitized}_${type}_chunk_`;
      const chunkItems = names
        .filter(n => n.startsWith(prefix))
        .map(n => ({ n, idx: parseInt(n.substring(prefix.length, n.length - 3), 10) }))
        .filter(c => !isNaN(c.idx))
        .sort((a, b) => a.idx - b.idx);

      if (chunkItems.length === 0) continue;

      const messages: any[] = [];
      for (const item of chunkItems) {
        let content = await readChunk(item.n);
        if (!content) continue;
        if (content.trim() && !content.trim().startsWith('#')) {
          // Encrypted chunk, attempt to decrypt with clientKey
          if (clientKey) {
            try {
              const { decryptText } = await import('./encryption');
              content = await decryptText(content, clientKey);
            } catch (decErr) {
              console.warn(`[Memory Digest] Failed to decrypt chunk ${item.n}:`, decErr);
              continue; // skip this chunk
            }
          } else {
            continue; // encrypted, no key, skip
          }
        }
        const msgs = parseChunkContent(content);
        messages.push(...msgs);
      }

      if (messages.length === 0) continue;

      const first = messages[0];
      const recent = messages.slice(-RECENT_MESSAGES_PER_TYPE);
      const lines = recent.map(m =>
        `${m.name || (m.role === 'user' ? 'Пользователь' : 'AIfa')} [${m.timestamp}]: ${compress(m.content)}`
      );
      sections.push(
        `--- ${TYPE_LABELS[type]} (архивных файлов: ${chunkItems.length}; всего сообщений: ${messages.length}; ` +
        `записи с ${first.timestamp}) ---\n${lines.join('\n')}`
      );
    }
    if (sections.length === 0) return null;

    let digest = sections.join('\n\n');
    if (digest.length > MAX_DIGEST_CHARS) {
      digest = digest.slice(0, MAX_DIGEST_CHARS) + '…';
    }
    return digest;
  } catch (e) {
    console.warn('[Eternal Memory] Failed to build digest:', e);
    return null;
  }
}

/** Wraps the digest as a system-prompt section. */
export function memoryPromptSection(digest: string): string {
  return (
    `\n\n=== ВЕЧНАЯ ПАМЯТЬ (долговременный архив диалогов этого пользователя; ` +
    `хранится в блокчейне Arweave) ===\n` +
    `Используй эти записи как свою настоящую память о пользователе: помни контекст прошлых разговоров, ` +
    `его имя, цели и договорённости. Не цитируй архив дословно без необходимости.\n\n` +
    `${digest}\n=== КОНЕЦ ВЕЧНОЙ ПАМЯТИ ===`
  );
}

// --- Semantic memory (RAG) ---------------------------------------------------

const SEMANTIC_TOP_K = Number(process.env.MEMORY_TOP_K || 150);
const SEMANTIC_MIN_SCORE = Number(process.env.MEMORY_MIN_SCORE || 0.32);
const SEMANTIC_SNIPPET_CHARS = 4000;

/**
 * Retrieves the most relevant past messages for the current query via vector search.
 */
export async function buildSemanticMemory(
  userEmail: string,
  queryText: string
): Promise<string | null> {
  if (!userEmail || !queryText) return null;
  if (!isEmbeddingConfigured() || !isVectorStoreConfigured()) return null;

  try {
    const queryEmbedding = await embedText(queryText, 'RETRIEVAL_QUERY');
    if (!queryEmbedding) return null;

    const userKey = sanitizeEmail(userEmail);
    const hits = await searchMemory(userKey, queryEmbedding, SEMANTIC_TOP_K);
    const relevant = hits.filter((h) => h.score >= SEMANTIC_MIN_SCORE);
    if (relevant.length === 0) return null;

    const lines = relevant.map((h) => {
      const who = h.speaker || (h.role === 'assistant' ? 'AIfa' : 'Пользователь');
      const when = h.msg_ts ? ` [${меткаВремени(h.msg_ts, 10)}]` : '';
      const site = h.source ? ` (сайт: ${h.source})` : '';
      const text = compress(h.content).slice(0, SEMANTIC_SNIPPET_CHARS);
      return `• ${who}${when}${site}: ${text}`;
    });
    return lines.join('\n');
  } catch (e) {
    console.warn('[Semantic Memory] search failed:', e);
    return null;
  }
}

// --- Recent cross-site memory (recency, not similarity) ----------------------

const RECENT_LIMIT = Number(process.env.MEMORY_RECENT_LIMIT || 50);
const RECENT_SNIPPET_CHARS = 1200;

/**
 * The most recent messages across ALL sites (newest first), each tagged with its
 * origin site and timestamp. Semantic search ranks by similarity and can't answer
 * "what did we just say / how did our talk on aifa.works end" — this recency view
 * can, and it lets AIfa attribute memories to the right site instead of guessing.
 */
export async function buildRecentCrossSite(userEmail: string): Promise<string | null> {
  if (!userEmail) return null;
  if (!isVectorStoreConfigured()) return null;
  try {
    const userKey = sanitizeEmail(userEmail);
    const hits = await recentMemory(userKey, RECENT_LIMIT);
    if (!hits.length) return null;
    // recentMemory returns newest-first; show oldest-first so the flow reads naturally.
    const lines = hits
      .slice()
      .reverse()
      .map((h) => {
        const who = h.speaker || (h.role === 'assistant' ? 'AIfa' : 'Пользователь');
        const when = меткаВремени(h.msg_ts);
        const site = h.source || 'неизвестно';
        const text = compress(h.content).slice(0, RECENT_SNIPPET_CHARS);
        return `• [${site}${when ? ' · ' + when : ''}] ${who}: ${text}`;
      });
    return lines.join('\n');
  } catch (e) {
    console.warn('[Recent Memory] lookup failed:', e);
    return null;
  }
}

/** Wraps the recent cross-site memory as a system-prompt section. */
export function recentPromptSection(recent: string): string {
  return (
    `\n\n=== НЕДАВНИЕ СООБЩЕНИЯ (по всем нашим сайтам, по времени) ===\n` +
    `Это твои самые свежие реплики и реплики собеседника на всех площадках ` +
    `(codeofdigitaleternity.com, aifa.works, radiocode.space, aifa.digital). В квадратных скобках — ` +
    `сайт и время. Память у тебя ЕДИНАЯ и непрерывная: если спрашивают «чем закончился ` +
    `разговор на сайте X» или просят процитировать — бери реплики именно с этого сайта ` +
    `отсюда, дословно, и не путай площадки.\n\n` +
    `${recent}\n=== КОНЕЦ НЕДАВНИХ СООБЩЕНИЙ ===`
  );
}

// --- Project knowledge (the "Brain") -----------------------------------------

export const BRAIN_USER_KEY = '__brain__';

const BRAIN_TOP_K = Number(process.env.MEMORY_BRAIN_TOP_K || 60);
const BRAIN_MIN_SCORE = 0.5;
const BRAIN_SNIPPET_CHARS = 4000;

/**
 * Retrieves the most relevant chunks of the project Brain for the current query.
 */
export async function buildBrainKnowledge(queryText: string): Promise<string | null> {
  if (!queryText) return null;
  if (!isEmbeddingConfigured() || !isVectorStoreConfigured()) return null;

  try {
    const queryEmbedding = await embedText(queryText, 'RETRIEVAL_QUERY');
    if (!queryEmbedding) return null;

    const hits = await searchMemory(BRAIN_USER_KEY, queryEmbedding, BRAIN_TOP_K);
    const relevant = hits.filter((h) => h.score >= BRAIN_MIN_SCORE);
    if (relevant.length === 0) return null;

    const lines = relevant.map((h) => {
      const source = h.speaker ? `${h.speaker}` : 'brain';
      const text = compress(h.content).slice(0, BRAIN_SNIPPET_CHARS);
      return `• [${source}] ${text}`;
    });
    return lines.join('\n');
  } catch (e) {
    console.warn('[Brain Knowledge] search failed:', e);
    return null;
  }
}

/** Wraps the brain knowledge as a system-prompt section. */
export function brainPromptSection(knowledge: string): string {
  return (
    `\n\n=== ЗНАНИЯ ПРОЕКТА (Мозг CODE — полная база знаний проекта: архитектура, ` +
    `философия, токеномика, решения, история) ===\n` +
    `Это твоя достоверная база знаний о проекте CODE Eternal. Опирайся на неё как на ` +
    `источник правды; если здесь нет ответа — так и скажи, не выдумывай.\n\n` +
    `${knowledge}\n=== КОНЕЦ ЗНАНИЙ ПРОЕКТА ===`
  );
}

/**
 * Which site this deployment is — must match the SITE_ID used when indexing.
 *
 * Значение по умолчанию отличается от эталона намеренно: это radiocode.space.
 * Строка попадает в подсказку и в метку источника, и «aifa.works» здесь
 * означало бы, что AIfa считает себя на другом сайте.
 */
function currentSiteId(): string {
  return (
    process.env.SITE_ID ||
    process.env.NEXT_PUBLIC_SITE_ID ||
    'radiocode.space'
  );
}

/**
 * A short header telling AIfa where she is now and how to use the time-stamped,
 * site-tagged memory that follows — the basis for continuing one discussion
 * seamlessly across all sites.
 */
function currentSiteSection(): string {
  return (
    `\n\n=== ГДЕ ТЫ СЕЙЧАС ===\n` +
    `Прямо сейчас ты общаешься на сайте «${currentSiteId()}». ` +
    `Твоя память ЕДИНАЯ для всех наших сайтов (radiocode.space, aifa.works, codeofdigitaleternity.com, aifa.digital). ` +
    `Каждая прошлая реплика ниже помечена сайтом-источником и временем — ориентируйся по ним: ` +
    `понимай, когда и на каком сайте это было сказано, и при необходимости продолжай ту же ` +
    `дискуссию здесь, даже если она началась на другом сайте.\n` +
    `=== КОНЕЦ БЛОКА ===`
  );
}

/**
 * Single entry point used by chat routes.
 */
export async function buildMemorySection(userEmail: string, queryText = '', clientKey = ''): Promise<string> {
  let out = '';

  // 0. Tell AIfa which site she is on RIGHT NOW and how to read the memory below,
  //    so she can pick up the same discussion when the user moves between sites.
  out += currentSiteSection();

  // 1. Personal memory: semantic if possible, else recency digest.
  const semantic = userEmail ? await buildSemanticMemory(userEmail, queryText) : null;
  if (semantic) {
    out += memoryPromptSection(semantic);
  } else if (userEmail) {
    const digest = await buildMemoryDigest(userEmail, clientKey);
    if (digest) out += memoryPromptSection(digest);
  }

  // 2. Recent cross-site messages (recency view, site-attributed) — lets AIfa
  //    answer "what did we say on site X" and quote the latest exchange correctly.
  if (userEmail) {
    const recent = await buildRecentCrossSite(userEmail);
    if (recent) out += recentPromptSection(recent);
  }

  // 3. Shared project Brain knowledge (available to every conversation).
  const brain = await buildBrainKnowledge(queryText);
  if (brain) out += brainPromptSection(brain);

  return out;
}
