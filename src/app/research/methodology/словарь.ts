/**
 * МЕТОДИКА ИССЛЕДОВАНИЯ — ТЕКСТЫ НА ЧЕТЫРЁХ ЯЗЫКАХ.
 *
 * ПОВОД тот же, что и у соседней страницы данных: документ был написан
 * только по-русски, и переключатель языка на него не действовал.
 *
 * ЭТУ СТРАНИЦУ ПЕРЕВОДИТЬ ТРУДНЕЕ, ЧЕМ СТРАНИЦУ ДАННЫХ, и вот почему.
 * Данные — это числа с подписями; методика — это доводы. Доводы ломаются
 * от небрежного перевода: «мы не утверждаем, что проводили тестирование с
 * незрячими участниками» нельзя смягчить до «мы делали ограниченное
 * тестирование», иначе признание превращается в увёртку и работает против
 * нас. Поэтому все оговорки, признания ошибок и границы применимости
 * переведены дословно и с той же прямотой.
 *
 * НЕ ПЕРЕВОДЯТСЯ НИГДЕ: axe-core, Puppeteer, Chromium, WCAG 2.1 AA,
 * ADA Title II, outline: none, :focus-visible, domcontentloaded, CC BY 4.0,
 * CC0, cisagov/dotgov-data, OpenStreetMap и теги OSM. Это имена, по которым
 * читатель ищет первоисточник; переведённое имя не находится.
 *
 * ИМЯ ПОЛЯ `вердикт_человека` в таблице оставлено как есть на всех языках:
 * оно так называется в выложенных открытых данных. Переименуй его в
 * переводе — и читатель не сведёт страницу с файлом JSONL.
 */

export type ЯзыкКод = 'ru' | 'en' | 'es' | 'zh';

export type ТекстыМетодики = {
  метка: string;
  заголовок: string;
  версия: (дата: string) => string;

  зачемМетодика: string;
  зачем1: string;
  зачем2: string;
  зачем3: string;

  частьI: string;
  чтоБерём: string;
  выборкаСША: string;
  отличиеОтПодборки: string;
  выборкаЕвропа: string;
  ограничениеВыборкиЗаголовок: string;
  ограничениеВыборкиТекст: string;

  какПроверяем: string;
  браузерНеЗапрос: string;
  чтоДелаемНаСайте: string;

  чтоСчитаем: string;
  плотностьНарушений: string;

  чегоНеДелаем: string;
  неДелаемТекст: string;

  частьII: string;
  здесьНачинается: string;
  задачаПроверяющего: string;
  задачаТекст: string;

  ктоПроверяющий: string;
  ктоПроверяющийГлавное: string;
  ктоПроверяющийКак: string;
  чтоЭтоДаётЗаголовок: string;
  чтоЭтоДаётТекст: string;
  чегоНеДаётЗаголовок: string;
  чегоНеДаётТекст: string;

  чтоЗаписывается: string;
  шапкаПоле: string;
  шапкаЧтоОзначает: string;
  поле: Record<string, string>;
  полеЗначение: Record<string, string>;
  последнееПолеКлючевое: string;

  чтоСчитаетсяБарьером: string;
  барьер: Record<string, string>;

  выборОбеихГрупп: string;
  выборОбеихГруппТекст: string;

  частьIII: string;
  главнаяВеличина: string;
  ложноеСпокойствие: string;
  ложноеСпокойствиеТекст: string;
  ложнаяТревога: string;
  ложнаяТревогаТекст: string;

  состояниеРаботы: (дата: string) => string;
  шапкаПоказатель: string;
  шапкаЗначение: string;
  показатель: Record<string, string>;

  ограничения: string;
  ограничение: Record<string, string>;

  открытость: string;
  открытостьПункт: Record<string, string>;

  проверилиСебя: string;
  проверилиСебяТекст: string;
  шапкаСайт: string;
  шапкаОбводка: string;
  шапкаЭлементов: string;
  шапкаБезИмени: string;
  нашлиУСебя: string;

  раскрытие: string;
  раскрытиеТекст: string;

  какСослаться: string;
  обратнаяСвязь: string;
  обратнаяСвязьТекст: string;
  данныеСсылка: string;
};

