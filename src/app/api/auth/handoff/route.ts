import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getFreshSessionEmail } from '@/lib/user-auth';

export const dynamic = 'force-dynamic';

/**
 * ── СКВОЗНОЙ ВХОД: ВЫДАЧА БИЛЕТА (центральная сторона) ──────────────────
 *
 * ЗАЧЕМ ЭТО ЕСТЬ. Кабинет, память и токены у нас ЕДИНЫЕ на четыре сайта
 * (раздел 34 Конституции). А вход — нет: кука `user_session` не ставится
 * сразу на четыре РАЗНЫХ домена верхнего уровня, это запрет браузера, а не
 * наша ошибка. Параметр `domain` у куки работает только для поддоменов
 * одного домена; `codeofdigitaleternity.com`, `aifa.works`, `aifa.digital`
 * и `radiocode.space` — четыре разных корня.
 *
 * ЧЕМ ОПЛАЧЕНО. 09.09.2026 Архитектор открыл `radiocode.space/cabinet` и
 * увидел форму входа, при том что вся его переписка (416 реплик) лежала в
 * общей памяти и открывалась на трёх других сайтах. Его слова: «ВЕСЬ диалог
 * должен быть в любом чате на любом из 4 сайтов — ЕДИНЫЙ ЧАТ, полный,
 * целиком».
 *
 * КАК УСТРОЕНО. Человек, у которого есть живая сессия ЗДЕСЬ, получает
 * короткоживущий билет и уезжает с ним обратно на сайт-спутник. Спутник
 * меняет билет на СВОЮ куку. Куки третьих сторон при этом не нужны — они в
 * современных браузерах всё равно заблокированы.
 *
 * ПОЧЕМУ ЭТО БЕЗОПАСНО:
 *   • билет подписан общим секретом `AIFA_INTERNAL_SECRET` — подделать его
 *     снаружи нельзя;
 *   • живёт 60 секунд: украденный из журнала адрес бесполезен почти сразу;
 *   • содержит `nonce`, поэтому два одинаковых билета не совпадают;
 *   • адрес возврата сверяется с БЕЛЫМ СПИСКОМ наших доменов — иначе это был
 *     бы открытый редирект, которым уводят чужой билет на чужой сайт;
 *   • без живой сессии билет не выдаётся вовсе: ручка отвечает отказом и
 *     возвращает человека на страницу входа.
 *
 * ЧЕГО ЗДЕСЬ НЕТ И БЫТЬ НЕ ДОЛЖНО. Ни пароля, ни самого сессионного токена
 * в адресной строке. В билете только почта и срок.
 */

/** Наши домены. Всё, чего нет в списке, адресом возврата быть не может. */
const СВОИ_ДОМЕНЫ = new Set([
  'codeofdigitaleternity.com',
  'www.codeofdigitaleternity.com',
  'aifa.works',
  'www.aifa.works',
  'aifa.digital',
  'www.aifa.digital',
  'radiocode.space',
  'www.radiocode.space',
]);

const ЖИЗНЬ_БИЛЕТА_МС = 60_000;

/** Билет: `email:exp:nonce:hmac`. Тот же вид подписи, что у сессии. */
export function выписатьБилет(email: string, секрет: string): string {
  const почта = String(email || '').trim().toLowerCase();
  const срок = Date.now() + ЖИЗНЬ_БИЛЕТА_МС;
  const nonce = crypto.randomBytes(9).toString('hex');
  const данные = `${почта}:${срок}:${nonce}`;
  const подпись = crypto.createHmac('sha256', секрет).update(данные).digest('hex');
  return `${данные}:${подпись}`;
}

function безопасныйВозврат(сырой: string | null): string | null {
  if (!сырой) return null;
  let u: URL;
  try {
    u = new URL(сырой);
  } catch {
    return null;
  }
  if (u.protocol !== 'https:') return null;
  if (!СВОИ_ДОМЕНЫ.has(u.hostname)) return null;
  // Свой же билет из адреса убираем, чтобы он не накапливался при повторах.
  u.searchParams.delete('aifa_sso');
  return u.toString();
}

export async function GET(req: NextRequest) {
  const возврат = безопасныйВозврат(req.nextUrl.searchParams.get('return'));
  if (!возврат) {
    return NextResponse.json({ error: 'bad_return' }, { status: 400 });
  }

  const секрет = process.env.AIFA_INTERNAL_SECRET || '';
  if (!секрет) {
    // Без общего секрета билет подписать нечем. Молча возвращаем человека
    // обратно: он просто увидит форму входа, как и раньше.
    return NextResponse.redirect(возврат, { status: 302 });
  }

  let почта = '';
  try {
    почта = (await getFreshSessionEmail(req)) || '';
  } catch {
    почта = '';
  }

  if (!почта) {
    // Здесь человек тоже не вошёл — билету взяться неоткуда. Возвращаем как
    // есть, с пометкой: спутник по ней поймёт, что просить билет второй раз
    // в этой вкладке бессмысленно.
    const назад = new URL(возврат);
    назад.searchParams.set('aifa_sso', 'none');
    return NextResponse.redirect(назад.toString(), { status: 302 });
  }

  // Отправляем не на саму страницу, а на ПРИЁМНИК билета того же сайта:
  // `https://<его домен>/api/auth/sso?ticket=…&return=<куда человек шёл>`.
  // Так обмен билета на куку делает сервер спутника, а не клиентский код, —
  // билет ни секунды не живёт в странице и не попадает в её JavaScript.
  const цель = new URL(возврат);
  const приёмник = new URL(`${цель.protocol}//${цель.host}/api/auth/sso`);
  приёмник.searchParams.set('ticket', выписатьБилет(почта, секрет));
  приёмник.searchParams.set('return', возврат);
  const ответ = NextResponse.redirect(приёмник.toString(), { status: 302 });
  // Билет одноразовый по смыслу и короткий по сроку — кэшировать его нельзя
  // ни браузеру, ни промежуточным узлам.
  ответ.headers.set('Cache-Control', 'no-store, max-age=0');
  return ответ;
}
