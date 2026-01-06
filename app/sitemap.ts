import { locales, defaultLocale } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import type { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Base pages
  const pages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/contact',
    // Individual services
    '/services/web',
    '/services/custom',
    '/services/ecommerce',
    '/services/cloud',
    '/services/performance',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and page
  locales.forEach((locale) => {
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
    const t = getMessages(locale);
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
  });

  return sitemap;
}
