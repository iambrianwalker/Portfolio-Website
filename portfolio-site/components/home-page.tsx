"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatedSection } from "@/components/animated-section";
import { trackPortfolioEvent } from "@/lib/analytics-client";

export function HomePage() {
  useEffect(() => {
    void trackPortfolioEvent("page-view", { path: "/" });
  }, []);

  return (
    <main className="flex flex-1 flex-col">
      <AnimatedSection className="grid flex-1 items-center gap-10 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_30%),linear-gradient(135deg,_rgba(24,24,27,0.95),_rgba(9,9,11,0.98))] px-6 py-16 shadow-2xl shadow-cyan-950/20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-20">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
            Available for new projects and collaborations
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              Brian Walker
            </h1>
            <p className="text-xl font-medium text-cyan-400 sm:text-2xl">
              Software Developer | CS Student | AWS Enthusiast
            </p>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              I build thoughtful digital products with modern web tools and a strong focus on clean user experiences.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              onClick={() => void trackPortfolioEvent("project-click", { path: "/projects" })}
              className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              Contact Me
            </Link>
            <a
              href="/resume.pdf"
              download
              onClick={() => void trackPortfolioEvent("resume-download", { path: "/resume.pdf" })}
              className="rounded-full border border-cyan-400/30 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6 shadow-lg shadow-black/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Focus</p>
          <div className="mt-6 space-y-4 text-zinc-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-zinc-100">Frontend engineering</p>
              <p className="mt-2 text-sm leading-7">React, Next.js, Tailwind, and polished UI systems.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-zinc-100">Backend & cloud</p>
              <p className="mt-2 text-sm leading-7">APIs, databases, and AWS-ready architecture thinking.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-medium text-zinc-100">Product craft</p>
              <p className="mt-2 text-sm leading-7">Designing clear interfaces and thoughtful developer experiences.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
