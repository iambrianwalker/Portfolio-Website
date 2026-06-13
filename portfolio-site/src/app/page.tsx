import Link from "next/link";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/layout/SectionHeading";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { ResumeDownloadLink } from "@/components/analytics/ResumeDownloadLink";
import { featuredProjects, skillGroups } from "@/data/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <PageTransition>
      <main className="flex-1">
        <AnalyticsTracker eventType="project_view" resourceId="homepage" />
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">Software Developer • Computer Science Student • AWS Enthusiast</p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                I build thoughtful software for modern products and cloud-native experiences.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-400">
                I’m Brian Walker, a developer focused on clean code, polished interfaces, and a growing path in cloud engineering with AWS.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/projects" className="rounded-full bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400">
                  View Projects
                </Link>
                <Link href="/contact" className="rounded-full border border-white/10 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10">
                  Contact Me
                </Link>
                <ResumeDownloadLink href="/resume.pdf" className="rounded-full border border-sky-500/30 px-5 py-3 font-semibold text-sky-300 transition hover:bg-sky-500/10">
                  <span className="inline-flex items-center gap-2"><Download size={16} /> Download Resume</span>
                </ResumeDownloadLink>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3 text-sky-400">
                <Sparkles size={20} />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">Currently exploring</span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-white">Next.js, AWS, and interfaces that feel calm and premium.</p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-slate-400">
                <p className="font-semibold text-slate-200">Atlanta, Georgia</p>
                <p className="mt-3">I’m especially interested in turning ideas into dependable software with strong architecture, meaningful UX, and cloud-ready foundations.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="A developer building with curiosity, discipline, and long-term growth in mind."
            description="My background spans computer science coursework, personal projects, and a growing interest in cloud-based software engineering."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-lg text-slate-400">
                I enjoy building software that is simple to use, easy to maintain, and shaped by thoughtful product decisions. My work has centered around modern web development, AWS concepts, and creating interfaces that feel polished and intuitive.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-400/20 bg-slate-900/70 p-8">
              <h3 className="text-xl font-semibold text-white">Core focus areas</h3>
              <ul className="mt-4 space-y-3 text-slate-400">
                <li>• Modern frontend architecture with React and Next.js</li>
                <li>• Serverless and cloud-ready product thinking</li>
                <li>• Reliable, accessible interfaces with strong UX</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-950/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Featured Projects"
              title="Selected work that reflects my growing engineering toolkit."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {featuredProjects.slice(0, 3).map((project) => (
                <article key={project.name} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
                  <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                  <p className="mt-4 text-slate-400">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href="/projects" className="mt-6 inline-flex items-center gap-2 text-sky-400 transition hover:text-sky-300">
                    Explore project details <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Technical Skills" title="A broad foundation across modern languages, frameworks, and cloud tools." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-sky-400/20 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
