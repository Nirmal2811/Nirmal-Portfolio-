"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { brandIcons } from "@/components/brand-icons";
import { CodeBlock } from "@/components/effects/code-block";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/lib/data";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FILTERS = ["all", "web-app", "website"] as const;
type Filter = (typeof FILTERS)[number];

const GitHub = brandIcons.GitHub;

function ProjectCard({ project }: { project: Project }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onPointerMove={onMove}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* chrome */}
      <div className="flex h-9 items-center gap-2 border-b bg-muted/30 px-3 font-mono text-[11px] text-muted-foreground">
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-2 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-muted-foreground/30 transition-colors group-hover:bg-[#28c840]" />
        </span>
        <span className="ml-1 truncate">{project.file}</span>
        {project.featured && (
          <span className="ml-auto flex items-center gap-1 text-syntax-number">
            <Star className="size-3 fill-current" /> featured
          </span>
        )}
      </div>

      {/* code preview */}
      <div className="relative h-[104px] overflow-hidden border-b bg-editor/70 px-4 py-3">
        <CodeBlock code={project.snippet} className="text-[11.5px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-card/80" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
            {/* stretched link: the whole card opens the project page */}
            <Link
              href={`/projects/${project.slug}`}
              className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
            >
              {project.title}
            </Link>
          </h3>
          <div className="-mt-1 -mr-2 flex items-center">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} source code`}
                className="relative z-10 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <GitHub className="size-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="relative z-10 rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
          <span className="text-syntax-prop">client:</span> <span className="text-syntax-string">{project.client}</span>
          <span className="mx-1.5 opacity-50">·</span>
          {project.role}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Badge key={t} variant="outline" className="font-mono text-[10.5px] font-normal text-muted-foreground">
              {t}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t pt-4 font-mono text-xs text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1.5 text-foreground/85">
            <TrendingUp className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{project.impact}</span>
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
            view details <ArrowRight className="size-3.5" />
          </span>
          <span className="shrink-0 rounded bg-secondary px-1.5 py-0.5 text-[10px] group-hover:hidden">#{project.category}</span>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <Section
      id="projects"
      index="04"
      file="projects.ts"
      title={
        <>
          Things I&apos;ve <span className="text-gradient">shipped</span>.
        </>
      }
      description="Client websites and web applications I've built at Inngress Techsolutions-LLP — from hospital and non-profit sites to full admin dashboards. Open a project for the full breakdown."
    >
      <LayoutGroup>
        <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="mr-1 text-muted-foreground">
            <span className="text-primary">❯</span> ls projects/ --filter=
          </span>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "relative rounded-md border px-3 py-1.5 transition-colors",
                filter === f ? "border-transparent text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-md bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.ul layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.08 }}
              >
                <ProjectCard project={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>
    </Section>
  );
}
