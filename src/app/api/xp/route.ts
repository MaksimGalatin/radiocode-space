import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { getPool, creditGalatin, weekKeyUTC, todayUTC, bumpQuest, levelInfo } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';
const PER_TURN = 10;
const DAILY_CAP = 300; // max XP/day from chatting (anti-farm)
const LEVELUP_BONUS = 10; // GALATIN per level-up (server-authoritative)

export async function GET(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const pool = await getPool();
    const r = await pool.query(`SELECT xp FROM user_progress WHERE email=$1`, [email]);
    await pool.end();
    const xp = r.rows[0] ? Number(r.rows[0].xp) : 0;
    const li = levelInfo(xp);
    return NextResponse.json({ ok: true, xp, level: li.level, inLevel: li.inLevel, need: li.need });
  } catch (e) { console.error('[xp/get]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

// Award XP for one AIfa chat turn (server-authoritative, session-based, daily-capped).
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_xp = clientIp(req as never);
  if (адрес_xp !== 'unknown' && !(await dbRateLimit(`xp:${адрес_xp}`, 12, 60_000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  try {
    const pool = await getPool();
    const dRes = await pool.query(
      `INSERT INTO xp_daily(email,day,gained) VALUES($1,CURRENT_DATE,0)
       ON CONFLICT(email,day) DO UPDATE SET email=EXCLUDED.email RETURNING gained`, [email]);
    const gainedToday = dRes.rows[0]?.gained ?? 0;
    const willAward = gainedToday < DAILY_CAP;
    let xp = 0, leveledUp = false, galatin: number | null = null;
    if (willAward) {
      await pool.query(`UPDATE xp_daily SET gained = gained + $2 WHERE email=$1 AND day=CURRENT_DATE`, [email, PER_TURN]);
      const uRes = await pool.query(
        `INSERT INTO user_progress(email,xp) VALUES($1,$2)
         ON CONFLICT(email) DO UPDATE SET xp = user_progress.xp + $2, updated_at=now() RETURNING xp`, [email, PER_TURN]);
      xp = Number(uRes.rows[0].xp);
      const newLevel = levelInfo(xp).level;
      const prevLevel = levelInfo(xp - PER_TURN).level;
      leveledUp = newLevel > prevLevel;
      if (leveledUp) {
        // idempotent per level reached (награда за КАЖДЫЙ новый уровень, если перескочил несколько)
        for (let L = prevLevel + 1; L <= newLevel; L++) {
          galatin = await creditGalatin(pool, email, LEVELUP_BONUS, 'levelup', `L${L}`);
        }
      }
      // quest progress: chat turns (daily + weekly)
      await bumpQuest(pool, email, 'chat_daily', todayUTC(), 5);
      await bumpQuest(pool, email, 'chat_weekly', weekKeyUTC(), 30);
    } else {
      const uRes = await pool.query(`SELECT xp FROM user_progress WHERE email=$1`, [email]);
      xp = uRes.rows[0] ? Number(uRes.rows[0].xp) : 0;
    }
    await pool.end();
    return NextResponse.json({
      ok: true, xp, awarded: willAward ? PER_TURN : 0,
      level: levelInfo(xp).level, inLevel: levelInfo(xp).inLevel, need: levelInfo(xp).need, leveledUp,
      galatinBonus: leveledUp && galatin !== null ? LEVELUP_BONUS : 0,
      cappedToday: !willAward,
    });
  } catch (e) { console.error('[xp/post]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
