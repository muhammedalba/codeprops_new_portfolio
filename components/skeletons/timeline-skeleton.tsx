export function TimelineSkeleton() {
  return (
    <section className="py-24 md:py-32 bg-muted/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <div className="h-10 w-64 bg-muted/50 rounded mx-auto animate-pulse" />
          <div className="h-6 w-96 bg-muted/50 rounded mx-auto animate-pulse" />
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-8 items-center">
              <div className="flex-1 h-32 bg-muted/50 rounded-3xl animate-pulse" />
              <div className="w-10 h-10 rounded-full bg-muted/50 animate-pulse" />
              <div className="flex-1 h-32 bg-muted/50 rounded-3xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
