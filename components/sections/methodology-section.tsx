import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface MethodologySectionProps {
  id?: string;
  badge: string;
  title: string;
  steps: Step[];
}

export function MethodologySection({ id, badge, title, steps }: MethodologySectionProps) {
  return (
    <section id={id} className="py-24 bg-muted/30 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

            <SectionHeader 
              badge={badge}
              title={title}
              align="left"
            />

            <div className="space-y-10 relative z-10">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm flex items-center justify-center text-2xl font-bold font-heading group-hover:bg-primary group-hover:text-primary-foreground group-hover:rounded-full transition-all duration-500 shadow-sm">
                      0{i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-primary/30 to-transparent" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Presentation Area */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-3" />
            <div className="relative z-10 w-full aspect-square border border-border bg-background/40 backdrop-blur-3xl p-12 overflow-hidden rounded-[4rem] shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px]" />
              
              <div className="h-full flex flex-col justify-center gap-10">
                {/* Progress Visual */}
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-mono text-primary/60">
                    <span>SYSTEM_SYNC_STATUS</span>
                    <span>ACTIVE</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-muted/50 overflow-hidden p-0.5 border border-border">
                    <motion.div
                      className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                      animate={{ width: ["0%", "100%"] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>

                {/* Grid Visual */}
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, delay: item * 0.5 }}
                      className={cn(
                        "aspect-video rounded-2xl border",
                        item === 2 ? "bg-primary/10 border-primary/20" : "bg-muted/30 border-border"
                      )}
                    />
                  ))}
                </div>

                {/* Terminal Visual */}
                <div className="font-mono text-[10px] text-muted-foreground/60 space-y-2 bg-background/50 p-4 rounded-xl border border-border/50">
                  <div className="flex gap-2">
                    <span className="text-primary">{">"}</span> INITIALIZING_ENTROPY_BUFFER...
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">{">"}</span> DEPLOYING_RECURSIVE_ASSETS...
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">{">"}</span> OPTIMIZING_LOAD_MODES...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
