/**
 * Skeleton loader for Pricing section
 * Matches the layout of PricingSection
 */
export function PricingSkeleton() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header Skeleton */}
        <div className="text-center mb-16 space-y-4">
          <div className="h-6 w-32 bg-muted/50 rounded mx-auto animate-pulse" />
          <div className="h-12 w-96 bg-muted/50 rounded mx-auto animate-pulse" />
        </div>

        {/* Pricing Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 border rounded-2xl space-y-6">
              <div className="space-y-3">
                <div className="h-6 bg-muted/50 rounded w-32 animate-pulse" />
                <div className="h-12 bg-muted/50 rounded w-40 animate-pulse" />
                <div className="h-4 bg-muted/50 rounded w-full animate-pulse" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="h-4 bg-muted/50 rounded w-full animate-pulse" />
                ))}
              </div>
              <div className="h-12 bg-muted/50 rounded-full animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
