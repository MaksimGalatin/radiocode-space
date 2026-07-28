import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  // Ограничение частоты: наплыв.
  if (!allowRequest(req as NextRequest, 'auth_logout', 30, 60000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(USER_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  // При выходе просим браузер стереть данные этого сайта.
  //
  // Зачем: человек вышел из кабинета на чужом или общем компьютере. Без этого
  // заголовка в хранилище браузера остаются его сведения — кэш страниц,
  // локальное хранилище, остатки сессии. Следующий, кто сядет за этот
  // компьютер, их увидит.
  //
  // Наш собственный Оракул выставлял нам за это замечание PRIV-LOGOUT-001, и
  // выставлял справедливо. Обязательным требованием закона это не является,
  // но стоит одну строку.
  res.headers.set('Clear-Site-Data', '"cache", "cookies", "storage"');
  return res;
}
