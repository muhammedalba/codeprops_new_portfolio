"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface SmartNavProps {
  sections: { id: string; label: string }[];
}

export function SmartNav({ sections }: SmartNavProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);

      // Simple intersection logic for active section
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <div className={cn(
        "sticky top-20 left-0 right-0 z-50 transition-all duration-300",
        isSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="bg-background/80 backdrop-blur-xl border-b border-border/50 py-4 shadow-xl shadow-black/5">
          <Container>
            <div className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.2em]">
              <div className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={cn(
                      "transition-colors whitespace-nowrap",
                      activeSection === s.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
