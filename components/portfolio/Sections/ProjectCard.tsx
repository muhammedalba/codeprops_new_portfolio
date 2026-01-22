"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  result: string;
  image: string;
  problem: string;
  solution: string;
  link: string;
  tech: string[];
}
interface Translations {
  viewProject: string;
}

function ProjectCardComponent({
  project,
  index,
  locale,
  translations,
}: {
  project: Project;
  index: number;
  locale: string;
  translations: Translations;
}) {
  const isOdd = index % 2 === 1;
  const baseUrl =process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
  const imageSrc =project.image==''? `${baseUrl}/images/default.webp`:project.image;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className={cn("space-y-10", isOdd ? "md:order-2" : "md:order-1")}>
          <div className="flex items-center gap-4">
            <span className="text-primary font-mono text-xs font-bold uppercase tracking-[0.3em]">
              Case Study 0{index + 1}
            </span>
            <div className="h-px w-12 bg-primary/20" />
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
              {project.category}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            {project.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-muted/50 border border-border/50 backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                Technical Result
              </div>
              <div className="text-lg font-bold">{project.result}</div>
            </div>

            <div className="p-6 rounded-3xl bg-muted/50 border border-border/50 backdrop-blur-sm">
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                Technical Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-background border border-border text-[9px] font-bold font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Link
            href={`/${locale}/portfolio/${project.slug}`}
            className="inline-flex items-center gap-6 text-xl font-bold group/link"
            aria-label={`View project ${project.title}`}
          >
            <span className="relative">
              {translations.viewProject}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-500" />
            </span>
            <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover/link:bg-primary group-hover/link:border-primary transition-all duration-500">
              <ArrowUpRight className="w-6 h-6 group-hover/link:text-primary-foreground transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* Image / Decorative Section */}
        <div
          className={cn(
            "relative aspect-[1.1/1] rounded-[4rem] bg-muted overflow-hidden border border-border shadow-2xl group/img",
            isOdd ? "md:order-1" : "md:order-2",
          )}
        >
          <Image priority={true} fill={true}  src={imageSrc} alt={project.title} />
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent-secondary/5" />
          <div className="absolute inset-0 opacity-[0.05] select-none pointer-events-none font-black text-[12vw] flex items-center justify-center uppercase tracking-tighter rotate-12">
            {project.slug.split("-")[0]}
          </div>

          {/* Animated Glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/4 -right-1/4 w-full h-full bg-primary rounded-full blur-[120px] pointer-events-none will-change-transform"
          />

          {/* Center Preview */}
          <div className="absolute inset-12 rounded-[2.5rem] bg-background/40 backdrop-blur-md border border-white/10 shadow-inner flex items-center justify-center opacity-100 transition-opacity duration-500 hover:opacity-0">
          
            <div className="text-center p-8">
              <div className="text-primary/20 mb-4 flex justify-center">
                <ArrowUpRight size={80} strokeWidth={0.5} />
              </div>
              <div className="text-sm font-mono font-bold tracking-[0.4em] opacity-50 uppercase">
                Architecture Preview
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <Link target="_blank" hrefLang={locale} href={project.link} className="absolute inset-0 translate-y-full group-hover/img:translate-y-0 bg-primary/50 transition-transform duration-700 flex items-center justify-center p-20 text-center">
            <p className="text-primary-foreground text-2xl font-bold italic leading-tight">
              "Innovating the core of {project.category} systems."
            </p>
          </Link>
        </div>
      </div>
    </motion.div> 
  );
}
// Memoized Project Card
export const ProjectCard = React.memo(ProjectCardComponent);
