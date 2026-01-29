'use client';
import React, { useMemo } from "react";
import { Container } from "@/components/layout/container";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

import { PortfolioProject } from "../portfolio-project-client";

interface FilterSectionProps {
  t: { filter: string; all: string };
  projects: PortfolioProject[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryButton = React.memo(
  ({
    category,
    isActive,
    label,
    onClick,
  }: {
    category: string;
    isActive: boolean;
    label: string;
    onClick: (category: string) => void;
  }) => (
    <button
      onClick={() => onClick(category)}
      className={cn(
        "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border will-change-transform",
        isActive
          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "bg-muted/50 border-border hover:border-primary/50 text-muted-foreground"
      )}
    >
      {label}
    </button>
  )
);
CategoryButton.displayName = "CategoryButton";

export default function FilterSection({
  t,
  projects,
  activeCategory,
  setActiveCategory,
}: FilterSectionProps) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects?.forEach((p) => set.add(p.category));
    return ["all", ...Array.from(set)];
  }, [projects]);

  return ( 
    <section className="sticky top-[var(--header-height)] z-40 bg-background/80 backdrop-blur-xl border-y border-border/50 py-5">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary">
            <Filter size={16} />
            <span>{t.filter}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <CategoryButton
                key={cat}
                category={cat}
                isActive={activeCategory === cat}
                label={cat === "all" ? t.all : cat}
                onClick={setActiveCategory}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
