import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Locale, getDirection, locales } from "@/lib/i18n";
import { generatePageMetadata, generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";
import { getMessages } from "@/lib/translations";
import { use } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClientSideEffects } from "@/components/providers/client-side-effects";

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "700"], // Combined weights into one family
});

// Generate static params for all locales
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
  const messages = getMessages(typedLocale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    ...generatePageMetadata({
      locale: typedLocale,
      title: messages.seo.home.title,
      description: messages.seo.home.description,
    }),
    metadataBase: new URL(baseUrl),
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const typedLocale = locale as Locale;
  const direction = getDirection(typedLocale);
  const messages = getMessages(typedLocale);

  return (
    <html lang={typedLocale} dir={direction} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header locale={typedLocale} translations={messages} />
          <main className="flex-1">{children}</main>
          <Footer locale={typedLocale} translations={messages} />
          <ClientSideEffects />
        </ThemeProvider>
      </body>
    </html>
  );
}
