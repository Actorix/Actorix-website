"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* Scroll-driven process timeline: a brand-gradient line draws itself across
   the steps as you scroll, and each node lights up as the line reaches it. */

export type Step = { number: string; title: string; line: string };

function Node({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  // the point along the scroll where this node should light up
  const threshold = total === 1 ? 0 : index / total;
  const active = useTransform(progress, (p): number => (p >= threshold ? 1 : 0));

  const dotScale = useTransform(active, [0, 1], [1, 1.35]);
  const dotBg = useTransform(active, [0, 1], ["#ECECF0", "#DC2626"]);
  const ringOpacity = useTransform(active, [0, 1], [0, 0.28]);
  const numColor = useTransform(active, [0, 1], ["#9a9aa3", "#B91C1C"]);
  const textOpacity = useTransform(active, [0, 1], [0.55, 1]);

  return (
    <motion.div style={{ opacity: textOpacity }}>
      <div className="relative flex items-center gap-3">
        <span className="relative grid place-items-center">
          <motion.span
            className="absolute h-5 w-5 rounded-full bg-red"
            style={{ opacity: ringOpacity }}
          />
          <motion.span
            className="relative h-2.5 w-2.5 rounded-full"
            style={{ background: dotBg, scale: dotScale }}
          />
        </span>
        <motion.span
          className="font-display text-[13px] font-medium tracking-[0.06em]"
          style={{ color: numColor }}
        >
          {step.number}
        </motion.span>
      </div>
      <h3 className="mt-4 font-display text-xl font-medium">{step.title}</h3>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-soft">{step.line}</p>
    </motion.div>
  );
}

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative mt-14">
      {/* rail — horizontal on desktop, vertical on mobile */}
      <div className="relative">
        <div className="absolute top-[5px] right-0 left-0 hidden h-px bg-line md:block" />
        <motion.div
          className="btn-gradient absolute top-[5px] left-0 hidden h-px origin-left md:block"
          style={{ scaleX: progress, width: "100%" }}
        />
        <div className="absolute top-0 bottom-0 left-[5px] w-px bg-line md:hidden" />
        <motion.div
          className="btn-gradient absolute top-0 left-[5px] w-px origin-top md:hidden"
          style={{ scaleY: progress, height: "100%" }}
        />

        <div className="grid gap-10 pt-0 sm:grid-cols-2 md:grid-cols-4 md:gap-7">
          {steps.map((s, i) => (
            <div key={s.number} className="pl-8 md:pl-0">
              <Node step={s} index={i} total={steps.length} progress={progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
