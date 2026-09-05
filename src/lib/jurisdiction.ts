/**
 * Настоящая юрисдикция проверки — по её коду.
 *
 * ПРОБЛЕМА, которую это решает. В реестре десять категорий, и они не
 * соответствуют содержимому: 633 неевропейских закона (Китай, Россия,
 * Саудовская Аравия, Кения, Израиль, Индия, Япония, Корея, Бразилия) лежат в
 * категории «GDPR», а 169 латиноамериканских — в «CCPA». Клиент из Бразилии
 * видит в отчёте «GDPR» и не понимает, что проверка вообще-то про его LGPD.
 *
 * ПОЧЕМУ НЕ ПЕРЕПИСАЛИ САМ РЕЕСТР. Категория — это перечисление в типах, на
 * него завязаны цвета, фильтры и справочник законов. Менять её значит трогать
 * 8000 записей в четырёх языковых файлах и весь код вокруг. Цена ошибки —
 * сломанный отчёт у клиента, а выигрыш тот же самый.
 *
 * ЧТО СДЕЛАНО ВМЕСТО. Код проверки уже несёт юрисдикцию в себе: BRLGPD-004 —
 * это Бразилия, INDPDP-002 — Индия, CHNPD-007 — Китай. Здесь эти префиксы
 * разобраны в понятные названия страны и закона. Реестр не тронут, а в отчёте
 * рядом с каждой находкой встаёт её настоящая норма.
 */

export type Jurisdiction = {
  /** Страна или объединение — как это назвал бы человек. */
  region: string;
  /** Официальное название закона. */
  law: string;
  /** Флаг для беглого взгляда в списке. */
  flag: string;
};

