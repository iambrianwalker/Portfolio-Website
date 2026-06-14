import Image from "next/image";
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
          description="I'm a software developer and Computer Science graduate from Georgia State University focused on building polished applications using modern web technologies."
        />

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="mx-auto w-full max-w-xs shrink-0 lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-cyan-400/20 bg-zinc-900 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/10">
              <Image
                src="/images/headshot.jpeg"
                alt="Brian Walker professional headshot"
                fill
                priority
                sizes="(max-width: 1024px) 320px, 320px"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-zinc-300">Brian Walker</p>
            <p className="text-center text-sm text-zinc-500">Software Developer</p>
          </div>

          <div className="space-y-4 text-lg leading-8 text-zinc-300">
            <p>
              My work sits at the intersection of product thinking and engineering. I enjoy turning
              ideas into fast, reliable, and enjoyable user experiences.
            </p>
            <p>
              I'm especially interested in full-stack development, cloud tooling, and creating
              systems that are both practical and elegant.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6 lg:max-w-xl">
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
      </AnimatedSection>
    </main>
  );
}
