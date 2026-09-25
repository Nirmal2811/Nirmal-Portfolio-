import { Link } from 'react-router'
import { ArrowRight, Check } from 'lucide-react'

import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import SpotlightCard from '@/components/SpotlightCard'
import { Button } from '@/components/ui/button'
import { process, services } from '@/data/portfolio'
import { getIcon } from '@/lib/icons'

function Process() {
  return (
    <Reveal className="mt-16">
      <p className="mb-6 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
        <span className="text-primary">//</span> How I work
      </p>
      <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connecting line behind the steps on wide screens */}
        <span aria-hidden className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 lg:block" />
        {process.map((step, i) => {
          const Icon = getIcon(step.icon)
          return (
            <Reveal key={step.command} as="li" delay={i * 0.08} className="relative flex flex-col items-start lg:items-center lg:text-center">
              <span className="relative grid size-12 place-items-center rounded-2xl border border-primary/40 bg-background text-brand shadow-[0_0_24px_-8px_rgb(168_85_247/0.9)]">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 font-mono text-sm">
                <span className="text-emerald-600 dark:text-emerald-400">$</span> <span className="text-brand">{step.command}</span>
              </p>
              <p className="mt-1.5 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          )
        })}
      </ol>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What I do"
            title={
              <>
                Turning ideas into <span className="text-gradient">shipped software</span>
              </>
            }
            description="From a blank repo to a production launch — here's how I can help your team or product."
            className="mb-0 md:mb-16"
          />
          <Reveal className="mb-10 md:mb-16">
            <Button variant="outline" asChild className="group">
              <Link to="/projects">
                See my projects
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <Reveal key={service.title} delay={i * 0.08} className="h-full">
                <SpotlightCard className="flex h-full flex-col p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-800 text-white shadow-[0_0_24px_-6px_rgb(168_85_247/0.9)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.text}</p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-foreground/85">
                        <Check className="size-3.5 shrink-0 text-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        <Process />
      </div>
    </section>
  )
}
