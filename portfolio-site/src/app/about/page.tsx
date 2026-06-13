import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/layout/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About", path: "/about" });

const journeyPoints = [
  "Building a strong foundation in software engineering through coursework, personal projects, and hands-on practice.",
  "Developing an interest in cloud-native solutions, with a growing focus on AWS Amplify, Lambda, and DynamoDB.",
  "Exploring product-minded engineering and creating software that feels elegant, useful, and reliable.",
];

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_40%)]">
        <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="A developer building with curiosity, discipline, and long-term growth in mind."
            description="My path combines academic learning, practical software projects, and a growing passion for cloud technologies."
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
              <h3 className="text-2xl font-semibold text-white">Professional Summary</h3>
              <p className="mt-4 text-lg text-slate-400">
                I am a Computer Science student and software developer focused on building polished experiences using modern web tools and cloud services. My work sits at the intersection of product thinking, clean architecture, and real-world problem solving.
              </p>
            </article>

            <article className="rounded-3xl border border-sky-400/20 bg-slate-900/70 p-8">
              <h3 className="text-2xl font-semibold text-white">Learning Journey</h3>
              <ul className="mt-4 space-y-3 text-slate-400">
                {journeyPoints.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
