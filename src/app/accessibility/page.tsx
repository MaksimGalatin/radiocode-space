'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, XCircle, Shield, ShieldCheck, Zap, Eye, Users } from 'lucide-react';
import { useLanguageOptional } from '../../lib/LanguageContext';
import ThreatScanner from '../../components/ThreatScanner';
import RiskCalculator from '../../components/RiskCalculator';
import { ТЕКСТЫ_СКАНЕРА, type ЯзыкКодСканера } from './словарь';

const TIER_PRICES = ['$149', '$375', '$750', '$1,200', '$1,800', '$2,500', '$3,500', 'Custom'];
const TIER_HIGHLIGHTS = [false, false, false, true, false, false, false, false];

export default function AccessibilityPage() {
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  // Тексты берём из словаря рядом со страницей, а не из общего словаря
  // сайта: у каждого из четырёх сайтов он своей формы, и ключа
  // `accessibility` там нет. Приведение нужно потому, что `locale`
  // объявлен шире четырёх наших языков.
  const язык = (['ru', 'en', 'es', 'zh'].includes(locale) ? locale : 'en') as ЯзыкКодСканера;
  const a = ТЕКСТЫ_СКАНЕРА[язык];

  const colData = [
    { icon: XCircle, color: 'text-red-400',    bg: 'rgba(239,68,68,0.1)',    title: a.col1Title, points: a.col1Points },
    { icon: Shield,  color: 'text-cyan-600 dark:text-cyan-400',   bg: 'rgba(6,182,212,0.1)',    title: a.col2Title, points: a.col2Points },
    { icon: Zap,     color: 'text-purple-400', bg: 'rgba(139,92,246,0.1)',   title: a.col3Title, points: a.col3Points },
  ];

  const stats = [
    { value: a.stat1Value, label: a.stat1Label },
    { value: a.stat2Value, label: a.stat2Label },
    { value: a.stat3Value, label: a.stat3Label },
    { value: a.stat4Value, label: a.stat4Label },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#030711] text-gray-900 dark:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-cyan-600 focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        Skip to main content
      </a>

      <main id="main-content" className="pt-24">

        {/* Hero + AIfaFocus ThreatScanner */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8">
              <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300 tracking-widest uppercase">{a.heroTag}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6">
              <span className="text-gray-900 dark:text-white">{a.heroTitle1}</span>
              <span className="gradient-text">{a.heroTitle2}</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">{a.heroDesc}</p>

            {/* Три отличия, которых нет у массовых сканеров. Написаны словами
                владельца бизнеса, а не инженера: человек должен понять ценность
                за пять секунд, не зная, что такое заголовок ответа. */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
              <div className="p-4 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03]">
                <div className="text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                  {locale === 'ru' ? 'Не только сайт' : locale === 'es' ? 'No solo el sitio' : locale === 'zh' ? '不只是网站' : 'Not just the site'}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {locale === 'ru'
                    ? 'Проверяем и вашу почту. Если защиты нет, письмо от имени вашей компании может отправить кто угодно.'
                    : locale === 'es'
                      ? 'También revisamos su correo. Sin proteccion, cualquiera puede escribir en nombre de su empresa.'
                      : locale === 'zh'
                        ? '我们还检查您的邮件。没有保护，任何人都能冒用贵公司名义发信。'
                        : 'We check your email too. Without protection, anyone can send mail in your company name.'}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03]">
                <div className="text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                  {locale === 'ru' ? 'Не мнение, а доказательство' : locale === 'es' ? 'Prueba, no opinion' : locale === 'zh' ? '证据，而非意见' : 'Proof, not opinion'}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {locale === 'ru'
                    ? 'К каждой находке приложено точное значение, полученное с вашего сервера. Спорить не с чем.'
                    : locale === 'es'
                      ? 'Cada hallazgo trae el valor exacto obtenido de su servidor. No hay nada que discutir.'
                      : locale === 'zh'
                        ? '每项发现都附有从您服务器获取的确切数值。无可争辩。'
                        : 'Every finding carries the exact value taken from your server. Nothing to argue with.'}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03]">
                <div className="text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                  {locale === 'ru' ? 'Один сайт — один результат' : locale === 'es' ? 'Un sitio, un resultado' : locale === 'zh' ? '同一网站，同一结果' : 'One site, one result'}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {locale === 'ru'
                    ? 'Отчёт повторяем: тот же сайт всегда даёт ту же оценку. Вердикт выносит код, а не догадка.'
                    : locale === 'es'
                      ? 'El informe es reproducible: el mismo sitio siempre da la misma nota.'
                      : locale === 'zh'
                        ? '报告可复现：同一网站始终得到相同评分。'
                        : 'The report is reproducible: the same site always gets the same score.'}
                </p>
              </div>
            </div>

            {/* THE ORACLE — primary scanner */}
            <ThreatScanner />

            {/*
              🔴 ВХОД «ПРОВЕРИТЬ ОТЧЁТ ПО НОМЕРУ» БЫЛ ТОЛЬКО ПОСЛЕ СВОЕЙ ПРОВЕРКИ.
              Кнопка подтверждения появлялась в самом сканере, но лишь когда
              человек уже прогнал СВОЙ сайт. А главный случай — другой: клиент
              переслал отчёт партнёру, страховщику или юристу, и тот хочет
              убедиться, что номер настоящий, а не картинка в письме. Ему
              прогонять нечего, и входа для него не было ни одного.
              Именно на этом и держится доверие к AIfaFocus: отчёт проверяется по
              номеру у нас, а не на слово. Прятать эту дверь — терять главное
              отличие.
            */}
            <div className="mt-8 text-center">
              <a
                href="/audit-verify"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-600/40 dark:border-cyan-400/40 text-cyan-700 dark:text-cyan-300 hover:border-cyan-600 dark:hover:border-cyan-300 hover:bg-cyan-600/5 transition-colors text-sm font-semibold"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                {locale === 'ru'
                  ? 'Проверить отчёт по номеру'
                  : locale === 'es'
                    ? 'Verificar un informe por su número'
                    : locale === 'zh'
                      ? '按编号核验报告'
                      : 'Verify a report by its number'}
              </a>
              <p className="mt-2 text-[13px] text-gray-600 dark:text-gray-400">
                {locale === 'ru'
                  ? 'Получили отчёт от партнёра? Убедитесь, что он настоящий.'
                  : locale === 'es'
                    ? '¿Recibió un informe de un socio? Compruebe que es auténtico.'
                    : locale === 'zh'
                      ? '收到合作方的报告？核验它是否真实。'
                      : 'Received a report from a partner? Check that it is genuine.'}
              </p>
            </div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section aria-labelledby="problem-heading" className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 id="problem-heading" className="text-3xl md:text-4xl font-black text-center mb-4 text-gray-900 dark:text-white">
              {a.problemTitle}<span className="gradient-text">{a.problemHighlight}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-14 max-w-2xl mx-auto">{a.problemSubtitle}</p>

            <div className="grid md:grid-cols-3 gap-6">
              {colData.map((col) => (
                <div key={col.title} className="glass rounded-2xl p-6 border border-gray-200 dark:border-white/8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: col.bg }}>
                      <col.icon className={`w-5 h-5 ${col.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{col.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {col.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${col.color.replace('text-', 'bg-')}`} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/*
          КОГО ЭТО КАСАЕТСЯ НА САМОМ ДЕЛЕ (30.08.2026).

          Мысль Архитектора: «мы ведь помогаем не только инвалидам по
          зрению. С возрастом у людей зрение ухудшается — мы помогаем
          абсолютно каждому на перспективу».

          Проверено числами: слепых в США около миллиона, людей с потерей
          зрения около семи, а с возрастной дальнозоркостью — 128
          миллионов. Аудитория больше в восемнадцать раз, и она растёт:
          к 2030 частота потери зрения в США удвоится.

          Раздел ДОБАВЛЕН, а не заменил прежний. Люди с инвалидностью —
          не «слишком маленькая аудитория», и подменять их старением было
          бы предательством сути работы. Сначала защищаем тех, для кого
          барьер непреодолим; следом выясняется, что это защищает всех.
        */}
        <section aria-labelledby="who-heading" className="py-20 px-6 bg-gray-50 dark:bg-gray-900/40">
          <div className="max-w-4xl mx-auto">
            <h2 id="who-heading" className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {locale === 'ru' ? 'Кого это касается на самом деле'
                : locale === 'es' ? 'A quién afecta realmente'
                : locale === 'zh' ? '这究竟关乎谁'
                : 'Who this actually affects'}
            </h2>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {locale === 'ru'
                ? 'Ваш сайт сегодня недоступен не для абстрактного инвалида. Он недоступен для ваших родителей — и для вас через двадцать лет.'
                : locale === 'es'
                ? 'Hoy su sitio no es inaccesible para una persona con discapacidad abstracta. Es inaccesible para sus padres, y para usted dentro de veinte años.'
                : locale === 'zh'
                ? '您的网站今天并非对某个抽象的残障人士不可用，而是对您的父母不可用——二十年后也将对您自己不可用。'
                : 'Your site today is not inaccessible to some abstract disabled person. It is inaccessible to your parents — and to you in twenty years.'}
            </p>

            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              {[
                { n: '128 000 000',
                  ru: 'американцев с возрастной дальнозоркостью',
                  en: 'Americans with age-related farsightedness',
                  es: 'estadounidenses con presbicia',
                  zh: '美国人患有老视' },
                { n: '80 %',
                  ru: 'людей сталкиваются с ней к сорока годам',
                  en: 'of people develop it by age forty',
                  es: 'de las personas la desarrollan a los cuarenta',
                  zh: '的人在四十岁前出现该症状' },
                { n: '×2',
                  ru: 'во столько вырастет потеря зрения в США к 2030',
                  en: 'vision loss in the US will double by 2030',
                  es: 'se duplicará la pérdida de visión en EE. UU. para 2030',
                  zh: '到 2030 年美国视力损失将翻倍' },
              ].map((к) => (
                <div key={к.n} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                  <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{к.n}</div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-snug">
                    {locale === 'ru' ? к.ru : locale === 'es' ? к.es : locale === 'zh' ? к.zh : к.en}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {locale === 'ru'
                ? 'Дело не только в зрении. С возрастом хуже слушается рука — труднее попасть в маленькую кнопку. Падает скорость — формы с таймаутом отсекают пожилых первыми. Всё, что мы проверяем — размер целей нажатия, контраст, метки полей, работа с клавиатуры, — первым отказывает не у слепых, а у обычного человека шестидесяти лет.'
                : locale === 'es'
                ? 'No se trata solo de la vista. Con la edad la mano obedece peor: cuesta más acertar en un botón pequeño. La velocidad baja: los formularios con tiempo límite excluyen primero a los mayores. Todo lo que comprobamos —tamaño de los objetivos, contraste, etiquetas, uso del teclado— falla primero no en una persona ciega, sino en una persona común de sesenta años.'
                : locale === 'zh'
                ? '这不仅关乎视力。随着年龄增长，手的控制变差——更难点中小按钮；反应变慢——带超时的表单最先把长者挡在门外。我们检查的一切——点击目标尺寸、对比度、字段标签、键盘操作——最先失效的并非盲人，而是一位普通的六十岁老人。'
                : 'It is not only about eyesight. With age the hand obeys less well — a small button becomes hard to hit. Reaction slows — forms with timeouts shut older people out first. Everything we test — target size, contrast, field labels, keyboard operation — fails first not for a blind person, but for an ordinary sixty-year-old.'}
            </p>

            {/* Забота о себе и своей семье — по слову Архитектора 30.08.2026.
                Переворачивает рамку: доступность перестаёт быть расходом на
                чужих людей и становится тем, что человек делает для себя. */}
            <div className="mt-8 rounded-xl border-l-4 border-cyan-500 bg-cyan-50/60 dark:bg-cyan-500/5 px-6 py-5">
              <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                {locale === 'ru'
                  ? 'Приводя свой сайт в порядок и делая его доступным для всех, вы помогаете не только своим клиентам, бизнесу и посетителям сайта — вы заботитесь о себе и своей семье.'
                  : locale === 'es'
                  ? 'Al poner tu sitio en orden y hacerlo accesible para todos, no solo ayudas a tus clientes, a tu negocio y a quienes te visitan: te estás cuidando a ti mismo y a tu familia.'
                  : locale === 'zh'
                  ? '把自己的网站整理好、让所有人都能使用，你帮助的不只是客户、生意和访客——你也是在照顾你自己和你的家人。'
                  : 'By putting your site in order and making it accessible to everyone, you help more than your customers, your business and your visitors — you are taking care of yourself and your own family.'}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section aria-label="Impact statistics" className="py-12 px-6 border-y border-gray-200 dark:border-white/6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black gradient-text">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <RiskCalculator />

        {/* Pricing */}
        <section aria-labelledby="pricing-heading" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 id="pricing-heading" className="text-3xl md:text-4xl font-black text-center mb-3 text-gray-900 dark:text-white">
              {a.pricingTitle}<span className="gradient-text">{a.pricingHighlight}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-14 max-w-xl mx-auto">{a.pricingSubtitle}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {a.tiers.map((tier, idx) => (
                <div
                  key={tier.name}
                  className={`glass rounded-2xl p-6 border flex flex-col ${
                    TIER_HIGHLIGHTS[idx]
                      ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                      : 'border-gray-200 dark:border-white/8'
                  }`}
                >
                  {TIER_HIGHLIGHTS[idx] && (
                    <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">{a.mostPopular}</div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tier.name}</h3>
                  <div className="text-2xl font-black gradient-text mb-1">{TIER_PRICES[idx]}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tier.timeline}</div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/#contact"
                    className="keep-dark btn-neon w-full py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-semibold text-sm text-white text-center block"
                  >
                    {a.getStarted}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Call to action" className="py-20 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            {/* ПЕРЕНОС И ОГРАНИЧЕНИЕ ШИРИНЫ ПОДПИСИ. Замер 29.08.2026:
                на 320 и 375 px подпись «Сертифицировано по WCAG 2.1 AA»
                выходила за правый край на 34 px — русский текст длиннее
                английского, под который ряд и был свёрстан. */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
              {[
                { icon: Eye,    label: a.ctaBadge1 },
                { icon: Users,  label: a.ctaBadge2 },
                { icon: Shield, label: a.ctaBadge3 },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1 text-xs text-center max-w-[9rem] text-gray-500 dark:text-gray-400">
                  <badge.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                  {badge.label}
                </div>
              ))}
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">{a.ctaTitle}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{a.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="keep-dark btn-neon px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-bold text-base text-white inline-flex items-center justify-center gap-2"
              >
                {a.ctaBook} <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/accessibility-statement"
                className="px-8 py-4 glass glass-hover rounded-xl font-semibold text-base text-gray-600 dark:text-gray-300 inline-flex items-center justify-center"
              >
                {a.ctaViewStatement}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
