import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/layout/SectionHeading";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { featuredProjects } from "@/data/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Projects", path: "/projects" });

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_35%)]">
        <AnalyticsTracker eventType="project_view" resourceId="projects-page" />
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Projects"
            title="A collection of thoughtful builds that reflect my growth as a developer."
            description="Each project highlights a different strength, from polished interfaces to practical product concepts."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <article key={project.name} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
                <AnalyticsTracker eventType="project_view" resourceId={project.name} />
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                  <Link href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:text-white">
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <p className="mt-4 text-slate-400">{project.description}</p>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">Technologies</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">Highlights</h4>
                  <ul className="mt-3 space-y-2 text-slate-400">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
