import { create } from 'zustand';
import { stations, Track, Station } from '@/lib/stations';

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
        set({
          currentStation: firstStation,
          currentTrack: firstStation.tracks[0],
          currentTrackIndex: 0,
          isPlaying: true,
        });
        return;
      }
    }
    set({ isPlaying: !isPlaying });
  },

  setStation: (stationId: string) => {
    const station = stations.find((s) => s.id === stationId);
    if (station && station.tracks.length > 0) {
      set({
        currentStation: station,
        currentTrack: station.tracks[0],
        currentTrackIndex: 0,
        currentTime: 0,
        duration: station.tracks[0].duration || 0,
        isPlaying: true,
        isLoading: true,
      });
    }
  },

  playTrack: (stationId: string, trackIndex: number) => {
    const station = stations.find((s) => s.id === stationId);
    if (station && station.tracks[trackIndex]) {
      set({
        currentStation: station,
        currentTrack: station.tracks[trackIndex],
        currentTrackIndex: trackIndex,
        currentTime: 0,
        duration: station.tracks[trackIndex].duration || 0,
        isPlaying: true,
        isLoading: true,
      });
    }
  },

  nextTrack: () => {
    const { currentStation, currentTrackIndex, repeatMode, isShuffled } = get();
    if (!currentStation) return;

    // Repeat one: restart current track
    if (repeatMode === 'one') {
      set({ currentTime: 0, isPlaying: true, isLoading: true });
      return;
    }

    const trackCount = currentStation.tracks.length;
    const isLastTrack = currentTrackIndex === trackCount - 1;

    // If off mode and at last track, stop
    if (repeatMode === 'off' && isLastTrack) {
      set({ isPlaying: false, currentTime: 0 });
      return;
    }

    let nextIndex: number;

    if (isShuffled) {
      // Pick a random track that isn't the current one
      if (trackCount <= 1) {
        nextIndex = 0;
      } else {
        do {
          nextIndex = Math.floor(Math.random() * trackCount);
        } while (nextIndex === currentTrackIndex);
      }
    } else {
      // Sequential: loop back to 0 for 'all', or just advance
      nextIndex = (currentTrackIndex + 1) % trackCount;
    }

    const nextTrack = currentStation.tracks[nextIndex];
    set({
      currentTrack: nextTrack,
      currentTrackIndex: nextIndex,
      currentTime: 0,
      duration: nextTrack.duration || 0,
      isPlaying: true,
      isLoading: true,
    });
  },

  prevTrack: () => {
    const { currentStation, currentTrackIndex, currentTime } = get();
    if (!currentStation) return;
    if (currentTime > 3) {
      set({ currentTime: 0 });
      return;
    }
    const prevIndex =
      currentTrackIndex === 0
        ? currentStation.tracks.length - 1
        : currentTrackIndex - 1;
    const prevTrack = currentStation.tracks[prevIndex];
    set({
      currentTrack: prevTrack,
      currentTrackIndex: prevIndex,
      currentTime: 0,
      duration: prevTrack.duration || 0,
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

  toggleShuffle: () => set((s) => ({ isShuffled: !s.isShuffled })),

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