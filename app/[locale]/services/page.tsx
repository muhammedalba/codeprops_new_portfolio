import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata, generateFAQSchema } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { ArrowUpRight } from 'lucide-react';
import { FAQSection } from '@/components/layout/faq-section';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(locale as Locale);
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.services.title,
    description: t.seo.services.description,
    path: '/services',
  });
}

import { MiniContact } from '@/components/contact/mini-contact';

import { PageHeader } from '@/components/ui/page-header';
import { GlassCard } from '@/components/ui/glass-card';
import { GlowEffect } from '@/components/ui/glow-effect';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  const servicesList = [
    { key: 'web', ...t.services.web },
    { key: 'custom', ...t.services.custom },
    { key: 'ecommerce', ...t.services.ecommerce },
    { key: 'cloud', ...t.services.cloud },
    { key: 'performance', ...t.services.performance },
  ];

  return (
    <div>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(t.services.faq.questions)),
        }}
      />

      <PageHeader 
        title={t.services.title}
        description={t.services.subtitle}
      />

      <Container className="pb-24">
        <div className="grid gap-12 mb-32">
          {servicesList.map((service, i) => (
            <GlassCard 
              key={service.key}
              className="group p-8 md:p-12 rounded-[3.5rem] overflow-hidden"
            >
              <GlowEffect size="lg" className="top-0 right-0 opacity-10 group-hover:opacity-20" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                <div className="max-w-2xl">
                  <span className="text-primary font-mono text-sm mb-6 block tracking-[0.3em] uppercase">
                    0{i+1}. Professional Capability
                  </span>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 group-hover:text-primary transition-colors leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-full border border-border/50 bg-background/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-700 shadow-xl">
                    <ArrowUpRight className="w-8 h-8 group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <FAQSection 
          title={t.services.faq.title}
          subtitle={t.services.faq.subtitle}
          questions={t.services.faq.questions}
        />
      </Container>

      <MiniContact translations={t.contact} />
    </div>
  );
}
