"use client";

import { MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface InstantCTAProps {
  label: string;
}

export function InstantCTA({ label }: InstantCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-10 right-6 md:right-12 z-[100] transition-all duration-700 ease-in-out",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-32 pointer-events-none"
      )}
    >
      <div className="group relative">
        {/* Pulsing Glow */}
        <div className="absolute inset-0 bg-primary/40 rounded-full blur-[15px] animate-pulse group-hover:bg-primary/60 transition-colors" />
        
        <Button
          size="lg"
          className="relative h-16 px-8 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-2xl flex items-center gap-3 overflow-hidden border-none transition-transform duration-300 active:scale-95 hover:scale-105"
          onClick={() => window.location.href = '#contact'}
        >
          <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="hidden md:inline">{label}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Button>
      </div>
    </div>
  );
}
