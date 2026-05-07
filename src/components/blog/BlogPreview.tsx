"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "@/lib/data/blog";

export default function BlogPreview() {
  const recent = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <section
      id="writing"
      className="section border-t border-[var(--color-line)]"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-3xl">
            <div className="eyebrow">Writing</div>
            <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
              Notes on{" "}
              <span className="serif-italic text-[var(--color-accent-bright)]">
                building
              </span>{" "}
              software.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
              Lessons from production — Postgres, AWS, AI, and the operational
              tradeoffs that don't make it into tutorials.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[var(--color-fg-soft)] transition hover:text-[var(--color-fg)]"
          >
            All posts →
          </Link>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {recent.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-6 transition hover:border-[var(--color-line-bright)]"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
                  <span className="uppercase tracking-wider text-[var(--color-accent-bright)]">
                    {post.category}
                  </span>
                  <span className="text-[var(--color-fg-dim)]">·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="mt-4 text-xl leading-tight text-[var(--color-fg)] transition group-hover:text-[var(--color-accent-bright)]">
                  {post.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-fg-soft)]">
                  {post.description}
                </p>

                <div className="mt-6 flex items-center justify-between text-xs text-[var(--color-fg-muted)]">
                  <time>{formatDate(post.date)}</time>
                  <span className="transition group-hover:translate-x-1 group-hover:text-[var(--color-fg)]">
                    Read →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
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
