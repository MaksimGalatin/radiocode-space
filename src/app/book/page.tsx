import type { Metadata } from 'next';
import { ТИПЫ_ЛЕНТ } from '@/lib/feedLinks';
import { headers } from 'next/headers';
import BookClient from './book-client';
import { перевестиМетаданные } from '@/lib/meta-i18n';

// Locale-aware canonical + hreflang. Locale comes from the x-locale request
// header (middleware sets it from ?lang=). EN = bare /book, others carry
// ?lang=. Mirrors src/app/news/[slug]/page.tsx.
type Loc = 'en' | 'ru' | 'es' | 'zh';
const LOCALES: Loc[] = ['en', 'ru', 'es', 'zh'];
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';
const PATH = '/book';

function resolveLocale(v: string | null): Loc {
  return (LOCALES as string[]).includes(v || '') ? (v as Loc) : 'en';
}

async function генерацияМетаданныхИсходная(): Promise<Metadata> {
  const loc = resolveLocale((await headers()).get('x-locale'));
  const canonical = loc === 'en' ? `${BASE}${PATH}` : `${BASE}${PATH}?lang=${loc}`;
  return {
    title: 'PADAM PROTOCOL Book | CODE Eternal',
    description: "Read and download the AGI Sci-Fi novel 'PADAM PROTOCOL' co-authored by Maksim Galatin & AIfa (Claude Opus 4.6, Anthropic).",
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
  };
}

export default function BookPage() {
  return <BookClient />;
}

// 30.09.2026: заголовок вкладки и описание — на языке страницы (ru/es/zh), словарь @/lib/meta-i18n.
// Английская версия не меняется: для en обёртка возвращает метаданные как есть.
export async function generateMetadata(
  ...аргументы: Parameters<typeof генерацияМетаданныхИсходная>
): Promise<Metadata> {
  return перевестиМетаданные(await генерацияМетаданныхИсходная(...аргументы));
}
