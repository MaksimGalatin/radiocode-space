/**
 * Server-managed per-user encryption (the "just works" scheme).
 *
 * - Each user has a personal random 32-byte data key.
 * - That key is stored in `user_keys` WRAPPED by the project MEMORY_MASTER_KEY
 *   (which lives only in server env / KMS — never sent to the browser or git).
 * - Dialogs are encrypted with the user's data key; only the logged-in owner
 *   (via session cookie) gets plaintext back. Public blockchain/GitHub copies
 *   stay ciphertext. The user never types or remembers anything.
 */
import crypto from 'crypto';
import { kmsEnabled, isKmsBlob, kmsWrap, kmsUnwrap } from './kms';

function masterKey(): Buffer {
  const b64 = process.env.MEMORY_MASTER_KEY || '';
  if (!b64) throw new Error('MEMORY_MASTER_KEY not configured');
  const k = Buffer.from(b64, 'base64');
  if (k.length !== 32) throw new Error('MEMORY_MASTER_KEY must be 32 bytes base64');
  return k;
}

// AES-256-GCM envelope: salt(16) + iv(12) + tag(16) + ciphertext, base64.
function aeadEncrypt(key: Buffer, plain: Buffer): string {
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const dk = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
  const c = crypto.createCipheriv('aes-256-gcm', dk, iv);
  const ct = Buffer.concat([c.update(plain), c.final()]);
  return Buffer.concat([salt, iv, c.getAuthTag(), ct]).toString('base64');
}
function aeadDecrypt(key: Buffer, b64: string): Buffer {
  const raw = Buffer.from(b64, 'base64');
  const salt = raw.slice(0, 16), iv = raw.slice(16, 28), tag = raw.slice(28, 44), ct = raw.slice(44);
  const dk = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
  const d = crypto.createDecipheriv('aes-256-gcm', dk, iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(ct), d.final()]);
}

async function pool() {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) throw new Error('no_db');
  const { Pool } = await import('@neondatabase/serverless');
  return new Pool({ connectionString: url });
}

/** Unwrap a stored key blob: KMS if it is a KMS blob, else local master. */
async function unwrapStored(b64: string): Promise<Buffer> {
  if (isKmsBlob(b64)) return kmsUnwrap(b64);
  return aeadDecrypt(masterKey(), b64);
}
/** Wrap a raw key: via KMS when enabled, else local master envelope. */
async function wrapNew(raw: Buffer): Promise<string> {
  if (kmsEnabled()) return kmsWrap(raw);
  return aeadEncrypt(masterKey(), raw);
}

/** Return the user's raw 32-byte data key, creating & storing it (wrapped) if absent. */
export async function getOrCreateUserKey(email: string): Promise<Buffer> {
  const em = email.trim().toLowerCase();
  const p = await pool();
  try {
    const r = await p.query(`SELECT wrapped_key FROM user_keys WHERE email=$1`, [em]);
    if (r.rows[0]) return await unwrapStored(r.rows[0].wrapped_key);
    const raw = crypto.randomBytes(32);
    const wrapped = await wrapNew(raw);
    await p.query(
      `INSERT INTO user_keys(email, wrapped_key) VALUES($1,$2) ON CONFLICT(email) DO NOTHING`,
      [em, wrapped]);
    // re-read (handles the race where another request inserted first)
    const r2 = await p.query(`SELECT wrapped_key FROM user_keys WHERE email=$1`, [em]);
    return await unwrapStored(r2.rows[0].wrapped_key);
  } finally { await p.end(); }
}

/** Encrypt text with the user's data key (for storing a dialog). */
export async function encryptForUser(email: string, text: string): Promise<string> {
  const key = await getOrCreateUserKey(email);
  return aeadEncrypt(key, Buffer.from(text, 'utf8'));
}

/** Decrypt a user-encrypted blob back to text. */
export async function decryptForUser(email: string, cipher: string): Promise<string> {
  const key = await getOrCreateUserKey(email);
  return aeadDecrypt(key, cipher).toString('utf8');
}

