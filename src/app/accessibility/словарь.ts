/**
 * ТЕКСТЫ СКАНЕРА — ОДИН ИСТОЧНИК НА ЧЕТЫРЕ ЯЗЫКА.
 *
 * ОТКУДА. Вынуты из общего словаря aifa.works (`i18n/translations.ts`,
 * разделы `accessibility` и `threatScanner`) без единой правки текста.
 *
 * ПОЧЕМУ ЗДЕСЬ, А НЕ В ОБЩЕМ СЛОВАРЕ САЙТА. Общий словарь у каждого из
 * четырёх сайтов свой и по форме, и по составу. Дописывание в него означало
 * бы правку текстов всего сайта ради одной страницы — и поломку, которую
 * заметил бы не автор, а посетитель. Страница со своим словарём переносится
 * куда угодно и не зависит ни от чего, кроме `locale`.
 *
 * Так же устроены страницы исследования, и именно поэтому они перенеслись на
 * два сайта без единой правки кода.
 */
export type ЯзыкКодСканера = 'ru' | 'en' | 'es' | 'zh';

const ТЕКСТЫ_СКАНЕРА_en = {

      navLink: 'A11y Audit',

      heroTag: 'Free Accessibility Audit',

      heroTitle1: 'Is Your Website ',

      heroTitle2: 'ADA Compliant?',

      heroDesc: '1 in 4 Americans has a disability. Non-compliant sites face lawsuits and lose customers. Scan your URL in seconds — get a real WCAG 2.1 AA score and your top issues, free.',

      scanLabel: 'Enter your website URL',

      scanPlaceholder: 'https://yourwebsite.com',

      scanIdle: 'Scan Free',

      scanBusy: 'Scanning…',

      scanError: 'Scan failed. Please try again.',

      resultsTitle: 'Your Accessibility Score',

      score100: '/ 2000',

      excellent: 'Excellent',

      needsWork: 'Needs Work',

      nonCompliant: 'Non-Compliant',

      issuesFoundA: 'Found',

      issuesFoundB: 'issues on',

      impactCritical: 'Critical',

      impactSerious: 'Serious',

      impactModerate: 'Moderate',

      emailTitle: 'Get the full detailed report emailed to you — free, no spam.',

      emailPlaceholder: 'you@company.com',

      emailSend: 'Send Report',

      emailSending: 'Sending…',

      emailSuccess: 'Report on its way! Check your inbox within a few minutes.',

      emailError: 'Something went wrong.',

      problemTitle: 'Inaccessibility Is a ',

      problemHighlight: '$13B Liability',

      problemSubtitle: 'Over 4,600 ADA web accessibility lawsuits were filed in 2023 alone. Beyond legal risk, inaccessible sites exclude 26% of the US adult population — and Google ranks accessible pages higher.',

      col1Title: 'The Problem',

      col1Points: [

        '96.3% of top 1M websites fail WCAG 2.1',

        'Average lawsuit settlement: $25,000–$90,000',

        "Screen readers can't use most navigation",

        'Low contrast excludes 300M colorblind users',

      ],

      col2Title: 'Our Solution',

      col2Points: [

        'Deep axe-core + manual WCAG 2.1 AA audit',

        'Real fixes, not just a PDF report',

        'Screen-reader & keyboard-nav testing',

        'Compliance statement & VPAT on request',

      ],

      col3Title: 'The Result',

      col3Points: [

        'Legal risk eliminated',

        'SEO ranking improvement (Core Web Vitals)',

        '26% larger addressable audience',

        'Brand trust with inclusive design',

      ],

      stat1Value: '96.3%', stat1Label: 'Of top sites fail WCAG',

      stat2Value: '4,600+', stat2Label: 'ADA lawsuits in 2023',

      stat3Value: '26%', stat3Label: 'Of adults have a disability',

      stat4Value: '3–14d', stat4Label: 'Fix turnaround',

      pricingTitle: 'Transparent ',

      pricingHighlight: 'Pricing',

      pricingSubtitle: "No hidden fees. Fixed-price remediation. Pick the tier that fits your site's complexity.",

      mostPopular: 'Most Popular',

      getStarted: 'Get Started',

      ctaBadge1: 'Screen-reader tested',

      ctaBadge2: 'Inclusive by design',

      ctaBadge3: 'WCAG 2.1 AA certified',

      ctaTitle: 'Ready to Fix Your Site?',

      ctaDesc: 'Start with the free scan above or book a consultation. We respond within 24 hours.',

      ctaBook: 'Book a Consultation',

      ctaViewStatement: 'View Our Statement',

      footerHome: 'Home',

      footerStatement: 'Accessibility Statement',

      footerContact: 'Contact',

      tiers: [

        { name: 'Quick Audit', timeline: '1 day', features: ['Automated WCAG 2.1 AA scan', 'Top 10 issues report', 'PDF summary', 'Priority list'] },

        { name: 'Starter Fix', timeline: '3–5 days', features: ['Full automated audit', 'Manual spot-check', 'Fix critical & serious issues', 'Re-audit included'] },

        { name: 'Professional', timeline: '5–7 days', features: ['Full WCAG 2.1 AA audit', 'Screen-reader testing', 'Fix all violations', 'ARIA improvements', 'Re-audit'] },

        { name: 'AI-Enhanced', timeline: '7–10 days', features: ['Everything in Professional', 'AI component review', 'Keyboard navigation overhaul', 'Focus management', 'Compliance statement'], },

        { name: 'Ecosystem', timeline: '10–14 days', features: ['Full site + design system audit', 'WCAG 2.2 coverage', 'Component-level ARIA patterns', 'Training session (1h)', 'Ongoing monitoring'] },

        { name: 'Enterprise Lite', timeline: '2–3 weeks', features: ['Multi-page / SPA audit', 'Assistive tech compatibility', 'Legal compliance review', 'Developer documentation', 'Slack support (30d)'] },

        { name: 'Enterprise Pro', timeline: '3–4 weeks', features: ['Everything in Enterprise Lite', 'ADA / Section 508 alignment', 'User testing with disabled users', 'CI/CD integration', 'Quarterly re-audit'] },

        { name: 'Full Remediation', timeline: 'Custom', features: ['Complete codebase remediation', 'VPAT documentation', 'Legal risk mitigation', 'Dedicated a11y engineer', 'Annual audit contract'] },

      ],

    };

