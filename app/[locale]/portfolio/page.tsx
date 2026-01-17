import { Metadata } from "next";
import { Locale, locales } from "@/lib/i18n";
import { getPageMessages } from "@/lib/translations";
import { generatePageMetadata } from "@/lib/seo";
import { PortfolioClient } from "@/components/portfolio/portfolio-client";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getPageMessages(locale as Locale, "portfolio");
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.portfolio.title,
    description: t.seo.portfolio.description,
    path: "/portfolio",
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "portfolio");

  return <PortfolioClient locale={typedLocale} translations={t} />;
}
