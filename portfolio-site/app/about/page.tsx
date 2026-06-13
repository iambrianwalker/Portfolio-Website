import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20 sm:px-8 lg:px-10">
      <AnimatedSection className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-cyan-950/20 sm:p-10 lg:p-14">
        <SectionHeading
          eyebrow="About"
          title="Building thoughtful products with code, clarity, and curiosity."
          description="I’m a software developer and computer science student focused on building polished digital experiences with modern web technologies."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-4 text-lg leading-8 text-zinc-300">
            <p>
              My work sits at the intersection of product thinking and engineering. I enjoy turning ideas into fast, reliable, and enjoyable user experiences.
            </p>
            <p>
              I’m especially interested in full-stack development, cloud tooling, and creating systems that are both practical and elegant.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6">
            <h3 className="text-lg font-semibold text-zinc-100">Currently exploring</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li>• Scalable front-end architecture</li>
              <li>• AWS fundamentals and deployment workflows</li>
              <li>• Product-focused software design</li>
            </ul>
            <Link
              href="/projects"
              className="mt-6 inline-flex rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/10"
            >
              See projects
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
