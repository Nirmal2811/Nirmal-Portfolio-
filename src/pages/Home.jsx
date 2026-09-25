import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import ContactCTA from '@/components/sections/ContactCTA'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function Home() {
  usePageMeta()

  return (
    <>
      <Hero />
      <Services />
      <ContactCTA />
    </>
  )
}