const ТЕКСТЫ_СКАНЕРА_ru = {

      navLink: 'Аудит A11y',

      heroTag: 'Бесплатный Аудит Доступности',

      heroTitle1: 'Ваш Сайт ',

      heroTitle2: 'Доступен для Всех?',

      heroDesc: 'Каждый 4-й человек имеет ту или иную форму инвалидности. Несоответствующие требованиям сайты сталкиваются с юридическими исками и теряют клиентов. Сканируйте ваш URL-адрес за считанные секунды — получите реальную оценку WCAG 2.1 AA и список основных проблем бесплатно.',

      scanLabel: 'Введите URL-адрес вашего сайта',

      scanPlaceholder: 'https://yourwebsite.com',

      scanIdle: 'Сканировать бесплатно',

      scanBusy: 'Сканирование…',

      scanError: 'Ошибка сканирования. Пожалуйста, попробуйте еще раз.',

      resultsTitle: 'Ваш показатель доступности',

      score100: '/ 2000',

      excellent: 'Отлично',

      needsWork: 'Требует доработки',

      nonCompliant: 'Не соответствует требованиям',

      issuesFoundA: 'Найдено',

      issuesFoundB: 'проблем на',

      impactCritical: 'Критическая',

      impactSerious: 'Серьезная',

      impactModerate: 'Умеренная',

      emailTitle: 'Мы вышлем вам полный отчет на электронную почту. Но для этого нам нужна ваша электронная почта и ваше согласие на получение от нас писем и сообщений.',

      emailPlaceholder: 'you@company.com',

      emailSend: 'Отправить отчет',

      emailSending: 'Отправка…',

      emailSuccess: 'Отчет уже в пути! Проверьте свой почтовый ящик через несколько минут.',

      emailError: 'Что-то пошло не так.',

      problemTitle: 'Недоступность сайта — это ',

      problemHighlight: 'юридический риск на $13 млрд',

      problemSubtitle: 'Только в 2023 году было подано более 4600 судебных исков о доступности веб-сайтов по закону ADA. Помимо юридических рисков, недоступные сайты исключают 26% взрослого населения США, а Google ранжирует доступные страницы выше.',

      col1Title: 'Проблема',

      col1Points: [

        '96.3% из 1 млн лучших веб-сайтов не соответствуют WCAG 2.1',

        'Средняя сумма урегулирования иска: $25 000 – $90 000',

        'Программы чтения с экрана не могут использовать большинство элементов навигации',

        'Низкий контраст исключает 300 млн пользователей с дальтонизмом',

      ],

      col2Title: 'Наше решение',

      col2Points: [

        'Глубокий аудит axe-core + ручная проверка WCAG 2.1 AA',

        'Ремедиация на уровне кода, а не просто PDF-отчет',

        'Тестирование с программами чтения с экрана и клавиатурной навигацией',

        'Заявление о соответствии и VPAT по запросу',

      ],

      col3Title: 'Результат',

      col3Points: [

        'Юридические риски устранены',

        'Улучшение SEO-рейтинга (Core Web Vitals)',

        'Аудитория шире на 26%',

        'Доверие к бренду благодаря инклюзивному дизайну',

      ],

      stat1Value: '96.3%', stat1Label: 'Сайтов не соответствуют WCAG',

      stat2Value: '4 600+', stat2Label: 'Исков ADA в 2023 году',

      stat3Value: '26%', stat3Label: 'Взрослых имеют инвалидность',

      stat4Value: '3–14д', stat4Label: 'Срок устранения',

      pricingTitle: 'Прозрачные ',

      pricingHighlight: 'Цены',

      pricingSubtitle: 'Без скрытых комиссий. Устранение нарушений по фиксированной цене. Выберите уровень, соответствующий сложности вашего сайта.',

      mostPopular: 'Популярный выбор',

      getStarted: 'Начать',

      ctaBadge1: 'Протестировано скринридером',

      ctaBadge2: 'Инклюзивность по дизайну',

      ctaBadge3: 'Сертифицировано по WCAG 2.1 AA',

      ctaTitle: 'Готовы настроить доступность вашего сайта?',

      ctaDesc: 'Начните с бесплатного сканирования выше или запишитесь на консультацию. Мы отвечаем в течение 24 часов.',

      ctaBook: 'Записаться на консультацию',

      ctaViewStatement: 'Посмотреть наше заявление',

      footerHome: 'Главная',

      footerStatement: 'Заявление о доступности',

      footerContact: 'Контакты',

      tiers: [

        { name: 'Быстрый Аудит', timeline: '1 день', features: ['Автоматизированное сканирование WCAG 2.1 AA', 'Отчёт о топ-10 проблемах', 'Резюме в PDF', 'Список приоритетов'] },

        { name: 'Начальное Исправление', timeline: '3–5 дней', features: ['Полный автоматизированный аудит', 'Ручная точечная проверка', 'Устранение критических и серьёзных проблем', 'Повторный аудит включён'] },

        { name: 'Профессиональный', timeline: '5–7 дней', features: ['Полный аудит WCAG 2.1 AA', 'Тестирование со скринридером', 'Исправление всех нарушений', 'Улучшения ARIA', 'Повторный аудит'] },

        { name: 'С Усилением ИИ', timeline: '7–10 дней', features: ['Всё из Профессионального', 'Обзор компонентов с ИИ', 'Переработка клавиатурной навигации', 'Управление фокусом', 'Заявление о соответствии'] },

        { name: 'Экосистема', timeline: '10–14 дней', features: ['Аудит всего сайта + дизайн-системы', 'Покрытие WCAG 2.2', 'Паттерны ARIA на уровне компонентов', 'Обучающая сессия (1ч)', 'Непрерывный мониторинг'] },

        { name: 'Enterprise Lite', timeline: '2–3 недели', features: ['Аудит многостраничного / SPA сайта', 'Совместимость со вспомогательными технологиями', 'Проверка юридического соответствия', 'Документация для разработчиков', 'Поддержка Slack (30д)'] },

        { name: 'Enterprise Pro', timeline: '3–4 недели', features: ['Всё из Enterprise Lite', 'Соответствие ADA / Раздел 508', 'Пользовательское тестирование с людьми с ОВЗ', 'Интеграция CI/CD', 'Ежеквартальный повторный аудит'] },

        { name: 'Полная Ремедиация', timeline: 'По запросу', features: ['Полная ремедиация кодовой базы', 'Документация VPAT', 'Снижение правовых рисков', 'Выделенный инженер a11y', 'Годовой контракт на аудит'] },

      ],

    };

