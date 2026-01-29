"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useMemo, useState } from "react";
import { SectionBadge } from "@/components/ui/section-badge";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/hooks/use-reveal";
const HeroBackground = dynamic(() => import("../../layout/hero-background").then((mod) => mod.HeroBackground), { ssr: false });

interface HeroStatsProps {
  translations: {
    about: {
      stats: {
        projects: string;
        projects_count: string;
        clients: string;
        clients_count: string;
        years: string;
        years_count: string;
        team: string;
        team_count: string;
      };
      badge: string;
      title: string;
      subtitle: string;
    };
  };
  locale: string;
}
interface StatItemProps {
  label: string;
  value: string;
  index: number;
}

/**
 * Zero Re-render Animated Counter
 * Updates DOM directly for performance
 */
function useAnimatedCounterZeroRender(
  numericValue: number,           // الرقم فقط بدون +
  duration: number = 2000,
  shouldStart: boolean = false,
  locale: string = "en"
) {
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);
  const suffix = "+"; // إضافة الإشارة مباشرة هنا

  useEffect(() => {
    if (!shouldStart || !ref.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      ref.current.textContent = numericValue.toLocaleString(locale) + suffix;
      return;
    }

    const startTime = performance.now();
    const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

    const animate = (timestamp: number) => {
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const currentValue = Math.floor(easeOutExpo(percentage) * numericValue);

      ref.current!.textContent = currentValue.toLocaleString(locale) + suffix;

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        ref.current!.textContent = numericValue.toLocaleString(locale) + suffix;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [numericValue, shouldStart, duration, locale]);

  return ref;
}


function StatItem({ label, value, locale }: Omit<StatItemProps, 'index'> & { locale: string }) {
  const refContainer = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = refContainer.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const numericValue = useMemo(() => {
    // تحويل أي أرقام عربية في value إلى أرقام إنجليزية
    return parseInt(value.replace(/[^\d٠-٩]/g, "").replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660)), 10) || 0;
  }, [value]);

  const counterRef = useAnimatedCounterZeroRender(numericValue, 2500, isInView, locale);

  const digitCount = useMemo(() => numericValue.toString().length, [numericValue]);

  return (
    <div ref={refContainer} className="relative flex flex-col items-center justify-center p-6 md:p-8" style={{ minWidth: `${digitCount}ch` }}>
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10 text-center">
        <div className="text-5xl md:text-7xl font-heading font-bold mb-3 tracking-tighter bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent flex items-baseline justify-center">
          <span ref={counterRef}>0</span>
        </div>
        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground font-medium max-w-[150px] mx-auto text-balance">
          {label}
        </p>
      </div>
    </div>
  );
}


export function HeroStats({ translations, locale }: HeroStatsProps) {
  const t = translations.about;

  // Memoized stats array لتجنب إعادة إنشاء المصفوفة
 const stats = useMemo(() => [
  { label: t.stats.projects, value: t.stats.projects_count },
  { label: t.stats.clients, value: t.stats.clients_count },
  { label: t.stats.years, value: t.stats.years_count },
  { label: t.stats.team, value: t.stats.team_count },
], [t.stats]);


  return (
    <section
      id="start"
      className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden bg-background pt-32 pb-24 group"
    >
      <HeroBackground type="about" /> 
      <Container className="relative z-10">
        <Breadcrumbs
          items={[{ label: locale === "ar" ? "عن الشركة" : "About Us" }]}
          locale={locale}
          className="mb-8 justify-center"
        />

        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-20 lg:mb-32">
          <Reveal animation="up">
            <SectionBadge variant="primary" className="mb-8">
              {t.badge}
            </SectionBadge>
          </Reveal>

          <Reveal animation="scale" as="h1" className="text-5xl md:text-8xl font-heading font-bold mb-8 tracking-tighter leading-[0.95] text-balance">
            {t.title}
          </Reveal>

          <Reveal animation="up" delay={0.2} className="flex flex-col items-center gap-8 max-w-3xl">
            <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light text-balance">
              {t.subtitle}
            </p>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
          </Reveal>
        </div>

        {/* Stats Grid */}
        <div className="w-full pt-12 border-t border-border/40">
          <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-0">
            {stats.map((stat, i) => (
              <StatItem locale={locale} key={i} label={stat.label} value={stat.value} />
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
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-secondary/5 rounded-full blur-[100px] animate-pulse transition-all duration-4000" />
    </section>
  );
}