const MAP: Record<string, Jurisdiction> = {
  // ── Европейский союз и ядро ──────────────────────────────────────────────
  GDPR: { region: 'Европейский союз', law: 'GDPR (Регламент 2016/679)', flag: '🇪🇺' },
  EPRIV: { region: 'Европейский союз', law: 'Директива ePrivacy 2002/58/EC', flag: '🇪🇺' },
  CKWL: { region: 'Европейский союз', law: 'ePrivacy — cookie-стены', flag: '🇪🇺' },
  CBAC: { region: 'Европейский союз', law: 'ePrivacy — согласие на cookie', flag: '🇪🇺' },
  EUAIA: { region: 'Европейский союз', law: 'Закон об ИИ (Регламент 2024/1689)', flag: '🇪🇺' },
  EUAI: { region: 'Европейский союз', law: 'Закон об ИИ', flag: '🇪🇺' },
  EUDSA: { region: 'Европейский союз', law: 'Закон о цифровых услугах (DSA)', flag: '🇪🇺' },
  EUDMA: { region: 'Европейский союз', law: 'Закон о цифровых рынках (DMA)', flag: '🇪🇺' },
  EUDOR: { region: 'Европейский союз', law: 'DORA (Регламент 2022/2554)', flag: '🇪🇺' },
  EUDAT: { region: 'Европейский союз', law: 'Закон о данных (2023/2854)', flag: '🇪🇺' },
  EUCTA: { region: 'Европейский союз', law: 'Директивы о прозрачности и ПОД', flag: '🇪🇺' },
  EIDS: { region: 'Европейский союз', law: 'eIDAS 2.0 (2024/1183)', flag: '🇪🇺' },
  NIS2: { region: 'Европейский союз', law: 'NIS2 (Директива 2022/2555)', flag: '🇪🇺' },
  PSD2: { region: 'Европейский союз', law: 'PSD2 — платёжные услуги', flag: '🇪🇺' },
  CSRD: { region: 'Европейский союз', law: 'CSRD — отчётность об устойчивости', flag: '🇪🇺' },
  EAA: { region: 'Европейский союз', law: 'Акт о доступности (2019/882)', flag: '🇪🇺' },
  EAAAX: { region: 'Европейский союз', law: 'Акт о доступности (2019/882)', flag: '🇪🇺' },

  // ── Отдельные страны Европы ──────────────────────────────────────────────
  UKGDPR: { region: 'Великобритания', law: 'UK GDPR / DPA 2018', flag: '🇬🇧' },
  UKAAC: { region: 'Великобритания', law: 'Кодекс о детях (ICO)', flag: '🇬🇧' },
  UKOSA: { region: 'Великобритания', law: 'Закон о безопасности в сети 2023', flag: '🇬🇧' },
  TDDDG: { region: 'Германия', law: 'TDDDG § 25 (телемедиа)', flag: '🇩🇪' },
  LKSG: { region: 'Германия', law: 'Закон о цепочках поставок (LkSG)', flag: '🇩🇪' },
  SWSPD: { region: 'Швейцария', law: 'revFADP (Закон о защите данных)', flag: '🇨🇭' },
  CHFADP: { region: 'Швейцария', law: 'revFADP (Закон о защите данных)', flag: '🇨🇭' },
  NORPD: { region: 'Норвегия', law: 'Personopplysningsloven', flag: '🇳🇴' },
  ISLPD: { region: 'Исландия', law: 'Закон о защите данных 90/2018', flag: '🇮🇸' },
  TURPD: { region: 'Турция', law: 'KVKK № 6698', flag: '🇹🇷' },
  TRKV: { region: 'Турция', law: 'KVKK № 6698', flag: '🇹🇷' },
  UKRPD: { region: 'Украина', law: 'Закон о защите персональных данных', flag: '🇺🇦' },
  RUSPD: { region: 'Россия', law: '152-ФЗ «О персональных данных»', flag: '🇷🇺' },

  // ── Америка ──────────────────────────────────────────────────────────────
  CCPA: { region: 'США · Калифорния', law: 'CCPA/CPRA', flag: '🇺🇸' },
  CAAAC: { region: 'США · Калифорния', law: 'Кодекс о детях (AB 2273)', flag: '🇺🇸' },
  CIPAX: { region: 'США · Калифорния', law: 'CIPA — прослушивание', flag: '🇺🇸' },
  STATE: { region: 'США · штаты', law: 'CIPA и законы о прослушивании', flag: '🇺🇸' },
  VCDPA: { region: 'США · Виргиния', law: 'VCDPA', flag: '🇺🇸' },
  COPR: { region: 'США · Колорадо', law: 'Colorado Privacy Act', flag: '🇺🇸' },
  CTDPA: { region: 'США · Коннектикут', law: 'CTDPA', flag: '🇺🇸' },
  UCPA: { region: 'США · Юта', law: 'UCPA', flag: '🇺🇸' },
  TXDPS: { region: 'США · Техас', law: 'TDPSA', flag: '🇺🇸' },
  TXSBB: { region: 'США · Техас', law: 'SB 2105 — реестр брокеров данных', flag: '🇺🇸' },
  ORCPA: { region: 'США · Орегон', law: 'Oregon Consumer Privacy Act', flag: '🇺🇸' },
  FLORDB: { region: 'США · Флорида', law: 'Digital Bill of Rights', flag: '🇺🇸' },
  BIPAX: { region: 'США · Иллинойс', law: 'BIPA — биометрия', flag: '🇺🇸' },
  NYDFS: { region: 'США · Нью-Йорк', law: '23 NYCRR 500', flag: '🇺🇸' },
  WAHMHD: { region: 'США · Вашингтон', law: 'My Health My Data Act', flag: '🇺🇸' },
  MHMDA: { region: 'США · Вашингтон', law: 'My Health My Data Act', flag: '🇺🇸' },
  HIPAA: { region: 'США', law: 'HIPAA — медицинские данные', flag: '🇺🇸' },
  FTC: { region: 'США', law: 'Закон о ФТК, статья 5', flag: '🇺🇸' },
  FTCDP: { region: 'США', law: 'ФТК — обманчивое ценообразование', flag: '🇺🇸' },
  FTCCC: { region: 'США', law: 'ФТК — правило «отписаться в один клик»', flag: '🇺🇸' },
  FTCFR: { region: 'США', law: 'ФТК — поддельные отзывы', flag: '🇺🇸' },
  TCPA: { region: 'США', law: 'TCPA — телефон и рассылки', flag: '🇺🇸' },
  GLBAS: { region: 'США', law: 'GLBA — правило защиты (Safeguards)', flag: '🇺🇸' },
  FIN: { region: 'США', law: 'GLBA / финансовое регулирование', flag: '🇺🇸' },
  SEC50: { region: 'США', law: 'Раздел 508 Закона о реабилитации', flag: '🇺🇸' },
  ADA: { region: 'США', law: 'ADA, раздел III (доступность)', flag: '🇺🇸' },
  AADA: { region: 'США', law: 'ADA / WCAG 2.2', flag: '🇺🇸' },
  COP: { region: 'США', law: 'COPPA — дети до 13 лет', flag: '🇺🇸' },
  FERP: { region: 'США', law: 'FERPA — учебные записи', flag: '🇺🇸' },
  VPPA: { region: 'США', law: 'VPPA — видеопросмотры', flag: '🇺🇸' },
  COAI: { region: 'США · Колорадо', law: 'Закон об ИИ (SB 24-205)', flag: '🇺🇸' },
  EEOC: { region: 'США · Нью-Йорк', law: 'Local Law 144 — ИИ в найме', flag: '🇺🇸' },
  PIPEDA: { region: 'Канада', law: 'PIPEDA', flag: '🇨🇦' },
  LAW25: { region: 'Канада · Квебек', law: 'Закон 25', flag: '🇨🇦' },
  ONADA: { region: 'Канада · Онтарио', law: 'AODA', flag: '🇨🇦' },
  AODA: { region: 'Канада · Онтарио', law: 'AODA', flag: '🇨🇦' },
  BRLGPD: { region: 'Бразилия', law: 'LGPD (Закон 13.709/2018)', flag: '🇧🇷' },
  MXPD: { region: 'Мексика', law: 'LFPDPPP', flag: '🇲🇽' },
  ARGPD: { region: 'Аргентина', law: 'Закон 25.326', flag: '🇦🇷' },
  COLPD: { region: 'Колумбия', law: 'Закон 1581/2012', flag: '🇨🇴' },
  CHLPD: { region: 'Чили', law: 'Закон 19.628', flag: '🇨🇱' },
  PERPD: { region: 'Перу', law: 'Закон 29733', flag: '🇵🇪' },
  URYPD: { region: 'Уругвай', law: 'Закон 18.331', flag: '🇺🇾' },
  ECUPD: { region: 'Эквадор', law: 'LOPDP', flag: '🇪🇨' },
  CRIAP: { region: 'Коста-Рика', law: 'Закон 8968', flag: '🇨🇷' },
  PANPD: { region: 'Панама', law: 'Закон 81/2019', flag: '🇵🇦' },

  // ── Азия и Океания ───────────────────────────────────────────────────────
  INDPDP: { region: 'Индия', law: 'DPDP Act 2023', flag: '🇮🇳' },
  CHNPD: { region: 'Китай', law: 'PIPL', flag: '🇨🇳' },
  JPAPPI: { region: 'Япония', law: 'APPI', flag: '🇯🇵' },
  KRPIPA: { region: 'Южная Корея', law: 'PIPA', flag: '🇰🇷' },
  SGPDPA: { region: 'Сингапур', law: 'PDPA', flag: '🇸🇬' },
  IDNPD: { region: 'Индонезия', law: 'Закон о защите персональных данных', flag: '🇮🇩' },
  VNDPD: { region: 'Вьетнам', law: 'Декрет 13/2023', flag: '🇻🇳' },
  THPDPA: { region: 'Таиланд', law: 'PDPA', flag: '🇹🇭' },
  PHLPD: { region: 'Филиппины', law: 'Data Privacy Act', flag: '🇵🇭' },
  MYPD: { region: 'Малайзия', law: 'PDPA', flag: '🇲🇾' },
  TWNPD: { region: 'Тайвань', law: 'PDPA', flag: '🇹🇼' },
  HKGPD: { region: 'Гонконг', law: 'PDPO', flag: '🇭🇰' },
  MACPD: { region: 'Макао', law: 'Закон 8/2005', flag: '🇲🇴' },
  NPLPD: { region: 'Непал', law: 'Закон о приватности 2018', flag: '🇳🇵' },
  KAZPD: { region: 'Казахстан', law: 'Закон о персональных данных', flag: '🇰🇿' },
  UZBPD: { region: 'Узбекистан', law: 'Закон о персональных данных', flag: '🇺🇿' },
  MNGPD: { region: 'Монголия', law: 'Закон о персональных данных', flag: '🇲🇳' },
  AUSAPP: { region: 'Австралия', law: 'Privacy Act — APPs', flag: '🇦🇺' },
  AUSPA: { region: 'Австралия', law: 'Spam Act 2003', flag: '🇦🇺' },
  NZPRIV: { region: 'Новая Зеландия', law: 'Privacy Act 2020', flag: '🇳🇿' },

  // ── Ближний Восток и Африка ──────────────────────────────────────────────
  UAEPD: { region: 'ОАЭ', law: 'PDPL (Федеральный закон 45/2021)', flag: '🇦🇪' },
  SAUPD: { region: 'Саудовская Аравия', law: 'PDPL', flag: '🇸🇦' },
  ISRPA: { region: 'Израиль', law: 'Закон о защите приватности', flag: '🇮🇱' },
  EGYPD: { region: 'Египет', law: 'Закон 151/2020', flag: '🇪🇬' },
  ZAPOPI: { region: 'ЮАР', law: 'POPIA', flag: '🇿🇦' },
  NDPA: { region: 'Нигерия', law: 'NDPA 2023', flag: '🇳🇬' },
  NGAPD: { region: 'Нигерия', law: 'NDPA 2023', flag: '🇳🇬' },
  KENPD: { region: 'Кения', law: 'Data Protection Act 2019', flag: '🇰🇪' },

  // ── Международные стандарты (не привязаны к стране) ──────────────────────
  PCI: { region: 'Международный стандарт', law: 'PCI DSS v4.0', flag: '🌐' },
  PCISC: { region: 'Международный стандарт', law: 'PCI Security Standards Council', flag: '🌐' },
  OWASP: { region: 'Международный стандарт', law: 'OWASP Top 10', flag: '🌐' },
  NISTP: { region: 'Международный стандарт', law: 'NIST SP 800-53', flag: '🌐' },
  NIST: { region: 'Международный стандарт', law: 'NIST', flag: '🌐' },
  ISO27: { region: 'Международный стандарт', law: 'ISO/IEC 27001:2022', flag: '🌐' },
  SOC2P: { region: 'Международный стандарт', law: 'SOC 2 (Trust Services)', flag: '🌐' },
  SOC2: { region: 'Международный стандарт', law: 'SOC 2', flag: '🌐' },
  CISA: { region: 'Международный стандарт', law: 'CISA — базовые цели', flag: '🌐' },
  WCAG2: { region: 'Международный стандарт', law: 'WCAG 2.2 AA', flag: '🌐' },
  W3CR: { region: 'Международный стандарт', law: 'Рекомендации W3C', flag: '🌐' },
  OPS: { region: 'Международный стандарт', law: 'Почтовые стандарты (SPF/DKIM/DMARC)', flag: '🌐' },

  // ── Наши собственные доказуемые проверки ─────────────────────────────────
  SEC: { region: 'Наша проверка', law: 'Базовая безопасность (доказано кодом)', flag: '🔎' },
  PRIV: { region: 'Наша проверка', law: 'Приватность (доказано кодом)', flag: '🔎' },
  DNS: { region: 'Наша проверка', law: 'Защита почты домена (доказано кодом)', flag: '🔎' },
  SUPPLY: { region: 'Наша проверка', law: 'Цепочка поставок кода (доказано кодом)', flag: '🔎' },
  A11Y: { region: 'Наша проверка', law: 'Доступность (доказано кодом)', flag: '🔎' },
  EUODR: { region: 'Европейский союз', law: 'Регламент 2024/3228 (платформа споров)', flag: '🇪🇺' },
  COOKIE: { region: 'Европейский союз', law: 'ePrivacy — срок жизни cookie', flag: '🇪🇺' },
  XFER: { region: 'Европейский союз', law: 'Трансграничная передача (Schrems II)', flag: '🇪🇺' },
  OPSX: { region: 'Наша проверка', law: 'Эксплуатация (доказано кодом)', flag: '🔎' },
  // Проверки, добавленные после первой сборки карты. Без них отчёт писал бы
  // «Общая практика» там, где за нарушением стоит конкретный закон конкретной
  // страны, — а именно закон и объясняет клиенту, почему это важно.
  GPC: { region: 'США (12 штатов)', law: 'Universal opt-out / Global Privacy Control (CCPA § 7025 и аналоги)', flag: '🇺🇸' },
  IMPR: { region: 'Европейский союз', law: 'Директива об электронной торговле 2000/31/EC, ст. 5 (сведения о продавце)', flag: '🇪🇺' },
  TRUTH: { region: 'Европейский союз', law: 'GDPR, гл. V (передача данных за пределы ЕС)', flag: '🇪🇺' },
  AIACT: { region: 'Европейский союз', law: 'Регламент об искусственном интеллекте (AI Act), ст. 50', flag: '🇪🇺' },
  EXPO: { region: 'Общая практика', law: 'OWASP A05: небезопасная конфигурация', flag: '🌐' },
};


