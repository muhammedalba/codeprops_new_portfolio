'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { GlassCard } from '@/components/ui/glass-card';

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
        <SectionHeader 
          badge={title}
          title={subtitle}
        />

        <div className="space-y-6">
          {questions.map((item, i) => (
            <GlassCard 
              key={i}
              hoverEffect={false}
              className={`p-0 rounded-[2.5rem] overflow-hidden border-border/50 ${openIndex === i ? 'border-primary/30' : ''}`}
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
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
