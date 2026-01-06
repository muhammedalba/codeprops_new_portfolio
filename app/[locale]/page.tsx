import { Locale, locales } from "@/lib/i18n";
import { getMessages } from "@/lib/translations";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { HomeClient } from "@/components/home/home-client";

export const dynamicParams = false;

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
    title: t.seo.home.title,
    description: t.seo.home.description,
    path: '',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = getMessages(typedLocale);

  return <HomeClient locale={typedLocale} translations={t} />;
}
