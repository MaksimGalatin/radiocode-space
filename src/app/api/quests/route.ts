import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
import { getPool, creditGalatin, weekKeyUTC, todayUTC } from '@/lib/economy';

export const dynamic = 'force-dynamic';

// Quest catalogue (server-authoritative). Progress is bumped by /api/xp and
// /api/games/win; claiming pays GALATIN idempotently via the ledger.
const QUESTS: Record<string, { period: 'daily' | 'weekly'; target: number; reward: number }> = {
  // ── ежедневные ──
  chat_daily:          { period: 'daily',  target: 5,   reward: 5 },   // 5 chat turns with AIfa
  wins_daily:          { period: 'daily',  target: 1,   reward: 5 },   // win 1 game
  variety_daily:       { period: 'daily',  target: 2,   reward: 15 },  // win in 2 DIFFERENT games
  tetris_lines_daily:  { period: 'daily',  target: 40,  reward: 10 },  // clear 40 tetris lines
  // ── еженедельные ──
  chat_weekly:         { period: 'weekly', target: 30,  reward: 40 },  // 30 chat turns
  wins_weekly:         { period: 'weekly', target: 15,  reward: 50 },  // 15 wins
  tetris_lines_weekly: { period: 'weekly', target: 200, reward: 60 },  // 200 tetris lines
  streak_weekly:       { period: 'weekly', target: 5,   reward: 30 },  // claim 5 daily rewards
  invite_weekly:       { period: 'weekly', target: 1,   reward: 100 }, // invite a friend (referral linked)
};

function periodKey(p: 'daily' | 'weekly') { return p === 'daily' ? todayUTC() : weekKeyUTC(); }

export async function GET(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const pool = await getPool();
    const out: any[] = [];
    for (const [q, def] of Object.entries(QUESTS)) {
      const key = periodKey(def.period);
      const r = await pool.query(`SELECT progress, claimed FROM quest_progress WHERE email=$1 AND quest=$2 AND period=$3`, [email, q, key]);
      out.push({
        quest: q, period: def.period, target: def.target, reward: def.reward,
        progress: r.rows[0] ? Math.min(Number(r.rows[0].progress), def.target) : 0,
        claimed: r.rows[0] ? Boolean(r.rows[0].claimed) : false,
      });
    }
    await pool.end();
    return NextResponse.json({ ok: true, quests: out });
  } catch (e) { console.error('[quests/get]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!allowRequest(req, 'quest', 15, 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const q = String(b?.quest || '');
  const def = QUESTS[q];
  if (!def) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const key = periodKey(def.period);
  try {
    const pool = await getPool();
    // atomic claim: only flips claimed=false → true when target reached
    const upd = await pool.query(
      `UPDATE quest_progress SET claimed=true, updated_at=now()
       WHERE email=$1 AND quest=$2 AND period=$3 AND claimed=false AND progress >= $4
       RETURNING progress`, [email, q, key, def.target]);
    if ((upd.rowCount || 0) === 0) { await pool.end(); return NextResponse.json({ ok: false, error: 'not_ready' }); }
    const balance = await creditGalatin(pool, email, def.reward, 'quest', `${q}:${key}`);
    await pool.end();
    return NextResponse.json({ ok: true, awarded: def.reward, balance });
  } catch (e) { console.error('[quests/post]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
