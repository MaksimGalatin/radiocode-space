/**
 * Server-side GALATIN / CODE economy — single source of truth in Neon
 * (SUBMISSIONS_DB_URL). Every credit goes through the idempotent ledger:
 * UNIQUE(email, reason, ref) makes double-crediting impossible.
 */

export type Pool = any;

export async function getPool(): Promise<Pool> {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) throw new Error('no_db');
  const { Pool } = await import('@neondatabase/serverless');
  return new Pool({ connectionString: url });
}

/** Credit (or debit, negative amount) GALATIN idempotently. Returns new balance or null if duplicate. */
export async function creditGalatin(
  pool: Pool, email: string, amount: number, reason: string, ref: string
): Promise<number | null> {
  const ins = await pool.query(
    `INSERT INTO galatin_ledger(email, amount, reason, ref) VALUES($1,$2,$3,$4)
     ON CONFLICT (email, reason, ref) DO NOTHING RETURNING id`,
    [email, Math.round(amount), reason, ref]
  );
  if ((ins.rowCount || 0) === 0) return null; // duplicate — already credited
  const r = await pool.query(
    `INSERT INTO user_balances(email, galatin) VALUES($1,$2)
     ON CONFLICT (email) DO UPDATE SET galatin = user_balances.galatin + $2, updated_at = now()
     RETURNING galatin`,
    [email, Math.round(amount)]
  );
  return Number(r.rows[0].galatin);
}

export async function creditCodePoints(pool: Pool, email: string, amount: number): Promise<number> {
  const r = await pool.query(
    `INSERT INTO user_balances(email, code_points) VALUES($1,$2)
     ON CONFLICT (email) DO UPDATE SET code_points = user_balances.code_points + $2, updated_at = now()
     RETURNING code_points`,
    [email, Math.round(amount)]
  );
  return Number(r.rows[0].code_points);
}

export async function getBalances(pool: Pool, email: string): Promise<{ galatin: number; code: number }> {
  const r = await pool.query(`SELECT galatin, code_points FROM user_balances WHERE email=$1`, [email]);
  if (!r.rows[0]) return { galatin: 0, code: 0 };
  return { galatin: Number(r.rows[0].galatin), code: Number(r.rows[0].code_points) };
}

/** ISO week key (UTC, Monday start): e.g. "2026-07-06" of that week's Monday. */
export function weekKeyUTC(d = new Date()): string {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = (t.getUTCDay() + 6) % 7;
  t.setUTCDate(t.getUTCDate() - day);
  return t.toISOString().slice(0, 10);
}

export function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Bump a quest counter for the current period. Does NOT auto-claim. */
export async function bumpQuest(
  pool: Pool, email: string, quest: string, period: string, target: number, by = 1
): Promise<void> {
  await pool.query(
    `INSERT INTO quest_progress(email, quest, period, progress, target) VALUES($1,$2,$3,$4,$5)
     ON CONFLICT (email, quest, period)
     DO UPDATE SET progress = LEAST(quest_progress.progress + $4, 100000), updated_at = now()`,
    [email, quest, period, by, target]
  );
}

// ─── Система уровней CODE (1..50) ───────────────────────────────────────────
// XP для перехода С уровня L на L+1. Легко до 10, медленнее до 20, дальше круче.
export function xpToNext(level: number): number {
  const L = Math.floor(level);
  if (L < 1) return 100;
  if (L <= 9)  return 50 * (L + 1);          // L1→2:100 … L9→10:500
  if (L <= 19) return 600 + 120 * (L - 10);  // L10:600 … L19:1680
  if (L <= 34) return 2000 + 300 * (L - 20); // L20:2000 … L34:6200
  if (L <= 49) return 6500 + 600 * (L - 35); // L35:6500 … L49:14900
  return Infinity;                            // 50 — максимум
}
export const MAX_LEVEL = 50;
// Полный XP, чтобы ДОСТИЧЬ уровня L (порог).
export function xpThreshold(level: number): number {
  let sum = 0;
  for (let l = 1; l < level; l++) sum += xpToNext(l);
  return sum;
}
// По суммарному XP → уровень и прогресс внутри уровня.
export function levelInfo(totalXp: number): { level: number; inLevel: number; need: number; total: number } {
  const xp = Math.max(0, Math.floor(totalXp || 0));
  let level = 1, acc = 0;
  while (level < MAX_LEVEL) {
    const need = xpToNext(level);
    if (xp < acc + need) break;
    acc += need; level++;
  }
  const need = xpToNext(level);
  return { level, inLevel: xp - acc, need: isFinite(need) ? need : 0, total: xp };
}

/**
 * Суточный потолок выдачи GALATIN — общий для всех четырёх сайтов.
 *
 * ЗАЧЕМ. Без потолка разговор и игры превращаются в станок для добычи токена:
 * выгодно не общаться, а долбить кнопку. Раньше потолок стоял ТОЛЬКО на
 * центральном сайте (в chat-quota.ts), а база у всех четырёх общая — значит
 * он обходился переходом на соседний сайт. Здесь он общий по построению:
 * таблица galatin_daily одна на всю экосистему.
 *
 * ПОЧЕМУ «ОТЛОЖИТЬ», А НЕ «ПРОВЕРИТЬ И ПОТОМ ЗАПИСАТЬ». Между проверкой и
 * записью помещается второй такой же запрос, и оба увидели бы одно и то же
 * свободное место. Здесь прибавление идёт одним действием, и обе части читают
 * ОДИН снимок базы: «было» видит значение до записи, «стало» — после. Разница
 * и есть то, что действительно поместилось в потолок.
 *
 * Возвращает разрешённую сумму: 0 значит «на сегодня хватит».
 */
export const GALATIN_ЗА_СУТКИ = 50;

export async function отложитьGalatin(pool: Pool, email: string, сколько: number): Promise<number> {
  if (!email || сколько <= 0) return 0;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS galatin_daily (
      email  text NOT NULL,
      day    date NOT NULL,
      gained int  NOT NULL DEFAULT 0,
      PRIMARY KEY (email, day)
    )`);
  const r = await pool.query(
    `WITH было AS (
       SELECT gained FROM galatin_daily WHERE email = $1 AND day = CURRENT_DATE
     ), стало AS (
       INSERT INTO galatin_daily (email, day, gained) VALUES ($1, CURRENT_DATE, LEAST($2, $3))
       ON CONFLICT (email, day) DO UPDATE SET gained = LEAST(galatin_daily.gained + $2, $3)
       RETURNING gained
     )
     SELECT стало.gained - COALESCE((SELECT gained FROM было), 0) AS выдано FROM стало`,
    [email, Math.round(сколько), GALATIN_ЗА_СУТКИ]
  );
  return Math.max(0, Number(r.rows[0]?.выдано || 0));
}
