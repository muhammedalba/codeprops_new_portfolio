import React from "react";
import type { Metadata } from "next";
import { Outfit, Amiri } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Locale, getDirection, locales } from "@/lib/i18n";
import { generatePageMetadata, generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";
import { getPageMessages } from "@/lib/translations";
import { HeaderServer } from "@/components/layout/header-server";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClientSideEffects } from "@/components/providers/client-side-effects";
import { SITE_CONFIG } from "@/lib/constants";
import { ChatbotIsland } from "@/components/chatbot/ChatbotIsland";
import { FramerMotionProvider } from "@/components/providers/framer-motion-provider";


const fontHeading = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",

});

const fontArabic = Amiri({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "700"],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = await getPageMessages(typedLocale, "home");
  return {
    ...generatePageMetadata({
      locale: typedLocale,
      title: messages.seo.home.title,
      description: messages.seo.home.description,
    }),
    metadataBase: new URL(SITE_CONFIG.url),
  };
}




export default async   function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const direction = getDirection(typedLocale);
  const messages = await getPageMessages(typedLocale, "home");
  return (
    <html lang={typedLocale} dir={direction} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontHeading.variable,
          fontArabic.variable,
          typedLocale === 'ar' && "font-arabic"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FramerMotionProvider>
            <HeaderServer locale={typedLocale} translations={messages.nav} sideDrawerTranslations={messages.sideDrawer} />
            <main className="flex-1">{children}</main>
            <Footer locale={typedLocale} translations={messages} />
            <ClientSideEffects />
            <ChatbotIsland direction={direction} translations={messages.chatbot} />
          </FramerMotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
