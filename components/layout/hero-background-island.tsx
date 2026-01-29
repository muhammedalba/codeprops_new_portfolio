"use client";

import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";
import type { AnimationType } from "@/components/layout/hero-background";

const DynamicBackground = dynamic(
  () => import("@/components/layout/hero-background").then((mod) => mod.HeroBackground),
  {
    loading: () => <div className="h-96 animate-pulse bg-muted/20" />,
    ssr: false,
  }
);

export function HeroBackgroundIsland({ type = "about" }: { type?: AnimationType }) {
  return (
    <LazyMotion features={domAnimation}>
      <DynamicBackground type={type} />
    </LazyMotion>
  );
}
