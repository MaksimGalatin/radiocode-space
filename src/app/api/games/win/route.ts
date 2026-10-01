import { NextRequest, NextResponse } from 'next/server';
import { getFreshSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
import { общийЛимитЗапроса } from '@/lib/rate-limit-db';
import { getPool, creditGalatin, weekKeyUTC, todayUTC, bumpQuest } from '@/lib/economy';

export const dynamic = 'force-dynamic';

// GALATIN reward per game (owner spec): ttt=1, checkers=5, chess=30, backgammon=30, tetris=10.
const REWARD: Record<string, number> = { ttt: 1, checkers: 5, chess: 30, backgammon: 30, tetris: 10 };
const DAILY_REWARD_CAP = 5; // only the first 5 wins per game per day pay GALATIN (anti-farm)
// Minimum plausible seconds for one won game (anti-cheat sanity floor).
const MIN_SECONDS: Record<string, number> = { ttt: 5, checkers: 20, chess: 40, backgammon: 30, tetris: 45 };

export async function POST(req: NextRequest) {
  const email = await getFreshSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let body: any = {};
  try { body = await req.json(); } catch {}
  const game = String(body?.game || '').trim().toLowerCase();
  if (!(game in REWARD)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  // Per-IP shield + per-account pacing: a human can't win faster than MIN_SECONDS.
  if (!allowRequest(req, 'gwin', 10, 60_000) || !(await общийЛимитЗапроса(req, 'gwin', 10, 60_000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  try {
    const pool = await getPool();

    /**
     * Метка партии. Без неё победа не засчитывается.
     *
     * Раньше эта ручка верила браузеру на слово: пришло «я выиграл в шахматы» —
     * начислялось 30 GALATIN, и достаточно было строки в консоли. Ограничения
     * (минимальное время, пять награждаемых побед в сутки) смягчали ущерб, но
     * начислить токен, ни разу не открыв игру, было можно.
     *
     * Теперь партия открывается через /api/games/start, и здесь проверяется:
     * метка наша, ещё не использована, выдана на ЭТУ игру, не протухла и с её
     * выдачи прошло не меньше минимального времени на партию. Метка гасится
     * тем же запросом, которым проверяется, — иначе два одновременных запроса
     * с одной меткой прошли бы оба.
     */
    const token = String(body?.token || '').trim();
    if (!token) {
      await pool.end();
      return NextResponse.json(
        { error: 'no_session', hint: 'Откройте игру заново — партия не была начата' },
        { status: 400 });
    }
    const сессия = await pool.query(
      `UPDATE game_sessions
          SET used_at = now()
        WHERE token = $1
          AND email = $2
          AND game  = $3
          AND used_at IS NULL
          AND started_at > now() - interval '6 hours'
          AND now() - started_at >= ($4 || ' seconds')::interval
        RETURNING started_at`,
      [token, email, game, String(MIN_SECONDS[game] || 10)]
    );
    if ((сессия.rowCount || 0) === 0) {
      await pool.end();
      // Одна и та же причина для «метки нет», «уже использована», «слишком
      // быстро» и «протухла»: подсказывать подбирающему, какое из условий он
      // не прошёл, незачем.
      return NextResponse.json(
        { error: 'bad_session', hint: 'Партия не найдена, уже засчитана или закончилась слишком быстро' },
        { status: 400 });
    }

    // pacing check: last win for this email+game
    const last = await pool.query(
      `SELECT EXTRACT(EPOCH FROM (now() - updated_at)) AS s FROM game_scores WHERE email=$1 AND game=$2`,
      [email, game]);
    if (last.rows[0] && Number(last.rows[0].s) < (MIN_SECONDS[game] || 10)) {
      await pool.end();
      return NextResponse.json({ error: 'too_fast' }, { status: 429 });
    }
    const dRes = await pool.query(
      `INSERT INTO game_daily(email,game,day,rewarded_wins) VALUES($1,$2,CURRENT_DATE,0)
       ON CONFLICT (email,game,day) DO UPDATE SET email=EXCLUDED.email RETURNING rewarded_wins`,
      [email, game]
    );
    const rewardedToday = dRes.rows[0]?.rewarded_wins ?? 0;
    const willReward = rewardedToday < DAILY_REWARD_CAP;
    const gain = willReward ? REWARD[game] : 0;

    if (willReward) {
      await pool.query(`UPDATE game_daily SET rewarded_wins = rewarded_wins + 1 WHERE email=$1 AND game=$2 AND day=CURRENT_DATE`, [email, game]);
    }
    // Total wins always count (leaderboard); galatin column mirrors rewarded amount.
    const sRes = await pool.query(
      `INSERT INTO game_scores(email,game,wins,galatin) VALUES($1,$2,1,$3)
       ON CONFLICT (email,game) DO UPDATE SET wins = game_scores.wins + 1, galatin = game_scores.galatin + $3, updated_at = now()
       RETURNING wins, galatin`,
      [email, game, gain]
    );
    let balance: number | null = null;
    if (gain > 0) {
      balance = await creditGalatin(pool, email, gain, 'game_win', `${game}:${todayUTC()}:${rewardedToday + 1}`);
    }
    // quest progress: game wins (daily + weekly)
    await bumpQuest(pool, email, 'wins_daily', todayUTC(), 1);
    await bumpQuest(pool, email, 'wins_weekly', weekKeyUTC(), 15);
    // «Разные игры»: первая сегодняшняя награждённая победа в каждой игре двигает прогресс
    if (rewardedToday === 0) await bumpQuest(pool, email, 'variety_daily', todayUTC(), 2);
    const rRes = await pool.query(`SELECT count(*)+1 AS rank FROM game_scores WHERE game=$1 AND wins > $2`, [game, sRes.rows[0].wins]);
    await pool.end();

    return NextResponse.json({
      ok: true, awarded: gain, rewardedToday: rewardedToday + (willReward ? 1 : 0),
      cap: DAILY_REWARD_CAP, totalWins: sRes.rows[0].wins, galatinTotal: sRes.rows[0].galatin,
      balance, rank: Number(rRes.rows[0].rank),
    });
  } catch (e) {
    console.error('[games/win]', e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
