"use client";

import React, { memo, ReactNode } from "react";
import { Reveal } from "@/hooks/use-reveal";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function SectionRevealComponent({ children, className, delay = 0 }: SectionRevealProps) {
  return (
    <Reveal
      animation="up"
      delay={delay}
      className={className}
    >
      {children}
    </Reveal>
  );
}

export const SectionReveal = memo(SectionRevealComponent);
