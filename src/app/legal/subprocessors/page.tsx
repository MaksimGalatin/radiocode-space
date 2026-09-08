import type { Metadata } from 'next';
import { headers } from 'next/headers';
import SubprocessorsClient from './subprocessors-client';

/**
 * РЕЕСТР СУБОБРАБОТЧИКОВ — та же страница, что на `aifa.works`.
 *
 * По правилу четырёх сайтов список поставщиков один на всю экосистему: база,
 * модели, приём оплаты и хранилище общие, значит и раскрытие должно быть
 * одинаковым. Человек, пришедший сюда, не должен идти за ним на другой домен.
 *
 * Язык берётся из заголовка `x-locale` и передаётся клиенту пропом: на этом
 * сайте клиентский контекст стартует с английского, и без пропа испанская и
 * китайская версии отдавали бы английский текст при верном `<html lang>`.
 */
export const metadata: Metadata = {
  title: 'Sub-processor Register',
  description:
    'The complete list of providers we engage to deliver our services: what each one does, where it processes data and what it can see. Required by GDPR Article 28.',
  keywords: [
    'subprocessors',
    'sub-processor register',
    'GDPR Article 28',
    'data processing agreement',
    'data protection',
  ],
  openGraph: {
    title: 'Sub-processor Register | CODE Eternal',
    description:
      'Every provider we engage, what it does, where it processes data and what it can see.',
    type: 'article',
  },
};

export default async function SubprocessorsPage() {
  const h = await headers();
  const языкИзПути = h.get('x-locale') || undefined;
  return <SubprocessorsClient языкИзПути={языкИзПути} />;
}
