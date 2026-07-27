export interface ProjectSnippet {
  language: string;
  filename: string;
  code: string;
  caption?: string;
}

export interface ProjectMilestone {
  week: string;
  label: string;
  desc: string;
}

export interface ProjectTestimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  codename: string;
  tagline: string;
  category: string;
  year: string;
  status: "PRODUCTION" | "BETA" | "ARCHIVED";
  accent: string;
  duration: string;
  team: string;
  role: string;
  stack: string[];
  metrics: { label: string; value: string; trend?: string }[];
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  features: string[];
  architecture: string[];
  process: ProjectMilestone[];
  snippets: ProjectSnippet[];
  testimonial: ProjectTestimonial;
  related: string[]; // slugs
}

export const projects: Project[] = [
  {
    id: "vaultpay",
    slug: "vaultpay",
    name: "VAULTPAY",
    codename: "Archive · 01",
    tagline: "Programmable treasury for modern fintech.",
    category: "Fintech · Treasury",
    year: "2025",
    status: "PRODUCTION",
    accent: "#8b6dff",
    duration: "14 weeks",
    team: "3 engineers + 1 designer",
    role: "Lead full-stack engineer",
    stack: [
      "Next.js 15",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "AWS Lambda",
      "Stripe",
      "Plaid",
      "Socket.io",
      "Prophet (Python)",
      "ClickHouse",
    ],
    metrics: [
      { label: "Monthly active users", value: "87.2k", trend: "+18% MoM" },
      { label: "Transactions processed", value: "2.4M", trend: "+34% QoQ" },
      { label: "P95 latency", value: "124ms" },
      { label: "Uptime", value: "99.98%" },
    ],
    description:
      "A B2B treasury platform letting startups automate cash flow, reconcile transactions across banks, and forecast runway with ML-driven projections. One canonical view of money in motion.",
    challenge:
      "Finance teams juggle 4-7 disconnected dashboards. Reconciliation takes 3-5 days at month-end. Cash position is always 24+ hours stale. We needed sub-minute freshness across multi-bank, multi-currency operations — without forcing customers to migrate banks.",
    solution:
      "Event-sourced ledger with append-only journal, Kafka-style transaction streams, ML forecasting on Pandas + Prophet, and a real-time dashboard pushing diffs over WebSocket. Plaid + Stripe + custom bank adapters unified into one canonical model. Forecasts retrain nightly on a 90-day window.",
    outcome:
      "Cut reconciliation from 5 days to 8 hours. Reduced manual entry errors by 94%. CFOs report decisions made on data <60s old. 87k MAU across 4 countries within first 8 months. Currently processing $48M / month.",
    features: [
      "Multi-bank aggregation (Plaid + 6 custom adapters)",
      "ML-driven 90-day cash forecasting",
      "Real-time reconciliation engine with sub-minute freshness",
      "Custom rules engine for transaction categorization",
      "Audit log with cryptographic chaining",
      "Role-based access control with SOC2-grade audit trails",
      "Multi-currency support across 12 currencies",
      "Programmable transfer schedules with retry semantics",
    ],
    architecture: [
      "Next.js 15 App Router for dashboard SSR",
      "Node.js services on AWS Lambda (event-driven)",
      "PostgreSQL primary + Redis hot cache + S3 cold storage",
      "Plaid + Stripe + 6 custom bank adapters unified behind a single port",
      "WebSocket layer (Socket.io) for live updates to dashboard clients",
      "Python ML pipeline (Pandas + Prophet) on scheduled ECS Fargate",
      "ClickHouse for analytical queries on the transaction journal",
      "Multi-region deployment (us-east-1, eu-west-1)",
    ],
    process: [
      {
        week: "Week 1-2",
        label: "Discovery + ledger design",
        desc: "Mapped customer workflows across 12 finance teams. Settled on event sourcing as the foundation — single immutable source of truth.",
      },
      {
        week: "Week 3-6",
        label: "Adapter layer + canonical model",
        desc: "Built the bank adapter abstraction. Plaid and Stripe first, then 6 custom adapters for regional banks. Every adapter mapped to one canonical Transaction type.",
      },
      {
        week: "Week 7-10",
        label: "Reconciliation engine + dashboard",
        desc: "Built the streaming reconciliation pipeline. Real-time diff push to clients via WebSocket. Dashboard shipped feature-complete by week 10.",
      },
      {
        week: "Week 11-13",
        label: "ML forecasting + ops hardening",
        desc: "Trained Prophet models on historical cash flow. Added retry semantics, alerting, runbook. Soak-tested under simulated load.",
      },
      {
        week: "Week 14",
        label: "Launch + handoff",
        desc: "Migrated 12 pilot customers. Documented every system. Trained the customer's internal ops team. Production handoff was a 90-minute call.",
      },
    ],
    snippets: [
      {
        language: "typescript",
        filename: "services/reconciliation.ts",
        caption: "Streaming reconciliation: batched matching with drift detection.",
        code: `// Streaming reconciliation engine
export async function reconcile(
  txns: Transaction[],
  ledger: LedgerStream,
): Promise<ReconciliationResult> {
  const batched = batchByAccount(txns, { window: 60_000 });

  const results = await Promise.all(
    batched.map(async (batch) => {
      const expected = await ledger.expectedFor(batch.accountId);
      const matched = matchEntries(batch.entries, expected);
      const drift = computeDrift(matched);

      if (drift.delta > THRESHOLD_BPS) {
        await alertOps({ severity: "warn", batch, drift });
      }

      return { account: batch.accountId, matched, drift };
    }),
  );

  return aggregate(results);
}`,
      },
      {
        language: "python",
        filename: "ml/forecast.py",
        caption: "90-day cash forecast: Prophet with custom regressors.",
        code: `def build_model(account_id: str, history: pd.DataFrame) -> Prophet:
    """Train a Prophet model with company-specific regressors."""
    m = Prophet(
        changepoint_prior_scale=0.05,
        seasonality_mode="multiplicative",
        interval_width=0.85,
    )

    # Custom regressors — payroll cadence, AR cycles
    m.add_regressor("is_payroll_day")
    m.add_regressor("ar_cycle_phase")
    m.add_seasonality(name="monthly", period=30.5, fourier_order=8)

    # Pakistan + US bank holidays
    m.add_country_holidays(country_name="US")

    m.fit(history)
    return m`,
      },
    ],
    testimonial: {
      author: "Sarah Chen",
      role: "CTO",
      company: "Northwind Capital",
      quote:
        "Ali rebuilt our reconciliation pipeline in three weeks. Cut what used to take five days down to under eight hours. He thinks like an owner — flagged three architectural risks we hadn't noticed and fixed two of them before we even prioritized.",
    },
    related: ["nimbus", "helix-ai"],
  },
  {
    id: "helix",
    slug: "helix-ai",
    name: "HELIX.ai",
    codename: "Archive · 02",
    tagline: "An AI copilot that understands your codebase.",
    category: "AI · Developer Tools",
    year: "2025",
    status: "BETA",
    accent: "#a892ff",
    duration: "9 weeks",
    team: "Solo + design contractor",
    role: "Solo full-stack + ML",
    stack: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "pgvector",
      "Claude API",
      "Redis",
      "Tree-sitter",
      "Server-Sent Events",
    ],
    metrics: [
      { label: "Active developers", value: "12.4k", trend: "+47% MoM" },
      { label: "Prompts per day", value: "189k" },
      { label: "P50 latency", value: "340ms" },
      { label: "Token cost saved", value: "62%" },
    ],
    description:
      "Context-aware AI pair programmer. Indexes your repo into a semantic graph, retrieves relevant code at query time, and produces suggestions with full file-level context — not just window snippets.",
    challenge:
      "Off-the-shelf AI assistants miss codebase context. They hallucinate APIs, misuse internal patterns, and treat each prompt as cold. Engineers waste cycles correcting LLM output instead of writing code.",
    solution:
      "Hybrid retrieval: AST-aware chunking via Tree-sitter + pgvector semantic search + symbol graph traversal. Claude 4.6 routes through a custom prompt cache that hits 78% of the time. Streamed responses via Server-Sent Events. VSCode + JetBrains plugins.",
    outcome:
      "Beta users report 3.4x faster feature delivery on legacy code. 62% reduction in token cost vs naive RAG. Onboarding time for new engineers cut from 2 weeks to 4 days. Currently in private beta with 14 design partners.",
    features: [
      "AST-aware repo indexing via Tree-sitter (12 languages)",
      "Symbol graph + dependency map for cross-file reasoning",
      "Semantic search via pgvector (HNSW index)",
      "Prompt caching aligned with Anthropic's 5-min TTL",
      "VSCode + JetBrains plugins",
      "Streaming SSE responses for sub-second time-to-first-token",
      "Per-team prompt templates",
      "Local-first index option (no code leaves your machine)",
    ],
    architecture: [
      "FastAPI gateway with Pydantic validation",
      "Tree-sitter parsers for 12 languages (Python, TS, Go, Rust, Java, ...)",
      "PostgreSQL + pgvector for embeddings (HNSW for fast recall)",
      "Redis for prompt cache + session state",
      "Claude API: Sonnet for code, Haiku for routing decisions",
      "React + TanStack Query frontend",
      "VSCode extension built on the LSP",
      "Local indexer in Rust for the local-first option",
    ],
    process: [
      {
        week: "Week 1",
        label: "Retrieval research",
        desc: "Spent a week reading prior art on code retrieval. Decided on hybrid AST + semantic + symbol graph after benchmarking three approaches on a fixed eval set.",
      },
      {
        week: "Week 2-3",
        label: "Indexer + storage",
        desc: "Built the Tree-sitter indexer. Settled on pgvector with HNSW after benching FAISS, Pinecone, and pgvector. pgvector won on operational simplicity at our scale.",
      },
      {
        week: "Week 4-6",
        label: "API + caching layer",
        desc: "FastAPI gateway with prompt cache. Tuned cache key strategy for Anthropic's 5-min TTL. Hit rate climbed from 12% to 78% over two weeks of tuning.",
      },
      {
        week: "Week 7-8",
        label: "Editor plugins",
        desc: "VSCode plugin built on the LSP. JetBrains plugin via their platform. Streamed SSE for sub-second time-to-first-token.",
      },
      {
        week: "Week 9",
        label: "Beta launch",
        desc: "Onboarded 14 design partners. Set up usage telemetry and error tracking. Iterating weekly based on partner feedback.",
      },
    ],
    snippets: [
      {
        language: "python",
        filename: "core/retrieval.py",
        caption: "Hybrid retrieval: semantic search + symbol-graph expansion + reranking.",
        code: `async def retrieve_context(
    query: str,
    repo: RepoIndex,
    k: int = 12,
) -> list[CodeChunk]:
    embedding = await embed(query)

    # Vector search across chunks
    semantic = await repo.vector_search(embedding, k=k * 2)

    # Walk symbol graph from top hits
    graph_hits = await repo.expand_symbols(
        seeds=[h.symbol_id for h in semantic[:5]],
        depth=2,
    )

    # Rerank with cross-encoder
    merged = dedupe(semantic + graph_hits)
    reranked = await rerank(query, merged)

    return reranked[:k]`,
      },
      {
        language: "python",
        filename: "core/cache.py",
        caption: "Prompt cache aligned with Anthropic's 5-min TTL.",
        code: `class PromptCache:
    """Cache aligned with Anthropic's 5-minute TTL."""

    TTL_SECONDS = 5 * 60

    async def get_or_compute(
        self,
        key: PromptKey,
        compute: Callable[[], Awaitable[Response]],
    ) -> CachedResponse:
        cached = await self.redis.get(key.fingerprint)
        if cached and not self._stale(cached):
            return CachedResponse(response=cached, cache_hit=True)

        response = await compute()
        await self.redis.setex(
            key.fingerprint,
            self.TTL_SECONDS,
            response.model_dump_json(),
        )
        return CachedResponse(response=response, cache_hit=False)`,
      },
    ],
    testimonial: {
      author: "Daniel Ortiz",
      role: "Product Lead",
      company: "Stitch.io",
      quote:
        "He integrated Claude into our editor and the cache hit rate is sitting at 78%. Token bill dropped by more than half month-over-month. Excellent communicator — async-friendly, no theatrics, just delivery.",
    },
    related: ["vaultpay", "nimbus"],
  },
  {
    id: "nimbus",
    slug: "nimbus",
    name: "NIMBUS",
    codename: "Archive · 03",
    tagline: "Observability that respects your time.",
    category: "DevOps · Observability",
    year: "2024",
    status: "PRODUCTION",
    accent: "#5cd9a4",
    duration: "18 weeks",
    team: "2 engineers",
    role: "Backend lead + UI",
    stack: [
      "Java",
      "Spring Boot",
      "React",
      "ClickHouse",
      "Kafka",
      "Docker",
      "AWS ECS",
      "Prometheus",
      "OpenTelemetry",
    ],
    metrics: [
      { label: "Events per second", value: "1.2M", trend: "peak load" },
      { label: "Customer teams", value: "340" },
      { label: "MTTR reduction", value: "−68%" },
      { label: "Storage cost", value: "−54%" },
    ],
    description:
      "A high-cardinality metrics + log + trace platform built for engineering teams that find Datadog too expensive and Grafana too DIY. Sane defaults, exceptional ergonomics.",
    challenge:
      "Mid-size teams are stuck: Datadog scales costs faster than usage, Grafana stack requires a dedicated platform engineer. Logs and metrics live in silos. Incident timelines are stitched manually in Slack.",
    solution:
      "ClickHouse-backed columnar storage with Kafka ingestion. Trace-correlated logs by default. AI-assisted incident timelines that auto-stitch deploys, alerts, and Slack chatter into a single audit trail. PromQL + LogQL compatible query layer.",
    outcome:
      "MTTR dropped 68% across 340 customer teams. Storage cost reduced 54% vs equivalent Datadog usage. Used by 3 YC-backed startups + 1 unicorn DevOps team. Now processing 1.2M events/sec at peak.",
    features: [
      "Unified metrics + logs + traces",
      "AI-assisted incident timeline reconstruction",
      "Cost-aware retention policies (hot → warm → cold)",
      "Slack-native alerting + chatops",
      "OpenTelemetry-first ingestion",
      "PromQL + LogQL compatible query layer",
      "Custom dashboarding with 22 widget types",
      "On-call runbook embedded in alerts",
    ],
    architecture: [
      "Spring Boot ingestion gateway",
      "Kafka for buffered event streams (3 brokers, 18 partitions)",
      "ClickHouse cluster (3-node) for storage",
      "React + ECharts dashboards",
      "Custom query planner translating PromQL → SQL",
      "Deployed on AWS ECS Fargate",
      "S3 for cold storage + Athena for archival queries",
      "Slack bot built on the Bolt SDK",
    ],
    process: [
      {
        week: "Week 1-3",
        label: "Architecture + ClickHouse PoC",
        desc: "Benched ClickHouse against TimescaleDB and InfluxDB. ClickHouse won on storage compression (4.2x) and query speed at our cardinality.",
      },
      {
        week: "Week 4-8",
        label: "Ingestion + storage",
        desc: "Spring Boot ingestion gateway. Kafka buffer for back-pressure tolerance. Schema design optimized for compression — saved 54% vs naive layout.",
      },
      {
        week: "Week 9-13",
        label: "Query layer + dashboards",
        desc: "Custom planner translating PromQL → ClickHouse SQL. React dashboarding with 22 widget types. ECharts for performance over D3 at this scale.",
      },
      {
        week: "Week 14-16",
        label: "AI incident timelines",
        desc: "Stitched alerts + deploys + Slack chatter into auto-generated post-mortems. Used Claude to summarize. Saved oncall an average of 40min per incident.",
      },
      {
        week: "Week 17-18",
        label: "Production rollout",
        desc: "Migrated 340 customer teams over a phased rollout. Zero data loss. Cut over from the legacy stack in three days.",
      },
    ],
    snippets: [
      {
        language: "java",
        filename: "ingest/EventRouter.java",
        caption: "Ingestion gateway: routes events to Kafka topics with backpressure-aware sampling.",
        code: `@Component
public class EventRouter {
    private final KafkaTemplate<String, Event> kafka;
    private final SamplingPolicy sampler;

    public CompletableFuture<Ack> route(Event event) {
        if (!sampler.accept(event)) {
            return Ack.dropped(event.id());
        }

        var topic = switch (event.kind()) {
            case METRIC -> "metrics.raw";
            case LOG    -> "logs.raw";
            case TRACE  -> "traces.raw";
        };

        return kafka.send(topic, event.tenantId(), event)
            .thenApply(r -> Ack.accepted(event.id(), r.getRecordMetadata().offset()))
            .exceptionally(ex -> Ack.failed(event.id(), ex));
    }
}`,
      },
      {
        language: "sql",
        filename: "schema/metrics.sql",
        caption: "ClickHouse schema tuned for cardinality + compression.",
        code: `CREATE TABLE metrics (
    tenant_id   LowCardinality(String),
    metric_name LowCardinality(String),
    timestamp   DateTime64(3),
    value       Float64,
    labels      Map(LowCardinality(String), String)
)
ENGINE = MergeTree
PARTITION BY toYYYYMMDD(timestamp)
ORDER BY (tenant_id, metric_name, timestamp)
TTL timestamp + INTERVAL 30 DAY TO VOLUME 'cold',
    timestamp + INTERVAL 90 DAY DELETE
SETTINGS storage_policy = 'tiered';`,
      },
    ],
    testimonial: {
      author: "Priya Nair",
      role: "Head of Engineering",
      company: "Ledgerline",
      quote:
        "We were burning $14k/month on a managed observability stack. Ali designed and shipped a self-hosted alternative that's now cheaper, faster, and easier to query. Paid for itself in 60 days.",
    },
    related: ["vaultpay", "helix-ai"],
  },
  {
    id: "rouzeal",
    slug: "rouzeal",
    name: "ROUZEAL",
    codename: "Archive · 04",
    tagline: "Illuminating your skin — luxury beauty, delivered.",
    category: "E-commerce · Beauty & Cosmetics",
    year: "2026",
    status: "PRODUCTION",
    accent: "#ff5c8a",
    duration: "8 weeks",
    team: "2 engineers",
    role: "Lead full-stack developer",
    stack: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "Vercel",
      "Node.js",
    ],
    metrics: [
      { label: "Status", value: "Live in production" },
      { label: "Market", value: "Pakistan" },
      { label: "Product lines", value: "7+ categories" },
      { label: "Checkout", value: "COD + SSL-secured" },
    ],
    description:
      "A premium beauty and cosmetics storefront for the Pakistani market — skincare, haircare, fragrances, makeup, and grooming from established international and regional brands like L'Oreal, Maybelline, Revlon, and Dove, delivered door-to-door.",
    challenge:
      "Online beauty retail in Pakistan lives or dies on trust and speed. Buyers are mobile-first, price-sensitive, and used to Cash on Delivery — a slow catalog or an unfamiliar checkout flow sends them straight back to a physical store.",
    solution:
      "Built the storefront on Next.js App Router with server-rendered, image-optimized category and product pages for fast first paint on mid-range mobile devices. Tailwind CSS v4 powers a consistent design system across the catalog. Checkout supports both Cash on Delivery and SSL-secured card payments to match local buying habits.",
    outcome:
      "A live storefront organized across seven product lines (skincare, hair care, fragrances, makeup, personal care, kids, and men's grooming), with free shipping above Rs. 5,000 and a 7-day return policy that lowers the barrier for first-time online beauty buyers.",
    features: [
      "Multi-category catalog: skincare, hair care, fragrances, makeup, personal care, kids, and men's",
      "Curated brand portfolio spanning international and regional labels",
      "PKR pricing with free shipping above Rs. 5,000",
      "Cash on Delivery + 256-bit SSL-secured checkout",
      "7-day return policy surfaced throughout the buying flow",
      "Mobile-first responsive storefront",
      "Optimized responsive imagery via next/image",
    ],
    architecture: [
      "Next.js 15 App Router with server-rendered category and product pages",
      "Tailwind CSS v4 design system shared across the storefront",
      "next/image with responsive srcsets for hero and product imagery",
      "Deployed on Vercel's edge network",
    ],
    process: [
      {
        week: "Week 1-2",
        label: "Catalog structure + design system",
        desc: "Mapped the category tree (skincare, hair care, fragrances, makeup, personal care, kids, men's) and built the Tailwind v4 design system for the storefront.",
      },
      {
        week: "Week 3-5",
        label: "Storefront + product pages",
        desc: "Built the App Router catalog, product detail pages, and cart flow with server rendering for fast mobile load times.",
      },
      {
        week: "Week 6-7",
        label: "Checkout + trust signals",
        desc: "Wired up Cash on Delivery alongside SSL-secured card checkout, plus free-shipping threshold and return-policy messaging throughout the funnel.",
      },
      {
        week: "Week 8",
        label: "Launch",
        desc: "Shipped the production storefront on Vercel and handed off content management to the Rouzeal team.",
      },
    ],
    snippets: [
      {
        language: "typescript",
        filename: "app/(shop)/category/[slug]/page.tsx",
        caption: "Category page: server-rendered product grid with free-shipping threshold logic.",
        code: `export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  return (
    <section>
      <FreeShippingBanner thresholdPKR={5000} />
      <ProductGrid products={products} />
    </section>
  );
}`,
      },
    ],
    testimonial: {
      author: "Ali Razzaq",
      role: "Lead Developer",
      company: "Rouzeal",
      quote:
        "The brief was simple: make a beauty catalog feel fast on a mid-range Android over 4G, and make checkout feel familiar to someone paying Cash on Delivery for the first time online. Next.js's server rendering and a tight Tailwind design system got us there.",
    },
    related: ["vaultpay", "helix-ai"],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
