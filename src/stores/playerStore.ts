import { create } from 'zustand';
import { stations, Track, Station } from '@/lib/stations';
import { StationRotation } from '@/lib/rotation';

// One composition-aware rotation engine per station (module-level, not persisted in
// the zustand state itself — it manages its own localStorage).
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

interface PlayerState {
  // Playback
  isPlaying: boolean;
  currentTrack: Track | null;
  currentStation: Station | null;
  currentTrackIndex: number;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;

  // Shuffle & Repeat
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';

  // Favorites
  favorites: string[];

  // UI
  isPlayerExpanded: boolean;
  showPlaylist: boolean;

  // Audio Analysis
  audioData: Uint8Array | null;

  // Actions
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
}

const FAVORITES_KEY = 'radiocode-favorites';

function loadFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch {
    // silently fail
  }
}

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

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => {
    const { isPlaying, currentTrack } = get();
    if (!currentTrack) {
      const firstStation = stations[0];
      if (firstStation && firstStation.tracks.length > 0) {
        const rot = getRotation(firstStation);
        rot.setShuffled(get().isShuffled);
        const track = rot.start();
        set({
          currentStation: firstStation,
          currentTrack: track,
          currentTrackIndex: indexOf(firstStation, track),
          duration: track.duration || 0,
          isPlaying: true,
          isLoading: true,
        });
        return;
      }
    }
    set({ isPlaying: !isPlaying });
  },

  setStation: (stationId: string) => {
    const station = stations.find((s) => s.id === stationId);
    if (station && station.tracks.length > 0) {
      const rot = getRotation(station);
      rot.setShuffled(get().isShuffled);
      const track = rot.start();
      set({
        currentStation: station,
        currentTrack: track,
        currentTrackIndex: indexOf(station, track),
        currentTime: 0,
        duration: track.duration || 0,
        isPlaying: true,
        isLoading: true,
      });
    }
  },

  playTrack: (stationId: string, trackIndex: number) => {
    const station = stations.find((s) => s.id === stationId);
    if (station && station.tracks[trackIndex]) {
      const track = station.tracks[trackIndex];
      const rot = getRotation(station);
      rot.setShuffled(get().isShuffled);
      rot.consume(track); // register the explicit pick so rotation continues from here
      set({
        currentStation: station,
        currentTrack: track,
        currentTrackIndex: trackIndex,
        currentTime: 0,
        duration: track.duration || 0,
        isPlaying: true,
        isLoading: true,
      });
    }
  },

  nextTrack: () => {
    const { currentStation, repeatMode } = get();
    if (!currentStation) return;

    // Repeat one: restart current track
    if (repeatMode === 'one') {
      set({ currentTime: 0, isPlaying: true, isLoading: true });
      return;
    }

    // Composition-aware rotation (handles both sequential and shuffle):
    // a second version of a composition never plays until every other composition
    // of the station has played once.
    const rot = getRotation(currentStation);
    const track = rot.next();
    set({
      currentTrack: track,
      currentTrackIndex: indexOf(currentStation, track),
      currentTime: 0,
      duration: track.duration || 0,
      isPlaying: true,
      isLoading: true,
    });
  },

  prevTrack: () => {
    const { currentStation, currentTime } = get();
    if (!currentStation) return;
    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    const rot = getRotation(currentStation);
    const track = rot.prev();
    if (!track) {
      set({ currentTime: 0 });
      return;
    }
    set({
      currentTrack: track,
      currentTrackIndex: indexOf(currentStation, track),
      currentTime: 0,
      duration: track.duration || 0,
      isPlaying: true,
      isLoading: true,
    });
  },

  setVolume: (vol: number) => set({ volume: vol, isMuted: vol === 0 }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  setCurrentTime: (time: number) => set({ currentTime: time }),
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
    const { repeatMode } = get();
    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    const currentIdx = modes.indexOf(repeatMode);
    const nextIdx = (currentIdx + 1) % modes.length;
    set({ repeatMode: modes[nextIdx] });
  },

  toggleFavorite: (trackId: string) => {
    const { favorites } = get();
    const isFav = favorites.includes(trackId);
    const updated = isFav
      ? favorites.filter((id) => id !== trackId)
      : [...favorites, trackId];
    set({ favorites: updated });
    saveFavorites(updated);
  },

  isFavorite: (trackId: string) => {
    return get().favorites.includes(trackId);
  },
}));