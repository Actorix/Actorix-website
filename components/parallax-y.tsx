"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Element drifts vertically against scroll — used on work-card visuals. */
export default function ParallaxY({
  children,
  range = 16,
  className,
}: {
  children: React.ReactNode;
  range?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
