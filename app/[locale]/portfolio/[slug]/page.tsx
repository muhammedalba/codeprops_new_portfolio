import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  
  locales.forEach((locale) => {
    const t = getMessages(locale as Locale);
    // Ensure projects exist in the translation file
    if (t.portfolio && t.portfolio.projects) {
      t.portfolio.projects.forEach((project: any) => {
        paths.push({
          locale,
          slug: project.slug,
        });
      });
    }
  });

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getMessages(locale as Locale);
  const project = t.portfolio.projects.find((p: any) => p.slug === slug);

  if (!project) return {};

  return generatePageMetadata({
    locale: locale as Locale,
    title: `${project.title} | Case Study | Codeprops`,
    description: project.description,
    path: `/portfolio/${slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = getMessages(locale as Locale);
  const project = t.portfolio.projects.find((p: any) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="pt-32 pb-24">
      <Container>
        <Link 
          href={`/${locale}/portfolio`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-mono text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Engineering Portfolio
        </Link>

        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              {project.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-12 tracking-tighter leading-[1.1]">
            {project.title}
          </h1>

          <div className="aspect-video rounded-[3rem] bg-muted mb-20 flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700" />
             <ShieldCheck className="w-24 h-24 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
          </div>

          <div className="grid md:grid-cols-12 gap-16">
            <div className="md:col-span-8 space-y-20">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-heading font-bold">The Challenge</h2>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-heading font-bold">Our Engineering Solution</h2>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-heading font-bold">Technical & Business Results</h2>
                </div>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.result}
                </p>
              </section>
            </div>

            <div className="md:col-span-4">
              <div className="sticky top-32 p-8 rounded-[2rem] border border-border bg-muted/20 space-y-8">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: string) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-background border border-border text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Focus Areas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Core Web Vitals
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Enterprise Security
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Scalable Infrastructure
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
