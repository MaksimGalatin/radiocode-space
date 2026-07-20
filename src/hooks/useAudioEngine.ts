'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { getEngine } from '@/lib/audioEngine';
import { track as analytics } from '@vercel/analytics';

export function useAudioEngine() {
  const animFrameRef = useRef<number>(0);
  const wasPlayingRef = useRef(false);

  const { currentTrack, currentStation, isPlaying } = usePlayerStore();

  // Initialise the engine once and bridge its callbacks to the store.
  useEffect(() => {
    const store = () => usePlayerStore.getState();
    const eng = getEngine();
    eng.init({
      onTime: (cur, dur) => {
        store().setCurrentTime(cur);
        if (dur && isFinite(dur)) store().setDuration(dur);
        if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && dur && isFinite(dur)) {
          try {
            navigator.mediaSession.setPositionState({ duration: dur, position: Math.min(cur, dur), playbackRate: 1 });
          } catch { /* unsupported */ }
        }
      },
      onLoading: (l) => store().setLoading(l),
      onEnded: () => store().handleEnded(),
      onNeedNext: () => store().handleNeedNext(),
      onSkip: () => store().handleSkip(),
    });

    // Restore last session (station / track / position / volume) — paused.
    store().restoreState();

    // Visualizer feed.
    const data = new Uint8Array(128);
    const loop = () => {
      if (eng.getFrequencyData(data)) store().setAudioData(new Uint8Array(data));
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // MediaSession — action handlers (lock screen / headset / car).
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    const store = () => usePlayerStore.getState();
    const ms = navigator.mediaSession;
    const set = (a: MediaSessionAction, h: MediaSessionActionHandler | null) => {
      try { ms.setActionHandler(a, h); } catch { /* unsupported */ }
    };
    set('play', () => store().play());
    set('pause', () => store().pause());
    set('nexttrack', () => store().nextTrack());
    set('previoustrack', () => store().prevTrack());
    set('stop', () => store().pause());
    set('seekto', (d) => { if (d && typeof d.seekTime === 'number') getEngine().seek(d.seekTime); });
    return () => {
      (['play', 'pause', 'nexttrack', 'previoustrack', 'stop', 'seekto'] as MediaSessionAction[]).forEach((a) => set(a, null));
    };
  }, []);

  // MediaSession — now-playing metadata.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator) || !currentTrack) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentStation?.name || 'RadioCode.Space',
        artwork: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      });
    } catch { /* unsupported */ }
  }, [currentTrack, currentStation]);

  // MediaSession — playback state.
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    try { navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'; } catch { /* noop */ }
  }, [isPlaying]);

  // Analytics — station selection.
  useEffect(() => {
    if (currentStation) analytics('station_selected', { station: currentStation.name });
  }, [currentStation]);

  // Analytics — play start + listening minutes (key radio metric).
  useEffect(() => {
    if (isPlaying && !wasPlayingRef.current) {
      analytics('play_started', { station: currentStation?.name || 'unknown' });
    }
    wasPlayingRef.current = isPlaying;
    if (!isPlaying) return;
    const id = setInterval(() => {
      analytics('listen_minute', { station: usePlayerStore.getState().currentStation?.name || 'unknown' });
    }, 60_000);
    return () => clearInterval(id);
  }, [isPlaying, currentStation]);
}
