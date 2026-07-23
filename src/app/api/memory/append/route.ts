import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
import { getOrCreateUserKey, encryptForUser, decryptForUser } from '@/lib/user-key';
import { SEAL_THRESHOLD, ensureChunkTable } from '@/lib/memory-archive';

export const dynamic = 'force-dynamic';

// Append one exchange (user + assistant) to the user's memory, encrypted with
// their server-managed key. Called by the cabinet after each AIfa turn.
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!allowRequest(req, 'memappend', 60, 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const chatType = String(b?.chatType || 'terminal').trim().toLowerCase().slice(0, 24);
  const userMsg = String(b?.userMessage || '').slice(0, 8000);
  const aiMsg = String(b?.assistantMessage || '').slice(0, 12000);
  if (!userMsg && !aiMsg) return NextResponse.json({ error: 'empty' }, { status: 400 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const entry = `### [${ts}] User\n${userMsg}\n\n---\n\n### [${ts}] AIfa\n${aiMsg}\n\n---\n\n`;
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const em = email.trim().toLowerCase();
    const r = await pool.query(`SELECT ciphertext FROM chat_memory WHERE email=$1 AND chat_type=$2`, [em, chatType]);
    let prev = '';
    if (r.rows[0]) { try { prev = await decryptForUser(email, r.rows[0].ciphertext); } catch { prev = ''; } }
    // ensure key exists (idempotent)
    await getOrCreateUserKey(email);
    let combined = prev + entry;
    // Seal-instead-of-trim: never discard history. When the live blob would
    // exceed SEAL_THRESHOLD, freeze the prior transcript into an immutable chunk
    // (< ~91 KB ciphertext → free Arweave) and restart the live blob with just
    // the new entry, so the FULL history stays server-readable across chunks.
    if (Buffer.byteLength(combined, 'utf8') > SEAL_THRESHOLD && prev) {
      await ensureChunkTable(pool);
      const idxRes = await pool.query(
        `SELECT COALESCE(MAX(chunk_index),0)+1 AS n FROM chat_memory_chunks WHERE email=$1 AND chat_type=$2`,
        [em, chatType]);
      const nextIdx = Number(idxRes.rows[0].n);
      const sealed = await encryptForUser(email, prev);
      await pool.query(
        `INSERT INTO chat_memory_chunks(email,chat_type,chunk_index,ciphertext) VALUES($1,$2,$3,$4)
         ON CONFLICT(email,chat_type,chunk_index) DO NOTHING`,
        [em, chatType, nextIdx, sealed]);
      combined = entry;
    }
    const cipher = await encryptForUser(email, combined);
    await pool.query(
      `INSERT INTO chat_memory(email, chat_type, ciphertext) VALUES($1,$2,$3)
       ON CONFLICT(email, chat_type) DO UPDATE SET ciphertext=EXCLUDED.ciphertext, updated_at=now()`,
      [em, chatType, cipher]);
    await pool.end();
    return NextResponse.json({ ok: true });
  } catch (e) { console.error('[memory/append]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
