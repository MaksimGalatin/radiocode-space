import { NextRequest, NextResponse } from 'next/server';
import { сессияДействительна } from '@/lib/user-auth';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Returns the logged-in user's email from the shared user_session cookie, or
// null. Proves cross-domain SSO: a cookie minted by central verifies here too.
export async function GET(req: NextRequest) {
  // Ограничение частоты: частый опрос состояния.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_auth_me = clientIp(req as never);
  if (адрес_auth_me !== 'unknown' && !(await dbRateLimit(`auth_me:${адрес_auth_me}`, 120, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = await сессияДействительна(req);
  return NextResponse.json({ authenticated: !!email, email: email || null });
}
