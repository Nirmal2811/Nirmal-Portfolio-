import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/portfolio'

export default function Work() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            title={
              <>
                Projects I&apos;m <span className="text-gradient">proud of</span>
              </>
            }
            description="A few recent builds — product work, open source, and experiments."
            className="md:mb-16"
          />
          <Reveal className="mb-12 md:mb-16">
            <Button variant="outline" asChild className="group">
              <Link to="/projects">
                All projects
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
