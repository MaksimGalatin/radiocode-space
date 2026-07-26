/**
 * Журнал серверных ошибок в общей базе.
 *
 * Зачем. Раньше о сбое можно было узнать только из письма (одно в час на
 * одинаковую тему) или из логов Vercel, где нет ни истории по сайтам, ни
 * картины «что падает прямо сейчас». Под потоком пользователей этого мало.
 *
 * Как. Пишем через общий HTTP-доступ к базе (db-pool), без соединения на
 * запись. Полностью fail-open: если запись не удалась — молчим, потому что
 * журнал ошибок сам не имеет права стать причиной ошибки. Есть защита от
 * лавины: одинаковая ошибка пишется не чаще раза в минуту, иначе сбойный
 * эндпоинт под нагрузкой залил бы базу миллионом одинаковых строк.
 */
import crypto from 'crypto';

let tableReady = false;
const lastWrite = new Map<string, number>();
const MIN_GAP_MS = 60_000;
const MAX_KEYS = 5000;

async function ensureTable(pool: { query: (t: string, p?: unknown[]) => Promise<unknown> }) {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS error_log (
      id BIGSERIAL PRIMARY KEY,
      site TEXT NOT NULL,
      path TEXT,
      method TEXT,
      status INT,
      message TEXT NOT NULL,
      detail TEXT,
      fingerprint TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`);
  await pool.query(`CREATE INDEX IF NOT EXISTS error_log_created_idx ON error_log (created_at DESC)`);
  tableReady = true;
}

export type ErrorEntry = {
  site: string;
  path?: string;
  method?: string;
  status?: number;
  message: string;
  detail?: string;
};

/** Записать серверную ошибку. Никогда не бросает исключений. */
export async function logServerError(e: ErrorEntry): Promise<void> {
  try {
    const fingerprint = crypto
      .createHash('sha256')
      .update(`${e.site}|${e.path || ''}|${e.message}`)
      .digest('hex')
      .slice(0, 16);

    const now = Date.now();
    const prev = lastWrite.get(fingerprint);
    if (prev && now - prev < MIN_GAP_MS) return;   // защита от лавины одинаковых записей
    if (lastWrite.size > MAX_KEYS) lastWrite.clear();
    lastWrite.set(fingerprint, now);

    const { getDbPool } = await import('./db-pool');
    const pool = await getDbPool();
    await ensureTable(pool);
    await pool.query(
      `INSERT INTO error_log(site, path, method, status, message, detail, fingerprint)
       VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [
        e.site.slice(0, 60),
        (e.path || '').slice(0, 300),
        (e.method || '').slice(0, 10),
        e.status ?? null,
        e.message.slice(0, 500),
        (e.detail || '').slice(0, 4000),
        fingerprint,
      ]
    );
  } catch {
    /* журнал ошибок не имеет права сам стать ошибкой */
  }
}

export type ErrorRow = {
  id: number; site: string; path: string | null; method: string | null;
  status: number | null; message: string; detail: string | null; created_at: string;
};

/** Последние записи журнала — для админки. */
export async function readErrorLog(limit = 100): Promise<ErrorRow[]> {
  try {
    const { getDbPool } = await import('./db-pool');
    const pool = await getDbPool();
    await ensureTable(pool);
    const r = await pool.query<ErrorRow>(
      `SELECT id, site, path, method, status, message, detail, created_at
         FROM error_log ORDER BY created_at DESC LIMIT $1`,
      [Math.min(500, Math.max(1, limit))]
    );
    return r.rows;
  } catch {
    return [];
  }
}
