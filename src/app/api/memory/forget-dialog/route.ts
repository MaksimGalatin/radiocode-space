import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import { сессияДействительна } from '@/lib/user-auth';
import { getDbPool } from '@/lib/db-pool';
import { диалогиЧеловека, уничтожитьДиалог } from '@/lib/user-key';
import { маскаПочты } from '@/lib/log-privacy';

export const dynamic = 'force-dynamic';

/**
 * ЗАБЫТЬ ОДИН ДИАЛОГ — не всю память.
 *
 * ЗАЧЕМ. Требование Архитектора 25.08.2026: «каждый диалог шифруется отдельно
 * при выгрузке в блокчейн, чтобы можно было удалить ОДИН диалог стерев его
 * ключ, а не всю память. И мы это должны были уже давно доделать».
 *
 * Крипто-шреддинг существовал с 16.08.2026, но действия для человека не было:
 * `/api/memory/registry` только ПОКАЗЫВАЛ ключи, а уничтожение работало по
 * одному ключу за раз. Замер 25.08.2026: 222 ключа на один диалог — пройти их
 * поштучно человек не может. Обещание было, возможности не было.
 *
 * ЧТО ЗДЕСЬ ПРОИСХОДИТ. GET отдаёт перечень диалогов человека: что можно
 * забыть и сколько там ключей. POST затирает ВСЕ ключи одного диалога, и
 * его копии в блокчейне становятся шумом навсегда.
 *
 * ПОЧЕМУ ВСЕ КЛЮЧИ, А НЕ ПОСЛЕДНИЙ. В блокчейне лежит не одно состояние
 * разговора, а все прежние: оттуда ничего не изымается. Оставить один ключ
 * значит оставить читаемым один старый слепок этого же разговора.
 *
 * ПОЧЕМУ ТОЛЬКО СВОЁ. Почта берётся ИЗ СЕССИИ. Параметра с чужой почтой здесь
 * нет вообще — подставить нечего. Ровно на обратном 12.08.2026 сгорела ручка
 * `/api/cabinet/history` на aifa.works: брала почту из запроса и два месяца
 * отдавала чужую переписку кому угодно.
 *
 * ПОЧЕМУ ТРЕБУЕТСЯ ПОВТОРИТЬ МЕТКУ. Действие необратимо (раздел 18). Человек
 * присылает `подтверждение`, дословно равное `ссылка`. Случайным нажатием
 * такое не выходит.
 *
 * ЧЕГО ЗДЕСЬ НЕТ. Записи в базе не трогаются: в базе переписка лежит открытым
 * текстом (раздел 10), и её удаление — отдельный разговор. Здесь закрывается
 * ровно вечная копия, изъять которую иначе нельзя.
 */
export async function GET(req: NextRequest) {
  const ip = clientIp(req as never);
  if (ip !== 'unknown' && !(await dbRateLimit(`forget-list:${ip}`, 60, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  try {
    const диалоги = await диалогиЧеловека(email);
    return NextResponse.json({
      диалоги: диалоги.map((д) => ({
        ссылка: д.ссылка,
        ключей: д.ключей,
        закрытых: д.закрытых,
        последняя: д.последняя,
        можноЗабыть: д.ключей > 0,
      })),
      пояснение:
        'Забыть диалог — значит уничтожить ключи его копий в блокчейне. ' +
        'Оттуда ничего не изымается: копии останутся, но станут нечитаемым ' +
        'шумом навсегда. Отменить это нельзя.',
    });
  } catch {
    return NextResponse.json({ error: 'db_unavailable' }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req as never);
  // Порог низкий намеренно: это не то действие, которое делают пачкой.
  if (ip !== 'unknown' && !(await dbRateLimit(`forget-do:${ip}`, 10, 3_600_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let тело: { ссылка?: unknown; подтверждение?: unknown };
  try {
    тело = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  const ссылка = typeof тело.ссылка === 'string' ? тело.ссылка.trim() : '';
  const подтверждение =
    typeof тело.подтверждение === 'string' ? тело.подтверждение.trim() : '';

  if (!ссылка) {
    return NextResponse.json(
      { error: 'нужна ссылка на диалог', подсказка: 'возьмите её из GET этой же ручки' },
      { status: 400 });
  }
  if (подтверждение !== ссылка) {
    return NextResponse.json(
      {
        error: 'подтверждение не совпадает',
        подсказка: 'пришлите поле `подтверждение`, дословно равное `ссылка`',
      },
      { status: 400 });
  }

  // Диалог должен принадлежать этому человеку. Проверяем по его же перечню,
  // а не по присланной строке: иначе чужая метка ушла бы прямо в UPDATE.
  let свои: Awaited<ReturnType<typeof диалогиЧеловека>>;
  try {
    свои = await диалогиЧеловека(email);
  } catch {
    return NextResponse.json({ error: 'db_unavailable' }, { status: 503 });
  }
  const этот = свои.find((д) => д.ссылка === ссылка);
  if (!этот) {
    return NextResponse.json({ error: 'такого диалога у вас нет' }, { status: 404 });
  }
  if (этот.ключей === 0) {
    return NextResponse.json(
      { забыто: 0, итог: 'этот диалог уже забыт', ссылка }, { status: 200 });
  }

  let забыто = 0;
  try {
    забыто = await уничтожитьДиалог(email, ссылка);
  } catch {
    return NextResponse.json({ error: 'не удалось' }, { status: 500 });
  }

  // След действия. Не ради контроля над человеком, а ради ответа на его же
  // будущий вопрос «я это делал или нет» — вернуть-то нельзя.
  try {
    const pool = await getDbPool();
    await pool.query(
      `INSERT INTO consents(email, kind, ip, user_agent, site)
       VALUES($1,$2,$3,$4,$5)`,
      [
        email.trim().toLowerCase(),
        `memory-forget-dialog:${ссылка}:${забыто}`,
        ip,
        req.headers.get('user-agent')?.slice(0, 300) ?? '',
        'radiocode.space',
      ]);
  } catch {
    // След не записался — само забвение уже состоялось, врать об этом нельзя.
    console.warn('[forget-dialog] след не записан для', маскаПочты(email));
  }

  return NextResponse.json({
    забыто,
    ссылка,
    итог:
      `Уничтожено ключей: ${забыто}. Копии этого диалога в блокчейне ` +
      'стали нечитаемым шумом навсегда. Остальная память не тронута.',
  });
}
