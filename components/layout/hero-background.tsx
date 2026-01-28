'use client';

import { memo, useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
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

function HeroBackgroundComponent({ type, showHeavyDelay = 1500 }: HeroBackgroundProps) {
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
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <InteractiveParticles />
                <TechSculpture />
              </m.div>
            )}
          </>
        );
      case 'about':
        return (
          <>
            <AnimatedGradientMesh />
            {showHeavy && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <GeometricFocal />
              </m.div>
            )}
          </>
        );
      case 'services':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <ArchitecturalLines />
              </m.div>
            )}
          </>
        );
      case 'contact':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <ConnectivityOrb />
              </m.div>
            )}
          </>
        );
      case 'portfolio':
        return (
          <>
            <CinematicMesh />
            {showHeavy && (
              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <ArchitecturalLines />
              </m.div>
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
export const HeroBackground = memo(HeroBackgroundComponent);