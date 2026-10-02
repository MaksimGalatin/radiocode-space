'use client';

/**
 * Калькулятор правовых рисков сайта — переписан 02.10.2026 по слову Архитектора:
 * «сделай его более функциональным и без перегибов, чтобы он был удобным инструментом».
 *
 * Что было не так в прежней версии (один файл на 4 сайтах расходился в трёх вариантах):
 *   1. «Годовая вероятность иска» считалась выдуманной формулой log10(трафик)·15·k —
 *      у сайта с 25 000 просмотров в США выходило 99 %. Источника у формулы не было.
 *   2. ADA: «$75 000 / $150 000 штрафа» — суммы 1990-х, и это штраф по иску Минюста, а не
 *      частного истца. Частный истец по ADA денег не получает: суд может обязать исправить
 *      сайт и взыскать гонорар адвоката («may», а не «mandatory», как было написано).
 *   3. Диапазоны «$35 000–$75 000», «$120 000–$250 000+», «€47 000–€150 000» ничем не
 *      подтверждались; трафик в размер штрафа GDPR вообще не входит.
 *   4. РФ: «до ₽500 000» — статья 13.11 после 420-ФЗ устроена иначе (утечки — до 15 млн
 *      и оборотные штрафы), а 9.13 — это 20–30 тыс. ₽.
 *
 * Теперь: вместо «вероятности» — уровень внимания истцов по публичной статистике исков с
 * объяснением «почему»; вместо выдуманных диапазонов — то, что прямо написано в законе, и
 * назначенные штрафы GDPR по отраслям. У каждой цифры — источник, проверенный 02.10.2026:
 *   UsableNet 2025 Year-End Report (5 114 исков; 70 % — интернет-магазины; 36 % ответчиков
 *   с выручкой > $25 млн) · Federal Register 2025-12494 (ADA: $118 225 / $236 451) ·
 *   Cal. Civ. Code § 52 ($4 000) · CPPA 17.12.2024 и порог $26 625 000 · CMS GDPR
 *   Enforcement Tracker, снимок 04.09.2026 · КонсультантПлюс, КоАП 13.11 (ред. 420-ФЗ), 9.13.
 *
 * Числа форматируются своей функцией, а не toLocaleString: сервер и браузер обязаны выдать
 * одну и ту же строку, иначе ошибка гидратации #418 (было 30.09.2026).
 */

import React, { useId, useMemo, useState } from 'react';
import { Scale, ArrowRight, Info } from 'lucide-react';
import { useLanguageOptional } from '../lib/LanguageContext';

type Яз = 'ru' | 'en' | 'es' | 'zh';
type Аудитория = 'us' | 'ca' | 'eu' | 'rf';
type ТипСайта = 'shop' | 'service' | 'info';
type Уровень = 'low' | 'mid' | 'high';

// Назначенные штрафы GDPR по отраслям: CMS GDPR Enforcement Tracker, снимок 04.09.2026,
// только дела со штрафом (тот же расчёт, что data/gdpr-sector-risk.json; примеры с
// названиями компаний в сборку браузера сознательно не берём).
const GDPR_ОТРАСЛИ = {
  'Industry and Commerce': { дел: 604, медиана: 5000, p90: 240000, макс: 150000000 },
  'Media, Telecoms and Broadcasting': { дел: 370, медиана: 55000, p90: 4900000, макс: 1200000000 },
  'Public Sector and Education': { дел: 359, медиана: 10000, p90: 150000, макс: 5000000 },
  'Individuals and Private Associations': { дел: 351, медиана: 1000, p90: 10000, макс: 3501000 },
  'Finance, Insurance and Consulting': { дел: 326, медиана: 20000, p90: 900000, макс: 31800000 },
  'Health Care': { дел: 274, медиана: 10000, p90: 243800, макс: 5000000 },
  'Employment': { дел: 213, медиана: 8000, p90: 120000, макс: 290000000 },
  'Transportation and Energy': { дел: 170, медиана: 40000, p90: 3000000, макс: 100000000 },
  'Accomodation and Hospitality': { дел: 100, медиана: 2700, p90: 50100, макс: 20450000 },
  'Real Estate': { дел: 87, медиана: 2000, p90: 40000, макс: 1900000 },
  'Not assigned': { дел: 218, медиана: 3905, p90: 25000, макс: 5004000 },
} as const;
type Отрасль = keyof typeof GDPR_ОТРАСЛИ;
const ОТРАСЛИ = Object.keys(GDPR_ОТРАСЛИ) as Отрасль[];

