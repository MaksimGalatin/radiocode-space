'use client';

// Меню «Поделиться» — настоящее, со списком сервисов.
//
// ЧЕМ ОПЛАЧЕНО. До 14.09.2026 кнопка «Поделиться» вызывала `navigator.share` —
// системное окно телефона. На компьютере его не существует: замер на живом
// сайте показал `typeof navigator.share === 'undefined'`, а нажатие Enter на
// кнопке открывало РОВНО НОЛЬ диалогов. Дальше код молча пытался положить
// ссылку в буфер обмена, и если браузер отказывал — не показывал ничего.
// Человек видел мёртвую кнопку: нажал и «зависло».
//
// Здесь три починки сразу:
//   1. свой список сервисов — он работает и на компьютере, и на телефоне;
//   2. ПОДПИСЬ вместо голой ссылки: название трека и приглашение на радио;
//   3. полная работа с клавиатуры — Tab ходит по кругу ВНУТРИ меню, стрелки
//      двигают, Escape закрывает, фокус возвращается на кнопку.
//
// Системное окно телефона никуда не делось — оно стало отдельным пунктом
// «Ещё…» и показывается только там, где действительно есть.

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, Link2, Mail, MessageSquare, Share2, X } from 'lucide-react';
import { useRadioT, useCurrentLang } from '@/lib/radioI18n';

// Один сервис в меню. `href` строится из уже закодированных ссылки и подписи.
interface Сервис {
  ключ: string;
  имя: string;
  цвет: string;
  // Некоторые сети берут текст, некоторые только адрес — каждая по-своему.
  href: (д: { url: string; текст: string; заголовок: string; трек: string }) => string;
  значок?: 'link' | 'copy' | 'mail' | 'sms' | 'system';
}

// Простые буквенные значки для сетей: тянуть три десятка логотипов ради
// всплывающего меню — лишний вес и лишние запросы наружу.
const БУКВА: Record<string, string> = {
  telegram: 'TG', whatsapp: 'WA', facebook: 'f', x: '𝕏', reddit: 'R',
  vk: 'VK', ok: 'OK', linkedin: 'in', pinterest: 'P', tumblr: 't',
  threads: '@', bluesky: 'BS', mastodon: 'M', viber: 'V', line: 'L',
  weibo: '微', qq: 'QQ', pocket: 'PK', digg: 'D', xing: 'X',
};

