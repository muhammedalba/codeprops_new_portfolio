import React, { memo, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
}

function SectionBadgeComponent({
  children,
  className,
  variant = "primary",
}: SectionBadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/5",
    outline: "bg-transparent text-primary border-primary/20",
  };

  return (
    <div
      className={cn(
        "inline-block px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase border mb-6",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export const SectionBadge = memo(SectionBadgeComponent);
