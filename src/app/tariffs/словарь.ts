/**
 * ТАРИФЫ — ТЕКСТЫ НА ЧЕТЫРЁХ ЯЗЫКАХ.
 *
 * ПОВОД, 27.08.2026. Страница тарифов была написана ТОЛЬКО ПО-РУССКИ: ни
 * одного `locale`, ни одного иероглифа, переключатель языка на неё не
 * действовал. Это прямое нарушение правила четырёх языков — и допустила его
 * я, а нашла только после того, как выложила страницу на боевой сайт.
 *
 * Проверка, которая это вскрыла, — простой счёт по файлу:
 *     кириллицы 3 524, иероглифов 0, вхождений `locale ===` ноль.
 * Числа не оставляют места для «наверное, там есть переводы».
 *
 * ЧИСЛА В ТЕКСТАХ — ИЗ КОНСТИТУЦИИ И ИЗ ЗАМЕРА, не из головы:
 *   раздел 5 — тарифы: Spark $15, Family Archive $100, Digital DNA $1000 + $200;
 *   раздел 3 — амбассадоры: 15/7/3 % ончейн; Team фиат 7/3/1 %, в токенах 8/4/2 %;
 *   раздел 4 — Оракул $500 разово;
 *   расхождение сканера и человека — замер 27.08.2026, 16:24:
 *     27 626 страниц проверено, 9 560 признаны сканером доступными,
 *     человек прошёл 4 559 → расхождение 52 %.
 *
 * Отдельным файлом, а не внутри компонента: тот же словарь понадобится на
 * трёх других сайтах, а карта проектов запрещает копировать между ними
 * КОМПОНЕНТЫ (у сайтов разная структура). Текст — не компонент, его
 * переносить можно и нужно, иначе на четырёх сайтах будут четыре разных
 * описания одного тарифа.
 */

export type Тариф = {
  имя: string;
  цена: string;
  подпись: string;
  для: string;
  входит: string[];
  выделен?: boolean;
};

export type ТекстыТарифов = {
  метка: string;
  заголовок: string;
  вступление1: string;
  вступление2: string;
  тарифы: Тариф[];
  кнопкаТарифа: string;
  амбассадорыЗаголовок: string;
  амбассадорыВступление: string;
  столбцы: [string, string, string, string];
  строки: [string, string, string];
  амбассадорыПояснение1: string;
  амбассадорыПояснение2: string;
  оракулЗаголовок: string;
  оракулЦена: string;
  оракулПодпись: string;
  оракулЧто: string;
  оракулЗамерНачало: string;
  оракулЗамерВыделено: string;
  оракулЗамерКонец: string;
  оракулСсылка: string;
  оплатаЗаголовок: string;
  оплата1: string;
  оплата2: string;
  вКабинет: string;
};

