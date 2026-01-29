"use client";

import { Container } from "@/components/layout/container";
import { ContactHero } from "./sections/contact-hero";
import { ContactInfo } from "./sections/contact-info";
import dynamic from "next/dynamic";
import { Reveal } from "@/hooks/use-reveal";

// Dynamic imports for performance optimized rendering below the fold
const ContactForm = dynamic(() => import("./contact-form/contact-form").then(mod => mod.ContactForm), { 
  loading: () => <div className="w-full h-[600px] rounded-[4rem] bg-background/40 animate-pulse border border-white/5" />
});
const ContactFAQ = dynamic(() => import("./sections/contact-faq").then(mod => mod.ContactFAQ), { ssr: false });
const ContactMap = dynamic(() => import("./sections/contact-map").then(mod => mod.ContactMap), { ssr: false });



import { ContactTranslations } from "./contact-form/contact-form";

interface ContactInfoData {
  email: string;
  phone: string;
  address: string;
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

interface ContactClientProps {
  locale: string;
  t: {
    badge: string;
    hero: { title: string; description: string };
    title: string;
    subtitle: string;
    form: ContactTranslations;
    info: ContactInfoData;
    faq: { title: string; subtitle: string; questions: { q: string; a: string }[] };
  };
}

export function ContactClient({ locale, t }: ContactClientProps) {
  return (
      <main className="flex flex-col overflow-hidden bg-background">
        {/* 1. Hero/Intro Section */}
        <ContactHero 
          badge={t.badge} 
          title={t.hero.title} 
          description={t.hero.description} 
          locale={locale}
        />

        {/* 2. Main Interaction: Form & Info */}
        <section className="py-12 md:py-32 relative">
          {/* Decorative subtle aura behind the form */}
          <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <Container>
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-18 items-start relative">
              {/* Form Section */}
              <Reveal
                animation="up"
                className="relative p-8 md:p-16 rounded-[4rem] bg-background/40 border border-white/5 backdrop-blur-3xl shadow-2xl shadow-black/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-secondary/5 rounded-[4rem] pointer-events-none" />
                
                <div className="mb-16 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                     <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                     Secure Channel
                  </div>
                  <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tighter">{t.title}</h2>
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">{t.subtitle}</p>
                </div>
                
                <div className="relative z-10">
                  <ContactForm translations={t.form} />
                </div>
              </Reveal>

              {/* Info Section */}
              <div className="lg:sticky lg:top-32">
                <ContactInfo info={t.info} />
              </div>
            </div>
          </Container>
        </section>

      

        {/* 5. FAQ / Quick Answers Section */}
        <ContactFAQ title={t.faq.title} subtitle={t.faq.subtitle} questions={t.faq.questions} />
        {/* 4. Interactive Map Section */}
        <ContactMap />

      </main>
  );
}
