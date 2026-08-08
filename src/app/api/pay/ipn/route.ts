import { NextResponse } from 'next/server';
import { alertOwner } from '@/lib/alert';
import crypto from 'crypto';
import { creditReferralChain, setUserTier } from '@/lib/referral';
export const dynamic = 'force-dynamic';

function sortedStringify(obj: unknown): string {
  if (Array.isArray(obj)) return `[${obj.map(sortedStringify).join(',')}]`;
  if (obj && typeof obj === 'object') {
    const keys = Object.keys(obj as Record<string, unknown>).sort();
    return `{${keys.map(k => JSON.stringify(k) + ':' + sortedStringify((obj as any)[k])).join(',')}}`;
  }
  return JSON.stringify(obj);
}
function verify(raw: Record<string, unknown>, sig: string, secret: string): boolean {
  if (!secret || !sig) return false;
  const expected = crypto.createHmac('sha512', secret).update(sortedStringify(raw)).digest('hex');
  const a = Buffer.from(sig); const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * ЖУРНАЛ ВХОДЯЩИХ УВЕДОМЛЕНИЙ ОБ ОПЛАТЕ.
 *
 * 🔴 ЗАЧЕМ. До 08.08.2026 уведомление с несошедшейся подписью получало 401 и
 * исчезало бесследно. А несошедшаяся подпись — это ровно два случая, и оба
 * требуют немедленного внимания: либо кто-то стучится к нам со стороны, либо
 * наш секрет разошёлся с настройкой в кабинете шлюза. Во втором случае КАЖДАЯ
 * оплата будет молча отвергаться, люди будут платить и не получать тариф, а мы
 * узнаем об этом от них же — в лучшем случае.
 *
 * Теперь записывается КАЖДОЕ уведомление: сошлась подпись или нет, какой заказ,
 * какой статус, чем кончилось. Тело не пишем целиком — только то, что нужно для
 * разбора: в нём приходят суммы и адреса, и складывать их в журнал незачем.
 *
 * Запись никогда не мешает обработке платежа: любая ошибка журнала гасится.
 * Деньги важнее наблюдаемости.
 */
async function записатьВЖурнал(
  pool: { query: (t: string, v?: unknown[]) => Promise<unknown> },
  данные: { подписьВерна: boolean; заказ: string; статус: string; исход: string },
): Promise<void> {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS pay_ipn_log(
      id bigserial PRIMARY KEY,
      received_at timestamptz NOT NULL DEFAULT now(),
      signature_ok boolean NOT NULL,
      order_id text,
      payment_status text,
      outcome text NOT NULL)`);
    await pool.query(
      `INSERT INTO pay_ipn_log(signature_ok, order_id, payment_status, outcome)
       VALUES($1,$2,$3,$4)`,
      [данные.подписьВерна, данные.заказ || null, данные.статус || null, данные.исход]);
  } catch (e) {
    console.error('[pay/ipn] журнал не записался:', String(e).slice(0, 140));
  }
}

// NOWPayments IPN. Verifies HMAC-SHA512, then on a paid status upgrades the
// buyer's tier and credits the 3-level referral chain (idempotent per order).
export async function POST(req: Request) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET || '';
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  let bodyText = ''; try { bodyText = await req.text(); } catch {}
  let body: any = {}; try { body = JSON.parse(bodyText); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const sig = req.headers.get('x-nowpayments-sig') || '';

  const { Pool: Бассейн } = await import('@neondatabase/serverless');

  if (!verify(body, sig, secret)) {
    // Отдельный короткоживущий пул: до успешной проверки подписи мы ничего не
    // знаем о запросе, и держать общий пул ради чужого стука не нужно.
    const p = new Бассейн({ connectionString: url });
    await записатьВЖурнал(p, {
      подписьВерна: false,
      заказ: String(body?.order_id || ''),
      статус: String(body?.payment_status || ''),
      исход: secret ? 'подпись не сошлась' : 'секрет подписи не задан на этом сайте',
    });
    // Письмо — не чаще раза в час: если секрет разошёлся, шлюз будет долбить
    // повторами, и ежеминутные письма мы просто перестанем читать. А это ровно
    // тот исход, ради предотвращения которого журнал и заводится.
    try {
      const был = await p.query(
        `SELECT count(*)::int AS c FROM pay_ipn_log
          WHERE signature_ok = false AND received_at > now() - interval '1 hour'`);
      if (Number((был as { rows: Array<{ c: number }> }).rows[0]?.c || 0) <= 1) {
        await alertOwner(
          'Уведомление об оплате отвергнуто: подпись не сошлась',
          'Пришло уведомление от платёжного шлюза, но подпись не совпала.\n\n' +
          'Это либо чужой стук, либо — что хуже — наш секрет разошёлся с настройкой ' +
          'в кабинете NOWPayments. Во втором случае КАЖДАЯ оплата сейчас отвергается: ' +
          'люди платят и не получают тариф.\n\n' +
          'Проверить: кабинет NOWPayments -> Settings -> IPN secret key, сверить с ' +
          'переменной NOWPAYMENTS_IPN_SECRET на aifa.digital.\n\n' +
          `Заказ в уведомлении: ${String(body?.order_id || '—')}\n` +
          `Статус в уведомлении: ${String(body?.payment_status || '—')}`,
          'aifa.digital');
      }
    } catch { /* тревога не важнее ответа шлюзу */ }
    await p.end();
    return NextResponse.json({ error: 'bad_signature' }, { status: 401 });
  }

  const status = String(body.payment_status || '');
  const orderId = String(body.order_id || '');

  // Записываем и промежуточные состояния тоже. Именно по ним потом видно, дошёл
  // ли платёж вообще: «waiting -> confirming -> finished» в журнале — это
  // доказательство, а отсутствие последней ступени — след поломки.
  const журнал = new Бассейн({ connectionString: url });
  const исход = !orderId ? 'без номера заказа'
    : !['finished', 'confirmed'].includes(status) ? `промежуточный статус: ${status}`
    : 'принято к выдаче';
  await записатьВЖурнал(журнал, { подписьВерна: true, заказ: orderId, статус: status, исход });
  await журнал.end();

  if (!orderId) return NextResponse.json({ ok: true, ignored: 'no_order' });
  if (!['finished', 'confirmed'].includes(status)) return NextResponse.json({ ok: true, pending: status });

  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    // Atomic claim: only ONE concurrent IPN can flip pending → paid (race-safe).
    const oRes = await pool.query(
      `UPDATE pay_orders SET status='paid', paid_at=now() WHERE order_id=$1 AND status <> 'paid'
       RETURNING email,tier,amount`, [orderId]);
    const order = oRes.rows[0];
    if (!order) { await pool.end(); return NextResponse.json({ ok: true, already: true }); }
    const email = String(order.email); const tier = Number(order.tier); const amount = Number(order.amount);
    await setUserTier(pool, email, tier);
    // Recurring subscription (Digital DNA $200/mo): any tier-3 payment — the
    // initial $1000 or a $200 renewal — extends the paid-through date by 30 days.
    // Shared DB, so this state is the same for all 4 sites (one unified cabinet).
    if (tier === 3) {
      await pool.query(`CREATE TABLE IF NOT EXISTS subscriptions(
        email text PRIMARY KEY, tier int NOT NULL, next_due timestamptz NOT NULL,
        status text NOT NULL DEFAULT 'active', reminded_at timestamptz, updated_at timestamptz DEFAULT now())`);
      await pool.query(
        `INSERT INTO subscriptions(email,tier,next_due,status) VALUES($1,3,now()+interval '30 days','active')
         ON CONFLICT(email) DO UPDATE SET next_due = GREATEST(subscriptions.next_due, now()) + interval '30 days',
           tier=3, status='active', reminded_at=NULL, updated_at=now()`, [email]);
    }
    const credited = await creditReferralChain(pool, email, amount, tier, orderId);
    await pool.end();
    return NextResponse.json({ ok: true, tier, credited });
  } catch (e) { console.error('[pay/ipn]', e); await alertOwner('Payment IPN failed', String((e as any)?.message || e), 'aifa.digital'); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
