/**
 * Сравнение с другими сайтами той же отрасли.
 *
 * ЗАЧЕМ ЭТО РАБОТАЕТ ЛУЧШЕ СТРАХА. «У вас 34 из 100» — число без опоры, его
 * легко отмахнуть: «наверное, у всех так». «У вас 34, а по вашей отрасли
 * середина — 61, и вы хуже семи сайтов из десяти» задевает не страх, а
 * самолюбие. Страх вызывает сопротивление, самолюбие — действие.
 *
 * ОТКУДА ДАННЫЕ. Из наших же проверок: `oracle_scans`, по одной последней на
 * домен, за полгода, в той же отрасли. Никаких внешних платных источников и
 * никакого «подбора конкурентов» наугад — сравнение честно ровно в той мере, в
 * какой честна наша собственная выборка, и растёт вместе с ней.
 *
 * ЧЕСТНЫЕ ГРАНИЦЫ, зашитые в код:
 *   • меньше восьми сайтов в отрасли — не показываем НИЧЕГО. По трём соседям
 *     середина это не середина, а совпадение;
 *   • на домен берётся ОДНА последняя проверка, иначе один часто проверяемый
 *     сайт перевесит всю отрасль;
 *   • наши собственные домены из выборки исключены — сравнивать клиента с
 *     нами нечестно и бессмысленно;
 *   • мы говорим «среди проверенных нами», а не «в вашей отрасли». Это разные
 *     утверждения, и второе мы доказать не можем.
 */

type Row = Record<string, unknown>;
type Sql = { query: (text: string, params?: unknown[]) => Promise<unknown> };

const OUR_OWN = [
  'aifa.works', 'codeofdigitaleternity.com', 'aifa.digital', 'radiocode.space',
];

/** Порог, ниже которого сравнение не показывается вовсе. */
const MIN_PEERS = 8;

export type PeerComparison = {
  sector: string;
  peers: number;
  median: number;
  best: number;
  worst: number;
  /** Скольких процентов выборки сайт лучше. Целое число 0…100. */
  betterThanPercent: number;
};

async function getSql(): Promise<Sql | null> {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return null;
  const { neon } = await import('@neondatabase/serverless');
  return neon(url) as unknown as Sql;
}

function rowsOf(r: unknown): Row[] {
  if (Array.isArray(r)) return r as Row[];
  const o = r as { rows?: Row[] };
  return o?.rows ?? [];
}

function median(sorted: number[]): number {
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

/**
 * Сравнение сайта с выборкой той же отрасли. null — значит показывать нечего:
 * отрасль не определена, выборка мала или база недоступна.
 */
export async function peerComparison(
  sector: string | null,
  score: number,
  selfDomain: string
): Promise<PeerComparison | null> {
  if (!sector) return null;
  try {
    const sql = await getSql();
    if (!sql) return null;

    const rows = rowsOf(await sql.query(
      `SELECT DISTINCT ON (domain) domain, score
         FROM oracle_scans
        WHERE sector = $1
          AND created_at > now() - interval '180 days'
          AND domain <> $2
          AND NOT (domain = ANY($3))
        ORDER BY domain, created_at DESC`,
      [sector, selfDomain.toLowerCase(), OUR_OWN]
    ));

    const scores = rows
      .map((r) => Number(r.score))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);

    if (scores.length < MIN_PEERS) return null;

    const worse = scores.filter((s) => s < score).length;
    return {
      sector,
      peers: scores.length,
      median: median(scores),
      best: scores[scores.length - 1],
      worst: scores[0],
      betterThanPercent: Math.round((worse / scores.length) * 100),
    };
  } catch {
    return null;
  }
}

/**
 * Готовая формулировка — уже с оговоркой, чтобы её нельзя было потерять при
 * переносе в письмо или на страницу отчёта.
 */
export function peerSentence(p: PeerComparison | null, score: number, locale: 'ru' | 'en' = 'ru'): string | null {
  if (!p) return null;
  if (locale === 'en') {
    return (
      `Your score is ${score}. Among ${p.peers} sites of the same sector (${p.sector}) `
      + `that we have checked, the middle is ${p.median}, the best is ${p.best}. `
      + `You are ahead of ${p.betterThanPercent}% of them. `
      + `This is our own sample, not the whole industry.`
    );
  }
  return (
    `Ваша оценка — ${score}. Среди ${p.peers} проверенных нами сайтов той же отрасли `
    + `(${p.sector}) середина — ${p.median}, лучший результат — ${p.best}. `
    + `Вы впереди ${p.betterThanPercent}% из них. `
    + `Это наша собственная выборка, а не вся отрасль.`
  );
}
