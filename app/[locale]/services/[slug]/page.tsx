import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { ServiceDetailClient } from '@/components/services/service-detail-client';
import { serviceSlugs, isValidServiceSlug } from '@/lib/services';

export const dynamicParams = false;

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
  const t = getMessages(locale as Locale);
  const service = (t.services as any)[slug];

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
  const t = getMessages(typedLocale);
  const serviceData = (t.services as any)[slug];

  if (!serviceData || !isValidServiceSlug(slug)) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <>
      {/* Breadcrumb Schema */}
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

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(t.services.faq.questions)),
        }}
      />
      
      {/* Service Schema */}
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
            "serviceType": "Software Development"
          }),
        }}
      />
      <ServiceDetailClient 
        locale={typedLocale} 
        serviceKey={slug} 
        serviceData={serviceData} 
        translations={t} 
      />
    </>
  );
}
