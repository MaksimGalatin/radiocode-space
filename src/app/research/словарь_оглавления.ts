/**
 * ОГЛАВЛЕНИЕ РАЗДЕЛА ИССЛЕДОВАНИЙ — ТЕКСТЫ НА ЧЕТЫРЁХ ЯЗЫКАХ.
 *
 * ПОВОД, 02.09.2026. Замер живыми запросами показал: три страницы раздела
 * открываются на всех четырёх языках (12 адресов из 12), а сам `/research`
 * отдаёт 404 — и тоже на всех четырёх. Причина найдена в дереве файлов:
 * подпапки `data`, `methodology`, `registry` есть, а `page.tsx` в корне
 * раздела нет.
 *
 * Чем это плохо. Человек, пришедший по ссылке на один материал, не может
 * перейти к двум другим: страницы связаны только через карту сайта, а её
 * читатель не открывает. Раздел существует для поисковика и не существует
 * для человека.
 *
 * ЧИСЛА СЮДА НЕ КОПИРУЮТСЯ. Они берутся из `data/данные.ts`, где лежат в
 * одном экземпляре, и приводятся к записи языка через `числа_на_языке`.
 * Копия числа на четырёх языках расходится при первом же новом замере —
 * это уже случалось на соседних страницах.
 *
 * РАЗДЕЛ 20 КОНСТИТУЦИИ. На страницах `/research/*` нет токена, тарифов,
 * распределения средств и призывов купить. Есть методология, данные,
 * ограничения, подпись автора, раскрытый конфликт интересов и РОВНО ОДНА
 * нейтральная ссылка на услуги — в самом конце.
 */

export type ЯзыкКод = 'ru' | 'en' | 'es' | 'zh';

export type ТекстыОглавления = {
  метка: string;
  заголовок: string;
  подзаголовок: (записей: string, доменов: string) => string;

  разделы: Array<{ путь: string; имя: string; описание: string }>;

  ограниченияЗаголовок: string;
  ограничения: string[];

  авторЗаголовок: string;
  автор: string;
  конфликт: string;

  обновлено: (дата: string) => string;
  заверениеЗаголовок: string;
  заверениеВступление: string;
  заверение: Array<{ цепь: string; что: string; ссылка: string }>;

  услуги: string;
};

const ru: ТекстыОглавления = {
  заверениеЗаголовок: 'Как проверить, что числа не подогнаны',
  заверениеВступление:
    'Сайт можно переделать за ночь, и доказательство нарушения исчезнет вместе с ним. Поэтому исходные файлы исследования закреплены в трёх независимых цепях: подделать дату задним числом нельзя, не переписав публичный реестр. Проверяется без нас и без нашего разрешения.',
  заверение: [
    { цепь: 'Bitcoin', что: 'Хеш подписанного набора документов закреплён в блоке 967198, подтверждён двумя независимыми календарями OpenTimestamps.', ссылка: 'https://blockstream.info/block/00000000000000000001954ce22e83a295e8f7fdfa901bd1f491d0b00541145d' },
    { цепь: 'Solana', что: 'Тот же хеш записан в основной сети через программу Memo — вместе с адресом файла в Arweave и номером биткоин-блока.', ссылка: 'https://solscan.io/tx/4wStrLPmaFg6AG7wRZ1umGxCg1v24AVL6UU7koTWt3eaXZrLC5zmsgss991hZHK2PcgSapn3cVsf3p3NQ6jYDc6h' },
    { цепь: 'Arweave', что: 'Сами файлы лежат в открытом виде, без шифрования: скачайте, посчитайте SHA-256 и сверьте с хешем в цепи.', ссылка: 'https://arweave.net/xy86od9R-TgBFpaXdvPJMQG_zndUtqmIkDKjBxv-WPI' },
  ],

  метка: 'Открытое исследование',
  заголовок: 'Доступность муниципальных сайтов США',
  подзаголовок: (записей, доменов) =>
    `Программный агент проходил сайты клавиатурой в настоящем браузере: ` +
    `${записей} записей по ${доменов} муниципалитетам в 51 штате и ` +
    `территории. Пройден весь реестр .gov агентства CISA. Данные, код и ` +
    `метод открыты — любой замер здесь можно повторить.`,
  разделы: [
    {
      путь: 'data',
      имя: 'Данные',
      описание:
        'Что получилось: доли страниц с барьером, сравнение платформ, ' +
        'разбивка по штатам и типам страниц, доказательные скриншоты.',
    },
    {
      путь: 'methodology',
      имя: 'Методика',
      описание:
        'Как измеряли: что делает агент, что он может и чего не может, ' +
        'почему автоматическая проверка и обход клавиатурой расходятся.',
    },
    {
      путь: 'registry',
      имя: 'Реестр',
      описание:
        'Из чего составлена выборка: источник списка доменов, правила ' +
        'отбора, что исключено и по какой причине.',
    },
    {
      путь: 'commercial',
      имя: 'Коммерческие сайты',
      описание:
        'Другой прибор и другая выборка: автоматическая проверка axe-core ' +
        'по коммерческим сайтам США. Числа этого набора и клавиатурного ' +
        'обхода не складываются — почему, сказано на самой странице.',
    },
  ],
  ограниченияЗаголовок: 'Чего это исследование не говорит',
  ограничения: [
    'Барьер, найденный агентом, не равен барьеру для конкретного человека: ' +
      'люди пользуются разными вспомогательными технологиями.',
    'Проверены восемь типов страниц на сайт, а не весь сайт целиком.',
    'Отсутствие найденного нарушения не означает соответствия WCAG или ADA.',
  ],
  авторЗаголовок: 'Автор и конфликт интересов',
  автор: 'Максим Валентинович Галатин.',
  конфликт:
    'Автор оказывает услуги в области доступности. Исследование ' +
    'самофинансировано: за включение в выборку никто не платил и ' +
    'исключить себя из неё не мог.',
  обновлено: (дата) => `Данные на ${дата}.`,
  услуги: 'Услуги по доступности',
};

