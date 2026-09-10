import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import crypto from 'crypto';
import { USER_COOKIE, userCookieOptions, signUserToken, currentEpoch } from '@/lib/user-auth';

export const dynamic = 'force-dynamic';

/**
 * ── СКВОЗНОЙ ВХОД: ПРИЁМ БИЛЕТА ────────────────────────────────────────
 *
 * Пара к `/api/auth/handoff`. Принимает короткоживущий билет, выданный
 * другим нашим сайтом, и ставит СВОЮ куку сессии на ЭТОМ домене.
 *
 * ЗАЧЕМ ОБЕ РУЧКИ НА ВСЕХ ЧЕТЫРЁХ САЙТАХ. Человек может впервые войти где
 * угодно — на радио, на works, на центральном. Хранителем входа назначен
 * центральный сайт: после входа на спутнике браузер один раз заезжает сюда
 * с билетом, и дальше любой другой сайт получает вход у центрального без
 * пароля.
 *
 * ЧТО ПРОВЕРЯЕТСЯ, ПРЕЖДЕ ЧЕМ ПОСТАВИТЬ КУКУ:
 *   • подпись билета общим секретом `AIFA_INTERNAL_SECRET` — сравнение
 *     постоянным временем, чтобы подпись нельзя было подобрать по задержке;
 *   • срок: билет живёт 60 секунд;
 *   • адрес возврата — только наши домены (белый список), иначе это открытый
 *     редирект;
 *   • почта приводится к нижнему регистру и обрезается — она идёт в подпись
 *     собственного токена.
 *
 * ПОЧЕМУ ВЫДАЁТСЯ СВОЙ ТОКЕН, А НЕ ПЕРЕКЛАДЫВАЕТСЯ ЧУЖОЙ. Так вход работает
 * даже если секрет сессии на сайтах когда-нибудь разойдётся: каждый сайт
 * подписывает свою куку сам. И поколение (`epoch`) берётся здесь и сейчас —
 * значит «выйти со всех устройств» гасит и эту сессию тоже.
 */

const СВОИ_ДОМЕНЫ = new Set([
  'codeofdigitaleternity.com',
  'www.codeofdigitaleternity.com',
  'aifa.works',
  'www.aifa.works',
  'aifa.digital',
  'www.aifa.digital',
  'radiocode.space',
  'www.radiocode.space',
]);

function безопасныйВозврат(сырой: string | null, свой: string): string {
  if (!сырой) return свой;
  try {
    const u = new URL(сырой);
    if (u.protocol !== 'https:') return свой;
    if (!СВОИ_ДОМЕНЫ.has(u.hostname)) return свой;
    u.searchParams.delete('aifa_sso');
    u.searchParams.delete('ticket');
    return u.toString();
  } catch {
    return свой;
  }
}

/** Разбирает билет `email:exp:nonce:hmac`. Возвращает почту или null. */
export function разобратьБилет(билет: string, секрет: string): string | null {
  try {
    if (!билет || !секрет) return null;
    const i = билет.lastIndexOf(':');
    if (i < 0) return null;
    const подпись = билет.slice(i + 1);
    const данные = билет.slice(0, i);
    const ожидаемая = crypto.createHmac('sha256', секрет).update(данные).digest('hex');
    if (подпись.length !== ожидаемая.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(подпись), Buffer.from(ожидаемая))) return null;

    const части = данные.split(':');
    if (части.length < 3) return null;
    const почта = (части[0] || '').trim().toLowerCase();
    const срок = Number(части[1]);
    if (!почта || !почта.includes('@')) return null;
    if (!Number.isFinite(срок) || Date.now() > срок) return null;
    return почта;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  // ── ЩИТ ОТ ПЕРЕБОРА ──
  // Билет живёт 60 секунд и подписан общим секретом, но проверка
  // подписи ходит в базу за поколением сессии. Предел не даёт
  // забрасывать нас чужими билетами без счёта.
  const адресВхода = clientIp(req as never);
  if (адресВхода !== 'unknown' && !(await dbRateLimit(`auth_sso:${адресВхода}`, 40, 600000))) {
    return NextResponse.json({ error: 'too_many' }, { status: 429 });
  }
  const свойКорень = `${req.nextUrl.protocol}//${req.nextUrl.host}/`;
  const возврат = безопасныйВозврат(req.nextUrl.searchParams.get('return'), свойКорень);
  const билет = req.nextUrl.searchParams.get('ticket') || '';
  const секрет = process.env.AIFA_INTERNAL_SECRET || '';

  const почта = разобратьБилет(билет, секрет);
  if (!почта) {
    // Плохой или просроченный билет — просто возвращаем человека, без
    // подробностей: незачем сообщать снаружи, что именно не сошлось.
    const назад = new URL(возврат);
    назад.searchParams.set('aifa_sso', 'none');
    const отказ = NextResponse.redirect(назад.toString(), { status: 302 });
    отказ.headers.set('Cache-Control', 'no-store, max-age=0');
    return отказ;
  }

  let поколение = 0;
  try {
    поколение = await currentEpoch(почта);
  } catch {
    поколение = 0;
  }

  const ответ = NextResponse.redirect(возврат, { status: 302 });
  ответ.cookies.set(USER_COOKIE, signUserToken(почта, undefined, поколение), userCookieOptions());
  ответ.headers.set('Cache-Control', 'no-store, max-age=0');
  return ответ;
}
