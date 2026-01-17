"use client";

import React, { memo, ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function SectionRevealComponent({ children, className, delay = 0 }: SectionRevealProps) {
  return (
    <motion.div
     style={{ willChange: 'transform, opacity' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const SectionReveal = memo(SectionRevealComponent);
