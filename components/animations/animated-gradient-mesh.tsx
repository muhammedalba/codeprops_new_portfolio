'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function AnimatedGradientMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Primary Gradient Orb */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-30 animate-[float_20s_ease-in-out_infinite]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            top: '-20%',
            left: '10%',
          }}
        />

        {/* Secondary Gradient Orb */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-25 animate-[float_18s_ease-in-out_infinite] [animation-delay:-5s]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent-secondary)) 0%, transparent 70%)',
            bottom: '-10%',
            right: '15%',
          }}
        />

        {/* Tertiary Gradient Orb */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-[float_22s_ease-in-out_infinite] [animation-delay:-10s]"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary-400)) 0%, transparent 70%)',
            top: '40%',
            right: '20%',
          }}
        />
      </div>

      {/* Grid Overlay for Tech Feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
