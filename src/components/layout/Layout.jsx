import { Outlet } from 'react-router'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollManager from '@/components/layout/ScrollManager'
import ScrollProgress from '@/components/layout/ScrollProgress'
import BackToTop from '@/components/layout/BackToTop'

export default function Layout() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <ScrollManager />
      <ScrollProgress />

      {/* Ambient page glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[420px] w-[520px] rounded-full bg-purple-900/20 blur-[140px]" />
      </div>

      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
