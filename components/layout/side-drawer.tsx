"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { Locale, localeNames } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { SOCIAL_LINKS, CONTACT_INFO, SITE_CONFIG } from "@/lib/constants";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  translations?: any;
}

export function SideDrawer({ isOpen, onClose, locale, translations }: SideDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
           transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 z-[110] h-full w-[300px] sm:w-[400px] bg-background border-l shadow-2xl overflow-y-auto"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-heading font-bold bg-clip-text ">
                  Code<span className="text-primary">Props</span>
                </span>
                <button
                name="close button"
                  title="close button"
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
                    {translations?.aboutUs?.title || "About Us"}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {translations?.aboutUs?.description || "We are a senior engineering collective dedicated to building elite digital experiences that redefine technical excellence."}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    {translations?.contact?.title || "Get in Touch"}
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">{translations?.contact?.email || "Email"}</p>
                        <a
                          href={`mailto:${CONTACT_INFO.email}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {CONTACT_INFO.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">{translations?.contact?.phone || "Phone"}</p>
                        <a
                          href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
                          dir="ltr"
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary/60 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {translations?.contact?.location || "Location"}
                        </p>
                        <p className="font-medium">
                          {CONTACT_INFO.address}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    {translations?.language || "Language"}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(localeNames).map(([key, name]) => (
                      <Link
                        key={key}
                        href={`/${key}`}
                        className={`text-center py-2 rounded-lg text-sm font-medium border transition-all ${
                          locale === key
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    {translations?.appearance?.title || "Appearance"}
                  </h3>
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30">
                    <span className="text-sm font-medium">{translations?.appearance?.switchTheme || "Switch Theme"}</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Socials & Legal */}
              <div className="pt-8 border-t space-y-6">
                <div className="flex gap-4">
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border rounded-full hover:border-primary hover:text-primary transition-all"
                  >
                    <Icons.twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border rounded-full hover:border-primary hover:text-primary transition-all"
                  >
                    <Icons.linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border rounded-full hover:border-primary hover:text-primary transition-all"
                  >
                    <Icons.github className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  {translations?.copyright || `© ${new Date().getFullYear()} ${SITE_CONFIG.name}. All rights reserved.`}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}


