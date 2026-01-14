"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-xl font-bold group-hover:text-primary transition-colors pr-8">
          {question}
        </span>
        <div className={cn(
          "w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-primary border-primary text-primary-foreground rotate-180" : "group-hover:border-primary group-hover:text-primary"
        )}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

interface ContactFAQProps {
  title: string;
  questions: { q: string; a: string }[];
}

export function ContactFAQ({ title, questions }: ContactFAQProps) {
  return (
    <section className="py-24 md:py-32 bg-muted/10">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionBadge variant="outline" className="mb-8">{title}</SectionBadge>
          <div className="space-y-2">
            {questions.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
