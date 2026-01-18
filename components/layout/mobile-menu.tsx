
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { locales, localeNames } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
  locale: Locale;
  translations: {
    contact: string;
  };
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  navigation, 
  locale, 
  translations 
}: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b animate-in slide-in-from-top duration-300 z-40">
      <div className="p-6 space-y-6">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-lg font-semibold hover:text-primary"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        
        <div className="pt-6 border-t">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
            Language
          </p>
          <div className="flex gap-4">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={pathname?.replace(`/${locale}`, `/${loc}`) || `/${loc}`}
                className={`text-sm font-bold uppercase ${
                  locale === loc ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={onClose}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>
        </div>

        <Button className="w-full h-12 rounded-full" asChild>
          <Link href={`/${locale}/contact`} onClick={onClose}>
            {translations.contact}
          </Link>
        </Button>
      </div>
    </div>
  );
}
