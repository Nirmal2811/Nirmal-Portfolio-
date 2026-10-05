"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01$&%";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** Start condition in addition to being in view (e.g. wait for the boot screen). */
  enabled?: boolean;
  duration?: number;
  delay?: number;
  scrambleOnHover?: boolean;
};

/** "Decrypts" text from random glyphs, left to right. */
export function ScrambleText({
  text,
  className,
  enabled = true,
  duration = 900,
  delay = 0,
  scrambleOnHover = false,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const frame = useRef<number>(0);
  const played = useRef(false);

  const run = useCallback(() => {
    if (reduce) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < revealed || ch === " ") out += ch;
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [duration, reduce, text]);

  useEffect(() => {
    if (!inView || !enabled || played.current) return;
    played.current = true;
    const t = window.setTimeout(run, delay);
    return () => window.clearTimeout(t);
  }, [inView, enabled, delay, run]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <span
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseEnter={scrambleOnHover ? run : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
