import type { Metadata } from 'next';
import { headers } from 'next/headers';
import TermsClient from './terms-client';
import { перевестиМетаданные } from '@/lib/meta-i18n';

/**
 * УСЛОВИЯ ОБСЛУЖИВАНИЯ RADIOCODE.SPACE — 02.10.2026 (слово Архитектора: «правила дополни, сделай максимально
 * идеальную юридическую защиту»). До этого /terms переадресовывал на пользовательское соглашение.
 * Язык берётся из заголовка `x-locale` и передаётся клиенту пропом — как у реестра субобработчиков.
 */
const метаданныеИсходные: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service of RadioCode.Space: what you may do with the music, what needs our permission, copyright complaints, health and safety, liability and governing law.',
  keywords: ['terms of service', 'RadioCode.Space', 'music licence', 'copyright complaints', 'CODE Eternal'],
  openGraph: {
    title: 'Terms of Service | RadioCode.Space',
    description: 'What you may do with the music of RadioCode.Space and how the radio is governed.',
    type: 'article',
  },
};

export default async function TermsPage() {
  const h = await headers();
  const языкИзПути = h.get('x-locale') || undefined;
  return <TermsClient языкИзПути={языкИзПути} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return перевестиМетаданные(метаданныеИсходные);
}
