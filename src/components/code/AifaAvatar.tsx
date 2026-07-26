'use client';

import { useEffect, useRef, useState } from 'react';

// AIfa — живая голограмма из точек: настоящее 3D, а не плоский рисунок.
//
// Как устроено. Фигура — облако точек в трёхмерии. Тело задано профилем: для
// каждой высоты известны центр, полуширина (X) и ПОЛУГЛУБИНА (Z), поэтому
// сечения — эллипсы, а не линии. Точки разбрасываются по поверхности случайно
// (послойная генерация давала видимые кольца-срезы), плюс часть точек живёт
// внутри объёма — голограмма должна быть наполненной, а не полой скорлупой.
// Каждый кадр облако поворачивается вокруг вертикальной оси и проецируется с
// перспективой. Силуэт рисует контровой свет: точки, чья нормаль почти
// перпендикулярна взгляду, ярче — отсюда живой объём вместо плоского пятна.
// Сложение аддитивное, поэтому сортировка по глубине не нужна.
//
// Живость: дыхание (грудь расширяется), колыхание подола и прядей, медленное
// «оглядывание», волна сканирования снизу вверх, голографические полосы и
// редкий глитч. Код на точках меняется медленно, чтобы не мельтешил.
//
// Где показывается. Только на десктопе: ширина ≥ 900 px, без perf-lite/perf-tv
// (ТВ и слабые устройства), без prefers-reduced-motion и без сенсорного
// указателя. На телефоне и слабом железе компонент не монтируется вовсе.

const STYLE = `
.cab-aifa-stage{display:flex;gap:16px;align-items:stretch}
.cab-aifa-figure{flex:0 0 300px;min-width:250px;align-self:stretch;position:relative;border:1px solid rgba(0,240,255,0.16);border-radius:16px;overflow:hidden;min-height:520px;
  background:radial-gradient(120% 70% at 50% 4%, rgba(0,240,255,0.06), rgba(4,5,12,0) 62%),#04050c}
.cab-aifa-figure canvas{display:block;width:100%;height:100%}
.cab-aifa-figure .cab-aifa-name{position:absolute;bottom:10px;left:0;right:0;text-align:center;color:#4a90c0;font-size:11px;letter-spacing:3px;font-family:monospace;pointer-events:none;text-transform:uppercase}
.cab-aifa-chat{flex:1 1 auto;min-width:0}
`;

/** y (доля высоты) · центр (доля ширины) · полуширина X · полуглубина Z. */
const SEG: [number, number, number, number][] = [
  [0.182, 0.500, 0.040, 0.034], // шея
  [0.210, 0.501, 0.054, 0.046],
  [0.230, 0.502, 0.092, 0.050], // скат плеч
  [0.262, 0.503, 0.150, 0.062], // плечи
  [0.296, 0.504, 0.156, 0.070],
  [0.330, 0.504, 0.150, 0.078], // грудь
  [0.360, 0.502, 0.112, 0.060],
  [0.405, 0.500, 0.092, 0.050], // талия
  [0.450, 0.500, 0.112, 0.064],
  [0.500, 0.502, 0.150, 0.082], // бёдра
  [0.600, 0.503, 0.146, 0.082],
  [0.720, 0.504, 0.150, 0.086],
  [0.850, 0.506, 0.158, 0.092],
  [1.030, 0.508, 0.162, 0.096], // платье уходит за нижний край
];

function prof(u: number): { c: number; rx: number; rz: number } | null {
  if (u <= SEG[0][0]) return null;
  for (let i = 1; i < SEG.length; i++) {
    if (u <= SEG[i][0]) {
      const a = SEG[i - 1], b = SEG[i];
      const k = (u - a[0]) / (b[0] - a[0]);
      const s = k * k * (3 - 2 * k);
      return { c: a[1] + (b[1] - a[1]) * s, rx: a[2] + (b[2] - a[2]) * s, rz: a[3] + (b[3] - a[3]) * s };
    }
  }
  const l = SEG[SEG.length - 1];
  return { c: l[1], rx: l[2], rz: l[3] };
}

