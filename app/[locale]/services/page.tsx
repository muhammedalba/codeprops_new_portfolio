import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata, generateFAQSchema } from '@/lib/seo';

// Server Sections
import { HeroSection } from '@/components/services/sections/HeroSection';
import { ServicesGridSection } from '@/components/services/sections/ServicesGridSection';
import { ProcessLoop } from '@/components/services/process-loop';

// Client Islands
import { SmartNav } from '@/components/services/smart-nav';
import { ContactFAQ, ContactCTA } from '@/components/contact/sections/contact-islands';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getPageMessages(locale as Locale, "services");
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.services.title,
    description: t.seo.services.description,
    path: '/services',
  });
}

const navSections = [
  { id: "hero", label: "Strategy" },
  { id: "capabilities", label: "Capabilities" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "services");
  const faqQuestions = t.services.faq?.questions;

  return (
    <>
      {faqQuestions?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(faqQuestions)),
          }}
        />
      )}
      
      <main className="flex flex-col bg-background">
        <SmartNav sections={navSections} />
        
        <HeroSection locale={typedLocale} t={t.services} />
        
        <ServicesGridSection locale={typedLocale} t={t.services} />
        
        <ProcessLoop 
          title={t.services.process.title} 
          subtitle={t.services.process.subtitle} 
          steps={t.services.process.steps} 
        />
        
        <div id="faq">
          <ContactFAQ 
            title={t.services.faq.title} 
            subtitle={t.services.faq.subtitle} 
            questions={t.services.faq.questions} 
          />
        </div>
        
        <ContactCTA 
          locale={typedLocale}
          title={t.contact.cta.title} 
          description={t.contact.cta.description} 
          button={t.contact.cta.button} 
        />
      </main>
    </>
  );
}
