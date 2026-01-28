"use client";

import { m, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";
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
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed bottom-10 right-6 md:right-12 z-[100]"
        >
          <m.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            {/* Pulsing Glow */}
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-[15px] animate-pulse group-hover:bg-primary/60 transition-colors" />
            
            <Button
              size="lg"
              className="relative h-16 px-8 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-2xl flex items-center gap-3 overflow-hidden border-none"
              onClick={() => window.location.href = '#contact'}
            >
              <MessageSquare size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="hidden md:inline">{label}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
