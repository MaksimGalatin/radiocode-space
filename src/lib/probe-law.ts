/**
 * СВОЙ ЗАКОН У КАЖДОЙ ДОКАЗАННОЙ НАХОДКИ. Добавлено 25.09.2026.
 *
 * 🔴 ЧТО БЫЛО. Все 42 вида находок, которые выносит код (lib/oracle-probe.ts),
 * получали в app/api/scan/route.ts одну категорию `Digital Operations`, а с ней
 * один общий ярлык из пяти иностранных законов (PIPEDA, Law 25, LGPD,
 * австралийский Privacy Act, AI Act) и одну строку штрафа. Экран брал из неё
 * наибольшее число — $50M австралийского закона — и складывал его по КАЖДОЙ
 * находке. Так под «нет security.txt» вставал штраф, которого нет ни в одном
 * законе, а внизу набегало «$420M».
 *
 * ЧТО СТАЛО. У каждого кода — его норма, рабочая ссылка на ПЕРВОИСТОЧНИК и
 * штраф ровно такой, какой написан в самом законе. Где закона нет, так и
 * сказано. Всё сверено 25.09.2026 по первоисточникам (EUR-Lex, eCFR,
 * leginfo.legislature.ca.gov, cppa.ca.gov, gesetze-im-internet.de, w3.org,
 * rfc-editor.org, whatwg.org, top10.owasp.org, cnil.fr, pcisecuritystandards.org);
 * таблица сверки с цитатами — E:/Aifa/ВАЖНЫЕ ДОКУМЕНТЫ…/06_ПРОДУКТ_И_ПАМЯТЬ/
 * СКАНЕР_ЗАКОНЫ_42_СВЕРКА_25.09.2026.md.
 *
 * ЧЕТЫРЕ ВИДА НОРМ — от них зависит, входит ли штраф в сумму на экране:
 *   law      — закон прямо требует то, что проверено; штраф из закона.
 *   sign     — признак возможного нарушения; требует подтверждения, в сумму
 *              не входит.
 *   duty     — защитная мера; отдельного штрафа за неё закон не ставит, она
 *              часть общей обязанности защищать данные (GDPR ст. 25 и 32).
 *   standard — технический стандарт или рекомендация; закона и штрафа нет.
 *
 * ЧТО ЭТОТ ФАЙЛ НЕ МЕНЯЕТ: что сканер находит, серьёзность находок и балл.
 * Балл считается только по серьёзности (scoreFromFindings), подпись закона
 * на него не влияет.
 */

export type ВидНормы = 'law' | 'sign' | 'duty' | 'standard';

type Язык = 'ru' | 'en' | 'es' | 'zh';
type Текст = Record<Язык, string>;

/** Числовой потолок штрафа для суммы на экране. Только у вида `law`. */
export type ПотолокШтрафа = {
  /** Сумма из текста закона — фиксированная часть «до N или X% оборота». */
  amount: number;
  currency: 'EUR' | 'USD';
  /**
   * Один закон — один потолок. GDPR ст. 83(3): при нескольких нарушениях в
   * одной обработке общий штраф не больше, чем за самое тяжёлое. Поэтому
   * находки с одинаковым ключом не складываются, берётся наибольшая.
   */
  key: string;
};

export type ИсточникНормы = { name: string; url: string };

export type ЗаконНаходки = {
  lawKind: ВидНормы;
  lawName: string;
  lawUrl: string;
  fineAmount: string;
  /** Коротко для значка на карточке: «до €20 000 000», «Штрафа нет». */
  fineShort: string;
  fineCap?: ПотолокШтрафа;
  /** Другие первоисточники по той же находке. */
  lawSources: ИсточникНормы[];
};

// ─── Первоисточники ───────────────────────────────────────────────────────────
// Каждая ссылка проверена 25.09.2026: страница отвечает, якорь на месте.
const GDPR = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679';
const EPRIVACY = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02002L0058-20091219#art_5';
const ECOMMERCE = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32000L0031';
// Сводная редакция на 27.07.2026 — действующий текст; ст. 50, 99, 113 сверены по ней.
const AI_ACT = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02024R1689-20260727';
const ODR_REPEAL = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R3228#art_1';
const EAA = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882';
const CJEU_C311_18 = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62018CJ0311';
const CJEU_C362_14 = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62014CJ0362';
const DPF_2023_1795 = 'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32023D1795';
const DE_TDDDG_25 = 'https://www.gesetze-im-internet.de/ttdsg/__25.html';
const DE_TDDDG_28 = 'https://www.gesetze-im-internet.de/ttdsg/__28.html';
const DE_DDG_5 = 'https://www.gesetze-im-internet.de/ddg/__5.html';
const DE_DDG_33 = 'https://www.gesetze-im-internet.de/ddg/__33.html';
const DE_BFSG_37 = 'https://www.gesetze-im-internet.de/bfsg/__37.html';
const CCPA_135 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1798.135';
const CCPA_155 = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1798.155';
const CCPA_CPI = 'https://cppa.ca.gov/regulations/cpi_adjustment.html';
const CCPA_REGS = 'https://cppa.ca.gov/regulations/pdf/ccpa_statute_eff_20260101.pdf';
const CALOPPA = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22575';
const WCAG21_RESIZE = 'https://www.w3.org/TR/WCAG21/#resize-text';
const ADA_PENALTY = 'https://www.ecfr.gov/current/title-28/chapter-I/part-85/section-85.5';
const ADA_TITLE2 = 'https://www.ecfr.gov/current/title-28/chapter-I/part-35/subpart-H/section-35.200';
const CNIL_13_MOIS = 'https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience';
const PCI_ESKIMMING = 'https://blog.pcisecuritystandards.org/new-information-supplement-payment-page-security-and-preventing-e-skimming';
const OWASP_A02 = 'https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/';
const OWASP_A04 = 'https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/';
const CSP3 = 'https://www.w3.org/TR/CSP3/';
const RFC = (n: number, раздел?: string) =>
  `https://www.rfc-editor.org/rfc/rfc${n}.html${раздел ? `#section-${раздел}` : ''}`;

