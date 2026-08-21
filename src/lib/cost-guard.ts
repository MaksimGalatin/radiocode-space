/**
 * Сторож расходов на платные ИИ-вызовы.
 *
 * ЗАЧЕМ. 16–17 августа 2026 ночная задача `memory-index` сожгла кредит Google:
 * $12.38 и $21.24 в сутки вместо привычных $1–2.5. Причина — один SKU
 * «Large Text Embedding Model»: 115 963 591 единиц за сутки, то есть около
 * 116 МБ текста, отправленных на векторизацию. Заметили это только когда
 * Архитектор случайно открыл страницу кредитов и увидел, что от $300 осталось
 * $47.49.
 *
 * ПОЧЕМУ СЧИТАЕМ САМИ, А НЕ СМОТРИМ СЧЁТ GOOGLE. Данные о расходе в Cloud
 * Billing отстают примерно на сутки и почасово недоступны в принципе. Сторож,
 * который смотрит на счёт, узнал бы о пожаре на следующий день — то есть ровно
 * так, как и вышло. Поэтому считаем ОТПРАВЛЕННЫЕ СИМВОЛЫ в момент вызова: это
 * видно сразу и стоит ноль.
 *
 * ЧТО ДЕЛАЕТ. `record()` копит символы по часам в таблице `api_spend_hourly`.
 * `checkHour()` смотрит завершившийся час и возвращает превышение. Никаких
 * блокировок: сторож только считает и говорит. Останавливать — решение
 * Архитектора (разделы 13 и 18 Конституции).
 *
 * ЦЕНА ВОПРОСА. Тариф эмбеддингов — за 1000 символов. Проверено на реальном
 * счёте: 115 963 591 / 1000 × $0.00015 = $17.39, сошлось до цента.
 */
import { Pool } from '@neondatabase/serverless';

/** $ за 1000 символов у ПЛАТНОГО gemini-embedding-001 в Vertex. Сверено со
 * счётом 17.08.2026: 115 963 591 / 1000 × $0.00015 = $17.39, сошлось до цента. */
export const USD_PER_1K_CHARS = 0.00015;

/**
 * СКОЛЬКО СТОИТ ЕДИНИЦА У КОНКРЕТНОГО ПУТИ.
 *
 * Раньше ставка была одна на всё, и сторож считал ПЛАТНЫМИ даже те символы,
 * что ушли по бесплатному ключу Gemini. Итог завышался ровно на объём
 * бесплатной работы: чем лучше работала бесплатная лестница, тем страшнее
 * выглядел отчёт — и настоящий пожар в этом шуме было не различить.
 *
 * Имя службы теперь говорит, каким путём ушёл вызов:
 *   `gemini-embedding-free`   — бесплатный ключ AI Studio, стоит НОЛЬ;
 *   `gemini-embedding-vertex` — платный Vertex, стоит USD_PER_1K_CHARS.
 * Старое имя `gemini-embedding` считается платным: так безопаснее — недооценка
 * расхода опаснее переоценки, а записи от прежней версии кода уже в таблице.
 */
export function ставкаЗа1K(service: string): number {
  if (service.endsWith('-free') || service.includes('free')) return 0;
  // ЧАТ СЧИТАЕТСЯ В ТОКЕНАХ, А НЕ В СИМВОЛАХ — добавлено 21.08.2026.
  //
  // Ставка эмбеддингов ($0.00015 за 1000 символов) к чату отношения не имеет:
  // у него другая единица и другая цена. Подставить её сюда значило бы
  // выдумать число, а раздел 11 Конституции это запрещает прямо.
  //
  // Поэтому в ДЕНЬГИ строки чата пока не переводятся, но ОБЪЁМ пишется.
  // Так и задумано: пожар виден по числу вызовов и токенов, а не по цене.
  // 16–17.08.2026 кредит сожгла не дорогая ставка, а 116 МБ текста за ночь —
  // это было бы видно и без единой цифры в долларах.
  //
  // Ставку установить замером по нашему счёту, когда объём накопится:
  // взять число токенов за сутки отсюда и разделить на сумму того же дня
  // в Cloud Billing. До тех пор итог в долларах чат НЕ включает, и это
  // сказано в отчёте прямым текстом, а не подразумевается.
  if (service.startsWith('vertex-chat')) return 0;
  return USD_PER_1K_CHARS;
}

