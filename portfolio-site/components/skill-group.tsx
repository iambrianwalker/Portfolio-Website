import type { SkillGroup as SkillGroupType } from "@/lib/content";

type SkillGroupProps = {
  group: SkillGroupType;
};

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <h3 className="text-xl font-semibold text-zinc-100">{group.title}</h3>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{group.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