const ТЕКСТЫ_СКАНЕРА_es = {

      navLink: 'Auditoría A11y',

      heroTag: 'Auditoría de Accesibilidad Gratuita',

      heroTitle1: '¿Tu Sitio Web Es ',

      heroTitle2: 'Accesible para Todos?',

      heroDesc: '1 de cada 4 americanos tiene una discapacidad. Los sitios no conformes enfrentan demandas y pierden clientes. Escanea tu URL en segundos — obtén una puntuación WCAG 2.1 AA real y tus principales problemas, gratis.',

      scanLabel: 'Introduce la URL de tu sitio web',

      scanPlaceholder: 'https://tusitio.com',

      scanIdle: 'Escanear Gratis',

      scanBusy: 'Escaneando…',

      scanError: 'El escaneo falló. Por favor, inténtalo de nuevo.',

      resultsTitle: 'Tu Puntuación de Accesibilidad',

      score100: '/ 2000',

      excellent: 'Excelente',

      needsWork: 'Necesita Mejoras',

      nonCompliant: 'No Conforme',

      issuesFoundA: 'Se encontraron',

      issuesFoundB: 'problemas en',

      impactCritical: 'Crítico',

      impactSerious: 'Serio',

      impactModerate: 'Moderado',

      emailTitle: 'Recibe el informe completo por correo — gratis, sin spam.',

      emailPlaceholder: 'tu@empresa.com',

      emailSend: 'Enviar Informe',

      emailSending: 'Enviando…',

      emailSuccess: '¡Informe en camino! Revisa tu bandeja de entrada en unos minutos.',

      emailError: 'Algo salió mal.',

      problemTitle: 'La Inaccesibilidad Es una ',

      problemHighlight: 'Responsabilidad de $13B',

      problemSubtitle: 'Más de 4,600 demandas por accesibilidad web bajo la ADA se presentaron solo en 2023. Más allá del riesgo legal, los sitios inaccesibles excluyen al 26% de la población adulta de EE.UU. — y Google clasifica más alto las páginas accesibles.',

      col1Title: 'El Problema',

      col1Points: ['El 96.3% de los principales sitios fallan WCAG 2.1', 'Acuerdo promedio por demanda: $25,000–$90,000', 'Los lectores de pantalla no pueden usar la mayoría de la navegación', 'El bajo contraste excluye a 300M de personas con daltonismo'],

      col2Title: 'Nuestra Solución',

      col2Points: ['Auditoría profunda axe-core + WCAG 2.1 AA manual', 'Correcciones reales, no solo un informe PDF', 'Pruebas con lector de pantalla y navegación por teclado', 'Declaración de conformidad y VPAT a solicitud'],

      col3Title: 'El Resultado',

      col3Points: ['Riesgo legal eliminado', 'Mejora en posicionamiento SEO (Core Web Vitals)', '26% de audiencia más amplia', 'Confianza de marca con diseño inclusivo'],

      stat1Value: '96.3%', stat1Label: 'De los sitios top fallan WCAG',

      stat2Value: '4,600+', stat2Label: 'Demandas ADA en 2023',

      stat3Value: '26%', stat3Label: 'De adultos tienen discapacidad',

      stat4Value: '3–14d', stat4Label: 'Tiempo de corrección',

      pricingTitle: 'Precios ',

      pricingHighlight: 'Transparentes',

      pricingSubtitle: "Sin tarifas ocultas. Remediación a precio fijo. Elige el nivel que se adapte a la complejidad de tu sitio.",

      mostPopular: 'Más Popular',

      getStarted: 'Comenzar',

      ctaBadge1: 'Probado con lector de pantalla',

      ctaBadge2: 'Inclusivo por diseño',

      ctaBadge3: 'Certificado WCAG 2.1 AA',

      ctaTitle: '¿Listo para Arreglar Tu Sitio?',

      ctaDesc: 'Comienza con el escaneo gratuito o reserva una consulta. Respondemos en 24 horas.',

      ctaBook: 'Reservar Consulta',

      ctaViewStatement: 'Ver Nuestra Declaración',

      footerHome: 'Inicio',

      footerStatement: 'Declaración de Accesibilidad',

      footerContact: 'Contacto',

      tiers: [

        { name: 'Auditoría Rápida', timeline: '1 día', features: ['Escaneo automatizado WCAG 2.1 AA', 'Informe de los 10 principales problemas', 'Resumen en PDF', 'Lista de prioridades'] },

        { name: 'Corrección Inicial', timeline: '3–5 días', features: ['Auditoría automatizada completa', 'Revisión manual puntual', 'Corrección de problemas críticos y serios', 'Re-auditoría incluida'] },

        { name: 'Profesional', timeline: '5–7 días', features: ['Auditoría WCAG 2.1 AA completa', 'Pruebas con lector de pantalla', 'Corrección de todas las violaciones', 'Mejoras ARIA', 'Re-auditoría'] },

        { name: 'Mejorado con IA', timeline: '7–10 días', features: ['Todo lo de Profesional', 'Revisión de componentes con IA', 'Renovación de navegación por teclado', 'Gestión del foco', 'Declaración de conformidad'] },

        { name: 'Ecosistema', timeline: '10–14 días', features: ['Auditoría de sitio completo + sistema de diseño', 'Cobertura WCAG 2.2', 'Patrones ARIA a nivel de componente', 'Sesión de formación (1h)', 'Monitoreo continuo'] },

        { name: 'Enterprise Lite', timeline: '2–3 semanas', features: ['Auditoría de múltiples páginas / SPA', 'Compatibilidad con tecnología asistiva', 'Revisión de cumplimiento legal', 'Documentación para desarrolladores', 'Soporte Slack (30d)'] },

        { name: 'Enterprise Pro', timeline: '3–4 semanas', features: ['Todo lo de Enterprise Lite', 'Alineación ADA / Sección 508', 'Pruebas de usuario con personas con discapacidad', 'Integración CI/CD', 'Re-auditoría trimestral'] },

        { name: 'Remediación Completa', timeline: 'Personalizado', features: ['Remediación completa del código', 'Documentación VPAT', 'Mitigación del riesgo legal', 'Ingeniero a11y dedicado', 'Contrato de auditoría anual'] },

      ],

    };

