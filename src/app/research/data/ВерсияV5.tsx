'use client';

/**
 * ВЕРСИЯ 2 НАБОРА — ПЕРЕМЕР НОВЫМ ПРИБОРОМ v5 (02.10.2026).
 *
 * ПОЧЕМУ ОТДЕЛЬНЫЙ ФАЙЛ. Один и тот же файл лежит на всех четырёх сайтах
 * (codeofdigitaleternity.com, aifa.works, aifa.digital, radiocode.space) —
 * так вторая версия не разойдётся между ними. В странице данных он
 * вставлен одной строкой под подписью.
 *
 * ПОЧЕМУ ЧИСЛА ЗДЕСЬ, А НЕ В `данные.ts`. Это снимок версии 2 целиком:
 * все числа ниже посчитаны одним прогоном по одному файлу
 * `traversal-log-v5-2026-10-02.jsonl.gz` и проверены дважды разными
 * программами — Python (`_агент/единый_замер_v5.py --выгрузить=`, холодный
 * прогон 02.10.2026 12:40) и Node (`_агент/счёт_выгрузки_v5.mjs` прямо по
 * сжатому публичному файлу). Версия 1 ниже на странице не тронута:
 * её числа остаются, чтобы любое из них можно было воспроизвести.
 *
 * ЕДИНИЦА СЧЁТА — СТРАНИЦА (пара «сайт + один из 8 типов страниц»), не сайт.
 */

import React from 'react';

type Язык = 'ru' | 'en' | 'es' | 'zh';

const Ч = {
  записей: 95216, вЗнаменателе: 79453, доменовВЗнаменателе: 9951,
  доступно: 16804, барьер: 8448, нетФункции: 36061, неизмеримо: 18140,
  измерено: 25252, барьерБ: 8567, слабых: 119,
  вне: 15763, доменаНет: 12402, заглушки: 3160, главнаяОшибка: 201,
  закрылиДоступ: 12905, уПоставщика: 6174, вСкрытомМеню: 552,
  общихПар: 95176, старыхБарьеров: 35168,
  сталиНетФункции: 18325, сталиДоступно: 7305, осталисьБарьером: 4540, сталиВне: 2731, сталиНеизмеримо: 2267,
  движокV53: 65462, движокV54: 29754,
  байтФайла: 11964344,
};

const ПО_ТИПАМ: Array<[string, number, number]> = [
  ['home', 2163, 6966], ['contact', 1633, 4915], ['meetings', 1305, 3606], ['jobs', 1043, 3179],
  ['documents', 865, 2583], ['calendar', 781, 2284], ['311_request', 384, 956], ['payment', 274, 763],
];

const ФАЙЛ = 'https://aifa.works/data/traversal-log-v5-2026-10-02.jsonl.gz';
const СХЕМА = 'https://aifa.works/data/traversal-log-v5-SCHEMA.md';
const SHA = '3b78f28dd6e8d7f37aef2964cdabc8464bd003324c135084d38d200faa81fff4';
const NBSP = String.fromCharCode(160);

function локаль(я: Язык) { return я === 'ru' ? 'ru-RU' : я === 'es' ? 'es-ES' : я === 'zh' ? 'zh-CN' : 'en-US'; }

type Тексты = {
  метка: string; заголовок: string;
  главное: (п: string, б: string, и: string, пБ: string, бБ: string, сл: string) => string;
  почемуЗаголовок: string; почему: string; пункты: string[];
  сверкаЗаголовок: string; сверка: (о: string, с: string, нф: string, д: string, б: string, в: string, н: string) => string;
  таблица: string; категория: string; страниц: string; доля: string;
  кДоступно: string; кБарьер: string; кНетФункции: string; кНеизмеримо: string;
  знаменатель: (з: string, д: string) => string;
  вне: (в: string, дн: string, з: string, г: string) => string;
  состав: (п: string, м: string, зд: string) => string;
  типыЗаголовок: string; тип: string; типы: Record<string, string>;
  единица: (v53: string, v54: string) => string;
  данныеЗаголовок: string; данные: (размер: string, строк: string) => string; маска: string; схема: string;
  версия1: string;
};

