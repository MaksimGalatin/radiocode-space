import { NextRequest, NextResponse } from 'next/server';
import { centralConfig, buildCentralHeaders, centralFetch } from '@/lib/central-proxy';
import { dbRateLimit } from '@/lib/rate-limit-db';

/**
 * ДОКУМЕНТЫ ЧЕЛОВЕКА — ПЕРЕСЫЛКА В ЦЕНТР (29.09.2026). Один файл на три спутника, байт в байт.
 *
 * Всё хранение и распознавание живёт на центральном сайте (lib/dokumenty.ts): одна база, одни
 * ключи, одно хранилище R2 — кабинет единый на все 4 сайта (раздел 34 Конституции). Здесь только
 * узнаём вошедшего по сессии ЭТОГО сайта и передаём его почту центру заголовком вместе с общим
 * секретом. Почту из тела запроса не берём никогда.
 */
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const НУЖЕН_ВХОД: Record<string, string> = {
  ru: 'Чтобы прикладывать документы, войди в личный кабинет: файлы хранятся в твоей учётной записи.',
  en: 'Please sign in to attach documents: files are stored in your account.',
  es: 'Inicia sesión para adjuntar documentos: los archivos se guardan en tu cuenta.',
  zh: '请先登录再添加文档：文件保存在你的账户中。',
};

const СЛИШКОМ_ЧАСТО: Record<string, string> = {
  ru: 'Слишком много запросов подряд — подожди минуту и попробуй снова.',
  en: 'Too many requests in a row — please wait a minute and try again.',
  es: 'Demasiadas solicitudes seguidas: espera un minuto y vuelve a intentarlo.',
  zh: '请求过于频繁，请等一分钟再试。',
};

async function переслать(request: NextRequest, метод: 'GET' | 'POST' | 'DELETE'): Promise<Response> {
  const я = request.nextUrl.searchParams.get('locale') || 'ru';
  let email = '';
  try {
    const { getFreshSessionEmail } = await import('@/lib/user-auth');
    email = ((await getFreshSessionEmail(request)) || '').trim().toLowerCase();
  } catch (e) {
    console.error('[документы/спутник] сессия не прочитана:', String(e).slice(0, 200));
  }
  if (!email) {
    return NextResponse.json({ success: false, error: 'auth_required', userMessage: НУЖЕН_ВХОД[я] || НУЖЕН_ВХОД.ru }, { status: 401 });
  }
  // ПРЕДЕЛ ЧАСТОТЫ НА ЧЕЛОВЕКА (29.09.2026): страж guard.mjs — «публичный роут без ограничения
  // частоты». Ключ свой, «documents-relay:», чтобы не складываться со счётчиком центра: база общая.
  // Центр держит свои пределы по методам; при сбое базы dbRateLimit пропускает.
  if (!(await dbRateLimit(`documents-relay:${email}`, 120, 60_000))) {
    return NextResponse.json(
      { success: false, error: 'rate_limited', userMessage: СЛИШКОМ_ЧАСТО[я] || СЛИШКОМ_ЧАСТО.ru },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  }
  const центр = centralConfig();
  if (!центр) {
    return NextResponse.json({ success: false, error: 'central_not_configured' }, { status: 503 });
  }
  const заголовки = buildCentralHeaders(request, центр.secret, { 'x-aifa-user-email': email });
  const тип = request.headers.get('content-type');
  if (тип && метод === 'POST') заголовки['content-type'] = тип;
  const адрес = `${центр.base}/api/documents${request.nextUrl.search}`;
  const ответ = await centralFetch(адрес, {
    method: метод,
    headers: заголовки,
    body: метод === 'POST' ? await request.arrayBuffer() : undefined,
    cache: 'no-store',
  });
  if (!ответ) {
    return NextResponse.json({
      success: false, error: 'central_unavailable',
      userMessage: 'Центр AIfa сейчас не ответил — попробуй через минуту. / AIfa’s central server did not answer — please try again in a minute.',
    }, { status: 503 });
  }
  // Ответ центра отдаём как есть: и JSON, и двоичный оригинал файла при скачивании.
  const выход = new Headers();
  for (const h of ['content-type', 'content-disposition', 'cache-control', 'x-content-type-options']) {
    const v = ответ.headers.get(h);
    if (v) выход.set(h, v);
  }
  return new Response(ответ.body, { status: ответ.status, headers: выход });
}

export async function GET(request: NextRequest) { return переслать(request, 'GET'); }
export async function POST(request: NextRequest) { return переслать(request, 'POST'); }
export async function DELETE(request: NextRequest) { return переслать(request, 'DELETE'); }
