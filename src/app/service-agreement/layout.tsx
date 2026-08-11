import { Metadata } from 'next';

// Публичная оферта — один и тот же документ на всех четырёх сайтах экосистемы.
// Отличаются только заголовок вкладки и адрес: этого требует разметка для
// поисковых систем. Сам текст договора обязан совпадать побайтово.
export const metadata: Metadata = {
  title: 'Public Service Agreement (Offer)',
  description:
    'Public offer for professional services: website development, Oracle compliance remediation, AI integration and web design. Master Services Agreement with Statement-of-Work framework, consumer rights, taxes, sanctions and export-control provisions.',
  alternates: { canonical: 'https://radiocode.space/service-agreement' },
  openGraph: {
    title: 'Public Service Agreement (Offer) | RadioCODE',
    description:
      'Master Services Agreement & SOW framework for web, compliance-remediation, AI-integration and design services.',
    url: 'https://radiocode.space/service-agreement',
    siteName: 'RadioCODE',
    type: 'website',
  },
};

export default function ServiceAgreementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
