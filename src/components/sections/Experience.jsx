import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'

import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { experience } from '@/data/portfolio'

export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve <span className="text-gradient">made an impact</span>
            </>
          }
        />

        <ol ref={listRef} className="relative ml-3 space-y-12 md:ml-0">
          {/* Timeline track + scroll-linked fill */}
          <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-foreground/10 md:left-[220px]" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-violet-400 via-purple-500 to-fuchsia-500 md:left-[220px]"
          />

          {experience.map((job, i) => (
            <li key={job.company + job.role} className="relative grid gap-3 pl-8 md:grid-cols-[220px_1fr] md:gap-0 md:pl-0">
              <span
                aria-hidden
                className="absolute top-1.5 left-0 grid size-4 -translate-x-1/2 place-items-center rounded-full border border-primary/60 bg-background md:left-[220px]"
              >
                <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_2px_rgb(168_85_247/0.8)]" />
              </span>

              <Reveal delay={0.05} className="md:pr-10 md:text-right">
                <p className="font-mono text-sm text-brand">{job.period}</p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  {job.location}
                </p>
              </Reveal>

              <Reveal delay={0.1 + i * 0.03} className="md:pl-10">
                <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-colors hover:border-primary/35">
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm text-brand">
                    <Briefcase className="size-3.5" />
                    {job.company}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
