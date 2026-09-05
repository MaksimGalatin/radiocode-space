/**
 * Журнал проверок AIfaFocus: подтверждаемые отчёты, кэш и статистика.
 *
 * Решает сразу три задачи, которые до сих пор не были решены.
 *
 * 1. ПОДДЕЛКА СЕРТИФИКАТА. Страница /audit-verify строила «сертификат» прямо из
 *    параметров ссылки: любой человек правил адрес на ?score=2000&issues=0 и
 *    получал «A+, превосходное соответствие» с нашим брендом и печатью. Теперь
 *    сертификат существует, только если проверка реально была: у неё есть
 *    номер, и данные тянутся из базы, а не из адресной строки.
 *
 * 2. ПОВТОРЯЕМОСТЬ И ЦЕНА. Одинаковый сайт в течение суток отдаёт байт-в-байт
 *    тот же отчёт из кэша: клиент видит стабильный результат, а мы не платим за
 *    повторный разбор.
 *
 * 3. СТАТИСТИКА. До сих пор AIfaFocus не оставлял в базе ни следа — нельзя было
 *    сказать, сколько сканов сделано и что чаще всего находится.
 *
 * Всё fail-open: если база недоступна, скан отработает как раньше, просто без
 * номера и без кэша.
 */
import crypto from 'crypto';

export type StoredScan = {
  id: string;
  domain: string;
  score: number;
  totalIssues: number;
  provenCount: number;
  engine: string;
  payload: unknown;
  createdAt: string;
};

let tableReady = false;

type Sql = { query: (text: string, params?: unknown[]) => Promise<unknown> };

async function getSql(): Promise<Sql | null> {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return null;
  const { neon } = await import('@neondatabase/serverless');
  return neon(url) as unknown as Sql;
}

function rowsOf(r: unknown): Record<string, unknown>[] {
  if (Array.isArray(r)) return r as Record<string, unknown>[];
  const o = r as { rows?: Record<string, unknown>[] };
  return o?.rows ?? [];
}

async function ensureTable(sql: Sql) {
  if (tableReady) return;
  await sql.query(`
    CREATE TABLE IF NOT EXISTS oracle_scans (
      id           TEXT PRIMARY KEY,
      domain       TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      score        INT  NOT NULL,
      total_issues INT  NOT NULL,
      proven_count INT  NOT NULL DEFAULT 0,
      engine       TEXT,
      locale       TEXT,
      payload      JSONB NOT NULL,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);
  // Отрасль появилась позже таблицы — поэтому отдельной командой, а не в
  // определении: у уже существующей таблицы CREATE TABLE IF NOT EXISTS новые
  // столбцы не добавляет, и без этого сравнение с отраслью молча не работало бы.
  await sql.query(`ALTER TABLE oracle_scans ADD COLUMN IF NOT EXISTS sector TEXT`);
  await sql.query(`CREATE INDEX IF NOT EXISTS oracle_scans_sector_idx ON oracle_scans (sector, created_at DESC)`);
  await sql.query(`CREATE INDEX IF NOT EXISTS oracle_scans_hash_idx ON oracle_scans (content_hash, created_at DESC)`);
  await sql.query(`CREATE INDEX IF NOT EXISTS oracle_scans_domain_idx ON oracle_scans (domain, created_at DESC)`);
  tableReady = true;
}

/**
 * Ключ кэша считается по домену и языку — не по времени.
 * Один сайт в пределах суток обязан давать один и тот же отчёт.
 */
export function scanContentHash(domain: string, locale: string, pages: string[]): string {
  return crypto.createHash('sha256')
    .update(`${domain.toLowerCase()}|${locale}|${[...pages].sort().join(',')}`)
    .digest('hex')
    .slice(0, 32);
}

/** Свежий отчёт по тому же сайту, если он был меньше суток назад. */
export async function findFreshScan(contentHash: string, maxAgeHours = 24): Promise<StoredScan | null> {
  try {
    const sql = await getSql();
    if (!sql) return null;
    await ensureTable(sql);
    const r = await sql.query(
      `SELECT id, domain, score, total_issues, proven_count, engine, payload, created_at
         FROM oracle_scans
        WHERE content_hash = $1 AND created_at > now() - ($2 || ' hours')::interval
        ORDER BY created_at DESC LIMIT 1`,
      [contentHash, String(maxAgeHours)]
    );
    const row = rowsOf(r)[0];
    if (!row) return null;
    return {
      id: String(row.id), domain: String(row.domain), score: Number(row.score),
      totalIssues: Number(row.total_issues), provenCount: Number(row.proven_count),
      engine: String(row.engine || ''), payload: row.payload,
      createdAt: String(row.created_at),
    };
  } catch { return null; }
}

/** Сохранить результат и получить номер, по которому его можно подтвердить. */
export async function saveScan(input: {
  domain: string; contentHash: string; score: number; totalIssues: number;
  provenCount: number; engine: string; locale: string; payload: unknown;
  /** Отрасль, угаданная по сайту. Нужна, чтобы сравнивать с себе подобными. */
  sector?: string | null;
}): Promise<string | null> {
  try {
    const sql = await getSql();
    if (!sql) return null;
    await ensureTable(sql);
    // Номер короткий и читаемый вслух — его будут диктовать по телефону.
    const id = crypto.randomBytes(8).toString('hex').toUpperCase().replace(/(.{4})/g, '$1-').replace(/-$/, '');
    await sql.query(
      `INSERT INTO oracle_scans(id, domain, content_hash, score, total_issues, proven_count, engine, locale, payload, sector)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [id, input.domain.toLowerCase(), input.contentHash, input.score, input.totalIssues,
       input.provenCount, input.engine, input.locale, JSON.stringify(input.payload),
       input.sector || null]
    );
    return id;
  } catch { return null; }
}

