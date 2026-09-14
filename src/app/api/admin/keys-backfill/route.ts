import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied } from '@/lib/admin-guard';
import { обеспечитьКлючПамяти } from '@/lib/user-key';

/**
 * ДОЗАПОЛНЕНИЕ КЛЮЧЕЙ ПАМЯТИ ДЛЯ СТАРЫХ УЧЁТНЫХ ЗАПИСЕЙ.
 *
 * Поручение Архитектора 14.09.2026: «ИСПРАВИТЬ!!!! ДЛЯ НОВЫХ И СТАРЫХ!!!»
 *
 * НОВЫЕ получают ключ при входе — см. `обеспечитьКлючПамяти` в
 * `lib/user-key.ts`, она зовётся из `/api/auth/login`. СТАРЫЕ, кто завёл
 * учётную запись раньше и с тех пор не заходил, ключа не имеют: эта ручка
 * создаёт его им, не дожидаясь следующего входа.
 *
 * ЧТО ОНА ДЕЛАЕТ И ЧЕГО НЕ ДЕЛАЕТ. Только ДОБАВЛЯЕТ недостающее: внутри
 * `getOrCreateUserKey` стоит `ON CONFLICT DO NOTHING`, существующий ключ не
 * трогается и не перевыпускается. Смена ключа — это миграция данных, а не
 * правка строки (раздел 10 Конституции), и здесь её нет.
 *
 * GET  — только показать, у кого ключа нет (ничего не меняет).
 * POST — создать недостающие.
 *
 * Закрыта админской проверкой, как и остальные ручки /api/admin.
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Кто может звать эту ручку: админ по куке ИЛИ внутренний секрет сайтов.
 *
 * ЗАЧЕМ ВТОРОЙ ПУТЬ. Ключи должны создаваться БОЕВЫМ кодом с БОЕВЫМ
 * `MEMORY_MASTER_KEY`. Сделать это скриптом со своей машины нельзя: если
 * локальный мастер-ключ хоть чем-то отличается от боевого, созданные им
 * ключи на боевом не развернутся, и память станет нечитаемой — ровно та
 * авария, которой оплачен раздел 10 Конституции (227 нечитаемых реплик из
 * 665). Внутренний секрет знают только наши сайты; сравнение постоянное по
 * времени, как в релее личности.
 */
async function свой(req: NextRequest): Promise<boolean> {
  if (requireAdmin(req)) return true;
  const crypto = await import('crypto');
  const секрет = process.env.AIFA_INTERNAL_SECRET || '';
  const пришло = req.headers.get('x-aifa-internal') || '';
  if (!секрет || !пришло) return false;
  const a = Buffer.from(пришло, 'utf8'), b = Buffer.from(секрет, 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function собратьЛюдей(): Promise<{ всего: number; безКлюча: string[] }> {
  const { getDbPool } = await import('@/lib/db-pool');
  const p = await getDbPool();
  try {
    // Учётные записи и ключи лежат в одной базе кабинета: сверяем их напрямую.
    const r = await p.query<{ email: string }>(
      `SELECT lower(a.email) AS email
         FROM users_auth a
         LEFT JOIN user_keys k ON lower(k.email) = lower(a.email)
        WHERE k.email IS NULL
        ORDER BY 1`);
    const c = await p.query<{ n: number }>(`SELECT count(*)::int AS n FROM users_auth`);
    return { всего: Number(c.rows[0]?.n || 0), безКлюча: r.rows.map((х) => х.email) };
  } finally { await p.end(); }
}

export async function GET(req: NextRequest) {
  if (!(await свой(req))) return adminDenied();
  const { всего, безКлюча } = await собратьЛюдей();
  return NextResponse.json({
    учётныхЗаписей: всего,
    безКлюча: безКлюча.length,
    почты: безКлюча,
    подсказка: 'POST на этот же адрес создаст недостающие ключи',
  });
}

export async function POST(req: NextRequest) {
  if (!(await свой(req))) return adminDenied();

  const { всего, безКлюча } = await собратьЛюдей();
  const создано: string[] = [];
  const неудачи: string[] = [];

  for (const почта of безКлюча) {
    const ок = await обеспечитьКлючПамяти(почта);
    (ок ? создано : неудачи).push(почта);
  }

  // Встречная проверка ДРУГИМ запросом (раздел 27): пересчитываем заново,
  // а не верим счётчику цикла.
  const после = await собратьЛюдей();

  return NextResponse.json({
    учётныхЗаписей: всего,
    былоБезКлюча: безКлюча.length,
    создано: создано.length,
    неудач: неудачи.length,
    осталосьБезКлюча: после.безКлюча.length,
    почтыБезКлюча: после.безКлюча,
  });
}
