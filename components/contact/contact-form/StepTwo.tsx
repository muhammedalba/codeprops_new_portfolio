import { Sparkles, Layers, ChevronLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/ui/FormError";
import { ContactTranslations } from "./contact-form";
import { ContactFormData } from "./schema";
import { UseFormReturn } from "react-hook-form";

interface StepTwoProps {
  form: UseFormReturn<ContactFormData>;
  translations: ContactTranslations;
  onBack: () => void;
  status: "idle" | "loading" | "success" | "error";
}

export function StepTwo({ form, translations, onBack, status }: StepTwoProps) {

  return (
    <div
      className="space-y-8 animate-[fade-in_0.4s_ease-out_forwards]"
    >
      <Section icon={Sparkles} title={translations.subject}>
        <Input placeholder='your subject' {...form.register("subject")} className="h-16 rounded-2xl" />
         <FormError error={form.formState.errors.subject} />
      </Section>

      <Section icon={Layers} title={translations.message}>
        <Textarea {...form.register("message")} className="min-h-[200px]" placeholder='your message' />
         <FormError error={form.formState.errors.message} />
      </Section>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="h-20 w-24">
          <ChevronLeft />
        </Button>
        <Button type="submit" className="flex-1 h-20 text-xl border border-input">
          {status === "loading" ? <Loader2 className="animate-spin" /> : <> {translations.send} <Send /></>}
        </Button>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
        <Icon size={14} className="text-primary" />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
