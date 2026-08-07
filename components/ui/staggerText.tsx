'use client'
import React from "react";
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number, delay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const item = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.6, ease: EASE },
  },
};

const TextAnimation = ({
  children,
  delay = 0,
  divideBy = "word",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  divideBy?: "word" | "letter";
  className?: string;
}) => {
  if (typeof children !== "string") {
    if (typeof children === "number" || typeof children === "boolean") {
      children = String(children);
    } else {
      console.warn("TextAnimation only supports plain text/string children.");
      return <>{children}</>;
    }
  }

  const text = children as string;
  const parts =
    divideBy === "letter" ? text.split("") : text.split(" ");
  const stagger = divideBy === "letter" ? 0.02 : 0.05;

  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ display: "inline" }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          /* pb keeps descenders/ascenders from being clipped by the mask on
             tight line-heights (large display headings) */
          className="inline-block overflow-hidden relative pb-[0.08em]"
          style={{ verticalAlign: "top" }}
        >
          <motion.span
            variants={item}
            /* no permanent will-change: framer promotes the layer during the
               animation and releases it after — a static will-change on every
               word kept dozens of layers alive for the life of the page */
            className={cn("inline-block", className)}
          >
            {divideBy === "letter"
              ? part === " "
                ? "\u00A0"
                : part
              : part + "\u00A0"}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default TextAnimation;
