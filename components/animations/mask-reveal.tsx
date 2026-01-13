'use client';

interface MaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function MaskReveal({ children, delay = 0, className = "" }: MaskRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div 
        className="animate-[reveal-up_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] translate-y-full opacity-0 [animation-delay:var(--delay)]"
        style={{ '--delay': `${delay}s` } as React.CSSProperties}
      >
        <div className="opacity-100">
          {children}
        </div>
      </div>
    </div>
  );
}
