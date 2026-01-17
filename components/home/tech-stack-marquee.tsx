// "use client";

// import React, { useEffect, useRef, memo } from "react";

// const TECH_STACK = [
//   "Next.js",
//   "TypeScript",
//   "React Native",
//   "AWS",
//   "Docker",
//   "Kubernetes",
//   "PostgreSQL",
//   "Redis",
//   "Framer Motion",
//   "TailwindCSS"
// ];

// function TechStackMarqueeComponent() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleMouseEnter = () => (container.style.animationPlayState = "paused");
//     const handleMouseLeave = () => (container.style.animationPlayState = "running");

//     container.addEventListener("mouseenter", handleMouseEnter);
//     container.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       container.removeEventListener("mouseenter", handleMouseEnter);
//       container.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   const marqueeContent = [...TECH_STACK, ...TECH_STACK]; // duplicate for seamless loop

//   return (
//     <section className="py-5 my-6 border-y border-border/50 bg-muted/10 relative overflow-hidden">
//       <div className="marquee-mask overflow-hidden relative">
//         <div
//           ref={containerRef}
//           className="marquee-content flex whitespace-nowrap"
//           style={{ "--marquee-duration": "40s" } as React.CSSProperties}
//         >
//           {marqueeContent.map((tech, idx) => (
//             <span
//               key={idx}
//               className="text-2xl md:text-5xl font-black text-foreground/5 uppercase tracking-tighter transition-colors duration-500 cursor-default"
//               style={{
//                 marginRight: "clamp(1rem, 2vw, 4rem)" // المسافة ديناميكية بين الكلمات
//               }}
//             >
//               {tech}
//             </span>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .marquee-mask {
//           mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
//           -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
//         }

//         .marquee-content {
//           display: flex;
//           animation: marquee var(--marquee-duration) linear infinite;
//           will-change: transform;
//         }

//         @keyframes marquee {
//           0% {
//             transform: translate3d(0, 0, 0);
//           }
//           100% {
//             transform: translate3d(-50%, 0, 0);
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

// export const TechStackMarquee = memo(TechStackMarqueeComponent);
