import React, { memo } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/layout/container";

interface AboutSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
}

function AboutSectionComponent({ id, title, subtitle, description, badge = "Our Essence" }: AboutSectionProps) {
  return (
    <section id={id} className="py-12 bg-muted/50 relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-10 left-10 text-[10vw] font-bold text-foreground/[0.04] select-none pointer-events-none uppercase tracking-tighter">
        Agency
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <SectionHeader 
            badge={badge}
            title={title}
            align="left"
            className="mb-0"
          />
          <div className="space-y-6 pt-4">
            <p className="text-2xl md:text-3xl font-medium text-foreground/80 leading-snug">
              {subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export const AboutSection = memo(AboutSectionComponent);
