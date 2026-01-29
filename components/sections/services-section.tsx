import { SectionHeader } from "@/components/ui/section-header";
import { ServiceCard } from "@/components/sections/service-card";
import { Container } from "@/components/layout/container";
import { Icons } from "@/components/ui/icons";

interface ServicesSectionProps {
  id?: string;
  badge: string;
  title: string;
  description: string;
  translations: Record<string, { title: string; description: string }>;
  locale: string;
  noReveal?: boolean;
}

export function ServicesSection({
  id,
  badge,
  title,
  description,
  translations,
  locale,
  noReveal = false
}: ServicesSectionProps) {
  // Define icons mapping internally
  const servicesConfig = [
    { key: "web", icon: Icons.globe },
    { key: "custom", icon: Icons.code },
    { key: "ecommerce", icon: Icons.smartphone },
    // { key: "cloud", icon: Icons.cpu },
    { key: "performance", icon: Icons.check },
  ];

  return (
    <section id={id} className="py-24 relative" aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeader 
          id={`${id}-title`}
          badge={badge}
          title={title}
          description={description}
          noReveal={noReveal}
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
