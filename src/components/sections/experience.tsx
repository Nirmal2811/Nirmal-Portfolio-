"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <Section
      id="experience"
      index="03"
      file="career.log"
      title={
        <>
          <span className="font-mono text-muted-foreground">git log</span> --career
        </>
      }
      description="Every role is a commit. Here's the history, newest first."
    >
      <ol ref={ref} className="relative">
        {/* commit graph rail */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-border md:left-[15px]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gradient-to-b from-primary via-cyan to-primary md:left-[15px]"
        />

        {experience.map((job, i) => {
          const head = i === 0;
          return (
            <motion.li
              key={job.hash}
              className="relative pb-14 pl-10 last:pb-0 md:pl-16"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, ease }}
            >
              {/* commit node */}
              <span aria-hidden="true" className="absolute top-1 left-[5px] flex size-[13px] md:left-[9px]">
                {head && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary" />}
                <span
                  className={cn(
                    "relative size-[13px] rounded-full border-2 border-primary",
                    head ? "bg-primary" : "bg-background",
                  )}
                />
              </span>

              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
                <span className="text-syntax-number">commit {job.hash}</span>
                {job.ref && (
                  <span className="text-muted-foreground">
                    (<span className={head ? "text-cyan" : "text-syntax-keyword"}>{job.ref}</span>)
                  </span>
                )}
                <span className="text-muted-foreground">· {job.period}</span>
              </p>

              <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {job.role} <span className="font-mono text-base text-muted-foreground">@</span>{" "}
                <span className="text-primary">{job.company}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-muted-foreground">{job.summary}</p>

              {/* highlights rendered as diff additions */}
              <ul className="mt-4 max-w-2xl space-y-1.5 font-mono text-[13px]">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-3 rounded-md bg-primary/[0.06] px-3 py-1.5 text-foreground/85">
                    <span aria-hidden="true" className="text-primary select-none">
                      +
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.stack.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono text-[11px] font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
