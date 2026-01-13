import { cn } from "@/lib/utils";

interface GlowEffectProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  blur?: string;
  opacity?: string;
}

export function GlowEffect({
  className,
  color = "bg-primary/20",
  size = "md",
  blur = "blur-3xl",
  opacity = "opacity-50",
}: GlowEffectProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-56 h-56",
    lg: "w-96 h-96",
    xl: "w-[40rem] h-[40rem]",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full -z-10 pointer-events-none transition-all duration-1000",
        color,
        sizeClasses[size],
        blur,
        opacity,
        className
      )}
      aria-hidden="true"
    />
  );
}
