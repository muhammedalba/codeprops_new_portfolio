'use client';

import { m } from "framer-motion";
import dynamic from "next/dynamic";
import { Container } from "@/components/layout/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
  Plus,
  Monitor,
  Cpu,
  ShoppingCart,
  Cloud
} from "lucide-react";
import Link from "next/link";
import { ServiceSlug, serviceIcons } from "@/lib/services";
import { ContactCTA } from "../contact/sections/contact-cta";
import { ContactFAQ } from "../contact/sections/contact-faq";
import { ServiceCard } from "./service-card";
import { useMemo } from "react";

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
const allServices = useMemo(() => [
    { slug: 'web', title: t.web.title, description: t.web.description , Icon: Monitor,},
    { slug: 'custom', title: t.custom.title, description: t.custom.description , Icon: Cpu,},
    { slug: 'ecommerce', title: t.ecommerce.title, description: t.ecommerce.description , Icon: ShoppingCart,},
    { slug: 'cloud', title: t.cloud.title, description: t.cloud.description , Icon: Cloud,},
    { slug: 'performance', title: t.performance.title, description: t.performance.description , Icon: Zap,},
  ], [t]);



  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Service Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <HeroBackground type="services" showHeavyDelay={2000} />
        <Container className="relative z-10 ">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[
              { label: isRtl ? 'الخدمات' : 'Services', href: `/${locale}/services` },
              { label: serviceData.title }
            ]}
            className="mb-8 "
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
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/5">
                <ServiceIcon size={28} />
              </div>
              <SectionBadge className="mb-0">{serviceData.title}</SectionBadge>
            </m.div>

            <m.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]"
            >
              {serviceData.title}
            </m.h1>
            
            <m.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed"
            >
              {serviceData.description}
            </m.p>

            <m.div
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
            </m.div>
          </div>
        </Container>
      </section>

      {/* Narrative Section */}
      <section className="py-24 relative">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <m.div
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
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto w-full"
            >
               <GlassCard className="absolute inset-0 flex items-center justify-center overflow-hidden border-primary/20 bg-primary/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
                  <ServiceIcon size={180} className="text-primary/10 animate-pulse" />
                  
                  {/* Internal floating cards for premium feel */}
                  <m.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-10 p-4 glass rounded-2xl border-white/10 shadow-2xl"
                  >
                    <Zap size={20} className="text-primary mb-2" />
                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Latency</div>
                    <div className="font-mono text-xs">Sub-50ms</div>
                  </m.div>

                  <m.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-10 p-4 glass rounded-2xl border-white/10 shadow-2xl"
                  >
                    <ShieldCheck size={20} className="text-accent-secondary mb-2" />
                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Security</div>
                    <div className="font-mono text-xs">A+ Rating</div>
                  </m.div>
               </GlassCard>
            </m.div>
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
               <ServiceCard
                  key={i}
                  index={i}
                  title={step.title}
                  description={step.description}
                  icon={allServices[i].Icon}          
                />
            ))}
          </div>
        </Container>
      </section>


      {/* FAQ Section */}
      <Container className="py-24">
         <ContactFAQ title={t.faq.title} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Container>

      {/* Related Services */}
      <RelatedServices 
        currentSlug={serviceKey}
        locale={locale}
        services={allServices}
      />

      {/* CTA Section */}
           <ContactCTA 
             locale={locale}
             title={translations.contact.cta.title} 
             description={translations.contact.cta.description} 
             button={translations.contact.cta.button} 
           />
    </main>
  );
}
