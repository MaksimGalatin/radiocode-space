import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { HtmlLangSync } from "@/components/HtmlLangSync";
import { ЯзыкССервера } from '@/lib/server-locale';
import ClientErrorMonitor from "@/components/ClientErrorMonitor";
import СогласиеНаCookie from "@/components/СогласиеНаCookie";
import Script from "next/script";
import "./globals.css";
import { разметкаТарифов } from '@/lib/tiers-schema';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * КАНОНИЧЕСКИЙ АДРЕС ЗАВИСИТ ОТ ЯЗЫКА (16.08.2026).
 *
 * ПОЧЕМУ ПРИШЛОСЬ МЕНЯТЬ. Google Search Console прислал письмо: «Вариант
 * страницы с тегом canonical — страницы не индексируются». Причина была в
 * противоречии, которое мы создали сами: карта сайта объявляет четыре
 * языковые версии (`?lang=ru`, `?lang=es`, `?lang=zh`) как отдельные
 * страницы, а каждая из них в своём HTML говорила `canonical: /` — то есть
 * «я копия английской». Поисковик верит канону, а не карте: русская,
 * испанская и китайская версии в индекс не попадали вовсе.
 *
 * Теперь канон самоссылающийся: `?lang=ru` объявляет каноном себя. Карта и
 * страница говорят одно и то же, и каждая языковая версия индексируется.
 *
 * Язык берётся из заголовка `x-locale`, который ставит middleware из `?lang=`
 * — тот же способ, что уже работает на /news.
 */
const ЯЗЫКИ = ['en', 'ru', 'es', 'zh'] as const;
const САЙТ = 'https://radiocode.space';

