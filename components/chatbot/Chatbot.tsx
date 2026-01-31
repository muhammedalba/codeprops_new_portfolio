
import { useChatbot } from "@/hooks/use-chatbot";
import dynamic from "next/dynamic";
const ChatbotWindow = dynamic(() => import("./ChatbotWindow").then(mod => mod.ChatbotWindow), {
});

import { TranslationValue } from "@/lib/translations";
import { ChatbotIconWrapper } from "./ChatbotIconWrapper";

export interface ChatbotTranslations {
  welcome: {
    title: string;
    message: string;
  };
  window: {
    title: string;
    status: string;
    placeholder: string;
    emptyMessage: string;
    disclaimer: string;
  };
  tooltip: string;
  placeholder: string;
  send: string;
  [key: string]: TranslationValue;
}

export function Chatbot({ translations, direction }: { translations?: ChatbotTranslations, direction?: string }) {
  const { messages, isLoading, isOpen, toggleChat, sendMessage } = useChatbot();

  return (
    <>
    <ChatbotIconWrapper
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
    </>
  );
}
