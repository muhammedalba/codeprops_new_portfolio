import { Metadata } from "next";
import { Locale, locales } from "@/lib/i18n";
import { getPageMessages } from "@/lib/translations";
import { generatePageMetadata } from "@/lib/seo";
import { ContactCTA } from "@/components/contact/sections/contact-cta";
import { FilterWithProjectsGrid } from "@/components/portfolio/Sections/FilterWithProjectsGrid";
import HeroSection from "@/components/portfolio/Sections/HeroSection";

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

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Hero Section */}
      <HeroSection locale={locale} t={t} />

      {/* Filter With Projects Grid */}
      <FilterWithProjectsGrid t={t.portfolio} locale={locale} />

      {/* Instant Contact CTA */}
      <ContactCTA
        locale={locale}
        title={t.contact.cta.title}
        description={t.contact.cta.description}
        button={t.contact.cta.button}
      />
    </main>
  );
      ;
}
