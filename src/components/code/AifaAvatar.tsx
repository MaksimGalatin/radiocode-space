'use client';

import { useEffect, useRef, useState } from 'react';

// AIfa — образ девушки, сотканной из бегущего кода (её собственные слова о себе).
//
// Как устроено. Силуэт задан МЕДИАЛЬНОЙ ОСЬЮ: для каждой высоты известны центр и
// полуширина (шея → плечи → грудь → талия → бёдра → поток платья). Такой силуэт
// анатомичен и легко настраивается, а код-строки внутри рисуются полосами,
// огибающими форму, — как на референсах, а не вертикальным «дождём».
// Волосы — кубические Безье: у головы прижаты, ниже плеч плавно расходятся.
// Лицо не рисуется «глазками»: читается линия профиля (лоб → нос → губы →
// подбородок) и короткий штрих глаза, который моргает.
//
// Где показывается. Только на десктопе: ширина ≥ 900 px, без perf-lite/perf-tv
// (ТВ и слабые устройства) и без prefers-reduced-motion. На телефоне и на слабом
// железе компонент не монтируется вовсе — ни канвы, ни rAF, ни расчётов.
// Производительность: 30 fps, без теней на каждый глиф, пауза вне экрана.

const STYLE = `
.cab-aifa-stage{display:flex;gap:16px;align-items:stretch}
.cab-aifa-figure{flex:0 0 300px;min-width:250px;align-self:stretch;position:relative;border:1px solid rgba(0,240,255,0.16);border-radius:16px;overflow:hidden;min-height:520px;
  background:radial-gradient(120% 70% at 50% 5%, rgba(0,240,255,0.07), rgba(4,5,12,0) 62%),#04050c}
.cab-aifa-figure canvas{display:block;width:100%;height:100%}
.cab-aifa-figure .cab-aifa-name{position:absolute;bottom:10px;left:0;right:0;text-align:center;color:#4a90c0;font-size:11px;letter-spacing:3px;font-family:monospace;pointer-events:none;text-transform:uppercase}
.cab-aifa-chat{flex:1 1 auto;min-width:0}
`;

/** y (доля высоты), центр (доля ширины), полуширина (доля ширины). */
const SEG: [number, number, number][] = [
  [0.230, 0.500, 0.036], // шея — длинная и тонкая
  [0.268, 0.501, 0.046],
  [0.298, 0.502, 0.086], // мягкий скат плеч
  [0.340, 0.504, 0.142], // плечи
  [0.385, 0.503, 0.148], // грудь
  [0.425, 0.501, 0.124],
  [0.470, 0.500, 0.100], // талия
  [0.505, 0.500, 0.110],
  [0.560, 0.501, 0.162], // бёдра
  [0.620, 0.502, 0.164],
  [0.700, 0.503, 0.170],
  [0.800, 0.505, 0.196],
  [0.900, 0.507, 0.232],
  [1.000, 0.509, 0.276], // поток платья уходит за кадр
];

function profile(u: number): { c: number; w: number } | null {
  if (u <= SEG[0][0]) return null;
  for (let i = 1; i < SEG.length; i++) {
    if (u <= SEG[i][0]) {
      const a = SEG[i - 1], b = SEG[i];
      const k = (u - a[0]) / (b[0] - a[0]);
      const s = k * k * (3 - 2 * k); // сглаживание, чтобы не было изломов
      return { c: a[1] + (b[1] - a[1]) * s, w: a[2] + (b[2] - a[2]) * s };
    }
  }
  const l = SEG[SEG.length - 1];
  return { c: l[1], w: l[2] };
}

type Head = { cx: number; cy: number; rx: number; ry: number };
type Stream = {
  p0: { x: number; y: number }; p1: { x: number; y: number };
  p2: { x: number; y: number }; p3: { x: number; y: number };
  wave: number; phase: number; speed: number; bright: number;
};

