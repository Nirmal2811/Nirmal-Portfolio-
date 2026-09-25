import PageTransition from '@/components/PageTransition'
import Experience from '@/components/sections/Experience'
import ContactCTA from '@/components/sections/ContactCTA'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function ExperiencePage() {
  usePageMeta('Experience')

  return (
    <PageTransition className="pt-12 md:pt-8">
      <Experience />
      <ContactCTA />
    </PageTransition>
  )
}