/** Определяет юрисдикцию по коду проверки. Никогда не бросает исключений. */
export function jurisdictionOf(code: string): Jurisdiction {
  const prefix = String(code || '').split('-')[0].toUpperCase();
  if (MAP[prefix]) return MAP[prefix];
  // Коды вида SEC-TLS-001 и OPS-ROBOTS-001 — берём первую часть.
  const short = prefix.replace(/[0-9]+$/, '');
  if (MAP[short]) return MAP[short];
  return { region: 'Общая практика', law: 'Отраслевой стандарт', flag: '🌐' };
}

/** Сколько разных стран и режимов затронуто набором находок. */
export function jurisdictionSummary(codes: string[]): Array<{ region: string; flag: string; count: number }> {
  const acc = new Map<string, { region: string; flag: string; count: number }>();
  for (const c of codes) {
    const j = jurisdictionOf(c);
    const cur = acc.get(j.region);
    if (cur) cur.count += 1;
    else acc.set(j.region, { region: j.region, flag: j.flag, count: 1 });
  }
  return Array.from(acc.values()).sort((a, b) => b.count - a.count);
}

/**
 * ПОДПИСИ ЮРИСДИКЦИЙ НА ЯЗЫКЕ ОТЧЁТА.
 *
 * Они попадают в отчёт отдельно от самих находок, поэтому перевод находок их
 * не затрагивал: англоязычный клиент видел «Наша проверка» и «Базовая
 * безопасность» посреди английского текста — ровно в той графе, по которой он
 * решает, насколько серьёзно к отчёту относиться.
 *
 * Переводятся только НАЗВАНИЯ. Коды (SEC, PRIV, DNS…) остаются как есть: по
 * ним идёт группировка, и перевод кода сломал бы сводку.
 */
