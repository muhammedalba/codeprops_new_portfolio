import { LucideIcon, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowEffect } from "@/components/ui/glow-effect";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  index: number;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  index,
  className,
}: ServiceCardProps) {
  return (
    <GlassCard 
      href={href}
      className={cn( 
        " relative group text-center cursor-pointer overflow-hidden flex flex-col h-full",
        className
      )}
    >
       {/* Shine overlay (hover only, slower & smoother) */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              "translate-x-[-120%] group-hover:translate-x-[120%]",
              "transition duration-2000 ease-in-out",
              "bg-gradient-to-r from-transparent via-white/15 to-transparent"
            )} 
          />
      <div  className="absolute bottom-1 left-1 w-20 h-20 bg-primary blur-[80px] rounded-full pointer-events-none" />
      <GlowEffect 
        size="sm" 
        className="top-36 right-0 opacity-20 group-hover:opacity-40 group-hover:w-44 transition-all duration-700" 
      />

      <div
        className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rounded-full transition-all duration-700 shadow-lg shadow-primary/5"
      >
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-10 flex-grow">
        {description}
      </p>

      <div
        className="flex items-center justify-center gap-2 text-sm font-bold tracking-widest uppercase group/link transition-colors"
      >
        <span className="relative">
              {href.includes("/ar/")
                ? "استكشف الخدمة"
                : href.includes("/de/")
                ? "Service erkunden"
                : "Explore Service"}
                 <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
            </span>
        <ArrowUpRight className="w-4 h-4 translate-y-px group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
      </div>

      {/* Numerical Badge / Decoration */}
      <div className="absolute bottom-4 right-6 text-[5rem] font-black text-foreground/[0.03] select-none pointer-events-none group-hover:text-primary/5 transition-colors">
        0{index + 1}
      </div>
    </GlassCard>
  );
}
