import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassador Program — RADIOCODE",
  description:
    "Become a CODE Eternal Ambassador — an honest partnership where you spread real products and earn a commission on real sales. Free entry, no spam, no fake jobs.",
  alternates: { canonical: "https://radiocode.space/ambassador" },
};

export default function AmbassadorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
