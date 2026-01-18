"use client";

import { useEffect, useState, useRef } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

interface SmartNavProps {
  sections: { id: string; label: string }[];
}

export function SmartNav({ sections }: SmartNavProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const stickyRef = useRef<HTMLDivElement | null>(null);
  const sectionObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // ----------------------------
    // Sticky Nav Observer
    // ----------------------------
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "500px";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.prepend(sentinel);

    const stickyObserver = new IntersectionObserver(
      ([entry]) => {
        // يظهر فقط بعد تجاوز النقطة
        setIsSticky(entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    stickyObserver.observe(sentinel);

    return () => {
      stickyObserver.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    // ----------------------------
    // Active Section Observer
    // ----------------------------
    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-200px 0px -60% 0px", // تحكم في متى يصبح القسم "نشط"
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) sectionObserverRef.current!.observe(el);
    });

    return () => sectionObserverRef.current?.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.offsetTop - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={stickyRef}
      className={cn(
        "fixed top-[var(--header-height)] left-0 right-0 z-30 transition-all duration-300 border-b bg-background/70 backdrop-blur-md",
        isSticky
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="py-2">
        <Container>
          <div className="flex  items-center justify-between text-sm font-bold uppercase tracking-[0.2em]">
            <div className="flex flex-wrap  gap-8 overflow-hidden no-scrollbar scroll-smooth">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={cn(
                    "transition-colors whitespace-nowrap",
                    activeSection === s.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
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
  );
}
