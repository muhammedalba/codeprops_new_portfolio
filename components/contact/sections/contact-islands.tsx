"use client";

import dynamic from "next/dynamic";

export const ContactFAQ = dynamic(
  () => import("./contact-faq").then((mod) => mod.ContactFAQ),
  { ssr: false }
);

export const ContactCTA = dynamic(
  () => import("./contact-cta").then((mod) => mod.ContactCTA),
  { ssr: false }
);
