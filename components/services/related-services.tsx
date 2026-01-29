'use client';

import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { ServiceSlug, serviceIcons } from "@/lib/services";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";

interface RelatedServicesProps {
  currentSlug: string;
  locale: string;
  services: {
    slug: string;
    title: string;
    description: string;
  }[];
}

export function RelatedServices({ currentSlug, locale, services }: RelatedServicesProps) {
  // Filter out current service and get 3 related ones
  const relatedServices = services
    .filter(s => s.slug !== currentSlug)
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            {locale === 'ar' ? 'خدمات ذات صلة' : 'Related Services'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {locale === 'ar' 
              ? 'استكشف المزيد من حلولنا الهندسية' 
              : 'Explore more of our engineering solutions'}
          </p>
        </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedServices.map((service, index) => {
              const Icon = serviceIcons[service.slug as ServiceSlug] || serviceIcons.web;
              
              return (
                <div
                  key={service.slug}
                  className={cn("reveal reveal--up", `stagger-${index + 1}`)}
                >
                  <Link href={`/${locale}/services/${service.slug}`}>
                    <div className="group h-full p-8 rounded-[2rem] bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Icon size={28} />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-4 transition-all">
                        {locale === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                        <Icons.arrowRight size={16} className={locale === 'ar' ? 'rotate-180' : ''} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
      </Container>
    </section>
  );
}
