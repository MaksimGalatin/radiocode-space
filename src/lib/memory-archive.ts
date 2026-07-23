/**
 * Chunked, server-readable memory archive (Variant A) — shared design with the
 * other CODE sites; the SUBMISSIONS_DB tables are common across all of them.
 *
 * Full per-user transcript = an APPEND-ONLY chain of sealed chunks plus one live
 * "current" blob:
 *   - `chat_memory`         : the live blob (email, chat_type) — small, grows.
 *   - `chat_memory_chunks`  : immutable sealed chunks (email, chat_type, idx).
 *
 * When the live blob would exceed SEAL_THRESHOLD the accumulated history is
 * sealed into the next chunk and the live blob restarts. Nothing is ever
 * trimmed, so the WHOLE history stays server-readable and every piece stays
 * < ~91 KB ciphertext → within Arweave's free (<100 KB) tier. SEAL_THRESHOLD is
 * plaintext bytes: AES-256-GCM + base64 inflates ~1.33×, so 68 KB → ~91 KB.
 */
import { decryptForUser } from './user-key';

export const SEAL_THRESHOLD = 68 * 1024;

/** Create the sealed-chunks table if absent (idempotent). */
export async function ensureChunkTable(pool: any): Promise<void> {
  await pool.query(`CREATE TABLE IF NOT EXISTS chat_memory_chunks(
    email       text NOT NULL,
    chat_type   text NOT NULL,
    chunk_index int  NOT NULL,
    ciphertext  text NOT NULL,
    created_at  timestamptz DEFAULT now(),
    arweave_tx  text,
    synced_hash text,
    PRIMARY KEY (email, chat_type, chunk_index)
  )`);
}

/**
 * The FULL decrypted transcript for one user + chat_type: every sealed chunk
 * (in order) followed by the live blob. Failures on any single piece are skipped
 * so a partial read never throws.
 */
export async function readFullTranscript(pool: any, email: string, chatType: string): Promise<string> {
  const em = email.trim().toLowerCase();
  let out = '';
  try {
    await ensureChunkTable(pool);
    const chunks = await pool.query(
      `SELECT ciphertext FROM chat_memory_chunks WHERE email=$1 AND chat_type=$2 ORDER BY chunk_index`,
      [em, chatType]);
    for (const c of chunks.rows) {
      try { out += await decryptForUser(em, c.ciphertext); } catch { /* skip unreadable chunk */ }
    }
  } catch { /* table missing / query error — fall through to live blob */ }
  try {
    const cur = await pool.query(`SELECT ciphertext FROM chat_memory WHERE email=$1 AND chat_type=$2`, [em, chatType]);
    if (cur.rows[0]?.ciphertext) {
      try { out += await decryptForUser(em, cur.rows[0].ciphertext); } catch { /* skip */ }
    }
  } catch { /* ignore */ }
  return out;
}
