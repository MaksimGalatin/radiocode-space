// 3-level ambassador commission with TIER GATE.
// Rule (owner spec): an ancestor earns from a referral's purchase ONLY if the
// ancestor's own tier >= the purchased tier. If the referral bought a HIGHER
// tier than the ancestor holds, the commission is recorded as "missed"
// (credited=false) so the ancestor can see the upside of upgrading.
const RATES = [0.15, 0.07, 0.03];
export const TIER_AMOUNT: Record<number, number> = { 1: 15, 2: 100, 3: 1000 };
// Recurring monthly amount after the initial tier payment (Digital DNA: $1000
// one-time to activate, then $200/mo). Renewal invoices carry tier=3+amount=200.
export const TIER_MONTHLY: Record<number, number> = { 3: 200 };
export function amountToTier(a: number): number {
  if (a >= 1000) return 3; if (a >= 100) return 2; if (a >= 15) return 1; return 0;
}
export async function creditReferralChain(pool: any, buyer: string, amount: number, tier: number, orderId: string) {
  const out: any[] = [];
  // Anti-fraud: never pay commission on your OWN purchase (self-referral) and
  // never credit the same account twice up a chain (cycles).
  const seen = new Set<string>([String(buyer).trim().toLowerCase()]);
  let cur = buyer;
  for (let lvl = 1; lvl <= 3; lvl++) {
    const rr = await pool.query(`SELECT referrer_email FROM referrals WHERE user_email=$1`, [cur]);
    if (!rr.rows[0]) break;
    const earner = String(rr.rows[0].referrer_email);
    if (seen.has(earner.trim().toLowerCase())) { cur = earner; continue; } // skip self / cycle
    seen.add(earner.trim().toLowerCase());
    const tRes = await pool.query(`SELECT tier FROM user_tiers WHERE email=$1`, [earner]);
    const earnerTier = tRes.rows[0] ? Number(tRes.rows[0].tier) : 0;
    const amt = Math.round(amount * RATES[lvl - 1] * 100) / 100;
    const credited = earnerTier >= tier; // gate
    const ins = await pool.query(
      `INSERT INTO referral_earnings(earner_email,source_email,lvl,amount_usdt,base_amount,order_id,credited,purchase_tier)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(order_id,lvl) DO NOTHING RETURNING id`,
      [earner, buyer, lvl, amt, amount, orderId, credited, tier]);
    if ((ins.rowCount || 0) > 0) out.push({ lvl, earner, amount: amt, credited });
    cur = earner;
  }
  return out;
}
export async function setUserTier(pool: any, email: string, tier: number) {
  await pool.query(
    `INSERT INTO user_tiers(email,tier) VALUES($1,$2)
     ON CONFLICT(email) DO UPDATE SET tier=GREATEST(user_tiers.tier,EXCLUDED.tier), updated_at=now()`,
    [email, tier]);
}
