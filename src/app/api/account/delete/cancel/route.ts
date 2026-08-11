import { NextRequest, NextResponse } from 'next/server';
import { cancelDeletion } from '@/lib/account-security';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Ограничение частоты: отмена удаления.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_account_delete_cancel = clientIp(req as never);
  if (адрес_account_delete_cancel !== 'unknown' && !(await dbRateLimit(`account_delete_cancel:${адрес_account_delete_cancel}`, 10, 3600000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const url = new URL(req.url);
  const token = url.searchParams.get('token') || '';
  const email = url.searchParams.get('email') || '';
  const ok = token && email ? await cancelDeletion(email, token) : false;
  const msg = ok
    ? '✅ Удаление отменено. Твоя память в безопасности.<br>Deletion cancelled. Your memory is safe.'
    : '⚠️ Ссылка недействительна или срок истёк.<br>Link invalid or expired.';
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CODE Eternal</title></head>
  <body style="background:#030712;color:#e5e7eb;font-family:sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">
  <div style="max-width:460px;text-align:center;padding:30px;border:1px solid #1f2937;border-radius:16px;background:rgba(19,19,28,.6)">
  <div style="font-size:22px;font-weight:800;background:linear-gradient(90deg,#06B6D4,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:14px">CODE Eternal</div>
  <p style="font-size:15px;line-height:1.6">${msg}</p>
  <a href="/cabinet" style="display:inline-block;margin-top:18px;color:#22D3EE">← В кабинет</a></div></body></html>`;
  return new NextResponse(html, { status: ok ? 200 : 400, headers: { 'content-type': 'text/html; charset=utf-8' } });
}
