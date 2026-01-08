'use client';

import { motion } from 'framer-motion';

export function TechSculpture() {
  return (
    <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex items-center justify-center lg:justify-end lg:pr-[8%] overflow-hidden">
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center opacity-50  transition-opacity duration-1000">
        {/* Layered Technical Rings - Representing Stack Layers */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-[20%] border border-primary/15"
            style={{
              width: `${100 - i * 18}%`,
              height: `${100 - i * 18}%`,
              background: `linear-gradient(${45 + i * 45}deg, hsl(var(--primary)/${0.04 - i * 0.01}), transparent)`,
              backdropFilter: i === 0 ? 'blur(2px)' : 'none',
              zIndex: 10 - i,
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: i * 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: i * 10 + 5,
              y: [0, -10 - i * 5, 0] 
            }}
            transition={{ 
              opacity: { duration: 2, delay: 0.5 + i * 0.3 },
              scale: { duration: 2, delay: 0.5 + i * 0.3, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 20 + i * 10, repeat: Infinity, ease: 'linear' },
              y: { duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        ))}

        {/* Central Core Unit */}
        <motion.div
          className="relative z-20 w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-primary/20 bg-background/40 flex items-center justify-center overflow-hidden"
          style={{
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 60px -15px hsl(var(--primary)/0.2)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Internal Pulse */}
          <motion.div 
            className="absolute inset-0 bg-primary/5"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <div className="font-mono text-[8px] md:text-[10px] text-primary/60 leading-tight select-none">
            <span className="text-primary/80">CORE_V1.5</span><br/>
            STATUS: OK<br/>
            UPTIME: 99.9%
          </div>
        </motion.div>

        {/* Dynamic Data Streams */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const dist = 140 + (i % 2) * 50;
          return (
            <motion.div
              key={`stream-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
              style={{
                top: `${Math.sin(angle) * dist + (300)}px`,
                left: `${Math.cos(angle) * dist + (300)}px`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0.4],
                scale: [0.5, 1.2, 0.8],
              }}
              transition={{ 
                opacity: { duration: 1.5, delay: 1.5 + i * 0.2 },
                duration: 5,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              {/* Radial Glow */}
              <div className="absolute inset-0 blur-[4px] bg-primary/40 rounded-full" />
              
              {/* Connection Orbitals */}
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none overflow-visible">
                <motion.circle
                  cx="0" cy="0"
                  r={dist}
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/5"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 2 }}
                />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
