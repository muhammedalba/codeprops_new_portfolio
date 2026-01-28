"use client";

import { m } from "framer-motion";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/layout/hero-background";
import { SectionBadge } from "@/components/ui/section-badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Gauge, Globe, Smartphone, Cpu, Layout } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  locale: string;
  project: any;
  t: any;
}

export default function HeroSection({ locale, project, t }: HeroSectionProps) {
  const categoryIcons: Record<string, any> = {
    web: Globe,
    mobile: Smartphone,
    systems: Cpu,
    design: Layout,
  };
  const CategoryIcon = categoryIcons[project.category.toLowerCase()] || Globe;

  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <HeroBackground type="portfolio" />
      <Container className="relative z-10">
        <Breadcrumbs 
          items={[
            { label: locale === 'ar' ? "المعرض" : "Portfolio", href: `/${locale}/portfolio` },
            { label: project.title }
          ]} 
          className="mb-8"
          locale={locale}
        />
        <Link 
          href={`/${locale}/portfolio`}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-12 hover:gap-4 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t.details.back}
        </Link>

        <div className="grid lg:grid-cols-[1fr,350px] gap-16 items-end">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <CategoryIcon size={24} />
              </div>
              <SectionBadge className="mb-0">{project.category}</SectionBadge>
            </div>

            <h1 className="text-3xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9]">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
              {project.description}
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:block"
          >
             <GlassCard className="p-8 border-primary/20 bg-primary/5 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Gauge color="green" size={22} />
                  <span className="text-xs font-bold uppercase tracking-widest">{t.details.live_integration}</span>
                </div>
                <div className="text-4xl font-black text-foreground">99.9%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{t.details.uptime}</div>
             </GlassCard>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
