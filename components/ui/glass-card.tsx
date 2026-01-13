import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = false,
  glowColor = "bg-primary/20",
  hoverEffect = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative p-8 rounded-[2.5rem] border border-border bg-background/40 backdrop-blur-xl transition-all duration-500",
        hoverEffect && "hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.02]",
        className
      )}
    >
      {glow && (
        <div
          className={cn(
            "absolute -z-10 blur-3xl rounded-full transition-opacity duration-500",
            glowColor,
            "top-1/4 right-1/4 w-1/2 h-1/2 opacity-50 group-hover:opacity-100"
          )}
        />
      )}
      {children}
    </div>
  );
}
