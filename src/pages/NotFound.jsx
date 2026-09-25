import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

import PageTransition from '@/components/PageTransition'
import { Button } from '@/components/ui/button'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found')

  return (
    <PageTransition className="relative mx-auto flex min-h-[80dvh] max-w-3xl flex-col items-center justify-center px-4 pt-28 text-center">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 mask-fade-y" />
      <motion.p
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-gradient font-display text-[8rem] leading-none font-bold sm:text-[11rem]"
      >
        404
      </motion.p>
      <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">This page drifted into the void</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="lg" className="group mt-8">
        <Link to="/">
          <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back home
        </Link>
      </Button>
    </PageTransition>
  )
}
