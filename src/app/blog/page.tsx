import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog — Notes from production",
  description:
    "Practical writing on full-stack engineering and production software — coming soon.",
  openGraph: {
    title: "Blog — Ali Razzaq",
    description: "Notes from production.",
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="pt-24">
      <section className="container-x section">
        <div className="max-w-3xl">
          <div className="eyebrow">Writing</div>
          <h1 className="mt-4 text-5xl leading-[1.05] sm:text-6xl">
            Notes from{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              production
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
            Practical writing on what I learn shipping software — architecture,
            performance, and the operational tradeoffs that don&apos;t usually
            make it into tutorials.
          </p>
        </div>

        {sorted.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-10 text-center sm:p-14">
            <div className="eyebrow">Coming soon</div>
            <h2 className="mt-4 text-balance text-2xl leading-snug text-[var(--color-fg)] sm:text-3xl">
              First posts are{" "}
              <span className="serif-italic text-[var(--color-accent-bright)]">
                being written
              </span>
              .
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-fg-soft)]">
              I publish only when I have something genuinely worth sharing. In
              the meantime — explore the case studies or get in touch.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#work"
                className="rounded-full bg-[var(--color-fg)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:bg-white"
              >
                See case studies
              </Link>
              <Link
                href="/#contact"
                className="rounded-full border border-[var(--color-line-bright)] px-6 py-3 text-sm text-[var(--color-fg-soft)] transition hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                Get in touch
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-16 space-y-px overflow-hidden rounded-2xl border border-[var(--color-line)]">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 bg-[var(--color-bg)] p-6 transition hover:bg-[var(--color-bg-elevated)] sm:flex-row sm:items-baseline sm:p-8"
              >
                <div className="flex flex-row gap-4 text-xs text-[var(--color-fg-muted)] sm:w-44 sm:flex-col sm:gap-1">
                  <time>{formatDate(post.date)}</time>
                  <span className="text-[var(--color-fg-dim)] sm:hidden">
                    ·
                  </span>
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
        )}
      </section>
    </main>
  );
}
