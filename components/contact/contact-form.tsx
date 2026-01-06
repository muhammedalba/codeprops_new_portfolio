'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ContactFormProps {
  translations: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

export function ContactForm({ translations }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    // In a real scenario, you'd fetch(NEXT_PUBLIC_CONTACT_ENDPOINT, { method: 'POST', body: JSON.stringify(formData) })
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
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
          <p className="text-muted-foreground">Our engineering team will review your scope and reach out within 24 hours.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setStatus('idle')}
          className="rounded-xl"
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          {translations.name}
        </label>
        <Input 
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Jane Doe" 
          disabled={status === 'loading'}
          className="h-14 rounded-2xl bg-background border-border focus:ring-primary focus:border-primary transition-all"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          {translations.email}
        </label>
        <Input 
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="jane@company.com" 
          disabled={status === 'loading'}
          className="h-14 rounded-2xl bg-background border-border focus:ring-primary focus:border-primary transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
          {translations.message}
        </label>
        <Textarea 
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your architectural challenges..."
          disabled={status === 'loading'}
          className="min-h-[150px] rounded-[2rem] bg-background border-border focus:ring-primary focus:border-primary transition-all resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-destructive text-sm font-medium">
          <AlertCircle className="w-4 h-4" />
          An engineering error occurred. Please try again.
        </div>
      )}

      <Button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full h-16 rounded-2xl text-lg font-bold bg-primary text-primary-foreground hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98]"
      >
        {status === 'loading' ? (
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
