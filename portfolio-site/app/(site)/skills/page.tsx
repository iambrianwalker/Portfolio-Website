import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { SkillGroup } from "@/components/skill-group";
import { skillGroups } from "@/lib/content";

export default function SkillsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20 sm:px-8 lg:px-10">
      <AnimatedSection className="space-y-10">
        <SectionHeading
          eyebrow="Skills"
          title="A practical toolkit for modern product development."
          description="A mix of project-backed tools and CS foundations — from Flutter apps and AWS deployments to Java, Python, and Oracle."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}
