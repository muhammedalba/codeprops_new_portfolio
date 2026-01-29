import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Monitor, Cpu, ShoppingCart, Cloud, Zap } from "lucide-react";
import { ServiceCard } from "../service-card";
import Link from "next/link";

interface ServicesGridSectionProps {
    t: any;
    locale: string;
}

export function ServicesGridSection({ t, locale }: ServicesGridSectionProps) {
    const services = [
        { key: 'web', Icon: Monitor, ...t.web },
        { key: 'custom', Icon: Cpu, ...t.custom },
        { key: 'ecommerce', Icon: ShoppingCart, ...t.ecommerce },
        { key: 'cloud', Icon: Cloud, ...t.cloud },
        { key: 'performance', Icon: Zap, ...t.performance },
    ];

    return (
        <section id="capabilities" className="py-24 md:py-32 bg-muted/5 relative">
            <Container>
                <SectionHeader
                    badge={t.capabilities_grid.badge}
                    title={t.title}
                    description={t.subtitle}
                    align="center"
                    className="mb-20"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {services.map((service, i) => (
                        <div key={service.key} className="opacity-0 animate-[fade-up_0.8s_ease-out_forwards]" style={{ animationDelay: `${i * 0.1}s` }}>
                            <ServiceCard
                                index={i}
                                title={service.title}
                                description={service.description}
                                icon={service.Icon}
                                href={`/${locale}/services/${service.key}`}
                            />
                        </div>
                    ))}
                    
                    {/* Custom Solution Card */}
                    <div
                        className="relative p-10 md:p-12 rounded-[2.5rem] bg-primary/90 text-primary-foreground flex flex-col justify-center overflow-hidden group shadow-2xl opacity-0 animate-[fade-up_0.8s_ease-out_forwards]"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        <div className="relative z-10 space-y-8">
                            <h3 className="text-3xl font-bold leading-tight">{t.capabilities_grid.custom_card_title}</h3>
                            <p className="opacity-80 text-lg leading-relaxed">
                                {t.capabilities_grid.custom_card_description}
                            </p>
                            <div className="pt-4">
                                <Link href={`/${locale}/contact`} className="h-14 p-8 rounded-full bg-background text-foreground font-bold hover:scale-105 transition-transform flex items-center justify-center">
                                    {t.capabilities_grid.custom_card_button}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}