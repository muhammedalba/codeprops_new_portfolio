"use client";

import React, { useState, useEffect } from "react";
import TableOfContents from "./sections/TableOfContents";

interface TOCIslandProps {
  toc: { id: string; label: string }[];
  t: any;
}

export function TOCIsland({ toc, t }: TOCIslandProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = new Map();
    const options = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
        observers.set(item.id, element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  return <TableOfContents toc={toc} activeSection={activeSection} t={t} />;
}
