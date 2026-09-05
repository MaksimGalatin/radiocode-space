import sectorRisk from '@/data/gdpr-sector-risk.json';

/**
 * Оценка риска в деньгах по ОТРАСЛИ клиента.
 *
 * ЗАЧЕМ ЭТО ВМЕСТО «ШТРАФ ДО 20 МЛН ЕВРО». Верхний предел закона выписывали
 * считанным компаниям планетарного масштаба. Написать его директору автосервиса
 * — значит запугивать, и он это чувствует: письмо летит в корзину вместе с
 * доверием ко всему остальному, что мы нашли.
 *
 * Убедительно другое: «в вашей отрасли за это оштрафовали 272 компании,
 * медиана 10 000 евро». Это факт из открытого реестра, он проверяется, и он
 * ближе к его реальности, чем любой максимум.
 *
 * ЧЕСТНЫЕ ГРАНИЦЫ, зашитые в вывод:
 *   - это НАЗНАЧЕННЫЕ взыскания по опубликованным делам, а не прогноз;
 *   - примеры берём рядом с медианой, а НЕ рекордные — рекорд выглядит как
 *     запугивание и искажает картину;
 *   - отрасли, где меньше десяти дел, в сводку не попадают вовсе: по трём
 *     случаям медиана это не медиана, а совпадение.
 */

export type SectorRisk = {
  sector: string;
  count: number;
  median: number;
  p90: number;
  max: number;
  /**
   * Сколько дел отрасли имеют НАЗВАННУЮ норму. Доля важна: если она мала,
   * перечень статей говорит о меньшинстве, а выглядит как обо всех.
   * Замер 04.09.2026 по 11 отраслям: 96–100 %, то есть перечень надёжен.
   */
  withArticle: number;
  /**
   * 🔴 ЗА ЧТО ИМЕННО ШТРАФУЮТ В ЭТОЙ ОТРАСЛИ — статьи GDPR с числом дел.
   *
   * Раздел 11 Конституции: «графа, смысл которой не назван, — это не отчёт».
   * До 04.09.2026 калькулятор показывал СУММУ и молчал о норме: клиент видел
   * «медиана 10 000 евро» и не мог понять, какое своё действие менять.
   * Причина была не в замысле, а в опечатке сборщика — он читал поле `q`,
   * которого в источнике нет, и статьи выходили пустыми во всех 3 202 делах.
   */
  topArticles: { article: string; count: number; share: number }[];
  examples: {
    company: string;
    country: string;
    fine: number;
    date: string;
    /** Статья GDPR, по которой назначено взыскание. */
    articles: string;
    /** Тип нарушения человеческими словами, как его назвал орган. */
    violationType: string;
    /** Ссылка на само решение — чтобы число можно было проверить. */
    sourceUrl: string;
  }[];
};

type RiskFile = {
  source: string;
  fetchedAt: string;
  totalWithFine: number;
  caution: string;
  sectors: Record<string, Omit<SectorRisk, 'sector'>>;
};

const DATA = sectorRisk as unknown as RiskFile;

/**
 * Слова, по которым угадываем отрасль клиента.
 *
 * Источник слов — то, что мы и так знаем о сайте: заголовок страницы,
 * описание, вид деятельности из базы лидов. Никаких обращений к модели:
 * это простое сопоставление, и оно должно быть предсказуемым.
 */
const HINTS: { sector: string; words: string[] }[] = [
  { sector: 'Health Care', words: ['clinic', 'dental', 'dentist', 'medical', 'health', 'pharmacy', 'doctor', 'hospital', 'therapy', 'клиник', 'стоматолог', 'медицин', 'аптек'] },
  { sector: 'Finance, Insurance and Consulting', words: ['bank', 'insur', 'loan', 'credit', 'mortgage', 'accounting', 'consult', 'tax', 'банк', 'страхов', 'кредит', 'бухгалтер', 'консалт'] },
  { sector: 'Accomodation and Hospitality', words: ['hotel', 'hostel', 'restaurant', 'cafe', 'bar ', 'catering', 'resort', 'отель', 'ресторан', 'кафе', 'гостиниц'] },
  { sector: 'Real Estate', words: ['real estate', 'realty', 'property', 'apartments', 'lettings', 'недвижим', 'риелт', 'аренда квартир'] },
  { sector: 'Transportation and Energy', words: ['logistics', 'transport', 'shipping', 'freight', 'taxi', 'energy', 'utility', 'логистик', 'перевоз', 'такси', 'энерг'] },
  { sector: 'Employment', words: ['recruit', 'staffing', 'hr ', 'human resources', 'employment', 'job board', 'кадров', 'рекрут', 'ваканси'] },
  { sector: 'Media, Telecoms and Broadcasting', words: ['media', 'news', 'publish', 'telecom', 'broadcast', 'radio', 'tv ', 'медиа', 'новост', 'издател', 'телеком'] },
  { sector: 'Public Sector and Education', words: ['school', 'university', 'college', 'academy', 'municipal', 'government', 'школ', 'университет', 'колледж', 'муниципал'] },
];

/** Отрасль по тексту о сайте. Ничего не угадали — возвращаем null, а не «наугад». */
export function guessSector(text: string): string | null {
  const t = (text || '').toLowerCase();
  if (!t.trim()) return null;
  for (const h of HINTS) {
    if (h.words.some((w) => t.includes(w))) return h.sector;
  }
  return null;
}

/**
 * Сводка по отрасли. Если отрасль не определена или редкая — возвращаем null:
 * лучше не сказать ничего, чем подставить чужую статистику.
 */
export function riskForSector(sector: string | null): SectorRisk | null {
  if (!sector) return null;
  const s = DATA.sectors[sector];
  if (!s) return null;
  return { sector, ...s };
}

/** Готовая формулировка для отчёта — уже с оговоркой, чтобы её нельзя было потерять. */
export function riskSentence(r: SectorRisk | null, locale: 'ru' | 'en' = 'ru'): string | null {
  if (!r) return null;
  const money = (n: number) => new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US').format(n);
  const ex = r.examples[0];
  if (locale === 'en') {
    return (
      `In your sector (${r.sector}) the public EU register lists ${r.count} fines: ` +
      `median €${money(r.median)}, nine out of ten below €${money(r.p90)}, largest €${money(r.max)}. ` +
      `A typical case: ${ex.company} (${ex.country}), €${money(ex.fine)}, ${ex.date}. ` +
      `These are penalties actually imposed in published cases — not a forecast for you: ` +
      `the amount depends on turnover, severity and conduct.`
    );
  }
  return (
    `В вашей отрасли (${r.sector}) в открытом реестре ЕС ${r.count} взысканий: ` +
    `медиана €${money(r.median)}, девять из десяти — ниже €${money(r.p90)}, максимальное €${money(r.max)}. ` +
    `Типичный случай: ${ex.company} (${ex.country}), €${money(ex.fine)}, ${ex.date}. ` +
    `Это назначенные взыскания по опубликованным делам, а не прогноз для вас: ` +
    `сумма зависит от оборота, тяжести и поведения.`
  );
}

export const riskDataInfo = {
  source: DATA.source,
  fetchedAt: DATA.fetchedAt,
  totalWithFine: DATA.totalWithFine,
  sectors: Object.keys(DATA.sectors).length,
};
