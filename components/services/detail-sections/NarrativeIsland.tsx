"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Icons } from "@/components/ui/icons";
import { ServiceSlug, serviceIcons } from "@/lib/services";

interface NarrativeIslandProps {
  slug: ServiceSlug;
}

export function NarrativeIsland({ slug }: NarrativeIslandProps) {
  const Icon = serviceIcons[slug] || Icons.zap;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-full h-full"
      >
        <GlassCard className="absolute inset-0 flex items-center justify-center overflow-hidden border-primary/20 bg-primary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
          <Icon size={180} className="text-primary/10 animate-pulse" />
          
          {/* Internal floating cards for premium feel */}
          <m.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 p-4 glass rounded-2xl border-white/10 shadow-2xl"
          >
            <Icons.zap size={20} className="text-primary mb-2" />
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Latency</div>
            <div className="font-mono text-xs">Sub-50ms</div>
          </m.div>

          <m.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 p-4 glass rounded-2xl border-white/10 shadow-2xl"
          >
            <Icons.shieldCheck size={20} className="text-accent-secondary mb-2" />
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Security</div>
            <div className="font-mono text-xs">A+ Rating</div>
          </m.div>
        </GlassCard>
      </m.div>
    </LazyMotion>
  );
}
