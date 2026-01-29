'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpIcon } from '@/components/ui/inline-icons';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setIsVisible(currentScroll > 400);
      setScrollProgress(currentScroll / totalHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-[60] group transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="relative w-14 h-14 rounded-full bg-background/80 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300 shadow-2xl shadow-primary/5 active:scale-90"
      >
        {/* Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted/20"
          />
          <circle
            cx="28"
            cy="28"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="157"
            strokeDashoffset={157 - (scrollProgress * 157)}
            className="text-primary transition-all duration-200"
          />
        </svg>

        <ArrowUpIcon className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
        <div className="absolute inset-2 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
      </button>

      {/* Hover Label */}
      <span
        className="absolute right-full mr-1 top-1/4 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold whitespace-nowrap hidden md:block opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-3 transition-all duration-300 pointer-events-none"
      >
        Back to Top
      </span>
    </div>
  );
}
