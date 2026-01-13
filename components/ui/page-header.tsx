import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Container } from "@/components/layout/container";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("pt-32 pb-20", className)}>
      <Container>
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 tracking-tighter leading-[0.9]">
            {title}
          </h1>
          {description && (
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
          {children && <div className="mt-12">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
