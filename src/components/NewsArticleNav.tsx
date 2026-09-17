'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, List } from 'lucide-react';

// Плавающая панель на странице статьи: быстрый скролл наверх и быстрый
// возврат в список новостей. Появляется только после прокрутки вниз, чтобы
// не мешать чтению заголовка. Архитектор: «быстрый скрол и закрытие
// страницы и возврат в меню — сейчас очень неудобно». Цвета — в неоновой
// палитре сайта (у radiocode.space нет светлой темы).
export default function NewsArticleNav({ backHref }: { backHref: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-2 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        title="Scroll to top"
        className="w-11 h-11 rounded-full bg-[#0b0b12] border border-[#8B8BA8]/25 shadow-lg flex items-center justify-center text-[#00F0FF] hover:border-[#00F0FF]/60 hover:bg-[#00F0FF]/10 transition-colors cursor-pointer"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      <Link
        href={backHref}
        aria-label="Back to news list"
        title="Back to news list"
        className="w-11 h-11 rounded-full bg-[#0b0b12] border border-[#8B8BA8]/25 shadow-lg flex items-center justify-center text-[#7CF7FF] hover:border-[#00F0FF]/60 hover:bg-[#00F0FF]/10 transition-colors cursor-pointer"
      >
        <List className="w-5 h-5" />
      </Link>
    </div>
  );
}
