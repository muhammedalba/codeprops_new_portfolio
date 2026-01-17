"use client";
import { useState } from "react";
import HeroSection from "./Sections/HeroSection";
import ProjectsGrid from "./Sections/ProjectsGrid ";
import FilterSection from "./Sections/FilterSection";
import { ContactCTA } from "../contact/sections/contact-cta";


interface PortfolioClientProps {
  locale: string;
  translations: any;
}

export function PortfolioClient({ locale, translations }: PortfolioClientProps) {
  const t = translations.portfolio;
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Hero Section */}
      <HeroSection locale={locale} t={t} />
      
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

      {/* Instant Contact CTA */}
       <ContactCTA
        locale={locale}
        title={translations.contact.cta.title}
        description={translations.contact.cta.description}
        button={translations.contact.cta.button}
      />
    </main>
  );
}
