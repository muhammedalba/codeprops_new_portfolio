import React, { useMemo } from "react";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "./ProjectCard";
import { PortfolioProject } from "../portfolio-project-client";

interface Translations {
  viewProject: string;
}
interface ProjectsGridProps {
  locale: string;
  translations: Translations;
  projects: PortfolioProject[];
  activeCategory: string;
}



export default function ProjectsGrid({ locale, translations, projects, activeCategory }: ProjectsGridProps) {
  const filteredProjects = useMemo(() => {
    return activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section className="py-24">
      <Container>
        <div className="space-y-32">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} locale={locale} translations={translations} />
          ))}
        </div>
      </Container>
    </section>
  );
}
