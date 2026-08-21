import { NextRequest, NextResponse } from 'next/server';
import { сессияДействительна } from '@/lib/user-auth';
import { getPool, creditGalatin, weekKeyUTC, bumpQuest } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';
const MIN_GAP_H = 20; // >=20h between claims ("once per day", timezone-friendly)

async function stateFor(pool: any, email: string) {
  const week = weekKeyUTC();
  const r = await pool.query(
    `SELECT day, claimed_at FROM daily_claims WHERE email=$1 AND week=$2 ORDER BY day`, [email, week]);
  const claimedDay = r.rows.length ? Math.max(...r.rows.map((x: any) => Number(x.day))) : 0;
  const lastTs = r.rows.length ? Math.max(...r.rows.map((x: any) => new Date(x.claimed_at).getTime())) : 0;
  const nextAt = lastTs ? lastTs + MIN_GAP_H * 3600_000 : 0;
  return { week, claimedDay, lastTs, nextAt, canClaim: claimedDay < 7 && Date.now() >= nextAt };
}

export async function GET(req: NextRequest) {
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const pool = await getPool();
    const st = await stateFor(pool, email);
    await pool.end();
    return NextResponse.json({ ok: true, ...st });
  } catch (e) { console.error('[dailies/get]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

// Claim the next day of the weekly streak. Server-authoritative, idempotent.
export async function POST(req: NextRequest) {
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_daily = clientIp(req as never);
  if (адрес_daily !== 'unknown' && !(await dbRateLimit(`daily:${адрес_daily}`, 10, 60_000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  try {
    const pool = await getPool();
    const st = await stateFor(pool, email);
    if (!st.canClaim) {
      await pool.end();
      return NextResponse.json({ ok: false, error: st.claimedDay >= 7 ? 'week_done' : 'too_early', ...st });
    }
    const day = st.claimedDay + 1;
    const ins = await pool.query(
      `INSERT INTO daily_claims(email, week, day) VALUES($1,$2,$3)
       ON CONFLICT (email, week, day) DO NOTHING RETURNING day`, [email, st.week, day]);
    if ((ins.rowCount || 0) === 0) { await pool.end(); return NextResponse.json({ ok: false, error: 'already' }); }
    const balance = await creditGalatin(pool, email, day, 'daily', `${st.week}:D${day}`);
    await bumpQuest(pool, email, 'streak_weekly', weekKeyUTC(), 5); // недельный квест «5 дейликов»
    const st2 = await stateFor(pool, email);
    await pool.end();
    return NextResponse.json({ ok: true, day, awarded: day, balance, ...st2 });
  } catch (e) { console.error('[dailies/post]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
