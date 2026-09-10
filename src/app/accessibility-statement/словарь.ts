/**
 * ЗАЯВЛЕНИЕ О ДОСТУПНОСТИ — ОДИН ИСТОЧНИК НА ЧЕТЫРЕ ЯЗЫКА.
 *
 * ЗАЧЕМ СТРАНИЦА. Со страницы `/accessibility` вела ссылка на
 * `/accessibility-statement`, и она отдавала 404: заявления о доступности у
 * нас не было ни на одном сайте. По ADA и EN 301 549 это первый документ,
 * который ищет проверяющий, а у нас вдобавок целое исследование доступности —
 * отсутствие собственного заявления било по нам сильнее, чем по кому-либо.
 *
 * ПОЧЕМУ ЧИСЛА, А НЕ СЛОВА. Обычное заявление о доступности состоит из
 * обещаний: «мы стремимся», «мы прилагаем усилия». Проверить их нельзя.
 * Мы измеряем чужие сайты и публикуем результат — значит обязаны измерить
 * себя тем же прибором и опубликовать так же. Все числа ниже сняты замером
 * `_агент/nasha_dostupnost_itog.py` по нашим собственным страницам:
 *
 *     адресов проверено ....... 1 207
 *     замеров (тема × ширина) . 7 924
 *     без единого нарушения ... 4 707  (59,4 %)
 *     нарушений всего ......... 3 512
 *
 * Ни один из сайтов, которые мы измеряли, своих чисел не публикует.
 *
 * ПОЧЕМУ СВОЙ СЛОВАРЬ, А НЕ ОБЩИЙ. Так же устроены страницы исследования и
 * сканера: страница со своим словарём переносится на любой из четырёх сайтов
 * без единой правки кода и не зависит ни от чего, кроме `locale`.
 */

export type ЯзыкЗаявления = 'ru' | 'en' | 'es' | 'zh';

export type ТекстыЗаявления = {
  титул: string;
  описание: string;
  обновлено: string;
  заголовок: string;
  подзаголовок: string;

  стандартЗаголовок: string;
  стандартТекст: string;

  замерЗаголовок: string;
  замерВступление: string;
  замерАдресов: string;
  замерЗамеров: string;
  замерЧистых: string;
  замерНарушений: string;
  замерПояснение: string;

  чтоНеТакЗаголовок: string;
  чтоНеТакВступление: string;
  бедаКонтраст: string;
  бедаПрокрутка: string;
  бедаСсылки: string;
  чтоНеТакЧестно: string;

  какМеряемЗаголовок: string;
  какМеряемТекст: string;

  обратнаяСвязьЗаголовок: string;
  обратнаяСвязьТекст: string;
  обратнаяСвязьПочта: string;
  срокОтвета: string;

  оговоркаЗаголовок: string;
  оговоркаТекст: string;

  назад: string;
};

