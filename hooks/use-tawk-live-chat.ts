"use client";

import { useCallback, useRef } from "react";

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

export function useTawkLiveChat() {
  const isLoadedRef = useRef(false);

  const loadTawkScript = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }

      // 1. Check if Tawk is already loaded and ready
      if (window.Tawk_API?.maximize) {
        isLoadedRef.current = true;
        resolve();
        return;
      }

      // 2. Check if script is already injected (Singleton)
      const existingScript = document.getElementById("tawk-script");
      if (existingScript) {
        // If script exists but not fully ready, we just resolve.
        // Ideally we could wait, but Tawk logic usually handles the queue.
        resolve();
        return;
      }

      // 3. Inject Script
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

 

      // Events
      window.Tawk_API.onLoad = function () {
        window.Tawk_API.hideWidget();
        isLoadedRef.current = true;
        resolve();
      };

      window.Tawk_API.onChatMinimized = function () {
        window.Tawk_API.hideWidget();
      };

      const script = document.createElement("script");
      script.id = "tawk-script";
      script.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_ID}`;
      script.async = true;
      script.setAttribute("crossorigin", "*");

      document.body.appendChild(script);
    });
  }, []);

  const openLiveChat = useCallback(async () => {
    if (typeof window === "undefined") return;

    // Load if needed
    await loadTawkScript();

    // Execute Tawk commands safely
    // We use a small timeout to ensure Tawk API has processed the onLoad event if it just finished
    if (window.Tawk_API) {
      // Sometimes direct call right after onLoad needs a tick
      setTimeout(() => {
        if (typeof window.Tawk_API.showWidget === "function") {
          window.Tawk_API.showWidget();
        }
        if (typeof window.Tawk_API.maximize === "function") {
          window.Tawk_API.maximize();
        }
      }, 100);
    }
  }, [loadTawkScript]);

  return {
    openLiveChat,
  };
}
