import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { getPool, getBalances, levelInfo } from '@/lib/economy';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

// One round-trip summary for the cabinet header: xp, level, balances, tier, passport.
export async function GET(req: NextRequest) {
  // Ограничение частоты: частый опрос профиля.
  if (!allowRequest(req as NextRequest, 'me', 120, 60000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ authenticated: false }, { status: 401 });
  try {
    const pool = await getPool();
    const [xp, tier, bal, pass] = await Promise.all([
      pool.query(`SELECT xp FROM user_progress WHERE email=$1`, [email]),
      pool.query(`SELECT tier FROM user_tiers WHERE email=$1`, [email]),
      getBalances(pool, email),
      pool.query(`SELECT username, display_name, bio, manifesto, telegram, twitter, website, avatar_data_url, arweave_tx, minted_at FROM passports WHERE email=$1`, [email]),
    ]);
    // Никнейм из общей таблицы users_auth (Neon). Ошибка не роняет /api/me.
    let nickname: string | null = null;
    try {
      const nr = await pool.query(`SELECT nickname FROM users_auth WHERE LOWER(email)=LOWER($1)`, [email]);
      nickname = nr.rows[0]?.nickname || null;
    } catch {}
    await pool.end();
    const xpN = xp.rows[0] ? Number(xp.rows[0].xp) : 0;
    const p = pass.rows[0] || null;
    return NextResponse.json({
      authenticated: true, email, nickname,
      // 🔴 УРОВЕНЬ СЧИТАЛСЯ ЗДЕСЬ ДРУГОЙ ФОРМУЛОЙ, ЧЕМ ВЕЗДЕ. ПОЧИНЕНО 08.08.2026.
      //
      // Стояло `Math.floor(xpN / 100) + 1` — сто опыта на уровень, линейно и без
      // потолка. А настоящая шкала (`levelInfo` в economy.ts) — кривая из пятидесяти
      // уровней, где каждый переход дороже: L1→2 сто, L35→36 уже 6500.
      //
      // Кабинет показывал ДВА РАЗНЫХ уровня одному человеку: при загрузке страницы —
      // отсюда, а после первой реплики в чате — из /api/xp, где формула верная.
      // Замерено: при 100 000 опыта здесь выходил уровень 1001 вместо 38, при
      // 236 100 — 2362 вместо 50 (потолка). Ошибка тем больше, чем активнее человек:
      // у самого активного — в сорок семь раз.
      //
      // Заодно отдаём inLevel и need. Без них кабинет подставлял в полосу прогресса
      // ВЕСЬ суммарный опыт против запасного значения 100 — полоса всегда упёрта в
      // край, а число рядом бессмысленно.
      xp: xpN, ...(() => { const _л = levelInfo(xpN); return { level: _л.level, inLevel: _л.inLevel, need: _л.need }; })(),
      galatin: bal.galatin, code: bal.code,
      tier: tier.rows[0] ? Number(tier.rows[0].tier) : 0,
      passport: p ? {
        username: p.username, displayName: p.display_name, bio: p.bio || '',
        manifesto: p.manifesto || '', telegram: p.telegram || '', twitter: p.twitter || '',
        website: p.website || '', avatarDataUrl: p.avatar_data_url || '',
        arweaveTx: p.arweave_tx || null, mintedAt: p.minted_at || null,
      } : null,
      arweaveUrl: p?.arweave_tx ? `https://arweave.net/${p.arweave_tx}` : null,
    });
  } catch (e) { console.error('[me]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
