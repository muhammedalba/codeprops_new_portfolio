import React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Locale, getDirection, locales } from "@/lib/i18n";
import { generatePageMetadata, generateOrganizationSchema } from "@/lib/seo";
import { getPageMessages } from "@/lib/translations";
import { HeaderServer } from "@/components/layout/header-server";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClientSideEffects } from "@/components/providers/client-side-effects";
import { SITE_CONFIG } from "@/lib/constants";
import { ChatbotIsland } from "@/components/chatbot/ChatbotIsland";
import { IconsSpriteSheet } from "@/components/ui/icons";


import { fontHeading, fontArabic } from "@/lib/fonts";
import Script from "next/script";

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

export default async function LocaleLayout({
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
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
        </Script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased flex flex-col transition-colors duration-300",
          typedLocale === "ar" 
            ? `${fontArabic.variable} ${fontArabic.className}` 
            : `${fontHeading.variable} ${fontHeading.className}`
        )}
      >
          {/* Google Tag Manager */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderServer locale={typedLocale} translations={messages.nav} sideDrawerTranslations={messages.sideDrawer} />
          <main className="flex-1">{children}</main>
          <Footer locale={typedLocale} translations={messages} />
          <ClientSideEffects />
          <ChatbotIsland direction={direction} translations={messages.chatbot} />
          <IconsSpriteSheet />
        </ThemeProvider>
      </body>
    </html>
  );
}
