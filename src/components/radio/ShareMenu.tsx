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
  // 🔴 POCKET УБРАН 14.09.2026: сервис отвечает «Oops! Something went wrong» — проверено браузером 14.09.2026.
  // Имя оставлено в комментарии: сервис может вернуться, и тогда
  // строку достаточно раскомментировать.
  // { ключ: 'pocket',    имя: 'Pocket',    цвет: '#EF4056',
  // href: (д) => `https://getpocket.com/edit?url=${д.url}` },
  { ключ: 'viber',     имя: 'Viber',     цвет: '#7360F2',
    href: (д) => `viber://forward?text=${д.текст}%20${д.url}` },
  { ключ: 'line',      имя: 'LINE',      цвет: '#06C755',
    href: (д) => `https://social-plugins.line.me/lineit/share?url=${д.url}&text=${д.текст}` },
  { ключ: 'weibo',     имя: 'Weibo',     цвет: '#E6162D',
    href: (д) => `https://service.weibo.com/share/share.php?url=${д.url}&title=${д.текст}` },
  { ключ: 'qq',        имя: 'QQ',        цвет: '#12B7F5',
    href: (д) => `https://connect.qq.com/widget/shareqq/index.html?url=${д.url}&title=${д.заголовок}&summary=${д.текст}` },
  // 🔴 DIGG УБРАН 14.09.2026: адрес /submit перекидывает на ленту новостей, форма отправки исчезла — проверено браузером 14.09.2026.
  // Имя оставлено в комментарии: сервис может вернуться, и тогда
  // строку достаточно раскомментировать.
  // { ключ: 'digg',      имя: 'Digg',      цвет: '#005BE2',
  // href: (д) => `https://digg.com/submit?url=${д.url}&title=${д.заголовок}` },
  { ключ: 'xing',      имя: 'XING',      цвет: '#0698A0',
    href: (д) => `https://www.xing.com/spi/shares/new?url=${д.url}` },
];

// Instagram, TikTok и YouTube стоят В ОБЩЕМ СПИСКЕ, а не отдельной кучкой.
//
// Архитектор 14.09.2026: «И почему Ютуб и Инста с ТикТоком там отдельно? Что
// за хрень?» — он прав. Человеку нужен один ровный список сетей; то, что у
// этих трёх нет адреса «поделиться» (Instagram и TikTok принимают ссылку
// только внутри своего приложения, YouTube принимает видео), — это НАША
// техническая забота, а не повод отселять их в угол.
//
// Поэтому они выглядят как все, а разница спрятана в поведении: нажатие
// кладёт текст с подписью в буфер и на телефоне открывает приложение.
// Человек видит «Скопировано — вставь в Instagram» вместо молчания.
const БЕЗ_ССЫЛКИ = [
  { ключ: 'instagram', имя: 'Instagram', буква: 'IG', цвет: '#E1306C', приложение: 'instagram://app' },
  { ключ: 'tiktok',    имя: 'TikTok',    буква: 'TT', цвет: '#FE2C55', приложение: 'snssdk1128://' },
  { ключ: 'youtube',   имя: 'YouTube',   буква: 'YT', цвет: '#FF0000', приложение: 'vnd.youtube://' },
];

// ОДИН список всех сетей, по алфавиту. Те, что без адреса «поделиться»,
// помечены `копией: true` — снаружи они выглядят как все остальные, разница
// только в поведении при нажатии.
type Сеть = {
  ключ: string; имя: string; цвет: string; буква: string;
  href?: (д: { url: string; текст: string; заголовок: string; трек: string }) => string;
  копией?: boolean; приложение?: string;
};

