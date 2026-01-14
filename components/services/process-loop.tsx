"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, Box, Cpu, Rocket, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessLoopProps {
  title: string;
  steps: { title: string; description: string }[];
}

export function ProcessLoop({ title, steps }: ProcessLoopProps) {
  const icons = [Cpu, Box, Rocket, ShieldCheck];

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-primary/5 blur-[120px] rounded-full -z-10 rotate-12" />
      
      <Container>
        <SectionHeader
          title={title}
          description="A disciplined, engineering-centric approach to turning complex requirements into resilient digital infrastructure."
          align="center"
          className="mb-20"
        />

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mb-8 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] transition-all duration-500 z-10">
                  <Icon className="text-primary group-hover:scale-110 transition-transform" size={28} />
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
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
