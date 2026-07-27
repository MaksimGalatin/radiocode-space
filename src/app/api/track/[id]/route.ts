import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { stations } from '@/lib/stations';
import { buildId3v23, stripExistingTags, Id3Fields } from '@/lib/id3';
import { koanText, ISO639_2 } from '@/lib/koans';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const SITE = 'https://radiocode.space';
const CENTRAL = 'https://www.codeofdigitaleternity.com';

// ── anti-fraud download rate limit (budget guard) ────────────────────────────
// Each download re-fetches the source MP3 + re-tags it (compute + egress), so a
// bot loop could inflate cost. Downloads are already login-gated; on top of that
// we cap per network fingerprint (client IP). In-memory ⇒ per warm lambda — a
// pragmatic first line; move to KV/Upstash for a hard cross-instance cap later.
const RL = new Map<string, { c: number; reset: number }>();
function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (RL.size > 5000) for (const [k, v] of RL) if (now > v.reset) RL.delete(k); // prune
  const e = RL.get(key);
  if (!e || now > e.reset) { RL.set(key, { c: 1, reset: now + windowMs }); return false; }
  e.c++;
  return e.c > max;
}
function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for') || '';
  return xff.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

function findTrack(id: string) {
  for (const s of stations) {
    const t = s.tracks.find((x) => x.id === id);
    if (t) return { track: t, station: s };
  }
  return null;
}

// The saver's referral code (passport username) so the embedded deep link recruits
// into their Ambassador Grid downline when the FILE is re-shared.
async function refCodeFor(email: string): Promise<string | null> {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return null;
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const r = await pool.query(`SELECT username FROM passports WHERE LOWER(email)=LOWER($1)`, [email]);
    await pool.end();
    return r.rows[0]?.username || null;
  } catch { return null; }
}

function asciiName(s: string): string {
  return (s.replace(/[\\/?%*:|"<>]/g, '-').replace(/[^\x20-\x7E]/g, '').replace(/\s+/g, ' ').trim() || 'track');
}

// Save a track — REGISTERED USERS ONLY. Streams the MP3 stamped with our ID3 tags:
// brand + links back to our sites + a clickable deep link carrying the saver's referral
// code + the CODE Koan as on-screen "lyrics" (USLT) + cover art. The file itself virals.
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'auth_required' }, { status: 401 });

  const { id } = await ctx.params;
  const found = findTrack(id);
  if (!found) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  const { track, station } = found;

  // Budget guard: cap downloads per network fingerprint — 40/hour overall and
  // 5/hour for the same track (a human saving favourites never hits this).
  const ip = clientIp(req);
  if (rateLimited(`dl:${ip}`, 40, 3_600_000) || rateLimited(`dl:${ip}:${id}`, 5, 3_600_000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429, headers: { 'Retry-After': '3600' } });
  }

  const rawLang = new URL(req.url).searchParams.get('lang') || 'en';
  const lang = ['en', 'ru', 'es', 'zh'].includes(rawLang) ? rawLang : 'en';

  // Source MP3.
  let mp3: Buffer;
  try {
    const r = await fetch(track.url, { cache: 'no-store' });
    if (!r.ok) return NextResponse.json({ error: 'source_unavailable' }, { status: 502 });
    mp3 = Buffer.from(await r.arrayBuffer());
  } catch {
    return NextResponse.json({ error: 'source_unavailable' }, { status: 502 });
  }

  // Cover art — the CODE ecosystem brand mark (same symbiosis logo used across the
  // sites and on the $GALATIN token), on a branded dark square, so it shows on the
  // phone lock screen / in the file. Optional; failure just omits APIC.
  let cover: { mime: string; data: Buffer } | null = null;
  try {
    const cr = await fetch(`${SITE}/code-cover-512.png`, { cache: 'no-store' });
    if (cr.ok) cover = { mime: 'image/png', data: Buffer.from(await cr.arrayBuffer()) };
  } catch { /* no cover */ }

  const ref = await refCodeFor(email);
  const deepLink = `${SITE}/?track=${encodeURIComponent(track.id)}` + (ref ? `&ref=${encodeURIComponent(ref)}` : '');

  const lyrics = [{ lang: ISO639_2[lang] || 'eng', desc: 'The CODE Koan', text: koanText(lang) }];
  if (lang !== 'en') lyrics.push({ lang: 'eng', desc: 'The CODE Koan', text: koanText('en') });

  const fields: Id3Fields = {
    title: track.title,
    artist: track.artist,
    album: 'RadioCode.Space',
    albumArtist: track.artist,
    composer: track.artist,
    year: '2026',
    genre: station.genre,
    publisher: 'CODE Eternal',
    copyright: '℗ 2026 CODE Eternal · Maksim Galatin. Free to share with attribution.',
    encodedBy: 'RadioCode.Space',
    // The CODE Koan goes in the COMMENT too (not only USLT lyrics) so it's visible in
    // plain file properties / Explorer — English is ALWAYS included, plus the download
    // language when different, then the brand + links.
    comment:
      (lang === 'en' ? koanText('en') : koanText(lang) + '\n\n— — —\n\n' + koanText('en')) +
      '\n\n🎧 Free from RadioCode.Space — the eternal cyberpunk radio of the CODE Eternal ecosystem. ' +
      'Listen, save & create your own AI track: ' + SITE + ' · ' + CENTRAL,
    urls: [
      { id: 'WOAR', url: SITE },
      { id: 'WORS', url: SITE },
      { id: 'WPUB', url: CENTRAL },
      { id: 'WCOM', url: `${CENTRAL}/whitepaper` },
    ],
    userUrls: [
      { desc: 'Listen on RadioCode.Space', url: deepLink },
      { desc: 'Create your own AI track', url: 'https://t.me/AIfaCreativityBot' },
      { desc: '$GALATIN token', url: `${CENTRAL}/whitepaper#sec-tokenomics` },
    ],
    userText: [
      { desc: 'ECOSYSTEM', value: 'CODE Eternal — Digital Immortality' },
      { desc: 'TOKEN', value: '$GALATIN' },
    ],
    lyrics,
    cover,
  };

  const tag = buildId3v23(fields);
  const body = stripExistingTags(mp3);
  const total = tag.length + body.length;

  // Stream (tag then audio) so we never buffer a >4.5MB response in one blob.
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(tag));
      controller.enqueue(new Uint8Array(body));
      controller.close();
    },
  });

  const nice = `${track.title} — ${track.artist} [RadioCode.Space].mp3`;
  const ascii = asciiName(`${track.title} - ${track.artist} [RadioCode.Space]`) + '.mp3';

  return new NextResponse(stream, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': String(total),
      'Content-Disposition': `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(nice)}`,
      'Cache-Control': 'private, no-store',
    },
  });
}
