"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/* Real numbers only — sourced from shipped client work and the founder's
   track record.

   PERF: this replaced Vengeance's AnimatedNumber, which rendered a full 0–9
   strip for EVERY digit position and animated two `layout` spans per digit.
   framer's `layout` measures the DOM on each frame; with 9 digit positions
   firing at once it caused a visible stall right at this scroll position.
   Here each stat is a single motion value driving one text node — no layout
   animation, no DOM churn, and it stops when the count finishes. */

const stats = [
  { target: 5, suffix: "", label: "Client products shipped" },
  { target: 121, suffix: "+", label: "Stores on a client's live CMS" },
  { target: 1000, suffix: "+", label: "Daily users on platforms we built" },
  { target: 4, suffix: "", label: "Years building AI products" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = target.toLocaleString("en-IN");
      setDone(true);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-IN");
      },
      onComplete: () => setDone(true),
    });
    return () => {
      controls.stop();
      // never leave a half-counted number on screen (e.g. the tab was
      // backgrounded mid-count, which pauses requestAnimationFrame)
      el.textContent = target.toLocaleString("en-IN");
      setDone(true);
    };
  }, [target]);

  return (
    <>
      <span ref={ref} className="tabular-nums">
        0
      </span>
      <span
        className="transition-opacity duration-300"
        style={{ opacity: done ? 1 : 0 }}
      >
        {suffix}
      </span>
    </>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-gradient-red flex items-baseline font-display text-4xl font-medium tracking-tight md:text-5xl">
            {inView ? (
              <Counter target={s.target} suffix={s.suffix} />
            ) : (
              <span className="tabular-nums">0</span>
            )}
          </div>
          <p className="mt-2.5 text-[13.5px] leading-snug text-ink-soft">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
