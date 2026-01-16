'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";

export function InteractiveParticles() {
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
    fpsLimit: 60,
    fullScreen: { enable: false },
    detectRetina: false,

    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "repulse"],
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.25,
          },
        },
        repulse: {
          distance: 120,
          duration: 0.4,






        },
      },
    },

    particles: {
      color: { value: particlesColor },

      links: {
        enable: true,
        color: particlesColor,
        distance: 150,
        opacity: 0.15,
        width: 1,
      },

      move: {
        enable: true,
        speed: 0.6,
        outModes: { default: "bounce" },

        parallax: {
          enable: true,
          force: 20,
          smooth: 10,


        },
      },

      number: {
        density: {
          enable: true,
          area: 800,






        },
        value:
          typeof window !== "undefined" && window.innerWidth < 768
            ? 30
            : 70,
      },

      opacity: {
        value: 0.2,
      },

      size: {
        value: { min: 1, max: 2 },
      },

      shape: { type: "circle" },
    },
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
