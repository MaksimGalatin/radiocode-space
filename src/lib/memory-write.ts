/**
 * ДОСЛОВНАЯ ЗАПИСЬ ПЕРЕПИСКИ — одна на всех, кто её делает.
 *
 * ЗАЧЕМ вынесено сюда. До 12.08.2026 эта логика жила ТОЛЬКО в ручке
 * `/api/memory/append`, а ручку звал браузер отдельным запросом после каждого
 * ответа. Значит, дословный слой держался на том, что человек не закрыл вкладку,
 * что сеть не моргнула и что на странице вообще есть сессия. Замер в боевой базе
 * показал итог: в `chat_memory` (SUBMISSIONS_DB_URL) значение `chat_type` бывает
 * только 'terminal' и 'oracle' — записей главного чата ('main') нет НИ У КОГО,
 * при том что смысловой слой (DATABASE_URL_VECTOR) пишется на сервере и цел, там
 * 322 806 записей.
 *
 * Поэтому запись переехала в общую функцию: её зовёт и прежняя ручка (снаружи
 * ничего не изменилось, старый вызов из браузера работает), и сам чат
 * `/api/aifa-chat` — там же и тогда же, где пишется смысловой слой. Дублировать
 * этот код было нельзя: он про шифрование и про перезапись единственной строки
 * с историей человека, и две расходящиеся копии рано или поздно разошлись бы в
 * том, как они эту строку перезаписывают.
 */
import { getOrCreateUserKey, encryptForUser, decryptForUser } from './user-key';
import { SEAL_THRESHOLD, ensureChunkTable } from './memory-archive';

/** Почему запись не состоялась — теми же словами, что ручка отдаёт наружу. */
export type ПричинаОтказа = 'empty' | 'no_db' | 'prev_unreadable' | 'key_error' | 'db_error';

export type РезультатЗаписи =
  | { ok: true; duplicate?: boolean }
  | { ok: false; error: ПричинаОтказа };

/**
 * Окно, внутри которого одинаковая пара «вопрос-ответ» считается повтором.
 *
 * ЗАЧЕМ окно, а не просто совпадение текста. Повтор здесь бывает ровно один —
 * когда сервер уже записал пару, а следом ту же пару шлёт браузер (секунды).
 * Но человек имеет право задать тот же вопрос и через час, получить тот же
 * ответ — и это уже не повтор, а часть его переписки, терять её нельзя.
 */
const ОКНО_ПОВТОРА_МС = 15 * 60_000;

/**
 * Тело записи без меток времени — по нему и сверяем повтор.
 * Сервер и браузер пишут одну пару в разные секунды, поэтому дословное
 * совпадение строк не сработало бы: различалось бы только время.
 */
