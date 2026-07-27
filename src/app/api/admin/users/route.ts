import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied } from '@/lib/admin-guard';
import { getPool } from '@/lib/economy';

export const dynamic = 'force-dynamic';

// Admin: unified user list (progress + tier + balances + passport), paginated.
export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  const page = Math.max(0, parseInt(req.nextUrl.searchParams.get('page') || '0', 10) || 0);
  const q = (req.nextUrl.searchParams.get('q') || '').trim().toLowerCase();
  const PAGE = 25;
  try {
    const pool = await getPool();
    const params: any[] = [];
    let where = '';
    if (q) { params.push('%' + q + '%'); where = `WHERE e.email ILIKE $1`; }
    const sql = `
      WITH emails AS (
        SELECT email FROM user_progress
        UNION SELECT email FROM user_tiers
        UNION SELECT email FROM user_balances
        UNION SELECT email FROM passports
        UNION SELECT user_email FROM referrals
      )
      SELECT e.email,
             COALESCE(up.xp,0) AS xp,
             COALESCE(ut.tier,0) AS tier,
             COALESCE(ub.galatin,0) AS galatin,
             p.username, p.arweave_tx,
             (SELECT count(*) FROM referrals r WHERE r.referrer_email=e.email) AS invited
      FROM emails e
      LEFT JOIN user_progress up ON up.email=e.email
      LEFT JOIN user_tiers ut ON ut.email=e.email
      LEFT JOIN user_balances ub ON ub.email=e.email
      LEFT JOIN passports p ON p.email=e.email
      ${where}
      ORDER BY xp DESC, e.email
      LIMIT ${PAGE + 1} OFFSET ${page * PAGE}`;
    const r = await pool.query(sql, params);
    await pool.end();
    const hasMore = r.rows.length > PAGE;
    return NextResponse.json({ ok: true, users: r.rows.slice(0, PAGE), page, hasMore });
  } catch (e) { console.error('[admin/users]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
