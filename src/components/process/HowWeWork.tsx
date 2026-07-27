"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Brief",
    desc:
      "You send me a short write-up of what you need. I reply within 24 hours with whether I'm a fit and what I'd want to clarify on a call.",
  },
  {
    num: "02",
    title: "Call",
    desc:
      "A 30–45 minute call. We walk through goals, constraints, audience, and the rough shape of the project. You'll get a clear answer to 'can this be done in the time and budget I have?'.",
  },
  {
    num: "03",
    title: "Proposal",
    desc:
      "A written proposal with scope, milestones, timeline, and price — no hidden surprises. You approve it or we adjust.",
  },
  {
    num: "04",
    title: "Build",
    desc:
      "Weekly updates with a working preview link. You see progress in production-like state, not slides. Course-correct early instead of at delivery.",
  },
  {
    num: "05",
    title: "Deploy & handover",
    desc:
      "Production deployment, brief admin docs, and a walkthrough call. You get the code, the deploy access, and a clear runbook for what's where.",
  },
];

export default function HowWeWork() {
  return (
    <section
      id="process"
      className="section border-t border-[var(--color-line)]"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow">How we work</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            From brief to{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              handover
            </span>
            .
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
            The same five steps every project goes through. No surprises, no
            theatrics — just a working preview link you can check whenever.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card card-hover flex flex-col p-6"
            >
              <div className="font-mono text-xs text-[var(--color-accent-bright)]">
                {s.num}
              </div>
              <h3 className="mt-3 text-lg text-[var(--color-fg)]">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-soft)]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
