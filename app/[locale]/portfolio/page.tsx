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

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return (
    <div className="pt-32">
      <Container className="pb-24">
        <div className="max-w-4xl mb-20 text-center mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tighter">
            {t.portfolio.title}
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t.portfolio.subtitle}
          </p>
        </div>

        <div className="grid gap-24">
          {t.portfolio.projects.map((project: any, i: number) => (
            <div key={project.slug} className="group overflow-hidden">
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={`order-2 ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                     <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                           {project.category}
                        </span>
                        <div className="h-px w-12 bg-border" />
                        <span className="text-xs font-mono text-muted-foreground">0{i+1}</span>
                     </div>
                     <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                        {project.title}
                     </h2>
                     <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                        {project.description}
                     </p>
                     
                     <div className="grid sm:grid-cols-2 gap-6 mb-10">
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                           <h4 className="text-xs font-mono uppercase text-primary mb-2">Technical Result</h4>
                           <p className="text-sm font-bold">{project.result}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                           <h4 className="text-xs font-mono uppercase text-primary mb-2">Stack</h4>
                           <div className="flex flex-wrap gap-2">
                              {project.tech.map((t: string) => (
                                 <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-background border border-border">
                                    {t}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>

                     <Link 
                        href={`/${locale}/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 text-lg font-bold group/link"
                     >
                        {t.portfolio.viewProject}
                        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover/link:bg-primary group-hover/link:border-primary transition-all">
                           <ArrowUpRight className="w-5 h-5 group-hover/link:text-primary-foreground" />
                        </div>
                     </Link>
                  </div>
                  
                  <div className={`order-1 ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} aspect-[4/3] rounded-[3rem] bg-muted relative overflow-hidden group/img`}>
                     <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
                     <div className="absolute inset-0 flex items-center justify-center text-8xl font-black text-foreground/[0.03] select-none uppercase tracking-tighter">
                        Solution
                     </div>
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
