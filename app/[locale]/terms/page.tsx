import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/ui/section-header';


export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getPageMessages(locale as Locale, "terms");
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.terms.title,
    description: t.terms.title,
    path: '/terms',
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "terms");

  return (
    <main className="pt-32 pb-20">
      <Container>
        <SectionHeader 
          title={t.terms.title}
          badge={t.terms.lastUpdated}
          align="left"
        />
        <div className="mt-12 max-w-4xl space-y-12">
          {Object.entries(t.terms.content).map(([key, section]: [string, any]) => (
            <div key={key} className="space-y-4">
              <h2 className="text-2xl font-bold font-heading">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
