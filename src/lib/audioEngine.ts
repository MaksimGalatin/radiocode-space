// RadioCode.Space audio engine — direct-playback (sound-first) design.
//
// Plays two <audio> decks DIRECTLY (element.play()), with NO Web Audio graph.
// Rationale: routing an element through an AudioContext (createMediaElementSource)
// makes playback depend on the context reaching 'running'. On some browsers the
// context stays 'suspended' (autoplay policy / resume race) even after a click →
// the element is captured by a silent graph → "shows playing but no sound / hangs".
// Direct element playback has no such dependency, so audio always plays.
//
// Trade-off: no real-time analyser → the visualiser is fed synthetic motion by the
// React layer while playing. Crossfades are done with element.volume ramps.

import { audioUrl } from '@/lib/audioCdn';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
  gain?: number; // loudness-normalisation factor (0..1), attenuation-only
}

export interface EngineCallbacks {
  onTime?: (cur: number, dur: number) => void;
  onLoading?: (loading: boolean) => void;
  onPlayState?: (playing: boolean) => void;
  onEnded?: () => void;
  onNeedNext?: () => void;
  onSkip?: () => void;
}


/**
 * Наш аудио-CDN отдаёт CORS-заголовки, поэтому с него поток можно пометить как
 * «чистый» и снимать спектр. Для любых других адресов атрибут НЕ ставим: без
 * CORS он молча блокирует воспроизведение — ровно тот баг, из-за которого
 * когда-то пропадал звук.
 */
const CDN_ORIGIN = (process.env.NEXT_PUBLIC_AUDIO_CDN || '').replace(/\/$/, '');
function applyCors(el: HTMLAudioElement, url: string) {
  if (CDN_ORIGIN && url.startsWith(CDN_ORIGIN)) {
    if (el.crossOrigin !== 'anonymous') el.crossOrigin = 'anonymous';
  } else if (el.crossOrigin) {
    el.removeAttribute('crossorigin');
  }
}

/**
 * ДЛИНА ПЕРЕХОДА МЕЖДУ ТРЕКАМИ.
 *
 * Четыре секунды — сколько два трека звучат ОДНОВРЕМЕННО. Для эмбиента и
 * электроники это незаметно и красиво: хвост одного растворяется в начале
 * другого. Для песен с голосом — нет: четыре секунды наложенного вокала
 * слышатся как «играют сразу два трека», и именно на это указал Архитектор
 * 18.08.2026, когда появились станции CODE Stories и CODE Spectrum.
 *
 * Старые четыре станции сохраняют прежние 4 секунды — их звучание не меняется.
 * Песенным даём 1.2 секунды: стык остаётся мягким, но наложения вокала не
 * слышно.
 */
export const CROSSFADE_SEC = 4;
export const CROSSFADE_SEC_VOCAL = 1.2;
/** Станции, где поют: там длинный кроссфейд накладывает два голоса. */
export const VOCAL_STATIONS = new Set(['code-stories', 'code-spectrum']);
export function crossfadeFor(stationId: string | undefined): number {
  return stationId && VOCAL_STATIONS.has(stationId) ? CROSSFADE_SEC_VOCAL : CROSSFADE_SEC;
}
const MAX_RETRIES = 3;
const STALL_SECONDS = 12;
const RAMP_STEP_MS = 60;

function clamp(x: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, x)); }

interface Deck { el: HTMLAudioElement; ramp: ReturnType<typeof setInterval> | null; }

class RadioAudioEngine {
  private decks: Deck[] = [];
  private active = 0;
  private userVolume = 0.75;
  private muted = false;
  private masterFactor = 1; // used by the sleep-timer fade
  private currentGain = 1;  // loudness-normalisation factor of the current track (0..1)
  private cb: EngineCallbacks = {};
  private currentTrackId = '';
  private wantPlaying = false;
  private retries = 0;
  private recoverTries = 0;
  private crossing = false;
  private needNextFired = false;
  private lastProgressAt = 0;
  private lastTime = 0;
  private watchTimer: ReturnType<typeof setInterval> | null = null;
  private started = false;
  // Анализатор спектра. Он НЕ участвует в воспроизведении: звук по-прежнему идёт
  // напрямую из <audio>, а спектр снимается с копии потока (captureStream).
  // Поэтому даже если контекст не запустится — музыка всё равно играет.
  private actx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private tap: MediaStreamAudioSourceNode | null = null;
  private tappedEl: HTMLAudioElement | null = null;

