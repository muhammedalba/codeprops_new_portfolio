"use client";

import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, Info } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/hooks/use-chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatbotWindowProps {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  onSend: (text: string) => void;
}

export function ChatbotWindow({ isOpen, messages, isLoading, onSend, translations, direction }: ChatbotWindowProps & { translations?: any, direction?: string }) {
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = translations?.window || {
    title: "AI Assistant",
    status: "Online",
    placeholder: "Ask me anything...",
    emptyMessage: "Hello! How can I help you today? Feel free to ask about our services or projects.",
    disclaimer: "AI generated responses may be inaccurate"
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSend(inputText);
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
          className="fixed bottom-24 left-6 z-[9998] max-w-[90%] h-[600px] max-h-[80vh] flex flex-col bg-background/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold tracking-tight">{t.title}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">{t.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-2 scroll-smooth custom-scrollbar"
          >
            {messages.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                  <Bot size={48} className="mb-4" />
                  <p className="text-sm font-medium">{t.emptyMessage}</p>
               </div>
            )}
            
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} direction={direction} />
            ))}
            
            {isLoading && (
              <div className="flex gap-2 p-3 bg-muted/30 rounded-2xl w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/5 bg-background/40">
            <div className="relative flex items-center gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                className="h-14 pr-14 rounded-2xl bg-muted/40 border-none ring-0 focus-visible:ring-primary/20 placeholder:text-muted-foreground/50 transition-all text-sm"
              />
              <Button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="absolute right-1 w-12 h-12 rounded-xl p-0 hover:scale-105 active:scale-95 transition-transform"
              >
                <Send size={18} />
              </Button>
            </div>
            
            <p className="mt-4 text-[9px] text-center text-muted-foreground/40 font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-1">
              <Info size={8} /> {t.disclaimer}
            </p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
