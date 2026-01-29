import localFont from 'next/font/local';

/**
 * Self-hosted fonts for maximum performance and LCP optimization.
 * Using next/font/local to eliminate external requests and control preloading.
 * 
 * Performance Strategy:
 * - Only weight 400 and 700 (no 500)
 * - Preload enabled for LCP elements
 * - display: "swap" for immediate text visibility
 * - Locale-specific loading in layout.tsx
 */

export const fontHeading = localFont({
  src: [
    {
      path: '../public/fonts/outfit-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/outfit-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

export const fontArabic = localFont({
  src: [
    {
      path: '../public/fonts/amiri-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/amiri-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-arabic',
  display: 'swap',
  preload: true,
});
