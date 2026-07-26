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

const CDN = (process.env.NEXT_PUBLIC_AUDIO_CDN || '').replace(/\/$/, '');
const VIDEO_SRC = `${CDN}/aifa-video/intro-v1.mp4`;

/** Сколько секунд с конца зацикливается как «дыхание». */
const LOOP_TAIL_SEC = 6;

const STYLE = `
.cab-aifa-stage{display:flex;gap:18px;align-items:stretch}
.cab-aifa-figure{flex:0 0 380px;min-width:300px;align-self:stretch;position:relative;border:1px solid rgba(0,240,255,0.16);border-radius:16px;overflow:hidden;min-height:560px;
  background:radial-gradient(120% 70% at 50% 4%, rgba(0,240,255,0.06), rgba(4,5,12,0) 62%),#04050c}
.cab-aifa-figure video{display:block;width:100%;height:100%;object-fit:cover}
.cab-aifa-figure .cab-aifa-name{position:absolute;bottom:10px;left:0;right:0;text-align:center;color:#4a90c0;font-size:11px;letter-spacing:3px;font-family:monospace;pointer-events:none;text-transform:uppercase;text-shadow:0 2px 12px rgba(0,0,0,.85)}
.cab-aifa-figure .cab-aifa-sound{position:absolute;top:10px;right:10px;width:34px;height:34px;border-radius:50%;border:1px solid rgba(0,240,255,.22);background:rgba(4,5,12,.55);color:#8fe9ff;font-size:14px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.cab-aifa-figure .cab-aifa-sound:hover{background:rgba(0,240,255,.12)}
.cab-aifa-chat{flex:1 1 auto;min-width:0}
@media (max-width:1180px){.cab-aifa-figure{flex:0 0 320px;min-height:480px}}
`;

