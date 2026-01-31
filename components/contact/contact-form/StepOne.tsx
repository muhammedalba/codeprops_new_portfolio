"use client";

import { User, Mail, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getProjectTypes, ProjectType } from "./project-types";
import { FormError } from "@/components/ui/FormError";
import { ContactTranslations } from "./contact-form";
import { ContactFormData } from "./schema";
import { UseFormReturn } from "react-hook-form";

interface StepOneProps {
  form: UseFormReturn<ContactFormData>;
  translations: ContactTranslations;
  onNext: () => void;
}

export function StepOne({ form, translations, onNext }: StepOneProps) {
  const projectTypes = getProjectTypes(translations.projectTypes);

  return (
    <div
      className="space-y-8 animate-[fade-in_0.4s_ease-out_forwards]"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Name */}
        <div className="space-y-3">
          <Label icon={User} text={translations.name} />
          <Input {...form.register("name")} placeholder='your name' className="h-16 rounded-2xl" />
           <FormError error={form.formState.errors.name} />
        </div>

        {/* Email */}
        <div className="space-y-3">
          <Label icon={Mail} text={translations.email} />
          <Input type="email" placeholder='example@gmail.com' {...form.register("email")} className="h-16 rounded-2xl" />
           <FormError error={form.formState.errors.email} />
        </div>
      </div>

      {/* Project Type */}
        <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  <MessageSquare size={14} className="text-primary" />
                  <span>{translations.projectType}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {projectTypes.map((type: ProjectType) => {
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
                          <Icon color={type.color} size={20} className={cn("transition-transform group-hover:scale-110", isSelected ? "text-white" : "text-primary")} />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
</div>
      <Button
        onClick={onNext}
        disabled={form.formState.isSubmitting}
        className="w-full h-20 rounded-2xl text-xl font-bold border border-input"
      >
        {translations.next}
        <ChevronRight />
      </Button>
    </div>
  );
}

function Label({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
      <Icon size={14} className="text-primary" />
      <span>{text}</span>
    </div>
  );
}
