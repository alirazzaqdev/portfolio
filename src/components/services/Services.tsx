"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services, type Service } from "@/lib/data/services";
import { getProject } from "@/lib/data/projects";

export default function Services() {
  return (
    <section id="services" className="section border-t border-[var(--color-line)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow">Services</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            What I can{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              build for you
            </span>
            .
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
            Five focused services, each backed by a real shipped project. Send
            me a brief and I&apos;ll tell you honestly whether I&apos;m the
            right fit.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const proofProjects = (service.proofProjects ?? [])
    .map((slug) => getProject(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="card card-hover p-7"
    >
      <h3 className="text-xl text-[var(--color-fg)]">{service.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-soft)]">
        {service.summary}
      </p>
      <ul className="mt-6 space-y-2">
        {service.capabilities.map((cap) => (
          <li
            key={cap}
            className="flex items-start gap-3 text-sm text-[var(--color-fg-soft)]"
          >
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
            <span>{cap}</span>
          </li>
        ))}
      </ul>

      {proofProjects.length > 0 && (
        <div className="mt-6 border-t border-[var(--color-line)] pt-5">
          <div className="text-xs uppercase tracking-wider text-[var(--color-fg-muted)]">
            Shipped on
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {proofProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="rounded-full border border-[var(--color-line-bright)] px-3 py-1 text-xs text-[var(--color-fg-soft)] transition hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                {p.name} ↗
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
