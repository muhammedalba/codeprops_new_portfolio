import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata, generateFAQSchema } from '@/lib/seo';
import { ServicesClient } from '@/components/services/services-client';

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
      <ServicesClient locale={typedLocale} translations={t} />
    </>
  );
}
