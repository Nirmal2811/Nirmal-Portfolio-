"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { CodeBlock } from "@/components/effects/code-block";
import { useMediaQuery } from "@/hooks/use-media-query";
import { codeWallColumns } from "@/lib/code-wall";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { duration: "90s", reverse: false, className: "" },
  { duration: "120s", reverse: true, className: "hidden md:block" },
  { duration: "100s", reverse: false, className: "hidden lg:block" },
];

/** Columns of source code endlessly scrolling. Rendered twice: dim base + cursor-lit copy. */
function CodeWall({ className, style }: { className?: string; style?: React.ComponentProps<typeof motion.div>["style"] }) {
  return (
    <motion.div
      className={cn("absolute inset-0 grid grid-cols-1 gap-10 px-6 md:grid-cols-2 lg:grid-cols-3", className)}
      style={style}
    >
      {COLUMNS.map((col, i) => (
        <div key={i} className={cn("relative overflow-hidden", col.className)}>
          <div
            className={cn(
              "flex flex-col will-change-transform",
              col.reverse ? "animate-marquee-y-reverse" : "animate-marquee-y",
            )}
            style={{ "--marquee-duration": col.duration } as React.CSSProperties}
          >
            {/* two identical copies so translateY(-50%) loops seamlessly */}
            {[0, 1].map((copy) => (
              <CodeBlock
                key={copy}
                code={codeWallColumns[i] + "\n\n"}
                lineNumbers
                className="text-[12px] leading-6 whitespace-pre"
              />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/** Hero backdrop: a wall of live-scrolling source code, lit up by a flashlight that follows the cursor. */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const flashlight = useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, black 20%, transparent 100%)`;
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, color-mix(in oklch, var(--primary) 10%, transparent), transparent 70%)`;

  // Phones get a static backdrop: the scrolling code wall and huge blurs are too heavy to paint there.
  const desktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!desktop) return;
    const onMove = (e: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set(e.clientX - rect.left);
      my.set(e.clientY - rect.top);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [desktop, mx, my]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {desktop ? (
        <>
          {/* dim code, faded towards the edges */}
          <div className="absolute inset-0 opacity-[0.13] mask-fade-y dark:opacity-[0.11]">
            <CodeWall />
          </div>

          {/* the same code, brightly lit under the cursor */}
          <div className="absolute inset-0 opacity-70 mask-fade-y">
            <CodeWall style={{ maskImage: flashlight, WebkitMaskImage: flashlight }} />
          </div>
          <motion.div className="absolute inset-0" style={{ background: glow }} />

          {/* soften the area behind the headline so it stays readable */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_25%_50%,var(--background)_15%,transparent_75%)] opacity-80" />

          {/* ambient glow */}
          <div className="absolute -top-40 left-1/2 h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[-20%] h-[380px] w-[480px] rounded-full bg-cyan/10 blur-[120px]" />
        </>
      ) : (
        <>
          {/* faint grid + soft gradients instead of blur filters */}
          <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_45%_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_100%_100%,color-mix(in_oklch,var(--cyan)_12%,transparent),transparent_70%)]" />
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