const ТЕКСТЫ_СКАНЕРА_zh = {

      navLink: '无障碍审计',

      heroTag: '免费无障碍审计',

      heroTitle1: '您的网站是否',

      heroTitle2: '符合无障碍标准？',

      heroDesc: '每4名美国人中就有1人患有残障。不合规的网站面临诉讼风险并流失客户。几秒内扫描您的网址——免费获取真实的WCAG 2.1 AA分数和主要问题。',

      scanLabel: '输入您的网站URL',

      scanPlaceholder: 'https://yourwebsite.com',

      scanIdle: '免费扫描',

      scanBusy: '扫描中…',

      scanError: '扫描失败，请重试。',

      resultsTitle: '您的无障碍得分',

      score100: '/ 2000',

      excellent: '优秀',

      needsWork: '需要改善',

      nonCompliant: '不合规',

      issuesFoundA: '发现',

      issuesFoundB: '个问题，网站：',

      impactCritical: '严重',

      impactSerious: '重要',

      impactModerate: '一般',

      emailTitle: '通过电子邮件获取完整详细报告——免费，无垃圾邮件。',

      emailPlaceholder: 'you@company.com',

      emailSend: '发送报告',

      emailSending: '发送中…',

      emailSuccess: '报告已发送！请在几分钟内查收您的邮件。',

      emailError: '出现了问题。',

      problemTitle: '无障碍缺失是',

      problemHighlight: '130亿美元的法律风险',

      problemSubtitle: '仅2023年就有超过4,600起ADA网络无障碍诉讼。除法律风险外，不可访问的网站还排斥了26%的美国成年人口——谷歌对无障碍页面给予更高排名。',

      col1Title: '问题所在',

      col1Points: ['96.3%的顶级网站不符合WCAG 2.1', '平均诉讼和解金额：25,000–90,000美元', '屏幕阅读器无法使用大多数导航', '低对比度导致3亿色觉障碍用户被排除在外'],

      col2Title: '我们的解决方案',

      col2Points: ['深度axe-core + 手动WCAG 2.1 AA审计', '真实修复，而非仅提供PDF报告', '屏幕阅读器和键盘导航测试', '合规声明及应要求提供VPAT'],

      col3Title: '预期效果',

      col3Points: ['消除法律风险', 'SEO排名提升（核心网页指标）', '可触达受众扩大26%', '通过包容性设计建立品牌信任'],

      stat1Value: '96.3%', stat1Label: '顶级网站不符合WCAG',

      stat2Value: '4,600+', stat2Label: '2023年ADA诉讼案件',

      stat3Value: '26%', stat3Label: '成年人有残障',

      stat4Value: '3–14天', stat4Label: '修复周期',

      pricingTitle: '透明',

      pricingHighlight: '定价',

      pricingSubtitle: '无隐藏费用。固定价格修复。根据您网站的复杂程度选择合适的方案。',

      mostPopular: '最受欢迎',

      getStarted: '立即开始',

      ctaBadge1: '屏幕阅读器测试通过',

      ctaBadge2: '设计上的包容性',

      ctaBadge3: 'WCAG 2.1 AA认证',

      ctaTitle: '准备好修复您的网站了吗？',

      ctaDesc: '从上方的免费扫描开始，或预约咨询。我们24小时内回复。',

      ctaBook: '预约咨询',

      ctaViewStatement: '查看我们的声明',

      footerHome: '首页',

      footerStatement: '无障碍声明',

      footerContact: '联系我们',

      tiers: [

        { name: '快速审计', timeline: '1天', features: ['自动化WCAG 2.1 AA扫描', '前10问题报告', 'PDF摘要', '优先级列表'] },

        { name: '入门修复', timeline: '3–5天', features: ['完整自动化审计', '手动抽查', '修复严重和重要问题', '包含复审'] },

        { name: '专业版', timeline: '5–7天', features: ['完整WCAG 2.1 AA审计', '屏幕阅读器测试', '修复所有违规', 'ARIA改进', '复审'] },

        { name: 'AI增强版', timeline: '7–10天', features: ['包含专业版所有内容', 'AI组件审查', '键盘导航全面改造', '焦点管理', '合规声明'] },

        { name: '生态系统版', timeline: '10–14天', features: ['完整站点+设计系统审计', 'WCAG 2.2覆盖', '组件级ARIA模式', '培训课程（1小时）', '持续监控'] },

        { name: '企业精简版', timeline: '2–3周', features: ['多页面/SPA审计', '辅助技术兼容性', '法律合规审查', '开发者文档', 'Slack支持（30天）'] },

        { name: '企业专业版', timeline: '3–4周', features: ['包含企业精简版所有内容', 'ADA/508条款对齐', '残障用户测试', 'CI/CD集成', '季度复审'] },

        { name: '全面修复', timeline: '定制', features: ['完整代码库修复', 'VPAT文档', '法律风险缓解', '专属a11y工程师', '年度审计合同'] },

      ],

    };

