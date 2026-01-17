"use client";

import { memo, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionBadge } from "@/components/ui/section-badge";
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
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
            {questions.map((faq, i) => (
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
