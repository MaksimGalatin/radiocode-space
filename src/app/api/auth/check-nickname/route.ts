import { NextRequest, NextResponse } from 'next/server';
import { relayGetAuth } from '@/lib/auth-relay';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

// Живая проверка никнейма отнесена на центральную реализацию.
//
// Правила ника — длина, допустимые знаки, список занятых и запретных имён —
// живут в одном месте (lib/nicknames на центральном сайте). Копия правил на
// каждом сайте означала бы четыре расходящихся списка запретных имён, а имя
// должно быть занято сразу на всех четырёх: база у сайтов общая.
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Свой предел, а не только центральный. Относ тратит НАШ исходящий запрос
  // ещё до того, как центр успеет отказать, поэтому перебор ников бьёт по
  // нашей квоте даже когда центр отвечает «слишком часто». Здесь предел
  // щедрее центрального (120 против 90): грубый перебор отсекается тут, а
  // тонкую настройку делает центр — источник правды о занятых именах.
  // Счёт в базе: счётчик в памяти процесса обнуляется при каждой выкладке.
  const адрес = clientIp(req as never);
  if (адрес !== 'unknown' && !(await dbRateLimit(`check_nickname:${адрес}`, 120, 60_000))) {
    return NextResponse.json({ available: false, reason: 'Too many requests' }, { status: 429 });
  }
  return relayGetAuth(req, 'check-nickname');
}
