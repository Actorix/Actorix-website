"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

/* Scroll-velocity skew — the marquee leans into your scroll direction. */
export default function VelocityTilt({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-1600, 1600], [5, -5]), {
    stiffness: 220,
    damping: 28,
  });

  return <motion.div style={{ skewX: skew }}>{children}</motion.div>;
}
