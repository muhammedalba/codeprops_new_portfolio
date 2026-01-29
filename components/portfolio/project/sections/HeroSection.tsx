"use client";

import { Container } from "@/components/layout/container";
import dynamic from "next/dynamic";
import { SectionBadge } from "@/components/ui/section-badge";
import { Reveal } from "@/hooks/use-reveal";

const HeroBackground = dynamic(
  () => import("@/components/layout/hero-background").then((mod) => mod.HeroBackground),
  { ssr: false }
);
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Gauge, Globe, Smartphone, Cpu, Layout } from "lucide-react";
import Link from "next/link";
import { PortfolioProject, PortfolioTranslations } from "../../portfolio-project-client";
import { LucideIcon } from "lucide-react";

interface HeroSectionProps {
  locale: string;
  project: PortfolioProject;
  t: PortfolioTranslations;
}

export default function HeroSection({ locale, project, t }: HeroSectionProps) {
  const categoryIcons: Record<string, LucideIcon> = {
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
          <div className="space-y-8">
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
          </div>

          <Reveal
            animation="up"
            delay={0.2}
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
