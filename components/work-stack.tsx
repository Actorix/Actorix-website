"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* Sticky stacking work cards.
   Pattern adapted from Skiper UI (skiper16 / StickyCard_001) — https://skiper-ui.com
   by @gurvinder-singh02. Free-tier use requires attribution to Skiper UI.

   PERF: cost is one useScroll for the whole section plus one useTransform per
   card (scale only) — sticky + scale stay on the compositor. The original
   wrapped itself in its own <ReactLenis root>; that is REMOVED here because the
   site already runs a single global Lenis instance (components/smooth-scroll),
   and two Lenis roots fight each other for the scroll.

   Reduced-motion users get a plain stacked list, no scroll transforms. */

export type WorkItem = {
  caseSlug?: string;
  title: string;
  category: string;
  line: string;
  stack: string[];
  href: string;
  image?: string;
  Shot?: React.ComponentType;
};

function Card({
  item,
  i,
  total,
  progress,
  reduced,
}: {
  item: WorkItem;
  i: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const targetScale = 1 - (total - i - 1) * 0.045;
  const range: [number, number] = [i * (1 / total), 1];
  const scale = useTransform(progress, range, [1, targetScale]);
  const { Shot } = item;

  return (
    <div
      className="sticky flex justify-center"
      style={{ top: reduced ? undefined : `calc(9vh + ${i * 16}px)` }}
    >
      <motion.div
        style={reduced ? undefined : { scale }}
        className="w-full origin-top overflow-hidden rounded-[26px] border border-line bg-white p-5 shadow-[0_1px_2px_rgba(11,11,15,0.04),0_30px_60px_-38px_rgba(11,11,15,0.28)] md:p-6"
      >
        <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-8">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/img block"
          >
            {item.image ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line/70 bg-[#0B0B0F]">
                {/* sizes is deliberately tight: these render ~580px CSS, so a
                    2× screen needs ~1160px. A looser value made the browser
                    pick the 1920px candidate — five oversized bitmaps decoded
                    at once inside sticky compositor layers is what made this
                    section stutter. */}
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.category}`}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw"
                  quality={78}
                  className="object-cover transition-transform duration-500 group-hover/img:scale-[1.03]"
                />
              </div>
            ) : Shot ? (
              <Shot />
            ) : null}
          </a>

          <div className="md:py-2">
            <p className="text-[11.5px] font-medium tracking-[0.14em] text-ink-faint uppercase">
              {item.category}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium md:text-[28px]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
              {item.line}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-ink-faint"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              {item.caseSlug && (
                <Link
                  href={`/work/${item.caseSlug}`}
                  className="group/link inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-red"
                >
                  Read the case study
                  <span className="transition-transform duration-300 group-hover/link:translate-x-0.5">
                    →
                  </span>
                </Link>
              )}
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-ink-faint transition-colors hover:text-ink"
              >
                Visit live ↗
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkStack({ items }: { items: WorkItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative mt-12 flex flex-col gap-6 md:gap-8">
      {items.map((item, i) => (
        <Card
          key={item.title}
          item={item}
          i={i}
          total={items.length}
          progress={scrollYProgress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
