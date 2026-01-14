"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { LucideIcon, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  testimonial: string;
  Icon: LucideIcon;
  index: number;
  href: string;
}

export function ServiceCard({ title, description, testimonial, Icon, index, href }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Cache rect to avoid layout thrashing on mouse move
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    
    // Use cached dimensions - Zero Layout Read
    const width = rectRef.current.width;
    const height = rectRef.current.height;
    const mouseX = e.clientX - rectRef.current.left;
    const mouseY = e.clientY - rectRef.current.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="perspective-1000"
    >
      <GlassCard 
        className={cn(
          "group h-full p-8 md:p-10 flex flex-col relative overflow-hidden transition-all duration-500",
          isHovered ? "border-primary/50 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.15)]" : "border-border/50"
        )}
      >
        {/* Background Animation Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              opacity: isHovered ? 0.4 : 0,
              y: isHovered ? [0, -20, 0] : 0,
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent"
          />
          
          {/* Subtle Code Pattern */}
          <div className="absolute bottom-0 right-0 w-full h-1/2 opacity-[0.03] select-none font-mono text-[8px] leading-tight">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="whitespace-nowrap translate-x-4">
                {`const architecture = new System({ scale: 'global', resilience: 1.0 });`}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
          {/* Icon Section */}
          <div className="mb-10 w-20 h-20 rounded-[1.5rem] bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 shadow-xl shadow-transparent group-hover:shadow-primary/20">
            <Icon size={40} className="group-hover:scale-110 transition-transform duration-500" />
          </div>

          <h3 className="text-3xl font-heading font-bold mb-6 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 flex-grow">
            {description}
          </p>

          {/* Micro-Testimonial */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 rounded-2xl bg-muted/20 border-l-4 border-primary italic text-sm text-balance flex gap-3 items-start"
          >
            <Quote size={14} className="text-primary shrink-0 mt-1" />
            <span>{testimonial}</span>
          </motion.div>

          <Link
            href={href}
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-primary group/link cursor-pointer mt-auto"
          >
            <span>{href.includes('/ar/') ? "استكشف البنية التقنية" : (href.includes('/de/') ? "Architektur erkunden" : "Explore Architecture")}</span>
            <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-primary-foreground transition-all">
              <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Shine Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"
          animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </GlassCard>
    </motion.div>
  );
}
