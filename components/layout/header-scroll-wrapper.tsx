'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface HeaderScrollWrapperProps {
  children: React.ReactNode;
}

/**
 * HeaderScrollWrapper - Minimal Client Island
 * Only manages scroll state and applies conditional classes
 * Wraps the header element to add scroll-based styling
 * Size: ~1-2KB
 */
export function HeaderScrollWrapper({ children }: HeaderScrollWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Skip if scroll position hasn't changed significantly
    if (Math.abs(currentScrollY - lastScrollYRef.current) < 5) {
      return;
    }
    
    lastScrollYRef.current = currentScrollY;

    // Cancel previous frame if it hasn't executed yet
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Schedule update for next animation frame
    rafIdRef.current = requestAnimationFrame(() => {
      const shouldBeScrolled = currentScrollY > 20;
      setIsScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev);
      rafIdRef.current = null;
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    
    window.addEventListener('scroll', handleScroll, { 
      passive: true,
      signal: controller.signal 
    });

    return () => {
      controller.abort();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <header 
      className={`sticky h-[var(--header-height)] top-0 z-50 flex items-center w-full transition-all duration-300 ${
        isScrolled 
          ? 'border-b bg-background/70 backdrop-blur-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      {children}
    </header>
  );
}
