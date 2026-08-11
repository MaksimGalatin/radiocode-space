import Link from 'next/link';

// Несуществующая статья должна отдавать НАСТОЯЩИЙ 404, а не страницу «ничего не
// найдено» с кодом 200: иначе поисковик считает адрес живым и держит его в
// выдаче. Эта грабля уже ловилась на aifa.digital — там порядок строк в
// метаданных давал 200 на любой мусорный адрес.
export default function NewsNotFound() {
  return (
    <main className="min-h-screen bg-[#050507] text-[#E8E8F0] pt-16 pb-24 flex items-center">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[13px] font-mono tracking-[0.3em] text-[#00F0FF] mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
          Article not found · Статья не найдена · Artículo no encontrado · 未找到文章
        </h1>
        <Link
          href="/news"
          className="inline-block mt-4 text-[13px] font-mono tracking-wider text-[#00F0FF] hover:text-[#7CF7FF] transition-colors"
        >
          ← News · Новости · Noticias · 新闻
        </Link>
      </div>
    </main>
  );
}
