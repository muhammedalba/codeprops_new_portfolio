'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth out the progress value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolled more than 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-[60] group"
        >
          <button
            onClick={scrollToTop}
            className="relative w-14 h-14 rounded-full bg-background/80 backdrop-blur-xl border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300 shadow-2xl shadow-primary/5 active:scale-90"
            aria-label="Scroll to top"
          >
            {/* SVG Progress Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              {/* Background Circle */}
              <circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted/20"
              />
              {/* Progress Circle path */}
              <motion.circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="1"
                style={{ 
                  pathLength: scaleX,
                  color: 'var(--primary)' 
                }}
                className="text-primary"
              />
            </svg>

            <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
            
            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-2 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
          </button>
          
          {/* Label appearing on hover */}
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold whitespace-nowrap hidden md:block pointer-events-none"
          >
            Back to Top
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
