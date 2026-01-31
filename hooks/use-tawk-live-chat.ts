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
    if (typeof window === "undefined") return resolve();

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // لو جاهز فعلاً
    if (window.Tawk_API.maximize) {
      return resolve();
    }

    // ننتظر onLoad دائماً
    window.Tawk_API.onLoad = function () {
      isLoadedRef.current = true;

      window.Tawk_API.onChatMessageAgent = function () {
        window.Tawk_API.showWidget();
        window.Tawk_API.maximize();
      };

      resolve();
    };

    // inject مرة واحدة فقط
    if (!document.getElementById("tawk-script")) {
      const script = document.createElement("script");
      script.id = "tawk-script";
      script.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_ID}`;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}, []);


  const openLiveChat = useCallback(async () => {
    if (typeof window === "undefined") return;

    await loadTawkScript();

    window.Tawk_API?.showWidget?.();
    window.Tawk_API?.maximize?.();
  }, [loadTawkScript]);

  return { openLiveChat };
}
