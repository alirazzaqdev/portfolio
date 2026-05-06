"use client";

import { motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";

export default function Testimonials() {
  return (
    <section className="section border-t border-[var(--color-line)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow">What clients say</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            <span className="serif-italic text-[var(--color-accent-bright)]">
              Kind words
            </span>{" "}
            from teams I've worked with.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial: t,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="card card-hover flex flex-col p-7"
    >
      {/* Stars */}
      <div className="flex gap-0.5 text-sm text-[var(--color-accent-bright)]">
        {Array.from({ length: t.rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-[var(--color-fg)]">
        "{t.quote}"
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-[var(--color-line)] pt-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-bright)] text-sm text-white">
          {t.author
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <div className="text-sm text-[var(--color-fg)]">{t.author}</div>
          <div className="text-xs text-[var(--color-fg-muted)]">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
