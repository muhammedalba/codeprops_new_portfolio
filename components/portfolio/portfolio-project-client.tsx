import { Container } from "@/components/layout/container";
import HeroSection from "./project/sections/HeroSection";
import DeepDive from "./project/sections/DeepDive";
import Sidebar from "./project/sections/Sidebar";

interface PortfolioProjectClientProps {
  locale: string;
  project: any;
  t: any;
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

