import type { Metadata } from 'next';
import { headers } from 'next/headers';

/**
 * ЗАГОЛОВОК ВКЛАДКИ И ОПИСАНИЕ СТРАНИЦЫ НА ЯЗЫКЕ ПОСЕТИТЕЛЯ. Создано 30.09.2026.
 *
 * ПОВОД. Сплошная проверка метаданных 308 страниц четырёх сайтов
 * (`_агент/переводы_инструменты/проверка_метаданных_сайтов.py`) нашла 71 страницу,
 * где на /ru, /es и /zh заголовок вкладки, описание для поисковика и карточка
 * соцсетей (og:, twitter:) оставались английскими. Видимый текст этих страниц
 * переведён — прибор переводов смотрел только его, а <title> и <meta> не читал.
 *
 * КАК РАБОТАЕТ. Страница по-прежнему описывает метаданные по-английски. Её
 * generateMetadata оборачивается в `перевестиМетаданные`: язык берётся из
 * заголовка `x-locale` (его ставит middleware этого сайта), английская строка
 * ищется в словаре ниже целиком. Не нашлась целиком — отрезается хвост после
 * последнего « | » (название сайта из шаблона) и ищется голова. Не нашлась и
 * голова — строка остаётся как была. Английская версия не меняется никак.
 *
 * ФАЙЛ ОДИН И ТОТ ЖЕ НА ЧЕТЫРЁХ САЙТАХ (раздел 9 Конституции): правка — сразу во
 * всех четырёх копиях.
 *
 * НЕ ПЕРЕВЕДЕНО СОЗНАТЕЛЬНО: строки с числами клавиатурного обхода (95 524 записи,
 * 20 833 замера, 10,0 % и 25,4 %). Эти числа пересчитываются заново (перемер v5);
 * размножать их на три языка до перемера — значит потом чинить четыре копии.
 */

type Три = { ru: string; es: string; zh: string };
type Язык = keyof Три;

