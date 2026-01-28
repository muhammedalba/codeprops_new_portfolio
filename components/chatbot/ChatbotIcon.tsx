"use client";

import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatbotIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatbotIcon({ isOpen, onClick }: ChatbotIconProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group",
        isOpen 
          ? "bg-background border border-border text-foreground overflow-hidden" 
          : "bg-primary text-primary-foreground"
      )}
    >
      <motion.div
        animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />}
      </motion.div>
      
      {!isOpen && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-accent-secondary rounded-full border-2 border-background animate-bounce"
        />
      )}
    </button>
  );
}
