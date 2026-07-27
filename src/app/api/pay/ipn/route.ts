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

// NOWPayments IPN. Verifies HMAC-SHA512, then on a paid status upgrades the
// buyer's tier and credits the 3-level referral chain (idempotent per order).
export async function POST(req: Request) {
  const secret = process.env.NOWPAYMENTS_IPN_SECRET || '';
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  let bodyText = ''; try { bodyText = await req.text(); } catch {}
  let body: any = {}; try { body = JSON.parse(bodyText); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const sig = req.headers.get('x-nowpayments-sig') || '';
  if (!verify(body, sig, secret)) return NextResponse.json({ error: 'bad_signature' }, { status: 401 });

  const status = String(body.payment_status || '');
  const orderId = String(body.order_id || '');
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
    const credited = await creditReferralChain(pool, email, amount, tier, orderId);
    await pool.end();
    return NextResponse.json({ ok: true, tier, credited });
  } catch (e) { console.error('[pay/ipn]', e); await alertOwner('Payment IPN failed', String((e as any)?.message || e), 'aifa.digital'); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
