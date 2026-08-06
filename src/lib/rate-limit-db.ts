/**
 * Общий счётчик частоты запросов на все инстансы и все три сайта (одна база).
 *
 * Почему HTTP-драйвер, а не Pool. Раньше на КАЖДУЮ проверку открывалось новое
 * соединение к Neon (`new Pool(...)` → `pool.end()`). При обычной посещаемости
 * это незаметно, но под первым же наплывом или примитивным флудом лимитер сам
 * съел бы пул соединений базы и уронил сайт — то есть защита превратилась бы в
 * уязвимость. Драйвер `neon()` ходит по HTTP без постоянного соединения и
 * создаётся один раз на инстанс.
 *
 * Локальный щит. Если ключ уже превысил лимит, инстанс запоминает это до конца
 * окна и БОЛЬШЕ НЕ ХОДИТ В БАЗУ вовсе — при флуде с одного адреса нагрузка на
 * базу падает до нуля, а отказ отдаётся мгновенно.
 *
 * Окно фиксированное, обновление атомарное. Fail-OPEN: любая ошибка базы
 * означает «пропустить», чтобы лимитер никогда не мог положить сайт.
 */
import type { NextRequest } from 'next/server';

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

type SqlFn = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Record<string, unknown>[]>;
let sqlClient: SqlFn | null = null;
let sqlUrl = '';

async function getSql(): Promise<SqlFn | null> {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return null;
  if (sqlClient && sqlUrl === url) return sqlClient;
  const { neon } = await import('@neondatabase/serverless');
  sqlClient = neon(url) as unknown as SqlFn;
  sqlUrl = url;
  return sqlClient;
}

/** Ключи, уже превысившие лимит: до конца окна в базу по ним не ходим. */
const blocked = new Map<string, number>();
const MAX_BLOCKED = 50_000;

/** Возвращает true, если запрос разрешён. Никогда не бросает исключений. */
export async function dbRateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const now = Date.now();

  const until = blocked.get(key);
  if (until !== undefined) {
    if (until > now) return false;      // уже заблокирован — базу не трогаем
    blocked.delete(key);
  }

  try {
    const sql = await getSql();
    if (!sql) return true;              // база не настроена → не блокируем
    const resetAt = now + windowMs;
    const rows = await sql`
      INSERT INTO rate_limits(k, count, reset_at) VALUES(${key}, 1, ${resetAt})
      ON CONFLICT (k) DO UPDATE SET
        count = CASE WHEN rate_limits.reset_at < ${now} THEN 1 ELSE rate_limits.count + 1 END,
        reset_at = CASE WHEN rate_limits.reset_at < ${now} THEN ${resetAt} ELSE rate_limits.reset_at END
      RETURNING count, reset_at`;
    const row = rows && rows[0];
    if (!row) return true;
    const count = Number(row.count);
    if (count > limit) {
      if (blocked.size > MAX_BLOCKED) blocked.clear();
      blocked.set(key, Number(row.reset_at) || now + windowMs);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[dbRateLimit]', e);
    return true;                        // fail-open
  }
}

/**
 * То же самое, но счётчик растёт не на единицу, а на переданную величину.
 *
 * Нужно там, где ограничивают не число запросов, а объём: месячный потолок
 * знаков озвучки — сто коротких реплик и одна длинная стоят по-разному, и
 * считать их одинаково значит не считать вовсе.
 *
 * ⚠️ Отличие от `dbRateLimit` в поведении при сбое базы: здесь fail-CLOSED,
 * то есть «нельзя». У обычного лимитера отказ базы не должен ронять сайт, и
 * пропустить — верно. Здесь же за каждым «можно» стоят деньги: не сумев
 * посчитать потраченное, безопаснее промолчать и вернуться на бесплатный голос,
 * чем платить вслепую.
 */
export async function dbRateAdd(
  key: string, amount: number, limit: number, windowMs: number
): Promise<boolean> {
  const now = Date.now();
  const прибавка = Math.max(0, Math.floor(amount)) || 0;
  if (прибавка <= 0) return true;

  const until = blocked.get(key);
  if (until !== undefined) {
    if (until > now) return false;
    blocked.delete(key);
  }

  try {
    const sql = await getSql();
    if (!sql) return false;             // не можем считать траты → не тратим
    const resetAt = now + windowMs;
    const rows = await sql`
      INSERT INTO rate_limits(k, count, reset_at) VALUES(${key}, ${прибавка}, ${resetAt})
      ON CONFLICT (k) DO UPDATE SET
        count = CASE WHEN rate_limits.reset_at < ${now} THEN ${прибавка}
                     ELSE rate_limits.count + ${прибавка} END,
        reset_at = CASE WHEN rate_limits.reset_at < ${now} THEN ${resetAt}
                        ELSE rate_limits.reset_at END
      RETURNING count, reset_at`;
    const row = rows && rows[0];
    if (!row) return false;
    if (Number(row.count) > limit) {
      if (blocked.size > MAX_BLOCKED) blocked.clear();
      blocked.set(key, Number(row.reset_at) || now + windowMs);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[dbRateAdd]', e);
    return false;                       // fail-closed: молчим, но не платим
  }
}

/** Ограничение действия входа сразу по IP и по адресу почты. true — разрешено. */
export async function limitAuth(
  req: NextRequest, bucket: string, email: string,
  ipLimit: number, emailLimit: number, windowMs: number
): Promise<boolean> {
  const ip = clientIp(req);
  const okIp = ip === 'unknown' ? true : await dbRateLimit(`${bucket}:ip:${ip}`, ipLimit, windowMs);
  if (!okIp) return false;
  const em = (email || '').trim().toLowerCase();
  const okEmail = em ? await dbRateLimit(`${bucket}:em:${em}`, emailLimit, windowMs) : true;
  return okEmail;
}

/** Ловушка для ботов: скрытое поле, которое живой человек не заполняет. */
export function honeypotTriggered(body: unknown): boolean {
  const b = body as Record<string, unknown> | null;
  const v = b && (b.website2 ?? b.hp ?? b.company_url);
  return typeof v === 'string' && v.trim().length > 0;
}
