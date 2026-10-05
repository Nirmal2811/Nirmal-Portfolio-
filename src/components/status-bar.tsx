"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CircleAlert, CircleX, GitBranch, Radio, RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { openCommandMenu } from "@/components/command-menu";
import { useBoot } from "@/components/providers/boot-provider";
import { useMounted } from "@/hooks/use-mounted";
import { useActiveSection } from "@/hooks/use-active-section";
import { sections } from "@/lib/data";

const ids = sections.map((s) => s.id);
import { ease } from "@/lib/motion";


function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = window.setInterval(tick, 15_000);
    return () => window.clearInterval(t);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

/** VS Code–style status bar pinned to the bottom of the viewport on desktop. */
export function StatusBar() {
  const { ready } = useBoot();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();
  const active = useActiveSection(ids);
  const file = pathname.startsWith("/projects/")
    ? `projects/${pathname.split("/")[2]}.md`
    : (sections.find((s) => s.id === active)?.file ?? "index.tsx");

  const { scrollYProgress } = useScroll();
  const line = useTransform(scrollYProgress, (p) => `Ln ${Math.round(p * 419) + 1}, Col 1`);

  return (
    <motion.footer
      initial={{ y: 40 }}
      animate={ready ? { y: 0 } : undefined}
      transition={{ duration: 0.6, ease, delay: 0.4 }}
      aria-label="Editor status bar"
      className="fixed inset-x-0 bottom-0 z-40 hidden h-7 items-center justify-between border-t bg-background/85 px-3 font-mono text-[11px] text-muted-foreground backdrop-blur-xl md:flex"
    >
      <div className="flex h-full items-center">
        <span className="flex h-full items-center gap-1.5 bg-primary px-3 text-primary-foreground">
          <GitBranch className="size-3" /> main
        </span>
        <span className="flex items-center gap-1.5 px-3">
          <RefreshCw className="size-3" /> synced
        </span>
        <span className="flex items-center gap-1 px-2">
          <CircleX className="size-3" /> 0
          <CircleAlert className="ml-1.5 size-3" /> 0
        </span>
        <span className="hidden items-center gap-1.5 px-3 lg:flex">
          <Radio className="size-3 text-primary" /> live
        </span>
      </div>
      <div className="flex items-center">
        <span className="px-3 text-foreground/80">{file}</span>
        <motion.span className="px-3 tabular-nums">{line}</motion.span>
        <span className="hidden px-3 lg:inline">UTF-8</span>
        <span className="hidden px-3 lg:inline">TypeScript JSX</span>
        <span className="px-3">{mounted && resolvedTheme === "light" ? "☀ light" : "☾ dark"}</span>
        <button onClick={openCommandMenu} className="px-3 transition-colors hover:text-foreground">
          ⌘K
        </button>
        <span className="px-3">
          <Clock />
        </span>
      </div>
    </motion.footer>
  );
}
