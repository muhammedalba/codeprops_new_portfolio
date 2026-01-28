"use client";

import { m } from "framer-motion";
import { Shield, Zap, Target, Users } from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";

interface ValuesSectionProps {
  values: any;
  intro: string;
}

const icons = [Shield, Zap, Target, Users];

export function ValuesSection({ values, intro }: ValuesSectionProps) {
  return (
    <section id="values" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] -z-10" />

      <Container>
        <SectionHeader
          title={values.title}
          description={intro}
          align="center"
          className="mb-20"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.items.map((item: any, i: number) => {
            const Icon = icons[i];

            return (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="h-full p-8 group hover:border-primary/50 transition-all duration-300">
                <div className="absolute w-24 h-24 top-2 right-2 bg-primary/20 rounded-full blur-[40px]" />
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
