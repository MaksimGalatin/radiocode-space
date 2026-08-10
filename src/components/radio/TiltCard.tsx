'use client';

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export function TiltCard({ children, className = '', glowColor = '#00F0FF', intensity = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  /**
   * 🔴 СВЕЧЕНИЕ ЗА КУРСОРОМ НЕ РАБОТАЛО НИКОГДА.
   *
   * Было так:
   *   background: `radial-gradient(circle at ${glowX}% ${glowY}%, …)`
   *
   * `glowX` и `glowY` — это не числа, а объекты движения (MotionValue). При
   * подстановке в обычную строку каждый превращается в текст «[object Object]»,
   * и в разметку уходило:
   *
   *   background: radial-gradient(circle at [object Object]% [object Object]%, …)
   *
   * Такое правило браузер не разбирает и отбрасывает целиком — то есть свечения
   * не было вовсе, ни следящего за курсором, ни просто статичного. Заметить это
   * глазами трудно: пропало не «что-то не так», а эффект, которого никто не
   * видел. Нашлось проверкой разметки W3C 10.08.2026 — четыре ошибки
   * «CSS: background: Parse Error» на одной странице.
   *
   * `useMotionTemplate` — это тот же шаблон строки, но понимающий объекты
   * движения: он подставляет их ТЕКУЩИЕ значения и обновляет строку при каждом
   * изменении. Теперь свечение действительно следует за курсором.
   */
  const фонСвечения = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}12 0%, transparent 60%)`;

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={className}
    >
      {/* Dynamic glow that follows mouse */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: фонСвечения }}
      />
      {children}
    </motion.div>
  );
}