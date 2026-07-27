import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

// Legal Shield: подписка на мониторинг опасных для сайтов/бизнеса законов.
// Мониторинг живёт на aifa.works (Оракул) — проксируем подписку сервер-сервер
// в его /api/subscribe, чтобы источник данных оставался единым.
const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i;

export async function POST(req: NextRequest) {
  const sessionEmail = getSessionEmail(req);
  if (!sessionEmail) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!allowRequest(req, 'lshield', 5, 60_000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const domain = String(b?.domain || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const email = String(b?.email || sessionEmail).trim().toLowerCase();
  if (!DOMAIN_RE.test(domain) || domain.length > 253) return NextResponse.json({ error: 'bad_domain' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'bad_email' }, { status: 400 });
  try {
    const r = await fetch('https://aifa.works/api/subscribe', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, domain }),
      signal: AbortSignal.timeout(15000),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok && d.success) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  } catch (e) {
    console.error('[legal-shield]', e);
    return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 });
  }
}
