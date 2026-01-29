"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import dynamic from "next/dynamic";

// dynamic import 
const HeroBackground = dynamic(
  () => import("@/components/layout/hero-background").then((mod) => mod.HeroBackground),
  { ssr: false }
);

interface ContactHeroProps {
  title: string;
  description: string;
  badge: string;
  locale: string;
}

export function ContactHero({ title, description, badge, locale }: ContactHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
      <HeroBackground type="contact" />

      <Container className="relative z-10 text-center">
        <Breadcrumbs 
          items={[{ label: locale === 'ar' ? "تواصل معنا" : "Contact" }]} 
          locale={locale}
          className="mb-8 justify-center"
        />
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <SectionBadge variant="primary" className="mb-8">{badge}</SectionBadge>
            <h1 className="text-5xl md:text-8xl font-heading font-bold mb-8 tracking-tighter leading-[0.95] text-balance">
              {title.split(' ').map((word: string, i: number) => 
                 ['exceptional', 'استثنائي', 'außergewöhnliches'].includes(word.toLowerCase()) ? (
                  <span key={i} className="text-primary italic"> {word} </span>
                ) : ` ${word} `
              )}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto text-balance">
              {description}
            </p>
          </m.div>
        </LazyMotion>
      </Container>
    </section>
  );
}
