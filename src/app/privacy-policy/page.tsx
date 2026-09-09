import type { Metadata } from 'next';
import { ТИПЫ_ЛЕНТ } from '@/lib/feedLinks';
import { headers } from 'next/headers';
import PrivacyPolicyClient from './privacy-client';

// Locale-aware canonical + hreflang. Locale comes from the x-locale request
// header (middleware sets it from ?lang=). EN = bare /privacy-policy, others
// carry ?lang=. Mirrors src/app/news/[slug]/page.tsx. openGraph preserved.
type Loc = 'en' | 'ru' | 'es' | 'zh';
const LOCALES: Loc[] = ['en', 'ru', 'es', 'zh'];
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';
const PATH = '/privacy-policy';

function resolveLocale(v: string | null): Loc {
  return (LOCALES as string[]).includes(v || '') ? (v as Loc) : 'en';
}

export async function generateMetadata(): Promise<Metadata> {
  const loc = resolveLocale((await headers()).get('x-locale'));
  const canonical = loc === 'en' ? `${BASE}${PATH}` : `${BASE}${PATH}?lang=${loc}`;
  return {
    title: 'Privacy Policy | CODE - Code Of Digital Eternity',
    description: 'Read how we collect, protect, and use your data in accordance with GDPR, CCPA, and privacy laws.',
    alternates: {
      canonical,
      languages: {
        en: `${BASE}${PATH}`,
        ru: `${BASE}${PATH}?lang=ru`,
        es: `${BASE}${PATH}?lang=es`,
        zh: `${BASE}${PATH}?lang=zh`,
        'x-default': `${BASE}${PATH}`,
      },
      // Ленты подписки. Свой блок alternates затирает корневой ЦЕЛИКОМ,
      // поэтому набор дописан и сюда — иначе на этой странице читалка
      // ленту не найдёт, и внешне это никак не проявится.
      types: ТИПЫ_ЛЕНТ,
    },
    openGraph: {
      title: 'Privacy Policy | CODE - Code Of Digital Eternity',
      description: 'Read how we collect, protect, and use your data in accordance with GDPR, CCPA, and privacy laws.',
      url: 'https://radiocode.space/privacy-policy',
      siteName: 'CODE Eternal',
      type: 'website',
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
