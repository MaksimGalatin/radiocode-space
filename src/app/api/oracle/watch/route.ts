import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

/**
 * Правовой Щит и наблюдение Оракула живут на aifa.works — там Оракул.
 *
 * Кабинет у нас общий на четырёх сайтах, и человек может открыть вкладку Щита
 * где угодно. Чтобы не заводить четыре копии обработчиков и четыре набора
 * данных, здесь стоит пересыл: почту берём из СВОЕЙ сессии и подписываем вызов
 * общим внутренним секретом. Почта в заголовке без секрета не принимается —
 * иначе подстановкой чужого адреса можно было бы управлять чужими доменами.
 *
 * Если пересыл не настроен (нет переменных), отвечаем честной ошибкой, а не
 * бодрым «готово»: подписка, о которой человек думает, что она есть, хуже
 * отсутствия подписки.
 */
const TARGET = 'https://aifa.works/api/oracle/watch';

async function forward(req: NextRequest, method: 'GET' | 'POST' | 'DELETE') {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  // Ограничение частоты нужно ЗДЕСЬ, а не только на приёмной стороне.
  //
  // Пересыл ходит на aifa.works с нашим внутренним секретом, то есть от имени
  // доверенного своего. Без ограничения на входе любой вошедший человек мог бы
  // через наш сайт долбить Оракул сколько угодно, и там это выглядело бы как
  // поток от одного доверенного источника. Страж (scripts/guard.mjs) правильно
  // отметил это как публичный маршрут без ограничения.
  // Счёт в базе: это относ на центральный сайт, и он тратит НАШ исходящий
  // запрос ещё до того, как центр успеет отказать.
  const адрес_owatch_proxy = clientIp(req as never);
  if (адрес_owatch_proxy !== 'unknown' && !(await dbRateLimit(`owatch_proxy:${адрес_owatch_proxy}`, 30, 60_000))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const secret = process.env.AIFA_INTERNAL_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'proxy_not_configured', message: 'Не задан AIFA_INTERNAL_SECRET' },
      { status: 503 });
  }

  const url = new URL(req.url);
  const target = TARGET + (url.search || '');
  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-aifa-internal': secret,
      'x-aifa-user': email,
    },
    signal: AbortSignal.timeout(25000),
  };
  if (method === 'POST') init.body = await req.text();

  try {
    const r = await fetch(target, init);
    const text = await r.text();
    return new NextResponse(text, {
      status: r.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('[shield-proxy]', e);
    return NextResponse.json({ error: 'upstream_unavailable' }, { status: 502 });
  }
}

export async function GET(req: NextRequest) { return forward(req, 'GET'); }
export async function POST(req: NextRequest) { return forward(req, 'POST'); }
export async function DELETE(req: NextRequest) { return forward(req, 'DELETE'); }
