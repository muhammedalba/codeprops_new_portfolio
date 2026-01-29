"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { BotIcon, XIcon } from "@/components/ui/inline-icons";
import { m, AnimatePresence, useReducedMotion, LazyMotion, domAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatbotIconProps {
  isOpen: boolean;
  onClick: () => void;
  translations?: any;
  direction?: string;
}

const welcomeVariants = {
  initial: { opacity: 0, y: 10, scale: 0.9, x: -10 },
  animate: { opacity: 1, y: 0, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.9, x: -10 }
};

const pulseAnimation = {
  scale: [1, 1.3, 1],
  opacity: [0.4, 0.1, 0.4],
};

const pulseTransition = {
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut",
};

const iconTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export const ChatbotIcon = memo(function ChatbotIcon({ 
  isOpen, 
  onClick, 
  translations,
  direction
}: ChatbotIconProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Show welcome message after 5 seconds delay if the chat is not already open
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowWelcome(false);
    }
  }, [isOpen]);

  const handleDismissWelcome = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleClick = useCallback(() => {
    onClick();
    setShowWelcome(false);
  }, [onClick]);

  const welcomeTitle = translations?.welcome?.title || "Need help?";
  const welcomeMessage = translations?.welcome?.message || "I'm here to assist you!";
  const tooltip = translations?.tooltip || "Chat with us";

  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-3">
        <AnimatePresence>
          {showWelcome && !isOpen && (
            <m.div
              variants={welcomeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-background border border-border p-4 rounded-2xl shadow-2xl max-w-[200px] relative mb-1"
              style={{ willChange: 'transform, opacity' }}
            >
              <button 
                onClick={handleDismissWelcome}
                aria-label="Close welcome message"
                title="Close welcome message"
                name="close-welcome-message"
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
              <h4 className="text-sm font-bold text-primary mb-1 pe-4">{welcomeTitle}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {welcomeMessage}
              </p>
              {/* Simple arrow */}
              <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-background border-b border-r border-border rotate-45" />
            </m.div>
          )}
        </AnimatePresence>

        <div className={`relative ${direction === 'rtl' ? 'ms-auto' : 'me-auto'}`}>
          {/* Pulsing effect background */}
          {!isOpen && !prefersReducedMotion && (
            <m.div
              animate={pulseAnimation}
              transition={pulseTransition}
              className="absolute inset-0 bg-primary rounded-full blur-sm"
              style={{ willChange: 'transform, opacity' }}
            />
          )}

          <button
            onClick={handleClick}
            title={tooltip}
            className={cn(
               "relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group",
              isOpen 
                ? "bg-background border border-border text-foreground overflow-hidden" 
                : "bg-primary text-primary-foreground bg-gradient-to-br from-primary to-primary/80"
            )}
            style={{ willChange: 'transform' }}
          >
            <m.div
              animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.2 : 1 }}
              transition={iconTransition}
              style={{ willChange: 'transform' }}
            >
              {isOpen ? <XIcon className="w-6 h-6" /> : <BotIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
            </m.div>
          </button>
        </div>
      </div>
    </LazyMotion>
  );
});
