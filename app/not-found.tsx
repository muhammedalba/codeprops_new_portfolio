import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, AlertTriangle, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      
      {/* Icon with existing float animation */}
      <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-secondary/30 animate-float">
        <FileQuestion className="h-16 w-16 text-primary" />
      </div>

      <h1 className="mb-2 text-6xl font-black tracking-tighter sm:text-8xl text-primary">
        404
      </h1>
      
      <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
        Page Not Found
      </h2>

      <p className="mb-8 max-w-md text-muted-foreground text-lg">
        The page you are looking for has been moved, deleted, or possibly never existed.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="gap-2 min-w-[160px]">
          <Link href="/">
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="gap-2 min-w-[160px]">
          <Link href="/contact">
            <AlertTriangle className="h-4 w-4" />
            Report Issue
          </Link>
        </Button>
      </div>

      <div className="mt-12 text-sm text-muted-foreground/50 font-mono">
        Error Code: 404_NOT_FOUND
      </div>
    </div>
  );
}
