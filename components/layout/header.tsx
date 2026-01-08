'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, locales, localeNames } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, LayoutGrid } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Container } from './container';
import { SideDrawer } from './side-drawer';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  locale: Locale;
  translations: {
    nav: {
      home: string;
      about: string;
      services: string;
      portfolio: string;
      blog: string;
      contact: string;
    };
  };
}

export function Header({ locale, translations }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: translations.nav.home, href: `/${locale}` },
    { name: translations.nav.about, href: `/${locale}/about` },
    { name: translations.nav.services, href: `/${locale}/services` },
    { name: translations.nav.portfolio, href: `/${locale}/portfolio` },
    { name: translations.nav.blog, href: `/${locale}/blog` },
    { name: translations.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'border-b  bg-background/70 backdrop-blur-md py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href={`/${locale}`} className="flex items-center space-x-2">
                <span className="text-2xl font-heading font-bold bg-clip-text ">
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
                      pathname?.replace(/\/$/, '') === item.href
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
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                
                <Button className="hidden md:flex h-10 px-6 rounded-full border border-primary" asChild>
                  <Link href={`/${locale}/contact`}>{translations.nav.contact}</Link>
                </Button>

                {/* Mobile Menu Button */}
                <button
                  className="md:hidden p-2 text-foreground"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-background border-b animate-in slide-in-from-top duration-300">
              <div className="p-6 space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-lg font-semibold hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
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
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {localeNames[loc]}
                      </Link>
                    ))}
                  </div>
                </div>

                <Button className="w-full h-12 rounded-full" asChild>
                  <Link href={`/${locale}/contact`} onClick={() => setMobileMenuOpen(false)}>
                    {translations.nav.contact}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </header>
      
      <SideDrawer 
        isOpen={sideDrawerOpen} 
        onClose={() => setSideDrawerOpen(false)} 
        locale={locale} 
      />
    </>
  );
}
