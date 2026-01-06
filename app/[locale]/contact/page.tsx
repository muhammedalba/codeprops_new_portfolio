import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(locale as Locale);
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    path: '/contact',
  });
}

import { ContactForm } from '@/components/contact/contact-form';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tighter">
                {t.contact.title}
              </h1>
              <p className="text-2xl text-muted-foreground leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>
            
            <div className="space-y-8">
               <div className="flex flex-col gap-1 group">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Direct Line</span>
                  <a href={`tel:${t.contact.info.phone}`} className="text-2xl font-bold hover:text-primary transition-colors">
                     {t.contact.info.phone}
                  </a>
               </div>
               <div className="flex flex-col gap-1 group">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Email</span>
                  <a href={`mailto:${t.contact.info.email}`} className="text-2xl font-bold hover:text-primary transition-colors">
                     {t.contact.info.email}
                  </a>
               </div>
               <div className="flex flex-col gap-1 group">
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">Global Headquarters</span>
                  <p className="text-xl text-muted-foreground">
                     {t.contact.info.address}
                  </p>
               </div>
            </div>
          </div>

          <div className="p-8 md:p-12 rounded-[3rem] border border-border bg-muted/10 backdrop-blur-xl relative overflow-hidden group">
             {/* Decorative element */}
             <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700" />
             
             <ContactForm translations={t.contact.form} />
          </div>
        </div>
      </Container>
    </div>
  );
}
