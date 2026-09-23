import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Calendar, CircleCheck, ExternalLink, User } from 'lucide-react'

import { GithubIcon } from '@/components/BrandIcons'
import PageTransition from '@/components/PageTransition'
import ProjectCover from '@/components/ProjectCover'
import Reveal from '@/components/motion/Reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { profile, projects } from '@/data/portfolio'
import NotFound from '@/pages/NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    if (project) document.title = `${project.title} · ${profile.name}`
  }, [project])

  if (!project) return <NotFound />

  return (
    <PageTransition key={project.slug} className="mx-auto max-w-5xl px-4 pt-32 pb-12 sm:px-6">
      <Button variant="ghost" size="sm" asChild className="group mb-8 -ml-2 text-muted-foreground">
        <Link to="/projects">
          <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
          All projects
        </Link>
      </Button>

      <div className="flex flex-wrap items-center gap-3">
        <Badge>{project.category}</Badge>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          {project.year}
        </span>
      </div>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl md:text-6xl">
        <span className="text-gradient">{project.title}</span>
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">{project.summary}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.links.live && (
          <Button asChild>
            <a href={project.links.live} target="_blank" rel="noreferrer">
              <ExternalLink />
              Live site
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button variant="outline" asChild>
            <a href={project.links.github} target="_blank" rel="noreferrer">
              <GithubIcon className="size-4" />
              Source code
            </a>
          </Button>
        )}
      </div>

      <Reveal className="group mt-12">
        <ProjectCover project={project} large className="aspect-[16/8] rounded-3xl border border-white/10" />
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_260px]">
        <div>
          <Reveal>
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-4 leading-relaxed text-foreground/80">{project.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <h2 className="text-2xl font-semibold">Highlights</h2>
            <ul className="mt-5 space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-foreground/80">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} as="aside" className="h-fit space-y-6 rounded-2xl border border-white/[0.07] bg-card/60 p-6">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Role</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm">
              <User className="size-4 text-primary" />
              {project.role}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {next && next.slug !== project.slug && (
        <Reveal className="mt-20">
          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-2xl border border-white/[0.07] bg-card/60 p-6 transition-colors hover:border-primary/40 sm:p-8"
          >
            <div>
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Next project</p>
              <p className="mt-2 font-display text-2xl font-semibold transition-colors group-hover:text-violet-200 sm:text-3xl">
                {next.title}
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/10 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </Reveal>
      )}
    </PageTransition>
  )
}
