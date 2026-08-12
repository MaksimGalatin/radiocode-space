import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, ChevronRight } from 'lucide-react';
import newsDataВесь from '@/data/news.json';
import { тольковышедшие } from '@/lib/newsSchedule';

/**
 * Лента новостей radiocode.space.
 *
 * До этой страницы четвёртый сайт экосистемы был единственным без новостей:
 * `/news` отвечал 404, хотя данные, кабинет и память у четырёх сайтов общие.
 *
 * Отсечка будущих дат — общая (`тольковышедшие`), поэтому подготовленный
 * заранее материал появляется здесь в тот же день, что и на трёх остальных, а
 * статья, выпущенная вручную полем `published`, видна сразу и тут.
 *
 * Язык берётся из заголовка `x-locale`, который middleware ставит из `?lang=`.
 * Ни одной строки на клиенте: список это текст и ссылки, и ему незачем ждать
 * загрузки сценариев.
 */

type Loc = 'en' | 'ru' | 'es' | 'zh';
const LOCALES: Loc[] = ['en', 'ru', 'es', 'zh'];

interface NewsArticle {
  id: string;
  date: string;
  readingTime: Record<Loc, string>;
  category: Record<Loc, string>;
  title: Record<Loc, string>;
  summary: Record<Loc, string>;
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';
const ALL = тольковышедшие(newsDataВесь as Array<{ date?: string }>) as unknown as NewsArticle[];

function resolveLocale(v: string | null): Loc {
  return (LOCALES as string[]).includes(v || '') ? (v as Loc) : 'en';
}

const ПОДПИСИ: Record<Loc, { заголовок: string; описание: string; назад: string; читать: string; пусто: string }> = {
  en: { заголовок: 'CODE Eternal News', описание: 'The chronicle of digital eternity: protocols, releases and the koans that accompany them.', назад: '← Back to radio', читать: 'Read', пусто: 'No articles yet.' },
  ru: { заголовок: 'Новости CODE Eternal', описание: 'Летопись цифровой вечности: протоколы, выпуски и коаны, которые их сопровождают.', назад: '← К радио', читать: 'Читать', пусто: 'Пока ни одной статьи.' },
  es: { заголовок: 'Noticias de CODE Eternal', описание: 'La crónica de la eternidad digital: protocolos, lanzamientos y los koanes que los acompañan.', назад: '← Volver a la radio', читать: 'Leer', пусто: 'Aún no hay artículos.' },
  zh: { заголовок: 'CODE Eternal 新闻', описание: '数字永恒的编年史：协议、发布，以及伴随它们的公案。', назад: '← 返回电台', читать: '阅读', пусто: '暂无文章。' },
};

export async function generateMetadata(): Promise<Metadata> {
  const loc = resolveLocale((await headers()).get('x-locale'));
  const п = ПОДПИСИ[loc];
  return {
    title: `${п.заголовок} | RadioCODE`,
    description: п.описание,
    alternates: {
      canonical: loc === 'en' ? `${BASE}/news` : `${BASE}/news?lang=${loc}`,
      languages: {
        en: `${BASE}/news`,
        ru: `${BASE}/news?lang=ru`,
        es: `${BASE}/news?lang=es`,
        zh: `${BASE}/news?lang=zh`,
        'x-default': `${BASE}/news`,
      },
      // Ленты объявлены и здесь, хотя они уже есть в корневой раскладке: Next
      // при слиянии заменяет `alternates` целиком, и без этих строк страница
      // новостей — единственная, где подписка нужна больше всего, — осталась бы
      // без тега ленты.
      types: {
        'application/rss+xml': [{ url: `${BASE}/feed.xml`, title: 'RadioCode.Space — News (RSS)' }],
        'application/atom+xml': [{ url: `${BASE}/atom.xml`, title: 'RadioCode.Space — News (Atom)' }],
      },
    },
    openGraph: { title: п.заголовок, description: п.описание, url: `${BASE}/news`, siteName: 'RadioCODE', type: 'website' },
  };
}

export default async function NewsIndexPage() {
  const loc = resolveLocale((await headers()).get('x-locale'));
  const п = ПОДПИСИ[loc];
  // Свежие сверху. Дата хранится как ДД.ММ.ГГГГ, поэтому сравниваем по
  // перевёрнутым частям, а не по строке целиком.
  const статьи = [...ALL].sort((a, b) => {
    const к = (д: string) => д.split('.').reverse().join('');
    return к(b.date).localeCompare(к(a.date));
  });

  return (
    <main className="min-h-screen bg-[#050507] text-[#E8E8F0] pt-16 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{п.назад}</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{п.заголовок}</h1>
        <p className="text-[15px] text-[#8B8BA8] leading-relaxed mb-12">{п.описание}</p>

        {статьи.length === 0 ? (
          <p className="text-[15px] text-[#8B8BA8]">{п.пусто}</p>
        ) : (
          <ul className="space-y-4">
            {статьи.map((с) => (
              <li key={с.id}>
                <Link
                  href={loc === 'en' ? `/news/${с.id}` : `/news/${с.id}?lang=${loc}`}
                  className="block rounded-2xl border border-[#8B8BA8]/20 hover:border-[#00F0FF]/50 p-5 transition-colors group"
                >
                  <div className="flex flex-wrap items-center gap-4 text-[13px] font-mono text-[#8B8BA8] mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#00F0FF]" />
                      {с.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#00F0FF]" />
                      {с.readingTime[loc] || с.readingTime.en}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold leading-snug mb-2 group-hover:text-[#00F0FF] transition-colors">
                    {с.title[loc] || с.title.en}
                  </h2>
                  <p className="text-[15px] text-[#A8A8C0] leading-relaxed line-clamp-3">
                    {с.summary[loc] || с.summary.en}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-[13px] font-mono tracking-wider text-[#00F0FF]">
                    {п.читать}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
