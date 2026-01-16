"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { TimelineSection } from "./sections/timeline-section";
import { ValuesSection } from "./sections/values-section";
import { TechStackSection } from "./sections/tech-stack-section";

/* ---------------------------------------------
 * Dynamic Components
 * --------------------------------------------*/
const HeroStats = dynamic(
  () => import("./hero-stats").then((mod) => mod.HeroStats),
  { ssr: false }
);
const SmartNav = dynamic(
  () => import("@/components/services/smart-nav").then((m) => m.SmartNav),
  { ssr: false }
);
const ContactCTA = dynamic(
  () => import("@/components/contact/contact-cta").then((m) => m.ContactCTA),
  { ssr: false }
);
/* ---------------------------------------------
 * Types
 * --------------------------------------------*/
interface AboutClientProps {
  locale: string;
  translations: any;
}

/* ---------------------------------------------
 * Component
 * --------------------------------------------*/
export function AboutClient({ locale, translations }: AboutClientProps) {
  const t = translations.about;

  const navSections = useMemo(
    () => [
      { id: "start", label: locale === "ar" ? "البداية" : "Hero" },
      { id: "stats", label: locale === "ar" ? "الأرقام" : "Stats" },
      { id: "values", label: locale === "ar" ? "فلسفتنا" : "Philosophy" },
      { id: "timeline", label: locale === "ar" ? "رحلتنا" : "Journey" },
      { id: "stack", label: locale === "ar" ? "تقنياتنا" : "Stack" },
    ],
    [locale]
  );

  return (
    <main className="flex flex-col bg-background">
      <SmartNav sections={navSections} />
      <HeroStats translations={translations} locale={locale} />
      <ValuesSection
        values={t.values}
        intro={t.intro.content}
      />
      <TimelineSection
        timeline={t.timeline}
      />
      <TechStackSection
        techStack={t.tech_stack}
      />
      {/* CTA */}
      <ContactCTA
        title={translations.contact.cta.title}
        description={translations.contact.cta.description}
        button={translations.contact.cta.button}
      />
    </main>
  );
}
