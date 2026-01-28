import { Metadata } from 'next';
import { Locale, locales } from '@/lib/i18n';
import { getPageMessages } from '@/lib/translations';
import { generatePageMetadata } from '@/lib/seo';
import { BlogPostClient } from '@/components/blog/blog-post-client';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: any[] = [];
  
  for (const locale of locales) {
    const t = await getPageMessages(locale as Locale, "blog");
    if (t.blog && t.blog.posts) {
      t.blog.posts.forEach((post: any) => {
        paths.push({ locale, slug: post.slug });
      });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getPageMessages(locale as Locale, "blog");
  const post = t.blog.posts.find((p: any) => p.slug === slug);

  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://codeprops.com';


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
  const t = await getPageMessages(typedLocale, "blog");
  
  const post = t.blog.posts.find((p: any) => p.slug === slug);
  if (!post) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://codeprops.com';
  const postUrl = `${baseUrl}/${locale}/blog/${slug}`;

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/${locale}` },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${baseUrl}/${locale}/blog` },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl },
            ]
          }),
        }}
      />

      {/* Article Schema */}
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "author": { "@type": "Person", "name": post.author || "Codeprops" },
      "publisher": {
        "@type": "Organization",
        "name": "Codeprops",
        "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
      "image": post.image || `${baseUrl}/default-blog-image.jpg`,
      "datePublished": post.datePublished,
      "dateModified": post.dateModified || post.datePublished,
      "inLanguage": typedLocale,
    }),
  }}
/>


      <BlogPostClient locale={typedLocale} post={post} translations={t} />
    </>
  );
}
