import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { serviceSlugs, isValidServiceSlug, ServiceSlug, serviceIcons } from '@/lib/services';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceCard } from '@/components/services/service-card';
import { RelatedServices } from '@/components/services/related-services';
// Server Sections
import { ServiceHero } from '@/components/services/detail-sections/ServiceHero';
import { ServiceNarrative } from '@/components/services/detail-sections/ServiceNarrative';

import { TranslationValue } from '@/lib/translations';

interface ServiceData {
  title: string;
  description: string;
  [key: string]: TranslationValue;
}

// Client Islands
import { ContactFAQ, ContactCTA } from '@/components/contact/sections/contact-islands';

import { Icons } from "@/components/ui/icons";

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  
  locales.forEach((locale) => {
    serviceSlugs.forEach((slug) => {
      paths.push({
        locale,
        slug,
      });
    });
  });

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getPageMessages(locale as Locale, "services");
  const service = (t.services as Record<string, ServiceData>)[slug];

  if (!service) return {};

  return generatePageMetadata({
    locale: locale as Locale,
    title: `${service.title} | Engineering Services | Codeprops`,
    description: service.description,
    path: `/services/${slug}`,
  });
}



export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "services");
  const serviceData = (t.services as Record<string, ServiceData>)[slug];
  const isRtl = typedLocale === 'ar';
  
  const serviceTypeMap: Record<string, string> = {
    web: "Web Application Development",
    custom: "Custom Software Development",
    ecommerce: "Ecommerce Development Services",
    cloud: "Cloud Infrastructure Services",
    performance: "Website Performance Optimization",
  };

  if (!serviceData || !isValidServiceSlug(slug)) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const allServices = [
    { slug: 'web', title: t.services.web.title, description: t.services.web.description },
    { slug: 'custom', title: t.services.custom.title, description: t.services.custom.description },
    { slug: 'ecommerce', title: t.services.ecommerce.title, description: t.services.ecommerce.description },
    { slug: 'cloud', title: t.services.cloud.title, description: t.services.cloud.description },
    { slug: 'performance', title: t.services.performance.title, description: t.services.performance.description },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: 'Home', item: `${baseUrl}/${locale}` },
            { name: 'Services', item: `${baseUrl}/${locale}/services` },
            { name: serviceData.title, item: `${baseUrl}/${locale}/services/${slug}` }
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(t.services.faq.questions)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": serviceData.title,
            "description": serviceData.description,
            "provider": {
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`,
              "name": "CodeProps",
              "url": `${baseUrl}/${locale}`
            },
            "areaServed": "Worldwide",
            "serviceType": serviceTypeMap[slug] ?? "Software Development"
          }),
        }}
      />
      
      <main className="flex flex-col bg-background min-h-screen">
        <ServiceHero 
          locale={typedLocale} 
          isRtl={isRtl} 
          serviceData={serviceData} 
          slug={slug as ServiceSlug} 
        />
        
        <ServiceNarrative 
          isRtl={isRtl} 
          serviceData={serviceData} 
          slug={slug as ServiceSlug} 
        />

        <section className="py-24 bg-muted/30">
          <Container>
            <SectionHeader 
               badge={isRtl ? "خارطة المهندس" : "The Engineering Loop"}
               title={isRtl ? "كيف نحوّل رؤيتك إلى واقع" : "How we build digital dominance."}
               align="left"
            />
            <div className="grid md:grid-cols-4 gap-8 pt-16">
              {t.services.process.steps.map((step: { title: string; description: string }, i: number) => (
                  <ServiceCard
                    key={i}
                    index={i}
                    title={step.title}
                    description={step.description}
                    icon={serviceIcons[allServices[i]?.slug as ServiceSlug] || Icons.monitor}          
                  />
              ))}
            </div>
          </Container>
        </section>

        <Container className="py-24">
           <ContactFAQ title={t.services.faq.title} subtitle={t.services.faq.subtitle} questions={t.services.faq.questions} />
        </Container>

        <RelatedServices 
          currentSlug={slug}
          locale={typedLocale}
          services={allServices}
        />

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
