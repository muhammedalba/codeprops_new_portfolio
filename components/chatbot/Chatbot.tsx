"use client";

import React from "react";
import { useChatbot } from "@/hooks/use-chatbot";
import { ChatbotIcon } from "./ChatbotIcon";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation } from "framer-motion";

const ChatbotWindow = dynamic(() => import("./ChatbotWindow").then(mod => mod.ChatbotWindow), {
  ssr: false,
});

export function Chatbot({ translations, direction }: { translations?: any, direction?: string }) {
  const { messages, isLoading, isOpen, toggleChat, sendMessage } = useChatbot();

  return (
    <LazyMotion features={domAnimation}>
      <ChatbotIcon 
        isOpen={isOpen} 
        onClick={toggleChat} 
        translations={translations} 
        direction={direction}
      />
      <ChatbotWindow 
        isOpen={isOpen} 
        messages={messages} 
        isLoading={isLoading} 
        onSend={sendMessage} 
        translations={translations}
        direction={direction}       
      />
    </LazyMotion>
  );
}
