export function AboutHeroSkeleton() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-20">
          <div className="h-6 w-32 bg-muted/50 rounded-full mb-8 animate-pulse" />
          <div className="h-20 w-full md:w-3/4 bg-muted/50 rounded-2xl mb-8 animate-pulse" />
          <div className="h-8 w-1/2 bg-muted/50 rounded-lg animate-pulse" />
        </div>
        <div className="w-full pt-12 border-t border-border/40 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-12 w-24 bg-muted/50 rounded mb-3 animate-pulse" />
              <div className="h-4 w-20 bg-muted/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
