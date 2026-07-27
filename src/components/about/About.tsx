"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const HIGHLIGHTS = [
  {
    title: "Production-grade",
    desc: "I write code that's tested, monitored, and ready to handle real users — not demos.",
  },
  {
    title: "End-to-end",
    desc: "From the database schema to the React component. One person who can take a project all the way through.",
  },
  {
    title: "Clear communication",
    desc: "Async-friendly, no theatrics. You'll always know where the project stands and what's next.",
  },
  {
    title: "Long-term thinking",
    desc: "I optimize for the codebase you'll inherit six months from now — not just the demo on launch day.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow">About</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            <span className="serif-italic text-[var(--color-accent-bright)]">
              A few words
            </span>{" "}
            about how I work.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5 text-lg leading-relaxed text-[var(--color-fg-soft)] lg:col-span-7"
          >
            <p>
              I&apos;m a full-stack developer with a Bachelor&apos;s degree in
              Computer Science from{" "}
              <span className="text-[var(--color-fg)]">UMT, Lahore</span>.
              I&apos;ve shipped production sites and internal tools for
              businesses across{" "}
              <span className="text-[var(--color-fg)]">
                solar energy in Pakistan
              </span>{" "}
              and{" "}
              <span className="text-[var(--color-fg)]">
                glass &amp; aluminium in the UAE
              </span>
              {" "}— usually as the one engineer who takes an idea from a brief
              to a deployed, monitored, and documented system.
            </p>
            <p>
              I work mostly across the{" "}
              <span className="text-[var(--color-fg)]">Python</span>,{" "}
              <span className="text-[var(--color-fg)]">Java</span>, and{" "}
              <span className="text-[var(--color-fg)]">JavaScript</span>{" "}
              ecosystems — Next.js / React on the frontend, Express / Django /
              FastAPI on the backend, Postgres + MongoDB on the data layer,
              and AWS for hosting. Comfortable with AI integration (Claude /
              GPT) and offensive security fundamentals (CEH-trained).
            </p>
            <p>
              I take on a small number of projects at a time so each one gets
              real attention. If you&apos;re a founder or team that needs
              someone reliable to ship a real product —{" "}
              <a
                href="#contact"
                className="link-underline text-[var(--color-fg)]"
              >
                let&apos;s talk
              </a>
              .
            </p>
          </motion.div>

          {/* Photo + Background card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 lg:col-span-5"
          >
            {/* Photo — circular portrait */}
            <div className="relative mx-auto aspect-square w-full max-w-[420px]">
              {/* Soft accent glow behind */}
              <div
                className="pointer-events-none absolute -inset-6 -z-10 opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(139, 109, 255, 0.4), transparent 70%)",
                }}
              />
              {/* Decorative accent rings */}
              <div className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 rounded-full border border-[var(--color-accent)]/25" />
              <div className="pointer-events-none absolute -left-2 -bottom-2 h-16 w-16 rounded-full border border-[var(--color-accent)]/20" />

              <div className="relative h-full w-full overflow-hidden rounded-full ring-1 ring-[var(--color-line-bright)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
                <Image
                  src="/ali-portrait.png"
                  alt="Ali Razzaq"
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Background card */}
            <div className="card p-7">
              <div className="eyebrow">Background</div>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-base text-[var(--color-fg)]">
                    BS Computer Science
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-fg-muted)]">
                    University of Management and Technology, Lahore
                  </div>
                </div>
                <div className="border-t border-[var(--color-line)] pt-4">
                  <div className="text-base text-[var(--color-fg)]">
                    Working hours
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-fg-muted)]">
                    Mon – Fri · UTC+5 · Async-friendly
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card card-hover p-7"
            >
              <h3 className="text-xl text-[var(--color-fg)]">{h.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-fg-soft)]">
                {h.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
