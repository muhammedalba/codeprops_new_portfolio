"use client";

import { useChatbot } from "@/hooks/use-chatbot";
import { ChatbotIcon } from "./ChatbotIcon";
import dynamic from "next/dynamic";

const ChatbotWindow = dynamic(() => import("./ChatbotWindow").then(mod => mod.ChatbotWindow), {
  ssr: false,
});

export function Chatbot() {
  const { messages, isLoading, isOpen, toggleChat, sendMessage } = useChatbot();

  return (
    <>
      <ChatbotIcon isOpen={isOpen} onClick={toggleChat} />
      <ChatbotWindow 
        isOpen={isOpen} 
        messages={messages} 
        isLoading={isLoading} 
        onSend={sendMessage} 
      />
    </>
  );
}
