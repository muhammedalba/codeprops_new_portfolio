'use client';

export default function CinematicMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base Deep Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Primary Atmospheric Glow - Pure CSS Animation */}
      <div
        className="absolute w-[120vw] h-[100vh] rounded-[100%] blur-[120px] opacity-[0.12] animate-[drift_25s_ease-in-out_infinite]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary)) 0%, transparent 70%)',
          top: '-20%',
          left: '-10%',
        }}
      />

      {/* Secondary Soft Accent - Pure CSS Animation */}
      <div
        className="absolute w-[100vw] h-[80vh] rounded-[100%] blur-[100px] opacity-[0.08] animate-[drift-reverse_20s_ease-in-out_infinite_2s]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--accent-secondary)) 0%, transparent 70%)',
          bottom: '-10%',
          right: '-5%',
        }}
      />

      {/* Deep Shadow Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background" />

      {/* High-End Film Grain / Noise - Lightweight SVG */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Precision Micro-Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)/0.1) 1px, transparent 1px), 
                           linear-gradient(to bottom, hsl(var(--foreground)/0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        }}
      />
    </div>
  );
}