// ─── Общие тексты про штраф ───────────────────────────────────────────────────

/** Защитная мера: закон требует защищать данные в целом, а не этот заголовок. */
const ШТРАФ_ЗАЩИТА: Текст = {
  ru: 'Отдельного штрафа нет; это часть общей обязанности защищать данные (GDPR, ст. 32). Штраф до €10 000 000 или 2% оборота (ст. 83(4)) назначают за недостаточную защиту в целом, а не за отдельную настройку.',
  en: 'No separate fine; part of the general duty to secure personal data (GDPR Art. 32). The fine of up to €10,000,000 or 2% of turnover (Art. 83(4)) is for inadequate security overall, not for a single setting.',
  es: 'Sin multa específica; forma parte de la obligación general de proteger los datos (RGPD, art. 32). La multa de hasta 10.000.000 € o el 2 % del volumen de negocio (art. 83.4) se impone por una protección insuficiente en su conjunto, no por un ajuste concreto.',
  zh: '无单独罚款；属于保护个人数据的一般义务（GDPR 第32条）。最高1000万欧元或营业额2%的罚款（第83条第4款）针对整体保护不足，而非某一项设置。',
};

/** То же, но для приватности: принцип защиты данных «по умолчанию». */
const ШТРАФ_ПРИВАТНОСТЬ: Текст = {
  ru: 'Отдельного штрафа нет; это часть принципа защиты данных «по умолчанию» (GDPR, ст. 25). Штраф до €10 000 000 или 2% оборота (ст. 83(4)) назначают за нарушение принципа в целом, а не за отдельный заголовок.',
  en: 'No separate fine; part of the data-protection-by-default principle (GDPR Art. 25). The fine of up to €10,000,000 or 2% of turnover (Art. 83(4)) is for breaching the principle overall, not for a single header.',
  es: 'Sin multa específica; forma parte del principio de protección de datos por defecto (RGPD, art. 25). La multa de hasta 10.000.000 € o el 2 % del volumen de negocio (art. 83.4) se impone por incumplir el principio en su conjunto, no por una cabecera concreta.',
  zh: '无单独罚款；属于“默认数据保护”原则（GDPR 第25条）。最高1000万欧元或营业额2%的罚款（第83条第4款）针对整体违反该原则，而非某一个响应头。',
};

/**
 * Открытые служебные файлы (.git, .env): GDPR ст. 32(1)(b) прямо называет
 * конфиденциальность — так же, как (a) называет шифрование. Если в файлах есть
 * персональные данные или ключи к ним, это ещё и утечка: 72 часа (ст. 33).
 */
const ШТРАФ_УТЕЧКА: Текст = {
  ru: 'До €10 000 000 или 2% мирового оборота, что больше (GDPR, ст. 83(4)) — если сайт обрабатывает персональные данные людей в ЕС. Если в открытых файлах есть персональные данные или ключи к ним — это утечка: надзор уведомляют не позднее 72 часов (ст. 33).',
  en: 'Up to €10,000,000 or 2% of worldwide turnover, whichever is higher (GDPR Art. 83(4)) — if the site processes personal data of people in the EU. If the exposed files hold personal data or keys to it, this is a breach: notify the supervisory authority within 72 hours (Art. 33).',
  es: 'Hasta 10.000.000 € o el 2 % del volumen de negocio mundial, la cifra mayor (RGPD, art. 83.4), si el sitio trata datos personales de personas en la UE. Si los archivos expuestos contienen datos personales o claves de acceso a ellos, es una violación de seguridad: se notifica a la autoridad de control en un plazo de 72 horas (art. 33).',
  zh: '最高1000万欧元或全球营业额的2%，以较高者为准（GDPR 第83条第4款）——适用于处理欧盟境内个人数据的网站。如暴露文件包含个人数据或其密钥，即构成数据泄露：须在72小时内通知监管机构（第33条）。',
};

const ШТРАФ_СТАНДАРТ: Текст = {
  ru: 'Штрафа нет: это технический стандарт, а не требование закона.',
  en: 'No fine: this is a technical standard, not a legal requirement.',
  es: 'Sin multa: es una norma técnica, no un requisito legal.',
  zh: '无罚款：这是技术标准，而非法律要求。',
};

const КОРОТКО_НЕТ_ОТДЕЛЬНОГО: Текст = {
  ru: 'Нет отдельного штрафа', en: 'No separate fine', es: 'Sin multa específica', zh: '无单独罚款',
};
const КОРОТКО_НЕТ: Текст = { ru: 'Штрафа нет', en: 'No fine', es: 'Sin multa', zh: '无罚款' };
const КОРОТКО_ПОДТВЕРДИТЬ: Текст = {
  ru: 'Требует подтверждения', en: 'Needs confirmation', es: 'Requiere confirmación', zh: '需确认',
};

// ─── Законы с прямым штрафом ──────────────────────────────────────────────────