  init(cb: EngineCallbacks) {
    this.cb = cb;
    if (this.started || typeof window === 'undefined') return;
    this.started = true;
    for (let i = 0; i < 2; i++) {
      const el = new Audio();
      el.preload = 'auto';
      // NOTE: no crossOrigin — direct playback does not need CORS, and requiring it
      // (crossOrigin='anonymous') blocks the media element when the CDN omits the
      // Access-Control-Allow-Origin header, causing a silent hang.
      this.decks.push({ el, ramp: null });
    }
    this.wireEvents();
    this.watchTimer = setInterval(() => this.watchdog(), 2000);
  }

  // No Web Audio context to resume — kept for API compatibility.
  ensureRunning() { /* no-op in direct mode */ }
  isWebAudio() { return false; }

  private deckVolume(deck: Deck, factor = 1) {
    const v = this.muted ? 0 : clamp(this.userVolume * this.masterFactor * this.currentGain * factor, 0, 1);
    try { deck.el.volume = v; } catch { /* noop */ }
  }

  private clearRamp(deck: Deck) { if (deck.ramp) { clearInterval(deck.ramp); deck.ramp = null; } }

  private wireEvents() {
    this.decks.forEach((deck, idx) => {
      const el = deck.el;
      el.addEventListener('timeupdate', () => {
        if (idx !== this.active) return;
        this.lastTime = el.currentTime;
        this.lastProgressAt = Date.now();
        this.retries = 0;
        this.recoverTries = 0;
        this.cb.onTime?.(el.currentTime, el.duration || 0);
        const dur = el.duration || 0;
        if (dur > 0 && !this.needNextFired && !this.crossing && dur - el.currentTime <= this.crossfadeSec + 0.2) {
          this.needNextFired = true;
          this.cb.onNeedNext?.();
        }
      });
      el.addEventListener('ended', () => { if (idx === this.active && !this.crossing) this.cb.onEnded?.(); });
      el.addEventListener('waiting', () => { if (idx === this.active) this.cb.onLoading?.(true); });
      el.addEventListener('canplay', () => { if (idx === this.active) this.cb.onLoading?.(false); });
      el.addEventListener('playing', () => {
        if (idx !== this.active) return;
        this.cb.onLoading?.(false);
        this.cb.onPlayState?.(true);
        // Спектр подключаем ТОЛЬКО когда звук уже реально пошёл — так мы
        // не можем помешать воспроизведению, даже если контекст не поднимется.
        this.attachAnalyser();
      });
      el.addEventListener('error', () => {
        if (idx !== this.active) return;
        // Страховка: если файл не пошёл, а на элементе стоит crossOrigin, снимаем
        // атрибут и пробуем ещё раз. Так даже пропажа CORS на стороне CDN не
        // оставит слушателя без звука — потеряется только спектр.
        if (el.crossOrigin) {
          const src = el.src;
          el.removeAttribute('crossorigin');
          this.analyser = null;
          this.tappedEl = null;
          try { el.src = src; el.load(); if (this.wantPlaying) void el.play().catch(() => {}); return; } catch { /* дальше обычная обработка */ }
        }
        this.handleFailure();
      });
      el.addEventListener('stalled', () => { if (idx === this.active) this.cb.onLoading?.(true); });
    });
  }

  private safePlay(deck: Deck) {
    const el = deck.el;
    let p: Promise<void> | undefined;
    try { p = el.play(); } catch { p = undefined; }
    if (p && typeof p.catch === 'function') {
      p.then(() => { this.recoverTries = 0; }).catch(() => {
        const retry = () => { el.removeEventListener('canplay', retry); if (this.wantPlaying && el.paused) { try { el.play().catch(() => {}); } catch { /* noop */ } } };
        el.addEventListener('canplay', retry);
      });
    }
  }

  private watchdog() {
    const deck = this.decks[this.active];
    const el = deck?.el;
    if (!el) return;
    // Копия потока появляется не сразу после старта (сначала буферизация), поэтому
    // повторяем попытку снять спектр, пока звук действительно идёт.
    if (!this.analyser && !el.paused && el.currentTime > 0) this.attachAnalyser();
    if (this.wantPlaying && el.paused) {
      this.recoverTries++;
      this.safePlay(deck!);
      if (this.recoverTries >= 4) { this.recoverTries = 0; this.handleFailure(); }
      return;
    }
    if (el.paused) return;
    this.recoverTries = 0;
    const stalledFor = (Date.now() - this.lastProgressAt) / 1000;
    if (this.lastProgressAt && stalledFor > STALL_SECONDS) this.handleFailure();
  }

