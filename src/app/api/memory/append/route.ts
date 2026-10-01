import { NextRequest, NextResponse, after } from 'next/server';
import { getFreshSessionEmail } from '@/lib/user-auth';
import { indexMessages, getSiteId } from '@/lib/memory-index';
import { appendVerbatim } from '@/lib/memory-write';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

/**
 * Предел времени ответа — общий для всех ручек разговора
 * на четырёх сайтах (10.09.2026).
 *
 * Здесь его не было вовсе, и работало умолчание площадки —
 * короче, чем занимает ответ с полной памятью (замер: 29–42
 * секунды). Человек получал общую ошибку вместо ответа.
 *
 * Предел — потолок, а не расход: ответ, пришедший за
 * секунду, стоит секунду.
 */
export const maxDuration = 300;

export const dynamic = 'force-dynamic';

// Append one exchange (user + assistant) to the user's memory, encrypted with
// their server-managed key. Called by the cabinet after each AIfa turn.
//
// САМА ЗАПИСЬ ЖИВЁТ В `lib/memory-write.ts`, а не здесь. Причина: этот путь
// зависит от отдельного запроса из браузера, и запрос не уходит, если человек
// закрыл вкладку, если моргнула сеть, если сессии нет. Замер в боевой базе
// показал, что из-за этого главный чат ('main') не сохранялся дословно НИ У
// КОГО. Теперь тот же ход пишет и сервер, внутри /api/aifa-chat, — общей
// функцией, чтобы логика не разошлась на две. Ручка осталась как была: AIfaFocus,
// Терминал и сайты-спутники зовут её по-прежнему, ответы те же.
export async function POST(req: NextRequest) {
  const email = await getFreshSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе, а не в памяти процесса: счётчик в памяти обнуляется при
  // каждой выкладке и у каждого экземпляра свой, поэтому объявленный
  // предел на деле мягче во столько раз, сколько экземпляров поднято.
  const адрес_memappend = clientIp(req as never);
  if (адрес_memappend !== 'unknown' && !(await dbRateLimit(`memappend:${адрес_memappend}`, 60, 60_000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const chatType = String(b?.chatType || 'terminal').trim().toLowerCase().slice(0, 24);
  const userMsg = String(b?.userMessage || '').slice(0, 8000);
  const aiMsg = String(b?.assistantMessage || '').slice(0, 12000);
  if (!userMsg && !aiMsg) return NextResponse.json({ error: 'empty' }, { status: 400 });

  // Сама запись — в общей функции. Сюда передаём ИСХОДНЫЕ строки тела запроса:
  // подрезает и подравнивает их она сама, одинаково для обоих путей записи.
  // Если подравнивать по-разному, отпечатки одного и того же хода разойдутся, и
  // защита от удвоения не сработает.
  //
  // `at` — время реплики: обычно текущее, но при восстановлении утраченной
  // переписки можно передать исходное, иначе старый разговор лёг бы сегодняшним
  // числом и хронология, ради которой всё и ведётся, оказалась бы испорчена.
  const исход = await appendVerbatim(
    email, chatType,
    String(b?.userMessage || ''), String(b?.assistantMessage || ''),
    String(b?.at || ''));
  if (!исход.ok) {
    // Коды ответов те же, что были: 400 на пустую пару, 500 на всё остальное.
    // Причина названа классом («key_error» отдельно от «db_error»): «db_error»
    // на всё подряд однажды стоил целого разбора — база была исправна, а не
    // работал ключ шифрования, и по ответу этого было не видно.
    return NextResponse.json(
      { error: исход.причина },
      { status: исход.причина === 'empty' ? 400 : 500 });
  }

  // Also index this turn into the semantic vector store so AIfa can RECALL it
  // (the archive above only STORES it). Fire-and-forget after the response so
  // it adds no latency; no-ops when embeddings aren't configured on this site.
  // Повторный ход индексировать не вредно: в векторном хранилище стоит
  // UNIQUE (user_key, content_hash), второй раз он просто не ляжет.
  /**
   * ИНДЕКСИРУЕМ ДО ОТВЕТА, А НЕ ПОСЛЕ (16.08.2026).
   *
   * Было `after(...)` — «ответим быстро, доиндексируем потом». Замер живым
   * опытом: реплики, записанные через эту ручку, в смысловую базу НЕ попадали,
   * а лента чата читает именно её — человек видел пустой разговор. На
   * aifa.works та же работа делается до ответа, и там записи появляются.
   *
   * Память — суть продукта, поэтому надёжность важнее сотни миллисекунд.
   * Ошибку глушим: не сохранился смысловой слой — дословный уже сохранён.
   */
  // ТОЛЬКО НОВАЯ ЗАПИСЬ (30.09.2026). На повторе ход уже записан и проиндексирован первым писателем —
  // сервером чата (indexTurn) или прошлым вызовом этой ручки. indexMessages платит за эмбеддинг ДО проверки,
  // есть ли пара в базе, поэтому повторная индексация — прямая двойная плата за каждый ход. Если первый
  // писатель индексацию не довёл, недостающее добирает ночная досборка: она векторизует только новое.
  if (!исход.повтор) {
    try {
      await indexMessages(
        email,
        chatType,
        [
          { role: 'user', content: userMsg, speaker: 'User' },
          { role: 'assistant', content: aiMsg, speaker: 'AIfa' },
        ],
        // Имя площадки из заголовка спутника, иначе своё: реплика со спутника
        // должна остаться помеченной ЕГО именем (16.08.2026).
        req.headers.get('x-aifa-origin-site') || getSiteId()
      );
    } catch (idxErr) {
      console.warn('[memory/append] vector index failed:', idxErr);
    }
  }

  return NextResponse.json({ ok: true });
}
