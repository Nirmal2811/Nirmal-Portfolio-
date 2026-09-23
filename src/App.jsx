import { Route, Routes } from 'react-router'
import { ReactLenis } from 'lenis/react'
import { MotionConfig } from 'framer-motion'

import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetail from '@/pages/ProjectDetail'
import NotFound from '@/pages/NotFound'

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
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </MotionConfig>
    </ReactLenis>
  )
}
