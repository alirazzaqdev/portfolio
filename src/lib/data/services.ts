export interface Service {
  id: string;
  endpoint: string;
  method: "POST" | "GET" | "PUT";
  title: string;
  summary: string;
  capabilities: string[];
  payload: Record<string, string>;
  response: Record<string, string>;
}

export const services: Service[] = [
  {
    id: "web-app",
    endpoint: "/build/web-app",
    method: "POST",
    title: "Full-Stack Web Applications",
    summary:
      "Production-grade web apps from data layer to pixel-perfect UI. Django, Flask, or Node.js on the backend; React + Next.js on the frontend.",
    capabilities: [
      "Modern React + Next.js 15 frontends",
      "Django / Flask / Express APIs",
      "REST + GraphQL design",
      "Auth, payments, file uploads, email",
      "Type-safe end-to-end (TypeScript + Pydantic)",
    ],
    payload: {
      type: "web_application",
      stack: "next.js | django | postgres",
      timeline: "3-8 weeks",
    },
    response: {
      status: "200 OK",
      delivery: "production_ready",
      includes: "code | tests | docs | deploy",
    },
  },
  {
    id: "backend",
    endpoint: "/build/backend-system",
    method: "POST",
    title: "Backend & Database Engineering",
    summary:
      "Scalable backend systems engineered for the long term. Microservices, event-driven architectures, and database design that scales past 1M rows.",
    capabilities: [
      "Spring Boot, Django, FastAPI, Node services",
      "PostgreSQL / MySQL schema design + tuning",
      "MongoDB for document workloads",
      "Microservices with proper boundaries",
      "Async jobs, queues, and scheduled tasks",
    ],
    payload: {
      type: "backend_system",
      pattern: "microservices | monolith | hybrid",
      scale: "up to 10M req/day",
    },
    response: {
      status: "200 OK",
      delivery: "deployed_and_observable",
      includes: "api | docs | runbook | metrics",
    },
  },
  {
    id: "cloud-devops",
    endpoint: "/deploy/cloud-infra",
    method: "POST",
    title: "Cloud & DevOps",
    summary:
      "AWS-native infrastructure with Docker containers, CI/CD pipelines, and observability baked in. From zero to deployed in days, not months.",
    capabilities: [
      "Dockerized applications + Compose",
      "AWS EC2, S3, Lambda, RDS configuration",
      "CI/CD pipelines (GitHub Actions)",
      "Monitoring + alerting setup",
      "Cost-optimized infrastructure",
    ],
    payload: {
      type: "infrastructure",
      target: "aws | self_hosted",
      pipeline: "github_actions | gitlab_ci",
    },
    response: {
      status: "200 OK",
      delivery: "deployed_and_documented",
      includes: "iac | pipelines | dashboards",
    },
  },
  {
    id: "ai-integration",
    endpoint: "/integrate/ai",
    method: "POST",
    title: "AI Integration & Automation",
    summary:
      "Bring large language models into your existing product. OpenAI, Claude, Gemini — implemented with caching, streaming, and cost controls that scale.",
    capabilities: [
      "Claude / GPT / Gemini API integration",
      "RAG systems (vector DB + retrieval)",
      "Prompt caching for cost reduction",
      "Streaming responses via SSE",
      "Custom Python automation scripts",
    ],
    payload: {
      type: "ai_integration",
      models: "claude | openai | gemini",
      patterns: "rag | agent | streaming",
    },
    response: {
      status: "200 OK",
      delivery: "integrated_and_optimized",
      includes: "api | cache | telemetry",
    },
  },
  {
    id: "ml",
    endpoint: "/build/ml-pipeline",
    method: "POST",
    title: "Machine Learning Pipelines",
    summary:
      "End-to-end ML pipelines from data ingest to model serving. Scikit-learn, Pandas, NumPy on classic ML; LLM-based systems for modern workloads.",
    capabilities: [
      "Data cleaning + feature engineering",
      "Model training (Scikit-learn, XGBoost)",
      "Pipeline orchestration",
      "Model serving via FastAPI",
      "A/B testing + monitoring",
    ],
    payload: {
      type: "ml_pipeline",
      stage: "research | production",
      stack: "python | sklearn | pandas",
    },
    response: {
      status: "200 OK",
      delivery: "trained_and_deployed",
      includes: "model | api | metrics",
    },
  },
  {
    id: "consulting",
    endpoint: "/advise/architecture",
    method: "POST",
    title: "Technical Consulting",
    summary:
      "Architecture review, code audits, and technical decision-making for early-stage teams. Get a senior engineer's opinion before you commit to a 6-month build.",
    capabilities: [
      "Architecture review + recommendations",
      "Code audits with prioritized findings",
      "Stack selection guidance",
      "Performance + scaling reviews",
      "Hiring + interview support",
    ],
    payload: {
      type: "consulting_engagement",
      duration: "1-4 weeks",
      output: "report | recommendations",
    },
    response: {
      status: "200 OK",
      delivery: "actionable_findings",
      includes: "report | call | followup",
    },
  },
];
