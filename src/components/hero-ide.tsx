"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, GitBranch, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { heroCode, profile } from "@/lib/data";
import { highlight, tokenClass, type TokenType } from "@/lib/highlight";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Editor model                                                       */
/* ------------------------------------------------------------------ */

type Phase = "idle" | "typing" | "suggest" | "accepted" | "pipeline" | "deployed";
type Seg = { type: TokenType | "ghost" | "cursor"; text: string };

const FULL = heroCode.typed + heroCode.suggestion;
const GHOST_FROM = heroCode.typed.length;
const TOTAL_LINES = FULL.split("\n").length;
const LINE_H = 20;

const STAGES = [
  { name: "lint", time: "0.4s" },
  { name: "types", time: "1.1s" },
  { name: "test", time: "3.2s" },
  { name: "build", time: "8.7s" },
  { name: "deploy", time: "2.1s" },
];

/** Builds editor lines from per-character tokens, marking ghost text and the cursor position. */
function buildLines(
  chars: { ch: string; type: TokenType }[],
  visible: number,
  ghostFrom: number,
  cursorAt: number,
): Seg[][] {
  const lines: Seg[][] = [[]];
  const push = (type: Seg["type"], text: string) => {
    const line = lines[lines.length - 1];
    const last = line[line.length - 1];
    if (last && last.type === type && type !== "cursor") last.text += text;
    else line.push({ type, text });
  };
  for (let i = 0; i < visible; i++) {
    if (i === cursorAt) push("cursor", "");
    const { ch, type } = chars[i];
    if (ch === "\n") lines.push([]);
    else push(i >= ghostFrom ? "ghost" : type, ch);
  }
  if (cursorAt >= visible) push("cursor", "");
  return lines;
}

/** Drives the sequence: type → AI suggestion → accept & save → CI pipeline → deployed. */
function useIdeSequence(ready: boolean) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!ready || phase !== "idle") return;
    if (reduce) {
      setCount(GHOST_FROM);
      setStage(STAGES.length);
      setPhase("deployed");
    } else {
      setPhase("typing");
    }
  }, [ready, reduce, phase]);

  useEffect(() => {
    let t: number | undefined;
    if (phase === "typing") {
      let i = 0;
      const step = () => {
        const ch = FULL[i];
        i += ch === " " ? 3 : 2;
        setCount(Math.min(i, GHOST_FROM));
        if (i >= GHOST_FROM) {
          t = window.setTimeout(() => setPhase("suggest"), 350);
          return;
        }
        t = window.setTimeout(step, ch === "\n" ? 110 : 22 + Math.random() * 22);
      };
      t = window.setTimeout(step, 400);
    } else if (phase === "suggest") {
      t = window.setTimeout(() => setPhase("accepted"), 1500);
    } else if (phase === "accepted") {
      t = window.setTimeout(() => setPhase("pipeline"), 700);
    } else if (phase === "pipeline") {
      t = window.setTimeout(() => {
        if (stage + 1 >= STAGES.length) {
          setStage(STAGES.length);
          setPhase("deployed");
        } else setStage(stage + 1);
      }, 520);
    }
    return () => window.clearTimeout(t);
  }, [phase, stage]);

  return { phase, count, stage };
}

/* ------------------------------------------------------------------ */
/*  Pipeline panel                                                     */
/* ------------------------------------------------------------------ */

function StageNode({ state }: { state: "pending" | "running" | "done" }) {
  return (
    <span className="relative grid size-5 shrink-0 place-items-center bg-editor">
      {state === "running" && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
      )}
      {state === "done" ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"
        >
          <Check className="size-3" strokeWidth={3} />
        </motion.span>
      ) : (
        <span
          className={cn(
            "size-1.5 rounded-full",
            state === "running" ? "bg-primary" : "bg-muted-foreground/40 ring-4 ring-muted-foreground/10",
          )}
        />
      )}
    </span>
  );
}

