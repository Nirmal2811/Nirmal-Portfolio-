"use client";

import { motion } from "framer-motion";

import { ScrambleText } from "@/components/effects/scramble-text";
import { ease, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  index: string;
  file: string;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, index, file, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative scroll-mt-20 py-24 md:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground sm:text-sm">
            <span className="text-primary">{index}</span>
            <span className="text-muted-foreground/40">/</span>
            <span>
              ~/portfolio/
              <ScrambleText text={file} className="text-foreground" />
            </span>
            <motion.span
              aria-hidden="true"
              className="h-px flex-1 origin-left bg-gradient-to-r from-border via-border to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inView}
              transition={{ duration: 1.4, ease }}
            />
          </div>
          <motion.h2
            className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              className="mt-4 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
