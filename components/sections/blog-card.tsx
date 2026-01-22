import React, { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlowEffect } from "@/components/ui/glow-effect";
import Image from "next/image";

interface BlogCardProps {
  category: string;
  date: string;
  title: string;
  readMoreText: string;
  href?: string;
  className?: string;
  image?: string;
}

function BlogCardComponent({
  category,
  date,
  title,
  readMoreText,
  href = "#",
  className,
  image,
}: BlogCardProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl =image ?`${baseUrl}${image}`: `${baseUrl}/images/blog/Default-1.webp`;
  return (
    <div
      className={cn(
        "group relative cursor-pointer border border-border/50 rounded-3xl overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-500 z-10",
        className
      )}
    >
      {/* Dynamic Glow Effect */}
      <GlowEffect
        size="sm"
        color="bg-primary/20"
        className="bottom-0 right-0 opacity-100 transition-opacity duration-700"
      />

      {/* Image / Placeholder Area */}
      <div className="aspect-[16/10] bg-muted overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Image
          src={imageUrl}
          alt={title}
            fill
             priority
          className="object-cover"
        />
        <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-border/50">
          {category}
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-mono text-primary mb-3">
          {date}
        </p>
        <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight line-clamp-2">
          {title}
        </h3>
        
        <Link 
          href={href}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider group/link"
        >
          <span className="relative">
            {readMoreText}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300" />
          </span>
          <ArrowUpRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export const BlogCard = memo(BlogCardComponent);
