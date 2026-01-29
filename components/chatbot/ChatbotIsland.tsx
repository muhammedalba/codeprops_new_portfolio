"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./Chatbot").then(mod => mod.Chatbot), {
  ssr: false,
});

import { ChatbotTranslations } from "./Chatbot";

export function ChatbotIsland({ translations, direction }: { translations?: ChatbotTranslations, direction?: string }) {
  return <Chatbot translations={translations} direction={direction} />;
}
