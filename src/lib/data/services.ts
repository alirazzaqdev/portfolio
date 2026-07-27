export interface Service {
  id: string;
  endpoint: string;
  method: "POST" | "GET" | "PUT";
  title: string;
  summary: string;
  capabilities: string[];
  /** Slugs of case-study projects that demonstrate this service. */
  proofProjects?: string[];
  payload: Record<string, string>;
  response: Record<string, string>;
}

/**
 * Services are limited to work I can demonstrate via the case studies on this site.
 * Every service points to at least one real project so a client can verify the claim.
 * Do not add services without a proofProject backing them.
 */
export const services: Service[] = [
  {
    id: "marketing-ecommerce",
    endpoint: "/build/marketing-site",
    method: "POST",
    title: "Marketing & E-commerce Sites",
    summary:
      "Production marketing sites with product catalogs, lead capture, and SEO baked in — built on Next.js + Vercel. Designed for SME businesses where the site is a real sales channel, not a brochure.",
    capabilities: [
      "Next.js 15 App Router + Server Components",
      "Product catalogs with brand/category filters",
      "WhatsApp-first lead capture for local markets",
      "Custom calculators (e.g. solar sizing, quote estimators)",
      "Aggressive on-page SEO + JSON-LD",
    ],
    proofProjects: ["rustam-battery", "window-land"],
    payload: {
      type: "marketing_site",
      stack: "next.js | tailwind | vercel",
      timeline: "4-8 weeks",
    },
    response: {
      status: "200 OK",
      delivery: "production_ready",
      includes: "code | seo | deploy | admin_docs",
    },
  },
  {
    id: "internal-tools-pwa",
    endpoint: "/build/internal-tool",
    method: "POST",
    title: "Internal Tools & Offline PWAs",
    summary:
      "Installable web apps for field teams — quote generators, PIN-locked tools, branded PDF output, fully offline-first. The kind of thing sales reps run on a phone in a customer's living room.",
    capabilities: [
      "PWA install + service worker",
      "Offline-first persistence (IndexedDB / localStorage)",
      "PIN / device-level auth",
      "Client-side branded PDF generation (jsPDF)",
      "Mobile-first responsive UI",
    ],
    proofProjects: ["solar-quotation", "hisably"],
    payload: {
      type: "internal_tool",
      stack: "react | vite | pwa",
      timeline: "3-6 weeks",
    },
    response: {
      status: "200 OK",
      delivery: "installable_pwa",
      includes: "app | offline_sync | install_guide",
    },
  },
  {
    id: "full-stack-backends",
    endpoint: "/build/full-stack",
    method: "POST",
    title: "Full-Stack Web Applications",
    summary:
      "End-to-end web apps with admin panels, authenticated APIs, and proper data models. Comfortable structuring a Turborepo monorepo when the project needs more than one service.",
    capabilities: [
      "Next.js 15 / React frontends + admin panels",
      "Node.js Express APIs + Python FastAPI microservices",
      "JWT auth with role-based access",
      "PostgreSQL / MongoDB schema design",
      "Turborepo monorepos for multi-service apps",
    ],
    proofProjects: ["hisably", "window-land"],
    payload: {
      type: "full_stack_app",
      stack: "next.js | express | fastapi | postgres | mongo",
      timeline: "6-10 weeks",
    },
    response: {
      status: "200 OK",
      delivery: "deployed_and_documented",
      includes: "frontend | api | admin | docs",
    },
  },
  {
    id: "ai-integration",
    endpoint: "/integrate/ai",
    method: "POST",
    title: "AI Integration",
    summary:
      "Bring Claude or OpenAI into your existing product or workflow. Focus on prompt design, structured outputs, and cost controls — not chatbots for the sake of it.",
    capabilities: [
      "Claude / OpenAI API integration",
      "Structured outputs + tool use",
      "Prompt engineering with cost & latency tracking",
      "Custom Python automation scripts",
      "Retrieval over your own content",
    ],
    // TODO: link a real AI-integration case study when one is published.
    proofProjects: [],
    payload: {
      type: "ai_integration",
      models: "claude | openai",
      patterns: "structured_output | tool_use | rag",
    },
    response: {
      status: "200 OK",
      delivery: "integrated",
      includes: "api | prompts | cost_telemetry",
    },
  },
  {
    id: "seo-performance",
    endpoint: "/improve/seo-perf",
    method: "POST",
    title: "SEO & Performance",
    summary:
      "On-page SEO and Lighthouse-grade performance for sites that already exist. Structured data, sitemap, geo targeting, image optimization, and JS budget cleanup.",
    capabilities: [
      "On-page SEO + meta + JSON-LD (Person, LocalBusiness, Article)",
      "Geo / regional targeting (PK, UAE)",
      "Sitemap + robots + search-console setup",
      "Image optimization + lazy loading",
      "Core Web Vitals tuning",
    ],
    proofProjects: ["rustam-battery", "window-land"],
    payload: {
      type: "seo_perf",
      target: "lighthouse_90+ | rich_results",
      duration: "1-3 weeks",
    },
    response: {
      status: "200 OK",
      delivery: "measurable_improvement",
      includes: "audit | fixes | report",
    },
  },
];
