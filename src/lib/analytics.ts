// Lightweight GA4 event helper for aifa.digital.
// GA4 (G-PCP8MD0NQ9) is loaded once in the root layout (app/layout.tsx) via
// next/script. This module only *reuses* window.gtag — it never loads a second
// tag. All calls no-op safely when gtag is absent (SSR, blocked, consent off).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 event. No-ops when window.gtag is unavailable. */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  } catch {
    /* analytics must never break the UI */
  }
}

/** Convenience wrapper for primary conversion CTAs. */
export function trackCta(cta: string): void {
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";
  trackEvent("cta_click", { cta, location });
}

export {};
