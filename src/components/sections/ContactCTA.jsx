import { Link } from 'react-router'
import { ArrowRight, Mail } from 'lucide-react'

import Reveal from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import { profile } from '@/data/portfolio'

/** Closing call-to-action shown at the bottom of content pages. */
export default function ContactCTA() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-violet-100 via-card to-fuchsia-50 dark:from-violet-950/80 dark:via-[#110b1f] dark:to-black px-6 py-12 text-center sm:px-12 md:py-16">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60 mask-fade-y" />
            <div aria-hidden className="absolute -top-24 left-1/2 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[100px]" />

            <p className="font-mono text-xs tracking-[0.2em] text-brand uppercase">
              <span className="text-emerald-600 dark:text-emerald-400">$</span> open --new project
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-balance sm:text-4xl md:text-5xl">
              Have an idea? Let&apos;s <span className="text-gradient">build it together.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              I&apos;m currently {profile.available ? 'taking on new projects' : 'booked, but happy to chat'}. Tell me
              what you&apos;re working on and I&apos;ll get back to you within a day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="group" asChild>
                <Link to="/contact">
                  Start a conversation
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail />
                  {profile.email}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
