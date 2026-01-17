"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

const HeroBackground = dynamic(() => import("@/components/layout/hero-background").then((mod) => mod.HeroBackground), {
  loading: () => <div className="h-96 animate-pulse bg-muted/20" />,
  ssr: false
});
interface HeroSectionProps {
  locale: string;
  post: any;
  translations: any;
}

function HeroSectionComponent({ locale, post, translations }: HeroSectionProps) {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <HeroBackground type="about" />
      <Container className="relative z-10">
        <Breadcrumbs 
          items={[
            { label: translations.breadcrumb, href: `/${locale}/blog` },
            { label: post.title }
          ]} 
          className="mb-8"
          locale={locale}
        />
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-12 hover:gap-4 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {translations.post.back}
        </Link>

        <div className="grid lg:grid-cols-[1fr,400px] gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold uppercase tracking-widest text-primary">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">{translations.category}</span>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={14} /> {post.date}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={14} /> {translations.post.read_time}
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]">
              {post.title}
            </h1>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-muted/30 border border-border/50 backdrop-blur-sm"
          >
             <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center font-bold text-3xl text-primary overflow-hidden border border-primary/30">
                {post.author[0]}
             </div>
             <div className="space-y-1">
                <div className="text-xl font-bold">{post.author}</div>
                <div className="text-xs text-primary font-mono font-bold uppercase tracking-widest">{translations.post.principal_architect}</div>
                <div className="flex gap-3 pt-2">
                   <Icons.linkedin size={14} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                   <Icons.twitter size={14} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                </div>
             </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default React.memo(HeroSectionComponent);
