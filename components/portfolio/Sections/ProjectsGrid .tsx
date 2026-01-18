import React, { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "./ProjectCard";
interface Translations {
  viewProject: string;
}
interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  result: string;
  image: string;
  problem: string;
  solution: string;
  tech: string[];
}
interface ProjectsGridProps {
  locale: string;
  translations: Translations;
  projects: Project[];
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
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} locale={locale} translations={translations} />
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