function убратьВремя(s: string): string {
  return s.replace(/### \[[^\]\n]{0,40}\]/g, '###');
}

/** Время последней записи в сохранённой переписке (мс) или null, если не разобрать. */
function времяПоследнейЗаписи(prev: string): number | null {
  const метки = prev.match(/### \[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]/g);
  if (!метки || метки.length === 0) return null;
  // '### ['.length === 5, отрезаем и завершающую ']'
  const последняя = метки[метки.length - 1].slice(5, -1);
  const t = new Date(последняя.replace(' ', 'T') + 'Z').getTime(); // метки пишутся в UTC
  return Number.isNaN(t) ? null : t;
}

/** Класс причины по тексту исключения. Сам ключ наружу не уходит — только класс. */
function классПричины(e: unknown): ПричинаОтказа {
  const msg = String((e as any)?.message || e);
  return /MEMORY_MASTER_KEY|KMS|kms|Unsupported state|bad decrypt|unable to authenticate/.test(msg)
    ? 'key_error'
    : 'db_error';
}

/**
 * Дописывает одну пару «вопрос-ответ» к дословной зашифрованной памяти человека.
 *
 * @param email    почта из сессии. Пусто — вызывающий не должен нас звать.
 * @param chatType 'main' | 'terminal' | 'oracle' — тот же, что у смыслового слоя.
 * @param at       исходное время реплики при восстановлении утраченной переписки;
 *                 обычно не задаётся и берётся текущее.
 */
export async function appendVerbatim(
  email: string,
  chatType: string,
  userMessage: string,
  assistantMessage: string,
  at?: string,
): Promise<РезультатЗаписи> {
  const тип = String(chatType || 'terminal').trim().toLowerCase().slice(0, 24);
  const userMsg = String(userMessage || '').slice(0, 8000);
  const aiMsg = String(assistantMessage || '').slice(0, 12000);
  if (!userMsg && !aiMsg) return { ok: false, error: 'empty' };
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return { ok: false, error: 'no_db' };

  // Время реплики. Обычно текущее, но при восстановлении утраченной переписки
  // можно передать исходное — иначе старый разговор лёг бы сегодняшним числом и
  // хронология, ради которой всё и ведётся, оказалась бы испорчена.
  //
  // Проверяем: значение должно разбираться как дата и не быть из будущего
  // (допуск пять минут на расхождение часов). Иначе — текущее время.
  const atRaw = String(at || '').trim();
  let when = new Date();
  if (atRaw) {
    const parsed = new Date(atRaw);
    if (!Number.isNaN(parsed.getTime()) && parsed.getTime() <= Date.now() + 5 * 60_000) {
      when = parsed;
    }
  }
  const ts = when.toISOString().replace('T', ' ').slice(0, 19);
  const entry = `### [${ts}] User\n${userMsg}\n\n---\n\n### [${ts}] AIfa\n${aiMsg}\n\n---\n\n`;

  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const em = email.trim().toLowerCase();
    const r = await pool.query(`SELECT ciphertext FROM chat_memory WHERE email=$1 AND chat_type=$2`, [em, тип]);
    let prev = '';
    // ЕСЛИ прежняя запись есть, но не читается — НИЧЕГО НЕ ПИШЕМ.
    //
    // Здесь была тихая потеря всей переписки. Раньше при неудачной расшифровке
    // prev просто обнулялся, а ниже строка целиком перезаписывается новым
    // значением (DO UPDATE SET ciphertext=...). То есть одна неудачная
    // расшифровка стирала всю историю человека и заменяла её одной последней
    // репликой — молча, с ответом «ok».
    //
    // Так и вышло на radiocode: там ключ MEMORY_MASTER_KEY был заведён пустым,
    // расшифровка падала на каждом обращении. Спасло только то, что следом
    // падала и зашифровка, и запись не доходила до базы. Полагаться на такую
    // случайность нельзя.
    //
    // Теперь: не прочитали прежнее — честно отвечаем ошибкой и оставляем
    // сохранённое нетронутым. Лучше потерять одну реплику, чем всю память.
    if (r.rows[0]?.ciphertext) {
      try {
        // ОТКРЫТЫЙ ТЕКСТ ИЛИ ШИФР — понимаем оба (16.08.2026, раздел 10
        // Конституции). Во время перевода базы в таблице лежат оба вида.
        // Дословная переписка всегда начинается с отметки реплики `### [`.
        prev = r.rows[0].ciphertext.trimStart().startsWith('###')
          ? r.rows[0].ciphertext
          : await decryptForUser(email, r.rows[0].ciphertext);
      } catch (e) {
        await pool.end();
        console.error('[memory/append] прежняя запись не расшифровалась — запись прервана, история сохранена', em, тип, e);
        return { ok: false, error: 'prev_unreadable' };
      }
    }

    // ЗАЩИТА ОТ УДВОЕНИЯ. Ту же пару шлёт браузер вслед за сервером: сервер
    // пишет внутри /api/aifa-chat ещё до того, как ответ ушёл человеку, а
    // браузер зовёт /api/memory/append уже получив его. Сверяем последнюю
    // запись без меток времени: совпала и записана только что — выходим с
    // успехом, ничего не трогая.
    if (prev) {
      const свежая = убратьВремя(prev).endsWith(убратьВремя(entry));
      if (свежая) {
        const было = времяПоследнейЗаписи(prev);
        // Время не разобралось — считаем повтором: удвоить память хуже, чем
        // пропустить одну заведомо уже сохранённую пару.
        if (было === null || Date.now() - было < ОКНО_ПОВТОРА_МС) {
          await pool.end();
          return { ok: true, duplicate: true };
        }
      }
    }

    // ensure key exists (idempotent)
    await getOrCreateUserKey(email);
    let combined = prev + entry;
    // Seal-instead-of-trim: never discard history. When the live blob would
    // exceed SEAL_THRESHOLD, freeze the prior transcript into an immutable chunk
    // (< ~91 KB ciphertext → free Arweave) and restart the live blob with just
    // the new entry, so the FULL history stays server-readable across chunks.
    if (Buffer.byteLength(combined, 'utf8') > SEAL_THRESHOLD && prev) {
      await ensureChunkTable(pool);
      const idxRes = await pool.query(
        `SELECT COALESCE(MAX(chunk_index),0)+1 AS n FROM chat_memory_chunks WHERE email=$1 AND chat_type=$2`,
        [em, тип]);
      const nextIdx = Number(idxRes.rows[0].n);
      // В базу — ОТКРЫТЫЙ ТЕКСТ (раздел 10). Шифруется только то, что уходит
      // в Arweave: цепь публична и необратима. Прикладное шифрование базы
      // уже стоило 227 нечитаемых реплик из 665.
      const sealed = prev;
      await pool.query(
        `INSERT INTO chat_memory_chunks(email,chat_type,chunk_index,ciphertext) VALUES($1,$2,$3,$4)
         ON CONFLICT(email,chat_type,chunk_index) DO NOTHING`,
        [em, тип, nextIdx, sealed]);
      combined = entry;
    }
    // Живой блок — открытым текстом (раздел 10). Имя переменной прежнее:
    // её значение сравнивает сторож записи ниже.
    const cipher = combined;
    await pool.query(
      `INSERT INTO chat_memory(email, chat_type, ciphertext) VALUES($1,$2,$3)
       ON CONFLICT(email, chat_type) DO UPDATE SET ciphertext=EXCLUDED.ciphertext, updated_at=now()`,
      [em, тип, cipher]);
    await pool.end();
    return { ok: true };
  } catch (e) {
    console.error('[memory/append]', e);
    // Называем причину. «db_error» на всё подряд однажды стоил целого разбора:
    // база была исправна, а не работал ключ шифрования — и по ответу этого было
    // не видно. Сам ключ наружу, разумеется, не уходит: только класс причины.
    return { ok: false, error: классПричины(e) };
  }
}
