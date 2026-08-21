import type { NextRequest } from 'next/server';

/**
 * Minimal in-process rate limiter — dependency-free and FAIL-OPEN.
 *
 * Edge shield for the AIfa chat endpoint on aifa.digital. The chat now proxies to
 * the central brain, so this is the *edge* per-IP limit the brief requires. Per-
 * serverless-instance (not globally shared), so a safety net rather than a hard
 * quota. Limits are generous; any internal error returns "allowed" so the limiter
 * can never take chat down.
 */

type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();
const MAX_KEYS = 20000; // crude memory cap against key explosion

/**
 * Сверка секрета за постоянное время.
 *
 * Обычное сравнение строк обрывается на первом несовпавшем знаке, поэтому
 * время ответа зависит от числа угаданных знаков и секрет подбирается
 * посимвольно. Владение этим секретом даёт доверие к заголовку с чужим
 * адресом — то есть подбор стоит того, чтобы его закрыть.
 *
 * Модуль объявлен «без зависимостей», поэтому `crypto` берётся мягко: если его
 * в среде нет (пограничный слой), сравнение откатывается на прежнее поведение
 * и ничего не ломается.
 *
 * Разную длину `timingSafeEqual` сравнивать отказывается, поэтому длина
 * проверяется отдельно: её утечка безобидна, она и так видна по заголовку.
 */
function секретСовпал(пришло: string | null | undefined, ожидается: string | undefined): boolean {
  if (!ожидается || !пришло) return false;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto') as typeof import('crypto');
    const a = Buffer.from(пришло, 'utf8');
    const b = Buffer.from(ожидается, 'utf8');
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    // Среда без node:crypto — ведём себя как прежде, чтобы не сломать работу.
    return пришло === ожидается;
  }
}

/**
 * Best-effort client IP. Vercel/nginx set x-real-ip (not client-spoofable).
 *
 * ВЫРОВНЕНО С ЦЕНТРАЛЬНЫМ 20.08.2026 (раздел 9). Сайты-сёстры пересылают вход
 * через свой сервер и кладут настоящий адрес человека в `x-aifa-client-ip`.
 * Приёмником пересылки сегодня работает только центральный, поэтому здесь эта
 * ветка ничего не меняет — но библиотека обязана быть одинаковой на всех
 * четырёх сайтах, иначе следующая правка ляжет туда, где основы нет.
 *
 * Заголовку верим ТОЛЬКО вместе с общим внутренним секретом: без
 * `AIFA_INTERNAL_SECRET` в окружении ветка не срабатывает вовсе, и поведение
 * остаётся ровно таким, каким было до этой правки.
 */
export function getClientIp(req: NextRequest): string {
  const internal = process.env.AIFA_INTERNAL_SECRET || '';
  const relayed = req.headers.get('x-aifa-client-ip');
  if (relayed && секретСовпал(req.headers.get('x-aifa-internal'), internal)) {
    return relayed.split(',')[0].trim() || 'unknown';
  }
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/**
 * Returns true if the request is allowed, false if it exceeds `limit` within
 * `windowMs`. Never throws.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  try {
    const now = Date.now();
    const b = store.get(key);
    if (!b || now > b.resetAt) {
      if (store.size > MAX_KEYS) store.clear();
      store.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    b.count++;
    return b.count <= limit;
  } catch {
    return true; // fail-open
  }
}

/**
 * Convenience: rate-limit a request by IP under a named bucket. Returns true if
 * allowed. Unknown IPs are always allowed (avoids blocking everyone if the proxy
 * header is missing).
 */
export function allowRequest(req: NextRequest, bucket: string, limit: number, windowMs: number): boolean {
  const ip = getClientIp(req);
  if (ip === 'unknown') return true;
  return rateLimit(`${bucket}:${ip}`, limit, windowMs);
}
