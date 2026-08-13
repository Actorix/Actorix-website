"use client";

import { cn } from "@/lib/utils";

/* Vengeance UI BorderBeam — a light that travels around a card's border.

   Two changes from the registry version:
   - The @keyframes moved to globals.css. The original inlined a <style jsx>
     block, which injects a duplicate <style> tag for every instance on the
     page; one shared keyframe is the same result for none of the cost.
   - Defaults are Actorix red → indigo rather than the orange/purple sample.

   Cost is a single CSS animation on an absolutely-positioned pseudo-element —
   no rAF loop, no state, no re-render. Safe to use more than once. */

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 220,
  duration = 14,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#EF4444",
  colorTo = "#6366F1",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      aria-hidden
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": delay,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[animation:border-beam_calc(var(--duration)*1s)_infinite_linear] after:[animation-delay:var(--delay)s] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
};

export default BorderBeam;
