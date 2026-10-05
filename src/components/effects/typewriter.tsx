"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TypewriterProps = {
  words: readonly string[];
  className?: string;
  enabled?: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  hold?: number;
};

/** Types, holds, deletes and cycles through a list of words, with a block caret. */
export function Typewriter({
  words,
  className,
  enabled = true,
  typeSpeed = 65,
  deleteSpeed = 32,
  hold = 1800,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || reduce) return;
    const word = words[index % words.length];

    let delay = deleting ? deleteSpeed : typeSpeed + Math.random() * 40;
    if (!deleting && text === word) delay = hold;
    if (deleting && text === "") delay = 300;

    const t = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, index, words, enabled, reduce, typeSpeed, deleteSpeed, hold]);

  const shown = reduce ? words[0] : text;

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{shown}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.08em] animate-blink bg-primary"
      />
    </span>
  );
}
