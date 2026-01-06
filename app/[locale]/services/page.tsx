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
    <div className="pt-32">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(t.services.faq.questions)),
        }}
      />

      <Container className="pb-24">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tighter">
            {t.services.title}
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid gap-8 mb-32">
          {servicesList.map((service, i) => (
            <div 
              key={service.key}
              className="group relative p-8 md:p-12 rounded-[3rem] border border-border bg-muted/20 hover:bg-muted/30 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-primary font-mono text-sm mb-4 block">0{i+1}. Capabilities</span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <ArrowUpRight className="w-6 h-6 group-hover:text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
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
