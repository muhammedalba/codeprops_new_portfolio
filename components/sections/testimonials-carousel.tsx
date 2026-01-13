'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TestimonialCard, type Testimonial } from './testimonial-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  title: string;
  subtitle: string;
  autoScrollSpeed?: number;
  className?: string;
}

export function TestimonialsCarousel({
  testimonials,
  title,
  subtitle,
  autoScrollSpeed = 40,
  className = '',
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

  // لضمان عدم حدوث فراغات، نقوم بتكرار المصفوفة عدة مرات
  // 6 مرات كافية جداً لتغطية أي شاشة مهما كان عدد التقييمات قليلاً
  const loopItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector('article');
    if (!firstCard) return;

    const cardRect = firstCard.getBoundingClientRect();
    const gap = 24; // gap-6 (6 * 4px)
    
    cardWidthRef.current = cardRect.width + gap;
    totalWidthOfOneSetRef.current = cardWidthRef.current * testimonials.length;
    
    if (!isInitialized.current) {
      // نبدأ من نقطة مدروسة في المنتصف لتجنب أي حواف
      scrollPosRef.current = -totalWidthOfOneSetRef.current * 2;
      trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;
      isInitialized.current = true;
    }
  }, [testimonials.length]);

  useEffect(() => {
    // القياس الأولي بعد رندر البطاقات
    const timer = setTimeout(measure, 200);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const animate = useCallback((timestamp: number) => {
    if (!trackRef.current || isPaused || !isInitialized.current) {
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
    const delta = timestamp - lastTimestampRef.current;
    lastTimestampRef.current = timestamp;

    // التحريك المستمر لليسار
    scrollPosRef.current -= (autoScrollSpeed * delta) / 1000;

    // نظام الـ Reset الصامت:
    // إذا تجاوزنا المجموعة الثانية، نعود للخلف بمقدار مجموعة واحدة لإيجاد استمرارية
    if (Math.abs(scrollPosRef.current) >= totalWidthOfOneSetRef.current * 3) {
      scrollPosRef.current += totalWidthOfOneSetRef.current;
    }

    trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isPaused, autoScrollSpeed]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate]);

  const moveNext = () => {
    if (!trackRef.current || !isInitialized.current) return;
    setIsPaused(true);
    
    // التحريك لليسار (التالي)
    scrollPosRef.current -= cardWidthRef.current;

    // تطبيق الانتقال السلس
    trackRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;

    // العودة للوضع الطبيعي بعد الانتهاء
    setTimeout(() => {
      if (trackRef.current) trackRef.current.style.transition = 'none';
      setIsPaused(false);
    }, 600);
  };

  const movePrev = () => {
    if (!trackRef.current || !isInitialized.current) return;
    setIsPaused(true);

    // التحريك لليمين (السابق)
    scrollPosRef.current += cardWidthRef.current;

    trackRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    trackRef.current.style.transform = `translate3d(${scrollPosRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (trackRef.current) trackRef.current.style.transition = 'none';
      setIsPaused(false);
    }, 600);
  };

  return (
    <section className={`py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden ${className}`}>
      <div className="container mx-auto px-6 mb-16">
        <SectionHeader 
          badge={title}
          title={subtitle}
        />
      </div>

      <div 
        ref={containerRef}
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* حواف مظللة للتلاشي */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div 
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          {loopItems.map((item, idx) => (
            <TestimonialCard 
              key={`${item.name}-${idx}`} 
              testimonial={item} 
            />
          ))}
        </div>

        {/* أزرار التحكم - اتجاهات ثابتة */}
        <button
          onClick={movePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-md border border-border/50 text-foreground shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={moveNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-md border border-border/50 text-foreground shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 md:opacity-0"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