const ТЕКСТ: Record<Язык, Тексты> = {
  ru: {
    метка: 'Версия 2 · 02.10.2026',
    заголовок: 'Перемер новым прибором: 33,5 % вместо 74,6 %',
    главное: (п, б, и, пБ, бБ, сл) => `Главное число второй версии: среди страниц, где удалось измерить, барьер для человека с клавиатурой — ${п} (${б} из ${и}). Если считать барьером и почти незаметную рамку фокуса — ${пБ} (${бБ}). Разница — ${сл} страниц.`,
    почемуЗаголовок: 'Почему не 74,6 %',
    почему: 'Ниже на этой странице осталась версия 1 (срез 01.09.2026) с долей 74,6 %. Сайты за месяц не стали вдвое доступнее — изменился прибор. Новый обходчик v5:',
    пункты: [
      'отделяет страницы, где нужной функции на сайте просто нет (у маленького городка нет онлайн-оплаты или календаря), и не записывает их в барьеры;',
      'не засчитывает ссылку «пропустить навигацию» как достигнутую цель — эту ошибку версии 1 мы нашли сами 15.09.2026;',
      'проверяет видимость фокуса попиксельно; там, где первый вариант прибора ошибался, фокус перемерен заново;',
      'страницы, которые ведут на сторонний сервис (порталы оплаты, вакансий), считает отдельно и в долю барьера не включает.',
    ],
    сверкаЗаголовок: 'Сравнение двух версий по каждой странице',
    сверка: (о, с, нф, д, б, в, н) => `Мы сопоставили обе версии по ${о} общим парам «сайт + тип страницы». Из ${с} страниц, которые версия 1 назвала барьером, в версии 2: функции нет — ${нф}, человек доходит — ${д}, барьер — ${б}, вне знаменателя — ${в}, неизмеримо — ${н}. Совпадение приборов на уровне отдельной страницы низкое, и мы говорим это прямо: число сильно зависит от того, что считать целью страницы.`,
    таблица: 'Версия 2: все страницы в знаменателе по категориям',
    категория: 'Категория', страниц: 'Страниц', доля: 'Доля от знаменателя',
    кДоступно: 'Человек с клавиатурой доходит до цели', кБарьер: 'Барьер', кНетФункции: 'Функции или цели на сайте нет', кНеизмеримо: 'Измерить нельзя (сайт закрыт для обходчика, молчит, ошибка)',
    знаменатель: (з, д) => `Знаменатель — ${з} страницы, сайтов в нём — ${д}.`,
    вне: (в, дн, з, г) => `Вне знаменателя — ${в}: домена не существует ${дн}, домен-заглушка ${з}, главная сама страница ошибки или входа ${г}.`,
    состав: (п, м, зд) => `В «функции нет» входят и ${п} страницы, ведущие к стороннему поставщику, и ${м} страницы, где цель спрятана в раскрывающемся меню. В «измерить нельзя» ${зд} страниц — это сайты, закрывшие доступ автоматическому обходу.`,
    типыЗаголовок: 'Доля барьера по типам страниц',
    тип: 'Тип страницы',
    типы: { home: 'Главная', contact: 'Контакты', meetings: 'Заседания', jobs: 'Вакансии', documents: 'Документы', calendar: 'Календарь', '311_request': 'Заявка 311', payment: 'Оплата' },
    единица: (v53, v54) => `Единица счёта — страница, а не сайт. Замер 1–2 октября 2026 (UTC): движком v5.3.1 — ${v53} записи, движком v5.4 — ${v54}.`,
    данныеЗаголовок: 'Данные и проверка',
    данные: (размер, строк) => `Набор версии 2: traversal-log-v5-2026-10-02.jsonl.gz (${размер}, ${строк} строк). В каждой строке — исходный вердикт обходчика и категория по вариантам А и Б, поэтому число пересчитывается без нас любой программой, читающей JSON.`,
    маска: 'Почты и телефоны служащих в тексте пути фокуса заменены на [e-mail] и [phone], пути к снимкам на нашем диске — на имена файлов. Больше в наборе ничего не менялось: пересчёт по публичному файлу даёт те же числа.',
    схема: 'Описание полей',
    версия1: 'Версия 1 ниже не удалена и не исправлена задним числом.',
  },
  en: {
    метка: 'Version 2 · 2 October 2026',
    заголовок: 'Re-measured with a new instrument: 33.5 % instead of 74.6 %',
    главное: (п, б, и, пБ, бБ, сл) => `The headline figure of version 2: among pages that could be measured, the barrier for a keyboard user is ${п} (${б} of ${и}). If an almost invisible focus ring is also counted as a barrier, it is ${пБ} (${бБ}). The difference is ${сл} pages.`,
    почемуЗаголовок: 'Why not 74.6 %',
    почему: 'Version 1 (snapshot of 1 September 2026) with its 74.6 % remains below on this page. The sites did not become twice as accessible in a month — the instrument changed. The new v5 traversal:',
    пункты: [
      'separates pages where the function simply does not exist on the site (a small town has no online payment or calendar) and does not count them as barriers;',
      'no longer credits a "skip to main content" link as reaching the goal — a flaw of version 1 we found ourselves on 15 September 2026;',
      'checks focus visibility pixel by pixel; where the first build of the instrument was wrong, focus was re-measured;',
      'counts pages that hand off to a third-party service (payment and job portals) separately and leaves them out of the barrier share.',
    ],
    сверкаЗаголовок: 'Page-by-page comparison of the two versions',
    сверка: (о, с, нф, д, б, в, н) => `We matched both versions on ${о} shared "site + page type" pairs. Of the ${с} pages version 1 called a barrier, version 2 finds: no such function — ${нф}, reachable by a keyboard user — ${д}, barrier — ${б}, outside the denominator — ${в}, unmeasurable — ${н}. Agreement between the two instruments at the level of a single page is low, and we say so plainly: the figure depends heavily on what counts as the goal of a page.`,
    таблица: 'Version 2: all pages in the denominator by category',
    категория: 'Category', страниц: 'Pages', доля: 'Share of denominator',
    кДоступно: 'A keyboard user reaches the goal', кБарьер: 'Barrier', кНетФункции: 'No such function or goal on the site', кНеизмеримо: 'Cannot be measured (site blocks the crawler, silent, error)',
    знаменатель: (з, д) => `The denominator is ${з} pages on ${д} sites.`,
    вне: (в, дн, з, г) => `Outside the denominator — ${в}: domain does not exist ${дн}, parked domain ${з}, home page is itself an error or login page ${г}.`,
    состав: (п, м, зд) => `"No such function" also includes ${п} pages that lead to a third-party provider and ${м} pages where the goal is hidden in a collapsed menu. "Cannot be measured" includes ${зд} pages on sites that block automated traversal.`,
    типыЗаголовок: 'Barrier share by page type',
    тип: 'Page type',
    типы: { home: 'Home', contact: 'Contact', meetings: 'Meetings', jobs: 'Jobs', documents: 'Documents', calendar: 'Calendar', '311_request': '311 request', payment: 'Payment' },
    единица: (v53, v54) => `The unit is a page, not a site. Measured on 1–2 October 2026 (UTC): engine v5.3.1 — ${v53} records, engine v5.4 — ${v54}.`,
    данныеЗаголовок: 'Data and verification',
    данные: (размер, строк) => `Version 2 dataset: traversal-log-v5-2026-10-02.jsonl.gz (${размер}, ${строк} lines). Every line carries the traversal's original verdict and the category under options A and B, so the figure can be recomputed without us by any program that reads JSON.`,
    маска: 'E-mail addresses and phone numbers of officials in the focus-path text are replaced with [e-mail] and [phone]; paths to screenshots on our disk are reduced to file names. Nothing else was changed: recomputing from the public file gives the same figures.',
    схема: 'Field description',
    версия1: 'Version 1 below has not been deleted or retroactively corrected.',
  },
  es: {
    метка: 'Versión 2 · 2 de octubre de 2026',
    заголовок: 'Nueva medición con un instrumento nuevo: 33,5 % en lugar de 74,6 %',
    главное: (п, б, и, пБ, бБ, сл) => `La cifra principal de la versión 2: entre las páginas que se pudieron medir, la barrera para una persona que usa el teclado es del ${п} (${б} de ${и}). Si también se cuenta como barrera un anillo de foco casi invisible, es del ${пБ} (${бБ}). La diferencia son ${сл} páginas.`,
    почемуЗаголовок: 'Por qué no 74,6 %',
    почему: 'La versión 1 (corte del 1 de septiembre de 2026), con su 74,6 %, sigue más abajo en esta página. Los sitios no se volvieron el doble de accesibles en un mes: cambió el instrumento. El nuevo recorrido v5:',
    пункты: [
      'separa las páginas donde la función simplemente no existe en el sitio (un pueblo pequeño no tiene pago en línea ni calendario) y no las cuenta como barreras;',
      'ya no da por alcanzado el objetivo con el enlace «saltar al contenido principal», un fallo de la versión 1 que encontramos nosotros mismos el 15 de septiembre de 2026;',
      'comprueba la visibilidad del foco píxel a píxel; donde la primera versión del instrumento se equivocaba, el foco se volvió a medir;',
      'cuenta aparte las páginas que remiten a un servicio externo (portales de pago y de empleo) y no las incluye en la proporción de barreras.',
    ],
    сверкаЗаголовок: 'Comparación de las dos versiones página por página',
    сверка: (о, с, нф, д, б, в, н) => `Cotejamos ambas versiones en ${о} pares comunes «sitio + tipo de página». De las ${с} páginas que la versión 1 calificó como barrera, la versión 2 encuentra: no existe la función — ${нф}, accesible con teclado — ${д}, barrera — ${б}, fuera del denominador — ${в}, no medible — ${н}. La coincidencia entre ambos instrumentos a nivel de página es baja, y lo decimos abiertamente: la cifra depende mucho de qué se considera el objetivo de una página.`,
    таблица: 'Versión 2: todas las páginas del denominador por categoría',
    категория: 'Categoría', страниц: 'Páginas', доля: 'Proporción del denominador',
    кДоступно: 'Una persona con teclado alcanza el objetivo', кБарьер: 'Barrera', кНетФункции: 'La función u objetivo no existe en el sitio', кНеизмеримо: 'No se puede medir (el sitio bloquea el rastreo, no responde, error)',
    знаменатель: (з, д) => `El denominador son ${з} páginas en ${д} sitios.`,
    вне: (в, дн, з, г) => `Fuera del denominador — ${в}: el dominio no existe ${дн}, dominio aparcado ${з}, la página de inicio es en sí una página de error o de acceso ${г}.`,
    состав: (п, м, зд) => `«No existe la función» incluye también ${п} páginas que llevan a un proveedor externo y ${м} páginas donde el objetivo está oculto en un menú desplegable. «No se puede medir» incluye ${зд} páginas de sitios que bloquean el recorrido automático.`,
    типыЗаголовок: 'Proporción de barreras por tipo de página',
    тип: 'Tipo de página',
    типы: { home: 'Inicio', contact: 'Contacto', meetings: 'Sesiones', jobs: 'Empleo', documents: 'Documentos', calendar: 'Calendario', '311_request': 'Solicitud 311', payment: 'Pago' },
    единица: (v53, v54) => `La unidad es la página, no el sitio. Medición del 1 al 2 de octubre de 2026 (UTC): motor v5.3.1 — ${v53} registros, motor v5.4 — ${v54}.`,
    данныеЗаголовок: 'Datos y verificación',
    данные: (размер, строк) => `Conjunto de la versión 2: traversal-log-v5-2026-10-02.jsonl.gz (${размер}, ${строк} líneas). Cada línea contiene el veredicto original del recorrido y la categoría según las opciones A y B, de modo que cualquier programa que lea JSON puede recalcular la cifra sin nosotros.`,
    маска: 'Los correos y teléfonos de funcionarios en el texto del recorrido del foco se sustituyeron por [e-mail] y [phone], y las rutas a las capturas en nuestro disco, por nombres de archivo. No se cambió nada más: el recálculo con el archivo público da las mismas cifras.',
    схема: 'Descripción de los campos',
    версия1: 'La versión 1 de más abajo no se ha borrado ni corregido a posteriori.',
  },
  zh: {
    метка: '第 2 版 · 2026 年 10 月 2 日',
    заголовок: '用新工具重新测量：33.5 %，而不是 74.6 %',
    главное: (п, б, и, пБ, бБ, сл) => `第 2 版的核心数字：在能够测量的页面中，键盘用户遇到障碍的比例为 ${п}（${и} 中的 ${б}）。如果把几乎看不见的焦点框也算作障碍，则为 ${пБ}（${бБ}）。两者相差 ${сл} 个页面。`,
    почемуЗаголовок: '为什么不是 74.6 %',
    почему: '本页下方仍保留第 1 版（2026 年 9 月 1 日快照）及其 74.6 % 的结果。网站并没有在一个月内变得加倍无障碍——变的是测量工具。新的 v5 遍历程序：',
    пункты: [
      '把网站上根本不存在相应功能的页面单独列出（小镇没有在线支付或日历），不再算作障碍；',
      '不再把「跳到主要内容」链接当作已达成目标——这是我们自己在 2026 年 9 月 15 日发现的第 1 版缺陷；',
      '逐像素检查焦点是否可见；在工具第一版出错的地方，重新测量了焦点；',
      '把跳转到第三方服务（支付、招聘门户）的页面单独统计，不计入障碍比例。',
    ],
    сверкаЗаголовок: '两个版本逐页对比',
    сверка: (о, с, нф, д, б, в, н) => `我们在 ${о} 个共同的「网站 + 页面类型」组合上比对了两个版本。在第 1 版判定为障碍的 ${с} 个页面中，第 2 版的结果是：功能不存在 ${нф}，键盘用户可以到达 ${д}，障碍 ${б}，不计入分母 ${в}，无法测量 ${н}。两种工具在单个页面层面的一致性较低，我们直言这一点：这个数字在很大程度上取决于把什么算作页面的目标。`,
    таблица: '第 2 版：分母中全部页面按类别统计',
    категория: '类别', страниц: '页面数', доля: '占分母比例',
    кДоступно: '键盘用户可以到达目标', кБарьер: '障碍', кНетФункции: '网站上没有该功能或目标', кНеизмеримо: '无法测量（网站屏蔽爬虫、无响应、出错）',
    знаменатель: (з, д) => `分母为 ${д} 个网站上的 ${з} 个页面。`,
    вне: (в, дн, з, г) => `不计入分母的共 ${в} 个：域名不存在 ${дн}，停放域名 ${з}，首页本身就是错误页或登录页 ${г}。`,
    состав: (п, м, зд) => `「功能不存在」中还包括 ${п} 个指向第三方服务商的页面，以及 ${м} 个目标藏在折叠菜单中的页面。「无法测量」中有 ${зд} 个页面来自屏蔽自动遍历的网站。`,
    типыЗаголовок: '按页面类型的障碍比例',
    тип: '页面类型',
    типы: { home: '首页', contact: '联系方式', meetings: '会议', jobs: '招聘', documents: '文件', calendar: '日历', '311_request': '311 申请', payment: '支付' },
    единица: (v53, v54) => `计数单位是页面，而不是网站。测量时间为 2026 年 10 月 1–2 日（UTC）：v5.3.1 引擎 ${v53} 条记录，v5.4 引擎 ${v54} 条。`,
    данныеЗаголовок: '数据与核验',
    данные: (размер, строк) => `第 2 版数据集：traversal-log-v5-2026-10-02.jsonl.gz（${размер}，${строк} 行）。每一行都包含遍历程序的原始判定以及按方案 A 和 B 的类别，因此任何能读取 JSON 的程序都可以不依赖我们重新计算这个数字。`,
    маска: '焦点路径文本中公职人员的电子邮箱和电话号码已替换为 [e-mail] 和 [phone]，我们磁盘上的截图路径已缩减为文件名。除此之外没有任何改动：用公开文件重新计算得到相同的数字。',
    схема: '字段说明',
    версия1: '下方的第 1 版既未删除，也未事后修改。',
  },
};

