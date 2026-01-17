import { cn } from "@/lib/utils";

export function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex gap-2 mb-12">
      {[1, 2].map(i => (
        <div
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-all duration-500",
            step >= i
              ? "bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
              : "bg-muted"
          )}
        />
      ))}
    </div>
  );
}
