"use client";

import { Container } from "@/components/layout/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import dynamic from "next/dynamic";
import { Reveal } from "@/hooks/use-reveal";
import { BlogTranslations } from "../blog-client";


const HeroBackground = dynamic(() => import("@/components/layout/hero-background").then((mod) => mod.HeroBackground), { ssr: false });

interface HeroSectionProps {
  locale: string;
  t: BlogTranslations;
}

export default function HeroSection({ locale, t }: HeroSectionProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 overflow-hidden">
      <HeroBackground type="about" />
      <Container className="relative z-10">
        <Breadcrumbs 
          items={[{ label: locale === 'ar' ? "المدونة" : "Insights" }]} 
          className="mb-8 justify-center"
          locale={locale}
        />
        <Reveal
          animation="up"
          className="max-w-4xl space-y-8 text-center mx-auto"
        >
          <SectionBadge>{locale === 'ar' ? "الرؤى الهندسية" : "Engineering Insights"}</SectionBadge>
          <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
