"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { skills, categoryLabels, type SkillCategory } from "@/lib/data/skills";
import { getProject } from "@/lib/data/projects";

const CATEGORY_ORDER: SkillCategory[] = [
  "language",
  "frontend",
  "backend",
  "database",
  "cloud",
  "ai",
];

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-[var(--color-line)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow">Skills</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            The tools I{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              actually use
            </span>{" "}
            every day.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
            The technologies I reach for in production work, grouped by what
            they&apos;re for. Items with a project tag link to where I shipped
            them.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {CATEGORY_ORDER.map((category, catIdx) => {
            const categorySkills = skills.filter(
              (s) => s.category === category,
            );
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: catIdx * 0.05 }}
                className="grid gap-6 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-3">
                  <h3 className="text-xl text-[var(--color-fg)]">
                    {categoryLabels[category]}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                    {categorySkills.length} tools
                  </p>
                </div>
                <div className="grid gap-3 lg:col-span-9 sm:grid-cols-2 md:grid-cols-3">
                  {categorySkills.map((skill) => {
                    const proofProjects = (skill.projects ?? [])
                      .map((slug) => getProject(slug))
                      .filter(
                        (p): p is NonNullable<typeof p> => Boolean(p),
                      );
                    return (
                      <div
                        key={skill.id}
                        className="card card-hover flex flex-col gap-3 px-5 py-4"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="text-base text-[var(--color-fg)]">
                            {skill.name}
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">
                            {skill.years}y
                          </div>
                        </div>
                        {proofProjects.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {proofProjects.map((p) => (
                              <Link
                                key={p.slug}
                                href={`/work/${p.slug}`}
                                title={`Used in ${p.name}`}
                                className="rounded border border-[var(--color-line-bright)] px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)] transition hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg-soft)]"
                              >
                                {p.name.split(" ")[0]}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
