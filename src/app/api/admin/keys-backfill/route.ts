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
  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  const { всего, безКлюча } = await собратьЛюдей();
  return NextResponse.json({
    учётныхЗаписей: всего,
    безКлюча: безКлюча.length,
    почты: безКлюча,
    подсказка: 'POST на этот же адрес создаст недостающие ключи',
  });
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return adminDenied();

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
