export function ValuesSkeleton() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <div className="h-10 w-64 bg-muted/50 rounded mx-auto animate-pulse" />
          <div className="h-6 w-96 bg-muted/50 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 border rounded-[2.5rem] bg-muted/20 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}
