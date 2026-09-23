import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import PageTransition from '@/components/PageTransition'
import ProjectCard from '@/components/ProjectCard'
import SectionHeading from '@/components/SectionHeading'
import { profile, projectCategories, projects } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  useEffect(() => {
    document.title = `Projects · ${profile.name}`
  }, [])

  return (
    <PageTransition className="mx-auto max-w-6xl px-4 pt-36 pb-12 sm:px-6">
      <SectionHeading
        eyebrow="Archive"
        title={
          <>
            All <span className="text-gradient">projects</span>
          </>
        }
        description="Everything I've built that's worth showing — client work, side projects and open source."
        className="md:mb-10"
      />

      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {projectCategories.map((cat) => {
          const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length
          const selected = filter === cat
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(cat)}
              className={cn(
                'relative isolate cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors',
                selected
                  ? 'border-primary/50 text-white'
                  : 'border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground'
              )}
            >
              {selected && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {cat}
              <span className="ml-2 font-mono text-xs opacity-60">{count}</span>
            </button>
          )
        })}
      </div>

      <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="py-20 text-center text-muted-foreground">No projects in this category yet.</p>
      )}
    </PageTransition>
  )
}
