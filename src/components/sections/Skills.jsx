import { motion } from 'framer-motion'

import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import SpotlightCard from '@/components/SpotlightCard'
import { marquee, skillGroups } from '@/data/portfolio'
import { getIcon } from '@/lib/icons'

function Marquee() {
  const items = [...marquee, ...marquee]

  return (
    <div className="group relative mt-16 overflow-hidden border-y border-white/[0.06] py-6 mask-fade-x">
      <ul className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= marquee.length}
            className="flex items-center gap-4 pr-4 font-display text-2xl font-medium whitespace-nowrap text-foreground/35 md:text-3xl"
          >
            {item}
            <span className="text-primary">✦</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <>
              A toolkit for building <span className="text-gradient">end to end</span>
            </>
          }
          description="The languages, frameworks and tools I reach for every day — and keep sharpening."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = getIcon(group.icon)
            return (
              <Reveal key={group.title} delay={i * 0.1}>
                <SpotlightCard className="h-full p-6 md:p-7">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-800 text-white shadow-[0_0_24px_-6px_rgb(168_85_247/0.9)]">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-xl font-semibold">{group.title}</h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.skills.map((skill, j) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + j * 0.04, duration: 0.3 }}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/85 transition-colors hover:border-primary/50 hover:bg-primary/15 hover:text-white"
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>

      <Marquee />
    </section>
  )
}
