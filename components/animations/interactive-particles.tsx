'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";

export default function InteractiveParticles() {
  const [init, setInit] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesColor = useMemo(() => {
    const currentTheme = resolvedTheme || theme;
    return currentTheme === "dark" ? "#3b82f6" : "#2563eb";
  }, [theme, resolvedTheme]);

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60, // Limit FPS to save CPU/GPU
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 120,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: { value: particlesColor },
        links: {
          color: particlesColor,
          distance: 150,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6, // Slower speed = less CPU
          outModes: { default: "bounce" },
        },
        number: {
          density: {
            enable: true,
            area: 800, // Better density control
          },
          value: typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 70, // Drastically reduce on mobile
        },
        opacity: {
          value: 0.2, // Lower opacity looks more premium and requires less blending
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: false, // Turn off retina detection for performance boost
      fullScreen: { enable: false },
    }),
    [particlesColor]
  );

  if (!init) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Particles
        id="tsparticles"
        options={options}
        className="h-full w-full"
      />
    </div>
  );
}