/**
 * Те же конверты, но ключ УЖЕ на руках.
 *
 * ЗАЧЕМ. `encryptForUser`/`decryptForUser` каждый раз добывают ключ заново, а
 * это запрос в базу, распаковка в KMS и стотысячная прокрутка pbkdf2. Там, где
 * за один заход надо расшифровать десятки блобов подряд (чтение всей переписки
 * человека админской ручкой), это умножалось на число блобов. Ключ добывается
 * один раз, конверт остаётся ровно тот же.
 */
export function encryptWithUserKey(key: Buffer, text: string): string {
  return aeadEncrypt(key, Buffer.from(text, 'utf8'));
}
export function decryptWithUserKey(key: Buffer, cipher: string): string {
  return aeadDecrypt(key, cipher).toString('utf8');
}

/** Raw key as base64 (for showing the owner their recovery key). Use sparingly. */
export async function getUserKeyB64(email: string): Promise<string> {
  return (await getOrCreateUserKey(email)).toString('base64');
}
/* ────────────────────────────────────────────────────────────────────────────
 * ЛИЧНЫЙ КЛЮЧ ПРИ ЗАЛИВКЕ В ВЕЧНУЮ СЕТЬ
 *
 * До 08.08.2026 всё, что уходило в Arweave, закрывалось ОДНИМ ключом проекта.
 * Один утёкший секрет раскрывал бы переписку ВСЕХ людей сразу и навсегда: сеть
 * неизменяема, залитое не отзывается. Решение Архитектора: у каждого свой ключ,
 * потеря ключа стоит одному человеку, а не всем.
 *
 * Сама заливка живёт только в центральном репозитории (`api/cron/arweave-sync`),
 * поэтому здесь — общая часть: метка, названия схем и обёртки. Так читалка
 * этого сайта понимает конверт, собранный центральным.
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Метка «закрыто личным ключом человека».
 *
 * ПОЧЕМУ метка нужна. Видов содержимого три, и по одному base64 они
 * неразличимы: открытый markdown (начинается с «#»), конверт браузерного ключа
 * (прежняя схема) и вот этот, серверный. Без метки читалка не знает, чем
 * пробовать, и либо отдаёт браузеру то, что он открыть не может, либо молча
 * возвращает мусор.
 */
export const МЕТКА_ЛИЧНОГО_КЛЮЧА = 'AIFA-SRV1:';

/**
 * Версии схем — уходят в теги сделки Arweave.
 *
 * ПОЧЕМУ в теги. Сделка живёт вечно, а код меняется. Через год читалка должна по
 * самой сделке понять, чем её открывать, а не гадать по дате заливки. Всё, что
 * залито ДО 08.08.2026, тега не имеет — отсутствие тега и означает «старая
 * схема, общий ключ проекта».
 */
export const СХЕМА_ЛИЧНОГО_КЛЮЧА = 'aifa-user-key-v1';
/** Прежняя схема: один общий ключ проекта. Только для чтения. */
export const СХЕМА_ОБЩЕГО_КЛЮЧА = 'project-key-v0';
/** Конверт, собранный ключом из браузера. Сервер его не открывает и не создаёт. */
export const СХЕМА_БРАУЗЕРНОГО_КЛЮЧА = 'client-key-v1';

/** Помечен ли шифротекст как закрытый личным ключом человека. */
export function помеченЛичнымКлючом(v: string): boolean {
  return typeof v === 'string' && v.startsWith(МЕТКА_ЛИЧНОГО_КЛЮЧА);
}

/**
 * Шифрует текст личным ключом человека и ставит метку схемы.
 *
 * Бросает исключение, если ключ не удалось ни найти, ни завести — и это
 * единственное правильное поведение перед заливкой в вечную сеть: вызывающий
 * обязан пропустить запись, а не подставлять запасной ключ.
 */
export async function encryptForUserTagged(email: string, text: string): Promise<string> {
  return МЕТКА_ЛИЧНОГО_КЛЮЧА + (await encryptForUser(email, text));
}

/** Снимает метку и расшифровывает личным ключом. Без метки — как есть. */
export async function decryptForUserTagged(email: string, v: string): Promise<string> {
  return decryptForUser(email, помеченЛичнымКлючом(v) ? v.slice(МЕТКА_ЛИЧНОГО_КЛЮЧА.length) : v);
}



