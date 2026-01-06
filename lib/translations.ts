import { Locale } from './i18n';
import en from '@/messages/en.json';
import de from '@/messages/de.json';
import ar from '@/messages/ar.json';

const messages = { en, de, ar };

export type Messages = typeof en;

// Get translations for a locale
export function getMessages(locale: Locale): Messages {
  return messages[locale] || messages.en;
}

// Type-safe translation helper
export function getTranslation<K extends keyof Messages>(
  locale: Locale,
  key: K
): Messages[K] {
  const msgs = getMessages(locale);
  return msgs[key];
}
