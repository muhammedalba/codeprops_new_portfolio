"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";

 import { contactSchema, ContactFormData } from "./schema";
import { StepIndicator } from "./StepIndicator";
import { StepOne } from "./StepOne";

// Dynamic imports for hidden steps
const StepTwo = dynamic(() => import("./StepTwo").then(mod => mod.StepTwo));
const SuccessScreen = dynamic(() => import("./SuccessScreen").then(mod => mod.SuccessScreen));

export function ContactForm({ translations }: any) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    await new Promise(r => setTimeout(r, 2000));
    setStatus("success");
    form.reset();
  };

  if (status === "success") {
    return <SuccessScreen translations={translations} onReset={() => { setStatus("idle"); setStep(1); }} />;
  }

  return (
    <>
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
    </>
  );
}