const СЕРВИСЫ: Сервис[] = [
  { ключ: 'telegram',  имя: 'Telegram',  цвет: '#2AABEE',
    href: (д) => `https://t.me/share/url?url=${д.url}&text=${д.текст}` },
  { ключ: 'whatsapp',  имя: 'WhatsApp',  цвет: '#25D366',
    href: (д) => `https://api.whatsapp.com/send?text=${д.текст}%0A${д.url}` },
  { ключ: 'facebook',  имя: 'Facebook',  цвет: '#1877F2',
    href: (д) => `https://www.facebook.com/sharer/sharer.php?u=${д.url}&quote=${д.текст}` },
  { ключ: 'x',         имя: 'X',         цвет: '#E7E9EA',
    href: (д) => `https://twitter.com/intent/tweet?url=${д.url}&text=${д.текст}` },
  { ключ: 'reddit',    имя: 'Reddit',    цвет: '#FF4500',
    href: (д) => `https://www.reddit.com/submit?url=${д.url}&title=${д.заголовок}` },
  { ключ: 'vk',        имя: 'ВКонтакте', цвет: '#0077FF',
    href: (д) => `https://vk.com/share.php?url=${д.url}&title=${д.заголовок}&comment=${д.текст}` },
  { ключ: 'ok',        имя: 'Одноклассники', цвет: '#EE8208',
    href: (д) => `https://connect.ok.ru/offer?url=${д.url}&title=${д.заголовок}` },
  { ключ: 'linkedin',  имя: 'LinkedIn',  цвет: '#0A66C2',
    href: (д) => `https://www.linkedin.com/sharing/share-offsite/?url=${д.url}` },
  { ключ: 'threads',   имя: 'Threads',   цвет: '#E7E9EA',
    href: (д) => `https://www.threads.net/intent/post?text=${д.текст}%0A${д.url}` },
  { ключ: 'bluesky',   имя: 'Bluesky',   цвет: '#0085FF',
    href: (д) => `https://bsky.app/intent/compose?text=${д.текст}%0A${д.url}` },
  { ключ: 'mastodon',  имя: 'Mastodon',  цвет: '#6364FF',
    href: (д) => `https://mastodonshare.com/?text=${д.текст}&url=${д.url}` },
  { ключ: 'pinterest', имя: 'Pinterest', цвет: '#E60023',
    href: (д) => `https://pinterest.com/pin/create/button/?url=${д.url}&description=${д.текст}` },
  { ключ: 'tumblr',    имя: 'Tumblr',    цвет: '#36465D',
    href: (д) => `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${д.url}&caption=${д.текст}` },
  { ключ: 'pocket',    имя: 'Pocket',    цвет: '#EF4056',
    href: (д) => `https://getpocket.com/edit?url=${д.url}` },
  { ключ: 'viber',     имя: 'Viber',     цвет: '#7360F2',
    href: (д) => `viber://forward?text=${д.текст}%20${д.url}` },
  { ключ: 'line',      имя: 'LINE',      цвет: '#06C755',
    href: (д) => `https://social-plugins.line.me/lineit/share?url=${д.url}&text=${д.текст}` },
  { ключ: 'weibo',     имя: 'Weibo',     цвет: '#E6162D',
    href: (д) => `https://service.weibo.com/share/share.php?url=${д.url}&title=${д.текст}` },
  { ключ: 'qq',        имя: 'QQ',        цвет: '#12B7F5',
    href: (д) => `https://connect.qq.com/widget/shareqq/index.html?url=${д.url}&title=${д.заголовок}&summary=${д.текст}` },
  { ключ: 'digg',      имя: 'Digg',      цвет: '#005BE2',
    href: (д) => `https://digg.com/submit?url=${д.url}&title=${д.заголовок}` },
  { ключ: 'xing',      имя: 'XING',      цвет: '#0698A0',
    href: (д) => `https://www.xing.com/spi/shares/new?url=${д.url}` },
];

