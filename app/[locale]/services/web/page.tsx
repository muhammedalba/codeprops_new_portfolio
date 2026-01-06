import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata, generateFAQSchema } from '@/lib/seo';
import { Container } from '@/components/layout/container';
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
    title: `${t.services.web.title} | Codeprops`,
    description: t.services.web.description,
    path: '/services/web',
  });
}

import { MiniContact } from '@/components/contact/mini-contact';

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

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
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tighter">
            {t.services.web.title}
          </h1>
          <div className="prose prose-xl prose-invert max-w-none mb-24">
            <p className="text-2xl text-primary font-medium mb-12 leading-relaxed">
              Elevating digital presence through high-performance, SEO-optimized web architecture.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {t.services.web.description}
            </p>
            <h2 className="text-3xl font-heading font-bold mt-16 mb-8 text-foreground">Next-Gen Technology Stack</h2>
            <p className="text-muted-foreground">
              Our web development services leverage the power of Next.js, React, and modular CSS to deliver websites that not only look premium but perform at the highest level of speed and security.
            </p>
          </div>
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
