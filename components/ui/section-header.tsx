import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id?: string;
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  id,
  badge,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div id={id} className={cn("relative flex flex-col mb-16", alignmentClasses[align], className)}>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      {badge && (
        <span className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-4">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-4xl md:text-6xl font-heading font-bold mb-6 leading-[1.1]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
