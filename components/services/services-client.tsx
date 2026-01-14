"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { HeroBackground } from "@/components/layout/hero-background";
import { ServiceCard } from "./service-card";
import { ProcessLoop } from "./process-loop";
import { SmartNav } from "./smart-nav";
import { InstantCTA } from "./instant-cta";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactFAQ } from "@/components/contact/contact-faq";
import { ContactCTA } from "@/components/contact/contact-cta";
import { 
  Monitor, 
  Cpu, 
  ShoppingCart, 
  Cloud, 
  Zap,
} from "lucide-react";
import { useMemo } from "react";

interface ServicesClientProps {
  locale: string;
  translations: any;
}

export function ServicesClient({ locale, translations }: ServicesClientProps) {
  const t = translations.services;

  const services = useMemo(() => [
    { key: 'web', Icon: Monitor, ...t.web },
    { key: 'custom', Icon: Cpu, ...t.custom },
    { key: 'ecommerce', Icon: ShoppingCart, ...t.ecommerce },
    { key: 'cloud', Icon: Cloud, ...t.cloud },
    { key: 'performance', Icon: Zap, ...t.performance },
  ], [t]);

  const navSections = [
    { id: "hero", label: "Strategy" },
    { id: "capabilities", label: "Capabilities" },
    { id: "process", label: "Process" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <main className="flex flex-col bg-background">
      {/* Progress Bar & Sub-Nav */}
      <SmartNav sections={navSections} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden">
        <HeroBackground type="services" />
        
        <Container className="relative z-10">
          <div className="flex justify-center mb-10">
            <Breadcrumbs 
              items={[{ label: locale === 'ar' ? "الخدمات" : "Services" }]} 
              locale={locale}
              className="text-white/80"
            />
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Elite Software Engineering
              </div>
              
              <h1 
                className="text-6xl md:text-9xl font-heading font-bold tracking-tighter leading-[0.9] text-balance"
                dangerouslySetInnerHTML={{ __html: t.hero_title }}
              />
              
              <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto text-balance">
                {t.hero_description}
              </p>

              <div className="pt-10 flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-16 px-10 rounded-full bg-foreground text-background font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-2xl"
                >
                  Explore Capabilities
                </button>
                <button 
                  onClick={() => window.location.href = '#contact'}
                  className="h-16 px-10 rounded-full border border-border bg-background/50 backdrop-blur-md font-bold text-lg hover:border-primary transition-all duration-300"
                >
                  Consult an Architect
                </button>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-secondary/10 blur-[120px] pointer-events-none" />
      </section>

      {/* Services Grid Section */}
      <section id="capabilities" className="py-24 md:py-32 bg-muted/5 relative">
        <Container>
          <SectionHeader
            badge="Technical Mastery"
            title={t.title}
            description={t.subtitle}
            align="center"
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {services.map((service, i) => (
              <ServiceCard
                key={service.key}
                index={i}
                title={service.title}
                description={service.description}
                testimonial={service.testimonial}
                Icon={service.Icon}
                href={`/${locale}/services/${service.key}`}
              />
            ))}
            
            {/* Custom Solution Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-12 rounded-[2.5rem] bg-primary text-primary-foreground flex flex-col justify-center overflow-hidden group shadow-2xl"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
               <div className="relative z-10 space-y-8">
                 <h3 className="text-3xl font-bold leading-tight">Beyond Standard Solutions?</h3>
                 <p className="opacity-80 text-lg leading-relaxed">
                   Need a specialized engineering team for a high-complexity challenge? We architect custom engagement models.
                 </p>
                 <div className="pt-4">
                    <button className="h-14 px-8 rounded-full bg-background text-foreground font-bold hover:scale-105 transition-transform">
                      Request Technical Blueprint
                    </button>
                 </div>
               </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Process Loop Section */}
      <ProcessLoop title={t.process.title} steps={t.process.steps} />

      {/* FAQ Section */}
      <div id="faq">
        <ContactFAQ title={t.faq.title} questions={t.faq.questions} />
      </div>

      {/* CTA Section */}
      <ContactCTA 
        title={translations.contact.cta.title} 
        description={translations.contact.cta.description} 
        button={translations.contact.cta.button} 
      />

      {/* Floating Instant CTA */}
      <InstantCTA label={t.instant_cta} />
    </main>
  );
}
