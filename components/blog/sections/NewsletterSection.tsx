"use client";

import { Container } from "@/components/layout/container";
import { Mail } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface NewsletterSectionProps {
  t: any;
}

export default function NewsletterSection({ t }: NewsletterSectionProps) {
  return (
    <section className="py-24 bg-muted/30 border-t border-border/50">
      <Container>
        <GlassCard className="p-12 md:p-20 bg-primary/5 border-primary/20 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-secondary/10 rounded-full blur-[100px]" />

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9]">
                {t.newsletter.title}
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                {t.newsletter.description}
              </p>
            </div>

            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder={t.newsletter.placeholder}
                    className="w-full h-16 pl-12 pr-6 rounded-2xl bg-background border border-border focus:border-primary focus:outline-none transition-all"
                  />
                </div>
                <button className="h-16 px-8 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform flex items-center justify-center gap-3">
                  {t.newsletter.button}
                </button>
              </div>
              <p className="mt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center lg:text-left">
                Join 2,500+ Engineering leads globally.
              </p>
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
