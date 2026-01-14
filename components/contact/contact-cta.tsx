"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

const CinematicMesh = dynamic(() => import("@/components/animations/cinematic-mesh").then(m => m.CinematicMesh), { ssr: false });

interface ContactCTAProps {
  title: string;
  description: string;
  button: string;
}

export function ContactCTA({ title, description, button }: ContactCTAProps) {
  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-12 md:p-24 rounded-[4rem] bg-[#020617] text-primary-foreground overflow-hidden text-center border border-primary/20 shadow-2xl group"
        >
          {/* Rich Background Pattern & Animation */}
          <div className="absolute inset-0 z-0">
            {/* Moving Glows */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary rounded-full blur-[150px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.05, 0.15, 0.05],
                x: [0, -40, 0],
                y: [0, 60, 0]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent-secondary rounded-full blur-[150px]"
            />

            {/* Technical Grid */}
            <div 
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
            
            {/* Architectural Lines Overlay */}
            <div className="absolute inset-0 opacity-[0.1]">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
              <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            {/* Mesh-like texture */}
            <div 
              className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                filter: 'brightness(0.5) contrast(1.2)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {title}
            </h2>
            <p className="text-xl md:text-2xl opacity-70 font-light leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
            <div className="pt-10">
              <Button
                size="lg"
                className="h-20 px-12 rounded-full bg-primary text-primary-foreground text-xl font-bold hover:scale-105 transition-all group shadow-2xl shadow-primary/40 relative overflow-hidden"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  {button}
                  <ArrowUpRight className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
