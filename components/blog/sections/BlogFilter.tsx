"use client";

import React, { useMemo, useCallback } from "react";
import { Container } from "@/components/layout/container";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogPost } from "../blog-client";

interface BlogFilterProps {
  locale: string;
  posts: BlogPost[];
  activeTag: string;
  setActiveTag: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function BlogFilterComponent({
  locale,
  posts,
  activeTag,
  setActiveTag,
  searchQuery,
  setSearchQuery,
}: BlogFilterProps) {
  // Memoize tags to avoid unnecessary re-renders
  const tags = useMemo(() => {
    const allTags = posts.flatMap((post: BlogPost) => post.tags);
    return ["All", ...Array.from(new Set<string>(allTags))];
  }, [posts]);

  // Debounced search handler (optional)
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <section className="sticky top-[var(--header-height)] z-40 bg-background/80 backdrop-blur-xl border-y border-border/50 py-6">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                aria-label={`Filter by ${tag}`}
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

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder={locale === "ar" ? "ابحث في الرؤى..." : "Search insights..."}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full h-12 pl-12 pr-4 rounded-full bg-muted/30 border border-border/50 focus:border-primary/50 focus:outline-none transition-all text-sm"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default React.memo(BlogFilterComponent);
