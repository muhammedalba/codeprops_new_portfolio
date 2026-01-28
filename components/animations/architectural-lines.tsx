'use client';

import React from 'react';
import { m } from 'framer-motion';

function ArchitecturalLinesComponent() {
  // Stable random-like values for dots to prevent hydration mismatch
  const dots = React.useMemo(() => [...Array(15)].map((_, i) => ({
    id: i,
    left: `${(i * 7.3) % 100}%`,
    top: `${(i * 13.7) % 100}%`,
    duration: 5 + (i % 5),
    delay: i * 0.3
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving Vertical Lines */}
      {[...Array(5)].map((_, i) => (
        <m.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{ left: `${20 * i + 10}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [0, 20, 0], // Reduced distance for subtle feel
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Moving Horizontal Lines */}
      {[...Array(5)].map((_, i) => (
        <m.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{ top: `${20 * i + 15}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, 15, 0], // Reduced distance
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Blueprint Square */}
      <m.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 hidden lg:block"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 1, rotate: 10 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />
        
        {/* Internal Cross */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-primary/10" />
      </m.div>

      {/* Floating Tech Dots - Optimized with stable values */}
      {dots.map((dot) => (
        <m.div
          key={dot.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

export const ArchitecturalLines = React.memo(ArchitecturalLinesComponent);
