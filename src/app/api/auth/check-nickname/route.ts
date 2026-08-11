import { NextRequest } from 'next/server';
import { relayGetAuth } from '@/lib/auth-relay';

// Живая проверка никнейма отнесена на центральную реализацию.
//
// Правила ника — длина, допустимые знаки, список занятых и запретных имён —
// живут в одном месте (lib/nicknames на центральном сайте). Копия правил на
// каждом сайте означала бы четыре расходящихся списка запретных имён, а имя
// должно быть занято сразу на всех четырёх: база у сайтов общая.
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  return relayGetAuth(req, 'check-nickname');
}
