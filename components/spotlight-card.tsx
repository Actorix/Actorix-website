"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/* Soft red glow that follows the cursor inside a card. Pure CSS variables +
   one mousemove handler — no re-renders, no lag. Styles in globals.css. */
export default function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      }}
      className={cn("spotlight-card relative", className)}
    >
      {children}
    </div>
  );
}
