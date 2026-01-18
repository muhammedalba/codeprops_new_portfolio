import { SectionReveal } from "@/components/animations/section-reveal";
import { PricingCard } from "@/components/sections/pricing-card";
import { SectionHeader } from "@/components/ui/section-header";

interface PricingSectionProps {
  locale: string;
  t: any;
}

export default function PricingSection({ locale, t }: PricingSectionProps) {
  return (
    <SectionReveal>
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeader
            id="pricing-title"
            badge={t.title}
            title={t.subtitle}
          />

          <div className="grid md:grid-cols-3 gap-8 items-stretch pt-12">
            {t.plans.map((plan: any, i: number) => (
              <PricingCard
                locale={locale}
                key={i}
                plan={plan}
                isFeatured={i === 1}
                badge={t.badge}
                priceSuffix={t.priceSuffix}
                ctaText={t.cta}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
