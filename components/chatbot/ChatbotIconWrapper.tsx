import { ChatbotTranslations } from "./Chatbot";
import { ChatbotIcon } from "./ChatbotIcon";


interface ChatbotIconProps {
  isOpen: boolean;
  onClick: () => void;
  translations?: ChatbotTranslations;
  direction?: string;
}

export function ChatbotIconWrapper(props: ChatbotIconProps) {
  const enableChatbot = process.env.NEXT_PUBLIC_ENABLE_CHATBOT !== "false";
  if (!enableChatbot) return null;

  return <ChatbotIcon {...props} />;
}