  private handleFailure() {
    const deck = this.decks[this.active];
    if (!deck) return;
    if (this.retries < MAX_RETRIES) {
      this.retries++;
      const backoff = 400 * Math.pow(2, this.retries - 1);
      const resumeAt = this.lastTime;
      setTimeout(() => {
        try {
          deck.el.load();
          const seek = () => {
            try { if (resumeAt > 0 && resumeAt < (deck.el.duration || Infinity)) deck.el.currentTime = resumeAt; } catch { /* noop */ }
            deck.el.removeEventListener('loadedmetadata', seek);
          };
          deck.el.addEventListener('loadedmetadata', seek);
          this.wantPlaying = true;
          this.safePlay(deck);
        } catch { /* noop */ }
      }, backoff);
    } else {
      this.retries = 0;
      this.cb.onSkip?.();
    }
  }

  loadedTrackId() { return this.currentTrackId; }
  getCurrentTime() { return this.decks[this.active]?.el.currentTime || 0; }

  /** Hard cut: load + play on the active deck, optionally from `startAt` seconds. */
  playNow(track: Track, startAt = 0) {
    const deck = this.decks[this.active] || this.decks[0];
    if (!deck) return;
    this.clearRamp(deck);
    this.currentTrackId = track.id;
    this.currentGain = clamp(track.gain ?? 1, 0.1, 1);
    this.retries = 0;
    this.recoverTries = 0;
    this.needNextFired = false;
    this.crossing = false;
    this.lastProgressAt = Date.now();
    this.lastTime = startAt || 0;
    this.wantPlaying = true;
    this.cb.onLoading?.(true);
    {
      const u = audioUrl(track.url);
      applyCors(deck.el, u);
      deck.el.src = u;
    }
    try { deck.el.load(); } catch { /* noop */ }
    this.deckVolume(deck);
    if (startAt > 0) {
      const seek = () => {
        try { if (startAt < (deck.el.duration || Infinity)) deck.el.currentTime = startAt; } catch { /* noop */ }
        deck.el.removeEventListener('loadedmetadata', seek);
      };
      deck.el.addEventListener('loadedmetadata', seek);
    }
    this.safePlay(deck);
  }

  /** Gapless crossfade to the next track on the idle deck via volume ramps. */
  /**
   * Длина перехода, которой пользуется СЧЁТЧИК запуска следующего трека.
   * Держим её здесь, а не берём константу: момент запроса и длительность
   * наложения обязаны совпадать. Если запрос идёт за 4 с до конца, а наложение
   * длится 1.2 с, старый трек продолжает звучать все 4 с рядом с новым — то
   * есть «короткий кроссфейд» на слух станет длиннее прежнего.
   */
  crossfadeSec = CROSSFADE_SEC;
  setCrossfadeSec(sec: number) { this.crossfadeSec = Math.max(0.2, Math.min(8, sec)); }

  crossfadeTo(track: Track, ms: number) {
    const from = this.decks[this.active];
    const to = this.decks[1 - this.active];
    if (!from || !to) { this.playNow(track); return; }
    this.clearRamp(from);
    this.clearRamp(to);
    this.crossing = true;
    this.currentTrackId = track.id;
    this.currentGain = clamp(track.gain ?? 1, 0.1, 1);
    this.retries = 0;
    this.recoverTries = 0;
    this.needNextFired = false;
    this.wantPlaying = true;
    {
      const u = audioUrl(track.url);
      applyCors(to.el, u);
      to.el.src = u;
    }
    try { to.el.volume = 0; } catch { /* noop */ }
    this.safePlay(to);

    const dur = Math.max(200, ms);
    const steps = Math.max(1, Math.round(dur / RAMP_STEP_MS));
    let i = 0;
    const target = this.muted ? 0 : clamp(this.userVolume * this.masterFactor * this.currentGain, 0, 1);
    to.ramp = setInterval(() => {
      i++;
      const k = i / steps;
      try { to.el.volume = clamp(target * k, 0, 1); } catch { /* noop */ }
      try { from.el.volume = clamp(target * (1 - k), 0, 1); } catch { /* noop */ }
      if (i >= steps) {
        this.clearRamp(to);
        try { from.el.pause(); } catch { /* noop */ }
        this.deckVolume(to);
        this.crossing = false;
        this.lastProgressAt = Date.now();
      }
    }, RAMP_STEP_MS);
    this.active = 1 - this.active;
  }

