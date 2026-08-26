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
// Держатель Digital DNA с просроченным $200/мес — на ПАУЗЕ: пока пауза длится,
// новые амбассадорские комиссии ему не начисляются и вывод недоступен, до
// продления. Проверка идёт в реальном времени (next_due < now), поэтому пауза
// наступает сразу, а не по расписанию. Нет строки подписки (или таблицы ещё
// нет) — значит не на паузе.
//
// 14.08.2026: раньше эта проверка была ТОЛЬКО на aifa.digital, а база у всех
// четырёх сайтов общая — просроченный амбассадор получал комиссию, если платёж
// прошёл на любом другом сайте. Перенесено дословно, чтобы правило было одним,
// а не похожим.
/**
 * Приостановлен ли тариф — то есть НЕ идут ли выплаты этому человеку.
 *
 * Требование Архитектора 25.08.2026: «все тарифы — на месяц и должны
 * ставиться на паузу, если не прошла оплата… выплаты от рефералов не идут
 * при неоплаченном тарифе».
 *
 * ПОЧЕМУ ЗДЕСЬ ДВЕ ТАБЛИЦЫ, А БЫЛА ОДНА. Прежняя проверка смотрела ТОЛЬКО в
 * `subscriptions`. Замер 26.08.2026: в `subscriptions` НОЛЬ строк, а правда о
 * тарифах живёт в `user_tiers` (6 строк, со сроком оплаты и меткой паузы).
 * То есть проверка была написана верно, но по пустому месту: она всегда
 * возвращала false, и выплаты шли даже при просроченной оплате. Тихий
 * неверный ответ — он и опаснее падения: падение видно.
 *
 * Порядок именно такой: сначала `user_tiers` (там правда), потом прежняя
 * проверка по `subscriptions` — её не убираем, вдруг таблицу начнут вести.
 */
export async function isPaused(pool: any, email: string): Promise<boolean> {
  const em = String(email || '').trim().toLowerCase();

  // 1. Правда о тарифе: явная пауза ИЛИ истёкший срок оплаты.
  try {
    const r = await pool.query(
      `SELECT 1 FROM user_tiers
        WHERE lower(email)=$1
          AND (paused_at IS NOT NULL
               OR (paid_until IS NOT NULL AND paid_until < now()))
        LIMIT 1`, [em]);
    if ((r.rowCount || 0) > 0) return true;
  } catch {
    // Столбцов может не быть на старой копии базы — тогда просто идём дальше,
    // а не объявляем человека оплатившим.
  }

  // 2. Прежняя проверка. Оставлена целиком (раздел 19: только добавлять).
  try {
    const r = await pool.query(`SELECT 1 FROM subscriptions WHERE email=$1 AND next_due < now() LIMIT 1`, [email]);
    return (r.rowCount || 0) > 0;
  } catch { return false; }
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
    const paused = await isPaused(pool, earner);
    const credited = earnerTier >= tier && !paused; // уровень + действующая подписка
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
