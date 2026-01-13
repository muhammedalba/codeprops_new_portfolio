"use client";

import dynamic from "next/dynamic";
import { Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/home/hero-section";
import { WaveDivider } from "@/components/layout/wave-divider";
import { SectionHeader } from "@/components/ui/section-header";
import { AboutSection } from "@/components/sections/about-section";

// Dynamic imports for sections below the fold to improve LCP and initial load performance
const ServicesSection = dynamic(() => import("@/components/sections/services-section").then(m => m.ServicesSection));
const MethodologySection = dynamic(() => import("@/components/sections/methodology-section").then(m => m.MethodologySection));
const PricingCard = dynamic(() => import("@/components/sections/pricing-card").then(m => m.PricingCard));
const TestimonialsCarousel = dynamic(() => import("@/components/sections/testimonials-carousel").then(m => m.TestimonialsCarousel));
const BlogCard = dynamic(() => import("@/components/sections/blog-card").then(m => m.BlogCard));
const MiniContact = dynamic(() => import("@/components/contact/mini-contact").then(m => m.MiniContact));
const Button = dynamic(() => import("@/components/ui/button").then(m => m.Button));

interface HomeClientProps {
  locale: Locale;
  translations: any;
}

export function HomeClient({
  locale: typedLocale,
  translations: t,
}: HomeClientProps) {
  return (
    <main className="w-full">
      {/* 🚀 LCP Element: Keep Hero static for max speed */}
      <HeroSection locale={typedLocale} translations={t} />

      <WaveDivider />

      {/* About Section - Crucial for SEO (Keyword Context) */}
      <AboutSection 
        id="about-section"
        badge="Our Essence"
        title={t.about.title}
        subtitle={t.about.subtitle}
        description={t.about.description}
      />

      <WaveDivider flip />

      {/* Services Grid */}
      <ServicesSection 
        id="services-section"
        badge="Expertise"
        title={t.services.title}
        description={t.services.subtitle}
        translations={t.services}
        locale={typedLocale}
      />

      {/* Methodology Section */}
      <MethodologySection 
        id="methodology-section"
        badge="Methodology"
        title="A structured path to digital dominance."
        steps={t.methodology.steps}
      />

      {/* Pricing Section */}
      <section className="py-24 relative overflow-hidden" aria-labelledby="pricing-title">
        <div className="container mx-auto px-6">
          <SectionHeader 
            id="pricing-title"
            badge={t.pricing.title}
            title={t.pricing.subtitle}
          />

          <div className="grid md:grid-cols-3 gap-8 items-stretch pt-12">
            {t.pricing.plans.map((plan: any, i: number) => (
              <PricingCard
                key={i}
                plan={plan}
                isFeatured={i === 1}
                badge={t.pricing.badge}
                priceSuffix={t.pricing.priceSuffix}
                ctaText={t.pricing.cta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel
        testimonials={t.testimonials.items.map((item: any) => ({
          quote: item.content,
          name: item.name,
          role: item.role,
          company: item.role.split(' at ')[1] || item.role.split(', ')[1] || 'Company',
        }))}
        title={t.testimonials.title}
        subtitle={t.testimonials.subtitle}
        autoScrollSpeed={30}
      />

      {/* Blog/News Section */}
      <section className="py-24" aria-labelledby="blog-title">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <SectionHeader 
              id="blog-title"
              badge={t.blog.title}
              title={t.blog.subtitle}
              align="left"
              className="mb-0"
            />
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-14 font-bold border-primary/20 hover:bg-primary/5"
            >
              {t.blog.viewAll}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <BlogCard
                key={item}
                category={t.blog.category}
                date="January 06, 2026"
                readMoreText={t.blog.readMore}
                title={
                  item === 1
                    ? "Evolution of Enterprise Architecture in 2026"
                    : item === 2
                    ? "Mastering Micro-frontends Patterns"
                    : "AI-Driven Development Flow"
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <MiniContact translations={t.contact} />
    </main>
  );
}
