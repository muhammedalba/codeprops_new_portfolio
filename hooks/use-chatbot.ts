"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTawkLiveChat } from "./use-tawk-live-chat";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  
  // Custom hook for Tawk Live Chat
  const { openLiveChat } = useTawkLiveChat();






  // Ref for caching to avoid redundant API calls if needed
  const cacheRef = useRef<Record<string, string>>({});

  // Initialize session ID only (don't fetch history yet)
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chatbot_session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  // Fetch history only when chatbot is opened for the first time
  useEffect(() => {
    if (isOpen && !historyLoaded && sessionId) {
      fetchHistory(sessionId);
      setHistoryLoaded(true);
    }
  }, [isOpen, historyLoaded, sessionId]);

  const fetchHistory = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_CHAT_HISTORY_ENDPOINT}?session_id=${id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
           const expandedMessages: Message[] = [];
           data.data.forEach((row: any) => {
             if (row.user_question) {
               expandedMessages.push({
                 id: `q_${row.id}`,
                 text: row.user_question,
                 sender: "user",
                 timestamp: new Date(row.created_at).getTime()
               });
             }
             if (row.bot_response) {
               expandedMessages.push({
                 id: `a_${row.id}`,
                 text: row.bot_response,
                 sender: "bot",
                 timestamp: new Date(row.created_at).getTime() + 1
               });
             }
           });
           setMessages(expandedMessages);
        }
      }
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_CHAT_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Response not ok:", response.status, errorText);
        throw new Error(`Failed to send message: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Update session ID if new
        if (!sessionId && data.data.session_id) {
          setSessionId(data.data.session_id);
          localStorage.setItem("chatbot_session_id", data.data.session_id);
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.data.answer || "I'm sorry, I couldn't understand that.",
          sender: "bot",
          timestamp: Date.now(),
        };
        // check if message not matched -> open live chat
        if (data.data.open_live_chat) {
          // Close custom chatbot and open Tawk
          setIsOpen(false);
          openLiveChat();
          
        } else {
          setMessages((prev) => [...prev, botMessage]);
        }

      }
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    messages,
    isLoading,
    isOpen,
    toggleChat,
    sendMessage,
  };
}