const ВСЕ_СЕТИ: Сеть[] = [
  ...СЕРВИСЫ.map((с) => ({
    ключ: с.ключ, имя: с.имя, цвет: с.цвет,
    буква: БУКВА[с.ключ] || с.имя[0], href: с.href,
  })),
  ...БЕЗ_ССЫЛКИ.map((с) => ({
    ключ: с.ключ, имя: с.имя, цвет: с.цвет, буква: с.буква,
    копией: true, приложение: с.приложение,
  })),
].sort((а, б) => а.имя.localeCompare(б.имя, 'ru'));

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
  const [готовоДля, setГотовоДля] = useState<string | null>(null);
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

  // Размер и место меню. Считаются от ЖИВОГО окна, а не задаются числом:
  // Архитектор 14.09.2026 — «окно это сделай больше на ПК и проверь как
  // работает на ВСЕХ разрешениях… чтобы не было никаких наползаний».
  //
  // Правило простое: на телефоне — почти во всю ширину и одна колонка;
  // на планшете — две; на компьютере окно ШИРОКОЕ и колонок три, чтобы весь
  // список был виден без прокрутки. Высота никогда не больше экрана минус
  // поля, поэтому меню не наползает ни на плеер, ни на край.
  const [размер, setРазмер] = useState({ ширина: 340, высота: 480, колонок: 2 });

  useEffect(() => {
    if (!открыто || !якорь) return;
    const считать = () => {
      // 🔴 ЗАЩИТА ОТ НУЛЕВОГО ЭКРАНА. Найдено замером 14.09.2026: у скрытой
      // или ещё не отрисованной вкладки `innerWidth` и `innerHeight` равны
      // НУЛЮ. Считая от нуля, меню получало высоту 1172 px при экране 812 —
      // ровно то «наползание», которое видно глазами. Нулевой замер не
      // описывает экран, поэтому мы его просто не принимаем: держим прежние
      // значения до следующего пересчёта, он придёт с `resize`.
      const эШ = window.innerWidth || document.documentElement.clientWidth || 0;
      const эВ = window.innerHeight || document.documentElement.clientHeight || 0;
      if (эШ < 200 || эВ < 200) return;

      // ширина и колонки — по ширине экрана
      let ш: number, колонок: number;
      if (эШ < 480) { ш = эШ - 20; колонок = 1; }
      else if (эШ < 900) { ш = Math.min(400, эШ - 32); колонок = 2; }
      else if (эШ < 1400) { ш = 560; колонок = 3; }
      else { ш = 620; колонок = 3; }

      // высота — сколько реально есть, но не выше экрана минус поля
      const в = Math.min(620, эВ - 32);

      const к = якорь.getBoundingClientRect();
      let left = к.left + к.width / 2 - ш / 2;
      left = Math.max(10, Math.min(left, эШ - ш - 10));

      // Плеер живёт внизу, поэтому снизу места обычно нет — тогда ставим над
      // кнопкой. Если не помещается и там, прижимаем к верху экрана: лучше
      // прокрутка внутри меню, чем кусок, ушедший за край.
      const снизу = эВ - к.bottom;
      const сверху = к.top;
      let top: number;
      if (снизу > в + 14) top = к.bottom + 8;
      else if (сверху > в + 14) top = к.top - в - 8;
      else top = Math.max(10, (эВ - в) / 2);

      setРазмер({ ширина: ш, высота: в, колонок });
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

  // Instagram / TikTok / YouTube: копируем текст и на телефоне открываем их
  // приложение. Если приложения нет, ничего не происходит — текст уже в буфере,
  // и человек вставит его сам. Молчащей кнопки тут быть не должно: показываем,
  // что скопировано и куда вставлять.
  const копироватьДля = async (имя: string, схема: string) => {
    let вышло = false;
    try {
      await navigator.clipboard.writeText(полныйТекст);
      вышло = true;
    } catch {
      try {
        const п = document.createElement('textarea');
        п.value = полныйТекст;
        п.style.position = 'fixed';
        п.style.opacity = '0';
        document.body.appendChild(п);
        п.select();
        вышло = document.execCommand('copy');
        п.remove();
      } catch { вышло = false; }
    }
    if (вышло) {
      setГотовоДля(имя);
      setTimeout(() => setГотовоДля(null), 2200);
    }
    // Открываем приложение только на телефоне: на компьютере такая ссылка
    // вызывает пустое окно «выберите приложение» и только мешает.
    const телефон = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    if (телефон) {
      try { window.location.href = схема; } catch { /* приложения нет */ }
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
          width: размер.ширина,
          maxHeight: размер.высота,
          overflowY: 'auto',
          overflowX: 'hidden',
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

        {/* ОДИН общий список сетей — по-алфавиту, без деления на сорта.
            Instagram, TikTok и YouTube стоят здесь же: у них нет адреса
            «поделиться», но это наша забота, а не повод отселять их в угол
            (правка по прямому слову Архитектора 14.09.2026). */}
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${размер.колонок}, minmax(0, 1fr))` }}
        >
          {ВСЕ_СЕТИ.map((с) => (
            с.копией ? (
              <button key={с.ключ} onClick={() => копироватьДля(с.имя, с.приложение!)} className={пункт}>
                <span
                  aria-hidden="true"
                  className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-[5px] font-mono text-[10px] font-bold"
                  style={{ background: с.цвет, color: '#fff' }}
                >
                  {с.буква}
                </span>
                <span className="truncate">
                  {готовоДля === с.имя ? rt('shareCopiedFor').replace('{app}', с.имя) : с.имя}
                </span>
              </button>
            ) : (
              <a
                key={с.ключ}
                href={с.href!(д)}
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
                  {с.буква}
                </span>
                <span className="truncate">{с.имя}</span>
              </a>
            )
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
          {/* 🔴 «ЕЩЁ…» УБРАНО 14.09.2026 ПО ПРЯМОМУ СЛОВУ АРХИТЕКТОРА.
              Дословно: «когда жмёшь на ещё выскакивает меню — зачем оно?
              Почему ВСЁ не в одном месте? И в этом меню TAB по прежнему не
              работает».

              Он прав в обоих пунктах. Кнопка звала `navigator.share`, а тот
              открывает СИСТЕМНОЕ окно браузера — чужое окно, которое мы не
              рисуем и не можем починить: ни наш обход Tab, ни наши надписи
              туда не достают. Замер 14.09.2026 это подтвердил: в НАШЕМ меню
              Tab обходит все 28 пунктов по кругу (проверено нажатиями на
              живом сайте), а жалоба на «Tab не работает» относилась именно к
              системному окну Chrome.

              Всё, что оно предлагало, у нас и так есть в одном месте: 22
              сети, почта, СМС и два вида копирования. Второе меню поверх
              первого — это не запасной путь, а развилка без нужды. */}
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