const ШТРАФ_GDPR_32: Текст = {
  ru: 'До €10 000 000 или 2% мирового оборота, что больше (GDPR, ст. 83(4)) — если сайт обрабатывает персональные данные людей в ЕС.',
  en: 'Up to €10,000,000 or 2% of worldwide turnover, whichever is higher (GDPR Art. 83(4)) — if the site processes personal data of people in the EU.',
  es: 'Hasta 10.000.000 € o el 2 % del volumen de negocio mundial, la cifra mayor (RGPD, art. 83.4), si el sitio trata datos personales de personas en la UE.',
  zh: '最高1000万欧元或全球营业额的2%，以较高者为准（GDPR 第83条第4款）——适用于处理欧盟境内个人数据的网站。',
};
const КОРОТКО_GDPR_10: Текст = { ru: 'До €10 000 000', en: 'Up to €10,000,000', es: 'Hasta 10.000.000 €', zh: '最高1000万欧元' };
const КОРОТКО_GDPR_20: Текст = { ru: 'До €20 000 000', en: 'Up to €20,000,000', es: 'Hasta 20.000.000 €', zh: '最高2000万欧元' };

const ШТРАФ_CCPA: Текст = {
  ru: 'До $2 663 за нарушение и до $7 988 за умышленное (Civ. Code §1798.155(a) и §1798.199.90(a); суммы CPPA с 01.01.2025). Касается компаний, подпадающих под определение «business» (§1798.140(d), в том числе с годовой выручкой от $26 625 000).',
  en: 'Up to $2,663 per violation and up to $7,988 per intentional violation (Civ. Code §1798.155(a) and §1798.199.90(a); CPPA amounts effective 1 Jan 2025). Applies to companies that meet the definition of “business” (§1798.140(d), including annual revenue of $26,625,000 or more).',
  es: 'Hasta 2.663 $ por infracción y hasta 7.988 $ por infracción intencionada (Código Civil §1798.155(a) y §1798.199.90(a); importes de la CPPA desde el 01.01.2025). Se aplica a las empresas que cumplen la definición de «business» (§1798.140(d), incluidos ingresos anuales desde 26.625.000 $).',
  zh: '每次违规最高2,663美元，故意违规最高7,988美元（《民法典》§1798.155(a) 和 §1798.199.90(a)；CPPA 自2025年1月1日起的金额）。适用于符合“business”定义的公司（§1798.140(d)，包括年收入达26,625,000美元以上者）。',
};
const КОРОТКО_CCPA: Текст = {
  ru: 'До $7 988 за нарушение', en: 'Up to $7,988 per violation', es: 'Hasta 7.988 $ por infracción', zh: '每次违规最高7,988美元',
};

// ─── Сами привязки: 42 кода из lib/oracle-probe.ts ────────────────────────────

type Запись = {
  kind: ВидНормы;
  norm: Текст;
  url: string;
  also?: ИсточникНормы[];
  fine?: Текст;
  short?: Текст;
  cap?: ПотолокШтрафа;
};

const один = (s: string): Текст => ({ ru: s, en: s, es: s, zh: s });

const ГДПР_32 = (что: Текст): Запись => ({
  kind: 'law',
  norm: {
    ru: `GDPR, ст. 32(1)(a) — ${что.ru}`,
    en: `GDPR Art. 32(1)(a) — ${что.en}`,
    es: `RGPD, art. 32.1.a — ${что.es}`,
    zh: `GDPR 第32条第1款(a)项 — ${что.zh}`,
  },
  url: `${GDPR}#art_32`,
  also: [{ name: 'OWASP Top 10:2025 A04 — Cryptographic Failures', url: OWASP_A04 }],
  fine: ШТРАФ_GDPR_32,
  short: КОРОТКО_GDPR_10,
  cap: { amount: 10_000_000, currency: 'EUR', key: 'GDPR' },
});

const открытыйФайл = (что: Текст): Запись => ({
  kind: 'law',
  norm: {
    ru: `GDPR, ст. 32(1)(b) — конфиденциальность; ${что.ru}`,
    en: `GDPR Art. 32(1)(b) — confidentiality; ${что.en}`,
    es: `RGPD, art. 32.1.b — confidencialidad; ${что.es}`,
    zh: `GDPR 第32条第1款(b)项 — 保密性；${что.zh}`,
  },
  url: `${GDPR}#art_32`,
  also: [
    { name: 'GDPR Art. 33', url: `${GDPR}#art_33` },
    { name: 'OWASP Top 10:2025 A02 — Security Misconfiguration', url: OWASP_A02 },
  ],
  fine: ШТРАФ_УТЕЧКА,
  short: КОРОТКО_GDPR_10,
  cap: { amount: 10_000_000, currency: 'EUR', key: 'GDPR' },
});

const защита = (norm: Текст, url: string, also: ИсточникНормы[] = []): Запись => ({
  kind: 'duty', norm, url,
  also: [...also, { name: 'GDPR Art. 32', url: `${GDPR}#art_32` }],
  fine: ШТРАФ_ЗАЩИТА, short: КОРОТКО_НЕТ_ОТДЕЛЬНОГО,
});

const приватность = (norm: Текст, url: string): Запись => ({
  kind: 'duty', norm, url,
  also: [{ name: 'GDPR Art. 25', url: `${GDPR}#art_25` }],
  fine: ШТРАФ_ПРИВАТНОСТЬ, short: КОРОТКО_НЕТ_ОТДЕЛЬНОГО,
});

const стандарт = (norm: Текст, url: string): Запись => ({
  kind: 'standard', norm, url, fine: ШТРАФ_СТАНДАРТ, short: КОРОТКО_НЕТ,
});

