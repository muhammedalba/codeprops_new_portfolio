'use client';

import { Container } from '@/components/layout/container';
import { ContactForm } from '@/components/contact/contact-form';

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
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[120px] rounded-full -z-10" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-6">
              Ready to scale?
            </h2>
            <h3 className="text-4xl md:text-6xl font-heading font-bold mb-8 tracking-tighter">
              {translations.title}
            </h3>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
              {translations.subtitle}
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10" />
            <div className="p-8 md:p-10 rounded-[2.5rem] border border-border bg-background/50 backdrop-blur-xl shadow-2xl shadow-primary/5">
              <ContactForm translations={translations.form} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