export type ТекстыСканера = typeof ТЕКСТЫ_СКАНЕРА_en;

export const ТЕКСТЫ_СКАНЕРА: Record<ЯзыкКодСканера, ТекстыСканера> = {
  ru: ТЕКСТЫ_СКАНЕРА_ru,
  en: ТЕКСТЫ_СКАНЕРА_en,
  es: ТЕКСТЫ_СКАНЕРА_es,
  zh: ТЕКСТЫ_СКАНЕРА_zh,
};

const ТЕКСТЫ_УГРОЗ_en = {

      indicativeBadge: 'INDICATOR',

      indicativeHint: 'External indicator, not a verified finding. Organisational controls (SOC 2, ISO 27001, NIST) are confirmed by an audit, not by scanning a URL.',

      placeholder: 'yourdomain.com',

      initiate: 'Initiate Scan',

      scanning: 'Scanning…',

      reset: 'Reset',

      idlePrompt: 'Enter a domain above and click Initiate Scan to run the AIfaFocus compliance audit.',

      fullReport: 'Full Report',

      view100: 'View 2000 Checks',

      issuesDetected: 'issues detected',

      scoreLabel: 'Score',

      lowRisk: 'Minor remediation recommended',

      elevatedRisk: 'Elevated legal exposure',

      immediateAction: 'Immediate action required',

      disclaimer: 'Disclaimer: The results of this automated scan are for informational and educational purposes only and do not constitute official legal advice. The specified fine amounts reflect the maximum possible legislative sanctions for the respective types of violations.',

      gradeLabel: 'Compliance Grade',

      downloadPdf: 'Download PDF Report',

      howToFix: 'How to Fix',

      violatingCode: 'Offending Element Code',

    };

