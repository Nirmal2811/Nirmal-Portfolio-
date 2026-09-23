import { Mail, MapPin } from 'lucide-react'

import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import SpotlightCard from '@/components/SpotlightCard'
import { about, profile } from '@/data/portfolio'
import { getIcon } from '@/lib/icons'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          eyebrow="About me"
          title={
            <>
              Engineering with a <span className="text-gradient">designer&apos;s eye</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-lg leading-relaxed text-pretty text-foreground/80">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <SpotlightCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-800 opacity-70 blur-md" />
                  <div className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-900 font-display text-2xl font-semibold text-white">
                    {profile.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">{profile.fullName}</p>
                  <p className="text-sm text-muted-foreground">{profile.role}</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6 text-sm">
                <li className="flex items-center gap-3 text-foreground/80">
                  <MapPin className="size-4 text-primary" />
                  {profile.location}
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <Mail className="size-4 text-primary" />
                  <a href={`mailto:${profile.email}`} className="transition-colors hover:text-violet-300">
                    {profile.email}
                  </a>
                </li>
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {about.highlights.map((h, i) => {
            const Icon = getIcon(h.icon)
            return (
              <Reveal key={h.title} delay={i * 0.1}>
                <SpotlightCard className="h-full p-6">
                  <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-violet-300 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
