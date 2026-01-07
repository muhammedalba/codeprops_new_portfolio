"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema, ContactFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ContactFormProps {
  translations: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

export function ContactForm({ translations }: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      console.log("submit form data", data);

      await new Promise((r) => setTimeout(r, 2000));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Consultation Initialized</h3>
          <p className="text-muted-foreground">
            Our engineering team will review your scope and reach out within 24
            hours.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="rounded-xl"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          {translations.name}
        </label>
        <Input
          type="text"
          {...form.register("name")}
          placeholder="Jane Doe"
          disabled={status === "loading"}
          className={`h-14 rounded-2xl bg-background transition-all focus:outline-none${form.formState.errors.name
    ? " ring-1 ring-destructive"
    : " ring-1 ring-primary"}`}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          {translations.email}
        </label>
        <Input
          type="email"
          {...form.register("email")}
          placeholder="jane@company.com"
          disabled={status === "loading"}
         className={`h-14 rounded-2xl bg-background transition-all focus:outline-none${form.formState.errors.email
    ? " ring-1 ring-destructive"
    : " ring-1 ring-primary"}`}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          {translations.message}
        </label>
        <Textarea
          {...form.register("message")}
          placeholder="Tell us about your architectural challenges..."
          disabled={status === "loading"}
         className={`h-14 rounded-2xl bg-background transition-all focus:outline-none${form.formState.errors.message
    ? " ring-1 ring-destructive"
    : " ring-1 ring-primary"}`}
        />
        {form.formState.errors.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-destructive text-sm font-medium">
          <AlertCircle className="w-4 h-4" />
          An engineering error occurred. Please try again.
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full h-16 rounded-2xl text-lg font-bold bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          translations.send
        )}
      </Button>
    </form>
  );
}
