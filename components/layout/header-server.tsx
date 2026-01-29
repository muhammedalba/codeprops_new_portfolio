import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { Container } from './container';
import { Logo } from './logo';
import { Navigation } from './navigation';
import { LanguageSwitcher } from './language-switcher';
import { NavigationClient } from './navigation-client';
import { HeaderScrollWrapper } from './header-scroll-wrapper';
import { MobileMenuButton } from './mobile-menu-button';
import { SideDrawerButton } from './side-drawer-button';
import { ThemeToggle } from './theme-toggle';
import { Button } from '@/components/ui/button';
import { TranslationMessages } from '@/lib/translations';

interface HeaderServerProps {
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

/**
 * HeaderServer - Main Server Component
 * Composes server and client components
 * Most of the header is static HTML (0KB JavaScript)
 * Only interactive parts are client islands (~3-4KB total)
 */
export function HeaderServer({ 
  locale, 
  translations, 
  sideDrawerTranslations 
}: HeaderServerProps) {
  // Prepare navigation data for client components
  const navigation = [
    { name: translations.home, href: `/${locale}` },
    { name: translations.about, href: `/${locale}/about` },
    { name: translations.services, href: `/${locale}/services` },
    { name: translations.portfolio, href: `/${locale}/portfolio` },
    { name: translations.blog, href: `/${locale}/blog` },
    { name: translations.contact, href: `/${locale}/contact` },
  ];

  return (
    <HeaderScrollWrapper>
      <Container>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo - Server Component (0KB JS) */}
            <Logo locale={locale} />
            
            {/* Desktop Navigation - Server Component with Client wrapper for active state */}
            <NavigationClient>
              <Navigation locale={locale} translations={translations} />
            </NavigationClient>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher - Client Island (~0.5KB) */}
            <LanguageSwitcher locale={locale} />

            <div className="flex items-center gap-2">
              {/* Theme Toggle - Already optimized */}
              <ThemeToggle />
              
              {/* Side Drawer Button - Client Island (~0.5KB) */}
              <SideDrawerButton 
                locale={locale} 
                translations={sideDrawerTranslations} 
              />
              
              {/* Contact Button - Server Component (0KB JS) */}
              <Button 
                className="hidden md:flex h-10 px-6 rounded-full border border-primary" 
                asChild
              >
                <Link href={`/${locale}/contact`}>{translations.contact}</Link>
              </Button>

              {/* Mobile Menu Button - Client Island (~0.5KB) */}
              <MobileMenuButton 
                navigation={navigation}
                locale={locale}
                contactText={translations.contact}
              />
            </div>
          </div>
        </div>
      </Container>
    </HeaderScrollWrapper>
  );
}
