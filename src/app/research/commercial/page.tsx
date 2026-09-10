import type { Metadata } from 'next';
import { headers } from 'next/headers';
import CommercialClient from './commercial-client';

/**
 * КОММЕРЧЕСКИЕ САЙТЫ США — СЕРВЕРНАЯ ОБЁРТКА.
 *
 * Та же страница на всех четырёх сайтах по правилу четырёх сайтов: человек,
 * пришедший на любой из них, видит одно и то же исследование.
 *
 * Язык берётся из заголовка `x-locale`, который выставляет middleware,
 * отрезая первый сегмент пути, и передаётся клиенту пропом. Без пропа
 * `/es/research/commercial` и `/zh/research/commercial` отдавали бы
 * английский текст при верном атрибуте `<html lang>` — расхождение,
 * незаметное снаружи; ровно это нашлось 05.09.2026 на странице данных.
 *
 * Метаданные остаются на сервере: поисковому роботу отдаётся одно описание,
 * не зависящее от выбора человека. В описании НЕ утверждается «столько-то
 * процентов сайтов недоступны»: доли здесь считаются от строк журнала, и
 * подмена знаменателя в описании была бы враньём в самом заметном месте.
 */
export const metadata: Metadata = {
  title: 'US Commercial Websites: Automated Accessibility Check — Open Research',
  description:
    'An axe-core check of US commercial websites: shops, cafés, clinics, banks. 149,704 log records across 147,798 organisations, 809,179 rule violations, screenshots kept as evidence. Not the same instrument as the keyboard traversal — the two sets of numbers do not add up.',
  keywords: [
    'accessibility research',
    'axe-core',
    'commercial websites',
    'WCAG 2.2',
    'ADA compliance',
    'open dataset',
  ],
  openGraph: {
    title: 'US Commercial Websites: Automated Accessibility Check',
    description:
      '149,704 records, 147,798 organisations, 809,179 violations found by axe-core. Method, denominators and limitations stated in full.',
    type: 'article',
  },
};

export default async function ResearchCommercialPage() {
  const h = await headers();
  const языкИзПути = h.get('x-locale') || undefined;
  return <CommercialClient языкИзПути={языкИзПути} />;
}
