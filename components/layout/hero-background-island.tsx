"use client";
import dynamic from "next/dynamic";
import type { AnimationType } from "@/components/layout/hero-background";

const DynamicBackground = dynamic(
  () => import("./hero-background").then((mod) => mod.HeroBackground),
  {
    loading: () => <div className="absolute inset-0 bg-background" style={{ background: 'radial-gradient(circle at 50% -20%, hsl(var(--primary)/0.15) 0%, transparent 70%)' }} />,
    ssr: false,
  }
);

export function HeroBackgroundIsland({ type = "about" }: { type?: AnimationType }) {
  return <DynamicBackground type={type} />;
}
