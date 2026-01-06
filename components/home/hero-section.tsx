import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Defer heavy components using dynamic import (No SSR)
const CinematicMesh = dynamic(
  () => import('@/components/animations/cinematic-mesh'),
  { ssr: false }
);

// Defer heavy components using dynamic import (No SSR)
const InteractiveParticles = dynamic(
  () => import('@/components/animations/interactive-particles'),
  { ssr: false }
);

const TechSculpture = dynamic(
  () => import('@/components/animations/tech-sculpture').then(m => m.TechSculpture),
  { ssr: false }
);

interface HeroSectionProps {
  locale: string;
  translations: {
    hero: {
      title: string;
      company: string;
      subtitle: string;
      description: string;
      cta: string;
      ctaSecondary: string;
    };
  };
}

export function HeroSection({ locale, translations }: HeroSectionProps) {
  const { hero } = translations;
  const [shouldRenderHeavy, setShouldRenderHeavy] = useState(false);

  useEffect(() => {
    // Crucial: Use requestIdleCallback to delay heavy effects until the browser is free
    // Falling back to a long timeout if requestIdleCallback is not supported
    const deferEffect = () => {
      const timer = setTimeout(() => {
        setShouldRenderHeavy(true);
      }, 2000);
      return timer;
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(() => {
        setShouldRenderHeavy(true);
      }, { timeout: 3000 });
      return () => window.cancelIdleCallback(idleId);
    } else {
      const timer = deferEffect();
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-16">
      <CinematicMesh />
      {shouldRenderHeavy && (
        <> <CinematicMesh />

          <InteractiveParticles />
          <TechSculpture />
        </>
      )}

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Static HTML for Brand Tag - Zero JS blocking */}
          <div className="flex items-center gap-3 mb-8 opacity-0 animate-[fade-up_0.8s_ease-out_0.2s_forwards]">
            <div className="w-12 h-[1px] bg-primary/40" />
            <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-primary">
              Engineering Excellence
            </span>
          </div>

          <div className="mb-6">
            {/* Pure CSS Fade/Up for Headlines */}
            <h1 className="text-base md:text-lg font-mono font-medium text-foreground/60 mb-3 tracking-wide uppercase ">
              <span className="block text-foreground relative opacity-0 animate-[fade-up_0.8s_ease-out_0.3s_forwards]">
                {hero.title}
              </span>
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold leading-[1] tracking-tighter opacity-0 animate-[fade-up_0.8s_ease-out_0.4s_forwards]">
              <span className="block text-foreground relative">
                {hero.company}
                <span className="absolute -right-8 top-2 text-xl font-mono text-primary/30 opacity-0 animate-[fade-in_1s_ease-out_1.5s_forwards]">®</span>
              </span>
            </h1>
          </div>

          <div className="mb-10 max-w-3xl opacity-0 animate-[fade-up_0.8s_ease-out_0.5s_forwards]">
            <p className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium text-foreground/80 leading-tight">
              {hero.subtitle}
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl leading-relaxed opacity-0 animate-[fade-up_0.8s_ease-out_0.6s_forwards]">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 opacity-0 animate-[fade-up_0.8s_ease-out_0.7s_forwards]">
            <Link href={`/${locale}/contact`} className="relative group overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <Button
                size="lg"
                className="relative h-16 px-12 rounded-full text-lg font-bold bg-foreground text-background group-hover:bg-transparent group-hover:text-primary-foreground transition-all duration-300 border-none"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {hero.cta}
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                </span>
              </Button>
            </Link>

            <Link 
              href={`/${locale}/portfolio`}
              className="group text-sm font-bold tracking-widest uppercase flex items-center gap-4 hover:text-primary transition-all"
            >
              <div className="relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden transition-colors group-hover:border-primary">
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative w-2 h-2 rounded-full bg-foreground group-hover:bg-primary transition-colors" />
              </div>
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-4 opacity-0 animate-[fade-in_1s_ease-out_2s_forwards]">
          <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground vertical-text">
            Scroll to Explore
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
