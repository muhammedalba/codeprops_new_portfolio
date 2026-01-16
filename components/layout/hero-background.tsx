// 'use client';

// import React, { memo, useEffect, useState, useRef } from 'react';
// import dynamic from 'next/dynamic';
// import { motion, useInView, useReducedMotion } from 'framer-motion';

// // --- Types ---
// type AnimationType = 'home' | 'about' | 'services' | 'contact' | 'portfolio';

// interface HeroBackgroundProps {
//   type: AnimationType;
//   showHeavyDelay?: number;
// }

// // --- Dynamic Imports (Light) ---
// const CinematicMesh = dynamic(
//   () => import('@/components/animations/cinematic-mesh').then((m) => m.CinematicMesh),
//   { ssr: false }
// );
// const AnimatedGradientMesh = dynamic(
//   () => import('@/components/animations/animated-gradient-mesh').then((m) => m.AnimatedGradientMesh),
//   { ssr: false }
// );

// // --- Dynamic Imports (Heavy) ---
// const InteractiveParticles = dynamic(
//   () => import('@/components/animations/interactive-particles').then((m) => m.InteractiveParticles),
//   { ssr: false }
// );
// const TechSculpture = dynamic(
//   () => import('@/components/animations/tech-sculpture').then((m) => m.TechSculpture),
//   { ssr: false }
// );
// const GeometricFocal = dynamic(
//   () => import('@/components/animations/geometric-focal').then((m) => m.GeometricFocal),
//   { ssr: false }
// );
// const ArchitecturalLines = dynamic(
//   () => import('@/components/animations/architectural-lines').then((m) => m.ArchitecturalLines),
//   { ssr: false }
// );
// const ConnectivityOrb = dynamic(
//   () => import('@/components/animations/connectivity-orb').then((m) => m.ConnectivityOrb),
//   { ssr: false }
// );

// // --- Maps ---
// // تعريف المكونات المركبة خارج الخريطة لتجنب إعادة التعريف عند كل استخدام
// const HomeHeavyComponents = () => (
//   <>
//     <InteractiveParticles />
//     <TechSculpture />
//   </>
// );

// const LIGHT_MAP: Record<AnimationType, React.ComponentType<any>> = {
//   home: CinematicMesh,
//   about: AnimatedGradientMesh,
//   services: CinematicMesh,
//   contact: CinematicMesh,
//   portfolio: CinematicMesh,
// };

// const HEAVY_MAP: Record<AnimationType, React.ComponentType<any> | null> = {
//   home: HomeHeavyComponents,
//   about: GeometricFocal,
//   services: ArchitecturalLines,
//   contact: ConnectivityOrb,
//   portfolio: ArchitecturalLines,
// };

// // --- Helper Components ---
// const FadeIn = memo(function FadeIn({ children }: { children: React.ReactNode }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.2, ease: 'easeOut' }}
//     >
//       {children}
//     </motion.div>
//   );
// });

// // --- Custom Hooks ---

// /**
//  * Hook to detect low-end devices based on concurrency and memory.
//  * Returns `true` initially to be safe during SSR/Hydration, then updates on client.
//  */
// function useIsLowEndDevice() {
//   const [isLowEnd, setIsLowEnd] = useState(false);

//   useEffect(() => {
//     if (typeof navigator === 'undefined') return;

//     // Default to high-end if API is missing, or check specific limits
//     const hc = navigator.hardwareConcurrency ?? 8;
//     // @ts-ignore - deviceMemory is non-standard but supported in some browsers
//     const dm = navigator.deviceMemory ?? 8;

//     if (hc <= 4 || dm <= 4) {
//       setIsLowEnd(true);
//     }
//   }, []);

//   return isLowEnd;
// }

// // --- Main Component ---

// export const HeroBackground = memo(function HeroBackground({
//   type,
//   showHeavyDelay = 1500,
// }: HeroBackgroundProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(containerRef, { once: true });
//   const reduceMotion = useReducedMotion();
//   const isLowEndDevice = useIsLowEndDevice();
  
//   const [showHeavy, setShowHeavy] = useState(false);

//   useEffect(() => {
//     // شروط الإلغاء المبكر
//     if (!isInView || reduceMotion || isLowEndDevice || showHeavy) return;

