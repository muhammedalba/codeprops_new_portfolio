import { locales, defaultLocale, Locale } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { serviceSlugs } from '@/lib/services';
import type { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Base pages
  const pages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
  ];

  // Dynamically add service pages
  serviceSlugs.forEach(slug => {
    pages.push(`/services/${slug}`);
  });

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and page
  for (const locale of locales) {
    // Standard pages
    pages.forEach((page) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' || page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : page === '/contact' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${page}`])
          ),
        },
      });
    });

    // Portfolio projects
    const t = await getPageMessages(locale as Locale, "portfolio");
    if (t.portfolio && t.portfolio.projects) {
      t.portfolio.projects.forEach((project: any) => {
        const path = `/portfolio/${project.slug}`;
        sitemap.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
            ),
          },
        });
      });
    }
  }

  return sitemap;
}
