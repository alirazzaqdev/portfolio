import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects, getProject } from "@/lib/data/projects";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.name} — Case Study`,
    description: `${project.description} A case study by Ali Razzaq, full-stack software developer.`,
    alternates: {
      canonical: `${siteConfig.url}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} — Case Study by Ali Razzaq`,
      description: project.description,
      type: "article",
      url: `${siteConfig.url}/work/${project.slug}`,
      images: [
        {
          url: `${siteConfig.url}${project.image}`,
          width: 1440,
          height: 900,
          alt: `${project.name} live site screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Case Study`,
      description: project.description,
      images: [`${siteConfig.url}${project.image}`],
    },
  };
}

export default async function CaseStudyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const relatedProjects = project.related
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="pt-24">
      {/* Back link */}
      <div className="container-x">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)]"
        >
          <span className="transition group-hover:-translate-x-1">←</span>
          <span>Back to work</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="container-x mt-12">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-muted)]">
          <span>{project.year}</span>
          <span className="text-[var(--color-fg-dim)]">·</span>
          <span>{project.category}</span>
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider"
            style={{
              borderColor: project.accent + "55",
              color: project.accent,
            }}
          >
            {project.status}
          </span>
        </div>

        <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
          <span style={{ color: project.accent }}>{project.name}</span>
        </h1>
        <p className="mt-4 max-w-3xl text-2xl text-[var(--color-fg-soft)] sm:text-3xl">
          <span className="serif-italic">{project.tagline}</span>
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-fg)]">
          {project.description}
        </p>

        {project.liveUrl && (
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:opacity-90"
              style={{ backgroundColor: project.accent }}
            >
              Visit live site
              <span>↗</span>
            </a>
          </div>
        )}

        {/* Screenshot */}
        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--color-line-bright)] bg-[var(--color-bg-elevated)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
          <Image
            src={project.image}
            alt={`${project.name} — live site screenshot`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover object-top"
          />
        </div>

        {/* Quick facts */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-3">
          <Fact label="Duration" value={project.duration} />
          <Fact label="Team" value={project.team} />
          <Fact label="My role" value={project.role} />
        </div>
      </section>

      {/* Client business stats */}
      <section className="container-x mt-20">
        <div className="eyebrow">Client context</div>
        <p className="mt-3 max-w-2xl text-sm text-[var(--color-fg-muted)]">
          Numbers about the client&apos;s business — useful context, not my
          engineering output.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-xs text-[var(--color-fg-muted)]">
                {m.label}
              </div>
              <div
                className="mt-2 text-4xl tabular-nums sm:text-5xl"
                style={{ color: project.accent }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My engineering output */}
      {project.engineeringMetrics && project.engineeringMetrics.length > 0 && (
        <section className="container-x mt-16">
          <div className="eyebrow">My engineering output</div>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-fg-muted)]">
            Numbers I produced — measurable, attributable to the work I did.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.engineeringMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-5"
              >
                <div className="text-xs text-[var(--color-fg-muted)]">
                  {m.label}
                </div>
                <div className="mt-2 text-2xl tabular-nums text-[var(--color-fg)]">
                  {m.value}
                </div>
                {m.note && (
                  <div className="mt-1 text-xs text-[var(--color-fg-muted)]">
                    {m.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What I built (separate from what the client supplied) */}
      {project.myWork && project.myWork.length > 0 && (
        <section className="container-x mt-16">
          <div className="eyebrow">What I built</div>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-fg-muted)]">
            My specific scope on this project — separate from anything the
            client team supplied.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.myWork.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-5 text-base leading-relaxed text-[var(--color-fg-soft)]"
              >
                <span
                  className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Story */}
      <section className="container-x section">
        <div className="eyebrow">The story</div>
        <h2 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
          From{" "}
          <span className="serif-italic text-[var(--color-fg-soft)]">
            brief
          </span>{" "}
          to production system.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Block label="Challenge" body={project.challenge} />
          <Block
            label="Solution"
            body={project.solution}
            accent={project.accent}
          />
          <Block label="Outcome" body={project.outcome} />
        </div>
      </section>

      {/* Constraints */}
      {project.constraints && project.constraints.length > 0 && (
        <section className="container-x mt-16">
          <div className="eyebrow">Real constraints</div>
          <h2 className="mt-4 max-w-3xl text-3xl leading-[1.1] sm:text-4xl">
            The boundaries that shaped the build.
          </h2>
          <ul className="mt-10 space-y-3">
            {project.constraints.map((c, i) => (
              <li
                key={c}
                className="flex items-start gap-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-6 text-base leading-relaxed text-[var(--color-fg-soft)]"
              >
                <span
                  className="mt-1 font-mono text-xs text-[var(--color-fg-muted)]"
                  style={{ color: project.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tradeoffs */}
      {project.tradeoffs && project.tradeoffs.length > 0 && (
        <section className="container-x mt-16">
          <div className="eyebrow">Honest tradeoffs</div>
          <h2 className="mt-4 max-w-3xl text-3xl leading-[1.1] sm:text-4xl">
            What I chose,{" "}
            <span className="serif-italic text-[var(--color-fg-soft)]">
              and what I gave up
            </span>
            .
          </h2>
          <div className="mt-10 space-y-4">
            {project.tradeoffs.map((t, i) => (
              <div
                key={i}
                className="grid gap-6 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-6 sm:p-7 lg:grid-cols-2"
              >
                <div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: project.accent }}
                  >
                    Decision
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-[var(--color-fg)]">
                    {t.decision}
                  </p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
                    What we gave up
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-[var(--color-fg-soft)]">
                    {t.gave_up}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Process */}
      <section className="container-x">
        <div className="eyebrow">Process · {project.duration}</div>
        <h2 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
          How it shipped, week by week.
        </h2>

        <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)]">
          {project.process.map((step, i) => (
            <div
              key={step.week}
              className="grid gap-4 bg-[var(--color-bg-elevated)] p-7 sm:p-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-2">
                <div
                  className="text-sm font-medium"
                  style={{ color: project.accent }}
                >
                  {step.week}
                </div>
                <div className="mt-1 text-xs text-[var(--color-fg-muted)]">
                  {String(i + 1).padStart(2, "0")} / {project.process.length}
                </div>
              </div>
              <div className="lg:col-span-3">
                <h3 className="text-xl text-[var(--color-fg)]">{step.label}</h3>
              </div>
              <div className="lg:col-span-7">
                <p className="text-base leading-relaxed text-[var(--color-fg-soft)]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features + Architecture */}
      <section className="container-x section">
        <div className="eyebrow">Inside the system</div>
        <h2 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
          What it does. How it&apos;s built.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="card p-8">
            <h3 className="text-xl text-[var(--color-fg)]">Features</h3>
            <ul className="mt-5 space-y-3">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-base leading-relaxed text-[var(--color-fg-soft)]"
                >
                  <span
                    className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-8">
            <h3 className="text-xl text-[var(--color-fg)]">Architecture</h3>
            <ul className="mt-5 space-y-3">
              {project.architecture.map((a, i) => (
                <li
                  key={a}
                  className="flex items-start gap-3 text-base leading-relaxed text-[var(--color-fg-soft)]"
                >
                  <span className="mt-1 font-mono text-xs text-[var(--color-fg-muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="container-x">
        <div className="eyebrow">Stack</div>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--color-line-bright)] px-3 py-1.5 text-sm text-[var(--color-fg-soft)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Code */}
      <section className="container-x section">
        <div className="eyebrow">From the codebase</div>
        <h2 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">
          Annotated excerpts.
        </h2>

        <div className="mt-12 space-y-8">
          {project.snippets.map((snippet, i) => (
            <div key={snippet.filename}>
              {snippet.caption && (
                <div className="mb-4 max-w-2xl text-base text-[var(--color-fg-soft)]">
                  <span className="text-[var(--color-fg-muted)]">
                    {String(i + 1).padStart(2, "0")} ·{" "}
                  </span>
                  {snippet.caption}
                </div>
              )}
              <div className="overflow-hidden rounded-2xl border border-[var(--color-line-bright)] bg-[var(--color-bg-elevated)]">
                <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-bg)]/60 px-5 py-3">
                  <span className="font-mono text-xs text-[var(--color-fg-muted)]">
                    {snippet.filename}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">
                    {snippet.language}
                  </span>
                </div>
                <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-[var(--color-fg)]">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="container-x section">
          <div className="card p-10 sm:p-14">
            <div className="eyebrow">What the client said</div>
            <blockquote className="mt-6 max-w-4xl text-2xl leading-snug text-[var(--color-fg)] sm:text-3xl md:text-4xl">
              <span className="serif-italic">{project.testimonial.quote}</span>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full text-sm text-white"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}, ${project.accent}80)`,
                }}
              >
                {project.testimonial.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <div className="text-base text-[var(--color-fg)]">
                  {project.testimonial.author}
                </div>
                <div className="text-sm text-[var(--color-fg-muted)]">
                  {project.testimonial.role} · {project.testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {relatedProjects.length > 0 && (
        <section className="container-x">
          <div className="eyebrow">Other projects</div>
          <h2 className="mt-4 text-3xl sm:text-4xl">Continue browsing</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {relatedProjects.map((next) => (
              <Link
                key={next.slug}
                href={`/work/${next.slug}`}
                className="group card card-hover block p-7"
              >
                <div className="text-xs text-[var(--color-fg-muted)]">
                  {next.category}
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3
                    className="text-3xl"
                    style={{ color: next.accent }}
                  >
                    {next.name}
                  </h3>
                  <span className="text-xl text-[var(--color-fg-muted)] transition group-hover:translate-x-2 group-hover:text-[var(--color-fg)]">
                    →
                  </span>
                </div>
                <p className="mt-2 text-base text-[var(--color-fg-soft)]">
                  <span className="serif-italic">{next.tagline}</span>
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-x section">
        <div className="card p-10 text-center sm:p-16">
          <h3 className="text-balance text-3xl leading-tight sm:text-4xl">
            Have a project like this in mind?{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              Let&apos;s talk.
            </span>
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--color-fg-soft)]">
            Send me a brief and I&apos;ll respond within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="rounded-full bg-[var(--color-fg)] px-7 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:bg-white"
            >
              Get in touch
            </Link>
            <Link
              href="/"
              className="rounded-full border border-[var(--color-line-bright)] px-7 py-3 text-sm text-[var(--color-fg-soft)] transition hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-[var(--color-line)] py-10">
        <div className="container-x flex flex-col gap-4 text-sm text-[var(--color-fg-muted)] sm:flex-row sm:justify-between">
          <Link href="/" className="hover:text-[var(--color-fg)]">
            ← Home
          </Link>
          <span>© 2025 Ali Razzaq</span>
          <Link
            href="/#contact"
            className="text-[var(--color-accent-bright)] hover:text-[var(--color-fg)]"
          >
            Contact →
          </Link>
        </div>
      </div>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--color-bg)] p-6">
      <div className="eyebrow">{label}</div>
      <div className="mt-2 text-base text-[var(--color-fg)]">{value}</div>
    </div>
  );
}

function Block({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: string;
}) {
  return (
    <div className="card p-8">
      <div className="eyebrow" style={accent ? { color: accent } : undefined}>
        {label}
      </div>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-fg-soft)]">
        {body}
      </p>
    </div>
  );
}
