import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/data/portfolio'
import { contactSchema, sendContactMessage } from '@/lib/contact'

const defaultValues = { name: '', email: '', subject: '', message: '' }

// Loaded lazily from Contact.jsx so zod + react-hook-form stay out of the initial bundle.
export default function ContactForm() {
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
                    ? 'flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-rose-700 dark:text-rose-200'
                    : 'flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-200'
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
  )
}
