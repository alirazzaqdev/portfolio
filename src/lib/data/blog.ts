export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO YYYY-MM-DD
  readTime: string;
  category: string;
  tags: string[];
  content: BlogSection[];
}

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export const posts: BlogPost[] = [
  {
    slug: "scaling-postgres-with-pgvector",
    title: "Scaling Postgres with pgvector — what we learned at 2M embeddings",
    description:
      "Lessons from running a production HNSW vector index on Postgres for code search at scale. Recall, latency, and the operational tradeoffs nobody warns you about.",
    date: "2026-04-22",
    readTime: "9 min read",
    category: "Engineering",
    tags: ["Postgres", "pgvector", "Vector search", "Performance"],
    content: [
      {
        type: "p",
        text: "When we shipped HELIX.ai's semantic code search, we benched three vector stores: FAISS, Pinecone, and Postgres + pgvector. We expected pgvector to lose. It didn't — but only after we tuned three things almost nobody mentions in introductory blog posts.",
      },
      {
        type: "h2",
        text: "Why we picked Postgres",
      },
      {
        type: "p",
        text: "Operational simplicity. We were already running Postgres for everything else — auth, billing, repo metadata. Adding a managed vector service meant another deploy target, another set of secrets, another paging surface. pgvector keeps embeddings inside the same transaction boundary as the rest of the data, which is more useful than it sounds.",
      },
      {
        type: "h2",
        text: "The first surprise: HNSW vs IVFFlat",
      },
      {
        type: "p",
        text: "pgvector ships two index types. We started with IVFFlat because every tutorial uses it. At 200k embeddings, recall was 92% at acceptable latency. At 2M, recall fell off a cliff — to ~78%. HNSW solved it, but at a cost: index build times went from minutes to over an hour, and memory usage roughly doubled.",
      },
      {
        type: "code",
        language: "sql",
        code: `-- IVFFlat: fast to build, weaker at scale
CREATE INDEX ON embeddings USING ivfflat (vector vector_cosine_ops)
WITH (lists = 1000);

-- HNSW: slow to build, far better recall
CREATE INDEX ON embeddings USING hnsw (vector vector_cosine_ops)
WITH (m = 16, ef_construction = 64);`,
      },
      {
        type: "p",
        text: "The numbers that matter: at 2M rows, HNSW gave us 96% recall@10 with p95 query latency of 38ms. IVFFlat at the same configuration gave 78% recall and 71ms p95.",
      },
      {
        type: "h2",
        text: "The second surprise: ef_search at query time",
      },
      {
        type: "p",
        text: "HNSW has a runtime parameter — ef_search — that's invisible to most ORMs. The default of 40 was fine for our top-5 queries but tanked recall on top-50. Setting it per-query was the fix.",
      },
      {
        type: "code",
        language: "python",
        code: `# Set ef_search per session, not at index creation
async def vector_search(query: str, k: int):
    async with pool.acquire() as conn:
        # Tune for the result size we want
        ef = max(40, k * 4)
        await conn.execute(f"SET LOCAL hnsw.ef_search = {ef}")

        return await conn.fetch("""
            SELECT chunk_id, content, 1 - (vector <=> $1) AS score
            FROM embeddings
            ORDER BY vector <=> $1
            LIMIT $2
        """, query_embedding, k)`,
      },
      {
        type: "h2",
        text: "The third surprise: VACUUM and bloat",
      },
      {
        type: "p",
        text: "We were rebuilding embeddings nightly as the indexed corpus grew. Within a week, query latency degraded by 40%. Postgres' MVCC means deleted tuples stay around until VACUUM cleans them up — and HNSW indexes are sensitive to bloat.",
      },
      {
        type: "list",
        items: [
          "Run `VACUUM ANALYZE` after any large delete or bulk update",
          "Schedule REINDEX on the HNSW index weekly during low-traffic windows",
          "Monitor pg_stat_user_indexes for idx_scan vs n_dead_tup ratio",
        ],
      },
      {
        type: "h2",
        text: "What I'd do differently",
      },
      {
        type: "p",
        text: "If I started over, I'd commit to HNSW from day one and skip the IVFFlat phase entirely. The index build cost is real but pays for itself within a week of production use. I'd also bake a small reranker on top — semantic search alone gets you 80% of the way; a cross-encoder rerank closes the rest.",
      },
      {
        type: "quote",
        text: "Vector search is mostly about systems engineering. The model picks the candidates; the database determines whether the system can be operated by humans on call.",
      },
    ],
  },
  {
    slug: "aws-lambda-cost-optimization",
    title: "How I cut a startup's AWS Lambda bill by 67%",
    description:
      "A practical walkthrough of the four biggest cost wins on serverless: right-sizing memory, ARM architecture, provisioned concurrency, and the invocation patterns nobody profiles.",
    date: "2026-03-14",
    readTime: "7 min read",
    category: "Cloud",
    tags: ["AWS", "Lambda", "Serverless", "Cost optimization"],
    content: [
      {
        type: "p",
        text: "A client came to me with a $3,400/month Lambda bill on a product doing roughly 4 million invocations a month. After two weeks of work, the bill dropped to $1,120. Same product. Same traffic. Same SLOs.",
      },
      {
        type: "p",
        text: "Here's exactly what changed and how to find these wins in your own infrastructure.",
      },
      {
        type: "h2",
        text: "1. Memory right-sizing (saved $940/mo)",
      },
      {
        type: "p",
        text: "Lambda bills you on memory × duration. Most teams set memory based on a guess and never revisit. The trick: more memory often means lower cost because CPU scales with memory and the function finishes faster.",
      },
      {
        type: "p",
        text: "I used AWS Lambda Power Tuning to find the sweet spot for each function. Results varied wildly — one function got cheaper at 1024MB despite using only 280MB, because the CPU boost cut runtime by 60%.",
      },
      {
        type: "code",
        language: "bash",
        code: `# Lambda Power Tuning state machine
aws stepfunctions start-execution \\
  --state-machine-arn $POWER_TUNING_ARN \\
  --input '{
    "lambdaARN": "arn:aws:lambda:us-east-1:123:function:api-handler",
    "powerValues": [128, 256, 512, 1024, 2048],
    "num": 50,
    "strategy": "balanced"
  }'`,
      },
      {
        type: "h2",
        text: "2. ARM (Graviton) architecture (saved $480/mo)",
      },
      {
        type: "p",
        text: "AWS charges 20% less for arm64 Lambda functions than x86. For Node.js, Python, and Java workloads, this is usually a free win — no code changes needed. Just flip the architecture flag.",
      },
      {
        type: "code",
        language: "yaml",
        code: `# AWS SAM template
Resources:
  ApiHandler:
    Type: AWS::Serverless::Function
    Properties:
      Architectures:
        - arm64  # Was: x86_64
      Runtime: nodejs20.x`,
      },
      {
        type: "p",
        text: "Caveat: any native dependencies need ARM-compatible builds. Most popular npm/PyPI packages have these by 2026, but watch for any that don't.",
      },
      {
        type: "h2",
        text: "3. Cold start mitigation (saved $620/mo)",
      },
      {
        type: "p",
        text: "We were running 12 functions, each with provisioned concurrency of 2 — a static $1,200/mo bill. After profiling, only 3 functions had cold-start-sensitive traffic. We moved the others to on-demand and used SnapStart for the Java function.",
      },
      {
        type: "list",
        items: [
          "Audit which functions actually need warm starts (look at p99 latency)",
          "Use SnapStart for Java — restores in <500ms with no per-instance cost",
          "Replace provisioned concurrency with scheduled warming for predictable peaks",
        ],
      },
      {
        type: "h2",
        text: "4. Invocation pattern audit (saved $240/mo)",
      },
      {
        type: "p",
        text: "The sneakiest win: we found a function being called 800k times per day to check a status that changed maybe twice a day. Caching the result in DynamoDB with a 5-minute TTL eliminated 99% of those calls.",
      },
      {
        type: "h2",
        text: "What I'd recommend for any team",
      },
      {
        type: "p",
        text: "Start with Power Tuning — it's the highest-ROI change you can make in an afternoon. Then look at architecture (1 line of YAML for 20% off). Provisioned concurrency is the longest tail; audit it carefully before paying for it.",
      },
    ],
  },
  {
    slug: "react-server-components-real-world",
    title: "React Server Components in production — what actually changed",
    description:
      "Six months of shipping with the App Router and RSC. The mental model shifts, the gotchas, and the patterns that emerged after the hype settled.",
    date: "2026-02-08",
    readTime: "8 min read",
    category: "Frontend",
    tags: ["React", "Next.js", "RSC", "Architecture"],
    content: [
      {
        type: "p",
        text: "I've been building with React Server Components in production for about six months across three projects. The mental model is genuinely different from what came before, and most of the existing tutorials still treat RSC as if it were just \"server-rendered React.\" It isn't.",
      },
      {
        type: "h2",
        text: "The mental model that finally clicked",
      },
      {
        type: "p",
        text: "Server Components are not server-rendered Client Components. They're a fundamentally different thing. Server Components run once on the server, output a serialized tree, and never re-render. Client Components are what you used to call \"React components\" — they run in the browser, can hold state, and re-render.",
      },
      {
        type: "p",
        text: "The interesting move is composition: you can pass Server Components as children of Client Components. This lets you keep most of your tree on the server while putting interactivity exactly where it's needed.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// Client Component (interactive shell)
"use client";

export function Tabs({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("overview");
  // ...returns interactive tab UI wrapping children
}

// Server Component (data-fetching content)
export default async function ProjectPage({ slug }: { slug: string }) {
  const project = await db.projects.findBySlug(slug);  // runs on server

  return (
    <Tabs>
      <TabPanel name="overview">{project.summary}</TabPanel>
      <TabPanel name="metrics">
        {/* Server-side fetch, rendered into a client tab */}
        <MetricsBoard projectId={project.id} />
      </TabPanel>
    </Tabs>
  );
}`,
      },
      {
        type: "h2",
        text: "The gotcha that ate a week",
      },
      {
        type: "p",
        text: "Anything imported by a Client Component becomes a Client Component. This is enforced quietly, and it cascades. We accidentally pulled half our component library into the client bundle because a single utility file at the root was marked `\"use client\"`.",
      },
      {
        type: "p",
        text: "The fix is discipline at the boundary: the `\"use client\"` directive should be at the leaves of your tree, not the root. Treat it like a careful import.",
      },
      {
        type: "h2",
        text: "Patterns that actually emerged",
      },
      {
        type: "h3",
        text: "1. Data fetching at the page level",
      },
      {
        type: "p",
        text: "Server Components made it painless to fetch data exactly where you need it. We dropped TanStack Query from one project entirely — it was solving problems that no longer existed.",
      },
      {
        type: "h3",
        text: "2. Server Actions for mutations",
      },
      {
        type: "p",
        text: "Form submissions and mutations got dramatically simpler. No more API route boilerplate, no more client-side fetch logic. Just a function with `\"use server\"` at the top.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// Server Action — runs on the server, called from a form
async function submitContact(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await db.contacts.create({ name, email });
  redirect("/thank-you");
}

// Used directly in a form
<form action={submitContact}>
  <input name="name" />
  <input name="email" />
  <button>Submit</button>
</form>`,
      },
      {
        type: "h3",
        text: "3. Streaming with Suspense",
      },
      {
        type: "p",
        text: "Streaming is the biggest UX win in RSC. Wrap any slow data fetch in Suspense and the rest of the page renders immediately. Time-to-first-paint dropped 60% on our slowest dashboard route.",
      },
      {
        type: "h2",
        text: "What I'd tell my past self",
      },
      {
        type: "list",
        items: [
          "Read the React Server Components RFC, not just framework docs — it explains the why",
          "Keep `\"use client\"` at the leaves; never default it",
          "Stream slow data with Suspense — this is mostly free performance",
          "Skip global state libraries for new projects; you may not need them",
        ],
      },
      {
        type: "p",
        text: "RSC is a real shift, not marketing. Six months in, I write fewer effects, fewer fetches in components, and the apps feel faster. The learning curve is real, but it's worth the climb.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