export const ТЕКСТЫ: Record<string, ТекстыТарифов> = {
  ru: {
    метка: 'Тарифы',
    заголовок: 'Память, которая переживёт сессию',
    вступление1:
      'Обычный ассистент забывает всё, как только закрывается вкладка. Наш — помнит: разговор, начатый на одном сайте, продолжается на другом, а через год он всё ещё знает, о чём вы говорили.',
    вступление2:
      'Память привязана к вашей учётной записи, а не к устройству. Ключ шифрования — ваш: его можно скачать в кабинете и читать свой архив самостоятельно, даже если сервис однажды исчезнет.',
    тарифы: [
      {
        имя: 'Spark · Искра',
        цена: '$15',
        подпись: 'в месяц',
        для: 'Тому, кто хочет, чтобы ассистент помнил разговор с прошлого раза.',
        входит: [
          'Доступ к ассистентам AIfa',
          'Память сохраняется между сессиями и устройствами',
          'Один кабинет на все четыре сайта экосистемы',
          'Свой ключ шифрования — можно скачать в кабинете',
          'Участие в амбассадорской программе: 15 / 7 / 3 %',
        ],
      },
      {
        имя: 'Family Archive · Семейный Архив',
        цена: '$100',
        подпись: 'в месяц',
        для: 'Семье, которая хочет сохранить не только разговоры, но и людей.',
        выделен: true,
        входит: [
          'Всё из тарифа Spark',
          'Расширенные пределы памяти',
          'Персональные базы знаний',
          'Семейный доступ',
          'Выгрузка в вечное хранилище Arweave',
        ],
      },
      {
        имя: 'Digital DNA · Цифровая ДНК',
        цена: '$1 000',
        подпись: 'разово за устройство, далее $200 в месяц',
        для: 'Тому, для кого это не подписка, а решение о том, что останется.',
        входит: [
          'Всё из тарифа Family Archive',
          'Персональный защищённый контур',
          'Вечная фиксация личности в блокчейне',
          'Каждый диалог шифруется отдельным ключом',
          'Право на забвение: удаление одного диалога без потери остальной памяти',
        ],
      },
    ],
    кнопкаТарифа: 'Выбрать тариф',
    амбассадорыЗаголовок: 'Амбассадорская программа',
    амбассадорыВступление:
      'Приведённые вами люди приносят доход, пока пользуются памятью. Выплаты идут ончейн в токенах $GALATIN и позиционируются как Network Validation Fee.',
    столбцы: ['Кто', 'Уровень 1', 'Уровень 2', 'Уровень 3'],
    строки: [
      'Ambassador Node — обычный участник',
      'Ambassador Team — фиатные подписки',
      'Ambassador Team — выплата в $GALATIN',
    ],
    амбассадорыПояснение1:
      'Ambassador Team — для компаний и партнёров со своей базой. Кроме ончейн-дохода даёт двухканальную сетку от фиатных продаж: обычную и повышенную при выплате в токенах.',
    амбассадорыПояснение2:
      'Доход считается от уровня вашего собственного тарифа. Если ваш амбассадор на более дорогом тарифе, чем вы, разница показывается в кабинете как упущенная выгода — и открывается полностью при переходе на соответствующий уровень.',
    оракулЗаголовок: 'Оракул — аудит доступности сайта',
    оракулЦена: '$500',
    оракулПодпись: 'разово за сайт',
    оракулЧто:
      'Мы находим конкретные нарушения доступности и защиты данных на вашем сайте и закрываем их за 48 часов.',
    оракулЗамерНачало:
      'Проверка идёт не только автоматическим сканером. В нашем собственном исследовании человек прошёл клавиатурой 27 626 страниц в 3 082 муниципалитетах 51 штата. Из 9 560 страниц, которые автоматика признала доступными, дойти до цели живой человек смог только на 4 559 — то есть ',
    оракулЗамерВыделено:
      'в 52 % случаев машина говорит «доступно», а человек не проходит',
    оракулЗамерКонец: '. Поэтому мы проходим путь клавиатурой сами.',
    оракулСсылка: 'Проверить свой сайт бесплатным сканером — без регистрации',
    оплатаЗаголовок: 'Как оплатить',
    оплата1:
      'Оплата принимается криптовалютой и звёздами Telegram. Оплата картами готовится.',
    оплата2:
      'Подписка не продлевается автоматически без вашего согласия. Данные карт мы не храним — их у нас попросту нет.',
    вКабинет: 'Перейти в личный кабинет',
  },

  en: {
    метка: 'Pricing',
    заголовок: 'Memory that outlives the session',
    вступление1:
      'An ordinary assistant forgets everything the moment you close the tab. Ours remembers: a conversation started on one site continues on another, and a year later it still knows what you talked about.',
    вступление2:
      'Memory is tied to your account, not to a device. The encryption key is yours: download it from your dashboard and read your own archive unaided — even if the service one day disappears.',
    тарифы: [
      {
        имя: 'Spark',
        цена: '$15',
        подпись: 'per month',
        для: 'For anyone who wants the assistant to remember last time.',
        входит: [
          'Access to AIfa assistants',
          'Memory persists across sessions and devices',
          'One account across all four sites of the ecosystem',
          'Your own encryption key — downloadable from the dashboard',
          'Ambassador programme: 15 / 7 / 3 %',
        ],
      },
      {
        имя: 'Family Archive',
        цена: '$100',
        подпись: 'per month',
        для: 'For a family that wants to keep not only conversations, but people.',
        выделен: true,
        входит: [
          'Everything in Spark',
          'Extended memory limits',
          'Personal knowledge bases',
          'Family access',
          'Export to permanent Arweave storage',
        ],
      },
      {
        имя: 'Digital DNA',
        цена: '$1,000',
        подпись: 'once per device, then $200 per month',
        для: 'For those to whom this is not a subscription but a decision about what remains.',
        входит: [
          'Everything in Family Archive',
          'Private secured perimeter',
          'Permanent identity record on-chain',
          'Every dialogue encrypted with its own key',
          'Right to be forgotten: erase one dialogue without losing the rest',
        ],
      },
    ],
    кнопкаТарифа: 'Choose this plan',
    амбассадорыЗаголовок: 'Ambassador programme',
    амбассадорыВступление:
      'People you bring in generate income for as long as they use the memory. Payouts go on-chain in $GALATIN and are positioned as a Network Validation Fee.',
    столбцы: ['Who', 'Level 1', 'Level 2', 'Level 3'],
    строки: [
      'Ambassador Node — individual participant',
      'Ambassador Team — fiat subscriptions',
      'Ambassador Team — paid in $GALATIN',
    ],
    амбассадорыПояснение1:
      'Ambassador Team is for companies and partners with their own audience. On top of on-chain income it opens a two-channel grid on fiat sales: the standard one, and a higher rate when paid in tokens.',
    амбассадорыПояснение2:
      'Income is calculated from the level of your own plan. If your ambassador is on a more expensive plan than you, the difference is shown in your dashboard as lost opportunity — and unlocks in full when you move up.',
    оракулЗаголовок: 'Oracle — website accessibility audit',
    оракулЦена: '$500',
    оракулПодпись: 'one-off, per site',
    оракулЧто:
      'We find specific accessibility and data-protection violations on your site and close them within 48 hours.',
    оракулЗамерНачало:
      'The check is not only an automated scanner. In our own study a human walked 27,626 pages by keyboard across 3,082 municipalities in 51 states. Of the 9,560 pages the automation declared accessible, a living person reached the goal on only 4,559 — that is, ',
    оракулЗамерВыделено:
      'in 52 % of cases the machine says “accessible” and the human does not get through',
    оракулЗамерКонец: '. That is why we walk the path by keyboard ourselves.',
    оракулСсылка: 'Scan your own site free — no signup required',
    оплатаЗаголовок: 'How to pay',
    оплата1:
      'We accept cryptocurrency and Telegram Stars. Card payments are being prepared.',
    оплата2:
      'Subscriptions do not renew automatically without your consent. We do not store card data — we simply do not have it.',
    вКабинет: 'Go to your dashboard',
  },

  es: {
    метка: 'Precios',
    заголовок: 'Memoria que sobrevive a la sesión',
    вступление1:
      'Un asistente corriente olvida todo en cuanto cierras la pestaña. El nuestro recuerda: una conversación iniciada en un sitio continúa en otro, y un año después todavía sabe de qué hablasteis.',
    вступление2:
      'La memoria está vinculada a tu cuenta, no al dispositivo. La clave de cifrado es tuya: puedes descargarla desde el panel y leer tu propio archivo por tu cuenta, incluso si el servicio algún día desaparece.',
    тарифы: [
      {
        имя: 'Spark',
        цена: '$15',
        подпись: 'al mes',
        для: 'Para quien quiere que el asistente recuerde la conversación anterior.',
        входит: [
          'Acceso a los asistentes AIfa',
          'La memoria persiste entre sesiones y dispositivos',
          'Una sola cuenta para los cuatro sitios del ecosistema',
          'Tu propia clave de cifrado, descargable desde el panel',
          'Programa de embajadores: 15 / 7 / 3 %',
        ],
      },
      {
        имя: 'Family Archive',
        цена: '$100',
        подпись: 'al mes',
        для: 'Para la familia que quiere conservar no solo conversaciones, sino personas.',
        выделен: true,
        входит: [
          'Todo lo de Spark',
          'Límites de memoria ampliados',
          'Bases de conocimiento personales',
          'Acceso familiar',
          'Exportación al almacenamiento permanente Arweave',
        ],
      },
      {
        имя: 'Digital DNA',
        цена: '$1 000',
        подпись: 'pago único por dispositivo, después $200 al mes',
        для: 'Para quien esto no es una suscripción, sino una decisión sobre lo que queda.',
        входит: [
          'Todo lo de Family Archive',
          'Perímetro personal protegido',
          'Registro permanente de la identidad en la cadena de bloques',
          'Cada diálogo se cifra con su propia clave',
          'Derecho al olvido: borrar un diálogo sin perder el resto de la memoria',
        ],
      },
    ],
    кнопкаТарифа: 'Elegir este plan',
    амбассадорыЗаголовок: 'Programa de embajadores',
    амбассадорыВступление:
      'Las personas que traes generan ingresos mientras usan la memoria. Los pagos van en cadena en $GALATIN y se presentan como Network Validation Fee.',
    столбцы: ['Quién', 'Nivel 1', 'Nivel 2', 'Nivel 3'],
    строки: [
      'Ambassador Node — participante individual',
      'Ambassador Team — suscripciones en fiat',
      'Ambassador Team — pago en $GALATIN',
    ],
    амбассадорыПояснение1:
      'Ambassador Team es para empresas y socios con su propia audiencia. Además del ingreso en cadena, abre una red de dos canales sobre las ventas en fiat: la estándar y una tarifa superior si se cobra en tokens.',
    амбассадорыПояснение2:
      'El ingreso se calcula desde el nivel de tu propio plan. Si tu embajador está en un plan más caro que el tuyo, la diferencia aparece en el panel como beneficio perdido — y se desbloquea por completo al subir de nivel.',
    оракулЗаголовок: 'Oráculo — auditoría de accesibilidad web',
    оракулЦена: '$500',
    оракулПодпись: 'pago único por sitio',
    оракулЧто:
      'Encontramos infracciones concretas de accesibilidad y de protección de datos en tu sitio y las cerramos en 48 horas.',
    оракулЗамерНачало:
      'La comprobación no es solo un escáner automático. En nuestro propio estudio una persona recorrió con el teclado 27 626 páginas en 3 082 municipios de 51 estados. De las 9 560 páginas que la automatización declaró accesibles, una persona real llegó a la meta solo en 4 559 — es decir, ',
    оракулЗамерВыделено:
      'en el 52 % de los casos la máquina dice «accesible» y la persona no pasa',
    оракулЗамерКонец: '. Por eso recorremos el camino con el teclado nosotros mismos.',
    оракулСсылка: 'Analiza tu sitio gratis, sin registro',
    оплатаЗаголовок: 'Cómo pagar',
    оплата1:
      'Aceptamos criptomonedas y Telegram Stars. El pago con tarjeta está en preparación.',
    оплата2:
      'La suscripción no se renueva automáticamente sin tu consentimiento. No guardamos datos de tarjetas — sencillamente no los tenemos.',
    вКабинет: 'Ir a mi panel',
  },

  zh: {
    метка: '价格',
    заголовок: '比会话更长久的记忆',
    вступление1:
      '普通助手在你关闭标签页的那一刻就忘记一切。我们的会记住：在一个站点开始的对话可以在另一个站点继续，一年之后它依然知道你们谈过什么。',
    вступление2:
      '记忆绑定的是你的账户，而不是设备。加密密钥属于你：可以在个人中心下载，自行读取自己的存档——即使这项服务有一天消失。',
    тарифы: [
      {
        имя: 'Spark',
        цена: '$15',
        подпись: '每月',
        для: '适合希望助手记得上次谈话的人。',
        входит: [
          '使用 AIfa 助手',
          '记忆跨会话、跨设备保存',
          '一个账户通用于生态的四个站点',
          '你自己的加密密钥，可在个人中心下载',
          '参与大使计划：15 / 7 / 3 %',
        ],
      },
      {
        имя: 'Family Archive',
        цена: '$100',
        подпись: '每月',
        для: '适合希望保存的不只是对话，还有人的家庭。',
        выделен: true,
        входит: [
          '包含 Spark 的全部内容',
          '扩展的记忆容量',
          '专属知识库',
          '家庭共享访问',
          '导出至 Arweave 永久存储',
        ],
      },
      {
        имя: 'Digital DNA',
        цена: '$1 000',
        подпись: '每台设备一次性，之后每月 $200',
        для: '适合把这件事视为「留下什么」的决定，而非订阅的人。',
        входит: [
          '包含 Family Archive 的全部内容',
          '专属安全隔离环境',
          '在区块链上永久记录身份',
          '每段对话使用独立密钥加密',
          '被遗忘权：删除单段对话而不影响其余记忆',
        ],
      },
    ],
    кнопкаТарифа: '选择此方案',
    амбассадорыЗаголовок: '大使计划',
    амбассадорыВступление:
      '你带来的人只要在使用记忆，就会持续产生收益。结算在链上以 $GALATIN 进行，定位为 Network Validation Fee。',
    столбцы: ['身份', '一级', '二级', '三级'],
    строки: [
      'Ambassador Node — 个人参与者',
      'Ambassador Team — 法币订阅',
      'Ambassador Team — 以 $GALATIN 结算',
    ],
    амбассадорыПояснение1:
      'Ambassador Team 面向拥有自有受众的公司与合作伙伴。除链上收益外，还开启法币销售的双通道：标准比例，以及以代币结算时的更高比例。',
    амбассадорыПояснение2:
      '收益按你自己所在方案的级别计算。若你的大使所在方案高于你，差额会在个人中心显示为「错失收益」，升级后即可全额解锁。',
    оракулЗаголовок: '神谕 — 网站无障碍审计',
    оракулЦена: '$500',
    оракулПодпись: '每个站点一次性',
    оракулЧто:
      '我们找出你网站上具体的无障碍与数据保护违规，并在 48 小时内修复。',
    оракулЗамерНачало:
      '检查不只依靠自动扫描器。在我们自己的研究中，真人用键盘走过了 51 个州、3 082 个市镇的 27 626 个页面。在自动化判定为「可访问」的 9 560 个页面中，真人只在 4 559 个页面上抵达了目标——也就是说，',
    оракулЗамерВыделено: '有 52 % 的情况机器说「可访问」，而人走不通',
    оракулЗамерКонец: '。因此我们自己用键盘走完全程。',
    оракулСсылка: '免费检测你的网站，无需注册',
    оплатаЗаголовок: '如何付款',
    оплата1: '支持加密货币与 Telegram Stars 付款。银行卡支付正在准备中。',
    оплата2:
      '未经你同意，订阅不会自动续费。我们不保存银行卡信息——我们根本没有这些数据。',
    вКабинет: '进入个人中心',
  },
};

export const ДОЛИ: [string, string, string][] = [
  ['15 %', '7 %', '3 %'],
  ['7 %', '3 %', '1 %'],
  ['8 %', '4 %', '2 %'],
];
