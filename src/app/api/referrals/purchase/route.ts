import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';
import { creditReferralChain, setUserTier, amountToTier } from '@/lib/referral';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
export const dynamic = 'force-dynamic';

// INTERNAL-ONLY commission trigger (tests / manual ops). Requires the shared
// internal secret header — otherwise anyone could grant themselves a tier.
export async function POST(req: Request) {
  // Ограничение частоты: покупка.
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_referrals_purchase = clientIp(req as never);
  if (адрес_referrals_purchase !== 'unknown' && !(await dbRateLimit(`referrals_purchase:${адрес_referrals_purchase}`, 20, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const secret = process.env.AIFA_INTERNAL_SECRET || '';
  const got = req.headers.get('x-aifa-internal') || '';
  const ok = !!secret && (() => { const a = Buffer.from(got, "utf8"), b = Buffer.from(secret, "utf8");
        // Длины сравниваем В БАЙТАХ: у строки и у буфера они разные для
        // всего, что вне латиницы, и timingSafeEqual бросил бы исключение.
        return a.length === b.length && crypto.timingSafeEqual(a, b); })();
  if (!ok) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let b: any = {}; try { b = await req.json(); } catch {}
  const email = String(b?.email || '').trim().toLowerCase();
  const amount = Number(b?.amount || 0);
  const orderId = String(b?.orderId || '').trim();
  const tier = b?.tier ? Number(b.tier) : amountToTier(amount);
  if (!email || !(amount > 0) || !orderId || !(tier >= 1 && tier <= 3)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    await setUserTier(pool, email, tier);
    const credited = await creditReferralChain(pool, email, amount, tier, orderId);
    await pool.end();
    return NextResponse.json({ ok: true, credited });
  } catch (e) { console.error('[ref/purchase]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