const ИСТОЧНИКИ = {
  usablenet: 'https://info.usablenet.com/hubfs/Remediated%20-%202025_Year-End_Digital_Accessibility_Lawsuit_Report_FINAL.pdf',
  ada12188: 'https://www.law.cornell.edu/uscode/text/42/12188',
  ada12205: 'https://www.law.cornell.edu/uscode/text/42/12205',
  adaПени: 'https://www.federalregister.gov/documents/2025/07/03/2025-12494/civil-monetary-penalties-inflation-adjustments-for-2025',
  unruh: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=52',
  cppa: 'https://cppa.ca.gov/announcements/2024/20241217.html',
  cppaПорог: 'https://cppa.ca.gov/regulations/cpi_adjustment.html',
  cms: 'https://www.enforcementtracker.com/',
  gdpr83: 'https://gdpr-info.eu/art-83-gdpr/',
  eaa: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj',
  koap1311: 'https://www.consultant.ru/document/cons_doc_LAW_34661/1f421640c6775ff67079ebde06a7d2f6d17b96db/',
  koap: 'https://www.consultant.ru/document/cons_doc_LAW_34661/',
};

const Т = {
  ru: {
    title: 'Калькулятор правовых рисков сайта',
    subtitle: 'Какие законы касаются вашего сайта, что в них прямо написано о штрафах и насколько такие сайты интересны истцам — по проверенным источникам.',
    audienceLabel: 'Где ваши посетители',
    audience: { us: 'США', ca: 'Калифорния', eu: 'Евросоюз', rf: 'Россия' },
    audienceHint: 'Выберите хотя бы одну страну.',
    typeLabel: 'Что делают на сайте',
    types: { shop: 'Покупают', service: 'Заказывают, записываются, входят в кабинет', info: 'Только читают' },
    visitsLabel: 'Посещаемость в месяц',
    bigLabel: 'Годовая выручка больше $25 млн',
    sectorLabel: 'Отрасль (для статистики штрафов в ЕС)',
    sectors: {
      'Industry and Commerce': 'Промышленность и торговля',
      'Media, Telecoms and Broadcasting': 'СМИ, связь и вещание',
      'Public Sector and Education': 'Госсектор и образование',
      'Individuals and Private Associations': 'Частные лица и объединения',
      'Finance, Insurance and Consulting': 'Финансы, страхование, консалтинг',
      'Health Care': 'Здравоохранение',
      'Employment': 'Трудовые отношения',
      'Transportation and Energy': 'Транспорт и энергетика',
      'Accomodation and Hospitality': 'Гостиницы и общепит',
      'Real Estate': 'Недвижимость',
      'Not assigned': 'Отрасль не указана',
    },
    levelTitle: 'Внимание истцов в США',
    levels: { low: 'Низкое', mid: 'Заметное', high: 'Повышенное' },
    levelNote: 'Ориентир по публичной статистике исков, а не вероятность. Точную картину даёт только проверка самого сайта.',
    whyTitle: 'Почему такой уровень',
    reasons: {
      shop: '70 % исков о доступности в 2025 году — против интернет-магазинов.',
      service: 'На втором месте по искам — общепит: 21 %. Заказы и запись через сайт сюда относятся.',
      info: 'Сайты без продаж и заказов попадают в иски реже, но риск не нулевой.',
      big: 'У 36 % ответчиков 2025 года выручка больше $25 млн: истцы выбирают известные бренды.',
      visits: 'Большая посещаемость делает сайт заметнее для юридических фирм, которые ищут нарушения.',
    },
    statLine: 'В 2025 году в США подано {total} исков о цифровой доступности: {fed} в федеральных судах и {state} в судах Нью-Йорка и Калифорнии.',
    noUs: 'Иски по ADA касаются сайтов, которыми пользуются в США. Выберите «США», чтобы увидеть этот блок.',
    lawTitle: 'Что прямо написано в законе',
    us: {
      title: 'США · ADA, раздел III',
      private: 'Частный иск: денег в пользу истца закон не предусматривает. Суд может обязать исправить сайт и взыскать с вас гонорар адвоката истца.',
      doj: 'Иск Министерства юстиции (бывает редко): до {first} за первое нарушение и до {next} за повторное — суммы с 3 июля 2025 года.',
    },
    ca: {
      title: 'Калифорния · закон Унру и CCPA',
      unruh: 'Закон Унру (ст. 52 Гражданского кодекса): не меньше {min} за каждое нарушение.',
      ccpa: 'CCPA касается вас, только если выручка больше {threshold}, или вы обрабатываете данные 100 000 и более жителей Калифорнии, или половина выручки — от продажи данных. Тогда штраф до {fine} за нарушение и до {fineIntent} за умышленное, а при утечке — от {dmgMin} до {dmgMax} каждому пострадавшему.',
    },
    eu: {
      title: 'Евросоюз · GDPR и Акт о доступности',
      sector: '«{sector}»: {cases} дел со штрафом. Медиана — {median}; 9 из 10 штрафов не больше {p90}; самый крупный — {max}.',
      cap: 'Потолок по закону — €20 млн или 4 % мирового годового оборота, если это больше (ст. 83 GDPR).',
      caution: 'Это назначенные штрафы по опубликованным делам, а не прогноз для вашей компании.',
      eaa: 'С 28 июня 2025 года действует Европейский акт о доступности: интернет-магазины, банки, транспорт и ряд других услуг. Размер штрафов устанавливает каждая страна ЕС; микропредприятия в сфере услуг освобождены.',
    },
    rf: {
      title: 'Россия · 152-ФЗ и КоАП',
      pd: 'Персональные данные (ст. 13.11 КоАП), для юрлиц: обработка без законных оснований — 150–300 тыс. ₽; без согласия — 300–700 тыс. ₽; без уведомления Роскомнадзора — 100–300 тыс. ₽.',
      leak: 'Утечка персональных данных: от 3 до 15 млн ₽ в зависимости от числа затронутых людей; повторная — 1–3 % выручки, но не меньше 20 и не больше 500 млн ₽.',
      a11y: 'Доступность для инвалидов (ст. 9.13 КоАП): 20–30 тыс. ₽ для юрлиц.',
    },
    sources: 'Источники',
    disclaimer: 'Справка по открытым источникам на 02.10.2026, не юридическая консультация. Суммы — пределы закона и опубликованная статистика, а не прогноз для вашей компании.',
    cta: 'Проверить мой сайт бесплатно',
    newTab: '(откроется в новой вкладке)',
  },
  en: {
    title: 'Website Legal Risk Calculator',
    subtitle: 'Which laws apply to your website, what they actually say about penalties, and how attractive sites like yours are to plaintiffs — from verified sources.',
    audienceLabel: 'Where your visitors are',
    audience: { us: 'United States', ca: 'California', eu: 'European Union', rf: 'Russia' },
    audienceHint: 'Select at least one region.',
    typeLabel: 'What people do on your site',
    types: { shop: 'Buy', service: 'Order, book or log in', info: 'Only read' },
    visitsLabel: 'Monthly visits',
    bigLabel: 'Annual revenue above $25M',
    sectorLabel: 'Industry (for EU fine statistics)',
    sectors: {
      'Industry and Commerce': 'Industry and commerce',
      'Media, Telecoms and Broadcasting': 'Media, telecoms and broadcasting',
      'Public Sector and Education': 'Public sector and education',
      'Individuals and Private Associations': 'Individuals and private associations',
      'Finance, Insurance and Consulting': 'Finance, insurance and consulting',
      'Health Care': 'Health care',
      'Employment': 'Employment',
      'Transportation and Energy': 'Transportation and energy',
      'Accomodation and Hospitality': 'Accommodation and hospitality',
      'Real Estate': 'Real estate',
      'Not assigned': 'Industry not specified',
    },
    levelTitle: 'Plaintiff attention in the US',
    levels: { low: 'Low', mid: 'Noticeable', high: 'Elevated' },
    levelNote: 'An orientation based on public lawsuit statistics, not a probability. Only a check of the site itself gives the real picture.',
    whyTitle: 'Why this level',
    reasons: {
      shop: '70% of 2025 accessibility lawsuits targeted online stores.',
      service: 'Food service ranks second with 21% of lawsuits; online ordering and booking fall here.',
      info: 'Sites without sales or orders are sued less often, but the risk is not zero.',
      big: '36% of 2025 defendants had revenue above $25M: plaintiffs pick well-known brands.',
      visits: 'High traffic makes a site more visible to law firms that search for violations.',
    },
    statLine: 'In 2025, {total} digital accessibility lawsuits were filed in the US: {fed} in federal courts and {state} in New York and California state courts.',
    noUs: 'ADA lawsuits concern websites used in the United States. Select "United States" to see this block.',
    lawTitle: 'What the law actually says',
    us: {
      title: 'United States · ADA Title III',
      private: 'Private lawsuit: the law gives the plaintiff no money damages. The court may order you to fix the site and award the plaintiff\'s attorney fees.',
      doj: 'Department of Justice action (rare): up to {first} for a first violation and up to {next} for a subsequent one — amounts since 3 July 2025.',
    },
    ca: {
      title: 'California · Unruh Act and CCPA',
      unruh: 'Unruh Act (Civil Code § 52): no less than {min} per violation.',
      ccpa: 'CCPA applies only if your revenue exceeds {threshold}, or you handle data of 100,000+ California residents, or half of your revenue comes from selling data. Then fines reach {fine} per violation and {fineIntent} per intentional one, and after a breach {dmgMin}–{dmgMax} per affected person.',
    },
    eu: {
      title: 'European Union · GDPR and Accessibility Act',
      sector: '"{sector}": {cases} cases with a fine. Median {median}; 9 in 10 fines at most {p90}; the largest {max}.',
      cap: 'Legal ceiling: €20M or 4% of worldwide annual turnover, whichever is higher (GDPR Art. 83).',
      caution: 'These are fines imposed in published cases, not a forecast for your company.',
      eaa: 'The European Accessibility Act applies since 28 June 2025 to online stores, banking, transport and several other services. Each EU country sets its own penalties; microenterprises providing services are exempt.',
    },
    rf: {
      title: 'Russia · Law 152-FZ and Administrative Code',
      pd: 'Personal data (Art. 13.11), legal entities: processing without legal grounds RUB 150–300K; without consent RUB 300–700K; without notifying Roskomnadzor RUB 100–300K.',
      leak: 'Personal data breach: RUB 3–15M depending on the number of people affected; a repeat breach 1–3% of revenue, no less than RUB 20M and no more than RUB 500M.',
      a11y: 'Accessibility for people with disabilities (Art. 9.13): RUB 20–30K for legal entities.',
    },
    sources: 'Sources',
    disclaimer: 'Reference from public sources as of 2 Oct 2026, not legal advice. Amounts are statutory limits and published statistics, not a forecast for your company.',
    cta: 'Check my site for free',
    newTab: '(opens in a new tab)',
  },
  es: {
    title: 'Calculadora de riesgos legales del sitio',
    subtitle: 'Qué leyes afectan a su sitio, qué dicen exactamente sobre las sanciones y cuánto interesan sitios como el suyo a los demandantes, con fuentes verificadas.',
    audienceLabel: 'Dónde están sus visitantes',
    audience: { us: 'Estados Unidos', ca: 'California', eu: 'Unión Europea', rf: 'Rusia' },
    audienceHint: 'Elija al menos una región.',
    typeLabel: 'Qué hacen en su sitio',
    types: { shop: 'Compran', service: 'Piden, reservan o entran en su cuenta', info: 'Solo leen' },
    visitsLabel: 'Visitas al mes',
    bigLabel: 'Facturación anual superior a 25 M$',
    sectorLabel: 'Sector (para las estadísticas de multas en la UE)',
    sectors: {
      'Industry and Commerce': 'Industria y comercio',
      'Media, Telecoms and Broadcasting': 'Medios, telecomunicaciones y radiodifusión',
      'Public Sector and Education': 'Sector público y educación',
      'Individuals and Private Associations': 'Particulares y asociaciones privadas',
      'Finance, Insurance and Consulting': 'Finanzas, seguros y consultoría',
      'Health Care': 'Sanidad',
      'Employment': 'Empleo',
      'Transportation and Energy': 'Transporte y energía',
      'Accomodation and Hospitality': 'Alojamiento y hostelería',
      'Real Estate': 'Inmobiliario',
      'Not assigned': 'Sector no indicado',
    },
    levelTitle: 'Atención de los demandantes en EE. UU.',
    levels: { low: 'Baja', mid: 'Apreciable', high: 'Elevada' },
    levelNote: 'Una orientación basada en estadísticas públicas de demandas, no una probabilidad. Solo la revisión del propio sitio da la imagen real.',
    whyTitle: 'Por qué este nivel',
    reasons: {
      shop: 'El 70 % de las demandas de accesibilidad de 2025 se dirigieron contra tiendas en línea.',
      service: 'La restauración ocupa el segundo lugar con el 21 %; los pedidos y reservas en línea entran aquí.',
      info: 'Los sitios sin ventas ni pedidos reciben menos demandas, pero el riesgo no es cero.',
      big: 'El 36 % de los demandados en 2025 facturaba más de 25 M$: los demandantes eligen marcas conocidas.',
      visits: 'Un tráfico alto hace el sitio más visible para los bufetes que buscan infracciones.',
    },
    statLine: 'En 2025 se presentaron en EE. UU. {total} demandas por accesibilidad digital: {fed} en tribunales federales y {state} en tribunales de Nueva York y California.',
    noUs: 'Las demandas por la ADA afectan a sitios usados en Estados Unidos. Elija «Estados Unidos» para ver este bloque.',
    lawTitle: 'Qué dice exactamente la ley',
    us: {
      title: 'Estados Unidos · ADA, Título III',
      private: 'Demanda privada: la ley no concede dinero al demandante. El tribunal puede obligarle a corregir el sitio y a pagar los honorarios del abogado del demandante.',
      doj: 'Acción del Departamento de Justicia (poco frecuente): hasta {first} por la primera infracción y hasta {next} por las siguientes; importes vigentes desde el 3 de julio de 2025.',
    },
    ca: {
      title: 'California · Ley Unruh y CCPA',
      unruh: 'Ley Unruh (art. 52 del Código Civil): no menos de {min} por cada infracción.',
      ccpa: 'La CCPA le afecta solo si factura más de {threshold}, trata datos de 100 000 o más residentes de California o la mitad de sus ingresos procede de vender datos. En ese caso, multas de hasta {fine} por infracción y {fineIntent} si es intencionada, y tras una filtración {dmgMin}–{dmgMax} por persona afectada.',
    },
    eu: {
      title: 'Unión Europea · RGPD y Ley de Accesibilidad',
      sector: '«{sector}»: {cases} casos con multa. Mediana {median}; 9 de cada 10 multas no superan {p90}; la mayor, {max}.',
      cap: 'Límite legal: 20 M€ o el 4 % de la facturación anual mundial, lo que sea mayor (art. 83 del RGPD).',
      caution: 'Son multas impuestas en casos publicados, no una previsión para su empresa.',
      eaa: 'Desde el 28 de junio de 2025 se aplica la Ley Europea de Accesibilidad a tiendas en línea, banca, transporte y otros servicios. Cada país de la UE fija sus sanciones; las microempresas de servicios están exentas.',
    },
    rf: {
      title: 'Rusia · Ley 152-FZ y Código Administrativo',
      pd: 'Datos personales (art. 13.11), personas jurídicas: tratamiento sin base legal 150 000–300 000 RUB; sin consentimiento 300 000–700 000 RUB; sin notificar a Roskomnadzor 100 000–300 000 RUB.',
      leak: 'Filtración de datos personales: de 3 a 15 millones de RUB según el número de afectados; si se repite, el 1–3 % de los ingresos, no menos de 20 ni más de 500 millones de RUB.',
      a11y: 'Accesibilidad para personas con discapacidad (art. 9.13): 20 000–30 000 RUB para personas jurídicas.',
    },
    sources: 'Fuentes',
    disclaimer: 'Información de fuentes públicas a 2 de octubre de 2026, no es asesoramiento jurídico. Los importes son límites legales y estadísticas publicadas, no una previsión para su empresa.',
    cta: 'Revisar mi sitio gratis',
    newTab: '(se abre en una pestaña nueva)',
  },
  zh: {
    title: '网站法律风险计算器',
    subtitle: '哪些法律适用于您的网站、法律对罚款的明确规定，以及此类网站对原告的吸引程度——均基于已核实的来源。',
    audienceLabel: '您的访客所在地区',
    audience: { us: '美国', ca: '加利福尼亚州', eu: '欧盟', rf: '俄罗斯' },
    audienceHint: '请至少选择一个地区。',
    typeLabel: '用户在网站上做什么',
    types: { shop: '购买商品', service: '下单、预约或登录账户', info: '仅浏览内容' },
    visitsLabel: '每月访问量',
    bigLabel: '年收入超过 2500 万美元',
    sectorLabel: '行业（用于欧盟罚款统计）',
    sectors: {
      'Industry and Commerce': '工业与商业',
      'Media, Telecoms and Broadcasting': '媒体、电信与广播',
      'Public Sector and Education': '公共部门与教育',
      'Individuals and Private Associations': '个人与私人团体',
      'Finance, Insurance and Consulting': '金融、保险与咨询',
      'Health Care': '医疗保健',
      'Employment': '劳动雇佣',
      'Transportation and Energy': '交通与能源',
      'Accomodation and Hospitality': '住宿与餐饮',
      'Real Estate': '房地产',
      'Not assigned': '未注明行业',
    },
    levelTitle: '在美国受原告关注的程度',
    levels: { low: '低', mid: '明显', high: '较高' },
    levelNote: '这是基于公开诉讼统计的参考，而非概率。只有对网站本身的检测才能反映真实情况。',
    whyTitle: '为什么是这个等级',
    reasons: {
      shop: '2025 年 70% 的无障碍诉讼针对网店。',
      service: '餐饮业以 21% 位居第二；在线点单和预约属于此类。',
      info: '没有销售或订单的网站被起诉较少，但风险并非为零。',
      big: '2025 年 36% 的被告年收入超过 2500 万美元：原告倾向于选择知名品牌。',
      visits: '访问量大会让网站更容易被专门搜寻违规的律师事务所注意到。',
    },
    statLine: '2025 年美国共提起 {total} 起数字无障碍诉讼：联邦法院 {fed} 起，纽约州和加州州法院 {state} 起。',
    noUs: 'ADA 诉讼涉及在美国使用的网站。选择"美国"即可查看此部分。',
    lawTitle: '法律的明确规定',
    us: {
      title: '美国 · ADA 第三章',
      private: '私人诉讼：法律不给予原告金钱赔偿。法院可责令您修复网站，并判您支付原告的律师费。',
      doj: '美国司法部起诉（较少见）：首次违规最高 {first}，再次违规最高 {next}——自 2025 年 7 月 3 日起的金额。',
    },
    ca: {
      title: '加利福尼亚州 · Unruh 法与 CCPA',
      unruh: 'Unruh 法（《民法典》第 52 条）：每次违规不少于 {min}。',
      ccpa: '仅当您的年收入超过 {threshold}、处理 10 万名以上加州居民的数据，或一半收入来自出售数据时，CCPA 才适用。此时每次违规罚款最高 {fine}，故意违规最高 {fineIntent}；发生数据泄露时，每位受影响者 {dmgMin}–{dmgMax}。',
    },
    eu: {
      title: '欧盟 · GDPR 与《欧洲无障碍法案》',
      sector: '"{sector}"：{cases} 起罚款案件。中位数 {median}；九成罚款不超过 {p90}；最高 {max}。',
      cap: '法定上限：2000 万欧元或全球年营业额的 4%，以较高者为准（GDPR 第 83 条）。',
      caution: '这些是已公布案件中实际作出的罚款，而非对贵公司的预测。',
      eaa: '《欧洲无障碍法案》自 2025 年 6 月 28 日起适用于网店、银行、交通及其他若干服务。罚款金额由各成员国自行规定；提供服务的微型企业除外。',
    },
    rf: {
      title: '俄罗斯 · 第 152-FZ 号联邦法与《行政违法法典》',
      pd: '个人数据（第 13.11 条），法人：无合法依据处理 15 万–30 万卢布；未经同意处理 30 万–70 万卢布；未通知俄联邦通信监管局 10 万–30 万卢布。',
      leak: '个人数据泄露：视受影响人数为 300 万–1500 万卢布；再次泄露为收入的 1–3%，不低于 2000 万、不高于 5 亿卢布。',
      a11y: '残障人士无障碍（第 9.13 条）：法人 2 万–3 万卢布。',
    },
    sources: '来源',
    disclaimer: '截至 2026 年 10 月 2 日的公开来源参考，不构成法律意见。金额为法定上限和已公布的统计数据，而非对贵公司的预测。',
    cta: '免费检测我的网站',
    newTab: '（在新标签页中打开）',
  },
} as const;

