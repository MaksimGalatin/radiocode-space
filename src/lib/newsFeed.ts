/**
 * ИСТОЧНИК ЛЕНТ ПОДПИСКИ — ОДИН НА ДВА ФОРМАТА.
 *
 * 🔴 ЗАЧЕМ ОТДЕЛЬНЫЙ ФАЙЛ. Лент две — RSS (/feed.xml) и Atom (/atom.xml), — и
 * содержимое у них обязано совпадать до запятой. Если каждая будет сама читать
 * новости, сортировать их и составлять ссылки, то однажды они разойдутся: кто-то
 * поправит отсечку дат в одном месте и не тронет второе, а заметит это только
 * подписчик, которому статья пришла дважды или не пришла вовсе.
 *
 * ССЫЛКИ ВЕДУТ НА ЭТОТ ЖЕ ДОМЕН. Это не мелочь: лента, отдающая чужие адреса,
 * работает как подарок конкуренту — читалка ведёт человека не к нам, а вес
 * ссылки уходит другому сайту. Статьи у нас общие на четыре сайта, и соблазн
 * сослаться на центральный велик, но у radiocode.space есть свои страницы
 * `/news/{id}` — ссылаемся на них.
 *
 * ОТСЕЧКА БУДУЩИХ ДАТ ОБЯЗАТЕЛЬНА. Материал готовится заранее; без отсечки
 * подписчик получил бы его раньше дня выхода — то есть лента отменила бы
 * отложенную публикацию с той стороны, где её никто не проверяет.
 */
import newsDataВесь from '@/data/news.json';
import { тольковышедшие } from '@/lib/newsSchedule';

export const АДРЕС_САЙТА = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';

export interface СтатьяЛенты {
  id: string;
  date: string;
  title: Record<string, string>;
  summary: Record<string, string>;
}

/** Экранирование для XML. Без него апостроф в заголовке ломает всю ленту целиком. */
export function экранироватьXml(значение: string): string {
  return String(значение || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** «12.08.2026» → 20260812. Непонятная дата даёт 0, то есть статья уходит вниз. */
function вЧисло(дата: string): number {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(дата || ''));
  return m ? Number(`${m[3]}${m[2]}${m[1]}`) : 0;
}

/** Дата статьи как объект Date (полночь UTC — один час на все места чтения). */
function вДату(дата: string): Date {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(дата || ''));
  return m ? new Date(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1]))) : new Date(0);
}

/** RFC-822 — формат <pubDate> в RSS. */
export function вRfc822(дата: string): string {
  return вДату(дата).toUTCString();
}

/** ISO 8601 — формат <updated>/<published> в Atom. */
export function вIso(дата: string): string {
  return вДату(дата).toISOString();
}

/** Собственный адрес статьи НА ЭТОМ домене. */
export function ссылкаНаСтатью(id: string): string {
  return `${АДРЕС_САЙТА}/news/${id}`;
}

/**
 * Вышедшие статьи, свежие сверху.
 *
 * Считается на каждый вызов, а не один раз при загрузке модуля: иначе
 * запущенный сервер навсегда запомнил бы список на день своего запуска и
 * статья, вышедшая завтра, в ленту не попала бы до перезапуска.
 */
export function статьиЛенты(): СтатьяЛенты[] {
  const вышедшие = тольковышедшие(newsDataВесь as Array<{ date?: string }>) as unknown as СтатьяЛенты[];
  return [...вышедшие].sort((a, b) => вЧисло(b.date) - вЧисло(a.date));
}

/** Заголовок и описание лент — одни и те же в обоих форматах. */
export const ЗАГОЛОВОК_ЛЕНТЫ = 'RadioCode.Space — News';
export const ОПИСАНИЕ_ЛЕНТЫ =
  'News of the CODE Eternal ecosystem: protocols, releases, eternal memory and the radio that carries them.';
