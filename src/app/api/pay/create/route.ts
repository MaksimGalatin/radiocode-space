import { NextRequest, NextResponse } from 'next/server';
import { TIER_AMOUNT, TIER_MONTHLY } from '@/lib/referral';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
export const dynamic = 'force-dynamic';

const BASE = 'https://api.nowpayments.io/v1';
const DEFAULT_SITE = 'https://www.aifa.digital';
const ALLOWED_SITES = new Set(['https://www.aifa.digital','https://aifa.digital','https://www.codeofdigitaleternity.com','https://codeofdigitaleternity.com','https://aifa.works','https://radiocode.space','https://www.radiocode.space']);

// Create a NOWPayments hosted invoice for a tier purchase — for the logged-in
// user only. Amount always comes from the server-side TIER_AMOUNT table.
export async function POST(req: NextRequest) {
  if (!allowRequest(req, 'paycreate', 10, 60 * 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  // Внутренний релей с сестринских сайтов (central/works): они уже проверили
  // сессию у себя и передают email + подписанный секрет. Иначе — своя сессия.
  const internalSecret = process.env.AIFA_INTERNAL_SECRET || '';
  const gotSecret = req.headers.get('x-aifa-internal') || '';
  const internalOk = !!internalSecret && gotSecret.length === internalSecret.length &&
    (await import('crypto')).timingSafeEqual(Buffer.from(gotSecret), Buffer.from(internalSecret));
  const email = internalOk ? String(b?.email || '').trim().toLowerCase() : getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const tier = Number(b?.tier || 0);
  if (!(tier in TIER_AMOUNT)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const isRenewal = String(b?.kind || '') === 'renewal' && tier in TIER_MONTHLY;
  const amount = isRenewal ? TIER_MONTHLY[tier] : TIER_AMOUNT[tier];
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!apiKey || !url) return NextResponse.json({ error: 'not_configured' }, { status: 500 });
  const orderId = `AIFA-T${tier}${isRenewal ? 'R' : ''}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const reqSite = String(b?.site || '');
    const SITE = ALLOWED_SITES.has(reqSite) ? reqSite : DEFAULT_SITE;
    await pool.query(`INSERT INTO pay_orders(order_id,email,tier,amount,status) VALUES($1,$2,$3,$4,'pending')`, [orderId, email, tier, amount]);
    const inv = await fetch(`${BASE}/invoice`, {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price_amount: amount, price_currency: 'usd', order_id: orderId,
        order_description: `AIfa CODE tier ${tier}${isRenewal ? ' (monthly renewal)' : ''}`,
        // ВАЖНО: колбэк оплаты ВСЕГДА идёт на платёжный узел (здесь лежит
        // NOWPAYMENTS_IPN_SECRET). На сайтах-сёстрах его нет — они отвергли бы
        // уведомление, и оплаченный тариф не активировался бы.
        ipn_callback_url: `${DEFAULT_SITE}/api/pay/ipn`,
        // А возврат пользователя — на тот сайт, откуда он платил.
        success_url: `${SITE}/cabinet?paid=1`, cancel_url: `${SITE}/cabinet?paid=0`,
      }),
    });
    if (!inv.ok) { await pool.end(); console.error('[pay/create] invoice_failed', await inv.text()); return NextResponse.json({ error: 'invoice_failed' }, { status: 502 }); }
    const j: any = await inv.json();
    await pool.query(`UPDATE pay_orders SET np_id=$2 WHERE order_id=$1`, [orderId, String(j.id || '')]);
    await pool.end();
    return NextResponse.json({ ok: true, invoice_url: j.invoice_url, order_id: orderId });
  } catch (e) { console.error('[pay/create]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

// Payment history for the logged-in user.
export async function GET(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const r = await pool.query(
      `SELECT order_id, tier, amount, status, created_at, paid_at FROM pay_orders WHERE email=$1 ORDER BY created_at DESC LIMIT 50`, [email]);
    await pool.end();
    return NextResponse.json({ ok: true, orders: r.rows });
  } catch (e) { console.error('[pay/history]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
