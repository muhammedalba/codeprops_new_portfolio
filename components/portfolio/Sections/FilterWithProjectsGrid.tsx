"use client";
import { useState } from "react";
import FilterSection from "./FilterSection";
import ProjectsGrid from "./ProjectsGrid ";
import { PortfolioTranslations } from "../portfolio-project-client";

interface PortfolioClientProps {
  locale: string;
  t: PortfolioTranslations;
}
export function FilterWithProjectsGrid({
  locale,
  t,
}: PortfolioClientProps) {
const [activeCategory, setActiveCategory] = useState("all");
  return <>
  
        {/* Filter Section */}
      <FilterSection 
        t={{ filter: t.filter, all: t.all }} 
        projects={t.projects} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* Projects Grid */}
     <ProjectsGrid 
        locale={locale} 
        translations={{ viewProject: t.viewProject }} 
        projects={t.projects} 
        activeCategory={activeCategory} 
      />
  </>;
}