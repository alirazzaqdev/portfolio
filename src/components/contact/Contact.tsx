"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";

type Status = "idle" | "sending" | "success" | "error";

const PROJECT_TYPES = [
  "Web application",
  "Backend system",
  "AI integration",
  "Cloud infrastructure",
  "Consulting / advice",
  "Other",
];

const BUDGETS = [
  "Under $2k",
  "$2k – $5k",
  "$5k – $15k",
  "$15k+",
  "Let's discuss",
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    type: PROJECT_TYPES[0],
    budget: BUDGETS[2],
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong");
      }
      setStatus("success");
      setForm({
        name: "",
        email: "",
        company: "",
        type: PROJECT_TYPES[0],
        budget: BUDGETS[2],
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <section
      id="contact"
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
          <div className="eyebrow">Contact</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            Have a project in mind?{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              Let's talk
            </span>
            .
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-soft)]">
            Send me a quick brief and I'll respond within 24 hours. If we're
            a fit, we'll set up a call. If not, I'll happily point you in the
            right direction.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* Left: Direct contact info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3 lg:col-span-4"
          >
            <ContactBlock
              label="Email"
              value={siteConfig.email}
              href={siteConfig.social.email}
            />
            <ContactBlock
              label="GitHub"
              value={siteConfig.socialDisplay.github}
              href={siteConfig.social.github}
            />
            <ContactBlock
              label="LinkedIn"
              value={siteConfig.socialDisplay.linkedin}
              href={siteConfig.social.linkedin}
            />
            <ContactBlock
              label="Facebook"
              value="facebook.com/ali.razzaq"
              href={siteConfig.social.facebook}
            />
            <ContactBlock label="Location" value="Lahore, Pakistan · UTC+5" />

            <div className="card p-5">
              <div className="eyebrow">Response time</div>
              <div className="mt-2 text-2xl text-[var(--color-fg)]">
                Within 24 hours
              </div>
              <div className="mt-1 text-sm text-[var(--color-fg-muted)]">
                Mon – Fri, usually faster
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="card p-7 lg:col-span-8 lg:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Your name"
                required
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder="Ali Razzaq"
              />
              <Field
                label="Email"
                required
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder="you@company.com"
              />
              <Field
                label="Company"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
                placeholder="Optional"
              />
              <SelectField
                label="Project type"
                value={form.type}
                onChange={(v) => setForm({ ...form, type: v })}
                options={PROJECT_TYPES}
              />
              <SelectField
                label="Budget"
                value={form.budget}
                onChange={(v) => setForm({ ...form, budget: v })}
                options={BUDGETS}
                className="sm:col-span-2"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-[var(--color-fg-soft)]">
                Tell me about your project
                <span className="ml-1 text-[var(--color-accent-bright)]">*</span>
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="What you're building, who it's for, and when you need it ready..."
                className="w-full resize-none rounded-lg border border-[var(--color-line-bright)] bg-[var(--color-bg)] p-4 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-accent)] focus:outline-none"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[var(--color-fg-muted)]">
                I'll get back to you within 24 hours.
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-[var(--color-fg)] px-7 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:bg-white disabled:opacity-50"
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Sent ✓"
                  : "Send message"}
              </button>
            </div>

            <AnimatePresence>
              {(status === "success" || status === "error") && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-5 rounded-lg p-4 text-sm leading-relaxed ${
                    status === "success"
                      ? "border border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                      : "border border-red-500/30 bg-red-500/5 text-red-300"
                  }`}
                >
                  {status === "success" ? (
                    <>
                      <strong>Message sent.</strong> I'll get back to you at{" "}
                      <code className="font-mono">{form.email || "your email"}</code>{" "}
                      within 24 hours.
                    </>
                  ) : (
                    <>
                      <strong>Something went wrong.</strong> {errorMsg}. Email me
                      directly at{" "}
                      <a
                        href="mailto:ar.alirazzaq4651@gmail.com"
                        className="underline"
                      >
                        ar.alirazzaq4651@gmail.com
                      </a>{" "}
                      instead.
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const Component = href ? "a" : "div";
  return (
    <Component
      {...(href
        ? {
            href,
            target: href.startsWith("http") ? "_blank" : undefined,
            rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
          }
        : {})}
      className="card card-hover group block p-5"
    >
      <div className="text-xs text-[var(--color-fg-muted)]">{label}</div>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-sm text-[var(--color-fg)]">{value}</span>
        {href && (
          <span className="text-sm text-[var(--color-fg-muted)] transition group-hover:translate-x-1 group-hover:text-[var(--color-fg)]">
            →
          </span>
        )}
      </div>
    </Component>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[var(--color-fg-soft)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-accent-bright)]">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--color-line-bright)] bg-[var(--color-bg)] px-3.5 py-2.5 text-base text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm text-[var(--color-fg-soft)]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--color-line-bright)] bg-[var(--color-bg)] px-3.5 py-2.5 text-base text-[var(--color-fg)] focus:border-[var(--color-accent)] focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[var(--color-bg-elevated)]">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