const RU: ТекстыЗаявления = {
  титул: 'Заявление о доступности | CODE Eternal',
  описание:
    'Наши собственные измерения доступности: 1 207 адресов, 7 924 замера, ' +
    '59,4 % без единого нарушения. Мы меряем себя тем же прибором, что и других.',
  обновлено: 'Обновлено 10 сентября 2026',
  заголовок: 'Заявление о доступности',
  подзаголовок:
    'Мы измеряем доступность чужих сайтов и публикуем результат. Значит ' +
    'обязаны измерить себя тем же прибором — и опубликовать так же.',

  стандартЗаголовок: 'К какому уровню мы стремимся',
  стандартТекст:
    'Целевой стандарт — WCAG 2.1 уровень AA. Он же лежит в основе ADA ' +
    'Title III в США и EN 301 549 в Европе. Мы не заявляем полного ' +
    'соответствия: ниже — наши настоящие числа, включая то, что ещё не ' +
    'исправлено.',

  замерЗаголовок: 'Наши собственные числа',
  замерВступление:
    'Замер сделан движком axe-core по нашим страницам в двух темах ' +
    '(тёмной и светлой) и на четырёх ширинах экрана (320, 390, 768 и ' +
    '1440 пикселей). Дата замера — 10 сентября 2026.',
  замерАдресов: 'адресов проверено',
  замерЗамеров: 'замеров: тема × ширина',
  замерЧистых: 'без единого нарушения',
  замерНарушений: 'нарушений найдено',
  замерПояснение:
    'Один адрес даёт до восьми замеров, потому что доступность зависит от ' +
    'темы и ширины экрана. Считать «страниц без нарушений» вместо замеров ' +
    'было бы лестнее к нам и менее честно к читателю.',

  чтоНеТакЗаголовок: 'Что у нас не в порядке',
  чтоНеТакВступление:
    'Три вида нарушений дают почти всё, что нашёл сканер на страницах ' +
    'исследования:',
  бедаКонтраст:
    'Недостаточный контраст текста — 148 случаев. В светлой теме их больше, ' +
    'чем в тёмной.',
  бедаПрокрутка:
    'Широкие таблицы нельзя пролистать с клавиатуры — 104 случая. На ' +
    'странице данных так устроены 10 таблиц из 11.',
  бедаСсылки:
    'Ссылка внутри абзаца различима только цветом — 55 случаев.',
  чтоНеТакЧестно:
    'Чем уже экран, тем хуже: на 320 пикселях нарушений в полтора раза ' +
    'больше, чем на ноутбуке. Больше всего их — на страницах самого ' +
    'исследования о доступности. Это неприятно писать, и именно поэтому ' +
    'написано.',

  какМеряемЗаголовок: 'Как проверить нас самостоятельно',
  какМеряемТекст:
    'Мы не просим верить на слово. Возьмите любой сканер доступности — ' +
    'axe DevTools, Lighthouse, WAVE — и проверьте любую нашу страницу. ' +
    'Если найдёте больше, чем указано выше, напишите: это будет означать, ' +
    'что наш замер устарел, и мы обновим числа.',

  обратнаяСвязьЗаголовок: 'Если что-то недоступно вам',
  обратнаяСвязьТекст:
    'Напишите, что именно не сработало и чем вы пользуетесь — экранным ' +
    'диктором, клавиатурой, увеличением. Мы починим и сообщим вам.',
  обратнаяСвязьПочта: 'contact@codeofdigitaleternity.com',
  срокОтвета: 'Отвечаем в течение двух рабочих дней.',

  оговоркаЗаголовок: 'Чего это заявление не утверждает',
  оговоркаТекст:
    'Оно не утверждает полного соответствия WCAG 2.1 AA. Оно утверждает ' +
    'ровно одно: мы измерили себя тем же прибором, что и других, и ' +
    'опубликовали результат целиком — вместе с тем, что ещё не исправлено.',

  назад: 'К бесплатному аудиту доступности',
};

const EN: ТекстыЗаявления = {
  титул: 'Accessibility Statement | CODE Eternal',
  описание:
    'Our own accessibility measurements: 1,207 addresses, 7,924 checks, ' +
    '59.4 % with zero violations. We measure ourselves with the same instrument.',
  обновлено: 'Updated 10 September 2026',
  заголовок: 'Accessibility Statement',
  подзаголовок:
    'We measure the accessibility of other websites and publish the result. ' +
    'So we are obliged to measure ourselves with the same instrument — and ' +
    'publish it the same way.',

  стандартЗаголовок: 'The level we aim for',
  стандартТекст:
    'Target standard: WCAG 2.1 level AA — the same one behind ADA Title III ' +
    'in the US and EN 301 549 in Europe. We do not claim full conformance: ' +
    'below are our real numbers, including what is not yet fixed.',

  замерЗаголовок: 'Our own numbers',
  замерВступление:
    'Measured with the axe-core engine across our pages in two themes ' +
    '(dark and light) and four screen widths (320, 390, 768 and 1440 ' +
    'pixels). Date of measurement: 10 September 2026.',
  замерАдресов: 'addresses checked',
  замерЗамеров: 'checks: theme × width',
  замерЧистых: 'with zero violations',
  замерНарушений: 'violations found',
  замерПояснение:
    'One address yields up to eight checks, because accessibility depends ' +
    'on theme and screen width. Counting “pages without violations” instead ' +
    'of checks would flatter us and serve the reader less honestly.',

  чтоНеТакЗаголовок: 'What is wrong on our side',
  чтоНеТакВступление:
    'Three kinds of violation account for nearly everything the scanner ' +
    'found on the research pages:',
  бедаКонтраст:
    'Insufficient text contrast — 148 instances. More of them in the light ' +
    'theme than in the dark one.',
  бедаПрокрутка:
    'Wide tables cannot be scrolled with a keyboard — 104 instances. On the ' +
    'dataset page, 10 tables out of 11 are like this.',
  бедаСсылки:
    'A link inside a paragraph is distinguished by colour alone — 55 instances.',
  чтоНеТакЧестно:
    'The narrower the screen, the worse it gets: at 320 pixels there are ' +
    'one and a half times more violations than on a laptop. And most of them ' +
    'are on the pages of the accessibility study itself. This is unpleasant ' +
    'to write, which is exactly why it is written.',

  какМеряемЗаголовок: 'How to verify us yourself',
  какМеряемТекст:
    'We do not ask you to take our word. Take any accessibility scanner — ' +
    'axe DevTools, Lighthouse, WAVE — and check any page of ours. If you ' +
    'find more than stated above, tell us: it will mean our measurement is ' +
    'out of date, and we will update the numbers.',

  обратнаяСвязьЗаголовок: 'If something is inaccessible to you',
  обратнаяСвязьТекст:
    'Write to us: what exactly failed and what you use — a screen reader, ' +
    'a keyboard, magnification. We will fix it and let you know.',
  обратнаяСвязьПочта: 'contact@codeofdigitaleternity.com',
  срокОтвета: 'We reply within two business days.',

  оговоркаЗаголовок: 'What this statement does not claim',
  оговоркаТекст:
    'It does not claim full WCAG 2.1 AA conformance. It claims exactly one ' +
    'thing: we measured ourselves with the same instrument as everyone else ' +
    'and published the result in full — including what is not yet fixed.',

  назад: 'To the free accessibility audit',
};

