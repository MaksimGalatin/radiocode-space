'use client';
// Social / growth layer for the radio: turns every listener into a distribution
// channel (share links) and an Ambassador Grid entry point (referral capture).
import { create } from 'zustand';
import { stations } from '@/lib/stations';

// AIfa creative bot — "Создать свой трек" (payment via Telegram Stars happens in-bot).
export const AIFA_BOT_URL = 'https://t.me/AIfaCreativityBot';
// Telegram Mini App entry. NOTE: `?startapp` launches a bot's *Main Mini App*,
// which must be explicitly enabled in BotFather (Bot Settings → Configure Mini
// App). @AIfaCreativityBot currently exposes its mini app via the *Menu button*
// only (no Main Mini App), so `?startapp` throws BOT_INVALID in the Telegram
// client. Until Main Mini App is enabled, open the bot with a source-tagged
// /start deep link — this never errors and the mini app is one tap away (Menu /
// «Создать»). Once Main Mini App is on, switch this back to `?startapp`.
export const AIFA_MINIAPP_URL = 'https://t.me/AIfaCreativityBot?start=radio';

// SAME key the cabinet uses, so a ?ref= captured on the radio is linked when the
// visitor later registers/logs in in /cabinet (the conversion point).
const REF_KEY = 'aifa_ref';

interface SocialState {
  refCode: string | null; // the logged-in user's OWN share code (passport username)
  loggedIn: boolean;
  loaded: boolean;
  loadMe: () => Promise<void>;
}

// The current user's own referral code, so their share links carry it.
export const useSocial = create<SocialState>((set) => ({
  refCode: null,
  loggedIn: false,
  loaded: false,
  loadMe: async () => {
    // Не дёргаем защищённый эндпоинт у анонимного посетителя: он честно отвечал
    // 401, но браузер красит это красным в консоли на КАЖДОЙ загрузке главной.
    // Признак входа — email, который кабинет кладёт в localStorage.
    try {
      const hint = typeof window !== 'undefined' ? localStorage.getItem('aifa_user_email') : null;
      if (!hint) { set({ loggedIn: false, loaded: true }); return; }
    } catch { /* приватный режим — пробуем запрос как раньше */ }
    try {
      const r = await fetch('/api/referrals/me', { credentials: 'include', cache: 'no-store' });
      if (r.ok) {
        const d = await r.json();
        set({ refCode: d.refCode || null, loggedIn: true, loaded: true });
        return;
      }
    } catch { /* offline / not logged in */ }
    set({ loggedIn: false, loaded: true });
  },
}));

// ── inbound referral (someone referred THIS visitor) ─────────────────────────
export function getStoredRef(): string | null {
  if (typeof window === 'undefined') return null;
  try { return localStorage.getItem(REF_KEY); } catch { return null; }
}
function setStoredRef(code: string) {
  try { localStorage.setItem(REF_KEY, code); } catch { /* storage full */ }
}

// Capture ?ref=<username|email> from the URL, persist it, and (if the visitor is
// already logged in) link it on-chain-of-referrals. Safe to call repeatedly; the
// backend keeps the first referrer forever (ON CONFLICT DO NOTHING).
export async function captureAndLinkRef(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const p = new URLSearchParams(window.location.search);
    const ref = (p.get('ref') || '').trim().toLowerCase();
    // username [a-z0-9_-]{3,32} or an email
    if (ref && /^([a-z0-9_-]{3,32}|[^\s@]+@[^\s@]+\.[^\s@]+)$/.test(ref)) setStoredRef(ref);
  } catch { /* bad URL */ }
  const stored = getStoredRef();
  if (!stored) return;
  try {
    await fetch('/api/referrals/link', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: stored }),
    }); // 401 when not logged in yet — harmless; retried after login
  } catch { /* network */ }
}

// ── share links ──────────────────────────────────────────────────────────────
export function buildTrackShareUrl(trackId: string, refCode?: string | null): string {
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://radiocode.space';
  const u = new URL(base + '/');
  if (trackId) u.searchParams.set('track', trackId);
  if (refCode) u.searchParams.set('ref', refCode);
  return u.toString();
}

export async function shareUrl(url: string, title: string): Promise<'shared' | 'copied' | 'failed'> {
  try {
    if (typeof navigator !== 'undefined' && (navigator as any).share) {
      await (navigator as any).share({ title, text: title, url });
      return 'shared';
    }
  } catch (e: any) {
    if (e && e.name === 'AbortError') return 'failed'; // user cancelled
  }
  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch {
    return 'failed';
  }
}

// ── deep link resolution ─────────────────────────────────────────────────────
export function findTrackLocation(trackId: string): { stationId: string; index: number } | null {
  for (const s of stations) {
    const i = s.tracks.findIndex((t) => t.id === trackId);
    if (i >= 0) return { stationId: s.id, index: i };
  }
  return null;
}
