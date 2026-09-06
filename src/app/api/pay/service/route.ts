import { NextRequest, NextResponse } from 'next/server';
import { allowRequest } from '@/lib/rate-limit';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
export const dynamic = 'force-dynamic';

/**
 * ОПЛАТА АУДИТА ДОСТУПНОСТИ — релей на платёжный узел.
 *
 * Ключи NOWPayments лежат ровно в одном месте — на `aifa.digital`. Сюда они
 * не копируются намеренно: чем меньше мест, где живёт денежный ключ, тем
 * меньше поводов его отзывать.
 *
 * ВХОДА ЗДЕСЬ НЕТ: аудит покупает человек, пришедший на сайт впервые. Почта
 * берётся из формы и проверяется на узле повторно — доверять проверке,
 * сделанной на клиенте, нельзя.
 *
 * ЦЕНУ КЛИЕНТ НЕ ПРИСЫЛАЕТ ВООБЩЕ. Передаётся только `slug` услуги; сумму
 * узел берёт из своей таблицы.
 */

const УЗЕЛ = 'https://www.aifa.digital/api/pay/service';
const САЙТ = 'https://radiocode.space';

export async function POST(req: NextRequest) {
  if (!allowRequest(req, 'payservice', 10, 60 * 60_000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }
  const адрес = clientIp(req as never);
  if (адрес !== 'unknown' && !(await dbRateLimit(`payservice:${адрес}`, 10, 60 * 60_000))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let b: any = {};
  try { b = await req.json(); } catch { /* пустое тело отсеется на узле */ }

  const secret = process.env.AIFA_INTERNAL_SECRET || '';
  if (!secret) return NextResponse.json({ error: 'not_configured' }, { status: 500 });

  try {
    const r = await fetch(УЗЕЛ, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-aifa-internal': secret },
      body: JSON.stringify({
        slug: String(b?.slug || ''),
        email: String(b?.email || ''),
        website: String(b?.website || ''),
        site: САЙТ,
      }),
      signal: AbortSignal.timeout(20000),
    });
    const j: any = await r.json().catch(() => ({}));
    if (r.ok && j.invoice_url) {
      return NextResponse.json({ ok: true, invoice_url: j.invoice_url, order_id: j.order_id });
    }
    return NextResponse.json({ error: j.error || 'invoice_failed' }, { status: r.status || 502 });
  } catch (e) {
    console.error('[pay/service relay]', e);
    return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 });
  }
}
