"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center pt-24 pb-16"
    >
      <div className="container-x relative z-10 grid w-full gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: Text */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
            <span className="text-sm text-[var(--color-fg-muted)]">
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 text-5xl leading-[1.05] sm:text-6xl md:text-7xl"
          >
            <span className="text-[var(--color-fg)]">Hi, I&apos;m Ali.</span>
            <br />
            <span className="text-[var(--color-fg-soft)]">I build </span>
            <span className="serif-italic text-[var(--color-accent-bright)]">
              thoughtful
            </span>
            <span className="text-[var(--color-fg-soft)]"> software</span>
            <br />
            <span className="text-[var(--color-fg-soft)]">for the web.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-fg-soft)]"
          >
            Full-stack developer based in Lahore, Pakistan. I work with
            startups and growing teams to ship production web apps —
            from Python and Java backends to React frontends, deployed on AWS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href="#work"
              className="rounded-full bg-[var(--color-fg)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:bg-white"
            >
              See my work
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-[var(--color-line-bright)] px-6 py-3 text-sm font-medium text-[var(--color-fg-soft)] transition hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              Get in touch
            </Link>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 flex flex-wrap gap-x-10 gap-y-5 text-sm"
          >
            <div>
              <div className="text-[var(--color-fg-muted)]">Location</div>
              <div className="mt-1 text-[var(--color-fg)]">Lahore, Pakistan</div>
            </div>
            <div>
              <div className="text-[var(--color-fg-muted)]">Experience</div>
              <div className="mt-1 text-[var(--color-fg)]">3+ years</div>
            </div>
            <div>
              <div className="text-[var(--color-fg-muted)]">Specialty</div>
              <div className="mt-1 text-[var(--color-fg)]">Full-stack & AI</div>
            </div>
          </motion.div>
        </div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-[var(--color-line-bright)] bg-[var(--color-bg-elevated)]">
            {/* Soft accent glow behind */}
            <div
              className="pointer-events-none absolute -inset-8 -z-10 opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(139, 109, 255, 0.4), transparent 70%)",
              }}
            />

            <Image
              src="/ali.jpg"
              alt="Ali Razzaq, full-stack developer"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 480px"
              className="object-cover"
            />

            {/* Subtle bottom gradient for text caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg)]/90 via-[var(--color-bg)]/30 to-transparent" />

            {/* Caption pill */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs text-white">
                AR
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Ali Razzaq</div>
                <div className="text-xs text-white/60">Full-Stack Developer</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
