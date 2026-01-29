'use client';


export function TechSculpture() {
  return (
    <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex items-center justify-center lg:justify-end lg:pr-[8%] overflow-hidden">
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] flex items-center justify-center opacity-50">
        {/* Layered Technical Rings */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-[20%] border border-primary/20 animate-[spin_var(--duration)_linear_infinite,float_var(--float-duration)_ease-in-out_infinite]"
            style={{
              width: `${100 - i * 18}%`,
              height: `${100 - i * 18}%`,
              background: `linear-gradient(${45 + i * 45}deg, hsl(var(--primary)/${0.04 - i * 0.01}), transparent)`,
              backdropFilter: i === 0 ? 'blur(2px)' : 'none',
              zIndex: 10 - i,
              // @ts-expect-error CSS variable support in style object
              '--duration': `${20 + i * 10}s`,
              '--float-duration': `${8 + i}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Central Core Unit */}
        <div
          className="relative z-20 w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-primary/20 bg-background/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_60px_-15px_hsl(var(--primary)/0.2)] animate-[fade-in_1.2s_ease-out_forwards]"
        >
          {/* Internal Pulse */}
          <div className="absolute inset-0 bg-primary/5 animate-pulse" />
          
          <div className="font-mono text-[8px] md:text-[10px] text-primary/60 leading-tight select-none">
            <span className="text-primary/80">CORE_V1.5</span><br/>
            STATUS: OK<br/>
            UPTIME: 99.9%
          </div>
        </div>

        {/* Dynamic Data Streams - Simplified for CSS */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const dist = 140 + (i % 2) * 50;
          return (
            <div
              key={`stream-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary opacity-0 animate-[fade-in_1s_ease-out_forwards]"
              style={{
                top: `${Math.sin(angle) * dist + (250)}px`,
                left: `${Math.cos(angle) * dist + (250)}px`,
                animationDelay: `${1.5 + i * 0.2}s`
              }}
            >
              <div className="absolute inset-0 blur-[4px] bg-primary/40 rounded-full animate-pulse" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
