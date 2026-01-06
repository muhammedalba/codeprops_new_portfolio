'use client';

import { motion } from 'framer-motion';

export function GeometricFocal() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main Geometric Shape - Abstract 3D Cube */}
      <motion.div
        className="absolute right-[5%] top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative w-[450px] h-[450px]" style={{ perspective: '1000px' }}>
          {/* Rotating Container */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotateY: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Face */}
            <div
              className="absolute inset-0 border border-primary/20 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--primary) / 0.02) 100%)',
                transform: 'translateZ(100px)',
              }}
            />
            
            {/* Back Face */}
            <div
              className="absolute inset-0 border border-primary/15 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.03) 0%, hsl(var(--primary) / 0.01) 100%)',
                transform: 'translateZ(-100px) rotateY(180deg)',
              }}
            />

            {/* Right Face */}
            <div
              className="absolute inset-0 border border-primary/15 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.04) 0%, hsl(var(--primary) / 0.01) 100%)',
                transform: 'rotateY(90deg) translateZ(100px)',
              }}
            />

            {/* Left Face */}
            <div
              className="absolute inset-0 border border-primary/15 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.04) 0%, hsl(var(--primary) / 0.01) 100%)',
                transform: 'rotateY(-90deg) translateZ(100px)',
              }}
            />
          </motion.div>

          {/* Accent Lines */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </motion.div>

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${15 + (i * 8)}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Code-Inspired Elements */}
      <motion.div
        className="absolute left-[10%] top-[20%] font-mono text-xs text-primary/20 select-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {'<code>'}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[12%] bottom-[25%] font-mono text-xs text-primary/20 select-none"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          {'</code>'}
        </motion.div>
      </motion.div>
    </div>
  );
}