const ЗАКОНЫ: Record<string, Запись> = {
  // ── Шифрование при передаче: GDPR прямо называет шифрование (ст. 32(1)(a)) ──
  'SEC-TLS-001': ГДПР_32({ ru: 'шифрование при передаче', en: 'encryption in transit', es: 'cifrado en tránsito', zh: '传输加密' }),
  'SEC-FORM-001': ГДПР_32({ ru: 'данные формы без шифрования', en: 'form data sent unencrypted', es: 'datos de formulario sin cifrar', zh: '表单数据未加密传输' }),
  'SEC-PWD-001': ГДПР_32({ ru: 'пароль без шифрования', en: 'password sent unencrypted', es: 'contraseña sin cifrar', zh: '密码未加密传输' }),

  // ── Защитные заголовки и настройки: отдельного штрафа нет ─────────────────
  'SEC-HSTS-001': защита(один('RFC 6797 — HTTP Strict Transport Security'), RFC(6797), [{ name: 'OWASP Top 10:2025 A02', url: OWASP_A02 }]),
  'SEC-HSTS-002': защита(один('RFC 6797 §6.1.1 — max-age'), RFC(6797, '6.1.1'), [{ name: 'OWASP Top 10:2025 A02', url: OWASP_A02 }]),
  'SEC-CSP-001': защита(один('W3C Content Security Policy Level 3'), CSP3, [{ name: 'OWASP Top 10:2025 A02', url: OWASP_A02 }]),
  'SEC-CSP-002': защита(один("W3C CSP Level 3 — script-src, 'unsafe-eval'"), `${CSP3}#directive-script-src`),
  'SEC-CSP-004': защита(один("W3C CSP Level 3 — script-src, 'unsafe-inline'"), `${CSP3}#directive-script-src`),
  'SEC-CSP-005': защита(один("W3C CSP Level 3 — style-src-elem, 'unsafe-inline'"), `${CSP3}#directive-style-src-elem`),
  'SEC-CLICK-001': защита(один('W3C CSP Level 3 — frame-ancestors'), `${CSP3}#directive-frame-ancestors`, [{ name: 'RFC 7034 — X-Frame-Options', url: RFC(7034, '2') }]),
  'SEC-MIME-001': защита(один('WHATWG Fetch — X-Content-Type-Options: nosniff'), 'https://fetch.spec.whatwg.org/#x-content-type-options-header'),
  'SEC-INFO-001': защита(один('OWASP Top 10:2025 A02 — Security Misconfiguration'), OWASP_A02),
  'SEC-CORS-001': защита(один('WHATWG Fetch — CORS protocol'), 'https://fetch.spec.whatwg.org/#http-cors-protocol', [{ name: 'OWASP Top 10:2025 A02', url: OWASP_A02 }]),
  'SEC-COOKIE-001': защита(один('RFC 6265 §4.1.2.5–4.1.2.6 — Secure, HttpOnly'), RFC(6265, '4.1.2.5')),
  'SEC-MIXED-001': защита(один('W3C Mixed Content'), 'https://www.w3.org/TR/mixed-content/'),
  'SUPPLY-MAP-001': защита(один('OWASP Top 10:2025 A02 — Security Misconfiguration'), OWASP_A02),
  'EXPO-WP-001': защита(один('OWASP Top 10:2025 A02 — Security Misconfiguration'), OWASP_A02),

  // Чужие скрипты без integrity: для страниц оплаты есть и требование PCI DSS.
  'SUPPLY-SRI-001': {
    kind: 'duty',
    norm: один('W3C Subresource Integrity — integrity'),
    url: 'https://www.w3.org/TR/SRI/#the-integrity-attribute',
    also: [
      { name: 'PCI DSS v4.0.1 — 6.4.3, 11.6.1', url: PCI_ESKIMMING },
      { name: 'GDPR Art. 32', url: `${GDPR}#art_32` },
    ],
    fine: {
      ru: `${ШТРАФ_ЗАЩИТА.ru} Для страниц оплаты картой действуют требования PCI DSS v4.0.1 6.4.3 и 11.6.1; сам PCI SSC штрафов не назначает — санкции устанавливают платёжные системы в своих договорах.`,
      en: `${ШТРАФ_ЗАЩИТА.en} Card payment pages are also subject to PCI DSS v4.0.1 requirements 6.4.3 and 11.6.1; the PCI SSC itself does not impose fines — sanctions are set by the payment brands in their contracts.`,
      es: `${ШТРАФ_ЗАЩИТА.es} Las páginas de pago con tarjeta también están sujetas a los requisitos 6.4.3 y 11.6.1 de PCI DSS v4.0.1; el propio PCI SSC no impone multas: las sanciones las fijan las marcas de pago en sus contratos.`,
      zh: `${ШТРАФ_ЗАЩИТА.zh} 银行卡支付页面还须符合 PCI DSS v4.0.1 第6.4.3和11.6.1项要求；PCI SSC 本身不处以罚款，处罚由支付品牌在其合同中规定。`,
    },
    short: КОРОТКО_НЕТ_ОТДЕЛЬНОГО,
  },

  // ── Открытые служебные файлы: GDPR ст. 32(1)(b) называет конфиденциальность ─
  'SEC-GIT-001': открытыйФайл({ ru: 'открыт каталог .git', en: 'exposed .git directory', es: 'directorio .git expuesto', zh: '.git 目录外泄' }),
  'SEC-ENV-001': открытыйФайл({ ru: 'открыт файл .env', en: 'exposed .env file', es: 'archivo .env expuesto', zh: '.env 文件外泄' }),

  // ── Приватность: заголовки, которых закон по отдельности не требует ────────
  'PRIV-REF-001': приватность(один('W3C Referrer Policy — strict-origin-when-cross-origin'), 'https://www.w3.org/TR/referrer-policy/#referrer-policy-strict-origin-when-cross-origin'),
  'PRIV-PERM-001': приватность(один('W3C Permissions Policy'), 'https://www.w3.org/TR/permissions-policy-1/'),
  'PRIV-LOGOUT-001': приватность(один('W3C Clear Site Data'), 'https://www.w3.org/TR/clear-site-data/#header'),

  // ── Согласие на слежку: прямое требование закона ───────────────────────────
  'GDPR-CONSENT-001': {
    kind: 'law',
    norm: {
      ru: 'Директива ePrivacy 2002/58/EC, ст. 5(3); GDPR, ст. 6–7 — согласие',
      en: 'ePrivacy Directive 2002/58/EC Art. 5(3); GDPR Arts. 6–7 — consent',
      es: 'Directiva ePrivacy 2002/58/CE, art. 5.3; RGPD, arts. 6–7 — consentimiento',
      zh: '电子隐私指令 2002/58/EC 第5条第3款；GDPR 第6–7条 — 同意',
    },
    url: EPRIVACY,
    also: [
      { name: 'GDPR Art. 7', url: `${GDPR}#art_7` },
      { name: 'DE TDDDG §25', url: DE_TDDDG_25 },
      { name: 'DE TDDDG §28', url: DE_TDDDG_28 },
    ],
    fine: {
      ru: 'До €20 000 000 или 4% мирового оборота, что больше (GDPR, ст. 83(5)(a) — условия согласия). Отдельный штраф по национальному закону, например, в Германии — до €300 000 (TDDDG §25 и §28(2)).',
      en: 'Up to €20,000,000 or 4% of worldwide turnover, whichever is higher (GDPR Art. 83(5)(a) — conditions for consent). A separate fine under national law, e.g. in Germany up to €300,000 (TDDDG §25 and §28(2)).',
      es: 'Hasta 20.000.000 € o el 4 % del volumen de negocio mundial, la cifra mayor (RGPD, art. 83.5.a — condiciones del consentimiento). Multa aparte según la ley nacional; por ejemplo, en Alemania hasta 300.000 € (TDDDG §25 y §28.2).',
      zh: '最高2000万欧元或全球营业额的4%，以较高者为准（GDPR 第83条第5款(a)项——同意条件）。另可依国内法处罚，例如德国最高30万欧元（TDDDG 第25条及第28条第2款）。',
    },
    short: КОРОТКО_GDPR_20,
    cap: { amount: 20_000_000, currency: 'EUR', key: 'GDPR' },
  },

  'GDPR-POLICY-001': {
    kind: 'law',
    norm: {
      ru: 'GDPR, ст. 12–13 — информирование о сборе данных',
      en: 'GDPR Arts. 12–13 — information at collection',
      es: 'RGPD, arts. 12–13 — información en la recogida',
      zh: 'GDPR 第12–13条 — 收集时的告知义务',
    },
    url: `${GDPR}#art_13`,
    also: [{ name: 'California CalOPPA, Bus. & Prof. Code §22575', url: CALOPPA }],
    fine: {
      ru: 'До €20 000 000 или 4% мирового оборота, что больше (GDPR, ст. 83(5)(b)). В Калифорнии (CalOPPA §22575(a)) нарушением считается, если политика не размещена в течение 30 дней после уведомления.',
      en: 'Up to €20,000,000 or 4% of worldwide turnover, whichever is higher (GDPR Art. 83(5)(b)). In California (CalOPPA §22575(a)) it is a violation if the policy is not posted within 30 days of notice.',
      es: 'Hasta 20.000.000 € o el 4 % del volumen de negocio mundial, la cifra mayor (RGPD, art. 83.5.b). En California (CalOPPA §22575(a)) hay infracción si la política no se publica en los 30 días siguientes al aviso.',
      zh: '最高2000万欧元或全球营业额的4%，以较高者为准（GDPR 第83条第5款(b)项）。在加州（CalOPPA §22575(a)），如在收到通知后30天内仍未发布隐私政策即构成违规。',
    },
    short: КОРОТКО_GDPR_20,
    cap: { amount: 20_000_000, currency: 'EUR', key: 'GDPR' },
  },

  'XFER-FONTS-001': {
    kind: 'law',
    norm: {
      ru: 'GDPR, ст. 6(1) — законность передачи IP-адреса третьему лицу',
      en: 'GDPR Art. 6(1) — lawfulness of passing the IP address to a third party',
      es: 'RGPD, art. 6.1 — licitud de ceder la dirección IP a un tercero',
      zh: 'GDPR 第6条第1款 — 向第三方传递IP地址的合法性',
    },
    url: `${GDPR}#art_6`,
    also: [{ name: 'Decision (EU) 2023/1795 — EU-US Data Privacy Framework', url: DPF_2023_1795 }],
    fine: {
      ru: 'До €20 000 000 или 4% мирового оборота, что больше (GDPR, ст. 83(5)(a)). Передача в США допустима, если получатель есть в списке Data Privacy Framework (решение (ЕС) 2023/1795).',
      en: 'Up to €20,000,000 or 4% of worldwide turnover, whichever is higher (GDPR Art. 83(5)(a)). A transfer to the US is permitted if the recipient is on the Data Privacy Framework List (Decision (EU) 2023/1795).',
      es: 'Hasta 20.000.000 € o el 4 % del volumen de negocio mundial, la cifra mayor (RGPD, art. 83.5.a). La transferencia a EE. UU. se permite si el destinatario figura en la lista del Data Privacy Framework (Decisión (UE) 2023/1795).',
      zh: '最高2000万欧元或全球营业额的4%，以较高者为准（GDPR 第83条第5款(a)项）。若接收方列入《数据隐私框架》名单（欧盟决定 2023/1795），则允许向美国传输。',
    },
    short: КОРОТКО_GDPR_20,
    cap: { amount: 20_000_000, currency: 'EUR', key: 'GDPR' },
  },

  'TRUTH-002': {
    kind: 'sign',
    norm: {
      ru: 'GDPR, гл. V (ст. 44–46); Суд ЕС C-311/18 — Privacy Shield недействителен',
      en: 'GDPR Chapter V (Arts. 44–46); CJEU C-311/18 — Privacy Shield invalid',
      es: 'RGPD, cap. V (arts. 44–46); TJUE C-311/18 — Privacy Shield inválido',
      zh: 'GDPR 第五章（第44–46条）；欧盟法院 C-311/18 — 隐私盾无效',
    },
    url: CJEU_C311_18,
    also: [
      { name: 'CJEU C-362/14 — Safe Harbour invalid', url: CJEU_C362_14 },
      { name: 'GDPR Art. 44', url: `${GDPR}#art_44` },
      { name: 'Decision (EU) 2023/1795 — EU-US Data Privacy Framework', url: DPF_2023_1795 },
    ],
    fine: {
      ru: 'Упоминание само по себе не нарушение. Если передача данных в США действительно опирается на отменённый механизм — до €20 000 000 или 4% оборота (GDPR, ст. 83(5)(c)). Действующий механизм — решение (ЕС) 2023/1795.',
      en: 'The mention alone is not a violation. If transfers to the US actually rely on the invalidated mechanism — up to €20,000,000 or 4% of turnover (GDPR Art. 83(5)(c)). The current mechanism is Decision (EU) 2023/1795.',
      es: 'La mención por sí sola no es una infracción. Si las transferencias a EE. UU. se basan realmente en el mecanismo anulado: hasta 20.000.000 € o el 4 % del volumen de negocio (RGPD, art. 83.5.c). El mecanismo vigente es la Decisión (UE) 2023/1795.',
      zh: '仅提及本身并不违规。若向美国的数据传输确实依赖已失效的机制——最高2000万欧元或营业额的4%（GDPR 第83条第5款(c)项）。现行机制为欧盟决定 2023/1795。',
    },
    short: КОРОТКО_ПОДТВЕРДИТЬ,
  },

  // ── Калифорния: сигнал отказа от продажи данных ────────────────────────────
  'GPC-001': {
    kind: 'law',
    norm: {
      ru: 'CCPA, Civ. Code §1798.135(b), (e); 11 CCR §7025(c) — сигнал отказа',
      en: 'CCPA, Civ. Code §1798.135(b), (e); 11 CCR §7025(c) — opt-out preference signal',
      es: 'CCPA, Código Civil §1798.135(b), (e); 11 CCR §7025(c) — señal de exclusión',
      zh: 'CCPA《民法典》§1798.135(b)、(e)；11 CCR §7025(c) — 退出偏好信号',
    },
    url: CCPA_135,
    also: [
      { name: '11 CCR §7025 (CCPA Regulations, eff. 1 Jan 2026)', url: CCPA_REGS },
      { name: 'Civ. Code §1798.155', url: CCPA_155 },
      { name: 'CPPA — Updated Monetary Thresholds', url: CCPA_CPI },
    ],
    fine: ШТРАФ_CCPA,
    short: КОРОТКО_CCPA,
    cap: { amount: 7_988, currency: 'USD', key: 'CCPA' },
  },
  'GPC-002': {
    kind: 'law',
    norm: {
      ru: '11 CCR §7025(c)(6) и §7026(g) — показать, что отказ принят',
      en: '11 CCR §7025(c)(6) and §7026(g) — display that the opt-out was processed',
      es: '11 CCR §7025(c)(6) y §7026(g) — mostrar que la exclusión se ha procesado',
      zh: '11 CCR §7025(c)(6) 和 §7026(g) — 显示退出请求已处理',
    },
    url: CCPA_REGS,
    also: [
      { name: 'Civ. Code §1798.135', url: CCPA_135 },
      { name: 'CPPA — Updated Monetary Thresholds', url: CCPA_CPI },
    ],
    fine: ШТРАФ_CCPA,
    short: КОРОТКО_CCPA,
    cap: { amount: 7_988, currency: 'USD', key: 'CCPA' },
  },

  // ── Сведения о продавце: директива, размер штрафа задаёт страна ────────────
  'IMPR-001': {
    kind: 'law',
    norm: {
      ru: 'Директива 2000/31/EC, ст. 5 — сведения о поставщике услуг',
      en: 'Directive 2000/31/EC Art. 5 — general information about the provider',
      es: 'Directiva 2000/31/CE, art. 5 — información general del prestador',
      zh: '指令 2000/31/EC 第5条 — 服务提供者的一般信息',
    },
    url: ECOMMERCE,
    also: [
      { name: 'DE DDG §5', url: DE_DDG_5 },
      { name: 'DE DDG §33', url: DE_DDG_33 },
    ],
    fine: {
      ru: 'Размер штрафа задаёт каждая страна ЕС сама. Например, в Германии — до €50 000 (DDG §5, §33(2) Nr. 1 и §33(6) Nr. 3).',
      en: 'Each EU country sets the fine itself. For example, in Germany up to €50,000 (DDG §5, §33(2) no. 1 and §33(6) no. 3).',
      es: 'Cada país de la UE fija la multa. Por ejemplo, en Alemania hasta 50.000 € (DDG §5, §33.2 n.º 1 y §33.6 n.º 3).',
      zh: '罚款由各欧盟成员国自行规定。例如德国最高5万欧元（DDG 第5条、第33条第2款第1项及第6款第3项）。',
    },
    short: { ru: 'Задаёт страна (DE: до €50 000)', en: 'Set nationally (DE: up to €50,000)', es: 'Fija cada país (DE: hasta 50.000 €)', zh: '各国规定（德国：最高5万欧元）' },
  },

  // ── Чат-бот: признак, требует подтверждения ────────────────────────────────
  'AIACT-001': {
    kind: 'sign',
    norm: {
      ru: 'Регламент (ЕС) 2024/1689 (AI Act), ст. 50(1) — сообщить, что собеседник ИИ',
      en: 'Regulation (EU) 2024/1689 (AI Act) Art. 50(1) — disclose interaction with AI',
      es: 'Reglamento (UE) 2024/1689 (Ley de IA), art. 50.1 — informar de la interacción con IA',
      zh: '欧盟法规 2024/1689（人工智能法）第50条第1款 — 告知正在与人工智能互动',
    },
    url: `${AI_ACT}#art_50`,
    also: [
      { name: 'AI Act Art. 99', url: `${AI_ACT}#art_99` },
      { name: 'AI Act Art. 113', url: `${AI_ACT}#art_113` },
    ],
    fine: {
      ru: 'Обязанность лежит на поставщике системы ИИ и действует с 02.08.2026 (ст. 113). Штраф — до €15 000 000 или 3% оборота (ст. 99(4)(g)); для малых и средних компаний — меньшая из двух величин (ст. 99(6)). Чат с живым оператором под эту норму не подпадает — находку нужно подтвердить.',
      en: 'The duty lies with the AI system provider and applies from 2 Aug 2026 (Art. 113). Fine up to €15,000,000 or 3% of turnover (Art. 99(4)(g)); for SMEs, whichever of the two is lower (Art. 99(6)). A chat staffed by a live person is not covered — this finding needs confirmation.',
      es: 'La obligación recae en el proveedor del sistema de IA y se aplica desde el 02.08.2026 (art. 113). Multa de hasta 15.000.000 € o el 3 % del volumen de negocio (art. 99.4.g); para pymes, la menor de ambas cifras (art. 99.6). Un chat atendido por una persona no está incluido: este hallazgo requiere confirmación.',
      zh: '该义务由人工智能系统提供者承担，自2026年8月2日起适用（第113条）。罚款最高1500万欧元或营业额3%（第99条第4款(g)项）；中小企业取两者中较低者（第99条第6款）。由真人客服应答的聊天不在此列——此发现需确认。',
    },
    short: КОРОТКО_ПОДТВЕРДИТЬ,
  },

  // ── Доступность: WCAG 1.4.4, законы США и ЕС ───────────────────────────────
  'A11Y-VIEWPORT-001': {
    kind: 'law',
    norm: {
      ru: 'WCAG 2.1 / 2.2, критерий 1.4.4 «Изменение размера текста» (AA); ADA',
      en: 'WCAG 2.1 / 2.2 SC 1.4.4 Resize Text (AA); ADA',
      es: 'WCAG 2.1 / 2.2, criterio 1.4.4 «Cambio de tamaño del texto» (AA); ADA',
      zh: 'WCAG 2.1 / 2.2 成功标准 1.4.4 调整文本大小（AA）；ADA',
    },
    url: WCAG21_RESIZE,
    also: [
      { name: '28 CFR 85.5 — ADA civil penalties', url: ADA_PENALTY },
      { name: '28 CFR 35.200 — ADA Title II web rule', url: ADA_TITLE2 },
      { name: 'Directive (EU) 2019/882 (EAA) Art. 2, Art. 30', url: `${EAA}#art_2` },
      { name: 'DE BFSG §37', url: DE_BFSG_37 },
    ],
    fine: {
      ru: 'США: в иске Минюста по ADA Title III — до $118 225 за первое нарушение и до $236 451 за повторное (28 CFR 85.5). Госорганы США обязаны соблюдать WCAG 2.1 AA с 26.04.2027 или 26.04.2028 (28 CFR 35.200). ЕС: Акт о доступности (Директива 2019/882) действует с 28.06.2025, штраф задаёт каждая страна (ст. 30); например, в Германии — до €100 000 (BFSG §37(1) Nr. 8 и §37(2)).',
      en: 'US: in a DOJ action under ADA Title III — up to $118,225 for a first violation and up to $236,451 for a subsequent one (28 CFR 85.5). US state and local governments must meet WCAG 2.1 AA from 26 Apr 2027 or 26 Apr 2028 (28 CFR 35.200). EU: the Accessibility Act (Directive 2019/882) applies from 28 Jun 2025; each country sets the penalty (Art. 30) — e.g. in Germany up to €100,000 (BFSG §37(1) no. 8 and §37(2)).',
      es: 'EE. UU.: en una acción del Departamento de Justicia por la ADA Título III, hasta 118.225 $ por la primera infracción y hasta 236.451 $ por las siguientes (28 CFR 85.5). Los gobiernos estatales y locales deben cumplir WCAG 2.1 AA desde el 26.04.2027 o el 26.04.2028 (28 CFR 35.200). UE: la Ley de Accesibilidad (Directiva 2019/882) se aplica desde el 28.06.2025; cada país fija la sanción (art. 30); por ejemplo, en Alemania hasta 100.000 € (BFSG §37.1 n.º 8 y §37.2).',
      zh: '美国：司法部依据 ADA 第三章起诉——首次违规最高118,225美元，再次违规最高236,451美元（28 CFR 85.5）。美国州和地方政府须自2027年4月26日或2028年4月26日起符合 WCAG 2.1 AA（28 CFR 35.200）。欧盟：《无障碍法案》（指令 2019/882）自2025年6月28日起适用，罚则由各国规定（第30条）；例如德国最高10万欧元（BFSG 第37条第1款第8项及第2款）。',
    },
    short: { ru: 'США: до $118 225', en: 'US: up to $118,225', es: 'EE. UU.: hasta 118.225 $', zh: '美国：最高118,225美元' },
    cap: { amount: 118_225, currency: 'USD', key: 'ADA' },
  },

  // ── Устаревшее и рекомендации: штрафа нет ──────────────────────────────────
  'EUODR-001': {
    kind: 'standard',
    norm: {
      ru: 'Регламент (ЕС) 2024/3228 — платформа ODR закрыта с 20.07.2025',
      en: 'Regulation (EU) 2024/3228 — ODR platform discontinued from 20 Jul 2025',
      es: 'Reglamento (UE) 2024/3228 — plataforma ODR suprimida desde el 20.07.2025',
      zh: '欧盟法规 2024/3228 — ODR 平台自2025年7月20日起停用',
    },
    url: ODR_REPEAL,
    fine: {
      ru: 'Штрафа нет: обязанность ссылаться на платформу отменена с 20.07.2025 (ст. 1), ссылка просто устарела.',
      en: 'No fine: the duty to link to the platform was repealed from 20 Jul 2025 (Art. 1); the link is simply outdated.',
      es: 'Sin multa: la obligación de enlazar a la plataforma se derogó el 20.07.2025 (art. 1); el enlace simplemente está desactualizado.',
      zh: '无罚款：链接该平台的义务已自2025年7月20日起废止（第1条），该链接只是已过时。',
    },
    short: КОРОТКО_НЕТ,
  },
  'COOKIE-LIFE-001': {
    kind: 'standard',
    norm: {
      ru: 'CNIL — рекомендация: срок жизни счётчиков аудитории 13 месяцев',
      en: 'CNIL recommendation — 13-month lifetime for audience-measurement trackers',
      es: 'Recomendación de la CNIL — vida útil de 13 meses para rastreadores de audiencia',
      zh: 'CNIL 建议 — 受众测量追踪器有效期13个月',
    },
    url: CNIL_13_MOIS,
    fine: {
      ru: 'Штрафа нет: это рекомендация французского регулятора CNIL, а не закон.',
      en: 'No fine: this is a recommendation of the French regulator CNIL, not a law.',
      es: 'Sin multa: es una recomendación del regulador francés CNIL, no una ley.',
      zh: '无罚款：这是法国监管机构 CNIL 的建议，而非法律。',
    },
    short: КОРОТКО_НЕТ,
  },
  'OPS-ROBOTS-001': стандарт(один('RFC 9309 — Robots Exclusion Protocol'), RFC(9309)),
  'OPS-SECTXT-001': стандарт(один('RFC 9116 — security.txt'), RFC(9116)),
  'DNS-SEC-001': стандарт(один('RFC 4033 — DNSSEC'), RFC(4033)),
  'DNS-DMARC-001': стандарт(один('RFC 7489 — DMARC'), RFC(7489)),
  'DNS-SPF-001': стандарт(один('RFC 7208 — SPF'), RFC(7208)),
  'DNS-SPF-002': стандарт(один('RFC 7208 §4.6.4 — DNS lookup limit (10)'), RFC(7208, '4.6.4')),
  'PERF-IMG-001': стандарт(один('WHATWG HTML — loading="lazy"'), 'https://html.spec.whatwg.org/multipage/urls-and-fetching.html#lazy-loading-attributes'),
  'PERF-IMG-002': стандарт(один('WHATWG HTML — srcset, sizes'), 'https://html.spec.whatwg.org/multipage/images.html#srcset-attributes'),
};