// Разделитель разрядов по языку страницы — одинаково на сервере и в браузере.
const РАЗДЕЛИТЕЛЬ: Record<Яз, string> = { ru: ' ', en: ',', es: '.', zh: ',' };

function число(n: number, яз: Яз): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, РАЗДЕЛИТЕЛЬ[яз]);
}
function доллары(n: number, яз: Яз): string {
  return `$${число(n, яз)}`;
}
function евро(n: number, яз: Яз): string {
  return `€${число(n, яз)}`;
}

// Ползунок 0–100 по логарифмической шкале: от 1 000 до ~5 000 000 посещений, округление
// до двух значащих цифр (30 000, а не 30 199).
function посещения(шаг: number): number {
  const v = Math.pow(10, 3 + шаг * 0.037);
  const p = Math.pow(10, Math.floor(Math.log10(v)) - 1);
  return Math.round(v / p) * p;
}

function подставить(шаблон: string, значения: Record<string, string>): string {
  return шаблон.replace(/\{(\w+)\}/g, (_, k: string) => значения[k] ?? '');
}

const ЦВЕТ_УРОВНЯ: Record<Уровень, string> = {
  high: 'text-rose-700 dark:text-rose-400 border-rose-500/20 bg-rose-500/10',
  mid: 'text-amber-500 border-amber-500/20 bg-amber-500/10',
  low: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10',
};
const ЦВЕТ_ПОЛОСЫ: Record<Уровень, string> = {
  high: 'bg-gradient-to-r from-orange-500 to-rose-600',
  mid: 'bg-gradient-to-r from-yellow-500 to-amber-500',
  low: 'bg-gradient-to-r from-emerald-500 to-cyan-500',
};
const ШИРИНА_ПОЛОСЫ: Record<Уровень, string> = { low: '33%', mid: '66%', high: '100%' };

