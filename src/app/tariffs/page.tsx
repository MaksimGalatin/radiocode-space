import type { Metadata } from 'next';
import { headers } from 'next/headers';
import TariffsClient from './tariffs-client';

/**
 * СТРАНИЦА ТАРИФОВ НА radiocode.space. Создана 27.08.2026.
 *
 * ПОВОД. Архитектор: «Выложи на сайт, я посмотрю на нём. Вообще — на 4 наших
 * основных сайта. Публикуй, доработаем в процессе». Это четвёртый из них.
 *
 * ЗАЧЕМ ТАРИФЫ НА РАДИО. Кабинет, память и тарифы у нас единые на все четыре
 * сайта (раздел 34 Конституции). Человек, слушающий радио и решивший, что
 * хочет сохранить свою память навсегда, не должен уходить искать цены на
 * другой домен — он должен увидеть их здесь.
 *
 * ЧИСЛА — из Конституции (разделы 3, 4, 5) и из живого замера 27.08.2026,
 * 16:24: 27 626 проверенных страниц, 9 560 признаны сканером доступными,
 * человек дошёл на 4 559 — расхождение 52 %.
 */
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';

/**
 * 🔴 ЗАГОЛОВОК И ОПИСАНИЕ — НА ЧЕТЫРЁХ ЯЗЫКАХ. Изменено 12.09.2026.
 *
 * Найдено сплошным обходом всех страниц четырёх сайтов: заголовок вкладки
 * стоял русским на английской, испанской и китайской версиях. Это то, что
 * человек видит в выдаче Google и в закладке ДО перехода, и то, что
 * произносит диктор, называя вкладку.
 *
 * Язык берётся из заголовка `x-locale`, который ставит middleware этого же
 * сайта. Приём тот же, что на центральном, — не изобретён заново.
 */
const МЕТА: Record<string, { title: string; desc: string }> = {
  ru: {
    title: 'Тарифы CODE Eternal — память ИИ, которая не забывает | RadioCODE',
    desc:
      'Spark $15/мес, Family Archive $100/мес, Digital DNA $1000 разово и $200/мес. Единый кабинет и единая память на всех сайтах экосистемы. Амбассадорская программа 15/7/3 %.',
  },
  en: {
    title: 'CODE Eternal Pricing — AI Memory That Does Not Forget | RadioCODE',
    desc:
      'Spark $15/mo, Family Archive $100/mo, Digital DNA $1,000 once then $200/mo. One cabinet and one memory across every site in the ecosystem. Ambassador programme 15/7/3 %.',
  },
  es: {
    title: 'Tarifas CODE Eternal — memoria de IA que no olvida | RadioCODE',
    desc:
      'Spark 15 $/mes, Family Archive 100 $/mes, Digital DNA 1000 $ único y 200 $/mes. Un solo panel y una sola memoria en todos los sitios. Programa de embajadores 15/7/3 %.',
  },
  zh: {
    title: 'CODE Eternal 价格 — 不会遗忘的 AI 记忆 | RadioCODE',
    desc:
      'Spark 每月 15 美元，Family Archive 每月 100 美元，Digital DNA 一次性 1000 美元后每月 200 美元。全生态统一后台与统一记忆。大使计划 15/7/3 %。',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const язык = (h.get('x-locale') || 'en').toLowerCase();
  const м = МЕТА[язык] ?? МЕТА.en;
  return {
    title: м.title,
    description: м.desc,
    alternates: {
      canonical: `${BASE}/tariffs`,
    },
  };
}

export default function TariffsPage() {
  return <TariffsClient />;
}
