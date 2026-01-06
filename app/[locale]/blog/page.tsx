import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/container';
import { ArrowUpRight, User, Calendar } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getMessages(locale as Locale);
  
  return generatePageMetadata({
    locale: locale as Locale,
    title: t.seo.blog.title,
    description: t.seo.blog.description,
    path: '/blog',
  });
}

import { MiniContact } from '@/components/contact/mini-contact';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale as Locale);

  return (
    <div className="pt-32">
      <Container className="pb-24">
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tighter">
            {t.blog.title}
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="grid gap-16">
          {t.blog.posts.map((post: any) => (
            <article key={post.slug} className="group border-b border-border pb-16">
              <div className="grid md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4 rounded-[2.5rem] overflow-hidden aspect-[16/10] bg-muted relative group-hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-foreground/[0.03] uppercase">
                    Insight
                  </div>
                </div>
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <span className="text-primary font-mono text-sm uppercase tracking-widest">{t.blog.category}</span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </div>
                  </div>
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 group-hover:text-primary transition-colors leading-tight cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/${locale}/blog/${post.slug}`}
                    className="flex items-center gap-2 text-primary font-bold group/link inline-flex"
                  >
                    {t.blog.readMore} 
                    <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover/link:bg-primary group-hover/link:border-primary transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover/link:text-primary-foreground" />
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <MiniContact translations={t.contact} />
    </div>
  );
}