const ES: ТекстыЗаявления = {
  титул: 'Declaración de accesibilidad | CODE Eternal',
  описание:
    'Nuestras propias mediciones de accesibilidad: 1 207 direcciones, ' +
    '7 924 comprobaciones, 59,4 % sin ninguna infracción.',
  обновлено: 'Actualizado el 10 de septiembre de 2026',
  заголовок: 'Declaración de accesibilidad',
  подзаголовок:
    'Medimos la accesibilidad de otros sitios y publicamos el resultado. ' +
    'Por eso estamos obligados a medirnos con el mismo instrumento y a ' +
    'publicarlo igual.',

  стандартЗаголовок: 'El nivel al que aspiramos',
  стандартТекст:
    'Norma objetivo: WCAG 2.1 nivel AA, la misma que sustenta el ADA Title ' +
    'III en EE. UU. y la EN 301 549 en Europa. No declaramos conformidad ' +
    'plena: abajo están nuestras cifras reales, incluido lo aún no corregido.',

  замерЗаголовок: 'Nuestras propias cifras',
  замерВступление:
    'Medición con el motor axe-core en nuestras páginas, en dos temas ' +
    '(oscuro y claro) y cuatro anchos de pantalla (320, 390, 768 y 1440 ' +
    'píxeles). Fecha de la medición: 10 de septiembre de 2026.',
  замерАдресов: 'direcciones comprobadas',
  замерЗамеров: 'comprobaciones: tema × ancho',
  замерЧистых: 'sin ninguna infracción',
  замерНарушений: 'infracciones encontradas',
  замерПояснение:
    'Una dirección genera hasta ocho comprobaciones, porque la accesibilidad ' +
    'depende del tema y del ancho de pantalla. Contar «páginas sin ' +
    'infracciones» en lugar de comprobaciones nos favorecería y sería menos ' +
    'honesto con el lector.',

  чтоНеТакЗаголовок: 'Qué falla de nuestro lado',
  чтоНеТакВступление:
    'Tres tipos de infracción explican casi todo lo que el escáner encontró ' +
    'en las páginas del estudio:',
  бедаКонтраст:
    'Contraste de texto insuficiente: 148 casos. Más en el tema claro que en ' +
    'el oscuro.',
  бедаПрокрутка:
    'Las tablas anchas no se pueden desplazar con el teclado: 104 casos. En ' +
    'la página de datos, 10 tablas de 11 están así.',
  бедаСсылки:
    'Un enlace dentro de un párrafo se distingue solo por el color: 55 casos.',
  чтоНеТакЧестно:
    'Cuanto más estrecha es la pantalla, peor: a 320 píxeles hay una vez y ' +
    'media más infracciones que en un portátil. Y la mayoría están en las ' +
    'páginas del propio estudio sobre accesibilidad. Es incómodo escribirlo, ' +
    'y por eso mismo está escrito.',

  какМеряемЗаголовок: 'Cómo comprobarnos usted mismo',
  какМеряемТекст:
    'No pedimos que nos crea. Tome cualquier escáner de accesibilidad — axe ' +
    'DevTools, Lighthouse, WAVE — y revise cualquiera de nuestras páginas. ' +
    'Si encuentra más de lo indicado, escríbanos: significará que nuestra ' +
    'medición está desfasada y actualizaremos las cifras.',

  обратнаяСвязьЗаголовок: 'Si algo le resulta inaccesible',
  обратнаяСвязьТекст:
    'Escríbanos: qué falló exactamente y qué utiliza usted — lector de ' +
    'pantalla, teclado, ampliación. Lo corregiremos y se lo comunicaremos.',
  обратнаяСвязьПочта: 'contact@codeofdigitaleternity.com',
  срокОтвета: 'Respondemos en un plazo de dos días hábiles.',

  оговоркаЗаголовок: 'Lo que esta declaración no afirma',
  оговоркаТекст:
    'No afirma conformidad plena con WCAG 2.1 AA. Afirma exactamente una ' +
    'cosa: nos hemos medido con el mismo instrumento que a los demás y hemos ' +
    'publicado el resultado completo, incluido lo que aún no está corregido.',

  назад: 'A la auditoría de accesibilidad gratuita',
};

