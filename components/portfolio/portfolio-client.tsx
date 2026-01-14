"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/layout/hero-background";
import { SectionBadge } from "@/components/ui/section-badge";
import Link from "next/link";
import { ArrowUpRight, Filter, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface PortfolioClientProps {
  locale: string;
  translations: any;
}

export function PortfolioClient({ locale, translations }: PortfolioClientProps) {
  const t = translations.portfolio;
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(t.projects.map((p: any) => p.category));
    return ["all", ...Array.from(cats)];
  }, [t.projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return t.projects;
    return t.projects.filter((p: any) => p.category === activeCategory);
  }, [t.projects, activeCategory]);

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <HeroBackground type="services" />
        <Container className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <Breadcrumbs 
              items={[{ label: locale === 'ar' ? "المعرض" : "Portfolio" }]} 
              locale={locale}
            />
          </div>
          <motion.div
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
          </motion.div>
        </Container>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-border/50 py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary">
              <Filter size={16} />
              <span>{t.filter}</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                    activeCategory === cat 
                      ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "bg-muted/50 border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  {cat === "all" ? t.all : cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <Container>
          <div className="space-y-32">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: any, i: number) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className={cn(
                      "space-y-10",
                      i % 2 === 1 ? "md:order-2" : "md:order-1"
                    )}>
                      <div className="flex items-center gap-4">
                        <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">
                          Case Study 0{i + 1}
                        </span>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                          {project.category}
                        </span>
                      </div>

                      <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>

                      <p className="text-xl text-muted-foreground leading-relaxed font-light">
                        {project.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-muted/50 border border-border/50 backdrop-blur-sm">
                           <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Technical Result</div>
                           <div className="text-lg font-bold">{project.result}</div>
                        </div>
                        <div className="p-6 rounded-3xl bg-muted/50 border border-border/50 backdrop-blur-sm">
                           <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Technical Stack</div>
                           <div className="flex flex-wrap gap-2">
                             {project.tech.map((s: string) => (
                               <span key={s} className="px-2 py-0.5 rounded-md bg-background border border-border text-[9px] font-bold font-mono">
                                 {s}
                               </span>
                             ))}
                           </div>
                        </div>
                      </div>

                      <Link 
                        href={`/${locale}/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-6 text-xl font-bold group/link"
                      >
                        <span className="relative">
                           {t.viewProject}
                           <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-500" />
                        </span>
                        <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover/link:bg-primary group-hover/link:border-primary transition-all duration-500">
                           <ArrowUpRight className="w-6 h-6 group-hover/link:text-primary-foreground transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                        </div>
                      </Link>
                    </div>

                    <div className={cn(
                      "relative aspect-[1.1/1] rounded-[4rem] bg-muted overflow-hidden border border-border shadow-2xl group/img",
                      i % 2 === 1 ? "md:order-1" : "md:order-2"
                    )}>
                       {/* High-end decorative background for mockups */}
                       <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent-secondary/5" />
                       <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none font-black text-[12vw] flex items-center justify-center uppercase tracking-tighter rotate-12">
                          {project.slug.split('-')[0]}
                       </div>
                       
                       {/* Animated Glows */}
                       <motion.div 
                         animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                         transition={{ duration: 8, repeat: Infinity }}
                         className="absolute -top-1/4 -right-1/4 w-full h-full bg-primary rounded-full blur-[120px]" 
                       />

                       <div className="absolute inset-12 rounded-[2.5rem] bg-background/40 backdrop-blur-md border border-white/10 shadow-inner flex items-center justify-center">
                          <div className="text-center p-8">
                             <div className="text-primary/20 mb-4 flex justify-center">
                                <ArrowUpRight size={80} strokeWidth={0.5} />
                             </div>
                             <div className="text-sm font-mono font-bold tracking-[0.4em] opacity-40 uppercase">Architecture Preview</div>
                          </div>
                       </div>

                       <div className="absolute inset-0 translate-y-full group-hover/img:translate-y-0 bg-primary/90 transition-transform duration-700 flex items-center justify-center p-20 text-center">
                          <p className="text-primary-foreground text-2xl font-bold italic leading-tight">
                             "Innovating the core of {project.category} systems."
                          </p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Instant Contact CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
         <Container className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">{translations.contact.cta.title}</h2>
            <Link href={`/${locale}/contact`}>
              <button className="h-20 px-12 rounded-full bg-background text-foreground text-xl font-bold hover:scale-105 transition-transform flex items-center gap-4 mx-auto">
                {translations.contact.cta.button}
                <ChevronRight />
              </button>
            </Link>
         </Container>
      </section>
    </main>
  );
}