const ru: ТекстыМетодики = {
  метка: 'Исследование',
  заголовок: 'Методика: как мы измеряем доступность муниципальных сайтов',
  версия: (д) => `Версия 1.1 · ${д} · Maksim Galatin & Claude (Anthropic) · лицензия CC BY 4.0`,

  зачемМетодика: 'Зачем понадобилась отдельная методика',
  зачем1: 'Автоматических измерений доступности в мире много. Их делают сканеры вроде axe-core: они дёшевы, воспроизводимы и меряют разметку страницы.',
  зачем2: 'Данных о том, что происходит при попытке пройти путь клавиатурой, почти нет. Набор правил проверяет разметку; дойти до цели он не пробует. Нужен обход, который действительно нажимает Tab на живой странице и смотрит, куда попал фокус.',
  зачем3: 'Мы делаем оба измерения и сравниваем их между собой. Расхождение между ними — главный результат работы, и он получается только тогда, когда обе проверки идут по одной и той же выборке.',

  частьI: 'Часть I. Автоматическое измерение',
  чтоБерём: 'Что берём в выборку',
  выборкаСША: 'Для США — официальный реестр доменов .gov агентства CISA (cisagov/dotgov-data, лицензия CC0, обновляется ежедневно). Из него берутся организации типа City и County: 11 659 записей в 51 штате и территории.',
  отличиеОтПодборки: 'Это важное отличие от подборки, собранной поиском. На вопрос «а откуда вы взяли эти города» есть ответ, который проверяется за минуту: весь официальный реестр, а не то, что нам удалось найти.',
  выборкаЕвропа: 'Для Европы — муниципальные организации из OpenStreetMap по тегам amenity=townhall, office=government и смежным.',
  ограничениеВыборкиЗаголовок: 'Известное ограничение выборки.',
  ограничениеВыборкиТекст: 'OpenStreetMap заполняется добровольцами, и полнота его различается по странам. Мы не утверждаем, что охватили все муниципалитеты страны; мы утверждаем, что охватили все, у которых в OSM указан сайт. Это разные вещи, и второе проверяемо.',

  какПроверяем: 'Как проверяем',
  браузерНеЗапрос: 'Настоящий браузер (Chromium через Puppeteer), не запрос по HTTP. Причина: значительная часть современных сайтов собирается скриптами, и проверка исходного HTML измеряет не то, что видит человек.',
  чтоДелаемНаСайте: 'На каждом сайте: открываем страницу и ждём события domcontentloaded; прогоняем axe-core — открытый набор правил, соответствующий WCAG 2.1 AA; записываем каждое сработавшее правило, число вхождений и селектор DOM; ищем страницу оплаты и проверяем путь до неё.',

  чтоСчитаем: 'Что считаем и как',
  плотностьНарушений: 'Плотность нарушений = число сработавших правил, делённое на число проверенных страниц. Именно плотность, а не абсолютное число: у большого сайта страниц больше, и сравнивать по сумме нарушений значит наказывать за размер.',

  чегоНеДелаем: 'Чего мы НЕ делаем — и это важно',
  неДелаемТекст: 'Мы не выносим приговор сайту целиком по одной странице, не считаем предупреждения нарушениями и не подменяем измерение оценкой. Автоматическая часть отвечает только на вопрос, сработало ли правило, и ни на какой другой.',

  частьII: 'Часть II. Обход клавиатурой',
  здесьНачинается: 'Здесь начинается то, чего не делает ни один автоматический аудит.',
  задачаПроверяющего: 'Задача проверяющего',
  задачаТекст: 'Пройти путь человека, который хочет заплатить муниципальный налог или штраф, пользуясь только клавиатурой. Мышь не трогать вовсе.',

  ктоПроверяющий: 'Кто проверяющий',
  ктоПроверяющийГлавное: 'Обход выполняет программный агент в настоящем браузере Chrome, а не человек за столом. Мы говорим это прямо, потому что от ответа на этот вопрос зависит, как читать все числа ниже.',
  ктоПроверяющийКак: 'Агент управляет реальной страницей так же, как человек без мыши: нажимает Tab, читает, куда переместился фокус, и останавливается там, где переместиться некуда. Он не разбирает исходный HTML и не судит по разметке — он ходит по живой странице со всеми её скриптами, баннерами согласия и всплывающими окнами.',
  чтоЭтоДаётЗаголовок: 'Что это даёт.',
  чтоЭтоДаётТекст: ' Воспроизводимость: тот же обход можно запустить заново и получить тот же результат, а живого человека нельзя посадить за 67 тысяч страниц и нельзя попросить повторить путь через месяц. И масштаб: измерение такого размера человеческими руками не делается вовсе — именно поэтому таких данных до сих пор не было.',
  чегоНеДаётЗаголовок: 'Чего это НЕ даёт, и мы это признаём.',
  чегоНеДаётТекст: ' Агент не заменяет пользователя экранного диктора и не измеряет, насколько понятной оказалась страница. Он отвечает на один вопрос — можно ли физически добраться до цели одной клавиатурой. Мы не утверждаем, что проводили тестирование с незрячими участниками: этого мы не делали.',

  чтоЗаписывается: 'Что записывается на каждом сайте',
  шапкаПоле: 'Поле',
  шапкаЧтоОзначает: 'Что означает',
  поле: {
    steps: 'шагов до оплаты',
    seconds: 'секунд до оплаты',
    brokeAt: 'где оборвалось',
    reason: 'причина',
    labels: 'есть метки у полей',
    contrast: 'контраст в порядке',
    screenshot: 'скриншот',
    verdict: 'вердикт_человека',
    script: 'что сказал скрипт',
  },
  полеЗначение: {
    steps: 'сколько нажатий Tab до формы оплаты',
    seconds: 'сколько времени занял путь',
    brokeAt: 'элемент, на котором путь стал невозможен',
    reason: 'что именно помешало',
    labels: 'связаны ли поля формы с подписями',
    contrast: 'различим ли текст на кнопке оплаты',
    screenshot: 'снимок места обрыва',
    verdict: 'итог обхода: прошёл, частичный барьер, не прошёл. Имя поля историческое и сохранено таким же в открытых данных',
    script: 'что об этом сайте сказала автоматика',
  },
  последнееПолеКлючевое: 'Последнее поле — ключевое: оно позволяет сравнить два измерения по одному объекту.',

  чтоСчитаетсяБарьером: 'Что считается барьером',
  барьер: {
    focus: 'Фокус не виден (outline: none) — непонятно, где находишься',
    trap: 'Ловушка фокуса — из элемента нельзя выйти клавиатурой',
    label: 'Поле без метки — экранный диктор не может сказать, что вводить',
    button: 'Кнопка не является кнопкой — div с обработчиком не получает фокус',
    modal: 'Модальное окно не закрывается клавишей Escape',
  },

  выборОбеихГрупп: 'Выбор выборки для обхода',
  выборОбеихГруппТекст: 'Проверяются обе группы: и те сайты, что автоматика признала доступными, и те, что забраковала. Иначе получилось бы одностороннее измерение, показывающее только ошибки в удобную нам сторону.',

  частьIII: 'Часть III. Что получается на сравнении',
  главнаяВеличина: 'Главная величина исследования — расхождение между машиной и обходом, и оно измеряется в обе стороны:',
  ложноеСпокойствие: 'Ложное спокойствие',
  ложноеСпокойствиеТекст: ' — автоматика говорит «доступно», обход не проходит.',
  ложнаяТревога: 'Ложная тревога',
  ложнаяТревогаТекст: ' — автоматика бракует, обход проходит.',

  состояниеРаботы: (д) => `Состояние работы на ${д}`,
  шапкаПоказатель: 'показатель',
  шапкаЗначение: 'значение',
  показатель: {
    records: 'записей обхода',
    municipalities: 'муниципалитетов пройдено',
    states: 'штатов и территорий',
    screenshots: 'записей с проверенным снимком',
    gap: 'расхождение сканера и обхода',
  },

  ограничения: 'Ограничения, которые мы признаём',
  ограничение: {
    one: '1. Обход США закончен — пройден весь реестр CISA, 11 659 сайтов из 11 659. Числа по США окончательны; меняться они будут только при добавлении других стран, и об этом будет сказано прямо.',
    two: '2. Снимок есть не у каждой записи. Там, где страница не открылась, снимать было нечего.',
    three: '3. Заслон от роботов — не то же самое, что недоступность. Что за ним, мы не знаем и в барьеры это не пишем.',
    four: '4. Обход не заменяет живого пользователя. Он отвечает на один вопрос: можно ли физически добраться до цели одной клавиатурой. Цель у каждого из восьми типов страниц СВОЯ: найти документ, подать заявку 311, дойти до шага оплаты, найти протокол заседания, главную навигацию, вакансию, контакт, событие в календаре. Общие доли — 74,6 % не дошли, 25,4 % дошли — считаются по всем восьми целям сразу, а не по одной из них. У оплаты своя доля: дошли 19,0 %.',
    five: '5. Порог в 40 нажатий Tab выбран нами. Он оправдан тем, что медиана успешного пути — три нажатия, но это всё же наш выбор, а не стандарт. Проверено чувствительностью: при порогах 40, 60 и 100 числа СОВПАДАЮТ — выше сорока не доходит никто, 99-й процентиль успешного пути 35 нажатий. Ниже порог уже влияет: при 30 доля дошедших падает на 0,6 пункта, при 20 — на 2,1, при 10 — на 5,7. Главное число сдвигается так же: 53,8 % при 40, 55,0 % при 30, 57,6 % при 20. Значит сорок — это запас, а не содержательное решение: любой больший порог даёт тот же ответ.',
    six: '6. Сайты, недоступные автоматике, до недавнего времени выпадали из выборки целиком. Таких 787, и среди них Нью-Йорк целиком; 230 из этих муниципалитетов обязаны уложиться в срок 26 апреля 2027 года. Мы проходим их обходом отдельно, в том же порядке — от крупных к малым.',
    seven: '7. Часть страниц проверена дважды, и мы посчитали, что это меняет. Обход идёт кругами, и один и тот же адрес иногда попадает в него повторно: таких записей 348 из 95 524 — 0,4 % журнала. Мы пересчитали все доли, оставив по одной, самой поздней записи на каждую пару «адрес и тип страницы». Главное число не сдвинулось вовсе: 74,6 % и до, и после; доля дошедших — 25,4 % и там и там. Разница — одна сотая пункта, и мы называем её здесь, чтобы не пришлось объяснять потом.',
    eight: '8. Наблюдения не независимы, и мы это измерили. Восемь задач одного сайта связаны между собой: если сайт устроен плохо, плохи чаще все восемь. Внутриклассовая корреляция 0,263, коэффициент вздутия дисперсии 2,72 — значит восемь задач дают не восемь независимых наблюдений, а примерно три. Эффективный объём выборки 17 272 вместо 47 036 измеримых записей. Доверительный интервал главного числа, посчитанный с поправкой на это: 52,7 % [51,7; 53,8]. Без поправки он был бы [53,2; 54,4] — почти вдвое уже, и это было бы неправдой. Отдельно: если считать не по страницам, а по муниципалитетам — по одному голосу на сайт, — выходит 52,7 % против 53,8 %. Расхождение 1,1 пункта: вывод от единицы счёта не зависит.',
  },

  открытость: 'Открытость',
  открытостьПункт: {
    raw: 'Сырые данные публикуются целиком, включая записи, которые нам невыгодны',
    code: 'Код проверки открыт',
    shots: 'Скриншоты обхода прилагаются — по одному на каждую проверенную страницу',
    errors: 'Ошибки прошлых версий описаны прямо в методике, а не переписаны задним числом',
  },

  проверилиСебя: 'Мы проверили и себя',
  проверилиСебяТекст: 'Исследование о доступности, чьи собственные сайты недоступны, не стоит ничего. 27 августа 2026 года мы прошли все четыре своих сайта той же процедурой, что и муниципальные: клавиатурой, в настоящем браузере, с проверкой видимости фокуса на каждом шаге.',
  шапкаСайт: 'сайт',
  шапкаОбводка: 'обводка фокуса',
  шапкаЭлементов: 'элементов',
  шапкаБезИмени: 'без имени',
  нашлиУСебя: 'Отдельно скажем то, что нашли у себя. В нашем коде 83 вхождения outline: none — той самой строки, которая даёт 31 % всех обрывов в нашем же исследовании. Они безвредны только потому, что перебиты общим правилом :focus-visible. Это и есть разница между «написано плохо» и «работает плохо», и мы показываем её на себе.',

  раскрытие: 'Раскрытие конфликта интересов',
  раскрытиеТекст: 'Автор оказывает услуги по устранению нарушений доступности. Исследование самофинансировано. Никто не платил за включение в выборку и никто не платил за исключение из неё.',

  какСослаться: 'Как сослаться',
  обратнаяСвязь: 'Обратная связь',
  обратнаяСвязьТекст: 'Нашли ошибку в методике или в данных — напишите: ',
  данныеСсылка: 'Сами данные — ',
};

