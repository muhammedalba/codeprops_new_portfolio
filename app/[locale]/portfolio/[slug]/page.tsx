import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { PortfolioProjectClient } from '@/components/portfolio/portfolio-project-client';

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    const t = await getPageMessages(locale as Locale, "portfolio");
    if (t.portfolio && t.portfolio.projects) {
      t.portfolio.projects.forEach((project: any) => {
        paths.push({
          locale,
          slug: project.slug,
        });
      });
    }
  }

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getPageMessages(locale as Locale, "portfolio");
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
  const t = await getPageMessages(typedLocale, "portfolio");
  const project = t.portfolio.projects.find((p: any) => p.slug === slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://codeprops.com';

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
      "url": `${baseUrl}/${locale}/portfolio/${project.slug}`,
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
        { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/${locale}` },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: `${baseUrl}/${locale}/portfolio` },
        { "@type": "ListItem", position: 3, name: project.title, item: `${baseUrl}/${locale}/portfolio/${project.slug}` },
      ],
    }),
  }}
/>


  <PortfolioProjectClient locale={typedLocale} project={project} t={t.portfolio} />
  
  </>;
}
