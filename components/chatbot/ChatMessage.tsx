
import { Message } from "@/hooks/use-chatbot";
import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  direction?: string;
}

export function ChatMessage({ message, direction }: ChatMessageProps) {
  const isBot = message.sender === "bot";

  return (
    <div
      className={cn(
        "flex w-full gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isBot ? "justify-start" : "justify-end",
        direction === "rtl" ? "flex-row-reverse" : "flex-row"
      )}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
          <Bot size={16} className="text-primary" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm mt-5",
          isBot
            ? "bg-muted/50 text-foreground rounded-tl-none border border-border/50"
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}
      >
        {message.text}
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
          <User size={16} className="text-primary" />
        </div>
      )}
    </div>
  );
}
