export type SkillCategory =
  | "language"
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "ai";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  years: number;
}

export const skills: Skill[] = [
  // Languages
  { id: "python", name: "Python", category: "language", proficiency: 92, years: 3 },
  { id: "java", name: "Java", category: "language", proficiency: 85, years: 3 },
  { id: "javascript", name: "JavaScript", category: "language", proficiency: 90, years: 3 },
  { id: "typescript", name: "TypeScript", category: "language", proficiency: 86, years: 2 },
  { id: "cpp", name: "C++", category: "language", proficiency: 78, years: 2 },
  { id: "php", name: "PHP", category: "language", proficiency: 72, years: 2 },

  // Frontend
  { id: "react", name: "React.js", category: "frontend", proficiency: 90, years: 3 },
  { id: "nextjs", name: "Next.js", category: "frontend", proficiency: 85, years: 2 },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", proficiency: 92, years: 2 },

  // Backend
  { id: "node", name: "Node.js", category: "backend", proficiency: 88, years: 3 },
  { id: "express", name: "Express.js", category: "backend", proficiency: 86, years: 3 },
  { id: "django", name: "Django", category: "backend", proficiency: 88, years: 3 },
  { id: "flask", name: "Flask", category: "backend", proficiency: 84, years: 3 },
  { id: "spring", name: "Spring Boot", category: "backend", proficiency: 80, years: 2 },

  // Databases
  { id: "postgres", name: "PostgreSQL", category: "database", proficiency: 86, years: 3 },
  { id: "mysql", name: "MySQL", category: "database", proficiency: 84, years: 3 },
  { id: "mongo", name: "MongoDB", category: "database", proficiency: 82, years: 2 },

  // Cloud & DevOps
  { id: "docker", name: "Docker", category: "cloud", proficiency: 84, years: 2 },
  { id: "aws", name: "AWS", category: "cloud", proficiency: 80, years: 2 },
  { id: "git", name: "Git", category: "cloud", proficiency: 92, years: 4 },
  { id: "linux", name: "Linux", category: "cloud", proficiency: 84, years: 3 },

  // AI
  { id: "openai", name: "OpenAI API", category: "ai", proficiency: 88, years: 2 },
  { id: "claude", name: "Claude API", category: "ai", proficiency: 86, years: 1 },
  { id: "sklearn", name: "Scikit-learn", category: "ai", proficiency: 80, years: 2 },
  { id: "pandas", name: "Pandas", category: "ai", proficiency: 84, years: 2 },
];

export const categoryLabels: Record<SkillCategory, string> = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  cloud: "Cloud & DevOps",
  ai: "AI / ML",
};

export const categoryColors: Record<SkillCategory, string> = {
  language: "#7b61ff",
  frontend: "#00e5ff",
  backend: "#9a85ff",
  database: "#4ade80",
  cloud: "#ffb547",
  ai: "#ff5c7c",
};
