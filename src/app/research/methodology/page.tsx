import type { Metadata } from 'next';
import { headers } from 'next/headers';
import MethodologyClient from './methodology-client';

/**
 * МЕТОДИКА ИССЛЕДОВАНИЯ — СЕРВЕРНАЯ ОБЁРТКА.
 *
 * Разметка вынесена в `methodology-client.tsx`, тексты — в `словарь.ts`
 * (четыре языка), числа берутся из `../data/данные` — того же файла, что
 * питает страницу данных. Одно число, один экземпляр: расхождение между
 * методикой и данными первым заметил бы судья, сверяющий их между собой.
 *
 * ПРИЧИНА ВЫНОСА, 29.08.2026. Страница была написана целиком здесь и только
 * по-русски: переключатель языка на неё не действовал.
 *
 * ГЛАВНОЕ, ЧТО ДОБАВЛЕНО В ЭТУ ВЕРСИЮ, — раздел «Кто проверяющий». Он
 * говорит прямым текстом, что обход выполняет программный агент в настоящем
 * Chrome, что это даёт (воспроизводимость и масштаб) и чего не даёт (мы не
 * проводили тестирование с незрячими участниками). Признание, сделанное
 * первыми, отнимает у критика оружие; обнаруженное критиком — рушит доверие
 * ко всем 44 919 записям разом.
 */
/**
 * КАНОН И ЯЗЫКОВЫЕ ВЕРСИИ — СВОИ, А НЕ УНАСЛЕДОВАННЫЕ ОТ ГЛАВНОЙ.
 *
 * Замер 07.09.2026 показал: страница объявляла `canonical` равным
 * адресу главной. Поисковик верит канону, а не содержимому, и такая
 * страница в выдачу не попадает вовсе — весь раздел исследования на
 * этом сайте был для поиска невидим.
 *
 * Причина: статический `export const metadata` без `alternates`. Next
 * тогда берёт канон из корневой раскладки, а там стоит адрес главной.
 * Соседний раздел /news сделан верно и взят образцом.
 *
 * Канон самоссылающийся: русская версия объявляет каноном себя, а не
 * английскую. Иначе три языка из четырёх снова выпадут из индекса —
 * ровно это Google прислал по сайту 19.08.2026.
 */
const ЯЗЫКИ_РАЗДЕЛА = ['en', 'ru', 'es', 'zh'] as const;
const САЙТ_РАЗДЕЛА = 'https://radiocode.space';
const ПУТЬ_РАЗДЕЛА = '/research/methodology';

function адресЯзыкаРаздела(яз: string): string {
  // Английский — язык по умолчанию, он живёт без префикса.
  return яз === 'en'
    ? `${САЙТ_РАЗДЕЛА}${ПУТЬ_РАЗДЕЛА}`
    : `${САЙТ_РАЗДЕЛА}/${яз}${ПУТЬ_РАЗДЕЛА}`;
}


function languagesXDefault(языки: Record<string, string>): void {
  // Версия для тех, чей язык не совпал ни с одним объявленным.
  языки['x-default'] = адресЯзыкаРаздела('en');
}

/**
 * 🔴 ЗАГОЛОВОК И ОПИСАНИЕ — НА ЧЕТЫРЁХ ЯЗЫКАХ. Изменено 12.09.2026.
 *
 * Найдено сплошным обходом всех страниц из карт сайтов: 33 адреса отдавали
 * русский заголовок вкладки при lang="en", "es" и "zh". Это строка в выдаче
 * Google и подпись вкладки — то, что человек читает ДО перехода, и то, что
 * произносит диктор. Англоязычный судья получал текст, который не может
 * прочесть.
 *
 * Язык берётся из заголовка `x-locale`, который ставит middleware этого же
 * сайта. Приём взят у соседних страниц, а не изобретён заново.
 */
const МЕТА: Record<string, { title: string; desc: string }> = {
  ru: {
    title: 'Методика измерения доступности муниципальных сайтов',
    desc:
      'Как мы измеряем доступность государственных сайтов: автоматическая проверка axe-core в настоящем браузере плюс клавиатурный обход того же браузера. Открытые данные, открытый код, признанные ограничения.',
  },
  en: {
    title: 'How We Measure Municipal Website Accessibility — Method',
    desc:
      'How we measure the accessibility of government websites: an automated axe-core check in a real browser, plus a keyboard traversal of the same browser to a task goal. Open data, open code, limitations stated rather than hidden.',
  },
  es: {
    title: 'Cómo medimos la accesibilidad de los sitios municipales — Metodología',
    desc:
      'Cómo medimos la accesibilidad de los sitios públicos: comprobación automática con axe-core en un navegador real y un recorrido de teclado hasta el objetivo. Datos abiertos, código abierto y limitaciones declaradas.',
  },
  zh: {
    title: '我们如何测量市政网站的无障碍性 — 方法',
    desc:
      '我们如何测量政府网站的无障碍性：在真实浏览器中运行 axe-core 自动检测，并在同一浏览器中用键盘遍历直到完成目标。开放数据、开放代码，并如实说明局限。',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const h2 = await headers();
  const язык = (h2.get('x-locale') || 'en').toLowerCase();
  const м = МЕТА[язык] ?? МЕТА.en;

  const сырой = (await headers()).get('x-locale') || 'en';
  const яз = (ЯЗЫКИ_РАЗДЕЛА as readonly string[]).includes(сырой) ? сырой : 'en';
  const языки: Record<string, string> = {};
  for (const я of ЯЗЫКИ_РАЗДЕЛА) языки[я] = адресЯзыкаРаздела(я);
  languagesXDefault(языки);
  return {
  title: м.title,
  description: м.desc,
    alternates: {
      canonical: адресЯзыкаРаздела(яз),
      languages: языки,
    },
  };
}

export default async function MethodologyPage() {
  // Язык берётся из заголовка, который выставляет middleware, отрезая первый
  // сегмент пути. Нужен затем, что на одном из сайтов клиентский контекст
  // языка стартует с английского и серверная разметка всегда выходила
  // английской — подробности в клиентском файле рядом.
  const h = await headers();
  const языкИзПути = h.get('x-locale') || undefined;
  return <MethodologyClient языкИзПути={языкИзПути} />;
}
