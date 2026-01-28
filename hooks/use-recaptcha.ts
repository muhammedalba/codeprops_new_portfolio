"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function useRecaptcha() {
  const executeRecaptcha = useCallback(async (action: string): Promise<string> => {
    if (!window.grecaptcha) {
      throw new Error("reCAPTCHA not loaded");
    }

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
            action,
          })
          .then((token: string) => resolve(token))
          .catch((err: any) => reject(err));
      });
    });
  }, []);

  return { executeRecaptcha };
}
