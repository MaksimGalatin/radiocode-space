import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail, сессияДействительна } from '@/lib/user-auth';
import { requestDeletion } from '@/lib/account-security';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// GDPR erasure with a 72h grace period + optional PIN + email confirmation.
// Does NOT delete immediately — schedules deletion so the owner can cancel.
export async function POST(req: NextRequest) {
  // Ограничение частоты: удаление аккаунта — необратимо.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_account_delete = clientIp(req as never);
  if (адрес_account_delete !== 'unknown' && !(await dbRateLimit(`account_delete:${адрес_account_delete}`, 5, 3600000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const siteBase = `https://${req.headers.get('host') || 'www.codeofdigitaleternity.com'}`;
  const r = await requestDeletion(email, clientIp(req), b?.pin, siteBase);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.error === 'bad_pin' ? 403 : 500 });
  return NextResponse.json({ ok: true, scheduled: true, scheduledAt: r.scheduledAt, graceHours: 72 });
}
