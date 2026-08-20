import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail, сессияДействительна } from '@/lib/user-auth';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Eternal archives: the user's dialog snapshots written to Arweave (encrypted)
// by the central cron (arweave-sync). Shared Neon table memory_arweave_log.
// Returns only the caller's own rows — session-gated.
export async function GET(req: NextRequest) {
  // Ограничение частоты: выгрузка архивов.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_memory_archives = clientIp(req as never);
  if (адрес_memory_archives !== 'unknown' && !(await dbRateLimit(`memory_archives:${адрес_memory_archives}`, 30, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    // SELECT * — таблица наполняется кроном central; не завязываемся жёстко на
    // наличие created_at, чтобы не уронить вкладку при отличающейся схеме.
    const r = await pool.query(`SELECT * FROM memory_arweave_log WHERE email=$1`, [email.trim().toLowerCase()]);
    await pool.end();
    const rows = r.rows
      .map((x: any) => ({
        chatType: String(x.chat_type || ''),
        txId: String(x.tx_id || ''),
        size: Number(x.size) || 0,
        at: x.created_at ? String(x.created_at) : '',
      }))
      .filter(x => x.txId);
    rows.sort((a, b) => (b.at || '').localeCompare(a.at || ''));
    return NextResponse.json({ ok: true, archives: rows.slice(0, 200) });
  } catch (e) {
    console.error('[memory/archives]', e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
