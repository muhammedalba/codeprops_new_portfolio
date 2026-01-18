import React, { memo } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/layout/container";
import MethodologyVisual from "./MethodologyVisual.client";
import { SectionReveal } from "../animations/section-reveal";

interface Step {
  title: string;
  description: string;
}

interface MethodologySectionProps {
  id?: string;
  badge: string;
  title: string;
  steps: Step[];
}

function MethodologySectionComponent({
  id,
  badge,
  title,
  steps,
}: MethodologySectionProps) {
  return (
    <SectionReveal>
      <section id={id} className="py-24 bg-muted/30 overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content – Server Rendered */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-96 h-96 bg-primary/10 blur-[100px] rounded-full" />
              </div>

              <SectionHeader badge={badge} title={title} align="left" />

              <div className="space-y-10 mt-12">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm flex items-center justify-center text-2xl font-bold font-heading">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      {i < steps.length - 1 && (
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-primary/30 to-transparent" />
                      )}
                    </div>

                    <div className="pt-2">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual – Client only */}
            <MethodologyVisual />
          </div>
        </Container>
      </section>
    </SectionReveal>
  );
}

export const MethodologySection = memo(MethodologySectionComponent);
