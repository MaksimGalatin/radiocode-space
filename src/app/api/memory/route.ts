import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { readFullTranscript, readAllChannels, ensureChunkTable } from '@/lib/memory-archive';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Read the logged-in user's memory (server-managed chunked scheme). Returns the
// FULL decrypted transcript per chat_type — sealed chunks + the live blob — for
// the owner only. No key entry, works on any device.
export async function GET(req: NextRequest) {
  // Ограничение частоты: чтение и запись памяти.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_memory = clientIp(req as never);
  if (адрес_memory !== 'unknown' && !(await dbRateLimit(`memory:${адрес_memory}`, 60, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const em = email.trim().toLowerCase();
    await ensureChunkTable(pool);
    const meta = await pool.query(
      `SELECT s.chat_type, cm.updated_at
         FROM (SELECT DISTINCT chat_type FROM chat_memory WHERE email=$1
               UNION SELECT DISTINCT chat_type FROM chat_memory_chunks WHERE email=$1) s
         LEFT JOIN chat_memory cm ON cm.email=$1 AND cm.chat_type=s.chat_type
         ORDER BY s.chat_type`, [em]);
    const chats: { chatType: string; text: string; updatedAt: string }[] = [];
    for (const row of meta.rows) {
      const text = await readFullTranscript(pool, em, row.chat_type);
      if (text) chats.push({ chatType: row.chat_type, text, updatedAt: row.updated_at });
    }
    /**
     * ЕДИНЫЙ РАЗГОВОР. Раньше эта ручка отдавала переписку разрезанной по
     * каналам: отдельно чат, отдельно Синаптический Терминал, отдельно Оракул.
     * Человек, начавший разговор в терминале на одном сайте и продолживший в
     * чате на другом, видел два обрывка вместо одной беседы.
     *
     * Теперь рядом с разбивкой отдаётся `unified` — всё склеенное по времени
     * реплик. Разбивку НЕ убираю: на неё может опираться уже написанный
     * кабинет, и менять форму ответа молча значит ломать работающее.
     */
    const unified = await readAllChannels(pool, em);

    /**
     * ПУСТАЯ ПАМЯТЬ ПРИ ЖИВЫХ ЗАПИСЯХ — ЭТО ОТКАЗ, А НЕ «НЕТ ПЕРЕПИСКИ».
     *
     * Если в базе строки есть, а расшифровать не удалось ни одну, ручка раньше
     * молча отдавала 200 и пустую ленту. Снаружи это неотличимо от «человек
     * ещё ничего не написал» — ровно так треть памяти была нечитаемой два
     * месяца и никто не заметил. Теперь такой случай кричит в журнал.
     */
    if (meta.rows.length > 0 && chats.length === 0) {
      console.error(
        `[память] ОТКАЗ РАСШИФРОВКИ: у человека ${meta.rows.length} канал(ов) в базе, ` +
        `но ни один не прочитался. Отдаю пустую ленту — для человека это выглядит ` +
        `как потеря памяти. Проверь MEMORY_MASTER_KEY и учётные данные KMS.`);
    }
    const последнее = meta.rows
      .map((r: any) => r.updated_at)
      .filter(Boolean)
      .sort()
      .pop() || null;

    await pool.end();
    return NextResponse.json({
      ok: true,
      chats,
      unified: { text: unified, chars: unified.length, updatedAt: последнее,
                 channels: meta.rows.map((r: any) => r.chat_type) },
    });
  } catch (e) { console.error('[memory/get]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
