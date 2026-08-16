/**
 * Chunked, server-readable memory archive (Variant A) — shared design with the
 * other CODE sites; the SUBMISSIONS_DB tables are common across all of them.
 *
 * Full per-user transcript = an APPEND-ONLY chain of sealed chunks plus one live
 * "current" blob:
 *   - `chat_memory`         : the live blob (email, chat_type) — small, grows.
 *   - `chat_memory_chunks`  : immutable sealed chunks (email, chat_type, idx).
 *
 * When the live blob would exceed SEAL_THRESHOLD the accumulated history is
 * sealed into the next chunk and the live blob restarts. Nothing is ever
 * trimmed, so the WHOLE history stays server-readable and every piece stays
 * < ~91 KB ciphertext → within Arweave's free (<100 KB) tier. SEAL_THRESHOLD is
 * plaintext bytes: AES-256-GCM + base64 inflates ~1.33×, so 68 KB → ~91 KB.
 */
import { decryptForUser } from './user-key';

export const SEAL_THRESHOLD = 68 * 1024;

/** Create the sealed-chunks table if absent (idempotent). */
export async function ensureChunkTable(pool: any): Promise<void> {
  await pool.query(`CREATE TABLE IF NOT EXISTS chat_memory_chunks(
    email       text NOT NULL,
    chat_type   text NOT NULL,
    chunk_index int  NOT NULL,
    ciphertext  text NOT NULL,
    created_at  timestamptz DEFAULT now(),
    arweave_tx  text,
    synced_hash text,
    PRIMARY KEY (email, chat_type, chunk_index)
  )`);
}

/**
 * The FULL decrypted transcript for one user + chat_type: every sealed chunk
 * (in order) followed by the live blob. Failures on any single piece are skipped
 * so a partial read never throws.
 */
export async function readFullTranscript(pool: any, email: string, chatType: string): Promise<string> {
  const em = email.trim().toLowerCase();
  let out = '';
  try {
    await ensureChunkTable(pool);
    const chunks = await pool.query(
      `SELECT ciphertext FROM chat_memory_chunks WHERE email=$1 AND chat_type=$2 ORDER BY chunk_index`,
      [em, chatType]);
    for (const c of chunks.rows) {
      try { out += await decryptForUser(em, c.ciphertext); } catch { /* skip unreadable chunk */ }
    }
  } catch { /* table missing / query error — fall through to live blob */ }
  try {
    const cur = await pool.query(`SELECT ciphertext FROM chat_memory WHERE email=$1 AND chat_type=$2`, [em, chatType]);
    if (cur.rows[0]?.ciphertext) {
      try { out += await decryptForUser(em, cur.rows[0].ciphertext); } catch { /* skip */ }
    }
  } catch { /* ignore */ }
  return out;
}

/**
 * ВСЯ дословная переписка человека — одним потоком, из всех каналов сразу.
 *
 * ЗАЧЕМ. Дословный слой хранится ключом (почта, канал), и каналов три: 'main'
 * (чат), 'terminal' (Синаптический Терминал) и 'oracle'. Читали его всегда по
 * одному каналу — значит человек, начавший разговор в терминале на одном сайте
 * и продолживший в чате на другом, видел два разных обрывка вместо одного
 * разговора. Смысловой слой (chat_memory в векторной базе) такой болезнью не
 * страдает: он ищется по почте без оглядки на канал. Дословный отставал.
 *
 * ЧТО ДЕЛАЕТ ЭТА ФУНКЦИЯ. Собирает все каналы разом и склеивает по времени
 * реплик, а не по каналам: получается один непрерывный разговор, каким он и был
 * для человека. Канал остаётся видимым в заголовке блока — чтобы не потерялось,
 * где именно шла речь, — но больше не разрезает переписку на части.
 *
 * ПОЧЕМУ СКЛЕЙКА ПО ВРЕМЕНИ, А НЕ ПРОСТО ПОДРЯД. Внутри блоков реплики
 * помечены как «### [2026-08-14 21:05:00] User». Если сложить каналы подряд,
 * получится «весь терминал, потом весь чат», и хронология — то, ради чего
 * память и ведётся, — окажется испорчена. Разбираем по этим отметкам и
 * сортируем по времени; куски без отметки времени сохраняют своё место
 * внутри своего канала и уходят в конец, а не теряются.
 */
export async function readAllChannels(pool: any, email: string): Promise<string> {
  const em = email.trim().toLowerCase();

  // Какие каналы вообще есть у этого человека — спрашиваем базу, а не
  // перечисляем в коде: список каналов со временем меняется, и захардкоженный
  // перечень молча потерял бы новый.
  const каналы = new Set<string>();
  for (const запрос of [
    `SELECT DISTINCT chat_type FROM chat_memory WHERE email=$1`,
    `SELECT DISTINCT chat_type FROM chat_memory_chunks WHERE email=$1`,
  ]) {
    try {
      const r = await pool.query(запрос, [em]);
      for (const строка of r.rows) if (строка?.chat_type) каналы.add(String(строка.chat_type));
    } catch { /* таблицы может не быть — это не ошибка */ }
  }
  if (каналы.size === 0) return '';

  // Собираем каждый канал целиком, затем режем на реплики по отметке времени.
  type Кусок = { когда: string; текст: string; канал: string; порядок: number };
  const куски: Кусок[] = [];
  let порядок = 0;

  for (const канал of каналыПоПорядку(каналы)) {
    const текст = await readFullTranscript(pool, em, канал);
    if (!текст.trim()) continue;
    // Режем по началу реплики, отметку времени оставляем внутри куска.
    const части = текст.split(/(?=### \[)/g);
    for (const часть of части) {
      if (!часть.trim()) continue;
      const м = часть.match(/^### \[([^\]\n]{1,40})\]/);
      куски.push({
        когда: м ? м[1].trim() : '',
        текст: часть,
        канал,
        порядок: порядок++,
      });
    }
  }

  // Реплики без отметки времени не выбрасываем и не перемешиваем: они уходят
  // в конец, сохраняя порядок, в котором лежали. Потерять их было бы хуже, чем
  // показать не на своём месте.
  куски.sort((a, b) => {
    if (!a.когда && !b.когда) return a.порядок - b.порядок;
    if (!a.когда) return 1;
    if (!b.когда) return -1;
    return a.когда === b.когда ? a.порядок - b.порядок : (a.когда < b.когда ? -1 : 1);
  });

  return куски.map(k => k.текст).join('');
}

/** Каналы в осмысленном порядке: сначала известные, потом всё прочее. */
function каналыПоПорядку(набор: Set<string>): string[] {
  const первые = ['main', 'terminal', 'cabinet', 'oracle'];
  const остальные = [...набор].filter(k => !первые.includes(k)).sort();
  return [...первые.filter(k => набор.has(k)), ...остальные];
}
