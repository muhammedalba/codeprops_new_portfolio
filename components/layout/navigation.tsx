import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface NavigationProps {
  locale: Locale;
  translations: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    blog: string;
    contact: string;
  };
}

/**
 * Navigation Server Component
 * Renders navigation links as static HTML
 * Active state will be handled by NavigationClient wrapper
 */
export function Navigation({ locale, translations }: NavigationProps) {
  const navigation = [
    { name: translations.home, href: `/${locale}` },
    { name: translations.about, href: `/${locale}/about` },
    { name: translations.services, href: `/${locale}/services` },
    { name: translations.portfolio, href: `/${locale}/portfolio` },
    { name: translations.blog, href: `/${locale}/blog` },
    { name: translations.contact, href: `/${locale}/contact` },
  ];

  return (
    <nav className="hidden lg:flex items-center">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm mx-1 md:mx-3 lg:mx-4 md:text-base font-semibold tracking-wide transition-colors hover:text-primary text-muted-foreground"
          data-href={item.href}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
