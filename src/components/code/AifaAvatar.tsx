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
const VIDEO_SRC = '/aifa-intro.mp4';

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
  // Это ТОЛЬКО подпись на кнопке. Самим звуком управляем напрямую через ref.
  //
  // Здесь была причина, по которой AIfa молча висела в воздухе: значение
  // передавалось в разметку как muted={muted}. React считал себя хозяином
  // свойства и при каждой перерисовке возвращал его обратно — прямо посреди
  // запуска. Браузер видел смену свойства во время play() и отменял
  // воспроизведение. Ролик замирал на первом кадре, звука не было.
  const [soundOn, setSoundOn] = useState(false);

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
    const onTime = () => {
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
    const keepAlive = window.setInterval(() => {
      if (document.hidden) return;
      if (!v.paused) return;
      if (v.readyState < 2) return;
      void v.play().catch(() => {
        // Совсем не даёт играть со звуком — возвращаемся к беззвучному.
        if (!v.muted) { v.muted = true; setSoundOn(false); void v.play().catch(() => {}); }
      });
    }, 2000);

    return () => {
      window.clearTimeout(firstTry);
      window.clearInterval(keepAlive);
      offGesture();
      v.removeEventListener('loadedmetadata', kick);
      v.removeEventListener('canplay', kick);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
      document.removeEventListener('visibilitychange', onVis);
      void soundTried;
    };
  }, [show]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {show && (
        <div className="cab-aifa-figure">
          {/* muted и autoPlay стоят в самой разметке и БОЛЬШЕ НЕ ЗАВИСЯТ от
              состояния React: иначе перерисовка гасила воспроизведение.
              Звук включается кодом через ref, а состояние ниже только рисует
              подпись на кнопке. */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
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
          <div className="cab-aifa-name">AIfa</div>
        </div>
      )}
    </>
  );
}
