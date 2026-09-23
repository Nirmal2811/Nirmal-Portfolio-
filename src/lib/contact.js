import { z } from 'zod'

import { profile } from '@/data/portfolio'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'That name is a bit long.'),
  email: z.email('Please enter a valid email address.'),
  subject: z.string().trim().max(120, 'Keep the subject under 120 characters.').optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Tell me a little more — at least 10 characters.')
    .max(2000, 'Please keep it under 2000 characters.'),
})

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

/**
 * Sends the message to VITE_CONTACT_ENDPOINT (e.g. Formspree) when configured,
 * otherwise opens the visitor's email client with the message pre-filled.
 * Resolves to 'sent' or 'mailto'.
 */
export async function sendContactMessage(values) {
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    return 'sent'
  }

  const subject = values.subject || `Hello from ${values.name}`
  const body = `${values.message}\n\n— ${values.name} (${values.email})`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return 'mailto'
}