const ЯЧЕЙКА: React.CSSProperties = { padding: '8px 12px', borderBottom: '1px solid rgba(148,163,184,0.12)', fontSize: 14 };
const ЧИСЛО: React.CSSProperties = { ...ЯЧЕЙКА, textAlign: 'right', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' };
const ШАПКА: React.CSSProperties = { ...ЯЧЕЙКА, color: '#94a3b8', fontWeight: 600, textAlign: 'left' };
const ПАРАГРАФ: React.CSSProperties = { color: '#cbd5e1', fontSize: 16, lineHeight: 1.7, marginBottom: 14 };
const ПОДЗАГ: React.CSSProperties = { fontSize: 19, fontWeight: 700, margin: '22px 0 10px', color: '#e2e8f0' };
const ПОДПИСЬ_ТАБЛИЦЫ: React.CSSProperties = { textAlign: 'left', color: '#94a3b8', fontSize: 14, marginBottom: 8 };
const ИМЯ_СТРОКИ: React.CSSProperties = { ...ЯЧЕЙКА, fontWeight: 400, textAlign: 'left', color: '#e2e8f0' };

export default function ВерсияV5({ язык }: { язык: string }) {
  const я: Язык = язык === 'ru' || язык === 'es' || язык === 'zh' ? язык : 'en';
  const т = ТЕКСТ[я];
  const ч = (n: number) => n.toLocaleString(локаль(я));
  const пр = (a: number, b: number) => {
    const s = (100 * a / b).toFixed(1);
    return (я === 'ru' || я === 'es' ? s.replace('.', ',') : s) + NBSP + '%';
  };
  const мбЧисло = (Ч.байтФайла / 1e6).toFixed(2);
  const мб = (я === 'ru' || я === 'es' ? мбЧисло.replace('.', ',') : мбЧисло) + NBSP + (я === 'ru' ? 'МБ' : 'MB');
  const строки: Array<[string, number]> = [
    [т.кДоступно, Ч.доступно], [т.кБарьер, Ч.барьер], [т.кНетФункции, Ч.нетФункции], [т.кНеизмеримо, Ч.неизмеримо],
  ];

  return (
    <section aria-labelledby="versiya-2" style={{ border: '1px solid rgba(34,211,238,0.35)', borderRadius: 14, padding: '22px 22px 10px', margin: '8px 0 36px', background: 'rgba(8,47,73,0.25)' }}>
      <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(6,182,212,0.4)', color: '#22d3ee', fontSize: 13, marginBottom: 12 }}>{т.метка}</div>
      <h2 id="versiya-2" style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.3, marginBottom: 14, color: '#e2e8f0' }}>{т.заголовок}</h2>
      <p style={{ ...ПАРАГРАФ, borderLeft: '3px solid #22d3ee', paddingLeft: 16 }}>
        {т.главное(пр(Ч.барьер, Ч.измерено), ч(Ч.барьер), ч(Ч.измерено), пр(Ч.барьерБ, Ч.измерено), ч(Ч.барьерБ), ч(Ч.слабых))}
      </p>

      <h3 style={ПОДЗАГ}>{т.почемуЗаголовок}</h3>
      <p style={ПАРАГРАФ}>{т.почему}</p>
      <ul style={{ ...ПАРАГРАФ, paddingLeft: 22 }}>
        {т.пункты.map((п) => <li key={п} style={{ marginBottom: 6 }}>{п}</li>)}
      </ul>

      <h3 style={ПОДЗАГ}>{т.сверкаЗаголовок}</h3>
      <p style={ПАРАГРАФ}>{т.сверка(ч(Ч.общихПар), ч(Ч.старыхБарьеров), ч(Ч.сталиНетФункции), ч(Ч.сталиДоступно), ч(Ч.осталисьБарьером), ч(Ч.сталиВне), ч(Ч.сталиНеизмеримо))}</p>

      <div style={{ overflowX: 'auto', margin: '18px 0' }} tabIndex={0}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <caption style={ПОДПИСЬ_ТАБЛИЦЫ}>{т.таблица}</caption>
          <thead>
            <tr><th scope="col" style={ШАПКА}>{т.категория}</th><th scope="col" style={{ ...ШАПКА, textAlign: 'right' }}>{т.страниц}</th><th scope="col" style={{ ...ШАПКА, textAlign: 'right' }}>{т.доля}</th></tr>
          </thead>
          <tbody>
            {строки.map(([имя, n]) => (
              <tr key={имя}><th scope="row" style={ИМЯ_СТРОКИ}>{имя}</th><td style={ЧИСЛО}>{ч(n)}</td><td style={{ ...ЧИСЛО, color: '#22d3ee' }}>{пр(n, Ч.вЗнаменателе)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={ПАРАГРАФ}>{т.знаменатель(ч(Ч.вЗнаменателе), ч(Ч.доменовВЗнаменателе))} {т.вне(ч(Ч.вне), ч(Ч.доменаНет), ч(Ч.заглушки), ч(Ч.главнаяОшибка))}</p>
      <p style={ПАРАГРАФ}>{т.состав(ч(Ч.уПоставщика), ч(Ч.вСкрытомМеню), ч(Ч.закрылиДоступ))}</p>

      <div style={{ overflowX: 'auto', margin: '18px 0' }} tabIndex={0}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <caption style={ПОДПИСЬ_ТАБЛИЦЫ}>{т.типыЗаголовок}</caption>
          <thead>
            <tr><th scope="col" style={ШАПКА}>{т.тип}</th><th scope="col" style={{ ...ШАПКА, textAlign: 'right' }}>{т.кБарьер}</th><th scope="col" style={{ ...ШАПКА, textAlign: 'right' }}>%</th></tr>
          </thead>
          <tbody>
            {ПО_ТИПАМ.map(([код, б, и]) => (
              <tr key={код}><th scope="row" style={ИМЯ_СТРОКИ}>{т.типы[код]}</th><td style={ЧИСЛО}>{ч(б)} / {ч(и)}</td><td style={{ ...ЧИСЛО, color: '#22d3ee' }}>{пр(б, и)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={ПАРАГРАФ}>{т.единица(ч(Ч.движокV53), ч(Ч.движокV54))}</p>

      <h3 style={ПОДЗАГ}>{т.данныеЗаголовок}</h3>
      <p style={ПАРАГРАФ}>{т.данные(мб, ч(Ч.записей))}</p>
      <p style={ПАРАГРАФ}>{т.маска}</p>
      <p style={{ ...ПАРАГРАФ, fontSize: 14 }}>
        <a href={ФАЙЛ} style={{ color: '#22d3ee' }}>traversal-log-v5-2026-10-02.jsonl.gz</a>{' · '}
        <a href={СХЕМА} style={{ color: '#22d3ee' }}>{т.схема}</a>{' · '}
        <span style={{ color: '#94a3b8', wordBreak: 'break-all' }}>SHA-256 {SHA}</span>
      </p>
      <p style={{ ...ПАРАГРАФ, color: '#94a3b8', fontSize: 14 }}>{т.версия1}</p>
    </section>
  );
}
