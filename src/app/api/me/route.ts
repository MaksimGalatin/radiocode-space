import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { getPool, getBalances } from '@/lib/economy';

export const dynamic = 'force-dynamic';

// One round-trip summary for the cabinet header: xp, level, balances, tier, passport.
export async function GET(req: NextRequest) {
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
      xp: xpN, level: Math.floor(xpN / 100) + 1,
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
