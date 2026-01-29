"use client";

import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("./Chatbot").then(mod => mod.Chatbot), {
  ssr: false,
});

export function ChatbotIsland({ translations, direction }: { translations?: any, direction?: string }) {
  return <Chatbot translations={translations} direction={direction} />;
}