const ТЕКСТЫ_УГРОЗ_ru = {

      indicativeBadge: 'ПРИЗНАК',

      indicativeHint: 'Внешний признак, а не подтверждённая находка. Организационные контроли (SOC 2, ISO 27001, NIST) подтверждаются аудитом, а не сканированием адреса.',

      placeholder: 'вашдомен.ru',

      initiate: 'Запустить сканирование',

      scanning: 'Сканирование…',

      reset: 'Сбросить',

      idlePrompt: 'Введите домен выше и нажмите «Запустить сканирование» для проведения аудита AIfaFocus.',

      fullReport: 'Полный отчёт',

      view100: 'Все 2000 проверок',

      issuesDetected: 'обнаружено проблем',

      scoreLabel: 'Счёт',

      lowRisk: 'Незначительные исправления рекомендованы',

      elevatedRisk: 'Повышенный юридический риск',

      immediateAction: 'Необходимы срочные действия',

      disclaimer: 'Дисклеймер: Результаты данного автоматического сканирования носят исключительно информационный и ознакомительный характер и не являются официальным юридическим заключением (Legal Advice). Указанные суммы штрафов отражают максимально возможные законодательные санкции за соответствующие типы нарушений.',

      gradeLabel: 'Грейд Соответствия',

      downloadPdf: 'Скачать PDF-отчет',

      howToFix: 'Как исправить',

      violatingCode: 'Фрагмент кода с нарушением',

    };

