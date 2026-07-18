'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { stations } from '@/lib/stations';

interface GenreFilterProps {
  selectedGenre: string;
  onSelect: (genre: string) => void;
}

export function GenreFilter({ selectedGenre, onSelect }: GenreFilterProps) {
  const genres = useMemo(() => {
    const genreSet = new Set<string>();
    stations.forEach((s) => {
      s.genre.split(' / ').forEach((g) => genreSet.add(g.trim()));
    });
    return ['ALL', ...Array.from(genreSet)];
  }, []);

  const activeColor = useMemo(() => {
    if (selectedGenre === 'ALL') return '#00F0FF';
    const station = stations.find((s) =>
      s.genre.split(' / ').map((g) => g.trim()).includes(selectedGenre)
    );
    return station?.color ?? '#00F0FF';
  }, [selectedGenre]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-6 sm:mb-8 relative z-20"
    >
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {genres.map((genre, i) => {
          const isActive = selectedGenre === genre;

          return (
            <motion.button
              key={genre}
              onClick={() => onSelect(genre)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
              className="relative flex-shrink-0 rounded-full px-4 py-2 text-[11px] tracking-[0.1em] uppercase font-medium border cursor-pointer transition-all duration-200"
              style={
                isActive
                  ? {
                      borderColor: `${activeColor}40`,
                      color: activeColor,
                      backgroundColor: `${activeColor}10`,
                      boxShadow: `0 0 20px ${activeColor}10, inset 0 0 20px ${activeColor}05`,
                    }
                  : {
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      borderColor: 'rgba(255,255,255,0.06)',
                      color: '#6B6B80',
                    }
              }
            >
              {genre}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${activeColor}05 0%, transparent 70%)`,
                  }}
                  layoutId="genre-glow"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}