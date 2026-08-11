import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import newsDataВесь from '@/data/news.json';
import { тольковышедшие } from '@/lib/newsSchedule';
import { renderMarkdownToReact } from '@/lib/newsMarkdown';

/**
 * 🔴 ЧЕТВЁРТЫЙ САЙТ ЖИЛ БЕЗ ЛЕНТЫ НОВОСТЕЙ.
 *
 * Три сайта экосистемы отдавали статьи, radiocode.space — нет: `/news` здесь
 * отвечал 404. При этом данные общие, кабинет общий, память общая, и человек,
 * пришедший с радио, просто не видел ничего из того, что мы пишем.
 *
 * Раздел собран на той же схеме, что и на aifa.digital: язык приходит в
 * заголовке `x-locale`, который наш middleware ставит из метки `?lang=`.
 * Отсечка будущих дат — общая (`тольковышедшие`), поэтому подготовленный
 * заранее материал выходит здесь в тот же день, что и на остальных трёх.
 *
 * Обёртки раскладки, как на aifa.digital, тут нет: у радио своя шапка и свой
 * подвал прямо на главной. Поэтому страница самодостаточна и рисует себя сама,
 * в тех же цветах, что и весь сайт.
 */

// Статьи с датой в будущем не показываем: материал готовится заранее, а
// выходить должен в свой день. Отсечка одна на все места чтения.
const newsData = тольковышедшие(newsDataВесь as Array<{ date?: string }>) as typeof newsDataВесь;

type Loc = 'en' | 'ru' | 'es' | 'zh';
const LOCALES: Loc[] = ['en', 'ru', 'es', 'zh'];

interface NewsArticle {
  id: string;
  date: string;
  readingTime: Record<Loc, string>;
  category: Record<Loc, string>;
  title: Record<Loc, string>;
  summary: Record<Loc, string>;
  content: Record<Loc, string>;
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';
const ALL = newsData as NewsArticle[];

function resolveLocale(v: string | null): Loc {
  return (LOCALES as string[]).includes(v || '') ? (v as Loc) : 'en';
}

function toIso(d: string): string {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(d || ''));
  return m ? `${m[3]}-${m[2]}-${m[1]}` : new Date().toISOString().slice(0, 10);
}

function selfUrl(id: string, loc: Loc): string {
  return loc === 'en' ? `${BASE}/news/${id}` : `${BASE}/news/${id}?lang=${loc}`;
}

function languageAlternates(id: string): Record<string, string> {
  return {
    en: `${BASE}/news/${id}`,
    ru: `${BASE}/news/${id}?lang=ru`,
    es: `${BASE}/news/${id}?lang=es`,
    zh: `${BASE}/news/${id}?lang=zh`,
    'x-default': `${BASE}/news/${id}`,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL.map((a) => ({ slug: a.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = ALL.find((a) => a.id === slug);

  // Порядок строк решает, будет ли 404 настоящим: обращение к headers() делает
  // страницу посделочной, и ответ уходит с кодом 200 ещё до notFound(). Сначала
  // проверка, потом всё посделочное — эта грабля уже ловилась на aifa.digital.
  if (!article) notFound();

  const loc = resolveLocale((await headers()).get('x-locale'));
  const title = `${article.title[loc] || article.title.en} | RadioCODE`;
  const description = article.summary[loc] || article.summary.en;
  const url = selfUrl(article.id, loc);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(article.id) },
    openGraph: { title, description, url, siteName: 'RadioCODE', type: 'article' },
    twitter: { card: 'summary_large_image', site: '@CODE_AIfa', title, description },
  };
}

export default async function NewsArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = ALL.find((a) => a.id === slug);
  if (!article) notFound();
  const loc = resolveLocale((await headers()).get('x-locale'));

  const title = article.title[loc] || article.title.en;
  const summary = article.summary[loc] || article.summary.en;
  const content = article.content[loc] || article.content.en;
  const readingTime = article.readingTime[loc] || article.readingTime.en;
  const category = article.category[loc] || article.category.en;
  const url = selfUrl(article.id, loc);

  // Если тело начинается тем же заголовком первого уровня, что и заголовок
  // статьи, убираем его: на странице должен быть ровно один h1.
  const cleanTitle = title.trim().toLowerCase();
  const firstLine = content.split('\n')[0].trim();
  const startsWithTitleH1 =
    firstLine.startsWith('# ') &&
    (firstLine.substring(2).trim().toLowerCase() === cleanTitle ||
      cleanTitle.includes(firstLine.substring(2).trim().toLowerCase()) ||
      firstLine.substring(2).trim().toLowerCase().includes(cleanTitle));
  const body = startsWithTitleH1 ? content.split('\n').slice(1).join('\n') : content;

  const backLabel =
    { en: '← Back to News', ru: '← К новостям', es: '← Volver a Noticias', zh: '← 返回新闻' }[loc];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: summary,
    datePublished: toIso(article.date),
    dateModified: toIso(article.date),
    inLanguage: loc,
    author: { '@type': 'Organization', name: 'CODE Eternal', url: 'https://www.codeofdigitaleternity.com' },
    publisher: { '@type': 'Organization', name: 'RadioCODE', url: BASE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
  };

  return (
    <main className="min-h-screen bg-[#050507] text-[#E8E8F0] pt-16 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </Link>

        <article>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight">{title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-[13px] font-mono text-[#8B8BA8] mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#00F0FF]" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#00F0FF]" />
              <span>{readingTime}</span>
            </span>
            <span className="flex items-center gap-1.5 flex-wrap">
              <Tag className="w-4 h-4 text-[#00F0FF] flex-shrink-0" />
              <span className="flex flex-wrap gap-1">
                {(category || '').split(',').map((cat, idx) => (
                  <span
                    key={idx}
                    className="tracking-wider text-[13px] px-2 py-0.5 border border-[#8B8BA8]/25 rounded text-[#8B8BA8]"
                  >
                    {cat.trim()}
                  </span>
                ))}
              </span>
            </span>
          </div>

          <div className="text-[13px] font-mono text-[#8B8BA8] mb-6 pb-4 border-b border-[#8B8BA8]/20">
            CODE Eternal
          </div>

          <div className="text-[#C8C8DA] text-base leading-relaxed space-y-6 news-content">
            {renderMarkdownToReact(body)}
          </div>
        </article>

        <div className="mt-12 pt-6 border-t border-[#8B8BA8]/20">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[13px] font-mono tracking-wider text-[#00F0FF] hover:text-[#7CF7FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </Link>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
