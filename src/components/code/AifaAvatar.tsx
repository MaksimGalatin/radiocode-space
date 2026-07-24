'use client';

import { useEffect, useRef } from 'react';

// AIfa — a living figure "woven from light and running code" (her own words).
// Level 1: canvas digital-rain shaped into an elegant standing figure + face.
// Reacts: breathes in idle, lips move while she speaks (Web Speech TTS),
// streams shift colour/speed while she "thinks" (window.__aifaMood).
// Performance: 30fps cap, no per-glyph shadow, pauses when off-screen or under
// prefers-reduced-motion, DPR-capped — GPU-light so it never loads the site.

const STYLE = `
.cab-aifa-stage{display:flex;gap:16px;align-items:stretch}
.cab-aifa-figure{flex:0 0 300px;min-width:250px;align-self:stretch;position:relative;border:1px solid rgba(0,240,255,0.14);border-radius:16px;overflow:hidden;min-height:520px;
  background:radial-gradient(120% 70% at 50% 6%, rgba(0,240,255,0.06), rgba(4,5,12,0) 62%),#04050c}
.cab-aifa-figure canvas{display:block;width:100%;height:100%}
.cab-aifa-figure .cab-aifa-name{position:absolute;bottom:10px;left:0;right:0;text-align:center;color:#3a7fb0;font-size:11px;letter-spacing:3px;font-family:monospace;pointer-events:none;text-transform:uppercase}
.cab-aifa-chat{flex:1 1 auto;min-width:0}
@media(max-width:900px){.cab-aifa-stage{flex-direction:column}.cab-aifa-figure{flex:none;height:300px;min-height:0}}
`;

