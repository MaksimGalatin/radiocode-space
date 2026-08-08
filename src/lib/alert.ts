/**
 * Lightweight self-hosted monitoring: email the owner on critical server errors.
 * No external service (no Sentry). Throttled to max 1 identical alert / hour via
 * the shared rate_limits table, so a failing endpoint can't flood the inbox.
 */
import crypto from 'crypto';

const OWNER = 'codeofdigitaleternity@gmail.com';

async function throttleOk(key: string): Promise<boolean> {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return true;
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const now = Date.now();
    const r = await pool.query(
      `INSERT INTO rate_limits(k, count, reset_at) VALUES($1, 1, $2)
       ON CONFLICT (k) DO UPDATE SET
         count = CASE WHEN rate_limits.reset_at < $3 THEN 1 ELSE rate_limits.count + 1 END,
         reset_at = CASE WHEN rate_limits.reset_at < $3 THEN $2 ELSE rate_limits.reset_at END
       RETURNING count`,
      [key, now + 3600_000, now]);
    await pool.end();
    return Number(r.rows[0].count) <= 1; // only the first in the hour passes
  } catch { return true; }
}

/** Fire-and-forget critical alert to the owner's email. Never throws. */
export async function alertOwner(subject: string, detail: string, site?: string): Promise<void> {
  try {
    const key = 'alert:' + crypto.createHash('sha256').update(subject).digest('hex').slice(0, 16);
    if (!(await throttleOk(key))) return;
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || process.env.SMTP_FROM || 'CODE Eternal <noreply@codeofdigitaleternity.com>';
    if (!apiKey) return;
    const html = `<div style="background:#030712;color:#e5e7eb;font-family:sans-serif;padding:24px;border-radius:12px;border:1px solid #7f1d1d">
      <h2 style="color:#ef4444">⚠️ CODE Eternal — Alert${site ? ' · ' + site : ''}</h2>
      <p><b>${subject}</b></p>
      <pre style="white-space:pre-wrap;background:#0b0f1a;padding:12px;border-radius:8px;font-size:12px;color:#f87171">${(detail || '').slice(0, 2000)}</pre>
      <p style="color:#6b7280;font-size:12px">${new Date().toISOString()}</p></div>`;
    // 🔴 ОТВЕТ ПОЧТОВОГО СЕРВИСА ПРОВЕРЯЕМ. Раньше здесь стоял голый `await fetch`
    // без разбора ответа: отказ Resend (нет ключа, домен не подтверждён, исчерпан
    // предел) выглядел ровно так же, как успешная отправка. Тревога, о которой
    // никто не узнал, хуже отсутствия тревоги — она создаёт уверенность, что
    // сторож работает.
    const отклик = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: OWNER, subject: `⚠️ CODE Alert: ${subject}`, html }),
    });
    if (!отклик.ok) {
      const текст = await отклик.text().catch(() => '');
      console.error(`[тревога] письмо НЕ ушло: HTTP ${отклик.status} ${текст.slice(0, 200)}`);
      return;
    }
    // Идентификатор от чужой стороны — единственное настоящее доказательство
    // отправки. Без него в журнале не отличить «ушло» от «промолчали».
    const тело = (await отклик.json().catch(() => ({}))) as { id?: string };
    console.log(`[тревога] письмо отправлено, id ${тело.id || 'без идентификатора'}: ${subject}`);
  } catch { /* never throw from an alerter */ }
}
