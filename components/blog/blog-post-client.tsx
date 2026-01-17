"use client";

import { Container } from "@/components/layout/container";
import { useState, useEffect } from "react";
import HeroSection from "./post/sections/HeroSection";
import TableOfContents from "./post/sections/TableOfContents";
import ArticleContent from "./post/sections/ArticleContent";
import SidebarActions from "./post/sections/SidebarActions";
import RecommendedSection from "./post/sections/RecommendedSection";

interface BlogPostClientProps {
  locale: string;
  post: any;
  translations: any;
}

export function BlogPostClient({ locale, post, translations }: BlogPostClientProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll("h2[id], div[id]").forEach((section) => {
      observers.observe(section);
    });

    return () => observers.disconnect();
  }, [post]);

  if (!post) return null;

  const toc = [
    { id: "intro", label: translations.blog.post.headings.intro },
    { id: "challenges", label: translations.blog.post.headings.challenges },
    { id: "insight", label: translations.blog.post.headings.insight },
    { id: "conclusion", label: translations.blog.post.headings.conclusion },
  ];

  return (
    <main className="flex flex-col bg-background min-h-screen relative">
      {/* Article Hero */}
      <HeroSection locale={locale} post={post} translations={translations} />

      {/* Main Content Layout */}
      <section className="pb-32">
        <Container>
          <div className="grid lg:grid-cols-[280px,1fr,300px] gap-16 items-start">
            <TableOfContents toc={toc} activeSection={activeSection} t={translations.blog.post} />
            <ArticleContent locale={locale} post={post} t={translations.blog.post} />
            <SidebarActions locale={locale} tags={post.tags} t={translations.blog.post} />
          </div>
        </Container>
      </section>

      {/* Recommended Section */}
      <RecommendedSection locale={locale} t={translations.blog.post} />
    </main>
  );
}
