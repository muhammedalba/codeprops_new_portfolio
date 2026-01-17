import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { SectionHeader } from '@/components/ui/section-header';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getPageMessages(locale as Locale, "privacy");
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.privacy.title,
    description: t.privacy.title,
    path: '/privacy',
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getPageMessages(typedLocale, "privacy");

  return (
    <main className="pt-32 pb-20">
      <Container>
        <SectionHeader 
          title={t.privacy.title}
          badge={t.privacy.lastUpdated}
          align="left"
        />
        <div className="mt-12 max-w-4xl space-y-12">
          {Object.entries(t.privacy.content).map(([key, section]: [string, any]) => (
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
