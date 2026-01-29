import { Locale, locales } from "@/lib/i18n";
import { getPageMessages } from "@/lib/translations";
import { generatePageMetadata, generateWebSiteSchema } from "@/lib/seo";
import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
// import { MiniContact } from "@/components/contact/sections/mini-contact";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ContactCTA } from "@/components/contact/sections/contact-cta";

// Lazy load below-fold sections to reduce initial bundle
const MethodologySection = dynamic(
  () => import("@/components/sections/methodology-section").then(mod => ({ default: mod.MethodologySection })),
  { 
    ssr: true,
    loading: () => import("@/components/skeletons/methodology-skeleton").then(mod => <mod.MethodologySkeleton />)
  }
);

const PricingSection = dynamic(
  () => import("@/components/home/Section/PricingSection"),
  { 
    ssr: true,
    loading: () => import("@/components/skeletons/pricing-skeleton").then(mod => <mod.PricingSkeleton />)
  }
);

const BlogSection = dynamic(
  () => import("@/components/home/BlogSection"),
  { 
    ssr: true,
    loading: () => import("@/components/skeletons/blog-skeleton").then(mod => <mod.BlogSkeleton />)
  }
);

const TestimonialsCarousel = dynamic(
  () => import("@/components/sections/testimonials-carousel").then(mod => ({ default: mod.TestimonialsCarousel })),
  { 
    loading: () => import("@/components/skeletons/testimonials-skeleton").then(mod => <mod.TestimonialsSkeleton />)
  }
);

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
        {/* 🚀 Hero Section - Critical, loads immediately */}
        <HeroSection locale={typedLocale} translations={t} />
        
        {/* About Section - Above fold on desktop, loads immediately */}
        <AboutSection
          id="about-section"
          badge={
            typedLocale === "ar" ? "جوهر عملنا" : "Our Engineering Essence"
          }
          title={t.about.title}
          subtitle={t.about.subtitle}
          description={t.about.description}
        />
        
        {/* Services Section - Important, loads immediately */}
        <ServicesSection
          id="services-section"
          badge={typedLocale === "ar" ? "خبراتنا" : "Core Expertise"}
          title={t.services.title}
          description={t.services.subtitle}
          translations={t.services}
          locale={typedLocale}
        />
        
        {/* Methodology Section - Below fold, lazy loaded */}
        <Suspense fallback={<div className="min-h-[400px]" />}>
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
        </Suspense>
        
        {/* Pricing Section - Below fold, lazy loaded */}
        <Suspense fallback={<div className="min-h-[500px]" />}>
          <PricingSection locale={typedLocale} t={t.pricing} />
        </Suspense>
        
        {/* Blog Section - Below fold, lazy loaded */}
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <BlogSection locale={typedLocale} t={t} />
        </Suspense>
        
        {/* Testimonials - Below fold, lazy loaded (client component) */}
        <Suspense fallback={<div className="min-h-[500px]" />}>
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
        </Suspense>
           {/* Final CTA - Important, loads immediately */}
        <Suspense fallback={<div className="min-h-[300px]" />}>
                <ContactCTA
                  locale={typedLocale}
                  title={t.contact?.cta?.title || ""}
                  description={t.contact?.cta?.description || ""}
                  button={t.contact?.cta?.button || ""}
                />
              </Suspense>
      </main>
    </>
  );
}
