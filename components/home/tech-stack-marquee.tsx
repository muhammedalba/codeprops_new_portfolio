"use client";

const TECH_STACK = [
  "Next.js", 
  "TypeScript", 
  "React Native", 
  "AWS", 
  "Docker", 
  "Kubernetes", 
  "PostgreSQL", 
  "Redis", 
  "Framer Motion", 
  "TailwindCSS"
];

export function TechStackMarquee() {
  return (
    <section className="py-5 mt-6 border-y border-border/50 bg-muted/10 relative overflow-hidden group">
      {/* Premium Masking to fade edges */}
      <div className="mask-fade overflow-hidden" dir="ltr">
        <div className="animate-marquee-container group-hover:[animation-play-state:paused] flex">
          {/* List 1 */}
          <div className="flex gap-20 items-center pr-20 whitespace-nowrap">
            {TECH_STACK.map((tech) => (
              <span 
                key={tech} 
                className="text-2xl md:text-5xl font-black text-foreground/5 uppercase tracking-tighter hover:text-primary transition-all duration-500 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
          {/* List 2 (The Perfect Duplicate) */}
          <div className="flex gap-20 items-center pr-20 whitespace-nowrap" aria-hidden="true">
            {TECH_STACK.map((tech) => (
              <span 
                key={`${tech}-dup`} 
                className="text-2xl md:text-5xl font-black text-foreground/5 uppercase tracking-tighter hover:text-primary transition-all duration-500 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
