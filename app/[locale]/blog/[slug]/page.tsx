import { locales, Locale } from "@/lib/i18n";
import { getPageMessages } from "@/lib/translations";
import { generatePageMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";


// Server Components
import { HeroSection } from "@/components/blog/post/sections/HeroSection";
import { ArticleContent } from "@/components/blog/post/sections/ArticleContent";
import { SidebarActions } from "@/components/blog/post/sections/SidebarActions";

// Client Islands
import { TOCIsland } from "@/components/blog/post/TOCIsland";

import { RecommendedSection } from "@/components/blog/post/sections/RecommendedSection";

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

  const blogT = t.blog;
  const postT = blogT.post;
  const toc = [
    { id: "intro", label: postT.headings.intro },
    { id: "challenges", label: postT.headings.challenges },
    { id: "insight", label: postT.headings.insight },
    { id: "conclusion", label: postT.headings.conclusion },
  ];

  return (
    <>
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

      <main className="flex flex-col bg-background min-h-screen relative">
        <HeroSection locale={typedLocale} post={post} translations={blogT} />

        <section className="pb-32">
          <Container>
            <div className="flex flex-col lg:grid lg:grid-cols-[280px,1fr,300px] gap-8 lg:gap-16 items-start">
              <TOCIsland toc={toc} t={postT} />
              <ArticleContent locale={typedLocale} post={post} t={postT} />
              <SidebarActions locale={typedLocale} tags={post.tags} t={postT} />
            </div>
          </Container>
        </section>

        <RecommendedSection locale={typedLocale} t={postT} />
      </main>
    </>
  );
}
