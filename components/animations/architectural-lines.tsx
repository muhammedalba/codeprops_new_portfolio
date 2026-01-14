'use client';

import { motion } from 'framer-motion';

export function ArchitecturalLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Moving Vertical Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{ left: `${20 * i + 10}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Moving Horizontal Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{ top: `${20 * i + 15}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Blueprint Square */}
      <motion.div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 1, rotate: 10 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />
        
        {/* Internal Cross */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-primary/10" />
      </motion.div>

      {/* Floating Tech Dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