export default function AifaAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  // Решение «показывать ли» принимается только на клиенте и пересматривается при
  // изменении ширины: на телефоне и на слабом железе фигуры нет совсем.
  useEffect(() => {
    const decide = () => {
      const wide = window.matchMedia('(min-width: 900px)').matches;
      const lite = document.documentElement.classList.contains('perf-lite')
        || document.documentElement.classList.contains('perf-tv');
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      setShow(wide && !lite && !calm && !coarse);
    };
    decide();
    window.addEventListener('resize', decide);
    return () => window.removeEventListener('resize', decide);
  }, []);

  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CH = 'アイウエオカキクケコサシスセソタチツテナニヌネノハヒフヘホ0123456789<>/{}[]()=+*;:.abcdefghijklmnopqrstuvwxyz';
    const rc = () => CH[(Math.random() * CH.length) | 0];
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const LH = 12; // шаг код-строк внутри тела

    let W = 300, H = 540;
    let md: Uint8ClampedArray | null = null;
    let aura: HTMLCanvasElement | null = null;
    let head: Head = { cx: 150, cy: 60, rx: 28, ry: 40 };
    let hair: Stream[] = [];
    let bg: { x: number; y: number; v: number; a: number }[] = [];
    let rows: { off: number; jit: number }[] = [];

    function build() {
      const r = wrap!.getBoundingClientRect();
      W = Math.max(220, Math.min(380, Math.round(r.width || 300)));
      H = Math.max(320, Math.min(680, Math.round(r.height || 540)));
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = W * 0.5, headTop = H * 0.055;
      const mask = document.createElement('canvas');
      mask.width = W; mask.height = H;
      const g = mask.getContext('2d');
      if (!g) return;
      g.fillStyle = '#fff';

      // голова: овал + сужение к подбородку
      const rx = W * 0.096, ry = H * 0.076, cy = headTop + ry;
      head = { cx, cy, rx, ry };
      g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); g.fill();
      g.beginPath();
      g.moveTo(cx - rx * 0.98, cy + ry * 0.15);
      g.quadraticCurveTo(cx - rx * 0.72, cy + ry * 1.22, cx + rx * 0.05, cy + ry * 1.30);
      g.quadraticCurveTo(cx + rx * 0.86, cy + ry * 1.05, cx + rx * 0.98, cy + ry * 0.10);
      g.closePath(); g.fill();

      // тело по медиальной оси
      g.beginPath();
      let first = true;
      for (let y = H * 0.23; y <= H; y += 2) {
        const p = profile(y / H); if (!p) continue;
        const x = p.c * W - p.w * W;
        if (first) { g.moveTo(x, y); first = false; } else g.lineTo(x, y);
      }
      for (let y = H; y >= H * 0.23; y -= 2) {
        const p = profile(y / H); if (!p) continue;
        g.lineTo(p.c * W + p.w * W, y);
      }
      g.closePath(); g.fill();

      // руки — прижаты к телу, тонкие
      for (const side of [-1, 1]) {
        g.beginPath(); first = true;
        for (let y = H * 0.33; y <= H * 0.66; y += 2) {
          const p = profile(y / H); if (!p) continue;
          const off = (p.w + 0.008) * W, arm = W * 0.015 * (1 - (y / H - 0.33) * 0.4);
          const x = p.c * W + side * off;
          if (first) { g.moveTo(x - arm, y); first = false; } else g.lineTo(x - arm, y);
        }
        for (let y = H * 0.66; y >= H * 0.33; y -= 2) {
          const p = profile(y / H); if (!p) continue;
          const off = (p.w + 0.008) * W, arm = W * 0.015 * (1 - (y / H - 0.33) * 0.4);
          g.lineTo(p.c * W + side * off + arm, y);
        }
        g.closePath(); g.fill();
      }
      md = g.getImageData(0, 0, W, H).data;

      aura = document.createElement('canvas'); aura.width = W; aura.height = H;
      const ax = aura.getContext('2d');
      if (ax) { ax.filter = 'blur(14px)'; ax.globalAlpha = 0.75; ax.drawImage(mask, 0, 0); }

      // пряди: корни только на затылочной половине, лицо не перекрываем
      hair = [];
      const NH = Math.max(10, Math.round(W / 15));
      for (let i = 0; i < NH; i++) {
        const side = i % 2 ? 1 : -1;
        const k = i / NH;
        const a = -Math.PI / 2 + side * (0.62 + k * 0.72);
        const p0 = { x: cx + Math.cos(a) * rx * 0.95, y: cy + Math.sin(a) * ry * 0.95 };
        const drop = H * (0.42 + k * 0.18 + Math.random() * 0.16);
        const out = W * (0.19 + k * 0.19 + Math.random() * 0.09);
        hair.push({
          p0,
          p1: { x: p0.x + side * rx * 0.18, y: p0.y + drop * 0.34 },
          p2: { x: cx + side * out * 0.78, y: p0.y + drop * 0.74 },
          p3: { x: cx + side * out, y: p0.y + drop },
          wave: (0.6 + Math.random() * 1.2) * W * 0.02,
          phase: Math.random() * 1000,
          speed: 0.3 + Math.random() * 0.7,
          bright: 0.4 + Math.random() * 0.6,
        });
      }

      bg = [];
      for (let x = 0; x < W; x += 26) {
        bg.push({ x: x + Math.random() * 10, y: Math.random() * H, v: 0.2 + Math.random() * 0.4, a: 0.04 + Math.random() * 0.06 });
      }
      rows = [];
      for (let y = 0; y < H; y += LH) rows.push({ off: Math.random() * 8, jit: Math.random() });
    }

    const inFig = (x: number, y: number) => {
      x |= 0; y |= 0;
      return !!md && x >= 0 && y >= 0 && x < W && y < H && md[(y * W + x) * 4 + 3] > 40;
    };

    const hairPoint = (s: Stream, u: number) => {
      const m = 1 - u;
      const b0 = m * m * m, b1 = 3 * m * m * u, b2 = 3 * m * u * u, b3 = u * u * u;
      return {
        x: b0 * s.p0.x + b1 * s.p1.x + b2 * s.p2.x + b3 * s.p3.x + Math.sin(u * 6.1 + s.phase) * s.wave * u,
        y: b0 * s.p0.y + b1 * s.p1.y + b2 * s.p2.y + b3 * s.p3.y,
      };
    };

    let t = 0, last = 0, raf = 0, visible = true;

    function draw(now: number) {
      raf = requestAnimationFrame(draw);
      if (!visible || now - last < 33) return;
      last = now; t++;

      const breathe = Math.sin(t * 0.028) * 1.6;
      const sway = Math.sin(t * 0.013) * 2.2;
      const mood = (window as unknown as { __aifaMood?: string }).__aifaMood;
      const thinking = mood === 'thinking';
      const speaking = !!(window.speechSynthesis && window.speechSynthesis.speaking);
      const HOT = thinking ? [176, 148, 255] : [168, 246, 255];
      const hot = (a: number) => `rgba(${HOT[0]},${HOT[1]},${HOT[2]},${a.toFixed(2)})`;

      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = '#04050c'; ctx!.fillRect(0, 0, W, H);

      // 1. еле заметные фоновые потоки
      ctx!.font = '10px monospace'; ctx!.textBaseline = 'top';
      for (const b of bg) {
        ctx!.fillStyle = `rgba(70,130,190,${b.a})`;
        ctx!.fillText(rc(), b.x, b.y);
        b.y += b.v; if (b.y > H) b.y = -12;
      }

      // 2. аура — фигура читается как свет
      ctx!.globalCompositeOperation = 'lighter';
      ctx!.globalAlpha = thinking ? 0.14 : 0.17;
      if (aura) ctx!.drawImage(aura, sway, -breathe);
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = 'source-over';

      // 3. волосы — рисуются ДО тела, чтобы силуэт и лицо оставались поверх
      for (const s of hair) {
        for (let i = 0; i < 52; i++) {
          const u = i / 52;
          const pt = hairPoint(s, u);
          const flow = ((t * s.speed * 0.6 + i * 3 + s.phase) % 100) / 100;
          const a = (1 - u * 0.72) * s.bright * (0.3 + flow * 0.52);
          if (a < 0.04) continue;
          ctx!.fillStyle = Math.random() > 0.99 ? 'rgba(255,255,255,.85)' : hot(a);
          ctx!.fillText(rc(), pt.x + sway, pt.y - breathe);
        }
      }

      // 4. тело — код-строки вдоль формы, ярче у краёв (эффект плетения нитей)
      ctx!.font = '9px monospace';
      for (let ri = 0; ri < rows.length; ri++) {
        const y = ri * LH - breathe;
        const u = (y + breathe) / H;
        const p = profile(u);
        let x0: number, x1: number;
        if (p) { x0 = p.c * W - p.w * W + sway; x1 = p.c * W + p.w * W + sway; }
        else if (y > H * 0.04 && y < H * 0.23) { x0 = head.cx - head.rx + sway; x1 = head.cx + head.rx + sway; }
        else continue;
        const drift = (t * 0.55 * (0.6 + rows[ri].jit)) % 9;
        const onHead = (y + breathe) < H * 0.235;
        for (let x = x0 - 3; x < x1 + 3; x += 6) {
          const px = x + rows[ri].off + drift;
          if (!inFig(px - sway, y + breathe)) continue;
          // на голове код реже — иначе он забивает линию профиля и лицо пропадает
          if (onHead && Math.random() > 0.42) continue;
          const edge = Math.min(px - x0, x1 - px) / Math.max(6, (x1 - x0) * 0.5);
          const a = 0.3 + (1 - Math.min(1, edge)) * 0.62;
          ctx!.fillStyle = Math.random() > 0.985 ? 'rgba(255,255,255,.95)' : hot(a);
          ctx!.fillText(rc(), px, y);
        }
      }

      // 5. контур силуэта и лицо — тонкие светящиеся линии
      ctx!.save();
      ctx!.globalCompositeOperation = 'lighter';
      ctx!.strokeStyle = 'rgba(200,248,255,.62)'; ctx!.lineWidth = 1.1;
      ctx!.shadowColor = 'rgba(0,240,255,.95)'; ctx!.shadowBlur = 8;
      for (const side of [-1, 1]) {
        ctx!.beginPath();
        let started = false;
        for (let y = H * 0.23; y <= H; y += 3) {
          const p = profile(y / H); if (!p) continue;
          const x = p.c * W + side * p.w * W + sway;
          if (!started) { ctx!.moveTo(x, y - breathe); started = true; } else ctx!.lineTo(x, y - breathe);
        }
        ctx!.stroke();
      }
      const fx = head.cx + sway, fy = head.cy - breathe;
      ctx!.beginPath();
      ctx!.ellipse(fx, fy, head.rx, head.ry, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.strokeStyle = 'rgba(215,250,255,.80)'; ctx!.lineWidth = 1.25;
      ctx!.beginPath();
      ctx!.moveTo(fx - head.rx * 0.62, fy - head.ry * 0.42);                                                  // лоб
      ctx!.quadraticCurveTo(fx - head.rx * 0.95, fy - head.ry * 0.05, fx - head.rx * 0.74, fy + head.ry * 0.12); // нос
      ctx!.quadraticCurveTo(fx - head.rx * 0.92, fy + head.ry * 0.20, fx - head.rx * 0.66, fy + head.ry * 0.34); // губы
      ctx!.quadraticCurveTo(fx - head.rx * 0.50, fy + head.ry * 0.95, fx + head.rx * 0.10, fy + head.ry * 1.18); // подбородок
      ctx!.stroke();
      const blink = (t % 190) < 5;
      ctx!.beginPath();
      ctx!.moveTo(fx - head.rx * 0.42, fy - head.ry * 0.10);
      ctx!.lineTo(fx - head.rx * (blink ? 0.10 : 0.14), fy - head.ry * (blink ? 0.10 : 0.06));
      ctx!.stroke();
      if (speaking) {
        const o = Math.abs(Math.sin(t * 0.45)) * head.ry * 0.1;
        ctx!.beginPath();
        ctx!.moveTo(fx - head.rx * 0.70, fy + head.ry * 0.30 + o);
        ctx!.lineTo(fx - head.rx * 0.46, fy + head.ry * 0.32 + o);
        ctx!.stroke();
      }
      ctx!.restore();

      // 6. виньетка — фигура «живёт» в темноте
      const vg = ctx!.createRadialGradient(W / 2, H * 0.42, H * 0.18, W / 2, H * 0.5, H * 0.72);
      vg.addColorStop(0, 'rgba(4,5,12,0)');
      vg.addColorStop(1, 'rgba(4,5,12,.72)');
      ctx!.fillStyle = vg; ctx!.fillRect(0, 0, W, H);
    }

    build();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => build()) : null;
    ro?.observe(wrap);
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }, { threshold: 0.01 })
      : null;
    io?.observe(wrap);
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect(); };
  }, [show]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      {show && (
        <div ref={wrapRef} className="cab-aifa-figure" aria-hidden="true">
          <canvas ref={canvasRef} />
          <div className="cab-aifa-name">AIfa</div>
        </div>
      )}
    </>
  );
}
