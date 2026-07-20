// RadioCode.Space audio engine — robust dual-deck Web Audio pipeline.
//
// Fixes the "shows playing but no sound" failure (AudioContext left suspended when
// resume() is called outside a user gesture) and adds broadcast-grade behaviour:
//   • loudness auto-normalisation (AGC) toward a target, gain cached per track
//   • gapless crossfades between two <audio> decks
//   • resilience: retry-with-backoff then skip on error / stall / 404
//   • falls back to plain element playback if Web Audio is unavailable (sound first)
//
// The engine is imperative and framework-agnostic; the store/React layer drives it.

import { audioUrl } from '@/lib/audioCdn';

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
}

export interface EngineCallbacks {
  onTime?: (cur: number, dur: number) => void;
  onLoading?: (loading: boolean) => void;
  onPlayState?: (playing: boolean) => void;
  onEnded?: () => void;      // track finished with no crossfade in progress
  onNeedNext?: () => void;   // approaching end — request the next track for crossfade
  onSkip?: () => void;       // unrecoverable — advance to next track
}

const GAIN_KEY = 'radiocode:gain:v1';
const TARGET_RMS = 0.14;          // ~ -17 dBFS, comfortable steady loudness
const GAIN_MIN = 0.35;            // -9 dB
const GAIN_MAX = 2.5;             // +8 dB
const MAX_RETRIES = 3;
const STALL_SECONDS = 12;         // watchdog: playing but no progress for this long

interface Deck {
  el: HTMLAudioElement;
  source?: MediaElementAudioSourceNode;
  fade?: GainNode;    // crossfade envelope 0..1
  norm?: GainNode;    // loudness gain
  measure?: AnalyserNode;
}

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

class RadioAudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  private analyser: AnalyserNode | null = null;
  private decks: Deck[] = [];
  private active = 0;
  private webAudio = false;
  private userVolume = 0.75;
  private muted = false;

  private cb: EngineCallbacks = {};
  private gainCache: Record<string, number> = {};
  private currentTrackId = '';
  private retries = 0;
  private crossing = false;
  private needNextFired = false;
  private lastProgressAt = 0;
  private lastTime = 0;
  private agcTimer: ReturnType<typeof setInterval> | null = null;
  private watchTimer: ReturnType<typeof setInterval> | null = null;
  private started = false;

  init(cb: EngineCallbacks) {
    this.cb = cb;
    if (this.started || typeof window === 'undefined') return;
    this.started = true;
    try {
      this.gainCache = JSON.parse(localStorage.getItem(GAIN_KEY) || '{}') || {};
    } catch { this.gainCache = {}; }

    for (let i = 0; i < 2; i++) {
      const el = new Audio();
      el.crossOrigin = 'anonymous';
      el.preload = 'auto';
      const deck: Deck = { el };
      this.decks.push(deck);
    }
    this.wireEvents();
    this.watchTimer = setInterval(() => this.watchdog(), 2000);
  }

  /** Must be called from within a user gesture (click) so the context reaches 'running'. */
  ensureRunning() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) this.buildGraph();
      if (this.ctx && this.ctx.state !== 'running') this.ctx.resume().catch(() => {});
    } catch {
      this.webAudio = false; // fall back to plain playback
    }
  }

  private buildGraph() {
    const AC: typeof AudioContext =
      (window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) { this.webAudio = false; return; }
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = this.muted ? 0 : this.userVolume;
    const limiter = ctx.createDynamicsCompressor();
    // brick-wall-ish limiter to catch peaks after normalisation gain
    limiter.threshold.value = -1.5;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.003;
    limiter.release.value = 0.25;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;

    master.connect(limiter);
    limiter.connect(analyser);
    analyser.connect(ctx.destination);

    for (const deck of this.decks) {
      try {
        const source = ctx.createMediaElementSource(deck.el);
        const fade = ctx.createGain();
        const norm = ctx.createGain();
        const measure = ctx.createAnalyser();
        measure.fftSize = 1024;
        fade.gain.value = 0;
        norm.gain.value = 1;
        source.connect(fade);
        fade.connect(norm);
        norm.connect(master);
        source.connect(measure); // tap for loudness measurement (not to destination)
        deck.source = source;
        deck.fade = fade;
        deck.norm = norm;
        deck.measure = measure;
      } catch {
        // element already captured / unsupported — leave this deck as plain element
      }
    }
    this.ctx = ctx;
    this.master = master;
    this.limiter = limiter;
    this.analyser = analyser;
    this.webAudio = this.decks.every((d) => !!d.fade);
    if (this.webAudio && !this.agcTimer) {
      this.agcTimer = setInterval(() => this.agcTick(), 700);
    }
  }

  private wireEvents() {
    this.decks.forEach((deck, idx) => {
      const el = deck.el;
      el.addEventListener('timeupdate', () => {
        if (idx !== this.active) return;
        this.lastTime = el.currentTime;
        this.lastProgressAt = Date.now();
        this.retries = 0;
        this.cb.onTime?.(el.currentTime, el.duration || 0);
        const dur = el.duration || 0;
        if (dur > 0 && !this.needNextFired && !this.crossing && dur - el.currentTime <= CROSSFADE_SEC + 0.2) {
          this.needNextFired = true;
          this.cb.onNeedNext?.();
        }
      });
      el.addEventListener('ended', () => {
        if (idx !== this.active || this.crossing) return;
        this.cb.onEnded?.();
      });
      el.addEventListener('waiting', () => { if (idx === this.active) this.cb.onLoading?.(true); });
      el.addEventListener('canplay', () => { if (idx === this.active) this.cb.onLoading?.(false); });
      el.addEventListener('playing', () => {
        if (idx === this.active) { this.cb.onLoading?.(false); this.cb.onPlayState?.(true); }
      });
      el.addEventListener('error', () => { if (idx === this.active) this.handleFailure('error'); });
      el.addEventListener('stalled', () => { if (idx === this.active) this.cb.onLoading?.(true); });
    });
  }

  private watchdog() {
    const el = this.decks[this.active]?.el;
    if (!el || el.paused) return;
    const stalledFor = (Date.now() - this.lastProgressAt) / 1000;
    if (this.lastProgressAt && stalledFor > STALL_SECONDS) {
      this.handleFailure('stall');
    }
  }

  private handleFailure(reason: string) {
    const deck = this.decks[this.active];
    if (!deck) return;
    if (this.retries < MAX_RETRIES) {
      this.retries++;
      const backoff = 400 * Math.pow(2, this.retries - 1); // 400ms, 800ms, 1600ms
      const resumeAt = this.lastTime;
      setTimeout(() => {
        try {
          deck.el.load();
          const seek = () => {
            try { if (resumeAt > 0 && resumeAt < (deck.el.duration || Infinity)) deck.el.currentTime = resumeAt; } catch { /* noop */ }
            deck.el.removeEventListener('loadedmetadata', seek);
          };
          deck.el.addEventListener('loadedmetadata', seek);
          deck.el.play().catch(() => {});
        } catch { /* noop */ }
      }, backoff);
      void reason;
    } else {
      this.retries = 0;
      this.cb.onSkip?.(); // give up on this track, advance
    }
  }

  private agcTick() {
    if (!this.webAudio || this.crossing) return;
    const deck = this.decks[this.active];
    if (!deck?.measure || !deck.norm || !this.ctx || deck.el.paused) return;
    const buf = new Uint8Array(deck.measure.fftSize);
    deck.measure.getByteTimeDomainData(buf);
    let sum = 0;
    for (let i = 0; i < buf.length; i++) {
      const v = (buf[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / buf.length);
    if (rms < 0.003) return; // near-silence (intro/outro) — don't chase
    const desired = clamp(TARGET_RMS / rms, GAIN_MIN, GAIN_MAX);
    const cur = deck.norm.gain.value;
    // slow move toward desired to avoid pumping
    const next = cur + (desired - cur) * 0.15;
    try {
      deck.norm.gain.setTargetAtTime(next, this.ctx.currentTime, 0.4);
    } catch { deck.norm.gain.value = next; }
    if (this.currentTrackId) {
      this.gainCache[this.currentTrackId] = Number(next.toFixed(3));
      // throttle persistence
      if (Math.random() < 0.15) this.persistGains();
    }
  }

  private persistGains() {
    try { localStorage.setItem(GAIN_KEY, JSON.stringify(this.gainCache)); } catch { /* full */ }
  }

  private applyMaster() {
    const v = this.muted ? 0 : this.userVolume;
    if (this.webAudio && this.master && this.ctx) {
      try { this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02); return; } catch { /* noop */ }
    }
    // plain fallback: element volume
    this.decks.forEach((d) => { d.el.volume = v; });
  }

  private startTrackGain(deck: Deck) {
    if (!deck.norm) return;
    const cached = this.gainCache[this.currentTrackId];
    const g = typeof cached === 'number' ? clamp(cached, GAIN_MIN, GAIN_MAX) : 1;
    try { deck.norm.gain.value = g; } catch { /* noop */ }
  }

  loadedTrackId() { return this.currentTrackId; }

  /** Hard cut: load + play the track on the active deck, optionally starting at `startAt`s. */
  playNow(track: Track, startAt = 0) {
    this.ensureRunning();
    const deck = this.decks[this.active] || this.decks[0];
    if (!deck) return;
    this.currentTrackId = track.id;
    this.retries = 0;
    this.needNextFired = false;
    this.crossing = false;
    this.lastProgressAt = Date.now();
    this.lastTime = startAt || 0;
    this.cb.onLoading?.(true);
    this.startTrackGain(deck);
    if (deck.fade && this.ctx) {
      try {
        deck.fade.gain.cancelScheduledValues(this.ctx.currentTime);
        deck.fade.gain.setValueAtTime(1, this.ctx.currentTime);
      } catch { /* noop */ }
    }
    deck.el.src = audioUrl(track.url);
    if (!this.webAudio) deck.el.volume = this.muted ? 0 : this.userVolume;
    if (startAt > 0) {
      const seek = () => {
        try { if (startAt < (deck.el.duration || Infinity)) deck.el.currentTime = startAt; } catch { /* noop */ }
        deck.el.removeEventListener('loadedmetadata', seek);
      };
      deck.el.addEventListener('loadedmetadata', seek);
    }
    deck.el.play().catch(() => {});
  }

  /** Gapless crossfade to the next track on the idle deck. */
  crossfadeTo(track: Track, ms: number) {
    this.ensureRunning();
    if (!this.webAudio || !this.ctx) { this.playNow(track); return; }
    const from = this.decks[this.active];
    const to = this.decks[1 - this.active];
    if (!from || !to || !from.fade || !to.fade) { this.playNow(track); return; }
    this.crossing = true;
    this.currentTrackId = track.id;
    this.retries = 0;
    this.needNextFired = false;
    this.startTrackGain(to);
    to.el.src = audioUrl(track.url);
    const t0 = this.ctx.currentTime;
    const dur = Math.max(0.2, ms / 1000);
    try {
      to.fade.gain.cancelScheduledValues(t0);
      to.fade.gain.setValueAtTime(0.0001, t0);
      to.fade.gain.linearRampToValueAtTime(1, t0 + dur);
      from.fade!.gain.cancelScheduledValues(t0);
      from.fade!.gain.setValueAtTime(from.fade!.gain.value, t0);
      from.fade!.gain.linearRampToValueAtTime(0.0001, t0 + dur);
    } catch { /* noop */ }
    to.el.play().catch(() => {});
    this.active = 1 - this.active;
    window.setTimeout(() => {
      try { from.el.pause(); } catch { /* noop */ }
      this.crossing = false;
      this.lastProgressAt = Date.now();
    }, dur * 1000 + 120);
  }

  resume() {
    this.ensureRunning();
    this.decks[this.active]?.el.play().catch(() => {});
    this.cb.onPlayState?.(true);
  }
  pause() {
    this.decks[this.active]?.el.pause();
    this.cb.onPlayState?.(false);
  }
  seek(t: number) {
    const el = this.decks[this.active]?.el;
    if (el && isFinite(t)) { try { el.currentTime = t; } catch { /* noop */ } }
  }
  setVolume(v: number) { this.userVolume = clamp(v, 0, 1); this.muted = v === 0; this.applyMaster(); }
  setMuted(m: boolean) { this.muted = m; this.applyMaster(); }

  /** Fade the master to a level over `ms` (used by the sleep timer). */
  fadeMaster(to: number, ms: number, then?: () => void) {
    if (this.webAudio && this.master && this.ctx) {
      const t0 = this.ctx.currentTime;
      try {
        this.master.gain.cancelScheduledValues(t0);
        this.master.gain.setValueAtTime(this.master.gain.value, t0);
        this.master.gain.linearRampToValueAtTime(Math.max(0.0001, to), t0 + ms / 1000);
      } catch { /* noop */ }
      if (then) window.setTimeout(then, ms + 60);
    } else {
      // plain fallback: step the element volume down
      const steps = 20; let i = 0;
      const from = this.decks[this.active]?.el.volume ?? this.userVolume;
      const iv = setInterval(() => {
        i++;
        const v = from + (to - from) * (i / steps);
        this.decks.forEach((d) => { d.el.volume = Math.max(0, v); });
        if (i >= steps) { clearInterval(iv); then?.(); }
      }, ms / steps);
    }
  }
  restoreMaster() { this.applyMaster(); }

  getFrequencyData(arr: Uint8Array) {
    if (this.analyser) { this.analyser.getByteFrequencyData(arr); return true; }
    return false;
  }
  isWebAudio() { return this.webAudio; }
  getCurrentTime() { return this.decks[this.active]?.el.currentTime || 0; }
}

export const CROSSFADE_SEC = 4;

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
