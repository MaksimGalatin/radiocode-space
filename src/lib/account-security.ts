/**
 * Account security: PIN-protected, delayed (72h) account/memory deletion with
 * email confirmation + cancel link, and new-IP login alerts. Self-contained
 * (own DB pool + own Resend sender) so all three sites can use it identically.
 * All emails go to the ACCOUNT OWNER's own address.
 */
import crypto from 'crypto';

const GRACE_MS = 72 * 60 * 60 * 1000; // 72 hours

async function pool() {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) throw new Error('no_db');
  const { Pool } = await import('@neondatabase/serverless');
  return new Pool({ connectionString: url });
}

function hashPin(pin: string): string {
  return crypto.createHash('sha256').update('aifa-pin:' + pin).digest('hex');
}

async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || process.env.SMTP_FROM || 'CODE Eternal <noreply@codeofdigitaleternity.com>';
  if (!key) { console.warn('[account-security] no RESEND_API_KEY'); return false; }
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html }),
    });
    return r.ok;
  } catch (e) { console.error('[account-security] mail', e); return false; }
}

const shell = (title: string, body: string) => `<div style="background:#030712;color:#e5e7eb;font-family:sans-serif;padding:28px;border-radius:12px;border:1px solid #1f2937;max-width:560px">
<h2 style="color:#22D3EE;border-bottom:1px solid #1f2937;padding-bottom:10px">CODE Eternal · ${title}</h2>${body}
<p style="color:#6b7280;font-size:12px;margin-top:20px">CODE Eternal — protocol of digital eternity.</p></div>`;

// ── PIN ──
export async function setPin(email: string, pin: string): Promise<void> {
  const p = await pool();
  try { await p.query(`INSERT INTO account_pins(email,pin_hash) VALUES($1,$2) ON CONFLICT(email) DO UPDATE SET pin_hash=EXCLUDED.pin_hash`, [email.toLowerCase(), hashPin(pin)]); }
  finally { await p.end(); }
}
export async function clearPin(email: string): Promise<void> {
  const p = await pool();
  try { await p.query(`DELETE FROM account_pins WHERE email=$1`, [email.toLowerCase()]); } finally { await p.end(); }
}
export async function hasPin(email: string): Promise<boolean> {
  const p = await pool();
  try { const r = await p.query(`SELECT 1 FROM account_pins WHERE email=$1`, [email.toLowerCase()]); return (r.rowCount || 0) > 0; }
  finally { await p.end(); }
}
async function pinOk(p: any, email: string, pin: string | undefined): Promise<boolean> {
  const r = await p.query(`SELECT pin_hash FROM account_pins WHERE email=$1`, [email.toLowerCase()]);
  if (!r.rows[0]) return true; // no PIN set → allowed
  return typeof pin === 'string' && hashPin(pin) === r.rows[0].pin_hash;
}

// ── Deletion request (72h grace) ──
export async function requestDeletion(email: string, ip: string, pin: string | undefined, siteBase: string): Promise<{ ok: boolean; error?: string; scheduledAt?: number }> {
  const em = email.toLowerCase();
  const p = await pool();
  try {
    if (!(await pinOk(p, em, pin))) return { ok: false, error: 'bad_pin' };
    const scheduledAt = Date.now() + GRACE_MS;
    const token = crypto.randomBytes(24).toString('hex');
    await p.query(
      `INSERT INTO account_deletions(email, scheduled_at, cancel_token, status, requested_ip)
       VALUES($1,$2,$3,'pending',$4)
       ON CONFLICT(email) DO UPDATE SET scheduled_at=EXCLUDED.scheduled_at, cancel_token=EXCLUDED.cancel_token, status='pending', requested_ip=EXCLUDED.requested_ip, created_at=now()`,
      [em, scheduledAt, token, ip]);
    const when = new Date(scheduledAt).toUTCString();
    const cancelUrl = `${siteBase}/api/account/delete/cancel?token=${token}&email=${encodeURIComponent(em)}`;
    await sendMail(em, 'Запрос на удаление памяти / Memory deletion requested', shell('Удаление запланировано',
      `<p>Поступил запрос на <b>удаление твоей памяти и аккаунта</b>.</p>
       <p>Удаление произойдёт через <b>72 часа</b> — ${when}. До этого момента всё можно отменить.</p>
       <p><b>Это был не ты?</b> Нажми, чтобы <b>отменить удаление</b>:</p>
       <p><a href="${cancelUrl}" style="display:inline-block;background:#10B981;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700">Отменить удаление / Cancel</a></p>
       <p style="color:#9ca3af;font-size:12px">IP запроса: ${ip}</p>`));
    await p.end();
    return { ok: true, scheduledAt };
  } catch (e) { await p.end().catch(() => {}); console.error('[requestDeletion]', e); return { ok: false, error: 'db_error' }; }
}

