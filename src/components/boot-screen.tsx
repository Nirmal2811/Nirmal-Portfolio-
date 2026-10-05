"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

import { useBoot } from "@/components/providers/boot-provider";
import { profile } from "@/lib/data";
import { ease } from "@/lib/motion";

const LINES: { status: "ok" | "warn" | "info"; text: string }[] = [
  { status: "info", text: "portfolio-os v26.10 (tty1)" },
  { status: "ok", text: "Mounting /dev/creativity" },
  { status: "ok", text: "Loading modules: typescript react node" },
  { status: "ok", text: "Starting caffeine.service" },
  { status: "ok", text: "Resolving 1,337 dependencies" },
  { status: "warn", text: "Too many side projects detected — continuing anyway" },
  { status: "ok", text: "Compiling portfolio.tsx" },
  { status: "ok", text: `Welcome, visitor. Booting ${profile.handle}.dev` },
];

const STATUS = {
  ok: <span className="text-primary">[  OK  ]</span>,
  warn: <span className="text-syntax-number">[ WARN ]</span>,
  info: <span className="text-cyan">[ INFO ]</span>,
};

/**
 * Linux-style boot log shown on every page load / refresh.
 * It is server-rendered visible, so it covers the page from the very first paint.
 */
export function BootScreen() {
  const { markReady } = useBoot();
  const lenis = useLenis();
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);
  // Every load starts at the top of the page so the boot sequence flows into it.
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (step < LINES.length) {
      const t = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 200 : 90 + Math.random() * 90);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setVisible(false), 450);
    return () => window.clearTimeout(t);
  }, [step, visible]);

  // Any key or click skips the sequence.
  useEffect(() => {
    if (!visible) return;
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [visible]);

  // Freeze scrolling while booting.
  useEffect(() => {
    if (visible) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = visible ? "hidden" : "";
  }, [visible, lenis]);

  const progress = Math.round((step / LINES.length) * 100);

  return (
    <AnimatePresence onExitComplete={markReady}>
      {visible && (
        <motion.div
          key="boot"
          role="status"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[100] flex items-end bg-background font-mono text-xs sm:items-center sm:text-sm"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="mx-auto w-full max-w-2xl px-6 pb-16 sm:pb-0">
            <div className="space-y-1.5">
              {LINES.slice(0, step).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3 text-muted-foreground"
                >
                  {STATUS[line.status]}
                  <span className={i === LINES.length - 1 ? "text-foreground" : undefined}>{line.text}</span>
                </motion.p>
              ))}
              <span className="inline-block h-4 w-2 animate-blink bg-primary align-middle" />
            </div>

            <div className="mt-8 flex items-center gap-4 text-muted-foreground">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <span className="w-10 text-right tabular-nums">{progress}%</span>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground/60">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
