import { NextRequest, NextResponse } from 'next/server';
import { сессияДействительна } from '@/lib/user-auth';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
export const dynamic = 'force-dynamic';

// ОПЛАТА ИДЁТ ЧЕРЕЗ ЕДИНЫЙ ПЛАТЁЖНЫЙ УЗЕЛ — переведено 22.08.2026.
//
// Было: этот файл сам ходил в NOWPayments, а значит на radiocode.space должен
// был лежать `NOWPAYMENTS_API_KEY`. Ключ был развёрнут на большем числе
// площадок, чем нужно: четыре сайта вместо одного. Каждая лишняя площадка —
// это ещё одно место, откуда ключ может утечь, и ещё одно, которое придётся
// обновлять при отзыве.
//
// Стало: как на central и works — проверяем СВОЮ сессию, релеим запрос на узел
// внутренним секретом. Ключ NOWPayments остаётся ровно в одном месте.
// Замер до правки: `NOWPAYMENTS_API_KEY` встречался в radiocode-space ровно в
// одном файле — в этом. После правки — ни в одном.
//
// Возврат после оплаты. Узел ставит `success_url` по полю `site`, но принимает
// его только из своего белого списка. Поэтому 22.08 в списке узла
// (`code-eternal/web/src/app/api/pay/create/route.ts`) добавлены оба написания
// radiocode.space — иначе человек, заплативший отсюда, вернулся бы на
// aifa.digital. Порядок правок был именно такой: сначала узел, потом эта.
//
// Колбэк оплаты (IPN) сюда не приходит и не должен: `NOWPAYMENTS_IPN_SECRET`
// лежит на узле, здесь его нет, и уведомление было бы отвергнуто.
const PAY_HUB = 'https://www.aifa.digital/api/pay/create';
const SITE = 'https://radiocode.space';

export async function POST(req: NextRequest) {
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  // Счёт в базе, а не в памяти: создание платежа — денежная ручка, а память
  // процесса на Vercel своя у каждого экземпляра и обнуляется при выкладке.
  // Проверка стояла здесь и до правки — сохранена как была.
  const адрес_paycreate = clientIp(req as never);
  if (адрес_paycreate !== 'unknown' && !(await dbRateLimit(`paycreate:${адрес_paycreate}`, 10, 60 * 60_000))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let b: any = {}; try { b = await req.json(); } catch {}
  const tier = Number(b?.tier || 0);
  // Намерение «продление» пропускаем на узел как есть: сумму по нему считает
  // узел из своей таблицы, здесь никаких сумм больше нет и быть не должно.
  const kind = b?.kind === 'renewal' ? 'renewal' : undefined;

  const secret = process.env.AIFA_INTERNAL_SECRET || '';
  if (!secret) return NextResponse.json({ error: 'not_configured' }, { status: 500 });

  try {
    const r = await fetch(PAY_HUB, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-aifa-internal': secret },
      body: JSON.stringify({ tier, email, site: SITE, kind }),
      signal: AbortSignal.timeout(20000),
    });
    const j: any = await r.json().catch(() => ({}));
    if (r.ok && j.invoice_url) return NextResponse.json({ ok: true, invoice_url: j.invoice_url, order_id: j.order_id });
    return NextResponse.json({ error: j.error || 'invoice_failed' }, { status: 502 });
  } catch (e) { console.error('[pay/create relay]', e); return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 }); }
}

// История платежей — из общей БД, по своей сессии. Не менялась: она читает
// таблицу напрямую и к NOWPayments не ходит.
export async function GET(req: NextRequest) {
  const email = await сессияДействительна(req);
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
