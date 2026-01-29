'use client';

import { memo, useEffect, useState, lazy, Suspense } from 'react';
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

  useEffect(() => {
    const timer = setTimeout(() => setShowHeavy(true), showHeavyDelay);
    return () => clearTimeout(timer);
  }, [showHeavyDelay]);

  // Get animations for current page type
  const animations = animationComponents[type];
  const PrimaryAnimation = animations.primary;
  const SecondaryAnimations = animations.secondary;

  return (
    <LazyMotion features={domAnimation}>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Primary animation - loads immediately */}
        <Suspense fallback={null}>
          <PrimaryAnimation />
        </Suspense>

        {/* Secondary animations - load after delay */}
        {showHeavy && (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            {SecondaryAnimations.map((SecondaryAnimation, index) => (
              <Suspense key={index} fallback={null}>
                <SecondaryAnimation />
              </Suspense>
            ))}
          </m.div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
      </div>
    </LazyMotion>
  );
}

export const HeroBackground = memo(HeroBackgroundComponent);