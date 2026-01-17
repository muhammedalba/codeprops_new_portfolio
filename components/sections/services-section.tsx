import React, { memo } from "react";
import { Globe2, Code2, Smartphone, Cpu, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceCard } from "@/components/sections/service-card";
import { Container } from "@/components/layout/container";

interface ServicesSectionProps {
  id?: string;
  badge: string;
  title: string;
  description: string;
  translations: any; // The 't.services' object
  locale: string;
}

function ServicesSectionComponent({
  id,
  badge,
  title,
  description,
  translations,
  locale,
}: ServicesSectionProps) {
  // Define icons mapping internally
  const servicesConfig = [
    { key: "web", icon: Globe2 },
    { key: "custom", icon: Code2 },
    { key: "ecommerce", icon: Smartphone },
    { key: "cloud", icon: Cpu },
    { key: "performance", icon: Check },
  ];

  return (
    <section id={id} className="py-24 relative" aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeader 
          id={`${id}-title`}
          badge={badge}
          title={title}
          description={description}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesConfig.map((service, i) => {
            const data = translations[service.key];
            if (!data) return null;
            
            return (
              <ServiceCard
                key={service.key}
                title={data.title}
                description={data.description}
                icon={service.icon}
                href={`/${locale}/services/${service.key}`}
                index={i}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export const ServicesSection = memo(ServicesSectionComponent);
