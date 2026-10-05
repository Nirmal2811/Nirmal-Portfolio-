"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

import { BootProvider } from "@/components/providers/boot-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * Lenis keeps its own scroll position, so sync it on every route change:
 * land on the `#section` in the URL if there is one, otherwise the top of the page.
 */
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const frame = requestAnimationFrame(() => {
      // The new page can be much taller or shorter than the last one; re-measure before jumping.
      lenis.resize();
      const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
      lenis.scrollTo(target ?? 0, { offset: -72, immediate: true, force: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);
  return null;
}

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <BootProvider>
          <TooltipProvider delayDuration={200}>
            <SmoothScroll>{children}</SmoothScroll>
          </TooltipProvider>
        </BootProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
