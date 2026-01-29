import { Locale } from './i18n';

export type PageKey = "home" | "about" | "services" | "blog" | "portfolio" | "contact" | "privacy" | "terms";

export type TranslationValue = string | number | boolean | null | undefined | { [key: string]: TranslationValue } | TranslationValue[];
export type TranslationMessages = Record<string, TranslationValue>;

/**
 * Loads common, seo, and page-specific translations dynamically.
 * This ensures only required translations are included in the bundle/memory.
 */
export async function getPageMessages(locale: Locale, page: PageKey) {
  try {
    const promises: Promise<{ default: TranslationMessages }>[] = [
      import(`@/messages/${locale}/common.json`),
      import(`@/messages/${locale}/seo.json`),
      import(`@/messages/${locale}/pages/${page}.json`)
    ];

    // Hub Pages / Pages with cross-namespace dependencies for components like Footer CTA or Latest Insights
    const dependencyMap: Record<string, string[]> = {
      home: ["about", "services", "blog", "contact"],
      about: ["contact"],
      services: ["contact"],
      portfolio: ["contact"],
    };  

    const dependencies = dependencyMap[page] || [];
    dependencies.forEach(dep => {
      promises.push(import(`@/messages/${locale}/pages/${dep}.json`));
    });

    const imports = await Promise.all(promises);
    const [common, seo, pageData, ...deps] = imports;

    const result: TranslationMessages = {
      ...common.default,
      seo: seo.default,
      ...pageData.default,
    };

    // Merge dependencies
  deps.forEach(dep => {
  Object.entries(dep.default).forEach(([key, value]) => {
    if (!(key in result)) {
      result[key] = value;
    }
  });
});


    return result;
  } catch (error) {
    console.error(`Error loading translations for ${locale}/${page}:`, error);
    // Fallback to English common + home if something goes wrong
    try {
      const fbCommon = await import(`@/messages/en/common.json`);
      const fbSeo = await import(`@/messages/en/seo.json`);
      const safePage = page ?? "home";
const fbPage = await import(`@/messages/en/pages/${safePage}.json`);
      
      return {
        ...fbCommon.default,
        seo: fbSeo.default,
        ...fbPage.default,
      };
    } catch (fallbackError) {
      console.error("Critical: Fallback translation failed", fallbackError);
      return {} as TranslationMessages;
    }
  }
}

/** 
 * Legacy support for getMessages.
 * @deprecated Use getPageMessages(locale, page) for selective loading and performance.
 */
export async function getMessages(locale: Locale): Promise<TranslationMessages> {
  const common = await import(`@/messages/${locale}/common.json`);
  const seo = await import(`@/messages/${locale}/seo.json`);
  
  // For legacy support, we can't easily merge ALL pages without loading them all.
  // We return common + seo + home as a sensible default for legacy callers.
  const home = await import(`@/messages/${locale}/pages/home.json`);
  
  return {
    ...common.default,
    seo: seo.default,
    ...home.default,
  };
}

// Temporary Type for backward compatibility - will be refined during Phase 3
export type Messages = TranslationMessages;

/**
 * Type-safe translation helper (Legacy)
 * @deprecated Use getPageMessages instead.
 */
export async function getTranslation(
  locale: Locale,
  page: PageKey,
  key: string
): Promise<TranslationValue> {
  const msgs = await getPageMessages(locale, page);
  return msgs[key];
}
