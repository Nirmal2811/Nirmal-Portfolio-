"use client";

import { useEffect, useState } from "react";

const FRAMES = "⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏";

/** Braille CLI spinner, like the ones in npm / pnpm. */
export function Spinner({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % FRAMES.length), 80);
    return () => window.clearInterval(t);
  }, []);
  return (
    <span aria-hidden="true" className={className}>
      {FRAMES[i]}
    </span>
  );
}
