import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied, auditLog } from '@/lib/admin-guard';
import { getPool } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Admin: referral payout queue.
export async function GET(req: NextRequest) {
  // Ограничение частоты: выплаты.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_admin_payouts = clientIp(req as never);
  if (адрес_admin_payouts !== 'unknown' && !(await dbRateLimit(`admin_payouts:${адрес_admin_payouts}`, 20, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  try {
    const pool = await getPool();
    const r = await pool.query(`SELECT id, email, amount, address, status, created_at FROM referral_payouts ORDER BY (status='pending') DESC, created_at DESC LIMIT 200`);
    await pool.end();
    return NextResponse.json({ ok: true, payouts: r.rows });
  } catch (e) { console.error('[admin/payouts]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

// Mark a payout paid / rejected (audited).
export async function POST(req: NextRequest) {
  // Ограничение частоты: выплаты.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_admin_payouts = clientIp(req as never);
  if (адрес_admin_payouts !== 'unknown' && !(await dbRateLimit(`admin_payouts:${адрес_admin_payouts}`, 20, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  let b: any = {}; try { b = await req.json(); } catch {}
  const id = Number(b?.id || 0);
  const status = String(b?.status || '');
  if (!id || !['paid', 'rejected'].includes(status)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  try {
    const pool = await getPool();
    const r = await pool.query(`UPDATE referral_payouts SET status=$2 WHERE id=$1 AND status='pending' RETURNING email, amount`, [id, status]);
    if (r.rows[0]) await auditLog(pool, admin, 'payout_' + status, { id, email: r.rows[0].email, amount: r.rows[0].amount }, req);
    await pool.end();
    return NextResponse.json({ ok: true, updated: (r.rowCount || 0) > 0 });
  } catch (e) { console.error('[admin/payouts:post]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
