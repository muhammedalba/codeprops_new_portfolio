"use client";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";

import { SmartNav } from "./smart-nav";
import { HeroSection } from "./sections/HeroSection";
import { ServicesGridSection } from "./sections/ServicesGridSection";

// Dynamic imports for performance
// Keeping SSR for ProcessLoop as it has valuable content, but separate chunk
const ProcessLoop = dynamic(() => import("./process-loop").then(mod => mod.ProcessLoop));
// FAQs and CTA are safely below fold and can be client-loaded to save initial HTML/hydration cost
const ContactFAQ = dynamic(() => import("@/components/contact/sections/contact-faq").then(mod => mod.ContactFAQ), { ssr: false });
const ContactCTA = dynamic(() => import("@/components/contact/sections/contact-cta").then(mod => mod.ContactCTA), { ssr: false });


interface ServicesClientProps {
  locale: string;
  translations: any;
}
 const navSections = [
    { id: "hero", label: "Strategy" },
    { id: "capabilities", label: "Capabilities" },
    { id: "process", label: "Process" },
    { id: "faq", label: "FAQ" },
  ];
export function ServicesClient({ locale, translations }: ServicesClientProps) {
  const t = translations.services;

  return (
    <LazyMotion features={domAnimation}>
      <main className="flex flex-col bg-background">
        {/* Progress Bar & Sub-Nav */}
        <SmartNav sections={navSections} />

        <HeroSection locale={locale} t={t} />


        {/* Services Grid Section */}
        <ServicesGridSection locale={locale} t={t} />

        {/* Process Loop Section */}
        <ProcessLoop title={t.process.title} subtitle={t.process.subtitle} steps={t.process.steps} />

        {/* FAQ Section */}
        <div id="faq">
          <ContactFAQ title={t.faq.title} subtitle={t.faq.subtitle} questions={t.faq.questions} />
        </div>

        {/* CTA Section */}
        <ContactCTA 
          locale={locale}
          title={translations.contact.cta.title} 
          description={translations.contact.cta.description} 
          button={translations.contact.cta.button} 
        />
      </main>
    </LazyMotion>
  );
}
