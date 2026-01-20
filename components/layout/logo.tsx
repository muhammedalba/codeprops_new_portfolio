import Link from 'next/link';
import type { Locale } from '@/lib/i18n';

interface LogoProps {
  locale: Locale;
}

/**
 * Logo Server Component
 * Pure static HTML - no JavaScript needed
 * Renders the CodeProps logo with link to home
 */
export function Logo({ locale }: LogoProps) {
  return (
    <Link href={`/${locale}`} className="flex items-center space-x-2">
      <span className="text-lg md:text-2xl font-heading font-bold bg-clip-text">
        Code<span className="text-primary">Props</span>
      </span>
    </Link>
  );
}
