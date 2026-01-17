// Supported locales for the website
export const locales = ['en', 'de', 'ar'] as const;
export type Locale = typeof locales[number];

// Default locale
export const defaultLocale: Locale = 'ar';

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

// Language names
export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  ar: 'العربية',
};

// Check if locale is RTL
export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

// Get direction for locale
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
