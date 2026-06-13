import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/layout/SectionHeading";
import { skillGroups } from "@/data/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Skills", path: "/skills" });

export default function SkillsPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.15),_transparent_35%)]">
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Skills"
            title="A modern toolkit spanning product development, web engineering, and cloud fundamentals."
            description="My skills continue to expand as I grow into full-stack development and cloud-native architecture."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <article key={group.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
                <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-sky-400/20 bg-slate-900/70 px-3 py-1 text-sm text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