const ZH: ТекстыЗаявления = {
  титул: '无障碍声明 | CODE Eternal',
  описание:
    '我们自己的无障碍测量：1 207 个地址、7 924 次检查、59.4 % 零违规。' +
    '我们用同一把尺子衡量自己。',
  обновлено: '更新于 2026 年 9 月 10 日',
  заголовок: '无障碍声明',
  подзаголовок:
    '我们测量他人网站的无障碍程度并公开结果，因此也有义务用同一把尺子衡量自己，' +
    '并同样公开。',

  стандартЗаголовок: '我们对标的级别',
  стандартТекст:
    '目标标准：WCAG 2.1 AA 级——美国 ADA Title III 与欧洲 EN 301 549 的共同基础。' +
    '我们不声称完全符合：以下是我们的真实数字，包括尚未修复的部分。',

  замерЗаголовок: '我们自己的数字',
  замерВступление:
    '使用 axe-core 引擎测量我们的页面，涵盖两种主题（深色与浅色）与四种屏幕宽度' +
    '（320、390、768、1440 像素）。测量日期：2026 年 9 月 10 日。',
  замерАдресов: '已检查地址',
  замерЗамеров: '检查次数：主题 × 宽度',
  замерЧистых: '零违规',
  замерНарушений: '发现的违规',
  замерПояснение:
    '一个地址最多产生八次检查，因为无障碍程度取决于主题与屏幕宽度。用「无违规页面数」' +
    '代替检查次数会更好看，却对读者不够诚实。',

  чтоНеТакЗаголовок: '我们自身的问题',
  чтоНеТакВступление: '在研究页面上，扫描器发现的问题几乎全部属于三类：',
  бедаКонтраст: '文字对比度不足：148 处。浅色主题多于深色主题。',
  бедаПрокрутка:
    '宽表格无法用键盘横向滚动：104 处。在数据页上，11 个表格中有 10 个如此。',
  бедаСсылки: '段落内的链接仅靠颜色区分：55 处。',
  чтоНеТакЧестно:
    '屏幕越窄越糟：在 320 像素下，违规数量是笔记本电脑的一倍半。而且大多数出现在' +
    '无障碍研究本身的页面上。写下这些并不愉快，正因如此才写下来。',

  какМеряемЗаголовок: '如何自行核验我们',
  какМеряемТекст:
    '我们不要求您相信空话。请使用任意无障碍扫描工具——axe DevTools、Lighthouse、' +
    'WAVE——检查我们的任意页面。若您发现的问题多于上述数字，请告知我们：那意味着' +
    '我们的测量已过时，我们会更新数字。',

  обратнаяСвязьЗаголовок: '若有内容您无法访问',
  обратнаяСвязьТекст:
    '请写信告诉我们：具体哪里失败，以及您使用的是屏幕阅读器、键盘还是放大功能。' +
    '我们会修复并回复您。',
  обратнаяСвязьПочта: 'contact@codeofdigitaleternity.com',
  срокОтвета: '我们会在两个工作日内回复。',

  оговоркаЗаголовок: '本声明不主张什么',
  оговоркаТекст:
    '它不主张完全符合 WCAG 2.1 AA。它只主张一件事：我们用衡量他人的同一把尺子' +
    '衡量了自己，并完整公开了结果——包括尚未修复的部分。',

  назад: '前往免费无障碍审计',
};

/** Числа замера — в одном месте, чтобы не разошлись между языками. */
export const ЧИСЛА_ЗАМЕРА = {
  адресов: 1207,
  замеров: 7924,
  чистых: 4707,
  чистыхДоля: '59,4 %',
  нарушений: 3512,
  дата: '2026-09-10',
};

export const ЗАЯВЛЕНИЕ: Record<ЯзыкЗаявления, ТекстыЗаявления> = {
  ru: RU,
  en: EN,
  es: ES,
  zh: ZH,
};
