import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts, getPost, type BlogSection } from "@/lib/data/blog";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Ali Razzaq"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const next = sorted[(idx + 1) % sorted.length];

  return (
    <main className="pt-24">
      <article>
        {/* Back link */}
        <div className="container-x">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
          >
            <span className="transition group-hover:-translate-x-1">←</span>
            <span>All writing</span>
          </Link>
        </div>

        {/* Hero */}
        <header className="container-x mt-12 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-muted)]">
            <span className="uppercase tracking-wider text-[var(--color-accent-bright)]">
              {post.category}
            </span>
            <span className="text-[var(--color-fg-dim)]">·</span>
            <time>{formatDate(post.date)}</time>
            <span className="text-[var(--color-fg-dim)]">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="mt-6 text-balance text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-[var(--color-fg-soft)]">
            <span className="serif-italic">{post.description}</span>
          </p>

          {/* Author byline */}
          <div className="mt-10 flex items-center gap-3 border-y border-[var(--color-line)] py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] text-sm text-white">
              AR
            </div>
            <div className="flex-1">
              <div className="text-sm text-[var(--color-fg)]">Ali Razzaq</div>
              <div className="text-xs text-[var(--color-fg-muted)]">
                Full-Stack Developer · Lahore, Pakistan
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="container-x mt-12 max-w-3xl pb-20">
          <div className="prose-content space-y-6 text-[var(--color-fg)]">
            {post.content.map((section, i) => (
              <RenderSection key={i} section={section} />
            ))}
          </div>

          {/* Tags */}
          <div className="mt-16 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--color-line-bright)] px-3 py-1 text-xs text-[var(--color-fg-soft)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Next post */}
        <section className="container-x section">
          <div className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
            Read next
          </div>
          <Link
            href={`/blog/${next.slug}`}
            className="group mt-4 block rounded-2xl border border-[var(--color-line)] p-8 transition hover:border-[var(--color-line-bright)]"
          >
            <div className="text-xs uppercase tracking-wider text-[var(--color-accent-bright)]">
              {next.category} · {formatDate(next.date)}
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <h3 className="text-2xl text-[var(--color-fg)] sm:text-3xl">
                {next.title}
              </h3>
              <span className="text-xl text-[var(--color-fg-muted)] transition group-hover:translate-x-2 group-hover:text-[var(--color-fg)]">
                →
              </span>
            </div>
            <p className="mt-2 text-base text-[var(--color-fg-soft)]">
              {next.description}
            </p>
          </Link>
        </section>

        {/* Footer */}
        <div className="border-t border-[var(--color-line)] py-10">
          <div className="container-x flex flex-col gap-4 text-sm text-[var(--color-fg-muted)] sm:flex-row sm:justify-between">
            <Link href="/" className="hover:text-[var(--color-fg)]">
              ← Home
            </Link>
            <Link href="/blog" className="hover:text-[var(--color-fg)]">
              All writing
            </Link>
            <Link
              href="/#contact"
              className="text-[var(--color-accent-bright)] hover:text-[var(--color-fg)]"
            >
              Contact me →
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "h2":
      return (
        <h2 className="mt-10 text-3xl leading-tight text-[var(--color-fg)]">
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-6 text-2xl leading-tight text-[var(--color-fg)]">
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-lg leading-relaxed text-[var(--color-fg-soft)]">
          {section.text}
        </p>
      );
    case "code":
      return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-line-bright)] bg-[var(--color-bg-elevated)]">
          <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-bg)]/60 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--color-line-bright)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-line-bright)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-line-bright)]" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">
              {section.language}
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-[var(--color-fg)]">
            <code>{section.code}</code>
          </pre>
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-[var(--color-accent)] pl-6 text-xl leading-relaxed text-[var(--color-fg)] sm:text-2xl">
          <span className="serif-italic">"{section.text}"</span>
          {section.cite && (
            <footer className="mt-2 text-sm not-italic text-[var(--color-fg-muted)]">
              — {section.cite}
            </footer>
          )}
        </blockquote>
      );
    case "list":
      return (
        <ul className="space-y-2 pl-2">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-lg leading-relaxed text-[var(--color-fg-soft)]"
            >
              <span className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
