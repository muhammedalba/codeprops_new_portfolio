import React from "react";
import { Container } from "@/components/layout/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Clock } from "lucide-react";
import Link from "next/link";

interface RecommendedSectionProps {
  locale: string;
  t: {
    recommended: string;
    view_all: string;
    category: string;
    read_time: string;
    demo: {
      recommended_post_title: string;
    };
  };
}

export function RecommendedSection({ locale, t }: RecommendedSectionProps) {
  return (
    <section className="py-24 bg-muted/20 border-t border-border/50">
      <Container>
        <div className="flex items-center justify-between mb-16 flex-wrap gap-4">
          <h2 className="text-4xl font-bold tracking-tighter">{t.recommended}</h2>
          <Link href={`/${locale}/blog`} className="text-primary font-bold hover:underline">{t.view_all} →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <GlassCard key={i} className="p-8 border-border/40 hover:border-primary/50 transition-all group cursor-pointer">
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">{t.category}</div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{t.demo.recommended_post_title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} /> {t.read_time}
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
