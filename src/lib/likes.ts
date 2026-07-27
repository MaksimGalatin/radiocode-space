'use client';
import { create } from 'zustand';

// Stable per-device id so anonymous listeners can like tracks too (aggregate
// likes = the audience-curated shortlist for the debut album).
export function deviceId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let d = localStorage.getItem('radiocode:did');
    if (!d) {
      d = 'd' + Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
      localStorage.setItem('radiocode:did', d);
    }
    return d;
  } catch { return ''; }
}

interface LikesState {
  counts: Record<string, number>;
  mine: Set<string>;
  loaded: boolean;
  load: () => Promise<void>;
  toggle: (trackId: string) => Promise<void>;
  isLiked: (trackId: string) => boolean;
  countOf: (trackId: string) => number;
}

export const useLikes = create<LikesState>((set, get) => ({
  counts: {},
  mine: new Set<string>(),
  loaded: false,
  isLiked: (id) => get().mine.has(id),
  countOf: (id) => get().counts[id] || 0,
  load: async () => {
    try {
      const r = await fetch('/api/likes?deviceId=' + encodeURIComponent(deviceId()), { cache: 'no-store', credentials: 'include' });
      const d = await r.json();
      set({ counts: d.counts || {}, mine: new Set<string>(d.mine || []), loaded: true });
    } catch { set({ loaded: true }); }
  },
  toggle: async (trackId) => {
    if (!trackId) return;
    const { mine, counts } = get();
    const wasLiked = mine.has(trackId);
    const nm = new Set(mine);
    const nc: Record<string, number> = { ...counts };
    if (wasLiked) { nm.delete(trackId); nc[trackId] = Math.max(0, (nc[trackId] || 1) - 1); }
    else { nm.add(trackId); nc[trackId] = (nc[trackId] || 0) + 1; }
    set({ mine: nm, counts: nc }); // optimistic
    try {
      const r = await fetch('/api/likes', {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId, deviceId: deviceId() }),
      });
      const d = await r.json();
      if (d && d.ok) {
        const c2 = { ...get().counts }; c2[trackId] = d.count;
        const m2 = new Set(get().mine);
        if (d.liked) m2.add(trackId); else m2.delete(trackId);
        set({ counts: c2, mine: m2 });
      }
    } catch { /* keep optimistic */ }
  },
}));
