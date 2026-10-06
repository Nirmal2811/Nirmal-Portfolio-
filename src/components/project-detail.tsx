"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

import { brandIcons } from "@/components/brand-icons";
import { CodeBlock } from "@/components/effects/code-block";
import { ScrambleText } from "@/components/effects/scramble-text";
import { useBoot } from "@/components/providers/boot-provider";
import { Button } from "@/components/ui/button";
import { WindowChrome } from "@/components/window-chrome";
import type { Project } from "@/lib/data";
import { ease, fadeUp, inView, stagger } from "@/lib/motion";

const GitHub = brandIcons.GitHub;

type ProjectDetailProps = { project: Project; prev: Project; next: Project };

export function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  const { ready } = useBoot();

  return (
    <article className="relative isolate pt-32 pb-24 md:pt-40 md:pb-32">
      {/* soft glow behind the header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_10%,transparent),transparent_75%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.header variants={stagger(0.08)} initial="hidden" animate={ready ? "show" : "hidden"}>
          <motion.div variants={fadeUp}>
            <Link
              href="/#projects"
              // Lenis (ScrollReset in providers) lands on the #section; Next's own scroll would fight it.
              scroll={false}
              className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              cd ../projects
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3 font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="text-primary">04</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="truncate">
              ~/portfolio/projects/
              <ScrambleText text={project.slug} enabled={ready} className="text-foreground" />
            </span>
            <motion.span
              aria-hidden="true"
              className="hidden h-px flex-1 origin-left bg-gradient-to-r from-border via-border to-transparent sm:block"
              initial={{ scaleX: 0 }}
              animate={ready ? { scaleX: 1 } : undefined}
              transition={{ duration: 1.4, ease, delay: 0.3 }}
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
          >
            {project.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="text-syntax-prop">client:</span> <span className="text-syntax-string">{project.client}</span>
            <span className="mx-2 opacity-50">·</span>
            {project.role}
            <span className="mx-2 opacity-50">·</span>#{project.category}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {project.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary">
              <TrendingUp className="size-3.5" /> {project.impact}
            </span>
            {project.live && (
              <Button asChild size="sm" className="font-mono">
                <a href={project.live} target="_blank" rel="noreferrer">
                  open live site <ArrowUpRight />
                </a>
              </Button>
            )}
            {project.repo && (
              <Button asChild size="sm" variant="outline" className="font-mono">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <GitHub className="size-4" /> source
                </a>
              </Button>
            )}
          </motion.div>
        </motion.header>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* responsibilities as a diff */}
          <motion.div initial="hidden" whileInView="show" viewport={inView} variants={fadeUp}>
            <WindowChrome
              title="responsibilities.diff"
              className="h-full"
              bodyClassName="p-5 sm:p-6"
              right={<span className="font-mono text-[10px] text-primary">+{project.responsibilities.length}</span>}
            >
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-cyan">@@</span> what I built and owned <span className="text-cyan">@@</span>
              </p>
              <motion.ul
                className="mt-4 space-y-2 font-mono text-[13px]"
                initial="hidden"
                whileInView="show"
                viewport={inView}
                variants={stagger(0.08, 0.15)}
              >
                {project.responsibilities.map((r) => (
                  <motion.li
                    key={r}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}
                    className="flex gap-3 rounded-md bg-primary/[0.06] px-3 py-2 leading-relaxed text-foreground/85"
                  >
                    <span aria-hidden="true" className="text-primary select-none">
                      +
                    </span>
                    {r}
                  </motion.li>
                ))}
              </motion.ul>
            </WindowChrome>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="show"
            viewport={inView}
            variants={stagger(0.1, 0.1)}
          >
            {/* project manifest */}
            <motion.div variants={fadeUp}>
              <WindowChrome title="package.json" bodyClassName="p-5 font-mono text-[13px] leading-relaxed">
                <p className="text-syntax-punct">{"{"}</p>
                {[
                  ["name", project.slug],
                  ["client", project.client],
                  ["role", project.role],
                  ["type", project.category],
                ].map(([k, v]) => (
                  <p key={k} className="pl-4">
                    <span className="text-syntax-prop">&quot;{k}&quot;</span>
                    <span className="text-syntax-punct">: </span>
                    <span className="text-syntax-string">&quot;{v}&quot;</span>
                    <span className="text-syntax-punct">,</span>
                  </p>
                ))}
                <p className="pl-4">
                  <span className="text-syntax-prop">&quot;stack&quot;</span>
                  <span className="text-syntax-punct">: [</span>
                </p>
                {project.stack.map((t, i) => (
                  <p key={t} className="pl-8">
                    <span className="text-syntax-string">&quot;{t}&quot;</span>
                    {i < project.stack.length - 1 && <span className="text-syntax-punct">,</span>}
                  </p>
                ))}
                <p className="pl-4 text-syntax-punct">]</p>
                <p className="text-syntax-punct">{"}"}</p>
              </WindowChrome>
            </motion.div>

            {/* code excerpt */}
            <motion.div variants={fadeUp}>
              <WindowChrome title={project.file} bodyClassName="no-scrollbar overflow-x-auto bg-editor/70 p-5">
                <CodeBlock code={project.snippet} lineNumbers className="text-[12px]" />
              </WindowChrome>
            </motion.div>
          </motion.div>
        </div>

        {/* previous / next project */}
        <nav aria-label="More projects" className="mt-20 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-xl border bg-card/60 p-5 transition-colors hover:border-primary/50"
          >
            <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" /> git checkout HEAD~1
            </span>
            <span className="mt-2 block font-semibold transition-colors group-hover:text-primary">{prev.title}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-xl border bg-card/60 p-5 text-right transition-colors hover:border-primary/50"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-xs text-muted-foreground">
              git checkout HEAD+1 <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-2 block font-semibold transition-colors group-hover:text-primary">{next.title}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
