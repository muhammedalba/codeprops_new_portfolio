'use client';

import dynamic from 'next/dynamic';

const ScrollToTop = dynamic(
  () => import('@/components/layout/scroll-to-top').then(m => m.ScrollToTop),
  { ssr: false }
);

export function ClientSideEffects() {
  return (
    <>
      <ScrollToTop />
    </>
  );
}
