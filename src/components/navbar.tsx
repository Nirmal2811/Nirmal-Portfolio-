"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Command, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CommandMenu, openCommandMenu } from "@/components/command-menu";
import { useBoot } from "@/components/providers/boot-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSectionNav } from "@/hooks/use-section-nav";
import { profile, sections } from "@/lib/data";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ids = sections.map((s) => s.id);

const extColor: Record<string, string> = {
  tsx: "bg-syntax-type",
  ts: "bg-syntax-fn",
  md: "bg-muted-foreground",
  json: "bg-syntax-number",
  log: "bg-syntax-string",
  sh: "bg-syntax-keyword",
};

function FileDot({ file }: { file: string }) {
  const ext = file.split(".").pop() ?? "";
  return <span aria-hidden="true" className={cn("size-1.5 rounded-full", extColor[ext])} />;
}

export function Navbar() {
  const { ready } = useBoot();
  const pathname = usePathname();
  const spied = useActiveSection(ids);
  // Project detail pages live under /projects, so keep that tab lit there.
  const active = pathname.startsWith("/projects/") ? "projects" : spied;
  const goToSection = useSectionNav();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const go = (id: string) => {
    setMobileOpen(false);
    goToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center gap-2 rounded-xl border px-2 pl-4 transition-all duration-500",
            scrolled || mobileOpen
              ? "border-border/80 bg-background/75 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <button
            onClick={() => go("home")}
            className="group flex shrink-0 items-center gap-1 font-mono text-sm font-semibold"
            aria-label="Home"
          >
            <span className="text-primary">~/</span>
            <span>{profile.handle}</span>
            <span className="inline-block h-4 w-[7px] animate-blink bg-primary" />
          </button>

          {/* IDE-style file tabs */}
          <ul className="mx-auto hidden items-center gap-0.5 lg:flex">
            {sections.slice(1).map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="relative">
                  <button
                    onClick={() => go(s.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-bg"
                        className="absolute inset-0 rounded-md bg-secondary"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      >
                        <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                      </motion.span>
                    )}
                    <span className="relative flex items-center gap-2">
                      <FileDot file={s.file} />
                      {s.file}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <button
              onClick={openCommandMenu}
              className="hidden h-9 items-center gap-2 rounded-md border bg-muted/40 pr-1.5 pl-3 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
            >
              <Search className="size-3.5" />
              <span className="pr-3">Search…</span>
              <kbd className="flex items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 text-[10px]">
                <Command className="size-2.5" />K
              </kbd>
            </button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={openCommandMenu} aria-label="Open command palette">
              <Search className="size-4" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-xl border bg-background/90 p-2 shadow-xl backdrop-blur-xl lg:hidden"
            >
              <p className="px-3 pt-1 pb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                Explorer
              </p>
              <ul>
                {sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035 }}
                  >
                    <button
                      onClick={() => go(s.id)}
                      aria-current={active === s.id ? "true" : undefined}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm",
                        active === s.id ? "bg-secondary text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <FileDot file={s.file} />
                      {s.file}
                      <span className="ml-auto text-xs text-muted-foreground/60">{s.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <CommandMenu />
    </>
  );
}
