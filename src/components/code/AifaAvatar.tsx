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

    // Беззвучный автозапуск разрешён без действия пользователя — со звуком
    // браузер бы отказал, поэтому звук включается кнопкой.
    const start = () => { void v.play().catch(() => {}); };
    v.addEventListener('loadedmetadata', start, { once: true });

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

    return () => {
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
