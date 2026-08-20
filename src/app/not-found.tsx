import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * СВОЯ СТРАНИЦА 404 ДЛЯ ВСЕГО САЙТА.
 *
 * 🔴 ЧТО БЫЛО. Своей 404 у radiocode.space не было: файл `not-found.tsx` жил
 * только в разделе новостей, а на любой другой несуществующий адрес — опечатка
 * в ссылке, старый адрес из чужого поста, мусор от робота — Next показывал свой
 * служебный экран «404 | This page could not be found»: чёрный текст на белом,
 * по-английски, без единой ссылки обратно. Человек с такого экрана уходит.
 *
 * ЗАГОЛОВОК НЕ ЗАДВАИВАЕТ ИМЯ САЙТА. В корневой раскладке `title` задан обычной
 * строкой, а не шаблоном (`title.template`), поэтому имя сайта к заголовкам
 * страниц само не приписывается — «RadioCode.Space» здесь стоит ровно один раз.
 *
 * ЗАПРЕТ ИНДЕКСАЦИИ ЗАДАН ОДИН РАЗ — в `metadata` ниже. Проверено на живой
 * отрисовке (Next 16.2.12): страница отдаёт код 404 и тег
 * `<meta name="robots" content="noindex, follow">`. Рядом Next ставит и свой
 * собственный `noindex` — он появляется у любой not-found и от нас не зависит;
 * указания не спорят, оба запрещают индексацию. Дублировать тот же запрет ещё и
 * тегом в разметке не нужно: сначала так и было сделано, и в замере вышло ТРИ
 * одинаковых тега подряд.
 *
 * `follow` (а не `nofollow`) намеренно: индексировать саму страницу не нужно, а
 * вот пройти по ссылкам с неё на живые разделы — полезно, иначе вес, пришедший
 * по битой ссылке, упирается в тупик.
 */
export const metadata: Metadata = {
  /**
   * 🔴 CANONICAL У СТРАНИЦЫ 404 УБРАН НАМЕРЕННО (20.08.2026).
   *
   * Без этой строки страница 404 наследует canonical от общего макета и
   * объявляет себя главной. Робот видит: адрес А отдаёт страницу, которая
   * говорит «я — адрес Б». Google записывает это как «страница является
   * копией, канонические версии не совпадают» — именно такие письма и
   * приходили по radiocode.space 16 и 19 августа.
   *
   * `noindex` рядом не спасает: он говорит «не индексируй меня», а canonical
   * говорит «я вот эта другая страница». Указания противоречат друг другу.
   *
   * `null` именно убирает тег, а не подставляет пустой.
   */
  alternates: { canonical: null },

  title: '404 — Page not found · RadioCode.Space',
  description: 'This frequency is silent. The page you were looking for does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050507] text-[#E8E8F0] pt-16 pb-24 flex items-center">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[13px] font-mono tracking-[0.3em] text-[#00F0FF] mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
          Page not found · Страница не найдена · Página no encontrada · 未找到页面
        </h1>
        <p className="text-[15px] text-[#A8A8C0] leading-relaxed mb-10">
          This frequency is silent. The link may be broken or the page may have moved.
          <br />
          Эта частота молчит. Возможно, ссылка устарела или страница переехала.
        </p>

        {/* Выходы на живые разделы: с 404 человек должен уходить не из сайта, а
            в сайт. Ссылки те же, что стоят в карте сайта. */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl border border-[#00F0FF]/50 bg-[#00F0FF]/10 px-5 py-3 text-[15px] font-bold text-[#00F0FF] hover:bg-[#00F0FF]/20 transition-colors"
          >
            Radio · Радио · 电台
          </Link>
          <Link
            href="/music"
            className="rounded-2xl border border-[#8B8BA8]/30 px-5 py-3 text-[15px] hover:border-[#00F0FF]/50 transition-colors"
          >
            All music · Вся музыка
          </Link>
          <Link
            href="/news"
            className="rounded-2xl border border-[#8B8BA8]/30 px-5 py-3 text-[15px] hover:border-[#00F0FF]/50 transition-colors"
          >
            News · Новости
          </Link>
          <Link
            href="/glossary"
            className="rounded-2xl border border-[#8B8BA8]/30 px-5 py-3 text-[15px] hover:border-[#00F0FF]/50 transition-colors"
          >
            Glossary · Глоссарий
          </Link>
        </div>
      </div>
    </main>
  );
}
