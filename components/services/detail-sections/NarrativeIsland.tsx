"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Icons } from "@/components/ui/icons";
import { ServiceSlug, serviceIcons } from "@/lib/services";
import { Reveal } from "@/hooks/use-reveal";

interface NarrativeIslandProps {
  slug: ServiceSlug;
}

export function NarrativeIsland({ slug }: NarrativeIslandProps) {
  const Icon = serviceIcons[slug] || Icons.zap;

  return (
    <Reveal
      animation="scale"
      className="relative w-full h-full"
    >
        <GlassCard className="absolute inset-0 flex items-center justify-center overflow-hidden border-primary/20 bg-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
          <Icon size={180} className="text-primary/10 animate-pulse" />
          
          {/* Internal floating cards for premium feel */}
          <div 
            className="absolute top-10 right-10 p-4 glass rounded-2xl border-white/10 shadow-2xl animate-[float_4s_ease-in-out_infinite]"
          >
            <Icons.zap size={20} className="text-primary mb-2" />
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Latency</div>
            <div className="font-mono text-xs">Sub-50ms</div>
          </div>

          <div 
            className="absolute bottom-10 left-10 p-4 glass rounded-2xl border-white/10 shadow-2xl animate-[float_5s_ease-in-out_infinite]"
          >
            <Icons.shieldCheck size={20} className="text-accent-secondary mb-2" />
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Security</div>
            <div className="font-mono text-xs">A+ Rating</div>
          </div>
        </GlassCard>
    </Reveal>
  );
}
