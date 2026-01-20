import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports for client islands
const SmartNav = dynamic(
  () => import("@/components/services/smart-nav").then((m) => m.SmartNav)
);

const HeroStats = dynamic(
  () => import("@/components/about/sections/hero-stats").then((m) => m.HeroStats),
  { 
    ssr: true,
    loading: () => import("@/components/skeletons/about-hero-skeleton").then((m) => <m.AboutHeroSkeleton />)
  }
);

const ValuesSection = dynamic(
  () => import("@/components/about/sections/values-section").then((m) => m.ValuesSection),
  { 
    ssr: true,
    loading: () => import("@/components/skeletons/values-skeleton").then((m) => <m.ValuesSkeleton />)
  }
);

const TimelineSection = dynamic(
  () => import("@/components/about/sections/timeline-section").then((m) => m.TimelineSection),
  { 
    ssr: true,
    loading: () => import("@/components/skeletons/timeline-skeleton").then((m) => <m.TimelineSkeleton />)
  }
);

const TechStackSection = dynamic(
  () => import("@/components/about/sections/tech-stack-section").then((m) => m.TechStackSection),
  { ssr: true }
);

const ContactCTA = dynamic(
  () => import("@/components/contact/sections/contact-cta").then((m) => m.ContactCTA)
);

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getPageMessages(locale as Locale, "about");
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.about.title,
    description: t.seo.about.description,
    path: '/about',
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "about");



  const navSections = [
    { id: "start", label: typedLocale === "ar" ? "البداية" : "Hero" },
    { id: "stats", label: typedLocale === "ar" ? "الأرقام" : "Stats" },
    { id: "values", label: typedLocale === "ar" ? "فلسفتنا" : "Philosophy" },
    { id: "timeline", label: typedLocale === "ar" ? "رحلتنا" : "Journey" },
    { id: "stack", label: typedLocale === "ar" ? "تقنياتنا" : "Stack" },
  ];

  return (
    <main className="flex flex-col bg-background">
      <SmartNav sections={navSections} />
      
      <Suspense fallback={<div className="min-h-[600px]" />}>
        <HeroStats translations={t} locale={typedLocale} />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ValuesSection
          values={t.about.values}
          intro={t.about.intro.content}
        />
      </Suspense>

      <Suspense fallback={<div className="min-h-[500px]" />}>
        <TimelineSection
          timeline={t.about.timeline}
        />
      </Suspense>

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <TechStackSection
          techStack={t.about.tech_stack}
        />
      </Suspense>

      <Suspense fallback={<div className="min-h-[300px]" />}>
        <ContactCTA
          locale={typedLocale}
          title={t.contact?.cta?.title || ""}
          description={t.contact?.cta?.description || ""}
          button={t.contact?.cta?.button || ""}
        />
      </Suspense>
    </main>
  );
}
