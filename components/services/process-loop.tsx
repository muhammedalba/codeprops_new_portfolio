import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Box, Cpu, Rocket, ShieldCheck } from "lucide-react";

interface ProcessLoopProps {
  title: string;
  subtitle: string;
  steps: { title: string; description: string }[];
}

export function ProcessLoop({ title, subtitle, steps }: ProcessLoopProps) {
  const icons = [
    { icon: Cpu, color: "red" },
    { icon: Box, color: "blue" },
    { icon: Rocket, color: "green" },
    { icon: ShieldCheck, color: "yellow" }
  ];

  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute w-1/5 h-full bg-primary/10 blur-2xl rounded-full -z-0 top-1 md:top-1/2 left-1/2 -translate-x-1/2  md:left-1 md:transform-none md:w-full  md:h-[175px]  " />
      
      <Container className="relative z-10">
        <SectionHeader
          title={title}
          description={subtitle}
          align="center"
          className="mb-20"
        />

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[2rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {steps.map((step, i) => {
            const Icon = icons[i].icon;
            const color = icons[i].color;
            return (
              <div
                key={i}
                className="relative group flex flex-col items-center text-center opacity-0 animate-[fade-up_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-8 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] transition-all duration-500 z-10">
                  <Icon color={color} className="group-hover:scale-110 transition-transform" size={28} />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[10px] font-mono text-primary font-bold opacity-50 uppercase tracking-widest">Step 0{i + 1}</span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed px-4">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-border my-4" />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
