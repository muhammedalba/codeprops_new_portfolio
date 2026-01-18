"use client";
import { useState } from "react";
import FilterSection from "./FilterSection";
import ProjectsGrid from "./ProjectsGrid ";
interface PortfolioClientProps {
  locale: string;
  t: any;
}
export function FilterWithProjectsGrid({
  locale,
  t,
}: PortfolioClientProps) {
const [activeCategory, setActiveCategory] = useState("all");
  return <>
  
        {/* Filter Section */}
      <FilterSection 
        t={t} 
        projects={t.projects} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* Projects Grid */}
     <ProjectsGrid 
        locale={locale} 
        translations={t} 
        projects={t.projects} 
        activeCategory={activeCategory} 
      />
  </>;
}