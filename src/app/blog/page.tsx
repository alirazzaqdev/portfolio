import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog — Notes on building production systems",
  description:
    "Practical writing on full-stack engineering — Postgres, AWS, React Server Components, AI integration, and the rough edges between them.",
  openGraph: {
    title: "Blog — Ali Razzaq",
    description: "Notes on building production systems.",
  },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  return (
    <main className="pt-24">
      <section className="container-x section">
        <div className="max-w-3xl">
          <div className="eyebrow">Writing</div>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">
            Notes on{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              building
            </span>{" "}
            production systems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
            Practical writing on what I've learned shipping software —
            architecture, performance, and the operational tradeoffs that
            don't usually make it into tutorials.
          </p>
        </div>

        <div className="mt-16 space-y-px overflow-hidden rounded-2xl border border-[var(--color-line)]">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 bg-[var(--color-bg)] p-6 transition hover:bg-[var(--color-bg-elevated)] sm:flex-row sm:items-baseline sm:p-8"
            >
              <div className="flex flex-row gap-4 text-xs text-[var(--color-fg-muted)] sm:w-44 sm:flex-col sm:gap-1">
                <time>{formatDate(post.date)}</time>
                <span className="text-[var(--color-fg-dim)] sm:hidden">·</span>
                <span>{post.readTime}</span>
              </div>

              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-[var(--color-accent-bright)]">
                  {post.category}
                </div>
                <h2 className="mt-1 text-xl text-[var(--color-fg)] transition group-hover:text-[var(--color-accent-bright)] sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-[var(--color-fg-soft)]">
                  {post.description}
                </p>
              </div>

              <div className="text-sm text-[var(--color-fg-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--color-fg)]">
                →
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter / RSS placeholder */}
        <div className="mt-16 flex flex-col gap-4 rounded-2xl border border-[var(--color-line)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg text-[var(--color-fg)]">
              Want new posts in your inbox?
            </h3>
            <p className="mt-1 text-sm text-[var(--color-fg-soft)]">
              I write occasionally — once a month at most. No spam, no marketing.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition hover:bg-white"
          >
            Subscribe
            <span className="font-mono text-xs">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
