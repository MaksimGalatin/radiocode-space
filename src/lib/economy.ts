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
