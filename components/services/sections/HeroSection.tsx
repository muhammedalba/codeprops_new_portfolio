
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Link from "next/link";
import { HeroBackgroundIsland } from "@/components/layout/hero-background-island";

interface HeroSectionProps {
  locale: string;
  t: any;
}

export function HeroSection({ locale, t }: HeroSectionProps) {
    return (<>
              {/* Hero Section */}
              <section id="hero" className="relative min-h-[90vh] flex items-center pt-32 pb-24 overflow-hidden">
                <HeroBackgroundIsland type="services" />
                
                <Container className="relative z-10">
                  <div className="flex justify-center mb-10">
                    <Breadcrumbs 
                      items={[{ label: locale === 'ar' ? "الخدمات" : "Services" }]} 
                      locale={locale}
                      className="text-white/80"
                    />
                  </div>
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="space-y-10 opacity-0 animate-[fade-up_0.8s_ease-out_forwards]">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Elite Software Engineering
                      </div>
                      
                      <h1 
                        className="text-6xl md:text-9xl font-heading font-bold tracking-tighter leading-[0.9] text-balance"
                        dangerouslySetInnerHTML={{ __html: t.hero_title }}
                      />
                      
                      <p className="text-xl md:text-3xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto text-balance">
                        {t.hero_description}
                      </p>
        
                      <div className="pt-10 flex flex-wrap justify-center gap-6">
                        <Link href={`/${locale}/portfolio`} title="Explore Capabilities" 
                          className="flex items-center justify-center cursor-pointer h-16 px-10 rounded-full bg-foreground text-background font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-2xl"
                        >
                          Explore Capabilities
                        </Link>
                        <Link title="Consult an Architect" href={`/${locale}/contact`} 
                          className="flex items-center justify-center cursor-pointer h-16 px-10 rounded-full border border-border bg-background/50 backdrop-blur-md font-bold text-lg hover:border-primary transition-all duration-300"
                        >
                          Consult an Architect
                        </Link>
                      </div>
                    </div>
                  </div>
                </Container>
        
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-secondary/10 blur-[120px] pointer-events-none" />
              </section>
    </> );
}