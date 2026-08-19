/**
 * Почасовой сторож расходов на платные ИИ-вызовы.
 *
 * ПОВОД. 16–17 августа 2026 ночная задача `memory-index` сожгла кредит Google:
 * $12.38 и $21.24 в сутки вместо привычного доллара. Никакой сторож не сработал,
 * потому что его не было. Обнаружил Архитектор — глазами, случайно открыв
 * страницу кредитов, когда от $300 оставалось $47.49.
 *
 * ПОЧЕМУ НЕ СМОТРИМ СЧЁТ GOOGLE. Данные Cloud Billing отстают примерно на сутки
 * и почасово не отдаются вовсе. Сторож по счёту узнал бы о пожаре на следующий
 * день — то есть ровно так, как и вышло. Поэтому считаем отправленные символы в
 * момент вызова (см. lib/cost-guard.ts): видно сразу, стоит ноль.
 *
 * КУДА КРИЧИТ. Slack с пометкой СРОЧНО, обе рабочие почты — основная и
 * корпоративная. Требование Архитектора 18.08.2026: «ВЕЗДЕ».
 *
 * ЧТО НЕ ДЕЛАЕТ. Ничего не отключает и не останавливает сам. Сторож только
 * считает и говорит; остановка платного — решение Архитектора (разделы 13 и 18).
 */
import { NextRequest, NextResponse } from 'next/server';
import { checkHour, last24h } from '@/lib/cost-guard';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/** Обе рабочие почты по разделу 1 Конституции. */
const ПОЧТЫ = (process.env.COST_ALERT_EMAILS ||
  'codeofdigitaleternity@gmail.com,contact@codeofdigitaleternity.com')
  .split(',').map((s) => s.trim()).filter(Boolean);

async function вСлак(текст: string): Promise<{ sent: boolean; error?: string }> {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_REPORT_CHANNEL;
  if (!token || !channel) return { sent: false, error: 'нет SLACK_BOT_TOKEN или SLACK_REPORT_CHANNEL' };
  try {
    const r = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ channel, text: текст }),
    });
    const j = await r.json().catch(() => ({}));
    // Ответ Slack ПРОВЕРЯЕМ: отказ выглядит как HTTP 200 с ok:false, и молчащая
    // тревога хуже её отсутствия — она создаёт уверенность, что сторож работает.
    return j?.ok ? { sent: true } : { sent: false, error: String(j?.error || 'slack ok:false') };
  } catch (e) {
    return { sent: false, error: e instanceof Error ? e.message : 'fetch failed' };
  }
}

async function наПочту(тема: string, html: string): Promise<{ sent: number; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || process.env.SMTP_FROM ||
    'CODE Eternal <noreply@codeofdigitaleternity.com>';
  if (!apiKey) return { sent: 0, error: 'нет RESEND_API_KEY' };
  let ok = 0;
  let последняя = '';
  for (const to of ПОЧТЫ) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ from, to, subject: тема, html }),
      });
      if (r.ok) ok++;
      else последняя = `${to}: ${r.status} ${(await r.text()).slice(0, 200)}`;
    } catch (e) {
      последняя = `${to}: ${e instanceof Error ? e.message : 'fetch failed'}`;
    }
  }
  return { sent: ok, error: последняя || undefined };
}

export async function GET(req: NextRequest) { return handle(req); }
export async function POST(req: NextRequest) { return handle(req); }

async function handle(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get('authorization');
  const querySecret = req.nextUrl.searchParams.get('secret');
  const authorized = !!cronSecret &&
    (authHeader === `Bearer ${cronSecret}` || querySecret === cronSecret);
  if (process.env.NODE_ENV === 'production' && !authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const час = await checkHour();
  const сутки = await last24h();

  if (!час.configured) {
    return NextResponse.json({
      ok: false,
      skipped: true,
      reason: 'нет SUBMISSIONS_DB_URL — счётчику некуда писать',
    });
  }

  // След в журнале Vercel. Статус 200 сам по себе НЕ доказывает, что сторож
  // посчитал: ветка `skipped` (нет базы) отдаёт тот же 200. Печатаем числа,
  // чтобы каждое срабатывание было проверяемо задним числом, а не на веру.
  console.log(`[cost-watch] час=${час.hour} $${час.usdTotal.toFixed(4)} ` +
    `порог $${час.threshold.toFixed(2)} сутки $${сутки.usd.toFixed(4)} ` +
    `строк=${час.rows.length} тревога=${час.ok ? 'нет' : 'ДА'}`);

  if (час.ok) {
    return NextResponse.json({
      ok: true,
      alert: false,
      hour: час.hour,
      usd: Number(час.usdTotal.toFixed(4)),
      threshold: час.threshold,
      last24hUsd: Number(сутки.usd.toFixed(4)),
      rows: час.rows,
    });
  }

  const строки = час.rows
    .map((r) => `  ${r.service}: ${r.units.toLocaleString('ru')} симв., ${r.calls} вызовов, $${r.usd.toFixed(4)}`)
    .join('\n');

  const текст =
    `🚨 СРОЧНО — перерасход на платных ИИ-вызовах\n\n` +
    `Час (UTC): ${час.hour}\n` +
    `Потрачено за час: $${час.usdTotal.toFixed(4)} при пороге $${час.threshold.toFixed(2)}\n` +
    `За последние сутки: $${сутки.usd.toFixed(2)} (${сутки.units.toLocaleString('ru')} симв.)\n\n` +
    `Разбивка:\n${строки}\n\n` +
    `Что делать: открыть Google Cloud → Billing → Reports, сгруппировать по SKU\n` +
    `и найти, какой вызов вырос. Остановка платного — только по решению Архитектора.`;

  const html =
    `<div style="background:#030712;color:#e5e7eb;font-family:sans-serif;padding:24px;border-radius:12px;border:1px solid #7f1d1d">
      <h2 style="color:#ef4444">🚨 СРОЧНО — перерасход на платных ИИ-вызовах</h2>
      <p>За час <b>$${час.usdTotal.toFixed(4)}</b> при пороге $${час.threshold.toFixed(2)}.<br/>
         За сутки <b>$${сутки.usd.toFixed(2)}</b>.</p>
      <pre style="white-space:pre-wrap;background:#0b0f1a;padding:12px;border-radius:8px;font-size:12px;color:#f87171">${строки}</pre>
      <p style="color:#6b7280;font-size:12px">Час UTC: ${час.hour} · ${new Date().toISOString()}</p>
    </div>`;

  const slack = await вСлак(текст);
  const mail = await наПочту('🚨 СРОЧНО: перерасход на платных ИИ-вызовах', html);

  return NextResponse.json({
    ok: true,
    alert: true,
    hour: час.hour,
    usd: Number(час.usdTotal.toFixed(4)),
    threshold: час.threshold,
    last24hUsd: Number(сутки.usd.toFixed(4)),
    rows: час.rows,
    slack,
    mail: { sent: mail.sent, of: ПОЧТЫ.length, error: mail.error },
  });
}
