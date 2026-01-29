'use client';

import React, { memo, useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  hoverEffect?: boolean;
  href?: string;
  target?: '_self' | '_blank';
}

function GlassCardComponent({
  children,
  className,
  glow = false,
  glowColor = 'bg-primary/20',
  hoverEffect = true,
  href,
  target = '_self',
}: GlassCardProps) {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
    const concurrency = navigator.hardwareConcurrency || 8;
    if (memory <= 4 || concurrency <= 4) {
      setIsLowEnd(true);
    }
  }, []);

  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      {...(href && { href, target })}
      className={cn(
        'group relative block rounded-[2.5rem] border border-border bg-background/40 p-8 ',
        'transition-[transform,box-shadow,border-color] duration-300',
        !isLowEnd && 'backdrop-blur-xl', // Apply backdrop blur only if NOT low end
        hoverEffect &&
          'hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]',
        className
      )}
    >
      {/* Glow layer */}
      {glow && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute -z-10 top-1/4 right-1/4 h-1/2 w-1/2 rounded-full blur-3xl',
            'opacity-40 transition-opacity duration-500 group-hover:opacity-80',
            glowColor
          )}
        />
      )}

      {children}
    </Wrapper>
  );
}

export const GlassCard = memo(GlassCardComponent);
