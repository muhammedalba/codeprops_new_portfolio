'use client';

import React, { memo, useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// --- Types ---
type AnimationType = 'home' | 'about' | 'services' | 'contact' | 'portfolio';

interface HeroBackgroundProps {
  type: AnimationType;
  showHeavyDelay?: number;
}

// --- Dynamic Imports (Animations) ---
// We keep these outside to avoid re-creating the dynamic loader
const CinematicMesh = dynamic(() => import('@/components/animations/cinematic-mesh').then(m => m.CinematicMesh), { ssr: false });
const InteractiveParticles = dynamic(() => import('@/components/animations/interactive-particles').then(m => m.InteractiveParticles), { ssr: false });
const TechSculpture = dynamic(() => import('@/components/animations/tech-sculpture').then(m => m.TechSculpture), { ssr: false });
const GeometricFocal = dynamic(() => import('@/components/animations/geometric-focal').then(m => m.GeometricFocal), { ssr: false });
const AnimatedGradientMesh = dynamic(() => import('@/components/animations/animated-gradient-mesh').then(m => m.AnimatedGradientMesh), { ssr: false });
const ArchitecturalLines = dynamic(() => import('@/components/animations/architectural-lines').then(m => m.ArchitecturalLines), { ssr: false });
const ConnectivityOrb = dynamic(() => import('@/components/animations/connectivity-orb').then(m => m.ConnectivityOrb), { ssr: false });

// --- Helper Components ---
const FadeIn = memo(function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
});

// --- Custom Hooks ---

/**
 * Hook to detect low-end devices based on concurrency and memory.
 */
function useIsLowEndDevice() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const hc = (navigator as any).hardwareConcurrency ?? 8;
    const dm = (navigator as any).deviceMemory ?? 8;
    if (hc <= 4 || dm <= 4) {
      setIsLowEnd(true);
    }
  }, []);

  return isLowEnd;
}

// --- Main Component ---

export const HeroBackground = memo(function HeroBackground({
  type,
  showHeavyDelay = 1500,
}: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef as any, { once: true });
  const reduceMotion = useReducedMotion();
  const isLowEndDevice = useIsLowEndDevice();
  
  const [showHeavy, setShowHeavy] = useState(false);

  useEffect(() => {
    if (!isInView || reduceMotion || isLowEndDevice || showHeavy) return;

    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    const triggerShow = () => setShowHeavy(true);

    if ('requestIdleCallback' in window) {
      idleHandle = (window as any).requestIdleCallback(() => {
        timeoutHandle = (window as any).setTimeout(triggerShow, showHeavyDelay);
      });
    } else {
      timeoutHandle = (window as any).setTimeout(triggerShow, showHeavyDelay + 500);
    }

    return () => {
      if (idleHandle !== null) (window as any).cancelIdleCallback(idleHandle);
      if (timeoutHandle !== null) window.clearTimeout(timeoutHandle);
    };
  }, [isInView, reduceMotion, isLowEndDevice, showHeavyDelay, showHeavy]);

  // animations map
  const renderAnimation = () => {
    switch (type) {
      case 'home':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <FadeIn>
                <InteractiveParticles />
                <TechSculpture />
              </FadeIn>
            )}
          </>
        );
      case 'about':
        return (
          <>
            <AnimatedGradientMesh />
            {showHeavy && (
              <FadeIn>
                <GeometricFocal />
              </FadeIn>
            )}
          </>
        );
      case 'services':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <FadeIn>
                <ArchitecturalLines />
              </FadeIn>
            )}
          </>
        );
      case 'contact':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <FadeIn>
                <ConnectivityOrb />
              </FadeIn>
            )}
          </>
        );
      case 'portfolio':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <FadeIn>
                <ArchitecturalLines />
              </FadeIn>
            )}
          </>
        );
      default:
        return <CinematicMesh />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {renderAnimation()}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
});

export default HeroBackground;