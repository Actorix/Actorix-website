/* Floating light motes in the hero — pure CSS, precomputed positions
   (deterministic: no hydration mismatch), zero JS at runtime. */

const DOTS: {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  glint?: boolean;
}[] = [
  { left: "8%", top: "30%", size: 4, delay: 0, duration: 8 },
  { left: "16%", top: "62%", size: 3, delay: 2.2, duration: 9 },
  { left: "24%", top: "18%", size: 3, delay: 4.1, duration: 7 },
  { left: "33%", top: "70%", size: 4, delay: 1.3, duration: 10 },
  { left: "42%", top: "26%", size: 3, delay: 5.6, duration: 8, glint: true },
  { left: "55%", top: "58%", size: 4, delay: 0.8, duration: 9 },
  { left: "63%", top: "22%", size: 3, delay: 3.4, duration: 7, glint: true },
  { left: "71%", top: "66%", size: 3, delay: 6.2, duration: 8 },
  { left: "79%", top: "34%", size: 4, delay: 1.9, duration: 10, glint: true },
  { left: "87%", top: "54%", size: 3, delay: 4.8, duration: 9 },
  { left: "93%", top: "28%", size: 3, delay: 2.7, duration: 8 },
  { left: "48%", top: "80%", size: 3, delay: 7.1, duration: 9 },
];

export default function HeroSparkles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className={d.glint ? "sparkle sparkle--glint" : "sparkle"}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