function Источник({ href, children, newTab }: { href: string; children: React.ReactNode; newTab: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[13px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
    >
      {children} ↗<span className="sr-only"> {newTab}</span>
    </a>
  );
}

export default function RiskCalculator() {
  const _ctx = useLanguageOptional();
  const яз: Яз = (['ru', 'en', 'es', 'zh'] as const).includes(_ctx?.locale as Яз) ? (_ctx?.locale as Яз) : 'en';
  const t = Т[яз];
  const ид = useId();

  const [аудитория, setАудитория] = useState<Аудитория[]>(['us']);
  const [тип, setТип] = useState<ТипСайта>('shop');
  const [шаг, setШаг] = useState<number>(40);
  const [крупный, setКрупный] = useState<boolean>(false);
  const [отрасль, setОтрасль] = useState<Отрасль>('Industry and Commerce');

  const визиты = посещения(шаг);
  const есть = (a: Аудитория) => аудитория.includes(a);
  const переключить = (a: Аудитория) =>
    setАудитория((было) => (было.includes(a) ? было.filter((x) => x !== a) : [...было, a]));

  // Уровень внимания истцов — только для США: сумма открытых признаков из отчёта UsableNet 2025.
  const { уровень, причины } = useMemo(() => {
    const причины: string[] = [];
    let баллы = 0;
    if (тип === 'shop') { баллы += 2; причины.push(t.reasons.shop); }
    else if (тип === 'service') { баллы += 1; причины.push(t.reasons.service); }
    else причины.push(t.reasons.info);
    if (крупный) { баллы += 1; причины.push(t.reasons.big); }
    if (визиты >= 100000) { баллы += 1; причины.push(t.reasons.visits); }
    const уровень: Уровень = баллы >= 3 ? 'high' : баллы === 2 ? 'mid' : 'low';
    return { уровень, причины };
  }, [тип, крупный, визиты, t]);

  const сектор = GDPR_ОТРАСЛИ[отрасль];

  const прокрутитьКПроверке = () => {
    const el = document.querySelector('input[type="url"]') as HTMLInputElement | null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const кнопка = (активна: boolean) =>
    `text-left px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
      активна
        ? 'bg-purple-500/10 border-purple-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.1)]'
        : 'bg-black/30 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
    }`;

  return (
    <div className="w-full max-w-4xl mx-auto glass rounded-3xl p-6 sm:p-8 border border-white/8 relative overflow-hidden my-16 shadow-[0_0_50px_rgba(139,92,246,0.05)]">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-start gap-3 text-left">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-purple-400" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{t.title}</h3>
            <p className="text-[13px] text-gray-400 mt-1 leading-relaxed">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start pt-2">
          {/* Вопросы */}
          <div className="space-y-6 text-left">
            <div className="space-y-2.5" role="group" aria-labelledby={`${ид}-aud`}>
              <span id={`${ид}-aud`} className="text-xs text-gray-400 font-semibold block">{t.audienceLabel}</span>
              <div className="grid grid-cols-2 gap-2">
                {(['us', 'ca', 'eu', 'rf'] as Аудитория[]).map((a) => (
                  <button key={a} type="button" aria-pressed={есть(a)} onClick={() => переключить(a)} className={кнопка(есть(a))}>
                    {t.audience[a]}
                  </button>
                ))}
              </div>
              {аудитория.length === 0 && <p className="text-[13px] text-amber-500">{t.audienceHint}</p>}
            </div>

            <div className="space-y-2.5" role="group" aria-labelledby={`${ид}-type`}>
              <span id={`${ид}-type`} className="text-xs text-gray-400 font-semibold block">{t.typeLabel}</span>
              <div className="grid grid-cols-1 gap-2">
                {(['shop', 'service', 'info'] as ТипСайта[]).map((x) => (
                  <button key={x} type="button" aria-pressed={тип === x} onClick={() => setТип(x)} className={кнопка(тип === x)}>
                    {t.types[x]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <label htmlFor={`${ид}-visits`} className="text-gray-400 font-semibold">{t.visitsLabel}</label>
                <span className="font-mono font-bold text-cyan-400">{число(визиты, яз)}</span>
              </div>
              <input
                id={`${ид}-visits`}
                type="range"
                min={0}
                max={100}
                step={1}
                value={шаг}
                onChange={(e) => setШаг(parseInt(e.target.value, 10))}
                aria-valuetext={число(визиты, яз)}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[13px] font-mono text-gray-400" aria-hidden="true">
                <span>1K</span>
                <span>10K</span>
                <span>100K</span>
                <span>1M</span>
                <span>5M</span>
              </div>
            </div>

            <label className="flex items-center gap-3 text-xs text-gray-400 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={крупный}
                onChange={(e) => setКрупный(e.target.checked)}
                className="w-4 h-4 accent-purple-500 cursor-pointer"
              />
              {t.bigLabel}
            </label>

            {есть('eu') && (
              <div className="space-y-2.5">
                <label htmlFor={`${ид}-sector`} className="text-xs text-gray-400 font-semibold block">{t.sectorLabel}</label>
                <select
                  id={`${ид}-sector`}
                  value={отрасль}
                  onChange={(e) => setОтрасль(e.target.value as Отрасль)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-black/30 text-white text-xs font-semibold cursor-pointer"
                >
                  {ОТРАСЛИ.map((o) => (
                    <option key={o} value={o} className="bg-gray-900 text-white">{t.sectors[o]}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Уровень внимания истцов (США) */}
          <div className="glass bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-4 text-left" aria-live="polite">
            <span className="text-[13px] uppercase tracking-widest text-gray-500 font-semibold block">{t.levelTitle}</span>
            {есть('us') ? (
              <>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl font-black text-white tracking-tight">{t.levels[уровень]}</span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${ЦВЕТ_ПОЛОСЫ[уровень]}`}
                    style={{ width: ШИРИНА_ПОЛОСЫ[уровень] }}
                  />
                </div>
                <p className="text-[13px] text-gray-400 leading-relaxed">{t.levelNote}</p>
                <div className={`rounded-xl border p-3 space-y-1.5 ${ЦВЕТ_УРОВНЯ[уровень]}`}>
                  <span className="text-[13px] font-bold block">{t.whyTitle}</span>
                  <ul className="list-disc pl-4 space-y-1">
                    {причины.map((p) => (
                      <li key={p} className="text-[13px] leading-relaxed text-gray-400">{p}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-[13px] text-gray-400 leading-relaxed">
                  {подставить(t.statLine, { total: число(5114, яз), fed: число(3195, яз), state: число(1919, яз) })}{' '}
                  <Источник href={ИСТОЧНИКИ.usablenet} newTab={t.newTab}>UsableNet 2025</Источник>
                </p>
              </>
            ) : (
              <p className="text-[13px] text-gray-400 leading-relaxed">{t.noUs}</p>
            )}
          </div>
        </div>

        {/* Что прямо написано в законе */}
        {аудитория.length > 0 && (
          <div className="space-y-3 text-left">
            <h4 className="text-[13px] uppercase tracking-widest text-gray-500 font-semibold">{t.lawTitle}</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {есть('us') && (
                <div className="rounded-2xl border border-white/5 bg-black/20 p-5 space-y-2">
                  <h5 className="text-sm font-bold text-white">{t.us.title}</h5>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{t.us.private}</p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    {подставить(t.us.doj, { first: доллары(118225, яз), next: доллары(236451, яз) })}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                    <Источник href={ИСТОЧНИКИ.ada12188} newTab={t.newTab}>42 U.S.C. § 12188</Источник>
                    <Источник href={ИСТОЧНИКИ.ada12205} newTab={t.newTab}>§ 12205</Источник>
                    <Источник href={ИСТОЧНИКИ.adaПени} newTab={t.newTab}>Federal Register 2025-12494</Источник>
                  </div>
                </div>
              )}

              {есть('ca') && (
                <div className="rounded-2xl border border-white/5 bg-black/20 p-5 space-y-2">
                  <h5 className="text-sm font-bold text-white">{t.ca.title}</h5>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{подставить(t.ca.unruh, { min: доллары(4000, яз) })}</p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    {подставить(t.ca.ccpa, {
                      threshold: доллары(26625000, яз),
                      fine: доллары(2663, яз),
                      fineIntent: доллары(7988, яз),
                      dmgMin: доллары(107, яз),
                      dmgMax: доллары(799, яз),
                    })}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                    <Источник href={ИСТОЧНИКИ.unruh} newTab={t.newTab}>Cal. Civ. Code § 52</Источник>
                    <Источник href={ИСТОЧНИКИ.cppa} newTab={t.newTab}>CPPA 2025</Источник>
                    <Источник href={ИСТОЧНИКИ.cppaПорог} newTab={t.newTab}>CPPA thresholds</Источник>
                  </div>
                </div>
              )}

              {есть('eu') && (
                <div className="rounded-2xl border border-white/5 bg-black/20 p-5 space-y-2">
                  <h5 className="text-sm font-bold text-white">{t.eu.title}</h5>
                  <p className="text-[13px] text-gray-400 leading-relaxed">
                    {подставить(t.eu.sector, {
                      sector: t.sectors[отрасль],
                      cases: число(сектор.дел, яз),
                      median: евро(сектор.медиана, яз),
                      p90: евро(сектор.p90, яз),
                      max: евро(сектор.макс, яз),
                    })}
                  </p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{t.eu.cap}</p>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{t.eu.caution}</p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{t.eu.eaa}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                    <Источник href={ИСТОЧНИКИ.cms} newTab={t.newTab}>CMS Enforcement Tracker (04.09.2026)</Источник>
                    <Источник href={ИСТОЧНИКИ.gdpr83} newTab={t.newTab}>GDPR Art. 83</Источник>
                    <Источник href={ИСТОЧНИКИ.eaa} newTab={t.newTab}>Directive (EU) 2019/882</Источник>
                  </div>
                </div>
              )}

              {есть('rf') && (
                <div className="rounded-2xl border border-white/5 bg-black/20 p-5 space-y-2">
                  <h5 className="text-sm font-bold text-white">{t.rf.title}</h5>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{t.rf.pd}</p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{t.rf.leak}</p>
                  <p className="text-[13px] text-gray-400 leading-relaxed">{t.rf.a11y}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1">
                    <Источник href={ИСТОЧНИКИ.koap1311} newTab={t.newTab}>КоАП 13.11</Источник>
                    <Источник href={ИСТОЧНИКИ.koap} newTab={t.newTab}>КоАП 9.13</Источник>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-left">
          <Info className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[13px] text-gray-400 leading-relaxed">{t.disclaimer}</p>
        </div>

        <button
          type="button"
          onClick={прокрутитьКПроверке}
          className="keep-dark btn-neon w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-transform"
        >
          {t.cta}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