export function ShareMenu({
  открыто,
  закрыть,
  url,
  трек,
  якорь,
  color = '#00F0FF',
}: {
  открыто: boolean;
  закрыть: () => void;
  url: string;
  трек: string;
  якорь: HTMLElement | null;
  color?: string;
}) {
  const rt = useRadioT();
  const lang = useCurrentLang();
  const окно = useRef<HTMLDivElement>(null);
  const [готово, setГотово] = useState<'link' | 'text' | null>(null);
  const [место, setМесто] = useState<{ top: number; left: number } | null>(null);
  const [естьСистемное, setЕстьСистемное] = useState(false);

  // Подпись — то, ради чего всё затевалось: голая ссылка не говорит человеку
  // ни что это за трек, ни куда она ведёт.
  const подпись = rt('shareCaption').replace('{track}', трек);
  const заголовок = rt('shareSubject').replace('{track}', трек);
  const полныйТекст = `${подпись}\n${url}`;

  const д = {
    url: encodeURIComponent(url),
    текст: encodeURIComponent(подпись),
    заголовок: encodeURIComponent(заголовок),
    трек: encodeURIComponent(трек),
  };

  useEffect(() => {
    setЕстьСистемное(typeof navigator !== 'undefined' && typeof (navigator as { share?: unknown }).share === 'function');
  }, []);

  // Ставим меню рядом с кнопкой и следим, чтобы оно не уехало за край экрана.
  useEffect(() => {
    if (!открыто || !якорь) return;
    const считать = () => {
      const к = якорь.getBoundingClientRect();
      const ш = Math.min(340, window.innerWidth - 24);
      const в = Math.min(480, window.innerHeight - 24);
      let left = к.left + к.width / 2 - ш / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - ш - 12));
      // над кнопкой, если снизу не помещается (плеер живёт внизу экрана)
      const снизу = window.innerHeight - к.bottom;
      const top = снизу > в + 16 ? к.bottom + 8 : Math.max(12, к.top - в - 8);
      setМесто({ top, left });
    };
    считать();
    window.addEventListener('resize', считать);
    window.addEventListener('scroll', считать, true);
    return () => {
      window.removeEventListener('resize', считать);
      window.removeEventListener('scroll', считать, true);
    };
  }, [открыто, якорь]);

  const закрытьИВернуть = useCallback(() => {
    закрыть();
    // Возврат фокуса на кнопку — без него человек, работающий с клавиатуры,
    // после закрытия меню оказывается в начале страницы.
    якорь?.focus();
  }, [закрыть, якорь]);

  // Клавиатура. Tab внутри меню ходит ПО КРУГУ: уйти из открытого меню
  // табуляцией нельзя, выход — Escape. Это и лечит «TAB зависает».
  useEffect(() => {
    if (!открыто) return;
    const фокусируемые = () =>
      Array.from(окно.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') || []);
    const нажатие = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); закрытьИВернуть(); return; }
      const сп = фокусируемые();
      if (!сп.length) return;
      const и = сп.indexOf(document.activeElement as HTMLElement);
      if (e.key === 'Tab') {
        e.preventDefault();
        const след = e.shiftKey ? (и <= 0 ? сп.length - 1 : и - 1) : (и === sпоследний(сп) ? 0 : и + 1);
        сп[след]?.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault(); сп[(и + 1) % сп.length]?.focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault(); сп[(и - 1 + сп.length) % сп.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault(); сп[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault(); сп[сп.length - 1]?.focus();
      }
    };
    document.addEventListener('keydown', нажатие, true);
    // первый пункт получает фокус сам — иначе клавиатурный человек не поймёт,
    // что меню вообще открылось
    const т = setTimeout(() => фокусируемые()[0]?.focus(), 30);
    return () => { document.removeEventListener('keydown', нажатие, true); clearTimeout(т); };
  }, [открыто, закрытьИВернуть]);

  // Клик мимо меню закрывает его.
  useEffect(() => {
    if (!открыто) return;
    const мимо = (e: MouseEvent) => {
      if (окно.current && !окно.current.contains(e.target as Node) && e.target !== якорь) закрыть();
    };
    // отложенно: иначе тот же клик, что открыл меню, его и закроет
    const т = setTimeout(() => document.addEventListener('mousedown', мимо), 0);
    return () => { clearTimeout(т); document.removeEventListener('mousedown', мимо); };
  }, [открыто, закрыть, якорь]);

  const скопировать = async (что: 'link' | 'text') => {
    const строка = что === 'link' ? url : полныйТекст;
    let вышло = false;
    try {
      await navigator.clipboard.writeText(строка);
      вышло = true;
    } catch {
      // Запасной путь для случаев, когда буфер закрыт разрешениями: старый
      // execCommand работает без них. Раньше отказ буфера означал, что кнопка
      // не делала ВООБЩЕ ничего и молчала.
      try {
        const п = document.createElement('textarea');
        п.value = строка;
        п.style.position = 'fixed';
        п.style.opacity = '0';
        document.body.appendChild(п);
        п.select();
        вышло = document.execCommand('copy');
        п.remove();
      } catch { вышло = false; }
    }
    if (вышло) {
      setГотово(что);
      setTimeout(() => setГотово(null), 1800);
    }
  };

  const системное = async () => {
    try {
      await (navigator as { share: (д: object) => Promise<void> }).share({
        title: заголовок, text: подпись, url,
      });
      закрытьИВернуть();
    } catch { /* человек передумал */ }
  };

  if (!открыто || !место || typeof document === 'undefined') return null;

  const пункт =
    'flex items-center gap-2.5 w-full rounded-lg px-2.5 py-2 text-left text-[13px] text-[#C8C8DC] ' +
    'transition-colors hover:bg-white/[0.07] focus:bg-white/[0.12] focus:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-[#00F0FF]';

  return createPortal(
    <>
      {/* Затемнение: ловит клики и не даёт случайно нажать плеер под меню. */}
      <div className="fixed inset-0 z-[998]" style={{ background: 'rgba(4,4,14,0.45)' }} aria-hidden="true" />
      <div
        ref={окно}
        role="dialog"
        aria-modal="true"
        aria-label={rt('shareVia')}
        className="fixed z-[999] rounded-2xl border p-3 shadow-2xl"
        style={{
          top: место.top, left: место.left,
          width: Math.min(340, typeof window !== 'undefined' ? window.innerWidth - 24 : 340),
          maxHeight: Math.min(480, typeof window !== 'undefined' ? window.innerHeight - 24 : 480),
          overflowY: 'auto',
          background: 'rgba(10,10,22,0.98)',
          borderColor: 'rgba(255,255,255,0.14)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color }}>
            {rt('shareVia')}
          </span>
          <button
            onClick={закрытьИВернуть}
            aria-label={rt('shareClose')}
            className="rounded-md p-1 text-[#8B8BA8] transition-colors hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
          >
            <X width={15} height={15} strokeWidth={2.2} />
          </button>
        </div>

        {/* Название трека — человек должен видеть, чем именно делится. */}
        <p className="mb-2 truncate font-mono text-[12px] text-[#8B8BA8]" title={трек}>♪ {трек}</p>

        {/* Копирование — первым: оно работает всегда и везде. */}
        <div className="mb-2 grid gap-1">
          <button onClick={() => скопировать('link')} className={пункт}>
            {готово === 'link'
              ? <Check width={15} height={15} style={{ color }} strokeWidth={2.4} />
              : <Link2 width={15} height={15} style={{ color: '#8B8BA8' }} strokeWidth={2} />}
            <span>{готово === 'link' ? rt('copied') : rt('copyLink')}</span>
          </button>
          <button onClick={() => скопировать('text')} className={пункт}>
            {готово === 'text'
              ? <Check width={15} height={15} style={{ color }} strokeWidth={2.4} />
              : <Copy width={15} height={15} style={{ color: '#8B8BA8' }} strokeWidth={2} />}
            <span>{готово === 'text' ? rt('textCopied') : rt('copyText')}</span>
          </button>
        </div>

        <div className="mb-2 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />

        {/* Сети. Каждая получает подпись, а не голую ссылку. */}
        <div className="grid grid-cols-2 gap-1">
          {СЕРВИСЫ.map((с) => (
            <a
              key={с.ключ}
              href={с.href(д)}
              target="_blank"
              rel="noopener noreferrer"
              className={пункт}
              onClick={() => setTimeout(закрытьИВернуть, 120)}
            >
              <span
                aria-hidden="true"
                className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] font-mono text-[10px] font-bold"
                style={{ background: с.цвет, color: ['#E7E9EA'].includes(с.цвет) ? '#0A0A16' : '#fff' }}
              >
                {БУКВА[с.ключ] || с.имя[0]}
              </span>
              <span className="truncate">{с.имя}</span>
            </a>
          ))}
        </div>

        <div className="my-2 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />

        {/* Почта и СМС — для тех, кто делится не через соцсеть. */}
        <div className="grid gap-1">
          <a
            href={`mailto:?subject=${д.заголовок}&body=${encodeURIComponent(полныйТекст)}`}
            className={пункт}
            onClick={() => setTimeout(закрытьИВернуть, 120)}
          >
            <Mail width={15} height={15} style={{ color: '#8B8BA8' }} strokeWidth={2} />
            <span>{rt('shareEmail')}</span>
          </a>
          <a
            href={`sms:?&body=${encodeURIComponent(полныйТекст)}`}
            className={пункт}
            onClick={() => setTimeout(закрытьИВернуть, 120)}
          >
            <MessageSquare width={15} height={15} style={{ color: '#8B8BA8' }} strokeWidth={2} />
            <span>{rt('shareSms')}</span>
          </a>
          {/* Системное окно — только там, где оно есть на самом деле. */}
          {естьСистемное && (
            <button onClick={системное} className={пункт}>
              <Share2 width={15} height={15} style={{ color: '#8B8BA8' }} strokeWidth={2} />
              <span>{rt('shareSystem')}</span>
            </button>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}

// Последний индекс списка. Отдельной строкой — чтобы условие перехода по Tab
// читалось словами, а не арифметикой внутри тернарного оператора.
function sпоследний(сп: unknown[]): number {
  return сп.length - 1;
}