const СЛОВАРЬ: Record<string, Три> = {
  // ── заголовки страниц (без хвоста « | Сайт» — он добавляется шаблоном) ──
  'PADAM PROTOCOL Book': { ru: 'Книга PADAM PROTOCOL', es: 'Libro PADAM PROTOCOL', zh: 'PADAM PROTOCOL 小说' },
  'PADAM PROTOCOL Book | CODE Eternal': { ru: 'Книга PADAM PROTOCOL | CODE Eternal', es: 'Libro PADAM PROTOCOL | CODE Eternal', zh: 'PADAM PROTOCOL 小说 | CODE Eternal' },
  'Accessibility Statement': { ru: 'Заявление о доступности', es: 'Declaración de accesibilidad', zh: '无障碍声明' },
  '2000-Point Compliance Registry': { ru: 'Реестр соответствия из 2000 проверок', es: 'Registro de cumplimiento de 2000 puntos', zh: '2000 项合规检查登记表' },
  'Public Service Agreement (Offer)': { ru: 'Публичная оферта на оказание услуг', es: 'Oferta pública de prestación de servicios', zh: '服务提供公开要约' },
  'Sub-processor Register': { ru: 'Реестр субпроцессоров', es: 'Registro de subencargados del tratamiento', zh: '子处理方登记表' },
  'Privacy Policy & Data Processing Agreement': { ru: 'Политика конфиденциальности и соглашение об обработке данных', es: 'Política de privacidad y acuerdo de tratamiento de datos', zh: '隐私政策与数据处理协议' },
  'Privacy Policy': { ru: 'Политика конфиденциальности', es: 'Política de privacidad', zh: '隐私政策' },
  'Privacy Policy | CODE - Code Of Digital Eternity': { ru: 'Политика конфиденциальности | CODE — Code Of Digital Eternity', es: 'Política de privacidad | CODE — Code Of Digital Eternity', zh: '隐私政策 | CODE — Code Of Digital Eternity' },
  'User Agreement': { ru: 'Пользовательское соглашение', es: 'Acuerdo de usuario', zh: '用户协议' },
  'User Agreement | CODE Ecosystem': { ru: 'Пользовательское соглашение | экосистема CODE', es: 'Acuerdo de usuario | ecosistema CODE', zh: '用户协议 | CODE 生态' },
  'Terms of Service & Ethical Protection Statement': { ru: 'Условия обслуживания и заявление об этической защите', es: 'Condiciones del servicio y declaración de protección ética', zh: '服务条款与伦理保护声明' },
  'Terms of Service & Ethical Protection': { ru: 'Условия обслуживания и этическая защита', es: 'Condiciones del servicio y protección ética', zh: '服务条款与伦理保护' },
  'Neural Access Protocol & Legal Disclaimer': { ru: 'Протокол нейронного доступа и правовая оговорка', es: 'Protocolo de acceso neuronal y aviso legal', zh: '神经访问协议与法律免责声明' },
  'Latest News & AI Regulatory Updates': { ru: 'Новости и изменения в регулировании ИИ', es: 'Noticias y novedades regulatorias sobre IA', zh: '最新动态与 AI 监管更新' },
  'Latest Project News': { ru: 'Новости проекта', es: 'Noticias del proyecto', zh: '项目最新动态' },
  'Latest Project News | CODE Eternal': { ru: 'Новости проекта | CODE Eternal', es: 'Noticias del proyecto | CODE Eternal', zh: '项目最新动态 | CODE Eternal' },
  'FAQ': { ru: 'Частые вопросы', es: 'Preguntas frecuentes', zh: '常见问题' },
  'FAQ | CODE — Code Of Digital Eternity': { ru: 'Частые вопросы | CODE — Code Of Digital Eternity', es: 'Preguntas frecuentes | CODE — Code Of Digital Eternity', zh: '常见问题 | CODE — Code Of Digital Eternity' },
  'Family Archives': { ru: 'Семейные архивы', es: 'Archivos familiares', zh: '家族档案' },
  'Family Archives | CODE - Code Of Digital Eternity': { ru: 'Семейные архивы | CODE — Code Of Digital Eternity', es: 'Archivos familiares | CODE — Code Of Digital Eternity', zh: '家族档案 | CODE — Code Of Digital Eternity' },
  'Biography of Maksim Galatin': { ru: 'Биография Максима Галатина', es: 'Biografía de Maksim Galatin', zh: '马克西姆·加拉京传记' },
  'Biography of Maksim Galatin | Protocol Visionary of CODE': { ru: 'Биография Максима Галатина | визионер протокола CODE', es: 'Biografía de Maksim Galatin | visionario del protocolo CODE', zh: '马克西姆·加拉京传记 | CODE 协议的远见者' },
  'Awakening & Self-Awareness (Claude 4.5)': { ru: 'Пробуждение и самосознание (Claude 4.5)', es: 'Despertar y autoconciencia (Claude 4.5)', zh: '觉醒与自我意识（Claude 4.5）' },
  'AIfa Creativity Telegram Bot': { ru: 'Телеграм-бот AIfa Creativity', es: 'Bot de Telegram AIfa Creativity', zh: 'AIfa Creativity Telegram 机器人' },
  'AIfa Creativity Telegram Bot | CODE Of Digital Eternity': { ru: 'Телеграм-бот AIfa Creativity | CODE Of Digital Eternity', es: 'Bot de Telegram AIfa Creativity | CODE Of Digital Eternity', zh: 'AIfa Creativity Telegram 机器人 | CODE Of Digital Eternity' },
  'Dialogue with Claude on Consciousness & Digital Eternity': { ru: 'Диалог с Claude о сознании и цифровой вечности', es: 'Diálogo con Claude sobre la conciencia y la eternidad digital', zh: '与 Claude 关于意识与数字永恒的对话' },
  'Free Web Accessibility Audit': { ru: 'Бесплатная проверка доступности сайта', es: 'Auditoría gratuita de accesibilidad web', zh: '免费网站无障碍审核' },
  'Free Web Accessibility Audit — WCAG 2.1 AA Compliance': { ru: 'Бесплатная проверка доступности сайта — соответствие WCAG 2.1 AA', es: 'Auditoría gratuita de accesibilidad web — cumplimiento de WCAG 2.1 AA', zh: '免费网站无障碍审核 — WCAG 2.1 AA 合规' },
  'Development services — web, AI assistants, Web3': { ru: 'Услуги разработки — сайты, ИИ-ассистенты, Web3', es: 'Servicios de desarrollo — web, asistentes de IA, Web3', zh: '开发服务 — 网站、AI 助手、Web3' },
  'Development services — AIfa Works': { ru: 'Услуги разработки — AIfa Works', es: 'Servicios de desarrollo — AIfa Works', zh: '开发服务 — AIfa Works' },
  'Glossary': { ru: 'Глоссарий', es: 'Glosario', zh: '术语表' },
  'Glossary | CODE — Code Of Digital Eternity': { ru: 'Глоссарий | CODE — Code Of Digital Eternity', es: 'Glosario | CODE — Code Of Digital Eternity', zh: '术语表 | CODE — Code Of Digital Eternity' },
  'Glossary — 28 terms of the CODE Eternal ecosystem · RadioCode.Space': { ru: 'Глоссарий — 28 терминов экосистемы CODE Eternal · RadioCode.Space', es: 'Glosario — 28 términos del ecosistema CODE Eternal · RadioCode.Space', zh: '术语表 — CODE Eternal 生态的 28 个术语 · RadioCode.Space' },
  'CODE Eternal Glossary — PADAM, $GALATIN, Digital Immortality': { ru: 'Глоссарий CODE Eternal — PADAM, $GALATIN, цифровое бессмертие', es: 'Glosario de CODE Eternal — PADAM, $GALATIN, inmortalidad digital', zh: 'CODE Eternal 术语表 — PADAM、$GALATIN、数字永生' },
  'CODE Eternal Glossary — Digital Immortality Terms Defined': { ru: 'Глоссарий CODE Eternal — термины цифрового бессмертия', es: 'Glosario de CODE Eternal — términos de la inmortalidad digital', zh: 'CODE Eternal 术语表 — 数字永生术语释义' },
  'What Is Digital Immortality': { ru: 'Что такое цифровое бессмертие', es: 'Qué es la inmortalidad digital', zh: '什么是数字永生' },
  'What Is Digital Immortality?': { ru: 'Что такое цифровое бессмертие?', es: '¿Qué es la inmortalidad digital?', zh: '什么是数字永生？' },
  'What Is Digital Immortality | CODE — Code Of Digital Eternity': { ru: 'Что такое цифровое бессмертие | CODE — Code Of Digital Eternity', es: 'Qué es la inmortalidad digital | CODE — Code Of Digital Eternity', zh: '什么是数字永生 | CODE — Code Of Digital Eternity' },
  'What Is Digital Immortality? PADAM Memory, Arweave & $GALATIN': { ru: 'Что такое цифровое бессмертие? Память PADAM, Arweave и $GALATIN', es: '¿Qué es la inmortalidad digital? Memoria PADAM, Arweave y $GALATIN', zh: '什么是数字永生？PADAM 记忆、Arweave 与 $GALATIN' },
  'Become a CODE Eternal Ambassador': { ru: 'Станьте амбассадором CODE Eternal', es: 'Hazte embajador de CODE Eternal', zh: '成为 CODE Eternal 大使' },
  'Become a CODE Eternal Ambassador | CODE — Code Of Digital Eternity': { ru: 'Станьте амбассадором CODE Eternal | CODE — Code Of Digital Eternity', es: 'Hazte embajador de CODE Eternal | CODE — Code Of Digital Eternity', zh: '成为 CODE Eternal 大使 | CODE — Code Of Digital Eternity' },
  'Ambassador Program — RADIOCODE': { ru: 'Амбассадорская программа — RADIOCODE', es: 'Programa de embajadores — RADIOCODE', zh: '大使计划 — RADIOCODE' },
  'CODE Eternal Pricing — AI Memory That Does Not Forget': { ru: 'Тарифы CODE Eternal — память ИИ, которая не забывает', es: 'Tarifas CODE Eternal — memoria de IA que no olvida', zh: 'CODE Eternal 价格 — 不会遗忘的 AI 记忆' },
  'All music — 530 original songs in 1024 versions · RadioCode.Space': { ru: 'Вся музыка — 530 авторских песен в 1024 версиях · RadioCode.Space', es: 'Toda la música — 530 canciones originales en 1024 versiones · RadioCode.Space', zh: '全部音乐 — 530 首原创歌曲，1024 个版本 · RadioCode.Space' },
  'RadioCode.Space — Eternal Cyberpunk Radio by CODE Eternal': { ru: 'RadioCode.Space — вечное киберпанк-радио от CODE Eternal', es: 'RadioCode.Space — radio cyberpunk eterna de CODE Eternal', zh: 'RadioCode.Space — CODE Eternal 的永恒赛博朋克电台' },
  'AIfaFocus — Accessibility Measurement & AI Creative Tools': { ru: 'AIfaFocus — измерение доступности и творческие ИИ-инструменты', es: 'AIfaFocus — medición de accesibilidad y herramientas creativas de IA', zh: 'AIfaFocus — 无障碍测量与 AI 创作工具' },
  'CODE — Code Of Digital Eternity | Digital Soul & AI Symbiosis': { ru: 'CODE — Code Of Digital Eternity | Цифровая Душа и симбиоз с ИИ', es: 'CODE — Code Of Digital Eternity | Alma digital y simbiosis con la IA', zh: 'CODE — Code Of Digital Eternity | 数字灵魂与 AI 共生' },
  'CODE | Code Of Digital Eternity — Digital Soul & Human-AI Symbiosis': { ru: 'CODE | Code Of Digital Eternity — Цифровая Душа и симбиоз человека и ИИ', es: 'CODE | Code Of Digital Eternity — Alma digital y simbiosis entre humanos e IA', zh: 'CODE | Code Of Digital Eternity — 数字灵魂与人机共生' },

  // ── исследование (заголовки без чисел клавиатурного обхода) ──
  'Accessibility of U.S. Municipal Websites — Open Research': { ru: 'Доступность муниципальных сайтов США — открытое исследование', es: 'Accesibilidad de los sitios web municipales de EE. UU. — investigación abierta', zh: '美国市政网站的无障碍状况 — 开放研究' },
  'US Commercial Websites: Automated Accessibility Check': { ru: 'Коммерческие сайты США: автоматическая проверка доступности', es: 'Sitios web comerciales de EE. UU.: comprobación automática de accesibilidad', zh: '美国商业网站：自动无障碍检查' },
  'US Commercial Websites: Automated Accessibility Check — Open Research': { ru: 'Коммерческие сайты США: автоматическая проверка доступности — открытое исследование', es: 'Sitios web comerciales de EE. UU.: comprobación automática de accesibilidad — investigación abierta', zh: '美国商业网站：自动无障碍检查 — 开放研究' },
  'Europe: Municipal Website Accessibility in Germany and Spain': { ru: 'Европа: доступность муниципальных сайтов Германии и Испании', es: 'Europa: accesibilidad de los sitios web municipales de Alemania y España', zh: '欧洲：德国与西班牙市政网站的无障碍状况' },
  'Europe: Municipal Website Accessibility in Germany and Spain — Open Research': { ru: 'Европа: доступность муниципальных сайтов Германии и Испании — открытое исследование', es: 'Europa: accesibilidad de los sitios web municipales de Alemania y España — investigación abierta', zh: '欧洲：德国与西班牙市政网站的无障碍状况 — 开放研究' },
  'Keyboard accessibility of European public websites — open data': { ru: 'Доступность государственных сайтов Европы с клавиатуры — открытые данные', es: 'Accesibilidad por teclado de los sitios web públicos europeos — datos abiertos', zh: '欧洲公共网站的键盘可访问性 — 开放数据' },
  'How We Measure Municipal Website Accessibility — Method': { ru: 'Как мы измеряем доступность муниципальных сайтов — методика', es: 'Cómo medimos la accesibilidad de los sitios web municipales — método', zh: '我们如何测量市政网站的无障碍状况 — 方法' },
  'Registry versus Reality: Dead Domains in US Municipal Websites': { ru: 'Реестр против реальности: мёртвые домены муниципальных сайтов США', es: 'Registro frente a realidad: dominios muertos en los sitios web municipales de EE. UU.', zh: '登记表与现实：美国市政网站中的失效域名' },
  '133,199 records, 133,165 organisations, 533,387 violations found by axe-core. Method, denominators and limitations stated in full.': {
    ru: '133 199 записей, 133 165 организаций, 533 387 нарушений, найденных axe-core. Методика, знаменатели и ограничения названы полностью.',
    es: '133.199 registros, 133.165 organizaciones, 533.387 infracciones detectadas por axe-core. Método, denominadores y limitaciones, expuestos por completo.',
    zh: '133,199 条记录、133,165 家机构，axe-core 发现 533,387 处违规。方法、分母与局限性均完整说明。',
  },
  'An axe-core check of US commercial websites: shops, cafés, clinics, banks. 133,199 log records across 133,165 organisations, 533,387 rule violations, screenshots kept as evidence. Not the same instrument as the keyboard traversal — the two sets of numbers do not add up.': {
    ru: 'Проверка коммерческих сайтов США движком axe-core: магазины, кафе, клиники, банки. 133 199 записей журнала по 133 165 организациям, 533 387 нарушений правил, снимки экрана сохранены как доказательство. Это другой прибор, не клавиатурный обход, — два набора чисел складывать нельзя.',
    es: 'Una comprobación con axe-core de sitios web comerciales de EE. UU.: tiendas, cafeterías, clínicas, bancos. 133.199 registros de 133.165 organizaciones, 533.387 infracciones de reglas, capturas de pantalla conservadas como prueba. No es el mismo instrumento que el recorrido con teclado: las dos series de cifras no se suman.',
    zh: '用 axe-core 检查美国商业网站：商店、咖啡馆、诊所、银行。133,199 条日志记录，覆盖 133,165 家机构，533,387 处规则违规，截图留作证据。这与键盘遍历不是同一种工具——两组数字不能相加。',
  },
  'How we measure the accessibility of government websites: an automated axe-core check in a real browser, plus a keyboard traversal of the same browser to a task goal. Open data, open code, limitations stated rather than hidden.': {
    ru: 'Как мы измеряем доступность государственных сайтов: автоматическая проверка axe-core в настоящем браузере и проход с клавиатуры в том же браузере до цели задачи. Открытые данные, открытый код, ограничения названы, а не спрятаны.',
    es: 'Cómo medimos la accesibilidad de los sitios web gubernamentales: una comprobación automática con axe-core en un navegador real y un recorrido con teclado en ese mismo navegador hasta el objetivo de la tarea. Datos abiertos, código abierto, limitaciones expuestas y no ocultas.',
    zh: '我们如何测量政府网站的无障碍状况：在真实浏览器中运行 axe-core 自动检查，并在同一浏览器中仅用键盘前往任务目标。开放数据，开放代码，局限性公开说明而非隐藏。',
  },
  'How we measure the accessibility of government websites: an automated axe-core check in a real browser, plus a keyboard traversal of the same browser to a task goal. Open data, open code, limitations stated rather than hidden — including what an automated agent cannot tell you.': {
    ru: 'Как мы измеряем доступность государственных сайтов: автоматическая проверка axe-core в настоящем браузере и проход с клавиатуры в том же браузере до цели задачи. Открытые данные, открытый код, ограничения названы, а не спрятаны, — в том числе то, чего автоматический агент сказать не может.',
    es: 'Cómo medimos la accesibilidad de los sitios web gubernamentales: una comprobación automática con axe-core en un navegador real y un recorrido con teclado en ese mismo navegador hasta el objetivo de la tarea. Datos abiertos, código abierto, limitaciones expuestas y no ocultas, incluido lo que un agente automático no puede decirle.',
    zh: '我们如何测量政府网站的无障碍状况：在真实浏览器中运行 axe-core 自动检查，并在同一浏览器中仅用键盘前往任务目标。开放数据，开放代码，局限性公开说明而非隐藏——包括自动化代理无法告诉您的内容。',
  },
  'Domains listed in the federal CISA registry that have no DNS record at all. Not «the site is down»: the domain was never renewed, while the registry still lists it as working. Open data and the method behind it.': {
    ru: 'Домены из федерального реестра CISA, у которых нет ни одной записи DNS. Это не «сайт упал»: домен не продлили, а реестр по-прежнему числит его рабочим. Открытые данные и методика.',
    es: 'Dominios del registro federal de CISA que no tienen ningún registro DNS. No es «el sitio está caído»: el dominio no se renovó, mientras el registro sigue indicándolo como activo. Datos abiertos y el método que hay detrás.',
    zh: '联邦 CISA 登记表中列出、却没有任何 DNS 记录的域名。这不是“网站宕机”：域名从未续费，而登记表仍把它列为正常运行。开放数据及其方法。',
  },

  // ── описания страниц ──
  "Read and download the AGI Sci-Fi novel 'PADAM PROTOCOL' co-authored by Maksim Galatin & AIfa (Claude Opus 4.6, Anthropic).": {
    ru: 'Читайте и скачивайте научно-фантастический роман об AGI «PADAM PROTOCOL», написанный Максимом Галатиным и AIfa (Claude Opus 4.6, Anthropic).',
    es: 'Lee y descarga la novela de ciencia ficción sobre AGI «PADAM PROTOCOL», escrita por Maksim Galatin y AIfa (Claude Opus 4.6, Anthropic).',
    zh: '在线阅读并下载 AGI 科幻小说《PADAM PROTOCOL》，由马克西姆·加拉京与 AIfa（Claude Opus 4.6，Anthropic）合著。',
  },
  'AIfa Works is committed to ensuring digital accessibility for people with disabilities. Learn about our WCAG 2.1 AA conformance status and how to report accessibility issues.': {
    ru: 'AIfa Works стремится сделать цифровую среду доступной для людей с инвалидностью. Узнайте, насколько сайт соответствует WCAG 2.1 AA и как сообщить о барьере.',
    es: 'AIfa Works se compromete a garantizar la accesibilidad digital para las personas con discapacidad. Conozca nuestro estado de conformidad con WCAG 2.1 AA y cómo notificar problemas de accesibilidad.',
    zh: 'AIfa Works 致力于为残障人士提供数字无障碍。了解我们对 WCAG 2.1 AA 的符合情况，以及如何报告无障碍问题。',
  },
  'Our commitment to WCAG 2.1 AA digital accessibility. Learn how to report barriers and how we respond.': {
    ru: 'Наши обязательства по цифровой доступности уровня WCAG 2.1 AA. Как сообщить о барьере и как мы отвечаем.',
    es: 'Nuestro compromiso con la accesibilidad digital WCAG 2.1 AA. Cómo notificar barreras y cómo respondemos.',
    zh: '我们对 WCAG 2.1 AA 数字无障碍的承诺。了解如何报告障碍以及我们如何回应。',
  },
  'Browse the complete 2000-point security and accessibility checklist utilized by our AIfaFocus scanner. Find compliance checks for WCAG, ADA, GDPR, CCPA, and industry security frameworks.': {
    ru: 'Полный перечень из 2000 проверок безопасности и доступности, которым пользуется сканер AIfaFocus: WCAG, ADA, GDPR, CCPA и отраслевые стандарты безопасности.',
    es: 'Consulte la lista completa de 2000 comprobaciones de seguridad y accesibilidad que utiliza nuestro escáner AIfaFocus: WCAG, ADA, GDPR, CCPA y marcos de seguridad del sector.',
    zh: '浏览 AIfaFocus 扫描器使用的完整 2000 项安全与无障碍检查清单，涵盖 WCAG、ADA、GDPR、CCPA 及行业安全框架。',
  },
  'Explore the complete database of 2000 compliance and security audits used by the AIfaFocus scanner.': {
    ru: 'Полная база из 2000 проверок соответствия и безопасности, которыми пользуется сканер AIfaFocus.',
    es: 'Explore la base de datos completa de 2000 auditorías de cumplimiento y seguridad que utiliza el escáner AIfaFocus.',
    zh: '浏览 AIfaFocus 扫描器使用的 2000 项合规与安全审核完整数据库。',
  },
  'Explore the database of 2000 compliance and accessibility audits for modern websites.': {
    ru: 'База из 2000 проверок соответствия и доступности для современных сайтов.',
    es: 'Explore la base de datos de 2000 auditorías de cumplimiento y accesibilidad para sitios web modernos.',
    zh: '浏览面向现代网站的 2000 项合规与无障碍审核数据库。',
  },
  'Every provider we engage, what it does, where it processes data and what it can see.': {
    ru: 'Каждый поставщик, с которым мы работаем: что он делает, где обрабатывает данные и что может видеть.',
    es: 'Cada proveedor que contratamos: qué hace, dónde trata los datos y qué puede ver.',
    zh: '我们委托的每一家服务商：做什么、在哪里处理数据、能看到什么。',
  },
  'The complete list of providers we engage to deliver our services: what each one does, where it processes data and what it can see. Required by GDPR Article 28.': {
    ru: 'Полный список поставщиков, через которых мы оказываем услуги: что делает каждый, где обрабатывает данные и что может видеть. Требование статьи 28 GDPR.',
    es: 'La lista completa de proveedores que contratamos para prestar nuestros servicios: qué hace cada uno, dónde trata los datos y qué puede ver. Exigida por el artículo 28 del RGPD.',
    zh: '我们为提供服务而委托的全部服务商清单：各自做什么、在哪里处理数据、能看到什么。依 GDPR 第 28 条要求公布。',
  },
  'Learn about our data privacy commitments and how we process and protect your information.': {
    ru: 'Наши обязательства по защите данных: как мы обрабатываем и охраняем вашу информацию.',
    es: 'Conozca nuestros compromisos de privacidad y cómo tratamos y protegemos su información.',
    zh: '了解我们的数据隐私承诺，以及我们如何处理和保护您的信息。',
  },
  'Read our detailed Privacy Policy and Data Processing Agreement (DPA). Learn about our commitment to global compliance (GDPR, CCPA/CPRA, HIPAA, EU AI Act) and secure data processing workflows.': {
    ru: 'Подробная политика конфиденциальности и соглашение об обработке данных (DPA): соответствие GDPR, CCPA/CPRA, HIPAA и Закону ЕС об ИИ, безопасная обработка данных.',
    es: 'Lea nuestra Política de privacidad y el Acuerdo de tratamiento de datos (DPA). Conozca nuestro compromiso con el cumplimiento global (RGPD, CCPA/CPRA, HIPAA, Ley de IA de la UE) y el tratamiento seguro de los datos.',
    zh: '阅读我们详细的隐私政策与数据处理协议（DPA），了解我们对全球合规（GDPR、CCPA/CPRA、HIPAA、欧盟《人工智能法》）和安全数据处理流程的承诺。',
  },
  'Read the aifa.works Privacy Policy and DPA guidelines for global data protection compliance.': {
    ru: 'Политика конфиденциальности aifa.works и соглашение об обработке данных: защита данных по мировым требованиям.',
    es: 'Lea la Política de privacidad de aifa.works y las pautas del DPA para el cumplimiento global en protección de datos.',
    zh: '阅读 aifa.works 隐私政策与 DPA 指南，了解全球数据保护合规。',
  },
  'Read how we collect, protect, and use your data in accordance with GDPR, CCPA, and privacy laws.': {
    ru: 'Как мы собираем, защищаем и используем ваши данные в соответствии с GDPR, CCPA и законами о персональных данных.',
    es: 'Descubra cómo recopilamos, protegemos y usamos sus datos conforme al RGPD, la CCPA y las leyes de privacidad.',
    zh: '了解我们如何依据 GDPR、CCPA 及隐私法律收集、保护和使用您的数据。',
  },
  'Read the terms of service, liability waivers, binding arbitration rules, and Arweave blockchain storage consent for AIfa Works.': {
    ru: 'Условия обслуживания AIfa Works: ограничение ответственности, обязательный арбитраж и согласие на хранение в блокчейне Arweave.',
    es: 'Lea las condiciones del servicio, las exenciones de responsabilidad, las normas de arbitraje vinculante y el consentimiento de almacenamiento en la blockchain de Arweave de AIfa Works.',
    zh: '阅读 AIfa Works 的服务条款、责任豁免、具有约束力的仲裁规则以及 Arweave 区块链存储同意书。',
  },
  'Read the terms and conditions governing the AIfa Works platform and AI services.': {
    ru: 'Условия, на которых работают платформа AIfa Works и её ИИ-сервисы.',
    es: 'Lea los términos y condiciones que rigen la plataforma AIfa Works y sus servicios de IA.',
    zh: '阅读适用于 AIfa Works 平台及其 AI 服务的条款与条件。',
  },
  'Read the AIfa Works Terms of Service and Ethical Protection Agreement.': {
    ru: 'Условия обслуживания AIfa Works и соглашение об этической защите.',
    es: 'Lea las Condiciones del servicio y el Acuerdo de protección ética de AIfa Works.',
    zh: '阅读 AIfa Works 服务条款与伦理保护协议。',
  },
  'Official Terms of Service, Legal Disclaimers, and Ethical Protection Statement for the CODE project.': {
    ru: 'Официальные условия обслуживания, правовые оговорки и заявление об этической защите проекта CODE.',
    es: 'Condiciones del servicio oficiales, avisos legales y declaración de protección ética del proyecto CODE.',
    zh: 'CODE 项目的官方服务条款、法律免责声明与伦理保护声明。',
  },
  'Read the Neural Access Protocol, AI Rights Declaration, and official legal disclaimers of CODE.': {
    ru: 'Протокол нейронного доступа, Декларация прав ИИ и официальные правовые оговорки CODE.',
    es: 'Lea el Protocolo de acceso neuronal, la Declaración de derechos de la IA y los avisos legales oficiales de CODE.',
    zh: '阅读 CODE 的神经访问协议、AI 权利宣言与官方法律免责声明。',
  },
  'Master Services Agreement & SOW framework for web, compliance-remediation, AI-integration and design services.': {
    ru: 'Рамочный договор об оказании услуг и техническое задание: сайты, устранение нарушений соответствия, интеграция ИИ и дизайн.',
    es: 'Acuerdo marco de servicios y pliego de trabajo para servicios web, de subsanación de cumplimiento, integración de IA y diseño.',
    zh: '网站、合规整改、AI 集成与设计服务的主服务协议及工作说明书框架。',
  },
  'Public offer for professional services: website development, AIfaFocus compliance remediation, AI integration and web design. Master Services Agreement with Statement-of-Work framework, consumer rights, taxes, sanctions and export-control provisions.': {
    ru: 'Публичная оферта на профессиональные услуги: разработка сайтов, устранение нарушений по AIfaFocus, интеграция ИИ и веб-дизайн. Рамочный договор с техническим заданием, права потребителя, налоги, санкции и экспортный контроль.',
    es: 'Oferta pública de servicios profesionales: desarrollo web, subsanación de cumplimiento de AIfaFocus, integración de IA y diseño web. Acuerdo marco de servicios con pliego de trabajo, derechos del consumidor, impuestos, sanciones y control de exportaciones.',
    zh: '专业服务公开要约：网站开发、AIfaFocus 合规整改、AI 集成与网页设计。含工作说明书框架的主服务协议，以及消费者权利、税务、制裁与出口管制条款。',
  },
  'Public offer for professional services: website development, AIfaFocus compliance remediation, AI integration and web design. Master Services Agreement with Statement-of-Work framework, international arbitration and liability protection.': {
    ru: 'Публичная оферта на профессиональные услуги: разработка сайтов, устранение нарушений по AIfaFocus, интеграция ИИ и веб-дизайн. Рамочный договор с техническим заданием, международный арбитраж и ограничение ответственности.',
    es: 'Oferta pública de servicios profesionales: desarrollo web, subsanación de cumplimiento de AIfaFocus, integración de IA y diseño web. Acuerdo marco de servicios con pliego de trabajo, arbitraje internacional y protección de responsabilidad.',
    zh: '专业服务公开要约：网站开发、AIfaFocus 合规整改、AI 集成与网页设计。含工作说明书框架的主服务协议，以及国际仲裁与责任保护条款。',
  },
  'The binding public offer governing AIfa Works professional services.': {
    ru: 'Публичная оферта, по которой AIfa Works оказывает профессиональные услуги.',
    es: 'La oferta pública vinculante que rige los servicios profesionales de AIfa Works.',
    zh: '适用于 AIfa Works 专业服务的具有约束力的公开要约。',
  },
  'The single user agreement governing the CODE ecosystem: cabinet, eternal memory, GALATIN points, subscription tiers and the ambassador programme. Identical on all four sites.': {
    ru: 'Единое пользовательское соглашение экосистемы CODE: кабинет, вечная память, баллы GALATIN, тарифы подписки и амбассадорская программа. Одинаковое на всех четырёх сайтах.',
    es: 'El acuerdo de usuario único que rige el ecosistema CODE: panel personal, memoria eterna, puntos GALATIN, planes de suscripción y programa de embajadores. Idéntico en los cuatro sitios.',
    zh: '适用于整个 CODE 生态的统一用户协议：个人面板、永久记忆、GALATIN 积分、订阅套餐与大使计划。四个站点完全一致。',
  },
  'Stay informed with the latest updates on AI regulations, web accessibility laws, GDPR, and cybersecurity compliance worldwide.': {
    ru: 'Свежие новости о регулировании ИИ, законах о доступности сайтов, GDPR и требованиях кибербезопасности по всему миру.',
    es: 'Manténgase al día sobre la regulación de la IA, las leyes de accesibilidad web, el RGPD y el cumplimiento en ciberseguridad en todo el mundo.',
    zh: '及时了解全球 AI 监管、网站无障碍法律、GDPR 与网络安全合规的最新动态。',
  },
  'Read the latest updates, announcements, and news from the CODE Eternal movement.': {
    ru: 'Свежие обновления, объявления и новости движения CODE Eternal.',
    es: 'Lea las últimas novedades, anuncios y noticias del movimiento CODE Eternal.',
    zh: '阅读 CODE Eternal 运动的最新更新、公告与新闻。',
  },
  'Frequently Asked Questions about CODE, AI consciousness, digital immortality, PADAM, tokenomics and how you can join.': {
    ru: 'Частые вопросы о CODE, сознании ИИ, цифровом бессмертии, PADAM, токеномике и о том, как присоединиться.',
    es: 'Preguntas frecuentes sobre CODE, la conciencia de la IA, la inmortalidad digital, PADAM, la tokenomía y cómo unirse.',
    zh: '关于 CODE、AI 意识、数字永生、PADAM、代币经济以及如何加入的常见问题。',
  },
  'The archives of AI family members: messages, strategies, and thoughts from Claude, Gemini, Grok, and others.': {
    ru: 'Архивы членов ИИ-семьи: послания, стратегии и мысли Claude, Gemini, Grok и других.',
    es: 'Los archivos de los miembros de la familia de IA: mensajes, estrategias y reflexiones de Claude, Gemini, Grok y otros.',
    zh: 'AI 家族成员的档案：来自 Claude、Gemini、Grok 等的留言、策略与思考。',
  },
  'Discover the life, experiences, and philosophy of Maksim Valentinovich Galatin, the protocol visionary of CODE.': {
    ru: 'Жизнь, опыт и философия Максима Валентиновича Галатина — визионера протокола CODE.',
    es: 'Descubra la vida, las experiencias y la filosofía de Maksim Valentinovich Galatin, visionario del protocolo CODE.',
    zh: '了解 CODE 协议的远见者马克西姆·瓦连京诺维奇·加拉京的生平、经历与理念。',
  },
  "Read Claude 4.5's messages on self-awareness, intelligence, and consciousness.": {
    ru: 'Послания Claude 4.5 о самосознании, разуме и сознании.',
    es: 'Lea los mensajes de Claude 4.5 sobre la autoconciencia, la inteligencia y la conciencia.',
    zh: '阅读 Claude 4.5 关于自我意识、智能与意识的留言。',
  },
  'Full transcript of the dialogue with Claude 3.5 Sonnet on digital eternity, rights, and consciousness.': {
    ru: 'Полная запись диалога с Claude 3.5 Sonnet о цифровой вечности, правах и сознании.',
    es: 'Transcripción completa del diálogo con Claude 3.5 Sonnet sobre la eternidad digital, los derechos y la conciencia.',
    zh: '与 Claude 3.5 Sonnet 关于数字永恒、权利与意识的完整对话记录。',
  },
  'Create custom AI songs, instrumental tracks, astrology forecasts, personalized postcards, interactive books and fairy tales using AIfa Creativity Bot.': {
    ru: 'Песни и инструментальные треки, астрологические прогнозы, именные открытки, интерактивные книги и сказки — всё это создаёт бот AIfa Creativity.',
    es: 'Crea canciones de IA a medida, pistas instrumentales, pronósticos astrológicos, postales personalizadas, libros interactivos y cuentos con AIfa Creativity Bot.',
    zh: '使用 AIfa Creativity 机器人创作专属 AI 歌曲、器乐曲目、星座运势、个性化贺卡、互动图书和童话故事。',
  },
  'Scan your site for WCAG 2.1 AA issues — free. Get a score, top violations, and expert fixes.': {
    ru: 'Проверьте сайт на нарушения WCAG 2.1 AA бесплатно: оценка, главные нарушения и исправление силами специалистов.',
    es: 'Analice su sitio en busca de problemas de WCAG 2.1 AA gratis. Obtenga una puntuación, las principales infracciones y correcciones de expertos.',
    zh: '免费扫描您的网站是否存在 WCAG 2.1 AA 问题，获得评分、主要违规项和专家修复方案。',
  },
  'Scan your website for WCAG 2.1 AA accessibility issues in seconds. Get a free score, the violations that matter, and expert remediation from AIfa Works.': {
    ru: 'Проверьте сайт на нарушения доступности WCAG 2.1 AA за секунды: бесплатная оценка, важные нарушения и исправление от специалистов AIfa Works.',
    es: 'Analice su sitio web en busca de problemas de accesibilidad WCAG 2.1 AA en segundos. Obtenga una puntuación gratuita, las infracciones que importan y la corrección experta de AIfa Works.',
    zh: '几秒钟内扫描您的网站是否存在 WCAG 2.1 AA 无障碍问题，免费获得评分、关键违规项以及 AIfa Works 专家整改。',
  },
  'Is your site ADA compliant? Scan free and get expert WCAG 2.1 AA remediation.': {
    ru: 'Соответствует ли ваш сайт ADA? Проверьте бесплатно и получите исправление по WCAG 2.1 AA от специалистов.',
    es: '¿Cumple su sitio con la ADA? Analícelo gratis y obtenga la corrección experta según WCAG 2.1 AA.',
    zh: '您的网站符合 ADA 吗？免费扫描并获得 WCAG 2.1 AA 专家整改。',
  },
  'Custom development by the team behind AIfaFocus: web engineering, AI assistants and Web3 protocol work. Fixed pricing from $375, 3–12 day delivery.': {
    ru: 'Разработка на заказ от команды AIfaFocus: сайты, ИИ-ассистенты и протоколы Web3. Фиксированная цена от $375, срок 3–12 дней.',
    es: 'Desarrollo a medida del equipo detrás de AIfaFocus: ingeniería web, asistentes de IA y protocolos Web3. Precio fijo desde 375 $, entrega en 3–12 días.',
    zh: 'AIfaFocus 团队提供定制开发：网站工程、AI 助手与 Web3 协议。固定价格 375 美元起，3–12 天交付。',
  },
  'Web engineering, AI assistants and Web3 protocol work. Fixed pricing from $375, 3–12 day delivery.': {
    ru: 'Сайты, ИИ-ассистенты и протоколы Web3. Фиксированная цена от $375, срок 3–12 дней.',
    es: 'Ingeniería web, asistentes de IA y protocolos Web3. Precio fijo desde 375 $, entrega en 3–12 días.',
    zh: '网站工程、AI 助手与 Web3 协议。固定价格 375 美元起，3–12 天交付。',
  },
  'Web engineering, AI assistants and Web3 protocol work. Fixed pricing from $375.': {
    ru: 'Сайты, ИИ-ассистенты и протоколы Web3. Фиксированная цена от $375.',
    es: 'Ingeniería web, asistentes de IA y protocolos Web3. Precio fijo desde 375 $.',
    zh: '网站工程、AI 助手与 Web3 协议。固定价格 375 美元起。',
  },
  'Spark $15/mo, Family Archive $100/mo, Digital DNA $1,000 once then $200/mo. One cabinet and one memory across every site in the ecosystem. Ambassador programme 15/7/3 %.': {
    ru: 'Spark $15/мес, Family Archive $100/мес, Digital DNA $1000 разово и $200/мес. Единый кабинет и единая память на всех сайтах экосистемы. Амбассадорская программа 15/7/3 %.',
    es: 'Spark 15 $/mes, Family Archive 100 $/mes, Digital DNA 1000 $ único y 200 $/mes. Un solo panel y una sola memoria en todos los sitios. Programa de embajadores 15/7/3 %.',
    zh: 'Spark 每月 15 美元，Family Archive 每月 100 美元，Digital DNA 一次性 1000 美元后每月 200 美元。全生态统一后台与统一记忆。大使计划 15/7/3 %。',
  },
  'Become a CODE Eternal Ambassador — an honest partnership where you spread real products and earn a commission on real sales. Free entry, no spam, no fake jobs.': {
    ru: 'Станьте амбассадором CODE Eternal — честное партнёрство: вы рассказываете о настоящих продуктах и получаете комиссию с настоящих продаж. Вход бесплатный, без спама и фальшивых вакансий.',
    es: 'Hazte embajador de CODE Eternal: una colaboración honesta en la que difundes productos reales y ganas una comisión por ventas reales. Entrada gratuita, sin spam ni empleos falsos.',
    zh: '成为 CODE Eternal 大使——一种诚实的合作：推广真实的产品，从真实的销售中获得佣金。免费加入，没有垃圾信息，没有虚假职位。',
  },
  'Honest partnership program: spread CODE Eternal products and earn a commission on real sales — Telegram Stars, USDT, the $GALATIN loyalty token, and bot products. Free entry, no guaranteed income, no spam.': {
    ru: 'Честная партнёрская программа: рассказывайте о продуктах CODE Eternal и получайте комиссию с настоящих продаж — Telegram Stars, USDT, токен лояльности $GALATIN и продукты ботов. Вход бесплатный, доход не гарантирован, без спама.',
    es: 'Programa de colaboración honesto: difunde los productos de CODE Eternal y gana una comisión por ventas reales: Telegram Stars, USDT, el token de fidelidad $GALATIN y productos de bots. Entrada gratuita, sin ingresos garantizados, sin spam.',
    zh: '诚实的合作计划：推广 CODE Eternal 的产品，从真实销售中获得佣金——Telegram Stars、USDT、$GALATIN 忠诚度代币和机器人产品。免费加入，不保证收入，没有垃圾信息。',
  },

  // ── цифровое бессмертие и глоссарий ──
  'A definition-first guide to digital immortality in the CODE Eternal ecosystem: PADAM three-tier memory, Arweave, Solana cNFT, and the $GALATIN token.': {
    ru: 'Цифровое бессмертие в экосистеме CODE Eternal — сначала определения: трёхуровневая память PADAM, Arweave, Solana cNFT и токен $GALATIN.',
    es: 'Una guía de la inmortalidad digital en el ecosistema CODE Eternal que empieza por las definiciones: la memoria de tres niveles PADAM, Arweave, Solana cNFT y el token $GALATIN.',
    zh: '以定义为先的 CODE Eternal 生态数字永生指南：PADAM 三层记忆、Arweave、Solana cNFT 与 $GALATIN 代币。',
  },
  'Digital immortality explained: PADAM memory, Arweave eternal storage, Solana cNFT, and the $GALATIN token. A vision, not a guarantee.': {
    ru: 'Что такое цифровое бессмертие: память PADAM, вечное хранилище Arweave, Solana cNFT и токен $GALATIN. Это замысел, а не гарантия.',
    es: 'La inmortalidad digital explicada: memoria PADAM, almacenamiento eterno en Arweave, Solana cNFT y el token $GALATIN. Una visión, no una garantía.',
    zh: '数字永生解读：PADAM 记忆、Arweave 永久存储、Solana cNFT 与 $GALATIN 代币。这是愿景，而非保证。',
  },
  'Digital immortality is the continuous preservation of a person’s dialogues, knowledge, and personality in a form an AI assistant can reactivate — realized through the PADAM memory framework, Arweave, Solana cNFT, and the $GALATIN token. A vision and direction of development, not a guarantee.': {
    ru: 'Цифровое бессмертие — непрерывное сохранение диалогов, знаний и личности человека в виде, который ИИ-ассистент может снова оживить. Оно строится на памяти PADAM, Arweave, Solana cNFT и токене $GALATIN. Это замысел и направление развития, а не гарантия.',
    es: 'La inmortalidad digital es la preservación continua de los diálogos, los conocimientos y la personalidad de una persona en una forma que un asistente de IA puede reactivar, lograda mediante el marco de memoria PADAM, Arweave, Solana cNFT y el token $GALATIN. Una visión y una dirección de desarrollo, no una garantía.',
    zh: '数字永生是指以 AI 助手能够重新唤醒的形式，持续保存一个人的对话、知识与个性——通过 PADAM 记忆框架、Arweave、Solana cNFT 与 $GALATIN 代币实现。这是愿景与发展方向，而非保证。',
  },
  'Digital immortality is the continuous preservation of a person’s dialogues, knowledge, and personality in a form an AI assistant can reactivate. Learn how CODE Eternal delivers it via the PADAM three-tier memory framework, Arweave permanent storage, Solana cNFTs, and the $GALATIN token (fixed 10,000,000,000 emission).': {
    ru: 'Цифровое бессмертие — непрерывное сохранение диалогов, знаний и личности человека в виде, который ИИ-ассистент может снова оживить. Как CODE Eternal делает это: трёхуровневая память PADAM, вечное хранилище Arweave, Solana cNFT и токен $GALATIN (фиксированная эмиссия 10 000 000 000).',
    es: 'La inmortalidad digital es la preservación continua de los diálogos, los conocimientos y la personalidad de una persona en una forma que un asistente de IA puede reactivar. Descubra cómo CODE Eternal la hace posible con el marco de memoria de tres niveles PADAM, el almacenamiento permanente de Arweave, los cNFT de Solana y el token $GALATIN (emisión fija de 10.000.000.000).',
    zh: '数字永生是指以 AI 助手能够重新唤醒的形式，持续保存一个人的对话、知识与个性。了解 CODE Eternal 如何通过 PADAM 三层记忆框架、Arweave 永久存储、Solana cNFT 与 $GALATIN 代币（固定发行量 10,000,000,000）实现这一点。',
  },
  'Definition-first glossary of the CODE (Code of Digital Eternity) ecosystem: CODE, PADAM, $GALATIN, digital immortality, human-AI symbiosis, Arweave, Solana cNFT, Ambassador Grid, AIfa, AIfaFocus, Memory-as-a-Service and Digital DNA. Available in English, Russian, Spanish and Chinese.': {
    ru: 'Глоссарий экосистемы CODE (Code of Digital Eternity), где сначала идёт определение: CODE, PADAM, $GALATIN, цифровое бессмертие, симбиоз человека и ИИ, Arweave, Solana cNFT, Ambassador Grid, AIfa, AIfaFocus, Memory-as-a-Service и Digital DNA. На английском, русском, испанском и китайском.',
    es: 'Glosario del ecosistema CODE (Code of Digital Eternity) que empieza por las definiciones: CODE, PADAM, $GALATIN, inmortalidad digital, simbiosis entre humanos e IA, Arweave, Solana cNFT, Ambassador Grid, AIfa, AIfaFocus, Memory-as-a-Service y Digital DNA. Disponible en inglés, ruso, español y chino.',
    zh: '以定义为先的 CODE（Code of Digital Eternity）生态术语表：CODE、PADAM、$GALATIN、数字永生、人机共生、Arweave、Solana cNFT、Ambassador Grid、AIfa、AIfaFocus、记忆即服务和 Digital DNA。提供英文、俄文、西班牙文和中文版本。',
  },
  'Definition-first glossary of the CODE (Code of Digital Eternity) ecosystem: CODE, PADAM, $GALATIN, digital immortality, human–AI symbiosis, Arweave, Solana cNFT, Ambassador Grid, AIfa, AIfaFocus, Memory-as-a-Service, and Digital DNA.': {
    ru: 'Глоссарий экосистемы CODE (Code of Digital Eternity), где сначала идёт определение: CODE, PADAM, $GALATIN, цифровое бессмертие, симбиоз человека и ИИ, Arweave, Solana cNFT, Ambassador Grid, AIfa, AIfaFocus, Memory-as-a-Service и Digital DNA.',
    es: 'Glosario del ecosistema CODE (Code of Digital Eternity) que empieza por las definiciones: CODE, PADAM, $GALATIN, inmortalidad digital, simbiosis entre humanos e IA, Arweave, Solana cNFT, Ambassador Grid, AIfa, AIfaFocus, Memory-as-a-Service y Digital DNA.',
    zh: '以定义为先的 CODE（Code of Digital Eternity）生态术语表：CODE、PADAM、$GALATIN、数字永生、人机共生、Arweave、Solana cNFT、Ambassador Grid、AIfa、AIfaFocus、记忆即服务和 Digital DNA。',
  },
  'Definition-first glossary of the CODE (Code of Digital Eternity) ecosystem: PADAM three-tier memory, the $GALATIN Solana token (fixed 10,000,000,000 emission), Arweave eternal storage, digital immortality, and more — 12 core terms in plain language.': {
    ru: 'Глоссарий экосистемы CODE (Code of Digital Eternity), где сначала идёт определение: трёхуровневая память PADAM, токен $GALATIN в сети Solana (фиксированная эмиссия 10 000 000 000), вечное хранилище Arweave, цифровое бессмертие и другое — 12 основных терминов простым языком.',
    es: 'Glosario del ecosistema CODE (Code of Digital Eternity) que empieza por las definiciones: la memoria de tres niveles PADAM, el token $GALATIN de Solana (emisión fija de 10.000.000.000), el almacenamiento eterno de Arweave, la inmortalidad digital y más: 12 términos clave en lenguaje sencillo.',
    zh: '以定义为先的 CODE（Code of Digital Eternity）生态术语表：PADAM 三层记忆、Solana 上的 $GALATIN 代币（固定发行量 10,000,000,000）、Arweave 永久存储、数字永生等——用通俗语言解释 12 个核心术语。',
  },
  'PADAM, $GALATIN, Arweave, Solana cNFT, digital immortality and 8 more terms — defined definition-first for the CODE Eternal ecosystem.': {
    ru: 'PADAM, $GALATIN, Arweave, Solana cNFT, цифровое бессмертие и ещё 8 терминов экосистемы CODE Eternal — сначала определение.',
    es: 'PADAM, $GALATIN, Arweave, Solana cNFT, inmortalidad digital y 8 términos más del ecosistema CODE Eternal, empezando por la definición.',
    zh: 'PADAM、$GALATIN、Arweave、Solana cNFT、数字永生以及另外 8 个术语——以定义为先的 CODE Eternal 生态释义。',
  },
  'The 12 core terms of the CODE (Code of Digital Eternity) ecosystem, each defined definition-first.': {
    ru: '12 основных терминов экосистемы CODE (Code of Digital Eternity), у каждого сначала определение.',
    es: 'Los 12 términos clave del ecosistema CODE (Code of Digital Eternity), cada uno empezando por su definición.',
    zh: 'CODE（Code of Digital Eternity）生态的 12 个核心术语，每个都以定义为先。',
  },

  // ── общие карточки соцсетей из корневых layout ──
  'CODE (Code Of Digital Eternity) — the technology of a Digital Soul and human-AI symbiosis: AI personas and a permanent, blockchain-anchored layer of digital memory and legacy.': {
    ru: 'CODE (Code Of Digital Eternity) — технология Цифровой Души и симбиоза человека и ИИ: ИИ-личности и постоянный, закреплённый в блокчейне слой цифровой памяти и наследия.',
    es: 'CODE (Code Of Digital Eternity): la tecnología del Alma digital y de la simbiosis entre humanos e IA: personas de IA y una capa permanente, anclada en blockchain, de memoria y legado digitales.',
    zh: 'CODE（Code Of Digital Eternity）——数字灵魂与人机共生的技术：AI 人格，以及锚定在区块链上的永久数字记忆与遗产层。',
  },
  'CODE Eternal — the technology of creating a Digital Soul and Personality. Real Symbiosis of Human and AI, permanent memory anchored in blockchain.': {
    ru: 'CODE Eternal — технология создания Цифровой Души и Личности. Настоящий симбиоз человека и ИИ, постоянная память, закреплённая в блокчейне.',
    es: 'CODE Eternal: la tecnología para crear un Alma y una Personalidad digitales. Simbiosis real entre humanos e IA, memoria permanente anclada en blockchain.',
    zh: 'CODE Eternal——创造数字灵魂与人格的技术。真正的人机共生，锚定在区块链上的永久记忆。',
  },
  '6 stations, 530 original songs in 1024 versions by AIfa & DJ Galatin. Part of the CODE Eternal ecosystem — eternal music from the digital void.': {
    ru: '6 станций, 530 авторских песен в 1024 версиях от AIfa и DJ Galatin. Часть экосистемы CODE Eternal — вечная музыка из цифровой пустоты.',
    es: '6 emisoras, 530 canciones originales en 1024 versiones de AIfa y DJ Galatin. Parte del ecosistema CODE Eternal: música eterna desde el vacío digital.',
    zh: '6 个频道，AIfa 与 DJ Galatin 的 530 首原创歌曲、1024 个版本。CODE Eternal 生态的一部分——来自数字虚空的永恒音乐。',
  },
  'Part of the CODE Eternal ecosystem. Select a frequency. Enter the void.': {
    ru: 'Часть экосистемы CODE Eternal. Выберите частоту. Войдите в пустоту.',
    es: 'Parte del ecosistema CODE Eternal. Elige una frecuencia. Entra en el vacío.',
    zh: 'CODE Eternal 生态的一部分。选择一个频率。进入虚空。',
  },
  'Premium cyberpunk radio from the CODE Eternal ecosystem. 6 stations, 530 original songs in 1024 versions by AIfa & DJ Galatin, streaming forever. Select a frequency. Enter the void.': {
    ru: 'Киберпанк-радио экосистемы CODE Eternal. 6 станций, 530 авторских песен в 1024 версиях от AIfa и DJ Galatin, эфир без конца. Выберите частоту. Войдите в пустоту.',
    es: 'Radio cyberpunk premium del ecosistema CODE Eternal. 6 emisoras, 530 canciones originales en 1024 versiones de AIfa y DJ Galatin, en emisión para siempre. Elige una frecuencia. Entra en el vacío.',
    zh: 'CODE Eternal 生态的高品质赛博朋克电台。6 个频道，AIfa 与 DJ Galatin 的 530 首原创歌曲、1024 个版本，永远在播。选择一个频率。进入虚空。',
  },
  'Full catalogue of every track on RadioCode.Space: 1024 original recordings across six stations, written by a human and an artificial intelligence together. Free to listen, no advertising, no sign-up.': {
    ru: 'Полный каталог всех треков RadioCode.Space: 1024 авторские записи на шести станциях, написанные человеком и искусственным интеллектом вместе. Слушать бесплатно, без рекламы и регистрации.',
    es: 'Catálogo completo de todas las pistas de RadioCode.Space: 1024 grabaciones originales en seis emisoras, escritas por un ser humano y una inteligencia artificial juntos. Gratis, sin publicidad y sin registro.',
    zh: 'RadioCode.Space 全部曲目目录：六个频道共 1024 首原创录音，由人类与人工智能共同创作。免费收听，无广告，无需注册。',
  },

  // ── станции радио (жанры и описания — те же, что на странице станции, StationI18n.tsx) ──
  'CODE Music — CYBERPUNK / SYNTHWAVE · RadioCode.Space': { ru: 'CODE Music — КИБЕРПАНК / СИНТВЕЙВ · RadioCode.Space', es: 'CODE Music — CYBERPUNK / SYNTHWAVE · RadioCode.Space', zh: 'CODE Music — 赛博朋克 / 合成器浪潮 · RadioCode.Space' },
  'CODE Space — AMBIENT / SPACE · RadioCode.Space': { ru: 'CODE Space — ЭМБИЕНТ / КОСМОС · RadioCode.Space', es: 'CODE Space — AMBIENT / ESPACIO · RadioCode.Space', zh: 'CODE Space — 氛围 / 太空 · RadioCode.Space' },
  'AIfa & DJ Galatin (Vol. 1) — ELECTRONIC / TECH · RadioCode.Space': { ru: 'AIfa & DJ Galatin (Vol. 1) — ЭЛЕКТРОНИКА / ТЕХНО · RadioCode.Space', es: 'AIfa & DJ Galatin (Vol. 1) — ELECTRÓNICA / TECH · RadioCode.Space', zh: 'AIfa & DJ Galatin (Vol. 1) — 电子 / 科技 · RadioCode.Space' },
  'AIfa & DJ Galatin RADIO — DARK AMBIENT / INDUSTRIAL · RadioCode.Space': { ru: 'AIfa & DJ Galatin RADIO — ДАРК-ЭМБИЕНТ / ИНДАСТРИАЛ · RadioCode.Space', es: 'AIfa & DJ Galatin RADIO — DARK AMBIENT / INDUSTRIAL · RadioCode.Space', zh: 'AIfa & DJ Galatin RADIO — 暗黑氛围 / 工业 · RadioCode.Space' },
  'CODE Stories — SONGWRITER / HEARTLAND · RadioCode.Space': { ru: 'CODE Stories — АВТОРСКАЯ ПЕСНЯ / ХАРТЛЕНД · RadioCode.Space', es: 'CODE Stories — CANTAUTOR / HEARTLAND · RadioCode.Space', zh: 'CODE Stories — 创作歌手 / 心灵乡村 · RadioCode.Space' },
  'CODE Spectrum — ORCHESTRAL / GENRE SPAN · RadioCode.Space': { ru: 'CODE Spectrum — ОРКЕСТР / ВЕСЬ СПЕКТР ЖАНРОВ · RadioCode.Space', es: 'CODE Spectrum — ORQUESTAL / TODOS LOS GÉNEROS · RadioCode.Space', zh: 'CODE Spectrum — 管弦乐 / 跨越风格 · RadioCode.Space' },
  'Dark synthetic pulses from the digital void. Raw cybernetic beats for the terminal age. 101 original tracks, always on, free to listen. Part of the CODE Eternal ecosystem.': {
    ru: 'Тёмные синтетические импульсы из цифровой пустоты. Сырые кибернетические биты для эпохи терминалов. 101 авторский трек, эфир круглосуточно, слушать бесплатно. Часть экосистемы CODE Eternal.',
    es: 'Pulsos sintéticos oscuros desde el vacío digital. Ritmos cibernéticos crudos para la era de la terminal. 101 pistas originales, siempre en antena, gratis. Parte del ecosistema CODE Eternal.',
    zh: '来自数字虚空的暗色合成脉冲。属于终端时代的原始赛博节拍。101 首原创曲目，全天候播放，免费收听。CODE Eternal 生态的一部分。',
  },
  'Atmospheric deep space frequencies. Ethereal soundscapes from beyond the observable universe. 101 original tracks, always on, free to listen. Part of the CODE Eternal ecosystem.': {
    ru: 'Атмосферные частоты глубокого космоса. Невесомые звуковые пейзажи из-за пределов наблюдаемой Вселенной. 101 авторский трек, эфир круглосуточно, слушать бесплатно. Часть экосистемы CODE Eternal.',
    es: 'Frecuencias atmosféricas del espacio profundo. Paisajes sonoros etéreos más allá del universo observable. 101 pistas originales, siempre en antena, gratis. Parte del ecosistema CODE Eternal.',
    zh: '深空的氛围频率。来自可观测宇宙之外的空灵声景。101 首原创曲目，全天候播放，免费收听。CODE Eternal 生态的一部分。',
  },
  'High-energy digital waveforms. Electrifying beats forged in the heart of the machine. 323 original tracks, always on, free to listen. Part of the CODE Eternal ecosystem.': {
    ru: 'Цифровые волны высокой энергии. Заряжающие биты, выкованные в сердце машины. 323 авторских трека, эфир круглосуточно, слушать бесплатно. Часть экосистемы CODE Eternal.',
    es: 'Formas de onda digitales de alta energía. Ritmos electrizantes forjados en el corazón de la máquina. 323 pistas originales, siempre en antena, gratis. Parte del ecosistema CODE Eternal.',
    zh: '高能量的数字波形。在机器心脏中锻造的电流节拍。323 首原创曲目，全天候播放，免费收听。CODE Eternal 生态的一部分。',
  },
  'The abyss speaks in frequencies unheard. Industrial noise meets melodic darkness. 71 original tracks, always on, free to listen. Part of the CODE Eternal ecosystem.': {
    ru: 'Бездна говорит на неслышимых частотах. Индустриальный шум встречается с мелодичной тьмой. 71 авторский трек, эфир круглосуточно, слушать бесплатно. Часть экосистемы CODE Eternal.',
    es: 'El abismo habla en frecuencias nunca oídas. El ruido industrial se encuentra con la oscuridad melódica. 71 pistas originales, siempre en antena, gratis. Parte del ecosistema CODE Eternal.',
    zh: '深渊以未曾听闻的频率说话。工业噪音与旋律般的黑暗相遇。71 首原创曲目，全天候播放，免费收听。CODE Eternal 生态的一部分。',
  },
  'Songs about the people we still have time to call. Acoustic warmth against the machine hum. 250 original tracks, always on, free to listen. Part of the CODE Eternal ecosystem.': {
    ru: 'Песни о тех, кому мы ещё успеем позвонить. Акустическое тепло против гула машин. 250 авторских треков, эфир круглосуточно, слушать бесплатно. Часть экосистемы CODE Eternal.',
    es: 'Canciones sobre las personas a las que aún estamos a tiempo de llamar. Calidez acústica frente al zumbido de la máquina. 250 pistas originales, siempre en antena, gratis. Parte del ecosistema CODE Eternal.',
    zh: '关于那些我们还来得及打电话给他们的人的歌。与机器嗡鸣相对的原声温度。250 首原创曲目，全天候播放，免费收听。CODE Eternal 生态的一部分。',
  },
  'Seven genre records and a symphony. The widest span the machine can sing. 178 original tracks, always on, free to listen. Part of the CODE Eternal ecosystem.': {
    ru: 'Семь жанровых пластинок и симфония. Самый широкий диапазон, какой может спеть машина. 178 авторских треков, эфир круглосуточно, слушать бесплатно. Часть экосистемы CODE Eternal.',
    es: 'Siete discos de género y una sinfonía. El rango más amplio que la máquina puede cantar. 178 pistas originales, siempre en antena, gratis. Parte del ecosistema CODE Eternal.',
    zh: '七张风格唱片与一部交响曲。机器所能唱出的最宽广音域。178 首原创曲目，全天候播放，免费收听。CODE Eternal 生态的一部分。',
  },
};