/** Достать проверку по номеру — для страницы подтверждения. */
export async function getScanById(id: string): Promise<StoredScan | null> {
  try {
    if (!/^[0-9A-F-]{8,24}$/i.test(id)) return null;
    const sql = await getSql();
    if (!sql) return null;
    await ensureTable(sql);
    const r = await sql.query(
      `SELECT id, domain, score, total_issues, proven_count, engine, payload, created_at
         FROM oracle_scans WHERE id = $1 LIMIT 1`,
      [id.toUpperCase()]
    );
    const row = rowsOf(r)[0];
    if (!row) return null;
    return {
      id: String(row.id), domain: String(row.domain), score: Number(row.score),
      totalIssues: Number(row.total_issues), provenCount: Number(row.proven_count),
      engine: String(row.engine || ''), payload: row.payload,
      createdAt: String(row.created_at),
    };
  } catch { return null; }
}

/**
 * Предыдущая проверка того же сайта — чтобы показать «было / стало».
 *
 * ЗАЧЕМ. Человек чинит сайт и хочет увидеть, что усилия дали результат. Без
 * сравнения он получает просто новое число и вынужден верить нам на слово, что
 * стало лучше. С сравнением он видит: эта находка исчезла, эта появилась.
 * Данные для этого уже лежат в базе — не хватало только выборки.
 *
 * Берётся ближайшая по времени проверка ТОГО ЖЕ домена, сделанная РАНЬШЕ
 * указанной. Именно раньше: сравнивать с более поздней бессмысленно.
 */
export async function findPreviousScan(domain: string, before: string, notId: string): Promise<StoredScan | null> {
  try {
    const sql = await getSql();
    if (!sql) return null;
    await ensureTable(sql);
    // Дату обязательно приводим к стандартному виду.
    //
    // Отсюда пришла тихая поломка: getScanById отдаёт дату как String(Date),
    // то есть «Mon Jul 27 2026 14:59:31 GMT-0500 (…)». База такую строку
    // разбирает не так, как ожидаешь, сравнение молча не срабатывает, и
    // предыдущая проверка «не находится» — хотя в таблице она есть. Ошибки
    // при этом никакой: просто в отчёте пропадает раздел «было / стало».
    const beforeIso = (() => {
      const d = new Date(before);
      return Number.isNaN(d.getTime()) ? before : d.toISOString();
    })();
    const r = await sql.query(
      `SELECT id, domain, score, total_issues, proven_count, engine, payload, created_at
         FROM oracle_scans
        WHERE domain = $1 AND created_at < $2::timestamptz AND id <> $3
        ORDER BY created_at DESC LIMIT 1`,
      [domain.toLowerCase(), beforeIso, notId.toUpperCase()]
    );
    const row = rowsOf(r)[0];
    if (!row) return null;
    return {
      id: String(row.id), domain: String(row.domain), score: Number(row.score),
      totalIssues: Number(row.total_issues), provenCount: Number(row.proven_count),
      engine: String(row.engine || ''), payload: row.payload,
      createdAt: String(row.created_at),
    };
  } catch { return null; }
}