const en: ТекстыМетодики = {
  метка: 'Research',
  заголовок: 'Methodology: how we measure the accessibility of municipal websites',
  версия: (д) => `Version 1.1 · ${д} · Maksim Galatin & Claude (Anthropic) · licensed CC BY 4.0`,

  зачемМетодика: 'Why a separate methodology was needed',
  зачем1: 'Automated accessibility measurements are plentiful. Scanners such as axe-core produce them: they are cheap, reproducible, and they measure page markup.',
  зачем2: 'Data on what happens when someone tries to walk the path by keyboard barely exists. A rule set inspects markup; it does not attempt to reach the goal. What is needed is a traversal that actually presses Tab on a live page and watches where focus lands.',
  зачем3: 'We perform both measurements and compare them with each other. The gap between them is the main result of this work, and it only emerges when both checks run over the very same sample.',

  частьI: 'Part I. Automated measurement',
  чтоБерём: 'What goes into the sample',
  выборкаСША: 'For the United States — the official .gov domain registry maintained by CISA (cisagov/dotgov-data, CC0 licence, updated daily). From it we take organisations of type City and County: 11,659 records across 51 states and territories.',
  отличиеОтПодборки: 'This is an important difference from a set assembled by searching. To the question "where did you get these towns from" there is an answer that can be verified in a minute: the entire official registry, not whatever we managed to find.',
  выборкаЕвропа: 'For Europe — municipal organisations from OpenStreetMap under the tags amenity=townhall, office=government and related ones.',
  ограничениеВыборкиЗаголовок: 'A known limitation of the sample.',
  ограничениеВыборкиТекст: 'OpenStreetMap is filled in by volunteers, and its completeness differs between countries. We do not claim to have covered every municipality in a country; we claim to have covered every one whose website is listed in OSM. These are different statements, and the second is verifiable.',

  какПроверяем: 'How we check',
  браузерНеЗапрос: 'A real browser (Chromium via Puppeteer), not an HTTP request. The reason: a large share of modern sites is assembled by scripts, and checking the source HTML measures something other than what a person sees.',
  чтоДелаемНаСайте: 'On every site: we open the page and wait for the domcontentloaded event; we run axe-core — an open rule set aligned with WCAG 2.1 AA; we record every rule that fired, the number of occurrences and the DOM selector; we look for the payment page and check the path to it.',

  чтоСчитаем: 'What we count and how',
  плотностьНарушений: 'Violation density = the number of rules that fired divided by the number of pages checked. Density rather than an absolute count: a large site has more pages, and comparing by total violations means punishing size.',

  чегоНеДелаем: 'What we do NOT do — and this matters',
  неДелаемТекст: 'We do not condemn an entire site on the basis of one page, we do not count warnings as violations, and we do not substitute judgement for measurement. The automated part answers one question only — did a rule fire — and no other.',

  частьII: 'Part II. Keyboard traversal',
  здесьНачинается: 'Here begins what no automated audit does.',
  задачаПроверяющего: 'The task set for the checker',
  задачаТекст: 'Walk the path of a person who wants to pay a municipal tax or fine using the keyboard alone. The mouse is not to be touched at all.',

  ктоПроверяющий: 'Who does the checking',
  ктоПроверяющийГлавное: 'The traversal is performed by a software agent in a real Chrome browser, not by a person at a desk. We say this plainly, because how every number below should be read depends on the answer.',
  ктоПроверяющийКак: 'The agent drives a real page the way a person without a mouse does: it presses Tab, reads where focus has moved, and stops where there is nowhere left to move. It does not parse the source HTML and does not judge by markup — it walks the live page with all its scripts, consent banners and pop-ups.',
  чтоЭтоДаётЗаголовок: 'What this gives us.',
  чтоЭтоДаётТекст: ' Reproducibility: the same traversal can be run again and yield the same result, whereas a living person cannot be sat down in front of 67,000 pages and cannot be asked to repeat the path a month later. And scale: a measurement of this size simply is not done by human hands — which is precisely why such data did not exist until now.',
  чегоНеДаётЗаголовок: 'What this does NOT give us, and we acknowledge it.',
  чегоНеДаётТекст: ' The agent does not stand in for a screen-reader user and does not measure how comprehensible a page turned out to be. It answers one question — whether the goal can physically be reached by keyboard alone. We do not claim to have conducted testing with blind participants: we did not.',

  чтоЗаписывается: 'What is recorded for every site',
  шапкаПоле: 'Field',
  шапкаЧтоОзначает: 'What it means',
  поле: {
    steps: 'steps to payment',
    seconds: 'seconds to payment',
    brokeAt: 'where it broke',
    reason: 'reason',
    labels: 'fields have labels',
    contrast: 'contrast is adequate',
    screenshot: 'screenshot',
    verdict: 'вердикт_человека',
    script: 'what the scanner said',
  },
  полеЗначение: {
    steps: 'how many Tab presses to the payment form',
    seconds: 'how long the path took',
    brokeAt: 'the element at which the path became impossible',
    reason: 'what exactly got in the way',
    labels: 'whether form fields are tied to their captions',
    contrast: 'whether the text on the payment button is legible',
    screenshot: 'a capture of the breaking point',
    verdict: 'traversal outcome: passed, partial barrier, failed. The field name is historical and is kept identical in the open data',
    script: 'what the automated check said about this site',
  },
  последнееПолеКлючевое: 'The last field is the key one: it makes it possible to compare two measurements of the same object.',

  чтоСчитаетсяБарьером: 'What counts as a barrier',
  барьер: {
    focus: 'Focus is invisible (outline: none) — you cannot tell where you are',
    trap: 'Focus trap — the element cannot be left by keyboard',
    label: 'Unlabelled field — a screen reader cannot say what to enter',
    button: 'A button that is not a button — a div with a handler does not receive focus',
    modal: 'A modal dialog that does not close with Escape',
  },

  выборОбеихГрупп: 'How the traversal sample is chosen',
  выборОбеихГруппТекст: 'Both groups are checked: the sites the automated pass judged accessible and the ones it rejected. Otherwise we would have a one-sided measurement showing only the errors that suit us.',

  частьIII: 'Part III. What the comparison yields',
  главнаяВеличина: 'The principal quantity of this research is the gap between machine and traversal, and it is measured in both directions:',
  ложноеСпокойствие: 'False reassurance',
  ложноеСпокойствиеТекст: ' — the automated check says "accessible", the traversal does not get through.',
  ложнаяТревога: 'False alarm',
  ложнаяТревогаТекст: ' — the automated check rejects the page, the traversal gets through.',

  состояниеРаботы: (д) => `State of the work as of ${д}`,
  шапкаПоказатель: 'metric',
  шапкаЗначение: 'value',
  показатель: {
    records: 'traversal records',
    municipalities: 'municipalities covered',
    states: 'states and territories',
    screenshots: 'records with a verified screenshot',
    gap: 'gap between scanner and traversal',
  },

  ограничения: 'Limitations we acknowledge',
  ограничение: {
    one: '1. The US sweep is finished — the entire CISA registry has been walked, 11,659 sites out of 11,659. The US numbers are final; they will change only when other countries are added, and that will be stated plainly.',
    two: '2. Not every record has a screenshot. Where the page did not open, there was nothing to capture.',
    three: '3. A bot shield is not the same as inaccessibility. We do not know what is behind it and we do not record it as a barrier.',
    four: '4. Traversal does not replace a live user. It answers one question: whether the goal can physically be reached by keyboard alone. The goal DIFFERS by page type, and there are eight: find a public document, file a 311 request, reach the payment step, find council minutes, reach main navigation, find a job posting, find a contact, find a dated event. The aggregate figures — 74.6 % did not reach the goal, 25.4 % did — cover all eight task goals, not any single one. The payment goal alone stands at 19.0 % reached.',
    five: '5. The threshold of 40 Tab presses is ours. It is justified by the fact that the median successful path is three presses — but it remains our choice, not a standard. Tested by sensitivity analysis: thresholds of 40, 60 and 100 give IDENTICAL figures — nobody reaches a goal beyond forty presses, and the 99th percentile of successful paths is 35. Lower thresholds do change the result: at 30 the share reaching the goal drops by 0.6 points, at 20 by 2.1, at 10 by 5.7. The headline figure moves the same way: 53.8 % at 40, 55.0 % at 30, 57.6 % at 20. Forty is therefore headroom rather than a substantive modelling choice — any larger threshold yields the same answer.',
    six: '6. Sites inaccessible to the automated pass used to drop out of the sample entirely. There are 787 of them, New York among them in full; 230 of those municipalities are bound by the 26 April 2027 deadline. We are covering them by traversal separately, in the same order — from large to small.',
    seven: '7. Some pages were checked twice, and we worked out what that changes. The traversal runs in rounds, and the same address occasionally comes round again: 348 records out of 95,524 — 0.4 % of the log. We recomputed every share keeping one record, the latest, for each address-and-page-type pair. The headline number did not move at all: 74.6 % before and after; the share reaching the goal, 25.4 % either way. A difference of one hundredth of a point, and we state it here so that it need not be explained later.',
    eight: '8. The observations are not independent, and we measured that. Eight tasks on one site are related: a badly built site tends to fail all eight. The intraclass correlation is 0.263 and the variance inflation factor 2.72 — eight tasks therefore yield not eight independent observations but roughly three. The effective sample size is 17,272 rather than 47,036 measurable records. The confidence interval for the headline figure, corrected for this: 52.7 % [51.7; 53.8]. Uncorrected it would read [53.2; 54.4] — almost twice as narrow, and it would be false. Separately: counting by municipality rather than by page — one vote per site — gives 52.7 % against 53.8 %. A gap of 1.1 points: the conclusion does not depend on the unit of count.',
  },

  открытость: 'Openness',
  открытостьПункт: {
    raw: 'Raw data is published in full, including records that do not suit us',
    code: 'The checking code is open',
    shots: 'Traversal screenshots are attached — one for every page checked',
    errors: 'Errors in earlier versions are described in the methodology itself rather than rewritten after the fact',
  },

  проверилиСебя: 'We checked ourselves too',
  проверилиСебяТекст: 'A study about accessibility whose own sites are inaccessible is worth nothing. On 27 August 2026 we put all four of our own sites through the same procedure as the municipal ones: by keyboard, in a real browser, checking focus visibility at every step.',
  шапкаСайт: 'site',
  шапкаОбводка: 'focus outline',
  шапкаЭлементов: 'elements',
  шапкаБезИмени: 'unnamed',
  нашлиУСебя: 'And here is what we found on ourselves. Our code contains 83 occurrences of outline: none — the very line that accounts for 31 % of all break-offs in our own research. They are harmless only because they are overridden by a global :focus-visible rule. That is exactly the difference between "written badly" and "works badly", and we demonstrate it on ourselves.',

  раскрытие: 'Conflict of interest disclosure',
  раскрытиеТекст: 'The author provides services remediating accessibility violations. This research is self-funded. Nobody paid to be included in the sample and nobody paid to be left out of it.',

  какСослаться: 'How to cite',
  обратнаяСвязь: 'Feedback',
  обратнаяСвязьТекст: 'Found an error in the methodology or the data — write to us: ',
  данныеСсылка: 'The data itself — ',
};

