import { create } from 'zustand';
import { stations, Track, Station } from '@/lib/stations';
import { StationRotation } from '@/lib/rotation';
import { getEngine, CROSSFADE_SEC } from '@/lib/audioEngine';

// One composition-aware rotation engine per station (manages its own localStorage).
const rotations = new Map<string, StationRotation>();
function getRotation(station: Station): StationRotation {
  let r = rotations.get(station.id);
  if (!r) {
    const storage = typeof window !== 'undefined' ? window.localStorage : undefined;
    r = new StationRotation(station, { storage });
    rotations.set(station.id, r);
  }
  return r;
}
function indexOf(station: Station, track: Track): number {
  return station.tracks.findIndex((t) => t.id === track.id);
}

// ── persisted UI state (last station / track / position / volume) ────────────
const STATE_KEY = 'radiocode:state:v1';
const FAVORITES_KEY = 'radiocode-favorites';
let persistThrottle = 0;

function persistState(get: () => PlayerState) {
  if (typeof window === 'undefined') return;
  const now = Date.now();
  if (now - persistThrottle < 4000) return; // throttle to every 4s
  persistThrottle = now;
  const s = get();
  try {
    localStorage.setItem(
      STATE_KEY,
      JSON.stringify({
        stationId: s.currentStation?.id || null,
        trackId: s.currentTrack?.id || null,
        position: Math.floor(s.currentTime || 0),
        volume: s.volume,
        isMuted: s.isMuted,
      })
    );
  } catch { /* storage full */ }
}

function loadFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}
function saveFavorites(favs: string[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs)); } catch { /* noop */ }
}

interface PlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentStation: Station | null;
  currentTrackIndex: number;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  favorites: string[];
  isPlayerExpanded: boolean;
  showPlaylist: boolean;
  audioData: Uint8Array | null;

  // sleep timer
  sleepMinutes: number | null;
  sleepDeadline: number | null;

  // pending seek used to resume a restored track at its saved position
  pendingSeek: number;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setStation: (stationId: string) => void;
  playTrack: (stationId: string, trackIndex: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setLoading: (loading: boolean) => void;
  togglePlayerExpanded: () => void;
  toggleShowPlaylist: () => void;
  setAudioData: (data: Uint8Array | null) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;

  // driven by the audio engine
  handleNeedNext: () => void;
  handleEnded: () => void;
  handleSkip: () => void;

  // sleep timer
  setSleep: (minutes: number | null) => void;

  // restore last session
  restoreState: () => void;
}

