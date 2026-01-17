import { ProcessLoop } from "./process-loop";
import { SmartNav } from "./smart-nav";
// import { InstantCTA } from "./instant-cta";
import { ContactFAQ } from "@/components/contact/sections/contact-faq";
import { ContactCTA } from "@/components/contact/sections/contact-cta";
import { HeroSection } from "./sections/HeroSection";
import { ServicesGridSection } from "./sections/ServicesGridSection";


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

      {/* Floating Instant CTA */}
      {/* <InstantCTA label={t.instant_cta} /> */}
    </main>
  );
}
