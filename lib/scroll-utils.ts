/**
 * Throttles a scroll callback using requestAnimationFrame
 * This ensures the callback runs at most once per frame (60fps)
 * Significantly reduces CPU usage during scroll events
 */
export function throttleScroll(callback: () => void): () => void {
  let rafId: number | null = null;
  let lastScrollY = 0;

  return () => {
    const currentScrollY = window.scrollY;
    
    // Skip if scroll position hasn't changed
    if (currentScrollY === lastScrollY) {
      return;
    }
    
    lastScrollY = currentScrollY;

    // Cancel previous frame if it hasn't executed yet
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }

    // Schedule callback for next animation frame
    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  };
}

/**
 * Cleanup function for scroll throttling
 * Call this in useEffect cleanup to prevent memory leaks
 */
export function cancelThrottledScroll(rafId: number | null): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
}
