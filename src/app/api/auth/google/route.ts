import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE, signUserToken, userCookieOptions, currentEpoch } from '@/lib/user-auth';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

/**
 * Идентификатор нашего приложения в Google.
 *
 * 🔴 ЗАЧЕМ ЗДЕСЬ ЗАПАСНОЕ ЗНАЧЕНИЕ, ХОТЯ ОБЫЧНО ОНИ ВРЕДНЫ. Раньше цепочка
 * заканчивалась пустой строкой, а проверка адресата стояла под условием
 * `if (CLIENT_ID && ...)`. То есть при незаданной переменной проверка НЕ
 * ВЫПОЛНЯЛАСЬ ВОВСЕ — и вход принимал токен, выписанный ЛЮБЫМ приложением
 * Google. Любой человек, заведя собственное приложение, входил бы под чужим
 * адресом почты. Пустая строка тут была не «нет значения», а «пускать всех».
 *
 * Обычное возражение против запасных значений — что они молча подставляют
 * секрет из исходников. Здесь наоборот: это ПУБЛИЧНЫЙ идентификатор
 * приложения, он и так лежит открытым в разметке кабинета (иначе кнопка входа
 * не работала бы), секретом никогда не был. И подставляется он не вместо
 * защиты, а чтобы защита ВСЕГДА была включена.
 */
const CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '43000852909-cc46aci3anos9hebq9dob75lii886r7s.apps.googleusercontent.com';

/**
 * Real "Sign in with Google". The client sends the Google ID token (JWT
 * `credential` from Google Identity Services). We verify it against Google's
 * tokeninfo endpoint, check the audience == our OAuth client ID and that the
 * email is verified, then mint the standard `user_session` HMAC cookie — the
 * same cookie the email/password flow issues, valid across all three sites.
 */
export async function POST(req: NextRequest) {
  // Ограничение частоты: наплыв входов.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_auth_google = clientIp(req as never);
  if (адрес_auth_google !== 'unknown' && !(await dbRateLimit(`auth_google:${адрес_auth_google}`, 20, 600000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  let credential = '';
  try { const b = await req.json(); credential = (b && b.credential) || ''; } catch { /* noop */ }
  if (!credential) return NextResponse.json({ error: 'No credential' }, { status: 400 });

  let info: any;
  try {
    const r = await fetch(
      'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential),
      { cache: 'no-store' }
    );
    if (!r.ok) return NextResponse.json({ error: 'Invalid Google token' }, { status: 401 });
    info = await r.json();
  } catch {
    return NextResponse.json({ error: 'Google verification unavailable' }, { status: 502 });
  }

  if (!info || !info.email) return NextResponse.json({ error: 'No email in token' }, { status: 401 });
  // Проверка адресата БЕЗУСЛОВНА. Прежнее `if (CLIENT_ID && ...)` пропускало
  // её при пустом значении — то есть ровно тогда, когда она нужнее всего.
  if (info.aud !== CLIENT_ID) return NextResponse.json({ error: 'Wrong audience' }, { status: 401 });
  const verified = info.email_verified === true || info.email_verified === 'true';
  if (!verified) return NextResponse.json({ error: 'Email not verified' }, { status: 401 });
  if (info.exp && Date.now() / 1000 > Number(info.exp)) return NextResponse.json({ error: 'Token expired' }, { status: 401 });

  const email = String(info.email).trim().toLowerCase();
  const res = NextResponse.json({ success: true, email });
  // Поколение сессии вшивается в токен, иначе «выйти везде» его не отзовёт
  // (правка 21.08.2026, подробности в lib/user-auth.ts).
  res.cookies.set(USER_COOKIE, signUserToken(email, undefined, await currentEpoch(email)), userCookieOptions());
  return res;
}
