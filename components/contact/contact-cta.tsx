"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

interface ContactCTAProps {
  title: string;
  description: string;
  button: string;
}

export function ContactCTA
({
  title,
  description,
  button,
}: ContactCTAProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-28 relative">
      <Container>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[3rem] border border-primary/20 bg-background/60 backdrop-blur-xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
        >
          {/* Aurora background (static – GPU cheap) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute blur-[150px] -top-1/2 -left-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.25),transparent_60%)]" />
            <div className="absolute blur-[150px] -bottom-1/2 -right-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_70%_70%,rgba(236,72,153,0.18),transparent_60%)]" />
          </div>

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 px-10 py-20 md:px-24 text-center">
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-7xl font-heading font-bold tracking-tight leading-[1.05]"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mt-6 text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              {description}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-14"
            >
              <Button
                size="lg"
                className="relative h-16 px-10 rounded-full text-lg font-semibold overflow-hidden group"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              >
                <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  {button}
                  <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
