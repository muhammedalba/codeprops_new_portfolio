/**
 * Skeleton loader for Methodology section
 * Matches the layout of MethodologySection
 */
export function MethodologySkeleton() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header Skeleton */}
        <div className="text-center mb-16 space-y-4">
          <div className="h-6 w-32 bg-muted/50 rounded mx-auto animate-pulse" />
          <div className="h-12 w-96 bg-muted/50 rounded mx-auto animate-pulse" />
        </div>

        {/* Steps Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="w-16 h-16 bg-muted/50 rounded-full animate-pulse" />
              <div className="h-6 bg-muted/50 rounded w-3/4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-muted/50 rounded w-full animate-pulse" />
                <div className="h-4 bg-muted/50 rounded w-5/6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
