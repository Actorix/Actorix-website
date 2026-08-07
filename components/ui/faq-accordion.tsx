"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/* Vengeance UI FaqAccordion, reskinned to Actorix — hairline rows,
   Space Grotesk questions, rotating plus. Grid-rows expand mechanic kept. */

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FaqItem[];
}

export function FaqAccordion({ items = [], className, ...props }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full border-t border-line", className)} {...props}>
      <ul className="m-0 flex w-full list-none flex-col p-0">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={index} className="w-full border-b border-line">
              <button
                className="group flex w-full cursor-pointer items-center justify-between gap-6 py-[22px] text-left"
                onClick={() => setActiveIndex(isActive ? null : index)}
                aria-expanded={isActive}
              >
                <span className="font-display text-lg font-medium tracking-[-0.015em] text-ink transition-colors group-hover:text-red-deep">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex-none text-xl leading-none text-ink-faint transition-transform duration-300",
                    isActive && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="m-0 max-w-[68ch] pr-16 pb-6 text-[15.5px] leading-[1.66] text-ink-soft">
                    {item.answer}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
