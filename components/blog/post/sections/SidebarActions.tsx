import React from "react";
import { Icons } from "@/components/ui/icons";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface SidebarActionsProps {
  locale: string;
  tags: string[];
  t: {
    share: string;
    audit_title: string;
    audit_desc: string;
    audit_button: string;
    technical_clusters: string;
  };
}

export function SidebarActions({ locale, tags, t }: SidebarActionsProps) {
  return (
    <aside className="space-y-12 sticky top-32">
      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{t.share}</h4>
        <div className="grid grid-cols-4 gap-3">
          {[Icons.twitter, Icons.linkedin, Icons.facebook, LinkIcon].map((Icon, i) => (
            <button key={i} className="w-full aspect-square rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <GlassCard className="p-8 border-primary/20 bg-primary/5 space-y-6">
        <h4 className="text-xl font-bold tracking-tight">{t.audit_title}</h4>
        <p className="text-sm text-muted-foreground font-light leading-relaxed">
          {t.audit_desc}
        </p>
        <Link href={`/${locale}/contact`}>
          <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3">
            {t.audit_button} 
            <ArrowLeft size={16} className="rotate-180" />
          </button>
        </Link>
      </GlassCard>

      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{t.technical_clusters}</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="px-4 py-2 rounded-xl bg-muted/50 text-[10px] font-bold uppercase tracking-widest border border-border/50 hover:border-primary/30 transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
