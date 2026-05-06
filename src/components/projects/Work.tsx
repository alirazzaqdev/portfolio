"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects, type Project } from "@/lib/data/projects";

export default function Work() {
  return (
    <section id="work" className="section border-t border-[var(--color-line)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-3xl">
            <div className="eyebrow">Work</div>
            <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
              Selected{" "}
              <span className="serif-italic text-[var(--color-accent-bright)]">
                case studies
              </span>{" "}
              from the past two years.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
              Three projects I led end-to-end. Each one is its own page with
              the full story — the problem, the architecture, what shipped.
            </p>
          </div>
          <div className="text-sm text-[var(--color-fg-muted)]">
            {projects.length} projects · 2024 – 2025
          </div>
        </motion.div>

        <div className="mt-14 space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] transition hover:border-[var(--color-line-bright)]"
      >
        <div className="grid gap-8 p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
          {/* Left: Info */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-muted)]">
              <span>{project.year}</span>
              <span className="text-[var(--color-fg-dim)]">·</span>
              <span>{project.category}</span>
              <span className="text-[var(--color-fg-dim)]">·</span>
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

            <h3 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">
              <span className="text-[var(--color-fg)]">{project.name}</span>
            </h3>

            <p className="mt-3 text-xl text-[var(--color-fg-soft)] sm:text-2xl">
              <span className="serif-italic">{project.tagline}</span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-fg-soft)]">
              {project.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[var(--color-line-bright)] px-2.5 py-1 text-xs text-[var(--color-fg-soft)]"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 6 && (
                <span className="rounded-md px-2.5 py-1 text-xs text-[var(--color-fg-muted)]">
                  +{project.stack.length - 6}
                </span>
              )}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--color-fg-soft)] transition group-hover:text-[var(--color-fg)]">
              <span>Read case study</span>
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.slice(0, 4).map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] p-4"
                >
                  <div className="text-xs text-[var(--color-fg-muted)]">
                    {m.label}
                  </div>
                  <div
                    className="mt-1.5 text-2xl tabular-nums"
                    style={{ color: project.accent }}
                  >
                    {m.value}
                  </div>
                  {m.trend && (
                    <div className="mt-1 text-xs text-[var(--color-fg-muted)]">
                      {m.trend}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
