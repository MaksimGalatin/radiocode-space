import { NextRequest, NextResponse } from 'next/server';
import { getFreshSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
export const dynamic = 'force-dynamic';

/**
 * ДОКУПКА ВЕЧНОЙ ПАМЯТИ — ретранслятор сайта к узлу оплаты aifa.digital.
 * 24.09.2026. Одинаковый файл на всех четырёх сайтах (раздел 51).
 *
 * GET  — цены пакетов на эту минуту (Arweave + курс AR + 10 % комиссии).
 * POST { mb } — заказ пакета; почта берётся ТОЛЬКО из сессии, не из тела.
 */
const УЗЕЛ = 'https://www.aifa.digital/api/pay/memory';

async function узел(тело: Record<string, unknown>) {
  const secret = process.env.AIFA_INTERNAL_SECRET || '';
  if (!secret) return { status: 500, j: { error: 'not_configured' } };
  const r = await fetch(УЗЕЛ, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-aifa-internal': secret },
    body: JSON.stringify(тело),
    signal: AbortSignal.timeout(25000),
    cache: 'no-store',
  });
  return { status: r.status, j: await r.json().catch(() => ({})) };
}

export async function GET(req: NextRequest) {
  if (!allowRequest(req, 'memextraq', 60, 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  try {
    const { status, j } = await узел({ quote: true });
    return NextResponse.json(j, { status });
  } catch { return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 }); }
}

export async function POST(req: NextRequest) {
  const email = await getFreshSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!allowRequest(req, 'memextra', 10, 60 * 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  try {
    const { status, j } = await узел({ email, mb: Number(b?.mb), site: req.nextUrl.origin });
    return NextResponse.json(j, { status });
  } catch { return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 }); }
}