const ТЕКСТЫ_УГРОЗ_es = {

      indicativeBadge: 'INDICIO',

      indicativeHint: 'Indicio externo, no un hallazgo verificado. Los controles organizativos (SOC 2, ISO 27001, NIST) se confirman mediante auditoría, no escaneando una URL.',

      placeholder: 'tudominio.com',

      initiate: 'Iniciar Análisis',

      scanning: 'Analizando…',

      reset: 'Reiniciar',

      idlePrompt: 'Ingresa un dominio arriba y haz clic en Iniciar Análisis para ejecutar la auditoría AIfaFocus.',

      fullReport: 'Informe Completo',

      view100: 'Ver 2000 Verificaciones',

      issuesDetected: 'problemas detectados',

      scoreLabel: 'Puntuación',

      lowRisk: 'Remediación menor recomendada',

      elevatedRisk: 'Exposición legal elevada',

      immediateAction: 'Acción inmediata requerida',

      disclaimer: 'Descargo de responsabilidad: Los resultados de este análisis automatizado son solo para fines informativos y educativos y no constituyen asesoramiento legal oficial. Los montos de las multas especificados reflejan las sanciones legislativas máximas posibles para los respectivos tipos de violaciones.',

      gradeLabel: 'Grado de Cumplimiento',

      downloadPdf: 'Descargar Informe PDF',

      howToFix: 'Cómo Solucionar',

      violatingCode: 'Código del Elemento Infractor',

    };

const ТЕКСТЫ_УГРОЗ_zh = {

      indicativeBadge: '迹象',

      indicativeHint: '外部迹象，并非已核实的发现。组织级控制（SOC 2、ISO 27001、NIST）需由审计确认，而非扫描网址。',

      placeholder: 'yoursite.cn',

      initiate: '启动扫描',

      scanning: '扫描中…',

      reset: '重置',

      idlePrompt: '在上方输入域名，点击「启动扫描」以运行 AIfaFocus 合规审计。',

      fullReport: '完整报告',

      view100: '查看2000项检查',

      issuesDetected: '个问题已检测',

      scoreLabel: '评分',

      lowRisk: '建议小幅修复',

      elevatedRisk: '法律风险较高',

      immediateAction: '需要立即采取行动',

      disclaimer: '免责声明：此自动扫描结果仅供参考和学习之用，不构成正式的法律意见。指定的罚款金额反映了针对相应类型违规行为可能采取的最大法定处罚。',

      gradeLabel: '合规等级',

      downloadPdf: '下载 PDF 报告',

      howToFix: '如何修复',

      violatingCode: '违规元素代码',

    };

export type ТекстыУгроз = typeof ТЕКСТЫ_УГРОЗ_en;

export const ТЕКСТЫ_УГРОЗ: Record<ЯзыкКодСканера, ТекстыУгроз> = {
  ru: ТЕКСТЫ_УГРОЗ_ru,
  en: ТЕКСТЫ_УГРОЗ_en,
  es: ТЕКСТЫ_УГРОЗ_es,
  zh: ТЕКСТЫ_УГРОЗ_zh,
};

/** Надпись ссылки на реестр проверок. Из `nav.complianceRegistry`. */
export const НАДПИСЬ_РЕЕСТРА: Record<ЯзыкКодСканера, string> = {
  ru: 'Реестр 2000 Проверок',
  en: '2000-Point Registry',
  es: 'Registro de Cumplimiento',
  zh: '合规注册表',
};
