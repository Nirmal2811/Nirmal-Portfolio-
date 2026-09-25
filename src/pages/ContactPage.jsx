import PageTransition from '@/components/PageTransition'
import Contact from '@/components/sections/Contact'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function ContactPage() {
  usePageMeta('Contact')

  return (
    <PageTransition className="pt-12 md:pt-8">
      <Contact />
    </PageTransition>
  )
}
