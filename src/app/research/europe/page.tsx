import type { Metadata } from 'next';
import { headers } from 'next/headers';
import EuropeClient from './europe-client';

/**
 * ЕВРОПЕЙСКИЙ ОБХОД — СЕРВЕРНАЯ ОБЁРТКА.
 *
 * Та же страница, что на `aifa.works/research/europe`, по правилу четырёх
 * сайтов: человек, пришедший сюда, видит то же исследование.
 *
 * Язык берётся из заголовка `x-locale`, который выставляет middleware,
 * отрезая первый сегмент пути, и передаётся клиенту пропом. Это не
 * перестраховка: на этом сайте клиентский контекст языка стартует с
 * английского, и без пропа `/es/research/europe` и `/zh/research/europe`
 * отдавали бы английский текст при верном атрибуте `<html lang>` — ровно то,
 * что нашлось 05.09.2026 на соседней странице данных и было незаметно
 * снаружи.
 *
 * Метаданные остаются на сервере: поисковому роботу отдаётся одно описание,
 * не зависящее от выбора человека.
 */
export const metadata: Metadata = {
  title: 'Europe: Municipal Website Accessibility in Germany and Spain — Open Research',
  description:
    '20,833 keyboard traversals across 9,745 municipal domains in Germany and Spain. 10.0 % reachable by keyboard against 25.4 % in the U.S., both from the same denominator. Method, limitations and the dataset we withdrew.',
  keywords: [
    'accessibility research europe',
    'municipal websites germany',
    'municipal websites spain',
    'keyboard accessibility',
    'WCAG 2.1 AA',
    'EN 301 549',
  ],
  openGraph: {
    title: 'Europe: Municipal Website Accessibility in Germany and Spain',
    description:
      '20,833 keyboard traversals across 9,745 municipal domains. 10.0 % reachable by keyboard against 25.4 % in the U.S.',
    type: 'article',
  },
};

export default async function ResearchEuropePage() {
  const h = await headers();
  const языкИзПути = h.get('x-locale') || undefined;
  return <EuropeClient языкИзПути={языкИзПути} />;
}