/** Все коды, у которых есть привязка. Для проверок и отчёта о полноте. */
export const КОДЫ_С_ЗАКОНОМ = Object.keys(ЗАКОНЫ);

function язык(locale?: string): Язык {
  const l = String(locale || 'en').slice(0, 2).toLowerCase();
  return (l === 'ru' || l === 'es' || l === 'zh') ? l : 'en';
}

/** Закон, ссылка и штраф для кода находки. null — если кода нет в таблице. */
export function probeLaw(code: string, locale?: string): ЗаконНаходки | null {
  const з = ЗАКОНЫ[code];
  if (!з) return null;
  const я = язык(locale);
  const fine = (з.fine ?? ШТРАФ_СТАНДАРТ)[я];
  return {
    lawKind: з.kind,
    lawName: з.norm[я],
    lawUrl: з.url,
    fineAmount: fine,
    fineShort: (з.short ?? КОРОТКО_НЕТ)[я],
    ...(з.cap ? { fineCap: з.cap } : {}),
    lawSources: [{ name: з.norm.en, url: з.url }, ...(з.also ?? [])],
  };
}

/**
 * Подставляет в находку её настоящий закон. Находки без привязки (догадки
 * модели по реестру) возвращаются как были. Нужна там, где отдаются уже
 * сохранённые отчёты: в базе они лежат со старой подписью, и переписывать
 * базу незачем — точную подпись ставим при выдаче.
 */
export function applyProbeLaw<T extends { code: string }>(t: T, locale?: string): T {
  const з = probeLaw(t.code, locale);
  return з ? { ...t, ...з } : t;
}

/**
 * Потолок штрафов по букве закона — каждый закон один раз.
 *
 * Входят только находки вида `law` с фиксированной суммой в самом законе.
 * Не входят: защитные меры без отдельного штрафа, стандарты, признаки,
 * требующие подтверждения, нормы, где размер штрафа задаёт страна, и догадки
 * модели. Евро и доллары не складываются между собой.
 */
export function statutoryCeiling(threats: Array<{ fineCap?: ПотолокШтрафа }>): {
  EUR: number; USD: number; laws: string[];
} {
  const поЗакону = new Map<string, ПотолокШтрафа>();
  for (const t of threats) {
    const c = t.fineCap;
    if (!c || !(c.amount > 0)) continue;
    const был = поЗакону.get(c.key);
    if (!был || c.amount > был.amount) поЗакону.set(c.key, c);
  }
  let EUR = 0; let USD = 0;
  for (const c of поЗакону.values()) {
    if (c.currency === 'EUR') EUR += c.amount; else USD += c.amount;
  }
  return { EUR, USD, laws: Array.from(поЗакону.keys()) };
}
