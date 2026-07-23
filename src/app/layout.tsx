import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { HtmlLangSync } from "@/components/HtmlLangSync";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <HtmlLangSync />
        <ServiceWorkerRegister />
        <Analytics />
      </body>
    </html>
  );
}