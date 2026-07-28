import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { setPin, clearPin, hasPin } from '@/lib/account-security';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Ограничение частоты: подбор ПИН-кода.
  if (!allowRequest(req as NextRequest, 'account_pin', 10, 900000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  return NextResponse.json({ ok: true, hasPin: await hasPin(email) });
}
export async function POST(req: NextRequest) {
  // Ограничение частоты: подбор ПИН-кода.
  if (!allowRequest(req as NextRequest, 'account_pin', 10, 900000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let b: any = {}; try { b = await req.json(); } catch {}
  if (b.action === 'set') {
    if (!/^\d{4,8}$/.test(String(b.pin || ''))) return NextResponse.json({ error: 'bad_pin_format' }, { status: 400 });
    await setPin(email, String(b.pin)); return NextResponse.json({ ok: true, hasPin: true });
  }
  if (b.action === 'clear') { await clearPin(email); return NextResponse.json({ ok: true, hasPin: false }); }
  return NextResponse.json({ error: 'bad_request' }, { status: 400 });
}
