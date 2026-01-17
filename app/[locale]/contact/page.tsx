import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generateFAQSchema, generatePageMetadata } from '@/lib/seo';
import { ContactClient } from '@/components/contact/contact-client';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getPageMessages(locale as Locale, "contact");
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    path: '/contact',
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "contact");

  return <><script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateFAQSchema(t.contact.faq.questions)),
  }}
/>

  <ContactClient locale={typedLocale} translations={t} />
  </> ;
}
