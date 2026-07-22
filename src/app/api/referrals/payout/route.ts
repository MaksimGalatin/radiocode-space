import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
export const dynamic = 'force-dynamic';

// Request a USDT (TRC20) withdrawal of the full available balance — for the
// LOGGED-IN user only (session), never an arbitrary email from the body.
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!allowRequest(req, 'payout', 5, 60 * 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const address = String(b?.address || '').trim();
  // TRC20 address sanity: T + 33 base58 chars
  if (!/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address)) return NextResponse.json({ error: 'bad_address' }, { status: 400 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    // Paused (Digital DNA $200/mo overdue) ⇒ no withdrawals until renewed.
    try { const ps = await pool.query(`SELECT 1 FROM subscriptions WHERE email=$1 AND next_due < now() LIMIT 1`, [email]); if ((ps.rowCount || 0) > 0) { await pool.end(); return NextResponse.json({ ok: false, error: 'subscription_paused' }); } } catch {}
    const tot = await pool.query(`SELECT COALESCE(SUM(amount_usdt),0) AS t FROM referral_earnings WHERE earner_email=$1 AND credited=true`, [email]);
    const paid = await pool.query(`SELECT COALESCE(SUM(amount),0) AS p FROM referral_payouts WHERE email=$1 AND status IN ('pending','paid')`, [email]);
    const bal = Math.round((Number(tot.rows[0].t) - Number(paid.rows[0].p)) * 100) / 100;
    if (bal <= 0) { await pool.end(); return NextResponse.json({ ok: false, error: 'no_funds' }); }
    await pool.query(`INSERT INTO referral_payouts(email,amount,address,status) VALUES($1,$2,$3,'pending')`, [email, bal, address]);
    await pool.end();
    return NextResponse.json({ ok: true, requested: bal });
  } catch (e) { console.error('[ref/payout]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
