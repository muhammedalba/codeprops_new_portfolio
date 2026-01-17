import Link from 'next/link';
import { Locale } from '@/lib/i18n';
import { Container } from './container';
import { Icons } from '@/components/ui/icons';

interface FooterProps {
  locale: Locale;
  translations: {
    footer: {
      tagline: string;
      copyright: string;
      company: string;
      legal: string;
      links: {
        privacy: string;
        terms: string;
        sitemap: string;
      };
    };
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

export function Footer({ locale, translations }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const navigation = {
    company: [
      { name: translations.nav.about, href: `/${locale}/about` },
      { name: translations.nav.services, href: `/${locale}/services` },
      { name: translations.nav.portfolio, href: `/${locale}/portfolio` },
      { name: translations.nav.blog, href: `/${locale}/blog` },
    ],
    legal: [
      { name: translations.footer.links.privacy, href: `/${locale}/privacy` },
      { name: translations.footer.links.terms, href: `/${locale}/terms` },
      { name: translations.footer.links.sitemap, href: '/sitemap.xml' },
    ],
    social: [
      { name: 'Twitter', href: 'https://twitter.com/codeprops', icon: Icons.twitter },
      { name: 'GitHub', href: 'https://github.com/codeprops', icon: Icons.github },
      { name: 'LinkedIn', href: 'https://linkedin.com/company/codeprops', icon: Icons.linkedin },
    ],
  };

  return (
    <footer className="border-t bg-muted/50">
      <Container>
        <div className="py-12 md:pt-16 md:pb-2">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link href={`/${locale}`} className="inline-block">
                <span className="text-2xl font-bold">
                  {/* <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent"></span> */}
                  Code<span className="text-primary">Props</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                {translations.footer.tagline}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">{translations.footer.company}</h3>
              <ul className="space-y-2">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">{translations.footer.legal}</h3>
              <ul className="space-y-2">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">{translations.nav.contact}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:info@codeprops.com" className="hover:text-primary transition-colors">
                    info@codeprops.com
                  </a>
                </li>
                <li>
                  <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                    +1 (555) 123-4567
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-2 border-t">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} Codeprops. {translations.footer.copyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
