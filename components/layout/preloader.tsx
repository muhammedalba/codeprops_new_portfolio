'use client';

import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <AnimatePresence>
      {loading && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
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
            <div className="relative w-24 h-24 mb-12">
              <m.div
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ 
                  rotate: 360, 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, ease: "easeOut" },
                    opacity: { duration: 1 }
                  }
                }}
                className="absolute inset-0 border-2 border-primary/20 rounded-[35%] shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)]"
              />
              <m.div
                initial={{ rotate: 45, scale: 0.8, opacity: 0 }}
                animate={{ 
                  rotate: -315, 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.2, ease: "easeOut" },
                    opacity: { duration: 1.2 }
                  }
                }}
                className="absolute inset-0 border border-primary/40 rounded-[35%]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <m.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-black text-primary tracking-tighter"
                >
                  CP
                </m.span>
              </div>
            </div>

            {/* Brand Name with revealing text effect */}
            <div className="overflow-hidden">
              <m.h2
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="text-2xl md:text-3xl font-heading font-bold tracking-widest uppercase text-foreground"
              >
                 Code<span className="text-primary">Props</span>
              </m.h2>
            </div>

            {/* Professional Loading Bar */}
            <div className="mt-8 w-48 h-[2px] bg-muted relative overflow-hidden rounded-full">
              <m.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ 
                  duration: 2.5, 
                  ease: [0.45, 0.05, 0.55, 0.95] 
                }}
                className="absolute inset-0 bg-primary"
              />
            </div>

            {/* Technical Subtitle */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.2 }}
              className="mt-4 text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground"
            >
              Initializing Engineering Stack
            </m.p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