export default function AifaAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(false);
  const [muted, setMuted] = useState(true);

  // Решение «показывать ли» принимается на клиенте и пересматривается при resize.
  useEffect(() => {
    const decide = () => {
      const wide = window.matchMedia('(min-width: 900px)').matches;
      const lite = document.documentElement.classList.contains('perf-lite')
        || document.documentElement.classList.contains('perf-tv');
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      setShow(Boolean(CDN) && wide && !lite && !calm && !coarse);
    };
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;

    // ПРИВЕТСТВИЕ СО ЗВУКОМ — сразу, а не «когда-нибудь».
    //
    // Что было не так раньше. В список «жестов человека» попала прокрутка
    // колесом, а она НЕ даёт браузеру права включить звук. Колесо срабатывало,
    // флаг «разблокировано» вставал, слушатели снимались — и звук после этого
    // не включался вовсе. А если человек кликал позже, ролик перематывался в
    // начало прямо посреди речи: звук будто «включался рандомно».
    //
    // Как сделано теперь:
    //   1. Сначала честная попытка играть СО ЗВУКОМ. В кабинет человек попадает
    //      кликом, значит право на звук у страницы уже есть — и приветствие
    //      начинается мгновенно, без всяких «нажмите здесь».
    //   2. Если браузер всё же отказал — ролик крутит беззвучно ХВОСТ (спокойное
    //      дыхание), а НЕ приветствие. Так приветствие не «сгорает» немым.
    //   3. На первый настоящий жест (клик, касание, клавиша — без прокрутки)
    //      включаем звук и играем приветствие с начала.
    //   4. Слушатели снимаются ТОЛЬКО после фактически удавшегося звука.
    //      Раньше одна неудачная попытка убивала все следующие.
    const GREETED = 'aifa_greeted';
    const tailStart = () => {
      const d = v.duration;
      return d && !Number.isNaN(d) ? Math.max(0, d - LOOP_TAIL_SEC) : 0;
    };
    const alreadyGreeted = () => {
      try { return sessionStorage.getItem(GREETED) === '1'; } catch { return false; }
    };
    const markGreeted = () => {
      try { sessionStorage.setItem(GREETED, '1'); } catch { /* приватный режим */ }
    };

    /** Пытается включить звук и проиграть приветствие. true — получилось. */
    const playWithSound = async (fromStart: boolean): Promise<boolean> => {
      try {
        v.muted = false;
        if (fromStart) v.currentTime = 0;
        await v.play();
        // play() мог пройти, но браузер оставил звук выключенным.
        if (v.muted) throw new Error('still muted');
        setMuted(false);
        markGreeted();
        return true;
      } catch {
        v.muted = true;
        setMuted(true);
        return false;
      }
    };

    /** Запасной путь: беззвучное дыхание, приветствие бережём до звука. */
    const playSilentTail = () => {
      v.muted = true;
      setMuted(true);
      if (!alreadyGreeted()) v.currentTime = tailStart();
      void v.play().catch(() => {});
    };

    // Запуск строго ОДИН раз.
    //
    // Здесь была причина, по которой AIfa замирала: start() вешался на
    // loadedmetadata И вызывался сразу, если метаданные уже пришли из кэша.
    // Два play() подряд с перемоткой между ними браузер считает конфликтом и
    // отменяет воспроизведение — ролик просто вставал.
    let started = false;
    const start = async () => {
      if (started) return;
      started = true;
      if (alreadyGreeted()) {                 // приветствие уже слышали в этой сессии
        v.currentTime = tailStart();
        v.muted = false;
        setMuted(false);
        if (!(await v.play().then(() => true).catch(() => false))) playSilentTail();
        return;
      }
      if (!(await playWithSound(true))) playSilentTail();
    };
    v.addEventListener('loadedmetadata', start, { once: true });
    if (v.readyState >= 1) void start();      // метаданные уже пришли из кэша

    // Прокрутки здесь намеренно нет: колесо и скролл не дают права на звук.
    //
    // Вторая причина замирания была тут: обработчик срабатывал на КАЖДЫЙ клик
    // по кабинету и каждый раз перематывал ролик в начало. Человек работал —
    // AIfa дёргалась и вставала. Теперь: если звук уже включён, не трогаем
    // ничего; перематываем только один раз и только ради приветствия.
    const unlockSound = () => {
      if (!v.muted) { remove(); return; }      // звук уже есть — вмешиваться незачем
      void playWithSound(!alreadyGreeted()).then((ok) => {
        if (ok) { remove(); return; }
        // Звук не дали — это не повод останавливать движение.
        if (v.paused) void v.play().catch(() => {});
      });
    };
    const remove = () => {
      document.removeEventListener('pointerdown', unlockSound);
      document.removeEventListener('keydown', unlockSound);
      document.removeEventListener('touchstart', unlockSound);
    };
    document.addEventListener('pointerdown', unlockSound, { passive: true });
    document.addEventListener('keydown', unlockSound);
    document.addEventListener('touchstart', unlockSound, { passive: true });

    // Перед самым концом бесшовно возвращаемся к началу «дыхания». Делаем это
    // упреждающе, а не по событию окончания: иначе на стыке заметен рывок.
    const onTime = () => {
      const d = v.duration;
      if (!d || Number.isNaN(d)) return;
      if (v.currentTime >= d - 0.12) {
        v.currentTime = Math.max(0, d - LOOP_TAIL_SEC);
        void v.play().catch(() => {});
      }
    };
    v.addEventListener('timeupdate', onTime);

    // Вкладку свернули — незачем декодировать кадры впустую.
    const onVis = () => { if (document.hidden) v.pause(); else void v.play().catch(() => {}); };
    document.addEventListener('visibilitychange', onVis);

    // Сторож движения: раз в три секунды проверяем, что AIfa действительно
    // жива. Ролик может встать по причинам, которые от нас не зависят —
    // экономия энергии на ноутбуке, сбой декодера, отмена воспроизведения
    // браузером. Раньше он в таком случае оставался стоять навсегда, и это
    // выглядело как поломка. Теперь просто тихо продолжаем.
    const keepAlive = window.setInterval(() => {
      if (document.hidden) return;            // свёрнутую вкладку будить не нужно
      if (!v.paused) return;                  // всё в порядке, идёт
      if (v.readyState < 2) return;           // данных ещё нет — не мешаем загрузке
      void v.play().catch(() => {});
    }, 3000);

    return () => {
      remove();
      window.clearInterval(keepAlive);
      v.removeEventListener('loadedmetadata', start);
      v.removeEventListener('timeupdate', onTime);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [show]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {show && (
        <div className="cab-aifa-figure">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted={muted}
            playsInline
            preload="auto"
            aria-label="AIfa"
          />
          <button
            type="button"
            className="cab-aifa-sound"
            onClick={() => {
              const v = videoRef.current;
              const next = !muted;
              setMuted(next);
              if (v) { v.muted = next; if (!next) void v.play().catch(() => {}); }
            }}
            title={muted ? 'Включить звук' : 'Выключить звук'}
            aria-label={muted ? 'Включить звук' : 'Выключить звук'}
          >
            {muted ? '🔇' : '🔊'}
          </button>
          <div className="cab-aifa-name">AIfa</div>
        </div>
      )}
    </>
  );
}
