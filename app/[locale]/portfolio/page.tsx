import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MiniContact } from '@/components/contact/mini-contact';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(locale as Locale);
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.portfolio.title,
    description: t.seo.portfolio.description,
    path: '/portfolio',
  });
}

import { PageHeader } from '@/components/ui/page-header';
import { SectionBadge } from '@/components/ui/section_badge';

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return (
    <div>
      <PageHeader 
        title={t.portfolio.title}
        description={t.portfolio.subtitle}
      />

      <Container className="pb-24">
        <div className="grid gap-32">
          {t.portfolio.projects.map((project: any, i: number) => (
            <div key={project.slug} className="group overflow-hidden">
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className={`order-2 ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                     <div className="flex items-center gap-4 mb-8">
                        <SectionBadge variant="outline" className="mb-0">
                           {project.category}
                        </SectionBadge>
                        <div className="h-px w-12 bg-border/50" />
                        <span className="text-sm font-mono text-muted-foreground/60">PRJ-0{i+1}</span>
                     </div>
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 group-hover:text-primary transition-colors leading-[1.1]">
                        {project.title}
                     </h2>
                     <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        {project.description}
                     </p>
                     
                     <div className="grid sm:grid-cols-2 gap-6 mb-12">
                        <div className="p-6 rounded-[2rem] bg-muted/30 border border-border/50 backdrop-blur-sm">
                           <h4 className="text-xs font-mono font-bold uppercase text-primary mb-3 tracking-widest">Technical Result</h4>
                           <p className="text-base font-bold text-foreground/90">{project.result}</p>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-muted/30 border border-border/50 backdrop-blur-sm">
                           <h4 className="text-xs font-mono font-bold uppercase text-primary mb-3 tracking-widest">Stack</h4>
                           <div className="flex flex-wrap gap-2">
                              {project.tech.map((t: string) => (
                                 <span key={t} className="text-[10px] font-bold px-3 py-1 rounded-full bg-background border border-border shadow-sm">
                                    {t}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>

                     <Link 
                        href={`/${locale}/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-4 text-xl font-bold group/link"
                     >
                        <span className="relative">
                          {t.portfolio.viewProject}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-500" />
                        </span>
                        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover/link:bg-primary group-hover/link:border-primary transition-all duration-500 overflow-hidden">
                           <ArrowUpRight className="w-6 h-6 group-hover/link:text-primary-foreground translate-y-0 translate-x-0 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                     </Link>
                  </div>
                  
                  <div className={`order-1 ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} aspect-[1.1/1] rounded-[4rem] bg-muted/50 border border-border/50 relative overflow-hidden group/img shadow-2xl transition-transform duration-700 hover:scale-[1.02]`}>
                     <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
                     <div className="absolute inset-0 flex items-center justify-center text-[15vw] font-black text-foreground/[0.02] select-none uppercase tracking-tighter rotate-12">
                        {project.slug.split('-')[0]}
                     </div>
                     {/* Decorative Elements */}
                     <div className="absolute top-12 right-12 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
                     <div className="absolute bottom-12 left-12 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                  </div>
               </div>
            </div>
          ))}
        </div>
      </Container>

      <MiniContact translations={t.contact} />
    </div>
  );
}
