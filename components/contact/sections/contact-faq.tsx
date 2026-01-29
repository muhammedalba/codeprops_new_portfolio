"use client";

import { memo, useCallback, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";

interface FAQItemProps {
  question: string;
  answer: string;
}

export const FAQItem = memo(function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="border-b border-border/50">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-xl font-bold pr-8 transition-colors group-hover:text-primary">
          {question}
        </span>

        <div
          className={cn(
            "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
            isOpen
              ? "bg-primary border-primary text-primary-foreground rotate-180"
              : "border-border group-hover:border-primary group-hover:text-primary"
          )}
        >
          {isOpen ? <Icons.minus size={18} /> : <Icons.plus size={18} />}
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out overflow-hidden shadow-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0">
          <p className="pb-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
});

interface ContactFAQProps {
  title: string;
  subtitle: string;
  questions: { q: string; a: string }[];
}

export function ContactFAQ({ title, subtitle, questions }: ContactFAQProps) {
  return (
    <section className="py-24 md:py-32 bg-muted/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
                    badge={title}
                    title={subtitle}
                  />

          <div className="space-y-2">
            {questions.map((faq) => (
              <FAQItem
                key={faq.q}
                question={faq.q}
                answer={faq.a}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
