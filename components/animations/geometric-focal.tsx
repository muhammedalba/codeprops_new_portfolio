'use client';

import React from 'react';

export function GeometricFocal() {
  const particles = React.useMemo(() => [...Array(8)].map((_, i) => ({
    id: i,
    left: `${20 + (i * 10)}%`,
    top: `${15 + (i * 8)}%`,
    duration: 3 + i * 0.5,
    delay: -i * 0.2
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main Geometric Shape - Abstract 3D Cube */}
      <div
        className="absolute right-[5%] top-1/2 -translate-y-1/2 animate-[fade-in_1.4s_ease-out_forwards] [animation-delay:0.5s] opacity-0"
      >
        <div className="relative w-[450px] h-[450px]" style={{ perspective: '1000px' }}>
          {/* Rotating Container */}
          <div
            className="absolute inset-0 animate-[spin_40s_linear_infinite]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Face */}
            <div
              className="absolute inset-0 border border-primary/20 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--primary) / 0.02) 100%)',
                transform: 'translateZ(100px)',
              }}
            />
            
            {/* Back Face */}
            <div
              className="absolute inset-0 border border-primary/15 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.03) 0%, hsl(var(--primary) / 0.01) 100%)',
                transform: 'translateZ(-100px) rotateY(180deg)',
              }}
            />

            {/* Right Face */}
            <div
              className="absolute inset-0 border border-primary/15 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.04) 0%, hsl(var(--primary) / 0.01) 100%)',
                transform: 'rotateY(90deg) translateZ(100px)',
              }}
            />

            {/* Left Face */}
            <div
              className="absolute inset-0 border border-primary/15 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.04) 0%, hsl(var(--primary) / 0.01) 100%)',
                transform: 'rotateY(-90deg) translateZ(100px)',
              }}
            />
          </div>

          {/* Accent Lines */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-[spin_60s_linear_infinite]"
          >
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          {/* Floating Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute w-1 h-1 bg-primary/40 rounded-full animate-[float_4s_ease-in-out_infinite]"
              style={{
                left: p.left,
                top: p.top,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Code-Inspired Elements */}
      <div
        className="absolute left-[10%] top-[20%] font-mono text-xs text-primary/20 select-none animate-[fade-in_1s_ease-out_forwards] [animation-delay:1s] opacity-0"
      >
        <div className="animate-pulse">
          {'<code>'}
        </div>
      </div>

      <div
        className="absolute left-[12%] bottom-[25%] font-mono text-xs text-primary/20 select-none animate-[fade-in_1s_ease-out_forwards] [animation-delay:1.2s] opacity-0"
      >
        <div className="animate-pulse [animation-delay:0.5s]">
          {'</code>'}
        </div>
      </div>
    </div>
  );
}
