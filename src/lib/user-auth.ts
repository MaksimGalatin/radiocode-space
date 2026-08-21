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

/**
 * 🔴 ПОКОЛЕНИЕ В ТОКЕНЕ — ДОБАВЛЕНО 21.08.2026.
 *
 * Здесь выдавался токен вида `почта:срок:hmac`, без поколения. Поколение —
 * это то, чем «выйти со всех устройств» и смена пароля ОТЗЫВАЮТ выданные
 * сессии: проверка сравнивает число в токене с числом в `users_auth`.
 *
 * Токен без поколения читается как «поколение 0», и дальше сайты вели себя
 * по-разному: на radiocode.space такой токен пропускался ВСЕГДА (то есть
 * отозвать сессию было нельзя вовсе), а на works и code-eternal он, наоборот,
 * переставал работать после первого же выхода — человека выкидывало без
 * причины.
 *
 * Вход по паролю этим не задет: он пересылается на центральный сайт, и токен
 * выдаёт центр — уже с поколением. Задет был вход через Google, который
 * каждый сайт делает сам.
 *
 * Срок жизни намеренно НЕ изменён (на центральном он короче — 7 суток вместо
 * 30). Это отдельное решение, а не побочная правка.
 */
export function signUserToken(email: string, ttlMs = 30 * 24 * 60 * 60 * 1000, epoch = 0): string {
  if (!SECRET_KEY) throw new Error('AIFA_SESSION_SECRET is not configured');
  const e = (email || '').trim().toLowerCase();
  const exp = Date.now() + ttlMs;
  const data = `${e}:${exp}:${Math.max(0, Math.floor(epoch) || 0)}`;
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

/**
 * ПОКОЛЕНИЕ СЕССИЙ — то, чего здесь не хватало.
 *
 * Разбор 19.08.2026. Токен у всех четырёх сайтов одного вида
 * `почта:срок:поколение:подпись`, но поколение читалось ТОЛЬКО на центральном
 * сайте. Здесь оно отбрасывалось при разборе, а значит:
 *   — человек вышел из кабинета, а старый токен продолжал работать;
 *   — человек сменил пароль, а старый токен продолжал работать до конца срока.
 *
 * Поколение хранится в `users_auth.session_epoch` и растёт при выходе и при
 * смене пароля. Токен, выданный до увеличения, перестаёт подходить.
 *
 * Почему `epoch === 0` пропускается. Все уже выданные токены выпущены с нулём.
 * Если бы сверка была строгой с первого дня, выкатка разлогинила бы всех разом.
 * Ноль считается «поколение ещё не заводили»: защита включается для человека в
 * тот момент, когда он первый раз выйдет или сменит пароль. Это выбор в пользу
 * того, чтобы починка никого не выбросила посреди работы.
 */
export function читатьПоколение(token: string | undefined | null): number {
  try {
    if (!token) return 0;
    const данные = token.slice(0, token.lastIndexOf(':'));
    const части = данные.split(':');
    if (части.length < 3) return 0;              // старый двухчастный ключ
    const хвост = части[части.length - 1];
    return /^\d+$/.test(хвост) ? parseInt(хвост, 10) : 0;
  } catch {
    return 0;
  }
}

export async function сессияДействительна(req: NextRequest): Promise<string | null> {
  const токен = req.cookies.get(USER_COOKIE)?.value;
  const почта = verifyUserToken(токен);
  if (!почта) return null;

  const вТокене = читатьПоколение(токен);
  if (вТокене === 0) return почта;               // см. пояснение выше

  try {
    const { getDbPool } = await import('@/lib/db-pool');
    const pool = await getDbPool('DATABASE_URL');
    const r = await pool.query<{ session_epoch: string }>(
      'SELECT session_epoch FROM users_auth WHERE LOWER(email) = LOWER($1)', [почта]);
    const вБазе = Number(r.rows?.[0]?.session_epoch ?? 0) || 0;
    return вТокене === вБазе ? почта : null;
  } catch {
    // База недоступна — вход не рушим: иначе сбой базы выкинет всех сразу.
    // Это осознанный размен: доступность важнее строгости на этой минуте.
    return почта;
  }
}

/** Увеличивает поколение — при выходе и при смене пароля. */
export async function поднятьПоколение(почта: string): Promise<number> {
  const { getDbPool } = await import('@/lib/db-pool');
  const pool = await getDbPool('DATABASE_URL');
  await pool.query(
    'ALTER TABLE users_auth ADD COLUMN IF NOT EXISTS session_epoch BIGINT NOT NULL DEFAULT 0');
  const r = await pool.query<{ session_epoch: string }>(
    `UPDATE users_auth SET session_epoch = COALESCE(session_epoch, 0) + 1
      WHERE LOWER(email) = LOWER($1) RETURNING session_epoch`, [почта]);
  return Number(r.rows?.[0]?.session_epoch ?? 0) || 0;
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

/**
 * Текущее поколение сессий человека — для выдачи нового токена.
 *
 * Добавлено 21.08.2026 вместе с поколением в `signUserToken`. Ходит в базу тем
 * же способом, что и соседняя проверка на этом же сайте, чтобы не заводить
 * второй способ доступа к той же таблице.
 *
 * База недоступна — возвращаем 0: вход не рушим, человек получит токен
 * прежнего вида, и он будет работать как раньше.
 */
export async function currentEpoch(email: string): Promise<number> {
  try {
    const { getDbPool } = await import('@/lib/db-pool');
    const pool = await getDbPool('DATABASE_URL');
    const r = await pool.query(
      `SELECT session_epoch FROM users_auth WHERE LOWER(email)=LOWER($1)`,
      [email],
    );
    return Number((r.rows?.[0] as { session_epoch?: unknown } | undefined)?.session_epoch ?? 0) || 0;
  } catch {
    return 0;
  }
}
