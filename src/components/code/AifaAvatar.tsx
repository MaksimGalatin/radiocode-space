'use client';

import { useEffect, useRef, useState } from 'react';

// AIfa — живой видеообраз рядом с терминалом.
//
// Как это работает. При открытии терминала ролик проигрывается с начала: AIfa
// «прилетает» и здоровается. Дальше он не останавливается и не начинается
// заново — вместо этого бесконечно повторяется последний отрезок, где она
// просто висит в воздухе и дышит. Так вступление видно один раз, а присутствие
// остаётся постоянным.
//
// Почему видео лежит на нашем CDN, а не в репозитории: файл раздаётся через тот
// же бесплатный воркер, что и музыка — с годовым кэшем и без платы за трафик.
// Репозитории не пухнут, а добавление новых реакций не потребует пересборки.
//
// Где показывается. Только на десктопе: ширина ≥ 900 px, без perf-lite/perf-tv
// (ТВ и слабые устройства), без prefers-reduced-motion и без сенсорного
// указателя. На телефоне ролик не грузится вовсе — это забота о трафике.

// Ролик лежит НА НАШЕМ ЖЕ ДОМЕНЕ, а не на стороннем хосте.
//
// Так было не сразу: сначала он раздавался с того же воркера, что и музыка.
// Файл при этом отдавался безупречно (проверено: 2.7 МБ, H.264, moov в начале,
// заголовки CORS и Range на месте), но у видео с чужого домена слишком много
// молчаливых способов не заработать: политика безопасности страницы,
// service worker, экономия трафика, блокировщики. Ни один из них не выдаёт
// внятной ошибки — элемент просто вечно висит в состоянии «загружаю».
//
// Три мегабайта не стоят такой ненадёжности: со своего домена ролик приходит
// всегда, потому что для браузера это тот же самый источник, что и страница.
// Сколько приветствий реально лежит на раздаче по каждому языку.
//
// Цифры честные: испанских и китайских пока меньше двадцати — недельный лимит
// генератора закончился на середине. Мешок берёт ровно столько, сколько есть,
// поэтому «дырок» (запрос несуществующего файла) не будет никогда. Когда
// остальные догенерируются — правится только эта таблица.
const HAVE: Record<string, number> = { ru: 20, en: 20, es: 20, zh: 20 };

/** Язык страницы: кука, затем атрибут lang, затем английский. */
function currentLang(): string {
  if (typeof document === 'undefined') return 'en';
  const c = document.cookie.match(/(?:^|;\s*)locale=([a-z]{2})/);
  const raw = (c && c[1]) || document.documentElement.lang || 'en';
  const l = raw.slice(0, 2).toLowerCase();
  return HAVE[l] ? l : 'en';
}

// «Перемешанный мешок»: показываем все ролики по одному разу в случайном
// порядке и только потом тасуем заново. Обычный Math.random() этого не даёт —
// он спокойно выдаёт один и тот же ролик три раза подряд, и человеку кажется,
// что он всего один. Остаток мешка живёт в localStorage, поэтому порядок не
// сбрасывается при перезагрузке страницы.
function pickFromBag(lang: string): number {
  const n = HAVE[lang] || 1;
  const key = 'aifa-welcome-bag-' + lang;
  let bag: number[] = [];
  try {
    const raw = localStorage.getItem(key);
    if (raw) bag = JSON.parse(raw).filter((x: unknown) => typeof x === 'number' && x >= 1 && x <= n);
  } catch { /* приватный режим или испорченное значение — просто начнём заново */ }
  if (!bag.length) {
    bag = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  }
  const pick = bag.pop() as number;
  try { localStorage.setItem(key, JSON.stringify(bag)); } catch { /* не критично */ }
  return pick;
}

// Раздача роликов — тот же бесплатный воркер, что отдаёт музыку радио.
//
// Через переадресацию Vercel (/aifa-welcome/...) не заработало: её пограничный
// кеш не различает запросы с заголовком Range, и после одного запроса куска
// всем начинал отдаваться «полный» файл в 1024 байта. Видео при этом не
// ругается — просто вечно грузится. Прямой адрес разрешён политикой media-src
// на всех четырёх сайтах, так что чужим доменом он здесь не считается.
const WELCOME_CDN = 'https://radiocode-audio.codeeternal.workers.dev/aifa/welcome';

