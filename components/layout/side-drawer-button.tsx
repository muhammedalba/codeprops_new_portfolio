'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutGridIcon } from '@/components/ui/inline-icons';
import dynamic from 'next/dynamic';
import type { Locale } from '@/lib/i18n';
import { TranslationMessages } from '@/lib/translations';

const SideDrawer = dynamic(() => import('./side-drawer').then(mod => mod.SideDrawer), {
  ssr: false,
});

interface SideDrawerButtonProps {
  locale: Locale;
  translations?: TranslationMessages;
}

/**
 * SideDrawerButton - Tiny Client Island
 * Only the toggle button and state management
 * Lazy loads SideDrawer component when opened
 * Size: ~0.5KB
 */
export function SideDrawerButton({ locale, translations }: SideDrawerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:flex hidden" 
        onClick={() => setIsOpen(true)}
      >
        <LayoutGridIcon className="h-5 w-5" />
      </Button>

      {isOpen && (
        <SideDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          locale={locale}
          translations={translations}
        />
      )}
    </>
  );
}
