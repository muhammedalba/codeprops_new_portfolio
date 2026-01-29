"use client";

import React from "react";
import { Container } from "@/components/layout/container";
import { Tag, Calendar, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/hooks/use-reveal";
import { BlogPost } from "../blog-client";

interface BlogGridProps {
  locale: string;
  posts: BlogPost[];
  searchQuery: string;
  activeTag: string;
  t: {
    category: string;
  };
}

const BlogCard = React.memo(({ post, index, locale, t }: { post: BlogPost; index: number; locale: string; t: { category: string } }) => (
  <Reveal
    animation="up"
    delay={(index % 4) * 0.1}
    className="group"
    as="article"
  >
    <GlassCard className="p-8 md:p-12 border-border/40 hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
      {/* Decorative Tag Indicator */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-8xl font-black select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
        {post.tags[0]}
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Decorative Circle */}
         <div className="absolute w-24 h-24 top-1  end-0  bg-primary/30 rounded-full blur-[50px]" />
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">{t.category}</span>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={14} /> {post.date}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={14} /> {typeof post.author === 'string' ? post.author : post.author?.name}
            </div>
          </div>

          <Link href={`/${locale}/blog/${post.slug}`}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter leading-tight group-hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </h2>
          </Link>

          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/50 text-[10px] font-mono font-bold text-muted-foreground"
              >
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full py-2">
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="w-20 h-20 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 group/btn"
          >
            <ArrowUpRight className="w-8 h-8 text-muted-foreground group-hover:text-primary-foreground group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          <div className="hidden lg:block text-right pt-8">
            <span className="text-[10px] font-mono font-bold text-primary/40 uppercase tracking-[0.5em]">
              Insight-ID: CP-{100 + index}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  </Reveal>
));

BlogCard.displayName = "BlogCard";

export default function BlogGrid({ locale, posts, searchQuery, activeTag, t }: BlogGridProps) {
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, activeTag]);

  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-12">
          {filteredPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} locale={locale} t={t} />
          ))}

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl text-muted-foreground italic">
                {locale === "ar" ? "لم يتم العثور على رؤى تقنية تطابق معاييرك." : "No technical insights found matching your criteria."}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
