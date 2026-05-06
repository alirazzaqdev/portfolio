import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="max-w-xl text-center">
        <div className="text-[120px] leading-none font-medium text-[var(--color-fg)] sm:text-[180px]">
          <span className="serif-italic text-[var(--color-accent-bright)]">
            404
          </span>
        </div>
        <h1 className="mt-2 text-3xl text-[var(--color-fg)] sm:text-4xl">
          Page not found.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--color-fg-soft)]">
          The page you&apos;re looking for doesn&apos;t exist, has been moved,
          or was never here. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[var(--color-fg)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:bg-white"
          >
            Go home
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-[var(--color-line-bright)] px-6 py-3 text-sm font-medium text-[var(--color-fg-soft)] transition hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Contact me
          </Link>
        </div>
      </div>
    </main>
  );
}
