import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { AboutClient } from '@/components/about/about-client';

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
    title: t.seo.about.title,
    description: t.seo.about.description,
    path: '/about',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = getMessages(typedLocale);

  return <AboutClient locale={typedLocale} translations={t} />;
}
