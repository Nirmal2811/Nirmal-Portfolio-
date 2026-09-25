import PageTransition from '@/components/PageTransition'
import About from '@/components/sections/About'
import ContactCTA from '@/components/sections/ContactCTA'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function AboutPage() {
  usePageMeta('About')

  return (
    <PageTransition className="pt-12 md:pt-8">
      <About />
      <ContactCTA />
    </PageTransition>
  )
}
