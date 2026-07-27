"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { certificates, type Certificate } from "@/lib/data/certs";

export default function Certificates() {
  if (certificates.length === 0) return null;

  return (
    <section
      id="certificates"
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
          <div className="eyebrow">Credentials</div>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl">
            Courses &{" "}
            <span className="serif-italic text-[var(--color-accent-bright)]">
              certifications
            </span>
            .
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-fg-soft)]">
            Self-driven learning behind the work — verified credentials only.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: Certificate; index: number }) {
  const link = cert.filePath ?? cert.verifyUrl;

  const inner = (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] transition hover:border-[var(--color-line-bright)]">
      {cert.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--color-line)] bg-white">
          <Image
            src={cert.image}
            alt={`${cert.name} — certificate`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-[var(--color-accent)]/30 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--color-accent-bright)]">
            {cert.type}
          </span>
          <div className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
            {cert.hours && (
              <>
                <span>{cert.hours}</span>
                <span className="text-[var(--color-fg-dim)]">·</span>
              </>
            )}
            <span>{cert.year}</span>
          </div>
        </div>

        <h3 className="mt-5 text-lg leading-snug text-[var(--color-fg)]">
          {cert.name}
        </h3>

        <p className="mt-2 text-sm text-[var(--color-fg-soft)]">{cert.issuer}</p>

        {cert.description && (
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-soft)]">
            {cert.description}
          </p>
        )}

        <div className="mt-auto pt-6">
          {link ? (
            <div className="inline-flex items-center gap-2 text-sm text-[var(--color-accent-bright)] transition group-hover:gap-3">
              <span>{cert.filePath ? "View certificate" : "Verify credential"}</span>
              <span>↗</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              <span>Verified</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="h-full"
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}
