import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowEffect } from "@/components/ui/glow-effect";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  isFeatured?: boolean;
  badge?: string;
  priceSuffix?: string;
  ctaText: string;
  className?: string;
}

export function PricingCard({
  plan,
  isFeatured = false,
  badge,
  priceSuffix,
  ctaText,
  className,
}: PricingCardProps) {
  const isContactUs = 
    plan.price === "Contact Us" || 
    plan.price === "اتصل بنا" || 
    plan.price === "Kontaktieren Sie uns";

  return (
    <GlassCard
      className={cn(
        "group relative flex flex-col h-full overflow-hidden transition-all duration-500",
        isFeatured && "border-primary bg-primary/5 shadow-2xl shadow-primary/10 scale-[1.05] z-10",
        !isFeatured && "hover:scale-[1.02]",
        className
      )}
    >
      <div className="absolute top-1 right-1 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
      <GlowEffect 
        size="md" 
        color={isFeatured ? "bg-primary/30" : "bg-primary/10"} 
        className="top-0 right-0 opacity-20 group-hover:opacity-40" 
      />

      {isFeatured && badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-widest z-20 shadow-lg">
          {badge}
        </div>
      )}

      <div className="mb-8">
        <h3 className={cn(
          "text-xl font-bold mb-4 transition-colors",
          isFeatured ? "text-primary" : "text-foreground"
        )}>
          {plan.name}
        </h3>
        
        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            {plan.price.startsWith('$') ? plan.price : (isContactUs ? plan.price : `$${plan.price}`)}
          </span>
          {!isContactUs && priceSuffix && (
            <span className="text-muted-foreground font-medium">
              {priceSuffix}
            </span>
          )}
        </div>
        
        <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
          {plan.description}
        </p>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((feature, j) => (
          <li key={j} className="flex items-start gap-3 text-sm leading-tight text-foreground/80">
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
              isFeatured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}>
              <Check className="w-3 h-3" />
            </div>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className={cn(
          "w-full h-14 rounded-2xl font-bold text-lg transition-all duration-300",
          isFeatured
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
            : "bg-foreground text-background hover:bg-foreground/90"
        )}
      >
        {ctaText}
      </Button>
    </GlassCard>
  );
}
