'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { useIsMobile } from '@/hooks/use-mobile';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  isAccent: boolean;
}

interface ParticleBackgroundProps {
  isPlaying?: boolean;
}

export function ParticleBackground({ isPlaying = false }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const stationColorRef = useRef('#00F0FF');
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const getStationColor = useCallback(() => {
    const state = usePlayerStore.getState();
    return state.currentStation?.color || '#00F0FF';
  }, []);

  useEffect(() => {
    // Respect the user's reduced-motion preference: no canvas animation at all.
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Light mode on phones: the per-frame grid redraw, radial-gradient glows
    // and the O(n²) connection-line loop (140² ≈ 19 600 checks/frame) are what
    // choke the mobile GPU and make the whole page stutter. Drop them and keep
    // only a small, cheap particle field.
    const low = isMobile;

    let lastWidth = window.innerWidth;
    const resize = () => {
      // On mobile, height changes due to address bar show/hide. Avoid resizing if width is the same.
      if (window.innerWidth === lastWidth && canvas.width !== 0 && window.innerWidth < 768) {
        return;
      }
      lastWidth = window.innerWidth;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const neonColors = ['#00F0FF', '#FF003C', '#B000FF', '#39FF14'];

    // Particle count: much lower on phones.
    const count = low
      ? Math.min(30, Math.floor((canvas.width * canvas.height) / 22000))
      : Math.min(140, Math.floor((canvas.width * canvas.height) / 10000));
    particlesRef.current = Array.from({ length: count }, () => {
      const isAccent = Math.random() < 0.3;
      const accentColor = neonColors[Math.floor(Math.random() * neonColors.length)];
      const baseRadius = isAccent
        ? Math.random() * 2 + 2
        : Math.random() * 1.5 + 0.5;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: baseRadius,
        opacity: isAccent
          ? Math.random() * 0.4 + 0.2
          : Math.random() * 0.35 + 0.08,
        color: isAccent ? accentColor : '#E8E8ED',
        isAccent,
      };
    });

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    // Pointer interaction is desktop-only (touch devices don't hover).
    if (!low) window.addEventListener('mousemove', handleMouse);

    const CONNECTION_DIST = 180;

    const animate = () => {
      // Semi-transparent clear for trails
      ctx.fillStyle = 'rgba(5, 5, 7, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update station color ref
      stationColorRef.current = getStationColor();

      const speedMult = isPlaying ? 2 : 1;
      const particles = particlesRef.current;

      // Draw subtle grid (desktop only)
      if (!low) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 1;
        const gridSize = 100;
        for (let gx = 0; gx < canvas.width; gx += gridSize) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, canvas.height);
          ctx.stroke();
        }
        for (let gy = 0; gy < canvas.height; gy += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(canvas.width, gy);
          ctx.stroke();
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse interaction: attract when far, repel when close (desktop only)
        if (!low) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200;
            if (dist < 80) {
              // Repel when very close
              p.vx += (dx / dist) * force * 0.2;
              p.vy += (dy / dist) * force * 0.2;
            } else {
              // Attract when at medium distance
              p.vx -= (dx / dist) * force * 0.05;
              p.vy -= (dy / dist) * force * 0.05;
            }
          }
        }

        // Damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Move
        p.x += p.vx * speedMult;
        p.y += p.vy * speedMult;

        // Wrap around
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Recolor accent particles to station color when playing
        const drawColor = p.isAccent && isPlaying ? stationColorRef.current : p.color;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = drawColor;
        ctx.globalAlpha = p.opacity * (isPlaying ? 1.2 : 0.7);
        ctx.fill();

        // Glow for larger particles (desktop only)
        if (!low && p.radius > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          gradient.addColorStop(0, drawColor);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.globalAlpha = p.opacity * 0.12 * (isPlaying ? 1.5 : 0.8);
          ctx.fill();
        }

        // Draw connections with gradient (desktop only — this is the O(n²) hot loop)
        if (!low) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const ddx = p.x - p2.x;
            const ddy = p.y - p2.y;
            const d = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d < CONNECTION_DIST) {
              const alpha = (1 - d / CONNECTION_DIST) * 0.1 * (isPlaying ? 1.4 : 0.6);
              const lineGrad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
              const p2Color = p2.isAccent && isPlaying ? stationColorRef.current : p2.color;
              lineGrad.addColorStop(0, drawColor);
              lineGrad.addColorStop(0.5, `rgba(255,255,255,${alpha * 0.5})`);
              lineGrad.addColorStop(1, p2Color);

              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = lineGrad;
              ctx.globalAlpha = alpha;
              ctx.lineWidth = p.isAccent || p2.isAccent ? 0.8 : 0.4;
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    // Initial full clear
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [isPlaying, getStationColor, isMobile, reduced]);

  // Reduced-motion: render nothing (static dark background from the page itself).
  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: isPlaying ? 0.7 : 0.4, transition: 'opacity 1.5s ease' }}
    />
  );
}
