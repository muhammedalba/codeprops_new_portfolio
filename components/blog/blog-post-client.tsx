"use client";

import dynamic from "next/dynamic";
import { Container } from "@/components/layout/container";
import { useState, useEffect, useMemo } from "react";
import HeroSection from "./post/sections/HeroSection";
import TableOfContents from "./post/sections/TableOfContents";
import ArticleContent from "./post/sections/ArticleContent";
import SidebarActions from "./post/sections/SidebarActions";

const RecommendedSection = dynamic(() => import("./post/sections/RecommendedSection"), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20" />,
  ssr: false
});

interface BlogPostClientProps {
  locale: string;
  post: any;
  translations: any;
}

export function BlogPostClient({ locale, post, translations }: BlogPostClientProps) {
  const [activeSection, setActiveSection] = useState("");
  const blogT = translations.blog;
  const postT = blogT.post;

  useEffect(() => {
    const observers = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { 
      threshold: 0.2, // Lower threshold for better sensitivity
      rootMargin: "-20% 0px -70% 0px" // Focus on the middle part of the screen
    });

    const targetElements = document.querySelectorAll("article [id]");
    targetElements.forEach((section) => {
      observers.observe(section);
    });

    return () => observers.disconnect();
  }, [post]);

  const toc = useMemo(() => [
    { id: "intro", label: postT.headings.intro },
    { id: "challenges", label: postT.headings.challenges },
    { id: "insight", label: postT.headings.insight },
    { id: "conclusion", label: postT.headings.conclusion },
  ], [postT.headings]);

  if (!post) return null;

  return (
    <main className="flex flex-col bg-background min-h-screen relative">
      {/* Article Hero - Pass only needed slice */}
      <HeroSection locale={locale} post={post} translations={blogT} />

      {/* Main Content Layout */}
      <section className="pb-32">
        <Container>
          <div className="flex flex-col lg:grid lg:grid-cols-[280px,1fr,300px] gap-8 lg:gap-16 items-start">
            <TableOfContents toc={toc} activeSection={activeSection} t={postT} />
            <ArticleContent locale={locale} post={post} t={postT} />
            <SidebarActions locale={locale} tags={post.tags} t={postT} />
          </div>
        </Container>
      </section>

      {/* Recommended Section */}
      <RecommendedSection locale={locale} t={postT} />
    </main>
  );
}

