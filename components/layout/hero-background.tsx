'use client';

import { memo, useEffect, useState, lazy, Suspense, useTransition } from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';

export type AnimationType = 'home' | 'about' | 'services' | 'contact' | 'portfolio';

interface HeroBackgroundProps {
  type: AnimationType;
  showHeavyDelay?: number;
}

// Animation components mapped by page type
const animationComponents = {
  home: {
    primary: lazy(() => import('@/components/animations/cinematic-mesh').then(m => ({ default: m.CinematicMesh }))),
    secondary: [
      lazy(() => import('@/components/animations/lightweight-particles').then(m => ({ default: m.LightweightParticles }))),
      lazy(() => import('@/components/animations/tech-sculpture').then(m => ({ default: m.TechSculpture }))),
    ],
  },
  about: {
    primary: lazy(() => import('@/components/animations/animated-gradient-mesh').then(m => ({ default: m.AnimatedGradientMesh }))),
    secondary: [
      lazy(() => import('@/components/animations/geometric-focal').then(m => ({ default: m.GeometricFocal }))),
    ],
  },
  services: {
    primary: lazy(() => import('@/components/animations/cinematic-mesh').then(m => ({ default: m.CinematicMesh }))),
    secondary: [
      lazy(() => import('@/components/animations/architectural-lines').then(m => ({ default: m.ArchitecturalLines }))),
    ],
  },
  contact: {
    primary: lazy(() => import('@/components/animations/cinematic-mesh').then(m => ({ default: m.CinematicMesh }))),
    secondary: [
      lazy(() => import('@/components/animations/connectivity-orb').then(m => ({ default: m.ConnectivityOrb }))),
    ],
  },
  portfolio: {
    primary: lazy(() => import('@/components/animations/cinematic-mesh').then(m => ({ default: m.CinematicMesh }))),
    secondary: [
      lazy(() => import('@/components/animations/architectural-lines').then(m => ({ default: m.ArchitecturalLines }))),
    ],
  },
};

function HeroBackgroundComponent({ type, showHeavyDelay = 1500 }: HeroBackgroundProps) {
  const [showHeavy, setShowHeavy] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [startTransition, isPending] = useTransition();

  useEffect(() => {
    // 1. Immediate mount state
    setIsMounted(true);

    // 2. Defer heavy animations until after first paint and idle
    const loadHeavy = () => {
      const timer = setTimeout(() => {
        setShowHeavy(true);
      }, showHeavyDelay);
      return () => clearTimeout(timer);
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => loadHeavy());
    } else {
      loadHeavy();
    }
  }, [showHeavyDelay]);

  // Get animations for current page type
  const animations = animationComponents[type];
  const PrimaryAnimation = animations.primary;
  const SecondaryAnimations = animations.secondary;

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 
        LIGHTWEIGHT FALLBACK: 
        Immediate CSS-only background to prevent LCP issues.
        This renders while heavy JS-based animations are loading.
      */}
      <div 
        className="absolute inset-0 bg-background transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 50% -20%, hsl(var(--primary)/0.15) 0%, transparent 70%)',
        }}
      />

      {/* Defer Framer Motion initialization until after mount */}
      {isMounted && (
        <LazyMotion features={domAnimation}>
          {/* Primary animation - loads after mount */}
          <Suspense fallback={null}>
            <PrimaryAnimation />
          </Suspense>

          {/* Secondary animations - load after delay / idle */}
          {showHeavy && (
            <m.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 2 }}
            >
              {SecondaryAnimations.map((SecondaryAnimation, index) => (
                <Suspense key={index} fallback={null}>
                  <SecondaryAnimation />
                </Suspense>
              ))}
            </m.div>
          )}
        </LazyMotion>
      )}

      {/* Gradient overlay - Always present for visual consistency */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
    </div>
  );
}

export const HeroBackground = memo(HeroBackgroundComponent);