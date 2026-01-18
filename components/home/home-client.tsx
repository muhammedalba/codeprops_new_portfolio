"use client";
import React, { memo } from "react";
import dynamic from "next/dynamic";
import { Locale } from "@/lib/i18n";


// Dynamic imports for sections below the fold to improve LCP and initial load performance
const ServicesSection = dynamic(() =>
  import("@/components/sections/services-section").then(
    (m) => m.ServicesSection,
  ),
);
const MethodologySection = dynamic(() =>
  import("@/components/sections/methodology-section").then(
    (m) => m.MethodologySection,
  ),
);

const TestimonialsCarousel = dynamic(() =>
  import("@/components/sections/testimonials-carousel").then(
    (m) => m.TestimonialsCarousel,
  ),
);

interface HomeClientProps {
  locale: Locale;
  translations: any;
}

function HomeClientComponent({
  locale: typedLocale,
  translations: t,
}: HomeClientProps) {
  return (
    <>
        {/* ssr */}
       
      


      
      {/* Pricing Section */}

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
    </>
  );
}

export const HomeClient = memo(HomeClientComponent);
