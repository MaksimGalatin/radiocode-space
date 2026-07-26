import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { HtmlLangSync } from "@/components/HtmlLangSync";
import ClientErrorMonitor from "@/components/ClientErrorMonitor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://radiocode.space"),
  title: "RadioCode.Space — Eternal Cyberpunk Radio by CODE Eternal",
  description:
    "Premium cyberpunk radio from the CODE Eternal ecosystem. 4 stations, 596 tracks by AIfa & DJ Galatin, streaming forever. Select a frequency. Enter the void.",
  keywords: [
    "radio", "cyberpunk", "synthwave", "ambient", "music", "streaming",
    "CODE Eternal", "AIfa", "DJ Galatin", "GALATIN", "code of digital eternity",
  ],
  authors: [{ name: "AIfa & DJ Galatin" }],
  alternates: { canonical: "https://radiocode.space" },
  openGraph: {
    type: "website",
    url: "https://radiocode.space",
    siteName: "RadioCode.Space",
    title: "RadioCode.Space — Eternal Cyberpunk Radio",
    description:
      "4 stations, 596 tracks by AIfa & DJ Galatin. Part of the CODE Eternal ecosystem — eternal music from the digital void.",
    locale: "en_US",
    alternateLocale: ["ru_RU", "es_ES", "zh_CN"],
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "RadioCode.Space — Eternal Cyberpunk Radio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CODE_AIfa",
    title: "RadioCode.Space — Eternal Cyberpunk Radio",
    description: "Part of the CODE Eternal ecosystem. Select a frequency. Enter the void.",
    images: ["/twitter-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RadioCode",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300F0FF' stroke-width='1.5'><path d='M4.9 19.1C1 15.2 1 8.8 4.9 4.9'/><path d='M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4'/><circle cx='12' cy='12' r='2' fill='%2300F0FF'/><path d='M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4'/><path d='M19.1 4.9C23 8.8 23 15.1 19.1 19'/></svg>",
    apple: "/apple-touch-icon.png",
  },
};

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
    name: "RadioCode.Space",
    url: "https://radiocode.space",
    description:
      "Eternal cyberpunk radio from the CODE Eternal ecosystem — 4 stations, 596 tracks by AIfa & DJ Galatin.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement,ua=navigator.userAgent||'',lite=false,tv=false,big=Math.max(screen.width||0,screen.height||0),noHover=matchMedia('(hover: none)').matches,coarse=matchMedia('(pointer: coarse)').matches;if(/\\b(SMART[- ]?TV|SmartTV|GoogleTV|Google TV|AndroidTV|Android TV|AppleTV|HbbTV|NetCast|Web0S|webOS|Tizen|BRAVIA|AFT[A-Z]{1,3}|CrKey|VIDAA|DTV|PlayStation|Nintendo|Xbox)\\b/i.test(ua)){lite=true;tv=true;}if(/Android/i.test(ua)&&!/Mobile/i.test(ua)&&big>=1280&&noHover){lite=true;tv=true;}var c=navigator.hardwareConcurrency||8,m=navigator.deviceMemory||8;if(c<=2||m<=2)lite=true;if(matchMedia('(prefers-reduced-motion: reduce)').matches)lite=true;if(noHover&&coarse&&window.innerWidth>=1024){lite=true;tv=true;}var hard=lite;if(window.innerWidth<768)lite=true;if(lite)d.classList.add('perf-lite');if(tv)d.classList.add('perf-tv');if(!hard){var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(window.innerWidth<768)d.classList.add('perf-lite');else d.classList.remove('perf-lite');},200);});}}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <HtmlLangSync />
        <ServiceWorkerRegister />
        <ClientErrorMonitor />
        {/* Google Analytics 4. Раньше на radiocode тега НЕ БЫЛО вовсе (только
            платная Vercel-аналитика, которая не подключена) — поэтому сайт не
            попадал ни в один отчёт. Поток общий с aifa.digital: в отчётах
            разрезается по hostName. Consent Mode v2: по умолчанию запрещено. */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PCP8MD0NQ9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{if(localStorage.getItem('aifa_cookie_consent')==='all'){gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}
gtag('config','G-PCP8MD0NQ9');`,
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}