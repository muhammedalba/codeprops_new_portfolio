"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { HeroBackground } from "@/components/layout/hero-background";
import { HeroStats } from "./hero-stats";
import { SmartNav } from "@/components/services/smart-nav";
import { GlassCard } from "@/components/ui/glass-card";
import { Shield, Zap, Target, Users, Code, Cloud, Database, Layout } from "lucide-react";
import { ContactCTA } from "@/components/contact/contact-cta";
import { useMemo } from "react";

interface AboutClientProps {
  locale: string;
  translations: any;
}

export function AboutClient({ locale, translations }: AboutClientProps) {
  const t = translations.about;

  const navSections = [
    { id: "hero", label: locale === 'ar' ? "البداية" : "Hero" },
    { id: "stats", label: locale === 'ar' ? "الأرقام" : "Stats" },
    { id: "values", label: locale === 'ar' ? "فلسفتنا" : "Philosophy" },
    { id: "timeline", label: locale === 'ar' ? "رحلتنا" : "Journey" },
    { id: "stack", label: locale === 'ar' ? "تقنياتنا" : "Stack" },
  ];

  const valueIcons = [Shield, Zap, Target, Users];
  const stackIcons = [Layout, Code, Cloud, Database];

  return (
    <main className="flex flex-col bg-background">
      <SmartNav sections={navSections} />

      {/* Stats Section */}
      <div id="stats">
        <HeroStats translations={translations} locale={locale} />
      </div>

      {/* Engineering Philosophy / Values */}
      <section id="values" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10" />
        <Container>
          <SectionHeader
            title={t.values.title}
            description={t.intro.content}
            align="center"
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.items.map((item: any, i: number) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="h-full p-8 group hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 md:py-32 bg-muted/5 relative">
        <Container>
          <SectionHeader
            title={t.timeline.title}
            description={t.timeline.subtitle}
            align="center"
            className="mb-20"
          />

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

            <div className="space-y-16 md:space-y-24">
              {t.timeline.items.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="flex-1 w-full md:text-end px-12 md:px-16">
                    {i % 2 === 0 && (
                      <div className="space-y-2">
                        <span className="text-4xl font-mono font-bold text-primary/20">{item.year}</span>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-background border-4 border-primary shadow-xl z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  </div>

                  <div className="flex-1 w-full text-start px-12 md:px-16">
                    {i % 2 !== 0 && (
                      <div className="space-y-2">
                        <span className="text-4xl font-mono font-bold text-primary/20">{item.year}</span>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Technical Stack Section */}
      <section id="stack" className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Engineering Mastery"
                title={t.tech_stack.title}
                description={t.tech_stack.subtitle}
                align="left"
              />
              <div className="grid grid-cols-2 gap-6 mt-12">
                {t.tech_stack.categories.map((cat: any, i: number) => (
                  <GlassCard key={i} className="p-6">
                    <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">{cat.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.tech.map((s: string) => (
                        <span key={s} className="px-2 py-1 rounded-md bg-muted text-[10px] font-mono font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            <div className="relative aspect-square max-w-[500px] mx-auto lg:ml-auto">
               <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 border-[40px] border-primary/5 rounded-full" 
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Code className="mx-auto text-primary mb-4" size={48} />
                    <div className="text-4xl font-black tracking-tighter uppercase">Engineer Led</div>
                    <div className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">CodeProps Engineering</div>
                  </div>
               </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA 
        title={translations.contact.cta.title} 
        description={translations.contact.cta.description} 
        button={translations.contact.cta.button} 
      />
    </main>
  );
}

import { cn } from "@/lib/utils";