const en: ТекстыОглавления = {
  заверениеЗаголовок: 'How to check that the numbers were not fitted afterwards',
  заверениеВступление:
    'A site can be redesigned overnight, and the proof of a failure disappears with it. That is why the source files of this study are anchored in three independent chains: backdating them would require rewriting a public ledger. Verifiable without us and without our permission.',
  заверение: [
    { цепь: 'Bitcoin', что: 'The hash of the signed document set is fixed in block 967198, confirmed by two independent OpenTimestamps calendars.', ссылка: 'https://blockstream.info/block/00000000000000000001954ce22e83a295e8f7fdfa901bd1f491d0b00541145d' },
    { цепь: 'Solana', что: 'The same hash is written on mainnet through the Memo program, together with the Arweave address and the Bitcoin block height.', ссылка: 'https://solscan.io/tx/4wStrLPmaFg6AG7wRZ1umGxCg1v24AVL6UU7koTWt3eaXZrLC5zmsgss991hZHK2PcgSapn3cVsf3p3NQ6jYDc6h' },
    { цепь: 'Arweave', что: 'The files themselves are stored unencrypted: download them, compute SHA-256 and compare it with the hash on chain.', ссылка: 'https://arweave.net/xy86od9R-TgBFpaXdvPJMQG_zndUtqmIkDKjBxv-WPI' },
  ],

  метка: 'Open research',
  заголовок: 'Accessibility of U.S. municipal websites',
  подзаголовок: (записей, доменов) =>
    `A software agent walked the sites by keyboard in a real browser: ` +
    `${записей} records across ${доменов} municipalities in 51 states and ` +
    `territories. The full CISA .gov registry was covered. Data, code and ` +
    `method are open — every figure here can be reproduced.`,
  разделы: [
    {
      путь: 'data',
      имя: 'Data',
      описание:
        'What we found: share of pages with a barrier, platform comparison, ' +
        'breakdown by state and page type, evidence screenshots.',
    },
    {
      путь: 'methodology',
      имя: 'Methodology',
      описание:
        'How it was measured: what the agent does, what it can and cannot ' +
        'detect, and why automated checks and keyboard walks disagree.',
    },
    {
      путь: 'registry',
      имя: 'Registry',
      описание:
        'How the sample was built: the source of the domain list, selection ' +
        'rules, what was excluded and why.',
    },
    {
      путь: 'commercial',
      имя: 'Commercial sites',
      описание:
        'A different instrument and a different sample: an axe-core check ' +
        'of US commercial websites. Its numbers and the keyboard traversal ' +
        'do not add up — the page explains why.',
    },
  ],
  ограниченияЗаголовок: 'What this research does not claim',
  ограничения: [
    'A barrier found by the agent is not the same as a barrier for a given ' +
      'person: people use different assistive technologies.',
    'Eight page types per site were checked, not the entire site.',
    'The absence of a detected failure does not mean WCAG or ADA compliance.',
  ],
  авторЗаголовок: 'Author and conflict of interest',
  автор: 'Maksim Valentinovich Galatin.',
  конфликт:
    'The author provides accessibility services. The research is ' +
    'self-funded: nobody paid to be included in the sample, and nobody ' +
    'could opt out of it.',
  обновлено: (дата) => `Data as of ${дата}.`,
  услуги: 'Accessibility services',
};

