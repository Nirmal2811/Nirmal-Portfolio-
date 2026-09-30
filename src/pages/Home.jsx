import HomeBackdrop from '@/components/HomeBackdrop'
import Hero from '@/components/sections/Hero'
import Showreel from '@/components/sections/Showreel'
import Services from '@/components/sections/Services'
import ContactCTA from '@/components/sections/ContactCTA'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function Home() {
  usePageMeta()

  return (
    <>
      <HomeBackdrop />
      <Hero />
      <Showreel />
      <Services />
      <ContactCTA />
    </>
  )
}
