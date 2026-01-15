'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  hoverEffect?: boolean;
  href?: string;
  target?: '_self' | '_blank';
}

export function GlassCard({
  children,
  className,
  glow = false,
  glowColor = 'bg-primary/20',
  hoverEffect = true,
  href,
  target = '_self',
}: GlassCardProps) {
  const Wrapper = href ? 'a' : 'div';
const isLowEnd =
  typeof navigator !== 'undefined' &&
  ((navigator as any).deviceMemory <= 4 ||
    navigator.hardwareConcurrency <= 4);

  return (
    <Wrapper
      {...(href && { href, target })}
      className={cn(
        'group relative block rounded-[2.5rem] border border-border bg-background/40 p-8 ',
        'transition-[transform,box-shadow,border-color] duration-300',
        isLowEnd && 'backdrop-blur-xl',
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
