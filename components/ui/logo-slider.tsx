"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* =============================================================================
   LogoSlider — infinite marquee (adapted from Vengeance UI).
   The track holds the item set twice and animates -50%; edges fade via mask.
   Keyframes live in globals.css (.logo-slider__track).
============================================================================= */

export interface LogoSliderProps {
  /** Array of React nodes (logos, text chips, images) to display */
  logos: React.ReactNode[];
  /** Seconds for one full loop (default 28) */
  speed?: number;
  /** Scroll direction. Default: "left" */
  direction?: "left" | "right";
  /** Pause animation on hover. Default: true */
  pauseOnHover?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const LogoSlider = ({
  logos,
  speed = 28,
  direction = "left",
  pauseOnHover = true,
  className,
}: LogoSliderProps) => {
  return (
    <div
      className={cn(
        "logo-slider w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
      data-pause-on-hover={pauseOnHover}
    >
      <div
        className="logo-slider__track flex w-max items-center"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : undefined,
        }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="shrink-0">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
};

LogoSlider.displayName = "LogoSlider";

export default LogoSlider;
