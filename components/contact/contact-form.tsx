"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, Loader2, Send, User, Mail, MessageSquare, ChevronRight, ChevronLeft,
  Sparkles, Zap, Monitor, Cloud, Layers
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema, ContactFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  translations: {
    name: string;
    email: string;
    subject: string;
    projectType: string;
    projectTypes: {
      web: string;
      mobile: string;
      cloud: string;
      consulting: string;
      other: string;
    };
    message: string;
    send: string;
    success_title: string;
    success_message: string;
    error: string;
  };
}

export function ContactForm({ translations }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [step, setStep] = useState(1);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      await new Promise(r => setTimeout(r, 2000));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const projectTypes = [
    { id: "web", icon: Monitor, label: translations.projectTypes.web },
    { id: "mobile", icon: Layers, label: translations.projectTypes.mobile },
    { id: "cloud", icon: Cloud, label: translations.projectTypes.cloud },
    { id: "consulting", icon: Zap, label: translations.projectTypes.consulting },
    { id: "other", icon: Sparkles, label: translations.projectTypes.other },
  ];

  const MotionInput = motion(Input);
  const MotionTextarea = motion(Textarea);

  // Success Screen
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center space-y-8"
      >
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary/40 blur-3xl rounded-full" 
          />
          <div className="relative w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-heading font-bold tracking-tight">{translations.success_title}</h3>
          <p className="text-xl text-muted-foreground max-w-md mx-auto font-light leading-relaxed">
            {translations.success_message}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => { setStatus("idle"); setStep(1); }}
          className="rounded-full px-10 h-14 border-primary/20 text-lg font-bold hover:bg-primary/5 transition-all"
        >
          Dispatch Another Signal
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Step Indicator */}
      <div className="flex gap-2 mb-12">
        {[1, 2].map(i => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              step >= i ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" : "bg-muted"
            )}
          />
        ))}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-10">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    <User size={14} className="text-primary" />
                    <span>{translations.name}</span>
                  </div>
                  <MotionInput
                    {...form.register("name")}
                    placeholder="E.g. Elon Musk"
                    className="h-16 rounded-2xl bg-background/40 border-border/50 text-lg transition-all"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(79,70,229,0.3)" }}
                  />
                  {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    <Mail size={14} className="text-primary" />
                    <span>{translations.email}</span>
                  </div>
                  <MotionInput
                    type="email"
                    {...form.register("email")}
                    placeholder="elon@mars.com"
                    className="h-16 rounded-2xl bg-background/40 border-border/50 text-lg transition-all"
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(79,70,229,0.3)" }}
                  />
                  {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  <MessageSquare size={14} className="text-primary" />
                  <span>{translations.projectType}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {projectTypes.map(type => {
                    const Icon = type.icon;
                    const isSelected = form.watch("projectType") === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => form.setValue("projectType", type.id, { shouldValidate: true })}
                        className={cn(
                          "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all gap-2 group",
                          isSelected 
                            ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                            : "bg-background/20 border-border/50 hover:border-primary/30 hover:bg-muted/30"
                        )}
                      >
                        <Icon size={20} className={cn("transition-transform group-hover:scale-110", isSelected ? "text-white" : "text-primary")} />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
                {form.formState.errors.projectType && <p className="text-xs text-destructive">{form.formState.errors.projectType.message}</p>}
              </div>

              <Button
                type="button"
                onClick={async () => {
                  const isValid = await form.trigger(["name","email","projectType"]);
                  if (isValid) setStep(2);
                }}
                className="w-full h-20 rounded-2xl text-xl font-bold gap-3 group"
              >
                Assemble Scope
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Subject */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  <Sparkles size={14} className="text-primary" />
                  <span>{translations.subject}</span>
                </div>
                <MotionInput
                  {...form.register("subject")}
                  placeholder="Technical Architecture Revamp"
                  className="h-16 rounded-2xl bg-background/40 border-border/50 text-lg transition-all"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(79,70,229,0.3)" }}
                />
                {form.formState.errors.subject && <p className="text-xs text-destructive">{form.formState.errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  <Layers size={14} className="text-primary" />
                  <span>{translations.message}</span>
                </div>
                <MotionTextarea
                  {...form.register("message")}
                  placeholder="Describe your technical landscape and desired outcomes..."
                  className="min-h-[200px] rounded-2xl bg-background/40 border-border/50 resize-none p-6 text-lg transition-all"
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 15px rgba(79,70,229,0.2)" }}
                />
                {form.formState.errors.message && <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>}
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="h-20 w-24 rounded-2xl border-border/50"
                  disabled={status === "loading"}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 h-20 rounded-2xl text-xl font-bold bg-primary text-primary-foreground group"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <span className="flex items-center gap-3">
                      Initialize Transmission
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
