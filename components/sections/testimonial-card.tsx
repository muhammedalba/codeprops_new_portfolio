import { Quote } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { GlowEffect } from '@/components/ui/glow-effect';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <article 
      className={`relative flex-shrink-0 w-[90vw] md:w-[45vw] lg:w-[30vw] px-4 ${className}`}
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Hover Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
      <GlassCard className="h-full group">
        {/* Decorative Quote Icon */}
        <Quote 
          className="absolute top-6 right-6 w-12 h-12 text-primary/10" 
          aria-hidden="true"
        />

        {/* Subtle Glow Effect */}
        <GlowEffect 
          color="bg-primary/10"
          size="md"
          className="top-0 right-1/4 opacity-30 group-hover:opacity-100"
        />

        {/* Quote */}
        <blockquote className="relative z-10 mb-8 min-h-[120px]">
          <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed line-clamp-4">
            &quot;{testimonial.quote}&quot;
          </p>
        </blockquote>

        {/* Author Info */}
        <figcaption className="flex items-center gap-4 pt-4 border-t border-border">
          {/* Avatar */}
          <div 
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/20 flex items-center justify-center flex-shrink-0"
            aria-hidden="true"
          >
            <span className="text-base font-bold text-primary">
              {testimonial.name.charAt(0)}
            </span>
          </div>

          <div className="min-w-0">
            <cite className="not-italic font-bold text-foreground text-base block truncate">
              {testimonial.name}
            </cite>
            <p className="text-sm text-muted-foreground truncate">
              {testimonial.role}
            </p>
            <p className="text-xs text-muted-foreground/70 truncate">
              {testimonial.company}
            </p>
          </div>
        </figcaption>
      </GlassCard>
    </article>
  );
}
