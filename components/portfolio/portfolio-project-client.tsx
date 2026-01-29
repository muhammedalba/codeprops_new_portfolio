import { Container } from "@/components/layout/container";
import HeroSection from "./project/sections/HeroSection";
import DeepDive from "./project/sections/DeepDive";
import Sidebar from "./project/sections/Sidebar";
import { TranslationValue } from "@/lib/translations";

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  problem: string;
  solution: string;
  result: string;
  link: string;
  [key: string]: TranslationValue;
}

export interface PortfolioTranslations {
  title: string;
  subtitle: string;
  filter: string;
  all: string;
  viewProject: string;
  projects: PortfolioProject[];
  details: {
    tech_stack: string;
    focus_layers: string;
    request_solution: string;
    consultation: string;
    next_case: string;
    explore_all: string;
    back: string;
    live_integration: string;
    uptime: string;
    challenge: string;
    solution: string;
    results: string;
    performance_matrix: string;
    security_pass: string;
    [key: string]: TranslationValue;
  };
}

interface PortfolioProjectClientProps {
  locale: string;
  project: PortfolioProject;
  t: PortfolioTranslations;
}

export function PortfolioProjectClient({ locale, project, t }: PortfolioProjectClientProps) {
  if (!project) return null;

  return (
    <main className="flex flex-col bg-background min-h-screen">
      {/* Project Hero */}
      <HeroSection locale={locale} project={project} t={t} />

      {/* Main Content */}
      <section className="pb-32">
        <Container>
          <div className="grid lg:grid-cols-[1fr,350px] gap-20 items-start">
            <DeepDive project={project} t={t} />
            <Sidebar project={project} locale={locale} t={t} />
          </div>
        </Container>
      </section>
    </main>
  );
}

