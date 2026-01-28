import { locales, defaultLocale, Locale } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { serviceSlugs } from '@/lib/services';
import type { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://codeprops.com';
  
  // Base pages
  const pages = [
    '',
    '/about',
    '/services',
    '/portfolio', 
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
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
      const isLegal = ['/privacy', '/terms'].includes(page);
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' || page === '/blog' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : isLegal ? 0.3 : 0.8,
        alternates: {
          languages: {
            'en': `${baseUrl}/en${page}`,
            'de': `${baseUrl}/de${page}`,
            'ar': `${baseUrl}/ar${page}`,
            'x-default': `${baseUrl}/${defaultLocale}${page}`,
          },
        },
      });
    });

    // Portfolio projects
    const tp = await getPageMessages(locale as Locale, "portfolio");
    if (tp.portfolio && tp.portfolio.projects) {
      tp.portfolio.projects.forEach((project: any) => {
        const path = `/portfolio/${project.slug}`;
        sitemap.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              'en': `${baseUrl}/en${path}`,
              'de': `${baseUrl}/de${path}`,
              'ar': `${baseUrl}/ar${path}`,
              'x-default': `${baseUrl}/${defaultLocale}${path}`,
            },
          },
        });
      });
    }

    // Blog posts
    const tb = await getPageMessages(locale as Locale, "blog");
    if (tb.blog && tb.blog.posts) {
      tb.blog.posts.forEach((post: any) => {
        const path = `/blog/${post.slug}`;
        sitemap.push({
          url: `${baseUrl}/${locale}${path}`,
          lastModified: post.dateModified ? new Date(post.dateModified) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
          alternates: {
            languages: {
              'en': `${baseUrl}/en${path}`,
              'de': `${baseUrl}/de${path}`,
              'ar': `${baseUrl}/ar${path}`,
              'x-default': `${baseUrl}/${defaultLocale}${path}`,
            },
          },
        });
      });
    }
  }

  return sitemap;
}
