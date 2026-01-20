import type { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

interface GenerateMetadataProps {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function generatePageMetadata({
  locale,
  title,
  description,
  path = '',
  image = '/og-image.jpg',
}: GenerateMetadataProps): Metadata {
  const baseUrl = SITE_CONFIG.url;
  const url = `${baseUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en${path}`,
        'de': `${baseUrl}/de${path}`,
        'ar': `${baseUrl}/ar${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'ar_SA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// Generate structured data (Schema.org)
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: 'Leading software development company delivering cutting-edge solutions',
    address: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    sameAs: Object.values(SOCIAL_LINKS),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateFAQSchema(questions: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

