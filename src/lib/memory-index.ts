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
  /sk-[A-Za-z0-9]{20,}/,                       // ключ OpenAI/Anthropic
  /postgres(ql)?:\/\/[^\s]+:[^@\s]+@/,        // строка подключения с паролем
  /npg_[A-Za-z0-9]{15,}/,                      // пароль Neon
  /MII[A-Za-z0-9+/]{40,}/,                     // тело приватного ключа
  /BEGIN [A-Z ]*PRIVATE KEY/,                  // заголовок PEM
  /xox[bpsa]-[A-Za-z0-9-]{20,}/,               // токен Slack
  /AKIA[A-Z0-9]{12,}/,                         // ключ AWS
  /[0-9]{8,12}:[A-Za-z0-9_-]{25,}/,        // токен Telegram
];

/** true, если в тексте есть что-то похожее на настоящий ключ или пароль. */
export function похоженаСекрет(текст: string): boolean {
  return СЕКРЕТЫ.some((о) => о.test(текст));
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

