"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* Hero content recedes as you scroll past it — wearebrand-style depth. */
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);

  return (
    <motion.div ref={ref} style={{ y, opacity, scale }}>
      {children}
    </motion.div>
  );
}
