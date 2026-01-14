"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

/**
 * Performant Counter Hook using requestAnimationFrame
 */
function useAnimatedCounter(endValue: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!shouldStart) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(endValue);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      const easeOutExpo = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      const currentValue = Math.floor(easeOutExpo(percentage) * endValue);
      setCount(currentValue);

      if (percentage < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [endValue, duration, shouldStart]);

  return count;
}

interface StatItemProps {
  label: string;
  value: string;
  className?: string;
}

function StatItem({ label, value, className }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const { numericValue, suffix } = useMemo(() => {
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    const sfx = value.replace(/[0-9]/g, "");
    return { numericValue: num, suffix: sfx };
  }, [value]);

  const count = useAnimatedCounter(numericValue, 2500, isInView);

  return (
    <div ref={ref} className={cn("relative flex flex-col items-center justify-center p-6", className)}>
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 text-center">
        <div className="text-4xl md:text-6xl font-heading font-bold mb-3 tracking-tighter bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent flex items-baseline justify-center">
          <span>{count}</span>
          <span className="text-2xl md:text-4xl text-primary font-light ml-1">{suffix}</span>
        </div>
        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground font-medium max-w-[150px] mx-auto text-balance">
          {label}
        </p>
      </div>
      
      {/* Divider */}
      <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent last:hidden" />
    </div>
  );
}

interface AnimatedStatsProps {
  stats: {
    label: string;
    value: string;
  }[];
  className?: string;
}

export function AnimatedStats({ stats, className }: AnimatedStatsProps) {
  return (
    <section className={cn("border-y border-border/40 bg-background/50 backdrop-blur-sm", className)}>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0">
          {stats.map((stat, i) => (
            <StatItem 
              key={i} 
              label={stat.label} 
              value={stat.value} 
              className={i === stats.length - 1 ? "lg:[&>div:last-child]:hidden" : ""}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
