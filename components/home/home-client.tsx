"use client";

import React, { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/home/hero-section";
import { WaveDivider } from "@/components/layout/wave-divider";
import { SectionHeader } from "@/components/ui/section-header";
import { AboutSection } from "@/components/sections/about-section";
import Link from "next/link";

// Dynamic imports for sections below the fold to improve LCP and initial load performance
const SectionReveal = dynamic(() => import("@/components/animations/section-reveal").then(m => m.SectionReveal));
const ServicesSection = dynamic(() => import("@/components/sections/services-section").then(m => m.ServicesSection));
const MethodologySection = dynamic(() => import("@/components/sections/methodology-section").then(m => m.MethodologySection));
const PricingCard = dynamic(() => import("@/components/sections/pricing-card").then(m => m.PricingCard));
const TestimonialsCarousel = dynamic(() => import("@/components/sections/testimonials-carousel").then(m => m.TestimonialsCarousel));
const BlogCard = dynamic(() => import("@/components/sections/blog-card").then(m => m.BlogCard));
const MiniContact = dynamic(() => import("@/components/contact/sections/mini-contact").then(m => m.MiniContact));

const Button = dynamic(() => import("@/components/ui/button").then(m => m.Button));

interface HomeClientProps {
  locale: Locale;
  translations: any;
}

function HomeClientComponent({
  locale: typedLocale,
  translations: t,
}: HomeClientProps) {
  const latestPosts = useMemo(() => t.blog.posts.slice(0, 3), [t.blog.posts]);

  return (
    <main className="w-full bg-background">
      {/* 🚀 Hero Section */}
      <HeroSection locale={typedLocale} translations={t} />

      {/* About Section - Redesigned for Impact */}
      <SectionReveal>
        {/* Divider */}
        <WaveDivider />
        <AboutSection 
          id="about-section"
          badge={typedLocale === 'ar' ? "جوهر عملنا" : "Our Engineering Essence"}
          title={t.about.title}
          subtitle={t.about.subtitle}
          description={t.about.description}
        />
          <WaveDivider flip={true} />
      </SectionReveal>

      {/* Services Preview - Using Premium Cards */}
      <SectionReveal>
        <ServicesSection 
          id="services-section"
          badge={typedLocale === 'ar' ? "خبراتنا" : "Core Expertise"}
          title={t.services.title}
          description={t.services.subtitle}
          translations={t.services}
          locale={typedLocale}
        />
      </SectionReveal>

      {/* Methodology Section */}
      <SectionReveal>
        <MethodologySection 
          id="methodology-section"
          badge={typedLocale === 'ar' ? "منهجيتنا" : "The Engineering Engine"}
          title={typedLocale === 'ar' ? "مسار مهيكل للتميز الرقمي" : "A structured path to digital dominance."}
          steps={t.methodology.steps}
        />
      </SectionReveal>

      {/* Pricing Section */}
      <SectionReveal>
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <SectionHeader 
              id="pricing-title"
              badge={t.pricing.title}
              title={t.pricing.subtitle}
            />

            <div className="grid md:grid-cols-3 gap-8 items-stretch pt-12">
              {t.pricing.plans.map((plan: any, i: number) => (
                <PricingCard
                  locale={typedLocale}
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
      </SectionReveal>

      {/* Testimonials */}
      <SectionReveal>
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
      </SectionReveal>

      {/* Blog/News Section - data driven */}
      <SectionReveal>
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <SectionHeader 
                badge={t.blog.title}
                title={t.blog.subtitle}
                align="left"
                className="mb-0"
              />
              <Link href={`/${typedLocale}/blog`}>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-14 font-bold border-primary/20 hover:bg-primary/5">
                  {t.blog.viewAll}
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post: any) => (
                <BlogCard
                  key={post.slug}
                  category={t.blog.category}
                  date={post.date}
                  readMoreText={t.blog.readMore}
                  title={post.title}
                  href={`/${typedLocale}/blog/${post.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Final CTA */}
      <MiniContact translations={t.contact} />
    </main>
  );
}

export const HomeClient = memo(HomeClientComponent);
