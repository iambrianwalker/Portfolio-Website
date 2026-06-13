export type Project = {
  title: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export const projects: Project[] = [
  {
    title: "Habit Mastery League",
    description:
      "A habit-tracking experience that turns daily goals into playful, motivating challenges with streaks and accountability.",
    stack: ["React", "TypeScript", "Firebase"],
    github: "https://github.com/your-username/habit-mastery-league",
    demo: "https://example.com/habit-mastery-league",
  },
  {
    title: "NextHaul",
    description:
      "A logistics dashboard concept for planning shipping routes, tracking milestones, and improving last-mile delivery visibility.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    github: "https://github.com/your-username/nexthaul",
    demo: "https://example.com/nexthaul",
  },
  {
    title: "Personal Finance Tracker",
    description:
      "A clean budgeting interface for monitoring expenses, setting savings goals, and understanding spending patterns over time.",
    stack: ["Flutter", "Dart", "Firebase"],
    github: "https://github.com/your-username/finance-tracker",
    demo: "https://example.com/finance-tracker",
  },
  {
    title: "Portfolio Website",
    description:
      "A polished personal site designed to showcase development work, technical interests, and a modern professional presence.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/your-username/portfolio-website",
    demo: "https://example.com/portfolio-website",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Designing polished interfaces and product experiences with modern web tools.",
    skills: ["React", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    title: "Backend",
    description: "Building reliable services, APIs, and data workflows that support real products.",
    skills: ["Node.js", "REST APIs", "Firebase", "Auth flows"],
  },
  {
    title: "Languages",
    description: "Comfortable across tools that power both product and systems-level work.",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Cloud",
    description: "Preparing for scalable deployment and operational workflows on AWS.",
    skills: ["AWS basics", "Amplify", "DynamoDB", "SES"],
  },
];
