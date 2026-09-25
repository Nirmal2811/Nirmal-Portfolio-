import PageTransition from '@/components/PageTransition'
import Skills from '@/components/sections/Skills'
import ContactCTA from '@/components/sections/ContactCTA'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function SkillsPage() {
  usePageMeta('Skills')

  return (
    <PageTransition className="pt-12 md:pt-8">
      <Skills />
      <ContactCTA />
    </PageTransition>
  )
}
