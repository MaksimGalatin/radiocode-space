/**
 * ЧТЕНИЕ ПАМЯТИ ЛЮБОГО ЧЕЛОВЕКА — ТОЛЬКО ДЛЯ АРХИТЕКТОРА.
 *
 * ЗАЧЕМ ЭТА РУЧКА ПОЯВИЛАСЬ. Устройство памяти было верным: у каждого человека
 * свой личный ключ (замер 12.08.2026 — 15 ключей, все разные), своя память
 * открывается своим ключом, чужая не открывается ничем, а ключ проекта в KMS
 * только ОБОРАЧИВАЕТ личные ключи и самой переписки не касается.
 *
 * Но одного не было: Архитектор не мог прочитать память других. Проверено
 * поиском по всем маршрутам — единственное чтение дословного архива,
 * /api/memory/archives/read, берёт почту ИЗ СЕССИИ (getSessionEmail) и потому
 * отдаёт только память самого спрашивающего. Админских ручек одиннадцать, и ни
 * одна к памяти не подключена. То есть право «я читаю любого, каждый только
 * своё» держалось на словах, а не на коде.
 *
 * Как оно устроено теперь. Сервер умеет распаковать личный ключ ЛЮБОГО человека
 * через KMS — это нужно, чтобы почасовая заливка в вечную сеть работала без
 * участия человека. Здесь используется та же возможность, но под замком
 * requireAdmin: почта берётся из ПАРАМЕТРА, а не из сессии, и только после
 * того, как спрашивающий опознан как Архитектор.
 *
 * КАЖДОЕ ЧТЕНИЕ ПИШЕТСЯ В ЖУРНАЛ ДОСТУПА. Это личная переписка людей: доступ к
 * ней обязан оставлять след, иначе завтра нельзя будет ответить на вопрос, кто
 * и когда её открывал. Журнал ведётся тем же auditLog, что и остальные
 * административные действия.
 *
 * Две формы вызова:
 *   GET /api/admin/memory                — список всех, у кого есть память
 *   GET /api/admin/memory?email=…        — вся переписка этого человека целиком
 */
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied, auditLog } from '@/lib/admin-guard';
import { getOrCreateUserKey, decryptWithUserKey } from '@/lib/user-key';
import { getDbPool } from '@/lib/db-pool';

export const dynamic = 'force-dynamic';
/** Расшифровка идёт через KMS и pbkdf2 на каждый блоб — минуты по умолчанию мало. */
export const maxDuration = 60;

type Кусок = { chat_type: string; ciphertext: string; порядок: number };

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return adminDenied();

  const почта = (req.nextUrl.searchParams.get('email') || '').trim().toLowerCase();
  const pool = await getDbPool();

  try {
    // ── Форма 1: у кого вообще есть память ──────────────────────────────────
    if (!почта) {
      const r = await pool.query(`
        SELECT email,
               count(*)                       AS каналов,
               sum(length(ciphertext))::bigint AS байт,
               max(updated_at)                AS последняя
        FROM chat_memory
        GROUP BY email
        ORDER BY последняя DESC NULLS LAST`);

      const куски = await pool.query(`
        SELECT email, count(*) AS кусков FROM chat_memory_chunks GROUP BY email`);
      const покускам = new Map<string, number>(
        куски.rows.map((x: any) => [x.email, Number(x.кусков)])
      );

      await auditLog(pool, admin, 'memory_list', { людей: r.rows.length }, req);

      return NextResponse.json({
        ok: true,
        людей: r.rows.length,
        люди: r.rows.map((x: any) => ({
          email: x.email,
          каналов: Number(x.каналов),
          архивныхКусков: покускам.get(x.email) || 0,
          байтЖивых: Number(x.байт),
          последняя: x.последняя,
        })),
      });
    }

    // ── Форма 2: вся переписка одного человека ──────────────────────────────
    //
    // Порядок важен: сначала АРХИВНЫЕ куски по возрастанию номера, потом живой
    // блоб. Живая часть — это хвост разговора; поставь её первой, и переписка
    // читалась бы с конца.
    const архив = await pool.query<Кусок>(
      `SELECT chat_type, ciphertext, chunk_index AS порядок
         FROM chat_memory_chunks WHERE email = $1
        ORDER BY chat_type, chunk_index`, [почта]);

    const живое = await pool.query<Кусок>(
      `SELECT chat_type, ciphertext, 2147483647 AS порядок
         FROM chat_memory WHERE email = $1
        ORDER BY chat_type`, [почта]);

    const все = [...архив.rows, ...живое.rows];
    if (все.length === 0) {
      await auditLog(pool, admin, 'memory_read', { почта, найдено: 0 }, req);
      return NextResponse.json({ ok: true, email: почта, каналы: [], всегоЗнаков: 0 });
    }

    // Ключ добывается ОДИН раз: каждое обращение — это запрос в базу плюс
    // распаковка в KMS плюс стотысячная прокрутка pbkdf2.
    const ключ = await getOrCreateUserKey(почта);

    const поКаналам = new Map<string, { куски: Кусок[]; текст: string[]; сбоев: number }>();
    for (const к of все) {
      if (!поКаналам.has(к.chat_type)) поКаналам.set(к.chat_type, { куски: [], текст: [], сбоев: 0 });
      поКаналам.get(к.chat_type)!.куски.push(к);
    }

    let всего = 0;
    let сбоевВсего = 0;
    const каналы: Array<{ канал: string; знаков: number; кусков: number; нечитаемых: number; текст: string }> = [];

    for (const [канал, данные] of поКаналам) {
      данные.куски.sort((a, b) => a.порядок - b.порядок);
      for (const к of данные.куски) {
        try {
          данные.текст.push(decryptWithUserKey(ключ, к.ciphertext));
        } catch {
          // Нечитаемое НЕ пропускаем молча: молчаливый пропуск — это ровно то,
          // из-за чего 227 реплик из 665 две недели считались целыми.
          данные.сбоев++;
          данные.текст.push(`\n[НЕ РАСШИФРОВАЛОСЬ: кусок №${к.порядок} канала «${канал}»]\n`);
        }
      }
      const текст = данные.текст.join('\n');
      всего += текст.length;
      сбоевВсего += данные.сбоев;
      каналы.push({
        канал,
        знаков: текст.length,
        кусков: данные.куски.length,
        нечитаемых: данные.сбоев,
        текст,
      });
    }

    await auditLog(pool, admin, 'memory_read',
      { почта, каналов: каналы.length, знаков: всего, нечитаемых: сбоевВсего }, req);

    return NextResponse.json({
      ok: true,
      email: почта,
      всегоЗнаков: всего,
      нечитаемыхКусков: сбоевВсего,
      каналы: каналы.sort((a, b) => b.знаков - a.знаков),
    });
  } catch (e: any) {
    console.error('[админ] чтение памяти не удалось:', e?.message || e);
    return NextResponse.json({ error: 'read_failed' }, { status: 500 });
  } finally {
    await pool.end().catch(() => {});
  }
}
