import { ComplianceCheck, LawMeta, Category } from './threatMatrix';

export const LAW_META_RU: Record<Category, LawMeta> = {
  "ADA / WCAG": {
    "lawName": "ADA Title III / Европейский акт о доступности (EAA) / Ontario AODA",
    "lawUrl": "https://www.ada.gov/resources/web-guidance/",
    "fineAmount": "$75,000–$150,000 (ADA) / €100,000 (EAA) / $100,000 в день (AODA)",
    "reportingConsequence": "Гражданское правоприменение DOJ / Национальные штрафы за надзор за рынком / Аудиты Министерства Онтарио"
  },
  "HIPAA / Medical": {
    "lawName": "HIPAA Privacy Rule / Washington My Health My Data Act (MHMDA)",
    "lawUrl": "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
    "fineAmount": "$50,000–$1,500,000 в год / $7,500 за нарушение MHMDA",
    "reportingConsequence": "Гражданское расследование HHS OCR / Коллективные иски по MHMDA / Уголовное преследование DOJ"
  },
  "CCPA / CPRA": {
    "lawName": "California Consumer Privacy Act (CCPA/CPRA) / California Age-Appropriate Design Code (AB 2273)",
    "lawUrl": "https://oag.ca.gov/privacy/ccpa",
    "fineAmount": "$2,500–$7,500 за нарушение / $7,500 за нарушение в отношении детей (AB 2273)",
    "reportingConsequence": "Аудиты California Privacy Protection Agency (CPPA) / Гражданское правоприменение California AG"
  },
  "FTC Enforcement": {
    "lawName": "Federal Trade Commission Act — Section 5 (Deceptive Practices & Dark Patterns)",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/federal-trade-commission-act",
    "fineAmount": "До $50,120 за нарушение (корректируется ежегодно)",
    "reportingConsequence": "Приказы FTC о правоприменении / Согласия о признании / Обязательные возмещения потребителям / Аудиты"
  },
  "TCPA / Telecom": {
    "lawName": "Telephone Consumer Protection Act (TCPA) / CAN-SPAM Act / FTSA",
    "lawUrl": "https://www.fcc.gov/general/telemarketing-and-robocalls",
    "fineAmount": "$500–$1,500 за звонок/сообщение (TCPA) / $50,120 за email CAN-SPAM",
    "reportingConsequence": "Регуляторные действия FCC / Коллективные иски / Постоянная блокировка домена провайдерами"
  },
  "GDPR": {
    "lawName": "EU GDPR / UK GDPR / ePrivacy Directive",
    "lawUrl": "https://gdpr-info.eu/",
    "fineAmount": "До €20,000,000 / £17.5M или 4% глобального годового оборота",
    "reportingConsequence": "Расследование национальных DPA (CNIL, ICO и др.) / Запреты на обработку / Обязательное уведомление о нарушениях"
  },
  "PCI-DSS / Security": {
    "lawName": "PCI DSS v4.0 — PCI Security Standards Council Requirements",
    "lawUrl": "https://www.pcisecuritystandards.org/standards/pci-dss/",
    "fineAmount": "$5,000–$100,000 в месяц; приостановка обработки карт мерчанта",
    "reportingConsequence": "Штрафы платёжных сетей / Обязательные судебно-медицинские аудиты / Прекращение обработки кредитных карт"
  },
  "State Privacy Laws": {
    "lawName": "US State Privacy Acts (VA VCDPA, TX TDPSA, CO CPA) / NY DFS / NY SHIELD",
    "lawUrl": "https://www.ncsl.org/technology-and-communication/state-laws-related-to-digital-privacy",
    "fineAmount": "$2,500–$7,500 за нарушение (штаты) / до $250,000 (NY DFS)",
    "reportingConsequence": "Гражданские иски AG штатов / Финансовое правоприменение NY DFS / Ответственность по коллективным искам"
  },
  "Financial / Corporate": {
    "lawName": "EU DORA / Gramm-Leach-Bliley Act (GLBA) / Corporate Transparency Act (CTA)",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/gramm-leach-bliley-act",
    "fineAmount": "$500/день за просрочку (FinCEN BOI) / до $100,000 (GLBA) / 1% ежедневного глобального оборота (DORA)",
    "reportingConsequence": "Уголовные санкции FinCEN/IRS / Правоприменение SEC / Регуляторные аудиты европейских ESA"
  },
  "Digital Operations": {
    "lawName": "Canada PIPEDA & Law 25 / Brazil LGPD / Australia Privacy Act / Singapore PDPA / EU AI Act & DSA",
    "lawUrl": "https://laws-lois.justice.gc.ca/eng/acts/P-8.6/",
    "fineAmount": "$100,000 CAD (PIPEDA) / $25M CAD (Quebec) / 2% выручки (LGPD) / $50M AUD (APPs) / €35M или 7% выручки (AI Act)",
    "reportingConsequence": "Расследования OPC Canada / Аудиты ANPD Brazil / Иски OAIC Australia / Правоприменение EU AI Office"
  }
};

export const threatMatrixRu: ComplianceCheck[] = [
  {
    "id": 1,
    "code": "ADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствующие ALT-теги на изображениях",
    "description": "Изображениям не хватает атрибутов альтернативного текста, из-за чего визуальный контент невидим для экранных читалок. Это самая часто подаваемая жалоба на веб-доступность по ADA и самая легкая для доказательства в суде.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.1.1"
  },
  {
    "id": 2,
    "code": "ADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствующие ARIA-метки на интерактивных элементах",
    "description": "Кнопки, ссылки и интерактивные элементы управления не имеют доступных имен через aria-label или aria-labelledby. Пользователи экранных читалок не могут определить назначение этих элементов, что создает барьер для использования.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 4.1.2"
  },
  {
    "id": 3,
    "code": "ADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный коэффициент контрастности цвета",
    "description": "Контраст текста и фона ниже минимального соотношения 4.5:1, требуемого для обычного текста. Пользователи с ослабленным зрением не могут читать содержимое страницы, и это измеримое, автоматизируемое нарушение, часто упоминаемое в письмах с требованиями.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.4.3"
  },
  {
    "id": 4,
    "code": "ADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствует ссылка пропуска навигации",
    "description": "На странице отсутствует ссылка \"перейти к основному содержимому\" как первый фокусируемый элемент. Пользователи клавиатуры и экранных читалок должны проходить через всю навигацию при каждой загрузке страницы, что является документированным барьером доступности.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.1"
  },
  {
    "id": 5,
    "code": "ADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Интерактивные элементы, недоступные с клавиатуры",
    "description": "Интерактивные элементы, такие как выпадающие меню, модальные окна или пользовательские элементы управления, не могут управляться только с помощью клавиатуры. Пользователи, которые не могут использовать мышь, полностью заблокированы от ключевой функциональности.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1"
  },
  {
    "id": 6,
    "code": "ADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствующие метки полей формы",
    "description": "Поля ввода формы не имеют связанных элементов <label> или атрибутов aria-label. Пользователи экранных читалок не могут определить, какая информация запрашивается, что препятствует заполнению формы.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 7,
    "code": "ADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Нарушенная иерархия заголовков",
    "description": "На странице отсутствует элемент H1 или пропускаются уровни заголовков (например, с H1 на H3). Экранные читалки полагаются на структуру заголовков для навигации по странице; нарушенная иерархия затрудняет сканирование и понимание содержимого.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 8,
    "code": "ADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствует атрибут lang в HTML",
    "description": "Элемент <html> не имеет атрибута lang, указывающего язык страницы. Экранные читалки не могут определить правильные правила произношения, что вызывает искаженный речевой вывод для всего содержимого страницы.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 3.1.1"
  },
  {
    "id": 9,
    "code": "ADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Установлен виджет наложения ADA",
    "description": "Установлен сторонний виджет наложения доступности (например, AccessiBe, UserWay). Эти наложения считаются \"красным флагом для тролль-юристов\", не обеспечивают юридическое соответствие и были явно отвергнуты организациями по защите прав инвалидов и судами.",
    "severity": "moderate",
    "reference": "ADA Title III; DOJ Web Guidance 2022"
  },
  {
    "id": 10,
    "code": "ADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступный портал карьеры/подачи заявлений на работу",
    "description": "Страница карьеры или портал подачи заявлений на работу недоступны для пользователей с ограниченными возможностями. Это создает ответственность как по Разделу I ADA (занятость), так и по Разделу III (общественное размещение) и является частой целью серийных истцов по ADA.",
    "severity": "advisory",
    "reference": "ADA Title I § 12112; Title III § 12182"
  },
  {
    "id": 11,
    "code": "HIPAA-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Пиксель Meta на страницах медицинского бронирования",
    "description": "Пиксель отслеживания Facebook/Meta срабатывает на страницах планирования приема или медицинских услуг, передавая данные о состоянии здоровья пациента в Meta. HHS выпустила явное руководство, что это представляет собой недопустимое раскрытие PHI.",
    "severity": "critical",
    "reference": "45 CFR § 164.502; HHS Bulletin Dec 2022"
  },
  {
    "id": 12,
    "code": "HIPAA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Google Analytics на портале пациента без BAA",
    "description": "Google Analytics собирает данные на страницах портала пациента без подписанного соглашения о деловом партнере. Google не подписывает BAA для стандартной Analytics, что делает любое отслеживание портала пациента автоматическим нарушением HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.502(e)"
  },
  {
    "id": 13,
    "code": "HIPAA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствует страница добросовестной оценки",
    "description": "Веб-сайт не предоставляет информацию о праве пациентов на получение добросовестной оценки ожидаемых расходов, как требуется Законом о неожиданных счетах. Пациенты, оплачивающие самостоятельно и не застрахованные, должны быть проинформированы об этом праве перед планированием услуг.",
    "severity": "serious",
    "reference": "No Surprises Act § 112; 45 CFR § 149.610"
  },
  {
    "id": 14,
    "code": "HIPAA-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Пиксели социальных сетей на страницах медицинских услуг",
    "description": "Пиксели отслеживания TikTok, Snapchat или других социальных сетей активны на страницах, описывающих конкретные состояния здоровья или методы лечения. Эти пиксели передают пути URL, которые раскрывают состояния здоровья, которые исследуют пользователи.",
    "severity": "critical",
    "reference": "45 CFR § 164.502; FTC Health Breach Notification Rule"
  },
  {
    "id": 15,
    "code": "HIPAA-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствует BAA с провайдером SaaS форм",
    "description": "Формы приема пациентов или контактные формы обрабатываются через стороннюю платформу SaaS (например, Typeform, JotForm) без подписанного соглашения о деловом партнере. Все данные пациентов, отправленные через эти формы, представляют собой незащищенное раскрытие PHI.",
    "severity": "serious",
    "reference": "45 CFR § 164.502(e); § 164.504(e)"
  },
  {
    "id": 16,
    "code": "HIPAA-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Медицинский чат-бот, собирающий симптомы без согласия",
    "description": "Чат-бот на базе ИИ или по скрипту собирает информацию о симптомах, жалобах на здоровье или медицинскую историю без предоставления авторизации HIPAA или Уведомления о практике конфиденциальности. Это создает неконтролируемую точку сбора PHI.",
    "severity": "serious",
    "reference": "45 CFR § 164.520; § 164.508"
  },
  {
    "id": 17,
    "code": "HIPAA-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незашифрованные формы приема пациентов",
    "description": "Формы приема пациентов отправляются по незашифрованным HTTP-соединениям или хранятся без шифрования в состоянии покоя. HIPAA требует технических мер защиты, включая шифрование электронных PHI при передаче и хранении.",
    "severity": "moderate",
    "reference": "45 CFR § 164.312(a)(2)(iv); § 164.312(e)(1)"
  },
  {
    "id": 18,
    "code": "HIPAA-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствует ссылка на запрос доступа пациента к PHI",
    "description": "На сайте нет механизма для пациентов запросить доступ или скачать свою защищенную медицинскую информацию. HIPAA предоставляет пациентам право доступа к их PHI, и процесс должен быть четко сообщен.",
    "severity": "moderate",
    "reference": "45 CFR § 164.524"
  },
  {
    "id": 19,
    "code": "HIPAA-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Телемедицина через границы штатов без фильтра лицензий",
    "description": "Услуги телемедицины предлагаются пациентам в штатах, где провайдер не лицензирован, без географического фильтра eligibility. Законы о корпоративной практике медицины (CPOM) и требования к лицензированию штатов могут быть нарушены.",
    "severity": "moderate",
    "reference": "State Medical Practice Acts; CPOM Statutes"
  },
  {
    "id": 20,
    "code": "HIPAA-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отслеживание здоровья без согласия MHMDA",
    "description": "Сайт здоровья или wellness отслеживает поведение пользователя без согласия, требуемого Законом Вашингтона \"My Health My Data\" (MHMDA). Этот закон применяется к любой организации, собирающей данные о здоровье от жителей Вашингтона, не только к покрываемым HIPAA.",
    "severity": "advisory",
    "reference": "RCW 19.373 (Washington MHMDA)"
  },
  {
    "id": 21,
    "code": "CCPA-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствует ссылка в футере \"Не продавать или делиться\"",
    "description": "На сайте отсутствует ссылка \"Не продавать или делиться моей личной информацией\" в футере. CCPA требует, чтобы эта ссылка была четкой, заметной и доступной на каждой странице для потребителей из Калифорнии.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120(a)"
  },
  {
    "id": 22,
    "code": "CCPA-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Всплывающее окно скидки по email без уведомления о финансовом стимуле",
    "description": "Всплывающее окно подписки на email предлагает скидку (например, \"10% за подписку\") без уведомления о финансовом стимуле. CCPA/CPRA требует раскрытия существенных условий любой программы финансовых стимулов, связанной со сбором данных.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.125(b)"
  },
  {
    "id": 23,
    "code": "CCPA-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Сторонние трекеры срабатывают до согласия на cookies",
    "description": "Скрипты аналитики, рекламы и социальных сетей выполняются до того, как пользователь дал согласие. Согласно CCPA/CPRA, передача данных третьим сторонам для кросс-контекстной поведенческой рекламы требует как минимум возможности отказа.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120; 11 CCR § 7025"
  },
  {
    "id": 24,
    "code": "CCPA-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствующая или неполная политика конфиденциальности",
    "description": "На сайте отсутствует полная политика конфиденциальности, или существующая политика не раскрывает требуемые CCPA категории: типы собираемой личной информации, цели, передачу третьим сторонам и права потребителей.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.130(a)(5)"
  },
  {
    "id": 25,
    "code": "CCPA-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Страница карьеры без уведомления о конфиденциальности для соискателей",
    "description": "Страница карьеры или подачи заявлений собирает резюме и персональные данные без Уведомления о конфиденциальности для соискателей. CPRA распространил права на конфиденциальность на соискателей и сотрудников, требуя раскрытия в момент сбора.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.100(b); CPRA Employee/Applicant Extension"
  },
  {
    "id": 26,
    "code": "CCPA-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствует механизм запроса на удаление данных",
    "description": "На сайте нет способа для потребителей запросить удаление своей личной информации. CCPA требует как минимум двух методов подачи запросов потребителей, включая бесплатный номер телефона для крупных компаний.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.105; § 1798.130"
  },
  {
    "id": 27,
    "code": "CCPA-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Передача данных третьим сторонам без раскрытия",
    "description": "Личная информация передается сторонним рекламным, аналитическим или обогащающим данным сервисам без раскрытия в политике конфиденциальности. Каждое нераскрытое отношение передачи является отдельным нарушением.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.115"
  },
  {
    "id": 28,
    "code": "CCPA-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствует баннер согласия на cookies для пользователей из Калифорнии",
    "description": "Механизм согласия на cookies не показывается посетителям из Калифорнии. Хотя CCPA не требует баннеров cookies специально, CPPA обозначила приоритет правоприменения для сайтов, использующих отслеживающие cookies без учета сигналов отказа.",
    "severity": "moderate",
    "reference": "11 CCR § 7025; Cal. Civ. Code § 1798.135(e)"
  },
  {
    "id": 29,
    "code": "CCPA-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Автоматическая подписка на маркетинговые коммуникации",
    "description": "Пользователи автоматически подписываются на маркетинговые email или SMS при создании аккаунта или оформлении заказа без явного согласия. Предварительно отмеченные флажки согласия на маркетинг нарушают как принципы CCPA, так и требования CAN-SPAM.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.120; 16 CFR § 316"
  },
  {
    "id": 30,
    "code": "CCPA-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Работа в качестве брокера данных без регистрации",
    "description": "Компания собирает и продает личную информацию потребителей, с которыми у нее нет прямых отношений, что соответствует определению брокера данных, без регистрации в штате, как требуется Texas SB 2105 и California's Delete Act.",
    "severity": "advisory",
    "reference": "TX Bus. & Com. Code § 509; Cal. Civ. Code § 1798.99.82"
  },
  {
    "id": 31,
    "code": "FTC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фальшивый таймер обратного отсчета (Темный паттерн)",
    "description": "Таймер обратного отсчета «ограниченного по времени предложения» сбрасывается при перезагрузке страницы, раскрывая сфабрикованную срочность. FTC классифицирует фальшивые таймеры обратного отсчета как обманный темный паттерн, подлежащий принудительному исполнению согласно Разделу 5.",
    "severity": "critical",
    "reference": "FTC Act § 5; FTC Dark Patterns Report 2022"
  },
  {
    "id": 32,
    "code": "FTC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Обманная зачеркнутая «оригинальная» цена",
    "description": "Отображается зачеркнутая «оригинальная» цена, которая никогда не была фактической ценой продажи, создавая иллюзию скидки. Руководства FTC против обманного ценообразования запрещают фиктивные прежние цены.",
    "severity": "critical",
    "reference": "16 CFR § 233; FTC Act § 5"
  },
  {
    "id": 33,
    "code": "FTC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фальшивый счетчик социального доказательства",
    "description": "Счетчик «X человек просматривают это прямо сейчас» или «осталось только Y в наличии» отображает сфабрикованные или непроверяемые числа. FTC считает искусственное социальное доказательство обманной торговой практикой.",
    "severity": "serious",
    "reference": "FTC Act § 5; FTC Endorsement Guides 16 CFR § 255"
  },
  {
    "id": 34,
    "code": "FTC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Непроверенные отзывы клиентов",
    "description": "Отзывы клиентов отображаются без проверки покупки или подлинности. Правило FTC 2024 об использовании потребительских отзывов запрещает фальшивые, купленные или стимулированные отзывы без четкого раскрытия.",
    "severity": "critical",
    "reference": "16 CFR § 465 (FTC Review Rule 2024)"
  },
  {
    "id": 35,
    "code": "FTC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Отмена подписки сложнее, чем регистрация",
    "description": "Отмена подписки требует больше шагов, телефонных звонков или препятствий, чем процесс первоначальной регистрации. Правило FTC «Click-to-Cancel» требует, чтобы отмена была такой же простой, как регистрация.",
    "severity": "serious",
    "reference": "16 CFR § 425 (FTC Click-to-Cancel Rule 2024)"
  },
  {
    "id": 36,
    "code": "FTC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Отсутствие раскрытия информации об аффилированности",
    "description": "Партнерские ссылки и амбасадорские комиссии не раскрываются четко и заметно над первой партнерской ссылкой на странице. FTC требует раскрытия материальной связи до того, как потребитель столкнется с рекомендацией.",
    "severity": "serious",
    "reference": "16 CFR § 255.5; FTC Endorsement Guides"
  },
  {
    "id": 37,
    "code": "FTC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые оплаченные отзывы",
    "description": "Отзывы клиентов или инфлюенсеров отображаются без указания того, что рецензент получил компенсацию, бесплатные продукты или другие стимулы. Каждый нераскрытый оплаченный отзыв может повлечь штрафы до $50,000.",
    "severity": "moderate",
    "reference": "16 CFR § 255.1; FTC Endorsement Guides"
  },
  {
    "id": 38,
    "code": "FTC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Необоснованные экологические заявления",
    "description": "В маркетинговых текстах используются термины вроде «экологичный», «углеродно-нейтральный» или «устойчивый» без сторонней сертификации или обоснования. Зеленые руководства FTC требуют компетентных и надежных научных доказательств для экологических заявлений.",
    "severity": "moderate",
    "reference": "16 CFR § 260 (FTC Green Guides)"
  },
  {
    "id": 39,
    "code": "FTC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Бесплатная пробная версия автоматически конвертируется без раскрытия",
    "description": "Бесплатная пробная версия автоматически конвертируется в платную подписку без четкого и заметного раскрытия условий конвертации, даты выставления счета и суммы до предоставления потребителем платежной информации.",
    "severity": "moderate",
    "reference": "FTC Act § 5; Restore Online Shoppers' Confidence Act (ROSCA)"
  },
  {
    "id": 40,
    "code": "FTC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Ценообразование по принципу «приманка и подмена»",
    "description": "Цена, указанная в рекламе или результатах поиска, отличается от цены, отображаемой при оформлении заказа, из-за добавленных сборов, других версий продукта или измененных условий. Это классический обман по принципу «приманка и подмена».",
    "severity": "advisory",
    "reference": "FTC Act § 5; 16 CFR § 238 (Bait Advertising)"
  },
  {
    "id": 41,
    "code": "TCPA-001",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "В форме обратной связи отсутствует флажок согласия на SMS",
    "description": "Форма обратной связи или генерации лидов собирает номера телефонов без явного флажка согласия на SMS-коммуникации. Требования операторов A2P 10DLC и TCPA требуют предварительного письменного согласия на маркетинговые текстовые сообщения.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227(b); A2P 10DLC Guidelines"
  },
  {
    "id": 42,
    "code": "TCPA-002",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Маркетинговые SMS отправляются после 20:00 по местному времени",
    "description": "Автоматизированные маркетинговые текстовые сообщения отправляются вне разрешенных часов. Закон Флориды о телефонных обращениях (FTSA) ограничивает отправку текстов с 8:00 до 20:00 по местному времени, другие штаты вводят аналогичные окна.",
    "severity": "critical",
    "reference": "FL Stat. § 501.059 (FTSA); 47 U.S.C. § 227"
  },
  {
    "id": 43,
    "code": "TCPA-003",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие механизма STOP в маркетинговых SMS",
    "description": "Маркетинговые текстовые сообщения не включают инструкции по отказу от подписки (например, «Ответьте STOP, чтобы отписаться»). Руководства CTIA и TCPA требуют, чтобы каждое маркетинговое SMS содержало четкий механизм отказа.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227; CTIA Short Code Monitoring Handbook"
  },
  {
    "id": 44,
    "code": "TCPA-004",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Маркетинговые письма без физического адреса",
    "description": "Коммерческие электронные письма не содержат действительный физический почтовый адрес отправителя. CAN-SPAM требует, чтобы каждое коммерческое письмо содержало текущий адрес отправителя или зарегистрированный абонентский ящик.",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(5)(A); 16 CFR § 316.2"
  },
  {
    "id": 45,
    "code": "TCPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Маркетинговые письма без ссылки для отписки",
    "description": "Коммерческие письма не имеют функционирующего механизма отписки. CAN-SPAM требует четкого и заметного метода отказа в каждом коммерческом сообщении, и запросы на отказ должны быть выполнены в течение 10 рабочих дней.",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(3); 16 CFR § 316.5"
  },
  {
    "id": 46,
    "code": "TCPA-006",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "SMS для брошенной корзины без предварительного письменного согласия",
    "description": "Текстовые сообщения для восстановления брошенной корзины отправляются потребителям, которые не предоставили предварительное письменное согласие на маркетинговые тексты. Отказ от корзины не является согласием согласно TCPA.",
    "severity": "serious",
    "reference": "47 U.S.C. § 227(b)(1)(A)(iii)"
  },
  {
    "id": 47,
    "code": "TCPA-007",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Автодозвон без явного согласия по TCPA",
    "description": "Используется автоматическая система телефонного дозвона (ATDS) для совершения звонков или отправки текстов без получения предварительного явного согласия. TCPA запрещает нежелательные автодозвоны или предварительно записанные звонки на мобильные телефоны.",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227(b)(1)(A)"
  },
  {
    "id": 48,
    "code": "TCPA-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие регистрации кампании A2P 10DLC",
    "description": "Бизнес-SMS сообщения отправляются через длинные коды (10-значные номера) без надлежащей регистрации кампании A2P 10DLC у операторов. Незарегистрированные кампании подвергаются фильтрации сообщений, блокировке и штрафам от операторов за каждое сообщение.",
    "severity": "moderate",
    "reference": "CTIA 10DLC Policy; Carrier A2P Guidelines"
  },
  {
    "id": 49,
    "code": "TCPA-009",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Массовая SMS без обработчика ключевого слова STOP",
    "description": "Система массовой SMS не обрабатывает автоматически ответы с ключевым словом STOP для немедленного прекращения рассылки. Невыполнение запросов на отказ от подписки подвергает бизнес риску коллективного иска по TCPA с возмещением $500–$1500 за сообщение.",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227; CTIA Messaging Principles"
  },
  {
    "id": 50,
    "code": "TCPA-010",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Предварительно записанные голосовые сообщения без согласия",
    "description": "Предварительно записанные или искусственные голосовые маркетинговые сообщения доставляются потребителям без предварительного письменного согласия. Положения TCPA о робозвонках предусматривают штрафные санкции в размере $500–$1500 за звонок.",
    "severity": "advisory",
    "reference": "47 U.S.C. § 227(b)(1)(B)"
  },
  {
    "id": 51,
    "code": "GDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Пиксель Meta срабатывает до согласия на cookies",
    "description": "Пиксель отслеживания Facebook/Meta загружается и передает данные пользователя до того, как посетитель взаимодействовал с баннером согласия на cookies. Согласно GDPR, несущественное отслеживание требует предварительного, информированного и явного согласия.",
    "severity": "critical",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 52,
    "code": "GDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие баннера согласия на cookies для посетителей из ЕС",
    "description": "На сайте не отображается механизм согласия на cookies для посетителей из стран-членов ЕС. Директива ePrivacy и GDPR требуют информированного согласия перед размещением несущественных cookies или технологий отслеживания.",
    "severity": "critical",
    "reference": "GDPR Article 7; ePrivacy Directive Article 5(3)"
  },
  {
    "id": 53,
    "code": "GDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Google Analytics без согласия по GDPR",
    "description": "Google Analytics собирает данные посетителей из ЕС без получения предварительного согласия. Несколько органов по защите данных ЕС постановили, что передача данных Google Analytics является незаконной обработкой и трансграничной передачей данных.",
    "severity": "critical",
    "reference": "GDPR Article 44; Austrian DSB & French CNIL Rulings 2022"
  },
  {
    "id": 54,
    "code": "GDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие соглашения об обработке данных с обработчиками",
    "description": "Сторонние сервисы, обрабатывающие персональные данные от имени контроллера, работают без подписанного соглашения об обработке данных. GDPR требует письменных контрактов, определяющих объем, цель обработки и обязательства по безопасности.",
    "severity": "serious",
    "reference": "GDPR Article 28(3)"
  },
  {
    "id": 55,
    "code": "GDPR-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие процесса уведомления о нарушении в течение 72 часов",
    "description": "В организации нет документированной процедуры уведомления надзорного органа в течение 72 часов с момента обнаружения нарушения персональных данных. Невыполнение уведомления является отдельным нарушением, подлежащим штрафу.",
    "severity": "serious",
    "reference": "GDPR Article 33"
  },
  {
    "id": 56,
    "code": "GDPR-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Трансграничная передача данных без гарантий",
    "description": "Персональные данные резидентов ЕС передаются на серверы или сервисы в США без стандартных договорных положений (SCC), решений об адекватности или других утвержденных механизмов передачи после решения Schrems II.",
    "severity": "serious",
    "reference": "GDPR Articles 44–49; Schrems II (C-311/18)"
  },
  {
    "id": 57,
    "code": "GDPR-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Встраивание YouTube, приводящее к утечке данных о просмотре видео",
    "description": "Стандартные встраивания YouTube в сочетании с пикселями отслеживания создают утечку данных о просмотре видео, аналогичную нарушениям VPPA. Стандартное встраивание YouTube передает привычки просмотра Google до получения согласия.",
    "severity": "moderate",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 58,
    "code": "GDPR-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие механизма \"Право на забвение\"",
    "description": "На сайте нет возможности для субъектов данных запросить удаление их персональных данных. Право на стирание по GDPR требует от контроллеров удаления персональных данных по запросу, если нет преобладающего правового основания.",
    "severity": "moderate",
    "reference": "GDPR Article 17"
  },
  {
    "id": 59,
    "code": "GDPR-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие опубликованной политики хранения данных",
    "description": "Политика конфиденциальности не указывает, как долго хранятся персональные данные или критерии, используемые для определения сроков хранения. GDPR требует прозрачного информирования о сроках хранения на момент сбора данных.",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a); Article 5(1)(e)"
  },
  {
    "id": 60,
    "code": "GDPR-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Баннер согласия использует предварительно отмеченные флажки",
    "description": "Баннер согласия на cookies представляет предварительно отмеченные флажки согласия для аналитических или маркетинговых cookies. CJEU постановил в деле Planet49, что предварительно отмеченные флажки не являются действительным согласием согласно GDPR.",
    "severity": "advisory",
    "reference": "GDPR Article 4(11); CJEU Planet49 (C-673/17)"
  },
  {
    "id": 61,
    "code": "PCI-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствует заголовок Content-Security-Policy",
    "description": "Веб-сайт не устанавливает HTTP-заголовок Content-Security-Policy, что делает его уязвимым для атак межсайтового скриптинга (XSS) и инъекции данных. CSP — критически важный уровень защиты для предотвращения несанкционированного выполнения скриптов.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP CSP Cheat Sheet"
  },
  {
    "id": 62,
    "code": "PCI-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "API-ключи раскрыты в исходном коде фронтенда",
    "description": "API-ключи для сервисов вроде Google Maps, Stripe или SendGrid видны в клиентском JavaScript-коде. Раскрытые секретные ключи могут быть собраны ботами и использованы для несанкционированного доступа к API, мошенничества с оплатой или эксфильтрации данных.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; OWASP API Security Top 10"
  },
  {
    "id": 63,
    "code": "PCI-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Форма оплаты без токенизации",
    "description": "Номера кредитных карт собираются напрямую в поля формы на сервере мерчанта, а не через PCI-совместимый сервис токенизации (например, Stripe Elements, Braintree). Это помещает весь сайт в область действия PCI-DSS.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 3.4; Req. 4.2"
  },
  {
    "id": 64,
    "code": "PCI-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствует HTTPS на страницах с формами или оплатой",
    "description": "Страницы, содержащие формы, поля входа или платежные данные, обслуживаются по незашифрованному HTTP. Все данные, отправленные на этих страницах, могут быть перехвачены любым посредником в сети.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1"
  },
  {
    "id": 65,
    "code": "PCI-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Смешанный контент на HTTPS-страницах",
    "description": "Страница обслуживается по HTTPS, но загружает подресурсы (изображения, скрипты, таблицы стилей) по незащищенному HTTP. Смешанный контент подрывает гарантию безопасности HTTPS и может быть использован для атак типа «человек посередине».",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; OWASP Transport Layer Security"
  },
  {
    "id": 66,
    "code": "PCI-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Открытый листинг директорий",
    "description": "Серверные директории, такие как /wp-content/uploads/, доступны для просмотра, что раскрывает загруженные файлы, внутренние документы и потенциально конфиденциальные данные. Листинг директорий должен быть отключен на всех путях, доступных через веб.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; CIS Apache Benchmark"
  },
  {
    "id": 67,
    "code": "PCI-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Включена конечная точка XML-RPC",
    "description": "Конечная точка WordPress XML-RPC (xmlrpc.php) общедоступна и отвечает на запросы. Эта конечная точка известна как вектор для атак по усилению brute-force и злоупотреблений DDoS.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.3; CVE-2015-5623"
  },
  {
    "id": 68,
    "code": "PCI-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Устаревшая CMS с известными CVE",
    "description": "Система управления контентом (WordPress, Magento, Drupal) работает на устаревшей версии с публично раскрытыми уязвимостями безопасности. Необновленные установки CMS — основной вектор компрометации веб-сайтов.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.1; Req. 6.3.3"
  },
  {
    "id": 69,
    "code": "PCI-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Сторонние скрипты без SRI",
    "description": "Внешние JavaScript-файлы загружаются без хэшей Subresource Integrity (SRI). Если сторонний CDN или хост скриптов скомпрометирован, вредоносный код может быть внедрен на страницу без обнаружения.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; W3C SRI Specification"
  },
  {
    "id": 70,
    "code": "PCI-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Формы без защиты CAPTCHA",
    "description": "Контактные формы, страницы входа и регистрации не имеют CAPTCHA или механизмов обнаружения ботов. Незащищенные формы уязвимы для stuffing учетных данных, спам-инъекций и автоматизированных злоупотреблений в большом масштабе.",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 6.2.4; OWASP Automated Threats"
  },
  {
    "id": 71,
    "code": "STATE-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CIPA: Запись чат-бота без согласия",
    "description": "Сторонний чат-бот записывает и хранит транскрипты разговоров, не информируя пользователей и не получая согласия. Согласно California Invasion of Privacy Act (CIPA), это является незаконным прослушиванием с штрафом $5,000 за каждый диалог.",
    "severity": "critical",
    "reference": "Cal. Penal Code § 631; § 632.7 (CIPA)"
  },
  {
    "id": 72,
    "code": "STATE-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "BIPA: Виртуальная примерка без согласия на биометрию",
    "description": "Функция виртуальной примерки или сканирования лица собирает биометрические идентификаторы без получения информированного письменного согласия, требуемого Illinois BIPA. Нарушения влекут за собой установленные законом убытки в размере $1,000–$5,000 за каждое сканирование.",
    "severity": "critical",
    "reference": "740 ILCS 14/15 (Illinois BIPA)"
  },
  {
    "id": 73,
    "code": "STATE-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Utah AI Act: ИИ-чатбот не раскрывает свою идентичность ИИ",
    "description": "ИИ-чатбот или виртуальный помощник не идентифицирует себя как искусственный интеллект при прямом вопросе пользователя. Utah AI Policy Act требует, чтобы ИИ-системы раскрывали свою нечеловеческую природу по запросу.",
    "severity": "serious",
    "reference": "Utah Code § 13-72 (Utah AI Policy Act 2024)"
  },
  {
    "id": 74,
    "code": "STATE-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CA BOT Act: ИИ использует человеческое имя без раскрытия",
    "description": "ИИ-чатбот или автоматизированная учетная запись использует человеческое имя, аватар или персону, не раскрывая, что это не человек. California BOT Act (SB 1001) требует четкого раскрытия, когда ИИ выдает себя за человека в онлайн-взаимодействиях.",
    "severity": "critical",
    "reference": "Cal. Bus. & Prof. Code § 17941 (SB 1001)"
  },
  {
    "id": 75,
    "code": "STATE-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Proposition 65: Отсутствует предупреждение о токсичных веществах",
    "description": "Продукты, отправляемые в Калифорнию, содержат химические вещества, перечисленные в Proposition 65, без требуемого предупреждения «известно, что вызывает рак или вред репродуктивной системе». Нарушения влекут штрафы в размере $2,500 в день за каждое нарушение.",
    "severity": "serious",
    "reference": "Cal. Health & Safety Code § 25249.6 (Proposition 65)"
  },
  {
    "id": 76,
    "code": "STATE-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CA Автопродление: Нет напоминания перед ежегодным списанием",
    "description": "Ежегодные подписки продлеваются без отправки напоминания по email перед списанием. Закон Калифорнии об автоматическом продлении требует от бизнеса предоставлять четкое напоминание с инструкциями по отмене перед каждым продлением.",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 17601 (ARL)"
  },
  {
    "id": 77,
    "code": "STATE-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Недостаточная проверка возраста для ограниченных продуктов",
    "description": "Проверка возраста для алкоголя, вейпов или CBD-продуктов основана на простой кнопке \"Да, мне 21\" без реальной верификации личности. Множество штатов требуют надежной проверки возраста, выходящей за рамки самоутверждения, для продажи ограниченных продуктов.",
    "severity": "moderate",
    "reference": "State Alcohol Control Acts; 27 CFR § 6"
  },
  {
    "id": 78,
    "code": "STATE-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "SB 478: Скрытые сервисные сборы при оформлении заказа",
    "description": "Обязательные сборы, сервисные платежи или надбавки раскрываются только при оформлении заказа, а не включаются в рекламируемую цену. SB 478 Калифорнии (Junk Fee Ban) запрещает скрытые сборы, не раскрытые заранее.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1770(a)(29) (SB 478)"
  },
  {
    "id": 79,
    "code": "STATE-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "NY SHIELD Act: Недостаточная защита данных",
    "description": "Компания собирает личную информацию жителей Нью-Йорка без внедрения разумных мер защиты данных, как требует SHIELD Act. Административные, технические и физические меры защиты должны быть задокументированы.",
    "severity": "moderate",
    "reference": "NY Gen. Bus. Law § 899-bb (SHIELD Act)"
  },
  {
    "id": 80,
    "code": "STATE-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Вакансии без указания диапазона зарплаты",
    "description": "Объявления о вакансиях не включают диапазоны компенсаций, как требуется законами о прозрачности оплаты в Калифорнии, Нью-Йорке, Колорадо и Вашингтоне. Штрафы могут достигать $10,000 за каждое несоответствующее объявление.",
    "severity": "advisory",
    "reference": "Cal. Lab. Code § 432.3; NY Lab. Law § 194-b; CO SB 19-085"
  },
  {
    "id": 81,
    "code": "FIN-001",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "GLBA: Чувствительные финансовые документы через незащищенную почту",
    "description": "Компания принимает чувствительные финансовые документы (налоговые декларации, банковские выписки, SSN) через стандартную незашифрованную электронную почту. Правило Safeguards GLBA требует от финансовых учреждений внедрять безопасные методы передачи данных клиентов.",
    "severity": "critical",
    "reference": "16 CFR § 314 (GLBA Safeguards Rule)"
  },
  {
    "id": 82,
    "code": "FIN-002",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FinCEN BOI: Отсутствие отчета о бенефициарных владельцах",
    "description": "ООО или корпорация не подала отчет о бенефициарных владельцах в FinCEN, как требуется Corporate Transparency Act. Несоблюдение влечет штрафы в размере $500 в день, до $10,000, плюс возможную уголовную ответственность.",
    "severity": "critical",
    "reference": "31 U.S.C. § 5336; 31 CFR § 1010.380 (CTA/BOI)"
  },
  {
    "id": 83,
    "code": "FIN-003",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FINRA: Личная почта для инвестиционных коммуникаций",
    "description": "Инвестиционный консультант или брокер-дилер использует личный Gmail или незаархивированную почту для общения с клиентами вместо контролируемой и архивируемой корпоративной системы. FINRA требует сохранения и надзора за всеми деловыми коммуникациями.",
    "severity": "critical",
    "reference": "FINRA Rule 3110; SEC Rule 17a-4"
  },
  {
    "id": 84,
    "code": "FIN-004",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Отсутствие номера лицензии подрядчика на сайте",
    "description": "На сайте лицензированного подрядчика не отображается номер государственной лицензии подрядчика. Большинство штатов требуют указания номера лицензии во всей рекламе и деловых коммуникациях, с штрафами от $2,000 до $5,000.",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 7030.5; State Contractor License Acts"
  },
  {
    "id": 85,
    "code": "FIN-005",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Отсутствие агента DMCA или политики удаления контента",
    "description": "На сайте не зарегистрирован агент DMCA в U.S. Copyright Office и не опубликована страница политики DMCA takedown. Без этого компания теряет защиту safe harbor для пользовательского контента.",
    "severity": "serious",
    "reference": "17 U.S.C. § 512(c)(2) (DMCA Safe Harbor)"
  },
  {
    "id": 86,
    "code": "FIN-006",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Отсутствие арбитражной оговорки в Условиях обслуживания",
    "description": "В Условиях обслуживания отсутствует отказ от коллективных исков и обязательная арбитражная оговорка. Без этих положений компания подвержена коллективным искам по любым потребительским спорам.",
    "severity": "serious",
    "reference": "9 U.S.C. § 2 (Federal Arbitration Act)"
  },
  {
    "id": 87,
    "code": "FIN-007",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Политика возврата не отображается заметно",
    "description": "Закон Калифорнии требует, чтобы политика отсутствия возврата или ограниченного возврата была заметно отображена в точке продажи. Если не отображена, потребители имеют право на полный возврат в течение 30 дней независимо от намерений продавца.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1723"
  },
  {
    "id": 88,
    "code": "FIN-008",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Надбавка за кредитную карту без предварительного уведомления",
    "description": "Надбавка за кредитную карту или комиссия за удобство добавляется при оформлении заказа без предварительного уведомления в точке входа. Множество штатов требуют предварительного размещения/раскрытия, а правила карточных сетей ограничивают надбавки до 3% с обязательным раскрытием.",
    "severity": "moderate",
    "reference": "Visa Core Rules § 5.6.2; State Surcharge Statutes"
  },
  {
    "id": 89,
    "code": "FIN-009",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Отсутствует SEC Form CRS для инвестиционных консультантов",
    "description": "На сайте зарегистрированного инвестиционного консультанта не публикуется Form CRS (Client Relationship Summary), как требует SEC Regulation Best Interest. Form CRS должен быть предоставлен розничным инвесторам и сделан общедоступным.",
    "severity": "moderate",
    "reference": "SEC Rule 17a-14; Regulation Best Interest"
  },
  {
    "id": 90,
    "code": "FIN-010",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Генерация лидов по страхованию без необходимых раскрытий",
    "description": "Сайт генерирует страховые котировки или лиды без требуемых штатом раскрытий о характере услуги, компенсационных соглашениях и статусе лицензии. Множество штатов требуют конкретных раскрытий для генераторов страховых лидов.",
    "severity": "advisory",
    "reference": "State Insurance Codes; NAIC Producer Licensing Model Act"
  },
  {
    "id": 91,
    "code": "OPS-001",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствует запись DMARC",
    "description": "Домен не имеет DNS-записи DMARC (Domain-based Message Authentication, Reporting & Conformance). Без DMARC письма все чаще отклоняются или попадают в спам Gmail, Yahoo и другими крупными провайдерами, применяющими политики DMARC.",
    "severity": "critical",
    "reference": "RFC 7489; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 92,
    "code": "OPS-002",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствует запись SPF",
    "description": "Домен не имеет DNS-записи SPF (Sender Policy Framework), что делает его уязвимым для подделки электронной почты. Злоумышленники могут отправлять письма, якобы от имени домена, что позволяет проводить фишинговые атаки против клиентов и партнеров.",
    "severity": "critical",
    "reference": "RFC 7208; Google Sender Guidelines 2024"
  },
  {
    "id": 93,
    "code": "OPS-003",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Нерабочие исходящие ссылки на истекшие домены",
    "description": "На сайте содержатся ссылки, ведущие на истекшие, припаркованные или потенциально вредоносные домены. Нерабочие исходящие ссылки наносят ущерб SEO-авторитету и могут перенаправлять пользователей на фишинговые или вредоносные сайты, если истекший домен будет перерегистрирован злоумышленниками.",
    "severity": "serious",
    "reference": "Google Search Quality Guidelines; OWASP Broken Link Hijacking"
  },
  {
    "id": 94,
    "code": "OPS-004",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Устаревшие скрипты отслеживания от прекращенных сервисов",
    "description": "Сайт загружает JavaScript из сервисов, которые были прекращены, приобретены или заброшены. Эти зомби-скрипты тратят время загрузки страницы, могут нарушать функциональность и представляют риск безопасности цепочки поставок, если домен будет перерегистрирован.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP Supply Chain Security"
  },
  {
    "id": 95,
    "code": "OPS-005",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствует аутентификация DKIM для электронной почты",
    "description": "Домен не публикует записи DKIM (DomainKeys Identified Mail) для аутентификации электронной почты. Без DKIM принимающие почтовые серверы не могут проверить, что содержимое письма не было изменено при передаче, что снижает доставляемость.",
    "severity": "critical",
    "reference": "RFC 6376; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 96,
    "code": "OPS-006",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Устаревший год авторского права в футере",
    "description": "В футере сайта отображается устаревший год авторского права, что сигнализирует посетителям, поисковым системам и потенциальным истцам, что сайт может быть заброшен или не поддерживаться. Это подрывает доверие и может негативно повлиять на поисковые рейтинги.",
    "severity": "serious",
    "reference": "Google Search Quality Evaluator Guidelines § 4.5"
  },
  {
    "id": 97,
    "code": "OPS-007",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствует robots.txt и карта сайта",
    "description": "На сайте отсутствует файл robots.txt и/или XML-карта сайта. Без них поисковые системы могут неэффективно сканировать сайт, индексировать конфиденциальные страницы или полностью пропускать важный контент, что напрямую влияет на видимость в органическом поиске.",
    "severity": "moderate",
    "reference": "RFC 9309 (robots.txt); Sitemaps.org Protocol"
  },
  {
    "id": 98,
    "code": "OPS-008",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Плохие цели касания на мобильных устройствах",
    "description": "Интерактивные элементы (кнопки, ссылки, поля форм) меньше 48x48 CSS-пикселей или расположены слишком близко друг к другу, что вызывает частые ошибочные касания на мобильных устройствах. Это одновременно проблема UX и нарушение доступности WCAG 2.5.5.",
    "severity": "moderate",
    "reference": "WCAG 2.5.8; Google Mobile Usability Guidelines"
  },
  {
    "id": 99,
    "code": "OPS-009",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Контактная форма без ограничения скорости",
    "description": "Контактная форма не имеет ограничения скорости, honeypot или механизма предотвращения злоупотреблений. Незащищенные формы регулярно используются для спам-инъекций, ретрансляции фишинга и атак типа «отказ в обслуживании» на обработчик формы.",
    "severity": "moderate",
    "reference": "OWASP Automated Threats; PCI-DSS v4.0 Req. 6.2.4"
  },
  {
    "id": 100,
    "code": "OPS-010",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствующий или истекший SSL-сертификат",
    "description": "На сайте отсутствует действительный SSL/TLS-сертификат или срок действия сертификата истек. Браузеры отображают заметные предупреждения о безопасности, которые отпугивают посетителей, а поисковые системы понижают не-HTTPS сайты в рейтингах.",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; Google HTTPS Ranking Signal"
  },
  {
    "id": 101,
    "code": "ADA-101",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие информации о доступности продуктов/услуг",
    "description": "Цифровые сервисы, регулируемые EAA, не предоставляют четкую информацию о доступности и функции в своем цифровом интерфейсе, нарушая требования Директивы ЕС 2019/882 для электронной коммерции и банковского дела.",
    "severity": "serious",
    "reference": "Directive (EU) 2019/882 Art. 4"
  },
  {
    "id": 102,
    "code": "ADA-102",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Несоответствие процессов обратной связи публичным требованиям",
    "description": "Механизм обратной связи на сайте недоступен для лиц с инвалидностью, нарушая стандарты обслуживания клиентов AODA для организаций в Онтарио.",
    "severity": "moderate",
    "reference": "AODA IASR Sec. 7"
  },
  {
    "id": 103,
    "code": "COP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконный сбор персональной информации от детей",
    "description": "Сайт собирает персональные данные (имена, адреса электронной почты, отслеживающие файлы cookie) от пользователей младше 13 лет без получения проверяемого согласия родителей, нарушая требования COPPA.",
    "severity": "critical",
    "reference": "16 CFR Part 312 (COPPA)"
  },
  {
    "id": 104,
    "code": "PIP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контактной информации уполномоченного по вопросам конфиденциальности",
    "description": "Сайт, ориентированный на Канаду, не публикует имя или контактные данные назначенного Уполномоченного по вопросам конфиденциальности, ответственного за соблюдение PIPEDA.",
    "severity": "moderate",
    "reference": "PIPEDA Schedule 1 Sec. 4.1"
  },
  {
    "id": 105,
    "code": "PIP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неопределенные цели сбора персональных данных",
    "description": "Поля формы собирают данные без четкого указания конкретной и ограниченной цели сбора в момент или до момента сбора в соответствии с требованиями PIPEDA.",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1 Sec. 4.2"
  },
  {
    "id": 106,
    "code": "LGP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Не назначен сотрудник по защите данных (DPO)",
    "description": "Сайт, ориентированный на Бразилию, не указывает и не предоставляет контактные данные своего DPO (Encarregado), нарушая статью 41 LGPD.",
    "severity": "serious",
    "reference": "LGPD Art. 41"
  },
  {
    "id": 107,
    "code": "LGP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие действительного правового основания для обработки",
    "description": "Сайт обрабатывает персональные данные без указания явного правового основания (например, согласие, законный интерес) для каждой операции обработки в соответствии с LGPD.",
    "severity": "critical",
    "reference": "LGPD Art. 7"
  },
  {
    "id": 108,
    "code": "POP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Прямой маркетинг без согласия на подписку",
    "description": "Сайт использует предварительно отмеченные флажки согласия или формы отказа для электронного прямого маркетинга, нарушая требования POPIA об opt-in для потребителей ЮАР.",
    "severity": "critical",
    "reference": "POPIA Sec. 69"
  },
  {
    "id": 109,
    "code": "POP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконное раскрытие трансграничной передачи данных",
    "description": "Южноафриканский сайт передает персональные данные за пределы ЮАР без обеспечения адекватного уровня защиты данных в стране-получателе или без раскрытия этого пользователю.",
    "severity": "serious",
    "reference": "POPIA Sec. 72"
  },
  {
    "id": 110,
    "code": "APP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее заявление о раскрытии данных за рубежом",
    "description": "Сайт, ориентированный на Австралию, не указывает в своей политике конфиденциальности, планирует ли он раскрывать персональную информацию зарубежным получателям и, если да, в каких странах.",
    "severity": "serious",
    "reference": "APP 1.4(g)"
  },
  {
    "id": 111,
    "code": "APP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие опции анонимного/псевдонимного взаимодействия",
    "description": "Сайт принуждает пользователей идентифицировать себя для общих запросов, когда это не является практически или юридически необходимым, нарушая Австралийский принцип конфиденциальности 2.",
    "severity": "moderate",
    "reference": "APP 2"
  },
  {
    "id": 112,
    "code": "PDP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Непредоставление информации о запросах на доступ/исправление",
    "description": "Сингапурский сайт не указывает, как пользователи могут запросить доступ к своим персональным данным или их исправление в своих раскрытиях конфиденциальности.",
    "severity": "serious",
    "reference": "PDPA Sec. 21 & 22"
  },
  {
    "id": 113,
    "code": "PDP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неразумные условия, принуждающие к согласию на обработку персональных данных",
    "description": "Сайт требует согласия на сбор персональных данных сверх разумного для предоставления продукта или услуги, нарушая требования PDPA к согласию.",
    "severity": "serious",
    "reference": "PDPA Sec. 14(2)"
  },
  {
    "id": 114,
    "code": "AIA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Непомеченный вывод генеративного ИИ / дипфейки",
    "description": "Сайт представляет текст, аудио или видео, сгенерированные ИИ (дипфейки), без маркировки в машиночитаемом формате как сгенерированные ИИ, нарушая правила прозрачности EU AI Act.",
    "severity": "critical",
    "reference": "AI Act Art. 52(3)"
  },
  {
    "id": 115,
    "code": "AIA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия информации о взаимодействии с ИИ",
    "description": "Сайт использует систему ИИ (например, чат-бота поддержки клиентов) для взаимодействия с физическими лицами без информирования их о том, что они взаимодействуют с ИИ, нарушая требования прозрачности.",
    "severity": "critical",
    "reference": "AI Act Art. 52(1)"
  },
  {
    "id": 116,
    "code": "DSA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обманные UI-паттерны (темные паттерны) в дизайне",
    "description": "Сайт использует темные паттерны, которые искажают или ухудшают способность пользователя принимать автономные и информированные решения (например, сложные процессы отписки, обманные всплывающие окна согласия).",
    "severity": "critical",
    "reference": "DSA Art. 25"
  },
  {
    "id": 117,
    "code": "DSA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие единой точки контакта для органов власти",
    "description": "Поставщик цифровых услуг не публикует прямую, электронную и легко доступную единую точку контакта для коммуникации с органами ЕС.",
    "severity": "serious",
    "reference": "DSA Art. 11"
  },
  {
    "id": 118,
    "code": "DMA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконное объединение данных между сервисами",
    "description": "Платформы масштаба gatekeeper объединяют персональные данные из своей основной платформы с данными из других сервисов без специального согласия пользователя, нарушая требования DMA.",
    "severity": "critical",
    "reference": "DMA Art. 5(2)"
  },
  {
    "id": 119,
    "code": "STA-101",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Обманный дизайн, поощряющий обмен данными детей",
    "description": "Сайт использует темные паттерны, чтобы подтолкнуть детей к предоставлению персональной информации сверх необходимого, нарушая требования California AB 2273.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 120,
    "code": "STA-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процесса обжалования прав потребителей",
    "description": "Политика конфиденциальности не объясняет процесс обжалования отказа в принятии мер по запросу о правах на конфиденциальность, нарушая Virginia VCDPA и Texas TDPSA.",
    "severity": "serious",
    "reference": "Va. Code § 59.1-573 / Tex. Bus. & Com. Code § 541.104"
  },
  {
    "id": 121,
    "code": "STA-103",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие opt-in для обработки конфиденциальных данных",
    "description": "Сайт обрабатывает конфиденциальные персональные данные (например, точное геолокацию, данные о здоровье, расовую информацию) без получения явного согласия opt-in от жителей Колорадо или Вирджинии.",
    "severity": "critical",
    "reference": "Colo. Rev. Stat. § 6-1-1308 / Va. Code § 59.1-574"
  },
  {
    "id": 122,
    "code": "NYD-101",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие многофакторной аутентификации (MFA) в кибербезопасности",
    "description": "Сайт финансовых услуг не применяет многофакторную аутентификацию для доступа к корпоративной электронной почте или базам данных клиентского портала, нарушая требования NY DFS.",
    "severity": "critical",
    "reference": "23 NYCRR Section 500.12"
  },
  {
    "id": 123,
    "code": "NYD-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Невыполнение мер защиты персональных данных",
    "description": "Сайт, ориентированный на Нью-Йорк, не поддерживает административные, физические и технические меры защиты персональной информации, нарушая NY SHIELD Act.",
    "severity": "serious",
    "reference": "N.Y. Gen. Bus. Law § 899-bb"
  },
  {
    "id": 124,
    "code": "QBL-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на конфиденциальность (PIA) при передаче",
    "description": "Сайт передает персональную информацию за пределы Квебека без проведения обязательной оценки воздействия на конфиденциальность, нарушая Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25 Sec. 17"
  },
  {
    "id": 125,
    "code": "DOR-101",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Недостаточное раскрытие рисков третьих сторон ИКТ",
    "description": "Финансовый субъект не ведет полный реестр информации о своих договорных отношениях с поставщиками услуг ИКТ третьих сторон, нарушая руководства DORA.",
    "severity": "critical",
    "reference": "DORA Regulation Art. 28"
  },
  {
    "id": 126,
    "code": "VPPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Срабатывание пикселя отслеживания видео без согласия VPPA",
    "description": "Сайт встраивает видеоконтент (HTML5 video, YouTube, Vimeo iframes) вместе с Meta Pixel, Google Analytics или другими отслеживающими пикселями, которые передают данные о просмотре видео третьим сторонам без получения отдельного явного письменного согласия. Согласно VPPA, умышленное раскрытие PII потребителя, связанного с привычками просмотра видео, без предварительного согласия является нарушением.",
    "severity": "critical",
    "reference": "18 U.S.C. § 2710 (VPPA)"
  },
  {
    "id": 127,
    "code": "EAA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие опубликованного заявления о доступности в соответствии с European Accessibility Act",
    "description": "Сайт электронной коммерции или цифровой услуги, ориентированный на потребителей ЕС, не имеет общедоступного заявления о доступности, описывающего статус соответствия EN 301 549 / WCAG 2.1 AA. European Accessibility Act (Directive 2019/882), вступающий в силу с 28 июня 2025 года, требует от частных компаний, предоставляющих охватываемые услуги, публиковать декларации о доступности.",
    "severity": "serious",
    "reference": "EU Directive 2019/882 (EAA), Art. 14"
  },
  {
    "id": 128,
    "code": "NIS2-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие security.txt или политики раскрытия уязвимостей (NIS2)",
    "description": "Сайт существенного или важного субъекта (энергетика, здравоохранение, транспорт, цифровая инфраструктура) не имеет файла /.well-known/security.txt или какой-либо общедоступной политики раскрытия уязвимостей. Директива NIS2 требует от охватываемых субъектов внедрения мер по обработке инцидентов и управлению уязвимостями.",
    "severity": "moderate",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21(2)(b)"
  },
  {
    "id": 129,
    "code": "HBNR-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Передача данных о здоровье без соблюдения FTC Health Breach Notification Rule",
    "description": "Не-HIPAA сайт или приложение о здоровье (велнес, фитнес, проверка симптомов) собирает идентифицируемую информацию о здоровье и передаёт её сторонним платформам аналитики/рекламы без отображения политики уведомления о нарушениях. FTC Health Breach Notification Rule (в редакции июля 2024 года) рассматривает несанкционированную передачу данных о здоровье как нарушение.",
    "severity": "critical",
    "reference": "16 CFR Part 318 (FTC Health Breach Notification Rule, 2024)"
  },
  {
    "id": 130,
    "code": "CKWL-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie wall блокирует доступ без действительной опции отклонения",
    "description": "Сайт отображает баннер согласия на cookies, который блокирует доступ ко всему контенту до принятия cookies, без действительной опции отклонения.",
    "severity": "serious",
    "reference": "GDPR Art. 7(4); ePrivacy Directive Art. 5(3); EDPB Opinion 08/2024"
  },
  {
    "id": 131,
    "code": "CTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Данные несовершеннолетних используются для таргетированной рекламы без opt-in (CTDPA)",
    "description": "Сайт ориентирован на несовершеннолетних (до 18 лет) или собирает данные о возрасте, указывающие на несовершеннолетних пользователей, но продолжает срабатывание пикселей таргетированной рекламы без получения явного opt-in согласия. Connecticut SB 3 (вносящий поправки в CTDPA) запрещает обработку данных несовершеннолетних для таргетированной рекламы или профилирования без явного согласия.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), amending CTDPA §§ 42-520"
  },
  {
    "id": 132,
    "code": "OCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Сайт не учитывает сигнал Global Privacy Control (Oregon CPA)",
    "description": "Сайт, ориентированный на потребителей Орегона, не обнаруживает и не учитывает сигнал браузера Global Privacy Control (GPC) как действительный запрос на отказ от таргетированной рекламы и продажи персональных данных. Oregon Consumer Privacy Act требует признания универсальных сигналов предпочтений отказа с 1 января 2026 года.",
    "severity": "serious",
    "reference": "ORS 646A.570–646A.589 (Oregon Consumer Privacy Act)"
  },
  {
    "id": 133,
    "code": "COAI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Высокорисковая система ИИ без публичного раскрытия информации о прозрачности (Colorado AI Act)",
    "description": "Сайт использует системы ИИ для принятия значимых решений (найм, кредитование, страхование, жильё), но не имеет общедоступного заявления, раскрывающего, какие высокорисковые системы ИИ развёрнуты и как управляются риски алгоритмической дискриминации. Colorado SB 24-205 требует от deployers поддерживать такие раскрытия.",
    "severity": "moderate",
    "reference": "Colorado SB 24-205 (Colorado AI Act), §§ 6-1-1701"
  },
  {
    "id": 134,
    "code": "JPAP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Данные cookies передаются третьим сторонам без раскрытия по Japan APPI",
    "description": "Сайт, ориентированный на японских пользователей, передаёт данные cookies/отслеживания сторонним рекламным или аналитическим поставщикам, которые могут комбинировать их для идентификации лиц, без раскрытия таких передач или подтверждения согласия третьих сторон. Japan APPI и Telecommunications Business Act требуют прозрачности и подтверждения согласия для таких передач.",
    "severity": "serious",
    "reference": "Japan APPI (Act No. 57 of 2003, amended 2022), Art. 31; Telecom Business Act, Art. 27-12"
  },
  {
    "id": 135,
    "code": "KRPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Необязательные cookies устанавливаются до получения согласия для пользователей Южной Кореи",
    "description": "Сайт, ориентированный на пользователей Южной Кореи, устанавливает отслеживающие или рекламные cookies до получения явного информированного согласия. PIPA Южной Кореи требует предварительного opt-in согласия перед сбором персональной информации, включая данные поведенческого отслеживания. Нарушения влекут штрафы до 3% от общей выручки.",
    "severity": "serious",
    "reference": "South Korea PIPA, Art. 15, Art. 17"
  },
  {
    "id": 136,
    "code": "FERP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Пиксели отслеживания на образовательном сайте передают данные студентов",
    "description": "Сайт образовательного учреждения встраивает Meta Pixel, Google Analytics или аналогичные технологии отслеживания на страницах, обращённых к студентам (порталы, формы зачисления, каталоги курсов), которые передают потенциально идентифицируемые данные студентов третьим сторонам. FERPA запрещает несанкционированное раскрытие PII из образовательных записей.",
    "severity": "critical",
    "reference": "20 U.S.C. § 1232g (FERPA); 34 CFR Part 99"
  },
  {
    "id": 137,
    "code": "ESIG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Процесс согласия E-Sign не содержит требуемых раскрытий ESIGN Act",
    "description": "Сайт использует электронные подписи или соглашения для транзакций, но не предоставляет требуемые предварительные раскрытия, включая: право на получение бумажных копий, право отозвать согласие и процедуры для этого, а также требования к аппаратному/программному обеспечению для доступа к записям.",
    "severity": "moderate",
    "reference": "15 U.S.C. §§ 7001–7006 (E-SIGN Act), § 7001(c)"
  },
  {
    "id": 138,
    "code": "IDDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Уведомление о конфиденциальности недоступно на требуемых языках (India DPDP Act)",
    "description": "Сайт, собирающий персональные данные от индийских пользователей, не предоставляет уведомление о конфиденциальности на английском и хотя бы одном из 22 запланированных индийских языков, как требуется Digital Personal Data Protection Act 2023. Уведомление должно включать детализированные описания собираемых данных, целей и прав пользователей.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023 (Act No. 22 of 2023), Sections 5–6"
  },
  {
    "id": 139,
    "code": "FACT-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Полный номер кредитной карты отображается на электронном чеке (нарушение FACTA)",
    "description": "Сайт отображает более пяти последних цифр номера кредитной/дебетовой карты или показывает дату истечения срока на электронных подтверждениях заказов, чеках или страницах аккаунта. FACTA требует усечения номеров карт до не более пяти цифр и запрещает печать даты истечения на электронно напечатанных чеках.",
    "severity": "critical",
    "reference": "15 U.S.C. § 1681c(g) (FACTA, § 113)"
  },
  {
    "id": 140,
    "code": "DLDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствует чёткий механизм отказа для потребителей Делавэра (DPDPA)",
    "description": "Сайт, ориентированный на потребителей Делавэра, не имеет чёткой заметной ссылки отказа для таргетированной рекламы и продажи персональных данных или не распознаёт универсальные сигналы отказа (GPC). Delaware Personal Data Privacy Act (вступает в силу 1 января 2025 года) требует оба механизма.",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154, Chapter 12C, Title 6)"
  },
  {
    "id": 141,
    "code": "THPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Необязательные cookies срабатывают без opt-in согласия (Thailand PDPA)",
    "description": "Сайт, ориентированный на тайских пользователей, запускает необязательные cookies (аналитика, реклама, социальные) до получения явного opt-in согласия через соответствующий баннер согласия. PDPA Таиланда требует явного активного opt-in согласия перед обработкой персональных данных, включая cookies. Предварительно отмеченные флажки явно не соответствуют требованиям.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562 (2019), Sections 19, 23"
  },
  {
    "id": 142,
    "code": "SEC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствует раскрытие управления кибербезопасностью у регистратора SEC",
    "description": "Сайт публичной компании, отчитывающейся перед SEC, не содержит и не ссылается на раскрытия управления рисками кибербезопасности (надзор совета директоров, экспертиза руководства, процессы оценки рисков), как требуется в подачах 10-K. Корпоративные сайты должны ссылаться или указывать на эти раскрытия для соответствия в отношениях с инвесторами.",
    "severity": "moderate",
    "reference": "SEC Final Rule 33-11216 (2023); Regulation S-K, Item 106"
  },
  {
    "id": 143,
    "code": "TRKV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствует уведомление о регистрации контролёра данных (Turkey KVKK)",
    "description": "Сайт, обрабатывающий персональные данные резидентов Турции, не раскрывает идентичность контролёра данных, регистрационный номер VERBIS (Реестр контролёров данных) или не предоставляет соответствующее уведомление о конфиденциальности с указанием целей обработки, передач третьим сторонам и прав субъектов данных согласно требованиям KVKK.",
    "severity": "serious",
    "reference": "Turkey Law No. 6698 (KVKK), Art. 10, Art. 16"
  },
  {
    "id": 144,
    "code": "NZPR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Трансграничная передача данных без соответствия IPP 12 NZ Privacy Act",
    "description": "Сайт собирает персональные данные пользователей Новой Зеландии и передаёт их за рубеж (подтверждено скриптами отслеживания из США/ЕС) без раскрытия в политике конфиденциальности факта возможной передачи за рубеж и применяемых гарантий согласно Information Privacy Principle 12.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 145,
    "code": "MNDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Уведомление о конфиденциальности не содержит периодов хранения данных (Minnesota MCDPA)",
    "description": "Политика конфиденциальности сайта, ориентированного на потребителей Миннесоты, не раскрывает периоды хранения или политики хранения собранных персональных данных. Minnesota Consumer Data Privacy Act (вступает в силу 31 июля 2025 года) уникально требует раскрытия политики хранения в уведомлении о конфиденциальности.",
    "severity": "moderate",
    "reference": "Minnesota MCDPA (HF 2309), § 325O"
  },
  {
    "id": 146,
    "code": "EIDS-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Очень крупная онлайн-платформа не готова к приёму EUDI Wallet",
    "description": "Очень крупная онлайн-платформа (VLOP), требующая строгой аутентификации клиента для входа, проверки возраста или KYC, не поддерживает и не указывает готовность к приёму EU Digital Identity Wallet. eIDAS 2.0 требует от VLOPs принимать EUDI Wallet к декабрю 2027 года.",
    "severity": "advisory",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 12b"
  },
  {
    "id": 147,
    "code": "AMLK-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствует уведомление об идентификации клиента AML/KYC на финансовом сайте",
    "description": "Сайт финансового учреждения, финтех-компании или бизнеса денежных услуг, открывающий счета онлайн, не отображает требуемое уведомление клиента, объясняющее, что персональная информация собирается для соблюдения федеральных требований проверки личности (CIP) согласно USA PATRIOT Act/BSA.",
    "severity": "serious",
    "reference": "31 U.S.C. § 5318(l); 31 CFR § 1020.220(a)(5) (BSA/PATRIOT Act CIP)"
  },
  {
    "id": 148,
    "code": "CTHL-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Геозонирование возле медицинского учреждения для сбора данных (CT SB 3)",
    "description": "Сайт или связанное мобильное приложение использует технологию геозонирования в радиусе 1750 футов от учреждения психического, репродуктивного или сексуального здоровья для идентификации, отслеживания или отправки push-уведомлений потребителям в целях сбора данных о здоровье. Connecticut SB 3 специально запрещает эту практику.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), § 4(d)"
  },
  {
    "id": 149,
    "code": "IDDG-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствует механизм рассмотрения жалоб для индийских субъектов данных",
    "description": "Сайт, собирающий персональные данные от индийских пользователей, не предоставляет контактные данные назначенного сотрудника по рассмотрению жалоб или механизма подачи жалоб для субъектов данных. India DPDP Act 2023 требует от Data Fiduciaries создания доступного механизма рассмотрения жалоб на своём сайте.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 8(10); IT Act 2000, Rule 5(9)"
  },
  {
    "id": 150,
    "code": "CBAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Баннер согласия на cookies использует асимметричный дизайн Accept/Reject",
    "description": "Баннер согласия на cookies сайта делает кнопку принятия более заметной или простой для нажатия, чем кнопка отклонения, создавая асимметричный выбор.",
    "severity": "serious",
    "reference": "GDPR Art. 7(4), Art. 4(11); ePrivacy Art. 5(3); CNIL Deliberation 2023-010"
  },
  {
    "id": 151,
    "code": "CUBI-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Сбор биометрии без предварительного уведомления и согласия (Texas CUBI)",
    "description": "Сайт собирает биометрические идентификаторы (такие как сканы геометрии лица при виртуальной примерке или по фото, либо отпечатки голоса) без предварительного информирования лица и без получения его явного согласия, нарушая Техасский закон CUBI.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 503.001"
  },
  {
    "id": 152,
    "code": "EUAI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие машиночитаемых метаданных/водяного знака в ИИ-контенте (EU AI Act)",
    "description": "Поставщики ИИ-систем, генерирующих или манипулирующих изображениями, аудио- или видеоматериалами (синтетический контент/дипфейки), должны обеспечивать маркировку выходных данных в машиночитаемом формате для обнаружения их искусственного происхождения согласно Регламенту ЕС об ИИ.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 153,
    "code": "QC25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контактных данных сотрудника по защите данных (DPO) на сайте (Quebec Act 25)",
    "description": "Сайт, собирающий личную информацию от жителей Квебека, не публикует должность и контактные данные лица, ответственного за защиту личной информации (DPO/Responsable), на сайте, нарушая статью 3.1 Закона 25 Квебека.",
    "severity": "serious",
    "reference": "Quebec Act respecting the protection of personal information in the private sector (Act 25), Section 3.1 & 60.1"
  },
  {
    "id": 154,
    "code": "COPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Нераспознавание универсального сигнала отказа от передачи данных GPC (Colorado CPA)",
    "description": "Сайт, ориентированный на потребителей из Колорадо, не распознает и не обрабатывает универсальный сигнал отказа Global Privacy Control (GPC) для автоматического отключения отслеживания в рекламных целях или продажи данных, что является обязательным с 1 июля 2024 года.",
    "severity": "serious",
    "reference": "4 CCR 904-3 (Colorado Privacy Act Rules), Rule 5.05 & 5.06"
  },
  {
    "id": 155,
    "code": "MHMDA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствие ссылки на Политику конфиденциальности потребительских данных о здоровье на главной странице (WA MHMDA)",
    "description": "Сайт, собирающий данные о здоровье потребителей (например, поиск симптомов, трекеры репродуктивного здоровья, регистрация на фитнес), не отображает отдельную ссылку на главной странице с точным текстом \"Consumer Health Privacy Policy\" (Политика конфиденциальности потребительских данных о здоровье), как требует закон MHMDA штата Вашингтон.",
    "severity": "critical",
    "reference": "RCW 19.373.030(1)(a) (Washington MHMDA)"
  },
  {
    "id": 156,
    "code": "CNPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отдельного согласия на обработку конфиденциальной личной информации (China PIPL)",
    "description": "Сайт, ориентированный на резидентов Китая, собирает конфиденциальную личную информацию (такую как финансовые счета, медицинские записи, биометрию или точное местоположение) без получения отдельного, конкретного согласия для каждой категории конфиденциальных данных, нарушая статью 29 PIPL.",
    "severity": "critical",
    "reference": "China Personal Information Protection Law (PIPL), Article 29 & 66"
  },
  {
    "id": 157,
    "code": "DSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Темные паттерны в пользовательских интерфейсах (EU DSA Article 25)",
    "description": "Сайт использует вводящие в заблуждение дизайнерские приемы или темные паттерны, которые искажают или манипулируют способностью пользователя принимать свободные и осознанные решения (например, делать отмену подписки значительно сложнее, чем регистрацию), нарушая статью 25 Акта о цифровых услугах ЕС (DSA).",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (Digital Services Act), Article 25"
  },
  {
    "id": 158,
    "code": "KRPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Объединение согласия на передачу данных третьим сторонам (South Korea PIPA)",
    "description": "Сайт собирает личные данные жителей Южной Кореи и передает их третьим лицам (рекламным сетям, CRM, аналитике), но включает это соглашение в общую политику конфиденциальности или условия использования вместо получения отдельного согласия, нарушая статью 17 PIPA Южной Кореи.",
    "severity": "serious",
    "reference": "Personal Information Protection Act of South Korea (PIPA), Article 15, 17 & 75"
  },
  {
    "id": 159,
    "code": "UKOSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Ненадлежащая проверка возраста для регулируемого контента (UK OSA)",
    "description": "Сайт публикует контент, вредный для детей (например, для взрослых, азартные игры или конфиденциальный жестокий контент), но не внедряет надежную проверку возраста, полагаясь на простые клик-переходы с заявлением \"Мне есть 18 лет\", нарушая Закон Великобритании о безопасности в сети.",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023, Sections 11 & 12"
  },
  {
    "id": 160,
    "code": "EUAI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия информации об распознавании эмоций / биометрической категоризации (EU AI Act)",
    "description": "Поставщики или пользователи систем распознавания эмоций или биометрической категоризации должны информировать физических лиц, подвергающихся их воздействию, о работе системы, нарушая обязательства по прозрачности согласно статье 52(2) Регламенту ЕС об ИИ.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 161,
    "code": "CAAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Геолокация включена по умолчанию для несовершеннолетних (CA AADC)",
    "description": "Сайт, который могут посещать несовершеннолетние, не отключает точное отслеживание геолокации по умолчанию, нарушая Закон Калифорнии о дизайне, соответствующем возрасту детей.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 162,
    "code": "BIPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие политики хранения и уничтожения биометрических данных (BIPA)",
    "description": "Сайт, собирающий или использующий биометрические данные (виртуальная примерка, аутентификация), не публикует график хранения и инструкции по их уничтожению, как требует BIPA Иллинойса.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(a)"
  },
  {
    "id": 163,
    "code": "ORPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие согласия на обработку конфиденциальных данных (Oregon OCPA)",
    "description": "Сайт, ориентированный на потребителей из Орегона, обрабатывает конфиденциальные данные (биометрию, геолокацию, расу) без предварительного явного согласия, нарушая Закон Орегона о конфиденциальности потребителей.",
    "severity": "serious",
    "reference": "Or. Rev. Stat. § 646A (OCPA)"
  },
  {
    "id": 164,
    "code": "VCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Геозонирование вокруг медицинских учреждений для сбора данных (VCDPA)",
    "description": "Сайт или приложение использует геозонирование в радиусе 1750 футов от любого медицинского учреждения для отслеживания или таргетинга потребителей с целью сбора медицинских данных, что запрещено законом VCDPA Вирджинии.",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 165,
    "code": "TDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Нарушение согласия на обработку конфиденциальных данных (Texas TDPSA)",
    "description": "Сайт, ориентированный на потребителей из Техаса, собирает конфиденциальные личные данные, включая биометрические или генетические идентификаторы, без получения явного предварительного согласия согласно Закону Техаса о конфиденциальности и безопасности данных.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.101"
  },
  {
    "id": 166,
    "code": "MTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие подтверждения согласия родителей для детей до 13 лет (Montana MCDPA)",
    "description": "Сайт, ориентированный на потребителей из Монтаны, собирает личные данные несовершеннолетних до 13 лет без получения подтвержденного согласия родителей в соответствии с Законом Монтаны о конфиденциальности потребительских данных.",
    "severity": "critical",
    "reference": "Mont. Code Ann. § 30-14"
  },
  {
    "id": 167,
    "code": "FDBR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Нераскрытие использования систем распознавания лиц (Florida FDBR)",
    "description": "Сайт или связанное приложение использует активное программное обеспечение для распознавания лиц или наблюдения без предоставления четкого, заметного уведомления и получения согласия, нарушая Билль о цифровых правах Флориды.",
    "severity": "serious",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 168,
    "code": "NJPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие уведомлений о сборе данных несовершеннолетних (New Jersey Privacy Act)",
    "description": "Сайт, собирающий данные потребителей из Нью-Джерси, собирает информацию о несовершеннолетних (до 18 лет) без предоставления обязательного подробного уведомления о политиках обработки и обмена.",
    "severity": "serious",
    "reference": "N.J. Stat. Ann. 56:8-1"
  },
  {
    "id": 169,
    "code": "NEDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Ненадлежащее уведомление о профилировании потребителей (Nebraska NDPA)",
    "description": "Сайт, ориентированный на потребителей из Небраски, использует автоматизированное принятие решений или профилирование в сфере трудоустройства, финансов или жилья без раскрытия логики в политике конфиденциальности.",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301 (NDPA)"
  },
  {
    "id": 170,
    "code": "NHPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие ссылки на отказ от прямого маркетинга (New Hampshire Privacy Act)",
    "description": "Сайт, ориентированный на потребителей из Нью-Гэмпшира, не предоставляет легкодоступную ссылку на отказ от таргетированной рекламы или продажи личных данных на главной странице.",
    "severity": "serious",
    "reference": "N.H. Rev. Stat. § 507-H"
  },
  {
    "id": 171,
    "code": "GDPR-011",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Недоступный формат для запросов переноса данных (GDPR)",
    "description": "Инструменты выгрузки данных на сайте выдают личную информацию в закрытом или неструктурированном формате (например, отчеты PDF) вместо структурированного машиночитаемого формата (JSON, CSV).",
    "severity": "moderate",
    "reference": "GDPR Article 20"
  },
  {
    "id": 172,
    "code": "GDPR-012",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Однослойная структура политики конфиденциальности (GDPR)",
    "description": "Сайт отображает единый, плотный, нечитаемый блок текста политики конфиденциальности без использования многослойного, структурированного или раскрывающегося дизайна.",
    "severity": "moderate",
    "reference": "GDPR Article 12(1)"
  },
  {
    "id": 173,
    "code": "DSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие реестра рекламы и логов прозрачности (EU DSA)",
    "description": "Онлайн-платформа, показывающая рекламу пользователям ЕС, не предоставляет общедоступную библиотеку рекламы с фильтрами поиска, именами рекламодателей и параметрами таргетинга.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 174,
    "code": "DSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие единой точки контакта для надзорных органов (EU DSA)",
    "description": "Цифровая платформа, ориентированная на пользователей ЕС, не публикует выделенный, легкодоступный адрес электронной почты и канал связи для прямого контакта с властями ЕС.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 11"
  },
  {
    "id": 175,
    "code": "DMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Принудительное объединение данных платформой-гейткипером (EU DMA)",
    "description": "Платформа-гейткипер объединяет личные данные из основного сервиса с данными из других сервисов без получения отдельного явного согласия пользователя, нарушая DMA ЕС.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/1925 (DMA), Art. 5(2)"
  },
  {
    "id": 176,
    "code": "EUDAT-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие функции деактивации смарт-контрактов (EU Data Act)",
    "description": "Веб-панели управления смарт-контрактами или IoT-системами не предоставляют механизмы безопасной, авторизованной деактивации смарт-контрактов, нарушая Закон о данных ЕС.",
    "severity": "serious",
    "reference": "Regulation (EU) 2023/2854 (Data Act), Art. 30"
  },
  {
    "id": 177,
    "code": "GDPR-013",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие логов согласия и аудиторского следа (GDPR)",
    "description": "Сайт, собирающий персональные данные, не записывает и не хранит логи аудита с отметками времени, версией согласия и действиями пользователя в отношении согласия на cookie.",
    "severity": "serious",
    "reference": "GDPR Article 7(1)"
  },
  {
    "id": 178,
    "code": "EPRIV-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Запуск cookie и трекеров до получения согласия (ePrivacy)",
    "description": "Сайт запускает неофициальные аналитические или рекламные скрипты (Google Analytics, Meta Pixel) до того, как пользователь нажал кнопку на баннере согласия с cookies.",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy), Art. 5(3)"
  },
  {
    "id": 179,
    "code": "DORA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие раскрытия информации об операционной устойчивости (EU DORA)",
    "description": "Сайт финансовой организации или критического поставщика услуг не раскрывает структуру управления киберрисками и каналы экстренной связи, нарушая DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 180,
    "code": "GDPR-014",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие сроков хранения данных в политике конфиденциальности (GDPR)",
    "description": "Политика конфиденциальности не указывает конкретные сроки хранения или критерии их определения для различных категорий личных данных.",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a)"
  },
  {
    "id": 181,
    "code": "AUPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение стандартов удаления данных (Australia Privacy Act)",
    "description": "Сайт, хранящий личные данные жителей Австралии, не имеет автоматических сценариев для обезличивания или уничтожения данных, которые больше не нужны.",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 11.2"
  },
  {
    "id": 182,
    "code": "SGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие механизма отзыва согласия (Singapore PDPA)",
    "description": "Сайт, собирающий данные резидентов Сингапура, не предоставляет легкодоступного онлайн-инструмента или формы для отзыва согласия на маркетинг или обработку данных.",
    "severity": "serious",
    "reference": "Singapore PDPA 2012, Sec. 16"
  },
  {
    "id": 183,
    "code": "SGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Скрытие контактных данных DPO (Singapore PDPA)",
    "description": "Сайт, ориентированный на пользователей из Сингапура, не публикует контактную информацию (например, прямой email) назначенного сотрудника по защите данных.",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 20"
  },
  {
    "id": 184,
    "code": "DPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие права на назначение представителя (India DPDP Act)",
    "description": "Сайт, ориентированный на резидентов Индии, не сообщает в политике конфиденциальности о праве назначить лицо, которое будет действовать от их имени в случае смерти или нетрудоспособности.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 14"
  },
  {
    "id": 185,
    "code": "DPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие интеграции с диспетчером согласий (India DPDP Act)",
    "description": "Сайт не поддерживает работу с уполномоченными Диспетчерами Согласий (Consent Managers) для управления согласием индийских пользователей через автоматический веб-портал.",
    "severity": "serious",
    "reference": "India DPDP Act 2023, Section 6(7)"
  },
  {
    "id": 186,
    "code": "JPAP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия обработки анонимизированных данных (Japan APPI)",
    "description": "Сайт, использующий анонимизированные данные жителей Японии, не публикует состав персональных данных в этой базе и меры безопасности, нарушая APPI.",
    "severity": "serious",
    "reference": "Japan APPI, Article 36"
  },
  {
    "id": 187,
    "code": "NZPR-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контактов сотрудника по конфиденциальности (New Zealand Privacy Act)",
    "description": "Сайт собирает данные жителей Новой Зеландии, но не отображает контактов назначенного сотрудника по конфиденциальности (Privacy Officer).",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, Sec. 201"
  },
  {
    "id": 188,
    "code": "THPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контактных данных DPO в формах согласия (Thailand PDPA)",
    "description": "Сайт собирает данные тайских жителей, но не указывает контакты DPO в баннерах согласия или политике конфиденциальности.",
    "severity": "moderate",
    "reference": "Thailand PDPA B.E. 2562, Section 42"
  },
  {
    "id": 189,
    "code": "VNDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие локального сотрудника по защите данных (Vietnam Decree 13)",
    "description": "Сайт, собирающий чувствительные личные данные жителей Вьетнама, не назначает местного сотрудника или департамент по защите данных согласно Декрету 13.",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP, Art. 28"
  },
  {
    "id": 190,
    "code": "PHDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Связанное согласие на профилирование и авторешения (Philippines DPA)",
    "description": "Сайт собирает данные жителей Филиппин и осуществляет автопрофилирование или принятие решений без получения отдельного явного согласия.",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act of 2012, Sec. 12"
  },
  {
    "id": 191,
    "code": "LGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие ссылки на портал прав субъектов данных (Brazil LGPD)",
    "description": "Сайт не отображает понятную, отдельную ссылку для жителей Бразилии для отправки запросов на доступ, удаление или исправление личных данных.",
    "severity": "serious",
    "reference": "Brazil LGPD, Article 18"
  },
  {
    "id": 192,
    "code": "POPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие авторизации на обработку кредитных данных (South Africa POPIA)",
    "description": "Финансовый или кредитный сайт, работающий с резидентами ЮАР, обрабатывает кредитные истории без предварительной авторизации надзорного органа.",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Section 57"
  },
  {
    "id": 193,
    "code": "SAPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие согласия на прямой маркетинг (Saudi Arabia PDPL)",
    "description": "Сайт отправляет рекламные сообщения жителям Саудовской Аравии или отслеживает их для рекламы без получения предварительного явного согласия.",
    "severity": "serious",
    "reference": "Saudi PDPL, Article 28"
  },
  {
    "id": 194,
    "code": "ILPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нераскрытие регистрации базы данных (Israel Privacy Act)",
    "description": "Сайт, собирающий данные граждан Израиля, не указывает, зарегистрирована ли база данных в Реестре баз данных, ее номер и цели сбора.",
    "severity": "moderate",
    "reference": "Israel Privacy Protection Act 1981, Sec. 8"
  },
  {
    "id": 195,
    "code": "DIFC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раздельного согласия на маркетинг (Dubai DIFC)",
    "description": "Сайт под юрисдикцией DIFC (Дубай) собирает личные данные и объединяет согласие на маркетинг с общими правилами сервиса.",
    "severity": "serious",
    "reference": "DIFC Law No. 5 of 2020, Art. 12"
  },
  {
    "id": 196,
    "code": "NDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нераскрытие трансграничной передачи данных (Nigeria NDPA)",
    "description": "Сайт собирает данные жителей Нигерии и передает их на зарубежные серверы без раскрытия целевых стран и проверки мер защиты.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act 2023, Sec. 42"
  },
  {
    "id": 197,
    "code": "KEDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несанкционированная трансграничная передача медицинских данных (Kenya DPA)",
    "description": "Сайт собирает медицинские записи жителей Кении и хранит их на зарубежных серверах без получения явного разрешения и согласия.",
    "severity": "critical",
    "reference": "Kenya Data Protection Act 2019, Sec. 50"
  },
  {
    "id": 198,
    "code": "EGDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие лицензии на электронный маркетинг (Egypt DPA)",
    "description": "Сайт, ориентированный на египетских пользователей, отправляет рекламные письма или SMS без получения обязательной лицензии от Центра защиты данных.",
    "severity": "serious",
    "reference": "Egypt Law No. 151 of 2020, Art. 13"
  },
  {
    "id": 199,
    "code": "MRDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несанкционированная международная передача данных (Morocco Law 09-08)",
    "description": "Сайт собирает данные жителей Марокко и передает их за пределы страны без предварительного письменного разрешения надзорного органа CNDP.",
    "severity": "serious",
    "reference": "Morocco Law 09-08, Art. 43"
  },
  {
    "id": 200,
    "code": "LGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Ненадлежащее раскрытие стандартов безопасности (Brazil LGPD)",
    "description": "Сайт собирает данные пользователей, но не раскрывает технические и организационные меры безопасности, развернутые для их защиты.",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 46"
  },
  {
    "id": 201,
    "code": "FTCS-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Небезопасная передача данных финансовых клиентов (FTC Safeguards)",
    "description": "Финтех-портал передает финансовые данные клиентов по незашифрованным каналам или не форсирует работу по протоколу HTTPS.",
    "severity": "critical",
    "reference": "16 CFR Part 314, Sec 314.4(c)"
  },
  {
    "id": 202,
    "code": "GLBA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие ссылки на ежегодное уведомление конфиденциальности (GLBA)",
    "description": "Сайт финансовых услуг не предоставляет четкую ссылку на ежегодное уведомление о конфиденциальности по закону GLBA на страницах личного кабинета.",
    "severity": "serious",
    "reference": "16 CFR Part 313 (GLBA Privacy Rule)"
  },
  {
    "id": 203,
    "code": "CTAC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие уведомлений о прозрачности бенефициаров (CTA)",
    "description": "Корпоративный сайт не отображает обязательные раскрытия информации о бенефициарном владении в соответствии с Законом о корпоративной прозрачности.",
    "severity": "moderate",
    "reference": "31 U.S.C. § 5336 (CTA)"
  },
  {
    "id": 204,
    "code": "SEC-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие подтверждения архивации документов (SEC Rule 17a-4)",
    "description": "Инвестиционный или брокерский сайт не содержит подтверждения использования неизменяемых систем хранения данных (WORM), нарушая правила SEC.",
    "severity": "serious",
    "reference": "17 CFR § 240.17a-4"
  },
  {
    "id": 205,
    "code": "DORA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие описания системы управления ИКТ-рисками (EU DORA)",
    "description": "Сайт финансовой организации ЕС не отображает сертификаты безопасности или описание механизмов защиты от ИКТ-угроз по регламенту DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 6"
  },
  {
    "id": 206,
    "code": "FTCR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Отсутствие программы предотвращения кражи личности (FTC Red Flags)",
    "description": "Кредитный или финансовый портал не публикует и не ссылается на Программу предотвращения кражи личных данных (ITPP), нарушая правила FTC.",
    "severity": "serious",
    "reference": "16 CFR § 681.1"
  },
  {
    "id": 207,
    "code": "FINRA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие ссылки на FINRA BrokerCheck на финансовом сайте",
    "description": "Инвестиционный или брокерский сайт не имеет прямой заметной ссылки на инструмент проверки брокеров FINRA BrokerCheck на главной странице.",
    "severity": "serious",
    "reference": "FINRA Rule 2210(d)"
  },
  {
    "id": 208,
    "code": "PCI-011",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Неконтролируемые сторонние скрипты на платежной странице (PCI-DSS v4.0)",
    "description": "Страница оплаты выполняет сторонние скрипты (чаты, аналитику) без применения контроля целостности скриптов, ограничений CSP или явной авторизации загрузки.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 209,
    "code": "PCI-012",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие SRI на платежных шлюзах (PCI-DSS v4.0)",
    "description": "Сайт встраивает платежные скрипты с внешних CDN без использования хешей целостности субресурсов (SRI), делая платежи уязвимыми перед формджекингом.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 11.6.1"
  },
  {
    "id": 210,
    "code": "TILA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Незаметное раскрытие APR в рекламе кредитов (TILA)",
    "description": "Сайт рекламирует кредитные ставки или комиссии без явного указания годовой процентной ставки (APR) рядом со ставкой, нарушая закон TILA.",
    "severity": "serious",
    "reference": "12 CFR Part 1026 (Regulation Z)"
  },
  {
    "id": 211,
    "code": "FTCD-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Усложненный отказ от услуг / Roach Motel (FTC Section 5)",
    "description": "Сайт использует темные паттерны, усложняя отмену подписки (требуя звонков, скрывая ссылки), в то время как подписка оформляется в один клик.",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 212,
    "code": "FTCD-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Ложное нагнетание срочности / Фальшивые таймеры (FTC Section 5)",
    "description": "Сайт отображает фальшивые таймеры обратного отсчета или заявления о дефиците товара, которые генерируются программно и не связаны с реальным спросом.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 213,
    "code": "FTCD-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Манипулятивное пристыжение при отказе / Confirmshaming (FTC Section 5)",
    "description": "Модальное окно использует эмоционально-манипулятивный текст для кнопки отказа (например, «Нет, спасибо, я люблю тратить лишние деньги»), препятствуя выбору пользователя.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 214,
    "code": "W3CR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов аудита смарт-контрактов в dApp (SEC Framework)",
    "description": "Децентрализованное приложение (Web3 dApp), запускающее токены или NFT, не публикует отчеты безопасности и аудита своих смарт-контрактов.",
    "severity": "serious",
    "reference": "SEC Framework for Investment Contracts"
  },
  {
    "id": 215,
    "code": "W3CR-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Уязвимость слепого подписания транзакций в Web3 dApp (NIST SP 800-95)",
    "description": "Интерфейс dApp запрашивает подписание транзакции кошельком (raw payload) без отображения понятных параметров функции в веб-интерфейсе.",
    "severity": "critical",
    "reference": "NIST SP 800-95 Web Services Security"
  },
  {
    "id": 216,
    "code": "DSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие описания алгоритмов рекомендаций (EU DSA)",
    "description": "Сайт, использующий алгоритмы персональных рекомендаций, не разъясняет принципы их работы и критерии выдачи в условиях использования, нарушая DSA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 26"
  },
  {
    "id": 217,
    "code": "EUAI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие ведения логов работы высокорисковой ИИ-системы (EU AI Act)",
    "description": "Оператор высокорисковой ИИ-системы на сайте не обеспечивает сохранение логов ее работы в течение минимум 6 месяцев для обеспечения аудита.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 12"
  },
  {
    "id": 218,
    "code": "UKCR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Автопродление без понятного резюме условий (UK CRA)",
    "description": "Сайт с периодическими подписками не предоставляет заметного и понятного краткого описания правил списания, изменения цен и дат продления.",
    "severity": "serious",
    "reference": "UK Consumer Rights Act 2015, Sec. 68"
  },
  {
    "id": 219,
    "code": "PIPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неполное раскрытие сторонних обработчиков данных (Canada PIPEDA)",
    "description": "Политика конфиденциальности не раскрывает имена, роли и страны размещения сторонних SaaS-сервисов, обрабатывающих данные пользователей.",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1, APP 4.8"
  },
  {
    "id": 220,
    "code": "TDDD-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Обход согласия на аналитические файлы cookie в Германии (TDDDG)",
    "description": "Сайт запускает аналитические cookie (веб-аналитика, тепловые карты) до получения согласия, нарушая раздел 25 немецкого закона TDDDG.",
    "severity": "critical",
    "reference": "Germany TDDDG Section 25"
  },
  {
    "id": 221,
    "code": "TXSC-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Чат включен по умолчанию для несовершеннолетних (Texas SCOPE)",
    "description": "Социальная платформа или сервис не отключает функции личных сообщений и чата по умолчанию для несовершеннолетних пользователей согласно закону SCOPE.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 509 (SCOPE Act)"
  },
  {
    "id": 222,
    "code": "UTSM-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие проверки возраста на социальной платформе (Utah SMRA)",
    "description": "Социальная сеть не проверяет возраст жителей Юты при создании аккаунтов или не получает подтвержденное согласие родителей для детей.",
    "severity": "critical",
    "reference": "Utah Code § 13-63-102 (SMRA)"
  },
  {
    "id": 223,
    "code": "FLDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие верификации возраста на платформе (Florida FDBR)",
    "description": "Социальная платформа, доступная для несовершеннолетних, не имеет аккредитованной надежной системы верификации возраста согласно FDBR.",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 224,
    "code": "CTDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Геозонирование вокруг центров ментального здоровья (Connecticut SB 3)",
    "description": "Сайт или приложение использует геозонирование в радиусе 1750 футов от учреждений ментального или сексуального здоровья для сбора данных.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3)"
  },
  {
    "id": 225,
    "code": "VCDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие согласия на детские конфиденциальные данные (Virginia VCDPA)",
    "description": "Сайт, собирающий конфиденциальные данные детей до 13 лет, не получает подтвержденное согласие родителей по правилам COPPA.",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 226,
    "code": "CAAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Профилирование включено по умолчанию для несовершеннолетних (CA AADC)",
    "description": "На сайте, предназначенном для детей, по умолчанию включено профилирование, персонализация рекламы или алгоритмические ленты новостей.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31 (AADC)"
  },
  {
    "id": 227,
    "code": "MDAD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки рисков для несовершеннолетних (Maryland AADCA)",
    "description": "Сайт, посещаемый детьми, не проводит и не публикует оценку воздействия на защиту данных (DPIA) в отношении рисков для несовершеннолетних.",
    "severity": "serious",
    "reference": "Md. Code Ann., Com. Law § 14-45"
  },
  {
    "id": 228,
    "code": "COPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие согласия родителей на детские данные в Колорадо (CPA)",
    "description": "Сайт обрабатывает личные данные пользователей младше 13 лет без подтвержденного согласия родителей, нарушая правила CPA Колорадо.",
    "severity": "critical",
    "reference": "4 CCR 904-3 Rule 6.09"
  },
  {
    "id": 229,
    "code": "INDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие согласия на детские конфиденциальные данные в Индиане (CDPA)",
    "description": "Сайт, ориентированный на жителей Индианы, собирает конфиденциальные данные детей до 13 лет без предварительного явного согласия по стандартам COPPA.",
    "severity": "critical",
    "reference": "Ind. Code § 24-15"
  },
  {
    "id": 230,
    "code": "TNIP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие описания процесса апелляции по правам (Tennessee TIPA)",
    "description": "Уведомление о конфиденциальности для жителей Теннесси не содержит описания процесса апелляции в случае отказа в реализации прав на данные.",
    "severity": "serious",
    "reference": "Tenn. Code Ann. § 47-18-32"
  },
  {
    "id": 231,
    "code": "TCPA-011",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Задержка обработки отказа от рассылки (CAN-SPAM)",
    "description": "Ссылка отписки от маркетинговых писем не работает мгновенно или требует более 10 рабочих дней для удаления пользователя из базы.",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 232,
    "code": "TCPA-012",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие почтового адреса отправителя в рассылках (CAN-SPAM)",
    "description": "Рекламные письма сайта не содержат физического адреса отправителя или используют вводящие в заблуждение заголовки.",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 233,
    "code": "TCPA-013",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие письменного согласия на автообзвон (TCPA)",
    "description": "Формы сбора лидов собирают номера телефонов и передают их для автообзвона без получения предварительного письменного согласия с раскрытием TCPA.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 234,
    "code": "EAA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Барьеры клавиатурной навигации в корзине покупок (EAA)",
    "description": "Страница оплаты или корзины содержит ловушки фокуса клавиатуры либо не может управляться без использования мыши, нарушая требования EAA.",
    "severity": "critical",
    "reference": "EN 301 549 Clause 9.2.1 (EAA)"
  },
  {
    "id": 235,
    "code": "EAA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие альтернативных медиа-форматов в e-commerce (EAA)",
    "description": "Сайт демонстрирует товары с помощью видео или аудио без субтитров и аудиоописания, нарушая европейские правила доступности.",
    "severity": "serious",
    "reference": "EN 301 549 Clause 9.1.2 (EAA)"
  },
  {
    "id": 236,
    "code": "AODA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные скачиваемые документы (Ontario AODA)",
    "description": "Сайт предлагает скачивание публичных документов (PDF, руководств), которые не соответствуют требованиям доступности WCAG 2.0 уровня AA.",
    "severity": "serious",
    "reference": "AODA Section 14"
  },
  {
    "id": 237,
    "code": "ADA-237",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Клавиатурная ловушка фокуса в модальных окнах (ADA Title III)",
    "description": "Модальные окна или баннеры куки блокируют фокус клавиатуры, не позволяя пользователю вернуться табуляцией на основную страницу.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.1.2"
  },
  {
    "id": 238,
    "code": "ADA-103",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные медиаплееры (ADA Title III)",
    "description": "Веб-медиаплееры не имеют меток управления или поддержки клавиатуры, блокируя незрячих и пользователей клавиатуры.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1 & 4.1.2"
  },
  {
    "id": 239,
    "code": "EPRIV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Обход согласия в мобильных макетах (ePrivacy)",
    "description": "Баннер согласия куки скрыт или некорректно отображается в мобильной версии, пока трекеры продолжают работать.",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy)"
  },
  {
    "id": 240,
    "code": "FTCE-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фальшивые отзывы, сгенерированные ИИ (FTC Consumer Review Rule)",
    "description": "Сайт публикует отзывы клиентов, сгенерированные ИИ, без явной пометки об их синтетическом происхождении, нарушая правила FTC.",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 241,
    "code": "HIPAA-011",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Утечка конфиденциальных медицинских данных через соцсети (HIPAA)",
    "description": "Медицинский сайт встраивает чат-виджеты соцсетей (например, Facebook Messenger), которые передают данные пациентов третьей стороне.",
    "severity": "critical",
    "reference": "45 CFR § 164.502"
  },
  {
    "id": 242,
    "code": "HIPAA-012",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Небезопасная отправка медицинских карт по почте/SMS (HIPAA)",
    "description": "Формы онлайн-записи или телемедицины отправляют незашифрованные медкарты по электронной почте или SMS, нарушая правила HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)"
  },
  {
    "id": 243,
    "code": "PCI-013",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Небезопасное хранение данных карт в LocalStorage (PCI-DSS v4.0)",
    "description": "Сайт сохраняет номера кредитных карт (PAN), имена владельцев или CVV в браузерном хранилище LocalStorage, нарушая регламент PCI-DSS.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 3.4.1"
  },
  {
    "id": 244,
    "code": "PCI-014",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Небезопасное выполнение платежных скриптов на кассе (PCI-DSS v4.0)",
    "description": "Страница оплаты выполняет внешние скрипты без проверки целостности или без ограничений с помощью CSP, нарушая стандарты безопасности.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 245,
    "code": "MHMDA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствие проверки лицензии медпровайдера при сборе данных (WA MHMDA)",
    "description": "Сайт собирает данные о физическом/психическом здоровье резидентов Вашингтона без верификации того, имеет ли получатель лицензию врача.",
    "severity": "critical",
    "reference": "RCW 19.373 (MHMDA)"
  },
  {
    "id": 246,
    "code": "NIST-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие таймаутов сессии аутентификации (NIST SP 800-53)",
    "description": "Портал клиента или панель управления не закрывает неактивные сессии автоматически, нарушая требования безопасности NIST.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (IA-11)"
  },
  {
    "id": 247,
    "code": "SOC2-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие страницы статуса доступности системы (SOC 2 Type II)",
    "description": "SaaS-портал не предоставляет общедоступную страницу статуса (Status Page) или график аптайма, нарушая критерии доступности SOC 2.",
    "severity": "moderate",
    "reference": "SOC 2 CC1.1 (Availability)"
  },
  {
    "id": 248,
    "code": "CYIN-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Использование устаревшего ПО без раскрытия рисков (Cyber Insurance)",
    "description": "Веб-приложение использует ПО с истекшим сроком поддержки (EOL) без раскрытия этого факта страховым компаниям, аннулируя киберстраховку.",
    "severity": "serious",
    "reference": "Cyber Insurance Risk Standards"
  },
  {
    "id": 249,
    "code": "DORA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие каналов сообщения об инцидентах ИКТ (EU DORA)",
    "description": "Платформа финансовых услуг не имеет безопасного канала для сообщения пользователями об ИКТ-инцидентах, нарушая требования DORA.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 17"
  },
  {
    "id": 250,
    "code": "FTCS-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Отсутствие ограничений длительности сессии портала (FTC Safeguards)",
    "description": "Финтех-портал не настраивает и не обеспечивает жесткие лимиты на продолжительность сессий личного кабинета, нарушая требования FTC.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 251,
    "code": "DEPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портативного формата выгрузки данных (Delaware DPDPA)",
    "description": "Сайт, ориентированный на потребителей из Делавэра, не предоставляет возможность выгрузки личных данных в переносимом и пригодном для использования формате.",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154), Sec. 12C-5"
  },
  {
    "id": 252,
    "code": "MAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Запрещенная продажа конфиденциальных данных (Maryland MODPA)",
    "description": "Сайт собирает и продает конфиденциальные личные данные потребителей из Мэриленда, что строго запрещено Законом Мэриленда о конфиденциальности данных в сети.",
    "severity": "critical",
    "reference": "Maryland MODPA (SB 541), Sec. 14-46"
  },
  {
    "id": 253,
    "code": "KYPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие описания права доступа к данным (Kentucky KCDPA)",
    "description": "Сайт для жителей Кентукки не раскрывает понятную процедуру подтверждения обработки и доступа к своим персональным данным согласно закону KCDPA.",
    "severity": "serious",
    "reference": "Kentucky KCDPA (SB 15), Sec. 4"
  },
  {
    "id": 254,
    "code": "RIPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Нераскрытие третьих сторон при передаче данных (Rhode Island RIDTPPA)",
    "description": "Политика конфиденциальности сайта для жителей Род-Айленда не перечисляет явно все сторонние организации, которым передаются или продаются личные данные.",
    "severity": "serious",
    "reference": "Rhode Island RIDTPPA (SB 2502), Sec. 6"
  },
  {
    "id": 255,
    "code": "IAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие ссылки на отказ от продажи данных (Iowa ICDPA)",
    "description": "Сайт для жителей Айовы не имеет заметной ссылки для отказа от продажи или распространения своих персональных данных.",
    "severity": "serious",
    "reference": "Iowa ICDPA (SF 262), Sec. 715C"
  },
  {
    "id": 256,
    "code": "FTCH-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Незаконный шеринг медицинских запросов с трекерами (FTC HBNR)",
    "description": "Сайт собирает поисковые запросы о здоровье или симптомах и передает их рекламным пикселям третьих сторон без согласия, нарушая правила FTC.",
    "severity": "critical",
    "reference": "16 CFR Part 318 (HBNR Rule)"
  },
  {
    "id": 257,
    "code": "NYDF-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие обязательной двухфакторной аутентификации (NYDFS)",
    "description": "Финансовая панель под юрисдикцией NYDFS не требует прохождения двухфакторной аутентификации (MFA) для клиентских учетных записей.",
    "severity": "critical",
    "reference": "23 NYCRR Part 500, Sec. 500.12"
  },
  {
    "id": 258,
    "code": "BIPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие письменного согласия на сбор биометрии (Illinois BIPA)",
    "description": "Сайт собирает биометрические маркеры пользователей без предварительного получения подписанного письменного соглашения, нарушая раздел 15(b) BIPA.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(b)"
  },
  {
    "id": 259,
    "code": "AADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Индикатор фокуса перекрывается липкими панелями (WCAG 2.2)",
    "description": "Макет сайта допускает перекрытие индикатора фокуса клавиатуры плавающими шапками, подвалами или виджетами в процессе навигации.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 260,
    "code": "AADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельных зон (WCAG 2.2 SC 2.5.8)",
    "description": "Кликабельные элементы на сайте (кнопки, ссылки) имеют размер менее 24x24 пикселей без отступов, затрудняя нажатие на мобильных экранах.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 261,
    "code": "EUAI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие описания человеческого контроля ИИ (EU AI Act)",
    "description": "Сайт, использующий ИИ-решения высокого риска (оценка кандидатов, кредитование), не раскрывает механизмы контроля со стороны человека.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 14"
  },
  {
    "id": 262,
    "code": "EUAI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие плана пострыночного мониторинга ИИ (EU AI Act)",
    "description": "Поставщик регулируемых ИИ-систем не указывает планы мониторинга стабильности и каналы сообщения об инцидентах ИИ.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 61"
  },
  {
    "id": 263,
    "code": "DSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие ленты без профилирования (EU DSA Art. 38)",
    "description": "Онлайн-платформа, использующая рекомендательные ленты, не дает пользователям возможности отключить профилирование (например, хронологическая лента).",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 38"
  },
  {
    "id": 264,
    "code": "DSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие мер верификации возраста детей (EU DSA Art. 28)",
    "description": "Онлайн-платформа, доступная для детей, не внедрила соразмерные меры проверки возраста для обеспечения безопасности несовершеннолетних.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 28"
  },
  {
    "id": 265,
    "code": "NIS2-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие каналов оповещения об инцидентах (NIS2)",
    "description": "Сайт критически важного поставщика услуг не содержит каналов связи или инструкций по информированию об инцидентах безопасности.",
    "severity": "serious",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21"
  },
  {
    "id": 266,
    "code": "GDPR-015",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие функции ограничения обработки данных (GDPR)",
    "description": "Сайт не предоставляет пользователям инструмент для ограничения обработки данных (например, временная блокировка использования данных).",
    "severity": "serious",
    "reference": "GDPR Article 18"
  },
  {
    "id": 267,
    "code": "EPRIV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Превышение срока жизни cookie-файлов (ePrivacy Guidelines)",
    "description": "Механизм согласия устанавливает рекламные cookies на срок более 12 месяцев без автоматического запроса на продление согласия.",
    "severity": "moderate",
    "reference": "ePrivacy Guidelines on Cookies, Sec. 4"
  },
  {
    "id": 268,
    "code": "GDPR-016",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие ссылки на Реестр процессов обработки (GDPR)",
    "description": "Политика конфиденциальности не упоминает ведение Реестра процессов обработки (ROPA) и не содержит выдержки для информирования пользователей.",
    "severity": "serious",
    "reference": "GDPR Article 30"
  },
  {
    "id": 269,
    "code": "EIDS-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие поддержки квалифицированных электронных подписей (eIDAS 2.0)",
    "description": "Сайт, требующий подписания документов гражданами ЕС, не поддерживает квалифицированные электронные подписи (QES) из Доверительного списка ЕС.",
    "severity": "moderate",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6"
  },
  {
    "id": 270,
    "code": "GDPR-017",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Нераскрытие информации о проведении оценки рисков DPIA (GDPR)",
    "description": "Сайт, ведущий масштабную слежку за поведением пользователей, не указывает факт проведения обязательной оценки рисков DPIA.",
    "severity": "serious",
    "reference": "GDPR Article 35"
  },
  {
    "id": 271,
    "code": "ARPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие путей исправления данных (Argentina Law 25.326)",
    "description": "Сайт, собирающий данные резидентов Аргентины, не имеет понятной процедуры исправления или удаления устаревших персональных данных.",
    "severity": "serious",
    "reference": "Argentina Law 25.326, Art. 6"
  },
  {
    "id": 272,
    "code": "COPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Объединенное согласие на получение рекламы (Colombia Law 1581)",
    "description": "Сайт собирает данные жителей Колумбии и объединяет согласие на маркетинговые рассылки с регистрацией на платформе.",
    "severity": "serious",
    "reference": "Colombia Law 1581 of 2012, Art. 12"
  },
  {
    "id": 273,
    "code": "MXPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие каналов для реализации прав ARCO (Mexico LFPDPPP)",
    "description": "Сайт для жителей Мексики не описывает понятные действия для реализации прав ARCO (доступ, исправление, отмена, возражение).",
    "severity": "serious",
    "reference": "Mexico LFPDPPP, Art. 16"
  },
  {
    "id": 274,
    "code": "CHPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нераскрытие трансграничной передачи данных из Швейцарии (Swiss FADP)",
    "description": "Сайт передает данные граждан Швейцарии за границу без раскрытия списка стран и мер предосторожности в политике конфиденциальности.",
    "severity": "serious",
    "reference": "Switzerland FADP, Art. 16"
  },
  {
    "id": 275,
    "code": "POPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Рекламные рассылки без предварительного согласия (South Africa POPIA)",
    "description": "Сайт рассылает прямой электронный маркетинг резидентам ЮАР без получения предварительного явного согласия.",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Sec. 69"
  },
  {
    "id": 276,
    "code": "TRKV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несанкционированный трансграничный перенос данных (Turkey KVKK)",
    "description": "Сайт передает данные граждан Турции за рубеж без получения явного согласия или подтверждения стандартных договорных условий.",
    "severity": "serious",
    "reference": "Turkey Law 6698 (KVKK), Art. 9"
  },
  {
    "id": 277,
    "code": "AUPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неполное описание процедур доступа к данным (Australia APP 1)",
    "description": "Политика конфиденциальности для австралийских пользователей не описывает шаги по получению доступа, исправлению или подаче жалоб на нарушение принципов APP.",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 1.4"
  },
  {
    "id": 278,
    "code": "SGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие трекинга запросов на доступ к данным (Singapore PDPA)",
    "description": "Сайт не предоставляет резидентам Сингапура выделенный email или интерфейс для запроса информации об их данных, обработанных за прошедший год.",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 21"
  },
  {
    "id": 279,
    "code": "THPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Трансграничный перенос в неблагополучные страны без согласия (Thailand PDPA)",
    "description": "Сайт переносит личные данные тайских граждан в третьи страны с недостаточными стандартами защиты без получения явного согласия.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 28"
  },
  {
    "id": 280,
    "code": "PHDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неполное информирование о праве на возражение (Philippines DPA)",
    "description": "Политика конфиденциальности сайта для жителей Филиппин не заявляет явно о праве пользователей возражать против обработки их личных данных.",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act 2012, Sec. 16"
  },
  {
    "id": 281,
    "code": "FTCD-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Скрытое повышение стоимости подписок (FTC)",
    "description": "Сайт списывает повышенную плату за автопродление подписки без предварительного информирования пользователя и получения согласия на новую цену.",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 282,
    "code": "FTCD-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Предустановленные галочки на платные опции в корзине (FTC)",
    "description": "Касса e-commerce по умолчанию оставляет отмеченными дополнительные платные услуги или страховки, навязывая их покупателю.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 283,
    "code": "TCPA-014",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие внутренней базы отказов от обзвонов (TCPA)",
    "description": "Сайт сбора лидов не ведет внутренний реестр отказов от звонков (Do Not Call) и не документирует процедуры обработки таких запросов.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200(d)"
  },
  {
    "id": 284,
    "code": "TCPA-015",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Авторизация или плата для отписки от рассылки (CAN-SPAM)",
    "description": "Ссылки отписки от рекламных писем принуждают пользователя авторизоваться, проходить опросы или платить комиссию для удаления из базы.",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 285,
    "code": "EAA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные для чтения цифровые чеки и счета (EAA)",
    "description": "Интернет-магазин генерирует подтверждения заказов и чеки в виде плоских картинок или неразмеченных PDF, недоступных для скринридеров.",
    "severity": "critical",
    "reference": "EN 301 549 Clause 11.2 (EAA)"
  },
  {
    "id": 286,
    "code": "AODA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала связи по вопросам доступности (Ontario AODA)",
    "description": "Сайт не предоставляет доступную форму или канал связи для получения отзывов и жалоб на доступность интерфейса от инвалидов.",
    "severity": "serious",
    "reference": "AODA Section 12"
  },
  {
    "id": 287,
    "code": "ADA-104",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Разрушение макета страницы при масштабировании 200% (ADA Title III)",
    "description": "Верстка сайта ломается, текст перекрывает друг друга или обрезается при увеличении масштаба браузера до 200% без спецсредств.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.4"
  },
  {
    "id": 288,
    "code": "ADA-105",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Невозможность продлить время заполнения форм (ADA Title III)",
    "description": "Формы с ограничением по времени (например, бронирование билетов на кассе) не позволяют пользователю остановить или продлить таймер.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.2.1"
  },
  {
    "id": 289,
    "code": "EPRIV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Панель настройки cookie недоступна с клавиатуры (ePrivacy)",
    "description": "Баннер куки и всплывающее меню настроек нельзя полностью закрыть или настроить только с клавиатуры клавишами TAB и Enter.",
    "severity": "critical",
    "reference": "ePrivacy Directive, Art. 5(3)"
  },
  {
    "id": 290,
    "code": "FTCE-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Немаркированные амбасадорские ссылки и спонсорский контент (FTC)",
    "description": "Сайт размещает ссылки на товары, за покупку которых получает комиссию, без видимой пометки о партнерском характере ссылки вблизи нее.",
    "severity": "critical",
    "reference": "16 CFR Part 255"
  },
  {
    "id": 291,
    "code": "W3CR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие предупреждений о рисках обмена токенов (SEC)",
    "description": "Интерфейс Web3 dApp, способствующий обмену токенов, не отображает предупреждений о волатильности цен и юридическом статусе активов на панели обмена.",
    "severity": "serious",
    "reference": "SEC Guidance on Digital Assets"
  },
  {
    "id": 292,
    "code": "W3CR-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие проверки целостности ответов RPC в dApp (NIST)",
    "description": "Приложение dApp запрашивает узлы RPC или API без проверки подписи ответов, позволяя подменить баланс кошелька через MITM-атаки.",
    "severity": "critical",
    "reference": "NIST SP 1800-34 (Data Integrity)"
  },
  {
    "id": 293,
    "code": "PCI-015",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Запуск скриптов с неавторизованных доменов (PCI-DSS v4.0)",
    "description": "Платежные формы загружают и выполняют JS-файлы с доменов, не входящих в белый список безопасности, нарушая требования PCI-DSS v4.0.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.1"
  },
  {
    "id": 294,
    "code": "PCI-016",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Скрипты записи сессий записывают поля ввода паролей (PCI-DSS)",
    "description": "Инструменты записи сессий (Hotjar, FullStory) выполняются на порталах без маскирования чувствительных полей ввода (пароли, номера карт).",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 8.3"
  },
  {
    "id": 295,
    "code": "CYIN-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие процедуры сообщения об инцидентах ИБ (Cyber Insurance)",
    "description": "Интерфейс SaaS не содержит механизма для подачи запросов о раскрытии инцидентов ИБ, что требуется андеррайтерами киберстрахования.",
    "severity": "serious",
    "reference": "NIST Cybersecurity Framework (CSF)"
  },
  {
    "id": 296,
    "code": "DORA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие публикации инцидентов ИКТ (EU DORA Art. 18)",
    "description": "Веб-консоль финансовой организации не предоставляет доступ к реестру инцидентов ИКТ для пользователей и регуляторов.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 18"
  },
  {
    "id": 297,
    "code": "FTCS-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытие проведения оценок рисков БД (FTC Safeguards)",
    "description": "Портал финансовых услуг не публикует в уведомлениях безопасности сведения о прохождении регулярных проверок безопасности БД.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(d)"
  },
  {
    "id": 298,
    "code": "SOC2-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие логов отзыва токенов администрирования (SOC 2)",
    "description": "Консоль администрирования не логирует события отзыва токенов или не выводит список активных сессий с возможностью их завершения.",
    "severity": "moderate",
    "reference": "SOC 2 CC6.3 (Access Controls)"
  },
  {
    "id": 299,
    "code": "NIST-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие логов управления учетными записями (NIST)",
    "description": "Кабинет пользователя не создает журнал событий (аудиторский след) для фактов создания аккаунтов, смены прав или удаления записей.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (AC-2)"
  },
  {
    "id": 300,
    "code": "HIPAA-013",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Доступ к медданным без верификации личности (HIPAA)",
    "description": "Медицинский портал позволяет получить доступ к архивам здоровья (PHI) без прохождения подтвержденной многофакторной верификации личности.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(d)"
  },
  {
    "id": 301,
    "code": "MCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие права на исправление неточных данных (Minnesota MCDPA)",
    "description": "Сайт для жителей Миннесоты не предоставляет механизм исправления ошибок в собранных персональных данных пользователей.",
    "severity": "serious",
    "reference": "Minnesota MCDPA, Sec. 325O.04"
  },
  {
    "id": 302,
    "code": "TXSC-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Таргетированная реклама несовершеннолетним (Texas SCOPE)",
    "description": "Социальный ресурс показывает таргетированную рекламу техасским подросткам на базе профилирования, что запрещено законом SCOPE.",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.052"
  },
  {
    "id": 303,
    "code": "UTSM-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Разрешенные личные сообщения подросткам от посторонних (Utah SMRA)",
    "description": "Сайт не блокирует по умолчанию функцию личных сообщений несовершеннолетним от учетных записей посторонних лиц согласно закону Юты SMRA.",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-201"
  },
  {
    "id": 304,
    "code": "FLDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Скрытие параметров ранжирования поисковой выдачи (Florida FDBR)",
    "description": "Поисковый ресурс или директория не раскрывает алгоритмы и параметры ранжирования выдачи для жителей Флориды.",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.714"
  },
  {
    "id": 305,
    "code": "CTDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Профилирование несовершеннолетних в коммерческих целях (Connecticut SB 3)",
    "description": "Сайт составляет профили поведения несовершеннолетних из Коннектикута для таргетинга рекламы без согласия опекунов.",
    "severity": "critical",
    "reference": "CTDPA SB 3, Sec. 5"
  },
  {
    "id": 306,
    "code": "CAAD-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Манипуляции интерфейсом детей / Dark Patterns (CA AADC)",
    "description": "Сайт использует игровые механики и скрытые элементы для принуждения детей к отправке email или трате денег.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 307,
    "code": "MDAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Включенное отслеживание детей по умолчанию (Maryland MODPA)",
    "description": "Сайт не отключает поведенческие трекеры по умолчанию для пользователей из Мэриленда младше 18 лет.",
    "severity": "serious",
    "reference": "Maryland MODPA, Sec. 14-45"
  },
  {
    "id": 308,
    "code": "INDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие описания сбора чувствительных данных (Indiana CDPA)",
    "description": "Политика конфиденциальности для жителей Индианы не перечисляет собираемые категории конфиденциальных данных и цели их обработки.",
    "severity": "critical",
    "reference": "Indiana CDPA, Sec. 24-15-4"
  },
  {
    "id": 309,
    "code": "TNIP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Превышение сроков ответов на запросы прав (Tennessee TIPA)",
    "description": "Сайт не гарантирует обработку запросов пользователей из Теннесси на экспорт/удаление данных в установленный законом 45-дневный срок.",
    "severity": "serious",
    "reference": "Tennessee TIPA, Sec. 47-18"
  },
  {
    "id": 310,
    "code": "NHPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие кнопки удаления данных для жителей Нью-Гэмпшира (NHPA)",
    "description": "Сайт не предлагает жителям Нью-Гэмпшира понятный инструмент или форму для полного удаления собранных личных данных.",
    "severity": "serious",
    "reference": "New Hampshire Privacy Act, Sec. 507-H.4"
  },
  {
    "id": 311,
    "code": "AADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Повторный ввод одних и тех же данных в формах (WCAG 2.2)",
    "description": "Многошаговые формы заставляют пользователя повторно вводить ранее предоставленные данные без автозаполнения.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 312,
    "code": "AADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступный вход через когнитивные тесты / CAPTCHA (WCAG 2.2)",
    "description": "Вход на сайт требует прохождения когнитивных тестов (головоломки, переписывание букв с картинок) без предоставления альтернативного доступного метода.",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 313,
    "code": "AADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Непоследовательное расположение контактов поддержки (WCAG 2.2)",
    "description": "Сайт размещает контакты поддержки или чаты в разных местах на разных страницах, мешая пользователям с нарушениями когнитивных функций.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.2.6"
  },
  {
    "id": 314,
    "code": "AADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Обязательное перетаскивание без альтернативы кликом (WCAG 2.2)",
    "description": "Элементы управления требуют перетаскивания мышью (drag-and-drop) без возможности выполнения операции простыми кликами.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 315,
    "code": "AADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Горизонтальная прокрутка при ширине 320px (WCAG 2.1)",
    "description": "Сайт вынуждает пользователя прокручивать страницу по горизонтали при ширине экрана 320px, ухудшая доступность.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.10"
  },
  {
    "id": 316,
    "code": "AADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Наложение текста при изменении межстрочных интервалов (WCAG 2.1)",
    "description": "Текстовые блоки наползают друг на друга или обрезаются при увеличении высоты строк или межсимвольного интервала в браузере.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.4.12"
  },
  {
    "id": 317,
    "code": "AADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Автовоспроизведение медиа без возможности остановки (WCAG 2.1)",
    "description": "Сайт запускает автоматическую прокрутку каруселей или видео на фоне без возможности поставить их на паузу.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.2.2"
  },
  {
    "id": 318,
    "code": "AADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие подсказок о формате ввода в формах (WCAG 2.1)",
    "description": "Поля ввода сложных форматов (даты, телефоны) не содержат плейсхолдеров или текстовых примеров правильного заполнения.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 3.3.2"
  },
  {
    "id": 319,
    "code": "AADA-011",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Динамические статусы не озвучиваются скринридером (WCAG 2.1)",
    "description": "Всплывающие уведомления об успехе или ошибки формы добавляются в DOM без атрибута role=\"status\" или aria-live.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 4.1.3"
  },
  {
    "id": 320,
    "code": "AADA-012",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Нелогичный порядок перехода по клавише TAB (WCAG 2.1)",
    "description": "Фокус клавиатуры перемещается по интерактивным элементам в хаотичном порядке, не совпадающем с визуальной сеткой сайта.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.3"
  },
  {
    "id": 321,
    "code": "GDPR-018",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Нераскрытие стандартов шифрования данных (GDPR)",
    "description": "Политика конфиденциальности собирает личные данные, но умалчивает об используемых стандартах шифрования (например, AES-256) при хранении.",
    "severity": "serious",
    "reference": "GDPR Article 32"
  },
  {
    "id": 322,
    "code": "GDPR-019",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие раскрытия решений об адекватности защиты (GDPR)",
    "description": "Политика не раскрывает, подпадает ли целевая страна за пределами ЕС под решение Еврокомиссии об адекватности мер защиты.",
    "severity": "moderate",
    "reference": "GDPR Article 13(1)(f)"
  },
  {
    "id": 323,
    "code": "GDPR-020",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие инструкций на случай утечки данных (GDPR)",
    "description": "На сайте нет информации или специального адреса, описывающего действия пользователей при компрометации их персональных данных.",
    "severity": "serious",
    "reference": "GDPR Article 34"
  },
  {
    "id": 324,
    "code": "PIPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нераскрытие мест физического хранения данных (Canada PIPEDA)",
    "description": "Политика для канадских пользователей не указывает точные географические локации (провинции, страны), где размещены сервера с их данными.",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.5"
  },
  {
    "id": 325,
    "code": "PIPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие информации о стоимости обработки запросов (Canada PIPEDA)",
    "description": "Политика конфиденциальности для канадцев не информирует о возможном наличии платы или сборов за обработку официальных запросов к данным.",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.9"
  },
  {
    "id": 326,
    "code": "JPAP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нераскрытие целей передачи cookie третьим лицам (Japan APPI)",
    "description": "Сайт для японской аудитории передает рекламные куки третьим сторонам без раскрытия конкретных маркетинговых целей получателей в баннере.",
    "severity": "serious",
    "reference": "Japan APPI, Art. 27"
  },
  {
    "id": 327,
    "code": "NZPR-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Хранение данных дольше необходимого срока (New Zealand Privacy Act)",
    "description": "Сайт для жителей Новой Зеландии не декларирует и не реализует удаление личных данных сразу после достижения целей сбора согласно принципу IPP 4.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 4"
  },
  {
    "id": 328,
    "code": "THPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Скрытие права на удаление и уничтожение данных (Thailand PDPA)",
    "description": "Политика конфиденциальности сайта для жителей Таиланда скрывает или не описывает право требовать стирания или деструкции личных данных.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 30"
  },
  {
    "id": 329,
    "code": "PHDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие инструкции по подаче жалоб в NPC (Philippines DPA)",
    "description": "Политика конфиденциальности для филиппинских пользователей не разъясняет порядок подачи жалоб на нарушения в Национальную комиссию по приватности.",
    "severity": "moderate",
    "reference": "Philippines Data Privacy Act 2012, Sec. 34"
  },
  {
    "id": 330,
    "code": "LGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие уведомлений о смене политики конфиденциальности (Brazil LGPD)",
    "description": "Сайт вносит важные изменения в правила обработки данных без отправки уведомлений или показа предупреждений для бразильских пользователей.",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 9"
  },
  {
    "id": 331,
    "code": "GLBA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Скрытие права на запрет шеринга с третьими лицами (GLBA)",
    "description": "Финтех-сервис не дает клиентам возможности отказаться от передачи конфиденциальных данных неаффилированным внешним организациям.",
    "severity": "serious",
    "reference": "16 CFR Part 313.9"
  },
  {
    "id": 332,
    "code": "SEC-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие регламентов защиты клиентских записей (SEC Regulation S-P)",
    "description": "Инвестиционный сайт, зарегистрированный в SEC, не содержит ссылок на регламенты технических мер защиты данных клиентов по правилу S-P.",
    "severity": "serious",
    "reference": "SEC Regulation S-P, Sec. 248.30"
  },
  {
    "id": 333,
    "code": "PCI-017",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие инвентаризации внешнего ПО и скриптов (PCI-DSS v4.0)",
    "description": "Платежный модуль сайта использует сторонние библиотеки и фреймы без ведения задокументированного списка используемых программных модулей.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.3.2"
  },
  {
    "id": 334,
    "code": "PCI-018",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие описания управления криптографическими ключами (PCI-DSS)",
    "description": "Сайт, проводящий транзакции, не документирует и не раскрывает политики управления и хранения криптографических ключей шифрования.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 12.3.2"
  },
  {
    "id": 335,
    "code": "CYIN-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие программы ответственного разглашения уязвимостей (VDP)",
    "description": "Корпоративный сайт не публикует программу безопасной отправки уязвимостей (VDP) для белых хакеров, лишаясь преимуществ киберстрахования.",
    "severity": "serious",
    "reference": "Cyber Insurance Security Requirements"
  },
  {
    "id": 336,
    "code": "DORA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие классификации критичности внешних ИКТ-провайдеров (DORA)",
    "description": "Финансовая панель не группирует и не раскрывает уровни критичности облачных и инфраструктурных поставщиков услуг в соответствии с DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 28"
  },
  {
    "id": 337,
    "code": "FTCS-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Отсутствие упоминаний об обучении сотрудников безопасности (FTC Safeguards)",
    "description": "Политика финтех-портала не сообщает о проведении регулярного обучения сотрудников в сфере информационной безопасности данных клиентов.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(e)"
  },
  {
    "id": 338,
    "code": "SOC2-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Неполное раскрытие политик устранения уязвимостей (SOC 2)",
    "description": "SaaS-портал не содержит упоминаний о графиках установки обновлений безопасности (патчей) для исправления системных уязвимостей.",
    "severity": "moderate",
    "reference": "SOC 2 CC7.1 (Vulnerability Management)"
  },
  {
    "id": 339,
    "code": "NIST-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие информирования о мониторинге трафика и WAF (NIST)",
    "description": "Уведомления безопасности сайта не упоминают развертывание систем обнаружения вторжений или файрволов (WAF) для защиты от атак.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (SI-4)"
  },
  {
    "id": 340,
    "code": "HIPAA-014",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствие подтверждения анализа рисков безопасности PHI (HIPAA)",
    "description": "Медицинский ресурс не подтверждает в своей политике регулярное проведение анализа рисков информационной безопасности баз PHI.",
    "severity": "critical",
    "reference": "45 CFR § 164.308(a)(1)"
  },
  {
    "id": 341,
    "code": "MDAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Профилирование подростков для рекламы (Maryland MODPA)",
    "description": "Сайт осуществляет поведенческое профилирование для показа рекламы пользователям из Мэриленда младше 18 лет.",
    "severity": "critical",
    "reference": "Maryland MODPA, Sec. 14-46"
  },
  {
    "id": 342,
    "code": "TXSC-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Сбор истории геолокации подростков без согласия родителей (Texas SCOPE)",
    "description": "Веб-приложение собирает историю перемещений несовершеннолетних пользователей без подтвержденного согласия родителей.",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.053"
  },
  {
    "id": 343,
    "code": "UTSM-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Алгоритмические рекомендации несовершеннолетним (Utah SMRA)",
    "description": "Социальный сайт использует предсказательные алгоритмы рекомендации контента на учетных записях подростков без согласия родителей.",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-301"
  },
  {
    "id": 344,
    "code": "FLDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие ссылки на запрет продажи данных (Florida FDBR)",
    "description": "Сайт для жителей Флориды не имеет на главной странице заметной ссылки «Не продавать мои личные данные» (Do Not Sell My Personal Information).",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.715"
  },
  {
    "id": 345,
    "code": "CTDP-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Продажа данных о геолокации без согласия (Connecticut SB 3)",
    "description": "Сайт собирает и продает точные геолокационные координаты жителей Коннектикута без получения предварительного явного согласия.",
    "severity": "critical",
    "reference": "Connecticut SB 3, Sec. 6"
  },
  {
    "id": 346,
    "code": "CAAD-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие публикации мер детской безопасности (CA AADC)",
    "description": "Сайт для детей не описывает в политике конфиденциальности принятые меры безопасности на основе оценок воздействия на несовершеннолетних.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 347,
    "code": "BIPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Запрещенная продажа биометрических данных (Illinois BIPA)",
    "description": "Сайт продает или делится биометрическими данными (голосовые шаблоны, маркеры лиц) жителей Иллинойса, что категорически запрещено BIPA.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(c)"
  },
  {
    "id": 348,
    "code": "HIPAA-015",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Ненадлежащее обезличивание медицинских данных (HIPAA)",
    "description": "Медицинский ресурс публикует обезличенные карты здоровья, содержащие почтовые индексы или точные даты рождения, нарушая правила Safe Harbor.",
    "severity": "critical",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 349,
    "code": "DORA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений об условиях договоров с ИКТ-провайдерами (DORA)",
    "description": "Финансовый сайт не информирует о наличии в договорах с облачными провайдерами обязательных пунктов о кибербезопасности и переносимости.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30.2"
  },
  {
    "id": 350,
    "code": "FTCS-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Отсутствие публикации плана реагирования на инциденты (FTC Safeguards)",
    "description": "Финтех-ресурс не отображает в политиках безопасности резюме своего Плана реагирования на инциденты утечки данных клиентов.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(g)"
  },
  {
    "id": 351,
    "code": "ADA-106",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Нарушение минимального вида фокуса",
    "description": "Индикатор фокуса клавиатуры на веб-сайте не имеет минимальной площади или контраста по отношению к соседним цветам, что затрудняет видимость активного элемента для пользователей клавиатуры, нарушая WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 352,
    "code": "ADA-107",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Фокус скрыт липкими элементами",
    "description": "Интерактивные элементы, сфокусированные с клавиатуры, полностью или частично перекрываются закрепленными (sticky) заголовками, подвалами или плавающими оверлеями, нарушая WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.12"
  },
  {
    "id": 353,
    "code": "ADA-108",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Перетаскивание не имеет альтернативы в виде кликов",
    "description": "Жесты перетаскивания (например, ползунки, канбан-доски) не имеют альтернативы в виде кликов или тапов, блокируя пользователей с нарушениями моторики, нарушая WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 354,
    "code": "ADA-109",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Интерактивная область меньше минимума",
    "description": "Интерактивные цели (кнопки, ссылки) имеют размер менее 24x24 пикселей CSS без достаточных отступов, вызывая ложные клики у мобильных пользователей, нарушая WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 355,
    "code": "ADA-110",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Требование повторного ввода данных в формах",
    "description": "Формы требуют от пользователей повторного ввода информации, ранее отправленной в той же сессии, вместо автозаполнения или предоставления вариантов выбора, нарушая WCAG 2.2.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 356,
    "code": "ADA-111",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступная двухфакторная аутентификация",
    "description": "Процесс входа заставляет проходить когнитивные тесты (запоминание паролей, переписывание кодов, решение головоломок) без возможности копирования/вставки или аппаратных ключей, нарушая WCAG 2.2.",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 357,
    "code": "ADA-112",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Скрытие фокуса (повышенный уровень)",
    "description": "Сфокусированные интерактивные элементы полностью видны без малейшего перекрытия макетами при строгих аудитах доступности, нарушая стандарты WCAG 2.2 уровня AAA.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 2.4.13"
  },
  {
    "id": 358,
    "code": "ADA-113",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Исключение когнитивной авторизации (повышенное)",
    "description": "Формы входа полностью исключают когнитивные тесты (включая распознавание объектов и написание паттернов), полагаясь только на доступную авторизацию, нарушая WCAG 2.2 уровня AAA.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.9"
  },
  {
    "id": 359,
    "code": "ADA-114",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие доступных текстовых расшифровок видео",
    "description": "Встроенные видеоролики с обучающей или коммерческой информацией не имеют синхронизированных или связанных текстовых стенограмм, создавая барьеры для слепоглухих, нарушая ADA Title III.",
    "severity": "serious",
    "reference": "ADA Title III / WCAG SC 1.2.8"
  },
  {
    "id": 360,
    "code": "ADA-115",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров для записанных медиафайлов",
    "description": "Маркетинговые или презентационные видеоролики не содержат точных закрытых субтитров (CC), блокируя доступ глухим или слабослышащим посетителям, нарушая ADA Title III.",
    "severity": "critical",
    "reference": "ADA Title III / WCAG SC 1.2.2"
  },
  {
    "id": 361,
    "code": "HIPAA-016",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Небезопасные формы записи пациентов на прием",
    "description": "Интерфейсы онлайн-записи передают защищенную медицинскую информацию (PHI), такую как симптомы или имена врачей, в незашифрованных параметрах URL, нарушая стандарты безопасности HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)(1)"
  },
  {
    "id": 362,
    "code": "HIPAA-017",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Несанкционированные пиксели маркетинга на экранах записи",
    "description": "Системы записи пациентов запускают аналитические или рекламные трекеры (например, Meta Pixel) без получения явного подписанного согласия пациента, нарушая правила конфиденциальности HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.508"
  },
  {
    "id": 363,
    "code": "HIPAA-018",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствие логирования активности доступа к порталу",
    "description": "База данных медицинского портала не фиксирует личность пользователя, метку времени и действия при загрузке медкарты или анализов, нарушая требования HIPAA к аудиту.",
    "severity": "serious",
    "reference": "45 CFR § 164.312(b)"
  },
  {
    "id": 364,
    "code": "HIPAA-019",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Политика конфиденциальности медицинских данных без даты вступления в силу",
    "description": "Уведомление о правилах конфиденциальности (NPP), размещенное на веб-сайте клиники, не содержит даты вступления в силу, нарушая правила раскрытия информации HIPAA.",
    "severity": "moderate",
    "reference": "45 CFR § 164.520"
  },
  {
    "id": 365,
    "code": "HIPAA-020",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Несоответствующий процесс удаления медицинских данных",
    "description": "Портал не удаляет собранные фитнес- и медицинские данные потребителей в установленный законом 30-дневный срок по запросу, нарушая закон штата Вашингтон MHMDA.",
    "severity": "serious",
    "reference": "RCW 19.373.040"
  },
  {
    "id": 366,
    "code": "HIPAA-021",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствие согласия на сбор медицинских данных по MHMDA",
    "description": "Сайт для отслеживания здоровья собирает показатели самочувствия у жителей штата Вашингтон без отдельного баннера для получения согласия, нарушая MHMDA.",
    "severity": "critical",
    "reference": "RCW 19.373.030"
  },
  {
    "id": 367,
    "code": "HIPAA-022",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Небезопасное хранение загруженных рецептов",
    "description": "Файлы рецептов или справок, загружаемые через портал, попадают в общедоступные облачные хранилища или доступны по простым URL-адресам, нарушая стандарты безопасности HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(2)(iv)"
  },
  {
    "id": 368,
    "code": "HIPAA-023",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Отсутствие автоматического выхода из личного кабинета пациента",
    "description": "Сессии медицинского кабинета остаются активными бессрочно после бездействия пользователя, открывая доступ третьим лицам, нарушая требования HIPAA по безопасности.",
    "severity": "serious",
    "reference": "45 CFR § 164.312(a)(2)(iii)"
  },
  {
    "id": 369,
    "code": "HIPAA-024",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Общие административные учетные данные портала пациентов",
    "description": "Сотрудники клиники входят в панель управления портала под общей учетной записью, что исключает аудит изменений медкарт, нарушая требования HIPAA об уникальных пользователях.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(1)"
  },
  {
    "id": 370,
    "code": "HIPAA-025",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Ошибки обезличивания в отчетах портала",
    "description": "Функция экспорта генерирует статистические отчеты, оставляя даты рождения или почтовые индексы пациентов без должного обезличивания, нарушая правила конфиденциальности HIPAA.",
    "severity": "serious",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 371,
    "code": "CCPA-011",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Темные паттерны в ссылках отказа от согласия",
    "description": "Ссылка 'Do Not Sell or Share My Personal Information' оформлена так, что по ней сложно кликнуть, или она выглядит как неактивная по сравнению с кнопкой принятия, нарушая CCPA.",
    "severity": "critical",
    "reference": "11 CCR § 7004"
  },
  {
    "id": 372,
    "code": "CCPA-012",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие логов проверки сигналов Global Privacy Control (GPC)",
    "description": "Менеджер согласия сайта не сохраняет внутренние логи о том, что сигналы GPC пользователя были приняты и скрипты отключены, нарушая требования CPPA к готовности к аудиту.",
    "severity": "serious",
    "reference": "11 CCR § 7025"
  },
  {
    "id": 373,
    "code": "CCPA-013",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие уведомления о финансовом поощрении",
    "description": "Всплывающие окна интернет-магазина предлагают скидки за подписку (сбор email) без предоставления ссылки на подробное Уведомление о финансовом поощрении, нарушая CCPA.",
    "severity": "serious",
    "reference": "11 CCR § 7016"
  },
  {
    "id": 374,
    "code": "CCPA-014",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Несоответствующая политика конфиденциальности для сотрудников и соискателей",
    "description": "Формы подачи резюме и внутренний интранет-портал не содержат политику конфиденциальности, описывающую обработку персональных данных сотрудников и соискателей, нарушая CPRA.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.100"
  },
  {
    "id": 375,
    "code": "CCPA-015",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие сроков хранения конфиденциальных данных",
    "description": "Политика конфиденциальности не указывает период хранения (или критерии его определения) для каждой категории собираемых конфиденциальных персональных данных, нарушая закон Калифорнии.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.130"
  },
  {
    "id": 376,
    "code": "CCPA-016",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие портала для реализации права на исправление данных",
    "description": "Личный кабинет пользователя не предоставляет интерфейс или форму самообслуживания, позволяющую потребителям исправлять неточные личные данные в базе, нарушая CPRA.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.106"
  },
  {
    "id": 377,
    "code": "CCPA-017",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Скрытое отслеживание геолокации без согласия",
    "description": "Веб-приложение отслеживает точные координаты пользователя в радиусе 560 метров без предоставления явного запроса на ограничение использования конфиденциальных данных, нарушая CCPA.",
    "severity": "critical",
    "reference": "11 CCR § 7027"
  },
  {
    "id": 378,
    "code": "CCPA-018",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Неполное раскрытие процедуры подачи запросов через представителей",
    "description": "Политика конфиденциальности не объясняет процедуры проверки и формы, необходимые при отправке запросов потребителем через уполномоченного представителя, нарушая CCPA.",
    "severity": "moderate",
    "reference": "11 CCR § 7063"
  },
  {
    "id": 379,
    "code": "CCPA-019",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие ежегодной статистики обработки запросов конфиденциальности",
    "description": "Компании, обрабатывающие данные более 10 млн калифорнийцев, не собирают и не публикуют ежегодную статистику полученных и обработанных запросов, нарушая CCPA.",
    "severity": "moderate",
    "reference": "11 CCR § 7102"
  },
  {
    "id": 380,
    "code": "CCPA-020",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Профилирование несовершеннолетних пользователей по умолчанию",
    "description": "Онлайн-сервисы, доступные для детей, по умолчанию используют поведенческое профилирование, таргетированную рекламу или фоновое отслеживание локации, нарушая CA AADC.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 381,
    "code": "FTC-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Препятствия при отмене автоматического продления подписки",
    "description": "Форма оплаты подписывает пользователей на регулярные платежи, но не предлагает простой кнопки онлайн-отмены, нарушая закон ROSCA и рекомендации FTC.",
    "severity": "critical",
    "reference": "15 U.S.C. § 8403"
  },
  {
    "id": 382,
    "code": "FTC-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Ложные таймеры обратного отсчета",
    "description": "Сайт показывает таймеры обратного отсчета с надписью 'акция скоро истечет', которые сбрасываются при перезагрузке страницы, что классифицируется FTC как темный паттерн.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 383,
    "code": "FTC-013",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Предустановленные согласия на маркетинговую рассылку",
    "description": "Экраны регистрации или оплаты содержат заранее отмеченные галочки для подписки на рекламу или партнерские рассылки, нарушая раздел 5 закона об FTC.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 384,
    "code": "FTC-014",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сфабрикованные отзывы, встроенные в код сайта",
    "description": "Лендинги показывают отзывы, зашитые в код JS-бандла, с рандомизированными датами для имитации свежести, нарушая запрет FTC на сфабрикованные отзывы.",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 385,
    "code": "FTC-015",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Скрытые комиссии при оплате",
    "description": "Платежные шлюзы скрывают сервисные сборы или транзакционные наценки вплоть до финального экрана подтверждения, нарушая запреты FTC на скрытые комиссии.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 386,
    "code": "FTC-016",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Автоматическое добавление товаров в корзину интернет-магазина",
    "description": "Интерфейс корзины автоматически добавляет платные гарантии или страховку доставки без выбора пользователя, нарушая правила FTC против темных паттернов.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 387,
    "code": "FTC-017",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Отсутствие двухфакторной аутентификации на финансовых порталах",
    "description": "Веб-консоли для доступа к кредитным историям не требуют обязательной двухфакторной аутентификации (MFA) для персонала, нарушая правило FTC Safeguards.",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 388,
    "code": "FTC-018",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Недействительный процесс согласия родителей на детских порталах",
    "description": "Сайты для детей собирают данные, используя простые галочки или неподтвержденные email для одобрения родителями вместо методов проверки по закону COPPA.",
    "severity": "critical",
    "reference": "16 CFR § 312.5"
  },
  {
    "id": 389,
    "code": "FTC-019",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Передача поисковых запросов о здоровье рекламным пикселям",
    "description": "Wellness-платформы, не регулируемые HIPAA, передают запросы пользователей о болезнях рекламным сетям, нарушая правила FTC о раскрытии медицинских данных.",
    "severity": "critical",
    "reference": "16 CFR Part 318"
  },
  {
    "id": 390,
    "code": "FTC-020",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Немаркированный спонсорский контент",
    "description": "Блоги интернет-магазинов, содержащие платные партнерские ссылки, не отображают четких меток раскрытия информации (например, 'Реклама'), нарушая правила FTC.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 391,
    "code": "TCPA-016",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Предустановленные чекбоксы согласия на SMS-рассылку",
    "description": "Регистрационные формы содержат заранее отмеченные галочки для подписки на рекламные SMS, нарушая правила TCPA о письменном согласии.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227"
  },
  {
    "id": 392,
    "code": "TCPA-017",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Неполные условия подписки на SMS-рассылки",
    "description": "Формы сбора телефонов не содержат текста о том, что 'может взиматься плата за сообщения', и не указывают частоту рассылок, нарушая требования TCPA.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 393,
    "code": "TCPA-018",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие раскрытия информации об операторах связи при подписке",
    "description": "Поля отправки номеров для SMS не содержат информации об ответственности операторов связи и инструкции по поддержке, нарушая правила CTIA.",
    "severity": "serious",
    "reference": "CTIA Guidelines"
  },
  {
    "id": 394,
    "code": "TCPA-019",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Несоответствующая система отписки от SMS",
    "description": "Автоматические SMS-рассылки не обрабатывают стандартные ключевые слова отписки (такие как STOP, CANCEL или UNSUBSCRIBE), нарушая закон TCPA.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 395,
    "code": "TCPA-020",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие физического адреса в исходящих письмах",
    "description": "Маркетинговые письма, отправляемые сайтом, не содержат действующего физического адреса компании, нарушая требования закона CAN-SPAM.",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 396,
    "code": "TCPA-021",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Неработающий механизм отписки в подвале писем",
    "description": "Ссылки отписки в подвале системных писем ведут на неработающие страницы или требуют входа в аккаунт, нарушая требования CAN-SPAM.",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 397,
    "code": "TCPA-022",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Превышение сроков обработки запросов на отписку",
    "description": "Система не исключает отписанные email из баз рекламных рассылок в течение установленных законом 10 рабочих дней, нарушая CAN-SPAM.",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 398,
    "code": "TCPA-023",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Автоматический обзвон и SMS без письменного согласия",
    "description": "Сайты собирают контакты для автоматических звонков без предварительного письменного согласия жителей Флориды, нарушая строгий закон Florida FTSA.",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.059"
  },
  {
    "id": 399,
    "code": "TCPA-024",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отсутствие сохранения логов запросов Do Not Call",
    "description": "База данных телемаркетинга не сохраняет записи запросов DNC потребителей в течение обязательных пяти лет с даты отправки, нарушая TCPA.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(d)(6)"
  },
  {
    "id": 400,
    "code": "TCPA-025",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Отправка автоматических сообщений во внеурочное время",
    "description": "Маркетинговые серверы отправляют автоматические SMS ранее 8:00 утра или позднее 21:00 по местному времени получателя, нарушая правила TCPA.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(c)(2)"
  },
  {
    "id": 401,
    "code": "GDPR-021",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Предустановленные второстепенные куки при загрузке",
    "description": "Сайт устанавливает аналитические или рекламные файлы cookie до получения активного согласия от посетителя из ЕС, нарушая директиву ePrivacy и GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 4(11) / ePrivacy Directive"
  },
  {
    "id": 402,
    "code": "GDPR-022",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Неравный дизайн кнопок отклонения и принятия согласия",
    "description": "Баннер cookie прячет кнопку отклонения или заставляет переходить в подменю для отказа, допуская принятие в один клик, нарушая правила GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 7(4) / Guidelines 05/2020"
  },
  {
    "id": 403,
    "code": "GDPR-023",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие контактных данных DPO в открытом доступе",
    "description": "Политика конфиденциальности сайта не содержит официальных контактных данных назначенного сотрудника по защите данных (DPO), нарушая GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 13(1)(b) & Art. 37"
  },
  {
    "id": 404,
    "code": "GDPR-024",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие раскрытия соглашений DPA с облачными провайдерами",
    "description": "Формы собирают данные граждан ЕС, но не содержат сведений о подписанных соглашениях об обработке данных (DPA) с провайдерами, нарушая ст. 28 GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 28"
  },
  {
    "id": 405,
    "code": "GDPR-025",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие безопасного канала подачи запросов SAR",
    "description": "Платформа не предоставляет безопасный авторизованный канал для обработки запросов субъектов данных (SAR), создавая риск раскрытия третьим лицам, нарушая GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 15 / Right of Access"
  },
  {
    "id": 406,
    "code": "GDPR-026",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Необоснованный отказ в удалении персональных данных",
    "description": "Служба поддержки портала необоснованно отказывает или затягивает запросы пользователей на 'Право на забвение' без законных оснований, нарушая ст. 17 GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 17 / Right to be Forgotten"
  },
  {
    "id": 407,
    "code": "GDPR-027",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Настройки приватности включены по умолчанию",
    "description": "Личный кабинет по умолчанию делает профили, файлы геолокации или историю активности открытыми для других или партнеров при регистрации, нарушая ст. 25 GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 25 / Privacy by Design"
  },
  {
    "id": 408,
    "code": "GDPR-028",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Небезопасная отправка форм обратной связи через email",
    "description": "Формы обратной связи передают личные сообщения и данные пользователя по незашифрованным каналам HTTP вместо HTTPS, нарушая ст. 32 GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 32 / Security of Processing"
  },
  {
    "id": 409,
    "code": "GDPR-029",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Непроведение обязательной оценки DPIA",
    "description": "Веб-приложения, отслеживающие крупномасштабные поведенческие данные, не проводят Оценку воздействия на защиту данных (DPIA), нарушая GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 35"
  },
  {
    "id": 410,
    "code": "GDPR-030",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Трансграничная передача данных без стандартных условий",
    "description": "Данные пользователей передаются на серверы в третьих странах (без решений об адекватности уровня защиты) при отсутствии Стандартных договорных условий (SCC), нарушая GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 44-46"
  },
  {
    "id": 411,
    "code": "PCI-019",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Сохранение кодов CVV в базе данных",
    "description": "Платежная база данных сохраняет проверочные коды карт (CVV/CVC) после завершения авторизации платежа, допуская критическое нарушение PCI DSS.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.2.2"
  },
  {
    "id": 412,
    "code": "PCI-020",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Слабые наборы шифров TLS на сервере",
    "description": "Платежный сервер принимает соединения по протоколам TLS 1.0 или TLS 1.1 со слабыми шифрами, нарушая требования PCI по защите передаваемых данных.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 4.2.1"
  },
  {
    "id": 413,
    "code": "PCI-021",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие заголовков CSP на платежных страницах",
    "description": "Страницы оплаты не содержат заголовков политики безопасности контента (CSP), открывая поля ввода для XSS-инъекций и нарушая правила PCI.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 414,
    "code": "PCI-022",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие аудита внешних скриптов Javascript",
    "description": "Страницы оплаты загружают внешние скрипты (например, чат-виджеты) на те же страницы, где расположены формы ввода карт, без аудита, нарушая PCI DSS.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 415,
    "code": "PCI-023",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие мониторинга несанкционированного изменения платежных форм",
    "description": "Интеграция платежей не имеет систем контроля целостности в реальном времени для обнаружения изменений или инъекций на страницах оплаты, нарушая требования PCI.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 11.6.1"
  },
  {
    "id": 416,
    "code": "PCI-024",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Дефолтные учетные данные панели администратора",
    "description": "Панель управления или связанные кабинеты используют стандартные заводские пароли или логины администратора, нарушая требования безопасности PCI.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 2.1.1"
  },
  {
    "id": 417,
    "code": "PCI-025",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Совместное использование сессий операторами платежей",
    "description": "Сотрудники бухгалтерии используют общие сессии входа или многопользовательские аккаунты при управлении транзакциями, нарушая директивы PCI.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 8.2.1"
  },
  {
    "id": 418,
    "code": "PCI-026",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Известные уязвимости CVE в стеке обработки платежей",
    "description": "Сервисы маршрутизации платежей используют устаревшие веб-фреймворки с открытыми критическими уязвимостями CVE, нарушая правила безопасности PCI.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.2.1"
  },
  {
    "id": 419,
    "code": "PCI-027",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Незашифрованное хранение номеров платежных карт (PAN)",
    "description": "Внутренние базы данных сохраняют полные номера карт (PAN) в открытом виде без использования надежного шифрования, совершая грубое нарушение PCI.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.4"
  },
  {
    "id": 420,
    "code": "PCI-028",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие акта о прохождении тестирования на проникновение",
    "description": "Разделы безопасности не содержат подтверждений прохождения ежегодного независимого внешнего пентеста, нарушая списки проверок PCI.",
    "severity": "moderate",
    "reference": "PCI DSS v4.0 Requirement 11.4"
  },
  {
    "id": 421,
    "code": "STATE-011",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Согласие на продажу конфиденциальных данных малого бизнеса по TDPSA Техаса",
    "description": "Сайты малого бизнеса, собирающие конфиденциальные данные жителей Техаса, продают их без предварительного согласия, нарушая правила TDPSA.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.055"
  },
  {
    "id": 422,
    "code": "STATE-012",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Апелляция при отказе в исполнении прав по VCDPA Вирджинии",
    "description": "Политика конфиденциальности не описывает процесс обжалования отказа в исполнении прав субъекта данных, нарушая закон штата Вирджиния VCDPA.",
    "severity": "serious",
    "reference": "Va. Code § 59.1-577"
  },
  {
    "id": 423,
    "code": "STATE-013",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие поддержки универсального отказа от отслеживания по CPA Колорадо",
    "description": "Интернет-магазины, ориентированные на жителей Колорадо, не обрабатывают автоматически сигналы универсального отказа (UOOM), нарушая закон CPA.",
    "severity": "critical",
    "reference": "4 ... (Colorado CPA, 4 CCR 904-3 Rule 5.01)"
  },
  {
    "id": 424,
    "code": "STATE-014",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Передача медицинских данных без согласия по DPDPA Делавэра",
    "description": "Потребительские базы передают поисковые запросы о диагнозах сторонним брокерам рекламы без согласия, нарушая DPDPA Делавэра.",
    "severity": "critical",
    "reference": "6 Del. C. § 12D-106"
  },
  {
    "id": 425,
    "code": "STATE-015",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Неполный список третьих лиц по OCPA Орегона",
    "description": "Политика содержит общие категории обработчиков вместо указания конкретных юрлиц, получающих данные, нарушая закон штата Орегон OCPA.",
    "severity": "moderate",
    "reference": "ORS § 646A.825"
  },
  {
    "id": 426,
    "code": "STATE-016",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Раскрытие продажи конфиденциальных данных по NJPA Нью-Джерси",
    "description": "Портал продает данные жителей Нью-Джерси с конфиденциальными сведениями без явного уведомления и согласия пользователя, нарушая NJPA.",
    "severity": "critical",
    "reference": "N.J.S.A. 56:8-166"
  },
  {
    "id": 427,
    "code": "STATE-017",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Неполное раскрытие прав потребителей по UCPA Юты",
    "description": "В соглашении отсутствуют законные разделы с описанием прав жителей Юты, сроков проверки и шагов по отказу от обработки, нарушая UCPA.",
    "severity": "moderate",
    "reference": "Utah Code § 13-61-302"
  },
  {
    "id": 428,
    "code": "STATE-018",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Назначение сотрудника по защите данных по NHPA Нью-Гэмпшира",
    "description": "Крупные сайты, обрабатывающие данные жителей Нью-Гэмпшира, не публикуют контакт ответственного лица по комплаенсу, нарушая закон NHPA.",
    "severity": "moderate",
    "reference": "N.H. Rev. Stat. § 507-H:6"
  },
  {
    "id": 429,
    "code": "STATE-019",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Согласие на обработку детских данных по MTCDPA Монтаны",
    "description": "Порталы, обрабатывающие данные жителей Монтаны в возрасте 13-16 лет, не запрашивают явного согласия на обработку, нарушая MTCDPA.",
    "severity": "critical",
    "reference": "Mont. Code § 30-14-311"
  },
  {
    "id": 430,
    "code": "STATE-020",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Неполные сроки реагирования на запросы по NEDPA Небраски",
    "description": "Условия поддержки не гарантируют соблюдение обязательного 45-дневного срока ответа на запросы пользователей, нарушая закон Небраски NEDPA.",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301"
  },
  {
    "id": 431,
    "code": "FIN-011",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Отсутствие раскрытия процедур уведомления об инцидентах ИКТ по DORA",
    "description": "Финансовые платформы не описывают процедуры уведомления регуляторов о критических сбоях в работе ИТ-сервисов, нарушая правила DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 19"
  },
  {
    "id": 432,
    "code": "FIN-012",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Ошибки шифрования файлов клиентов в открытом виде по GLBA",
    "description": "Порталы выдачи займов хранят налоговые или банковские отчеты без надежного шифрования (AES-256 или аналог), нарушая требования GLBA Safeguards.",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(1)"
  },
  {
    "id": 433,
    "code": "FIN-013",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Нарушение отчетности о бенефициарах компании по CTA",
    "description": "Кабинеты регистрации юрлиц не содержат защищенных полей для ввода данных о бенефициарах бизнеса, нарушая требования CTA.",
    "severity": "serious",
    "reference": "31 U.S.C. § 5336"
  },
  {
    "id": 434,
    "code": "FIN-014",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Недостаточное раскрытие существенных угроз в отчетах SEC 10-K",
    "description": "Страницы для инвесторов публичных компаний содержат архивы отчетов SEC без подробных оценок существенных рисков кибербезопасности, нарушая правила SEC.",
    "severity": "serious",
    "reference": "SEC Cybersecurity Rule (Form 10-K Item 1C)"
  },
  {
    "id": 435,
    "code": "FIN-015",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Недостоверные заявления о доходности по правилу FINRA 2210",
    "description": "Страницы брокеров рекламируют доходность активов или рост портфелей без столь же заметных предупреждений о рисках, нарушая правило FINRA 2210.",
    "severity": "serious",
    "reference": "FINRA Rule 2210"
  },
  {
    "id": 436,
    "code": "FIN-016",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об оценке внутреннего контроля по SOX",
    "description": "Инвесторские порталы не публикуют ежегодные отчеты руководства по внутреннему аудиту финансовой отчетности, нарушая раздел 404 закона SOX.",
    "severity": "moderate",
    "reference": "SOX Section 404"
  },
  {
    "id": 437,
    "code": "FIN-017",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Отсутствие реестров рисков третьих лиц по DORA",
    "description": "Финансовые приложения подключают сторонние API без ведения консолидированного реестра поставщиков ИКТ и их сертификатов безопасности, нарушая DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 438,
    "code": "FIN-018",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Неполные ежегодные уведомления о праве отказа по GLBA",
    "description": "Порталы потребительского банкинга не предоставляют инструкции по ежегодному отказу от передачи личных данных партнерам, нарушая правила GLBA.",
    "severity": "serious",
    "reference": "16 CFR § 313.9"
  },
  {
    "id": 439,
    "code": "FIN-019",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Формат логов, допускающий изменения, вопреки правилу FINRA 4511",
    "description": "Торговые системы записывают транзакции и логи общения с клиентами в обычные БД, допускающие изменения, вместо накопителей WORM, нарушая FINRA.",
    "severity": "critical",
    "reference": "FINRA Rule 4511"
  },
  {
    "id": 440,
    "code": "FIN-020",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Удаление электронной истории до истечения 5 лет по правилу CFTC 1.31",
    "description": "Торговые порталы не настраивают системы хранения данных на обязательный пятилетний срок хранения финансовых логов и подтверждений, нарушая CFTC 1.31.",
    "severity": "critical",
    "reference": "CFTC Rule 1.31"
  },
  {
    "id": 441,
    "code": "OPS-011",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствие предупреждений об анализе эмоций с помощью ИИ",
    "description": "Чат-боты техподдержки на базе ИИ анализируют эмоциональное состояние пользователя без показа предупреждений, нарушая закон ЕС об искусственном интеллекте.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 442,
    "code": "OPS-012",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Запрещенные системы биометрической категоризации с помощью ИИ",
    "description": "Интерфейсы верификации распределяют пользователей по категориям на основе биометрии из загруженных фото лица без законных оснований, нарушая закон ЕС об ИИ.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 5(1)(c)"
  },
  {
    "id": 443,
    "code": "OPS-013",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствие водяных знаков метаданных в сгенерированных ИИ медиа",
    "description": "Генеративные ИИ-сервисы, создающие изображения или тексты, не вшивают стандартные водяные знаки о генерации контента ИИ, нарушая закон ЕС об ИИ.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 444,
    "code": "OPS-014",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Раскрытие параметров алгоритмических лент по DSA ЕС",
    "description": "Рекомендательные системы порталов не раскрывают ключевые критерии ранжирования и параметры алгоритмических лент новостей, нарушая закон DSA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 27"
  },
  {
    "id": 445,
    "code": "OPS-015",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствие репозитория рекламы по DSA ЕС",
    "description": "Крупные издательские платформы не размещают открытый архив рекламы с именами спонсоров и параметрами таргетинга, нарушая требования DSA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 446,
    "code": "OPS-016",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствие портала обжалования теневого бана по DSA",
    "description": "Сайты, ограничивающие публикации пользователей (теневой бан), не уведомляют авторов и не дают возможности обжалования, нарушая закон DSA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 20"
  },
  {
    "id": 447,
    "code": "OPS-017",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отказ в приеме цифровых кошельков eIDAS 2.0",
    "description": "Порталы верификации не поддерживают интеграцию с официальными европейскими цифровыми кошельками удостоверения личности, нарушая eIDAS 2.0.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6a"
  },
  {
    "id": 448,
    "code": "OPS-018",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствие шлюза сообщения об уязвимостях по CRA",
    "description": "Сайты производителей ПО или оборудования не содержат выделенного интерфейса для отправки отчетов об уязвимостях, нарушая закон CRA.",
    "severity": "serious",
    "reference": "Cyber Resilience Act (CRA), Art. 11"
  },
  {
    "id": 449,
    "code": "OPS-019",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствие регистрации DPO в ANPD Бразилии по LGPD",
    "description": "Сайты, работающие на рынке Бразилии, собирают данные пользователей без публикации и регистрации DPO в органах ANPD, нарушая закон LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 450,
    "code": "OPS-020",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Отсутствие проверки согласия опекунов по DPDP Индии",
    "description": "Сайты, собирающие данные жителей Индии моложе 18 лет, не проводят верификацию согласия родителей или опекунов, нарушая закон DPDP.",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act), Sec. 9"
  },
  {
    "id": 451,
    "code": "UAEPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие согласия на трансграничную передачу данных в ОАЭ",
    "description": "Сайт передает персональные данные резидентов ОАЭ на серверы за пределами страны без получения согласия или подтверждения адекватности защиты, нарушая Федеральный закон ОАЭ № 45.",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 22"
  },
  {
    "id": 452,
    "code": "UAEPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контактов локального сотрудника по защите данных в ОАЭ",
    "description": "Сайт, ориентированный на потребителей из ОАЭ, не указывает контакты локального DPO при масштабной обработке личных данных, нарушая закон ОАЭ о защите данных.",
    "severity": "moderate",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 10"
  },
  {
    "id": 453,
    "code": "UAEPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующая процедура получения согласия детей в ОАЭ",
    "description": "Портал собирает личные данные детей в ОАЭ без проверки согласия родителей или опекунов, нарушая законы ОАЭ о защите детей.",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 6"
  },
  {
    "id": 454,
    "code": "UAEPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие ведения реестра обработки данных ОАЭ",
    "description": "Административная панель организации не фиксирует реестр операций по обработке персональных данных (ROPA) для операций в ОАЭ, нарушая закон ОАЭ.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 11"
  },
  {
    "id": 455,
    "code": "UAEPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение сроков уведомления об утечке данных в ОАЭ",
    "description": "Политика безопасности сайта не содержит обязательства немедленно уведомлять Бюро данных ОАЭ о любых утечках данных, угрожающих приватности.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 9"
  },
  {
    "id": 456,
    "code": "UAEPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие прямого отказа от маркетингового профилирования в ОАЭ",
    "description": "Личный кабинет не предоставляет пользователям из ОАЭ простой механизм в один клик для отказа от автоматических решений и профилирования, нарушая закон ОАЭ.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 18"
  },
  {
    "id": 457,
    "code": "SDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие регистрации на Национальном портале данных Саудовской Аравии",
    "description": "Организации, обрабатывающие данные граждан Саудовской Аравии, не регистрируют базы в ведомстве SDAIA, нарушая закон Королевства PDPL.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 32"
  },
  {
    "id": 458,
    "code": "SDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие согласия на прямой маркетинг в Саудовской Аравии",
    "description": "Маркетинговые формы, ориентированные на саудовских потребителей, не запрашивают отдельное явное согласие перед отправкой рекламы, нарушая закон Саудовской Аравии.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 28"
  },
  {
    "id": 459,
    "code": "SDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконное хранение конфиденциальных данных за пределами Саудовской Аравии",
    "description": "Сайты передают медицинские или финансовые данные граждан Саудовской Аравии в облачные хранилища за пределами Королевства без согласия SDAIA, совершая серьезное нарушение.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 29"
  },
  {
    "id": 460,
    "code": "SDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нераскрытие целей обработки данных саудовским пользователям",
    "description": "Политика конфиденциальности не связывает поля сбора данных с конкретными законными целями обработки, необходимыми по закону Саудовской Аравии.",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 5"
  },
  {
    "id": 461,
    "code": "SDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение сроков удаления данных по запросам из Саудовской Аравии",
    "description": "Портал поддержки не обрабатывает и не подтверждает запросы на удаление данных жителей Саудовской Аравии в установленные законом сроки, нарушая правила KSA.",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 21"
  },
  {
    "id": 462,
    "code": "SDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие согласия на отслеживание граждан Саудовской Аравии",
    "description": "Сайт запускает поведенческие трекеры или скрипты аналитики для саудовских посетителей до получения явного согласия, нарушая саудовский PDPL.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 17"
  },
  {
    "id": 463,
    "code": "ILPA-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие регистрации базы данных по закону Израиля",
    "description": "Платформа обрабатывает личные данные израильских граждан в базах объемом более 10 000 человек без обязательной регистрации, нарушая закон Израиля о защите частной жизни.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 8"
  },
  {
    "id": 464,
    "code": "ILPA-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Невыполнение обязанности уведомления о добровольности передачи данных в Израиле",
    "description": "Веб-формы не сообщают израильским потребителям, обязаны ли они передавать личные данные по закону или это делается добровольно, нарушая израильский закон.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 11"
  },
  {
    "id": 465,
    "code": "ILPA-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Несоответствующая трансграничная передача данных из Израиля",
    "description": "Базы данных передают израильские записи в третьи страны с более низким уровнем конфиденциальности без соблюдения условий регламента Израиля по трансграничной передаче.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Transfer of Data to Databases Abroad) 5761-2001"
  },
  {
    "id": 466,
    "code": "ILPA-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие проверок безопасности данных по регламентам Израиля",
    "description": "Предприятие, обрабатывающее данные израильтян, не проводит ежегодные независимые аудиты безопасности инфраструктуры баз данных, нарушая регламенты Израиля.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Data Security) 5777-2017"
  },
  {
    "id": 467,
    "code": "ILPA-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Незаконная прямая почтовая реклама без регистрации в Израиле",
    "description": "Интернет-магазин отправляет рекламные письма гражданам Израиля на основе профилирования без регистрации базы данных прямой рассылки в реестре, нарушая израильский закон.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 17C"
  },
  {
    "id": 468,
    "code": "TRKV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие явного согласия на отслеживание через cookie в Турции",
    "description": "Согласие на куки не блокирует аналитические или рекламные скрипты для посетителей из Турции до получения явного согласия, нарушая правила турецкого KVKK.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 5"
  },
  {
    "id": 469,
    "code": "TRKV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие регистрации в турецком реестре баз данных VERBIS",
    "description": "Иностранные компании, обрабатывающие личные данные жителей Турции сверх установленных лимитов, не регистрируются в реестре VERBIS, нарушая правила KVKK.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 16"
  },
  {
    "id": 470,
    "code": "TRKV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Нарушение сроков уведомления об утечках в Турции (72 часа)",
    "description": "Протоколы безопасности не гарантируют отправку уведомлений об утечках данных в Совет по защите персональных данных Турции (KVKK) в течение обязательных 72 часов.",
    "severity": "serious",
    "reference": "KVKK Board Decision on Breach Notification Timelines (Decision No. 2019/10)"
  },
  {
    "id": 471,
    "code": "TRKV-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие разъяснительного текста политики конфиденциальности в Турции",
    "description": "Веб-формы не предоставляют турецким пользователям отдельный 'Разъяснительный текст' (Aydınlatma Metni) о правах, ограничиваясь общей политикой, нарушая KVKK.",
    "severity": "serious",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 10"
  },
  {
    "id": 472,
    "code": "TRKV-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Незаконная трансграничная передача данных без согласия Совета Турции",
    "description": "Серверы баз данных переносят личные данные турецких пользователей за пределы Турции без получения явного согласия или подтверждения стандартных соглашений, нарушая KVKK.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 9"
  },
  {
    "id": 473,
    "code": "CHFADP-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие уведомлений об автоматических решениях в Швейцарии",
    "description": "Сайт использует системы автоматического скоринга или принятия решений в отношении жителей Швейцарии без раскрытия информации и предоставления права на пересмотр человеком, нарушая FADP.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 21"
  },
  {
    "id": 474,
    "code": "CHFADP-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие представителя для иностранных компаний в Швейцарии",
    "description": "Иностранные компании, масштабно обрабатывающие личные данные швейцарских потребителей, не назначают локального представителя в Швейцарии, нарушая FADP.",
    "severity": "moderate",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 14"
  },
  {
    "id": 475,
    "code": "CHFADP-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие публикации сведений о реестре обработки данных в Швейцарии",
    "description": "Корпоративные системы не ведут реестр операций по обработке данных (ROPA) по стандартам Швейцарии, подвергаясь ответственности по новой редакции закона FADP.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 12"
  },
  {
    "id": 476,
    "code": "CHFADP-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие соглашений SCC для экспорта данных из Швейцарии",
    "description": "Резервные копии баз данных сайта передают швейцарские личные файлы на серверы в третьих странах без внедрения проверенных стандартных условий, нарушая FADP.",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 16"
  },
  {
    "id": 477,
    "code": "CHFADP-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие явного согласия на обработку конфиденциальных данных в Швейцарии",
    "description": "Формы, собирающие конфиденциальные данные (религия, взгляды, членство в союзах) граждан Швейцарии, не запрашивают активное явное согласие, нарушая FADP.",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 6"
  },
  {
    "id": 478,
    "code": "CHFADP-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие логов сообщений об утечках данных в Швейцарии",
    "description": "Системные логи инцидентов не поддерживают быстрое уведомление Федерального комиссара по защите данных (FDPIC) об утечках, создающих высокие риски для швейцарских пользователей, нарушая FADP.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 24"
  },
  {
    "id": 479,
    "code": "UKGDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие британского соглашения (UK Addendum) для экспорта данных",
    "description": "Базы данных сайта переносят данные жителей Великобритании за рубеж без оформления обязательного Соглашения о передаче данных (IDTA) или британского приложения к европейским SCC.",
    "severity": "critical",
    "reference": "UK Data Protection Act 2018 / UK GDPR"
  },
  {
    "id": 480,
    "code": "UKGDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие регистрации и уплаты пошлины в британском ведомстве ICO",
    "description": "Иностранные компании, обрабатывающие личные данные граждан Великобритании, не регистрируются и не оплачивают ежегодный сбор в ведомстве ICO, нарушая законы Великобритании.",
    "severity": "moderate",
    "reference": "UK Data Protection (Charges and Information) Regulations 2018"
  },
  {
    "id": 481,
    "code": "UKGDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие представителя в Великобритании по британскому GDPR",
    "description": "Иностранные компании, работающие на рынке Великобритании, не назначают и не публикуют сведения о представителе в Великобритании по правилам британского GDPR.",
    "severity": "serious",
    "reference": "UK GDPR, Art. 27"
  },
  {
    "id": 482,
    "code": "UKGDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Нарушение обработки детских данных по британскому кодексу дизайна",
    "description": "Сайт, ориентированный на пользователей из Великобритании, собирает данные несовершеннолетних до 18 лет без обеспечения высокого уровня приватности по умолчанию, нарушая Кодекс детей Великобритании.",
    "severity": "critical",
    "reference": "UK Age-Appropriate Design Code (Children's Code)"
  },
  {
    "id": 483,
    "code": "UKOSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие механизмов проверки возраста для вредного контента (UK OSA)",
    "description": "Порталы с пользовательским контентом не используют надежные процедуры подтверждения возраста для ограничения доступа несовершеннолетних к вредным файлам, нарушая закон UK OSA.",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 484,
    "code": "UKOSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие каналов сообщения о вредном контенте по закону Великобритании",
    "description": "Сайты с интерактивным общением пользователей не содержат заметной формы для отправки жалоб на незаконный или вредный контент, нарушая требования Online Safety.",
    "severity": "serious",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 485,
    "code": "AUSPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Невыполнение запросов на удаление данных по закону Австралии",
    "description": "Служба поддержки не предоставляет выделенный законный канал для запросов граждан Австралии на уничтожение или обезличивание данных, нарушая принципы APP.",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - Australian Privacy Principles (APPs)"
  },
  {
    "id": 486,
    "code": "AUSPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующая трансграничная передача данных из Австралии",
    "description": "Персональные данные граждан Австралии передаются на зарубежные серверы без принятия мер по обеспечению соответствия получателя австралийским законам, нарушая APP 8.",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 - APP 8"
  },
  {
    "id": 487,
    "code": "AUSPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие согласия на маркетинговые cookie в Австралии",
    "description": "Сайт запускает пиксели отслеживания для таргетированной рекламы австралийским пользователям до получения согласия, нарушая новые реформы Закона о конфиденциальности.",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 Reforms"
  },
  {
    "id": 488,
    "code": "AUSPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия стран хранения данных в австралийской политике",
    "description": "Политика конфиденциальности не содержит списка стран, в которых могут обрабатываться или храниться персональные данные пользователей, нарушая австралийский APP 1.",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 1"
  },
  {
    "id": 489,
    "code": "AUSPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Нарушение отписки от рассылок по австралийскому закону о спаме",
    "description": "Маркетинговые письма продолжают отправляться гражданам Австралии по истечении установленных законом 5 рабочих дней после запроса на отписку, нарушая закон о спаме.",
    "severity": "serious",
    "reference": "Australia Spam Act 2003"
  },
  {
    "id": 490,
    "code": "AUSPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконный прямой маркетинг без возможности отказа по APP 7",
    "description": "Сайт предлагает услуги австралийским пользователям на основе профилей без предоставления бесплатного механизма отказа в каждом рекламном сообщении, нарушая APP 7.",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - APP 7"
  },
  {
    "id": 491,
    "code": "AUSPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие проверок точности данных австралийских пользователей",
    "description": "База данных не проводит автоматические проверки точности, полноты и актуальности личных данных жителей Австралии, нарушая требования APP 10.",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 10"
  },
  {
    "id": 492,
    "code": "NZPR-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контактов сотрудника по конфиденциальности в Новой Зеландии",
    "description": "Сайты, обрабатывающие личные данные граждан Новой Зеландии, не назначают и не публикуют контакты уполномоченного сотрудника по приватности, нарушая закон НЗ.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 493,
    "code": "NZPR-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение сроков сообщения об утечках данных в Новой Зеландии",
    "description": "Системы безопасности не гарантируют оперативное уведомление Комиссара по приватности Новой Зеландии об утечках, способных нанести серьезный вред жителям, нарушая закон.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, Part 6"
  },
  {
    "id": 494,
    "code": "NZPR-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала доступа к данным новозеландских пользователей",
    "description": "Личный кабинет не предоставляет пользователям из Новой Зеландии возможности просмотреть и скачать копию всех сохраненных о них файлов, нарушая IPP 6.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 6"
  },
  {
    "id": 495,
    "code": "NZPR-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконное хранение новозеландских записей в неадекватных юрисдикциях",
    "description": "Личные данные новозеландских потребителей хранятся в облачных серверах за рубежом, где не гарантируется сопоставимый уровень защиты, нарушая IPP 12.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 496,
    "code": "NZPR-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Сбор избыточных личных данных жителей Новой Зеландии",
    "description": "Онлайн-формы запрашивают у жителей Новой Зеландии избыточные личные данные, которые не требуются непосредственно для бизнес-операции, нарушая IPP 1.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 497,
    "code": "SGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия контактов DPO в Сингапуре",
    "description": "Сайт, ориентированный на Сингапур, не содержит адрес или email назначенного сотрудника по защите данных (DPO) в политике конфиденциальности, нарушая PDPA.",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 11"
  },
  {
    "id": 498,
    "code": "SGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие документирования правил подразумеваемого согласия в Сингапуре",
    "description": "Портал обрабатывает данные на основе 'подразумеваемого согласия' без проведения предварительной оценки рисков и документирования структуры уведомлений, нарушая PDPA.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Amendments"
  },
  {
    "id": 499,
    "code": "SGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующая переносимость данных по закону Сингапура",
    "description": "Кабинеты пользователей не предоставляют автоматические каналы передачи данных при экспорте профилей жителей Сингапура, нарушая требования PDPA.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Portability Provisions"
  },
  {
    "id": 500,
    "code": "SGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение сроков уведомления об утечке данных в Сингапуре (3 дня)",
    "description": "Регламент реагирования на инциденты не обязывает уведомлять сингапурский PDPC в течение 3 календарных дней после обнаружения утечки данных, нарушая закон.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 26D"
  },
  {
    "id": 501,
    "code": "SGPD-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Нарушение проверки сингапурского реестра Do Not Call (DNC)",
    "description": "Маркетинговые серверы отправляют звонки и SMS на сингапурские номера без сверки с национальным реестром DNC, совершая нарушение PDPA.",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 - DNC Provisions"
  },
  {
    "id": 502,
    "code": "MYPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие двуязычной политики конфиденциальности в Малайзии",
    "description": "Сайт, ориентированный на Малайзию, не публикует политику конфиденциальности на двух языках (малайском и английском), нарушая требования малайзийского PDPA.",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 7(3)"
  },
  {
    "id": 503,
    "code": "MYPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконный экспорт данных за пределы Малайзии",
    "description": "Базы данных экспортируют личные данные граждан Малайзии на серверы за рубежом без законных исключений или согласия пользователей, нарушая PDPA.",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 129"
  },
  {
    "id": 504,
    "code": "MYPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контроля точности персональных данных в Малайзии",
    "description": "База данных сайта не содержит механизмов для поддержания точности и актуальности собранных данных малайзийских пользователей, нарушая PDPA.",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 11"
  },
  {
    "id": 505,
    "code": "MYPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующая обработка конфиденциальных данных в Малайзии",
    "description": "Веб-формы собирают чувствительные данные малайзийских пользователей (здоровье, политические взгляды) без письменного согласия, нарушая PDPA.",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 40"
  },
  {
    "id": 506,
    "code": "THPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие публикации контактов DPO в Таиланде",
    "description": "Сайт, ориентированный на потребителей из Таиланда, не публикует контактную информацию назначенного сотрудника по защите данных (DPO), нарушая тайский PDPA.",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 41"
  },
  {
    "id": 507,
    "code": "THPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие интерфейса отзыва согласия в Таиланде",
    "description": "Личный кабинет не предоставляет пользователям из Таиланда простого способа отзыва согласия, аналогичного способу его предоставления, нарушая PDPA.",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 19"
  },
  {
    "id": 508,
    "code": "THPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконная трансграничная передача личных данных в Таиланде",
    "description": "Резервные копии баз данных переносят личные данные пользователей из Таиланда за рубеж без соблюдения правил адекватности защиты или согласия, нарушая PDPA.",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 28"
  },
  {
    "id": 509,
    "code": "THPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие записей в реестре обработки данных Таиланда",
    "description": "Корпоративные контроллеры, обрабатывающие данные граждан Таиланда, не документируют и не сохраняют логи операций с базами данных, нарушая PDPA.",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 39"
  },
  {
    "id": 510,
    "code": "THPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Сбор конфиденциальных данных в Таиланде без явного согласия",
    "description": "Онлайн-формы собирают биометрические, медицинские или судимости данные жителей Таиланда без получения активного согласия, нарушая правила PDPA.",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 26"
  },
  {
    "id": 511,
    "code": "VNDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия для экспорта данных из Вьетнама",
    "description": "Организации, экспортирующие личные данные вьетнамцев за рубеж, не отправляют Оценку воздействия передачи данных в Министерство общественной безопасности, нарушая Указ 13.",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 25"
  },
  {
    "id": 512,
    "code": "VNDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение обработки данных детей во Вьетнаме",
    "description": "Веб-приложения, собирающие личные данные детей старше 7 лет во Вьетнаме, не запрашивают согласие самого ребенка наряду с одобрением родителей, нарушая Указ 13.",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 20"
  },
  {
    "id": 513,
    "code": "VNDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие локализованных серверов для операций во Вьетнаме",
    "description": "Корпоративные системы не используют локальные серверы для хранения баз данных вьетнамских граждан на территории Вьетнама, нарушая законы о кибербезопасности.",
    "severity": "critical",
    "reference": "Vietnam Law on Cybersecurity No. 24/2018/QH14, Art. 26"
  },
  {
    "id": 514,
    "code": "VNDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия контактов DPO по Указу 13 Вьетнама",
    "description": "Организации, обрабатывающие конфиденциальные данные граждан Вьетнама, не указывают Отдел по защите данных или контакты DPO в политике, нарушая Указ 13.",
    "severity": "moderate",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 28"
  },
  {
    "id": 515,
    "code": "VNDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие проверок безопасности баз данных во Вьетнаме",
    "description": "Платформы, обрабатывающие данные пользователей из Вьетнама, не проводят ежегодный аудит безопасности ИТ-систем и не сохраняют логи для инспекций по Указу 13.",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 27"
  },
  {
    "id": 516,
    "code": "DPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие политики конфиденциальности на государственных языках Индии",
    "description": "Сайт, ориентированный на Индию, не предоставляет возможность просмотра политики конфиденциальности на всех 22 государственных языках Индии, нарушая закон DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(3)"
  },
  {
    "id": 517,
    "code": "DPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие каналов урегулирования споров по закону Индии",
    "description": "Служба поддержки не предоставляет пользователям из Индии четкий механизм подачи жалоб и контакты локального сотрудника по спорам, нарушая требования DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 13"
  },
  {
    "id": 518,
    "code": "DPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неполные уведомления о целях обработки на формах сбора данных в Индии",
    "description": "Формы сбора данных собирают личные сведения жителей Индии без вывода отдельного четкого уведомления о том, какие именно данные собираются и для чего, нарушая закон DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(1)"
  },
  {
    "id": 519,
    "code": "DPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нераскрытие контактов DPO и менеджера согласий в Индии",
    "description": "Политика конфиденциальности для Индии не содержит контактов DPO и не предусматривает назначение сертифицированного менеджера согласий, нарушая закон DPDP.",
    "severity": "moderate",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 6"
  },
  {
    "id": 520,
    "code": "DPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение обработки детских куки отслеживания в Индии",
    "description": "Сайт запускает файлы cookie для поведенческого мониторинга или таргетирует рекламу на детей до 18 лет в Индии, нарушая прямые запреты закона DPDP.",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 9(2)"
  },
  {
    "id": 521,
    "code": "DPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контроля удаления данных у подрядчиков в Индии",
    "description": "База данных не передает автоматически запросы на удаление от индийских пользователей третьим лицам и подрядчикам-обработчикам, нарушая требования DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 12"
  },
  {
    "id": 522,
    "code": "JPAP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия трансграничных операций в японской политике",
    "description": "Политика конфиденциальности не сообщает японским пользователям названия стран хранения данных и меры безопасности, принятые на серверах-получателях, нарушая APPI.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 28"
  },
  {
    "id": 523,
    "code": "JPAP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неполное раскрытие мер безопасности баз данных в Японии",
    "description": "Политика компании не раскрывает конкретные административные, технические и физические меры контроля, принятые для защиты личных данных японских граждан, нарушая APPI.",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 32"
  },
  {
    "id": 524,
    "code": "JPAP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие согласия на обработку псевдо-идентификационных данных в Японии",
    "description": "Сайт обрабатывает псевдонимизированные данные пользователей (куки-файлы, привязанные к серверу) без выполнения требований APPI к раскрытию информации.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 41"
  },
  {
    "id": 525,
    "code": "JPAP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующая обработка соотносимых с личностью данных в Японии",
    "description": "Базы данных передают идентификаторы пользователей третьим лицам для связи с личными картами в Японии без подтверждения согласия, нарушая APPI.",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 31"
  },
  {
    "id": 526,
    "code": "JPAP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие системы уведомления об утечках для ведомства PPC Японии",
    "description": "Правила мониторинга инцидентов не предусматривают обязательное уведомление Комиссии по защите персональной информации Японии (PPC) о крупных утечках данных.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 26"
  },
  {
    "id": 527,
    "code": "JPAP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконный прямой маркетинг по телефону без проверки в Японии",
    "description": "Лид-формы, собирающие японские телефонные номера, не содержат флажков для отказа от звонков и не сверяются с предпочтениями абонентов, нарушая правила APPI.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI) Guidelines"
  },
  {
    "id": 528,
    "code": "SKPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие разделения согласий в веб-формах в Южной Корее",
    "description": "Формы сбора данных для пользователей из Южной Кореи объединяют согласия на рекламу с обязательными условиями использования в одну галочку, нарушая южнокорейский PIPA.",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 22"
  },
  {
    "id": 529,
    "code": "SKPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующая обработка регистрационных номеров жителей (RRN) в Южной Корее",
    "description": "Веб-приложения обрабатывают регистрационные номера жителей (RRN) граждан Кореи без законных оснований или надлежащего шифрования, нарушая корейский PIPA.",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 24-2"
  },
  {
    "id": 530,
    "code": "SKPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие контактов DPO на корейском языке в Южной Корее",
    "description": "Политика конфиденциальности для корейских пользователей не содержит контактов DPO на корейском языке, нарушая требования PIPA.",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 31"
  },
  {
    "id": 531,
    "code": "SKPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия трансграничной передачи данных по закону Кореи",
    "description": "Политика не сообщает корейским пользователям дату, страну назначения и цель экспорта их данных на зарубежные серверы, нарушая PIPA.",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 39-11"
  },
  {
    "id": 532,
    "code": "SKPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение сроков сообщения об утечках данных в орган PIPC Южной Кореи",
    "description": "Инструкции по инцидентам не требуют отправки отчетов об утечках данных (для более чем 1000 пользователей) в корейскую комиссию PIPC в течение 24 часов, нарушая закон.",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 34"
  },
  {
    "id": 533,
    "code": "LGPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие регистрации DPO в органе ANPD Бразилии по LGPD",
    "description": "Организации, обрабатывающие данные пользователей из Бразилии, не регистрируют и не публикуют сведения о своем DPO в надзорном ведомстве ANPD, нарушая LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 534,
    "code": "LGPD-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие явного согласия на конфиденциальные данные в Бразилии",
    "description": "Онлайн-формы собирают биометрические, медицинские или членские данные жителей Бразилии без получения отдельного согласия или отметки чекбокса, нарушая LGPD.",
    "severity": "critical",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 11"
  },
  {
    "id": 535,
    "code": "LGPD-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Несоответствующая переносимость данных по закону Бразилии",
    "description": "Личный кабинет не предоставляет пользователям из Бразилии автоматического интерфейса для экспорта и передачи профилей в сторонние сервисы, нарушая LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 9"
  },
  {
    "id": 536,
    "code": "LGPD-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие документирования правовых оснований обработки в Бразилии",
    "description": "Политика конфиденциальности не связывает каждую категорию собираемых данных с одним из 10 законных оснований обработки по правилам LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 7"
  },
  {
    "id": 537,
    "code": "LGPD-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Невыполнение немедленных запросов на удаление данных в Бразилии",
    "description": "Службы поддержки не удаляют личные данные немедленно по запросу пользователей из Бразилии с подтверждением комплаенса, нарушая требования LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 16"
  },
  {
    "id": 538,
    "code": "POPI-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие регистрации сотрудника по информации в ЮАР по POPIA",
    "description": "Организации, обрабатывающие личные данные жителей ЮАР, не регистрируют своего сотрудника по информации в Регуляторе информации, нарушая POPIA.",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 55"
  },
  {
    "id": 539,
    "code": "POPI-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие согласия на незапрошенный электронный маркетинг в ЮАР",
    "description": "Сайты отправляют рекламные письма или SMS гражданам ЮАР без предварительного согласия, нарушая требования закона POPIA.",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 69"
  },
  {
    "id": 540,
    "code": "POPI-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Небезопасное хранение номеров удостоверений личности ЮАР",
    "description": "Базы данных хранят национальные удостоверения личности ЮАР в незашифрованных колонках или допускают несанкционированный доступ, нарушая требования безопасности POPIA.",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 19"
  },
  {
    "id": 541,
    "code": "POPI-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие контроля соответствия целей сбора данных в ЮАР",
    "description": "Приложения используют личные данные жителей ЮАР в целях, не совместимых с исходными целями сбора, без их согласия, нарушая POPIA.",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 15"
  },
  {
    "id": 542,
    "code": "POPI-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие публикации руководства PAIA на корпоративных порталах ЮАР",
    "description": "Бизнес-платформы для ЮАР не публикуют доступное для скачивания руководство PAIA с описанием процедур доступа к корпоративным базам данных, нарушая закон.",
    "severity": "moderate",
    "reference": "Promotion of Access to Information Act (PAIA) 2000"
  },
  {
    "id": 543,
    "code": "NDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие обязательных аудиторских раскрытий по закону Нигерии",
    "description": "Крупные операторы, обрабатывающие данные граждан Нигерии, не направляют ежегодные аудиторские отчеты в Нигерийскую комиссию по защите данных (NDPC), нарушая NDPA.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 33"
  },
  {
    "id": 544,
    "code": "NDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие согласия на прямой маркетинг в Нигерии",
    "description": "Формы регистрации автоматически подписывают пользователей из Нигерии на рекламные списки без получения предварительного согласия, нарушая регламенты защиты данных.",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 26"
  },
  {
    "id": 545,
    "code": "NDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконное хранение нигерийских данных за пределами Нигерии",
    "description": "Базы данных передают сведения о гражданах Нигерии на серверы за рубежом без соблюдения правил адекватности защиты или контрактных обязательств, нарушая NDPA.",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 41"
  },
  {
    "id": 546,
    "code": "NDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие проверок информационной безопасности по закону Нигерии",
    "description": "Предприятие, обрабатывающее данные нигерийских пользователей, не проводит и не фиксирует результаты ежегодного аудита безопасности систем баз данных, нарушая закон.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 39"
  },
  {
    "id": 547,
    "code": "MXPD-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие надлежащей структуры политики конфиденциальности в Мексике",
    "description": "Информационные разделы о приватности для мексиканских пользователей не соответствуют установленной законом структуре уведомлений (Aviso de Privacidad), нарушая LFPDPPP.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 15"
  },
  {
    "id": 548,
    "code": "MXPD-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие согласия на обработку конфиденциальных данных в Мексике",
    "description": "Формы сбора данных запрашивают финансовую или медицинскую информацию у мексиканских пользователей без получения письменного согласия, нарушая закон Мексики.",
    "severity": "critical",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 9"
  },
  {
    "id": 549,
    "code": "MXPD-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие описания процедуры прав ARCO в мексиканской политике",
    "description": "Политика конфиденциальности не описывает процедуры, сроки и контакты для осуществления прав ARCO (доступ, исправление, аннулирование, возражение), нарушая закон Мексики.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 22"
  },
  {
    "id": 550,
    "code": "MXPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие аудитов безопасности мексиканских баз данных",
    "description": "Системы обработки данных жителей Мексики не содержат задокументированных административных, технических и физических мер контроля безопасности, нарушая LFPDPPP.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 19"
  },
{
  "id": 551,
  "code": "ARGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие регистрации баз данных в AAIP (Аргентина)",
  "description": "Контроллер данных обрабатывает персональные данные резидентов Аргентины без регистрации баз данных в Агентстве по доступу к публичной информации (AAIP).",
  "severity": "critical",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 3"
},
{
  "id": 552,
  "code": "ARGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие каналов для реализации прав ARCO по закону Аргентины",
  "description": "Политика конфиденциальности не объясняет, как аргентинские субъекты данных могут реализовать свои права на доступ, исправление, удаление и конфиденциальность.",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 14"
},
{
  "id": 553,
  "code": "ARGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие локальных мер безопасности для аргентинских баз данных",
  "description": "Системы баз данных, содержащие персональные данные резидентов Аргентины, не реализуют организационные и технические меры безопасности, предписанные AAIP.",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 9"
},
{
  "id": 554,
  "code": "ARGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконный прямой маркетинг без проверки отказа по закону Аргентины",
  "description": "Сайт осуществляет прямой маркетинг в отношении резидентов Аргентины без проверки национального реестра отказа от звонков или предоставления прямой ссылки на отказ.",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 27"
},
{
  "id": 555,
  "code": "ARGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие гарантий при международной передаче данных граждан Аргентины",
  "description": "Контроллер осуществляет международную передачу данных резидентов Аргентины в страны или организации, которые не обеспечивают надлежащий уровень защиты по стандартам AAIP.",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 12"
},
{
  "id": 556,
  "code": "COLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие обязательной регистрации баз данных в Колумбии (RNBD)",
  "description": "Контроллер данных не зарегистрировал свои базы персональных данных, содержащие информацию резидентов Колумбии, в Национальном реестре баз данных (RNBD).",
  "severity": "critical",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 25"
},
{
  "id": 557,
  "code": "COLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие предварительного согласия для резидентов Колумбии",
  "description": "Сайт собирает и обрабатывает персональные данные жителей Колумбии без получения явного, предварительного и информированного согласия.",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 9"
},
{
  "id": 558,
  "code": "COLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие соответствующих каналов рассмотрения жалоб по закону Колумбии",
  "description": "Политика конфиденциальности не описывает каналы и законные сроки (15 рабочих дней) для рассмотрения запросов или претензий колумбийских субъектов.",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 15"
},
{
  "id": 559,
  "code": "COLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие контроля трансграничной передачи данных по закону Колумбии",
  "description": "Контроллер передает персональные данные жителей Колумбии в третьи страны без подтверждения адекватности защиты или получения разрешения SIC.",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 26"
},
{
  "id": 560,
  "code": "COLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконная обработка данных несовершеннолетних без согласия родителей в Колумбии",
  "description": "Сайт собирает данные детей и подростков из Колумбии без проверки полномочий родителей или законных представителей.",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 7"
},
{
  "id": 561,
  "code": "CHLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Невыполнение запросов на удаление или исправление данных граждан Чили",
  "description": "Сайт не предоставляет автоматизированных или документированных каналов для запроса удаления или исправления данных чилийских резидентов.",
  "severity": "critical",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 12"
},
{
  "id": 562,
  "code": "CHLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконная обработка чувствительных данных без письменного согласия в Чили",
  "description": "Сайт собирает чувствительные данные граждан Чили (здоровье, убеждения) без получения явного письменного или эквивалентного цифрового согласия.",
  "severity": "serious",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 10"
},
{
  "id": 563,
  "code": "CHLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие надлежащих раскрытий мер безопасности для баз данных Чили",
  "description": "Системы обработки данных, содержащие персональные данные чилийских резидентов, не имеют документированных технических мер защиты от несанкционированного доступа.",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 11"
},
{
  "id": 564,
  "code": "CHLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствие рассылок коммерческого маркетинга закону Чили",
  "description": "Сайт отправляет коммерческие письма резидентам Чили без предоставления явного, бесплатного и простого механизма отказа от подписки.",
  "severity": "serious",
  "reference": "Chile Consumer Protection Act (Ley 19.496), Art. 28B"
},
{
  "id": 565,
  "code": "CHLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные договоры передачи данных чилийских резидентов",
  "description": "Контроллер передает данные чилийских резидентов сторонним поставщикам услуг без официальных соглашений о безопасности и правилах обработки данных.",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 4"
},
{
  "id": 566,
  "code": "PERPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие регистрации банков персональных данных в Перу (RNDP)",
  "description": "Контроллер данных не зарегистрировал свои базы данных, содержащие информацию резидентов Перу, в Национальном реестре защиты персональных данных.",
  "severity": "critical",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 30"
},
{
  "id": 567,
  "code": "PERPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неполное раскрытие международной передачи данных резидентов Перу",
  "description": "Политика конфиденциальности не указывает конкретных получателей и места передачи данных за пределы Перу, нарушая обязательства прозрачности.",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 18"
},
{
  "id": 568,
  "code": "PERPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие процедур реализации прав ARCO по закону Перу",
  "description": "На сайте отсутствуют конкретные инструкции и сроки (например, 8 дней для доступа, 10 дней для исправления) для реализации прав ARCO по перуанскому закону.",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 19"
},
{
  "id": 569,
  "code": "PERPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие предварительного согласия на файлы cookie в Перу",
  "description": "Сайт устанавливает рекламные или аналитические файлы cookie до получения согласия резидентов Перу, нарушая стандарты согласия.",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 12"
},
{
  "id": 570,
  "code": "PERPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие юридического представителя в Перу для иностранных компаний",
  "description": "Иностранные компании, обрабатывающие данные жителей Перу, не назначают местного юридического представителя или адрес для корреспонденции в Перу.",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 34"
},
{
  "id": 571,
  "code": "URYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие регистрации обработки данных в URCDP (Уругвай)",
  "description": "Контроллер данных не зарегистрировал базы данных или планы обработки данных в Регулирующем органе по контролю персональных данных (URCDP).",
  "severity": "critical",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 31"
},
{
  "id": 572,
  "code": "URYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Невыполнение требований уведомления об утечках данных в Уругвае за 24 часа",
  "description": "На сайте отсутствуют официальные протоколы для фиксации и сообщения об инцидентах безопасности в URCDP в течение 24 часов с момента обнаружения.",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 12 (amended)"
},
{
  "id": 573,
  "code": "URYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие представителя в Уругвае для иностранных контроллеров",
  "description": "Иностранные компании, работающие на рынке Уругвая, не назначили местного представителя для взаимодействия с регулятором по Закону 18.331.",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 34"
},
{
  "id": 574,
  "code": "URYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая обработка биометрических и чувствительных данных в Уругвае",
  "description": "Сайт собирает чувствительные данные (здоровье, биометрию) жителей Уругвая без получения явного, предварительного и письменного согласия.",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 18"
},
{
  "id": 575,
  "code": "URYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие механизмов переноса данных для резидентов Уругвая",
  "description": "Контроллер данных не предоставляет прямых путей или стандартных форматов для выполнения запросов о переносе данных потребителей из Уругвая.",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 14"
},
{
  "id": 576,
  "code": "ECUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные интерфейсы согласия для резидентов Эквадора (LOPDP)",
  "description": "Интерфейсы согласия не предлагают раздельных флажков для различных целей обработки данных потребителей из Эквадора по LOPDP.",
  "severity": "critical",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 8"
},
{
  "id": 577,
  "code": "ECUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие локальных путей подачи жалоб для Эквадорского агентства",
  "description": "Политика конфиденциальности не фиксирует права пользователей на судебную защиту и не предоставляет пути подачи жалоб в Эквадорский надзорный орган.",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 33"
},
{
  "id": 578,
  "code": "ECUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Невыполнение оценки воздействия на защиту данных (DPIA) в Эквадоре",
  "description": "Контроллер не проводит и не документирует оценку воздействия на защиту данных (DPIA) для высокорисковой обработки данных жителей Эквадора.",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 40"
},
{
  "id": 579,
  "code": "ECUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконные маркетинговые коммуникации без подтверждения согласия в Эквадоре",
  "description": "Сайт отправляет коммерческие сообщения резидентам Эквадора без получения явного, несвязанного согласия на маркетинговые цели.",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 12"
},
{
  "id": 580,
  "code": "ECUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие мер безопасности и целостности баз данных в Эквадоре",
  "description": "Базы персональных данных жителей Эквадора не имеют документированных административных, технических и физических планов безопасности.",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 37"
},
{
  "id": 581,
  "code": "CRIAP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие регистрации баз данных в PRODHAB (Коста-Рика)",
  "description": "Организация обрабатывает персональные данные жителей Коста-Рики без регистрации баз данных в Агентстве по защите данных жителей (PRODHAB).",
  "severity": "critical",
  "reference": "Costa Rica Law 8968, Art. 12"
},
{
  "id": 582,
  "code": "CRIAP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неполное раскрытие права на информационное самоопределение в Коста-Рике",
  "description": "Политика конфиденциальности не содержит обязательной информации о праве на информационное самоопределение и способах отзыва согласия.",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 5"
},
{
  "id": 583,
  "code": "CRIAP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие протоколов проверки при обработке чувствительных данных в Коста-Рике",
  "description": "Чувствительные категории данных (здоровье, биометрия) жителей Коста-Рики собираются без явных предварительных протоколов проверки.",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 9"
},
{
  "id": 584,
  "code": "CRIAP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконная передача данных граждан Коста-Рики в неадекватные страны",
  "description": "Сайт передает персональные данные жителей Коста-Рики в страны, не обеспечивающие адекватный уровень защиты, без получения явного согласия.",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 24"
},
{
  "id": 585,
  "code": "CRIAP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие упрощенных механизмов отзыва согласия для Коста-Рики",
  "description": "Пользователям из Коста-Рики не предоставляется упрощенный бесплатный механизм для отзыва согласия на маркетинговую обработку.",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 6"
},
{
  "id": 586,
  "code": "PANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неинформирование граждан Панамы о личности контроллера (Ley 81)",
  "description": "Сайт обрабатывает персональные данные жителей Панамы без указания полного наименования и физического адреса контроллера данных.",
  "severity": "critical",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 8"
},
{
  "id": 587,
  "code": "PANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие путей реализации прав ARCO в Панаме",
  "description": "Контроллер не предоставляет бесплатный и легкодоступный адрес электронной почты или систему для реализации прав доступа, исправления, возражения и удаления в Панаме.",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 15"
},
{
  "id": 588,
  "code": "PANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие согласия как правовой основы финансового профилирования в Панаме",
  "description": "Сайт осуществляет кредитное профилирование или обрабатывает экономические данные жителей Панамы без подтвержденного согласия или явного предварительного разрешения.",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 21"
},
{
  "id": 589,
  "code": "PANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие протоколов уведомления ANTAI об утечках безопасности в Панаме",
  "description": "Организация не имеет документированных процедур для немедленного сообщения об инцидентах безопасности в ANTAI и пострадавшим лицам в Панаме.",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 36"
},
{
  "id": 590,
  "code": "PANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконное хранение персональных данных граждан Панамы на неадекватных серверах",
  "description": "Персональные данные граждан Панамы хранятся в международных облачных системах, которые не обеспечивают минимальные меры безопасности, предписанные ANTAI.",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 33"
},
{
  "id": 591,
  "code": "KENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации в качестве контроллера в ODPC Кении",
  "description": "Организация собирает и обрабатывает личные данные резидентов Кении без регистрации в качестве контроллера или обработчика данных в Офисе комиссара по защите данных (ODPC).",
  "severity": "critical",
  "reference": "Kenya Data Protection Act 2019, Section 18"
},
{
  "id": 592,
  "code": "KENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие местного представителя для иностранных контроллеров в Кении",
  "description": "Иностранные контроллеры данных, обрабатывающие информацию субъектов в Кении, не назначили местного представителя для взаимодействия с регулятором.",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 50"
},
{
  "id": 593,
  "code": "KENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватный контроль согласия на прямой маркетинг по закону Кении",
  "description": "Сайт использует личные данные жителей Кении для коммерческого продвижения или рекламы без получения предварительного явного согласия.",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 37"
},
{
  "id": 594,
  "code": "KENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие оценки воздействия на защиту данных (DPIA) для операций в Кении",
  "description": "Организация проводит операции обработки данных, представляющие высокий риск для жителей Кении (например, крупномасштабное отслеживание), без проведения обязательной DPIA.",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 31"
},
{
  "id": 595,
  "code": "KENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Невыполнение требований о 72-часовом уведомлении об утечках в ODPC Кении",
  "description": "Документированный протокол реагирования на утечки данных не предусматривает обязательное уведомление ODPC Кении в течение 72 часов с момента инцидента.",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 43"
},
{
  "id": 596,
  "code": "EGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие лицензии на электронный маркетинг в Египте",
  "description": "Сайт осуществляет прямой электронный маркетинг среди резидентов Египта без получения необходимой лицензии в Центре защиты персональных данных.",
  "severity": "critical",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 17"
},
{
  "id": 597,
  "code": "EGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ненадлежащие раскрытия в политике конфиденциальности для граждан Египта",
  "description": "Политика конфиденциальности не описывает явно конкретную правовую основу и сроки обработки данных граждан Египта.",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 2"
},
{
  "id": 598,
  "code": "EGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие назначенного сотрудника по защите данных (DPO) в Египте",
  "description": "Организация обрабатывает данные жителей Египта в крупных масштабах, но не назначила и не зарегистрировала DPO в надзорном органе.",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 8"
},
{
  "id": 599,
  "code": "EGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несообщение об утечках персональных данных за 72 часа в Египте",
  "description": "Контроллер не установил внутренние правила для сообщения об утечках данных в египетский надзорный орган и пострадавшим лицам в течение 72 часов.",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 7"
},
{
  "id": 600,
  "code": "EGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Незаконная трансграничная передача данных граждан Египта",
  "description": "Сайт передает персональные данные жителей Египта международным организациям без получения необходимого одобрения Центра защиты персональных данных Египта.",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 14"
},
{
  "id": 601,
  "code": "MARPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие декларации или авторизации в CNDP Марокко",
  "description": "Контроллер обрабатывает персональные данные жителей Марокко без подачи обязательной предварительной декларации или получения разрешения от CNDP.",
  "severity": "critical",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 12"
},
{
  "id": 602,
  "code": "MARPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие четкого раскрытия категорий получателей в Марокко",
  "description": "Политика конфиденциальности не сообщает марокканским субъектам данных о конкретных категориях сторонних получателей их личной информации.",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 5"
},
{
  "id": 603,
  "code": "MARPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на прямой маркетинг в Марокко",
  "description": "Сайт отправляет резидентам Марокко сообщения прямого маркетинга без получения предварительного, однозначного согласия.",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 10"
},
{
  "id": 604,
  "code": "MARPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие технических мер по сохранению целостности данных в Марокко",
  "description": "Настройки серверов, хранящих записи марокканских пользователей, не обеспечивают надлежащую защиту от случайного уничтожения, утери или изменения данных.",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 23"
},
{
  "id": 605,
  "code": "MARPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Марокко",
  "description": "Организация передает персональные данные марокканских резидентов в юрисдикции за пределами Марокко без предварительного письменного разрешения CNDP.",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 43"
},
{
  "id": 606,
  "code": "QATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная проверка согласия для детских данных в Катаре",
  "description": "Сайт обрабатывает персональные данные детей в Катаре без получения явного согласия их родителей или опекунов, нарушая требования PDPPL.",
  "severity": "critical",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 17"
},
{
  "id": 607,
  "code": "QATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие документирования аудитов обработки для регулятора Катара",
  "description": "Организация не ведет и не документирует внутренний реестр операций обработки данных для представления компетентному ведомству Катара.",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 11"
},
{
  "id": 608,
  "code": "QATPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполные меры безопасности и раскрытия для резидентов Катара",
  "description": "Базы данных, хранящие данные резидентов Катара, не имеют проверенных технических и административных мер безопасности для предотвращения утечек.",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 13"
},
{
  "id": 609,
  "code": "QATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие прямых каналов обработки запросов катарских субъектов",
  "description": "Сайт не предоставляет резидентам Катара прямой и бесплатный механизм для отправки запросов на доступ, удаление или исправление данных.",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 5"
},
{
  "id": 610,
  "code": "QATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Нераскрытие мест трансграничной обработки данных субъектам в Катаре",
  "description": "Политика конфиденциальности не указывает географические регионы, в которых обрабатываются или хранятся персональные данные резидентов Катара.",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 8"
},
{
  "id": 611,
  "code": "BHRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие письменного согласия на обработку конфиденциальных данных в Бахрейне",
  "description": "Сайт собирает конфиденциальные данные (такие как показатели здоровья или биометрия) жителей Бахрейна без получения предварительного письменного согласия.",
  "severity": "critical",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 4"
},
{
  "id": 612,
  "code": "BHRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие назначенного местного представителя в Бахрейне",
  "description": "Иностранные контроллеры данных, обрабатывающие информацию резидентов Бахрейна в больших масштабах, не назначили местного представителя в Бахрейне.",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 33"
},
{
  "id": 613,
  "code": "BHRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Бахрейне",
  "description": "Сайт направляет рекламные сообщения по электронной почте гражданам Бахрейна без предоставления предварительного понятного пути отказа.",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 30"
},
{
  "id": 614,
  "code": "BHRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации баз данных в надзорном органе Бахрейна",
  "description": "Контроллер не зарегистрировал системы баз данных, содержащие личную информацию жителей Бахрейна, в Управлении по защите персональных данных.",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 12"
},
{
  "id": 615,
  "code": "BHRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные протоколы передачи данных граждан Бахрейна",
  "description": "Персональные данные жителей Бахрейна передаются в страны, не обеспечивающие адекватный уровень безопасности, без предварительного письменного согласия.",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 15"
},
{
  "id": 616,
  "code": "OMNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие назначенного сотрудника по защите данных (DPO) в Омане",
  "description": "Организация обрабатывает личные данные жителей Омана в крупных масштабах, но не назначила сотрудника по защите данных (DPO).",
  "severity": "critical",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 21"
},
{
  "id": 617,
  "code": "OMNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на обработку медицинских или биометрических данных в Омане",
  "description": "Сайт собирает чувствительные данные (здоровье, биометрия) жителей Омана без получения явного, предварительного и задокументированного согласия.",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 5"
},
{
  "id": 618,
  "code": "OMNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие подтвержденных процедур разрешения споров для субъектов в Омане",
  "description": "Политика конфиденциальности не содержит описания конкретных правовых путей или контактов для рассмотрения жалоб субъектов данных из Омана.",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 12"
},
{
  "id": 619,
  "code": "OMNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие надлежащих гарантий при трансграничной передаче данных Омана",
  "description": "Сайт передает персональные данные жителей Омана международным организациям без соглашений об адекватности или одобрения Министерства.",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 24"
},
{
  "id": 620,
  "code": "OMNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Невыполнение требований о своевременном ответе на запросы граждан Омана",
  "description": "Процедуры обработки запросов пользователей не предусматривают обязательные ответы на запросы доступа или исправления данных граждан Омана в установленные законом сроки.",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 15"
},
{
  "id": 621,
  "code": "HKGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Нераскрытие намерений прямого маркетинга резидентам Гонконга",
  "description": "Сайт собирает личные данные резидентов Гонконга и намеревается использовать их для маркетинга без предоставления понятного интерфейса согласия.",
  "severity": "critical",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35C"
},
{
  "id": 622,
  "code": "HKGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие отдельного согласия на сторонний маркетинг в Гонконге",
  "description": "Сайт передает данные резидентов Гонконга партнерам для маркетинговых целей без получения отдельного явного согласия.",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35J"
},
{
  "id": 623,
  "code": "HKGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Несоответствующее раскрытие сроков хранения данных клиентов в Гонконге",
  "description": "Политика конфиденциальности не описывает сроки хранения или процедуры удаления личных данных, собранных у резидентов Гонконга.",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 2"
},
{
  "id": 624,
  "code": "HKGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Небезопасные протоколы удаления и уничтожения данных в Гонконге",
  "description": "Жизненный цикл данных на сервере не реализует алгоритмы безопасного удаления неактивных записей пользователей из Гонконга.",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 4"
},
{
  "id": 625,
  "code": "HKGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие интерфейсов доступа и исправления данных субъектов в Гонконге",
  "description": "Сайт не предоставляет пользователям из Гонконга простых контактных форм или процедур для запроса доступа или исправления данных.",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 6"
},
{
  "id": 626,
  "code": "TWNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неполные раскрытия информации по Закону Тайваня (PDPA)",
  "description": "Политика конфиденциальности не перечисляет все обязательные пункты по ст. 8 PDPA, включая последствия непредоставления информации.",
  "severity": "critical",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 8"
},
{
  "id": 627,
  "code": "TWNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Незаконный сбор чувствительных данных без письменного согласия на Тайване",
  "description": "Сайт собирает конфиденциальные личные данные (историю болезни, генетику) резидентов Тайваня без получения явного письменного согласия.",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 6"
},
{
  "id": 628,
  "code": "TWNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие плана обеспечения безопасности данных на Тайване",
  "description": "Контроллер данных не ведет задокументированный внутренний план обеспечения безопасности для предотвращения утечек данных на Тайване.",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 27"
},
{
  "id": 629,
  "code": "TWNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие протоколов уведомления об инцидентах граждан Тайваня",
  "description": "У компании отсутствуют протоколы для немедленного уведомления тайваньских субъектов данных об утечках личной информации после подтверждения инцидента.",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 12"
},
{
  "id": 630,
  "code": "TWNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры защиты при маркетинге резидентам Тайваня",
  "description": "Сайт использует личные данные жителей Тайваня для маркетинга без предоставления четкой возможности заявить возражение при первом контакте.",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 20"
},
{
  "id": 631,
  "code": "PHLPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие регистрации систем обработки данных в NPC Филиппин",
  "description": "Организация обрабатывает личные данные граждан Филиппин, но не зарегистрировала свои системы обработки в Национальной комиссии по конфиденциальности (NPC).",
  "severity": "critical",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 14"
},
{
  "id": 632,
  "code": "PHLPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие назначенного сотрудника по защите данных (DPO) на Филиппинах",
  "description": "Контроллер данных, работающий с субъектами из Филиппин, не назначил официально и не зарегистрировал сотрудника по защите данных (DPO) в NPC.",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 21"
},
{
  "id": 633,
  "code": "PHLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватное информирование жителей Филиппин в политике конфиденциальности",
  "description": "Политика конфиденциальности не сообщает филиппинским пользователям об их конкретных правах на информацию, доступ, возражение и удаление.",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 16"
},
{
  "id": 634,
  "code": "PHLPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие системы уведомления NPC об утечках данных за 72 часа",
  "description": "Процедуры безопасности компании не предусматривают обязательное уведомление NPC и пострадавших лиц в течение 72 часов с момента обнаружения утечки.",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 20"
},
{
  "id": 635,
  "code": "PHLPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неполные формы согласия на обработку конфиденциальных данных на Филиппинах",
  "description": "Механизм согласия объединяет разрешение на обработку конфиденциальных данных с общими условиями обслуживания, нарушая законы Филиппин.",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 13"
},
{
  "id": 636,
  "code": "IDNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие задокументированной правовой основы для операций в Индонезии",
  "description": "Сайт собирает и обрабатывает данные граждан Индонезии без документирования конкретных правовых оснований (согласие, договор) по UU PDP.",
  "severity": "critical",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 20"
},
{
  "id": 637,
  "code": "IDNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие локального сотрудника по защите данных (DPO) в Индонезии",
  "description": "Контроллер данных обрабатывает персональные данные граждан Индонезии в больших масштабах, но не назначил местного сотрудника по защите данных.",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 53"
},
{
  "id": 638,
  "code": "IDNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие контроля возраста и согласия родителей для детей в Индонезии",
  "description": "Сайт собирает личные данные детей из Индонезии без проверки возраста и получения подтвержденного согласия родителей.",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 32"
},
{
  "id": 639,
  "code": "IDNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие системы уведомления об инцидентах за 72 часа в Индонезии",
  "description": "Контроллер данных не создал процедуру уведомления индонезийских властей и субъектов в течение 72 часов с момента обнаружения утечки данных.",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 46"
},
{
  "id": 640,
  "code": "IDNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Несоответствующие механизмы удаления персональных данных граждан Индонезии",
  "description": "Системы не поддерживают полное и постоянное удаление записей индонезийских пользователей при отзыве согласия или прекращении договора.",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 43"
},
{
  "id": 641,
  "code": "KAZPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие регистрации баз данных граждан Казахстана в госорганах",
  "description": "Контроллер данных не зарегистрировал в государственном реестре свои базы данных, обрабатывающие персональные данные жителей Казахстана.",
  "severity": "critical",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 26"
},
{
  "id": 642,
  "code": "KAZPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Несоответствующая трансграничная передача данных без проверки адекватности в Казахстане",
  "description": "Сайт передает персональные данные граждан Казахстана в третьи страны без проверки адекватности защиты или наличия законных оснований.",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 16"
},
{
  "id": 643,
  "code": "KAZPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неполные системы сбора согласия для резидентов Казахстана",
  "description": "Сайт собирает персональные данные жителей Казахстана без получения явного согласия с указанием конкретных целей обработки.",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 8"
},
{
  "id": 644,
  "code": "KAZPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Нарушение требований о локализации серверов в Республике Казахстан",
  "description": "Базы данных, хранящие персональные данные жителей Казахстана, размещены за пределами страны, нарушая требования о локализации данных.",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 12"
},
{
  "id": 645,
  "code": "KAZPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие процедур блокировки и удаления данных для граждан Казахстана",
  "description": "Контроллер не предоставляет прямых путей или контактов для запроса блокировки или уничтожения личных записей граждан Казахстана.",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 24"
},
{
  "id": 646,
  "code": "UKRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие уведомления Уполномоченного о начале обработки данных на Украине",
  "description": "Контроллер обрабатывает чувствительные личные данные жителей Украины без уведомления Уполномоченного Верховной Рады по правам человека.",
  "severity": "critical",
  "reference": "Ukraine Law on Personal Data Protection, Article 9"
},
{
  "id": 647,
  "code": "UKRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия получателей данных в политике конфиденциальности на Украине",
  "description": "Политика конфиденциальности не содержит подробного описания или наименований третьих лиц, получающих данные жителей Украины.",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 12"
},
{
  "id": 648,
  "code": "UKRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на маркетинг и файлы cookie на Украине",
  "description": "Сайт устанавливает рекламные файлы cookie или отправляет маркетинговые письма гражданам Украины без подтвержденного согласия.",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 11"
},
{
  "id": 649,
  "code": "UKRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие логов доступа к базам данных по закону Украины",
  "description": "База данных, содержащая записи украинских субъектов, не имеет документированных логов доступа и контроля разрешений пользователей.",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 24"
},
{
  "id": 650,
  "code": "UKRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполные процедуры удаления и защиты прав для субъектов на Украине",
  "description": "Контроллер данных не предоставляет четких каналов связи или сроков ответа для запроса удаления данных украинскими субъектами.",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 8"
},
{
  "id": 651,
  "code": "CANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие согласия на обработку конфиденциальных данных по PIPEDA",
  "description": "Сайт собирает конфиденциальные личные данные (медицинские, финансовые сведения) резидентов Канады без получения предварительного явного согласия.",
  "severity": "critical",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.3"
},
{
  "id": 652,
  "code": "CANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие контактов сотрудника по конфиденциальности по PIPEDA",
  "description": "Политика конфиденциальности не указывает контакты лица, ответственного за соблюдение законодательства Канады о защите данных.",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.1"
},
{
  "id": 653,
  "code": "CANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные процедуры доступа и исправления по PIPEDA",
  "description": "На сайте отсутствуют четкие инструкции для канадских резидентов по получению доступа и подаче запросов на исправление их личных файлов.",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.9"
},
{
  "id": 654,
  "code": "CANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие процедуры сообщения об утечках по закону Канады",
  "description": "Контроллер данных не имеет задокументированных процедур сообщения об инцидентах безопасности в Офис комиссара по конфиденциальности (OPC).",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Sec. 10.1"
},
{
  "id": 655,
  "code": "CANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неполные соглашения по передаче канадских данных третьим лицам",
  "description": "Контроллер передает данные канадских резидентов сторонним обработчикам без формальных гарантий эквивалентного уровня защиты.",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.5.3"
},
{
  "id": 656,
  "code": "BOLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Невыполнение конституционного права Habeas Data в Боливии",
  "description": "На сайте отсутствуют механизмы для реализации конституционного права Habeas Data граждан Боливии на проверку, исправление или удаление данных.",
  "severity": "critical",
  "reference": "Bolivia Political Constitution, Article 130"
},
{
  "id": 657,
  "code": "BOLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие протоколов судебной защиты персональных данных в Боливии",
  "description": "Политика конфиденциальности не содержит конкретных административных или судебных механизмов защиты прав боливийских резидентов от незаконной обработки.",
  "severity": "serious",
  "reference": "Bolivia Political Constitution, Article 131"
},
{
  "id": 658,
  "code": "BOLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконная обработка логов коммуникаций в Боливии",
  "description": "Сайт отслеживает и обрабатывает метаданные коммуникаций или логи боливийских пользователей без явного согласия или судебного ордера.",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 55"
},
{
  "id": 659,
  "code": "BOLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неполное раскрытие сторонних получателей данных из Боливии",
  "description": "Политика конфиденциальности не указывает конкретные сторонние организации и базы данных, имеющие доступ к личным записям резидентов Боливии.",
  "severity": "serious",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 56"
},
{
  "id": 660,
  "code": "BOLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Небезопасное хранение баз данных субъектов в Боливии",
  "description": "Базы данных, обрабатывающие информацию боливийских резидентов, не применяют шифрование и технические меры безопасности по стандартам связи.",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 57"
},
{
  "id": 661,
  "code": "PRYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконная обработка кредитных историй в Парагвае",
  "description": "Сайт проводит профилирование или обрабатывает финансовую информацию жителей Парагвая без письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 6"
},
{
  "id": 662,
  "code": "PRYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие прямых механизмов исправления данных по закону Парагвая",
  "description": "Политика конфиденциальности не содержит бесплатных, упрощенных методов исправления неточных личных или финансовых записей в Парагвае.",
  "severity": "serious",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 14"
},
{
  "id": 663,
  "code": "PRYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие организационных мер безопасности данных в Парагвае",
  "description": "Контроллеры данных не проводят аудит и не документируют административные меры безопасности баз данных резидентов Парагвая.",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 9"
},
{
  "id": 664,
  "code": "PRYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконный прямой маркетинг по электронным каналам в Парагвае",
  "description": "Сайт рассылает коммерческие сообщения парагвайским потребителям без предварительного согласия или ссылок на отказ.",
  "severity": "serious",
  "reference": "Paraguay Consumer Protection Law (Ley 1334), Art. 6"
},
{
  "id": 665,
  "code": "PRYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ненадлежащие договоры с субподрядчиками парагвайских данных",
  "description": "Контроллер передает данные жителей Парагвая сторонним обработчикам без официальных соглашений, устанавливающих требования безопасности.",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 12"
},
{
  "id": 666,
  "code": "VENPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоблюдение принципов Habeas Data в Венесуэле",
  "description": "Сайт обрабатывает личные данные жителей Венесуэлы без предоставления механизмов для ознакомления, исправления или удаления записей.",
  "severity": "critical",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 667,
  "code": "VENPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие контроля безопасности при передаче венесуэльских данных",
  "description": "Веб-панели, собирающие и передающие личные данные резидентов Венесуэлы, не имеют документированных протоколов безопасности.",
  "severity": "serious",
  "reference": "Venezuela Infogobierno Law, Article 32"
},
{
  "id": 668,
  "code": "VENPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие раскрытия согласия для баз данных в Венесуэле",
  "description": "Политика конфиденциальности не раскрывает правовые основания и не запрашивает согласие на хранение личных данных граждан Венесуэлы.",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 669,
  "code": "VENPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие простых каналов доступа к записям для жителей Венесуэлы",
  "description": "Сайт не предоставляет резидентам Венесуэлы прямой бесплатный канал связи для ознакомления со своими профилями в базах данных.",
  "severity": "serious",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 670,
  "code": "VENPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие политики хранения клиентских записей в Венесуэле",
  "description": "Базы личных данных жителей Венесуэлы хранятся бесконечно долго без обоснования или процедур регулярного удаления.",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 671,
  "code": "GTMIP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватное информационное уведомление по закону Гватемалы",
  "description": "Политика конфиденциальности не объясняет резидентам Гватемалы цели сбора данных или политики их передачи третьим лицам.",
  "severity": "critical",
  "reference": "Guatemala Access to Public Information Law, Article 31"
},
{
  "id": 672,
  "code": "GTMIP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Невыполнение требований Habeas Data об исправлении записей в Гватемале",
  "description": "На сайте отсутствуют официальные каналы связи или интерфейсы для гватемальских резидентов для требования исправления или блокировки записей.",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 32"
},
{
  "id": 673,
  "code": "GTMIP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Небезопасное хранение персональных данных граждан Гватемалы",
  "description": "Системы баз данных, хранящие личные записи граждан Гватемалы, не имеют задокументированных мер контроля доступа и шифрования.",
  "severity": "moderate",
  "reference": "Guatemala Access to Public Information Law, Article 33"
},
{
  "id": 674,
  "code": "GTMIP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие явного согласия на передачу данных резидентов Гватемалы",
  "description": "Сайт передает персональные данные жителей Гватемалы партнерам или маркетинговым платформам без явного предварительного согласия.",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 34"
},
{
  "id": 675,
  "code": "GTMIP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие бесплатных каналов отзыва согласия на маркетинг в Гватемале",
  "description": "Сайт не предоставляет гватемальским пользователям простого бесплатного механизма для отказа и отзыва согласия на коммерческие рассылки.",
  "severity": "moderate",
  "reference": "Guatemala Consumer Protection Law, Article 17"
},
{
  "id": 676,
  "code": "DOMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка данных граждан Доминиканы без предварительного согласия",
  "description": "Сайт собирает и обрабатывает личные данные жителей Доминиканской Республики без получения предварительного, добровольного и информированного согласия.",
  "severity": "critical",
  "reference": "Dominican Republic Law 172-13, Article 5"
},
{
  "id": 677,
  "code": "DOMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неполное раскрытие личности контроллера в Доминикане",
  "description": "Политика конфиденциальности не указывает лицо, ответственное за обработку данных, и регистрационные номера баз данных в госорганах.",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 8"
},
{
  "id": 678,
  "code": "DOMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные процедуры запросов Habeas Data по закону Доминиканы",
  "description": "У контроллера данных отсутствуют документированные методы отправки гражданами Доминиканы запросов на доступ, исправление и удаление данных.",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 18"
},
{
  "id": 679,
  "code": "DOMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконная трансграничная передача данных граждан Доминиканы",
  "description": "Сайт передает персональные данные граждан Доминиканской Республики в страны или организации, которые не гарантируют адекватный уровень безопасности.",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 29"
},
{
  "id": 680,
  "code": "DOMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие мер безопасности для банков персональных данных в Доминикане",
  "description": "Системы баз данных не имеют документированных физических, логических и административных мер безопасности, требуемых Законом 172-13.",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 12"
},
{
  "id": 681,
  "code": "SLVPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие согласия на коммерческие рассылки в Сальвадоре",
  "description": "Сайт отправляет коммерческие письма жителям Сальвадора без получения предварительного явного согласия или предоставления пути отказа.",
  "severity": "critical",
  "reference": "El Salvador Electronic Commerce Law, Article 18"
},
{
  "id": 682,
  "code": "SLVPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватное раскрытие правил обработки данных в Сальвадоре",
  "description": "Политика конфиденциальности не раскрывает методы сбора и протоколы передачи личной информации сальвадорских потребителей.",
  "severity": "serious",
  "reference": "El Salvador Electronic Commerce Law, Article 20"
},
{
  "id": 683,
  "code": "SLVPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Небезопасное логирование транзакций клиентов из Сальвадора",
  "description": "Веб-портал, обрабатывающий электронные платежи пользователей из Сальвадора, не применяет безопасные, зашифрованные логи транзакций.",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 22"
},
{
  "id": 684,
  "code": "SLVPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Небезопасное хранение баз данных потребителей из Сальвадора",
  "description": "Базы данных, хранящие личные записи резидентов Сальвадора, не имеют технических мер безопасности для защиты от утечек данных.",
  "severity": "serious",
  "reference": "El Salvador Consumer Protection Law, Article 27"
},
{
  "id": 685,
  "code": "SLVPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неполные возможности удаления учетных записей пользователей из Сальвадора",
  "description": "Сайт не предоставляет потребителям из Сальвадора простых автоматизированных каналов для требования полного удаления учетных записей.",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 19"
},
{
  "id": 686,
  "code": "HNDPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие раскрытия целей сбора данных резидентов Гондураса",
  "description": "Сайт собирает персональные данные жителей Гондураса без предоставления четкого раскрытия целей их обработки.",
  "severity": "critical",
  "reference": "Honduras Access to Public Information Law, Article 23"
},
{
  "id": 687,
  "code": "HNDPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие путей блокировки и удаления в базах данных Гондураса",
  "description": "Контроллер данных не предоставляет задокументированных путей или контактов для запроса блокировки баз данных или удаления файлов гражданами Гондураса.",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 24"
},
{
  "id": 688,
  "code": "HNDPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незаконная передача данных третьим лицам без согласия в Гондурасе",
  "description": "Сайт передает персональные базы данных жителей Гондураса коммерческим организациям без получения предварительного согласия.",
  "severity": "moderate",
  "reference": "Honduras Access to Public Information Law, Article 25"
},
{
  "id": 689,
  "code": "HNDPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Небезопасное хранение персональных данных жителей Гондураса",
  "description": "Базы данных, обрабатывающие персональную информацию жителей Гондураса, не имеют базового контроля логического доступа и шифрования.",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 26"
},
{
  "id": 690,
  "code": "HNDPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие бесплатных каналов отказа от маркетинга в Гондурасе",
  "description": "Сайт, ориентированный на потребителей из Гондураса, не отображает четких бесплатных механизмов отказа от коммерческих сообщений.",
  "severity": "moderate",
  "reference": "Honduras Consumer Protection Law, Article 15"
},
{
  "id": 691,
  "code": "NICPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие регистрации баз данных в надзорном органе Никарагуа",
  "description": "Контроллер данных не зарегистрировал свои базы данных, содержащие информацию жителей Никарагуа, в государственном реестре.",
  "severity": "critical",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 15"
},
{
  "id": 692,
  "code": "NICPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие явного согласия на обработку конфиденциальных данных в Никарагуа",
  "description": "Сайт собирает конфиденциальные данные жителей Никарагуа без получения предварительного, письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 7"
},
{
  "id": 693,
  "code": "NICPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные пути защиты прав ARCO по закону Никарагуа",
  "description": "Политика конфиденциальности не содержит конкретных контактов или законных сроков для реализации прав ARCO по Закону 787.",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 9"
},
{
  "id": 694,
  "code": "NICPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Никарагуа",
  "description": "Сайт передает базы персональных данных жителей Никарагуа за рубеж без получения разрешения госорганов или гарантий адекватности.",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 21"
},
{
  "id": 695,
  "code": "NICPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несообщение об инцидентах безопасности баз данных в Никарагуа",
  "description": "Организация не имеет документированных процедур для сообщения об инцидентах безопасности регулирующим органам Никарагуа и пострадавшим лицам.",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 12"
},
{
  "id": 696,
  "code": "GHAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации в качестве контроллера в DPC Ганы",
  "description": "Организация обрабатывает персональные данные жителей Ганы без регистрации в качестве контроллера данных в Комиссии по защите данных (DPC).",
  "severity": "critical",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 27"
},
{
  "id": 697,
  "code": "GHAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка конфиденциальных данных граждан Ганы без разрешения",
  "description": "Сайт собирает конфиденциальные личные данные (биометрические, здоровье, убеждения) жителей Ганы без получения предварительного письменного разрешения DPC.",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 35"
},
{
  "id": 698,
  "code": "GHAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватное уведомление о праве возражать против маркетинга в Гане",
  "description": "Политика конфиденциальности не сообщает ганским субъектам данных об их конкретном праве возражать против обработки для рекламных целей.",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 20"
},
{
  "id": 699,
  "code": "GHAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Ганы",
  "description": "Контроллер передает персональные данные жителей Ганы за рубеж без получения письменного согласия или подтверждения адекватности от DPC.",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 47"
},
{
  "id": 700,
  "code": "GHAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие систем уведомления об утечках безопасности по закону Ганы",
  "description": "У контроллера данных отсутствуют задокументированные процедуры сообщения об инцидентах безопасности в DPC Ганы и пострадавшим лицам.",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 31"
},
{
  "id": 701,
  "code": "UGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации в Управлении по защите данных Уганды",
  "description": "Контроллер данных собирает и обрабатывает данные жителей Уганды без официальной регистрации в Управлении по защите персональных данных Уганды.",
  "severity": "critical",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 4"
},
{
  "id": 702,
  "code": "UGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Сбор данных граждан Уганды без предварительного согласия",
  "description": "Сайт собирает личные данные граждан Уганды без получения предварительного, письменного и явного согласия.",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 7"
},
{
  "id": 703,
  "code": "UGAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные процедуры обработки прав субъектов в Уганде",
  "description": "Контроллер не предоставляет прямых путей или контактов для обработки запросов на доступ, исправление или удаление данных субъектами из Уганды.",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 24"
},
{
  "id": 704,
  "code": "UGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Незаконный прямой маркетинг без возможности отказа в Уганде",
  "description": "Сайт отправляет коммерческие письма или рекламные сообщения гражданам Уганды без предоставления подтвержденного бесплатного механизма отказа.",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 15"
},
{
  "id": 705,
  "code": "UGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующее хранение данных из Уганды в неадекватных странах",
  "description": "Персональные данные жителей Уганды передаются за рубеж в юрисдикции, которые не гарантируют адекватный уровень защиты.",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 19"
},
{
  "id": 706,
  "code": "RWAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка персональных данных без регистрации в Руанде",
  "description": "Контроллер данных обрабатывает персональные данные жителей Руанды без получения регистрации или уведомления надзорного органа.",
  "severity": "critical",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 8"
},
{
  "id": 707,
  "code": "RWAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на обработку конфиденциальных данных в Руанде",
  "description": "Сайт собирает конфиденциальные данные (здоровье, биометрия) жителей Руанды без получения предварительного, явного и несвязанного согласия.",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 10"
},
{
  "id": 708,
  "code": "RWAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие контактов местного DPO для операций в Руанде",
  "description": "Организация обрабатывает личные данные жителей Руанды, но не указала контакты местного сотрудника по защите данных (DPO).",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 18"
},
{
  "id": 709,
  "code": "RWAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные процедуры сообщения об утечках в надзорный орган Руанды",
  "description": "Организация не сообщает об инцидентах безопасности баз данных в надзорный орган Руанды в течение 48 часов с момента их обнаружения.",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 25"
},
{
  "id": 710,
  "code": "RWAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Незаконная трансграничная передача данных жителей Руанды",
  "description": "Сайт передает персональные данные жителей Руанды за рубеж без получения предварительного разрешения или подтверждения адекватности.",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 30"
},
{
  "id": 711,
  "code": "ZIMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных граждан Зимбабве без регистрации",
  "description": "Контроллер данных обрабатывает личные записи резидентов Зимбабве без лицензии или регистрации в регулирующем органе POTRAZ.",
  "severity": "critical",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 11"
},
{
  "id": 712,
  "code": "ZIMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на автоматизированное принятие решений в Зимбабве",
  "description": "Сайт осуществляет автоматическое профилирование или принятие решений в отношении жителей Зимбабве без получения явного предварительного согласия.",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 17"
},
{
  "id": 713,
  "code": "ZIMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности для баз данных Зимбабве",
  "description": "Базы данных, обрабатывающие личную информацию жителей Зимбабве, не имеют технических средств защиты от несанкционированного раскрытия.",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 22"
},
{
  "id": 714,
  "code": "ZIMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие процедур запроса доступа к данным для граждан Зимбабве",
  "description": "Сайт не предоставляет резидентам Зимбабве прямой бесплатной процедуры для отправки запросов на доступ или исправление данных.",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 15"
},
{
  "id": 715,
  "code": "ZIMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в отношении жителей Зимбабве",
  "description": "Сайт рассылает коммерческие рекламные письма жителям Зимбабве без получения явного согласия до начала рассылки.",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 25"
},
{
  "id": 716,
  "code": "AOGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка персональных данных Анголы без уведомления APD",
  "description": "Организация обрабатывает личные записи резидентов Анголы без подачи обязательной декларации или получения разрешения APD.",
  "severity": "critical",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 28"
},
{
  "id": 717,
  "code": "AOGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на обработку конфиденциальных данных в Анголе",
  "description": "Сайт собирает конфиденциальные данные (здоровье, биометрия) жителей Анголы без получения явного предварительного согласия.",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 7"
},
{
  "id": 718,
  "code": "AOGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполное раскрытие категорий получателей данных в Анголе",
  "description": "Политика конфиденциальности не сообщает резидентам Анголы о конкретных сторонних организациях, имеющих доступ к их личным записям.",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 14"
},
{
  "id": 719,
  "code": "AOGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная техническая безопасность личных баз данных в Анголе",
  "description": "Настройки хостинга серверов, хранящих записи индонезийских пользователей, не имеют технических средств защиты от несанкционированных утечек.",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 19"
},
{
  "id": 720,
  "code": "AOGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Незаконная трансграничная передача персональных данных из Анголы",
  "description": "Сайт передает персональные данные жителей Анголы за рубеж без получения предварительного письменного одобрения APD.",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 33"
},
{
  "id": 721,
  "code": "ALGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации систем обработки данных в ANPDP Алжира",
  "description": "Контроллер данных обрабатывает личные записи резидентов Алжира без регистрации своих информационных систем в ANPDP.",
  "severity": "critical",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 13"
},
{
  "id": 722,
  "code": "ALGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного предварительного согласия на личные данные в Алжире",
  "description": "Сайт собирает и обрабатывает персональные данные граждан Алжира без получения предварительного, явного и задокументированного согласия.",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 7"
},
{
  "id": 723,
  "code": "ALGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные процедуры удовлетворения прав на доступ и удаление в Алжире",
  "description": "У контроллера данных отсутствуют документированные методы отправки гражданами Алжира запросов на доступ, исправление или удаление данных.",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 34"
},
{
  "id": 724,
  "code": "ALGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Алжира",
  "description": "Сайт передает персональные базы данных жителей Алжира за рубеж без получения разрешения или одобрения безопасности от ANPDP.",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 44"
},
{
  "id": 725,
  "code": "ALGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов уведомления ANPDP об утечках в Алжире",
  "description": "Организация не имеет документированных процедур для сообщения об инцидентах безопасности в ANPDP Алжира и пострадавшим лицам.",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 41"
},
{
  "id": 726,
  "code": "JORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка персональных данных граждан Иордании без согласия",
  "description": "Сайт собирает и обрабатывает персональные данные жителей Иордании без получения явного, предварительного и задокументированного согласия.",
  "severity": "critical",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 4"
},
{
  "id": 727,
  "code": "JORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие сотрудника по защите данных (DPO) для операций в Иордании",
  "description": "Контроллер данных обрабатывает базы личных данных жителей Иордании в крупных масштабах, но не назначил сотрудника по защите данных (DPO).",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 15"
},
{
  "id": 728,
  "code": "JORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватное раскрытие сроков хранения данных в Иордании",
  "description": "Политика конфиденциальности не указывает конкретные сроки хранения или критерии их определения для данных граждан Иордании.",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 8"
},
{
  "id": 729,
  "code": "JORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Иордании",
  "description": "Сайт передает персональные данные жителей Иордании за рубеж без обеспечения гарантий адекватности или одобрения властей.",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 19"
},
{
  "id": 730,
  "code": "JORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполные возможности доступа и исправления для граждан Иордании",
  "description": "Системы баз данных не имеют простых и бесплатных механизмов для запроса доступа или исправления данных гражданами Иордании.",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 10"
},
{
  "id": 731,
  "code": "KWTDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие задокументированного соответствия CITRA в Кувейте",
  "description": "Сайт собирает персональные данные жителей Кувейта без документирования соответствия правилам защиты данных CITRA.",
  "severity": "critical",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 5"
},
{
  "id": 732,
  "code": "KWTDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на маркетинговые рассылки в Кувейте",
  "description": "Сайт рассылает коммерческие рекламные сообщения жителям Кувейта без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 11"
},
{
  "id": 733,
  "code": "KWTDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности баз данных в Кувейте",
  "description": "Системы баз данных, хранящие записи кувейтских пользователей, не имеют технических средств защиты от несанкционированного доступа.",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 14"
},
{
  "id": 734,
  "code": "KWTDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие процедур отчетов об инцидентах в CITRA Кувейта",
  "description": "Контроллер не задокументировал процедуры сообщения об инцидентах безопасности в CITRA и пострадавшим кувейтским пользователям.",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 21"
},
{
  "id": 735,
  "code": "KWTDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие упрощенного удаления данных для потребителей из Кувейта",
  "description": "Сайт не предоставляет потребителям из Кувейта прямых и бесплатных путей для отзыва согласия и запроса удаления данных.",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 8"
},
{
  "id": 736,
  "code": "UZBPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Обработка данных жителей Узбекистана без явного согласия",
  "description": "Сайт собирает и обрабатывает персональные данные граждан Узбекистана без получения явного предварительного согласия.",
  "severity": "critical",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 18"
},
{
  "id": 737,
  "code": "UZBPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Нарушение требований о локализации баз данных в Узбекистане",
  "description": "Базы данных, хранящие личные записи граждан Узбекистана, размещены за пределами страны, нарушая требования локализации.",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 12-1"
},
{
  "id": 738,
  "code": "UZBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные уведомления о доступе и исправлении данных в Узбекистане",
  "description": "Политика конфиденциальности не описывает права пользователей требовать доступа, блокировки или исправления данных в Узбекистане.",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 30"
},
{
  "id": 739,
  "code": "UZBPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Несоответствующая трансграничная передача данных граждан Узбекистана",
  "description": "Контроллер передает персональные данные граждан Узбекистана в страны, не обеспечивающие адекватный уровень защиты.",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 15"
},
{
  "id": 740,
  "code": "UZBPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие регистрации персональных баз данных в госреестре Узбекистана",
  "description": "Контроллер не зарегистрировал системы баз данных, обрабатывающие информацию жителей Узбекистана, в Государственном реестре.",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 24"
},
{
  "id": 741,
  "code": "GEOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие уведомления Государственной службы инспектора на Грузии",
  "description": "Контроллер данных обрабатывает персональные данные жителей Грузии без уведомления Службы государственного инспектора.",
  "severity": "critical",
  "reference": "Georgia Law on Personal Data Protection, Article 15"
},
{
  "id": 742,
  "code": "GEOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на обработку конфиденциальных данных в Грузии",
  "description": "Сайт собирает конфиденциальные данные (здоровье, биометрия) жителей Грузии без получения явного согласия.",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 6"
},
{
  "id": 743,
  "code": "GEOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватное раскрытие обработчиков данных в Грузии",
  "description": "Политика конфиденциальности не раскрывает конкретных сторонних обработчиков, работающих с личными данными жителей Грузии.",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 19"
},
{
  "id": 744,
  "code": "GEOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие аудитов безопасности и контроля прав по закону Грузии",
  "description": "База данных, содержащая записи грузинских субъектов, не имеет документированных логов безопасности и аудита прав доступа.",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 24"
},
{
  "id": 745,
  "code": "GEOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие процедуры блокировки и удаления на Грузии",
  "description": "Контроллер данных не предоставляет четких каналов связи или сроков ответа для запроса блокировки или удаления данных субъектами из Грузии.",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 21"
},
{
  "id": 746,
  "code": "ARMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоблюдение Закона Республики Армения о защите персональных данных",
  "description": "Контроллер данных обрабатывает персональные данные жителей Армении без соблюдения установленных законом требований.",
  "severity": "critical",
  "reference": "Armenia Law on Personal Data Protection, Article 9"
},
{
  "id": 747,
  "code": "ARMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на автоматическое профилирование в Армении",
  "description": "Сайт осуществляет автоматический таргетинг или профилирование жителей Армении без получения явного согласия.",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 11"
},
{
  "id": 748,
  "code": "ARMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполное раскрытие мест международной передачи данных для Армении",
  "description": "Политика конфиденциальности не сообщает о конкретных странах или организациях за пределами Армении, получающих доступ к данным.",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 27"
},
{
  "id": 749,
  "code": "ARMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие планов безопасности для баз данных в Армении",
  "description": "База данных, содержащая записи армянских субъектов, не имеет задокументированных административных и логических планов безопасности.",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 19"
},
{
  "id": 750,
  "code": "ARMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные процедуры доступа и исправления в Армении",
  "description": "Контроллер данных не предоставляет четких каналов связи или сроков ответа для запроса исправления данных армянскими субъектами.",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 15"
},
{
  "id": 751,
  "code": "SWSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на высокорисковое профилирование по FADP Швейцарии",
  "description": "Сайт осуществляет высокорисковое профилирование резидентов Швейцарии без предварительного явного согласия, как того требует пересмотренный FADP.",
  "severity": "critical",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 6, Art. 60"
},
{
  "id": 752,
  "code": "SWSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполное раскрытие информации в политике конфиденциальности по FADP Швейцарии",
  "description": "Политика конфиденциальности сайта не предоставляет полную информацию о личности контроллера, категориях данных и странах-получателях по FADP.",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 19, Art. 60"
},
{
  "id": 753,
  "code": "SWSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие контактов представителя для иностранных контроллеров по FADP",
  "description": "Иностранный контроллер сайта не назначил и не раскрыл назначенного представителя в Швейцарии для связи с субъектами данных.",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 14"
},
{
  "id": 754,
  "code": "SWSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача швейцарских данных",
  "description": "Контроллер экспортирует личные данные швейцарских резидентов в третьи страны без решения Федерального совета об адекватности или стандартных условий.",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 16, Art. 17"
},
{
  "id": 755,
  "code": "SWSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов по FADP Швейцарии",
  "description": "Сайт не предоставляет резидентам Швейцарии бесплатные и доступные методы реализации их прав на доступ, исправление или удаление данных.",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 25, Art. 26"
},
{
  "id": 756,
  "code": "SAUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на конфиденциальные данные по PDPL Саудовской Аравии",
  "description": "Сайт собирает конфиденциальные личные данные (медицинские, финансовые) резидентов Саудовской Аравии без явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 5, Art. 35"
},
{
  "id": 757,
  "code": "SAUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие двуязычной политики конфиденциальности по PDPL Саудовской Аравии",
  "description": "Политика конфиденциальности не предоставлена на арабском языке, что нарушает требования прозрачности и доступности для резидентов Саудовской Аравии.",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 30"
},
{
  "id": 758,
  "code": "SAUPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Саудовской Аравии",
  "description": "Сайт отправляет материалы прямого маркетинга или рекламные файлы cookie субъектам из Саудовской Аравии без предварительного согласия.",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 28"
},
{
  "id": 759,
  "code": "SAUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несанкционированная трансграничная передача саудовских данных",
  "description": "Сайт экспортирует личные данные резидентов Саудовской Аравии на внешние серверы без подтверждения соответствия требованиям национальной безопасности.",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 29, Art. 35"
},
{
  "id": 760,
  "code": "SAUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие каналов обжалования для субъектов по закону Саудовской Аравии",
  "description": "Политика конфиденциальности сайта не описывает механизмы подачи жалоб субъектами данных в регулирующий орган (SDAIA).",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 9"
},
{
  "id": 761,
  "code": "ISRPA-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без регистрации базы данных в Израиле",
  "description": "Сайт собирает конфиденциальные данные израильских граждан (здоровье, биометрия) без регистрации базы данных в Управлении по защите конфиденциальности (PPA).",
  "severity": "critical",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 8, Section 31A"
},
{
  "id": 762,
  "code": "ISRPA-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие уведомления о добровольности сбора данных в Израиле",
  "description": "Веб-формы не уведомляют израильских пользователей о том, является ли предоставление личных данных обязательным по закону или добровольным.",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 11"
},
{
  "id": 763,
  "code": "ISRPA-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватный контроль доступа и логирование по регламентам Израиля",
  "description": "База данных сайта не имеет логов безопасности и ограничений доступа, обязательных для баз данных с персональными файлами в Израиле.",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Regulations (Information Security), 5777-2017"
},
{
  "id": 764,
  "code": "ISRPA-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг по почте в Израиле",
  "description": "Контроллер использует контактные листы для прямой рассылки гражданам Израиля без раскрытия источника базы данных и путей отказа.",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 17F"
},
{
  "id": 765,
  "code": "ISRPA-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие процедур доступа и исправления в Израиле",
  "description": "Политика конфиденциальности не описывает административные процессы или сроки для ознакомления, исправления или удаления записей субъектами в Израиле.",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 13, Section 14"
},
{
  "id": 766,
  "code": "LKAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на обработку конфиденциальных данных в Шри-Ланке",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Шри-Ланки без получения явного согласия.",
  "severity": "critical",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 6"
},
{
  "id": 767,
  "code": "LKAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Избыточное хранение персональных данных в Шри-Ланке",
  "description": "Сайт хранит личные данные пользователей из Шри-Ланки дольше, чем необходимо для заявленных целей, нарушая лимиты хранения.",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 10"
},
{
  "id": 768,
  "code": "LKAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие контактов DPO по закону Шри-Ланки",
  "description": "Контроллер данных не назначил или не предоставил публичные контакты назначенного сотрудника по защите данных (DPO) по закону Шри-Ланки.",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 20"
},
{
  "id": 769,
  "code": "LKAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Невыполнение бесплатных прав доступа субъектов в Шри-Ланке",
  "description": "Политика конфиденциальности сайта не устанавливает процедуры для бесплатного ответа на запросы доступа резидентов Шри-Ланки в течение 21 дня.",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 14"
},
{
  "id": 770,
  "code": "LKAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Шри-Ланки",
  "description": "Контроллер передает данные из Шри-Ланки во внешние страны, которые не обеспечивают адекватный уровень защиты данных по правилам регулятора.",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 26"
},
{
  "id": 771,
  "code": "MUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие законных оснований для сбора конфиденциальных данных на Маврикии",
  "description": "Сайт собирает конфиденциальные личные данные граждан Маврикия без законных оснований или предварительного явного согласия.",
  "severity": "critical",
  "reference": "Mauritius Data Protection Act 2017, Sec. 29, Sec. 43"
},
{
  "id": 772,
  "code": "MUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполное раскрытие трансграничной передачи на Маврикии",
  "description": "Политика конфиденциальности не раскрывает детали передачи и не запрашивает согласие на экспорт данных пользователей Маврикия в облака.",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28"
},
{
  "id": 773,
  "code": "MUSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие простых способов отзыва согласия на Маврикии",
  "description": "Сайт не предоставляет резидентам Маврикия простые и бесплатные методы отзыва согласия на текущие операции обработки.",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28(2)"
},
{
  "id": 774,
  "code": "MUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующее сообщения об утечках за 72 часа на Маврикии",
  "description": "У контроллера сайта отсутствуют задокументированные процессы сообщения об утечках Комиссару в течение 72 часов по закону Маврикия.",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 44, Sec. 47"
},
{
  "id": 775,
  "code": "MUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления данных на Маврикии",
  "description": "Сайт не предоставляет четких административных контактов для запросов граждан Маврикия об удалении или исправлении их записей.",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 39"
},
{
  "id": 776,
  "code": "TZNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка персональных данных без регистрации комиссии в Танзании",
  "description": "Сайт собирает личные данные субъектов из Танзании без регистрации в качестве контроллера данных в Комиссии по защите персональных данных.",
  "severity": "critical",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 14, Sec. 15"
},
{
  "id": 777,
  "code": "TZNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Танзании",
  "description": "Сайт использует личные данные граждан Танзании для коммерческого прямого маркетинга без получения предварительного согласия.",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 31"
},
{
  "id": 778,
  "code": "TZNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные процедуры доступа и исправления в Танзании",
  "description": "Политика конфиденциальности сайта не содержит доступных процедур и контактов для проверки и исправления записей пользователями из Танзании.",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 27, Sec. 28"
},
{
  "id": 779,
  "code": "TZNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Танзании",
  "description": "Контроллер передает персональные данные резидентов Танзании за пределы страны без получения предварительного одобрения или разрешения Комиссии.",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 32"
},
{
  "id": 780,
  "code": "TZNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках в Танзании",
  "description": "Контроллер данных не имеет задокументированных процедур уведомления Комиссии и пострадавших лиц об утечках безопасности в кратчайшие сроки.",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 40"
},
{
  "id": 781,
  "code": "BTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных персональных данных без согласия в Ботсване",
  "description": "Сайт обрабатывает конфиденциальные личные данные (здоровье, половая жизнь) субъектов из Ботсваны без письменного или цифрового явного согласия.",
  "severity": "critical",
  "reference": "Botswana Data Protection Act, 2018, Sec. 16, Sec. 49"
},
{
  "id": 782,
  "code": "BTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие разрешения на трансграничную передачу из Ботсваны",
  "description": "Контроллер передает личные данные резидентов Ботсваны в страны без адекватных законов без разрешения Уполномоченного.",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 48, Sec. 49"
},
{
  "id": 783,
  "code": "BTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры защиты чувствительных баз данных в Ботсване",
  "description": "База данных сайта не имеет мер безопасности и шифрования для защиты личных записей пользователей из Ботсваны.",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 33"
},
{
  "id": 784,
  "code": "BTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие методов доступа и ограничения данных в Ботсване",
  "description": "Политика конфиденциальности сайта не содержит доступных методов для проверки или ограничения обработки данных резидентами Ботсваны.",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 21, Sec. 22"
},
{
  "id": 785,
  "code": "BTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие каналов для отзыва согласия в Ботсване",
  "description": "Сайт не предоставляет резидентам Ботсваны прямые и бесплатные механизмы для отзыва согласия на отслеживание данных.",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 20"
},
{
  "id": 786,
  "code": "ZMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без письменного согласия в Замбии",
  "description": "Сайт собирает конфиденциальные личные данные (медицинские, финансовые сведения) субъектов из Замбии без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 15"
},
{
  "id": 787,
  "code": "ZMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без регистрации контроллера в Замбии",
  "description": "Контроллер сайта собирает личные данные резидентов Замбии без регистрации в Офисе комиссара по защите данных.",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 11"
},
{
  "id": 788,
  "code": "ZMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неназначение сотрудника по защите данных (DPO) по закону Замбии",
  "description": "Контроллер сайта не назначил и не указал публичные контакты сотрудника по защите данных (DPO), как того требуют правила Замбии.",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 41"
},
{
  "id": 789,
  "code": "ZMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Замбии",
  "description": "Сайт хранит личные записи пользователей из Замбии дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 14"
},
{
  "id": 790,
  "code": "ZMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Замбии",
  "description": "Контроллер передает данные резидентов Замбии за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 47"
},
{
  "id": 791,
  "code": "JAMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие регистрации у Комиссара по информации в Ямайке",
  "description": "Контроллер сайта собирает личные данные резидентов Ямайки без регистрации в качестве контроллера у Комиссара по информации.",
  "severity": "critical",
  "reference": "Jamaica Data Protection Act, 2020, Section 14, Section 67"
},
{
  "id": 792,
  "code": "JAMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие контактов сотрудника по защите данных (DPO) в Ямайке",
  "description": "Политика конфиденциальности сайта не указывает контакты назначенного сотрудника по защите данных (DPO) в Ямайке.",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 18"
},
{
  "id": 793,
  "code": "JAMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие возможности отказа от профилирования в Ямайке",
  "description": "Сайт не предоставляет резидентам Ямайки четких опций для отказа или возражения против обработки данных в целях профилирования.",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 27"
},
{
  "id": 794,
  "code": "JAMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие формальных соглашений с обработчиками в Ямайке",
  "description": "Контроллер передает персональные данные резидентов Ямайки сторонним хостерам или обработчикам без обязательного письменного контракта.",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 31"
},
{
  "id": 795,
  "code": "JAMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Ямайки",
  "description": "Контроллер экспортирует личные данные пользователей из Ямайки в страны без адекватной защиты без разрешения Комиссара.",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 36"
},
{
  "id": 796,
  "code": "BRBPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незарегистрированная обработка личных данных в Барбадосе",
  "description": "Сайт собирает персональные данные граждан Барбадоса без предварительной регистрации у Уполномоченного по защите данных.",
  "severity": "critical",
  "reference": "Barbados Data Protection Act, 2019, Sec. 14, Sec. 51"
},
{
  "id": 797,
  "code": "BRBPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Барбадосе",
  "description": "На сайте отсутствуют технические и административные меры для защиты собранных записей резидентов Барбадоса от утечек.",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 32"
},
{
  "id": 798,
  "code": "BRBPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие обязательных раскрытий в политике по закону Барбадоса",
  "description": "Политика конфиденциальности не предоставляет пользователям из Барбадоса сведения о целях данных, сроках хранения и получателях.",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 37"
},
{
  "id": 799,
  "code": "BRBPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие механизмов возражения против обработки в Барбадосе",
  "description": "Сайт не предоставляет субъектам данных из Барбадоса четких механизмов для возражения или ограничения обработки в коммерческих целях.",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 24"
},
{
  "id": 800,
  "code": "BRBPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующее сообщения об утечках за 72 часа в Барбадосе",
  "description": "На сайте отсутствуют задокументированные протоколы уведомления Комиссара в течение 72 часов об инциденте безопасности.",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 46"
},
{
  "id": 801,
  "code": "BHSPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Незарегистрированная обработка данных в Багамах",
  "description": "Сайт собирает конфиденциальные личные данные багамских субъектов без регистрации реестра обработки у Комиссара по защите данных.",
  "severity": "critical",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 5, Sec. 15"
},
{
  "id": 802,
  "code": "BHSPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Багамах",
  "description": "База данных собирает и хранит личные файлы резидентов Багамских островов без надлежащих мер безопасности.",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 11"
},
{
  "id": 803,
  "code": "BHSPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие прав на исправление и удаление данных в Багамах",
  "description": "Политика конфиденциальности сайта не содержит доступных контактов для резидентов Багамских островов для запросов на исправление или удаление.",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 8"
},
{
  "id": 804,
  "code": "BHSPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующий отказ от прямого маркетинга в Багамах",
  "description": "Сайт отправляет рекламные письма или маркетинговые файлы cookie субъектам из Багамских островов без предоставления бесплатных механизмов отказа.",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 13"
},
{
  "id": 805,
  "code": "BHSPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Избыточные сроки хранения данных по закону Багам",
  "description": "Сайт хранит личные записи багамских пользователей бессрочно без установления конкретных ограничений или циклов очистки.",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 6"
},
{
  "id": 806,
  "code": "TTOPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка данных без регистрации в Тринидаде и Тобаго",
  "description": "Сайт обрабатывает конфиденциальные личные данные резидентов Тринидада и Тобаго без регистрации базы данных у Комиссара по информации.",
  "severity": "critical",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46, Section 82"
},
{
  "id": 807,
  "code": "TTOPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Тринидаде и Тобаго",
  "description": "База данных собирает и обрабатывает личные файлы пользователей из Тринидада и Тобаго без обязательного шифрования или контроля.",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 38"
},
{
  "id": 808,
  "code": "TTOPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие 30-дневные сроки запросов в Тринидаде и Тобаго",
  "description": "Политика конфиденциальности сайта не описывает контакты или процедуры для ответа на запросы доступа к данным в течение 30 дней.",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 42"
},
{
  "id": 809,
  "code": "TTOPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача из Тринидада и Тобаго",
  "description": "Сайт передает персональные данные пользователей из Тринидада и Тобаго в страны без сопоставимой правовой защиты без согласия.",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46(2)"
},
{
  "id": 810,
  "code": "TTOPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка во вторичных целях без согласия в Тринидаде и Тобаго",
  "description": "Сайт использует личные данные пользователей из Тринидада и Тобаго во вторичных маркетинговых целях без получения согласия.",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 32"
},
{
  "id": 811,
  "code": "MCOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие уведомления CCIN об обработке в Монако",
  "description": "Сайт собирает личные данные резидентов Монако без подачи декларации или получения разрешения от регулирующего органа (CCIN).",
  "severity": "critical",
  "reference": "Monaco Law No. 1.165, Article 7, Article 21"
},
{
  "id": 812,
  "code": "MCOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие представителя для иностранных контроллеров в Монако",
  "description": "Иностранный контроллер сайта не назначил и не раскрыл представителя в Монако для контактов с субъектами данных.",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 7-1"
},
{
  "id": 813,
  "code": "MCOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватное согласие на файлы cookie и отсутствие выбора в Монако",
  "description": "Сайт размещает рекламные файлы cookie в браузерах резидентов Монако без предварительного уведомления и активного выбора.",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 11, Article 12"
},
{
  "id": 814,
  "code": "MCOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несанкционированный экспорт персональных данных из Монако",
  "description": "Сайт передает персональные данные резидентов Монако в зарубежные страны без подтверждения адекватности или разрешения CCIN.",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 20, Article 20-1"
},
{
  "id": 815,
  "code": "MCOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации права на возражение в Монако",
  "description": "Политика конфиденциальности сайта не указывает четкие контакты для резидентов Монако для возражения против обработки или исправления файлов.",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 13, Article 15"
},
{
  "id": 816,
  "code": "ADPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие законных оснований обработки по закону Андорры 29/2021",
  "description": "Сайт обрабатывает личные данные резидентов Андорры без установления законных оснований, предусмотренных Квалифицированным законом.",
  "severity": "critical",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 6, Article 7"
},
{
  "id": 817,
  "code": "ADPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие назначения или регистрации DPO в Андорре",
  "description": "Контроллер сайта не назначил и не зарегистрировал сотрудника по защите данных (DPO) в APDA, как того требует закон 29/2021.",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 37"
},
{
  "id": 818,
  "code": "ADPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Андорры",
  "description": "Политика конфиденциальности сайта не раскрывает сроки хранения данных, законные основания или права резидентов на подачу жалоб в APDA.",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 13, Article 14"
},
{
  "id": 819,
  "code": "ADPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Андорры",
  "description": "Контроллер передает персональные данные субъектов из Андорры в третьи страны без подтверждения адекватности или одобренных APDA условий.",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 44, Article 45"
},
{
  "id": 820,
  "code": "ADPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации права на удаление в Андорре",
  "description": "Сайт не предоставляет пользователям из Андорры простые и бесплатные методы для запроса удаления или ограничения их персональных данных.",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 15, Article 18"
},
{
  "id": 821,
  "code": "SRBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на чувствительные данные в Сербии",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, биометрия) резидентов Сербии без предварительного явного согласия.",
  "severity": "critical",
  "reference": "Serbia Law on Personal Data Protection, Article 17, Article 95"
},
{
  "id": 822,
  "code": "SRBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие контактов представителя в Сербии для иностранных контроллеров",
  "description": "Иностранный контроллер сайта не назначил и не указал назначенного представителя в Сербии для соблюдения законодательства.",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 44"
},
{
  "id": 823,
  "code": "SRBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Сербии",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки в Сербии, сроках хранения или контактах Уполномоченного.",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 23"
},
{
  "id": 824,
  "code": "SRBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующее сообщения об утечках за 72 часа в Сербии",
  "description": "Контроллер сайта не имеет задокументированных процедур сообщения об утечках безопасности Уполномоченному Сербии в течение 72 часов.",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 52, Article 95"
},
{
  "id": 825,
  "code": "SRBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные методы ответа на права субъектов в Сербии",
  "description": "Сайт не предоставляет каналов для реализации резидентами Сербии прав на доступ или удаление в течение обязательного 30-дневного срока.",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 21, Article 22"
},
{
  "id": 826,
  "code": "ALBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления Комиссара в Албании",
  "description": "Сайт собирает персональные данные резидентов Албании без предварительного направления уведомления об обработке Уполномоченному.",
  "severity": "critical",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 21, Article 39"
},
{
  "id": 827,
  "code": "ALBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несанкционированная трансграничная передача данных из Албании",
  "description": "Сайт экспортирует личные данные албанских пользователей на внешние серверы без подтверждения адекватности или разрешения Уполномоченного.",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 8, Article 9"
},
{
  "id": 828,
  "code": "ALBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Албании",
  "description": "Сайт использует личные данные албанских субъектов для прямого маркетинга без предоставления бесплатных способов отказа.",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 16"
},
{
  "id": 829,
  "code": "ALBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры защиты баз данных по закону Албании",
  "description": "База данных сайта не имеет шифрования и контроля доступа, обязательных для защиты личных записей пользователей из Албании.",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 18"
},
{
  "id": 830,
  "code": "ALBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные методы ответа на права субъектов в Албании",
  "description": "Политика конфиденциальности сайта не указывает четкие контакты или процедуры для проверки, исправления или удаления записей в Албании.",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 12, Article 15"
},
{
  "id": 831,
  "code": "TUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без декларации INPDP в Тунисе",
  "description": "Сайт собирает персональные данные резидентов Туниса без предварительной подачи декларации или получения одобрения INPDP.",
  "severity": "critical",
  "reference": "Tunisia Organic Law No. 2004-63, Article 7, Article 76"
},
{
  "id": 832,
  "code": "TUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие письменного согласия на чувствительные данные в Тунисе",
  "description": "Сайт обрабатывает конфиденциальные категории личных данных (здоровье) резидентов Туниса без предварительного письменного согласия.",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 13, Article 77"
},
{
  "id": 833,
  "code": "TUNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Туниса",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Туниса по удалению данных.",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 27"
},
{
  "id": 834,
  "code": "TUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Тунисе",
  "description": "Сайт использует личные данные субъектов из Туниса для прямого маркетинга без получения предварительного согласия.",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 31, Article 82"
},
{
  "id": 835,
  "code": "TUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Туниса",
  "description": "Контроллер экспортирует личные данные тунисских пользователей на внешние серверы без подтверждения адекватности и разрешений.",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 49, Article 85"
},
{
  "id": 836,
  "code": "SENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления CDP в Сенегале",
  "description": "Сайт собирает персональные данные резидентов Сенегала без предварительного направления уведомления об обработке в регулирующий орган (CDP).",
  "severity": "critical",
  "reference": "Senegal Law No. 2008-12, Article 16, Article 46"
},
{
  "id": 837,
  "code": "SENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности данных в Сенегале",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Сенегала без обязательного шифрования или контроля безопасности.",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 70, Article 71"
},
{
  "id": 838,
  "code": "SENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие сведений о получателях в политике по закону Сенегала",
  "description": "Политика конфиденциальности не указывает сторонних получателей или места облачного хранения данных резидентов Сенегала.",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 58"
},
{
  "id": 839,
  "code": "SENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Сенегале",
  "description": "Сайт отправляет рекламные письма или маркетинговые файлы cookie субъектам из Сенегала без получения предварительного согласия.",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 33"
},
{
  "id": 840,
  "code": "SENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления данных в Сенегале",
  "description": "Политика конфиденциальности сайта не предоставляет резидентам Сенегала четких каналов для запроса удаления или исправления записей.",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 69"
},
{
  "id": 841,
  "code": "CIVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации обработки данных в ARTCI в Кот-д'Ивуаре",
  "description": "Контроллер сайта собирает личные данные резидентов Кот-д'Ивуара без отправки уведомления о регистрации в регулирующий орган (ARTCI).",
  "severity": "critical",
  "reference": "Ivory Coast Law No. 2013-450, Article 6, Article 42"
},
{
  "id": 842,
  "code": "CIVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на чувствительные данные в Кот-д'Ивуаре",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Кот-д'Ивуара без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 9, Article 43"
},
{
  "id": 843,
  "code": "CIVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления в Кот-д'Ивуаре",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Кот-д'Ивуара по удалению данных.",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 28"
},
{
  "id": 844,
  "code": "CIVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Кот-д'Ивуара",
  "description": "Контроллер передает персональные данные субъектов из Кот-д'Ивуара в зарубежные страны без предварительного разрешения ARTCI.",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 35, Article 45"
},
{
  "id": 845,
  "code": "CIVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Кот-д'Ивуаре",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Кот-д'Ивуара без предварительного согласия.",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 25"
},
{
  "id": 846,
  "code": "MNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Обработка личных данных без законных оснований в Монголии",
  "description": "Сайт собирает личные данные резидентов Монголии без установления законных оснований или согласия по закону Монголии.",
  "severity": "critical",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 6, Article 32"
},
{
  "id": 847,
  "code": "MNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие каналов уведомления об инцидентах в Монголии",
  "description": "Контроллер сайта не имеет задокументированных процедур уведомления резидентов Монголии об утечках или инцидентах безопасности.",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 15"
},
{
  "id": 848,
  "code": "MNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие прав на исправление и удаление данных в Монголии",
  "description": "Политика конфиденциальности сайта не указывает контакты или процедуры для резидентов Монголии по исправлению или уничтожению данных.",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 17, Article 18"
},
{
  "id": 849,
  "code": "MNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Обработка биометрических данных без письменного согласия в Монголии",
  "description": "Сайт собирает конфиденциальные биометрические данные субъектов из Монголии без предварительного письменного явного согласия.",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 8, Article 12"
},
{
  "id": 850,
  "code": "MNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Несоответствующий прямой маркетинг в Монголии",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Монголии без предварительного согласия.",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 23"
},
{
  "id": 851,
  "code": "NORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных персональных данных без явного согласия в Норвегии",
  "description": "Сайт обрабатывает конфиденциальные личные данные норвежских пользователей без явного предварительного согласия, требуемого Datatilsynet.",
  "severity": "critical",
  "reference": "Norway Personal Data Act, Sec. 1 (incorporating GDPR Art. 9)"
},
{
  "id": 852,
  "code": "NORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполная проверка возраста для детских сервисов в Норвегии",
  "description": "На сайте отсутствуют надежные механизмы проверки возраста или родительского согласия для норвежских пользователей младше 13 лет.",
  "severity": "serious",
  "reference": "Norway Personal Data Act, Sec. 12"
},
{
  "id": 853,
  "code": "NORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватное раскрытие информации в политике по норвежским правилам",
  "description": "Политика конфиденциальности не указывает норвежские контактные данные или информацию о порядке подачи жалобы в Datatilsynet.",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 13)"
},
{
  "id": 854,
  "code": "NORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках за 72 часа в Норвегии",
  "description": "Контроллер сайта не задокументировал административные процедуры сообщения об утечках данных в Datatilsynet в течение 72 часов.",
  "severity": "serious",
  "reference": "Norway Personal Data Act (GDPR Art. 33)"
},
{
  "id": 855,
  "code": "NORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации доступа и удаления данных в Норвегии",
  "description": "Сайт не предоставляет прозрачных и бесплатных каналов для запросов норвежских резидентов на удаление или получение их личных данных.",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 15, Art. 17)"
},
{
  "id": 856,
  "code": "ISLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Исландии",
  "description": "Сайт собирает конфиденциальные личные данные исландских субъектов без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 9)"
},
{
  "id": 857,
  "code": "ISLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие проверки возраста для детского согласия в Исландии",
  "description": "На сайте отсутствуют механизмы получения родительского согласия для исландских пользователей младше 13 лет.",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018, Sec. 14"
},
{
  "id": 858,
  "code": "ISLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполное раскрытие информации в политике Исландии",
  "description": "Политика конфиденциальности не раскрывает сроки хранения данных или право на подачу жалобы в исландский орган (Persónuvernd).",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 13)"
},
{
  "id": 859,
  "code": "ISLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках в Исландии",
  "description": "Сайт не имеет процессов уведомления Persónuvernd и пострадавших лиц в Исландии об утечках безопасности в течение 72 часов.",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 33)"
},
{
  "id": 860,
  "code": "ISLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Исландии",
  "description": "Сайт не предоставляет прозрачных и бесплатных каналов для израильских и исландских резидентов по исправлению или удалению записей.",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 861,
  "code": "LIEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без явного согласия в Лихтенштейне",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Лихтенштейна без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 4, GDPR Art. 9"
},
{
  "id": 862,
  "code": "LIEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполная проверка возраста для детского согласия в Лихтенштейне",
  "description": "На сайте отсутствуют механизмы проверки возраста или получения родительского согласия для пользователей из Лихтенштейна младше 16 лет.",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 12, GDPR Art. 8"
},
{
  "id": 863,
  "code": "LIEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Лихтенштейна",
  "description": "Политика конфиденциальности сайта не содержит сведения о сроках хранения данных или о праве подачи жалоб в орган по защите данных (DSS).",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 15, GDPR Art. 13"
},
{
  "id": 864,
  "code": "LIEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках за 72 часа в Лихтенштейне",
  "description": "Контроллер сайта не имеет задокументированных процедур уведомления Комиссара Лихтенштейна (DSS) в течение 72 часов об инциденте.",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 33"
},
{
  "id": 865,
  "code": "LIEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Лихтенштейне",
  "description": "Сайт не предоставляет резидентам Лихтенштейна бесплатные и прозрачные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 15, Art. 17"
},
{
  "id": 866,
  "code": "MKDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Северной Македонии",
  "description": "Сайт обрабатывает конфиденциальные категории личных данных резидентов Северной Македонии без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "North Macedonia Law on Personal Data Protection, Article 13, Article 100"
},
{
  "id": 867,
  "code": "MKDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неназначение сотрудника по защите данных (DPO) в Северной Македонии",
  "description": "Контроллер сайта не назначил и не указал контакты назначенного сотрудника по защите данных (DPO), как того требуют местные правила.",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 32"
},
{
  "id": 868,
  "code": "MKDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Северной Македонии",
  "description": "Политика конфиденциальности сайта не раскрывает сроки хранения данных, законные основания или права резидентов на подачу жалоб в Агентство.",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 17, Article 18"
},
{
  "id": 869,
  "code": "MKDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках в Северной Македонии",
  "description": "Контроллер сайта не имеет задокументированных процедур уведомления Агентства по защите персональных данных в течение 72 часов об утечке.",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 37, Article 100"
},
{
  "id": 870,
  "code": "MKDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Северной Македонии",
  "description": "Сайт не предоставляет резидентам Северной Македонии бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 19, Article 21"
},
{
  "id": 871,
  "code": "MNEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Черногории",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Черногории без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Montenegro Law on Personal Data Protection, Article 9, Article 13"
},
{
  "id": 872,
  "code": "MNEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности баз данных по закону Черногории",
  "description": "База данных сайта не имеет шифрования и контроля доступа, обязательных для защиты личных записей пользователей из Черногории.",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 24"
},
{
  "id": 873,
  "code": "MNEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Черногории",
  "description": "Политика конфиденциальности сайта не раскрывает сроки хранения данных, законные основания или права резидентов на подачу жалоб в Агентство (AZLP).",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 21"
},
{
  "id": 874,
  "code": "MNEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несанкционированная трансграничная передача черногорских данных",
  "description": "Сайт экспортирует личные данные резидентов Черногории за рубеж без подтверждения адекватного уровня защиты или одобрения AZLP.",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 28"
},
{
  "id": 875,
  "code": "MNEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Черногории",
  "description": "Сайт не предоставляет резидентам Черногории бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 19, Article 20"
},
{
  "id": 876,
  "code": "BIHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Боснии и Герцеговине",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Боснии и Герцеговины без явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 9, Article 42"
},
{
  "id": 877,
  "code": "BIHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности данных в Боснии и Герцеговине",
  "description": "База данных сайта не имеет мониторинга логов безопасности и ограничений доступа, обязательных для защиты личных записей пользователей Боснии.",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 11"
},
{
  "id": 878,
  "code": "BIHPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Боснии",
  "description": "Политика конфиденциальности сайта не содержит сведения о сроках хранения данных или о праве подачи жалоб в Агентство (AZLP).",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 15"
},
{
  "id": 879,
  "code": "BIHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несанкционированная трансграничная передача боснийских данных",
  "description": "Сайт экспортирует личные данные резидентов Боснии и Герцеговины в страны без адекватной защиты без разрешения Агентства (AZLP).",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 18"
},
{
  "id": 880,
  "code": "BIHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие каналов для исправления и удаления данных в Боснии",
  "description": "Сайт не предоставляет субъектам из Боснии и Герцеговины простые и бесплатные методы для запросов на исправление или удаление файлов.",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 24, Article 25"
},
{
  "id": 881,
  "code": "MDAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации реестра обработки в CNPDCP в Молдове",
  "description": "Сайт собирает личные данные резидентов Молдовы без регистрации реестра обработки или получения разрешения от CNPDCP.",
  "severity": "critical",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 6, Article 32"
},
{
  "id": 882,
  "code": "MDAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на чувствительные данные в Молдове",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Молдовы без предварительного явного согласия.",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 5"
},
{
  "id": 883,
  "code": "MDAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Молдовы",
  "description": "Политика конфиденциальности не раскрывает сроки хранения данных, законные основания или права резидентов Молдовы на жалобу в CNPDCP.",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 12"
},
{
  "id": 884,
  "code": "MDAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Молдовы",
  "description": "Контроллер передает личные данные субъектов из Молдовы в третьи страны без подтверждения адекватности или одобренных CNPDCP условий.",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 32"
},
{
  "id": 885,
  "code": "MDAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Молдове",
  "description": "Сайт не предоставляет резидентам Молдовы бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 15"
},
{
  "id": 886,
  "code": "KGZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Кыргызстане",
  "description": "Сайт собирает личные данные резидентов Кыргызстана без установления законных оснований или согласия по закону Кыргызстана.",
  "severity": "critical",
  "reference": "Kyrgyzstan Law on Personal Information, Article 5, Article 29"
},
{
  "id": 887,
  "code": "KGZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Кыргызстане",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Кыргызстана без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 8"
},
{
  "id": 888,
  "code": "KGZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Кыргызстана",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или контактах Государственного агентства.",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 19"
},
{
  "id": 889,
  "code": "KGZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Кыргызстана",
  "description": "Контроллер передает персональные данные субъектов из Кыргызстана за рубеж без подтверждения адекватности или разрешения Госагентства.",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 25"
},
{
  "id": 890,
  "code": "KGZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Кыргызстане",
  "description": "Сайт не предоставляет каналов для реализации резидентами Кыргызстана прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 17, Article 18"
},
{
  "id": 891,
  "code": "TJKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Таджикистане",
  "description": "Сайт собирает личные данные резидентов Таджикистана без установления законных оснований или согласия по закону Таджикистана.",
  "severity": "critical",
  "reference": "Tajikistan Law on Personal Data, Article 5, Article 21"
},
{
  "id": 892,
  "code": "TJKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Таджикистане",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Таджикистана без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 8"
},
{
  "id": 893,
  "code": "TJKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Таджикистана",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или контактах уполномоченного органа.",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 15"
},
{
  "id": 894,
  "code": "TJKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Таджикистана",
  "description": "Контроллер передает персональные данные субъектов из Таджикистана за рубеж без подтверждения адекватности или разрешения уполномоченного органа.",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 18"
},
{
  "id": 895,
  "code": "TJKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Таджикистане",
  "description": "Сайт не предоставляет каналов для реализации резидентами Таджикистана прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 11, Article 12"
},
{
  "id": 896,
  "code": "TGOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления IPDCP в Того",
  "description": "Сайт собирает персональные данные резидентов Того без предварительного направления уведомления об обработке в регулирующий орган (IPDCP).",
  "severity": "critical",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 16, Article 50"
},
{
  "id": 897,
  "code": "TGOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Того",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Того без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 13"
},
{
  "id": 898,
  "code": "TGOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Того",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Того по удалению данных.",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 28"
},
{
  "id": 899,
  "code": "TGOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Того",
  "description": "Контроллер передает персональные данные субъектов из Того в зарубежные страны без предварительного разрешения IPDCP.",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 35"
},
{
  "id": 900,
  "code": "TGOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Того",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Того без предварительного согласия.",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 25"
},
{
  "id": 901,
  "code": "BENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления APDP в Бенине",
  "description": "Сайт собирает персональные данные резидентов Бенина без предварительного направления уведомления об обработке в регулирующий орган (APDP).",
  "severity": "critical",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 390, Article 420"
},
{
  "id": 902,
  "code": "BENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на чувствительные данные в Бенине",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Бенина без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 395"
},
{
  "id": 903,
  "code": "BENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления в Бенине",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Бенина по удалению данных.",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 410"
},
{
  "id": 904,
  "code": "BENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Бенина",
  "description": "Контроллер передает персональные данные субъектов из Бенина в зарубежные страны без предварительного разрешения APDP.",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 415"
},
{
  "id": 905,
  "code": "BENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Бенине",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Бенина без предварительного согласия.",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 400"
},
{
  "id": 906,
  "code": "MLIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления APDP в Мали",
  "description": "Сайт собирает персональные данные резидентов Мали без предварительного направления уведомления об обработке в регулирующий орган (APDP).",
  "severity": "critical",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 15, Article 40"
},
{
  "id": 907,
  "code": "MLIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Мали",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Мали без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 12"
},
{
  "id": 908,
  "code": "MLIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Мали",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Мали по удалению данных.",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 27"
},
{
  "id": 909,
  "code": "MLIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Мали",
  "description": "Контроллер передает персональные данные субъектов из Мали в зарубежные страны без предварительного разрешения APDP.",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 32"
},
{
  "id": 910,
  "code": "MLIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Мали",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Мали без предварительного согласия.",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 23"
},
{
  "id": 911,
  "code": "NERPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления HAPDP в Нигере",
  "description": "Сайт собирает персональные данные резидентов Нигера без предварительного направления уведомления об обработке в регулирующий орган (HAPDP).",
  "severity": "critical",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 912,
  "code": "NERPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Нигере",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Нигера без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 12"
},
{
  "id": 913,
  "code": "NERPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Нигера",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Нигера по удалению данных.",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 28"
},
{
  "id": 914,
  "code": "NERPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Нигера",
  "description": "Контроллер передает персональные данные субъектов из Нигера в зарубежные страны без предварительного разрешения HAPDP.",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 35"
},
{
  "id": 915,
  "code": "NERPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Нигере",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Нигера без предварительного согласия.",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 24"
},
{
  "id": 916,
  "code": "GABPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления CNPDCP в Габоне",
  "description": "Сайт собирает персональные данные резидентов Габона без предварительного направления уведомления об обработке в регулирующий орган (CNPDCP).",
  "severity": "critical",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 917,
  "code": "GABPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Габоне",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Габона без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 12"
},
{
  "id": 918,
  "code": "GABPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Габона",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Габона по удалению данных.",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 28"
},
{
  "id": 919,
  "code": "GABPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Габона",
  "description": "Контроллер передает персональные данные субъектов из Габона в зарубежные страны без предварительного разрешения CNPDCP.",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 35"
},
{
  "id": 920,
  "code": "GABPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Габоне",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Габона без предварительного согласия.",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 24"
},
{
  "id": 921,
  "code": "MDGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления CMIL в Мадагаскаре",
  "description": "Сайт собирает персональные данные резидентов Мадагаскара без предварительного направления уведомления об обработке в регулирующий орган (CMIL).",
  "severity": "critical",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 922,
  "code": "MDGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Мадагаскаре",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Мадагаскара без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 12"
},
{
  "id": 923,
  "code": "MDGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Мадагаскара",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Мадагаскара по удалению данных.",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 28"
},
{
  "id": 924,
  "code": "MDGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Мадагаскара",
  "description": "Контроллер передает персональные данные субъектов из Мадагаскара в зарубежные страны без предварительного разрешения CMIL.",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 35"
},
{
  "id": 925,
  "code": "MDGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Мадагаскаре",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Мадагаскара без предварительного согласия.",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 24"
},
{
  "id": 926,
  "code": "CPVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления CNPD в Кабо-Верде",
  "description": "Сайт собирает персональные данные резидентов Кабо-Верде без предварительного направления уведомления об обработке в регулирующий орган (CNPD).",
  "severity": "critical",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 927,
  "code": "CPVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Кабо-Верде",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Кабо-Верде без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 12"
},
{
  "id": 928,
  "code": "CPVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Кабо-Верде",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Кабо-Верде по удалению данных.",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 28"
},
{
  "id": 929,
  "code": "CPVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Кабо-Верде",
  "description": "Контроллер передает персональные данные субъектов из Кабо-Верде в зарубежные страны без предварительного разрешения CNPD.",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 35"
},
{
  "id": 930,
  "code": "CPVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Кабо-Верде",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Кабо-Верде без предварительного согласия.",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 24"
},
{
  "id": 931,
  "code": "LSTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Лесото",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Лесото без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15, Sec. 25"
},
{
  "id": 932,
  "code": "LSTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности данных в Лесото",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Лесото без обязательного шифрования или контроля безопасности.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 32"
},
{
  "id": 933,
  "code": "LSTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие сведений о получателях в политике по закону Лесото",
  "description": "Политика конфиденциальности не указывает сторонних получателей или места облачного хранения данных резидентов Лесото.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 38"
},
{
  "id": 934,
  "code": "LSTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Лесото",
  "description": "Сайт отправляет рекламные письма или маркетинговые файлы cookie субъектам из Лесото без получения предварительного согласия.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 33"
},
{
  "id": 935,
  "code": "LSTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления данных в Лесото",
  "description": "Политика конфиденциальности сайта не предоставляет резидентам Лесото четких каналов для запроса удаления или исправления записей.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 29"
},
{
  "id": 936,
  "code": "COGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления CNIL в Конго",
  "description": "Сайт собирает персональные данные резидентов Конго без предварительного направления уведомления об обработке в регулирующий орган (CNIL).",
  "severity": "critical",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 937,
  "code": "COGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Конго",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Конго без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 12"
},
{
  "id": 938,
  "code": "COGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Конго",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Конго по удалению данных.",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 28"
},
{
  "id": 939,
  "code": "COGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Конго",
  "description": "Контроллер передает персональные данные субъектов из Конго в зарубежные страны без предварительного разрешения CNIL.",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 35"
},
{
  "id": 940,
  "code": "COGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Конго",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Конго без предварительного согласия.",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 24"
},
{
  "id": 941,
  "code": "FIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Фиджи",
  "description": "Сайт собирает личные данные резидентов Фиджи без установления законных оснований или согласия по законодательству Фиджи.",
  "severity": "critical",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 942,
  "code": "FIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Фиджи",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Фиджи без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 943,
  "code": "FIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Фиджи",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Фиджи.",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 944,
  "code": "FIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Фиджи",
  "description": "Контроллер передает персональные данные субъектов из Фиджи за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 945,
  "code": "FIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Фиджи",
  "description": "Сайт не предоставляет каналов для реализации резидентами Фиджи прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 946,
  "code": "PNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Обработка личных данных без законных оснований в Папуа-Новой Гвинее",
  "description": "Сайт собирает личные данные резидентов ПНГ без установления законных оснований или согласия по законодательству ПНГ.",
  "severity": "critical",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 947,
  "code": "PNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Отсутствие согласия на чувствительные данные в Папуа-Новой Гвинее",
  "description": "Сайт собирает конфиденциальные личные данные резидентов ПНГ без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 948,
  "code": "PNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные раскрытия в политике по закону Папуа-Новой Гвинеи",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в ПНГ.",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 949,
  "code": "PNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Несоответствующая трансграничная передача из Папуа-Новой Гвинеи",
  "description": "Контроллер передает персональные данные субъектов из ПНГ за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 950,
  "code": "PNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные каналы реализации прав субъектов в Папуа-Новой Гвинее",
  "description": "Сайт не предоставляет каналов для реализации резидентами ПНГ прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 951,
  "code": "SMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на чувствительные данные в Сан-Марино",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Сан-Марино без предварительного явного согласия.",
  "severity": "critical",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 6, Art. 83"
},
{
  "id": 952,
  "code": "SMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неназначение сотрудника по защите данных (DPO) в Сан-Марино",
  "description": "Контроллер сайта не назначил и не указал контакты назначенного сотрудника по защите данных (DPO) по закону Сан-Марино.",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 37"
},
{
  "id": 953,
  "code": "SMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Сан-Марино",
  "description": "Политика конфиденциальности сайта не раскрывает сроки хранения данных, законные основания или права резидентов на подачу жалоб в APD.",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 13"
},
{
  "id": 954,
  "code": "SMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Сан-Марино",
  "description": "Контроллер передает личные данные субъектов из Сан-Марино в третьи страны без подтверждения адекватности или одобренных APD условий.",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 45"
},
{
  "id": 955,
  "code": "SMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Сан-Марино",
  "description": "Сайт не предоставляет резидентам Сан-Марино бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 15, Art. 17"
},
{
  "id": 956,
  "code": "GIBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка конфиденциальных данных без согласия в Гибралтаре",
  "description": "Сайт обрабатывает конфиденциальные личные данные пользователей Гибралтара без явного согласия, требуемого GRA.",
  "severity": "critical",
  "reference": "Gibraltar Data Protection Act 2004, Sec. 2 (GDPR Art. 9)"
},
{
  "id": 957,
  "code": "GIBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие проверки возраста для согласия детей в Гибралтаре",
  "description": "На сайте отсутствуют механизмы проверки возраста или получения родительского согласия для пользователей из Гибралтара младше 13 лет.",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 8)"
},
{
  "id": 958,
  "code": "GIBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполная политика конфиденциальности по закону Гибралтара",
  "description": "Политика конфиденциальности не раскрывает сроки хранения данных или право на подачу жалоб в регулирующий орган (GRA).",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 13)"
},
{
  "id": 959,
  "code": "GIBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках за 72 часа в Гибралтаре",
  "description": "Контроллер сайта не задокументировал административные процедуры сообщения об утечках данных в GRA в течение 72 часов.",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 33)"
},
{
  "id": 960,
  "code": "GIBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Гибралтаре",
  "description": "Сайт не предоставляет резидентам Гибралтара бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 15, Art. 17)"
},
{
  "id": 961,
  "code": "JSYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без явного согласия в Джерси",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Джерси без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Data Protection (Jersey) Law 2018, Schedule 2, Sec. 9"
},
{
  "id": 962,
  "code": "JSYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполная проверка возраста для детского согласия в Джерси",
  "description": "На сайте отсутствуют механизмы проверки возраста или получения родительского согласия для пользователей из Джерси младше 13 лет.",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 10"
},
{
  "id": 963,
  "code": "JSYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Джерси",
  "description": "Политика конфиденциальности сайта не содержит сведения о сроках хранения данных или о праве подачи жалоб в офис комиссара (JOIC).",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 12"
},
{
  "id": 964,
  "code": "JSYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках за 72 часа в Джерси",
  "description": "Контроллер сайта не имеет задокументированных процедур уведомления Комиссара Джерси (JOIC) в течение 72 часов об инциденте.",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 21"
},
{
  "id": 965,
  "code": "JSYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Джерси",
  "description": "Сайт не предоставляет резидентам Джерси бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 28, Sec. 30"
},
{
  "id": 966,
  "code": "GGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без явного согласия в Гернси",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Гернси без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 9, Sec. 80"
},
{
  "id": 967,
  "code": "GGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполная проверка возраста для детского согласия в Гернси",
  "description": "На сайте отсутствуют механизмы проверки возраста или получения родительского согласия для пользователей из Гернси младше 13 лет.",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 10"
},
{
  "id": 968,
  "code": "GGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Гернси",
  "description": "Политика конфиденциальности сайта не содержит сведения о сроках хранения данных или о праве подачи жалоб в офис уполномоченного (ODPA).",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 12"
},
{
  "id": 969,
  "code": "GGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках за 72 часа в Гернси",
  "description": "Контроллер сайта не имеет задокументированных процедур уведомления Уполномоченного Гернси (ODPA) в течение 72 часов об инциденте.",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 21"
},
{
  "id": 970,
  "code": "GGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Гернси",
  "description": "Сайт не предоставляет резидентам Гернси бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 28, Sec. 30"
},
{
  "id": 971,
  "code": "IOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные на острове Мэн",
  "description": "Сайт собирает конфиденциальные личные данные резидентов острова Мэн без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 9)"
},
{
  "id": 972,
  "code": "IOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неполная проверка возраста для детского согласия на острове Мэн",
  "description": "На сайте отсутствуют механизмы проверки возраста или получения родительского согласия для пользователей с острова Мэн младше 13 лет.",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 8)"
},
{
  "id": 973,
  "code": "IOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону острова Мэн",
  "description": "Политика конфиденциальности сайта не содержит сведения о сроках хранения данных или о праве подачи жалоб Комиссару (IMIO).",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 13)"
},
{
  "id": 974,
  "code": "IOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие протоколов сообщения об утечках за 72 часа на острове Мэн",
  "description": "Контроллер сайта не имеет задокументированных процедур уведомления Уполномоченного острова Мэн (IMIO) в течение 72 часов об инциденте.",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 33)"
},
{
  "id": 975,
  "code": "IOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов на острове Мэн",
  "description": "Сайт не предоставляет резидентам острова Мэн бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 976,
  "code": "FROPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные на Фарерских островах",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Фарерских островов без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 9"
},
{
  "id": 977,
  "code": "FROPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности баз данных на Фарерских островах",
  "description": "База данных сайта не имеет шифрования и контроля доступа, обязательных для защиты личных записей пользователей Фарерских островов.",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 11"
},
{
  "id": 978,
  "code": "FROPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Фарерских островов",
  "description": "Политика конфиденциальности сайта не раскрывает сроки хранения данных, законные основания или права резидентов на подачу жалоб в Datatilsynet.",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 21"
},
{
  "id": 979,
  "code": "FROPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несанкционированная трансграничная передача фарерских данных",
  "description": "Сайт экспортирует личные данные резидентов Фарерских островов за рубеж без подтверждения адекватного уровня защиты или одобрения Datatilsynet.",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 28"
},
{
  "id": 980,
  "code": "FROPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов на Фарерских островах",
  "description": "Сайт не предоставляет резидентам Фарерских островов бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 19"
},
{
  "id": 981,
  "code": "BMUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие согласия на чувствительные данные по PIPA Бермудских островов",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Бермудских островов без предварительного явного согласия.",
  "severity": "critical",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 6, Section 47"
},
{
  "id": 982,
  "code": "BMUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие контактов сотрудника по конфиденциальности в Бермудах",
  "description": "Политика конфиденциальности сайта не указывает контакты назначенного сотрудника по конфиденциальности в Бермудских островах.",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 9"
},
{
  "id": 983,
  "code": "BMUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие возможности отказа от профилирования в Бермудах",
  "description": "Сайт не предоставляет резидентам Бермудских островов четких опций для отказа или возражения против обработки данных в целях профилирования.",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 984,
  "code": "BMUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие формальных соглашений с обработчиками в Бермудах",
  "description": "Контроллер передает персональные данные резидентов Бермудских островов сторонним обработчикам без обязательного письменного контракта.",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 12"
},
{
  "id": 985,
  "code": "BMUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Бермуд",
  "description": "Контроллер экспортирует личные данные пользователей из Бермудских островов в страны без адекватной защиты без подтверждения эквивалентных мер.",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 986,
  "code": "CYMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Отсутствие явного согласия на чувствительные данные по DPA Каймановых островов",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Каймановых островов без предварительного явного согласия.",
  "severity": "critical",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 1)"
},
{
  "id": 987,
  "code": "CYMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Каймановых островах",
  "description": "База данных собирает и обрабатывает личные файлы пользователей из Каймановых островов без обязательного шифрования или контроля.",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 11"
},
{
  "id": 988,
  "code": "CYMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие 30-дневные сроки запросов в Каймановых островах",
  "description": "Политика конфиденциальности сайта не описывает контакты или процедуры для ответа на запросы доступа к данным в течение 30 дней.",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 15"
},
{
  "id": 989,
  "code": "CYMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача из Каймановых островов",
  "description": "Сайт передает персональные данные пользователей из Каймановых островов в страны без сопоставимой правовой защиты без согласия.",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 8)"
},
{
  "id": 990,
  "code": "CYMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Избыточные сроки хранения данных по закону Каймановых островов",
  "description": "Сайт хранит личные записи пользователей Каймановых островов бессрочно без установления конкретных ограничений или циклов очистки.",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 5)"
},
{
  "id": 991,
  "code": "LCAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без письменного согласия в Сент-Люсии",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Сент-Люсии без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 15, Sec. 50"
},
{
  "id": 992,
  "code": "LCAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Сент-Люсии",
  "description": "Контроллер сайта собирает личные данные резидентов Сент-Люсии без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 10"
},
{
  "id": 993,
  "code": "LCAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Сент-Люсии",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Сент-Люсии без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 32"
},
{
  "id": 994,
  "code": "LCAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Сент-Люсии",
  "description": "Сайт хранит личные записи пользователей из Сент-Люсии дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 14"
},
{
  "id": 995,
  "code": "LCAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Сент-Люсии",
  "description": "Контроллер передает данные резидентов Сент-Люсии за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 47"
},
{
  "id": 996,
  "code": "KNAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без письменного согласия в Сент-Китс и Невис",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Сент-Китс и Невис без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 15, Sec. 50"
},
{
  "id": 997,
  "code": "KNAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Сент-Китс и Невис",
  "description": "Контроллер сайта собирает личные данные резидентов Сент-Китс и Невис без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 10"
},
{
  "id": 998,
  "code": "KNAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Сент-Китс и Невис",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Сент-Китс и Невис без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 32"
},
{
  "id": 999,
  "code": "KNAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Сент-Китс и Невис",
  "description": "Сайт хранит личные записи пользователей из Сент-Китс и Невис дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 14"
},
{
  "id": 1000,
  "code": "KNAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Сент-Китс и Невис",
  "description": "Контроллер передает данные резидентов Сент-Китс и Невис за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 47"
},
{
  "id": 1001,
  "code": "ATGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без согласия в Антигуа и Барбуда",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Антигуа и Барбуда без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 15, Sec. 50"
},
{
  "id": 1002,
  "code": "ATGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Антигуа и Барбуда",
  "description": "Контроллер сайта собирает личные данные резидентов Антигуа и Барбуда без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 10"
},
{
  "id": 1003,
  "code": "ATGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Антигуа и Барбуда",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Антигуа и Барбуда без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 32"
},
{
  "id": 1004,
  "code": "ATGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Антигуа и Барбуда",
  "description": "Сайт хранит личные записи пользователей из Антигуа и Барбуда дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 14"
},
{
  "id": 1005,
  "code": "ATGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Антигуа и Барбуда",
  "description": "Контроллер передает данные резидентов Антигуа и Барбуда за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 47"
},
{
  "id": 1006,
  "code": "SYCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия на Сейшелах",
  "description": "Сайт обрабатывает конфиденциальные категории личных данных резидентов Сейшельских островов без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Seychelles Data Protection Act 2003, Sec. 10, Sec. 28"
},
{
  "id": 1007,
  "code": "SYCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности баз данных на Сейшелах",
  "description": "База данных сайта не имеет шифрования и контроля доступа, обязательных для защиты личных записей пользователей Сейшельских островов.",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 11"
},
{
  "id": 1008,
  "code": "SYCPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватная политика конфиденциальности по закону Сейшел",
  "description": "Политика конфиденциальности сайта не раскрывает сроки хранения данных, законные основания или права резидентов на подачу жалоб регулятору.",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 21"
},
{
  "id": 1009,
  "code": "SYCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несанкционированная трансграничная передача сейшельских данных",
  "description": "Сайт экспортирует личные данные резидентов Сейшельских островов за рубеж без подтверждения адекватного уровня защиты или одобрения регулятора.",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 28"
},
{
  "id": 1010,
  "code": "SYCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов на Сейшелах",
  "description": "Сайт не предоставляет резидентам Сейшельских островов бесплатные и доступные методы для реализации их прав на доступ, исправление или удаление.",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 19"
},
{
  "id": 1011,
  "code": "SWZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Эсватини",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Эсватини без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Eswatini Data Protection Act 2018, Sec. 15, Sec. 25"
},
{
  "id": 1012,
  "code": "SWZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные меры безопасности данных в Эсватини",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Эсватини без обязательного шифрования или контроля безопасности.",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 32"
},
{
  "id": 1013,
  "code": "SWZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие сведений о получателях в политике по закону Эсватини",
  "description": "Политика конфиденциальности не указывает сторонних получателей или места облачного хранения данных резидентов Эсватини.",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 38"
},
{
  "id": 1014,
  "code": "SWZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Эсватини",
  "description": "Сайт отправляет рекламные письма или маркетинговые файлы cookie субъектам из Эсватини без получения предварительного согласия.",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 33"
},
{
  "id": 1015,
  "code": "SWZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления данных в Эсватини",
  "description": "Политика конфиденциальности сайта не предоставляет резидентам Эсватини четких каналов для запроса удаления или исправления записей.",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 29"
},
{
  "id": 1016,
  "code": "GINPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления APDP в Гвинее",
  "description": "Сайт собирает персональные данные резидентов Гвинеи без предварительного направления уведомления об обработке в регулирующий орган (APDP).",
  "severity": "critical",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1017,
  "code": "GINPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Гвинее",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Гвинеи без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 12"
},
{
  "id": 1018,
  "code": "GINPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Гвинеи",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Гвинеи по удалению данных.",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 28"
},
{
  "id": 1019,
  "code": "GINPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Гвинеи",
  "description": "Контроллер передает персональные данные субъектов из Гвинеи в зарубежные страны без предварительного разрешения APDP.",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 35"
},
{
  "id": 1020,
  "code": "GINPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Гвинее",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Гвинеи без предварительного согласия.",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 24"
},
{
  "id": 1021,
  "code": "BFAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления CIL в Буркина-Фасо",
  "description": "Сайт собирает персональные данные резидентов Буркина-Фасо без предварительного направления уведомления об обработке в регулирующий орган (CIL).",
  "severity": "critical",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1022,
  "code": "BFAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Буркина-Фасо",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Буркина-Фасо без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 12"
},
{
  "id": 1023,
  "code": "BFAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Буркина-Фасо",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Буркина-Фасо по удалению данных.",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 28"
},
{
  "id": 1024,
  "code": "BFAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Буркина-Фасо",
  "description": "Контроллер передает персональные данные субъектов из Буркина-Фасо в зарубежные страны без предварительного разрешения CIL.",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 35"
},
{
  "id": 1025,
  "code": "BFAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Буркина-Фасо",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Буркина-Фасо без предварительного согласия.",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 24"
},
{
  "id": 1026,
  "code": "MRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления APDP в Мавритании",
  "description": "Сайт собирает персональные данные резидентов Мавритании без предварительного направления уведомления об обработке в регулирующий орган (APDP).",
  "severity": "critical",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1027,
  "code": "MRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Мавритании",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Мавритании без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 12"
},
{
  "id": 1028,
  "code": "MRTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Мавритании",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Мавритании по удалению данных.",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 28"
},
{
  "id": 1029,
  "code": "MRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Мавритании",
  "description": "Контроллер передает персональные данные субъектов из Мавритании в зарубежные страны без предварительного разрешения APDP.",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 35"
},
{
  "id": 1030,
  "code": "MRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Мавритании",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Мавритании без предварительного согласия.",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 24"
},
{
  "id": 1031,
  "code": "TCDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления ANAD в Чаде",
  "description": "Сайт собирает персональные данные резидентов Чада без предварительного направления уведомления об обработке в регулирующий орган (ANAD).",
  "severity": "critical",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1032,
  "code": "TCDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Чаде",
  "description": "Сайт обрабатывает конфиденциальные личные данные (биометрия, здоровье) субъектов из Чада без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 12"
},
{
  "id": 1033,
  "code": "TCDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Чада",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Чада по удалению данных.",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 28"
},
{
  "id": 1034,
  "code": "TCDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Чада",
  "description": "Контроллер передает персональные данные субъектов из Чада в зарубежные страны без предварительного разрешения ANAD.",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 35"
},
{
  "id": 1035,
  "code": "TCDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Чаде",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Чада без предварительного согласия.",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 24"
},
{
  "id": 1036,
  "code": "MACPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие явного согласия на чувствительные данные по закону Макао",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Макао без предварительного явного письменного или цифрового согласия.",
  "severity": "critical",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 7, Article 24"
},
{
  "id": 1037,
  "code": "MACPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие регистрации обработки данных в GPDP в Макао",
  "description": "Контроллер сайта собирает личные данные резидентов Макао без отправки уведомления о регистрации в GPDP.",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19"
},
{
  "id": 1038,
  "code": "MACPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления в Макао",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Макао по удалению данных.",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1039,
  "code": "MACPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Макао",
  "description": "Контроллер передает персональные данные субъектов из Макао в зарубежные страны без предварительного разрешения GPDP.",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19, Article 20"
},
{
  "id": 1040,
  "code": "MACPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Макао",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Макао без предварительного согласия.",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1041,
  "code": "NPLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Непале",
  "description": "Сайт собирает личные данные резидентов Непала без установления законных оснований или согласия по законодательству Непала.",
  "severity": "critical",
  "reference": "Nepal Individual Privacy Act 2018, Section 4, Section 30"
},
{
  "id": 1042,
  "code": "NPLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Непале",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Непала без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 10"
},
{
  "id": 1043,
  "code": "NPLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Непала",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Непале.",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 12"
},
{
  "id": 1044,
  "code": "NPLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Непала",
  "description": "Контроллер передает персональные данные субъектов из Непала за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 14"
},
{
  "id": 1045,
  "code": "NPLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Непале",
  "description": "Сайт не предоставляет каналов для реализации резидентами Непала прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 15"
},
{
  "id": 1046,
  "code": "PAKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Пакистане",
  "description": "Сайт собирает личные данные резидентов Пакистана без установления законных оснований или согласия по законодательству Пакистана.",
  "severity": "critical",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1047,
  "code": "PAKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Пакистане",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Пакистана без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1048,
  "code": "PAKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Пакистана",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Пакистане.",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1049,
  "code": "PAKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Пакистана",
  "description": "Контроллер передает персональные данные субъектов из Пакистана за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1050,
  "code": "PAKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Пакистане",
  "description": "Сайт не предоставляет каналов для реализации резидентами Пакистана прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1051,
  "code": "DJIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления CNDP в Джибути",
  "description": "Сайт собирает персональные данные резидентов Джибути без предварительного направления уведомления об обработке в CNDP.",
  "severity": "critical",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1052,
  "code": "DJIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Джибути",
  "description": "Сайт обрабатывает конфиденциальные личные данные резидентов Джибути без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 12"
},
{
  "id": 1053,
  "code": "DJIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Джибути",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Джибути по удалению данных.",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 28"
},
{
  "id": 1054,
  "code": "DJIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Джибути",
  "description": "Контроллер передает персональные данные субъектов из Джибути в зарубежные страны без предварительного разрешения CNDP.",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 35"
},
{
  "id": 1055,
  "code": "DJIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Джибути",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Джибути без предварительного согласия.",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 24"
},
{
  "id": 1056,
  "code": "LAOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Лаосе",
  "description": "Сайт собирает личные данные резидентов Лаоса без установления законных оснований или согласия по законодательству Лаоса.",
  "severity": "critical",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 5, Sec. 21"
},
{
  "id": 1057,
  "code": "LAOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Лаосе",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Лаоса без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 10"
},
{
  "id": 1058,
  "code": "LAOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Лаоса",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Лаосе.",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 12"
},
{
  "id": 1059,
  "code": "LAOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Лаоса",
  "description": "Контроллер передает персональные данные субъектов из Лаоса за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 14"
},
{
  "id": 1060,
  "code": "LAOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Лаосе",
  "description": "Сайт не предоставляет каналов для реализации резидентами Лаоса прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 15"
},
{
  "id": 1061,
  "code": "BTNDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Бутане",
  "description": "Сайт собирает личные данные резидентов Бутана без установления законных оснований или согласия по законодательству Бутана.",
  "severity": "critical",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 320"
},
{
  "id": 1062,
  "code": "BTNDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Бутане",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Бутана без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 321"
},
{
  "id": 1063,
  "code": "BTNDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Бутана",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Бутане.",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 322"
},
{
  "id": 1064,
  "code": "BTNDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Бутана",
  "description": "Контроллер передает персональные данные субъектов из Бутана за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 325"
},
{
  "id": 1065,
  "code": "BTNDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Бутане",
  "description": "Сайт не предоставляет каналов для реализации резидентами Бутана прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 327"
},
{
  "id": 1066,
  "code": "MMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Мьянме",
  "description": "Сайт собирает личные данные резидентов Мьянмы без установления законных оснований или согласия по законодательству Мьянмы.",
  "severity": "critical",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 5"
},
{
  "id": 1067,
  "code": "MMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Мьянме",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Мьянмы без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 6"
},
{
  "id": 1068,
  "code": "MMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Мьянмы",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Мьянме.",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 7"
},
{
  "id": 1069,
  "code": "MMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Мьянмы",
  "description": "Контроллер передает персональные данные субъектов из Мьянмы за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 8"
},
{
  "id": 1070,
  "code": "MMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Мьянме",
  "description": "Сайт не предоставляет каналов для реализации резидентами Мьянмы прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 9"
},
{
  "id": 1071,
  "code": "KHMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Камбодже",
  "description": "Сайт собирает личные данные резидентов Камбоджи без установления законных оснований или согласия по законодательству Камбоджи.",
  "severity": "critical",
  "reference": "Cambodia Civil Code, Article 7, Article 11"
},
{
  "id": 1072,
  "code": "KHMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Камбодже",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Камбоджи без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 8"
},
{
  "id": 1073,
  "code": "KHMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Камбоджи",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Камбодже.",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 9"
},
{
  "id": 1074,
  "code": "KHMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Камбоджи",
  "description": "Контроллер передает персональные данные субъектов из Камбоджи за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 10"
},
{
  "id": 1075,
  "code": "KHMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Камбодже",
  "description": "Сайт не предоставляет каналов для реализации резидентами Камбоджи прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 12"
},
{
  "id": 1076,
  "code": "LBNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления Министерства в Ливане",
  "description": "Сайт собирает персональные данные резидентов Ливана без предварительного направления уведомления об обработке в Министерство.",
  "severity": "critical",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 85, Article 95"
},
{
  "id": 1077,
  "code": "LBNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Ливане",
  "description": "Сайт обрабатывает конфиденциальные личные данные резидентов Ливана без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 88"
},
{
  "id": 1078,
  "code": "LBNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Ливана",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Ливана по удалению данных.",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 92"
},
{
  "id": 1079,
  "code": "LBNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Ливана",
  "description": "Контроллер передает персональные данные субъектов из Ливана в зарубежные страны без предварительного разрешения Министерства.",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 94"
},
{
  "id": 1080,
  "code": "LBNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Ливане",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Ливана без предварительного согласия.",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 90"
},
{
  "id": 1081,
  "code": "YEMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Йемене",
  "description": "Сайт собирает личные данные резидентов Йемена без установления законных оснований или согласия по законодательству Йемена.",
  "severity": "critical",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 5"
},
{
  "id": 1082,
  "code": "YEMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Йемене",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Йемена без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 8"
},
{
  "id": 1083,
  "code": "YEMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Йемена",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Йемене.",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 12"
},
{
  "id": 1084,
  "code": "YEMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Йемена",
  "description": "Контроллер передает персональные данные субъектов из Йемена за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 14"
},
{
  "id": 1085,
  "code": "YEMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Йемене",
  "description": "Сайт не предоставляет каналов для реализации резидентами Йемена прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 15"
},
{
  "id": 1086,
  "code": "SYRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Сирии",
  "description": "Сайт собирает личные данные резидентов Сирии без установления законных оснований или согласия по законодательству Сирии.",
  "severity": "critical",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 5"
},
{
  "id": 1087,
  "code": "SYRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Сирии",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Сирии без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 8"
},
{
  "id": 1088,
  "code": "SYRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Сирии",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Сирии.",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 12"
},
{
  "id": 1089,
  "code": "SYRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Сирии",
  "description": "Контроллер передает персональные данные субъектов из Сирии за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 14"
},
{
  "id": 1090,
  "code": "SYRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Сирии",
  "description": "Сайт не предоставляет каналов для реализации резидентами Сирии прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 15"
},
{
  "id": 1091,
  "code": "IRQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Ираке",
  "description": "Сайт собирает личные данные резидентов Ирака без установления законных оснований или согласия по законодательству Ирака.",
  "severity": "critical",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 5"
},
{
  "id": 1092,
  "code": "IRQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Ираке",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Ирака без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 8"
},
{
  "id": 1093,
  "code": "IRQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Ирака",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Ираке.",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 12"
},
{
  "id": 1094,
  "code": "IRQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Ирака",
  "description": "Контроллер передает персональные данные субъектов из Ирака за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 14"
},
{
  "id": 1095,
  "code": "IRQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Ираке",
  "description": "Сайт не предоставляет каналов для реализации резидентами Ирака прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 15"
},
{
  "id": 1096,
  "code": "MWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Малави",
  "description": "Сайт собирает личные данные резидентов Малави без установления законных оснований или согласия по законодательству Малави.",
  "severity": "critical",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 72, Sec. 80"
},
{
  "id": 1097,
  "code": "MWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Малави",
  "description": "Сайт обрабатывает конфиденциальные личные данные резидентов Малави без получения предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 73"
},
{
  "id": 1098,
  "code": "MWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Малави",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Малави.",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 74"
},
{
  "id": 1099,
  "code": "MWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Малави",
  "description": "Контроллер передает персональные данные субъектов из Малави за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 78"
},
{
  "id": 1100,
  "code": "MWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Малави",
  "description": "Сайт не предоставляет каналов для реализации резидентами Малави прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 79"
},
{
  "id": 1101,
  "code": "MOZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Мозамбике",
  "description": "Сайт собирает личные данные резидентов Мозамбика без установления законных оснований или согласия по законодательству Мозамбика.",
  "severity": "critical",
  "reference": "Mozambique Electronic Transactions Law, Sec. 15, Sec. 25"
},
{
  "id": 1102,
  "code": "MOZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Мозамбике",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Мозамбика без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 16"
},
{
  "id": 1103,
  "code": "MOZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Мозамбика",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Мозамбике.",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 18"
},
{
  "id": 1104,
  "code": "MOZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Мозамбика",
  "description": "Контроллер передает персональные данные субъектов из Мозамбика за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 20"
},
{
  "id": 1105,
  "code": "MOZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Мозамбике",
  "description": "Сайт не предоставляет каналов для реализации резидентами Мозамбика прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 22"
},
{
  "id": 1106,
  "code": "NAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Намибии",
  "description": "Сайт собирает личные данные резидентов Намибии без установления законных оснований или согласия по законодательству Намибии.",
  "severity": "critical",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 15"
},
{
  "id": 1107,
  "code": "NAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Намибии",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Намибии без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 18"
},
{
  "id": 1108,
  "code": "NAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Намибии",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Намибии.",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 21"
},
{
  "id": 1109,
  "code": "NAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Намибии",
  "description": "Контроллер передает персональные данные субъектов из Намибии за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 25"
},
{
  "id": 1110,
  "code": "NAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Намибии",
  "description": "Сайт не предоставляет каналов для реализации резидентами Намибии прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 28"
},
{
  "id": 1111,
  "code": "GRNPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без письменного согласия в Гренаде",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Гренады без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Grenada Data Protection Act 2014, Sec. 15, Sec. 50"
},
{
  "id": 1112,
  "code": "GRNPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Гренаде",
  "description": "Контроллер сайта собирает личные данные резидентов Гренады без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 10"
},
{
  "id": 1113,
  "code": "GRNPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Гренаде",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Гренады без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 32"
},
{
  "id": 1114,
  "code": "GRNPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Гренаде",
  "description": "Сайт хранит личные записи пользователей из Гренады дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 14"
},
{
  "id": 1115,
  "code": "GRNPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Гренады",
  "description": "Контроллер передает данные резидентов Гренады за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 47"
},
{
  "id": 1116,
  "code": "VCTPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без согласия в Сент-Винсент и Гренадины",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Сент-Винсент и Гренадины без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 15, Sec. 50"
},
{
  "id": 1117,
  "code": "VCTPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Сент-Винсент и Гренадины",
  "description": "Контроллер сайта собирает личные данные резидентов Сент-Винсент и Гренадины без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 10"
},
{
  "id": 1118,
  "code": "VCTPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Сент-Винсент и Гренадины",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Сент-Винсент и Гренадины без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 32"
},
{
  "id": 1119,
  "code": "VCTPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Сент-Винсент и Гренадины",
  "description": "Сайт хранит личные записи пользователей из Сент-Винсент и Гренадины дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 14"
},
{
  "id": 1120,
  "code": "VCTPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Сент-Винсент и Гренадины",
  "description": "Контроллер передает данные резидентов Сент-Винсент и Гренадины за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 47"
},
{
  "id": 1121,
  "code": "SAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Самоа",
  "description": "Сайт собирает личные данные резидентов Самоа без установления законных оснований или согласия по законодательству Самоа.",
  "severity": "critical",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 5"
},
{
  "id": 1122,
  "code": "SAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Самоа",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Самоа без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 8"
},
{
  "id": 1123,
  "code": "SAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Самоа",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Самоа.",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 12"
},
{
  "id": 1124,
  "code": "SAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Самоа",
  "description": "Контроллер передает персональные данные субъектов из Самоа за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 14"
},
{
  "id": 1125,
  "code": "SAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Самоа",
  "description": "Сайт не предоставляет каналов для реализации резидентами Самоа прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 15"
},
{
  "id": 1126,
  "code": "TONPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Тонга",
  "description": "Сайт собирает личные данные резидентов Тонга без установления законных оснований или согласия по законодательству Тонга.",
  "severity": "critical",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 5"
},
{
  "id": 1127,
  "code": "TONPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Тонга",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Тонга без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 8"
},
{
  "id": 1128,
  "code": "TONPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Тонга",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Тонга.",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 12"
},
{
  "id": 1129,
  "code": "TONPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Тонга",
  "description": "Контроллер передает персональные данные субъектов из Тонга за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 14"
},
{
  "id": 1130,
  "code": "TONPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Тонга",
  "description": "Сайт не предоставляет каналов для реализации резидентами Тонга прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 15"
},
{
  "id": 1131,
  "code": "VUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Вануату",
  "description": "Сайт собирает личные данные резидентов Вануату без установления законных оснований или согласия по законодательству Вануату.",
  "severity": "critical",
  "reference": "Vanuatu local electronic transactions laws, Sec. 5"
},
{
  "id": 1132,
  "code": "VUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Вануату",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Вануату без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 8"
},
{
  "id": 1133,
  "code": "VUTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Вануату",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Вануату.",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 12"
},
{
  "id": 1134,
  "code": "VUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Вануату",
  "description": "Контроллер передает персональные данные субъектов из Вануату за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 14"
},
{
  "id": 1135,
  "code": "VUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Вануату",
  "description": "Сайт не предоставляет каналов для реализации резидентами Вануату прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 15"
},
{
  "id": 1136,
  "code": "GUYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без согласия в Гайане",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Гайаны без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Guyana Data Protection Act 2024, Sec. 15, Sec. 50"
},
{
  "id": 1137,
  "code": "GUYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Гайане",
  "description": "Контроллер сайта собирает личные данные резидентов Гайаны без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 10"
},
{
  "id": 1138,
  "code": "GUYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Гайане",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Гайаны без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 32"
},
{
  "id": 1139,
  "code": "GUYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Гайане",
  "description": "Сайт хранит личные записи пользователей из Гайаны дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 14"
},
{
  "id": 1140,
  "code": "GUYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Гайаны",
  "description": "Контроллер передает данные резидентов Гайаны за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 47"
},
{
  "id": 1141,
  "code": "BLZPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без письменного согласия в Белизе",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Белиза без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1142,
  "code": "BLZPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Белизе",
  "description": "Контроллер сайта собирает личные данные резидентов Белиза без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1143,
  "code": "BLZPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Белизе",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Белиза без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1144,
  "code": "BLZPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Белизе",
  "description": "Сайт хранит личные записи пользователей из Белиза дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1145,
  "code": "BLZPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Белиза",
  "description": "Контроллер передает данные резидентов Белиза за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1146,
  "code": "SURPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка чувствительных данных без письменного согласия в Суринаме",
  "description": "Сайт собирает конфиденциальные личные данные субъектов из Суринама без предварительного явного письменного согласия.",
  "severity": "critical",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1147,
  "code": "SURPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Обработка личных данных без регистрации контроллера в Суринаме",
  "description": "Контроллер сайта собирает личные данные резидентов Суринама без регистрации в Офисе комиссара.",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1148,
  "code": "SURPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Неадекватные меры безопасности данных в Суринаме",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Суринама без обязательного шифрования или контроля безопасности.",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1149,
  "code": "SURPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующие сроки хранения данных в Суринаме",
  "description": "Сайт хранит личные записи пользователей из Суринама дольше, чем необходимо для заявленных целей, без протоколов удаления.",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1150,
  "code": "SURPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Несоответствующая трансграничная передача данных из Суринама",
  "description": "Контроллер передает данные резидентов Суринама за пределы страны без подтверждения адекватного уровня защиты или разрешений.",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1151,
  "code": "BDIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления регулятора в Бурунди",
  "description": "Сайт собирает персональные данные резидентов Бурунди без направления уведомления об обработке в регулирующий орган.",
  "severity": "critical",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 15, Article 42"
},
{
  "id": 1152,
  "code": "BDIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Бурунди",
  "description": "Сайт обрабатывает конфиденциальные личные данные резидентов Бурунди без получения предварительного явного согласия.",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 12"
},
{
  "id": 1153,
  "code": "BDIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы удаления и исправления по закону Бурунди",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Бурунди по удалению данных.",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 28"
},
{
  "id": 1154,
  "code": "BDIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Бурунди",
  "description": "Контроллер передает персональные данные субъектов из Бурунди в зарубежные страны без предварительного разрешения регулятора.",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 35"
},
{
  "id": 1155,
  "code": "BDIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующий прямой маркетинг в Бурунди",
  "description": "Сайт отправляет материалы прямого маркетинга или файлы cookie субъектам из Бурунди без предварительного согласия.",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 24"
},
{
  "id": 1156,
  "code": "ERIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Эритрее",
  "description": "Сайт собирает личные данные резидентов Эритреи без установления законных оснований или согласия по законодательству Эритреи.",
  "severity": "critical",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 5, Sec. 21"
},
{
  "id": 1157,
  "code": "ERIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Эритрее",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Эритреи без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 10"
},
{
  "id": 1158,
  "code": "ERIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Эритреи",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Эритрее.",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 12"
},
{
  "id": 1159,
  "code": "ERIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Эритреи",
  "description": "Контроллер передает персональные данные субъектов из Эритреи за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 14"
},
{
  "id": 1160,
  "code": "ERIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Эритрее",
  "description": "Сайт не предоставляет каналов для реализации резидентами Эритреи прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 15"
},
{
  "id": 1161,
  "code": "SOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Сомали",
  "description": "Сайт собирает личные данные резидентов Сомали без установления законных оснований или согласия по законодательству Сомали.",
  "severity": "critical",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 5"
},
{
  "id": 1162,
  "code": "SOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Сомали",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Сомали без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 8"
},
{
  "id": 1163,
  "code": "SOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Сомали",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Сомали.",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 12"
},
{
  "id": 1164,
  "code": "SOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Сомали",
  "description": "Контроллер передает персональные данные субъектов из Сомали за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 14"
},
{
  "id": 1165,
  "code": "SOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Сомали",
  "description": "Сайт не предоставляет каналов для реализации резидентами Сомали прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 15"
},
{
  "id": 1166,
  "code": "SDNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Судане",
  "description": "Сайт собирает личные данные резидентов Судана без установления законных оснований или согласия по законодательству Судана.",
  "severity": "critical",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 5"
},
{
  "id": 1167,
  "code": "SDNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Судане",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Судана без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 8"
},
{
  "id": 1168,
  "code": "SDNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Судана",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Судане.",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 12"
},
{
  "id": 1169,
  "code": "SDNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Судана",
  "description": "Контроллер передает персональные данные субъектов из Судана за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 14"
},
{
  "id": 1170,
  "code": "SDNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Судане",
  "description": "Сайт не предоставляет каналов для реализации резидентами Судана прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 15"
},
{
  "id": 1171,
  "code": "SSDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Южном Судане",
  "description": "Сайт собирает личные данные резидентов Южного Судана без установления законных оснований или согласия по законодательству Южного Судана.",
  "severity": "critical",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 5"
},
{
  "id": 1172,
  "code": "SSDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Южном Судане",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Южного Судана без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 8"
},
{
  "id": 1173,
  "code": "SSDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Южного Судана",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Южном Судане.",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 12"
},
{
  "id": 1174,
  "code": "SSDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Южного Судана",
  "description": "Контроллер передает персональные данные субъектов из Южного Судана за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 14"
},
{
  "id": 1175,
  "code": "SSDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Южном Судане",
  "description": "Сайт не предоставляет каналов для реализации резидентами Южного Судана прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 15"
},
{
  "id": 1176,
  "code": "GNQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка данных без уведомления регулятора в Экваториальной Гвинее",
  "description": "Сайт собирает персональные данные резидентов Экваториальной Гвинеи без направления уведомления об обработке в регулирующий орган.",
  "severity": "critical",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 15"
},
{
  "id": 1177,
  "code": "GNQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Экваториальной Гвинее",
  "description": "Сайт обрабатывает конфиденциальные личные данные резидентов Экваториальной Гвинеи без получения предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 12"
},
{
  "id": 1178,
  "code": "GNQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Экваториальной Гвинеи",
  "description": "Политика конфиденциальности сайта не указывает доступные контакты или процедуры для резидентов Экваториальной Гвинеи по удалению данных.",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 28"
},
{
  "id": 1179,
  "code": "GNQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Экваториальной Гвинеи",
  "description": "Контроллер передает персональные данные субъектов из Экваториальной Гвинеи за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 35"
},
{
  "id": 1180,
  "code": "GNQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Экваториальной Гвинее",
  "description": "Сайт не предоставляет каналов для реализации резидентами Экваториальной Гвинеи прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 24"
},
{
  "id": 1181,
  "code": "CAFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в ЦАР",
  "description": "Сайт собирает личные данные резидентов Центральноафриканской Республики без установления законных оснований или согласия по законодательству ЦАР.",
  "severity": "critical",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 5"
},
{
  "id": 1182,
  "code": "CAFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в ЦАР",
  "description": "Сайт собирает конфиденциальные личные данные резидентов ЦАР без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 8"
},
{
  "id": 1183,
  "code": "CAFPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону ЦАР",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в ЦАР.",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 12"
},
{
  "id": 1184,
  "code": "CAFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из ЦАР",
  "description": "Контроллер передает персональные данные субъектов из ЦАР за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 14"
},
{
  "id": 1185,
  "code": "CAFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в ЦАР",
  "description": "Сайт не предоставляет каналов для реализации резидентами ЦАР прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 15"
},
{
  "id": 1186,
  "code": "SLEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Сьерра-Леоне",
  "description": "Сайт собирает личные данные резидентов Сьерра-Леоне без установления законных оснований или согласия по законодательству Сьерра-Леоне.",
  "severity": "critical",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 5"
},
{
  "id": 1187,
  "code": "SLEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Сьерра-Леоне",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Сьерра-Леоне без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 8"
},
{
  "id": 1188,
  "code": "SLEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Сьерра-Леоне",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Сьерра-Леоне.",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 12"
},
{
  "id": 1189,
  "code": "SLEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Сьерра-Леоне",
  "description": "Контроллер передает персональные данные субъектов из Сьерра-Леоне за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 14"
},
{
  "id": 1190,
  "code": "SLEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Сьерра-Леоне",
  "description": "Сайт не предоставляет каналов для реализации резидентами Сьерра-Леоне прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 15"
},
{
  "id": 1191,
  "code": "LBRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Либерии",
  "description": "Сайт собирает личные данные резидентов Либерии без установления законных оснований или согласия по законодательству Либерии.",
  "severity": "critical",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 5"
},
{
  "id": 1192,
  "code": "LBRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Либерии",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Либерии без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 8"
},
{
  "id": 1193,
  "code": "LBRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Либерии",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Либерии.",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 12"
},
{
  "id": 1194,
  "code": "LBRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Либерии",
  "description": "Контроллер передает персональные данные субъектов из Либерии за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 14"
},
{
  "id": 1195,
  "code": "LBRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Либерии",
  "description": "Сайт не предоставляет каналов для реализации резидентами Либерии прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 15"
},
{
  "id": 1196,
  "code": "GMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Гамбии",
  "description": "Сайт собирает личные данные резидентов Гамбии без установления законных оснований или согласия по законодательству Гамбии.",
  "severity": "critical",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1197,
  "code": "GMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Гамбии",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Гамбии без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1198,
  "code": "GMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Гамбии",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Гамбии.",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1199,
  "code": "GMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Гамбии",
  "description": "Контроллер передает персональные данные субъектов из Гамбии за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1200,
  "code": "GMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Гамбии",
  "description": "Сайт не предоставляет каналов для реализации резидентами Гамбии прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1201,
  "code": "GWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Гвинее-Бисау",
  "description": "Сайт собирает личные данные резидентов Гвинеи-Бисау без установления законных оснований или согласия по законодательству Гвинеи-Бисау.",
  "severity": "critical",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 5"
},
{
  "id": 1202,
  "code": "GWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Гвинее-Бисау",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Гвинеи-Бисау без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 8"
},
{
  "id": 1203,
  "code": "GWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Гвинеи-Бисау",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Гвинее-Бисау.",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 12"
},
{
  "id": 1204,
  "code": "GWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Гвинеи-Бисау",
  "description": "Контроллер передает персональные данные субъектов из Гвинеи-Бисау за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 14"
},
{
  "id": 1205,
  "code": "GWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Гвинее-Бисау",
  "description": "Сайт не предоставляет каналов для реализации резидентами Гвинеи-Бисау прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 15"
},
{
  "id": 1206,
  "code": "LSOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Лесото",
  "description": "Сайт собирает личные данные резидентов Лесото без установления законных оснований или согласия по законодательству Лесото.",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 5, Sec. 21"
},
{
  "id": 1207,
  "code": "LSOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Лесото",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Лесото без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 10"
},
{
  "id": 1208,
  "code": "LSOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Лесото",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Лесото.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 12"
},
{
  "id": 1209,
  "code": "LSOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Лесото",
  "description": "Контроллер передает персональные данные субъектов из Лесото за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 14"
},
{
  "id": 1210,
  "code": "LSOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Лесото",
  "description": "Сайт не предоставляет каналов для реализации резидентами Лесото прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15"
},
{
  "id": 1211,
  "code": "TLSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Восточном Тиморе",
  "description": "Сайт собирает личные данные резидентов Восточного Тимора без установления законных оснований или согласия по законодательству Восточного Тимора.",
  "severity": "critical",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1212,
  "code": "TLSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Восточном Тиморе",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Восточного Тимора без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1213,
  "code": "TLSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Восточного Тимора",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Восточном Тиморе.",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1214,
  "code": "TLSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Восточного Тимора",
  "description": "Контроллер передает персональные данные субъектов из Восточного Тимора за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1215,
  "code": "TLSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Восточном Тиморе",
  "description": "Сайт не предоставляет каналов для реализации резидентами Восточного Тимора прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1216,
  "code": "MDVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований на Мальдивах",
  "description": "Сайт собирает личные данные резидентов Мальдив без установления законных оснований или согласия по законодательству Мальдив.",
  "severity": "critical",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1217,
  "code": "MDVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные на Мальдивах",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Мальдив без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1218,
  "code": "MDVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Мальдив",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных на Мальдивах.",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1219,
  "code": "MDVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача с Мальдив",
  "description": "Контроллер передает персональные данные субъектов с Мальдив за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1220,
  "code": "MDVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов на Мальдивах",
  "description": "Сайт не предоставляет каналов для реализации резидентами Мальдив прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1221,
  "code": "BRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Брунее",
  "description": "Сайт собирает личные данные резидентов Брунея без установления законных оснований или согласия по законодательству Брунея.",
  "severity": "critical",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 5"
},
{
  "id": 1222,
  "code": "BRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Брунее",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Брунея без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 8"
},
{
  "id": 1223,
  "code": "BRNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Брунея",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Брунее.",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 12"
},
{
  "id": 1224,
  "code": "BRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Брунея",
  "description": "Контроллер передает персональные данные субъектов из Брунея за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 14"
},
{
  "id": 1225,
  "code": "BRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Брунее",
  "description": "Сайт не предоставляет каналов для реализации резидентами Брунея прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 15"
},
{
  "id": 1226,
  "code": "SLBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований на Соломоновых Островах",
  "description": "Сайт собирает личные данные резидентов Соломоновых Островов без установления законных оснований или согласия по законодательству Соломоновых Островов.",
  "severity": "critical",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1227,
  "code": "SLBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные на Соломоновых Островах",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Соломоновых Островов без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1228,
  "code": "SLBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Соломоновых Островов",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных на Соломоновых Островах.",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1229,
  "code": "SLBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача с Соломоновых Островов",
  "description": "Контроллер передает персональные данные субъектов с Соломоновых Островов за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1230,
  "code": "SLBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов на Соломоновых Островах",
  "description": "Сайт не предоставляет каналов для реализации резидентами Соломоновых Островов прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1231,
  "code": "FSMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Микронезии",
  "description": "Сайт собирает личные данные резидентов Микронезии без установления законных оснований или согласия по законодательству Микронезии.",
  "severity": "critical",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1232,
  "code": "FSMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Микронезии",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Микронезии без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1233,
  "code": "FSMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Микронезии",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Микронезии.",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1234,
  "code": "FSMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Микронезии",
  "description": "Контроллер передает персональные данные субъектов из Микронезии за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1235,
  "code": "FSMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Микронезии",
  "description": "Сайт не предоставляет каналов для реализации резидентами Микронезии прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1236,
  "code": "MHLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований на Маршалловых Островах",
  "description": "Сайт собирает личные данные резидентов Маршалловых Островов без установления законных оснований или согласия по законодательству Маршалловых Островов.",
  "severity": "critical",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1237,
  "code": "MHLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные на Маршалловых Островах",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Маршалловых Островов без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1238,
  "code": "MHLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Маршалловых Островов",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных на Маршалловых Островах.",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1239,
  "code": "MHLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача с Маршалловых Островов",
  "description": "Контроллер передает персональные данные субъектов с Маршалловых Островов за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1240,
  "code": "MHLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов на Маршалловых Островах",
  "description": "Сайт не предоставляет каналов для реализации резидентами Маршалловых Островов прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1241,
  "code": "PLWPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Палау",
  "description": "Сайт собирает личные данные резидентов Палау без установления законных оснований или согласия по законодательству Палау.",
  "severity": "critical",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1242,
  "code": "PLWPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Палау",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Палау без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1243,
  "code": "PLWPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Палау",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Палау.",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1244,
  "code": "PLWPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Палау",
  "description": "Контроллер передает персональные данные субъектов из Палау за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1245,
  "code": "PLWPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Палау",
  "description": "Сайт не предоставляет каналов для реализации резидентами Палау прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1246,
  "code": "KIRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без законных оснований в Кирибати",
  "description": "Сайт собирает личные данные резидентов Кирибати без установления законных оснований или согласия по законодательству Кирибати.",
  "severity": "critical",
  "reference": "Kiribati draft Data Protection Act, Sec. 5"
},
{
  "id": 1247,
  "code": "KIRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Отсутствие согласия на чувствительные данные в Кирибати",
  "description": "Сайт собирает конфиденциальные личные данные резидентов Кирибати без предварительного явного письменного или цифрового согласия.",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 8"
},
{
  "id": 1248,
  "code": "KIRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные раскрытия в политике по закону Кирибати",
  "description": "Политика конфиденциальности не содержит сведения о целях обработки, сроках хранения или правах субъектов данных в Кирибати.",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 12"
},
{
  "id": 1249,
  "code": "KIRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача из Кирибати",
  "description": "Контроллер передает персональные данные субъектов из Кирибати за рубеж без подтверждения адекватности или сопоставимой защиты.",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 14"
},
{
  "id": 1250,
  "code": "KIRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Неадекватные каналы реализации прав субъектов в Кирибати",
  "description": "Сайт не предоставляет каналов для реализации резидентами Кирибати прав на доступ, исправление или удаление записей.",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 15"
},
{
  "id": 1251,
  "code": "CHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Китай",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Китай без предварительного явного согласия по Закону КНР «О защите персональной информации».",
  "severity": "critical",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1252,
  "code": "CHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления ГКРК (Государственная канцелярия интернет-информации КНР) в Китай",
  "description": "Контроллер сайта собирает личные данные резидентов Китай без направления уведомления об обработке в ГКРК (Государственная канцелярия интернет-информации КНР) по Закону КНР «О защите персональной информации».",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1253,
  "code": "CHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Китай",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Китай без обязательного технического шифрования или средств контроля согласно Закону КНР «О защите персональной информации».",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1254,
  "code": "CHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Китай",
  "description": "Сайт хранит личные записи пользователей из Китай дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону КНР «О защите персональной информации».",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1255,
  "code": "CHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Китай",
  "description": "Контроллер передает данные резидентов Китай за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону КНР «О защите персональной информации».",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1256,
  "code": "RUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Россия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Россия без предварительного явного согласия по Федеральному закону № 152-ФЗ «О персональных данных».",
  "severity": "critical",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1257,
  "code": "RUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Роскомнадзору в Россия",
  "description": "Контроллер сайта собирает личные данные резидентов Россия без направления уведомления об обработке в Роскомнадзору по Федеральному закону № 152-ФЗ «О персональных данных».",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1258,
  "code": "RUSPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Россия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Россия без обязательного технического шифрования или средств контроля согласно Федеральному закону № 152-ФЗ «О персональных данных».",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1259,
  "code": "RUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Россия",
  "description": "Сайт хранит личные записи пользователей из Россия дольше, чем необходимо для заявленных целей, без протоколов удаления по Федеральному закону № 152-ФЗ «О персональных данных».",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1260,
  "code": "RUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Россия",
  "description": "Контроллер передает данные резидентов Россия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Федеральному закону № 152-ФЗ «О персональных данных».",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1261,
  "code": "TURPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Турция",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Турция без предварительного явного согласия по Закону о защите персональных данных № 6698 (KVKK).",
  "severity": "critical",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1262,
  "code": "TURPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Совету по защите персональных данных (KVKK) в Турция",
  "description": "Контроллер сайта собирает личные данные резидентов Турция без направления уведомления об обработке в Совету по защите персональных данных (KVKK) по Закону о защите персональных данных № 6698 (KVKK).",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1263,
  "code": "TURPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Турция",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Турция без обязательного технического шифрования или средств контроля согласно Закону о защите персональных данных № 6698 (KVKK).",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1264,
  "code": "TURPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Турция",
  "description": "Сайт хранит личные записи пользователей из Турция дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону о защите персональных данных № 6698 (KVKK).",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1265,
  "code": "TURPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Турция",
  "description": "Контроллер передает данные резидентов Турция за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону о защите персональных данных № 6698 (KVKK).",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1266,
  "code": "NGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Нигерия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Нигерия без предварительного явного согласия по Закону Нигерии о защите данных 2023 года (NDPA).",
  "severity": "critical",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1267,
  "code": "NGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Комиссии по защите данных Нигерии (NDPC) в Нигерия",
  "description": "Контроллер сайта собирает личные данные резидентов Нигерия без направления уведомления об обработке в Комиссии по защите данных Нигерии (NDPC) по Закону Нигерии о защите данных 2023 года (NDPA).",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1268,
  "code": "NGAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Нигерия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Нигерия без обязательного технического шифрования или средств контроля согласно Закону Нигерии о защите данных 2023 года (NDPA).",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1269,
  "code": "NGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Нигерия",
  "description": "Сайт хранит личные записи пользователей из Нигерия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Нигерии о защите данных 2023 года (NDPA).",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1270,
  "code": "NGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Нигерия",
  "description": "Контроллер передает данные резидентов Нигерия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Нигерии о защите данных 2023 года (NDPA).",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1271,
  "code": "AFGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Афганистан",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Афганистан без предварительного явного согласия по Афганским указам в сфере связи и информации.",
  "severity": "critical",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1272,
  "code": "AFGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству связи в Афганистан",
  "description": "Контроллер сайта собирает личные данные резидентов Афганистан без направления уведомления об обработке в Министерству связи по Афганским указам в сфере связи и информации.",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1273,
  "code": "AFGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Афганистан",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Афганистан без обязательного технического шифрования или средств контроля согласно Афганским указам в сфере связи и информации.",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1274,
  "code": "AFGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Афганистан",
  "description": "Сайт хранит личные записи пользователей из Афганистан дольше, чем необходимо для заявленных целей, без протоколов удаления по Афганским указам в сфере связи и информации.",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1275,
  "code": "AFGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Афганистан",
  "description": "Контроллер передает данные резидентов Афганистан за пределы страны без подтверждения адекватного уровня защиты или разрешений по Афганским указам в сфере связи и информации.",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1276,
  "code": "AZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Азербайджан",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Азербайджан без предварительного явного согласия по Закону Азербайджана «О персональных данных» № 998-IIIQ.",
  "severity": "critical",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1277,
  "code": "AZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству цифрового развития в Азербайджан",
  "description": "Контроллер сайта собирает личные данные резидентов Азербайджан без направления уведомления об обработке в Министерству цифрового развития по Закону Азербайджана «О персональных данных» № 998-IIIQ.",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1278,
  "code": "AZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Азербайджан",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Азербайджан без обязательного технического шифрования или средств контроля согласно Закону Азербайджана «О персональных данных» № 998-IIIQ.",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1279,
  "code": "AZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Азербайджан",
  "description": "Сайт хранит личные записи пользователей из Азербайджан дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Азербайджана «О персональных данных» № 998-IIIQ.",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1280,
  "code": "AZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Азербайджан",
  "description": "Контроллер передает данные резидентов Азербайджан за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Азербайджана «О персональных данных» № 998-IIIQ.",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1281,
  "code": "BGDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Бангладеш",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Бангладеш без предварительного явного согласия по Закону об ИКТ / проекту закона о защите данных Бангладеш.",
  "severity": "critical",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1282,
  "code": "BGDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Комитету связи BTRC / Регулятору данных в Бангладеш",
  "description": "Контроллер сайта собирает личные данные резидентов Бангладеш без направления уведомления об обработке в Комитету связи BTRC / Регулятору данных по Закону об ИКТ / проекту закона о защите данных Бангладеш.",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1283,
  "code": "BGDPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Бангладеш",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Бангладеш без обязательного технического шифрования или средств контроля согласно Закону об ИКТ / проекту закона о защите данных Бангладеш.",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1284,
  "code": "BGDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Бангладеш",
  "description": "Сайт хранит личные записи пользователей из Бангладеш дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону об ИКТ / проекту закона о защите данных Бангладеш.",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1285,
  "code": "BGDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Бангладеш",
  "description": "Контроллер передает данные резидентов Бангладеш за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону об ИКТ / проекту закона о защите данных Бангладеш.",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1286,
  "code": "BLRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Беларусь",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Беларусь без предварительного явного согласия по Закону Республики Беларусь № 99-З «О защите персональных данных».",
  "severity": "critical",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1287,
  "code": "BLRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальному центру защиты персональных данных в Беларусь",
  "description": "Контроллер сайта собирает личные данные резидентов Беларусь без направления уведомления об обработке в Национальному центру защиты персональных данных по Закону Республики Беларусь № 99-З «О защите персональных данных».",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1288,
  "code": "BLRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Беларусь",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Беларусь без обязательного технического шифрования или средств контроля согласно Закону Республики Беларусь № 99-З «О защите персональных данных».",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1289,
  "code": "BLRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Беларусь",
  "description": "Сайт хранит личные записи пользователей из Беларусь дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Республики Беларусь № 99-З «О защите персональных данных».",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1290,
  "code": "BLRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Беларусь",
  "description": "Контроллер передает данные резидентов Беларусь за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Республики Беларусь № 99-З «О защите персональных данных».",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1291,
  "code": "CMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Камерун",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Камерун без предварительного явного согласия по Закону Камеруна № 2010/012 о кибербезопасности и киберпреступности.",
  "severity": "critical",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1292,
  "code": "CMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальному агентству ИКТ (ANTIC) в Камерун",
  "description": "Контроллер сайта собирает личные данные резидентов Камерун без направления уведомления об обработке в Национальному агентству ИКТ (ANTIC) по Закону Камеруна № 2010/012 о кибербезопасности и киберпреступности.",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1293,
  "code": "CMRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Камерун",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Камерун без обязательного технического шифрования или средств контроля согласно Закону Камеруна № 2010/012 о кибербезопасности и киберпреступности.",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1294,
  "code": "CMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Камерун",
  "description": "Сайт хранит личные записи пользователей из Камерун дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Камеруна № 2010/012 о кибербезопасности и киберпреступности.",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1295,
  "code": "CMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Камерун",
  "description": "Контроллер передает данные резидентов Камерун за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Камеруна № 2010/012 о кибербезопасности и киберпреступности.",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1296,
  "code": "COMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Коморские острова",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Коморские острова без предварительного явного согласия по Закону Коморских островов об электронных коммуникациях.",
  "severity": "critical",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1297,
  "code": "COMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальному регулятору ИКТ (ANRTIC) в Коморские острова",
  "description": "Контроллер сайта собирает личные данные резидентов Коморские острова без направления уведомления об обработке в Национальному регулятору ИКТ (ANRTIC) по Закону Коморских островов об электронных коммуникациях.",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1298,
  "code": "COMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Коморские острова",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Коморские острова без обязательного технического шифрования или средств контроля согласно Закону Коморских островов об электронных коммуникациях.",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1299,
  "code": "COMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Коморские острова",
  "description": "Сайт хранит личные записи пользователей из Коморские острова дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Коморских островов об электронных коммуникациях.",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1300,
  "code": "COMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Коморские острова",
  "description": "Контроллер передает данные резидентов Коморские острова за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Коморских островов об электронных коммуникациях.",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1301,
  "code": "CUBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Куба",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Куба без предварительного явного согласия по Декрету-закону Кубы № 370 о цифровизации общества.",
  "severity": "critical",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1302,
  "code": "CUBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству связи (MINCOM) в Куба",
  "description": "Контроллер сайта собирает личные данные резидентов Куба без направления уведомления об обработке в Министерству связи (MINCOM) по Декрету-закону Кубы № 370 о цифровизации общества.",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1303,
  "code": "CUBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Куба",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Куба без обязательного технического шифрования или средств контроля согласно Декрету-закону Кубы № 370 о цифровизации общества.",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1304,
  "code": "CUBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Куба",
  "description": "Сайт хранит личные записи пользователей из Куба дольше, чем необходимо для заявленных целей, без протоколов удаления по Декрету-закону Кубы № 370 о цифровизации общества.",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1305,
  "code": "CUBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Куба",
  "description": "Контроллер передает данные резидентов Куба за пределы страны без подтверждения адекватного уровня защиты или разрешений по Декрету-закону Кубы № 370 о цифровизации общества.",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1306,
  "code": "CODPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в ДР Конго",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из ДР Конго без предварительного явного согласия по Закону ДРК о телекоммуникациях № 20/017.",
  "severity": "critical",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1307,
  "code": "CODPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Регулятору связи ARPTC в ДР Конго",
  "description": "Контроллер сайта собирает личные данные резидентов ДР Конго без направления уведомления об обработке в Регулятору связи ARPTC по Закону ДРК о телекоммуникациях № 20/017.",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1308,
  "code": "CODPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в ДР Конго",
  "description": "База данных собирает и обрабатывает личные файлы резидентов ДР Конго без обязательного технического шифрования или средств контроля согласно Закону ДРК о телекоммуникациях № 20/017.",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1309,
  "code": "CODPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в ДР Конго",
  "description": "Сайт хранит личные записи пользователей из ДР Конго дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону ДРК о телекоммуникациях № 20/017.",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1310,
  "code": "CODPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из ДР Конго",
  "description": "Контроллер передает данные резидентов ДР Конго за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону ДРК о телекоммуникациях № 20/017.",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1311,
  "code": "ETHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Эфиопия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Эфиопия без предварительного явного согласия по Проекту Прокламации Эфиопии о защите персональных данных.",
  "severity": "critical",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1312,
  "code": "ETHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству инноваций и технологий (MInT) в Эфиопия",
  "description": "Контроллер сайта собирает личные данные резидентов Эфиопия без направления уведомления об обработке в Министерству инноваций и технологий (MInT) по Проекту Прокламации Эфиопии о защите персональных данных.",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1313,
  "code": "ETHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Эфиопия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Эфиопия без обязательного технического шифрования или средств контроля согласно Проекту Прокламации Эфиопии о защите персональных данных.",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1314,
  "code": "ETHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Эфиопия",
  "description": "Сайт хранит личные записи пользователей из Эфиопия дольше, чем необходимо для заявленных целей, без протоколов удаления по Проекту Прокламации Эфиопии о защите персональных данных.",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1315,
  "code": "ETHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Эфиопия",
  "description": "Контроллер передает данные резидентов Эфиопия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Проекту Прокламации Эфиопии о защите персональных данных.",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1316,
  "code": "HTIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Гаити",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Гаити без предварительного явного согласия по Рекомендациям Гаити по кибербезопасности.",
  "severity": "critical",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1317,
  "code": "HTIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальному совету по телекоммуникациям (CONATEL) в Гаити",
  "description": "Контроллер сайта собирает личные данные резидентов Гаити без направления уведомления об обработке в Национальному совету по телекоммуникациям (CONATEL) по Рекомендациям Гаити по кибербезопасности.",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1318,
  "code": "HTIPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Гаити",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Гаити без обязательного технического шифрования или средств контроля согласно Рекомендациям Гаити по кибербезопасности.",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1319,
  "code": "HTIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Гаити",
  "description": "Сайт хранит личные записи пользователей из Гаити дольше, чем необходимо для заявленных целей, без протоколов удаления по Рекомендациям Гаити по кибербезопасности.",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1320,
  "code": "HTIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Гаити",
  "description": "Контроллер передает данные резидентов Гаити за пределы страны без подтверждения адекватного уровня защиты или разрешений по Рекомендациям Гаити по кибербезопасности.",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1321,
  "code": "IRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Иран",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Иран без предварительного явного согласия по Регламентам Ирана о киберпространстве.",
  "severity": "critical",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1322,
  "code": "IRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Регулятору связи CRA в Иран",
  "description": "Контроллер сайта собирает личные данные резидентов Иран без направления уведомления об обработке в Регулятору связи CRA по Регламентам Ирана о киберпространстве.",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1323,
  "code": "IRNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Иран",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Иран без обязательного технического шифрования или средств контроля согласно Регламентам Ирана о киберпространстве.",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1324,
  "code": "IRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Иран",
  "description": "Сайт хранит личные записи пользователей из Иран дольше, чем необходимо для заявленных целей, без протоколов удаления по Регламентам Ирана о киберпространстве.",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1325,
  "code": "IRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Иран",
  "description": "Контроллер передает данные резидентов Иран за пределы страны без подтверждения адекватного уровня защиты или разрешений по Регламентам Ирана о киберпространстве.",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1326,
  "code": "LBYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Ливия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Ливия без предварительного явного согласия по Резолюциям Ливии в сфере связи и киберпреступности.",
  "severity": "critical",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1327,
  "code": "LBYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Главному управлению почты и связи (GPTC) в Ливия",
  "description": "Контроллер сайта собирает личные данные резидентов Ливия без направления уведомления об обработке в Главному управлению почты и связи (GPTC) по Резолюциям Ливии в сфере связи и киберпреступности.",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1328,
  "code": "LBYPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Ливия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Ливия без обязательного технического шифрования или средств контроля согласно Резолюциям Ливии в сфере связи и киберпреступности.",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1329,
  "code": "LBYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Ливия",
  "description": "Сайт хранит личные записи пользователей из Ливия дольше, чем необходимо для заявленных целей, без протоколов удаления по Резолюциям Ливии в сфере связи и киберпреступности.",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1330,
  "code": "LBYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Ливия",
  "description": "Контроллер передает данные резидентов Ливия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Резолюциям Ливии в сфере связи и киберпреступности.",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1331,
  "code": "NRUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Науру",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Науру без предварительного явного согласия по Акту кибербезопасности Науру.",
  "severity": "critical",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1332,
  "code": "NRUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству связи в Науру",
  "description": "Контроллер сайта собирает личные данные резидентов Науру без направления уведомления об обработке в Министерству связи по Акту кибербезопасности Науру.",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1333,
  "code": "NRUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Науру",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Науру без обязательного технического шифрования или средств контроля согласно Акту кибербезопасности Науру.",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1334,
  "code": "NRUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Науру",
  "description": "Сайт хранит личные записи пользователей из Науру дольше, чем необходимо для заявленных целей, без протоколов удаления по Акту кибербезопасности Науру.",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1335,
  "code": "NRUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Науру",
  "description": "Контроллер передает данные резидентов Науру за пределы страны без подтверждения адекватного уровня защиты или разрешений по Акту кибербезопасности Науру.",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1336,
  "code": "PRKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Северная Корея",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Северная Корея без предварительного явного согласия по Закону КНДР об электронных транзакциях.",
  "severity": "critical",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1337,
  "code": "PRKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству почты и связи в Северная Корея",
  "description": "Контроллер сайта собирает личные данные резидентов Северная Корея без направления уведомления об обработке в Министерству почты и связи по Закону КНДР об электронных транзакциях.",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1338,
  "code": "PRKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Северная Корея",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Северная Корея без обязательного технического шифрования или средств контроля согласно Закону КНДР об электронных транзакциях.",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1339,
  "code": "PRKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Северная Корея",
  "description": "Сайт хранит личные записи пользователей из Северная Корея дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону КНДР об электронных транзакциях.",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1340,
  "code": "PRKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Северная Корея",
  "description": "Контроллер передает данные резидентов Северная Корея за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону КНДР об электронных транзакциях.",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1341,
  "code": "TKMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Туркменистан",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Туркменистан без предварительного явного согласия по Закону Туркменистана № 562-V об информации и её защите.",
  "severity": "critical",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1342,
  "code": "TKMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству связи в Туркменистан",
  "description": "Контроллер сайта собирает личные данные резидентов Туркменистан без направления уведомления об обработке в Министерству связи по Закону Туркменистана № 562-V об информации и её защите.",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1343,
  "code": "TKMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Туркменистан",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Туркменистан без обязательного технического шифрования или средств контроля согласно Закону Туркменистана № 562-V об информации и её защите.",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1344,
  "code": "TKMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Туркменистан",
  "description": "Сайт хранит личные записи пользователей из Туркменистан дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Туркменистана № 562-V об информации и её защите.",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1345,
  "code": "TKMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Туркменистан",
  "description": "Контроллер передает данные резидентов Туркменистан за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Туркменистана № 562-V об информации и её защите.",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1346,
  "code": "TUVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Тувалу",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Тувалу без предварительного явного согласия по Правилам кибербезопасности Тувалу.",
  "severity": "critical",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1347,
  "code": "TUVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Министерству связи в Тувалу",
  "description": "Контроллер сайта собирает личные данные резидентов Тувалу без направления уведомления об обработке в Министерству связи по Правилам кибербезопасности Тувалу.",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1348,
  "code": "TUVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Тувалу",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Тувалу без обязательного технического шифрования или средств контроля согласно Правилам кибербезопасности Тувалу.",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1349,
  "code": "TUVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Тувалу",
  "description": "Сайт хранит личные записи пользователей из Тувалу дольше, чем необходимо для заявленных целей, без протоколов удаления по Правилам кибербезопасности Тувалу.",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1350,
  "code": "TUVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Тувалу",
  "description": "Контроллер передает данные резидентов Тувалу за пределы страны без подтверждения адекватного уровня защиты или разрешений по Правилам кибербезопасности Тувалу.",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1351,
  "code": "VATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Ватикан",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Ватикан без предварительного явного согласия по Административным директивам Ватикана по кибербезопасности.",
  "severity": "critical",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1352,
  "code": "VATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Администрации Ватикана в Ватикан",
  "description": "Контроллер сайта собирает личные данные резидентов Ватикан без направления уведомления об обработке в Администрации Ватикана по Административным директивам Ватикана по кибербезопасности.",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1353,
  "code": "VATPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Ватикан",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Ватикан без обязательного технического шифрования или средств контроля согласно Административным директивам Ватикана по кибербезопасности.",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1354,
  "code": "VATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Ватикан",
  "description": "Сайт хранит личные записи пользователей из Ватикан дольше, чем необходимо для заявленных целей, без протоколов удаления по Административным директивам Ватикана по кибербезопасности.",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1355,
  "code": "VATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Ватикан",
  "description": "Контроллер передает данные резидентов Ватикан за пределы страны без подтверждения адекватного уровня защиты или разрешений по Административным директивам Ватикана по кибербезопасности.",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1356,
  "code": "ESHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Западная Сахара",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Западная Сахара без предварительного явного согласия по Местным правилам Западной Сахары по информации.",
  "severity": "critical",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1357,
  "code": "ESHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Органу регулирования связи в Западная Сахара",
  "description": "Контроллер сайта собирает личные данные резидентов Западная Сахара без направления уведомления об обработке в Органу регулирования связи по Местным правилам Западной Сахары по информации.",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1358,
  "code": "ESHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Западная Сахара",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Западная Сахара без обязательного технического шифрования или средств контроля согласно Местным правилам Западной Сахары по информации.",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1359,
  "code": "ESHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Западная Сахара",
  "description": "Сайт хранит личные записи пользователей из Западная Сахара дольше, чем необходимо для заявленных целей, без протоколов удаления по Местным правилам Западной Сахары по информации.",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1360,
  "code": "ESHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Западная Сахара",
  "description": "Контроллер передает данные резидентов Западная Сахара за пределы страны без подтверждения адекватного уровня защиты или разрешений по Местным правилам Западной Сахары по информации.",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1361,
  "code": "BGRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Болгария",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Болгария без предварительного явного согласия по Закону Болгарии о защите персональных данных.",
  "severity": "critical",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1362,
  "code": "BGRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Комиссии по защите персональных данных Болгарии (CPDP) в Болгария",
  "description": "Контроллер сайта собирает личные данные резидентов Болгария без направления уведомления об обработке в Комиссии по защите персональных данных Болгарии (CPDP) по Закону Болгарии о защите персональных данных.",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1363,
  "code": "BGRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Болгария",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Болгария без обязательного технического шифрования или средств контроля согласно Закону Болгарии о защите персональных данных.",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1364,
  "code": "BGRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Болгария",
  "description": "Сайт хранит личные записи пользователей из Болгария дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Болгарии о защите персональных данных.",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1365,
  "code": "BGRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Болгария",
  "description": "Контроллер передает данные резидентов Болгария за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Болгарии о защите персональных данных.",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1366,
  "code": "HRVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Хорватия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Хорватия без предварительного явного согласия по Закону Хорватии о реализации GDPR.",
  "severity": "critical",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1367,
  "code": "HRVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Агентству по защите персональных данных Хорватии (AZOP) в Хорватия",
  "description": "Контроллер сайта собирает личные данные резидентов Хорватия без направления уведомления об обработке в Агентству по защите персональных данных Хорватии (AZOP) по Закону Хорватии о реализации GDPR.",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1368,
  "code": "HRVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Хорватия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Хорватия без обязательного технического шифрования или средств контроля согласно Закону Хорватии о реализации GDPR.",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1369,
  "code": "HRVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Хорватия",
  "description": "Сайт хранит личные записи пользователей из Хорватия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Хорватии о реализации GDPR.",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1370,
  "code": "HRVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Хорватия",
  "description": "Контроллер передает данные резидентов Хорватия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Хорватии о реализации GDPR.",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1371,
  "code": "ESTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Эстония",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Эстония без предварительного явного согласия по Закону Эстонии о защите персональных данных (IKS).",
  "severity": "critical",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1372,
  "code": "ESTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Инспекции по защите данных Эстонии (AKI) в Эстония",
  "description": "Контроллер сайта собирает личные данные резидентов Эстония без направления уведомления об обработке в Инспекции по защите данных Эстонии (AKI) по Закону Эстонии о защите персональных данных (IKS).",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1373,
  "code": "ESTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Эстония",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Эстония без обязательного технического шифрования или средств контроля согласно Закону Эстонии о защите персональных данных (IKS).",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1374,
  "code": "ESTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Эстония",
  "description": "Сайт хранит личные записи пользователей из Эстония дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Эстонии о защите персональных данных (IKS).",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1375,
  "code": "ESTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Эстония",
  "description": "Контроллер передает данные резидентов Эстония за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Эстонии о защите персональных данных (IKS).",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1376,
  "code": "LVAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Латвия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Латвия без предварительного явного согласия по Закону Латвии об обработке персональных данных.",
  "severity": "critical",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1377,
  "code": "LVAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Государственной инспекции данных Латвии (DVI) в Латвия",
  "description": "Контроллер сайта собирает личные данные резидентов Латвия без направления уведомления об обработке в Государственной инспекции данных Латвии (DVI) по Закону Латвии об обработке персональных данных.",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1378,
  "code": "LVAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Латвия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Латвия без обязательного технического шифрования или средств контроля согласно Закону Латвии об обработке персональных данных.",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1379,
  "code": "LVAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Латвия",
  "description": "Сайт хранит личные записи пользователей из Латвия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Латвии об обработке персональных данных.",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1380,
  "code": "LVAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Латвия",
  "description": "Контроллер передает данные резидентов Латвия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Латвии об обработке персональных данных.",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1381,
  "code": "LTUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Литва",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Литва без предварительного явного согласия по Закону Литвы о правовой защите персональных данных.",
  "severity": "critical",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1382,
  "code": "LTUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Государственной инспекции по защите данных Литвы (VDAI) в Литва",
  "description": "Контроллер сайта собирает личные данные резидентов Литва без направления уведомления об обработке в Государственной инспекции по защите данных Литвы (VDAI) по Закону Литвы о правовой защите персональных данных.",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1383,
  "code": "LTUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Литва",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Литва без обязательного технического шифрования или средств контроля согласно Закону Литвы о правовой защите персональных данных.",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1384,
  "code": "LTUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Литва",
  "description": "Сайт хранит личные записи пользователей из Литва дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Литвы о правовой защите персональных данных.",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1385,
  "code": "LTUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Литва",
  "description": "Контроллер передает данные резидентов Литва за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Литвы о правовой защите персональных данных.",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1386,
  "code": "CYPPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Кипр",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Кипр без предварительного явного согласия по Закону Кипра об охране физических лиц при обработке данных.",
  "severity": "critical",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1387,
  "code": "CYPPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Уполномоченному по защите персональных данных Кипра в Кипр",
  "description": "Контроллер сайта собирает личные данные резидентов Кипр без направления уведомления об обработке в Уполномоченному по защите персональных данных Кипра по Закону Кипра об охране физических лиц при обработке данных.",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1388,
  "code": "CYPPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Кипр",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Кипр без обязательного технического шифрования или средств контроля согласно Закону Кипра об охране физических лиц при обработке данных.",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1389,
  "code": "CYPPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Кипр",
  "description": "Сайт хранит личные записи пользователей из Кипр дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Кипра об охране физических лиц при обработке данных.",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1390,
  "code": "CYPPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Кипр",
  "description": "Контроллер передает данные резидентов Кипр за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Кипра об охране физических лиц при обработке данных.",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1391,
  "code": "MLTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Мальта",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Мальта без предварительного явного согласия по Закону Мальты о защите данных (Гл. 586).",
  "severity": "critical",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1392,
  "code": "MLTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Комиссару по информации и защите данных Мальты (IDPC) в Мальта",
  "description": "Контроллер сайта собирает личные данные резидентов Мальта без направления уведомления об обработке в Комиссару по информации и защите данных Мальты (IDPC) по Закону Мальты о защите данных (Гл. 586).",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1393,
  "code": "MLTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Мальта",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Мальта без обязательного технического шифрования или средств контроля согласно Закону Мальты о защите данных (Гл. 586).",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1394,
  "code": "MLTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Мальта",
  "description": "Сайт хранит личные записи пользователей из Мальта дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Мальты о защите данных (Гл. 586).",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1395,
  "code": "MLTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Мальта",
  "description": "Контроллер передает данные резидентов Мальта за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Мальты о защите данных (Гл. 586).",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1396,
  "code": "SVKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Словакия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Словакия без предварительного явного согласия по Закону Словакии о защите персональных данных № 18/2018 Coll..",
  "severity": "critical",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1397,
  "code": "SVKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Управлению по защите персональных данных Словацкой Республики в Словакия",
  "description": "Контроллер сайта собирает личные данные резидентов Словакия без направления уведомления об обработке в Управлению по защите персональных данных Словацкой Республики по Закону Словакии о защите персональных данных № 18/2018 Coll..",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1398,
  "code": "SVKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Словакия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Словакия без обязательного технического шифрования или средств контроля согласно Закону Словакии о защите персональных данных № 18/2018 Coll..",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1399,
  "code": "SVKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Словакия",
  "description": "Сайт хранит личные записи пользователей из Словакия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Словакии о защите персональных данных № 18/2018 Coll..",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1400,
  "code": "SVKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Словакия",
  "description": "Контроллер передает данные резидентов Словакия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Словакии о защите персональных данных № 18/2018 Coll..",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1401,
  "code": "SVNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Словения",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Словения без предварительного явного согласия по Закону Словении о защите персональных данных (ZVOP-2).",
  "severity": "critical",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1402,
  "code": "SVNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Информационному уполномоченному Словении в Словения",
  "description": "Контроллер сайта собирает личные данные резидентов Словения без направления уведомления об обработке в Информационному уполномоченному Словении по Закону Словении о защите персональных данных (ZVOP-2).",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1403,
  "code": "SVNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Словения",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Словения без обязательного технического шифрования или средств контроля согласно Закону Словении о защите персональных данных (ZVOP-2).",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1404,
  "code": "SVNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Словения",
  "description": "Сайт хранит личные записи пользователей из Словения дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Словении о защите персональных данных (ZVOP-2).",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1405,
  "code": "SVNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Словения",
  "description": "Контроллер передает данные резидентов Словения за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Словении о защите персональных данных (ZVOP-2).",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1406,
  "code": "LUXPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Люксембург",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Люксембург без предварительного явного согласия по Закону Люксембурга о национальной комиссии по защите данных.",
  "severity": "critical",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1407,
  "code": "LUXPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальной комиссии по защите данных Люксембурга (CNPD) в Люксембург",
  "description": "Контроллер сайта собирает личные данные резидентов Люксембург без направления уведомления об обработке в Национальной комиссии по защите данных Люксембурга (CNPD) по Закону Люксембурга о национальной комиссии по защите данных.",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1408,
  "code": "LUXPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Люксембург",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Люксембург без обязательного технического шифрования или средств контроля согласно Закону Люксембурга о национальной комиссии по защите данных.",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1409,
  "code": "LUXPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Люксембург",
  "description": "Сайт хранит личные записи пользователей из Люксембург дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Люксембурга о национальной комиссии по защите данных.",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1410,
  "code": "LUXPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Люксембург",
  "description": "Контроллер передает данные резидентов Люксембург за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Люксембурга о национальной комиссии по защите данных.",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1411,
  "code": "CZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Чехия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Чехия без предварительного явного согласия по Закону Чехии об обработке персональных данных № 110/2019 Coll..",
  "severity": "critical",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1412,
  "code": "CZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Управлению по защите персональных данных Чехии (UOOU) в Чехия",
  "description": "Контроллер сайта собирает личные данные резидентов Чехия без направления уведомления об обработке в Управлению по защите персональных данных Чехии (UOOU) по Закону Чехии об обработке персональных данных № 110/2019 Coll..",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1413,
  "code": "CZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Чехия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Чехия без обязательного технического шифрования или средств контроля согласно Закону Чехии об обработке персональных данных № 110/2019 Coll..",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1414,
  "code": "CZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Чехия",
  "description": "Сайт хранит личные записи пользователей из Чехия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Чехии об обработке персональных данных № 110/2019 Coll..",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1415,
  "code": "CZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Чехия",
  "description": "Контроллер передает данные резидентов Чехия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Чехии об обработке персональных данных № 110/2019 Coll..",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1416,
  "code": "HUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Венгрия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Венгрия без предварительного явного согласия по Закону Венгрии об информационном самоопределении № CXII 2011 года.",
  "severity": "critical",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1417,
  "code": "HUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальному управлению по защите данных и свободе информации (NAIH) в Венгрия",
  "description": "Контроллер сайта собирает личные данные резидентов Венгрия без направления уведомления об обработке в Национальному управлению по защите данных и свободе информации (NAIH) по Закону Венгрии об информационном самоопределении № CXII 2011 года.",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1418,
  "code": "HUNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Венгрия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Венгрия без обязательного технического шифрования или средств контроля согласно Закону Венгрии об информационном самоопределении № CXII 2011 года.",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1419,
  "code": "HUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Венгрия",
  "description": "Сайт хранит личные записи пользователей из Венгрия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Венгрии об информационном самоопределении № CXII 2011 года.",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1420,
  "code": "HUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Венгрия",
  "description": "Контроллер передает данные резидентов Венгрия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Венгрии об информационном самоопределении № CXII 2011 года.",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1421,
  "code": "ROUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Румыния",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Румыния без предварительного явного согласия по Закону Румынии № 190/2018 о мерах по реализации GDPR.",
  "severity": "critical",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1422,
  "code": "ROUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальному надзорному органу обработки персональных данных (ANSPDCP) в Румыния",
  "description": "Контроллер сайта собирает личные данные резидентов Румыния без направления уведомления об обработке в Национальному надзорному органу обработки персональных данных (ANSPDCP) по Закону Румынии № 190/2018 о мерах по реализации GDPR.",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1423,
  "code": "ROUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Румыния",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Румыния без обязательного технического шифрования или средств контроля согласно Закону Румынии № 190/2018 о мерах по реализации GDPR.",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1424,
  "code": "ROUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Румыния",
  "description": "Сайт хранит личные записи пользователей из Румыния дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Румынии № 190/2018 о мерах по реализации GDPR.",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1425,
  "code": "ROUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Румыния",
  "description": "Контроллер передает данные резидентов Румыния за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Румынии № 190/2018 о мерах по реализации GDPR.",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1426,
  "code": "POLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Польша",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Польша без предварительного явного согласия по Закону Польши о защите персональных данных от 10 мая 2018 года.",
  "severity": "critical",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1427,
  "code": "POLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Управлению по защите персональных данных Польши (UODO) в Польша",
  "description": "Контроллер сайта собирает личные данные резидентов Польша без направления уведомления об обработке в Управлению по защите персональных данных Польши (UODO) по Закону Польши о защите персональных данных от 10 мая 2018 года.",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1428,
  "code": "POLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Польша",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Польша без обязательного технического шифрования или средств контроля согласно Закону Польши о защите персональных данных от 10 мая 2018 года.",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1429,
  "code": "POLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Польша",
  "description": "Сайт хранит личные записи пользователей из Польша дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Польши о защите персональных данных от 10 мая 2018 года.",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1430,
  "code": "POLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Польша",
  "description": "Контроллер передает данные резидентов Польша за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Польши о защите персональных данных от 10 мая 2018 года.",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1431,
  "code": "IRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Ирландия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Ирландия без предварительного явного согласия по Закону Ирландии о защите данных 2018 года.",
  "severity": "critical",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1432,
  "code": "IRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Комиссии по защите данных Ирландии (DPC) в Ирландия",
  "description": "Контроллер сайта собирает личные данные резидентов Ирландия без направления уведомления об обработке в Комиссии по защите данных Ирландии (DPC) по Закону Ирландии о защите данных 2018 года.",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1433,
  "code": "IRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Ирландия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Ирландия без обязательного технического шифрования или средств контроля согласно Закону Ирландии о защите данных 2018 года.",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1434,
  "code": "IRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Ирландия",
  "description": "Сайт хранит личные записи пользователей из Ирландия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Ирландии о защите данных 2018 года.",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1435,
  "code": "IRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Ирландия",
  "description": "Контроллер передает данные резидентов Ирландия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Ирландии о защите данных 2018 года.",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1436,
  "code": "AUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Австрия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Австрия без предварительного явного согласия по Федеральному закону Австрии о защите персональных данных (DSG).",
  "severity": "critical",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1437,
  "code": "AUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Органу по защите данных Австрии (DSB) в Австрия",
  "description": "Контроллер сайта собирает личные данные резидентов Австрия без направления уведомления об обработке в Органу по защите данных Австрии (DSB) по Федеральному закону Австрии о защите персональных данных (DSG).",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1438,
  "code": "AUTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Австрия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Австрия без обязательного технического шифрования или средств контроля согласно Федеральному закону Австрии о защите персональных данных (DSG).",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1439,
  "code": "AUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Австрия",
  "description": "Сайт хранит личные записи пользователей из Австрия дольше, чем необходимо для заявленных целей, без протоколов удаления по Федеральному закону Австрии о защите персональных данных (DSG).",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1440,
  "code": "AUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Австрия",
  "description": "Контроллер передает данные резидентов Австрия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Федеральному закону Австрии о защите персональных данных (DSG).",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1441,
  "code": "SWEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Швеция",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Швеция без предварительного явного согласия по Закону Швеции о дополнительных положениях к GDPR.",
  "severity": "critical",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1442,
  "code": "SWEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Шведскому органу по защите конфиденциальности (IMY) в Швеция",
  "description": "Контроллер сайта собирает личные данные резидентов Швеция без направления уведомления об обработке в Шведскому органу по защите конфиденциальности (IMY) по Закону Швеции о дополнительных положениях к GDPR.",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1443,
  "code": "SWEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Швеция",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Швеция без обязательного технического шифрования или средств контроля согласно Закону Швеции о дополнительных положениях к GDPR.",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1444,
  "code": "SWEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Швеция",
  "description": "Сайт хранит личные записи пользователей из Швеция дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Швеции о дополнительных положениях к GDPR.",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1445,
  "code": "SWEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Швеция",
  "description": "Контроллер передает данные резидентов Швеция за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Швеции о дополнительных положениях к GDPR.",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1446,
  "code": "FLNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Финляндия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Финляндия без предварительного явного согласия по Закону Финляндии о защите данных (1050/2018).",
  "severity": "critical",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1447,
  "code": "FLNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Офису уполномоченного по защите данных Финляндии в Финляндия",
  "description": "Контроллер сайта собирает личные данные резидентов Финляндия без направления уведомления об обработке в Офису уполномоченного по защите данных Финляндии по Закону Финляндии о защите данных (1050/2018).",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1448,
  "code": "FLNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Финляндия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Финляндия без обязательного технического шифрования или средств контроля согласно Закону Финляндии о защите данных (1050/2018).",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1449,
  "code": "FLNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Финляндия",
  "description": "Сайт хранит личные записи пользователей из Финляндия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Финляндии о защите данных (1050/2018).",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1450,
  "code": "FLNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Финляндия",
  "description": "Контроллер передает данные резидентов Финляндия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Финляндии о защите данных (1050/2018).",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1451,
  "code": "DNKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Дания",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Дания без предварительного явного согласия по Закону Дании о защите данных (Databeskyttelsesloven).",
  "severity": "critical",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1452,
  "code": "DNKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Датскому агентству по защите данных (Datatilsynet) в Дания",
  "description": "Контроллер сайта собирает личные данные резидентов Дания без направления уведомления об обработке в Датскому агентству по защите данных (Datatilsynet) по Закону Дании о защите данных (Databeskyttelsesloven).",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1453,
  "code": "DNKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Дания",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Дания без обязательного технического шифрования или средств контроля согласно Закону Дании о защите данных (Databeskyttelsesloven).",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1454,
  "code": "DNKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Дания",
  "description": "Сайт хранит личные записи пользователей из Дания дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Дании о защите данных (Databeskyttelsesloven).",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1455,
  "code": "DNKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Дания",
  "description": "Контроллер передает данные резидентов Дания за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Дании о защите данных (Databeskyttelsesloven).",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1456,
  "code": "BELPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Бельгия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Бельгия без предварительного явного согласия по Закону Бельгии об охране физических лиц при обработке данных.",
  "severity": "critical",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1457,
  "code": "BELPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Бельгийскому органу по защите данных (APD-GBA) в Бельгия",
  "description": "Контроллер сайта собирает личные данные резидентов Бельгия без направления уведомления об обработке в Бельгийскому органу по защите данных (APD-GBA) по Закону Бельгии об охране физических лиц при обработке данных.",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1458,
  "code": "BELPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Бельгия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Бельгия без обязательного технического шифрования или средств контроля согласно Закону Бельгии об охране физических лиц при обработке данных.",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1459,
  "code": "BELPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Бельгия",
  "description": "Сайт хранит личные записи пользователей из Бельгия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Бельгии об охране физических лиц при обработке данных.",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1460,
  "code": "BELPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Бельгия",
  "description": "Контроллер передает данные резидентов Бельгия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Бельгии об охране физических лиц при обработке данных.",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1461,
  "code": "GRCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Греция",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Греция без предварительного явного согласия по Закону Греции № 4624/2019 о мерах по защите персональных данных.",
  "severity": "critical",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1462,
  "code": "GRCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Греческому органу по защите персональных данных (HDPA) в Греция",
  "description": "Контроллер сайта собирает личные данные резидентов Греция без направления уведомления об обработке в Греческому органу по защите персональных данных (HDPA) по Закону Греции № 4624/2019 о мерах по защите персональных данных.",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1463,
  "code": "GRCPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Греция",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Греция без обязательного технического шифрования или средств контроля согласно Закону Греции № 4624/2019 о мерах по защите персональных данных.",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1464,
  "code": "GRCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Греция",
  "description": "Сайт хранит личные записи пользователей из Греция дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Греции № 4624/2019 о мерах по защите персональных данных.",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1465,
  "code": "GRCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Греция",
  "description": "Контроллер передает данные резидентов Греция за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Греции № 4624/2019 о мерах по защите персональных данных.",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1466,
  "code": "PRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Португалия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Португалия без предварительного явного согласия по Закону Португалии № 58/2019 о правилах исполнения GDPR.",
  "severity": "critical",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1467,
  "code": "PRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальной комиссии по защите данных Португалии (CNPD) в Португалия",
  "description": "Контроллер сайта собирает личные данные резидентов Португалия без направления уведомления об обработке в Национальной комиссии по защите данных Португалии (CNPD) по Закону Португалии № 58/2019 о правилах исполнения GDPR.",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1468,
  "code": "PRTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Португалия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Португалия без обязательного технического шифрования или средств контроля согласно Закону Португалии № 58/2019 о правилах исполнения GDPR.",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1469,
  "code": "PRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Португалия",
  "description": "Сайт хранит личные записи пользователей из Португалия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Португалии № 58/2019 о правилах исполнения GDPR.",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1470,
  "code": "PRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Португалия",
  "description": "Контроллер передает данные резидентов Португалия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Португалии № 58/2019 о правилах исполнения GDPR.",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1471,
  "code": "GRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Гренландия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Гренландия без предварительного явного согласия по Акту Гренландии об обработке персональных данных.",
  "severity": "critical",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1472,
  "code": "GRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Агентству по защите данных (Datatilsynet) в Гренландия",
  "description": "Контроллер сайта собирает личные данные резидентов Гренландия без направления уведомления об обработке в Агентству по защите данных (Datatilsynet) по Акту Гренландии об обработке персональных данных.",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1473,
  "code": "GRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Гренландия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Гренландия без обязательного технического шифрования или средств контроля согласно Акту Гренландии об обработке персональных данных.",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1474,
  "code": "GRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Гренландия",
  "description": "Сайт хранит личные записи пользователей из Гренландия дольше, чем необходимо для заявленных целей, без протоколов удаления по Акту Гренландии об обработке персональных данных.",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1475,
  "code": "GRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Гренландия",
  "description": "Контроллер передает данные резидентов Гренландия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Акту Гренландии об обработке персональных данных.",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1476,
  "code": "FLKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Фолклендские острова",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Фолклендские острова без предварительного явного согласия по Ордонансу Фолклендских островов о защите данных 2018 года.",
  "severity": "critical",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1477,
  "code": "FLKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Уполномоченному по защите данных Фолклендских островов в Фолклендские острова",
  "description": "Контроллер сайта собирает личные данные резидентов Фолклендские острова без направления уведомления об обработке в Уполномоченному по защите данных Фолклендских островов по Ордонансу Фолклендских островов о защите данных 2018 года.",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1478,
  "code": "FLKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Фолклендские острова",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Фолклендские острова без обязательного технического шифрования или средств контроля согласно Ордонансу Фолклендских островов о защите данных 2018 года.",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1479,
  "code": "FLKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Фолклендские острова",
  "description": "Сайт хранит личные записи пользователей из Фолклендские острова дольше, чем необходимо для заявленных целей, без протоколов удаления по Ордонансу Фолклендских островов о защите данных 2018 года.",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1480,
  "code": "FLKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Фолклендские острова",
  "description": "Контроллер передает данные резидентов Фолклендские острова за пределы страны без подтверждения адекватного уровня защиты или разрешений по Ордонансу Фолклендских островов о защите данных 2018 года.",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1481,
  "code": "PYFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Французская Полинезия",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Французская Полинезия без предварительного явного согласия по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1482,
  "code": "PYFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальной комиссии по информатике и свободам (CNIL) в Французская Полинезия",
  "description": "Контроллер сайта собирает личные данные резидентов Французская Полинезия без направления уведомления об обработке в Национальной комиссии по информатике и свободам (CNIL) по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1483,
  "code": "PYFPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Французская Полинезия",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Французская Полинезия без обязательного технического шифрования или средств контроля согласно Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1484,
  "code": "PYFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Французская Полинезия",
  "description": "Сайт хранит личные записи пользователей из Французская Полинезия дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1485,
  "code": "PYFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Французская Полинезия",
  "description": "Контроллер передает данные резидентов Французская Полинезия за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1486,
  "code": "NCLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Новая Каледония",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Новая Каледония без предварительного явного согласия по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1487,
  "code": "NCLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Национальной комиссии по информатике и свободам (CNIL) в Новая Каледония",
  "description": "Контроллер сайта собирает личные данные резидентов Новая Каледония без направления уведомления об обработке в Национальной комиссии по информатике и свободам (CNIL) по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1488,
  "code": "NCLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Новая Каледония",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Новая Каледония без обязательного технического шифрования или средств контроля согласно Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1489,
  "code": "NCLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Новая Каледония",
  "description": "Сайт хранит личные записи пользователей из Новая Каледония дольше, чем необходимо для заявленных целей, без протоколов удаления по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1490,
  "code": "NCLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Новая Каледония",
  "description": "Контроллер передает данные резидентов Новая Каледония за пределы страны без подтверждения адекватного уровня защиты или разрешений по Закону Франции об информационных технологиях и свободах (LIL).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1491,
  "code": "MSRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Монтсеррат",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Монтсеррат без предварительного явного согласия по Проекту закона Монтсеррата о защите персональных данных.",
  "severity": "critical",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1492,
  "code": "MSRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Уполномоченному по защите персональных данных в Монтсеррат",
  "description": "Контроллер сайта собирает личные данные резидентов Монтсеррат без направления уведомления об обработке в Уполномоченному по защите персональных данных по Проекту закона Монтсеррата о защите персональных данных.",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1493,
  "code": "MSRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Монтсеррат",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Монтсеррат без обязательного технического шифрования или средств контроля согласно Проекту закона Монтсеррата о защите персональных данных.",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1494,
  "code": "MSRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Монтсеррат",
  "description": "Сайт хранит личные записи пользователей из Монтсеррат дольше, чем необходимо для заявленных целей, без протоколов удаления по Проекту закона Монтсеррата о защите персональных данных.",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1495,
  "code": "MSRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Монтсеррат",
  "description": "Контроллер передает данные резидентов Монтсеррат за пределы страны без подтверждения адекватного уровня защиты или разрешений по Проекту закона Монтсеррата о защите персональных данных.",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1496,
  "code": "SHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка чувствительных данных без согласия в Остров Святой Елены",
  "description": "Сайт собирает конфиденциальные личные данные (здоровье, финансы) субъектов из Остров Святой Елены без предварительного явного согласия по Ордонансу Острова Святой Елены о защите персональных данных.",
  "severity": "critical",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1497,
  "code": "SHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Обработка личных данных без уведомления Уполномоченному по защите данных Острова Святой Елены в Остров Святой Елены",
  "description": "Контроллер сайта собирает личные данные резидентов Остров Святой Елены без направления уведомления об обработке в Уполномоченному по защите данных Острова Святой Елены по Ордонансу Острова Святой Елены о защите персональных данных.",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1498,
  "code": "SHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Неадекватные меры безопасности баз данных в Остров Святой Елены",
  "description": "База данных собирает и обрабатывает личные файлы резидентов Остров Святой Елены без обязательного технического шифрования или средств контроля согласно Ордонансу Острова Святой Елены о защите персональных данных.",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1499,
  "code": "SHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующие сроки хранения данных в Остров Святой Елены",
  "description": "Сайт хранит личные записи пользователей из Остров Святой Елены дольше, чем необходимо для заявленных целей, без протоколов удаления по Ордонансу Острова Святой Елены о защите персональных данных.",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1500,
  "code": "SHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Несоответствующая трансграничная передача данных из Остров Святой Елены",
  "description": "Контроллер передает данные резидентов Остров Святой Елены за пределы страны без подтверждения адекватного уровня защиты или разрешений по Ордонансу Острова Святой Елены о защите персональных данных.",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
  {
    "id": 1501,
    "code": "OWASP-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Уязвимость SQL-инъекции в полях ввода пользователя",
    "description": "Поля ввода веб-сайта или параметры URL уязвимы для SQL-инъекций, что позволяет осуществлять несанкционированный доступ к БД.",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-Injection"
  },
  {
    "id": 1502,
    "code": "OWASP-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Уязвимость межсайтового скриптинга (XSS)",
    "description": "Ввод пользователя отображается на странице без очистки, позволяя злоумышленникам запускать вредоносные скрипты в браузере.",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-XSS"
  },
  {
    "id": 1503,
    "code": "OWASP-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостатки аутентификации и утечка сессий",
    "description": "Сайт раскрывает идентификаторы сессий в URL или использует слабые таймауты сессий, допуская перехват управления.",
    "severity": "critical",
    "reference": "OWASP Top 10 A07:2021-Identification & Auth"
  },
  {
    "id": 1504,
    "code": "OWASP-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Нешифрованная передача конфиденциальных данных",
    "description": "Конфиденциальные данные (пароли, платежные реквизиты) передаются по HTTP или с использованием устаревших протоколов TLS 1.0/1.1.",
    "severity": "critical",
    "reference": "OWASP Top 10 A02:2021-Cryptographic Failures"
  },
  {
    "id": 1505,
    "code": "OWASP-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Нарушение контроля доступа на уровне объектов",
    "description": "API или конечная точка не проверяют, имеет ли аутентифицированный пользователь права доступа к запрошенному ID ресурса.",
    "severity": "critical",
    "reference": "OWASP Top 10 A01:2021-Broken Access Control"
  },
  {
    "id": 1506,
    "code": "OWASP-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Режим отладки активен в рабочей среде",
    "description": "Подробные логи ошибок и трассировки стека видны посетителям сайта, раскрывая системные пути и переменные окружения.",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-Security Misconfig"
  },
  {
    "id": 1507,
    "code": "OWASP-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Уязвимость внедрения внешних сущностей XML (XXE)",
    "description": "XML-парсер принимает внешние сущности, позволяя злоумышленникам читать файлы на сервере или проводить атаки SSRF.",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-XXE"
  },
  {
    "id": 1508,
    "code": "OWASP-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Небезопасная десериализация ненадежных данных",
    "description": "Приложение десериализует объекты, контролируемые пользователем, без валидации, что может привести к RCE.",
    "severity": "serious",
    "reference": "OWASP Top 10 A08:2021-Software Integrity"
  },
  {
    "id": 1509,
    "code": "OWASP-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Устаревшие библиотеки с известными уязвимостями",
    "description": "Фронтенд использует устаревшие NPM-пакеты, плагины WordPress или библиотеки JQuery с открытыми уязвимостями CVE.",
    "severity": "serious",
    "reference": "OWASP Top 10 A06:2021-Vulnerable Components"
  },
  {
    "id": 1510,
    "code": "OWASP-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточное ведение логов безопасности и аудит",
    "description": "Критически важные действия (сброс паролей, вход администратора) не логируются, что мешает расследованию инцидентов.",
    "severity": "moderate",
    "reference": "OWASP Top 10 A09:2021-Logging & Monitoring"
  },
  {
    "id": 1511,
    "code": "NISTP-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Неадекватная политика контроля доступа",
    "description": "Отсутствие контроля доступа на основе ролей (RBAC) позволяет обычным пользователям просматривать системные логи.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AC-2"
  },
  {
    "id": 1512,
    "code": "NISTP-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие генерации записей аудита",
    "description": "Веб-приложение не записывает изменения настроек API или создание пользователей в неизменяемый лог аудита.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AU-2"
  },
  {
    "id": 1513,
    "code": "NISTP-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Неэффективное управление конфигурацией",
    "description": "Отсутствуют базовые конфигурации для развертывания ПО сервера, что приводит к разным уровням безопасности.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 CM-2"
  },
  {
    "id": 1514,
    "code": "NISTP-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие многофакторной аутентификации для админов",
    "description": "Входы администраторов используют только однофакторную аутентификацию, нарушая стандарты безопасности.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IA-2"
  },
  {
    "id": 1515,
    "code": "NISTP-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Слабая интеграция плана реагирования на инциденты",
    "description": "На сайте отсутствует автоматическое оповещение об аномалиях для запуска процедур реагирования во время атак.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IR-4"
  },
  {
    "id": 1516,
    "code": "NISTP-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Неадекватное отслеживание обслуживания системы",
    "description": "График сканирования уязвимостей не формализован, что приводит к задержкам в выявлении критических CVE.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 MA-2"
  },
  {
    "id": 1517,
    "code": "NISTP-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие защиты медиафайлов и шифрования бэкапов",
    "description": "Резервные копии с личными данными клиентов хранятся в облачных бакетах без шифрования.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 MP-4"
  },
  {
    "id": 1518,
    "code": "NISTP-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие логов доступа в серверную (собственный хостинг)",
    "description": "При собственном хостинге контроллер сайта не ведет логи физического доступа к накопителям с данными.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PE-2"
  },
  {
    "id": 1519,
    "code": "NISTP-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие отчетов об обучении безопасности",
    "description": "У системных администраторов нет документов, подтверждающих прохождение курсов по кибербезопасности.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PS-8"
  },
  {
    "id": 1520,
    "code": "NISTP-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие защиты сетевых границ и DNSSEC",
    "description": "Для домена не настроены подписи DNSSEC, что подвергает пользователей риску спуфинга DNS и перенаправления.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 SC-7"
  },
  {
    "id": 1521,
    "code": "ISO27-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Неадекватная политика информационной безопасности",
    "description": "Компания работает без формализованной политики информационной безопасности, утверждаемой руководством ежегодно.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.1"
  },
  {
    "id": 1522,
    "code": "ISO27-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие определенных ролей и полномочий безопасности",
    "description": "Не назначен ответственный сотрудник для надзора за соблюдением требований безопасности в веб-проектах.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.2"
  },
  {
    "id": 1523,
    "code": "ISO27-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие инвентаризации активов для данных клиентов",
    "description": "БД работает без реестра активов, определяющего, где именно хранятся PII и платежные данные.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.9"
  },
  {
    "id": 1524,
    "code": "ISO27-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Слабое использование криптографии для паролей пользователей",
    "description": "Пароли хэшируются с использованием устаревших алгоритмов MD5 или SHA1 без добавления соли.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.24"
  },
  {
    "id": 1525,
    "code": "ISO27-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Недостаточная физическая безопасность веб-серверов",
    "description": "Физические корпуса серверов с дисками баз данных не имеют датчиков вскрытия или замков.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.7.1"
  },
  {
    "id": 1526,
    "code": "ISO27-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Плохая безопасность операций и непроверенные бэкапы",
    "description": "Циклы восстановления из бэкапов не тестируются регулярно, создавая риск потери данных при сбое.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.13"
  },
  {
    "id": 1527,
    "code": "ISO27-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Небезопасная сетевая архитектура и слабый контроль маршрутизации",
    "description": "Узлы баз данных доступны напрямую из публичных IP-адресов без прокси-серверов или брандмауэров.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.20"
  },
  {
    "id": 1528,
    "code": "ISO27-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие стандартов безопасного кодирования при разработке",
    "description": "Команда веб-разработки работает без правил безопасного кодирования, защищающих от SQL-инъекций и XSS.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.25"
  },
  {
    "id": 1529,
    "code": "ISO27-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие требований безопасности в договорах с поставщиками",
    "description": "Контракты с платежными шлюзами и аналитическими сервисами не содержат условий о соблюдении ИБ.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.19"
  },
  {
    "id": 1530,
    "code": "ISO27-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие управления инцидентами и путей эскалации",
    "description": "Отсутствуют процедуры передачи информации о вторжениях от ИТ-отдела руководству компании.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.5.24"
  },
  {
    "id": 1531,
    "code": "SOC2P-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Неадекватный мониторинг системных аномалий безопасности",
    "description": "Логи сервера показывают отсутствие автоматических систем обнаружения вторжений (IDS) для блокировки брутфорса.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.8"
  },
  {
    "id": 1532,
    "code": "SOC2P-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Слабые учетные данные доступа и отсутствие MFA",
    "description": "Контроль доступа допускает использование простых паролей в панелях администратора без принудительной проверки MFA.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.3"
  },
  {
    "id": 1533,
    "code": "SOC2P-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Недостаточная защита передачи данных",
    "description": "Маршруты API используют устаревшие протоколы HTTP и не имеют заголовков HSTS для принудительного шифрования.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.7"
  },
  {
    "id": 1534,
    "code": "SOC2P-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Слабая политика классификации данных",
    "description": "Внутренние записи не имеют маркировки для идентификации того, какие формы собирают конфиденциальные данные.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.1"
  },
  {
    "id": 1535,
    "code": "SOC2P-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие инфраструктуры управления уязвимостями",
    "description": "Кодовая база работает без интегрированных инструментов для выявления уязвимых зависимостей NPM при деплое.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC7.1"
  },
  {
    "id": 1536,
    "code": "SOC2P-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие тестирования доступности и аварийного переключения",
    "description": "Хостинг работает без тестирования аварийного переключения, создавая единые точки отказа для баз данных.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1"
  },
  {
    "id": 1537,
    "code": "SOC2P-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Слабый контроль целостности обработки транзакций",
    "description": "Платежные шлюзы не используют токены проверки транзакций, допуская изменение параметров при оплате.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC9.1"
  },
  {
    "id": 1538,
    "code": "SOC2P-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Неадекватная защита конфиденциальности при хранении данных",
    "description": "Файлы идентификации пользователей хранятся вместе с общедоступными файлами без проверки прав доступа.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.6"
  },
  {
    "id": 1539,
    "code": "SOC2P-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Слабое управление жизненным циклом данных",
    "description": "Система сохраняет личные профили бесконечно без автоматического удаления неактивных учетных записей.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.5"
  },
  {
    "id": 1540,
    "code": "SOC2P-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие контроля изменений и экспертной проверки",
    "description": "Изменения кода разворачиваются напрямую на сервере без обязательного аппрува пул-реквестов.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1-Change"
  },
  {
    "id": 1541,
    "code": "CISA-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Активны стандартные административные пароли",
    "description": "Конечные точки настройки базы данных или CMS используют стандартные пароли администратора, допуская захват ботами.",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.1"
  },
  {
    "id": 1542,
    "code": "CISA-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие MFA для административных консолей",
    "description": "В административных интерфейсах хостинга, БД или API-консолях отсутствуют требования многофакторной аутентификации.",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.2"
  },
  {
    "id": 1543,
    "code": "CISA-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Известные эксплуатируемые уязвимости в веб-ПО",
    "description": "Рабочий сервер использует ПО и зависимости, внесенные в каталог известных эксплуатируемых уязвимостей (KEV) CISA.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.1"
  },
  {
    "id": 1544,
    "code": "CISA-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Неэффективная инвентаризация интернет-активов",
    "description": "Организация не ведет учет публичных доменов, что подвергает забытые субдомены риску захвата.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.2"
  },
  {
    "id": 1545,
    "code": "CISA-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие контроля целостности DNS",
    "description": "Регистрация домена не имеет блокировки на уровне регистратора, допуская несанкционированное изменение записей DNS.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.3"
  },
  {
    "id": 1546,
    "code": "CISA-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Небезопасные стандарты аутентификации почты (нет DMARC)",
    "description": "Домен не имеет настроек DMARC, позволяя злоумышленникам отправлять фишинговые письма от имени сайта.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.4"
  },
  {
    "id": 1547,
    "code": "CISA-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Отсутствие учений по инцидентам безопасности",
    "description": "Не проводились тренировки для проверки процедур реагирования на программы-вымогатели или утечки данных.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 3.1"
  },
  {
    "id": 1548,
    "code": "CISA-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Включены небезопасные протоколы удаленного доступа",
    "description": "Среда хостинга открывает интерфейсы Telnet или нешифрованный HTTP для удаленного управления сервером.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 1.3"
  },
  {
    "id": 1549,
    "code": "CISA-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточная изоляция резервных копий данных",
    "description": "Резервные копии БД хранятся в той же сетевой подсети, что увеличивает риск их потери при атаках.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 4.1"
  },
  {
    "id": 1550,
    "code": "CISA-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Неэффективное внутреннее сканирование уязвимостей",
    "description": "Сервер сайта не проходит еженедельное сканирование уязвимостей публичных конечных точек.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.5"
  },
  {
    "id": 1551,
    "code": "EUDSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствует прямой контакт для связи с властями",
    "description": "На сайте нет выделенного электронного адреса для прямого общения с органами надзора ЕС по DSA.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 11"
  },
  {
    "id": 1552,
    "code": "EUDSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие правил модерации контента в Условиях",
    "description": "Пользовательское соглашение не раскрывает использование алгоритмов или ручной модерации комментариев.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 14"
  },
  {
    "id": 1553,
    "code": "EUDSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие прозрачности алгоритмов рекомендаций",
    "description": "Сайт предлагает подборки или порядок товаров без объяснения основных факторов ранжирования.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 27"
  },
  {
    "id": 1554,
    "code": "EUDSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Запрещенное манипулирование интерфейсом (темные паттерны)",
    "description": "Обманные элементы дизайна заставляют пользователей подписываться на рассылки путем предустановки выбора.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 25"
  },
  {
    "id": 1555,
    "code": "EUDSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Немаркированная интернет-реклама и спонсоры",
    "description": "Платные промо-материалы отображаются в ленте без явных пометок, раскрывающих спонсора публикации.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26"
  },
  {
    "id": 1556,
    "code": "EUDSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие механизма подачи жалоб на нелегальный контент",
    "description": "Портал не предоставляет удобную электронную форму для уведомления о противоправном контенте.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 16"
  },
  {
    "id": 1557,
    "code": "EUDSA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Нарушение правил блокировки пользователей",
    "description": "Сайт блокирует учетные записи или удаляет товары продавцов без предоставления письменного обоснования.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20"
  },
  {
    "id": 1558,
    "code": "EUDSA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие публикации обоснований решений по модерации",
    "description": "Сайт модерирует комментарии третьих лиц, но не публикует отчеты в публичной базе данных ЕС (DSA Database).",
    "severity": "moderate",
    "reference": "EU Digital Services Act (DSA) Article 17"
  },
  {
    "id": 1559,
    "code": "EUDSA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Неадекватная система рассмотрения жалоб",
    "description": "Сайт не предоставляет цифровую систему апелляций для обжалования решений модерации в течение 6 месяцев.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20-Appeal"
  },
  {
    "id": 1560,
    "code": "EUDSA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Недобросовестные методы таргетирования рекламы",
    "description": "Сайт использует чувствительные данные (религия, здоровье, ориентация) для таргетирования баннеров.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26-Target"
  },
  {
    "id": 1561,
    "code": "EUDMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Недобросовестное продвижение собственных товаров",
    "description": "Поисковая система магазина ранжирует собственные товары выше аналогичных товаров сторонних продавцов.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(5)"
  },
  {
    "id": 1562,
    "code": "EUDMA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконное объединение данных из разных источников",
    "description": "Портал объединяет данные пользователей с внешними трекерами без явного согласия.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(2)"
  },
  {
    "id": 1563,
    "code": "EUDMA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Ограничение использования стороннего ПО",
    "description": "Веб-портал ограничивает запуск сторонних платежных систем или браузеров во фрейме страницы.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)"
  },
  {
    "id": 1564,
    "code": "EUDMA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Ограничение переноса данных бизнес-пользователей",
    "description": "Кабинет продавца блокирует экспорт истории транзакций и отзывов на сторонние серверы.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(9)"
  },
  {
    "id": 1565,
    "code": "EUDMA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Недобросовестные отчеты об эффективности рекламы",
    "description": "Система взимает плату за рекламу, но не предоставляет бесплатные ежедневные метрики её эффективности.",
    "severity": "moderate",
    "reference": "EU Digital Markets Act (DMA) Article 5(9)"
  },
  {
    "id": 1566,
    "code": "EUDMA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Запрет ценового паритета (ограничение предложения дешевле)",
    "description": "Условия сервиса наказывают продавцов за предложение более низких цен на их собственных сайтах.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(3)"
  },
  {
    "id": 1567,
    "code": "EUDMA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обманная реализация экрана выбора",
    "description": "Система устанавливает поисковые системы по умолчанию при настройке, не предлагая нейтрального выбора.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)-Choice"
  },
  {
    "id": 1568,
    "code": "EUDMA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Ограничение совместимости сервисов платформы",
    "description": "API ограничивает совместимость сторонних инструментов связи с основной системой сообщений платформы.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(7)"
  },
  {
    "id": 1569,
    "code": "EUDMA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Запутанный процесс прекращения подписки",
    "description": "Портал заставляет бизнес-пользователей звонить по телефону поддержки для закрытия кабинета.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(13)"
  },
  {
    "id": 1570,
    "code": "EUDMA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконное использование торговых данных продавцов",
    "description": "Хост сайта использует непубличные данные о транзакциях продавцов для запуска аналогичных собственных товаров.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(2)"
  },
  {
    "id": 1571,
    "code": "UKAAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Неадекватная верификация возраста для чувствительного контента",
    "description": "Портал использует простое всплывающее окно без проверки возраста для доступа к контенту «18+».",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 3"
  },
  {
    "id": 1572,
    "code": "UKAAC-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Высокорисковый трекинг активен по умолчанию для детей",
    "description": "Отслеживание геопозиции и поведения включено по умолчанию при регистрации до прохождения проверки возраста.",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 6"
  },
  {
    "id": 1573,
    "code": "UKAAC-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Сложная политика конфиденциальности для юной аудитории",
    "description": "Политика конфиденциальности использует сложный юридический язык вместо простых объяснений для детей.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 4"
  },
  {
    "id": 1574,
    "code": "UKAAC-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Обманные приемы интерфейса (nudge) против детей",
    "description": "Элементы дизайна подталкивают детей к снижению уровня приватности с помощью ярких уведомлений и наград.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 9"
  },
  {
    "id": 1575,
    "code": "UKAAC-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Незаконное автоматическое профилирование детей",
    "description": "Рекомендательная лента по умолчанию анализирует привычки детей для показа вызывающего привыкание контента.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 11"
  },
  {
    "id": 1576,
    "code": "UKAAC-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Отсутствие уведомлений о родительском контроле",
    "description": "В приложении нет значка статуса, информирующего ребенка о том, что родители отслеживают его сессию.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 13"
  },
  {
    "id": 1577,
    "code": "UKAAC-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Незаконная передача данных детей рекламодателям",
    "description": "Портал передает куки отслеживания подтвержденных несовершеннолетних рекламным брокерам без согласия.",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 12"
  },
  {
    "id": 1578,
    "code": "UKAAC-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Избыточный сбор данных для лиц младше 18 лет",
    "description": "Форма регистрации собирает необязательные данные (хобби, школа) у пользователей младше 18 лет.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 8"
  },
  {
    "id": 1579,
    "code": "UKAAC-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Вредные методы таргетирования рекламы на детей",
    "description": "База данных собирает сведения для таргетинга рекламы, эксплуатирующего уязвимости поведения детей.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 5"
  },
  {
    "id": 1580,
    "code": "UKAAC-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Небезопасные настройки профиля ребенка по умолчанию",
    "description": "Профили детей по умолчанию видны всем пользователям интернета без обязательной авторизации.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 7"
  },
  {
    "id": 1581,
    "code": "CAAAC-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие DPIA для детских веб-сервисов в Калифорнии",
    "description": "Контроллер не проводит оценку воздействия на защиту данных (DPIA) перед развертыванием функций для детей.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(1)"
  },
  {
    "id": 1582,
    "code": "CAAAC-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Обманная реализация подтверждения возраста",
    "description": "Сайт не оценивает возраст пользователей с достаточной точностью, открывая детям доступ к чатам для взрослых.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 1583,
    "code": "CAAAC-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отключение высокой приватности по умолчанию",
    "description": "При регистрации на сайте для посетителей младше 18 лет по умолчанию устанавливается низкий уровень приватности.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(6)"
  },
  {
    "id": 1584,
    "code": "CAAAC-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Незаконное поведенческое профилирование подростков",
    "description": "Сайт анализирует поисковые запросы подростков для создания рекламных профилей без согласия родителей.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(2)"
  },
  {
    "id": 1585,
    "code": "CAAAC-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Незаконная продажа личных данных несовершеннолетних",
    "description": "Платформа продает или передает данные пользователей младше 18 лет без получения обязательного согласия.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(1)"
  },
  {
    "id": 1586,
    "code": "CAAAC-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие индикатора активного гео-трекинга для детей",
    "description": "Мобильное веб-приложение фиксирует координаты ребенка без отображения постоянного визуального индикатора трекинга.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(7)"
  },
  {
    "id": 1587,
    "code": "CAAAC-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Обманные nudge-паттерны для отключения защиты",
    "description": "Интерфейсы используют игровые механики, чтобы убедить детей отключить настройки конфиденциальности.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(7)"
  },
  {
    "id": 1588,
    "code": "CAAAC-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Сложные Условия использования для юных пользователей",
    "description": "Условия использования написаны на слишком сложном языке, нарушая стандарты доступности для подростков.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(8)"
  },
  {
    "id": 1589,
    "code": "CAAAC-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Незаконный сбор геолокации несовершеннолетних",
    "description": "Сервер сохраняет точные координаты пользователей младше 18 лет без немедленной необходимости для работы сервиса.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(8)"
  },
  {
    "id": 1590,
    "code": "CAAAC-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Отсутствие кнопки удаления профиля (кнопка стирания)",
    "description": "Личный кабинет не предоставляет быструю кнопку для удаления профиля несовершеннолетнего пользователя.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(9)"
  },
  {
    "id": 1591,
    "code": "EUAIA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие раскрытия факта взаимодействия с ИИ",
    "description": "Чат-бот работает на странице контактов без явного информирования пользователей о том, что они общаются с ИИ.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(1)"
  },
  {
    "id": 1592,
    "code": "EUAIA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие маркировки генерируемого ИИ контента",
    "description": "Синтетические изображения или новости от ИИ не имеют машиночитаемой маркировки об искусственном происхождении.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)"
  },
  {
    "id": 1593,
    "code": "EUAIA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Запрещенное использование систем распознавания эмоций",
    "description": "Сайт использует веб-камеру для ИИ-анализа эмоций кандидатов во время онлайн-тестирования при приеме на работу.",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(f)"
  },
  {
    "id": 1594,
    "code": "EUAIA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконная биометрическая классификация пользователей",
    "description": "ИИ распределяет пользователей по группам на основе биометрических профилей для показа мужских/женских каталогов.",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(g)"
  },
  {
    "id": 1595,
    "code": "EUAIA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие предупреждений о дипфейках",
    "description": "Реалистичные измененные видео или аудиозаписи загружаются на сайт без четких предупреждений о дипфейке.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)-Deepfake"
  },
  {
    "id": 1596,
    "code": "EUAIA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Слабое управление рисками для ИИ высокого риска",
    "description": "Онлайн-портал использует ПО для автоматического отбора резюме без оценки рисков и тестирования безопасности.",
    "severity": "serious",
    "reference": "EU AI Act Article 9"
  },
  {
    "id": 1597,
    "code": "EUAIA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие логирования для ИИ-систем высокого риска",
    "description": "Модели динамического ценообразования работают без сохранения параметров входных данных.",
    "severity": "serious",
    "reference": "EU AI Act Article 12"
  },
  {
    "id": 1598,
    "code": "EUAIA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие человеческого контроля при автонаборе персонала",
    "description": "Результаты ИИ-скрининга кандидатов приводят к отказам без возможности ручной проверки или апелляции.",
    "severity": "serious",
    "reference": "EU AI Act Article 14"
  },
  {
    "id": 1599,
    "code": "EUAIA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Незаконный сбор веб-данных для обучения ИИ",
    "description": "Парсеры собирают авторские изображения с сайта для обучения ИИ, игнорируя запрещающие теги и robots.txt.",
    "severity": "serious",
    "reference": "EU AI Act Article 53(1)(c)"
  },
  {
    "id": 1600,
    "code": "EUAIA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие регистрации ИИ-модели высокого риска",
    "description": "Модель автоматической оценки кредитоспособности используется без регистрации в общедоступной базе ИИ ЕС.",
    "severity": "serious",
    "reference": "EU AI Act Article 60"
  },
  {
    "id": 1601,
    "code": "TXDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1602,
    "code": "TXDPS-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1603,
    "code": "TXDPS-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1604,
    "code": "TXDPS-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1605,
    "code": "TXDPS-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1606,
    "code": "TXDPS-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1607,
    "code": "TXDPS-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1608,
    "code": "TXDPS-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1609,
    "code": "TXDPS-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1610,
    "code": "TXDPS-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Закону Техаса о конфиденциальности и безопасности данных (TDPSA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Техаса о конфиденциальности и безопасности данных (TDPSA).",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1611,
    "code": "VCDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1612,
    "code": "VCDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1613,
    "code": "VCDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1614,
    "code": "VCDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1615,
    "code": "VCDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1616,
    "code": "VCDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1617,
    "code": "VCDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1618,
    "code": "VCDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1619,
    "code": "VCDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1620,
    "code": "VCDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Закону Вирджинии о защите данных потребителей (VCDPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Вирджинии о защите данных потребителей (VCDPA).",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1621,
    "code": "COPR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Закону Колорадо о конфиденциальности (CPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1622,
    "code": "COPR-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Закону Колорадо о конфиденциальности (CPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1623,
    "code": "COPR-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Закону Колорадо о конфиденциальности (CPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1624,
    "code": "COPR-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Закону Колорадо о конфиденциальности (CPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1625,
    "code": "COPR-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Колорадо о конфиденциальности (CPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1626,
    "code": "COPR-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Закону Колорадо о конфиденциальности (CPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1627,
    "code": "COPR-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Закону Колорадо о конфиденциальности (CPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1628,
    "code": "COPR-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Закону Колорадо о конфиденциальности (CPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1629,
    "code": "COPR-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Колорадо о конфиденциальности (CPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1630,
    "code": "COPR-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Закону Колорадо о конфиденциальности (CPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Колорадо о конфиденциальности (CPA).",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1631,
    "code": "CTDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1632,
    "code": "CTDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1633,
    "code": "CTDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1634,
    "code": "CTDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1635,
    "code": "CTDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1636,
    "code": "CTDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1637,
    "code": "CTDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1638,
    "code": "CTDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1639,
    "code": "CTDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1640,
    "code": "CTDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Закону Коннектикута о конфиденциальности данных (CTDPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Коннектикута о конфиденциальности данных (CTDPA).",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1641,
    "code": "UCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1642,
    "code": "UCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1643,
    "code": "UCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1644,
    "code": "UCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1645,
    "code": "UCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1646,
    "code": "UCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1647,
    "code": "UCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1648,
    "code": "UCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1649,
    "code": "UCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1650,
    "code": "UCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Закону Юты о конфиденциальности потребителей (UCPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Юты о конфиденциальности потребителей (UCPA).",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1651,
    "code": "ORCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1652,
    "code": "ORCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1653,
    "code": "ORCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1654,
    "code": "ORCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1655,
    "code": "ORCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1656,
    "code": "ORCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1657,
    "code": "ORCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1658,
    "code": "ORCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1659,
    "code": "ORCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1660,
    "code": "ORCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Закону Орегона о конфиденциальности потребителей (OCPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Орегона о конфиденциальности потребителей (OCPA).",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1661,
    "code": "FLORDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Биллю о цифровых правах Флориды (FDBR)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1662,
    "code": "FLORDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Биллю о цифровых правах Флориды (FDBR)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1663,
    "code": "FLORDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Биллю о цифровых правах Флориды (FDBR)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1664,
    "code": "FLORDB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Биллю о цифровых правах Флориды (FDBR)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1665,
    "code": "FLORDB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Биллю о цифровых правах Флориды (FDBR)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1666,
    "code": "FLORDB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Биллю о цифровых правах Флориды (FDBR)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1667,
    "code": "FLORDB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Биллю о цифровых правах Флориды (FDBR)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1668,
    "code": "FLORDB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Биллю о цифровых правах Флориды (FDBR)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1669,
    "code": "FLORDB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Биллю о цифровых правах Флориды (FDBR)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1670,
    "code": "FLORDB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Биллю о цифровых правах Флориды (FDBR)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Биллю о цифровых правах Флориды (FDBR).",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1671,
    "code": "PIPEDA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1672,
    "code": "PIPEDA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1673,
    "code": "PIPEDA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1674,
    "code": "PIPEDA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1675,
    "code": "PIPEDA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1676,
    "code": "PIPEDA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1677,
    "code": "PIPEDA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1678,
    "code": "PIPEDA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1679,
    "code": "PIPEDA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1680,
    "code": "PIPEDA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Канады о защите личной информации и электронных документах (PIPEDA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Канады о защите личной информации и электронных документах (PIPEDA).",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1681,
    "code": "LAW25-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Квебека № 25",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Квебека № 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1682,
    "code": "LAW25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Квебека № 25",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Квебека № 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1683,
    "code": "LAW25-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Квебека № 25",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Квебека № 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1684,
    "code": "LAW25-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Квебека № 25",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Квебека № 25.",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1685,
    "code": "LAW25-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Квебека № 25",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Квебека № 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1686,
    "code": "LAW25-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Квебека № 25",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Квебека № 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1687,
    "code": "LAW25-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Квебека № 25",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Квебека № 25.",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1688,
    "code": "LAW25-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Квебека № 25",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Квебека № 25.",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1689,
    "code": "LAW25-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Квебека № 25",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Квебека № 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1690,
    "code": "LAW25-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Квебека № 25",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Квебека № 25.",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1691,
    "code": "TDDDG-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие канала доступа к данным по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1692,
    "code": "TDDDG-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие процедуры исправления данных по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1693,
    "code": "TDDDG-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие портала удаления данных по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1694,
    "code": "TDDDG-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие возможности экспорта данных по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1695,
    "code": "TDDDG-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1696,
    "code": "TDDDG-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от продажи личных данных по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1697,
    "code": "TDDDG-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие отказа от автопрофилирования по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1698,
    "code": "TDDDG-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Обработка чувствительных данных без согласия по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1699,
    "code": "TDDDG-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1700,
    "code": "TDDDG-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Несоответствующее уведомление о сборе данных по Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Германии о защите данных в сфере телекоммуникаций и телемедиа (TDDDG).",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1701,
    "code": "SGPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1702,
    "code": "SGPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1703,
    "code": "SGPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1704,
    "code": "SGPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1705,
    "code": "SGPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1706,
    "code": "SGPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1707,
    "code": "SGPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1708,
    "code": "SGPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1709,
    "code": "SGPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1710,
    "code": "SGPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Сингапура о защите персональных данных (PDPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Сингапура о защите персональных данных (PDPA).",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1711,
    "code": "AUSAPP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Австралийским принципам конфиденциальности (APPs)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1712,
    "code": "AUSAPP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Австралийским принципам конфиденциальности (APPs)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1713,
    "code": "AUSAPP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Австралийским принципам конфиденциальности (APPs)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1714,
    "code": "AUSAPP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Австралийским принципам конфиденциальности (APPs)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1715,
    "code": "AUSAPP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Австралийским принципам конфиденциальности (APPs)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1716,
    "code": "AUSAPP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Австралийским принципам конфиденциальности (APPs)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1717,
    "code": "AUSAPP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Австралийским принципам конфиденциальности (APPs)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1718,
    "code": "AUSAPP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Австралийским принципам конфиденциальности (APPs)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1719,
    "code": "AUSAPP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Австралийским принципам конфиденциальности (APPs)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1720,
    "code": "AUSAPP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Австралийским принципам конфиденциальности (APPs)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Австралийским принципам конфиденциальности (APPs).",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1721,
    "code": "NZPRIV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1722,
    "code": "NZPRIV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1723,
    "code": "NZPRIV-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1724,
    "code": "NZPRIV-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1725,
    "code": "NZPRIV-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1726,
    "code": "NZPRIV-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1727,
    "code": "NZPRIV-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1728,
    "code": "NZPRIV-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1729,
    "code": "NZPRIV-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1730,
    "code": "NZPRIV-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Новой Зеландии о конфиденциальности 2020 года",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Новой Зеландии о конфиденциальности 2020 года.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1731,
    "code": "JPAPPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Японии о защите личной информации (APPI)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Японии о защите личной информации (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1732,
    "code": "JPAPPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Японии о защите личной информации (APPI)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Японии о защите личной информации (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1733,
    "code": "JPAPPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Японии о защите личной информации (APPI)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Японии о защите личной информации (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1734,
    "code": "JPAPPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Японии о защите личной информации (APPI)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Японии о защите личной информации (APPI).",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1735,
    "code": "JPAPPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Японии о защите личной информации (APPI)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Японии о защите личной информации (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1736,
    "code": "JPAPPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Японии о защите личной информации (APPI)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Японии о защите личной информации (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1737,
    "code": "JPAPPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Японии о защите личной информации (APPI)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Японии о защите личной информации (APPI).",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1738,
    "code": "JPAPPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Японии о защите личной информации (APPI)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Японии о защите личной информации (APPI).",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1739,
    "code": "JPAPPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Японии о защите личной информации (APPI)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Японии о защите личной информации (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1740,
    "code": "JPAPPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Японии о защите личной информации (APPI)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Японии о защите личной информации (APPI).",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1741,
    "code": "KRPIPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1742,
    "code": "KRPIPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1743,
    "code": "KRPIPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1744,
    "code": "KRPIPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1745,
    "code": "KRPIPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1746,
    "code": "KRPIPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1747,
    "code": "KRPIPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1748,
    "code": "KRPIPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1749,
    "code": "KRPIPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1750,
    "code": "KRPIPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Южной Кореи о защите персональной информации (PIPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Южной Кореи о защите персональной информации (PIPA).",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1751,
    "code": "VNDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1752,
    "code": "VNDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1753,
    "code": "VNDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1754,
    "code": "VNDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1755,
    "code": "VNDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1756,
    "code": "VNDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1757,
    "code": "VNDPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1758,
    "code": "VNDPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1759,
    "code": "VNDPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1760,
    "code": "VNDPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Декрету Вьетнама № 13/2023/ND-CP о защите персональных данных.",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1761,
    "code": "THPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1762,
    "code": "THPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1763,
    "code": "THPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1764,
    "code": "THPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1765,
    "code": "THPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1766,
    "code": "THPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1767,
    "code": "THPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1768,
    "code": "THPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1769,
    "code": "THPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1770,
    "code": "THPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Таиланда о защите персональных данных (PDPA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Таиланда о защите персональных данных (PDPA).",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1771,
    "code": "INDPDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1772,
    "code": "INDPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1773,
    "code": "INDPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1774,
    "code": "INDPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1775,
    "code": "INDPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1776,
    "code": "INDPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1777,
    "code": "INDPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1778,
    "code": "INDPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1779,
    "code": "INDPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1780,
    "code": "INDPDP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону Индии о защите цифровых персональных данных (DPDP)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону Индии о защите цифровых персональных данных (DPDP).",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1781,
    "code": "BRLGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Общему закону Бразилии о защите данных (LGPD)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1782,
    "code": "BRLGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Общему закону Бразилии о защите данных (LGPD)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1783,
    "code": "BRLGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Общему закону Бразилии о защите данных (LGPD)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1784,
    "code": "BRLGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Общему закону Бразилии о защите данных (LGPD)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1785,
    "code": "BRLGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Общему закону Бразилии о защите данных (LGPD)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1786,
    "code": "BRLGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Общему закону Бразилии о защите данных (LGPD)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1787,
    "code": "BRLGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Общему закону Бразилии о защите данных (LGPD)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1788,
    "code": "BRLGPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Общему закону Бразилии о защите данных (LGPD)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1789,
    "code": "BRLGPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Общему закону Бразилии о защите данных (LGPD)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1790,
    "code": "BRLGPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Общему закону Бразилии о защите данных (LGPD)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Общему закону Бразилии о защите данных (LGPD).",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1791,
    "code": "ZAPOPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие канала доступа к данным по Закону ЮАР о защите личной информации (POPIA)",
    "description": "На сайте отсутствует доступный механизм или контактный email для запроса доступа к сохраненным личным данным согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1792,
    "code": "ZAPOPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие процедуры исправления данных по Закону ЮАР о защите личной информации (POPIA)",
    "description": "Сайт не предоставляет форму или процедуру для исправления неточных личных данных согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1793,
    "code": "ZAPOPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие портала удаления данных по Закону ЮАР о защите личной информации (POPIA)",
    "description": "На сайте отсутствует понятный механизм запроса на удаление данных для пользователей согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1794,
    "code": "ZAPOPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие возможности экспорта данных по Закону ЮАР о защите личной информации (POPIA)",
    "description": "Сайт не предлагает переносимый структурированный формат для скачивания и переноса записей пользователей согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1795,
    "code": "ZAPOPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от таргетированной рекламы по Закону ЮАР о защите личной информации (POPIA)",
    "description": "На сайте используются пиксели отслеживания для рекламы без предоставления ссылки на отказ согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1796,
    "code": "ZAPOPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от продажи личных данных по Закону ЮАР о защите личной информации (POPIA)",
    "description": "Сайт передает данные пользователей маркетинговым брокерам без предоставления заметного механизма отказа согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1797,
    "code": "ZAPOPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие отказа от автопрофилирования по Закону ЮАР о защите личной информации (POPIA)",
    "description": "Сайт использует модели автоматического принятия решений для оценки клиентов без возможности отказа согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1798,
    "code": "ZAPOPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Обработка чувствительных данных без согласия по Закону ЮАР о защите личной информации (POPIA)",
    "description": "Сайт собирает конфиденциальные сведения (здоровье, убеждения, финансы) без активного согласия согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1799,
    "code": "ZAPOPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие оценки воздействия на защиту данных по Закону ЮАР о защите личной информации (POPIA)",
    "description": "Организация не проводит обязательную оценку рисков безопасности (DPIA) для веб-профилирования согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1800,
    "code": "ZAPOPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Несоответствующее уведомление о сборе данных по Закону ЮАР о защите личной информации (POPIA)",
    "description": "Сайт собирает личные данные без предоставления соответствующего уведомления о конфиденциальности согласно Закону ЮАР о защите личной информации (POPIA).",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1801,
    "code": "TXSBB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1802,
    "code": "TXSBB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Ошибки аудита и записей",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1803,
    "code": "TXSBB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Недостатки дизайна интерфейса",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1804,
    "code": "TXSBB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Слабости криптографической защиты",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1805,
    "code": "TXSBB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Ошибки сканирования уязвимостей",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1806,
    "code": "TXSBB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Проблемы логирования согласия",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1807,
    "code": "TXSBB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Видимость ссылок отказа",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1808,
    "code": "TXSBB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Нарушение раскрытия информации",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1809,
    "code": "TXSBB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Проверка контролей аудита",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1810,
    "code": "TXSBB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Незарегистрированная деятельность брокера данных — Административные ключи доступа",
    "description": "Сайт продает данные пользователей третьим лицам без регистрации в реестре брокеров данных Техаса. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1811,
    "code": "WAHMHD-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1812,
    "code": "WAHMHD-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Ошибки аудита и записей",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1813,
    "code": "WAHMHD-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Недостатки дизайна интерфейса",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1814,
    "code": "WAHMHD-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Слабости криптографической защиты",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1815,
    "code": "WAHMHD-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Ошибки сканирования уязвимостей",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1816,
    "code": "WAHMHD-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Проблемы логирования согласия",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1817,
    "code": "WAHMHD-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Видимость ссылок отказа",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1818,
    "code": "WAHMHD-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Нарушение раскрытия информации",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1819,
    "code": "WAHMHD-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Проверка контролей аудита",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1820,
    "code": "WAHMHD-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Незаконный геофенсинг вокруг медицинских учреждений — Административные ключи доступа",
    "description": "Мобильное веб-приложение использует геофенсинг вокруг клиник для отслеживания поведения без согласия MHMDA. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1821,
    "code": "NYDFS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1822,
    "code": "NYDFS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Ошибки аудита и записей",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1823,
    "code": "NYDFS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Недостатки дизайна интерфейса",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1824,
    "code": "NYDFS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Слабости криптографической защиты",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1825,
    "code": "NYDFS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Ошибки сканирования уязвимостей",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1826,
    "code": "NYDFS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Проблемы логирования согласия",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1827,
    "code": "NYDFS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Видимость ссылок отказа",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1828,
    "code": "NYDFS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Нарушение раскрытия информации",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1829,
    "code": "NYDFS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Проверка контролей аудита",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1830,
    "code": "NYDFS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие финансовой сертификации кибербезопасности — Административные ключи доступа",
    "description": "Финансовый портал работает без ежегодных отчетов о соответствии кибербезопасности, требуемых New York DFS. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1831,
    "code": "PSD2-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA)",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1832,
    "code": "PSD2-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Ошибки аудита и записей",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1833,
    "code": "PSD2-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Недостатки дизайна интерфейса",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1834,
    "code": "PSD2-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Слабости криптографической защиты",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1835,
    "code": "PSD2-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Ошибки сканирования уязвимостей",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1836,
    "code": "PSD2-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Проблемы логирования согласия",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1837,
    "code": "PSD2-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Видимость ссылок отказа",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1838,
    "code": "PSD2-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Нарушение раскрытия информации",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1839,
    "code": "PSD2-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Проверка контролей аудита",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1840,
    "code": "PSD2-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Несоответствие строгой аутентификации клиентов (SCA) — Административные ключи доступа",
    "description": "Портал оплаты принимает платежи без обязательной многофакторной верификации, требуемой PSD2 в ЕС. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1841,
    "code": "PCISC-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI).",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1842,
    "code": "PCISC-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Ошибки аудита и записей",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1843,
    "code": "PCISC-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Недостатки дизайна интерфейса",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1844,
    "code": "PCISC-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Слабости криптографической защиты",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1845,
    "code": "PCISC-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Ошибки сканирования уязвимостей",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1846,
    "code": "PCISC-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Проблемы логирования согласия",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1847,
    "code": "PCISC-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Видимость ссылок отказа",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1848,
    "code": "PCISC-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Нарушение раскрытия информации",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1849,
    "code": "PCISC-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Проверка контролей аудита",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1850,
    "code": "PCISC-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Недостаточный контроль целостности скриптов — Административные ключи доступа",
    "description": "Страница оплаты загружает внешние JavaScript-модули без активной проверки subresource integrity (SRI). Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1851,
    "code": "GLBAS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1852,
    "code": "GLBAS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Ошибки аудита и записей",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1853,
    "code": "GLBAS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Недостатки дизайна интерфейса",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1854,
    "code": "GLBAS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Слабости криптографической защиты",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1855,
    "code": "GLBAS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Ошибки сканирования уязвимостей",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1856,
    "code": "GLBAS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Проблемы логирования согласия",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1857,
    "code": "GLBAS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Видимость ссылок отказа",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1858,
    "code": "GLBAS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Нарушение раскрытия информации",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1859,
    "code": "GLBAS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Проверка контролей аудита",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1860,
    "code": "GLBAS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие защиты при передаче финансовых данных — Административные ключи доступа",
    "description": "Форма заявки на кредит передает кредитные отчеты и SSN без надежного шифрования транспортного уровня. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1861,
    "code": "FTCDP-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1862,
    "code": "FTCDP-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Ошибки аудита и записей",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1863,
    "code": "FTCDP-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Недостатки дизайна интерфейса",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1864,
    "code": "FTCDP-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Слабости криптографической защиты",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1865,
    "code": "FTCDP-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Ошибки сканирования уязвимостей",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1866,
    "code": "FTCDP-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Проблемы логирования согласия",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1867,
    "code": "FTCDP-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Видимость ссылок отказа",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1868,
    "code": "FTCDP-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Нарушение раскрытия информации",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1869,
    "code": "FTCDP-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Проверка контролей аудита",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1870,
    "code": "FTCDP-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Фиктивные первоначальные скидки на товары — Административные ключи доступа",
    "description": "В каталоге отображаются перечеркнутые цены, которые не отражают исторические продажи, вводя покупателей в заблуждение. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1871,
    "code": "FTCCC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1872,
    "code": "FTCCC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Ошибки аудита и записей",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1873,
    "code": "FTCCC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Недостатки дизайна интерфейса",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1874,
    "code": "FTCCC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Слабости криптографической защиты",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1875,
    "code": "FTCCC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Ошибки сканирования уязвимостей",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1876,
    "code": "FTCCC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Проблемы логирования согласия",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1877,
    "code": "FTCCC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Видимость ссылок отказа",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1878,
    "code": "FTCCC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Нарушение раскрытия информации",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1879,
    "code": "FTCCC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Проверка контролей аудита",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1880,
    "code": "FTCCC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Сложный процесс отмены подписки в кабинете — Административные ключи доступа",
    "description": "Портал требует от пользователей звонить по телефону поддержки для прекращения регулярных списаний с карты. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1881,
    "code": "FTCFR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1882,
    "code": "FTCFR-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Ошибки аудита и записей",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1883,
    "code": "FTCFR-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Недостатки дизайна интерфейса",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1884,
    "code": "FTCFR-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Слабости криптографической защиты",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1885,
    "code": "FTCFR-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Ошибки сканирования уязвимостей",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1886,
    "code": "FTCFR-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Проблемы логирования согласия",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1887,
    "code": "FTCFR-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Видимость ссылок отказа",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1888,
    "code": "FTCFR-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Нарушение раскрытия информации",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1889,
    "code": "FTCFR-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Проверка контролей аудита",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1890,
    "code": "FTCFR-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Нераскрытые компенсированные отзывы клиентов — Административные ключи доступа",
    "description": "В рейтингах товаров отображаются проплаченные отзывы без указания того, что авторы получили промо-бонусы за оценку. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1891,
    "code": "EUDOR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1892,
    "code": "EUDOR-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Ошибки аудита и записей",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1893,
    "code": "EUDOR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Недостатки дизайна интерфейса",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1894,
    "code": "EUDOR-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Слабости криптографической защиты",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1895,
    "code": "EUDOR-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Ошибки сканирования уязвимостей",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1896,
    "code": "EUDOR-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Проблемы логирования согласия",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1897,
    "code": "EUDOR-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Видимость ссылок отказа",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1898,
    "code": "EUDOR-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Нарушение раскрытия информации",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1899,
    "code": "EUDOR-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Проверка контролей аудита",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1900,
    "code": "EUDOR-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об ИТ-уязвимостях по DORA — Административные ключи доступа",
    "description": "Банковский веб-интерфейс работает без документированных еженедельных отчетов об уязвимостях по DORA. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1901,
    "code": "EUCTA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1902,
    "code": "EUCTA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Ошибки аудита и записей",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1903,
    "code": "EUCTA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Недостатки дизайна интерфейса",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1904,
    "code": "EUCTA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Слабости криптографической защиты",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1905,
    "code": "EUCTA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Ошибки сканирования уязвимостей",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1906,
    "code": "EUCTA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Проблемы логирования согласия",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1907,
    "code": "EUCTA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Видимость ссылок отказа",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1908,
    "code": "EUCTA-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Нарушение раскрытия информации",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1909,
    "code": "EUCTA-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Проверка контролей аудита",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1910,
    "code": "EUCTA-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие сведений о бенефициарах в футере — Административные ключи доступа",
    "description": "В футере корпоративного профиля отсутствуют сведения, раскрывающие конечных бенефициаров и их регистрационные ID. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1911,
    "code": "WCAG2-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1912,
    "code": "WCAG2-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Ошибки аудита и записей",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1913,
    "code": "WCAG2-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Недостатки дизайна интерфейса",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1914,
    "code": "WCAG2-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Слабости криптографической защиты",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1915,
    "code": "WCAG2-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Ошибки сканирования уязвимостей",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1916,
    "code": "WCAG2-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Проблемы логирования согласия",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1917,
    "code": "WCAG2-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Видимость ссылок отказа",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1918,
    "code": "WCAG2-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Нарушение раскрытия информации",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1919,
    "code": "WCAG2-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Проверка контролей аудита",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1920,
    "code": "WCAG2-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недостаточный размер кликабельной области кнопки — Административные ключи доступа",
    "description": "Интерактивные кнопки имеют размер области клика менее 24x24 пикселей, мешая маломобильным пользователям. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1921,
    "code": "EAAAX-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1922,
    "code": "EAAAX-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Ошибки аудита и записей",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1923,
    "code": "EAAAX-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Недостатки дизайна интерфейса",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1924,
    "code": "EAAAX-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Слабости криптографической защиты",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1925,
    "code": "EAAAX-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Ошибки сканирования уязвимостей",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1926,
    "code": "EAAAX-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Проблемы логирования согласия",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1927,
    "code": "EAAAX-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Видимость ссылок отказа",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1928,
    "code": "EAAAX-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Нарушение раскрытия информации",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1929,
    "code": "EAAAX-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Проверка контролей аудита",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1930,
    "code": "EAAAX-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Недоступные элементы оплаты в интернет-магазине по EAA — Административные ключи доступа",
    "description": "Формы оплаты интернет-магазина не поддерживают голосовую навигацию для чтения с экрана, требуемую EAA в ЕС. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1931,
    "code": "ONADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1932,
    "code": "ONADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Ошибки аудита и записей",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1933,
    "code": "ONADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Недостатки дизайна интерфейса",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1934,
    "code": "ONADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Слабости криптографической защиты",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1935,
    "code": "ONADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Ошибки сканирования уязвимостей",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1936,
    "code": "ONADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Проблемы логирования согласия",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1937,
    "code": "ONADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Видимость ссылок отказа",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1938,
    "code": "ONADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Нарушение раскрытия информации",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1939,
    "code": "ONADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Проверка контролей аудита",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1940,
    "code": "ONADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие канала обратной связи по доступности — Административные ключи доступа",
    "description": "На сайте отсутствует выделенный канал обратной связи для сообщения о барьерах доступности по AODA. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1941,
    "code": "SEC50-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1942,
    "code": "SEC50-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Ошибки аудита и записей",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1943,
    "code": "SEC50-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Недостатки дизайна интерфейса",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1944,
    "code": "SEC50-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Слабости криптографической защиты",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1945,
    "code": "SEC50-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Ошибки сканирования уязвимостей",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1946,
    "code": "SEC50-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Проблемы логирования согласия",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1947,
    "code": "SEC50-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Видимость ссылок отказа",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1948,
    "code": "SEC50-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Нарушение раскрытия информации",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1949,
    "code": "SEC50-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Проверка контролей аудита",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1950,
    "code": "SEC50-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Отсутствие субтитров в обучающих видеороликах — Административные ключи доступа",
    "description": "Встроенные видеоролики запускаются без синхронизированных текстовых субтитров для глухих пользователей. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1951,
    "code": "EEOC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1952,
    "code": "EEOC-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Ошибки аудита и записей",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1953,
    "code": "EEOC-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Недостатки дизайна интерфейса",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1954,
    "code": "EEOC-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Слабости криптографической защиты",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1955,
    "code": "EEOC-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Ошибки сканирования уязвимостей",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1956,
    "code": "EEOC-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Проблемы логирования согласия",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1957,
    "code": "EEOC-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Видимость ссылок отказа",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1958,
    "code": "EEOC-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Нарушение раскрытия информации",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1959,
    "code": "EEOC-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Проверка контролей аудита",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1960,
    "code": "EEOC-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Отсутствие аудита ИИ-алгоритмов найма персонала — Административные ключи доступа",
    "description": "Приложение отбирает профили кандидатов с помощью ИИ без проведения ежегодного независимого аудита предвзятости. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1961,
    "code": "BIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1962,
    "code": "BIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Ошибки аудита и записей",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1963,
    "code": "BIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Недостатки дизайна интерфейса",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1964,
    "code": "BIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Слабости криптографической защиты",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1965,
    "code": "BIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Ошибки сканирования уязвимостей",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1966,
    "code": "BIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Проблемы логирования согласия",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1967,
    "code": "BIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Видимость ссылок отказа",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1968,
    "code": "BIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Нарушение раскрытия информации",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1969,
    "code": "BIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Проверка контролей аудита",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1970,
    "code": "BIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Отсутствие биометрического согласия при примерке — Административные ключи доступа",
    "description": "Косметический портал запускает виртуальную примерку с сканированием лица без получения письменного согласия. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1971,
    "code": "CIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1972,
    "code": "CIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Ошибки аудита и записей",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1973,
    "code": "CIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Недостатки дизайна интерфейса",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1974,
    "code": "CIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Слабости криптографической защиты",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1975,
    "code": "CIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Ошибки сканирования уязвимостей",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1976,
    "code": "CIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Проблемы логирования согласия",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1977,
    "code": "CIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Видимость ссылок отказа",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1978,
    "code": "CIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Нарушение раскрытия информации",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1979,
    "code": "CIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Проверка контролей аудита",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1980,
    "code": "CIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Транскрипция чата в реальном времени без предупреждения — Административные ключи доступа",
    "description": "Скрипт чата выполняет текстовую транскрипцию и сохраняет диалоги без вывода предупреждения о записи по CIPA. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1981,
    "code": "LKSG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1982,
    "code": "LKSG-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Ошибки аудита и записей",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1983,
    "code": "LKSG-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Недостатки дизайна интерфейса",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1984,
    "code": "LKSG-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Слабости криптографической защиты",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1985,
    "code": "LKSG-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Ошибки сканирования уязвимостей",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1986,
    "code": "LKSG-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Проблемы логирования согласия",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1987,
    "code": "LKSG-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Видимость ссылок отказа",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1988,
    "code": "LKSG-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Нарушение раскрытия информации",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1989,
    "code": "LKSG-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Проверка контролей аудита",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1990,
    "code": "LKSG-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие канала подачи жалоб на нарушения прав человека — Административные ключи доступа",
    "description": "На корпоративном сайте нет общедоступного портала для подачи поставщиками жалоб на нарушения прав человека по LkSG. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1991,
    "code": "CSRD-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1992,
    "code": "CSRD-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Ошибки аудита и записей",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Недостаточные аудиторские следы не документируют изменения настроек.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1993,
    "code": "CSRD-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Недостатки дизайна интерфейса",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Интерфейсы пользователя используют компоненты, ограничивающие доступ или возможности выбора.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1994,
    "code": "CSRD-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Слабости криптографической защиты",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Алгоритмы хэширования или транспортное шифрование не соответствуют стандартам безопасности.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1995,
    "code": "CSRD-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Ошибки сканирования уязвимостей",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Автоматические средства сканирования уязвимостей не запускаются на веб-путях.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1996,
    "code": "CSRD-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Проблемы логирования согласия",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Системы ведения логов не сохраняют выборы пользователей в постоянный реестр.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1997,
    "code": "CSRD-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Видимость ссылок отказа",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. В футере отсутствуют заметные ссылки, позволяющие пользователям отказаться от отслеживания.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1998,
    "code": "CSRD-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Нарушение раскрытия информации",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Раскрытие информации не описывает четко цели и объемы обработки файлов.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1999,
    "code": "CSRD-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Проверка контролей аудита",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Передача данных происходит без автоматических проверок целостности записей.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 2000,
    "code": "CSRD-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Отсутствие отчетов об устойчивом развитии по CSRD — Административные ключи доступа",
    "description": "Корпоративный портал не публикует ежегодные аудиты устойчивого развития в машиночитаемом цифровом формате. Административные консоли допускают простые входы без требования ключей MFA.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  }
];
