import React from "react";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface TOCItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  toc: TOCItem[];
  activeSection: string;
  t: {
    content_maps: string;
    join_discussion: string;
    discussion_desc: string;
    view_community: string;
  };
}

function TableOfContentsComponent({ toc, activeSection, t }: TableOfContentsProps) {
  return (
    <aside className="hidden lg:block sticky top-32 space-y-10">
      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground ml-4">{t.content_maps}</h4>
        <nav className="flex flex-col gap-2">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-bold transition-all border border-transparent",
                activeSection === item.id 
                  ? "bg-primary/10 text-primary border-primary/20 translate-x-2" 
                  : "text-muted-foreground hover:text-primary hover:bg-muted/50"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="px-4 py-8 rounded-3xl bg-muted/30 border border-border/50 space-y-6">
        <div className="flex items-center gap-3 text-primary">
          <MessageSquare size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">{t.join_discussion}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t.discussion_desc}
        </p>
        <button className="text-xs font-bold text-primary hover:underline">{t.view_community} →</button>
      </div>
    </aside>
  );
}

export default React.memo(TableOfContentsComponent);
