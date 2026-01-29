import Link from "next/link";
import { SectionHeader } from "../ui/section-header";
import { Button } from "../ui/button";
import { BlogCard } from "../sections/blog-card";

interface BlogSectionProps {
  locale: string;
  t: any;
}

export default function BlogSection({
  locale: typedLocale,
  t,
}: BlogSectionProps) {
  const latestPosts = t.blog.posts.slice(0, 3);
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeader
            badge={t.blog.title}
            title={t.blog.subtitle}
            align="left"
            className="mb-0"
          />
          <Link href={`/${typedLocale}/blog`}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-14 font-bold border-primary/20 hover:bg-primary/5"
            >
              {t.blog.viewAll}
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post: any) => (
            <BlogCard
              key={post.slug}
              category={t.blog.category}
              date={post.date}
              readMoreText={t.blog.readMore}
              title={post.title}
              image={post.image}
              href={`/${typedLocale}/blog/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
