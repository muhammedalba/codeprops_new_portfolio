'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Locale, localeNames } from '@/lib/i18n';
import { ThemeToggle } from './theme-toggle';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export function SideDrawer({ isOpen, onClose, locale }: SideDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm md:hidden"
          />
          
          {/* Drawer Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[70] h-full w-[300px] sm:w-[400px] bg-background border-l shadow-2xl overflow-y-auto"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-heading font-bold gradient-primary bg-clip-text text-transparent">
                  Codeprops
                </span>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Company Info */}
              <div className="space-y-8 flex-1">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    About Us
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We are a senior engineering collective dedicated to building elite digital experiences that redefine technical excellence.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    Get in Touch
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <a href="mailto:info@codeprops.com" className="font-medium hover:text-primary transition-colors">
                          info@codeprops.com
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <a href="tel:+15551234567" className="font-medium hover:text-primary transition-colors">
                          +1 (555) 123-4567
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-medium">
                          Elite Tech Center, Istanbul, TR
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    Language
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(localeNames).map(([key, name]) => (
                      <Link
                        key={key}
                        href={`/${key}`}
                        className={`text-center py-2 rounded-lg text-sm font-medium border transition-all ${
                          locale === key 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-border hover:border-primary/40'
                        }`}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    Appearance
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30">
                    <span className="text-sm font-medium">Switch Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Socials & Legal */}
              <div className="pt-8 border-t space-y-6">
                <div className="flex gap-4">
                  <a href="#" className="p-2 border rounded-full hover:border-primary hover:text-primary transition-all">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-2 border rounded-full hover:border-primary hover:text-primary transition-all">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-2 border rounded-full hover:border-primary hover:text-primary transition-all">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  © 2026 Codeprops. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
