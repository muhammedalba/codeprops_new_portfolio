"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { SectionBadge } from "@/components/ui/section-badge";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ArticleContentProps {
  locale: string;
  post: any;
  t: any;
}

export default function ArticleContent({ locale, post, t }: ArticleContentProps) {
  return (
    <article className="prose prose-invert prose-primary max-w-none">
      <div id="intro" className="scroll-mt-40">
        <div className="text-3xl text-muted-foreground font-light leading-relaxed mb-16 italic border-l-4 border-primary pl-10 py-4 bg-primary/5 rounded-r-[2rem]">
          {post.excerpt}
        </div>

        <div className="space-y-10 text-xl text-foreground/80 leading-relaxed font-light">
          <p>
            {t.demo.intro_p1}
          </p>
          <p>
            {t.demo.intro_p2}
          </p>
        </div>
      </div>

      <div id="challenges" className="scroll-mt-40 pt-16">
        <h2 className="text-4xl font-bold text-foreground mb-8">
          {t.headings.challenges}
        </h2>
        <div className="space-y-8 text-xl text-foreground/80 leading-relaxed font-light">
          <p>
            {t.demo.challenges_p1}
          </p>
          
          <pre className="p-8 rounded-3xl bg-black/50 border border-white/5 font-mono text-sm leading-relaxed overflow-x-auto">
            <code className="text-primary">
{`// Example: Edge Data Synchronization Pattern
async function syncGlobalNode(data, edgeId) {
  const latency = await calculateProximity(edgeId);
  return await dispatchToEdge(data, {
    compression: 'brotli',
    priority: latency < 50 ? 'high' : 'standard'
  });
}`}
            </code>
          </pre>
        </div>
      </div>

      <div id="insight" className="scroll-mt-40 pt-16">
        <GlassCard className="p-12 my-12 bg-primary/5 border-primary/20 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-4">
            <SectionBadge className="mb-0">{t.headings.insight}</SectionBadge>
          </h3>
          <p className="text-2xl text-foreground/90 font-medium leading-tight">
            {t.demo.insight_text}
          </p>
        </GlassCard>
      </div>

      <div id="conclusion" className="scroll-mt-40 pt-16">
        <h2 className="text-4xl font-bold text-foreground mb-8">
          {t.headings.conclusion}
        </h2>
        <div className="space-y-8 text-xl text-foreground/80 leading-relaxed font-light">
          <p>
            {t.demo.conclusion_p1}
          </p>
        </div>
      </div>

      {/* Post Navigation */}
      <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between gap-8">
        <Link href="#" className="flex-1 group p-8 rounded-3xl bg-muted/20 border border-border/50 hover:bg-primary/5 transition-all text-left">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{t.prev_insight}</div>
          <div className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft size={16} /> {t.demo.prev_post_title}
          </div>
        </Link>
        <Link href="#" className="flex-1 group p-8 rounded-3xl bg-muted/20 border border-border/50 hover:bg-primary/5 transition-all text-right">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{t.next_insight}</div>
          <div className="text-xl font-bold group-hover:text-primary transition-colors flex items-center justify-end gap-2">
            {t.demo.next_post_title} <ChevronRight size={16} />
          </div>
        </Link>
      </div>
    </article>
  );
}
