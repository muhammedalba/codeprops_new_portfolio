
'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth progress for circle
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Toggle visibility efficiently
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeVisible = latest > 400;
    setIsVisible((prev) =>
      prev !== shouldBeVisible ? shouldBeVisible : prev
    );
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-8 right-8 z-[60] group"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="relative w-14 h-14 rounded-full bg-background/80 backdrop-blur-xl flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300 shadow-2xl shadow-primary/5 active:scale-90"
          >
            {/* Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted/20"
              />
              <motion.circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="1"
                style={{ pathLength: scaleX }}
                className="text-primary"
              />
            </svg>

            <ArrowUp className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
            <div className="absolute inset-2 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
          </button>

          {/* Hover Label */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-1 top-1/4 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold whitespace-nowrap hidden md:block pointer-events-none"
          >
            Back to Top
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
