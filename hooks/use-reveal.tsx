'use client';

import React, { useEffect, useState, useRef, ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

/**
 * Shared IntersectionObserver instance to avoid multiple observers.
 */
let sharedObserver: IntersectionObserver | null = null;
const observersMap = new Map<Element, (inView: boolean) => void>();

function getSharedObserver() {
  if (typeof window === 'undefined') return null;
  
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = observersMap.get(entry.target);
        if (callback && entry.isIntersecting) {
          callback(true);
          // Auto-unobserve after it's in view
          sharedObserver?.unobserve(entry.target);
          observersMap.delete(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05
    });
  }
  return sharedObserver;
}

export function useInView() {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = getSharedObserver();
    if (observer) {
      observersMap.set(el, setIsInView);
      observer.observe(el);
    }

    return () => {
      if (el) {
        sharedObserver?.unobserve(el);
        observersMap.delete(el);
      }
    };
  }, []);

  return { isInView, ref: elementRef };
}

interface RevealBaseProps {
  children: ReactNode;
  animation?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number; // In seconds
  className?: string;
}

type RevealProps<T extends ElementType> = RevealBaseProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof RevealBaseProps | 'as'>;

/**
 * State-based Reveal component for hydration-safe animations.
 */
export function Reveal<T extends React.ElementType = 'div'>({ 
  children, 
  animation = 'up', 
  delay = 0, 
  className = "", 
  as,
  ...props
}: RevealProps<T>) {
  const { isInView, ref } = useInView();
  const Component = (as || 'div') as React.ElementType;
  
  const animationClass = animation === 'fade' ? 'reveal' : `reveal reveal--${animation}`;
  
  return (
    <Component
      ref={ref}
      className={`${animationClass} ${isInView ? 'reveal--active' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...props?.style } as React.CSSProperties}
      {...props}
    >
      {children}
    </Component>
  );
}
