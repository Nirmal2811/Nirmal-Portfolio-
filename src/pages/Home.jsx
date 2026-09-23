import { useEffect } from 'react'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import { profile } from '@/data/portfolio'

export default function Home() {
  useEffect(() => {
    document.title = `${profile.name} · ${profile.role}`
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Contact />
    </>
  )
}
