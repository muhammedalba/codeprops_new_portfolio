import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(locale as Locale);
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.about.title,
    description: t.seo.about.description,
    path: '/about',
  });
}

import { MiniContact } from '@/components/contact/mini-contact';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return (
    <div className="pt-32">
      <Container className="pb-24">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tighter">
            {t.about.title}
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed mb-12">
            {t.about.subtitle}
          </p>
          <div className="prose prose-xl prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t.about.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          <div className="p-8 rounded-[2rem] bg-muted/20 border border-border">
            <h4 className="text-sm font-mono text-primary mb-2">Projects</h4>
            <p className="text-lg font-bold">{t.about.stats.projects}</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-muted/20 border border-border">
            <h4 className="text-sm font-mono text-primary mb-2">Partners</h4>
            <p className="text-lg font-bold">{t.about.stats.clients}</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-muted/20 border border-border">
            <h4 className="text-sm font-mono text-primary mb-2">Experience</h4>
            <p className="text-lg font-bold">{t.about.stats.years}</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-muted/20 border border-border">
            <h4 className="text-sm font-mono text-primary mb-2">Experts</h4>
            <p className="text-lg font-bold">{t.about.stats.team}</p>
          </div>
        </div>

        <div className="py-24 border-t border-border">
          <h2 className="text-4xl font-heading font-bold mb-16 text-center">{t.methodology.title}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {t.methodology.steps.map((step: any, i: number) => (
               <div key={i} className="p-8 rounded-[2rem] bg-muted/20 border border-border group hover:border-primary transition-colors">
                  <span className="text-xs font-mono text-primary mb-4 block">STEP 0{i+1}</span>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
               </div>
            ))}
          </div>
        </div>
      </Container>
      
      <MiniContact translations={t.contact} />
    </div>
  );
}
