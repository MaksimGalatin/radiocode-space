import type { Metadata } from 'next';
import { headers } from 'next/headers';
import CommercialClient from './commercial-client';
import { Ч } from './данные';

/**
 * Разделитель разрядов для метаданных. Своя функция, а не `toLocaleString`:
 * та зависит от сборки ICU в Node и на другой машине может дать неразрывный
 * пробел вместо запятой — описание для робота должно быть одинаковым всегда.
 */
const тыс = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
 * не зависящее от выбора человека.
 *
 * 🔴 ЧИСЛА В ОПИСАНИИ ВЫЧИСЛЯЮТСЯ ИЗ `Ч`, А НЕ ПИШУТСЯ РУКАМИ — оплачено
 * 10.09.2026. В тексте страницы стояло 133 199, а в `description` и
 * `og:description` — 149 704, счёт прошлого прогона: инструмент обновления
 * правит `данные.ts`, а сюда не заглядывал. Снаружи это не видно вовсе —
 * человек читает верное число, а поисковик и карточка ссылки в мессенджере
 * показывают отозванное. Литералов здесь больше нет; разойтись нечему. В описании НЕ утверждается «столько-то
 * процентов сайтов недоступны»: доли здесь считаются от строк журнала, и
 * подмена знаменателя в описании была бы враньём в самом заметном месте.
 */
export const metadata: Metadata = {
  title: 'US Commercial Websites: Automated Accessibility Check — Open Research',
  description:
    `An axe-core check of US commercial websites: shops, cafés, clinics, banks. ${тыс(Ч.строк)} log records across ${тыс(Ч.организаций)} organisations, ${тыс(Ч.нарушений)} rule violations, screenshots kept as evidence. Not the same instrument as the keyboard traversal — the two sets of numbers do not add up.`,
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
      `${тыс(Ч.строк)} records, ${тыс(Ч.организаций)} organisations, ${тыс(Ч.нарушений)} violations found by axe-core. Method, denominators and limitations stated in full.`,
    type: 'article',
  },
};

export default async function ResearchCommercialPage() {
  const h = await headers();
  const языкИзПути = h.get('x-locale') || undefined;
  return <CommercialClient языкИзПути={языкИзПути} />;
}
