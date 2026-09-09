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

            tierWho: 'Who this is for',
      tierDiff: 'What makes this level different',
      tierIncludes: 'What we do',
      tierDeliverables: 'What you receive',
      tierTimeline: 'Turnaround',
      tierPayNow: 'Pay and start',
      tierAskQuote: 'Request a quote',
      tierClose: 'Close',
      tierMoreDetails: 'Full details',
      tiers: [

        { name: 'Lite Audit', timeline: '1 day', features: ['25 pages scanned', 'Full violation list', 'Dated PDF certificate', 'Severity breakdown'],
          slug: 'lite-audit',
          price: 50,
          who: 'You need proof on paper that the site was checked — for a lawyer, an insurer or a client — and you are not ready to pay for analysis yet.',
          diff: 'The free scan looks at THREE pages and leaves you nothing but a screen. Here: twenty-five pages and a dated document you can hand to someone. What is NOT here: the reading of what each finding means for you in court, and the dollar figure of your exposure — that starts at Quick Audit.',
          includes: [
            'Automated WCAG 2.1 AA scan of up to 25 pages, not 3',
            'Every violation listed with the page and the element named',
            'Findings split by severity: critical, serious, moderate, minor',
            'Text contrast, tap-target size and heading order verified',
          ],
          deliverables: [
            'A PDF with the scan date and the full list of violations',
            'A severity table you can attach to a contract or an insurance form',
            'The scan is repeatable: the same URL, the same method, any time later',
          ],
        },

        { name: 'Quick Audit', timeline: '1 day', features: ['Automated WCAG 2.1 AA scan', 'Top 10 issues report', 'PDF summary', 'Priority list'],
          slug: 'quick-audit',
          price: 149,
          who: 'You need to know fast whether the site is a liability, and whether there is a problem at all.',
          diff: 'The simplest level: we LOOK and report, but we fix nothing. Repairs start at the next level.',
          includes: [
            'Automated WCAG 2.1 AA scan of every page a crawler can reach',
            'Text contrast, tap-target size and heading order verified',
            'Images without descriptions and form fields without labels identified',
            'Findings ranked by risk: what invites a lawsuit versus what is cosmetic',
          ],
          deliverables: [
            'An 8–12 page PDF report with a screenshot of every issue',
            'The ten most dangerous violations, each with page and element named',
            'A plain-language assessment of your ADA exposure',
          ],
        },

        { name: 'Starter Fix', timeline: '3–5 days', features: ['Full automated audit', 'Manual spot-check', 'Fix critical & serious issues', 'Re-audit included'],
          slug: 'starter-fix',
          price: 375,
          who: 'The problem is known. You need the lawsuit-grade issues closed without overpaying.',
          diff: 'Here we actually FIX rather than only look. But we fix critical and serious findings — minor ones remain. A human joins in: some checks a machine cannot perform at all.',
          includes: [
            'Everything in Quick Audit',
            'Manual review of your key user journeys by a person, not a crawler',
            'Every critical and serious violation remediated',
            'Fixes applied to your code, or handed to your developers ready to merge',
            'Re-audit after the work — proof that it actually improved',
          ],
          deliverables: [
            'Fixed code, or a complete patch set with each change explained',
            'A before/after report with counts per violation type',
            'A second PDF audit taken after the work',
          ],
        },

        { name: 'Professional', timeline: '5–7 days', features: ['Full WCAG 2.1 AA audit', 'Screen-reader testing', 'Fix all violations', 'ARIA improvements', 'Re-audit'],
          slug: 'professional',
          price: 750,
          who: 'You want the matter closed completely, not halfway, and you want evidence.',
          diff: 'Unlike Starter Fix, EVERYTHING found is repaired, minor findings included, and screen-reader testing is added — the site is checked the way a blind person actually uses it. No crawler can do that.',
          includes: [
            'Everything in Starter Fix',
            'Live screen-reader testing: NVDA on Windows, VoiceOver on macOS',
            'ALL WCAG 2.1 AA violations remediated, not only the critical ones',
            'ARIA markup for elements that carry no built-in meaning',
            'Dynamic elements verified: modals, dropdowns, tab panels',
          ],
          deliverables: [
            'Fully remediated code',
            'A screen-reader test log with a transcript of what it announces',
            'A re-audit confirming WCAG 2.1 AA conformance',
          ],
        },

        { name: 'AI-Enhanced', timeline: '7–10 days', features: ['Everything in Professional', 'AI component review', 'Keyboard navigation overhaul', 'Focus management', 'Compliance statement'],
          slug: 'ai-enhanced',
          price: 1200,
          who: 'A complex site with many custom components, and you want legal cover.',
          diff: 'Two things separate this from Professional. First, a model reviews every component and proposes an accessible replacement — reviewing that volume by hand would take weeks. Second, you receive a formal Accessibility Statement: the document you show in court.',
          includes: [
            'Everything in Professional',
            'AI review of each interface component with an accessible alternative proposed',
            'Keyboard navigation rebuilt: tab order, skip links, landmark structure',
            'Focus management in dynamic elements — where the cursor returns after a dialog closes',
            'An Accessibility Statement drafted to the WAI template',
          ],
          deliverables: [
            'Remediated code with rebuilt components',
            'A published Accessibility Statement on your own domain',
            'A keyboard navigation map covering every page',
          ],
        },

        { name: 'Ecosystem', timeline: '10–14 days', features: ['Full site + design system audit', 'WCAG 2.2 coverage', 'Component-level ARIA patterns', 'Training session (1h)', 'Ongoing monitoring'],
          slug: 'ecosystem',
          price: 1800,
          who: 'Several sites, or a design system, and it must not break again.',
          diff: 'The first level where we fix the CAUSE rather than the site: the design system itself is repaired, so new pages are born accessible. Plus WCAG 2.2 instead of 2.1, and continuous monitoring that reports new violations on its own.',
          includes: [
            'Everything in AI-Enhanced',
            'Audit and remediation of your component library or design system',
            'WCAG 2.2 coverage — newer than 2.1, adds target size and focus requirements',
            'ARIA patterns at component level rather than page by page',
            'A one-hour training session for your team, recorded',
            'Continuous monitoring: daily checks, an email whenever a new issue appears',
          ],
          deliverables: [
            'A remediated design system with per-component documentation',
            'Access to a monitoring dashboard with full check history',
            'The training recording and a developer cheat sheet',
          ],
        },

        { name: 'Enterprise Lite', timeline: '2–3 weeks', features: ['Multi-page / SPA audit', 'Assistive tech compatibility', 'Legal compliance review', 'Developer documentation', 'Slack support (30d)'],
          slug: 'enterprise-lite',
          price: 2500,
          who: 'A single-page application, or a large multi-page portal.',
          diff: 'What separates this from Ecosystem is the KIND of site, not the size. This is SPA work: content changes without a page reload, and crawlers simply do not see it. Assistive-technology compatibility testing and legal review of wording are added — not only code.',
          includes: [
            'Everything in Ecosystem',
            'Single-page application audit — React, Vue, Angular — traversing application states',
            'Testing on real assistive technology: JAWS, NVDA, VoiceOver, Dragon',
            'Legal review of your wording against ADA requirements',
            'Developer documentation on sustaining accessibility going forward',
            'A Slack support channel for 30 days, next-business-day response',
          ],
          deliverables: [
            'A remediated application and a maintenance handbook',
            'Test logs from four assistive technologies',
            'A written opinion on your legal wording',
          ],
        },

        { name: 'Enterprise Pro', timeline: '3–4 weeks', features: ['Everything in Enterprise Lite', 'ADA / Section 508 alignment', 'User testing with disabled users', 'CI/CD integration', 'Quarterly re-audit'],
          slug: 'enterprise-pro',
          price: 3500,
          who: 'An organisation bound by ADA or Section 508: government, contractors, finance.',
          diff: 'The only level where the site is tested by REAL PEOPLE WITH DISABILITIES, not just specialists and tooling. Accessibility is also wired into your build: every deployment is checked automatically, so it can no longer break unnoticed.',
          includes: [
            'Everything in Enterprise Lite',
            'Conformance with ADA Title III and Section 508 of the Rehabilitation Act',
            'Testing with participants who have vision, hearing and motor impairments',
            'Accessibility checks wired into CI/CD: the build fails on a new violation',
            'A re-audit every quarter for a year',
          ],
          deliverables: [
            'An ADA and Section 508 conformance report',
            'Session recordings from disabled participants with their feedback',
            'A configured checking pipeline inside your own repository',
            'Four quarterly reports over the year',
          ],
        },

        { name: 'Full Remediation', timeline: 'Custom', features: ['Complete codebase remediation', 'VPAT documentation', 'Legal risk mitigation', 'Dedicated a11y engineer', 'Annual audit contract'],
          slug: 'full-remediation',
          price: 0,
          who: 'The codebase is easier to rewrite than to patch. Or litigation is already under way.',
          diff: 'There is no fixed price because there is no fixed scope: this is a full rebuild of the codebase around your situation. A dedicated engineer works with you alone, and a VPAT is produced — the document US public procurement asks for.',
          includes: [
            'Everything in Enterprise Pro',
            'Full codebase rebuild instead of targeted patches',
            'VPAT (Voluntary Product Accessibility Template) prepared',
            'Work alongside your counsel to reduce legal exposure',
            'A dedicated accessibility engineer for the term of the contract',
            'An annual support and audit agreement',
          ],
          deliverables: [
            'A rebuilt codebase',
            'A VPAT document for public procurement',
            'A support agreement with agreed response times',
          ],
        },

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

            tierWho: 'Кому это подходит',
      tierDiff: 'Чем этот уровень отличается',
      tierIncludes: 'Что мы делаем',
      tierDeliverables: 'Что вы получаете',
      tierTimeline: 'Срок',
      tierPayNow: 'Оплатить и начать',
      tierAskQuote: 'Запросить смету',
      tierClose: 'Закрыть',
      tierMoreDetails: 'Подробно',
      tiers: [

        { name: 'Лайт-Аудит', timeline: '1 день', features: ['25 страниц вместо 3', 'Полный список нарушений', 'PDF с датой проверки', 'Разбивка по тяжести'],
          slug: 'lite-audit',
          price: 50,
          who: 'Нужно подтверждение на бумаге, что сайт проверен — для юриста, страховщика или заказчика, — а платить за разбор пока рано.',
          diff: 'Бесплатная проверка смотрит ТРИ страницы и не оставляет на руках ничего, кроме экрана. Здесь двадцать пять страниц и документ с датой, который можно кому-то показать. Чего здесь НЕТ: объяснения, чем каждое нарушение грозит в суде, и оценки риска в долларах — это начинается с Быстрого Аудита.',
          includes: [
            'Автоматическое сканирование WCAG 2.1 AA до 25 страниц, а не 3',
            'Каждое нарушение с указанием страницы и конкретного элемента',
            'Разделение находок по тяжести: критические, серьёзные, средние, мелкие',
            'Проверка контраста текста, размера кнопок и порядка заголовков',
          ],
          deliverables: [
            'PDF с датой проверки и полным перечнем нарушений',
            'Таблица по тяжести — её можно приложить к договору или страховой форме',
            'Проверка повторяема: тот же адрес, та же методика, в любой момент позже',
          ],
        },

        { name: 'Быстрый Аудит', timeline: '1 день', features: ['Автоматизированное сканирование WCAG 2.1 AA', 'Отчёт о топ-10 проблемах', 'Резюме в PDF', 'Список приоритетов'],
          slug: 'quick-audit',
          price: 149,
          who: 'Нужно быстро узнать, чем грозит сайт, и есть ли вообще проблема.',
          diff: 'Самый простой уровень: мы СМОТРИМ и рассказываем, но ничего не чиним. Исправления начинаются со следующего уровня.',
          includes: [
            'Автоматическое сканирование по WCAG 2.1 AA всех страниц, доступных роботу',
            'Проверка контраста текста, размеров кликабельных областей и порядка заголовков',
            'Поиск изображений без описания и полей формы без подписи',
            'Ранжирование найденного по риску: что грозит иском, а что косметика',
          ],
          deliverables: [
            'PDF-отчёт на 8–12 страниц со снимками экрана каждой проблемы',
            'Список десяти самых опасных нарушений с указанием страницы и элемента',
            'Оценка юридического риска по ADA простыми словами',
          ],
        },

        { name: 'Начальное Исправление', timeline: '3–5 дней', features: ['Полный автоматизированный аудит', 'Ручная точечная проверка', 'Устранение критических и серьёзных проблем', 'Повторный аудит включён'],
          slug: 'starter-fix',
          price: 375,
          who: 'Проблема известна, нужно закрыть то, что грозит иском, и не переплатить.',
          diff: 'Здесь мы уже ЧИНИМ, а не только смотрим. Но чиним критическое и серьёзное — мелкие замечания остаются. Добавляется живой человек: часть проверок робот сделать не может.',
          includes: [
            'Всё из «Быстрого Аудита»',
            'Ручная проверка ключевых сценариев человеком, а не роботом',
            'Исправление всех нарушений уровня «критическое» и «серьёзное»',
            'Правки вносятся в ваш код или передаются вашим разработчикам готовыми',
            'Повторный аудит после исправлений — доказательство, что стало лучше',
          ],
          deliverables: [
            'Исправленный код или готовый набор правок с пояснением каждой',
            'Отчёт «было / стало» с числами по каждому типу нарушений',
            'Повторный PDF-аудит после работ',
          ],
        },

        { name: 'Профессиональный', timeline: '5–7 дней', features: ['Полный аудит WCAG 2.1 AA', 'Тестирование со скринридером', 'Исправление всех нарушений', 'Улучшения ARIA', 'Повторный аудит'],
          slug: 'professional',
          price: 750,
          who: 'Нужно закрыть вопрос целиком, а не наполовину, и иметь доказательства.',
          diff: 'В отличие от «Начального» здесь чинится ВСЁ найденное, включая мелкие замечания, и добавляется проверка скринридером — то есть сайт проверяется так, как им пользуется незрячий человек. Робот этого не умеет в принципе.',
          includes: [
            'Всё из «Начального Исправления»',
            'Проверка живым скринридером: NVDA на Windows и VoiceOver на macOS',
            'Исправление ВСЕХ нарушений WCAG 2.1 AA, а не только критических',
            'Разметка ARIA для элементов, у которых нет стандартного смысла',
            'Проверка динамических элементов: модальные окна, выпадающие списки, вкладки',
          ],
          deliverables: [
            'Полностью исправленный код',
            'Протокол проверки скринридером с расшифровкой, что он озвучивает',
            'Повторный аудит с подтверждением соответствия WCAG 2.1 AA',
          ],
        },

        { name: 'С Усилением ИИ', timeline: '7–10 дней', features: ['Всё из Профессионального', 'Обзор компонентов с ИИ', 'Переработка клавиатурной навигации', 'Управление фокусом', 'Заявление о соответствии'],
          slug: 'ai-enhanced',
          price: 1200,
          who: 'Сайт сложный, много самописных компонентов, нужна юридическая защита.',
          diff: 'Отличие от «Профессионального» в двух вещах. Первая: каждый компонент разбирает ИИ и предлагает доступный вариант — на ручной разбор такого объёма ушли бы недели. Вторая: вы получаете официальное Заявление о соответствии, документ, который показывают в суде.',
          includes: [
            'Всё из «Профессионального»',
            'Разбор каждого интерфейсного компонента моделью с предложением доступной замены',
            'Полная переработка навигации с клавиатуры: порядок обхода, пропуск блоков',
            'Управление фокусом в динамических элементах — куда возвращается курсор после закрытия окна',
            'Составление Заявления о доступности (Accessibility Statement) по форме WAI',
          ],
          deliverables: [
            'Исправленный код с переработанными компонентами',
            'Опубликованное Заявление о соответствии на вашем домене',
            'Карта клавиатурной навигации: схема обхода всех страниц',
          ],
        },

        { name: 'Экосистема', timeline: '10–14 дней', features: ['Аудит всего сайта + дизайн-системы', 'Покрытие WCAG 2.2', 'Паттерны ARIA на уровне компонентов', 'Обучающая сессия (1ч)', 'Непрерывный мониторинг'],
          slug: 'ecosystem',
          price: 1800,
          who: 'Сайтов несколько или есть дизайн-система, и нужно, чтобы не сломалось снова.',
          diff: 'Первый уровень, где мы чиним не только сайт, но и ПРИЧИНУ: правится сама дизайн-система, поэтому новые страницы рождаются доступными. Плюс WCAG 2.2 вместо 2.1 и постоянный мониторинг, который сообщает о новых нарушениях сам.',
          includes: [
            'Всё из «С Усилением ИИ»',
            'Аудит и правка библиотеки компонентов или дизайн-системы',
            'Покрытие WCAG 2.2 — новее, чем 2.1, добавлены требования к целям касания и фокусу',
            'Паттерны ARIA на уровне компонентов, а не отдельных страниц',
            'Обучающая сессия для вашей команды, один час, с записью',
            'Непрерывный мониторинг: проверка раз в сутки, письмо при новой ошибке',
          ],
          deliverables: [
            'Исправленная дизайн-система с документацией по каждому компоненту',
            'Доступ к панели мониторинга с историей проверок',
            'Запись обучающей сессии и памятка для разработчиков',
          ],
        },

        { name: 'Enterprise Lite', timeline: '2–3 недели', features: ['Аудит многостраничного / SPA сайта', 'Совместимость со вспомогательными технологиями', 'Проверка юридического соответствия', 'Документация для разработчиков', 'Поддержка Slack (30д)'],
          slug: 'enterprise-lite',
          price: 2500,
          who: 'Одностраничное приложение или большой многостраничный портал.',
          diff: 'Отличие от «Экосистемы» — тип сайта, а не объём. Здесь работа с SPA: содержимое меняется без перезагрузки, и робот-сканер такое не видит. Добавляется проверка совместимости со вспомогательными технологиями и юридическая экспертиза текста, а не только кода.',
          includes: [
            'Всё из «Экосистемы»',
            'Аудит одностраничных приложений: React, Vue, Angular — с обходом состояний',
            'Проверка на реальных вспомогательных технологиях: JAWS, NVDA, VoiceOver, Dragon',
            'Юридическая проверка формулировок на соответствие требованиям ADA',
            'Документация для разработчиков: как поддерживать доступность дальше',
            'Канал поддержки в Slack на 30 дней с ответом в рабочий день',
          ],
          deliverables: [
            'Исправленное приложение и руководство по поддержке',
            'Протоколы проверки на четырёх вспомогательных технологиях',
            'Заключение по юридическим формулировкам',
          ],
        },

        { name: 'Enterprise Pro', timeline: '3–4 недели', features: ['Всё из Enterprise Lite', 'Соответствие ADA / Раздел 508', 'Пользовательское тестирование с людьми с ОВЗ', 'Интеграция CI/CD', 'Ежеквартальный повторный аудит'],
          slug: 'enterprise-pro',
          price: 3500,
          who: 'Организация под требованиями ADA или Раздела 508: госструктуры, подрядчики, финансы.',
          diff: 'Единственный уровень, где сайт проверяют НАСТОЯЩИЕ ЛЮДИ С ОГРАНИЧЕННЫМИ ВОЗМОЖНОСТЯМИ, а не только специалисты и техника. Плюс доступность встраивается в вашу сборку: каждая новая выкладка проверяется автоматически, и сломать её незаметно уже нельзя.',
          includes: [
            'Всё из «Enterprise Lite»',
            'Приведение в соответствие ADA Title III и Разделу 508 Закона о реабилитации',
            'Тестирование с участием людей с нарушениями зрения, слуха и моторики',
            'Встраивание проверок в CI/CD: сборка падает при новом нарушении',
            'Повторный аудит раз в квартал в течение года',
          ],
          deliverables: [
            'Отчёт о соответствии ADA и Разделу 508',
            'Видеозаписи сессий с участниками тестирования и их замечания',
            'Настроенный конвейер проверок в вашем репозитории',
            'Четыре квартальных отчёта в течение года',
          ],
        },

        { name: 'Полная Ремедиация', timeline: 'По запросу', features: ['Полная ремедиация кодовой базы', 'Документация VPAT', 'Снижение правовых рисков', 'Выделенный инженер a11y', 'Годовой контракт на аудит'],
          slug: 'full-remediation',
          price: 0,
          who: 'Кодовую базу проще переписать, чем чинить. Или идёт судебное разбирательство.',
          diff: 'Здесь нет фиксированной цены, потому что нет фиксированного объёма: это переработка кодовой базы целиком под ваш случай. Выделяется отдельный инженер, который работает только с вами, и составляется VPAT — документ, который запрашивают при госзакупках в США.',
          includes: [
            'Всё из «Enterprise Pro»',
            'Полная переработка кодовой базы вместо точечных правок',
            'Составление VPAT (Voluntary Product Accessibility Template)',
            'Работа с вашими юристами по снижению правового риска',
            'Выделенный инженер по доступности на весь срок договора',
            'Годовой договор на сопровождение и аудит',
          ],
          deliverables: [
            'Переработанная кодовая база',
            'Документ VPAT для участия в госзакупках',
            'Договор на сопровождение с оговорёнными сроками ответа',
          ],
        },

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

            tierWho: 'Para quién es',
      tierDiff: 'Qué distingue a este nivel',
      tierIncludes: 'Qué hacemos',
      tierDeliverables: 'Qué recibe usted',
      tierTimeline: 'Plazo',
      tierPayNow: 'Pagar y empezar',
      tierAskQuote: 'Solicitar presupuesto',
      tierClose: 'Cerrar',
      tierMoreDetails: 'Detalles completos',
      tiers: [

        { name: 'Auditoría Lite', timeline: '1 día', features: ['25 páginas en vez de 3', 'Lista completa de infracciones', 'PDF con fecha de la revisión', 'Desglose por gravedad'],
          slug: 'lite-audit',
          price: 50,
          who: 'Necesita una prueba en papel de que el sitio fue revisado — para un abogado, una aseguradora o un cliente — y todavía no quiere pagar por el análisis.',
          diff: 'El escaneo gratuito mira TRES páginas y no deja nada en las manos salvo una pantalla. Aquí: veinticinco páginas y un documento fechado que se puede entregar. Lo que NO está aquí: la lectura de lo que cada hallazgo significa ante un tribunal y la cifra en dólares de su exposición — eso empieza en la Auditoría Rápida.',
          includes: [
            'Escaneo automatizado WCAG 2.1 AA de hasta 25 páginas, no 3',
            'Cada infracción con la página y el elemento concretos indicados',
            'Hallazgos separados por gravedad: críticos, serios, moderados, menores',
            'Contraste del texto, tamaño de los botones y orden de los encabezados verificados',
          ],
          deliverables: [
            'Un PDF con la fecha del escaneo y la lista completa de infracciones',
            'Una tabla por gravedad para adjuntar a un contrato o a un formulario de seguro',
            'El escaneo es repetible: la misma URL, el mismo método, en cualquier momento',
          ],
        },

        { name: 'Auditoría Rápida', timeline: '1 día', features: ['Escaneo automatizado WCAG 2.1 AA', 'Informe de los 10 principales problemas', 'Resumen en PDF', 'Lista de prioridades'],
          slug: 'quick-audit',
          price: 149,
          who: 'Necesita saber rápido si el sitio supone un riesgo y si el problema existe siquiera.',
          diff: 'El nivel más simple: MIRAMOS e informamos, pero no reparamos nada. Las correcciones empiezan en el siguiente nivel.',
          includes: [
            'Escaneo automático WCAG 2.1 AA de todas las páginas accesibles al rastreador',
            'Contraste del texto, tamaño de las zonas pulsables y orden de los encabezados',
            'Imágenes sin descripción y campos de formulario sin etiqueta',
            'Hallazgos ordenados por riesgo: qué invita a una demanda y qué es cosmético',
          ],
          deliverables: [
            'Informe PDF de 8–12 páginas con una captura de pantalla por cada problema',
            'Las diez infracciones más peligrosas, con página y elemento indicados',
            'Valoración del riesgo legal ADA en lenguaje llano',
          ],
        },

        { name: 'Corrección Inicial', timeline: '3–5 días', features: ['Auditoría automatizada completa', 'Revisión manual puntual', 'Corrección de problemas críticos y serios', 'Re-auditoría incluida'],
          slug: 'starter-fix',
          price: 375,
          who: 'El problema ya se conoce. Hay que cerrar lo que expone a demanda sin pagar de más.',
          diff: 'Aquí sí REPARAMOS, no solo miramos. Pero reparamos lo crítico y lo grave: las observaciones menores quedan. Entra una persona: hay comprobaciones que una máquina no puede hacer.',
          includes: [
            'Todo lo de Auditoría Rápida',
            'Revisión manual de los recorridos clave por una persona, no por un robot',
            'Corrección de todas las infracciones críticas y graves',
            'Las correcciones se aplican a su código o se entregan listas a sus desarrolladores',
            'Nueva auditoría tras el trabajo: prueba de que realmente mejoró',
          ],
          deliverables: [
            'Código corregido o un conjunto de parches con cada cambio explicado',
            'Informe antes/después con cifras por tipo de infracción',
            'Segunda auditoría en PDF posterior al trabajo',
          ],
        },

        { name: 'Profesional', timeline: '5–7 días', features: ['Auditoría WCAG 2.1 AA completa', 'Pruebas con lector de pantalla', 'Corrección de todas las violaciones', 'Mejoras ARIA', 'Re-auditoría'],
          slug: 'professional',
          price: 750,
          who: 'Quiere cerrar el asunto por completo, no a medias, y con pruebas.',
          diff: 'A diferencia de Corrección Inicial, se repara TODO lo encontrado, incluidas las observaciones menores, y se añade prueba con lector de pantalla: el sitio se verifica tal como lo usa una persona ciega. Ningún robot puede hacerlo.',
          includes: [
            'Todo lo de Corrección Inicial',
            'Prueba con lector de pantalla real: NVDA en Windows y VoiceOver en macOS',
            'Corrección de TODAS las infracciones WCAG 2.1 AA, no solo las críticas',
            'Marcado ARIA para elementos sin significado propio',
            'Verificación de elementos dinámicos: modales, desplegables, pestañas',
          ],
          deliverables: [
            'Código completamente corregido',
            'Registro de la prueba con lector de pantalla y transcripción de lo que anuncia',
            'Nueva auditoría que confirma la conformidad WCAG 2.1 AA',
          ],
        },

        { name: 'Mejorado con IA', timeline: '7–10 días', features: ['Todo lo de Profesional', 'Revisión de componentes con IA', 'Renovación de navegación por teclado', 'Gestión del foco', 'Declaración de conformidad'],
          slug: 'ai-enhanced',
          price: 1200,
          who: 'Sitio complejo, con muchos componentes propios, y necesita respaldo legal.',
          diff: 'Dos cosas lo separan del Profesional. Primera: un modelo revisa cada componente y propone una alternativa accesible; revisar ese volumen a mano llevaría semanas. Segunda: recibe una Declaración de Accesibilidad formal, el documento que se presenta ante un tribunal.',
          includes: [
            'Todo lo del Profesional',
            'Revisión con IA de cada componente de interfaz con alternativa accesible propuesta',
            'Navegación por teclado rehecha: orden de tabulación, enlaces de salto, regiones',
            'Gestión del foco en elementos dinámicos: adónde vuelve el cursor al cerrar un diálogo',
            'Redacción de la Declaración de Accesibilidad según la plantilla WAI',
          ],
          deliverables: [
            'Código corregido con los componentes rehechos',
            'Declaración de Accesibilidad publicada en su propio dominio',
            'Mapa de navegación por teclado de todas las páginas',
          ],
        },

        { name: 'Ecosistema', timeline: '10–14 días', features: ['Auditoría de sitio completo + sistema de diseño', 'Cobertura WCAG 2.2', 'Patrones ARIA a nivel de componente', 'Sesión de formación (1h)', 'Monitoreo continuo'],
          slug: 'ecosystem',
          price: 1800,
          who: 'Varios sitios o un sistema de diseño, y no debe volver a romperse.',
          diff: 'El primer nivel en el que reparamos la CAUSA y no el sitio: se corrige el propio sistema de diseño, de modo que las páginas nuevas nacen accesibles. Además WCAG 2.2 en lugar de 2.1 y monitorización continua que avisa sola de nuevas infracciones.',
          includes: [
            'Todo lo de Con Refuerzo de IA',
            'Auditoría y corrección de su biblioteca de componentes o sistema de diseño',
            'Cobertura WCAG 2.2: más reciente que 2.1, añade tamaño de destino y foco',
            'Patrones ARIA a nivel de componente, no página por página',
            'Sesión formativa de una hora para su equipo, grabada',
            'Monitorización continua: revisión diaria y correo ante cada nueva incidencia',
          ],
          deliverables: [
            'Sistema de diseño corregido con documentación por componente',
            'Acceso al panel de monitorización con el historial de revisiones',
            'Grabación de la formación y guía rápida para desarrolladores',
          ],
        },

        { name: 'Enterprise Lite', timeline: '2–3 semanas', features: ['Auditoría de múltiples páginas / SPA', 'Compatibilidad con tecnología asistiva', 'Revisión de cumplimiento legal', 'Documentación para desarrolladores', 'Soporte Slack (30d)'],
          slug: 'enterprise-lite',
          price: 2500,
          who: 'Una aplicación de página única o un portal grande de muchas páginas.',
          diff: 'Lo que lo separa de Ecosistema es el TIPO de sitio, no su tamaño. Aquí se trabaja con SPA: el contenido cambia sin recargar la página y los rastreadores sencillamente no lo ven. Se añaden pruebas de compatibilidad con tecnologías de apoyo y revisión jurídica del texto, no solo del código.',
          includes: [
            'Todo lo de Ecosistema',
            'Auditoría de aplicaciones de página única —React, Vue, Angular— recorriendo estados',
            'Pruebas con tecnología de apoyo real: JAWS, NVDA, VoiceOver, Dragon',
            'Revisión jurídica de sus textos frente a los requisitos ADA',
            'Documentación para desarrolladores sobre cómo mantener la accesibilidad',
            'Canal de soporte en Slack durante 30 días, respuesta al siguiente día hábil',
          ],
          deliverables: [
            'Aplicación corregida y manual de mantenimiento',
            'Registros de prueba de cuatro tecnologías de apoyo',
            'Dictamen escrito sobre sus textos legales',
          ],
        },

        { name: 'Enterprise Pro', timeline: '3–4 semanas', features: ['Todo lo de Enterprise Lite', 'Alineación ADA / Sección 508', 'Pruebas de usuario con personas con discapacidad', 'Integración CI/CD', 'Re-auditoría trimestral'],
          slug: 'enterprise-pro',
          price: 3500,
          who: 'Organización sujeta a ADA o a la Sección 508: administración, contratistas, finanzas.',
          diff: 'El único nivel en el que el sitio lo prueban PERSONAS REALES CON DISCAPACIDAD, y no solo especialistas y herramientas. Además la accesibilidad se integra en su compilación: cada despliegue se comprueba solo, y ya no puede romperse sin que nadie lo note.',
          includes: [
            'Todo lo de Enterprise Lite',
            'Conformidad con el Título III de la ADA y la Sección 508',
            'Pruebas con participantes con discapacidad visual, auditiva y motora',
            'Comprobaciones integradas en CI/CD: la compilación falla ante una nueva infracción',
            'Nueva auditoría cada trimestre durante un año',
          ],
          deliverables: [
            'Informe de conformidad ADA y Sección 508',
            'Grabaciones de las sesiones con los participantes y sus observaciones',
            'Cadena de comprobación configurada en su propio repositorio',
            'Cuatro informes trimestrales a lo largo del año',
          ],
        },

        { name: 'Remediación Completa', timeline: 'Personalizado', features: ['Remediación completa del código', 'Documentación VPAT', 'Mitigación del riesgo legal', 'Ingeniero a11y dedicado', 'Contrato de auditoría anual'],
          slug: 'full-remediation',
          price: 0,
          who: 'La base de código es más fácil de reescribir que de parchear. O ya hay un litigio en curso.',
          diff: 'No hay precio fijo porque no hay alcance fijo: es la reconstrucción completa de la base de código para su caso. Se asigna un ingeniero dedicado que trabaja solo con usted y se elabora un VPAT, el documento que exige la contratación pública en EE. UU.',
          includes: [
            'Todo lo de Enterprise Pro',
            'Reconstrucción completa de la base de código en lugar de parches puntuales',
            'Elaboración del VPAT (Voluntary Product Accessibility Template)',
            'Trabajo junto a sus abogados para reducir el riesgo legal',
            'Ingeniero de accesibilidad dedicado durante toda la vigencia del contrato',
            'Contrato anual de acompañamiento y auditoría',
          ],
          deliverables: [
            'Base de código reconstruida',
            'Documento VPAT para contratación pública',
            'Contrato de soporte con plazos de respuesta acordados',
          ],
        },

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

            tierWho: '适合谁',
      tierDiff: '本档与上一档的区别',
      tierIncludes: '我们做什么',
      tierDeliverables: '您将获得',
      tierTimeline: '周期',
      tierPayNow: '支付并开始',
      tierAskQuote: '索取报价',
      tierClose: '关闭',
      tierMoreDetails: '详细说明',
      tiers: [

        { name: '轻度审计', timeline: '1天', features: ['扫描25个页面而非3个', '完整违规清单', '带检测日期的PDF', '按严重程度分类'],
          slug: 'lite-audit',
          price: 50,
          who: '您需要一份书面证明，表明网站已被检测——用于律师、保险公司或客户——但暂时还不打算为分析付费。',
          diff: '免费扫描只查看三个页面，除了屏幕上的结果什么也留不下。这里是二十五个页面，以及一份可以出示给他人的带日期文件。这里没有的：每项违规在法庭上意味着什么的解读，以及以美元计的风险评估——那从快速审计开始。',
          includes: [
            '自动化WCAG 2.1 AA扫描，最多25个页面，而非3个',
            '每项违规均标明具体页面和元素',
            '按严重程度划分：严重、重大、中等、轻微',
            '验证文本对比度、点击目标尺寸和标题层级顺序',
          ],
          deliverables: [
            '包含扫描日期和完整违规清单的PDF文件',
            '可附于合同或保险表格的严重程度对照表',
            '扫描可重复：相同网址、相同方法，日后随时可再次进行',
          ],
        },

        { name: '快速审计', timeline: '1天', features: ['自动化WCAG 2.1 AA扫描', '前10问题报告', 'PDF摘要', '优先级列表'],
          slug: 'quick-audit',
          price: 149,
          who: '需要快速判断网站是否存在法律风险，以及问题是否真的存在。',
          diff: '最基础的层级：我们只「看」并出具报告，不做任何修复。修复从下一档开始。',
          includes: [
            '对爬虫可访问的全部页面进行 WCAG 2.1 AA 自动扫描',
            '检查文字对比度、可点击区域尺寸与标题层级顺序',
            '找出缺少描述的图片和缺少标签的表单字段',
            '按风险排序：哪些可能招致诉讼，哪些只是外观问题',
          ],
          deliverables: [
            '8–12 页 PDF 报告，每个问题均附截图',
            '十项最危险的违规，逐条标明所在页面与元素',
            '用通俗语言说明的 ADA 法律风险评估',
          ],
        },

        { name: '入门修复', timeline: '3–5天', features: ['完整自动化审计', '手动抽查', '修复严重和重要问题', '包含复审'],
          slug: 'starter-fix',
          price: 375,
          who: '问题已经清楚，需要先关闭可能招致诉讼的部分，又不想多花钱。',
          diff: '这一档开始真正「修」，而不只是看。但只修复严重与重大问题，轻微项保留。并加入人工：有些检查机器根本做不了。',
          includes: [
            '包含「快速审计」的全部内容',
            '由真人而非爬虫手工核查关键使用路径',
            '修复全部「严重」与「重大」等级的违规',
            '修改直接写入贵方代码，或整理成可合并的补丁交付开发团队',
            '完工后复审——用数据证明确实改善',
          ],
          deliverables: [
            '修复后的代码，或逐条说明的完整补丁集',
            '按违规类型给出数字的「修复前/后」报告',
            '完工后的第二份 PDF 审计报告',
          ],
        },

        { name: '专业版', timeline: '5–7天', features: ['完整WCAG 2.1 AA审计', '屏幕阅读器测试', '修复所有违规', 'ARIA改进', '复审'],
          slug: 'professional',
          price: 750,
          who: '希望把问题彻底了结，而不是做一半，并且要留下证据。',
          diff: '与「初步修复」不同，这里修复发现的全部问题，含轻微项，并加入读屏软件测试——按照盲人实际使用的方式检验网站。这是爬虫做不到的。',
          includes: [
            '包含「初步修复」的全部内容',
            '真实读屏软件测试：Windows 上的 NVDA 与 macOS 上的 VoiceOver',
            '修复全部 WCAG 2.1 AA 违规，而不仅是严重项',
            '为本身没有语义的元素补充 ARIA 标记',
            '核查动态元素：弹窗、下拉菜单、标签页',
          ],
          deliverables: [
            '完全修复的代码',
            '读屏测试记录，附朗读内容的文字转写',
            '确认符合 WCAG 2.1 AA 的复审报告',
          ],
        },

        { name: 'AI增强版', timeline: '7–10天', features: ['包含专业版所有内容', 'AI组件审查', '键盘导航全面改造', '焦点管理', '合规声明'],
          slug: 'ai-enhanced',
          price: 1200,
          who: '网站结构复杂、自研组件多，并且需要法律层面的保障。',
          diff: '与「专业版」的区别有两点。其一：由模型逐个分析组件并给出可访问的替代方案，人工完成同样的工作量需要数周。其二：您将获得正式的《无障碍声明》——可在法庭上出示的文件。',
          includes: [
            '包含「专业版」的全部内容',
            '用 AI 审查每一个界面组件，并提出可访问的替代实现',
            '重构键盘导航：Tab 顺序、跳过链接、地标区域',
            '动态元素的焦点管理——对话框关闭后光标回到何处',
            '按 WAI 模板起草《无障碍声明》',
          ],
          deliverables: [
            '含重构组件的修复代码',
            '在贵方域名上发布的《无障碍声明》',
            '覆盖全部页面的键盘导航图',
          ],
        },

        { name: '生态系统版', timeline: '10–14天', features: ['完整站点+设计系统审计', 'WCAG 2.2覆盖', '组件级ARIA模式', '培训课程（1小时）', '持续监控'],
          slug: 'ecosystem',
          price: 1800,
          who: '有多个站点或已有设计系统，且要求今后不再反复出问题。',
          diff: '第一个修「根因」而非「表象」的层级：直接修正设计系统本身，此后新页面天生就是无障碍的。同时采用比 2.1 更新的 WCAG 2.2，并提供可自动报警的持续监控。',
          includes: [
            '包含「AI 增强版」的全部内容',
            '审计并修正贵方组件库或设计系统',
            'WCAG 2.2 覆盖——比 2.1 更新，增加了目标尺寸与焦点要求',
            '在组件层面而非逐页应用 ARIA 模式',
            '为贵方团队提供一小时培训，全程录制',
            '持续监控：每日检查，出现新问题即发邮件',
          ],
          deliverables: [
            '修正后的设计系统，附每个组件的文档',
            '监控面板访问权限，含完整检查历史',
            '培训录像与开发者速查手册',
          ],
        },

        { name: '企业精简版', timeline: '2–3周', features: ['多页面/SPA审计', '辅助技术兼容性', '法律合规审查', '开发者文档', 'Slack支持（30天）'],
          slug: 'enterprise-lite',
          price: 2500,
          who: '单页应用，或页面众多的大型门户。',
          diff: '与「生态系统」的区别在于网站的「类型」而非规模。这里处理 SPA：内容无需刷新即可变化，扫描机器人根本看不到。并增加辅助技术兼容性测试与文案的法律审查——不只是代码。',
          includes: [
            '包含「生态系统」的全部内容',
            '单页应用审计——React、Vue、Angular——遍历应用状态',
            '在真实辅助技术上测试：JAWS、NVDA、VoiceOver、Dragon',
            '依据 ADA 要求对贵方文案进行法律审查',
            '面向开发者的文档：今后如何持续维护无障碍',
            '30 天 Slack 支持频道，下一个工作日内答复',
          ],
          deliverables: [
            '修复后的应用与维护手册',
            '四种辅助技术的测试记录',
            '针对法律文案的书面意见',
          ],
        },

        { name: '企业专业版', timeline: '3–4周', features: ['包含企业精简版所有内容', 'ADA/508条款对齐', '残障用户测试', 'CI/CD集成', '季度复审'],
          slug: 'enterprise-pro',
          price: 3500,
          who: '受 ADA 或第 508 条约束的机构：政府部门、承包商、金融机构。',
          diff: '唯一由「真正的残障人士」参与测试的层级，而不只是专家与工具。同时把无障碍检查嵌入贵方构建流程：每次发布自动校验，再也无法在无人察觉的情况下被破坏。',
          includes: [
            '包含「Enterprise Lite」的全部内容',
            '达成 ADA 第三章与《康复法》第 508 条的合规要求',
            '邀请视觉、听觉与肢体障碍人士参与测试',
            '将检查嵌入 CI/CD：出现新违规时构建直接失败',
            '一年内每季度复审一次',
          ],
          deliverables: [
            'ADA 与第 508 条合规报告',
            '残障参与者的测试录像及其反馈意见',
            '在贵方代码仓库中配置好的检查流水线',
            '一年内四份季度报告',
          ],
        },

        { name: '全面修复', timeline: '定制', features: ['完整代码库修复', 'VPAT文档', '法律风险缓解', '专属a11y工程师', '年度审计合同'],
          slug: 'full-remediation',
          price: 0,
          who: '代码库重写比修补更划算；或者诉讼已经开始。',
          diff: '没有固定价格，因为没有固定工作量：这是围绕贵方具体情况对整个代码库的重建。配备专属工程师只服务于您，并出具 VPAT——美国政府采购要求提交的文件。',
          includes: [
            '包含「Enterprise Pro」的全部内容',
            '整体重建代码库，而非局部修补',
            '编制 VPAT（自愿性产品无障碍模板）',
            '与贵方律师协作降低法律风险',
            '合同期内配备专属无障碍工程师',
            '年度维护与审计合同',
          ],
          deliverables: [
            '重建后的代码库',
            '可用于政府采购的 VPAT 文件',
            '约定响应时限的支持合同',
          ],
        },

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
