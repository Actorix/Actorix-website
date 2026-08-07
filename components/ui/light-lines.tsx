"use client";

import { cn } from "@/lib/utils";

/* LightLines — adapted from Vengeance UI.
   PERF: the original ran a permanent requestAnimationFrame loop writing
   style.transform on 17 SVG paths every frame (it never stopped, even with the
   section far off-screen). Rewritten as pure CSS keyframe animations: the
   compositor owns them, they cost zero JS per frame, and the browser pauses
   them automatically when the element isn't rendered. Durations/delays are
   deterministic so server and client markup match. */

interface LightLinesProps {
  className?: string;
  linesOpacity?: number;
  lightsOpacity?: number;
  /** higher = faster */
  speedMultiplier?: number;
  gradientFrom?: string;
  gradientTo?: string;
  lightColor?: string;
  lineColor?: string;
  children?: React.ReactNode;
}

/** static vertical rails */
const LINES: [number, number][] = [
  [1253.6, 4.5],
  [873.3, 1.8],
  [1100, 1.8],
  [1547.1, 4.5],
  [615, 4.5],
  [684.6, 1.8],
  [1369.4, 1.8],
  [1310.2, 0.9],
  [1233.4, 0.9],
  [124.2, 0.9],
  [1818.4, 4.5],
  [70.3, 4.5],
  [1618.6, 1.8],
  [455.9, 1.8],
  [328.7, 1.8],
  [300.8, 4.6],
  [1666.4, 0.9],
];

/** travelling light segments: [x, width, y-offset, height, seconds, delay, direction] */
const LIGHTS: [number, number, number, number, number, number, "down" | "up"][] = [
  [615, 4.5, 298, 20, 13, 0, "up"],
  [1253.6, 4.5, 252, 42, 17, 2.4, "up"],
  [873.3, 1.8, 289, 24, 11, 5.1, "up"],
  [1100, 1.8, 983, 8, 15, 1.2, "down"],
  [684.6, 1.8, 928, 23, 19, 3.7, "down"],
  [1547.1, 4.4, 826, 34, 12, 6.3, "down"],
  [1310.2, 0.9, 378, 59, 21, 0.6, "down"],
  [124.2, 0.9, 184, 59, 16, 4.4, "down"],
  [300.8, 4.6, 764, 42, 14, 2.9, "up"],
  [1818.4, 4.5, 170, 14, 18, 5.8, "up"],
  [1666.4, 0.9, 602, 59, 20, 1.8, "down"],
  [1618.6, 1.8, 469, 39, 13, 6.9, "down"],
  [70.3, 4.5, 201, 16, 22, 3.1, "down"],
  [1369.4, 1.8, 829, 38, 15, 0.9, "down"],
  [1233.4, 0.9, 733, 30, 17, 5.4, "down"],
  [455.9, 1.8, 398, 110, 24, 2.1, "down"],
  [328.7, 1.8, 170, 14, 12, 4.9, "up"],
];

export function LightLines({
  className,
  linesOpacity = 0.05,
  lightsOpacity = 0.9,
  speedMultiplier = 1,
  gradientFrom = "#2462F6",
  gradientTo = "#5999F8",
  lightColor = "#fff",
  lineColor = "#fff",
  children,
}: LightLinesProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex h-full w-full justify-center overflow-hidden",
        className
      )}
      style={{
        background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
    >
      <svg
        className="absolute h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g style={{ opacity: linesOpacity }}>
          {LINES.map(([x, w], i) => (
            <rect
              key={i}
              x={x}
              width={w}
              height={1080}
              style={{ fill: lineColor, fillRule: "evenodd", clipRule: "evenodd" }}
            />
          ))}
        </g>

        <g style={{ opacity: lightsOpacity }}>
          {LIGHTS.map(([x, w, y, h, secs, delay, dir], i) => (
            <rect
              key={i}
              className={dir === "down" ? "ll-down" : "ll-up"}
              x={x}
              y={y}
              width={w}
              height={h}
              style={{
                fill: lightColor,
                animationDuration: `${secs / speedMultiplier}s`,
                animationDelay: `-${delay}s`,
              }}
            />
          ))}
        </g>
      </svg>

      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

export default LightLines;
