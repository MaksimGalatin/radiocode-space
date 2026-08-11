import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE, userCookieOptions } from './user-auth';

/**
 * Server-side proxy to the CENTRAL auth API. Forwards the request body to
 * `${AIFA_CENTRAL_API}/api/auth/<path>` and RELAYS the central `user_session`
 * cookie onto THIS (radiocode.space) domain — so one account logs the user into
 * all sites. The session secret (AIFA_SESSION_SECRET) is shared, so the relayed
 * token verifies locally too.
 *
 * IMPORTANT: the cookie MUST be set via `res.cookies.set()` (the framework path),
 * NOT a manual `headers.append('Set-Cookie', ...)`. On Vercel the edge preserves
 * framework-set cookies but drops a hand-appended Set-Cookie on responses it deems
 * cacheable — that was why cabinet login silently did nothing on radiocode.
 */
const CENTRAL = (process.env.AIFA_CENTRAL_API || 'https://www.codeofdigitaleternity.com').replace(/\/$/, '');

function extractCookieFrom(headers: Headers, name: string): string | null {
  // Node/undici hides multiple Set-Cookie behind getSetCookie(); .get('set-cookie')
  // can return null or a comma-joined string. Try the robust API first, then fall back.
  const list: string[] =
    typeof (headers as any).getSetCookie === 'function' ? (headers as any).getSetCookie() : [];
  const candidates = list.length ? list : [headers.get('set-cookie') || ''];
  for (const sc of candidates) {
    const m = new RegExp(`(?:^|[,;\\s])${name}=([^;]+)`).exec(sc);
    if (m) return decodeURIComponent(m[1]);
  }
  return null;
}

export async function relayAuth(req: NextRequest, path: string): Promise<NextResponse> {
  let body = '';
  try { body = await req.text(); } catch { /* empty body ok */ }
  // Пробрасываем РЕАЛЬНЫЙ IP клиента: иначе центр видит один и тот же адрес
  // нашего сервера для всех посетителей — его лимитер по IP срабатывает
  // глобально, и одного «долбящего» хватало, чтобы заблокировать вход ВСЕМ.
  const clientIp = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const relayHeaders: Record<string, string> = { 'Content-Type': 'application/json' };
  const internal = process.env.AIFA_INTERNAL_SECRET || '';
  if (clientIp && internal) {
    relayHeaders['x-aifa-client-ip'] = clientIp;
    relayHeaders['x-aifa-internal'] = internal;
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${CENTRAL}/api/auth/${path}`, {
      method: 'POST',
      headers: relayHeaders,
      body: body || '{}',
    });
  } catch (err) {
    return NextResponse.json({ error: 'Auth service unavailable' }, { status: 502 });
  }

  const text = await upstream.text();
  const res = new NextResponse(text, {
    status: upstream.status,
    headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
  });

  // Relay the session cookie onto our domain (httpOnly, same options as central).
  const token = extractCookieFrom(upstream.headers, USER_COOKIE);
  if (token) res.cookies.set(USER_COOKIE, token, userCookieOptions());
  return res;
}

/**
 * То же, что relayAuth, но для GET-ручек (живая проверка никнейма).
 * Куку не перекладывает: проверка доступности имени сессии не создаёт.
 */
export async function relayGetAuth(req: NextRequest, path: string): Promise<NextResponse> {
  const запрос = new URL(req.url);
  const clientIp = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const internal = process.env.AIFA_INTERNAL_SECRET || '';
  const headers: Record<string, string> = {};
  if (clientIp && internal) {
    headers['x-aifa-client-ip'] = clientIp;
    headers['x-aifa-internal'] = internal;
  }
  try {
    const upstream = await fetch(`${CENTRAL}/api/auth/${path}${запрос.search}`, { headers });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
    });
  } catch {
    return NextResponse.json({ available: false, reason: 'Service unavailable' }, { status: 502 });
  }
}
