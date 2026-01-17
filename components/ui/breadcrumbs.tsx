import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  locale: string;
}

export function Breadcrumbs({ items, className = "", locale }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
      <Link 
        href={`/${locale}`}
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label="Home"
      >
        <Home size={23} />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-muted-foreground/50" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-semibold">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
