import type { NextRequest } from 'next/server';

/**
 * Unified AIfa — shared helpers for proxying chat/memory to the CENTRAL brain
 * (codeofdigitaleternity.com). One memory, one knowledge base, one provider
 * chain across all three sites. Configured via env on Vercel:
 *   AIFA_CENTRAL_API    = https://www.codeofdigitaleternity.com
 *   AIFA_INTERNAL_SECRET= shared secret (lets us bypass the center's per-IP limit)
 */

export function centralConfig(): { base: string; secret: string } | null {
  const base = process.env.AIFA_CENTRAL_API;
  const secret = process.env.AIFA_INTERNAL_SECRET;
  if (!base || !secret) return null; // not configured → caller uses local logic
  return { base: base.replace(/\/$/, ''), secret };
}

// Per-user memory headers the center needs to scope memory correctly.
const FORWARD_HEADERS = [
  'x-client-key',
  'x-solana-signature',
  'x-solana-publickey',
  'x-solana-timestamp',
];

export function buildCentralHeaders(
  req: NextRequest,
  secret: string,
  extra?: Record<string, string>
): Record<string, string> {
  /**
   * ОТКУДА ПРИШЛА РЕПЛИКА — ГОВОРИМ ЦЕНТРУ ПРЯМО (16.08.2026).
   *
   * Разговор со спутника уходит в центр, и центр записывал его СВОИМ именем:
   * в базе у 338 210 записей из 338 340 пометка сайта пустая или чужая. Из-за
   * этого «на каком сайте мы это говорили» восстановить нельзя, а AIfa не может
   * честно ответить на вопрос про конкретную площадку. Теперь имя площадки
   * едет заголовком и записывается как есть.
   */
  const свойСайт = process.env.SITE_ID || process.env.NEXT_PUBLIC_SITE_ID || '';
  const headers: Record<string, string> = { 'x-aifa-internal': secret, ...(extra || {}) };
  if (свойСайт) headers['x-aifa-origin-site'] = свойСайт;
  for (const name of FORWARD_HEADERS) {
    const v = req.headers.get(name);
    if (v) headers[name] = v;
  }

  /**
   * 🔴 АДРЕС ЧЕЛОВЕКА — ЦЕНТРУ.
   *
   * Раньше мы его не передавали, и для центра ВСЕ наши посетители выглядели
   * одним и тем же обращающимся — нашим собственным сервером. Значит они делили
   * там ОДНУ корзину счётчика частоты: при первом же наплыве люди начали бы
   * блокировать друг друга, а виноватым выглядел бы центр.
   *
   * Центр верит этому заголовку ТОЛЬКО вместе с верным внутренним секретом,
   * который идёт рядом, — иначе кто угодно подставлял бы себе новый адрес на
   * каждый запрос и обходил счётчик вовсе. Ровно такая дыра уже находилась,
   * когда доверяли `X-Forwarded-For` без проверки.
   */
  const адрес =
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '';
  if (адрес) headers['x-aifa-client-ip'] = адрес.slice(0, 45);

  return headers;
}

/** fetch with an abort timeout; returns null instead of throwing. */
/**
 * 🔴 ДВАДЦАТЬ ПЯТЬ СЕКУНД НЕ ХВАТАЛО, И КАБИНЕТ ПОКАЗЫВАЛ ОШИБКУ.
 *
 * Замер живого центра 08.08.2026: разговор с ПОЛНОЙ памятью Архитектора
 * (полмиллиона знаков) собирается и отвечает за 18 секунд. При пределе в 25
 * запас был семь секунд — и под нагрузкой запрос обрывался: в журнале
 * `AbortError: This operation was aborted`, а человек в кабинете видел
 * «Извини, произошла ошибка».
 *
 * Ставим 55 секунд. Верхняя граница здесь не наша: у самого маршрута
 * `maxDuration = 60`, и ждать дольше него бессмысленно — площадка всё равно
 * оборвёт функцию. Пять секунд оставлены на то, чтобы успеть отдать человеку
 * внятный ответ вместо обрыва.
 */
export async function centralFetch(url: string, init: RequestInit, timeoutMs = 55_000): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    console.warn('[AIfa proxy] Central request failed:', String(err));
    return null;
  } finally {
    clearTimeout(timer);
  }
}
