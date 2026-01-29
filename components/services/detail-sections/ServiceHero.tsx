import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { HeroBackgroundIsland } from "@/components/layout/hero-background-island";
import { SectionBadge } from "@/components/ui/section-badge";
import { Icons } from "@/components/ui/icons";
import { ServiceSlug, serviceIcons } from "@/lib/services";
import Link from "next/link";

interface ServiceHeroProps {
  locale: string;
  isRtl: boolean;
  serviceData: any;
  slug: ServiceSlug;
}

export function ServiceHero({ locale, isRtl, serviceData, slug }: ServiceHeroProps) {
  const ServiceIcon = serviceIcons[slug] || Icons.rocket;
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <HeroBackgroundIsland type="services" />
      <Container className="relative z-10">
        <Breadcrumbs 
          items={[
            { label: isRtl ? 'الخدمات' : 'Services', href: `/${locale}/services` },
            { label: serviceData.title }
          ]}
          className="mb-8"
          locale={locale}
        />
        
        <Link 
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-sm font-black text-primary mb-12 hover:gap-4 transition-all group uppercase tracking-widest"
        >
          <Icons.arrowLeft size={16} className={isRtl ? "rotate-180" : ""} />
          {isRtl ? "العودة لخدماتنا" : "Back to Services"}
        </Link>

        <div className="max-w-4xl space-y-8 animate-[fade-up_0.8s_ease-out_forwards] opacity-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/5">
              <ServiceIcon size={28} />
            </div>
            <SectionBadge className="mb-0">{serviceData.title}</SectionBadge>
          </div>

          <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]">
            {serviceData.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
            {serviceData.description}
          </p>

          <div className="pt-4">
            <Link href={`/${locale}/contact`}>
              <button className="px-10 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:scale-105 transition-all shadow-2xl shadow-primary/20 flex items-center gap-3">
                {isRtl ? "ابدأ مشروعك الآن" : "Start Your Project"}
                <Icons.rocket size={18} />
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
