"use client";

import { ShieldCheck, AlertCircle, Zap, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/hooks/use-reveal";

import { PortfolioProject, PortfolioTranslations } from "../../portfolio-project-client";

interface DeepDiveProps {
  project: PortfolioProject;
  t: PortfolioTranslations;
}

export default function DeepDive({ project, t }: DeepDiveProps) {
  return (
    <div className="space-y-32">
      {/* Visual Showcase Placeholder */}
      <Reveal
        animation="scale"
        className="aspect-video w-full rounded-[4rem] bg-muted/30 border border-border/50 relative overflow-hidden group shadow-2xl shadow-black/20"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-secondary/5 group-hover:bg-primary/10 transition-colors duration-700" />
        <div className="absolute inset-0 flex items-center justify-center p-20">
           <ShieldCheck size={120} className="text-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000" />
        </div>
        <div className="absolute bottom-10 left-10 flex gap-4">
           <div className="px-6 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-widest">{t.details.performance_matrix}</div>
           <div className="px-6 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-[10px] font-bold uppercase tracking-widest">{t.details.security_pass}</div>
        </div>
      </Reveal>

      {/* Narrative Sections */}
      <div className="space-y-16 max-w-4xl">
        <Reveal
          animation="up"
          as="section"
          className="group"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
               <AlertCircle size={20} />
            </div>
            <h2 className="text-xl md:text-3xl font-heading font-bold tracking-tighter">{t.details.challenge}</h2>
          </div>
          <p className="ps-2 text-md md:text-lg text-muted-foreground leading-relaxed font-light">
            {project.problem}
          </p>
        </Reveal>

        <Reveal
          animation="up"
          delay={0.1}
          as="section"
          className="group"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
               <Zap size={20} />
            </div>
            <h2 className="text-xl md:text-3xl font-heading font-bold tracking-tighter">{t.details.solution}</h2>
          </div>
          <p className="text-md md:text-lg text-muted-foreground leading-relaxed font-light">
            {project.solution}
          </p>
        </Reveal>

        <Reveal
          animation="up"
          delay={0.2}
          as="section"
          className="group"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
               <CheckCircle2 size={20} />
            </div>
            <h2 className="text-xl md:text-3xl font-heading font-bold tracking-tighter">{t.details.results}</h2>
          </div>
          <p className="text-md md:text-lg text-muted-foreground leading-relaxed font-light">
            {project.result}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
