'use client';

import { useState } from 'react';
import { MenuIcon, XIcon } from '@/components/ui/inline-icons';
import dynamic from 'next/dynamic';
import type { Locale } from '@/lib/i18n';

const MobileMenu = dynamic(() => import('./mobile-menu'), {
  ssr: false,
});

interface MobileMenuButtonProps {
  navigation: { name: string; href: string }[];
  locale: Locale;
  contactText: string;
}

/**
 * MobileMenuButton - Tiny Client Island
 * Only the toggle button and state management
 * Lazy loads MobileMenu component when opened
 * Size: ~0.5KB
 */
export function MobileMenuButton({ navigation, locale, contactText }: MobileMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden p-2 text-foreground"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navigation={navigation}
          locale={locale}
          translations={{ contact: contactText }}
        />
      )}
    </>
  );
}
