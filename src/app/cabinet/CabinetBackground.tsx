"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Cabinet cyberpunk backdrop — a fixed layer behind the whole cabinet:
 * deep gradient + faint neon grid + drifting cyan/violet/gold glow orbs +
 * scanlines + a cursor-following glow. Purely CSS/transform driven (classes in
 * CAB_CSS). Heavy motion is disabled on mobile and for prefers-reduced-motion,
 * so it stays smooth. pointer-events: none — never intercepts clicks.
 */
export default function CabinetBackground() {
  const [anim, setAnim] = useState(false);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    setAnim(!reduced && !mobile);
  }, []);

  useEffect(() => {
    if (!anim) return;
    let raf = 0;
    let tx = window.innerWidth / 2, ty = window.innerHeight * 0.38;
    let cx = tx, cy = ty;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      if (glow.current) glow.current.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [anim]);

  return (
    <div aria-hidden className={"cab-bg" + (anim ? "" : " cab-bg-static")}>
      <div className="cab-bg-grid" />
      <div className="cab-bg-orb cab-bg-orb1" />
      <div className="cab-bg-orb cab-bg-orb2" />
      <div className="cab-bg-orb cab-bg-orb3" />
      <div className="cab-bg-scan" />
      {anim && <div ref={glow} className="cab-bg-cursor" style={{ transform: "translate(50vw, 38vh)" }} />}
      <div className="cab-bg-vig" />
    </div>
  );
}
