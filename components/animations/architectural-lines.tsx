'use client';

import React from 'react';

function ArchitecturalLinesComponent() {
  // Stable random-like values for dots to prevent hydration mismatch
  const dots = React.useMemo(() => [...Array(15)].map((_, i) => ({
    id: i,
    left: `${(i * 7.3) % 100}%`,
    top: `${(i * 13.7) % 100}%`,
    duration: 5 + (i % 5),
    delay: -i * 0.7
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving Vertical Lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-[drift_10s_linear_infinite]"
          style={{ 
            left: `${20 * i + 10}%`,
            animationDuration: `${10 + i * 2}s`,
            animationDelay: `${-i * 1.5}s`
          }}
        />
      ))}

      {/* Moving Horizontal Lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[drift_8s_linear_infinite]"
          style={{ 
            top: `${20 * i + 15}%`,
            animationDuration: `${8 + i * 2}s`,
            animationDelay: `${-i * 1.5}s`
          }}
        />
      ))}

      {/* Blueprint Square */}
      <div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 hidden lg:block rotate-[10deg] animate-[fade-in_1.5s_ease-out_forwards]"
      >
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />
        
        {/* Internal Cross */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-primary/10" />
      </div>

      {/* Floating Tech Dots - Optimized with stable values */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full animate-[float_5s_ease-in-out_infinite]"
          style={{
            left: dot.left,
            top: dot.top,
            animationDuration: `${dot.duration}s`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export const ArchitecturalLines = React.memo(ArchitecturalLinesComponent);