  resume() {
    this.wantPlaying = true;
    this.recoverTries = 0;
    const deck = this.decks[this.active];
    if (deck) { this.deckVolume(deck); this.safePlay(deck); }
    this.cb.onPlayState?.(true);
  }
  pause() {
    this.wantPlaying = false;
    // Pause BOTH decks and kill any running ramp: during the ~4s auto-crossfade
    // the outgoing deck kept playing, so Pause left audible sound behind.
    this.decks.forEach((d) => {
      if (!d) return;
      this.clearRamp(d);
      try { d.el.pause(); } catch { /* noop */ }
    });
    this.crossing = false;
    this.cb.onPlayState?.(false);
  }
  seek(t: number) {
    const el = this.decks[this.active]?.el;
    if (el && isFinite(t)) { try { el.currentTime = t; } catch { /* noop */ } }
  }
  // NB: this mirrors the store (setVolume sets isMuted = vol === 0), so moving
  // the slider above zero also unmutes. Callers that restore a saved session
  // must therefore apply setMuted() AFTER setVolume() — see restoreState.
  setVolume(v: number) { this.userVolume = clamp(v, 0, 1); this.muted = v === 0; this.applyVolume(); }
  setMuted(m: boolean) { this.muted = m; this.applyVolume(); }
  private applyVolume() { const d = this.decks[this.active]; if (d && !d.ramp) this.deckVolume(d); }

  /** Sleep-timer fade of the overall level. */
  fadeMaster(to: number, ms: number, then?: () => void) {
    const steps = Math.max(1, Math.round(ms / 100));
    let i = 0;
    const from = this.masterFactor;
    const iv = setInterval(() => {
      i++;
      this.masterFactor = clamp(from + (to - from) * (i / steps), 0, 1);
      this.applyVolume();
      if (i >= steps) { clearInterval(iv); then?.(); }
    }, 100);
  }
  restoreMaster() { this.masterFactor = 1; this.applyVolume(); }

  /**
   * Пробует снять спектр с активной деки. Забираем КОПИЮ звукового потока
   * (captureStream) и заводим её в анализатор, ничего не подключая к выходу —
   * вывод остаётся за самим элементом. Если браузер этого не умеет (Safari)
   * или что-то пошло не так, тихо остаёмся на синтетической анимации.
   */
  private attachAnalyser() {
    const el = this.decks[this.active]?.el;
    if (!el || this.tappedEl === el) return;
    const cap = (el as HTMLAudioElement & { captureStream?: () => MediaStream }).captureStream;
    if (typeof cap !== 'function') return;
    try {
      const AC = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext });
      const Ctor = AC.AudioContext || AC.webkitAudioContext;
      if (!Ctor) return;
      if (!this.actx) this.actx = new Ctor();
      if (this.actx.state === 'suspended') void this.actx.resume().catch(() => {});
      const stream = cap.call(el);
      if (!stream || stream.getAudioTracks().length === 0) return;
      try { this.tap?.disconnect(); } catch { /* noop */ }
      this.tap = this.actx.createMediaStreamSource(stream);
      if (!this.analyser) {
        this.analyser = this.actx.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.smoothingTimeConstant = 0.8;
      }
      this.tap.connect(this.analyser);   // к destination НЕ подключаем — звук уже идёт
      this.tappedEl = el;
    } catch {
      this.analyser = null;
      this.tappedEl = null;
    }
  }

  /** Реальный спектр, если анализатор удалось подключить. Иначе false. */
  getFrequencyData(arr: Uint8Array) {
    if (!this.analyser) return false;
    try {
      const buf = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i];
      if (sum === 0) return false;                 // тишина в кране — пусть рисуется синтетика
      const n = Math.min(arr.length, buf.length);
      for (let i = 0; i < arr.length; i++) arr[i] = buf[Math.floor((i / arr.length) * n)];
      return true;
    } catch {
      return false;
    }
  }
  isActuallyPlaying() { const el = this.decks[this.active]?.el; return !!el && !el.paused && !el.ended; }
  debug() {
    const el = this.decks[this.active]?.el;
    return { id: this.currentTrackId, gain: this.currentGain, vol: el ? +el.volume.toFixed(3) : null, userVol: this.userVolume, playing: this.isActuallyPlaying() };
  }
}

let engine: RadioAudioEngine | null = null;
export function getEngine(): RadioAudioEngine {
  if (!engine) {
    engine = new RadioAudioEngine();
    if (typeof window !== 'undefined') {
      (window as unknown as { __radioEngine?: RadioAudioEngine }).__radioEngine = engine;
    }
  }
  return engine;
}