/**
 * Порог тревоги за час. $0.10/час — это $2.40 в сутки, чуть выше обычного
 * расхода ($1–2.5) и втрое ниже той ночи, когда сгорело $21.
 */
export const HOUR_ALERT_USD = Number(process.env.COST_ALERT_USD_PER_HOUR || '0.10');

function db(): Pool | null {
  const url = process.env.SUBMISSIONS_DB_URL;
  return url ? new Pool({ connectionString: url }) : null;
}

async function ensure(pool: Pool): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS api_spend_hourly (
      hour_utc   timestamptz NOT NULL,
      service    text        NOT NULL,
      units      bigint      NOT NULL DEFAULT 0,
      calls      integer     NOT NULL DEFAULT 0,
      PRIMARY KEY (hour_utc, service)
    )`);
}

function hourStart(d = new Date()): string {
  const h = new Date(d);
  h.setUTCMinutes(0, 0, 0);
  return h.toISOString();
}

/**
 * Записывает потраченное. Никогда не бросает: сторож не имеет права уронить
 * то, что он сторожит.
 */
export async function record(service: string, units: number, calls = 1): Promise<void> {
  if (!units || units <= 0) return;
  const pool = db();
  if (!pool) return;
  try {
    await ensure(pool);
    await pool.query(
      `INSERT INTO api_spend_hourly (hour_utc, service, units, calls)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (hour_utc, service) DO UPDATE
         SET units = api_spend_hourly.units + EXCLUDED.units,
             calls = api_spend_hourly.calls + EXCLUDED.calls`,
      [hourStart(), service, Math.round(units), calls]
    );
  } catch {
    /* молча: расход важнее учёта расхода */
  } finally {
    try { await pool.end(); } catch { /* ignore */ }
  }
}

export interface SpendRow {
  service: string;
  units: number;
  calls: number;
  usd: number;
}

export interface HourCheck {
  ok: boolean;
  configured: boolean;
  hour: string;
  usdTotal: number;
  threshold: number;
  rows: SpendRow[];
}

/**
 * Смотрит ЗАВЕРШИВШИЙСЯ час. Текущий брать нельзя: он ещё наполняется, и
 * тревога получилась бы то ложной, то запоздалой.
 */
export async function checkHour(): Promise<HourCheck> {
  const prev = new Date(Date.now() - 3600_000);
  const hour = hourStart(prev);
  const empty: HourCheck = {
    ok: true, configured: false, hour, usdTotal: 0, threshold: HOUR_ALERT_USD, rows: [],
  };
  const pool = db();
  if (!pool) return empty;
  try {
    await ensure(pool);
    const r = await pool.query(
      `SELECT service, units, calls FROM api_spend_hourly WHERE hour_utc = $1`, [hour]
    );
    const rows: SpendRow[] = r.rows.map((x: { service: string; units: string; calls: number }) => {
      const units = Number(x.units);
      return {
        service: x.service,
        units,
        calls: Number(x.calls),
        usd: (units / 1000) * ставкаЗа1K(x.service),
      };
    });
    const usdTotal = rows.reduce((s, x) => s + x.usd, 0);
    return {
      ok: usdTotal <= HOUR_ALERT_USD,
      configured: true,
      hour,
      usdTotal,
      threshold: HOUR_ALERT_USD,
      rows,
    };
  } catch {
    return empty;
  } finally {
    try { await pool.end(); } catch { /* ignore */ }
  }
}

/** Сутки назад — для контекста в письме: «за сутки набежало столько-то». */
export async function last24h(): Promise<{ usd: number; units: number }> {
  const pool = db();
  if (!pool) return { usd: 0, units: 0 };
  try {
    await ensure(pool);
    // Раньше здесь суммировались ВСЕ единицы и умножались на платную ставку —
    // бесплатные вызовы попадали в сумму как платные. Теперь сумма считается
    // по каждой службе отдельно и по её собственной ставке.
    const r = await pool.query(
      `SELECT service, COALESCE(SUM(units),0)::bigint AS u FROM api_spend_hourly
        WHERE hour_utc >= now() - interval '24 hours'
        GROUP BY service`
    );
    let units = 0;
    let usd = 0;
    for (const строка of r.rows as { service: string; u: string }[]) {
      const u = Number(строка.u);
      units += u;
      usd += (u / 1000) * ставкаЗа1K(строка.service);
    }
    return { units, usd };
  } catch {
    return { usd: 0, units: 0 };
  } finally {
    try { await pool.end(); } catch { /* ignore */ }
  }
}