export async function cancelDeletion(email: string, token: string): Promise<boolean> {
  const p = await pool();
  try {
    const r = await p.query(`UPDATE account_deletions SET status='cancelled' WHERE email=$1 AND cancel_token=$2 AND status='pending' RETURNING email`, [email.toLowerCase(), token]);
    if ((r.rowCount || 0) > 0) await sendMail(email.toLowerCase(), 'Удаление отменено / Deletion cancelled', shell('Удаление отменено', '<p>Запрос на удаление твоей памяти <b>отменён</b>. Данные в безопасности. 🔒</p>'));
    await p.end();
    return (r.rowCount || 0) > 0;
  } catch (e) { await p.end().catch(() => {}); console.error('[cancelDeletion]', e); return false; }
}

/** Cron: purge accounts whose 72h grace has elapsed. Returns count purged. */
export async function processExpiredDeletions(): Promise<number> {
  const p = await pool();
  let n = 0;
  try {
    const due = await p.query(`SELECT email FROM account_deletions WHERE status='pending' AND scheduled_at <= $1`, [Date.now()]);
    for (const row of due.rows) {
      const em = String(row.email).toLowerCase();
      const byEmail = ['chat_memory','user_keys','user_progress','user_balances','galatin_ledger','daily_claims','quest_progress','game_scores','game_daily','xp_daily','passports','pay_orders','memory_arweave_log','account_pins','known_ips'];
      for (const t of byEmail) { try { await p.query(`DELETE FROM ${t} WHERE email=$1`, [em]); } catch {} }
      for (const [t, col] of [['referrals','user_email'],['referrals','referrer_email'],['referral_earnings','earner_email'],['referral_earnings','source_email'],['referral_payouts','email']] as [string,string][]) {
        try { await p.query(`DELETE FROM ${t} WHERE ${col}=$1`, [em]); } catch {}
      }
      try { await p.query(`DELETE FROM users WHERE email=$1`, [em]); } catch {}
      await p.query(`UPDATE account_deletions SET status='done' WHERE email=$1`, [em]);
      await sendMail(em, 'Память удалена / Memory deleted', shell('Удаление завершено', '<p>Твоя память и аккаунт <b>полностью удалены</b>, как было запрошено. Зашифрованные копии в блокчейне навсегда останутся нечитаемыми (ключ уничтожен).</p>'));
      n++;
    }
    await p.end();
  } catch (e) { await p.end().catch(() => {}); console.error('[processExpiredDeletions]', e); }
  return n;
}

// ── New-IP login alert ──
export async function checkAndRecordIp(email: string, ip: string, siteBase: string): Promise<void> {
  if (!email || !ip || ip === 'unknown') return;
  const em = email.toLowerCase();
  const p = await pool();
  try {
    const seen = await p.query(`SELECT 1 FROM known_ips WHERE email=$1 AND ip=$2`, [em, ip]);
    const isFirstEver = (await p.query(`SELECT count(*)::int c FROM known_ips WHERE email=$1`, [em])).rows[0].c === 0;
    await p.query(`INSERT INTO known_ips(email, ip) VALUES($1,$2) ON CONFLICT(email,ip) DO NOTHING`, [em, ip]);
    await p.end();
    // Alert only for a genuinely NEW ip that isn't the user's very first login.
    if ((seen.rowCount || 0) === 0 && !isFirstEver) {
      await sendMail(em, 'Новый вход в аккаунт / New sign-in', shell('Новый вход',
        `<p>В твой аккаунт CODE вошли с <b>нового IP-адреса</b>: <b>${ip}</b> (${new Date().toUTCString()}).</p>
         <p>Если это ты — всё в порядке. Если нет — смени пароль и <a href="${siteBase}/cabinet" style="color:#22D3EE">проверь аккаунт</a>.</p>`));
    }
  } catch (e) { await p.end().catch(() => {}); console.error('[checkAndRecordIp]', e); }
}