/** Адрес ролика: язык страницы + номер из перемешанного мешка. */
function videoSrc(): string {
  const lang = currentLang();
  const n = String(pickFromBag(lang)).padStart(2, '0');
  return `${WELCOME_CDN}/aifa-welcome-${lang}-${n}.mp4`;
}

/** Сколько секунд с конца зацикливается как «дыхание». */
const LOOP_TAIL_SEC = 6;

// ── НАСТРОЕНИЯ ──────────────────────────────────────────────────────────────
//
// Кроме приветствий у AIfa есть 45 роликов на десять настроений: радость,
// спокойствие, тепло, удивление, гордость, сострадание, любопытство,
// размышление, поддержка, благодарность. Все без слов, губы сомкнуты, надписей
// в кадре нет — поэтому один и тот же ролик подходит любому языку.
//
// Показываются они так: страница шлёт событие `aifa-mood` с названием
// настроения, AIfa проигрывает ролик один раз и возвращается к дыханию. Никаких
// обращений к модели ради выбора — настроение определяет тот, кто шлёт событие.
const MOOD_CDN = 'https://radiocode-audio.codeeternal.workers.dev/aifa/emotions';

/** Сколько вариантов лежит на раздаче по каждому настроению. */
const MOODS: Record<string, number> = {
  joy: 4, calm: 5, warmth: 5, surprise: 4, pride: 4,
  compassion: 4, curiosity: 4, thinking: 4, encouragement: 5, gratitude: 6,
};

/** Адрес ролика настроения: случайный вариант из имеющихся. */
function moodSrc(mood: string): string | null {
  const n = MOODS[mood];
  if (!n) return null;
  return `${MOOD_CDN}/${mood}-${Math.floor(Math.random() * n) + 1}.mp4`;
}

/**
 * Показать настроение. Зовётся откуда угодно на странице:
 *   window.dispatchEvent(new CustomEvent('aifa-mood', { detail: 'joy' }))
 * либо через готовую обёртку ниже.
 */
export function showAifaMood(mood: string): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('aifa-mood', { detail: mood }));
}

import "./AifaAvatar.css";

