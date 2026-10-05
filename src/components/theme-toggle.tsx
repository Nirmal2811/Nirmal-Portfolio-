"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMounted } from "@/hooks/use-mounted";

/** Switch theme with a circular "reveal" from the click point (View Transitions API). */
export function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (origin?: { x: number; y: number }, explicit?: "light" | "dark") => {
    const next = explicit ?? (resolvedTheme === "dark" ? "light" : "dark");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || reduce || next === resolvedTheme) {
      setTheme(next);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      // Apply synchronously so the new snapshot already has the new theme.
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.classList.toggle("light", next === "light");
      root.style.colorScheme = next;
      setTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };
}

export function ThemeToggle() {
  const { resolvedTheme } = useTheme();
  const switchTheme = useThemeSwitch();
  const mounted = useMounted();

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          onClick={(e) => switchTheme({ x: e.clientX, y: e.clientY })}
          className="relative overflow-hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
            </motion.span>
          </AnimatePresence>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="font-mono">theme: {isDark ? "dark" : "light"}</TooltipContent>
    </Tooltip>
  );
}
