"use client";

import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { useBoot } from "@/components/providers/boot-provider";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { ease } from "@/lib/motion";

/**
 * Floating `cd ~` button: a progress ring tracks how far down the page you are,
 * hovering reveals the command, clicking "launches" the arrow and scrolls home.
 */
export function ScrollToTop() {
  const { ready } = useBoot();
  const scrollTo = useScrollTo();
  const [visible, setVisible] = useState(false);
  const arrow = useAnimationControls();

  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));
  const ring = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const percent = useTransform(scrollYProgress, (p) => `${Math.round(p * 100)}%`);

  const onClick = () => {
    arrow.start({
      y: [0, -28, 28, 0],
      opacity: [1, 0, 0, 1],
      transition: { duration: 0.75, times: [0, 0.4, 0.41, 1], ease: "easeInOut" },
    });
    scrollTo("home");
  };

  return (
    <AnimatePresence>
      {ready && visible && (
        <motion.button
          key="scroll-top"
          onClick={onClick}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.4, ease }}
          whileTap={{ scale: 0.92 }}
          className="group fixed right-4 bottom-5 z-40 flex h-12 items-center rounded-full border bg-background/80 p-1 font-mono text-xs shadow-lg shadow-black/10 backdrop-blur-xl transition-colors hover:border-primary/50 focus-visible:border-primary/50 md:right-6 md:bottom-11"
        >
          <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <svg viewBox="0 0 40 40" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
              <circle cx="20" cy="20" r="17" fill="none" strokeWidth="2" className="stroke-border" />
              <motion.circle
                cx="20"
                cy="20"
                r="17"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                className="stroke-primary"
                style={{ pathLength: ring }}
              />
            </svg>
            <motion.span animate={arrow} className="absolute inset-0 flex items-center justify-center text-primary">
              <ArrowUp className="size-4" />
            </motion.span>
          </span>

          {/* label slides out on hover / keyboard focus */}
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
            <span className="overflow-hidden">
              <span className="flex items-center gap-2 pr-4 pl-2 whitespace-nowrap">
                <span className="text-primary">$</span>
                <span className="text-foreground">cd ~</span>
                <motion.span className="w-9 text-right text-muted-foreground tabular-nums">{percent}</motion.span>
              </span>
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
