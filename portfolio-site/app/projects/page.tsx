import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/content";

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20 sm:px-8 lg:px-10">
      <AnimatedSection className="space-y-10">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work that blends product thinking and engineering craft."
          description="A mix of personal apps, product ideas, and polished portfolio work built with a focus on clarity and quality."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}
