'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export default function MethodologyVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div ref={ref} className="relative hidden lg:block">
      <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-3" />

      <div className="relative z-10 w-full aspect-square border border-border bg-background/40 backdrop-blur-2xl p-12 rounded-[4rem] shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px]" />

        <div className="h-full flex flex-col justify-center gap-10">
          {/* Progress */}
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-mono text-primary/60">
              <span>SYSTEM_SYNC_STATUS</span>
              <span>ACTIVE</span>
            </div>

            <div className="w-full h-3 rounded-full bg-muted/50 overflow-hidden p-0.5 border border-border">
              {inView && (
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={inView ? { opacity: [0.3, 0.6, 0.3] } : undefined}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                className={cn(
                  'aspect-video rounded-2xl border',
                  i === 2
                    ? 'bg-primary/10 border-primary/10'
                    : 'bg-primary/15 border-primary/15'
                )}
              />
            ))}
          </div>

          {/* Terminal */}
          <div className="font-mono text-[10px] text-muted-foreground/60 space-y-2 bg-background/50 p-4 rounded-xl border border-border/50">
            {[
              'INITIALIZING_ENTROPY_BUFFER...',
              'DEPLOYING_RECURSIVE_ASSETS...',
              'OPTIMIZING_LOAD_MODES...',
            ].map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-primary">{'>'}</span> {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
