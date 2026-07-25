import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// ── Perf tier ────────────────────────────────────────────────────────────────
// TRUE on phones, Android TVs / set-top boxes / consoles, low-end devices, and
// when the user asked for reduced motion. Heavy per-frame layers (canvas rAF
// loops, animated blur orbs, moving grids/beams) switch to a static, GPU-light
// path when this is true. Android TVs have LARGE screens but very weak GPUs, so
// width alone (useIsMobile) misses them and they run the full desktop path —
// that is what makes the picture stutter and the remote cursor crawl. The
// device class (`perf-lite` / `perf-tv`) is set by a synchronous inline <head>
// script (from UA + capabilities) before first paint; this hook reads it and
// also stays reactive to viewport width + reduced-motion changes.
export function useLiteMode() {
  const [lite, setLite] = React.useState<boolean>(false)

  React.useEffect(() => {
    const evaluate = () => {
      const cls = document.documentElement.classList.contains("perf-lite")
      const narrow = window.innerWidth < MOBILE_BREAKPOINT
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      setLite(cls || narrow || reduced)
    }
    evaluate()
    const mqW = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)")
    mqW.addEventListener("change", evaluate)
    mqR.addEventListener("change", evaluate)
    return () => {
      mqW.removeEventListener("change", evaluate)
      mqR.removeEventListener("change", evaluate)
    }
  }, [])

  return lite
}
