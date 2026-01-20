'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
}

/**
 * LanguageSwitcher Client Component
 * Uses usePathname to get current path for language switching
 * Minimal client component (~0.5KB)
 */
export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center pr-4 border-r">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={pathname?.replace(`/${locale}`, `/${loc}`) || `/${loc}`}
          className={`text-xs mx-2 font-mono font-bold transition-colors hover:text-primary hover:underline uppercase ${
            locale === loc ? 'hidden' : 'text-muted-foreground/60'
          }`}
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
