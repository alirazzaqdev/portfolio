# Ali Razzaq — Portfolio

Personal portfolio for [Ali Razzaq](https://www.linkedin.com/in/ali-razzaq-792454408), a full-stack developer based in Lahore, Pakistan. Built with Next.js 16, React 19, Tailwind v4, and a refined design system.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** strict
- **Tailwind CSS v4** with custom design tokens
- **Framer Motion** for scroll-triggered fade-ins
- **Lenis** for smooth scrolling
- **Resend** for the contact form (optional — falls back to logging without an API key)
- **Geist Sans / Geist Mono / Instrument Serif** for typography
- **next/og** for dynamic OG image generation

## Sections

- **Hero** — friendly intro with photo + availability badge
- **About** — narrative with education + working hours + 4 highlight cards
- **Skills** — 25 technologies grouped by category (Languages, Frontend, Backend, Databases, Cloud, AI)
- **Work** — 3 fictional case studies with metrics, architecture, code, testimonials
- **Services** — 6 service cards
- **Testimonials** — 6 client reviews
- **Contact** — working form with backend (Resend), all socials including Facebook

## Project structure

```
src/
  app/
    layout.tsx                  Root: fonts, navbar, metadata
    page.tsx                    Main scroll experience
    globals.css                 Design tokens
    icon.svg                    Favicon (AR monogram)
    apple-icon.svg              Apple touch icon
    opengraph-image.tsx         Dynamic OG image (1200x630)
    not-found.tsx               Custom 404
    sitemap.ts                  Sitemap generator
    robots.ts                   Robots.txt generator
    api/contact/route.ts        Contact form backend
    work/[slug]/page.tsx        Project case study route (SSG)
  components/
    ui/Navbar.tsx
    ui/Footer.tsx
    hero/HeroSection.tsx
    about/About.tsx
    skills/Skills.tsx
    projects/Work.tsx
    services/Services.tsx
    testimonials/Testimonials.tsx
    contact/Contact.tsx
    providers/LenisProvider.tsx
  lib/
    config.ts                   Site config + social links
    utils.ts                    cn helper
    data/
      projects.ts               3 case studies
      skills.ts                 25 skills × 6 categories
      services.ts               6 service offerings
      testimonials.ts           6 testimonials
public/
  ali.jpg                       Profile photo (you provide)
```

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Photo placement

Save the profile photo as **`public/ali.jpg`**. The Hero and About sections both reference this path.

### Contact form (optional)

The contact form works out of the box — submissions are logged. To enable real email delivery via [Resend](https://resend.com):

1. Sign up free at <https://resend.com>
2. Copy `.env.example` to `.env.local`
3. Set `RESEND_API_KEY=` to your Resend key
4. (Optional) Set `RESEND_FROM_EMAIL` to a verified sender domain

## Build

```bash
npm run build
npm start
```

## Deploy

The easiest path is [Vercel](https://vercel.com/new):

1. Push this repo to GitHub
2. Import the repo on Vercel
3. (Optional) Add `RESEND_API_KEY` env var for live email delivery
4. Deploy — Vercel handles the rest

## Configuration

All site-wide config (name, role, social links, email, URL) lives in **`src/lib/config.ts`**. Edit there once and it propagates everywhere.

---

Designed and engineered by Ali Razzaq · Lahore, Pakistan
