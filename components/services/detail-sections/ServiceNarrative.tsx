import { Container } from "@/components/layout/container";
import { Plus } from "lucide-react";
import { ServiceSlug } from "@/lib/services";
import { NarrativeIsland } from "./NarrativeIsland";
import { TranslationValue } from "@/lib/translations";

interface ServiceNarrativeProps {
  isRtl: boolean;
  serviceData: {
    description: string;
    details?: string;
    features?: string[];
    capabilities?: { title: string; description: string }[];
    [key: string]: TranslationValue;
  };
  slug: ServiceSlug;
}

export function ServiceNarrative({ isRtl, serviceData, slug }: ServiceNarrativeProps) {
  return (
    <section className="py-24 relative">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 animate-[fade-up_0.8s_ease-out_forwards] opacity-0">
             <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter">
                {isRtl ? "لماذا نحن الشريك الهندسي الأمثل؟" : "Engineered for Extreme Scalability"}
             </h2>
             <p className="text-lg text-muted-foreground leading-relaxed">
                {serviceData.details}
             </p>
             
             <div className="grid sm:grid-cols-2 gap-6 pt-8">
                {serviceData.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Plus size={16} />
                    </div>
                    <span className="font-bold text-sm tracking-tight">{feature}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="relative aspect-square max-w-md mx-auto w-full">
            <NarrativeIsland slug={slug} />
          </div>
        </div>
      </Container>
    </section>
  );
}
