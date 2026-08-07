"use client";

import { motion } from "framer-motion";

/* Scroll-reveal wrapper — fade-up on first entry, mirrors the section
   reveal timing from the approved design concept. */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.2, 0.75, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
