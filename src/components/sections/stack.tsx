"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronDown, FileJson, Folder } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/section";
import { WindowChrome } from "@/components/window-chrome";
import { marquee, skillGroups } from "@/lib/data";
import { fadeUp, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";

const BAR_WIDTH = 20;

/** `[██████████░░░░]` progress bar that fills block by block. */
function AsciiBar({ level, delay, active }: { level: number; delay: number; active: boolean }) {
  const reduce = useReducedMotion();
  const target = Math.round((level / 100) * BAR_WIDTH);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setFilled(target);
      return;
    }
    setFilled(0);
    let n = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        n += 1;
        setFilled(n);
        if (n >= target) window.clearInterval(interval);
      }, 28);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [active, target, delay, reduce]);

  const pct = Math.round((filled / BAR_WIDTH) * 100);

  return (
    <span className="flex items-center gap-3" aria-label={`${level}%`}>
      <span aria-hidden="true" className="text-[11px] whitespace-pre sm:text-xs">
        <span className="text-muted-foreground/60">[</span>
        <span className="text-primary">{"■".repeat(filled)}</span>
        <span className="text-muted-foreground/20">{"■".repeat(BAR_WIDTH - filled)}</span>
        <span className="text-muted-foreground/60">]</span>
      </span>
      <span aria-hidden="true" className="w-9 text-right text-muted-foreground tabular-nums">
        {Math.min(pct, level)}%
      </span>
    </span>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Repeat short lists so one half of the track is always wider than the viewport.
  const base = items.length < 12 ? [...items, ...items] : items;
  return (
    <div className="group flex overflow-hidden mask-fade-x">
      <div
        className={cn(
          "flex shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": "55s" } as React.CSSProperties}
      >
        {[...base, ...base].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2 rounded-lg border bg-card/60 px-4 py-2 font-mono text-sm whitespace-nowrap text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <span className="text-primary">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const [groupId, setGroupId] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === groupId) ?? skillGroups[0];
  const panelRef = useRef<HTMLDivElement>(null);
  const visible = useInView(panelRef, { once: true, margin: "-15% 0px" });

  const half = Math.ceil(marquee.length / 2);

  return (
    <Section
      id="stack"
      index="02"
      file="stack.json"
      title={
        <>
          The <span className="text-gradient">toolchain</span> I reach for.
        </>
      }
      description="The languages, frameworks and tools I use to ship client projects every day. Pick a folder to inspect the lockfile."
    >
      <motion.div initial="hidden" whileInView="show" viewport={inView} variants={fadeUp}>
        <WindowChrome
          title="skills/package-lock.json"
          bodyClassName="grid grid-cols-1 md:grid-cols-[220px_1fr]"
          right={<span className="font-mono text-[10px] text-muted-foreground/70">JSON</span>}
        >
          {/* explorer */}
          <div className="border-b bg-muted/20 p-3 md:border-r md:border-b-0">
            <p className="hidden px-2 pb-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase md:block">
              Explorer
            </p>
            <div className="hidden items-center gap-1.5 px-2 py-1 font-mono text-xs text-muted-foreground md:flex">
              <ChevronDown className="size-3.5" />
              <Folder className="size-3.5 text-syntax-number" /> skills
            </div>
            <div role="tablist" aria-label="Skill groups" className="flex gap-1 overflow-x-auto md:flex-col md:pl-4">
              {skillGroups.map((g) => {
                const selected = g.id === groupId;
                return (
                  <button
                    key={g.id}
                    role="tab"
                    aria-selected={selected}
                    aria-controls="skills-panel"
                    onClick={() => setGroupId(g.id)}
                    className={cn(
                      "relative flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs transition-colors",
                      selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="skill-tab"
                        className="absolute inset-0 rounded-md border border-primary/30 bg-primary/10"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <FileJson className="relative size-3.5 text-syntax-number" />
                    <span className="relative">{g.label}.json</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* panel */}
          <div
            ref={panelRef}
            id="skills-panel"
            role="tabpanel"
            className="min-h-[340px] overflow-x-auto p-5 font-mono text-[12px] sm:p-6 sm:text-[13px]"
          >
            <p className="text-muted-foreground">
              <span className="text-primary">❯</span> npm ls --depth=0 --workspace={group.label}
            </p>
            <AnimatePresence mode="wait">
              <motion.ul
                key={group.id}
                className="mt-4 space-y-2.5"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              >
                {group.skills.map((s, i) => (
                  <motion.li
                    key={s.name}
                    variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                    className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <span className="whitespace-nowrap">
                      <span className="text-muted-foreground/50">{i === group.skills.length - 1 ? "└── " : "├── "}</span>
                      <span className="text-syntax-string">{s.name}</span>
                      <span className="text-muted-foreground">@{s.version}</span>
                    </span>
                    <span className="pl-8 sm:pl-0">
                      <AsciiBar level={s.level} delay={i * 90} active={visible} />
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <p className="mt-6 text-muted-foreground">
              <span className="text-primary">✓</span> {group.skills.length} packages audited ·{" "}
              <span className="text-foreground">found 0 vulnerabilities</span>
            </p>
          </div>
        </WindowChrome>
      </motion.div>

      <div className="mt-12 space-y-3">
        <Marquee items={marquee.slice(0, half)} />
        <Marquee items={marquee.slice(half)} reverse />
      </div>
    </Section>
  );
}
