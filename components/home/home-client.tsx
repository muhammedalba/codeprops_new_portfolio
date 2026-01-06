'use client';

import { Locale } from "@/lib/i18n";
import { HeroSection } from "@/components/home/hero-section";
import { WaveDivider } from "@/components/layout/wave-divider";
import Link from "next/link";
import { ArrowUpRight, Code2, Cpu, Globe2, Smartphone, Check, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HomeClientProps {
  locale: Locale;
  translations: any;
}

import { MiniContact } from "@/components/contact/mini-contact";

export function HomeClient({ locale: typedLocale, translations: t }: HomeClientProps) {
  const icons = {
    web: Globe2,
    mobile: Smartphone,
    cloud: Cpu,
    ai: Code2,
  };

  return (
    <div className="w-full">
      {/* Premium Hero Section */}
      <HeroSection locale={typedLocale} translations={t} />

      <WaveDivider />

      {/* About Section - Premium Agency Style */}
      <section className="py-24 bg-muted/50 relative overflow-hidden">
        {/* Subtle Background Text */}
        <div className="absolute top-10 left-10 text-[10vw] font-bold text-foreground/[0.03] select-none pointer-events-none uppercase">
          Agency
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-6">
                Our Essence
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-[1.1]">
                {t.about.title}
              </h2>
            </div>
            <div>
              <p className="text-2xl font-medium text-foreground/80 mb-6">
                {t.about.subtitle}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.about.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider flip />

      {/* Services Preview - Glassmorphism Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-4">
              Expertise
            </h2>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {t.services.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t.services.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { key: 'web', icon: Globe2 },
              { key: 'custom', icon: Code2 },
              { key: 'ecommerce', icon: Smartphone },
              { key: 'cloud', icon: Cpu },
              { key: 'performance', icon: Check },
            ].map((service, i) => {
              const serviceData = t.services[service.key as keyof typeof t.services] as any;
              const Icon = service.icon;

              return (
                <div 
                  key={service.key} 
                  className="group relative p-8 rounded-3xl border border-primary/5 bg-background/40 backdrop-blur-xl hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                >
                  {/* Hover Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{serviceData.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {serviceData.description}
                  </p>
                  
                  <Link 
                    href={`/${typedLocale}/services/${service.key}`}
                    className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase group-hover:text-primary transition-colors"
                  >
                    Explore
                    <ArrowUpRight className="w-4 h-4 translate-y-px group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>

                  {/* Diagonal Decoration */}
                  <div className="absolute bottom-4 right-4 text-[4rem] font-bold text-foreground/[0.02] select-none pointer-events-none">
                    0{i + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section - Directly inspired by smartmarketing.tr */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-6">
                Methodology
              </h2>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-10">
                A structured path to digital dominance.
              </h2>
              
              <div className="space-y-12">
                {t.methodology.steps.map((step: any, i: number) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-2xl font-bold font-heading group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        0{i + 1}
                      </div>
                      {i < t.methodology.steps.length - 1 && (
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-primary/20 to-transparent" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-muted-foreground max-w-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Representation of Process */}
            <div className="relative hidden lg:flex items-center justify-center">
               <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-3" />
               <div className="relative z-10 w-full aspect-square border border-primary/10 rounded-[4rem] bg-background/40 backdrop-blur-3xl p-12 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px]" />
                  <div className="h-full flex flex-col justify-center gap-8">
                     <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          animate={{ width: ['0%', '100%'] }}
                          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-video rounded-2xl bg-muted/50" />
                        <div className="aspect-video rounded-2xl bg-primary/10 border border-primary/20" />
                        <div className="aspect-video rounded-2xl bg-muted/50" />
                        <div className="aspect-video rounded-2xl bg-muted/50" />
                     </div>
                     <div className="font-mono text-xs text-muted-foreground/60 space-y-1">
                        <div>{">"} INITIALIZING_WORKFLOW...</div>
                        <div>{">"} SYNCING_RESOURCES...</div>
                        <div>{">"} OPTIMIZING_LOAD_MODES...</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Glassmorphism Cards */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-4">
              {t.pricing.title}
            </h2>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {t.pricing.subtitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.pricing.plans.map((plan: any, i: number) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-[2.5rem] border ${
                  i === 1 ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10' : 'border-border bg-background/40'
                } backdrop-blur-xl group hover:scale-[1.02] transition-all duration-500`}
              >
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full uppercase tracking-widest">
                    {t.pricing.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== "Contact Us" && plan.price !== "اتصل بنا" && plan.price !== "Kontaktieren Sie uns" && (
                    <span className="text-muted-foreground">{t.pricing.priceSuffix}</span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  {plan.description}
                </p>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full h-14 rounded-2xl font-bold text-lg ${
                    i === 1 ? 'bg-primary text-primary-foreground' : 'bg-foreground text-background'
                  }`}
                >
                  {t.pricing.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Elegant Quotes */}
      <section className="py-24 bg-muted/50 lg:rounded-[5rem] mx-4">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-4">
                {t.testimonials.title}
              </h2>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                {t.testimonials.subtitle}
              </h2>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {t.testimonials.items.map((item: any, i: number) => (
                <div key={i} className="p-10 rounded-[3rem] bg-background shadow-xl shadow-foreground/5 relative">
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10" />
                  <p className="text-xl text-foreground font-medium mb-8 relative z-10">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted border-2 border-primary/20" />
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog/News Preview - Modern Cards */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-4">
                {t.blog.title}
              </h2>
              <h2 className="text-4xl md:text-6xl font-heading font-bold">
                {t.blog.subtitle}
              </h2>
            </div>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 font-bold">
              {t.blog.viewAll}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[16/10] rounded-[2.5rem] bg-muted mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-background/50 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                    {t.blog.category}
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-sm font-mono text-primary mb-3">January 06, 2026</p>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                    {item === 1 ? 'Evolution of Enterprise Architecture in 2026' : item === 2 ? 'Mastering Micro-frontends Patterns' : 'AI-Driven Development Flow'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    {t.blog.readMore} <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MiniContact translations={t.contact} />
    </div>
  );
}
