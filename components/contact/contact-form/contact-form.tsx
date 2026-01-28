"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

import { contactSchema, ContactFormData } from "./schema";
import { StepIndicator } from "./StepIndicator";
import Script from "next/script";
import { useRecaptcha } from "@/hooks/use-recaptcha";

// Dynamic imports for steps
const StepOne = dynamic(() => import("./StepOne").then(mod => mod.StepOne), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted/20 rounded-2xl" />
});
const StepTwo = dynamic(() => import("./StepTwo").then(mod => mod.StepTwo), {
  loading: () => <div className="h-[400px] animate-pulse bg-muted/20 rounded-2xl" />
});

const SuccessScreen = dynamic(() => import("./SuccessScreen").then(mod => mod.SuccessScreen));

export function ContactForm({ translations }: any) {
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
      const token = await executeRecaptcha("contact_form");

      // 2. Send data to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
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
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return <SuccessScreen translations={translations} onReset={() => { setStatus("idle"); setStep(1); }} />;
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />
      <StepIndicator step={step} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
      </form>

      {status === "error" && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {errorMessage}
        </div>
      )}
    </>
  );
}