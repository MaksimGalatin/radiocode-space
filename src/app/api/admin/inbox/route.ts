import { NextRequest, NextResponse } from 'next/server';
import { verifySession, isAdminEmail, ADMIN_COOKIE } from '@/lib/admin-session';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Ограничение частоты: админский раздел.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_admin_inbox = clientIp(req as never);
  if (адрес_admin_inbox !== 'unknown' && !(await dbRateLimit(`admin_inbox:${адрес_admin_inbox}`, 30, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = verifySession(req.cookies.get(ADMIN_COOKIE)?.value);
  if (!isAdminEmail(email)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ submissions: [] });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const r = await pool.query('SELECT id,site,kind,name,email,phone,company,budget,message,email_delivered,created_at FROM contact_submissions ORDER BY id DESC LIMIT 500');
    await pool.end();
    return NextResponse.json({ submissions: r.rows });
  } catch (e) {
    console.error('[admin/inbox]', e);
    return NextResponse.json({ submissions: [], error: 'db_error' }, { status: 500 });
  }
}
