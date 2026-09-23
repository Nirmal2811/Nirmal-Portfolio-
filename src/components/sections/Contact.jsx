import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CircleCheck, Copy, LoaderCircle, Mail, MapPin, Send, TriangleAlert } from 'lucide-react'

import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import SocialLinks from '@/components/SocialLinks'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/data/portfolio'
import { contactSchema, sendContactMessage } from '@/lib/contact'

const defaultValues = { name: '', email: '', subject: '', message: '' }

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
      className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-white/[0.07] bg-card/60 p-4 text-left transition-colors hover:border-primary/40"
    >
      <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-violet-300">
        <Mail className="size-5" />
      </span>
      <span className="flex-1">
        <span className="block text-xs text-muted-foreground">Email me at</span>
        <span className="block font-medium">{profile.email}</span>
      </span>
      <span className="text-muted-foreground transition-colors group-hover:text-violet-200" aria-live="polite">
        {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
        <span className="sr-only">{copied ? 'Copied' : 'Copy email address'}</span>
      </span>
    </button>
  )
}

export default function Contact() {
  const [status, setStatus] = useState(null) // null | 'sent' | 'mailto' | 'error'

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: 'onTouched',
  })

  const onSubmit = async (values) => {
    setStatus(null)
    try {
      const result = await sendContactMessage(values)
      setStatus(result)
      // Keep the draft for mailto in case the email client doesn't open.
      if (result === 'sent') form.reset(defaultValues)
    } catch {
      setStatus('error')
    }
  }

  const { isSubmitting } = form.formState

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
              <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-card/60 p-4">
                <span className="grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-violet-300">
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
            <Card className="relative overflow-hidden border-white/[0.08] p-0">
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@company.com" autoComplete="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Subject <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Project inquiry" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your project, timeline and budget…"
                              rows={6}
                              data-lenis-prevent
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" disabled={isSubmitting} className="group mt-1 w-full sm:w-auto sm:justify-self-start">
                      {isSubmitting ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </Button>

                    <div aria-live="polite">
                      <AnimatePresence mode="wait">
                        {status && (
                          <motion.p
                            key={status}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className={
                              status === 'error'
                                ? 'flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-rose-200'
                                : 'flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200'
                            }
                          >
                            {status === 'error' ? (
                              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                            ) : (
                              <CircleCheck className="mt-0.5 size-4 shrink-0" />
                            )}
                            {status === 'sent' && 'Thanks! Your message is on its way — I’ll get back to you soon.'}
                            {status === 'mailto' && 'Your email app should open with the message ready to send.'}
                            {status === 'error' && `Something went wrong. Please try again or email ${profile.email} directly.`}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
