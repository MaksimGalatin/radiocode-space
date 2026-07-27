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

/** Raw key as base64 (for showing the owner their recovery key). Use sparingly. */
export async function getUserKeyB64(email: string): Promise<string> {
  return (await getOrCreateUserKey(email)).toString('base64');
}
