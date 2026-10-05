import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/footer";
import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const count = projects.length;
  const prev = projects[(index - 1 + count) % count];
  const next = projects[(index + 1) % count];

  return (
    <>
      <ProjectDetail project={projects[index]} prev={prev} next={next} />
      <Footer />
    </>
  );
}