function Pipeline({ phase, stage }: { phase: Phase; stage: number }) {
  const running = phase === "pipeline";
  const host = profile.url.replace(/^https?:\/\//, "");

  return (
    <div className="flex items-center gap-4 border-t bg-muted/15 px-4 py-2.5 text-[11px] sm:flex-col sm:items-stretch sm:gap-0 sm:border-t-0 sm:border-l sm:p-4">
      <p className="mb-3 hidden items-center justify-between text-[10px] tracking-wider text-muted-foreground uppercase sm:flex">
        Pipeline
        <span className="normal-case tracking-normal opacity-70">#{heroCode.pullRequest.number}</span>
      </p>

      {/* phones: a single row of status dots · sm+: a vertical list with names and timings */}
      <ol className="relative flex gap-1.5 sm:grid sm:grid-cols-1 sm:gap-0">
        {/* vertical rail (sm+) */}
        <span className="absolute top-2.5 bottom-2.5 left-[9.5px] hidden w-px bg-border sm:block" />
        <motion.span
          className="absolute top-2.5 bottom-2.5 left-[9.5px] hidden w-px origin-top bg-primary sm:block"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: Math.min(stage, STAGES.length - 1) / (STAGES.length - 1) }}
          transition={{ duration: 0.45, ease }}
        />
        {STAGES.map((s, i) => {
          const state = i < stage ? "done" : running && i === stage ? "running" : "pending";
          return (
            <li key={s.name} className="relative flex items-center sm:gap-2.5 sm:py-1" title={s.name}>
              <StageNode state={state} />
              <span className={cn("hidden sm:inline", state === "pending" ? "text-muted-foreground" : "text-foreground")}>
                {s.name}
              </span>
              <span className="ml-auto hidden text-[10px] text-muted-foreground tabular-nums sm:inline">
                {state === "done" ? s.time : ""}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="ml-auto flex h-6 min-w-0 items-center sm:mt-auto sm:ml-0">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "deployed" ? (
            <motion.span
              key="live"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-w-0 items-center gap-2"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />
                <span className="relative size-2 rounded-full bg-primary" />
              </span>
              <span className="truncate text-cyan">{host}</span>
            </motion.span>
          ) : (
            <motion.span key="wait" exit={{ opacity: 0 }} className="text-muted-foreground">
              {running ? "deploying…" : "waiting for save"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  IDE                                                                */
/* ------------------------------------------------------------------ */

export function HeroIde({ ready }: { ready: boolean }) {
  const { phase, count, stage } = useIdeSequence(ready);
  const chars = useMemo(
    () => highlight(FULL).flatMap((t) => [...t.text].map((ch) => ({ ch, type: t.type }))),
    [],
  );

  const showGhost = phase === "suggest";
  const saved = phase === "accepted" || phase === "pipeline" || phase === "deployed";
  const visible = saved || showGhost ? FULL.length : count;
  const cursorAt = showGhost ? GHOST_FROM : visible;
  const lines = buildLines(chars, visible, showGhost ? GHOST_FROM : Infinity, cursorAt);

  const cursorLine = FULL.slice(0, cursorAt).split("\n").length - 1;
  const ghostLine = heroCode.typed.split("\n").length - 1;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 1, ease, delay: 0.45 }}
    >
      <div className="absolute -inset-x-8 -inset-y-6 hidden rounded-[2rem] bg-gradient-to-br from-primary/15 via-transparent to-cyan/15 blur-2xl md:block" />

      <div className="border-beam relative rounded-xl">
        <div className="relative overflow-hidden rounded-xl border bg-editor font-mono shadow-lg shadow-black/10 md:shadow-2xl md:shadow-black/15 dark:shadow-black/40 md:dark:shadow-black/50">
          {/* title bar */}
          <div className="flex h-10 items-center gap-3 border-b px-4 text-[11px] text-muted-foreground">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-foreground/90">
              <span className="text-[9px] font-bold text-syntax-number">
                {heroCode.file.split(".").pop()?.toUpperCase()}
              </span>
              {[...heroCode.path, heroCode.file].join("/")}
              <span
                className={cn("size-1.5 rounded-full transition-colors", saved ? "bg-transparent" : "bg-foreground/60")}
                aria-label={saved ? "saved" : "unsaved"}
              />
            </div>
            <span className="flex items-center gap-1">
              <GitBranch className="size-3" /> main
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_10.5rem]">
            {/* code */}
            <div className="no-scrollbar overflow-x-auto py-3 text-[11.5px] sm:text-[12.5px]" style={{ minHeight: TOTAL_LINES * LINE_H + 24 }}>
              <span className="sr-only">{FULL}</span>
              <div aria-hidden="true" className="min-w-max">
                {lines.map((line, i) => {
                  const active = i === cursorLine;
                  const flash = phase === "accepted" && i >= ghostLine;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center pr-4 transition-colors duration-700",
                        active && "bg-foreground/[0.04]",
                        flash && "bg-primary/15",
                      )}
                      style={{ height: LINE_H }}
                    >
                      <span
                        className={cn(
                          "w-10 shrink-0 pr-4 text-right tabular-nums",
                          active ? "text-foreground/80" : "text-editor-gutter/70",
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="whitespace-pre">
                        {line.map((s, j) =>
                          s.type === "cursor" ? (
                            <span
                              key={j}
                              className="inline-block h-[1.15em] w-[2px] translate-y-[0.2em] animate-blink bg-primary"
                            />
                          ) : (
                            <span
                              key={j}
                              className={s.type === "ghost" ? "text-muted-foreground/50 italic" : tokenClass[s.type]}
                            >
                              {s.text}
                            </span>
                          ),
                        )}
                        {showGhost && i === ghostLine && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ml-3 inline-flex translate-y-[-1px] items-center gap-1 rounded border px-1.5 align-middle text-[10px] leading-4 text-muted-foreground"
                          >
                            <Sparkles className="size-3 text-syntax-keyword" />
                            Tab
                          </motion.span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Pipeline phase={phase} stage={stage} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
