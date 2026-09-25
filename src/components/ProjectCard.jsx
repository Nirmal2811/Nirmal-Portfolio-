import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'

import ProjectCover from '@/components/ProjectCover'
import SpotlightCard from '@/components/SpotlightCard'
import { Badge } from '@/components/ui/badge'

export default function ProjectCard({ project }) {
  return (
    <SpotlightCard className="h-full transition-transform duration-500 hover:-translate-y-1.5 has-[:focus-visible]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/50">
      <Link to={`/projects/${project.slug}`} className="flex h-full flex-col outline-none">
        <ProjectCover project={project} className="aspect-[16/10] border-b border-border" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-white">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag}>
                <Badge variant="outline">{tag}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </SpotlightCard>
  )
}
