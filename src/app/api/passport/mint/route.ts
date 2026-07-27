import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Readable } from 'stream';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
import { getPool } from '@/lib/economy';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Mint the eternal passport to Arweave (permanent on-chain identity).
 * - Idempotent: if arweave_tx already exists, returns it (never mints twice).
 * - The Arweave wallet key lives ONLY in env (ARWEAVE_WALLET_JSON), server-side.
 * - Upload via @ardrive/turbo-sdk (uploads under 100 KiB are free on Turbo).
 */
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!allowRequest(req, 'mint', 3, 600000)) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  const walletJson = process.env.ARWEAVE_WALLET_JSON || '';
  try {
    const pool = await getPool();
    const p = await pool.query(`SELECT * FROM passports WHERE email=$1`, [email]);
    const row = p.rows[0];
    if (!row) { await pool.end(); return NextResponse.json({ error: 'no_passport' }, { status: 400 }); }
    if (row.arweave_tx) {
      await pool.end();
      return NextResponse.json({ ok: true, already: true, arweaveUrl: `https://arweave.net/${row.arweave_tx}` });
    }
    if (!walletJson) { await pool.end(); return NextResponse.json({ error: 'not_configured' }, { status: 503 }); }

    const t = await pool.query(`SELECT tier FROM user_tiers WHERE email=$1`, [email]);
    const doc = {
      protocol: 'CODE-ETERNAL-PASSPORT',
      version: 1,
      issuedAt: new Date().toISOString(),
      site: 'https://www.aifa.digital',
      identity: {
        username: row.username,
        displayName: row.display_name,
        bio: row.bio || '',
        manifesto: row.manifesto || '',
        telegram: row.telegram || '',
        twitter: row.twitter || '',
        website: row.website || '',
        avatarDataUrl: row.avatar_data_url || '',
        tier: t.rows[0] ? Number(t.rows[0].tier) : 0,
      },
      // email hash only - no raw PII on-chain
      subject: crypto.createHash('sha256').update(String(email)).digest('hex'),
    };
    const data = Buffer.from(JSON.stringify(doc, null, 2), 'utf8');

    const { TurboFactory } = await import('@ardrive/turbo-sdk');
    const jwk = JSON.parse(walletJson);
    const turbo = TurboFactory.authenticated({ privateKey: jwk });
    const result = await turbo.uploadFile({
      fileStreamFactory: () => Readable.from(data),
      fileSizeFactory: () => data.length,
      dataItemOpts: {
        tags: [
          { name: 'Content-Type', value: 'application/json' },
          { name: 'App-Name', value: 'CODE-Eternal' },
          { name: 'Type', value: 'eternal-passport' },
          { name: 'Username', value: String(row.username) },
        ],
      },
    });
    const txId = result.id;
    await pool.query(`UPDATE passports SET arweave_tx=$2, minted_at=now(), updated_at=now() WHERE email=$1 AND arweave_tx IS NULL`, [email, txId]);
    await pool.end();
    return NextResponse.json({ ok: true, arweaveUrl: `https://arweave.net/${txId}`, txId });
  } catch (e) {
    console.error('[passport/mint]', e);
    return NextResponse.json({ error: 'mint_failed' }, { status: 502 });
  }
}
