"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { HeroBackground } from "@/components/layout/hero-background";
import { SectionBadge } from "@/components/ui/section-badge";
import { Tag, Calendar, User, ArrowUpRight, Search, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface BlogClientProps {
  locale: string;
  translations: any;
}

export function BlogClient({ locale, translations }: BlogClientProps) {
  const t = translations.blog;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(() => {
    const allTags = t.posts.flatMap((post: any) => post.tags);
    return ["All", ...Array.from(new Set(allTags))];
  }, [t.posts]);

  const filteredPosts = useMemo(() => {
    return t.posts.filter((post: any) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [t.posts, searchQuery, activeTag]);

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 overflow-hidden">
        <HeroBackground type="about" />
        <Container className="relative z-10">
          <Breadcrumbs 
            items={[{ label: locale === 'ar' ? "المدونة" : "Insights" }]} 
            className="mb-8 justify-center"
            locale={locale}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-8"
          >
            <SectionBadge>{locale === 'ar' ? "الرؤى الهندسية" : "Engineering Insights"}</SectionBadge>
            <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
              {t.subtitle}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-border/50 py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: any) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                    activeTag === tag 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                      : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder={locale === 'ar' ? "ابحث في الرؤى..." : "Search insights..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-full bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none transition-all text-sm"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post: any, i: number) => (
                <motion.article
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <GlassCard className="p-8 md:p-12 border-border/40 hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                     {/* Decorative Tag Indicator */}
                     <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-8xl font-black select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                        {post.tags[0]}
                     </div>

                     <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
                        <div className="lg:col-span-8 space-y-6">
                           <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                              <span className="text-primary bg-primary/10 px-3 py-1 rounded-full">{t.category}</span>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                 <Calendar size={14} /> {post.date}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                 <User size={14} /> {post.author}
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
                              {post.tags.map((tag: string) => (
                                 <span key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted/50 text-[10px] font-mono font-bold text-muted-foreground">
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
                              <span className="text-[10px] font-mono font-bold text-primary/40 uppercase tracking-[0.5em]">Insight-ID: CP-{100 + i}</span>
                           </div>
                        </div>
                     </div>
                  </GlassCard>
                </motion.article>
              ))}
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-xl text-muted-foreground italic">No technical insights found matching your criteria.</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-muted/30 border-t border-border/50">
         <Container>
            <GlassCard className="p-12 md:p-20 bg-primary/5 border-primary/20 overflow-hidden relative">
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent-secondary/10 rounded-full blur-[100px]" />
               
               <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                  <div className="space-y-6">
                     <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9]">
                        {t.newsletter.title}
                     </h2>
                     <p className="text-xl text-muted-foreground font-light leading-relaxed">
                        {t.newsletter.description}
                     </p>
                  </div>

                  <div className="relative">
                     <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                           <input 
                              type="email" 
                              placeholder={t.newsletter.placeholder}
                              className="w-full h-16 pl-12 pr-6 rounded-2xl bg-background border border-border focus:border-primary focus:outline-none transition-all"
                           />
                        </div>
                        <button className="h-16 px-8 rounded-2xl bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform flex items-center justify-center gap-3">
                           {t.newsletter.button}
                        </button>
                     </div>
                     <p className="mt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center lg:text-left">
                        Join 2,500+ Engineering leads globally.
                     </p>
                  </div>
               </div>
            </GlassCard>
         </Container>
      </section>
    </main>
  );
}