let sleepTimer: ReturnType<typeof setTimeout> | null = null;

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentTrack: null,
  currentStation: null,
  currentTrackIndex: 0,
  volume: 0.75,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  isLoading: false,
  isShuffled: false,
  repeatMode: 'off',
  favorites: [],
  isPlayerExpanded: false,
  showPlaylist: false,
  audioData: null,
  sleepMinutes: null,
  sleepDeadline: null,
  pendingSeek: 0,

  play: () => {
    const eng = getEngine();
    eng.ensureRunning();
    const { currentTrack, pendingSeek } = get();
    if (!currentTrack) { get().togglePlay(); return; }
    if (eng.loadedTrackId() !== currentTrack.id) {
      eng.playNow(currentTrack, pendingSeek); // e.g. resuming a restored session
    } else {
      eng.resume();
      if (pendingSeek > 0) eng.seek(pendingSeek);
    }
    if (pendingSeek > 0) set({ pendingSeek: 0 });
    set({ isPlaying: true });
  },
  pause: () => { getEngine().pause(); set({ isPlaying: false }); },

  togglePlay: () => {
    const eng = getEngine();
    eng.ensureRunning();
    const { isPlaying, currentTrack, currentStation, pendingSeek } = get();
    if (!currentTrack) {
      const station = currentStation || stations[0];
      if (station && station.tracks.length > 0) {
        const rot = getRotation(station);
        rot.setShuffled(get().isShuffled);
        const track = rot.start();
        set({ currentStation: station, currentTrack: track, currentTrackIndex: indexOf(station, track), isPlaying: true, isLoading: true });
        eng.playNow(track);
      }
      return;
    }
    if (isPlaying) { eng.pause(); set({ isPlaying: false }); }
    else {
      if (eng.loadedTrackId() !== currentTrack.id) {
        eng.playNow(currentTrack, pendingSeek);
      } else {
        eng.resume();
        if (pendingSeek > 0) eng.seek(pendingSeek);
      }
      if (pendingSeek > 0) set({ pendingSeek: 0 });
      set({ isPlaying: true });
    }
  },

  setStation: (stationId: string) => {
    const station = stations.find((s) => s.id === stationId);
    if (!station || station.tracks.length === 0) return;
    const eng = getEngine();
    eng.ensureRunning();
    const rot = getRotation(station);
    rot.setShuffled(get().isShuffled);
    const track = rot.start();
    set({ currentStation: station, currentTrack: track, currentTrackIndex: indexOf(station, track), currentTime: 0, duration: track.duration || 0, isPlaying: true, isLoading: true, pendingSeek: 0 });
    eng.playNow(track);
  },

  playTrack: (stationId: string, trackIndex: number) => {
    const station = stations.find((s) => s.id === stationId);
    if (!station || !station.tracks[trackIndex]) return;
    const track = station.tracks[trackIndex];
    const eng = getEngine();
    eng.ensureRunning();
    const rot = getRotation(station);
    rot.setShuffled(get().isShuffled);
    rot.consume(track);
    set({ currentStation: station, currentTrack: track, currentTrackIndex: trackIndex, currentTime: 0, duration: track.duration || 0, isPlaying: true, isLoading: true, pendingSeek: 0 });
    eng.playNow(track);
  },

  // manual next — quick blend
  nextTrack: () => {
    const { currentStation, repeatMode } = get();
    if (!currentStation) return;
    const eng = getEngine();
    if (repeatMode === 'one') { eng.seek(0); set({ currentTime: 0, isPlaying: true }); return; }
    const rot = getRotation(currentStation);
    const track = rot.next();
    set({ currentTrack: track, currentTrackIndex: indexOf(currentStation, track), currentTime: 0, duration: track.duration || 0, isPlaying: true, isLoading: true });
    eng.crossfadeTo(track, 500);
  },

  prevTrack: () => {
    const { currentStation, currentTime } = get();
    if (!currentStation) return;
    const eng = getEngine();
    if (currentTime > 3) { eng.seek(0); set({ currentTime: 0 }); return; }
    const rot = getRotation(currentStation);
    const track = rot.prev();
    if (!track) { eng.seek(0); set({ currentTime: 0 }); return; }
    set({ currentTrack: track, currentTrackIndex: indexOf(currentStation, track), currentTime: 0, duration: track.duration || 0, isPlaying: true, isLoading: true });
    eng.crossfadeTo(track, 500);
  },

  // auto near-end — gapless long crossfade
  handleNeedNext: () => {
    const { currentStation, repeatMode } = get();
    if (!currentStation || repeatMode === 'one') return; // 'one' handled on ended
    const rot = getRotation(currentStation);
    const track = rot.next();
    set({ currentTrack: track, currentTrackIndex: indexOf(currentStation, track), duration: track.duration || 0, isLoading: false });
    getEngine().crossfadeTo(track, CROSSFADE_SEC * 1000);
  },

  // track ended with no crossfade (short track / repeat one)
  handleEnded: () => {
    const { currentStation, repeatMode } = get();
    if (!currentStation) return;
    const eng = getEngine();
    if (repeatMode === 'one') { eng.seek(0); eng.resume(); set({ currentTime: 0, isPlaying: true }); return; }
    const rot = getRotation(currentStation);
    const track = rot.next();
    set({ currentTrack: track, currentTrackIndex: indexOf(currentStation, track), currentTime: 0, duration: track.duration || 0, isPlaying: true, isLoading: true });
    eng.playNow(track);
  },

  // unrecoverable error on the current track — skip to next
  handleSkip: () => {
    const { currentStation } = get();
    if (!currentStation) return;
    const rot = getRotation(currentStation);
    const track = rot.next();
    set({ currentTrack: track, currentTrackIndex: indexOf(currentStation, track), currentTime: 0, duration: track.duration || 0, isPlaying: true, isLoading: true });
    getEngine().playNow(track);
  },

  setVolume: (vol: number) => { getEngine().setVolume(vol); set({ volume: vol, isMuted: vol === 0 }); persistState(get); },
  toggleMute: () => { const m = !get().isMuted; getEngine().setMuted(m); set({ isMuted: m }); },
  setCurrentTime: (time: number) => { set({ currentTime: time }); persistState(get); },
  setDuration: (duration: number) => set({ duration }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  togglePlayerExpanded: () => set((s) => ({ isPlayerExpanded: !s.isPlayerExpanded })),
  toggleShowPlaylist: () => set((s) => ({ showPlaylist: !s.showPlaylist })),
  setAudioData: (data: Uint8Array | null) => set({ audioData: data }),

  toggleShuffle: () => {
    const next = !get().isShuffled;
    set({ isShuffled: next });
    const { currentStation } = get();
    if (currentStation) getRotation(currentStation).setShuffled(next);
  },

  cycleRepeat: () => {
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const idx = modes.indexOf(get().repeatMode);
    set({ repeatMode: modes[(idx + 1) % modes.length] });
  },

  toggleFavorite: (trackId: string) => {
    const { favorites } = get();
    const updated = favorites.includes(trackId) ? favorites.filter((id) => id !== trackId) : [...favorites, trackId];
    set({ favorites: updated });
    saveFavorites(updated);
  },
  isFavorite: (trackId: string) => get().favorites.includes(trackId),

  setSleep: (minutes: number | null) => {
    if (sleepTimer) { clearTimeout(sleepTimer); sleepTimer = null; }
    const eng = getEngine();
    if (!minutes) { eng.restoreMaster(); set({ sleepMinutes: null, sleepDeadline: null }); return; }
    const deadline = Date.now() + minutes * 60_000;
    set({ sleepMinutes: minutes, sleepDeadline: deadline });
    sleepTimer = setTimeout(() => {
      // fade out over 12s, then pause and restore master for next time
      eng.fadeMaster(0.0001, 12_000, () => {
        eng.pause();
        eng.restoreMaster();
        set({ isPlaying: false, sleepMinutes: null, sleepDeadline: null });
      });
    }, minutes * 60_000);
  },

  restoreState: () => {
    if (typeof window === 'undefined' || get().currentTrack) return;
    try {
      const favs = loadFavorites();
      if (favs.length) set({ favorites: favs });
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      const eng = getEngine();
      if (typeof s.volume === 'number') { eng.setVolume(s.volume); set({ volume: s.volume, isMuted: !!s.isMuted }); }
      const station = stations.find((st) => st.id === s.stationId);
      if (station) {
        const track = station.tracks.find((t) => t.id === s.trackId) || station.tracks[0];
        set({
          currentStation: station,
          currentTrack: track,
          currentTrackIndex: indexOf(station, track),
          duration: track.duration || 0,
          currentTime: s.position || 0,
          pendingSeek: s.position || 0,
          isPlaying: false, // never autoplay — wait for a user gesture
        });
      }
    } catch { /* ignore corrupt state */ }
  },
}));
