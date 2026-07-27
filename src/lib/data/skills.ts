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
  years: number;
  /** Slugs of case-study projects where this skill was used in production. */
  projects?: string[];
}

/**
 * Self-rated proficiency numbers were removed because they don't survive
 * scrutiny from technical clients. The honest proof is which real project
 * each skill shipped on — `projects` links to the case studies on this site.
 *
 * Add a project slug here only if the skill was actually used in that project.
 */
export const skills: Skill[] = [
  // Languages
  { id: "python", name: "Python", category: "language", years: 3, projects: ["window-land"] },
  { id: "java", name: "Java", category: "language", years: 3 },
  { id: "javascript", name: "JavaScript", category: "language", years: 3, projects: ["rustam-battery", "solar-quotation", "window-land"] },
  { id: "typescript", name: "TypeScript", category: "language", years: 2, projects: ["rustam-battery", "solar-quotation", "window-land"] },
  { id: "cpp", name: "C++", category: "language", years: 2 },
  { id: "php", name: "PHP", category: "language", years: 2 },

  // Frontend
  { id: "react", name: "React.js", category: "frontend", years: 3, projects: ["rustam-battery", "solar-quotation", "window-land"] },
  { id: "nextjs", name: "Next.js", category: "frontend", years: 2, projects: ["rustam-battery", "window-land"] },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", years: 2, projects: ["rustam-battery", "solar-quotation", "window-land"] },

  // Backend
  { id: "node", name: "Node.js", category: "backend", years: 3, projects: ["window-land"] },
  { id: "express", name: "Express.js", category: "backend", years: 3, projects: ["window-land"] },
  { id: "django", name: "Django", category: "backend", years: 3 },
  { id: "flask", name: "Flask", category: "backend", years: 3 },
  { id: "fastapi", name: "FastAPI", category: "backend", years: 2, projects: ["window-land"] },
  { id: "spring", name: "Spring Boot", category: "backend", years: 2 },

  // Databases
  { id: "postgres", name: "PostgreSQL", category: "database", years: 3, projects: ["window-land"] },
  { id: "mysql", name: "MySQL", category: "database", years: 3 },
  { id: "mongo", name: "MongoDB", category: "database", years: 2, projects: ["window-land"] },

  // Cloud & DevOps
  { id: "docker", name: "Docker", category: "cloud", years: 2 },
  { id: "aws", name: "AWS", category: "cloud", years: 2 },
  { id: "vercel", name: "Vercel", category: "cloud", years: 2, projects: ["rustam-battery", "solar-quotation", "window-land"] },
  { id: "git", name: "Git", category: "cloud", years: 4 },
  { id: "linux", name: "Linux", category: "cloud", years: 3 },

  // AI
  { id: "openai", name: "OpenAI API", category: "ai", years: 2 },
  { id: "claude", name: "Claude API", category: "ai", years: 1 },
  { id: "prompt", name: "Prompt Engineering", category: "ai", years: 2 },
];

export const categoryLabels: Record<SkillCategory, string> = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  database: "Databases",
  cloud: "Cloud & DevOps",
  ai: "AI / LLMs",
};

export const categoryColors: Record<SkillCategory, string> = {
  language: "#7b61ff",
  frontend: "#00e5ff",
  backend: "#9a85ff",
  database: "#4ade80",
  cloud: "#ffb547",
  ai: "#ff5c7c",
};
