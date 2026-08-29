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
  content: Record<Loc, string>;
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';
const ALL = тольковышедшие(newsDataВесь as Array<{ date?: string }>) as unknown as NewsArticle[];

function resolveLocale(v: string | null): Loc {
  return (LOCALES as string[]).includes(v || '') ? (v as Loc) : 'en';
}

const ПОДПИСИ: Record<Loc, { заголовок: string; описание: string; назад: string; читать: string; пусто: string; язык: string }> = {
  en: { заголовок: 'CODE Eternal News', описание: 'The chronicle of digital eternity: protocols, releases and the koans that accompany them.', назад: '← Back to radio', читать: 'Read', пусто: 'No articles yet.', язык: 'Language' },
  ru: { заголовок: 'Новости CODE Eternal', описание: 'Летопись цифровой вечности: протоколы, выпуски и коаны, которые их сопровождают.', назад: '← К радио', читать: 'Читать', пусто: 'Пока ни одной статьи.', язык: 'Язык' },
  es: { заголовок: 'Noticias de CODE Eternal', описание: 'La crónica de la eternidad digital: protocolos, lanzamientos y los koanes que los acompañan.', назад: '← Volver a la radio', читать: 'Leer', пусто: 'Aún no hay artículos.', язык: 'Idioma' },
  zh: { заголовок: 'CODE Eternal 新闻', описание: '数字永恒的编年史：协议、发布，以及伴随它们的公案。', назад: '← 返回电台', читать: '阅读', пусто: '暂无文章。', язык: '语言' },
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

/**
 * БОЛЬШЕ ТЕКСТА В КАРТОЧКЕ НОВОСТИ.
 *
 * Берём краткое описание целиком, а если его не хватает — продолжаем началом
 * самой статьи. Замер по 41 статье: краткое описание короче 300 знаков у 30 из
 * 41 на русском и у 41 из 41 на китайском. Разметку markdown вычищаем: в
 * карточке нужен текст, а не решётки заголовков и звёздочки выделения.
 */
function превьюНовости(краткое: string, статья: string, предел = 460): string {
  const начало = (краткое || '').trim();
  const чисто = (статья || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`~|]+/g, '')
    .replace(/^[-–—]{2,}$/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!чисто) return начало;
  const хвост = начало && чисто.startsWith(начало.slice(0, 40)) ? чисто.slice(начало.length) : чисто;
  const всё = (начало + ' ' + хвост).replace(/\s+/g, ' ').trim();
  if (всё.length <= предел) return всё;
  const обрез = всё.slice(0, предел);
  const точка = Math.max(обрез.lastIndexOf('. '), обрез.lastIndexOf('! '), обрез.lastIndexOf('? '), обрез.lastIndexOf('。'));
  return точка > предел * 0.6 ? обрез.slice(0, точка + 1) : обрез.trimEnd() + '…';
}

/** Названия языков — на своём языке, как принято на трёх остальных сайтах. */
const ЯЗЫКИ: { код: Loc; подпись: string }[] = [
  { код: 'ru', подпись: 'RU' },
  { код: 'en', подпись: 'EN' },
  { код: 'es', подпись: 'ES' },
  { код: 'zh', подпись: '中文' },
];

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
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{п.назад}</span>
          </Link>

          {/*
            ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА. Раньше его тут не было вовсе: страница читала
            язык из `?lang=`, но поставить этот признак было нечем, и человек,
            пришедший из русской ленты, видел английский текст. На трёх
            остальных сайтах переключатель есть в шапке — здесь шапки нет,
            поэтому он стоит на самой странице.
          */}
          <nav aria-label={п.язык} className="flex items-center gap-1">
            {ЯЗЫКИ.map((я) => (
              <Link
                key={я.код}
                href={я.код === 'en' ? '/news' : `/news?lang=${я.код}`}
                aria-current={я.код === loc ? 'true' : undefined}
                className={`relative after:absolute after:content-[''] after:inset-[-5px] px-3 py-1.5 rounded-lg text-[13px] font-mono tracking-wider transition-colors ${
                  я.код === loc
                    ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40'
                    : 'text-[#8B8BA8] border border-[#8B8BA8]/20 hover:text-[#00F0FF] hover:border-[#00F0FF]/40'
                }`}
              >
                {я.подпись}
              </Link>
            ))}
          </nav>
        </div>

        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{п.заголовок}</h1>
        <p className="text-[15px] text-[#8B8BA8] leading-relaxed mb-12 max-w-3xl">{п.описание}</p>

        {статьи.length === 0 ? (
          <p className="text-[15px] text-[#8B8BA8]">{п.пусто}</p>
        ) : (
          /*
            ПЛИТКА, КАК НА ТРЁХ ОСТАЛЬНЫХ САЙТАХ. Была лента в одну колонку —
            здесь она выглядела чужой: на codeofdigitaleternity.com, aifa.digital
            и aifa.works новости идут карточками по три в ряд, с метками тем,
            датой, временем чтения и восемью строками текста. Теперь так же,
            только в цветах радио.
          */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {статьи.map((с) => (
              <Link
                key={с.id}
                href={loc === 'en' ? `/news/${с.id}` : `/news/${с.id}?lang=${loc}`}
                className="flex flex-col min-h-[420px] rounded-2xl border border-[#8B8BA8]/20 hover:border-[#00F0FF]/50 bg-white/[0.02] hover:bg-white/[0.04] p-6 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3 h-12 mb-4 overflow-hidden">
                  <div className="flex items-center gap-3 text-[13px] font-mono text-[#8B8BA8] whitespace-nowrap flex-shrink-0 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#00F0FF]" />
                      {с.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#00F0FF]" />
                      {с.readingTime[loc] || с.readingTime.en}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end max-w-[55%] max-h-[48px] overflow-hidden">
                    {(с.category[loc] || с.category.en || '').split(',').slice(0, 3).map((метка, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg border border-[#8B8BA8]/20 bg-white/[0.03] text-[12px] font-mono tracking-wider text-[#8B8BA8] whitespace-nowrap"
                      >
                        {метка.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-lg font-bold leading-snug h-14 mb-3 line-clamp-2 group-hover:text-[#00F0FF] transition-colors">
                  {с.title[loc] || с.title.en}
                </h2>

                <p className="text-[14px] text-[#A8A8C0] leading-relaxed h-[182px] mb-4 line-clamp-[8]">
                  {превьюНовости(с.summary[loc] || с.summary.en, с.content?.[loc] || с.content?.en || '')}
                </p>

                <span className="inline-flex items-center gap-1 mt-auto text-[13px] font-mono tracking-wider text-[#00F0FF]">
                  {п.читать}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
