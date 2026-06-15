export type Project = {
  title: string;
  description: string;
  symbol: string;
  stack: string[];
  github: string;
  demo?: string;
};

export function hasProjectDemo(project: Project) {
  return Boolean(project.demo?.trim());
}

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
    title: "Habit Mastery League App",
    symbol: "🏆",
    description:
      "A gamified habit-tracking app that transforms personal growth into an engaging experience with streaks, progress tracking, achievement milestones, and an AI Habit Buddy for motivation and goal-setting.",
    stack: ["Flutter", "Dart", "SQLite", "SharedPreferences"],
    github: "https://github.com/iambrianwalker/project1.git",
  },
  {
    title: "NextHaul Moving App",
    symbol: "🚚",
    description:
      "A cloud-powered moving logistics platform featuring user authentication, booking management, real-time messaging, and move status tracking, built with Flutter and AWS serverless technologies.",
    stack: ["Flutter", "Dart", "AWS Amplify", "DynamoDB", "AWS Cognito"],
    github: "https://github.com/iambrianwalker/NextHaul-Move-App.git",
  },
  {
    title: "FocusNFlow App",
    symbol: "📚",
    description:
      "A study organization platform that streamlines academic planning through intelligent scheduling, collaborative study groups, real-time chat, study space management, and personalized task prioritization.",
    stack: ["Flutter", "Firebase", "Cloud Firestore", "Firebase Authentication"],
    github: "https://github.com/Albonation/Project2_FocusNFlow.git",
  },
  {
    title: "Portfolio Website",
    symbol: "💻",
    description:
      "A polished personal site designed to showcase development work, technical interests, and a modern professional presence.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "AWS Amplify", "DynamoDB"],
    github: "https://github.com/iambrianwalker/Portfolio-Website.git",
  },
  {
    title: "YesterYear Website",
    symbol: "🎵",
    description:
      "A website for a local music enthusiast to promote upcoming artists in the Atlanta area.",
    stack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/iambrianwalker/yesteryear.git",
  },
  {
    title: "PetPal Website",
    symbol: "🐾",
    description:
      "A full-stack pet management platform that enables users to manage pet profiles, access pet care resources, and interact with pet-related services using a database-driven web application.",
    stack: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/malclifton/PetPal.git",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile Development",
    description:
      "Cross-platform apps with Flutter — habit tracking, logistics, and study planning with local and cloud-backed data.",
    skills: ["Flutter", "Dart", "SQLite", "SharedPreferences"],
  },
  {
    title: "Web Development",
    description:
      "Modern portfolio sites and front-end experiences built with responsive layouts and polished UI motion.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Backend & Databases",
    description:
      "Full-stack and database-driven apps with real-time data, auth, and server-side logic across Firebase and SQL stacks.",
    skills: ["Firebase", "Cloud Firestore", "Firebase Authentication", "PHP", "MySQL", "REST APIs"],
  },
  {
    title: "Cloud & AWS",
    description:
      "Serverless deployment, authentication, storage, and notifications — used in NextHaul and this portfolio site.",
    skills: ["AWS Amplify", "AWS Cognito", "DynamoDB", "Amazon SES"],
  },
  {
    title: "Programming Languages",
    description:
      "Core languages from CS coursework and applied development across web, mobile, and systems projects.",
    skills: ["Java", "Python", "C++"],
  },
  {
    title: "Enterprise & Infrastructure",
    description:
      "Relational databases and virtualized lab environments from academic and hands-on systems work.",
    skills: ["Oracle", "SQL", "Virtual Machines"],
  },
];
