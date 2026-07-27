import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
import { getOrCreateUserKey, encryptForUser } from '@/lib/user-key';

export const dynamic = 'force-dynamic';
const MAX_BYTES = 600_000;

// Import old dialogs (decrypted client-side via wallet) into the new
// server-managed scheme. The browser sends the PLAINTEXT it just decrypted;
// the server re-encrypts it with the user's managed key and stores it, so from
// now on it reads with no wallet/password. Session-scoped.
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!allowRequest(req, 'memimport', 20, 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const chatType = String(b?.chatType || '').trim().toLowerCase().slice(0, 24);
  let text = String(b?.text || '');
  if (!chatType || !text) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  if (Buffer.byteLength(text, 'utf8') > MAX_BYTES) text = text.slice(0, MAX_BYTES);
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    await getOrCreateUserKey(email);
    const cipher = await encryptForUser(email, text);
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    await pool.query(
      `INSERT INTO chat_memory(email, chat_type, ciphertext) VALUES($1,$2,$3)
       ON CONFLICT(email, chat_type) DO UPDATE SET ciphertext=EXCLUDED.ciphertext, updated_at=now()`,
      [email.trim().toLowerCase(), chatType, cipher]);
    await pool.end();
    return NextResponse.json({ ok: true, chatType });
  } catch (e) { console.error('[memory/import]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
