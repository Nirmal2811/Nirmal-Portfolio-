"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

import { Counter } from "@/components/effects/counter";
import { Section } from "@/components/section";
import { WindowChrome } from "@/components/window-chrome";
import { about, profile } from "@/lib/data";
import { fadeUp, inView, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Seeded PRNG so server and client render the same heatmap. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LEVELS = ["bg-muted", "bg-primary/25", "bg-primary/45", "bg-primary/70", "bg-primary"];
const WEEKS = 53;

function Heatmap() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: "-10% 0px" });

  const cells = useMemo(() => {
    const rand = mulberry32(1337);
    return Array.from({ length: WEEKS * 7 }, (_, i) => {
      const col = Math.floor(i / 7);
      const row = i % 7;
      const weekend = row === 0 || row === 6;
      // busier towards recent weeks, quieter on weekends
      const r = rand() * (0.55 + col / WEEKS / 1.6) * (weekend ? 0.55 : 1);
      const level = r < 0.18 ? 0 : r < 0.38 ? 1 : r < 0.58 ? 2 : r < 0.78 ? 3 : 4;
      return { level, delay: col + row };
    });
  }, []);

  return (
    <div>
      <div
        ref={ref}
        data-visible={visible}
        className="heatmap grid grid-flow-col grid-rows-7 gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
        role="img"
        aria-label="Contribution activity over the past year"
      >
        {cells.map((c, i) => (
          <span
            key={i}
            className={cn("heatmap-cell aspect-square rounded-[2px]", LEVELS[c.level])}
            style={{ "--d": c.delay } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
        less
        {LEVELS.map((l) => (
          <span key={l} className={cn("size-2.5 rounded-[2px]", l)} />
        ))}
        more
      </div>
    </div>
  );
}

export function About() {
  return (
    <Section
      id="about"
      index="01"
      file="about.md"
      title={
        <>
          Engineer by trade, <span className="text-gradient">craftsman</span> by habit.
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
        <motion.div initial="hidden" whileInView="show" viewport={inView} variants={fadeUp}>
          <WindowChrome title="README.md" className="h-full" bodyClassName="p-6 sm:p-8">
            <article className="space-y-5">
              <h3 className="flex items-baseline gap-3 text-xl font-semibold sm:text-2xl">
                <span className="font-mono text-primary">#</span>
                Hi, I&apos;m {profile.name.split(" ")[0]}.
              </h3>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed text-pretty text-muted-foreground">
                  {p}
                </p>
              ))}
              <h4 className="flex items-baseline gap-3 pt-2 font-semibold">
                <span className="font-mono text-primary">##</span> Quick facts
              </h4>
              <ul className="grid gap-2 font-mono text-sm sm:grid-cols-2">
                {about.facts.map((f) => (
                  <li key={f.key} className="flex gap-2 rounded-lg border bg-muted/30 px-3 py-2">
                    <span className="text-syntax-prop">{f.key}:</span>
                    <span className="min-w-0 break-words text-syntax-string">{f.value}</span>
                  </li>
                ))}
              </ul>
            </article>
          </WindowChrome>
        </motion.div>

        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={stagger(0.08, 0.1)}
        >
          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-xl border bg-card/60 p-5 transition-colors hover:border-primary/40"
              >
                <div className="absolute -top-10 -right-10 size-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <p className="font-mono text-3xl font-bold tracking-tight sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  <span className="text-syntax-comment">{"// "}</span>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="rounded-xl border bg-card/60 p-5">
            <div className="mb-4 flex items-center justify-between font-mono text-xs">
              <span className="text-muted-foreground">
                <span className="text-primary">$</span> git log --since=&quot;1 year&quot;
              </span>
              <span className="text-foreground">commit activity</span>
            </div>
            <Heatmap />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
