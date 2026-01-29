
import { useMemo, memo } from "react";
import { TestimonialCard, type Testimonial } from "./testimonial-card";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionReveal } from "../animations/section-reveal";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  title: string;
  subtitle: string;
  autoScrollSpeed?: number;
  className?: string;
}

function TestimonialsCarouselComponent({
  testimonials,
  title,
  subtitle,   
  autoScrollSpeed = 40,
  className = "",
}: TestimonialsCarouselProps) {
  // We double the list to ensure seamless looping
  const loopItems = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials, ...testimonials],
    [testimonials]
  );
  
  // Calculate speed duration based on content length
  // speed = distance / time => time = distance / speed
  // approximate width of a card + gap = 400px
  const duration = useMemo(() => {
    // Adjust logic: autoScrollSpeed was pixels/frame or similar. 
    // Let's standardise: default 40s for ~5 items.
    // If we have more items, we need more time to keep same speed.
    const baseTime = autoScrollSpeed; 
    return (testimonials.length / 5) * baseTime;
  }, [testimonials.length, autoScrollSpeed]);

  return (
    <SectionReveal>
      <section
        className={`py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden ${className}`}
      >
        <div className="container mx-auto px-6 mb-16">
          <SectionHeader badge={title} title={subtitle} />
        </div>

        <div className="scroller" style={{ "--gap": "1.5rem", "--speed": `${duration}s` } as React.CSSProperties}>
          <div className="scroller__inner">
            {loopItems.map((item: Testimonial, idx: number) => (
              <TestimonialCard key={`${item.name}-${idx}`} testimonial={item} />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}

export const TestimonialsCarousel = memo(TestimonialsCarouselComponent);
