"use client";

import { useState } from "react";
import HeroSection from "./sections/HeroSection";
import BlogFilter from "./sections/BlogFilter";
import BlogGrid from "./sections/BlogGrid";
import NewsletterSection from "./sections/NewsletterSection";

export interface BlogPost {
  slug: string;
  date: string;
  title: string;
  image: string;
  tags: string[];
  excerpt: string;
  author: string | {
    name: string;
    avatar: string;
  };
}

export interface BlogTranslations {
  title: string;
  subtitle: string;
  viewAll: string;
  category: string;
  readMore: string;
  posts: BlogPost[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    button: string;
  };
}

interface BlogClientProps {
  locale: string;
  translations: {
    blog: BlogTranslations;
  };
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

