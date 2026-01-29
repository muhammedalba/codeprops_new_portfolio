"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "./schema";
import { StepIndicator } from "./StepIndicator";
import Script from "next/script";
import { useRecaptcha } from "@/hooks/use-recaptcha";
import dynamic from "next/dynamic";

// Dynamic imports for steps
const StepOne = dynamic(() => import("./StepOne").then(mod => mod.StepOne), {
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-muted/20 rounded-2xl" />
});
const StepTwo = dynamic(() => import("./StepTwo").then(mod => mod.StepTwo), {
  ssr: false,
  loading: () => <div className="h-[400px] animate-pulse bg-muted/20 rounded-2xl" />
});

const SuccessScreen = dynamic(() => import("./SuccessScreen").then(mod => mod.SuccessScreen), { ssr: false });
const ErrorScreen = dynamic(() => import("./ErrorScreen").then(mod => mod.ErrorScreen), { ssr: false });

export { type ContactFormData } from "./schema";
import { TranslationValue } from "@/lib/translations";

// Define a basic type for translations.
export interface ContactTranslations {
  name: string;
  email: string;
  projectType: string;
  projectTypes: {
    web: string;
    mobile: string;
    cloud: string;
    consulting: string;
    other: string;
  };
  subject: string;
  message: string;
  send: string;
  next?: string;
  success_title: string;
  success_message: string;
  error_title?: string;
  error_message?: string;
  retry_action?: string;
  [key: string]: TranslationValue;
}

// Fixed props type and improved maintainability
export function ContactForm({ translations }: { translations: ContactTranslations }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { executeRecaptcha } = useRecaptcha();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");
    
    try {
      // 1. Get reCAPTCHA token using hook
      const token: string = await executeRecaptcha("contact_form");

      // 2. Send data to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptcha_token: token,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.error?.message || errorData.message || "Failed to send message";
        throw new Error(message);
      }

      setStatus("success");
      form.reset();
    } catch (error: unknown) {
      console.error("Submission error:", error);
      setStatus("error");
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    }
  };

  if (status === "success") {
    return <SuccessScreen translations={translations} onReset={() => { setStatus("idle"); setStep(1); }} />;
  }

  if (status === "error") {
    return (
      <ErrorScreen 
        error={errorMessage} 
        translations={translations} 
        onRetry={() => setStatus("idle")} 
      />
    );
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />
      <StepIndicator step={step} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative">
          {step === 1 && (
            <StepOne
              form={form}
              translations={translations}
              onNext={async () => {
                const valid = await form.trigger(["name", "email", "projectType"]);
                if (valid) setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <StepTwo
              form={form}
              translations={translations}
              status={status}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </form>
    </>
  );
}