const es: ТекстыОглавления = {
  заверениеЗаголовок: 'Cómo comprobar que las cifras no se ajustaron después',
  заверениеВступление:
    'Un sitio puede rehacerse en una noche, y la prueba del incumplimiento desaparece con él. Por eso los archivos originales de este estudio están anclados en tres cadenas independientes: falsificar la fecha exigiría reescribir un registro público. Se verifica sin nosotros y sin nuestro permiso.',
  заверение: [
    { цепь: 'Bitcoin', что: 'El hash del conjunto de documentos firmados está fijado en el bloque 967198, confirmado por dos calendarios OpenTimestamps independientes.', ссылка: 'https://blockstream.info/block/00000000000000000001954ce22e83a295e8f7fdfa901bd1f491d0b00541145d' },
    { цепь: 'Solana', что: 'El mismo hash está escrito en la red principal mediante el programa Memo, junto con la dirección en Arweave y la altura del bloque de Bitcoin.', ссылка: 'https://solscan.io/tx/4wStrLPmaFg6AG7wRZ1umGxCg1v24AVL6UU7koTWt3eaXZrLC5zmsgss991hZHK2PcgSapn3cVsf3p3NQ6jYDc6h' },
    { цепь: 'Arweave', что: 'Los archivos están almacenados sin cifrar: descárguelos, calcule el SHA-256 y compárelo con el hash en la cadena.', ссылка: 'https://arweave.net/xy86od9R-TgBFpaXdvPJMQG_zndUtqmIkDKjBxv-WPI' },
  ],

  метка: 'Investigación abierta',
  заголовок: 'Accesibilidad de los sitios municipales de EE. UU.',
  подзаголовок: (записей, доменов) =>
    `Un agente de software recorrió los sitios con el teclado en un ` +
    `navegador real: ${записей} registros en ${доменов} municipios de 51 ` +
    `estados y territorios. Se cubrió todo el registro .gov de CISA. Los ` +
    `datos, el código y el método son abiertos: cada cifra puede repetirse.`,
  разделы: [
    {
      путь: 'data',
      имя: 'Datos',
      описание:
        'Lo encontrado: proporción de páginas con barrera, comparación de ' +
        'plataformas, desglose por estado y tipo de página, capturas como ' +
        'evidencia.',
    },
    {
      путь: 'methodology',
      имя: 'Metodología',
      описание:
        'Cómo se midió: qué hace el agente, qué puede y qué no puede ' +
        'detectar, y por qué la revisión automática y el recorrido con ' +
        'teclado no coinciden.',
    },
    {
      путь: 'registry',
      имя: 'Registro',
      описание:
        'Cómo se formó la muestra: origen de la lista de dominios, reglas ' +
        'de selección, qué se excluyó y por qué.',
    },
    {
      путь: 'commercial',
      имя: 'Sitios comerciales',
      описание:
        'Otro instrumento y otra muestra: comprobación con axe-core de ' +
        'sitios comerciales de EE. UU. Sus cifras y las del recorrido de ' +
        'teclado no se suman; la página explica por qué.',
    },
  ],
  ограниченияЗаголовок: 'Lo que esta investigación no afirma',
  ограничения: [
    'Una barrera detectada por el agente no equivale a una barrera para una ' +
      'persona concreta: cada quien usa tecnologías de apoyo distintas.',
    'Se revisaron ocho tipos de página por sitio, no el sitio completo.',
    'La ausencia de un fallo detectado no significa cumplimiento de WCAG ni ' +
      'de la ADA.',
  ],
  авторЗаголовок: 'Autor y conflicto de intereses',
  автор: 'Maksim Valentinovich Galatin.',
  конфликт:
    'El autor presta servicios de accesibilidad. La investigación es ' +
    'autofinanciada: nadie pagó por ser incluido en la muestra y nadie ' +
    'pudo excluirse de ella.',
  обновлено: (дата) => `Datos al ${дата}.`,
  услуги: 'Servicios de accesibilidad',
};

