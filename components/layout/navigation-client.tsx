'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * NavigationClient - Minimal Client Component
 * Only handles active state highlighting for navigation links
 * Wraps server-rendered navigation to add interactivity
 */
export function NavigationClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const normalizedPathname = pathname?.replace(/\/$/, '');
    const links = navRef.current.querySelectorAll('a[data-href]');

    links.forEach((link) => {
      const href = link.getAttribute('data-href');
      if (href === normalizedPathname) {
        link.classList.add('text-primary', 'border-b-2', 'border-primary');
        link.classList.remove('text-muted-foreground');
      } else {
        link.classList.remove('text-primary', 'border-b-2', 'border-primary');
        link.classList.add('text-muted-foreground');
      }
    });
  }, [pathname]);

  return <div ref={navRef}>{children}</div>;
}
