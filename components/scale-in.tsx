"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Section zooms softly to full size as it enters — used on the contact band. */
export default function ScaleIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }}>
      {children}
    </motion.div>
  );
}
