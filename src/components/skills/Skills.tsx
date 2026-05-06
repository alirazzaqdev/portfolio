"use client";

import { motion } from "framer-motion";
import { skills, categoryLabels, type SkillCategory } from "@/lib/data/skills";

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
            Twenty-five technologies hardened across three years of shipping
            production. Grouped by what they're for.
          </p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {CATEGORY_ORDER.map((category, catIdx) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
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
                    {categorySkills.length} technologies
                  </p>
                </div>
                <div className="grid gap-3 lg:col-span-9 sm:grid-cols-2 md:grid-cols-3">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="card card-hover flex items-center justify-between px-5 py-4"
                    >
                      <div>
                        <div className="text-base text-[var(--color-fg)]">
                          {skill.name}
                        </div>
                        <div className="mt-0.5 text-xs text-[var(--color-fg-muted)]">
                          {skill.years} year{skill.years !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="font-mono text-xs tabular-nums text-[var(--color-fg-muted)]">
                        {skill.proficiency}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
