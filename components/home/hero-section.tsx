import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { HeroBackground } from "@/components/layout/hero-background";

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

  return (
    <section className="relative min-h-screen flex items-start md:items-center overflow-hidden bg-background md:pt-16">
      <HeroBackground type="home" />

      <div className="container relative mt-16 z-10 mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          {/* Static HTML for Brand Tag - Zero JS blocking */}
          <div className="flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-12 h-[1px] bg-primary/40" />
            <span className="text-xs font-mono font-medium tracking-[0.2em] uppercase text-primary">
              Engineering Excellence
            </span>
          </div>

          <div className="mb-6">
            {/* Pure CSS Fade/Up for Headlines - Optimized for LCP (Reduced Delays) */}
            <h1 className="text-base md:text-lg font-mono font-medium text-foreground/60 mb-3 tracking-wide uppercase ">
              <span className="block text-foreground relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                {hero.title}
              </span>
            </h1>
            <h1 className="text-3xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <span className="block text-[#555b6c] relative">
                {/* {hero.company} */} 
                Code<span className="text-primary">Props</span>
                <span className="absolute start-3 top-1 text-xl font-mono text-primary/30 animate-in fade-in zoom-in duration-700 delay-500">
                  ®
                </span>
              </span>
            </h1>
          </div>

          <div className="mb-10 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-backwards">
            <p className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium text-foreground/80 leading-tight">
              {hero.subtitle}
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-backwards">
            {hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-backwards">
            <Link
              href={`/${locale}/contact`}
              className="relative group overflow-hidden rounded-full"
            >
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
              className="group bg-[#dadfebfc] text-primary px-2 py-1 rounded-full  text-sm font-bold tracking-widest uppercase flex items-center gap-4 hover:text-primary/80 transition-all"
            >
              <div className="relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden transition-colors group-hover:border-primary">
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative w-2 h-2 rounded-full bg-foreground group-hover:bg-primary transition-colors" />
              </div>
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 end-6 lg:end-12 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000 fill-mode-backwards">
          <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground vertical-text">
            Scroll to Explore
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16  bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