const CH = 'アイウエオカキクケコサシスセソタチツテナニヌネノハヒフヘホ0123456789<>/{}[]()=+*;:abcdef';

type Kind = 'head' | 'body' | 'inner' | 'hair';
type Pt = {
  x: number; y: number; z: number; nx: number; nz: number; kind: Kind;
  glow: number; ph: number; ch: string | null; cy: number; u: number; sway: number; part: string;
};

export default function AifaAvatar() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  // Решение «показывать ли» принимается на клиенте и пересматривается при resize.
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

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 300, H = 540;
    let pts: Pt[] = [];
    let headCy = 0.11;

    const add = (
      x: number, y: number, z: number, nx: number, nz: number, kind: Kind,
      glow = 1, u = 0, sway = 0, part = 'skin',
    ) => {
      pts.push({
        x, y, z, nx, nz, kind, glow, u, sway, part,
        ph: Math.random() * Math.PI * 2,
        ch: Math.random() < 0.12 ? CH[(Math.random() * CH.length) | 0] : null,
        cy: Math.random(),
      });
    };

    function build() {
      const r = wrap!.getBoundingClientRect();
      W = Math.max(220, Math.min(400, Math.round(r.width || 300)));
      H = Math.max(320, Math.min(720, Math.round(r.height || 540)));
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      pts = [];
      const S = Math.sqrt((W * H) / (320 * 560));
      const cxN = 0.5;

      // ── голова: эллипсоид со случайными точками (спираль давала «сетчатый мяч»)
      const hr = { x: 0.089, y: 0.070, z: 0.082 };
      const headTop = 0.048;
      headCy = headTop + hr.y;
      const NHEAD = Math.round(5200 * S);   // лицу нужна плотность даже в полный рост
      for (let i = 0; i < NHEAD; i++) {
        const v = Math.acos(1 - 2 * Math.random());
        // две трети точек уводим на переднюю полусферу: на экране лицо занимает
        // мало места, и при равномерном разбросе черты не набирают плотность
        const g = i % 3 !== 0 ? (Math.random() - 0.5) * Math.PI + Math.PI / 2 : Math.random() * Math.PI * 2;
        const sx = Math.sin(v) * Math.cos(g), sy = Math.cos(v), sz = Math.sin(v) * Math.sin(g);
        const face = Math.max(0, sz);
        const nose = Math.exp(-(((sy + 0.02) / 0.16) ** 2)) * face * 0.020;
        const chin = Math.exp(-(((sy + 0.55) / 0.22) ** 2)) * face * 0.010;
        const fx = sx, fy = -sy;                 // карта лица: сверху вниз
        let gl = 0.34 + face * 0.26;
        let part = 'skin';
        if (face > 0.25) {
          // Глаза миндалевидные, с мягким веком и живым бликом зрачка — без
          // чёрных провалов, иначе лицо читается черепом, а не девушкой.
          for (const ex of [-0.30, 0.30]) {
            const d = Math.hypot((fx - ex) / 0.170, (fy + 0.02) / 0.088);
            if (d < 1) { gl *= 0.30 + d * 0.45; part = 'eye'; }
            if (d < 0.30) { gl = 2.6; part = 'pupil'; }
          }
          for (const ex of [-0.31, 0.31]) {       // брови — тонкие дуги
            const dx = Math.abs(fx - ex), dy = Math.abs(fy + 0.22 - dx * dx * 0.5);
            if (dx < 0.22 && dy < 0.045) { gl *= 2.2; part = 'brow'; }
          }
          if (Math.abs(fx) < 0.055 && fy > -0.04 && fy < 0.22) gl *= 1.12 + (fy + 0.04) * 0.5; // нос
          const ld = Math.hypot(fx / 0.215, (fy - 0.40) / 0.070);                              // губы
          if (ld < 1) { gl *= 1.75; part = 'lips'; }
          if (Math.abs(fy - 0.40) < 0.014 && Math.abs(fx) < 0.17) gl *= 0.40;
          for (const ex of [-0.50, 0.50]) if (Math.hypot(fx - ex, fy - 0.13) < 0.20) gl *= 1.10; // скулы
          if (fy < -0.34) gl *= 1.06;                                                            // лоб
        }
        add(sx * hr.x, headCy + sy * -hr.y, sz * hr.z + nose + chin, sx / hr.x, sz / hr.z, 'head', gl, 0, 0, part);
      }

      // ── тело: случайная выборка по всей поверхности, плотность ~периметру сечения
      const Y0 = 0.186, Y1 = 1.04, step = 0.002;
      const grid: { y: number; cum: number }[] = [];
      let total = 0;
      for (let y = Y0; y < Y1; y += step) {
        const p = prof(y);
        total += p ? Math.PI * (p.rx + p.rz) : 0;
        grid.push({ y, cum: total });
      }
      const pickY = () => {
        const r0 = Math.random() * total;
        let lo = 0, hi = grid.length - 1;
        while (lo < hi) { const m = (lo + hi) >> 1; if (grid[m].cum < r0) lo = m + 1; else hi = m; }
        return grid[lo].y + Math.random() * step;
      };

      const NBODY = Math.round(4600 * S);
      for (let i = 0; i < NBODY; i++) {
        const y = pickY(); const p = prof(y); if (!p) continue;
        const th = Math.random() * Math.PI * 2;
        const rough = 0.965 + Math.random() * 0.07;
        add(Math.cos(th) * p.rx * rough + (p.c - cxN), y, Math.sin(th) * p.rz * rough,
            Math.cos(th) / p.rx, Math.sin(th) / p.rz, 'body');
      }
      const NIN = Math.round(1400 * S);
      for (let i = 0; i < NIN; i++) {
        const y = pickY(); const p = prof(y); if (!p) continue;
        const th = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * 0.85;
        add(Math.cos(th) * p.rx * rr + (p.c - cxN), y, Math.sin(th) * p.rz * rr,
            Math.cos(th) / p.rx, Math.sin(th) / p.rz, 'inner', 0.46);
      }

      // ── руки, опущенные вдоль тела
      for (const side of [-1, 1]) {
        const NARM = Math.round(200 * S);
        for (let i = 0; i < NARM; i++) {
          const y = 0.268 + Math.random() * 0.380;
          const p = prof(y); if (!p) continue;
          const ax = side * (p.rx + 0.012), ar = 0.023 * (1 - (y - 0.268) * 0.5);
          const th = Math.random() * Math.PI * 2;
          add(ax + Math.cos(th) * ar + (p.c - cxN), y, Math.sin(th) * ar * 1.1,
              Math.cos(th) / ar, Math.sin(th) / ar, 'body', 1.05);
        }
      }

      // ── волосы: пряди в трёхмерии, от затылка вниз вдоль спины
      const NS = Math.max(16, Math.round(W / 9));
      for (let i = 0; i < NS; i++) {
        const side = i % 2 ? 1 : -1;
        const k = i / NS;
        const a = -Math.PI / 2 + side * (0.42 + k * 0.80);
        const p0 = {
          x: Math.cos(a) * hr.x * 0.95,
          y: headCy + Math.sin(a) * hr.y * 0.95,
          z: (-0.35 - k * 0.75) * hr.z,
        };
        const drop = 0.40 + k * 0.13 + Math.random() * 0.10;
        const out = 0.048 + k * 0.048 + Math.random() * 0.026;
        const back = (0.09 + Math.random() * 0.12) * (0.6 + k);
        const steps = 34;
        for (let s = 0; s <= steps; s++) {
          const u = s / steps, m = 1 - u;
          const b0 = m * m * m, b1 = 3 * m * m * u, b2 = 3 * m * u * u, b3 = u * u * u;
          const x = b0 * p0.x + b1 * (p0.x + side * hr.x * 0.10) + b2 * (side * out * 0.85) + b3 * (side * out);
          const y = b0 * p0.y + b1 * (p0.y + drop * 0.34) + b2 * (p0.y + drop * 0.74) + b3 * (p0.y + drop);
          const z = b0 * p0.z + b1 * (p0.z - back * 0.5) + b2 * (p0.z - back) + b3 * (p0.z - back * 0.8);
          add(x, y, z, x, z, 'hair', 1.30 + (1 - u) * 0.55, u, side * (0.4 + Math.random() * 0.8));
        }
      }
    }

    let t = 0, last = 0, raf = 0, visible = true;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!visible || now - last < 33) return;
      last = now; t++;

      const mood = (window as unknown as { __aifaMood?: string }).__aifaMood;
      const thinking = mood === 'thinking';
      const speaking = !!(window.speechSynthesis && window.speechSynthesis.speaking);
      const COL = thinking ? [178, 150, 255] : [150, 236, 255];

      const yaw = Math.sin(t * 0.0042) * 0.26 + Math.sin(t * 0.0017) * 0.07;
      const ca = Math.cos(yaw), sa = Math.sin(yaw);
      const breathe = Math.sin(t * 0.022);
      const bob = breathe * 0.0022;
      const wave = ((t * 0.0026) % 1.35) - 0.2;

      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = '#04050c'; ctx!.fillRect(0, 0, W, H);
      ctx!.globalCompositeOperation = 'lighter';

      const F = 2.3, cx = W * 0.5;
      ctx!.textBaseline = 'top';
      const fontPx = Math.max(7, Math.round(W * 0.030));
      ctx!.font = fontPx + 'px monospace';

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        let x = p.x, y = p.y + bob, z = p.z;

        if (p.kind === 'body' || p.kind === 'inner') {
          const chest = Math.exp(-(((p.y - 0.33) / 0.13) ** 2));
          const k = 1 + breathe * 0.030 * chest;
          x *= k; z *= k;
          if (p.y > 0.60) {
            const s = Math.sin(t * 0.019 + p.y * 7 + p.ph) * 0.010 * (p.y - 0.60);
            x += s; z += s * 0.6;
          }
        } else if (p.kind === 'head' && p.part === 'lips' && speaking) {
          y += Math.abs(Math.sin(t * 0.32)) * 0.006;
        } else if (p.kind === 'hair') {
          x += Math.sin(t * 0.017 + p.ph) * 0.020 * p.u * p.sway;
          z += Math.cos(t * 0.013 + p.ph) * 0.014 * p.u;
        }

        let ca2 = ca, sa2 = sa;
        if (p.kind === 'head' || p.kind === 'hair') {
          const yawH = yaw + Math.sin(t * 0.0031) * 0.13;   // поворачивается с опережением
          ca2 = Math.cos(yawH); sa2 = Math.sin(yawH);
          y += Math.sin(t * 0.0047) * 0.0035;               // и слегка кивает
          x += Math.sin(t * 0.0026) * 0.004;
        }
        if ((p.part === 'eye' || p.part === 'pupil') && ((t + 13) % 190) < 4) continue;  // моргание

        const rx = x * ca2 + z * sa2;
        const rz = -x * sa2 + z * ca2;
        const s = F / (F + rz + 0.55);
        const ZOOM = 1.46, ANCH = 0.118;                    // ближе к зрителю, голова выше
        const sx = cx + rx * W * s * ZOOM;
        const sy = (y * H * s + (1 - s) * H * 0.42 - H * ANCH) * ZOOM + H * 0.075;

        if (p.y > 0.995) continue;
        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;

        const nrx = p.nx * ca + p.nz * sa;
        const nrz = -p.nx * sa + p.nz * ca;
        const nl = Math.hypot(nrx, nrz) || 1;
        const facing = nrz / nl;
        const rim = Math.pow(1 - Math.min(1, Math.abs(facing)), 2.0);

        const depth = 0.55 + s * 0.75;
        const scan = Math.exp(-(((p.y - wave) / 0.045) ** 2)) * 0.9;
        const twinkle = 0.82 + 0.18 * Math.sin(t * 0.09 + p.ph);
        const front = Math.max(0, facing);
        const base = p.kind === 'inner' ? 0.26
          : p.kind === 'head' ? (0.09 + rim * 0.36 + front * 1.00)
          : (0.32 + rim * 1.05);
        let a = base * depth * p.glow * twinkle + scan;
        if (facing < -0.35 && p.kind !== 'hair') a *= p.kind === 'head' ? 0.30 : 0.45;
        if (p.y > 0.88) a *= Math.max(0, 1 - (p.y - 0.88) / 0.11);
        if (a < 0.035) continue;
        if (a > 1) a = 1;

        const near = Math.max(0, s - 0.72);
        const size = (1.15 + near * 3.4) * (p.kind === 'hair' ? 0.75 : p.kind === 'head' ? 0.70 : 1);

        ctx!.fillStyle = `rgba(${COL[0]},${COL[1]},${COL[2]},${(a * 0.24).toFixed(3)})`;
        ctx!.fillRect(sx - size, sy - size, size * 2.2, size * 2.2);
        ctx!.fillStyle = a > 0.86
          ? `rgba(235,255,255,${a.toFixed(3)})`
          : `rgba(${COL[0]},${COL[1]},${COL[2]},${a.toFixed(3)})`;
        ctx!.fillRect(sx - size * 0.45, sy - size * 0.45, size * 0.95, size * 0.95);

        if (p.ch && a > 0.30 && s > 0.85) {
          if (((t * 0.012 + p.cy) % 1) < 0.02) p.ch = CH[(Math.random() * CH.length) | 0];
          ctx!.fillStyle = `rgba(${COL[0]},${COL[1]},${COL[2]},${(a * 0.55).toFixed(3)})`;
          ctx!.fillText(p.ch, sx + 1.5, sy - fontPx * 0.5);
        }
      }

      if (speaking) {
        const o = Math.abs(Math.sin(t * 0.35)) * H * 0.004;
        ctx!.fillStyle = 'rgba(235,255,255,.75)';
        ctx!.fillRect(cx - W * 0.022, (headCy + bob) * H + H * 0.028 + o, W * 0.044, 1.4);
      }

      ctx!.globalCompositeOperation = 'source-over';

      // голографические полосы, медленно ползущие вверх
      ctx!.fillStyle = 'rgba(4,10,18,.20)';
      const off = (t * 0.55) % 5;
      for (let y = -off; y < H; y += 5) ctx!.fillRect(0, y, W, 1.2);

      // редкий короткий глитч — строка изображения на миг съезжает вбок
      if ((t % 370) === 0) {
        const gy = (t * 37) % Math.max(1, H - 60);
        const band = ctx!.getImageData(0, gy * dpr, W * dpr, 7 * dpr);
        ctx!.putImageData(band, 3 * dpr, gy * dpr);
      }

      const vg = ctx!.createRadialGradient(cx, H * 0.42, H * 0.20, cx, H * 0.5, H * 0.74);
      vg.addColorStop(0, 'rgba(4,5,12,0)');
      vg.addColorStop(1, 'rgba(4,5,12,.70)');
      ctx!.fillStyle = vg; ctx!.fillRect(0, 0, W, H);
    }

    build();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => build()) : null;
    ro?.observe(wrap);
    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((e) => { visible = e[0]?.isIntersecting ?? true; }, { threshold: 0.01 })
      : null;
    io?.observe(wrap);
    raf = requestAnimationFrame(frame);

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
