"use client";

import Link from "next/link";
import type { Project } from "@/lib/content";
import { hasProjectDemo } from "@/lib/content";
import { trackPortfolioEvent } from "@/lib/analytics-client";

type ProjectCardClientProps = {
  project: Project;
};

export function ProjectCardClient({ project }: ProjectCardClientProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl"
          aria-hidden
        >
          {project.symbol}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-zinc-100">{project.title}</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{project.description}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={project.github}
          onClick={() => void trackPortfolioEvent("project-click", { path: project.github })}
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-cyan-400/50 hover:text-cyan-300"
        >
          GitHub
        </Link>
        {hasProjectDemo(project) ? (
          <Link
            href={project.demo!}
            onClick={() => void trackPortfolioEvent("project-click", { path: project.demo! })}
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-cyan-400"
          >
            Live Demo
          </Link>
        ) : null}
      </div>
    </article>
  );
}
