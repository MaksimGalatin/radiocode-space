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

export const CROSSFADE_SEC = 4;
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
        if (dur > 0 && !this.needNextFired && !this.crossing && dur - el.currentTime <= CROSSFADE_SEC + 0.2) {
          this.needNextFired = true;
          this.cb.onNeedNext?.();
        }
      });
      el.addEventListener('ended', () => { if (idx === this.active && !this.crossing) this.cb.onEnded?.(); });
      el.addEventListener('waiting', () => { if (idx === this.active) this.cb.onLoading?.(true); });
      el.addEventListener('canplay', () => { if (idx === this.active) this.cb.onLoading?.(false); });
      el.addEventListener('playing', () => { if (idx === this.active) { this.cb.onLoading?.(false); this.cb.onPlayState?.(true); } });
      el.addEventListener('error', () => { if (idx === this.active) this.handleFailure(); });
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
    deck.el.src = audioUrl(track.url);
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
    to.el.src = audioUrl(track.url);
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
    this.decks[this.active]?.el.pause();
    this.cb.onPlayState?.(false);
  }
  seek(t: number) {
    const el = this.decks[this.active]?.el;
    if (el && isFinite(t)) { try { el.currentTime = t; } catch { /* noop */ } }
  }
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

  // No real analyser in direct mode — the React layer supplies synthetic motion.
  getFrequencyData(_arr: Uint8Array) { return false; }
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
