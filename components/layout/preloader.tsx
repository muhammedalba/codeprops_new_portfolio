'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock scroll when loading
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setLoading(false);
      // Unlock scroll after animation
      document.body.style.overflow = 'unset';
    }, 1600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-700 ease-out",
        !loading && "opacity-0 pointer-events-none"
      )}
    >
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Logo/Symbol */}
        <div className="relative w-24 h-24 mb-12 animate-[fade-in_1s_ease-out_forwards]">
          <div
            className="absolute inset-0 border-2 border-primary/20 rounded-[35%] shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)] animate-[spin_3s_linear_infinite]"
          />
          <div
            className="absolute inset-0 border border-primary/40 rounded-[35%] animate-[spin_4s_linear_infinite_reverse]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-2xl font-black text-primary tracking-tighter animate-[pulse_2s_ease-in-out_infinite]"
            >
              CP
            </span>
          </div>
        </div>

        {/* Brand Name with revealing text effect */}
        <div className="overflow-hidden">
          <h2
            className="text-2xl md:text-3xl font-heading font-bold tracking-widest uppercase text-foreground animate-[reveal-up_0.8s_ease-out_forwards] [animation-delay:0.4s]"
          >
             Code<span className="text-primary">Props</span>
          </h2>
        </div>

        {/* Professional Loading Bar */}
        <div className="mt-8 w-48 h-[2px] bg-muted relative overflow-hidden rounded-full">
          <div
            className="absolute inset-0 bg-primary animate-[loading_2.5s_ease-in-out_forwards]"
          />
        </div>

        {/* Technical Subtitle */}
        <p
          className="mt-4 text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground animate-[fade-in_0.7s_ease-out_forwards] [animation-delay:1.2s] opacity-0"
        >
          Initializing Engineering Stack
        </p>
      </div>
    </div>
  );
}
