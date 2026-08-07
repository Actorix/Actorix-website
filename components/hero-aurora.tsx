"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* Pointer-reactive aurora field: three glow blobs drift toward the cursor at
   different depths (framer springs own translate; CSS .aurora-pulse owns the
   breathing on the inner layer). */
export default function HeroAurora() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 35, damping: 18 });
  const sy = useSpring(my, { stiffness: 35, damping: 18 });

  const redX = useTransform(sx, [0, 1], [-36, 36]);
  const redY = useTransform(sy, [0, 1], [-22, 22]);
  const indigoX = useTransform(sx, [0, 1], [26, -26]);
  const indigoY = useTransform(sy, [0, 1], [16, -16]);
  const glintX = useTransform(sx, [0, 1], [-14, 14]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute -top-32 left-[4%] h-[560px] w-[560px]"
        style={{ x: redX, y: redY }}
      >
        <div className="aurora-pulse h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(239,68,68,0.16),transparent)]" />
      </motion.div>
      <motion.div
        className="absolute -top-20 right-[-6%] h-[480px] w-[480px]"
        style={{ x: indigoX, y: indigoY }}
      >
        <div className="aurora-pulse-2 h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(49,46,129,0.12),transparent)]" />
      </motion.div>
      <motion.div
        className="absolute top-64 right-[22%] h-[140px] w-[320px]"
        style={{ x: glintX }}
      >
        {/* no blur filter here — the radial gradient already falls off softly,
            and an animated blurred layer repaints every frame */}
        <div className="aurora-pulse-3 h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(199,210,254,0.42),transparent_75%)]" />
      </motion.div>
    </div>
  );
}
