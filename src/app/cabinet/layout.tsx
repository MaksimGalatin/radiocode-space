import type { Metadata } from "next";

// Приватная зона: закрыта от индексации явным noindex (robots.txt только запрещает обход).
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
