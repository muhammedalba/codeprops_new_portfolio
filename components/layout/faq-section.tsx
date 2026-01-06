'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  subtitle: string;
  questions: FAQItem[];
}

export function FAQSection({ title, subtitle, questions }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-mono font-bold tracking-[0.4em] uppercase text-primary mb-4">
            {title}
          </h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold">
            {subtitle}
          </h3>
        </div>

        <div className="space-y-4">
          {questions.map((item, i) => (
            <div 
              key={i}
              className="rounded-[2rem] border border-border bg-muted/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left group"
              >
                <span className="text-xl font-bold group-hover:text-primary transition-colors">
                  {item.q}
                </span>
                <div className={`w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-primary border-primary' : ''}`}>
                  {openIndex === i ? (
                    <Minus className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Plus className="w-5 h-5 group-hover:text-primary" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-8 pb-8 text-lg text-muted-foreground leading-relaxed border-t border-border/50 pt-6">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
