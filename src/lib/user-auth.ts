/**
 * Per-user session auth for aifa.digital. IDENTICAL HMAC scheme + secret to the
 * central site, so a `user_session` cookie minted by central is valid here too
 * (one login → all three sites). Set AIFA_SESSION_SECRET identically everywhere.
 *
 * SECURITY: fail-closed. If no secret is configured, tokens can neither be
 * signed nor verified — never fall back to a hardcoded value.
 */

import crypto from 'crypto';
import type { NextRequest } from 'next/server';

// Ключ подписи сессий — ТОЛЬКО AIFA_SESSION_SECRET. Запасной ветки нет.
//
// Здесь стояло `|| process.env.NOWPAYMENTS_IPN_SECRET`. Этот секрет некогда
// лежал зашитым прямо в исходнике и навсегда остался в истории репозитория —
// то есть известен всякому, кто её прочитал. Куки сессий действительны сразу на
// трёх сайтах, поэтому подпись известным значением означает вход под ЛЮБЫМ
// адресом на всех трёх.
//
// Убрана 06.08.2026 после замера `vercel env ls production`:
// `AIFA_SESSION_SECRET` задан во всех четырёх проектах. Отказ теперь закрытый —
// без ключа нельзя ни подписать, ни проверить.
const SECRET_KEY = process.env.AIFA_SESSION_SECRET || '';

export const USER_COOKIE = 'user_session';

export function signUserToken(email: string, ttlMs = 30 * 24 * 60 * 60 * 1000): string {
  if (!SECRET_KEY) throw new Error('AIFA_SESSION_SECRET is not configured');
  const e = (email || '').trim().toLowerCase();
  const exp = Date.now() + ttlMs;
  const data = `${e}:${exp}`;
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
  return `${data}:${hmac}`;
}

export function verifyUserToken(token: string | undefined | null): string | null {
  try {
    if (!token || !SECRET_KEY) return null;
    const idx = token.lastIndexOf(':');
    if (idx < 0) return null;
    const hmac = token.slice(idx + 1);
    const data = token.slice(0, idx);
    const sep = data.lastIndexOf(':');
    if (sep < 0) return null;
    /**
     * ДВА ФОРМАТА КЛЮЧА, А НЕ ОДИН (16.08.2026).
     *
     * Центральный сайт выдаёт `почта:срок:поколение` — поколение позволяет
     * ОТОЗВАТЬ выданные сессии при смене пароля. Здесь разбор понимал только
     * старый `почта:срок`: у трёхчастного ключа за срок принималось поколение
     * («0»), проверка `Date.now() > 0` срабатывала всегда, и вход отвергался.
     *
     * Снаружи это выглядело так: человек вошёл на codeofdigitaleternity.com или
     * aifa.works, открыл radiocode.space — и он там НЕ авторизован, хотя по
     * разделу 9 Конституции учётная запись у всех четырёх сайтов общая.
     * Проверено живым запросом: центр отвечал 200, радио — 401.
     */
    let email = data.slice(0, sep);
    let expStr = data.slice(sep + 1);
    if (!/^\d+$/.test(expStr)) return null;
    // Трёхчастный ключ: последний кусок — поколение, срок стоит перед ним.
    const предыдущий = email.lastIndexOf(':');
    if (предыдущий >= 0 && /^\d+$/.test(email.slice(предыдущий + 1))) {
      expStr = email.slice(предыдущий + 1);
      email = email.slice(0, предыдущий);
    }
    if (Date.now() > parseInt(expStr, 10)) return null;
    const expected = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
    if (hmac.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))) return null;
    return email;
  } catch {
    return null;
  }
}

export function getSessionEmail(req: NextRequest): string | null {
  return verifyUserToken(req.cookies.get(USER_COOKIE)?.value);
}

export function userCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  };
}
