import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
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
  title: "RadioCode.Space — Cyberpunk Radio",
  description: "Premium cyberpunk radio experience. Select a frequency. Enter the void.",
  keywords: ["radio", "cyberpunk", "music", "streaming", "code"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300F0FF' stroke-width='1.5'><path d='M4.9 19.1C1 15.2 1 8.8 4.9 4.9'/><path d='M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4'/><circle cx='12' cy='12' r='2' fill='%2300F0FF'/><path d='M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4'/><path d='M19.1 4.9C23 8.8 23 15.1 19.1 19'/></svg>",
  },
};

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
        {children}
      </body>
    </html>
  );
}