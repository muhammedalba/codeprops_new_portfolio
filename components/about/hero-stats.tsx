"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { SectionBadge } from "@/components/ui/section-badge";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

// Defer heavy visuals
const CinematicMesh = dynamic(() => import("@/components/animations/cinematic-mesh").then(m => m.CinematicMesh), { ssr: false });
const InteractiveParticles = dynamic(() => import("@/components/animations/interactive-particles").then(m => m.InteractiveParticles), { ssr: false });

/**
 * Performant Counter Hook using requestAnimationFrame
 * Respects accessibility and prevents over-rendering
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

      // easeOutExpo for a premium feel
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
  index: number;
}

function StatItem({ label, value, index }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract number and suffix (e.g., "300+" -> number: 300, suffix: "+")
  const { numericValue, suffix } = useMemo(() => {
    const num = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
    const sfx = value.replace(/[0-9]/g, "");
    return { numericValue: num, suffix: sfx };
  }, [value]);

  const count = useAnimatedCounter(numericValue, 2500, isInView);

  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center p-6 md:p-8">
      {/* Subtle background glow for each stat */}
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative z-10 text-center">
        <div className="text-5xl md:text-7xl font-heading font-bold mb-3 tracking-tighter bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent flex items-baseline justify-center">
          <span>{count}</span>
          <span className="text-3xl md:text-5xl text-primary font-light ml-1">{suffix}</span>
        </div>
        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground font-medium max-w-[150px] mx-auto text-balance">
          {label}
        </p>
      </div>
      
      {/* Divider for desktop */}
      <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent last:hidden" />
    </div>
  );
}

interface HeroStatsProps {
  translations: any;
  locale: string;
}

import { HeroBackground } from "@/components/layout/hero-background";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export function HeroStats({ translations, locale }: HeroStatsProps) {
  const t = translations.about;

  const stats = [
    { label: t.stats.projects, value: t.stats.projects_count },
    { label: t.stats.clients, value: t.stats.clients_count },
    { label: t.stats.years, value: t.stats.years_count },
    { label: t.stats.team, value: t.stats.team_count },
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden bg-background pt-32 pb-24 group">
      <HeroBackground type="about" />

      <Container className="relative z-10">
        <Breadcrumbs 
          items={[{ label: locale === 'ar' ? "عن الشركة" : "About Us" }]} 
          locale={locale}
          className="mb-8 justify-center"
        />
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionBadge variant="primary" className="mb-8">
              {t.badge}
            </SectionBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl md:text-8xl font-heading font-bold mb-8 tracking-tighter leading-[0.95] text-balance"
          >
            {t.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col items-center gap-8 max-w-3xl"
          >
            <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light text-balance">
              {t.subtitle}
            </p>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="w-full pt-12 border-t border-border/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, i) => (
              <StatItem key={i} index={i} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </Container>
      
      {/* Decorative vertical texts side-aligned */}
      <div className="hidden xl:block absolute left-12 top-1/2 -translate-y-1/2 rotate-180 opacity-20 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-foreground vertical-text">
          Precision Engineering
        </span>
      </div>
      <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-foreground vertical-text">
          Architecting Future
        </span>
      </div>

      {/* Hero-level floating micro-effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-secondary/5 rounded-full blur-[100px] animate-pulse transition-all duration-[4s]" />
    </section>
  );
}