const es: ТекстыМетодики = {
  метка: 'Investigación',
  заголовок: 'Metodología: cómo medimos la accesibilidad de los sitios municipales',
  версия: (д) => `Versión 1.1 · ${д} · Maksim Galatin & Claude (Anthropic) · licencia CC BY 4.0`,

  зачемМетодика: 'Por qué hizo falta una metodología aparte',
  зачем1: 'Mediciones automáticas de accesibilidad hay muchas en el mundo. Las realizan escáneres como axe-core: son baratos, reproducibles y miden el marcado de la página.',
  зачем2: 'Datos sobre lo que ocurre al intentar recorrer el camino con el teclado casi no existen. Un conjunto de reglas revisa el marcado; no intenta llegar al objetivo. Hace falta un recorrido que pulse Tab de verdad en una página viva y observe dónde queda el foco.',
  зачем3: 'Hacemos ambas mediciones y las comparamos entre sí. La discrepancia entre ellas es el resultado principal de este trabajo, y solo aparece cuando ambas revisiones recorren exactamente la misma muestra.',

  частьI: 'Parte I. Medición automática',
  чтоБерём: 'Qué entra en la muestra',
  выборкаСША: 'Para EE. UU., el registro oficial de dominios .gov de la agencia CISA (cisagov/dotgov-data, licencia CC0, actualizado a diario). De él se toman las organizaciones de tipo City y County: 11 659 registros en 51 estados y territorios.',
  отличиеОтПодборки: 'Es una diferencia importante frente a una selección reunida mediante búsquedas. A la pregunta «¿de dónde sacaron estas ciudades?» hay una respuesta verificable en un minuto: todo el registro oficial, no lo que logramos encontrar.',
  выборкаЕвропа: 'Para Europa, organizaciones municipales de OpenStreetMap según las etiquetas amenity=townhall, office=government y afines.',
  ограничениеВыборкиЗаголовок: 'Limitación conocida de la muestra.',
  ограничениеВыборкиТекст: 'OpenStreetMap lo completan voluntarios y su exhaustividad varía según el país. No afirmamos haber cubierto todos los municipios del país; afirmamos haber cubierto todos aquellos cuyo sitio figura en OSM. Son cosas distintas, y la segunda es verificable.',

  какПроверяем: 'Cómo revisamos',
  браузерНеЗапрос: 'Un navegador real (Chromium mediante Puppeteer), no una petición HTTP. La razón: buena parte de los sitios actuales se construye con scripts, y revisar el HTML de origen mide algo distinto de lo que ve una persona.',
  чтоДелаемНаСайте: 'En cada sitio: abrimos la página y esperamos el evento domcontentloaded; ejecutamos axe-core, un conjunto abierto de reglas conforme a WCAG 2.1 AA; registramos cada regla que se activa, el número de apariciones y el selector del DOM; buscamos la página de pago y comprobamos el camino hasta ella.',

  чтоСчитаем: 'Qué contamos y cómo',
  плотностьНарушений: 'Densidad de infracciones = número de reglas activadas dividido por el número de páginas revisadas. Densidad y no cifra absoluta: un sitio grande tiene más páginas, y comparar por suma de infracciones equivale a penalizar el tamaño.',

  чегоНеДелаем: 'Lo que NO hacemos, y esto importa',
  неДелаемТекст: 'No condenamos un sitio entero por una sola página, no contamos las advertencias como infracciones y no sustituimos la medición por un juicio. La parte automática responde únicamente a si una regla se activó, y a nada más.',

  частьII: 'Parte II. Recorrido por teclado',
  здесьНачинается: 'Aquí empieza lo que ninguna auditoría automática hace.',
  задачаПроверяющего: 'La tarea encomendada',
  задачаТекст: 'Recorrer el camino de una persona que quiere pagar un impuesto o una multa municipal usando solo el teclado. No tocar el ratón en absoluto.',

  ктоПроверяющий: 'Quién realiza la revisión',
  ктоПроверяющийГлавное: 'El recorrido lo realiza un agente informático en un navegador Chrome real, no una persona sentada ante una mesa. Lo decimos con claridad, porque de esa respuesta depende cómo deben leerse todas las cifras que siguen.',
  ктоПроверяющийКак: 'El agente maneja una página real igual que una persona sin ratón: pulsa Tab, lee adónde se ha desplazado el foco y se detiene donde ya no hay adónde desplazarse. No analiza el HTML de origen ni juzga por el marcado: recorre la página viva con todos sus scripts, avisos de consentimiento y ventanas emergentes.',
  чтоЭтоДаётЗаголовок: 'Lo que esto aporta.',
  чтоЭтоДаётТекст: ' Reproducibilidad: el mismo recorrido puede repetirse y dar el mismo resultado, mientras que a una persona real no se la puede sentar ante 67 000 páginas ni pedirle que repita el camino un mes después. Y escala: una medición de este tamaño sencillamente no se hace a mano, y por eso hasta ahora no existían estos datos.',
  чегоНеДаётЗаголовок: 'Lo que esto NO aporta, y lo reconocemos.',
  чегоНеДаётТекст: ' El agente no sustituye a un usuario de lector de pantalla ni mide hasta qué punto la página resultó comprensible. Responde a una sola pregunta: si es físicamente posible llegar al objetivo solo con el teclado. No afirmamos haber realizado pruebas con participantes ciegos: no las hicimos.',

  чтоЗаписывается: 'Qué se registra en cada sitio',
  шапкаПоле: 'Campo',
  шапкаЧтоОзначает: 'Qué significa',
  поле: {
    steps: 'pasos hasta el pago',
    seconds: 'segundos hasta el pago',
    brokeAt: 'dónde se interrumpió',
    reason: 'motivo',
    labels: 'los campos tienen etiqueta',
    contrast: 'el contraste es suficiente',
    screenshot: 'captura',
    verdict: 'вердикт_человека',
    script: 'qué dijo el escáner',
  },
  полеЗначение: {
    steps: 'cuántas pulsaciones de Tab hasta el formulario de pago',
    seconds: 'cuánto tiempo llevó el camino',
    brokeAt: 'el elemento en el que el camino se hizo imposible',
    reason: 'qué lo impidió exactamente',
    labels: 'si los campos del formulario están vinculados a sus etiquetas',
    contrast: 'si el texto del botón de pago es legible',
    screenshot: 'imagen del punto de interrupción',
    verdict: 'resultado del recorrido: pasó, barrera parcial, no pasó. El nombre del campo es histórico y se conserva idéntico en los datos abiertos',
    script: 'qué dijo la revisión automática sobre este sitio',
  },
  последнееПолеКлючевое: 'El último campo es el decisivo: permite comparar dos mediciones sobre un mismo objeto.',

  чтоСчитаетсяБарьером: 'Qué se considera barrera',
  барьер: {
    focus: 'El foco no se ve (outline: none): no se sabe dónde se está',
    trap: 'Trampa de foco: no se puede salir del elemento con el teclado',
    label: 'Campo sin etiqueta: el lector de pantalla no puede decir qué introducir',
    button: 'Un botón que no es un botón: un div con manejador no recibe el foco',
    modal: 'Ventana modal que no se cierra con la tecla Escape',
  },

  выборОбеихГрупп: 'Cómo se elige la muestra del recorrido',
  выборОбеихГруппТекст: 'Se revisan ambos grupos: los sitios que la revisión automática consideró accesibles y los que rechazó. De otro modo tendríamos una medición unilateral que solo muestra los errores que nos convienen.',

  частьIII: 'Parte III. Qué arroja la comparación',
  главнаяВеличина: 'La magnitud principal de esta investigación es la discrepancia entre la máquina y el recorrido, y se mide en ambos sentidos:',
  ложноеСпокойствие: 'Falsa tranquilidad',
  ложноеСпокойствиеТекст: ' — la revisión automática dice «accesible» y el recorrido no pasa.',
  ложнаяТревога: 'Falsa alarma',
  ложнаяТревогаТекст: ' — la revisión automática rechaza la página y el recorrido sí pasa.',

  состояниеРаботы: (д) => `Estado del trabajo a fecha de ${д}`,
  шапкаПоказатель: 'indicador',
  шапкаЗначение: 'valor',
  показатель: {
    records: 'registros de recorrido',
    municipalities: 'municipios recorridos',
    states: 'estados y territorios',
    screenshots: 'registros con captura verificada',
    gap: 'discrepancia entre escáner y recorrido',
  },

  ограничения: 'Limitaciones que reconocemos',
  ограничение: {
    one: '1. El recorrido de EE. UU. ha terminado: se ha recorrido todo el registro CISA, 11 659 sitios de 11 659. Las cifras de EE. UU. son definitivas; solo cambiarán al incorporar otros países, y se dirá con claridad.',
    two: '2. No todos los registros tienen captura. Donde la página no llegó a abrirse, no había nada que capturar.',
    three: '3. Una barrera antirrobots no es lo mismo que la inaccesibilidad. No sabemos qué hay detrás y no lo anotamos como barrera.',
    four: '4. El recorrido no sustituye a un usuario real. Responde a una sola pregunta: si es físicamente posible llegar al objetivo solo con el teclado. El objetivo es DISTINTO en cada uno de los ocho tipos de página: encontrar un documento, presentar una solicitud 311, llegar al paso de pago, encontrar el acta de una sesión, la navegación principal, una oferta de empleo, un contacto, un evento del calendario. Las cifras globales — 74,6 % no llegaron, 25,4 % sí — abarcan los ocho objetivos, no uno solo. El objetivo de pago por sí solo: 19,0 % llegaron.',
    five: '5. El umbral de 40 pulsaciones de Tab es nuestro. Se justifica porque la mediana de un camino exitoso son tres pulsaciones, pero sigue siendo una elección nuestra y no un estándar. Comprobado con un análisis de sensibilidad: los umbrales de 40, 60 y 100 dan cifras IDÉNTICAS — nadie alcanza la meta más allá de cuarenta pulsaciones y el percentil 99 de los caminos exitosos es 35. Umbrales menores sí cambian el resultado: con 30 la proporción baja 0,6 puntos, con 20 baja 2,1 y con 10 baja 5,7. La cifra principal se mueve igual: 53,8 % con 40, 55,0 % con 30, 57,6 % con 20. Cuarenta es, por tanto, un margen y no una decisión de modelado.',
    six: '6. Los sitios inaccesibles para la revisión automática quedaban antes fuera de la muestra por completo. Son 787, entre ellos Nueva York al completo; 230 de esos municipios están obligados a cumplir el plazo del 26 de abril de 2027. Los estamos recorriendo aparte, en el mismo orden: de los grandes a los pequeños.',
    seven: '7. Parte de las páginas se revisó dos veces, y calculamos qué cambia eso. El recorrido avanza por rondas y una misma dirección vuelve a aparecer a veces: 348 registros de 95 524, el 0,4 % del historial. Recalculamos todas las proporciones dejando un solo registro, el más reciente, por cada par «dirección y tipo de página». La cifra principal no se movió en absoluto: 74,6 % antes y después; la proporción de los que llegaron, 25,4 % en ambos casos. Una diferencia de una centésima de punto, que mencionamos aquí para no tener que explicarla después.',
    eight: '8. Las observaciones no son independientes, y lo hemos medido. Las ocho tareas de un mismo sitio están relacionadas: un sitio mal construido suele fallar en las ocho. La correlación intraclase es 0,263 y el factor de inflación de la varianza 2,72 — ocho tareas no dan ocho observaciones independientes, sino unas tres. El tamaño efectivo de la muestra es 17 272 en lugar de 47 036 registros medibles. El intervalo de confianza de la cifra principal, corregido por esto: 52,7 % [51,7; 53,8]. Sin corregir sería [53,2; 54,4], casi la mitad de ancho, y sería falso. Aparte: contando por municipio en vez de por página — un voto por sitio — da 52,7 % frente a 53,8 %. Una diferencia de 1,1 puntos: la conclusión no depende de la unidad de conteo.',
  },

  открытость: 'Apertura',
  открытостьПункт: {
    raw: 'Los datos brutos se publican íntegros, incluidos los registros que no nos convienen',
    code: 'El código de revisión es abierto',
    shots: 'Se adjuntan las capturas del recorrido: una por cada página revisada',
    errors: 'Los errores de versiones anteriores se describen en la propia metodología y no se reescriben a posteriori',
  },

  проверилиСебя: 'También nos revisamos a nosotros mismos',
  проверилиСебяТекст: 'Una investigación sobre accesibilidad cuyos propios sitios no son accesibles no vale nada. El 27 de agosto de 2026 sometimos nuestros cuatro sitios al mismo procedimiento que los municipales: con teclado, en un navegador real, comprobando la visibilidad del foco en cada paso.',
  шапкаСайт: 'sitio',
  шапкаОбводка: 'contorno de foco',
  шапкаЭлементов: 'elementos',
  шапкаБезИмени: 'sin nombre',
  нашлиУСебя: 'Digamos aparte lo que encontramos en nosotros mismos. En nuestro código hay 83 apariciones de outline: none, precisamente la línea que provoca el 31 % de todas las interrupciones en nuestra propia investigación. Son inofensivas solo porque las anula una regla global :focus-visible. Esa es justamente la diferencia entre «está mal escrito» y «funciona mal», y la mostramos con nuestro propio ejemplo.',

  раскрытие: 'Declaración de conflicto de intereses',
  раскрытиеТекст: 'El autor presta servicios de corrección de infracciones de accesibilidad. La investigación está autofinanciada. Nadie pagó por ser incluido en la muestra ni por quedar fuera de ella.',

  какСослаться: 'Cómo citar',
  обратнаяСвязь: 'Comentarios',
  обратнаяСвязьТекст: 'Si encuentra un error en la metodología o en los datos, escríbanos: ',
  данныеСсылка: 'Los datos en sí — ',
};

