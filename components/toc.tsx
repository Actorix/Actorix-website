"use client";

import { useEffect, useState } from "react";

/* Sticky table of contents with scroll-spy.

   PERF: uses a single IntersectionObserver over the headings — no scroll
   listener, no rAF loop, no per-frame measurement. The active link is the only
   thing that re-renders, and only when a heading crosses the band.

   SEO: purely additive. Real <a href="#id"> anchors to headings that already
   exist in the server HTML; nothing is hidden or gated behind JS. */

export type TocItem = { id: string; text: string };

export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the topmost heading currently inside the band
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      // band across the upper part of the viewport
      { rootMargin: "-88px 0px -65% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null; // not worth it on short posts

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
    >
      <p className="text-[10.5px] font-medium tracking-[0.18em] text-ink-faint uppercase">
        On this page
      </p>
      <ul className="mt-4 flex flex-col gap-1 border-l border-line">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                  isActive
                    ? "border-red font-medium text-ink"
                    : "border-transparent text-ink-faint hover:text-ink-soft"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
