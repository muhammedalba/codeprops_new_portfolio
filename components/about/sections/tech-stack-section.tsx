import { Code } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface TechStackSectionProps {
  techStack: any;
}

/**
 * TechStackSection Server Component
 * Renders static tech stack information
 * No JavaScript needed
 */
export function TechStackSection({ techStack }: TechStackSectionProps) {
  return (
    <section id="stack" className="py-8 md:py-32">
      <Container>
        <SectionHeader
          badge="Engineering Mastery"
          title={techStack.title}
          description={techStack.subtitle}
          align="left"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-1 gap-6 mt-12 relative">
            {techStack.categories.map((cat: any, i: number) => (
              <div 
                key={i} 
                className={cn(
                  "group relative block rounded-[2.5rem] border border-border bg-background/40 p-6",
                  "backdrop-blur-xl transition-all duration-300"
                )}
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <h4 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider relative z-10">
                  {cat.name}
                </h4>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {cat.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md bg-muted text-[10px] font-mono font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-12 md:mt-0 aspect-square max-w-[500px] mx-auto lg:ml-auto">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-[100px]" />
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <Code className="mx-auto text-primary mb-4" size={48} />
                <div className="text-4xl font-black tracking-tighter uppercase">
                  Engineer Led
                </div>
                <div className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">
                  CodeProps Engineering
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
