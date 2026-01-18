import { Locale, locales } from "@/lib/i18n";
import { getPageMessages } from "@/lib/translations";
import { generatePageMetadata, generateWebSiteSchema } from "@/lib/seo";
import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { MiniContact } from "@/components/contact/sections/mini-contact";
import BlogSection from "@/components/home/BlogSection";
import PricingSection from "@/components/home/Section/PricingSection";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { MethodologySection } from "@/components/sections/methodology-section";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";

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
      <main className="w-full bg-background">
        {/* 🚀 Hero Section */}
        <HeroSection locale={typedLocale} translations={t} />
        {/* about */}
        <AboutSection
          id="about-section"
          badge={
            typedLocale === "ar" ? "جوهر عملنا" : "Our Engineering Essence"
          }
          title={t.about.title}
          subtitle={t.about.subtitle}
          description={t.about.description}
        />
        {/* Services Preview - Using Premium Cards ssr */}
        <ServicesSection
          id="services-section"
          badge={typedLocale === "ar" ? "خبراتنا" : "Core Expertise"}
          title={t.services.title}
          description={t.services.subtitle}
          translations={t.services}
          locale={typedLocale}
        />
        {/* Methodology Section ssr */}
        <MethodologySection
          id="methodology-section"
          badge={typedLocale === "ar" ? "منهجيتنا" : "The Engineering Engine"}
          title={
            typedLocale === "ar"
              ? "مسار مهيكل للتميز الرقمي"
              : "A structured path to digital dominance."
          }
          steps={t.methodology.steps}
        />
        {/* Pricing Section ssr */}
        <PricingSection locale={typedLocale} t={t.pricing} />
        {/* blog Section */}
        <BlogSection locale={typedLocale} t={t} />
         {/* Testimonials client */}
        <TestimonialsCarousel
          testimonials={t.testimonials.items.map((item: any) => ({
            quote: item.content,
            name: item.name,
            role: item.role,
            company:
              item.role.split(" at ")[1] ||
              item.role.split(", ")[1] ||
              "Company",
          }))}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
          autoScrollSpeed={30}
        />
        {/* Final CTA */}
        <MiniContact translations={t.contact} />
      </main>
    </>
  );
}
