import { NextRequest, NextResponse } from 'next/server';
import { сессияДействительна } from '@/lib/user-auth';
import { getPool } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Digital Passport - LOCAL persistence (Neon) + optional Arweave mint via
// /api/passport/mint. Field limits enforced server-side.
const LIMITS = { username: 32, displayName: 40, bio: 280, manifesto: 500, telegram: 64, twitter: 64, website: 120, avatar: 95000 };

// strip control characters without regex ranges
function clean(v: unknown, max: number): string {
  const s = String(v ?? '');
  let out = '';
  for (const ch of s) { const c = ch.charCodeAt(0); if (c >= 32 && c !== 127) out += ch; }
  return out.trim().slice(0, max);
}

export async function GET(req: NextRequest) {
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const pool = await getPool();
    const [p, t, ref] = await Promise.all([
      pool.query(`SELECT * FROM passports WHERE email=$1`, [email]),
      pool.query(`SELECT tier FROM user_tiers WHERE email=$1`, [email]),
      pool.query(`SELECT COALESCE(SUM(amount_usdt) FILTER (WHERE credited),0) AS bal FROM referral_earnings WHERE earner_email=$1`, [email]),
    ]);
    await pool.end();
    const row = p.rows[0] || null;
    return NextResponse.json({
      tier: t.rows[0] ? Number(t.rows[0].tier) : 0,
      referrals: { balance: Number(ref.rows[0]?.bal || 0) },
      passport: row ? {
        username: row.username, displayName: row.display_name, bio: row.bio || '',
        manifesto: row.manifesto || '', telegram: row.telegram || '', twitter: row.twitter || '',
        website: row.website || '', avatarDataUrl: row.avatar_data_url || '',
      } : null,
      arweaveUrl: row?.arweave_tx ? `https://arweave.net/${row.arweave_tx}` : null,
    });
  } catch (e) { console.error('[passport/get]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

// Save/update the passport draft (does not mint).
export async function POST(req: NextRequest) {
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_passport = clientIp(req as never);
  if (адрес_passport !== 'unknown' && !(await dbRateLimit(`passport:${адрес_passport}`, 20, 60000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let body: any = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }

  const username = clean(body.username, LIMITS.username).toLowerCase();
  const displayName = clean(body.displayName, LIMITS.displayName);
  if (!/^[a-z0-9_-]{3,32}$/.test(username)) return NextResponse.json({ error: 'invalid_username' }, { status: 400 });
  if (!displayName) return NextResponse.json({ error: 'displayName required' }, { status: 400 });
  const bio = clean(body.bio, LIMITS.bio);
  const manifesto = clean(body.manifesto, LIMITS.manifesto);
  const telegram = clean(body.telegram, LIMITS.telegram).replace(/^@/, '');
  const twitter = clean(body.twitter, LIMITS.twitter).replace(/^@/, '');
  let website = clean(body.website, LIMITS.website);
  if (website && !/^https?:\/\//i.test(website)) website = 'https://' + website;
  const avatar = typeof body.avatarDataUrl === 'string' ? body.avatarDataUrl : '';
  if (avatar && (!avatar.startsWith('data:image/') || avatar.length > LIMITS.avatar)) {
    return NextResponse.json({ error: 'bad_avatar' }, { status: 400 });
  }

  try {
    const pool = await getPool();
    const u = await pool.query(`SELECT email FROM passports WHERE username=$1 AND email<>$2`, [username, email]);
    if (u.rows[0]) { await pool.end(); return NextResponse.json({ error: 'username_taken' }, { status: 409 }); }
    await pool.query(
      `INSERT INTO passports(email, username, display_name, bio, manifesto, telegram, twitter, website, avatar_data_url)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,NULLIF($9,''))
       ON CONFLICT (email) DO UPDATE SET
         username=EXCLUDED.username, display_name=EXCLUDED.display_name, bio=EXCLUDED.bio,
         manifesto=EXCLUDED.manifesto, telegram=EXCLUDED.telegram, twitter=EXCLUDED.twitter,
         website=EXCLUDED.website,
         avatar_data_url=COALESCE(NULLIF($9,''), passports.avatar_data_url),
         updated_at=now()`,
      [email, username, displayName, bio, manifesto, telegram, twitter, website, avatar]);
    const row = await pool.query(`SELECT arweave_tx FROM passports WHERE email=$1`, [email]);
    await pool.end();
    const tx = row.rows[0]?.arweave_tx || null;
    return NextResponse.json({ ok: true, saved: true, arweaveUrl: tx ? `https://arweave.net/${tx}` : null });
  } catch (e: any) {
    if (String(e?.message || '').includes('passports_username_key')) return NextResponse.json({ error: 'username_taken' }, { status: 409 });
    console.error('[passport/post]', e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
