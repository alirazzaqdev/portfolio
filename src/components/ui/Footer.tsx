import { siteConfig } from "@/lib/config";
import {
  GitHubIcon,
  LinkedInIcon,
  FacebookIcon,
  EmailIcon,
} from "./SocialIcons";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: siteConfig.social.github,
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    Icon: LinkedInIcon,
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    Icon: FacebookIcon,
  },
  {
    label: "Email",
    href: siteConfig.social.email,
    Icon: EmailIcon,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[var(--color-fg-muted)]">
          © {new Date().getFullYear()} Ali Razzaq · Lahore, Pakistan
        </div>

        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={
                href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-line-bright)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-fg)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
