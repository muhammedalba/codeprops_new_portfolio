"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";

interface TimelineSectionProps {
  timeline: any;
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <section id="timeline" className="py-24 md:py-32 bg-muted/5 relative">
      <Container>
        <SectionHeader
          title={timeline.title}
          description={timeline.subtitle}
          align="center"
          className="mb-20"
        />

        <div className="max-w-4xl mx-auto relative">
          <div className="opacity-0 md:opacity-100 absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="my-3 md:space-y-24">
            {timeline.items.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row items-center"
                )}
              >
                {/* Left */}
                <div className="flex-1 w-full md:text-end md:px-16">
                  {i % 2 === 0 && (
                    <div className="my-3 p-8 border border-border rounded-[2.5rem] md:p-0 md:border-0">
                      <span className="text-4xl font-mono font-bold text-primary/20">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold py-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center */}
                <div className="hidden md:flex w-10 h-10 rounded-full bg-background border border-primary shadow-xl z-10 items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>

                {/* Right */}
                <div className="flex-1 w-full text-start md:px-16">
                  {i % 2 !== 0 && (
                    <div className="my-3 p-8 border border-border rounded-[2.5rem] md:p-0 md:border-0">
                      <span className="text-4xl font-mono font-bold text-primary/20">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold py-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