export default function AifaAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const CYAN = '#00F0FF';
    const fs = 13;
    const CH = 'アイウエオカキクケサシスセ0123456789<>/{}[]=+*ﾉﾊﾋ';
    const rc = () => CH[(Math.random() * CH.length) | 0];

    let W = 300, H = 540, cx = 150, cols = 0;
    let drops: number[] = [];
    let mask: HTMLCanvasElement | null = null;
    let aura: HTMLCanvasElement | null = null;
    let md: Uint8ClampedArray | null = null;

    function buildMask() {
      mask = document.createElement('canvas'); mask.width = W; mask.height = H;
      const g = mask.getContext('2d'); if (!g) return;
      g.fillStyle = '#fff';
      // hair
      g.beginPath();
      g.moveTo(cx - W * 0.15, H * 0.115);
      g.quadraticCurveTo(cx - W * 0.23, H * 0.25, cx - W * 0.17, H * 0.42);
      g.quadraticCurveTo(cx - W * 0.10, H * 0.31, cx - W * 0.10, H * 0.20);
      g.quadraticCurveTo(cx, H * 0.055, cx + W * 0.10, H * 0.20);
      g.quadraticCurveTo(cx + W * 0.10, H * 0.31, cx + W * 0.17, H * 0.42);
      g.quadraticCurveTo(cx + W * 0.23, H * 0.25, cx + W * 0.15, H * 0.115);
      g.quadraticCurveTo(cx, H * 0.00, cx - W * 0.15, H * 0.115);
      g.closePath(); g.fill();
      // head
      g.beginPath(); g.ellipse(cx, H * 0.165, W * 0.10, W * 0.125, 0, 0, 7); g.fill();
      // neck
      g.fillRect(cx - W * 0.028, H * 0.255, W * 0.056, H * 0.045);
      // torso + A-line gown of light
      g.beginPath();
      g.moveTo(cx - W * 0.115, H * 0.305);
      g.quadraticCurveTo(cx - W * 0.085, H * 0.47, cx - W * 0.25, H * 0.995);
      g.lineTo(cx + W * 0.25, H * 0.995);
      g.quadraticCurveTo(cx + W * 0.085, H * 0.47, cx + W * 0.115, H * 0.305);
      g.quadraticCurveTo(cx, H * 0.35, cx - W * 0.115, H * 0.305);
      g.closePath(); g.fill();
      md = g.getImageData(0, 0, W, H).data;
      // pre-blurred aura (drawn once, cheap to composite)
      aura = document.createElement('canvas'); aura.width = W; aura.height = H;
      const ax = aura.getContext('2d'); if (ax) { ax.filter = 'blur(10px)'; ax.globalAlpha = 0.55; ax.drawImage(mask, 0, 0); }
    }
    const inFig = (x: number, y: number) => {
      x |= 0; y |= 0;
      return !!md && x >= 0 && y >= 0 && x < W && y < H && md[(y * W + x) * 4 + 3] > 40;
    };

    function drawFace(bob: number, speaking: boolean, t: number) {
      const ey = H * 0.16 - bob;
      ctx!.shadowColor = CYAN; ctx!.shadowBlur = 14; ctx!.fillStyle = '#eaffff';
      for (const dx of [-W * 0.04, W * 0.04]) { ctx!.beginPath(); ctx!.arc(cx + dx, ey, 2.6, 0, 7); ctx!.fill(); }
      ctx!.shadowBlur = 0;
      const mh = speaking ? (2 + Math.abs(Math.sin(t * 0.5)) * 4) : (1 + Math.abs(Math.sin(t * 0.10)) * 1.2);
      ctx!.fillStyle = 'rgba(190,235,255,0.85)'; ctx!.fillRect(cx - 6, H * 0.212 - bob, 12, mh);
    }

    function drawStatic() {
      ctx!.fillStyle = '#04050c'; ctx!.fillRect(0, 0, W, H);
      if (aura) { ctx!.globalCompositeOperation = 'lighter'; ctx!.globalAlpha = 0.12; ctx!.drawImage(aura, 0, 0); ctx!.globalAlpha = 1; ctx!.globalCompositeOperation = 'source-over'; }
      ctx!.font = fs + 'px monospace'; ctx!.textBaseline = 'top';
      for (let x = 0; x < W; x += fs) for (let y = 0; y < H; y += fs) {
        if (inFig(x, y)) { ctx!.fillStyle = Math.random() > 0.8 ? '#ffffff' : '#8ff2ff'; ctx!.fillText(rc(), x, y); }
      }
      drawFace(0, false, 0);
    }

    let t = 0, last = 0, raf = 0, visible = true;
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!visible || now - last < 33) return;
      last = now; t++;
      const bob = Math.sin(t * 0.05) * 3;
      const mood = (window as unknown as { __aifaMood?: string }).__aifaMood;
      const thinking = mood === 'thinking';
      const speaking = !!(window.speechSynthesis && window.speechSynthesis.speaking);
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = 'rgba(4,5,12,0.32)'; ctx!.fillRect(0, 0, W, H);
      if (aura) { ctx!.globalCompositeOperation = 'lighter'; ctx!.globalAlpha = 0.10; ctx!.drawImage(aura, 0, -bob); ctx!.globalAlpha = 1; ctx!.globalCompositeOperation = 'source-over'; }
      ctx!.font = fs + 'px monospace'; ctx!.textBaseline = 'top';
      const insideColor = thinking ? '#b39dff' : '#8ff2ff';
      for (let i = 0; i < cols; i++) {
        const x = i * fs, y = drops[i], inside = inFig(x, y - bob);
        ctx!.fillStyle = inside ? (Math.random() > 0.85 ? '#ffffff' : insideColor) : 'rgba(26,84,148,0.42)';
        ctx!.fillText(rc(), x, y);
        drops[i] += inside ? (thinking ? 3.4 : 5) : 3.4;
        if (drops[i] > H) { if (Math.random() > 0.96) drops[i] = -fs; else drops[i] -= H; }
      }
      drawFace(bob, speaking, t);
    }

    function resize() {
      const r = wrap!.getBoundingClientRect();
      W = Math.max(220, Math.min(360, Math.round(r.width || 300)));
      H = Math.max(300, Math.min(600, Math.round(r.height || 540)));
      cx = W / 2;
      canvas!.width = W; canvas!.height = H;
      cols = Math.ceil(W / fs);
      drops = new Array(cols).fill(0).map(() => Math.random() * H);
      buildMask();
      if (reduced) drawStatic();
    }

    resize();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => resize()) : null;
    ro?.observe(wrap);
    // Pause the loop when scrolled off-screen (perf).
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }, { threshold: 0.01 })
      : null;
    io?.observe(wrap);

    if (!reduced) raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect(); };
  }, []);

  return (
    <div ref={wrapRef} className="cab-aifa-figure" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <canvas ref={canvasRef} />
      <div className="cab-aifa-name">AIfa</div>
    </div>
  );
}