const ПОДПИСИ: Record<string, Record<string, string>> = {
  "Австралия": {
    "en": "Australia",
    "es": "Australia",
    "zh": "澳大利亚"
  },
  "Аргентина": {
    "en": "Argentina",
    "es": "Argentina",
    "zh": "阿根廷"
  },
  "Бразилия": {
    "en": "Brazil",
    "es": "Brasil",
    "zh": "巴西"
  },
  "Великобритания": {
    "en": "United Kingdom",
    "es": "Reino Unido",
    "zh": "英国"
  },
  "Вьетнам": {
    "en": "Vietnam",
    "es": "Vietnam",
    "zh": "越南"
  },
  "Германия": {
    "en": "Germany",
    "es": "Alemania",
    "zh": "德国"
  },
  "Гонконг": {
    "en": "Hong Kong",
    "es": "Hong Kong",
    "zh": "香港"
  },
  "Египет": {
    "en": "Egypt",
    "es": "Egipto",
    "zh": "埃及"
  },
  "Израиль": {
    "en": "Israel",
    "es": "Israel",
    "zh": "以色列"
  },
  "Индия": {
    "en": "India",
    "es": "India",
    "zh": "印度"
  },
  "Индонезия": {
    "en": "Indonesia",
    "es": "Indonesia",
    "zh": "印度尼西亚"
  },
  "Исландия": {
    "en": "Iceland",
    "es": "Islandia",
    "zh": "冰岛"
  },
  "Казахстан": {
    "en": "Kazakhstan",
    "es": "Kazajistán",
    "zh": "哈萨克斯坦"
  },
  "Канада": {
    "en": "Canada",
    "es": "Canadá",
    "zh": "加拿大"
  },
  "Канада · Квебек": {
    "en": "Canada · Quebec",
    "es": "Canadá · Quebec",
    "zh": "加拿大 · 魁北克"
  },
  "Канада · Онтарио": {
    "en": "Canada · Ontario",
    "es": "Canadá · Ontario",
    "zh": "加拿大 · 安大略"
  },
  "Кения": {
    "en": "Kenya",
    "es": "Kenia",
    "zh": "肯尼亚"
  },
  "Китай": {
    "en": "China",
    "es": "China",
    "zh": "中国"
  },
  "Колумбия": {
    "en": "Colombia",
    "es": "Colombia",
    "zh": "哥伦比亚"
  },
  "Коста-Рика": {
    "en": "Costa Rica",
    "es": "Costa Rica",
    "zh": "哥斯达黎加"
  },
  "Макао": {
    "en": "Macau",
    "es": "Macao",
    "zh": "澳门"
  },
  "Малайзия": {
    "en": "Malaysia",
    "es": "Malasia",
    "zh": "马来西亚"
  },
  "Мексика": {
    "en": "Mexico",
    "es": "México",
    "zh": "墨西哥"
  },
  "Монголия": {
    "en": "Mongolia",
    "es": "Mongolia",
    "zh": "蒙古"
  },
  "Непал": {
    "en": "Nepal",
    "es": "Nepal",
    "zh": "尼泊尔"
  },
  "Нигерия": {
    "en": "Nigeria",
    "es": "Nigeria",
    "zh": "尼日利亚"
  },
  "Новая Зеландия": {
    "en": "New Zealand",
    "es": "Nueva Zelanda",
    "zh": "新西兰"
  },
  "Норвегия": {
    "en": "Norway",
    "es": "Noruega",
    "zh": "挪威"
  },
  "ОАЭ": {
    "en": "UAE",
    "es": "EAU",
    "zh": "阿联酋"
  },
  "Общая практика": {
    "en": "General practice",
    "es": "Práctica general",
    "zh": "通行做法"
  },
  "Панама": {
    "en": "Panama",
    "es": "Panamá",
    "zh": "巴拿马"
  },
  "Перу": {
    "en": "Peru",
    "es": "Perú",
    "zh": "秘鲁"
  },
  "Россия": {
    "en": "Russia",
    "es": "Rusia",
    "zh": "俄罗斯"
  },
  "США": {
    "en": "USA",
    "es": "EE. UU.",
    "zh": "美国"
  },
  "США (12 штатов)": {
    "en": "USA (12 states)",
    "es": "EE. UU. (12 estados)",
    "zh": "美国（12 个州）"
  },
  "США · Вашингтон": {
    "en": "USA · Washington",
    "es": "EE. UU. · Washington",
    "zh": "美国 · 华盛顿州"
  },
  "США · Виргиния": {
    "en": "USA · Virginia",
    "es": "EE. UU. · Virginia",
    "zh": "美国 · 弗吉尼亚州"
  },
  "США · Иллинойс": {
    "en": "USA · Illinois",
    "es": "EE. UU. · Illinois",
    "zh": "美国 · 伊利诺伊州"
  },
  "США · Калифорния": {
    "en": "USA · California",
    "es": "EE. UU. · California",
    "zh": "美国 · 加利福尼亚州"
  },
  "США · Колорадо": {
    "en": "USA · Colorado",
    "es": "EE. UU. · Colorado",
    "zh": "美国 · 科罗拉多州"
  },
  "США · Коннектикут": {
    "en": "USA · Connecticut",
    "es": "EE. UU. · Connecticut",
    "zh": "美国 · 康涅狄格州"
  },
  "США · Нью-Йорк": {
    "en": "USA · New York",
    "es": "EE. UU. · Nueva York",
    "zh": "美国 · 纽约州"
  },
  "США · Орегон": {
    "en": "USA · Oregon",
    "es": "EE. UU. · Oregón",
    "zh": "美国 · 俄勒冈州"
  },
  "США · Техас": {
    "en": "USA · Texas",
    "es": "EE. UU. · Texas",
    "zh": "美国 · 得克萨斯州"
  },
  "США · Флорида": {
    "en": "USA · Florida",
    "es": "EE. UU. · Florida",
    "zh": "美国 · 佛罗里达州"
  },
  "США · Юта": {
    "en": "USA · Utah",
    "es": "EE. UU. · Utah",
    "zh": "美国 · 犹他州"
  },
  "США · штаты": {
    "en": "USA · states",
    "es": "EE. UU. · estados",
    "zh": "美国 · 各州"
  },
  "Саудовская Аравия": {
    "en": "Saudi Arabia",
    "es": "Arabia Saudita",
    "zh": "沙特阿拉伯"
  },
  "Сингапур": {
    "en": "Singapore",
    "es": "Singapur",
    "zh": "新加坡"
  },
  "Таиланд": {
    "en": "Thailand",
    "es": "Tailandia",
    "zh": "泰国"
  },
  "Тайвань": {
    "en": "Taiwan",
    "es": "Taiwán",
    "zh": "台湾"
  },
  "Турция": {
    "en": "Türkiye",
    "es": "Turquía",
    "zh": "土耳其"
  },
  "Узбекистан": {
    "en": "Uzbekistan",
    "es": "Uzbekistán",
    "zh": "乌兹别克斯坦"
  },
  "Украина": {
    "en": "Ukraine",
    "es": "Ucrania",
    "zh": "乌克兰"
  },
  "Уругвай": {
    "en": "Uruguay",
    "es": "Uruguay",
    "zh": "乌拉圭"
  },
  "Филиппины": {
    "en": "Philippines",
    "es": "Filipinas",
    "zh": "菲律宾"
  },
  "Чили": {
    "en": "Chile",
    "es": "Chile",
    "zh": "智利"
  },
  "Швейцария": {
    "en": "Switzerland",
    "es": "Suiza",
    "zh": "瑞士"
  },
  "Эквадор": {
    "en": "Ecuador",
    "es": "Ecuador",
    "zh": "厄瓜多尔"
  },
  "ЮАР": {
    "en": "South Africa",
    "es": "Sudáfrica",
    "zh": "南非"
  },
  "Южная Корея": {
    "en": "South Korea",
    "es": "Corea del Sur",
    "zh": "韩国"
  },
  "Япония": {
    "en": "Japan",
    "es": "Japón",
    "zh": "日本"
  },
  "152-ФЗ «О персональных данных»": {
    "en": "Federal Law 152-FZ on Personal Data",
    "es": "Ley Federal 152-FZ sobre datos personales",
    "zh": "第152号联邦法《个人数据法》"
  },
  "ADA, раздел III (доступность)": {
    "en": "ADA, Title III (accessibility)",
    "es": "ADA, Título III (accesibilidad)",
    "zh": "ADA 第三章（无障碍）"
  },
  "BIPA — биометрия": {
    "en": "BIPA — biometrics",
    "es": "BIPA — biometría",
    "zh": "BIPA — 生物识别"
  },
  "CIPA и законы о прослушивании": {
    "en": "CIPA and wiretapping laws",
    "es": "CIPA y leyes de escuchas",
    "zh": "CIPA 与窃听相关法律"
  },
  "CIPA — прослушивание": {
    "en": "CIPA — wiretapping",
    "es": "CIPA — escuchas",
    "zh": "CIPA — 窃听"
  },
  "CISA — базовые цели": {
    "en": "CISA — baseline goals",
    "es": "CISA — objetivos básicos",
    "zh": "CISA — 基线目标"
  },
  "COPPA — дети до 13 лет": {
    "en": "COPPA — children under 13",
    "es": "COPPA — menores de 13 años",
    "zh": "COPPA — 13 岁以下儿童"
  },
  "CSRD — отчётность об устойчивости": {
    "en": "CSRD — sustainability reporting",
    "es": "CSRD — informes de sostenibilidad",
    "zh": "CSRD — 可持续发展报告"
  },
  "DORA (Регламент 2022/2554)": {
    "en": "DORA (Regulation 2022/2554)",
    "es": "DORA (Reglamento 2022/2554)",
    "zh": "DORA（2022/2554 号条例）"
  },
  "FERPA — учебные записи": {
    "en": "FERPA — education records",
    "es": "FERPA — registros educativos",
    "zh": "FERPA — 教育记录"
  },
  "GDPR (Регламент 2016/679)": {
    "en": "GDPR (Regulation 2016/679)",
    "es": "RGPD (Reglamento 2016/679)",
    "zh": "GDPR（2016/679 号条例）"
  },
  "GDPR, гл. V (передача данных за пределы ЕС)": {
    "en": "GDPR, Ch. V (transfers outside the EU)",
    "es": "RGPD, cap. V (transferencias fuera de la UE)",
    "zh": "GDPR 第五章（向欧盟境外传输数据）"
  },
  "GLBA / финансовое регулирование": {
    "en": "GLBA / financial regulation",
    "es": "GLBA / regulación financiera",
    "zh": "GLBA / 金融监管"
  },
  "GLBA — правило защиты (Safeguards)": {
    "en": "GLBA — Safeguards Rule",
    "es": "GLBA — Regla de Salvaguardas",
    "zh": "GLBA — 保障规则"
  },
  "HIPAA — медицинские данные": {
    "en": "HIPAA — health data",
    "es": "HIPAA — datos médicos",
    "zh": "HIPAA — 医疗数据"
  },
  "LGPD (Закон 13.709/2018)": {
    "en": "LGPD (Law 13.709/2018)",
    "es": "LGPD (Ley 13.709/2018)",
    "zh": "LGPD（第13.709/2018号法）"
  },
  "Local Law 144 — ИИ в найме": {
    "en": "Local Law 144 — AI in hiring",
    "es": "Local Law 144 — IA en contratación",
    "zh": "第144号地方法 — 招聘中的人工智能"
  },
  "NIS2 (Директива 2022/2555)": {
    "en": "NIS2 (Directive 2022/2555)",
    "es": "NIS2 (Directiva 2022/2555)",
    "zh": "NIS2（2022/2555 号指令）"
  },
  "OWASP A05: небезопасная конфигурация": {
    "en": "OWASP A05: security misconfiguration",
    "es": "OWASP A05: configuración insegura",
    "zh": "OWASP A05：安全配置错误"
  },
  "PDPL (Федеральный закон 45/2021)": {
    "en": "PDPL (Federal Law 45/2021)",
    "es": "PDPL (Ley Federal 45/2021)",
    "zh": "PDPL（第45/2021号联邦法）"
  },
  "PSD2 — платёжные услуги": {
    "en": "PSD2 — payment services",
    "es": "PSD2 — servicios de pago",
    "zh": "PSD2 — 支付服务"
  },
  "SB 2105 — реестр брокеров данных": {
    "en": "SB 2105 — data broker registry",
    "es": "SB 2105 — registro de intermediarios de datos",
    "zh": "SB 2105 — 数据经纪商登记"
  },
  "TCPA — телефон и рассылки": {
    "en": "TCPA — calls and messaging",
    "es": "TCPA — llamadas y mensajes",
    "zh": "TCPA — 电话与群发"
  },
  "TDDDG § 25 (телемедиа)": {
    "en": "TDDDG § 25 (telemedia)",
    "es": "TDDDG § 25 (telemedios)",
    "zh": "TDDDG 第25条（远程媒体）"
  },
  "Universal opt-out / Global Privacy Control (CCPA § 7025 и аналоги)": {
    "en": "Universal opt-out / Global Privacy Control (CCPA § 7025 and analogues)",
    "es": "Exclusión universal / Global Privacy Control (CCPA § 7025 y análogos)",
    "zh": "通用退出 / Global Privacy Control（CCPA 第7025条及类似规定）"
  },
  "VPPA — видеопросмотры": {
    "en": "VPPA — video viewing records",
    "es": "VPPA — historial de vídeo",
    "zh": "VPPA — 视频观看记录"
  },
  "ePrivacy — cookie-стены": {
    "en": "ePrivacy — cookie walls",
    "es": "ePrivacy — muros de cookies",
    "zh": "ePrivacy — Cookie 墙"
  },
  "ePrivacy — согласие на cookie": {
    "en": "ePrivacy — cookie consent",
    "es": "ePrivacy — consentimiento de cookies",
    "zh": "ePrivacy — Cookie 同意"
  },
  "ePrivacy — срок жизни cookie": {
    "en": "ePrivacy — cookie lifetime",
    "es": "ePrivacy — duración de las cookies",
    "zh": "ePrivacy — Cookie 有效期"
  },
  "revFADP (Закон о защите данных)": {
    "en": "revFADP (Data Protection Act)",
    "es": "revFADP (Ley de protección de datos)",
    "zh": "revFADP（数据保护法）"
  },
  "Акт о доступности (2019/882)": {
    "en": "Accessibility Act (2019/882)",
    "es": "Acta de Accesibilidad (2019/882)",
    "zh": "无障碍法案（2019/882）"
  },
  "Декрет 13/2023": {
    "en": "Decree 13/2023",
    "es": "Decreto 13/2023",
    "zh": "第13/2023号法令"
  },
  "Директива ePrivacy 2002/58/EC": {
    "en": "ePrivacy Directive 2002/58/EC",
    "es": "Directiva ePrivacy 2002/58/CE",
    "zh": "ePrivacy 指令 2002/58/EC"
  },
  "Директива об электронной торговле 2000/31/EC, ст. 5 (сведения о продавце)": {
    "en": "E-Commerce Directive 2000/31/EC, Art. 5 (seller details)",
    "es": "Directiva de comercio electrónico 2000/31/CE, art. 5 (datos del vendedor)",
    "zh": "电子商务指令 2000/31/EC 第5条（卖方信息）"
  },
  "Директивы о прозрачности и ПОД": {
    "en": "Transparency and AML directives",
    "es": "Directivas de transparencia y PBC",
    "zh": "透明度与反洗钱指令"
  },
  "Закон 151/2020": {
    "en": "Law 151/2020",
    "es": "Ley 151/2020",
    "zh": "第151/2020号法"
  },
  "Закон 1581/2012": {
    "en": "Law 1581/2012",
    "es": "Ley 1581/2012",
    "zh": "第1581/2012号法"
  },
  "Закон 18.331": {
    "en": "Law 18.331",
    "es": "Ley 18.331",
    "zh": "第18.331号法"
  },
  "Закон 19.628": {
    "en": "Law 19.628",
    "es": "Ley 19.628",
    "zh": "第19.628号法"
  },
  "Закон 25": {
    "en": "Law 25",
    "es": "Ley 25",
    "zh": "第25号法"
  },
  "Закон 25.326": {
    "en": "Law 25.326",
    "es": "Ley 25.326",
    "zh": "第25.326号法"
  },
  "Закон 29733": {
    "en": "Law 29733",
    "es": "Ley 29733",
    "zh": "第29733号法"
  },
  "Закон 8/2005": {
    "en": "Law 8/2005",
    "es": "Ley 8/2005",
    "zh": "第8/2005号法"
  },
  "Закон 81/2019": {
    "en": "Law 81/2019",
    "es": "Ley 81/2019",
    "zh": "第81/2019号法"
  },
  "Закон 8968": {
    "en": "Law 8968",
    "es": "Ley 8968",
    "zh": "第8968号法"
  },
  "Закон о ФТК, статья 5": {
    "en": "FTC Act, Section 5",
    "es": "Ley de la FTC, artículo 5",
    "zh": "《联邦贸易委员会法》第5条"
  },
  "Закон о безопасности в сети 2023": {
    "en": "Online Safety Act 2023",
    "es": "Ley de Seguridad en Línea 2023",
    "zh": "2023年网络安全法"
  },
  "Закон о данных (2023/2854)": {
    "en": "Data Act (2023/2854)",
    "es": "Ley de Datos (2023/2854)",
    "zh": "数据法案（2023/2854）"
  },
  "Закон о защите данных 90/2018": {
    "en": "Data Protection Act 90/2018",
    "es": "Ley de protección de datos 90/2018",
    "zh": "第90/2018号数据保护法"
  },
  "Закон о защите персональных данных": {
    "en": "Personal Data Protection Act",
    "es": "Ley de protección de datos personales",
    "zh": "个人数据保护法"
  },
  "Закон о защите приватности": {
    "en": "Privacy Protection Act",
    "es": "Ley de protección de la privacidad",
    "zh": "隐私保护法"
  },
  "Закон о персональных данных": {
    "en": "Personal Data Act",
    "es": "Ley de datos personales",
    "zh": "个人数据法"
  },
  "Закон о приватности 2018": {
    "en": "Privacy Act 2018",
    "es": "Ley de Privacidad 2018",
    "zh": "2018年隐私法"
  },
  "Закон о цепочках поставок (LkSG)": {
    "en": "Supply Chain Act (LkSG)",
    "es": "Ley de cadenas de suministro (LkSG)",
    "zh": "供应链法（LkSG）"
  },
  "Закон о цифровых рынках (DMA)": {
    "en": "Digital Markets Act (DMA)",
    "es": "Ley de Mercados Digitales (DMA)",
    "zh": "数字市场法（DMA）"
  },
  "Закон о цифровых услугах (DSA)": {
    "en": "Digital Services Act (DSA)",
    "es": "Ley de Servicios Digitales (DSA)",
    "zh": "数字服务法（DSA）"
  },
  "Закон об ИИ": {
    "en": "AI Act",
    "es": "Ley de IA",
    "zh": "人工智能法"
  },
  "Закон об ИИ (SB 24-205)": {
    "en": "AI Act (SB 24-205)",
    "es": "Ley de IA (SB 24-205)",
    "zh": "人工智能法（SB 24-205）"
  },
  "Закон об ИИ (Регламент 2024/1689)": {
    "en": "AI Act (Regulation 2024/1689)",
    "es": "Ley de IA (Reglamento 2024/1689)",
    "zh": "人工智能法（2024/1689 号条例）"
  },
  "Кодекс о детях (AB 2273)": {
    "en": "Age-Appropriate Design Code (AB 2273)",
    "es": "Código de diseño adecuado a la edad (AB 2273)",
    "zh": "儿童设计规范（AB 2273）"
  },
  "Кодекс о детях (ICO)": {
    "en": "Children’s Code (ICO)",
    "es": "Código de la infancia (ICO)",
    "zh": "儿童准则（ICO）"
  },
  "Отраслевой стандарт": {
    "en": "Industry standard",
    "es": "Estándar del sector",
    "zh": "行业标准"
  },
  "Раздел 508 Закона о реабилитации": {
    "en": "Section 508 of the Rehabilitation Act",
    "es": "Sección 508 de la Ley de Rehabilitación",
    "zh": "《康复法》第508条"
  },
  "Регламент 2024/3228 (платформа споров)": {
    "en": "Regulation 2024/3228 (dispute platform)",
    "es": "Reglamento 2024/3228 (plataforma de litigios)",
    "zh": "2024/3228 号条例（争议平台）"
  },
  "Регламент об искусственном интеллекте (AI Act), ст. 50": {
    "en": "AI Act, Art. 50",
    "es": "Ley de IA, art. 50",
    "zh": "人工智能法第50条"
  },
  "Трансграничная передача (Schrems II)": {
    "en": "Cross-border transfers (Schrems II)",
    "es": "Transferencias transfronterizas (Schrems II)",
    "zh": "跨境传输（Schrems II）"
  },
  "ФТК — обманчивое ценообразование": {
    "en": "FTC — deceptive pricing",
    "es": "FTC — precios engañosos",
    "zh": "FTC — 欺骗性定价"
  },
  "ФТК — поддельные отзывы": {
    "en": "FTC — fake reviews",
    "es": "FTC — reseñas falsas",
    "zh": "FTC — 虚假评论"
  },
  "ФТК — правило «отписаться в один клик»": {
    "en": "FTC — click-to-cancel rule",
    "es": "FTC — regla de cancelación en un clic",
    "zh": "FTC — 一键取消规则"
  },
  "Эксплуатация (доказано кодом)": {
    "en": "Operations (proven by code)",
    "es": "Operación (probado por código)",
    "zh": "运维（代码验证）"
  },
  "Наша проверка": {
    "en": "Our own check",
    "es": "Nuestra comprobación",
    "zh": "我们的检查"
  },
  "Международный стандарт": {
    "en": "International standard",
    "es": "Estándar internacional",
    "zh": "国际标准"
  },
  "Европейский союз": {
    "en": "European Union",
    "es": "Unión Europea",
    "zh": "欧盟"
  },
  "Базовая безопасность (доказано кодом)": {
    "en": "Security baseline (proven by code)",
    "es": "Seguridad básica (probado por código)",
    "zh": "安全基线（代码验证）"
  },
  "Приватность (доказано кодом)": {
    "en": "Privacy (proven by code)",
    "es": "Privacidad (probado por código)",
    "zh": "隐私（代码验证）"
  },
  "Защита почты домена (доказано кодом)": {
    "en": "Domain email protection (proven by code)",
    "es": "Protección del correo del dominio (probado por código)",
    "zh": "域名邮件保护（代码验证）"
  },
  "Цепочка поставок кода (доказано кодом)": {
    "en": "Code supply chain (proven by code)",
    "es": "Cadena de suministro de código (probado por código)",
    "zh": "代码供应链（代码验证）"
  },
  "Доступность (доказано кодом)": {
    "en": "Accessibility (proven by code)",
    "es": "Accesibilidad (probado por código)",
    "zh": "无障碍（代码验证）"
  },
  "Рекомендации W3C": {
    "en": "W3C recommendations",
    "es": "Recomendaciones del W3C",
    "zh": "W3C 建议"
  },
  "Почтовые стандарты (SPF/DKIM/DMARC)": {
    "en": "Email standards (SPF/DKIM/DMARC)",
    "es": "Estándares de correo (SPF/DKIM/DMARC)",
    "zh": "邮件标准（SPF/DKIM/DMARC）"
  }
};

export function jurisdictionLabel(текст: string, locale?: string): string {
  const l = (locale || '').slice(0, 2).toLowerCase();
  if (l === 'ru' || !l) return текст;
  return ПОДПИСИ[текст]?.[l] || текст;
}
