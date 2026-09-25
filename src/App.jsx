import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'framer-motion'

import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'

// Every page except Home is split out, so each route only loads its own code.
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const SkillsPage = lazy(() => import('@/pages/SkillsPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const ExperiencePage = lazy(() => import('@/pages/ExperiencePage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const lenisOptions = {
  lerp: 0.09,
  smoothWheel: true,
  autoRaf: true,
}

export default function App() {
  return (
    <ReactLenis root options={lenisOptions}>
      <MotionConfig reducedMotion="user">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MotionConfig>
    </ReactLenis>
  )
}
