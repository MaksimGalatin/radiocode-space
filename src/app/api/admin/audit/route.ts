import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied } from '@/lib/admin-guard';
import { getPool } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Admin: audit log of admin actions.
export async function GET(req: NextRequest) {
  // Ограничение частоты: админский раздел.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_admin_audit = clientIp(req as never);
  if (адрес_admin_audit !== 'unknown' && !(await dbRateLimit(`admin_audit:${адрес_admin_audit}`, 30, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  try {
    const pool = await getPool();
    const r = await pool.query(`SELECT id, admin_email, action, detail, ip, created_at FROM admin_audit_log ORDER BY id DESC LIMIT 200`);
    await pool.end();
    return NextResponse.json({ ok: true, log: r.rows });
  } catch (e) { console.error('[admin/audit]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
