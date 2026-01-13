import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/contact/contact-form';
import { SectionHeader } from '@/components/ui/section-header';
import { GlassCard } from '@/components/ui/glass-card';
import { GlowEffect } from '@/components/ui/glow-effect';

interface MiniContactProps {
  translations: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
    };
  };
}

export function MiniContact({ translations }: MiniContactProps) {
  return (
    <section className="py-24 border-t border-border bg-muted/5 relative overflow-hidden">
      <GlowEffect color="bg-primary/5" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <SectionHeader 
            badge="Ready to scale?"
            title={translations.title}
            description={translations.subtitle}
            align="left"
            className="mb-0"
          />

          <div className="relative">
            <GlowEffect size="lg" className="inset-0 opacity-20" />
            <GlassCard className="p-8 md:p-10 shadow-2xl shadow-primary/5">
              <ContactForm translations={translations.form} />
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
