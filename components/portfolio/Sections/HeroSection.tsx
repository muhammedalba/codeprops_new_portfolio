"use client";
import { m } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import dynamic from "next/dynamic";


// dinamic import
const HeroBackground = dynamic(() => import("@/components/layout/hero-background").then((mod) => mod.HeroBackground));

// define props interface
interface HeroSectionProps {
    locale: string;
    t: any;
}

export default function HeroSection({ locale, t }: HeroSectionProps) {
    return (
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <HeroBackground type="services" />
        <Container className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <Breadcrumbs 
              items={[{ label: locale === 'ar' ? "المعرض" : "Portfolio" }]} 
              locale={locale}
            />
          </div>
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <SectionBadge>{locale === 'ar' ? "معرض الأعمال" : "Engineering Portfolio"}</SectionBadge>
            <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </m.div>
        </Container>
      </section>
    );
}