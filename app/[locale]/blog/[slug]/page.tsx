import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { BlogPostClient } from '@/components/blog/blog-post-client';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const params: any[] = [];
  locales.forEach((locale) => {
    const t = getMessages(locale as Locale);
    t.blog.posts.forEach((post: any) => {
      params.push({ locale, slug: post.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = getMessages(locale as Locale);
  const post = t.blog.posts.find((p: any) => p.slug === slug);

  if (!post) return {};

  return generatePageMetadata({
    locale: locale as Locale,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const t = getMessages(typedLocale);
  
  const post = t.blog.posts.find((p: any) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient locale={typedLocale} post={post} translations={t} />;
}
