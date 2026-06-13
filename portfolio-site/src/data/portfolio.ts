export type Project = {
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  features: string[];
};

export const featuredProjects: Project[] = [
  {
    name: "Habit Mastery League",
    description:
      "A habit-building platform designed to help users stay accountable through streaks, challenges, and progress tracking.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
    githubUrl: "https://github.com/iambrianwalker",
    demoUrl: "https://example.com",
    features: ["Daily habit goals", "Streak tracking", "Progress visualizations"],
  },
  {
    name: "NextHaul",
    description:
      "A shipping and logistics concept app focused on delivering a clear, modern admin experience.",
    technologies: ["React", "Node.js", "REST APIs", "DynamoDB"],
    githubUrl: "https://github.com/iambrianwalker",
    demoUrl: "https://example.com",
    features: ["Shipment dashboard", "Realtime updates", "Role-based views"],
  },
  {
    name: "Personal Finance Tracker",
    description:
      "A finance tracker for organizing expenses, planning goals, and gaining insight through simple visuals.",
    technologies: ["Python", "SQL", "Flask", "Chart.js"],
    githubUrl: "https://github.com/iambrianwalker",
    demoUrl: "https://example.com",
    features: ["Expense categories", "Budget insights", "Goal planning"],
  },
  {
    name: "Portfolio Website",
    description:
      "A modern portfolio website built to showcase software engineering growth, projects, and contact details.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/iambrianwalker/Portfolio-Website",
    demoUrl: "https://example.com",
    features: ["Responsive design", "Animated transitions", "Accessible UI"],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C#", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Flutter", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Node.js", "REST APIs", "Firebase", "MySQL", "SQLite"],
  },
  {
    title: "Cloud",
    items: ["AWS Amplify", "AWS Lambda", "DynamoDB", "Cognito", "SES"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Docker", "Postman"],
  },
];
