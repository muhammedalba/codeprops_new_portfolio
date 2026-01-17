"use client";

import { useState } from "react";
import HeroSection from "./sections/HeroSection";
import BlogFilter from "./sections/BlogFilter";
import BlogGrid from "./sections/BlogGrid";
import NewsletterSection from "./sections/NewsletterSection";

interface BlogClientProps {
  locale: string;
  translations: any;
}

export function BlogClient({ locale, translations }: BlogClientProps) {
  const t = translations.blog;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  return (
    <main className="flex flex-col bg-background min-h-screen">
      <HeroSection locale={locale} t={t} />

      <BlogFilter 
        locale={locale}
        posts={t.posts}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <BlogGrid 
        locale={locale}
        posts={t.posts}
        searchQuery={searchQuery}
        activeTag={activeTag}
        t={t}
      />

      <NewsletterSection t={t} />
    </main>
  );
}

