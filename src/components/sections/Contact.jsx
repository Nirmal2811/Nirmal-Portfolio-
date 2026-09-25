import { lazy, Suspense, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { Check, Copy, Mail, MapPin } from 'lucide-react'

import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import SocialLinks from '@/components/SocialLinks'
import { Card, CardContent } from '@/components/ui/card'
import { profile } from '@/data/portfolio'

const ContactForm = lazy(() => import('@/components/ContactForm'))

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 text-left transition-colors hover:border-primary/40"
    >
      <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-brand">
        <Mail className="size-5" />
      </span>
      <span className="flex-1">
        <span className="block text-xs text-muted-foreground">Email me at</span>
        <span className="block font-medium">{profile.email}</span>
      </span>
      <span className="text-muted-foreground transition-colors group-hover:text-brand" aria-live="polite">
        {copied ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="size-4" />}
        <span className="sr-only">{copied ? 'Copied' : 'Copy email address'}</span>
      </span>
    </button>
  )
}

/** Placeholder with the form's shape, shown until the form code has loaded. */
function FormSkeleton() {
  const bar = 'rounded-lg bg-foreground/[0.04]'
  return (
    <div aria-hidden className="grid animate-pulse gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={`${bar} h-[68px]`} />
        <div className={`${bar} h-[68px]`} />
      </div>
      <div className={`${bar} h-[68px]`} />
      <div className={`${bar} h-[172px]`} />
      <div className="h-12 w-44 rounded-full bg-primary/20" />
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  // Start loading the form a screen or so before it scrolls into view.
  const nearView = useInView(formRef, { once: true, margin: '0px 0px 1200px 0px' })

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-violet-700/20 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              index="05"
              eyebrow="Contact"
              title={
                <>
                  Let&apos;s build something <span className="text-gradient">great together</span>
                </>
              }
              description="Have a project in mind, a role to fill, or just want to say hi? My inbox is always open — I usually reply within a day."
              className="mb-10 md:mb-10"
            />
            <Reveal delay={0.1} className="space-y-3">
              <CopyEmail />
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4">
                <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-brand">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">Based in</span>
                  <span className="block font-medium">{profile.location}</span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <SocialLinks />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card ref={formRef} className="relative overflow-hidden border-border p-0">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <CardContent className="p-6 sm:p-8">
                {nearView ? (
                  <Suspense fallback={<FormSkeleton />}>
                    <ContactForm />
                  </Suspense>
                ) : (
                  <FormSkeleton />
                )}
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
