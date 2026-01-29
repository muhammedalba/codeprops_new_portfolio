import { CheckCircle2, ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { PortfolioProject, PortfolioTranslations } from "../../portfolio-project-client";

interface SidebarProps {
  project: PortfolioProject;
  locale: string;
  t: PortfolioTranslations;
}

export default function Sidebar({ project, locale, t }: SidebarProps) {
  return (
    <aside className="space-y-12 sticky top-32">
      <GlassCard className="p-8 border-border/40 space-y-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-6xl font-black">{project.tech[0][0]}</div>
        
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">{t.details.tech_stack}</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span key={tech} className="px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-xs font-bold text-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t border-border/50">
          <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">{t.details.focus_layers}</h4>
          <ul className="space-y-4">
            {[
              "Core Web Vitals Optimization",
              "Enterprise Security Layer",
              "Scalable Logic Infrastructure",
              "Advanced Cloud Deploy"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <CheckCircle2 size={16} className="text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 space-y-4 text-center">
          <Link href={`/${locale}/contact`}>
            <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl shadow-primary/20">
              {t.details.request_solution}
              <ExternalLink size={16} />
            </button>
          </Link>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{t.details.consultation}</p>
        </div>
      </GlassCard>

      <div className="space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground ml-2">{t.details.next_case}</h4>
        <Link href={`/${locale}/portfolio`}>
          <div 
            className="p-6 rounded-3xl bg-muted/30 border border-border/50 flex items-center justify-between group cursor-pointer hover:bg-muted/50 transition-all duration-300 hover:translate-x-2"
          >
            <span className="font-bold">{t.details.explore_all}</span>
            <ChevronRight className="text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </aside>
  );
}
