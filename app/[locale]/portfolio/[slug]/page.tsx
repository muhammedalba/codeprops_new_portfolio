import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { PortfolioProjectClient } from '@/components/portfolio/portfolio-project-client';

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  
  locales.forEach((locale) => {
    const t = getMessages(locale as Locale);
    if (t.portfolio && t.portfolio.projects) {
      t.portfolio.projects.forEach((project: any) => {
        paths.push({
          locale,
          slug: project.slug,
        });
      });
    }
  });

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getMessages(locale as Locale);
  const project = t.portfolio.projects.find((p: any) => p.slug === slug);

  if (!project) return {};

  return generatePageMetadata({
    locale: locale as Locale,
    title: `${project.title} | Case Study | Codeprops`,
    description: project.description,
    path: `/portfolio/${slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const t = getMessages(typedLocale);
  const project = t.portfolio.projects.find((p: any) => p.slug === slug);

  if (!project) notFound();

  return <>
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/portfolio/${project.slug}`,
    }),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}` },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/portfolio` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/portfolio/${project.slug}` },
      ],
    }),
  }}
/>


  <PortfolioProjectClient locale={typedLocale} project={project} t={t.portfolio} />
  
  </>;
}