// ─────────────────────────────────────────────────────────────────────────────
// ЗАБЫТЬ ОДИН ДИАЛОГ — не всю память.
//
// Требование Архитектора 25.08.2026: «каждый диалог шифруется отдельно при
// выгрузке в блокчейн, чтобы можно было удалить ОДИН диалог стерев его ключ,
// а не всю память. И мы это должны были уже давно доделать».
//
// ПОЧЕМУ ЭТО ЗДЕСЬ, А НЕ ТОЛЬКО НА ЦЕНТРАЛЬНОМ. Кабинет ЕДИНЫЙ на четыре
// сайта, база одна. Человек, вошедший здесь, должен иметь то же действие,
// что и на центральном, — иначе получится четыре разных продукта с
// расходящимися правами (раздел 9). Сам механизм ключей записи живёт на
// центральном; здесь — только чтение перечня и уничтожение, обе операции
// идут в ту же общую таблицу `record_keys`.
// ─────────────────────────────────────────────────────────────────────────────

async function таблицаКлючейЗаписей(p: { query: (s: string, v?: unknown[]) => Promise<unknown> }) {
  await p.query(`CREATE TABLE IF NOT EXISTS record_keys(
    key_id      text PRIMARY KEY,
    email       text NOT NULL,
    ссылка      text,
    wrapped_key text NOT NULL,
    created_at  timestamptz DEFAULT now(),
    destroyed_at timestamptz)`);
  await p.query(`CREATE INDEX IF NOT EXISTS record_keys_email_idx ON record_keys(email)`);
}

/**
 * Уничтожить ВСЕ ключи одного диалога.
 *
 * Именно все: в блокчейне лежат все прежние состояния разговора, оттуда
 * ничего не изымается. Оставленный ключ оставил бы читаемым один старый
 * слепок этого же разговора.
 *
 * Необратимо (раздел 18). Только по явному действию человека.
 *
 * @returns сколько ключей затёрто; ноль — «нет такого или уже забыт».
 */
export async function уничтожитьДиалог(email: string, ссылка: string): Promise<number> {
  const em = email.trim().toLowerCase();
  const метка = (ссылка ?? '').trim();
  // Пустая метка снесла бы ВСЕ ключи человека — просят обратное.
  if (!метка) throw new Error('уничтожитьДиалог: пустая ссылка на диалог');

  const p = await pool();
  try {
    await таблицаКлючейЗаписей(p);
    const r = await p.query<{ key_id: string }>(
      `UPDATE record_keys SET wrapped_key='', destroyed_at=now()
        WHERE email=$1 AND ссылка=$2 AND destroyed_at IS NULL
        RETURNING key_id`, [em, метка]);
    return r.rows?.length ?? 0;
  } finally { await p.end(); }
}

/** Перечень диалогов человека — чтобы выбрать ДО необратимого действия. */
export async function диалогиЧеловека(email: string): Promise<
  Array<{ ссылка: string; ключей: number; закрытых: number; последняя: string | null }>
> {
  const em = email.trim().toLowerCase();
  const p = await pool();
  try {
    await таблицаКлючейЗаписей(p);
    const r = await p.query<{
      ссылка: string; ключей: string; закрытых: string; последняя: string | null;
    }>(
      `SELECT ссылка,
              COUNT(*) FILTER (WHERE destroyed_at IS NULL)     AS ключей,
              COUNT(*) FILTER (WHERE destroyed_at IS NOT NULL) AS закрытых,
              MAX(created_at)::text                            AS последняя
         FROM record_keys
        WHERE email=$1 AND ссылка IS NOT NULL AND ссылка <> ''
        GROUP BY ссылка
        ORDER BY MAX(created_at) DESC`, [em]);
    return (r.rows ?? []).map((x) => ({
      ссылка: x.ссылка,
      ключей: Number(x.ключей),
      закрытых: Number(x.закрытых),
      последняя: x.последняя,
    }));
  } finally { await p.end(); }
}
