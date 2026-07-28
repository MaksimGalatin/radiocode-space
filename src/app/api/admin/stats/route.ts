import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied } from '@/lib/admin-guard';
import { getPool } from '@/lib/economy';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

// Admin: business dashboard numbers in one call.
export async function GET(req: NextRequest) {
  // Ограничение частоты: админский раздел.
  if (!allowRequest(req as NextRequest, 'admin_stats', 30, 60000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  try {
    const pool = await getPool();
    const r = await pool.query(`SELECT
      (SELECT count(*) FROM (SELECT email FROM user_progress UNION SELECT email FROM user_tiers UNION SELECT email FROM passports) u) AS users,
      (SELECT count(*) FROM passports) AS passports,
      (SELECT count(*) FROM passports WHERE arweave_tx IS NOT NULL) AS minted,
      (SELECT count(*) FROM pay_orders WHERE status='paid') AS paid_orders,
      (SELECT COALESCE(SUM(amount),0) FROM pay_orders WHERE status='paid') AS revenue,
      (SELECT count(*) FROM pay_orders WHERE status='pending') AS pending_orders,
      (SELECT count(*) FROM referrals) AS referrals,
      (SELECT COALESCE(SUM(amount_usdt),0) FROM referral_earnings WHERE credited) AS ref_credited,
      (SELECT COALESCE(SUM(amount),0) FROM referral_payouts WHERE status='pending') AS payouts_pending,
      (SELECT COALESCE(SUM(galatin),0) FROM user_balances) AS galatin_supply,
      (SELECT COALESCE(SUM(wins),0) FROM game_scores) AS total_wins,
      (SELECT count(*) FROM contact_submissions) AS submissions,
      (SELECT count(DISTINCT email) FROM xp_daily WHERE day > CURRENT_DATE - 7) AS wau,
      (SELECT count(DISTINCT email) FROM xp_daily WHERE day = CURRENT_DATE) AS dau`);
    await pool.end();
    return NextResponse.json({ ok: true, stats: r.rows[0] });
  } catch (e) { console.error('[admin/stats]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
