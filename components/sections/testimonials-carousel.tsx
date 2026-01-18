"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { TestimonialCard, type Testimonial } from "./testimonial-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // تتبع الموضع الحالي بدقة عالية
  const scrollPosRef = useRef(0);
  const lastTimestampRef = useRef(0);

  // مقاييس الوحدات
  const cardWidthRef = useRef(0);
  const totalWidthOfOneSetRef = useRef(0);
  const isInitialized = useRef(false);
  const isRTL = useRef(false);

  // To ensure no gaps, we repeat the array 3 times instead of 6 (which was overkill)
  const loopItems = useMemo(
    () => [
      ...testimonials,
      ...testimonials,
      ...testimonials,
      ...testimonials,
      ...testimonials,
      ...testimonials,
      ...testimonials,
    ],
    [testimonials],
  );

  const measure = useCallback(() => {
    if (!trackRef.current) return;

    // اكتشاف الاتجاه (RTL vs LTR)
    isRTL.current =
      window.getComputedStyle(trackRef.current).direction === "rtl";

    const firstCard = trackRef.current.querySelector("article");
    if (!firstCard) return;

    const cardRect = firstCard.getBoundingClientRect();
    const gap = 24; // gap-6 (6 * 4px)

    cardWidthRef.current = cardRect.width + gap;
    totalWidthOfOneSetRef.current = cardWidthRef.current * testimonials.length;

    if (!isInitialized.current) {
      // في LTR نتحرك لليسار بسالب، في RTL نتحرك لليسار (مادياً) ولكن المرجعية تختلف
      // لتجنب القفزات، نبدأ من موضع يعادل مجموعتين
      scrollPosRef.current = isRTL.current
        ? totalWidthOfOneSetRef.current * 2
        : -totalWidthOfOneSetRef.current * 2;

      trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;
      isInitialized.current = true;
    }
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setTimeout(measure, 200);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const animate = useCallback(
    (timestamp: number) => {
      if (!trackRef.current || isPaused || !isInitialized.current) {
        lastTimestampRef.current = timestamp;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const delta = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      // سرعة التحريك
      const step = (autoScrollSpeed * delta) / 1000;

      if (isRTL.current) {
        // في RTL، التحرك "لليسار" يعني زيادة الـ X (لأن نقطة الصفر على اليمين)
        // ولكن لكي يبدو التحريك مستمراً بنفس الاتجاه البصري:
        scrollPosRef.current += step;
        if (scrollPosRef.current >= totalWidthOfOneSetRef.current * 3) {
          scrollPosRef.current -= totalWidthOfOneSetRef.current;
        }
      } else {
        // في LTR، التحرك لليسار يعني تقليل الـ X
        scrollPosRef.current -= step;
        if (
          Math.abs(scrollPosRef.current) >=
          totalWidthOfOneSetRef.current * 3
        ) {
          scrollPosRef.current += totalWidthOfOneSetRef.current;
        }
      }

      trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [isPaused, autoScrollSpeed],
  );

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate]);

  const moveNext = () => {
    if (!trackRef.current || !isInitialized.current) return;
    setIsPaused(true);

    // "التالي" بصرياً هو دائماً لليسار
    scrollPosRef.current += isRTL.current
      ? cardWidthRef.current
      : -cardWidthRef.current;

    trackRef.current.style.transition =
      "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (trackRef.current) trackRef.current.style.transition = "none";
      setIsPaused(false);
    }, 600);
  };

  const movePrev = () => {
    if (!trackRef.current || !isInitialized.current) return;
    setIsPaused(true);

    // "السابق" بصرياً هو دائماً لليمين
    scrollPosRef.current += isRTL.current
      ? -cardWidthRef.current
      : cardWidthRef.current;

    trackRef.current.style.transition =
      "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (trackRef.current) trackRef.current.style.transition = "none";
      setIsPaused(false);
    }, 600);
  };

  return (
    <SectionReveal>
      <section
        className={`py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden ${className}`}
      >
        <div className="container mx-auto px-6 mb-16">
          <SectionHeader badge={title} title={subtitle} />
        </div>

        <div
          ref={containerRef}
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* حواف مظللة للتلاشي - تدعم الاتجاهين */}
          <div className="absolute blur-[25px] left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute blur-[25px] right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform"
            // style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {loopItems.map((item: Testimonial, idx: number) => (
              <TestimonialCard key={`${item.name}-${idx}`} testimonial={item} />
            ))}
          </div>

          {/* أزرار التحكم - أماكن ثابتة بصرياً (يسار ويمين الشاشة) */}
          <button
            onClick={isRTL.current ? moveNext : movePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-md border border-border/50 text-foreground shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={isRTL.current ? movePrev : moveNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-md border border-border/50 text-foreground shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </section>
    </SectionReveal>
  );
}

export const TestimonialsCarousel = memo(TestimonialsCarouselComponent);