//     let idleHandle: number | null = null;
//     let timeoutHandle: number | null = null;

//     const triggerShow = () => setShowHeavy(true);

//     // استخدام requestIdleCallback إذا كان متاحاً لجدولة التايمر
//     if ('requestIdleCallback' in (window as any)) {
//       idleHandle = (window as any).requestIdleCallback(() => {
//         timeoutHandle = window.setTimeout(triggerShow, showHeavyDelay);
//       });
//     } else {
//       // Fallback للمتصفحات القديمة (Safari)
//       timeoutHandle = window.setTimeout(triggerShow, showHeavyDelay + 500);
//     }

//     return () => {
//       if (idleHandle !== null && 'cancelIdleCallback' in window) {
//         (window as any).cancelIdleCallback(idleHandle);
//       }
//       if (timeoutHandle !== null) {
//         window.clearTimeout(timeoutHandle);
//       }
//     };
//   }, [isInView, reduceMotion, isLowEndDevice, showHeavyDelay, showHeavy]);

//   // إذا كان الجهاز ضعيفاً أو يطلب تقليل الحركة، لا نعرض شيئاً (أو نعرض الخلفية فقط حسب التصميم)
//   // ملاحظة: الكود الأصلي كان يعيد null، وهذا يحافظ على نفس السلوك
//   if (reduceMotion || isLowEndDevice) return null;

//   const LightComponent = LIGHT_MAP[type];
//   const HeavyComponent = HEAVY_MAP[type];

//   return (
//     <div
//       ref={containerRef}
//       className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
//       aria-hidden="true"
//     >
//       {/* Light layer (LCP Optimized) */}
//       {LightComponent && <LightComponent />}

//       {/* Heavy layer (Lazy Loaded) */}
//       {showHeavy && HeavyComponent && (
//         <FadeIn>
//           <HeavyComponent />
//         </FadeIn>
//       )}

//       {/* Overlay gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
//     </div>
//   );
// });

// export default HeroBackground;
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const CinematicMesh = dynamic(() => import('@/components/animations/cinematic-mesh').then(m => m.CinematicMesh), { ssr: false });
const InteractiveParticles = dynamic(() => import('@/components/animations/interactive-particles').then(m => m.InteractiveParticles), { ssr: false });
const TechSculpture = dynamic(() => import('@/components/animations/tech-sculpture').then(m => m.TechSculpture), { ssr: false });
const GeometricFocal = dynamic(() => import('@/components/animations/geometric-focal').then(m => m.GeometricFocal), { ssr: false });
const AnimatedGradientMesh = dynamic(() => import('@/components/animations/animated-gradient-mesh').then(m => m.AnimatedGradientMesh), { ssr: false });
const ArchitecturalLines = dynamic(() => import('@/components/animations/architectural-lines').then(m => m.ArchitecturalLines), { ssr: false });
const ConnectivityOrb = dynamic(() => import('@/components/animations/connectivity-orb').then(m => m.ConnectivityOrb), { ssr: false });

type AnimationType = 'home' | 'about' | 'services' | 'contact' | 'portfolio';

interface HeroBackgroundProps {
  type: AnimationType;
  showHeavyDelay?: number;
}

export function HeroBackground({ type, showHeavyDelay = 1500 }: HeroBackgroundProps) {
  const [showHeavy, setShowHeavy] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHeavy(true), showHeavyDelay);
    return () => clearTimeout(timer);
  }, [showHeavyDelay]);

  const renderAnimation = () => {
    switch (type) {
      case 'home':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <InteractiveParticles />
                <TechSculpture />
              </motion.div>
            )}
          </>
        );
      case 'about':
        return (
          <>
            <AnimatedGradientMesh />
            {showHeavy && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <GeometricFocal />
              </motion.div>
            )}
          </>
        );
      case 'services':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <ArchitecturalLines />
              </motion.div>
            )}
          </>
        );
      case 'contact':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <ConnectivityOrb />
              </motion.div>
            )}
          </>
        );
      case 'portfolio':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <ArchitecturalLines />
              </motion.div>
            )}
          </>
        );
      default:
        return <CinematicMesh />;
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {renderAnimation()}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}