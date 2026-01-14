'use client';

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Container } from "@/components/layout/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { FAQSection } from "@/components/layout/faq-section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AnimatedStats } from "@/components/ui/animated-stats";
import { RelatedServices } from "@/components/services/related-services";

// Lazy load heavy animations
const HeroBackground = dynamic(
  () => import("@/components/layout/hero-background").then(m => ({ default: m.HeroBackground })),
  { ssr: false }
);
import { 
  ArrowLeft, 
  Zap, 
  Rocket,
  ShieldCheck,  
  ChevronRight,
  Plus
} from "lucide-react";
import Link from "next/link";
import { ServiceSlug, serviceIcons } from "@/lib/services";

interface ServiceDetailClientProps {
  locale: string;
  serviceKey: string;
  serviceData: any;
  translations: any;
}

export function ServiceDetailClient({ locale, serviceKey, serviceData, translations }: ServiceDetailClientProps) {
  if (!serviceData) return null;

  const t = translations.services;
  const ServiceIcon = serviceIcons[serviceKey as ServiceSlug] || serviceIcons.web;
  const isRtl = locale === 'ar';

  // Prepare related services data
  const allServices = [
    { slug: 'web', title: t.web.title, description: t.web.description },
    { slug: 'custom', title: t.custom.title, description: t.custom.description },
    { slug: 'ecommerce', title: t.ecommerce.title, description: t.ecommerce.description },
    { slug: 'cloud', title: t.cloud.title, description: t.cloud.description },
    { slug: 'performance', title: t.performance.title, description: t.performance.description },
  ];

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Service Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <HeroBackground type="services" showHeavyDelay={2000} />
        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: isRtl ? 'الخدمات' : 'Services', href: `/${locale}/services` },
              { label: serviceData.title }
            ]}
            className="mb-8"
            locale={locale}
          />
          
          <Link 
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-sm font-black text-primary mb-12 hover:gap-4 transition-all group uppercase tracking-widest"
          >
            <ArrowLeft size={16} className={isRtl ? "rotate-180" : ""} />
            {isRtl ? "العودة لخدماتنا" : "Back to Services"}
          </Link>

          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/5">
                <ServiceIcon size={28} />
              </div>
              <SectionBadge className="mb-0">{serviceData.title}</SectionBadge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]"
            >
              {serviceData.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed"
            >
              {serviceData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Link href={`/${locale}/contact`}>
                <button className="px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:scale-105 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3">
                  {isRtl ? "ابدأ مشروعك الآن" : "Start Your Project"}
                  <Rocket size={18} />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Narrative Section */}
      <section className="py-24 relative">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
               <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter">
                  {isRtl ? "لماذا نحن الشريك الهندسي الأمثل؟" : "Engineered for Extreme Scalability"}
               </h2>
               <p className="text-lg text-muted-foreground leading-relaxed">
                  {serviceData.details}
               </p>
               
               <div className="grid sm:grid-cols-2 gap-6 pt-8">
                  {serviceData.features?.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Plus size={16} />
                      </div>
                      <span className="font-bold text-sm tracking-tight">{feature}</span>
                    </div>
                  ))}
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto w-full"
            >
               <GlassCard className="absolute inset-0 flex items-center justify-center overflow-hidden border-primary/20 bg-primary/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
                  <ServiceIcon size={180} className="text-primary/10 animate-pulse" />
                  
                  {/* Internal floating cards for premium feel */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10 p-4 glass rounded-2xl border-white/10 shadow-2xl"
                  >
                    <Zap size={20} className="text-primary mb-2" />
                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Latency</div>
                    <div className="font-mono text-xs">Sub-50ms</div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-10 p-4 glass rounded-2xl border-white/10 shadow-2xl"
                  >
                    <ShieldCheck size={20} className="text-accent-secondary mb-2" />
                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Security</div>
                    <div className="font-mono text-xs">A+ Rating</div>
                  </motion.div>
               </GlassCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/30">
        <Container>
          <SectionHeader 
             badge={isRtl ? "خارطة المهندس" : "The Engineering Loop"}
             title={isRtl ? "كيف نحوّل رؤيتك إلى واقع" : "How we build digital dominance."}
             align="left"
          />

          <div className="grid md:grid-cols-4 gap-8 pt-16">
            {t.process.steps.map((step: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[2.5rem] bg-background border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-xl shadow-transparent hover:shadow-primary/5"
              >
                 <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-foreground font-black text-xl mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    0{i + 1}
                 </div>
                 <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                 <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                 </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <AnimatedStats 
        stats={[
          { label: translations.about?.stats?.projects || "Projects", value: translations.about?.stats?.projects_count || "300+" },
          { label: translations.about?.stats?.clients || "Clients", value: translations.about?.stats?.clients_count || "200+" },
          { label: translations.about?.stats?.years || "Years", value: translations.about?.stats?.years_count || "10+" },
          { label: translations.about?.stats?.team || "Team", value: translations.about?.stats?.team_count || "50+" },
        ]}
        className="py-12 bg-muted/10 my-12 border-none" 
      />

      {/* FAQ Section */}
      <Container className="py-24">
        <FAQSection 
          title={t.faq.title}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Container>

      {/* Related Services */}
      <RelatedServices 
        currentSlug={serviceKey}
        locale={locale}
        services={allServices}
      />

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
           <div className="w-[800px] h-[800px] rounded-full bg-primary/20 blur-[150px] animate-pulse" />
        </div>
        
        <Container className="relative z-10 text-center space-y-12">
           <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter">
              {isRtl ? "هل أنت جاهز للتحول الرقمي؟" : "Ready to scale your vision?"}
           </h2>
           <Link href={`/${locale}/contact`}>
              <button className="px-12 py-6 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-primary/30 group">
                 {isRtl ? "تحدث مع مهندس" : "Talk to a Lead Engineer"}
                 <ChevronRight size={20} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
           </Link>
        </Container>
      </section>
    </main>
  );
}
