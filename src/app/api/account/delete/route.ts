import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { requestDeletion } from '@/lib/account-security';
import { clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// GDPR erasure with a 72h grace period + optional PIN + email confirmation.
// Does NOT delete immediately — schedules deletion so the owner can cancel.
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const siteBase = `https://${req.headers.get('host') || 'www.codeofdigitaleternity.com'}`;
  const r = await requestDeletion(email, clientIp(req), b?.pin, siteBase);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: r.error === 'bad_pin' ? 403 : 500 });
  return NextResponse.json({ ok: true, scheduled: true, scheduledAt: r.scheduledAt, graceHours: 72 });
}
