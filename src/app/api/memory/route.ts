import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { readFullTranscript, ensureChunkTable } from '@/lib/memory-archive';

export const dynamic = 'force-dynamic';

// Read the logged-in user's memory (server-managed chunked scheme). Returns the
// FULL decrypted transcript per chat_type — sealed chunks + the live blob — for
// the owner only. No key entry, works on any device.
export async function GET(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const em = email.trim().toLowerCase();
    await ensureChunkTable(pool);
    const meta = await pool.query(
      `SELECT s.chat_type, cm.updated_at
         FROM (SELECT DISTINCT chat_type FROM chat_memory WHERE email=$1
               UNION SELECT DISTINCT chat_type FROM chat_memory_chunks WHERE email=$1) s
         LEFT JOIN chat_memory cm ON cm.email=$1 AND cm.chat_type=s.chat_type
         ORDER BY s.chat_type`, [em]);
    const chats: { chatType: string; text: string; updatedAt: string }[] = [];
    for (const row of meta.rows) {
      const text = await readFullTranscript(pool, em, row.chat_type);
      if (text) chats.push({ chatType: row.chat_type, text, updatedAt: row.updated_at });
    }
    await pool.end();
    return NextResponse.json({ ok: true, chats });
  } catch (e) { console.error('[memory/get]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
