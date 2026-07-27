import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
export const dynamic = 'force-dynamic';
function mask(e: string): string { const [u, d] = e.split('@'); return (u.slice(0, 2) + '***') + '@' + (d || ''); }

// Referral dashboard (session-scoped): downline per level, earnings, balance,
// missed earnings (tier gate) + paginated downline list.
export async function GET(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const page = Math.max(0, parseInt(req.nextUrl.searchParams.get('page') || '0', 10) || 0);
  const PAGE = 20;
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const dl = await pool.query(
      `WITH RECURSIVE chain AS (
         SELECT user_email, 1 AS lvl FROM referrals WHERE referrer_email=$1
         UNION ALL
         SELECT r.user_email, c.lvl+1 FROM referrals r JOIN chain c ON r.referrer_email=c.user_email WHERE c.lvl<3)
       SELECT c.user_email, c.lvl, COALESCE(t.tier,0) AS tier
       FROM chain c LEFT JOIN user_tiers t ON t.email=c.user_email ORDER BY c.lvl, c.user_email`, [email]);
    const cnt: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    const all: any[] = [];
    for (const row of dl.rows) { cnt[row.lvl] = (cnt[row.lvl] || 0) + 1; all.push({ email: mask(row.user_email), lvl: row.lvl, tier: Number(row.tier) }); }
    const list = all.slice(page * PAGE, page * PAGE + PAGE);
    const byLevel: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    const earn = await pool.query(`SELECT lvl, COALESCE(SUM(amount_usdt),0) AS s FROM referral_earnings WHERE earner_email=$1 AND credited=true GROUP BY lvl`, [email]);
    for (const row of earn.rows) byLevel[row.lvl] = Number(row.s);
    const tot = await pool.query(
      `SELECT COALESCE(SUM(amount_usdt) FILTER (WHERE credited),0) AS earned,
              COALESCE(SUM(amount_usdt) FILTER (WHERE NOT credited),0) AS missed
       FROM referral_earnings WHERE earner_email=$1`, [email]);
    const paid = await pool.query(`SELECT COALESCE(SUM(amount),0) AS p FROM referral_payouts WHERE email=$1 AND status IN ('pending','paid')`, [email]);
    const mt = await pool.query(`SELECT COALESCE(tier,0) AS t FROM user_tiers WHERE email=$1`, [email]);
    const un = await pool.query(`SELECT username FROM passports WHERE email=$1`, [email]);
    await pool.end();
    const earned = Number(tot.rows[0].earned);
    const missed = Number(tot.rows[0].missed);
    const reserved = Number(paid.rows[0].p);
    return NextResponse.json({
      ok: true, counts: cnt, byLevel, earned, missed,
      balance: Math.max(0, Math.round((earned - reserved) * 100) / 100),
      count: cnt[1] + cnt[2] + cnt[3], myTier: mt.rows[0] ? Number(mt.rows[0].t) : 0,
      list, page, pages: Math.ceil(all.length / PAGE),
      refCode: un.rows[0]?.username || null,
    });
  } catch (e) { console.error('[ref/me]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
