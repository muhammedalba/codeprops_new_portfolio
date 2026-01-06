'use client';

import { motion } from 'framer-motion';

interface MaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function MaskReveal({ children, delay = 0, className = "" }: MaskRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Quintic ease-out
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
