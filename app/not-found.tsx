
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      <Button asChild className="mt-4">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
