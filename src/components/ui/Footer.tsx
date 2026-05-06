import { siteConfig } from "@/lib/config";

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.social.github },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "Email", href: siteConfig.social.email },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="container-x flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[var(--color-fg-muted)]">
          © {new Date().getFullYear()} Ali Razzaq · Lahore, Pakistan
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-fg-muted)]">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="transition hover:text-[var(--color-fg)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
