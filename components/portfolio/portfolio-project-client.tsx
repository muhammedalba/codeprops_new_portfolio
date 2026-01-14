"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/layout/hero-background";
import { SectionBadge } from "@/components/ui/section-badge";
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Smartphone, 
  Cpu, 
  Layout,
  ExternalLink,
  ChevronRight,
  Gauge
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { cn } from "@/lib/utils";

interface PortfolioProjectClientProps {
  locale: string;
  project: any;
  translations: any;
}

export function PortfolioProjectClient({ locale, project, translations }: PortfolioProjectClientProps) {
  if (!project) return null;

  // Icons mapping for categories
  const categoryIcons: Record<string, any> = {
    web: Globe,
    mobile: Smartphone,
    systems: Cpu,
    design: Layout,
  };
  const CategoryIcon = categoryIcons[project.category.toLowerCase()] || Globe;

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Project Hero */}
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
            {locale === 'ar' ? "العودة للمشاريع" : "Back to Engineering Portfolio"}
          </Link>

          <div className="grid lg:grid-cols-[1fr,350px] gap-16 items-end">
            <motion.div
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

              <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]">
                {project.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
                {project.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:block"
            >
               <GlassCard className="p-8 border-primary/20 bg-primary/5 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Gauge size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Live Integration</span>
                  </div>
                  <div className="text-4xl font-black text-foreground">99.9%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Uptime Efficiency</div>
               </GlassCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <Container>
          <div className="grid lg:grid-cols-[1fr,350px] gap-20 items-start">
            
            {/* Project Deep Dive */}
            <div className="space-y-32">
               {/* Visual Showcase Placeholder */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="aspect-video w-full rounded-[4rem] bg-muted/30 border border-border/50 relative overflow-hidden group shadow-2xl shadow-black/20"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-secondary/5 group-hover:bg-primary/10 transition-colors duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center p-20">
                     <ShieldCheck size={120} className="text-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000" />
                  </div>
                  <div className="absolute bottom-10 left-10 flex gap-4">
                     <div className="px-6 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-widest">Performance Matrix</div>
                     <div className="px-6 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-widest">Security Audit PASS</div>
                  </div>
               </motion.div>

               {/* Narrative Sections */}
               <div className="space-y-24 max-w-4xl">
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                         <AlertCircle size={20} />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter">The Challenge</h2>
                    </div>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                      {project.problem}
                    </p>
                  </motion.section>

                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                         <Zap size={20} />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter">Our Engineering Solution</h2>
                    </div>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                      {project.solution}
                    </p>
                  </motion.section>

                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                         <CheckCircle2 size={20} />
                      </div>
                      <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter">Technical & Business Results</h2>
                    </div>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                      {project.result}
                    </p>
                  </motion.section>
               </div>
            </div>

            {/* Sticky Tech Sidebar */}
            <aside className="space-y-12 sticky top-32">
               <GlassCard className="p-8 border-border/40 space-y-8 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-6xl font-black">{project.tech[0][0]}</div>
                  
                  <div className="space-y-6">
                     <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">Tech Stack</h4>
                     <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech: string) => (
                           <span key={tech} className="px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-xs font-bold text-foreground">
                              {tech}
                           </span>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-6 pt-8 border-t border-border/50">
                     <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">Focus Layers</h4>
                     <ul className="space-y-4">
                        {[
                           "Core Web Vitals Optimization",
                           "Enterprise Security Layer",
                           "Scalable Logic Infrastructure",
                           "Advanced Cloud Deploy"
                        ].map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                              <CheckCircle2 size={16} className="text-primary" />
                              {item}
                           </li>
                        ))}
                     </ul>
                  </div>

                  <div className="pt-8 space-y-4 text-center">
                     <Link href={`/${locale}/contact`}>
                        <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl shadow-primary/20">
                           {locale === 'ar' ? "طلب حل مشابه" : "Request Similar Solution"}
                           <ExternalLink size={16} />
                        </button>
                     </Link>
                     <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Lead Engineer Consultation</p>
                  </div>
               </GlassCard>

               <div className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground ml-2">Next Case Study</h4>
                  <Link href={`/${locale}/portfolio`}>
                     <motion.div 
                        whileHover={{ x: 10 }}
                        className="p-6 rounded-3xl bg-muted/30 border border-border/50 flex items-center justify-between group cursor-pointer"
                     >
                        <span className="font-bold">Explore All Works</span>
                        <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" />
                     </motion.div>
                  </Link>
               </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
