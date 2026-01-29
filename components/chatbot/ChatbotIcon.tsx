"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { BotIcon, XIcon } from "@/components/ui/inline-icons";
import { cn } from "@/lib/utils";
import { ChatbotTranslations } from "./Chatbot";

interface ChatbotIconProps {
  isOpen: boolean;
  onClick: () => void;
  translations?: ChatbotTranslations;
  direction?: string;
}


export const ChatbotIcon = memo(function ChatbotIcon({ 
  isOpen, 
  onClick, 
  translations,
  direction
}: ChatbotIconProps) {
  const [showWelcome, setShowWelcome] = useState(false);

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
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-3">
      <div
        className={cn(
          "bg-background border border-border p-4 rounded-2xl shadow-2xl max-w-[200px] relative mb-1 transition-all duration-500",
          showWelcome && !isOpen 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-10 scale-90 pointer-events-none"
        )}
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
      </div>

        <div className={`relative ${direction === 'rtl' ? 'ms-auto' : 'me-auto'}`}>
        {/* Pulsing effect background */}
        {!isOpen && (
          <div
            className="absolute inset-0 bg-primary rounded-full blur-sm animate-pulse opacity-40"
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
        >
          <div
            className={cn("transition-all duration-500", isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100")}
          >
            {isOpen ? <XIcon className="w-6 h-6" /> : <BotIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
          </div>
        </button>
        </div>
    </div>
  );
});
