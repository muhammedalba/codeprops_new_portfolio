'use client';

import { useEffect, useState, useMemo } from 'react';

export function ConnectivityOrb() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dots = useMemo(() => [...Array(20)].map((_, i) => ({
    id: i,
    left: `${(i * 17.7) % 100}%`,
    top: `${(i * 13.3) % 100}%`,
    duration: 2 + (i % 3),
    delay: -i * 0.4
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`
        }}
      >
        {/* Core Glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        
        {/* Connection Points */}
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-[pulse_3s_ease-in-out_infinite]"
            style={{
              left: dot.left,
              top: dot.top,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}

        {/* Rings */}
        <div
          className="absolute inset-0 border border-primary/10 rounded-full animate-[spin_30s_linear_infinite]"
        />
        <div
          className="absolute inset-[10%] border border-primary/5 rounded-full animate-[spin_20s_linear_infinite_reverse]"
        />
      </div>

      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