const zh: ТекстыОглавления = {
  заверениеЗаголовок: '如何核验这些数字不是事后凑出来的',
  заверениеВступление:
    '一个网站可以在一夜之间改版，违规的证据也随之消失。因此本研究的原始文件被锚定在三条互相独立的链上：要伪造日期，就必须改写一个公开账本。核验无需我们参与，也无需我们许可。',
  заверение: [
    { цепь: 'Bitcoin', что: '已签署文件集的哈希固定在第 967198 号区块中，由两个互相独立的 OpenTimestamps 日历确认。', ссылка: 'https://blockstream.info/block/00000000000000000001954ce22e83a295e8f7fdfa901bd1f491d0b00541145d' },
    { цепь: 'Solana', что: '同一个哈希通过 Memo 程序写入主网，同时附带 Arweave 地址与比特币区块高度。', ссылка: 'https://solscan.io/tx/4wStrLPmaFg6AG7wRZ1umGxCg1v24AVL6UU7koTWt3eaXZrLC5zmsgss991hZHK2PcgSapn3cVsf3p3NQ6jYDc6h' },
    { цепь: 'Arweave', что: '文件本身未加密存放：下载后计算 SHA-256，与链上的哈希对照即可。', ссылка: 'https://arweave.net/xy86od9R-TgBFpaXdvPJMQG_zndUtqmIkDKjBxv-WPI' },
  ],

  метка: '公开研究',
  заголовок: '美国市政网站的无障碍状况',
  подзаголовок: (записей, доменов) =>
    `软件代理在真实浏览器中用键盘遍历网站：覆盖 51 个州与地区的 ${доменов} ` +
    `个市政单位，共 ${записей} 条记录，完整走完 CISA 的 .gov 域名清单。` +
    `数据、代码与方法全部公开，这里的每一个数字都可以复现。`,
  разделы: [
    {
      путь: 'data',
      имя: '数据',
      описание:
        '测得的结果：存在障碍的页面比例、平台之间的对比、按州与页面类型的' +
        '拆分，以及作为证据的截图。',
    },
    {
      путь: 'methodology',
      имя: '方法',
      описание:
        '如何测量：代理做了什么、能发现什么、不能发现什么，以及自动检查与' +
        '键盘遍历为何会出现分歧。',
    },
    {
      путь: 'registry',
      имя: '样本清单',
      описание:
        '样本如何构成：域名清单的来源、筛选规则、剔除了什么以及为什么。',
    },
    {
      путь: 'commercial',
      имя: '商业网站',
      описание:
        '不同的仪器与不同的样本：使用 axe-core 对美国商业网站的自动检测。' +
        '本数据集与键盘遍历的数字不可相加——页面上说明了原因。',
    },
  ],
  ограниченияЗаголовок: '本研究没有断言什么',
  ограничения: [
    '代理发现的障碍，不等于某个具体的人遇到的障碍：每个人使用的辅助技术并' +
      '不相同。',
    '每个网站检查了八类页面，而不是整个网站。',
    '没有检出问题，并不代表符合 WCAG 或 ADA。',
  ],
  авторЗаголовок: '作者与利益冲突',
  автор: 'Maksim Valentinovich Galatin。',
  конфликт:
    '作者提供无障碍相关服务。本研究由作者自费完成：没有人付费进入样本，也' +
    '没有人能够要求退出样本。',
  обновлено: (дата) => `数据截至 ${дата}。`,
  услуги: '无障碍服务',
};

export const ТЕКСТЫ: Record<ЯзыкКод, ТекстыОглавления> = { ru, en, es, zh };