const zh: ТекстыМетодики = {
  метка: '研究',
  заголовок: '方法说明：我们如何测量市政网站的无障碍程度',
  версия: (д) => `版本 1.1 · ${д} · Maksim Galatin & Claude (Anthropic) · 采用 CC BY 4.0 许可`,

  зачемМетодика: '为什么需要一份单独的方法说明',
  зачем1: '世界上并不缺少自动化的无障碍测量。axe-core 之类的扫描器就在做这件事：成本低、可复现，衡量的是页面标记。',
  зачем2: '但关于「用键盘尝试走完这条路时究竟会发生什么」的数据几乎没有。规则集检查的是标记，它并不试图抵达目标。我们需要的是一次真正在活页面上按 Tab、并观察焦点落在何处的遍历。',
  зачем3: '我们同时进行两种测量，并将二者相互比较。它们之间的差距正是这项工作的主要成果，而这个差距只有当两种检测走的是完全相同的样本时才能得出。',

  частьI: '第一部分：自动测量',
  чтоБерём: '样本如何选取',
  выборкаСША: '美国部分采用 CISA 机构维护的 .gov 官方域名登记册（cisagov/dotgov-data，CC0 许可，每日更新）。从中选取 City 与 County 类型的机构：51 个州与属地中的 11,659 条记录。',
  отличиеОтПодборки: '这与靠搜索拼凑出来的名单有重要区别。面对「这些城市是从哪里来的」这一提问，我们有一个一分钟即可核验的答案：整份官方登记册，而不是我们碰巧找到的那些。',
  выборкаЕвропа: '欧洲部分采用 OpenStreetMap 中的市政机构，依据 amenity=townhall、office=government 及相关标签。',
  ограничениеВыборкиЗаголовок: '样本的已知局限。',
  ограничениеВыборкиТекст: 'OpenStreetMap 由志愿者填写，各国的完整度并不相同。我们并不宣称覆盖了一个国家的全部市政当局；我们宣称的是，覆盖了所有在 OSM 中标注了网站的市政当局。这是两件不同的事，而后者可以核验。',

  какПроверяем: '如何检测',
  браузерНеЗапрос: '使用真实浏览器（通过 Puppeteer 驱动 Chromium），而不是 HTTP 请求。原因是：当今相当一部分网站由脚本装配而成，检查原始 HTML 测到的并不是人所看到的内容。',
  чтоДелаемНаСайте: '在每个网站上：打开页面并等待 domcontentloaded 事件；运行符合 WCAG 2.1 AA 的开放规则集 axe-core；记录每一条被触发的规则、出现次数与 DOM 选择器；寻找缴费页面并检查通往它的路径。',

  чтоСчитаем: '统计什么，如何统计',
  плотностьНарушений: '违规密度 = 被触发的规则数除以受检页面数。用密度而非绝对数量：大型网站页面更多，按违规总数比较等于因规模而受罚。',

  чегоНеДелаем: '我们不做什么——这一点很重要',
  неДелаемТекст: '我们不会根据单个页面给整个网站定性，不把警告计为违规，也不用主观评价替代测量。自动化部分只回答一个问题——某条规则是否被触发，除此之外一概不答。',

  частьII: '第二部分：键盘遍历',
  здесьНачинается: '从这里开始的，是任何自动化审计都不做的事。',
  задачаПроверяющего: '交给检测方的任务',
  задачаТекст: '仅用键盘走完一个想缴纳市政税费或罚款的人所走的路径。完全不碰鼠标。',

  ктоПроверяющий: '由谁执行检测',
  ктоПроверяющийГлавное: '遍历由真实 Chrome 浏览器中的软件代理执行，而不是坐在桌前的人。我们把这一点直说出来，因为下文所有数字该如何理解，取决于这个答案。',
  ктоПроверяющийКак: '代理操作真实页面的方式与没有鼠标的人相同：按 Tab，读取焦点移动到了哪里，并在无处可移之处停下。它不解析原始 HTML，也不凭标记下判断——它走的是带有全部脚本、同意横幅与弹窗的活页面。',
  чтоЭтоДаётЗаголовок: '这样做带来了什么。',
  чтоЭтоДаётТекст: ' 可复现性：同一次遍历可以重新运行并得到相同结果，而真人无法被安排去面对六万七千个页面，也无法在一个月后被要求重走同一条路径。还有规模：这种量级的测量根本无法靠人手完成——这正是此前不存在此类数据的原因。',
  чегоНеДаётЗаголовок: '这样做没有带来什么，我们予以承认。',
  чегоНеДаётТекст: ' 代理不能替代屏幕阅读器用户，也不衡量页面是否易于理解。它只回答一个问题——单靠键盘能否在物理上抵达目标。我们并不宣称进行过有视障参与者的测试：那件事我们没有做。',

  чтоЗаписывается: '每个网站记录哪些内容',
  шапкаПоле: '字段',
  шапкаЧтоОзначает: '含义',
  поле: {
    steps: '到缴费的步数',
    seconds: '到缴费的秒数',
    brokeAt: '在何处中断',
    reason: '原因',
    labels: '字段是否有标签',
    contrast: '对比度是否达标',
    screenshot: '截图',
    verdict: 'вердикт_человека',
    script: '扫描器的判断',
  },
  полеЗначение: {
    steps: '到缴费表单需按多少次 Tab',
    seconds: '这条路径花了多少时间',
    brokeAt: '路径在哪个元素上变得无法继续',
    reason: '究竟是什么造成了阻碍',
    labels: '表单字段是否与其说明文字相关联',
    contrast: '缴费按钮上的文字是否可辨认',
    screenshot: '中断处的画面',
    verdict: '遍历结果：通过、部分障碍、未通过。该字段名沿用历史命名，并在开放数据中保持一致',
    script: '自动检测对该网站给出的判断',
  },
  последнееПолеКлючевое: '最后一个字段最为关键：它使得对同一对象的两次测量得以相互比较。',

  чтоСчитаетсяБарьером: '什么算作障碍',
  барьер: {
    focus: '焦点不可见（outline: none）——无法判断自己身在何处',
    trap: '焦点陷阱——无法用键盘离开该元素',
    label: '字段没有标签——屏幕阅读器无法说明该输入什么',
    button: '不是按钮的按钮——带事件处理的 div 无法获得焦点',
    modal: '模态窗口无法用 Escape 键关闭',
  },

  выборОбеихГрупп: '遍历样本如何选取',
  выборОбеихГруппТекст: '两组都要检测：既包括自动检测判定为无障碍的网站，也包括被它判定不合格的网站。否则得到的将是单向测量，只显示对我们有利的那一类错误。',

  частьIII: '第三部分：比较得出了什么',
  главнаяВеличина: '本研究的核心量值，是机器与遍历之间的差距，并且要在两个方向上分别测量：',
  ложноеСпокойствие: '虚假的安心',
  ложноеСпокойствиеТекст: '——自动检测判定「无障碍」，而遍历走不通。',
  ложнаяТревога: '虚假的警报',
  ложнаяТревогаТекст: '——自动检测判定不合格，而遍历能够走通。',

  состояниеРаботы: (д) => `截至 ${д} 的工作进展`,
  шапкаПоказатель: '指标',
  шапкаЗначение: '数值',
  показатель: {
    records: '遍历记录数',
    municipalities: '已走完的市政当局',
    states: '州与属地',
    screenshots: '带已核实截图的记录',
    gap: '扫描器与遍历的差距',
  },

  ограничения: '我们承认的局限',
  ограничение: {
    one: '1. 美国普查已经结束——CISA 登记册全部走完，11,659 个网站中的 11,659 个。美国的数字已是最终结果；只有在纳入其他国家时才会变化，届时会明确说明。',
    two: '2. 并非每条记录都有截图。页面根本没有打开的地方，本就无图可截。',
    three: '3. 反机器人屏障不等于不可访问。屏障之后是什么我们并不知道，也不把它记为障碍。',
    four: '4. 遍历不能替代真实用户。它只回答一个问题：单靠键盘能否在物理上抵达目标。 八种页面类型各有自己的目标：查找公开文件、提交 311 请求、到达付款步骤、查找会议记录、抵达主导航、查找职位、查找联系方式、查找日历事件。整体数字（74.6 % 未抵达，25.4 % 抵达）涵盖全部八个目标，而非其中之一。仅付款目标的抵达率为 19.0 %。',
    five: '5. 四十次 Tab 的阈值是我们自己定的。其依据是成功路径的中位数为三次按键，但这终究是我们的选择，而非某项标准。 已做敏感性检验：阈值取 40、60 和 100 时数字完全相同——超过四十次按键无人抵达目标，成功路径的第 99 百分位为 35 次。更低的阈值确实会改变结果：取 30 时抵达比例下降 0.6 个百分点，取 20 下降 2.1，取 10 下降 5.7。核心数字同样变化：40 时为 53.8 %，30 时为 55.0 %，20 时为 57.6 %。因此四十是余量，而非实质性的建模选择。',
    six: '6. 自动检测无法访问的网站，此前会整体掉出样本。这类网站共 787 个，其中包括整个纽约州；其中 230 个市政当局须在 2027 年 4 月 26 日前达标。我们正按同样的顺序——由大到小——单独对它们进行遍历。',
    seven: '7. 部分页面被检测了两次，我们计算了这会带来什么变化。遍历按轮次推进，同一地址有时会再次进入：这类记录有 348 条，占 95,524 条日志的 0.4 %。我们对每个「地址加页面类型」的组合只保留最新的一条记录，重新计算了全部比例。核心数字完全没有变化：前后均为 74.6 %；抵达比例前后均为 25.4 %。相差百分之一个百分点，我们在此说明，以免日后需要解释。',
    eight: '8. 观测值并不相互独立，我们对此做了测量。同一站点的八项任务彼此关联：构建不佳的站点往往八项全部失败。组内相关系数为 0.263，方差膨胀因子为 2.72——因此八项任务提供的并非八个独立观测，而是约三个。有效样本量为 17 272，而非 47 036 条可测记录。核心数字经此校正后的置信区间为 52.7 % [51.7; 53.8]。未校正时为 [53.2; 54.4]，宽度几乎只有一半，而那将是不真实的。另外：若按市政当局而非按页面计数——每个站点一票——结果为 52.7 %，对比 53.8 %。相差 1.1 个百分点：结论不依赖于计数单位。',
  },

  открытость: '开放性',
  открытостьПункт: {
    raw: '原始数据完整发布，包括对我们不利的记录',
    code: '检测代码是开放的',
    shots: '附有遍历截图——每个受检页面各一张',
    errors: '早期版本中的错误直接写在方法说明里，而不是事后改写',
  },

  проверилиСебя: '我们也检测了自己',
  проверилиСебяТекст: '一项关于无障碍的研究，如果自己的网站都不可访问，那就一文不值。2026 年 8 月 27 日，我们用与市政网站完全相同的流程走了自己的全部四个网站：用键盘、在真实浏览器中，每一步都检查焦点是否可见。',
  шапкаСайт: '网站',
  шапкаОбводка: '焦点轮廓',
  шапкаЭлементов: '元素数',
  шапкаБезИмени: '无名称',
  нашлиУСебя: '我们也把在自己身上发现的问题单独说清楚。我们的代码中有 83 处 outline: none——正是这一行，在我们自己的研究里造成了全部中断的 31 %。它们之所以无害，只是因为被全局的 :focus-visible 规则覆盖了。这恰恰就是「写得不好」与「运行得不好」之间的区别，而我们用自己作了示范。',

  раскрытие: '利益冲突披露',
  раскрытиеТекст: '作者提供修复无障碍缺陷的服务。本研究为自筹经费。没有人付费以进入样本，也没有人付费以被排除在外。',

  какСослаться: '如何引用',
  обратнаяСвязь: '反馈',
  обратнаяСвязьТекст: '如在方法或数据中发现错误，请来信：',
  данныеСсылка: '数据本身 — ',
};

export const ТЕКСТЫ: Record<ЯзыкКод, ТекстыМетодики> = { ru, en, es, zh };
