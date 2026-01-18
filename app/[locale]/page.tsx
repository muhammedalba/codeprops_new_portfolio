import { Locale, locales } from "@/lib/i18n";
import { getPageMessages } from "@/lib/translations";
import { generatePageMetadata, generateWebSiteSchema } from "@/lib/seo";
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
  const t = await getPageMessages(locale as Locale, "home");

  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.home.title,
    description: t.seo.home.description,
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "home");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebSiteSchema()),
        }}
      />
      <HomeClient locale={typedLocale} translations={t} />
    </>
  );
}