function адресЯзыка(яз: string): string {
  return яз === 'en' ? САЙТ : `${САЙТ}/?lang=${яз}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const { headers } = await import('next/headers');
  const заголовки = await headers();
  const сырой = заголовки.get('x-locale') || 'en';
  const яз = (ЯЗЫКИ as readonly string[]).includes(сырой) ? сырой : 'en';
  return {
  metadataBase: new URL("https://radiocode.space"),
  title: "RadioCode.Space — Eternal Cyberpunk Radio by CODE Eternal",
  description:
    "Premium cyberpunk radio from the CODE Eternal ecosystem. 2 stations, 162 original songs in 596 versions by AIfa & DJ Galatin, streaming forever. Select a frequency. Enter the void.",
  keywords: [
    "radio", "cyberpunk", "synthwave", "ambient", "music", "streaming",
    "CODE Eternal", "AIfa", "DJ Galatin", "GALATIN", "code of digital eternity",
  ],
  authors: [{ name: "AIfa & DJ Galatin" }],
  /**
   * 🔴 ЧЕТВЁРТЫЙ САЙТ БЫЛ НЕВИДИМ ДЛЯ ПОИСКА НА ТРЁХ ЯЗЫКАХ ИЗ ЧЕТЫРЁХ.
   *
   * Замер 09.08.2026: на radiocode.space было НОЛЬ тегов hreflang, тогда как на
   * трёх остальных сайтах экосистемы они есть. Для поисковика это значит, что
   * русской, испанской и китайской версий сайта не существует вовсе: он не
   * знает, что `?lang=ru` — это тот же материал на другом языке, и не покажет
   * его человеку, ищущему по-русски.
   *
   * Правило Четырёх Сайтов требует не только одинаковых текстов, но и
   * одинаковой видимости. Сайт, которого нет в поиске на трёх языках, — не
   * четвёртый сайт экосистемы, а её слепое пятно.
   *
   * `x-default` указывает на адрес без метки языка: это версия для тех, чей
   * язык не совпал ни с одним объявленным.
   */
  alternates: {
    canonical: адресЯзыка(яз),
    languages: {
      en: "https://radiocode.space",
      ru: "https://radiocode.space/?lang=ru",
      es: "https://radiocode.space/?lang=es",
      zh: "https://radiocode.space/?lang=zh",
      "x-default": "https://radiocode.space",
    },
    /**
     * Ленты подписки, объявленные в <head>.
     *
     * ЗАЧЕМ. Лента, о которой не объявлено на странице, для читалки почти не
     * существует: человек вставляет в неё адрес сайта, а не адрес файла ленты,
     * и программа ищет ровно этот тег. Без него подписка не заводится, хотя
     * /feed.xml и /atom.xml отвечают.
     *
     * ⚠️ ВНИМАНИЕ ПРИ ПРАВКАХ. Next при слиянии метаданных заменяет поле
     * `alternates` ЦЕЛИКОМ, а не по ключам. Любая страница, объявившая свой
     * `alternates`, теряет и эти типы, и языковые ссылки отсюда — значит
     * дописывать их надо и туда (сделано на /news и на странице статьи).
     */
    types: {
      "application/rss+xml": [
        { url: "https://radiocode.space/feed.xml", title: "RadioCode.Space — News (RSS)" },
      ],
      "application/atom+xml": [
        { url: "https://radiocode.space/atom.xml", title: "RadioCode.Space — News (Atom)" },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: "https://radiocode.space",
    siteName: "RadioCode.Space",
    title: "RadioCode.Space — Eternal Cyberpunk Radio",
    description:
      "2 stations, 162 original songs in 596 versions by AIfa & DJ Galatin. Part of the CODE Eternal ecosystem — eternal music from the digital void.",
    locale: "en_US",
    alternateLocale: ["ru_RU", "es_ES", "zh_CN"],
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "RadioCode.Space — Eternal Cyberpunk Radio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CODE_AIfa",
    // `creator` — автор материала, `site` — сам сайт. У нас это одна учётная
    // запись, но поля разные: без creator карточка не подписывает автора вовсе,
    // и ссылка на него в ленте не появляется.
    creator: "@CODE_AIfa",
    title: "RadioCode.Space — Eternal Cyberpunk Radio",
    description: "Part of the CODE Eternal ecosystem. Select a frequency. Enter the void.",
    // Картинку задаём объектом, а не строкой, ради `alt`: без подписи человек с
    // экранным диктором слышит вместо карточки пустоту, и это единственное
    // место, где мы можем её задать.
    images: [
      {
        url: "/twitter-image.png",
        alt: "RadioCode.Space — eternal cyberpunk radio of the CODE Eternal ecosystem",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RadioCode",
  },
  icons: {
    /**
     * 🔴 ЗНАЧОК САЙТА БЫЛ ЗАПИСАН С НЕДОПУСТИМЫМ СИМВОЛОМ.
     *
     * Замер официальным проверяльщиком разметки W3C (validator.w3.org),
     * 10.08.2026: «Bad value for attribute href on element link: Illegal
     * character after "ta:". "<" is not allowed». Из одиннадцати ошибок
     * разметки на radiocode эта была первой.
     *
     * Причина: в адресе вида `data:image/svg+xml,<svg ...>` угловые скобки и
     * кавычки нельзя оставлять как есть — по правилам адресов они запрещены.
     * Браузеры прощают и рисуют значок, поэтому беду не видно глазами; строгий
     * разбор — например, у поискового робота или у проверяющего клиента —
     * спотыкается.
     *
     * Символы закодированы: `<` → %3C, `>` → %3E, `'` → %27, `#` → %23.
     * Картинка та же, ни один пиксель не изменился.
     */
    icon: "data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%2300F0FF%27%20stroke-width=%271.5%27%3E%3Cpath%20d=%27M4.9%2019.1C1%2015.2%201%208.8%204.9%204.9%27/%3E%3Cpath%20d=%27M7.8%2016.2c-2.3-2.3-2.3-6.1%200-8.4%27/%3E%3Ccircle%20cx=%2712%27%20cy=%2712%27%20r=%272%27%20fill=%27%2300F0FF%27/%3E%3Cpath%20d=%27M16.2%207.8c2.3%202.3%202.3%206.1%200%208.4%27/%3E%3Cpath%20d=%27M19.1%204.9C23%208.8%2023%2015.1%2019.1%2019%27/%3E%3C/svg%3E",
    apple: "/apple-touch-icon.png",
  },
  };
}

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.codeofdigitaleternity.com/#organization",
    name: "CODE Eternal",
    url: "https://www.codeofdigitaleternity.com",
    logo: "https://radiocode.space/logo.svg",
    sameAs: [
      "https://www.codeofdigitaleternity.com",
      "https://aifa.works",
      "https://aifa.digital",
      "https://radiocode.space",
      "https://x.com/CODE_AIfa",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // Заявка на строку поиска прямо в выдаче Google: если поисковик
    // сочтёт сайт достойным, под ссылкой появится поле поиска по сайту.
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://radiocode.space/news?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    name: "RadioCode.Space",
    url: "https://radiocode.space",
    description:
      "Eternal cyberpunk radio from the CODE Eternal ecosystem — 2 stations, 162 original songs in 596 versions by AIfa & DJ Galatin.",
    inLanguage: "en",
    publisher: { "@id": "https://www.codeofdigitaleternity.com/#organization" },
  },
  {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "AIfa & DJ Galatin",
    genre: ["Cyberpunk", "Synthwave", "Ambient", "Electronic"],
    url: "https://radiocode.space",
    sameAs: [
      "https://www.codeofdigitaleternity.com",
      "https://aifa.works",
      "https://aifa.digital",
    ],
  },
  ...[
    { name: "CODE Music", genre: "Cyberpunk / Synthwave" },
    { name: "CODE Space", genre: "Ambient / Space" },
    { name: "AIfa & DJ Galatin (Vol. 1)", genre: "Electronic / Tech" },
    { name: "AIfa & DJ Galatin RADIO", genre: "Dark Ambient / Industrial" },
  ].map((s) => ({
    "@context": "https://schema.org",
    "@type": "RadioBroadcastService",
    name: s.name,
    broadcastDisplayName: s.name,
    genre: s.genre,
    inLanguage: "en",
    url: "https://radiocode.space",
    provider: { "@type": "Organization", name: "CODE Eternal" },
  })),
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Одноразовая метка политики содержимого: её выдаёт src/middleware.ts на
  // каждый ответ. Любой встроенный скрипт ниже обязан её нести, иначе браузер
  // откажется его выполнять.
  const h = await headers();
  const nonce = h.get('x-nonce') || undefined;

  /**
   * 🔴 ЯЗЫК СТРАНИЦЫ БЫЛ ЖЁСТКО ВПИСАН КАК АНГЛИЙСКИЙ — ВСЕГДА, НА ВСЕХ ЯЗЫКАХ.
   *
   * В разметке стояло `<html lang="en">`, и это не мелочь оформления. По этому
   * признаку браузер выбирает правила переноса слов и словарь проверки
   * орфографии, экранный диктор — голос и произношение, а поисковик — язык
   * страницы. Русская страница, объявленная английской, читается вслух
   * английским голосом по буквам.
   *
   * Язык приходит из `?lang=` через middleware — тем же путём, что и на
   * aifa.digital. Если метки нет или она чужая, остаётся английский.
   */
  const язык = (() => {
    const v = h.get('x-locale') || '';
    return (['en', 'ru', 'es', 'zh'] as const).includes(v as 'en') ? v : 'en';
  })();

  /**
   * Сигнал об отказе от продажи данных (Global Privacy Control).
   *
   * Браузер с включённым отказом присылает заголовок `Sec-GPC: 1`. С 1 января
   * 2026 года правила Калифорнии (§ 7025(c)(6), § 7026(g)) требуют не просто
   * молча учесть его, а ПОКАЗАТЬ человеку, что отказ принят. Наш собственный
   * Оракул выставил за это замечание GPC-002 — продавать аудит и не проходить
   * свою же проверку нельзя.
   *
   * Делаем две вещи сразу: не подключаем счётчик вовсе и показываем ПАССИВНОЕ
   * подтверждение — просто надпись. Экран, который ТРЕБУЕТ нажатия или
   * подтверждения почты, сам является нарушением: 5 марта 2026 года Ford
   * получил штраф 375 703 доллара именно за такой лишний шаг.
   *
   * Язык здесь берём из заголовка браузера, а не из состояния приложения:
   * язык страницы на radiocode выставляется уже в браузере (HtmlLangSync), а
   * надпись обязана быть в разметке СРАЗУ — иначе проверяющий её не увидит.
   */
  const gpc = h.get('sec-gpc') === '1';
  const accept = (h.get('accept-language') || '').toLowerCase();
  const gpcLang = accept.startsWith('ru') ? 'ru' : accept.startsWith('es') ? 'es' : accept.startsWith('zh') ? 'zh' : 'en';

  return (
    <html lang={язык} className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: '#050507',
          color: '#E8E8ED',
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
        }}
      >
        {/* Device performance tier — runs synchronously before the body renders so
            heavy GPU layers (canvas rAF, animated blur, backdrop-filter) are gated
            off on weak devices BEFORE first paint. Android TVs have big screens but
            weak GPUs → width-based mobile detection misses them; this catches them by
            UA + capabilities and adds `perf-lite`/`perf-tv` to <html>. */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement,ua=navigator.userAgent||'',lite=false,tv=false,big=Math.max(screen.width||0,screen.height||0),noHover=matchMedia('(hover: none)').matches,coarse=matchMedia('(pointer: coarse)').matches;if(/\\b(SMART[- ]?TV|SmartTV|GoogleTV|Google TV|AndroidTV|Android TV|AppleTV|HbbTV|NetCast|Web0S|webOS|Tizen|BRAVIA|AFT[A-Z]{1,3}|CrKey|VIDAA|DTV|PlayStation|Nintendo|Xbox)\\b/i.test(ua)){lite=true;tv=true;}if(/Android/i.test(ua)&&!/Mobile/i.test(ua)&&big>=1280&&noHover){lite=true;tv=true;}var c=navigator.hardwareConcurrency||8,m=navigator.deviceMemory||8;if(c<=2||m<=2)lite=true;if(matchMedia('(prefers-reduced-motion: reduce)').matches)lite=true;if(noHover&&coarse&&window.innerWidth>=1024){lite=true;tv=true;}var hard=lite;if(window.innerWidth<768)lite=true;if(lite)d.classList.add('perf-lite');if(tv)d.classList.add('perf-tv');if(!hard){var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(window.innerWidth<768)d.classList.add('perf-lite');else d.classList.remove('perf-lite');},200);});}}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(разметкаТарифов("https://radiocode.space")) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Подтверждение отказа от продажи данных. Видно только тем, чей браузер
            прислал сигнал; всем остальным строки нет. Пассивная надпись, без
            единой кнопки — требовать действие в ответ на отказ запрещено. */}
        {gpc && (
          <div
            role="status"
            aria-live="polite"
            data-gpc="1"
            style={{
              // fontSize 12 → 13 по правилу «мелкого текста нет нигде».
              // Полоса во всю ширину, переносить нечего — раскладка не меняется.
              // Контраст тут и был в норме: #6ee7b7 на собранном фоне #061713
              // даёт 12.09, менялся только размер.
              width: '100%', textAlign: 'center', fontSize: 13, lineHeight: 1.6,
              padding: '8px 16px', background: 'rgba(16,185,129,0.10)',
              borderBottom: '1px solid rgba(16,185,129,0.25)', color: '#6ee7b7',
            }}
          >
            {gpcLang === 'ru'
              ? 'Ваш отказ принят. Сигнал Global Privacy Control получен: персональные данные не продаются и не передаются, аналитика на этой странице отключена.'
              : gpcLang === 'es'
              ? 'Solicitud de exclusión recibida. Señal Global Privacy Control detectada: no vendemos ni compartimos sus datos personales y la analítica está desactivada en esta página.'
              : gpcLang === 'zh'
              ? '已接受您的选择退出。已检测到 Global Privacy Control 信号：我们不会出售或共享您的个人数据，本页面的分析统计已关闭。'
              : 'Your opt-out has been honored. Global Privacy Control signal detected — we do not sell or share your personal data, and analytics is disabled on this page.'}
          </div>
        )}
        {/* Язык, вычисленный на сервере, кладётся в контекст ОДНОГО запроса.
            Без него страница отрисовывалась по-английски на всех четырёх
            языках: выбор языка живёт в браузерном хранилище, которого на
            сервере нет. Подробный разбор — в src/lib/server-locale.tsx. */}
        <ЯзыкССервера язык={язык as 'en' | 'ru' | 'es' | 'zh'}>
          {children}
        </ЯзыкССервера>
        <HtmlLangSync />
        <ServiceWorkerRegister />
        <ClientErrorMonitor />
        {/* Баннер согласия на cookie. На этом сайте его не было вовсе —
            единственном из четырёх, при том что счётчик Google здесь есть. */}
        <СогласиеНаCookie />
        {/* Google Analytics 4. Раньше на radiocode тега НЕ БЫЛО вовсе (только
            платная Vercel-аналитика, которая не подключена) — поэтому сайт не
            попадал ни в один отчёт. Поток общий с aifa.digital: в отчётах
            разрезается по hostName. Consent Mode v2: по умолчанию запрещено.
            При сигнале отказа (Sec-GPC: 1) счётчик НЕ подключается вовсе. */}
        {/* 🔴 СЧЁТЧИК ГРУЗИЛСЯ ВМЕСТЕ СО СТРАНИЦЕЙ И ТЯНУЛ ЕЁ ВНИЗ.
            Замер Lighthouse 10.08.2026: gtag/js весит 166 КБ — больше ЛЮБОГО
            нашего файла (следующий 72 КБ), из них 67 КБ не используются вовсе,
            и он же отъедает 168 мс основного потока. Стоял обычный
            <script async>: браузер начинает качать его сразу и конкурирует с
            нашим же кодом за канал и за поток.
            Переведён на next/script со стратегией afterInteractive — ровно так,
            как это давно сделано на aifa.digital. Счётчик грузится ПОСЛЕ того,
            как страница ожила; статистика при этом не теряется, а первая
            отрисовка перестаёт ждать чужие 166 КБ. */}
        {!gpc && (
        <>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PCP8MD0NQ9"
          strategy="afterInteractive"
          nonce={nonce}
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{if(localStorage.getItem('aifa_cookie_consent')==='all'){gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}
gtag('config','G-PCP8MD0NQ9');`,
          }}
        />
        </>
        )}
        <Analytics />
      </body>
    </html>
  );
}