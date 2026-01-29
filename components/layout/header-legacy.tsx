'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, locales } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { MenuIcon, XIcon, LayoutGridIcon } from '@/components/ui/inline-icons';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Container } from './container';
import { ThemeToggle } from './theme-toggle';
import dynamic from 'next/dynamic';
import { TranslationMessages } from '@/lib/translations';

// Dynamic imports for heavy interactive components that are initially hidden
const SideDrawer = dynamic(() => import('./side-drawer').then(mod => mod.SideDrawer), {
  ssr: false, // Client-side only interaction
});

const MobileMenu = dynamic(() => import('./mobile-menu'), {
  ssr: false, // Client-side only interaction
});

interface HeaderProps {
  locale: Locale;
  translations: {
      home: string;
      about: string;
      services: string;
      portfolio: string;
      blog: string;
      contact: string;
  };
  sideDrawerTranslations?: TranslationMessages;
}

export function HeaderLegacy({ locale, translations, sideDrawerTranslations }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const rafIdRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  // Optimization: Memoize navigation items to prevent recreation on every render
  const navigation = useMemo(() => [
    { name: translations.home, href: `/${locale}` },
    { name: translations.about, href: `/${locale}/about` },
    { name: translations.services, href: `/${locale}/services` },
    { name: translations.portfolio, href: `/${locale}/portfolio` },
    { name: translations.blog, href: `/${locale}/blog` },
    { name: translations.contact, href: `/${locale}/contact` },
  ], [locale, translations]);

  // Optimization: Memoize pathname normalization
  const normalizedPathname = useMemo(() => pathname?.replace(/\/$/, ''), [pathname]);

  // Optimization: RAF-based scroll handler to reduce re-renders
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Skip if scroll position hasn't changed significantly
    if (Math.abs(currentScrollY - lastScrollYRef.current) < 5) {
      return;
    }
    
    lastScrollYRef.current = currentScrollY;

    // Cancel previous frame if it hasn't executed yet
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Schedule update for next animation frame
    rafIdRef.current = requestAnimationFrame(() => {
      const shouldBeScrolled = currentScrollY > 20;
      setIsScrolled(prev => prev !== shouldBeScrolled ? shouldBeScrolled : prev);
      rafIdRef.current = null;
    });
  }, []);

  useEffect(() => {
    // Use AbortController for cleaner event listener cleanup
    const controller = new AbortController();
    
    window.addEventListener('scroll', handleScroll, { 
      passive: true,
      signal: controller.signal 
    });

    return () => {
      controller.abort();
      // Cancel any pending animation frame
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <>
      <header 
        className={`sticky h-[var(--header-height)] top-0 z-50  flex items-center w-full transition-all duration-300 ${
          isScrolled 
            ? 'border-b  bg-background/70 backdrop-blur-md py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <Container>
          <div className="flex w-full  items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href={`/${locale}`} className="flex items-center space-x-2">
                <span className="text-lg md:text-2xl font-heading font-bold bg-clip-text ">
                   Code<span className="text-primary">Props</span>
                </span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center ">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm mx-1 md:mx-3 lg:mx-4 md:text-base font-semibold tracking-wide transition-colors hover:text-primary ${
                      normalizedPathname === item.href
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center space-x-4">
              {/* Desktop Language Switcher (Optional, since we have drawer) */}
              <div className="flex items-center pr-4 border-r">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={pathname?.replace(`/${locale}`, `/${loc}`) || `/${loc}`}
                    className={`text-xs  mx-2 font-mono font-bold transition-colors hover:text-primary hover:underline  uppercase ${
                      locale === loc ? 'hidden' : 'text-muted-foreground/60'
                    }`}
                  >
                    {loc}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="md:flex hidden" onClick={() => setSideDrawerOpen(true)}>
                  <LayoutGridIcon className="h-5 w-5" />
                </Button>
                
                <Button className="hidden md:flex h-10 px-6 rounded-full border border-primary" asChild>
                  <Link href={`/${locale}/contact`}>{translations.contact}</Link>
                </Button>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2 text-foreground"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <XIcon className="h-6 w-6" />
                  ) : (
                    <MenuIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Lazy loaded Mobile Menu */}
          {mobileMenuOpen && (    
             <MobileMenu 
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navigation={navigation}
                locale={locale}
                translations={{ contact: translations.contact }}
             />
          )}
        </Container>
      </header>
      
      {/* Lazy loaded Side Drawer */}
      {sideDrawerOpen && (
        <SideDrawer 
          isOpen={sideDrawerOpen} 
          onClose={() => setSideDrawerOpen(false)} 
          locale={locale}
          translations={sideDrawerTranslations}
        />
      )}
    </>
  );
}