export default function AifaAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ролик выбирается ОДИН раз за открытие кабинета: если считать его при каждой
  // перерисовке, видео дёргалось бы на середине фразы.
  const srcRef = useRef<string>('');
  if (!srcRef.current && typeof window !== 'undefined') srcRef.current = videoSrc();
  const [show, setShow] = useState(false);
  // Это ТОЛЬКО подпись на кнопке. Самим звуком управляем напрямую через ref.
  //
  // Здесь была причина, по которой AIfa молча висела в воздухе: значение
  // передавалось в разметку как muted={muted}. React считал себя хозяином
  // свойства и при каждой перерисовке возвращал его обратно — прямо посреди
  // запуска. Браузер видел смену свойства во время play() и отменял
  // воспроизведение. Ролик замирал на первом кадре, звука не было.
  const [soundOn, setSoundOn] = useState(false);
  // Не «висим в пустоте»: если ролик не пришёл, показываем спокойную надпись
  // вместо чёрного прямоугольника. Молчаливая чернота — худший исход: человек
  // не понимает, сломалось у него или у нас.
  const [stalled, setStalled] = useState(false);

  // Решение «показывать ли» принимается на клиенте и пересматривается при resize.
  useEffect(() => {
    const decide = () => {
      const wide = window.matchMedia('(min-width: 900px)').matches;
      const lite = document.documentElement.classList.contains('perf-lite')
        || document.documentElement.classList.contains('perf-tv');
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      setShow(wide && !lite && !calm && !coarse);
    };
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;

    // ── ДВИЖЕНИЕ ГАРАНТИРОВАНО ────────────────────────────────────────────────
    // Беззвучный автозапуск разрешён всеми браузерами без исключения. Поэтому
    // ролик стартует беззвучно и с начала — приветствие видно всегда, даже если
    // звук не дадут. Никаких условий, никаких флагов «уже здоровались»: человек
    // открыл кабинет — AIfa к нему прилетела.
    v.muted = true;
    v.playsInline = true;
    const kick = () => { void v.play().catch(() => {}); };
    kick();
    v.addEventListener('loadedmetadata', kick, { once: true });
    v.addEventListener('canplay', kick, { once: true });

    // ── ЗВУК: сразу, если браузер разрешит ────────────────────────────────────
    // В кабинет попадают кликом, значит право на звук у страницы обычно уже
    // есть. Пробуем включить немедленно и не трогаем при этом позицию ролика —
    // приветствие и так идёт с самого начала.
    let soundTried = false;
    const enableSound = async (): Promise<boolean> => {
      if (v.muted === false) return true;
      try {
        v.muted = false;
        await v.play();
        if (v.muted) throw new Error('браузер оставил звук выключенным');
        setSoundOn(true);
        return true;
      } catch {
        v.muted = true;
        setSoundOn(false);
        // Отказ в звуке НЕ должен останавливать движение.
        void v.play().catch(() => {});
        return false;
      }
    };

    const firstTry = window.setTimeout(() => { soundTried = true; void enableSound(); }, 120);

    // Если сразу не дали — включаем на первое действие человека.
    // Прокрутки здесь нет намеренно: колесо не даёт браузеру права на звук.
    const onGesture = () => {
      void enableSound().then((ok) => { if (ok) offGesture(); });
    };
    const offGesture = () => {
      document.removeEventListener('pointerdown', onGesture);
      document.removeEventListener('keydown', onGesture);
      document.removeEventListener('touchstart', onGesture);
    };
    document.addEventListener('pointerdown', onGesture, { passive: true });
    document.addEventListener('keydown', onGesture);
    document.addEventListener('touchstart', onGesture, { passive: true });

    // ── ДЫХАНИЕ ───────────────────────────────────────────────────────────────
    // Перед самым концом бесшовно возвращаемся к началу хвоста. Упреждающе, а
    // не по событию окончания: иначе на стыке заметен рывок.
    // Пока проигрывается настроение, дыхание молчит: иначе оно перемотало бы
    // ролик настроения на «хвост» и оборвало его на середине движения.
    let moodBusy = false;
    const onTime = () => {
      if (moodBusy) return;
      const d = v.duration;
      if (!d || Number.isNaN(d)) return;
      if (v.currentTime >= d - 0.15) {
        v.currentTime = Math.max(0, d - LOOP_TAIL_SEC);
        void v.play().catch(() => {});
      }
    };
    v.addEventListener('timeupdate', onTime);
    // Страховка на случай, если событие окончания всё же дошло раньше.
    const onEnded = () => {
      if (moodBusy) return;
      const d = v.duration || 0;
      v.currentTime = Math.max(0, d - LOOP_TAIL_SEC);
      void v.play().catch(() => {});
    };
    v.addEventListener('ended', onEnded);

    // Вкладку свернули — незачем декодировать кадры впустую.
    const onVis = () => { if (document.hidden) v.pause(); else void v.play().catch(() => {}); };
    document.addEventListener('visibilitychange', onVis);

    // ── СТОРОЖ ────────────────────────────────────────────────────────────────
    // Раз в две секунды проверяем, что AIfa действительно жива. Ролик может
    // встать по причинам вне нашего кода: энергосбережение ноутбука, сбой
    // декодера, отмена воспроизведения браузером. Раньше он в таком случае
    // оставался стоять навсегда — и это выглядело как поломка.
    // Если за восемь секунд не пришло ни байта — считаем, что ролик не
    // загрузился, и говорим об этом прямо.
    const stallWatch = window.setTimeout(() => {
      if (v.readyState < 1) setStalled(true);
    }, 8000);
    const onLoaded = () => setStalled(false);
    v.addEventListener('loadeddata', onLoaded);

    const keepAlive = window.setInterval(() => {
      if (document.hidden) return;
      if (!v.paused) return;
      if (v.readyState < 2) return;
      void v.play().catch(() => {
        // Совсем не даёт играть со звуком — возвращаемся к беззвучному.
        if (!v.muted) { v.muted = true; setSoundOn(false); void v.play().catch(() => {}); }
      });
    }, 2000);

    // ── НАСТРОЕНИЕ ────────────────────────────────────────────────────────────
    // Ролик настроения проигрывается ОДИН раз, потом AIfa возвращается к своему
    // приветствию и дальше дышит как обычно.
    //
    // Почему запоминаем адрес приветствия, а не выбираем новый: приветствие
    // берётся из «перемешанного мешка» ровно один раз за открытие кабинета.
    // Взять новое — значило бы съесть ещё один ролик из мешка и услышать второе
    // «здравствуй» посреди разговора.
    //
    // Настроения без звука: они выражаются движением, и внезапный звук посреди
    // чтения ответа только мешал бы.
    const onMood = (e: Event) => {
      const mood = String((e as CustomEvent).detail || '');
      const src = moodSrc(mood);
      if (!src || moodBusy) return;
      const welcomeSrc = srcRef.current;
      const wasMuted = v.muted;
      moodBusy = true;

      const backToWelcome = () => {
        v.removeEventListener('ended', backToWelcome);
        v.loop = false;
        v.src = welcomeSrc;
        v.muted = wasMuted;
        // Возвращаемся сразу в хвост: повторять приветствие целиком незачем.
        const resume = () => {
          const d = v.duration;
          if (d && !Number.isNaN(d)) v.currentTime = Math.max(0, d - LOOP_TAIL_SEC);
          void v.play().catch(() => {});
        };
        v.addEventListener('loadedmetadata', resume, { once: true });
        void v.play().catch(() => {});
        moodBusy = false;
      };

      v.muted = true;               // настроение всегда молча
      v.src = src;
      v.addEventListener('ended', backToWelcome);
      void v.play().catch(() => { backToWelcome(); });
      // Страховка: если ролик не пришёл за десять секунд — не зависаем в нём.
      window.setTimeout(() => { if (moodBusy) backToWelcome(); }, 10000);
    };
    window.addEventListener('aifa-mood', onMood);

    return () => {
      window.clearTimeout(firstTry);
      window.clearTimeout(stallWatch);
      window.clearInterval(keepAlive);
      v.removeEventListener('loadeddata', onLoaded);
      offGesture();
      v.removeEventListener('loadedmetadata', kick);
      v.removeEventListener('canplay', kick);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
      window.removeEventListener('aifa-mood', onMood);
      document.removeEventListener('visibilitychange', onVis);
      void soundTried;
    };
  }, [show]);

  return (
    <>
      {/* Оформление переехало в AifaAvatar.css: встроенный блок <style>
          требовал разрешать любые встроенные стили. */}
      {show && (
        <div className="cab-aifa-figure">
          {/* muted и autoPlay стоят в самой разметке и БОЛЬШЕ НЕ ЗАВИСЯТ от
              состояния React: иначе перерисовка гасила воспроизведение.
              Звук включается кодом через ref, а состояние ниже только рисует
              подпись на кнопке. */}
          <video
            ref={videoRef}
            src={srcRef.current || undefined}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-label="AIfa"
          />
          <button
            type="button"
            className="cab-aifa-sound"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              const next = !soundOn;
              v.muted = !next;
              setSoundOn(next);
              void v.play().catch(() => {});
            }}
            title={soundOn ? 'Выключить звук' : 'Включить звук'}
            aria-label={soundOn ? 'Выключить звук' : 'Включить звук'}
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
          {stalled && (
            <div className="cab-aifa-stalled">
              AIfa рядом.<br />Видеообраз не загрузился — обновите страницу.
            </div>
          )}
          <div className="cab-aifa-name">AIfa</div>
        </div>
      )}
    </>
  );
}
