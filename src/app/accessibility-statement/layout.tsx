import { Metadata } from 'next';
import { headers } from 'next/headers';
import { buildAlternates } from '@/lib/seo';

/**
 * ЗАГОЛОВОК И ОПИСАНИЕ — НА ЧЕТЫРЁХ ЯЗЫКАХ.
 *
 * По образцу соседней страницы `/accessibility`: заголовок и описание — это
 * то, что человек видит в выдаче поисковика ДО перехода, и английская строка
 * на русской версии означает, что русскому читателю показали чужой язык.
 *
 * Описание намеренно содержит числа: заявление о доступности, состоящее из
 * обещаний, ничем не отличается от тысячи таких же. Числа отличают.
 */
const МЕТА: Record<string, { title: string; desc: string }> = {
  en: {
    title: 'Accessibility Statement — Our Own Numbers | CODE Eternal',
    desc:
      'We measure other websites and publish the result, so we measure ourselves the same way: 1,207 addresses, 7,924 checks, 59.4 % with zero violations — including what is not yet fixed.',
  },
  ru: {
    title: 'Заявление о доступности — наши собственные числа | CODE Eternal',
    desc:
      'Мы измеряем чужие сайты и публикуем результат, поэтому себя измеряем так же: 1 207 адресов, 7 924 замера, 59,4 % без единого нарушения — вместе с тем, что ещё не исправлено.',
  },
  es: {
    title: 'Declaración de accesibilidad — nuestras cifras | CODE Eternal',
    desc:
      'Medimos otros sitios y publicamos el resultado, así que nos medimos igual: 1 207 direcciones, 7 924 comprobaciones, 59,4 % sin ninguna infracción, incluido lo aún no corregido.',
  },
  zh: {
    title: '无障碍声明——我们自己的数字 | CODE Eternal',
    desc:
      '我们测量他人网站并公开结果，因此也同样衡量自己：1 207 个地址、7 924 次检查、59.4 % 零违规——包括尚未修复的部分。',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const язык = (h.get('x-locale') || 'en').toLowerCase();
  const м = МЕТА[язык] ?? МЕТА.en;
  return {
    title: м.title,
    description: м.desc,
    alternates: await buildAlternates('/accessibility-statement'),
    openGraph: {
      title: м.title,
      description: м.desc,
      type: 'article',
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
