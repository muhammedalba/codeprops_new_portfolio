"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/hooks/use-reveal";

interface ContactCTAProps {
  title: string;
  description: string;
  button: string;
  locale?: string;
}

export function ContactCTA({
  title,
  description,
  button,
  locale,
}: ContactCTAProps) {

  return (
    <section className="py-28 relative">
      <Container>
        <Reveal
          animation="up"
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
            <Reveal
              animation="scale"
              delay={0.1}
              as="h2"
              className="text-4xl md:text-7xl font-heading font-bold tracking-tight leading-[1.05]"
            >
              {title}
            </Reveal>

            <Reveal
              animation="up"
              delay={0.2}
              as="p"
              className="mt-6 text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              {description}
            </Reveal>

            <Reveal
              animation="up"
              delay={0.3}
              className="mt-14"
            >
              <Button
                size="lg"
                className="relative h-16 px-10 rounded-full text-lg font-semibold overflow-hidden group"
              >
                <Link href={`/${locale}/contact`}>
                  <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10 flex items-center gap-3">
                    {button}
                    <ArrowUpRight className="transition-transform duration-300  group-hover:translate-x-1 group-hover:-translate-y-2" />
                  </span>
                </Link>
              </Button>
            </Reveal>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
