'use client';

import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';

const neonColors = ['#00F0FF', '#FF003C', '#B000FF', '#39FF14'];

interface OrbConfig {
  id: number;
  color: string;
  x: string;
  y: string;
  size: string;
  blurSize: string;
  opacity: number;
  playingOpacity: number;
  duration: number;
  delay: number;
  dx: number;
  dy: number;
}

const orbs: OrbConfig[] = [
  {
    id: 0,
    color: '#00F0FF',
    x: '50%',
    y: '45%',
    size: '600px',
    blurSize: '1000px',
    opacity: 0.2,
    playingOpacity: 0.5,
    duration: 6,
    delay: 0,
    dx: 30,
    dy: 25,
  },
  {
    id: 1,
    color: '#B000FF',
    x: '-10%',
    y: '-5%',
    size: '500px',
    blurSize: '900px',
    opacity: 0.15,
    playingOpacity: 0.35,
    duration: 7,
    delay: 0.5,
    dx: 40,
    dy: 35,
  },
  {
    id: 2,
    color: '#FF003C',
    x: '110%',
    y: '105%',
    size: '450px',
    blurSize: '800px',
    opacity: 0.12,
    playingOpacity: 0.3,
    duration: 8,
    delay: 1,
    dx: -35,
    dy: -30,
  },
  {
    id: 3,
    color: '#00F0FF',
    x: '80%',
    y: '20%',
    size: '350px',
    blurSize: '600px',
    opacity: 0.08,
    playingOpacity: 0.2,
    duration: 5,
    delay: 1.5,
    dx: -25,
    dy: 20,
  },
  {
    id: 4,
    color: '#39FF14',
    x: '5%',
    y: '70%',
    size: '400px',
    blurSize: '700px',
    opacity: 0.06,
    playingOpacity: 0.18,
    duration: 9,
    delay: 2,
    dx: 30,
    dy: -20,
  },
  {
    id: 5,
    color: '#B000FF',
    x: '60%',
    y: '90%',
    size: '550px',
    blurSize: '950px',
    opacity: 0.1,
    playingOpacity: 0.25,
    duration: 7.5,
    delay: 0.8,
    dx: -20,
    dy: -35,
  },
  {
    id: 6,
    color: '#FF003C',
    x: '25%',
    y: '10%',
    size: '300px',
    blurSize: '500px',
    opacity: 0.05,
    playingOpacity: 0.15,
    duration: 6.5,
    delay: 1.2,
    dx: 20,
    dy: 30,
  },
  {
    id: 7,
    color: '#39FF14',
    x: '90%',
    y: '60%',
    size: '420px',
    blurSize: '750px',
    opacity: 0.07,
    playingOpacity: 0.2,
    duration: 8.5,
    delay: 2.5,
    dx: -30,
    dy: 15,
  },
];

export function AmbientOrbs() {
  const { isPlaying, currentStation } = usePlayerStore();

  const stationColor = currentStation?.color || '#00F0FF';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {orbs.map((orb) => {
        // When playing, shift center orb color toward station color
        const effectiveColor = isPlaying && orb.id === 0 ? stationColor : orb.color;
        const effectivePlayingOpacity = isPlaying && orb.id === 0 ? 0.45 : orb.playingOpacity;

        return (
          <div key={orb.id} className="absolute" style={{ left: orb.x, top: orb.y, transform: 'translate(-50%, -50%)' }}>
            {/* Main orb */}
            <motion.div
              className="rounded-full"
              style={{
                width: orb.size,
                height: orb.size,
                background: `radial-gradient(circle, ${effectiveColor}12 0%, transparent 70%)`,
                filter: `blur(80px)`,
              }}
              animate={
                isPlaying
                  ? {
                      x: [0, orb.dx, -orb.dx * 0.5, orb.dx * 0.7, 0],
                      y: [0, orb.dy * 0.8, -orb.dy, orb.dy * 0.3, 0],
                      scale: [1, 1.15, 0.9, 1.1, 1],
                      opacity: [effectivePlayingOpacity, effectivePlayingOpacity * 1.3, effectivePlayingOpacity * 0.8, effectivePlayingOpacity],
                    }
                  : {
                      x: [0, orb.dx * 0.3, 0],
                      y: [0, orb.dy * 0.3, 0],
                      opacity: [orb.opacity * 0.7, orb.opacity, orb.opacity * 0.7],
                    }
              }
              transition={{
                duration: isPlaying ? orb.duration * 0.6 : orb.duration,
                repeat: Infinity,
                delay: orb.delay,
                ease: 'easeInOut',
              }}
            />

            {/* Blur shadow companion — 2x size, very low opacity */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: orb.blurSize,
                height: orb.blurSize,
                background: `radial-gradient(circle, ${effectiveColor}06 0%, transparent 60%)`,
                filter: `blur(120px)`,
                opacity: isPlaying ? 0.04 : 0.015,
              }}
              animate={
                isPlaying
                  ? {
                      scale: [1, 1.2, 0.95, 1.1, 1],
                    }
                  : {
                      scale: [1, 1.05, 1],
                    }
              }
              transition={{
                duration: isPlaying ? orb.duration * 0.5 : orb.duration * 1.5,
                repeat: Infinity,
                delay: orb.delay + 0.3,
                ease: 'easeInOut',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}