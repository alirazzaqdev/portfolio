"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface QA {
  q: string;
  a: string;
}

/**
 * Honest FAQ. TODO items are answers Ali needs to confirm/finalise himself
 * — leaving them in source so a hiring manager reading the repo sees the gap,
 * but they're rendered as plain answers in the UI.
 */
const FAQS: QA[] = [
  {
    q: "How long does a typical project take?",
    a: "Most marketing sites land in 4–8 weeks. A monorepo with admin panel and a separate API service usually takes 8–12 weeks. Internal PWAs land in 3–6 weeks. After the brief call I give a written estimate before any work starts.",
  },
  {
    q: "What does pricing look like?",
    a: "I price per project, not hourly, after the scoping call. Local SME work and international/UAE work are quoted differently because the market and expectations differ. I'll give you a single number with payment milestones — not a moving target.",
  },
  {
    q: "How do payments work?",
    // TODO: confirm exact payment-milestone schedule you want to commit to publicly
    // (e.g. 50/50, 30/40/30, milestone-based, etc.) and replace this answer.
    a: "Typically split into 2–3 milestones tied to deliverables — for example, deposit on signed scope, mid-project preview, and final on handover. Confirmed in writing in the proposal.",
  },
  {
    q: "What happens after launch — do you offer support?",
    // TODO: lock down what you actually want to offer here (free month? hourly retainer? nothing?)
    // before promising specifics in writing.
    a: "Every project includes a short post-launch window for fixes to anything in scope at no extra cost. Beyond that I offer ongoing support on a small monthly retainer if you want it, or pay-per-change if you don't.",
  },
  {
    q: "Who actually writes the code — you or a team?",
    a: "Me. I take a small number of projects at a time so each one gets real attention. If a project genuinely needs another specialist (e.g. a designer or a DevOps engineer), I'll tell you upfront and bring them in transparently — never sub-contracted invisibly.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. I'm based in Lahore, Pakistan (UTC+5), and have shipped production work for clients in Pakistan and the UAE. I work async-first with a weekly sync call.",
  },
  {
    q: "What if I just want a code review or architecture opinion, not a full build?",
    a: "That's fine. Send me what you have and the question you're trying to answer. If it's a short review I'll often do it on a paid call and write up findings the same day.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section border-t border-[var(--color-line)]">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="eyebrow">FAQ</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            Things people{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              usually ask
            </span>
            .
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
            Straightforward answers. If your question isn&apos;t here, send it
            via the contact form below.
          </p>
        </motion.div>

        <div className="mt-12 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)]">
          {FAQS.map((qa, i) => {
            const isOpen = open === i;
            return (
              <div key={qa.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 p-6 text-left transition hover:bg-[var(--color-bg)]/30 sm:p-7"
                >
                  <span className="text-base text-[var(--color-fg)] sm:text-lg">
                    {qa.q}
                  </span>
                  <span
                    className={`mt-1 shrink-0 text-[var(--color-fg-muted)] transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-6 sm:px-7 sm:pb-7"
                  >
                    <p className="max-w-3xl text-base leading-relaxed text-[var(--color-fg-soft)]">
                      {qa.a}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