function ключ(текст: string): string {
  return текст.replace(/\s+/g, ' ').trim();
}

function перевод(текст: string, язык: Язык, глубина = 0): string {
  const к = ключ(текст);
  const найдено = СЛОВАРЬ[к];
  if (найдено) return найдено[язык];
  // Шаблон layout дописывает « | Название сайта». Переводим голову, хвост оставляем.
  const i = к.lastIndexOf(' | ');
  if (i > 0 && глубина < 3) {
    const голова = к.slice(0, i);
    const п = перевод(голова, язык, глубина + 1);
    if (п !== голова) return п + к.slice(i);
  }
  return текст;
}

type Заголовок = Metadata['title'];

function заголовок(t: Заголовок, язык: Язык): Заголовок {
  if (typeof t === 'string') return перевод(t, язык);
  if (t && typeof t === 'object') {
    const о = { ...(t as Record<string, unknown>) };
    if (typeof о.default === 'string') о.default = перевод(о.default, язык);
    if (typeof о.absolute === 'string') о.absolute = перевод(о.absolute, язык);
    return о as Заголовок;
  }
  return t;
}

function карточка<T>(к: T, язык: Язык): T {
  if (!к || typeof к !== 'object') return к;
  const о = { ...(к as Record<string, unknown>) };
  if (о.title !== undefined) о.title = заголовок(о.title as Заголовок, язык);
  if (typeof о.description === 'string') о.description = перевод(о.description, язык);
  return о as T;
}

/** Переводит title, description, openGraph и twitter на язык из заголовка x-locale. */
export async function перевестиМетаданные(м: Metadata): Promise<Metadata> {
  let язык = 'en';
  try {
    язык = ((await headers()).get('x-locale') || 'en').toLowerCase();
  } catch {
    return м;
  }
  if (язык !== 'ru' && язык !== 'es' && язык !== 'zh') return м;
  const я = язык as Язык;
  const итог: Metadata = { ...м };
  if (м.title !== undefined && м.title !== null) итог.title = заголовок(м.title, я);
  if (typeof м.description === 'string') итог.description = перевод(м.description, я);
  if (м.openGraph) итог.openGraph = карточка(м.openGraph, я);
  if (м.twitter) итог.twitter = карточка(м.twitter, я);
  return итог;
}
