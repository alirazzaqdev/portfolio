export interface ProjectSnippet {
  language: string;
  filename: string;
  code: string;
  caption?: string;
}

export interface ProjectMilestone {
  week: string;
  label: string;
  desc: string;
}

export interface ProjectTestimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  codename: string;
  tagline: string;
  category: string;
  year: string;
  status: "PRODUCTION" | "BETA" | "ARCHIVED";
  accent: string;
  duration: string;
  team: string;
  role: string;
  /** Explicit breakdown of what I personally built vs. what the client supplied. */
  myWork?: string[];
  liveUrl?: string;
  image: string;
  stack: string[];
  /**
   * Client / business context numbers (e.g. "500+ installations").
   * These describe the client's business, not my engineering output.
   */
  metrics: { label: string; value: string; trend?: string }[];
  /**
   * Engineering-side numbers I produced (Lighthouse score, load time,
   * SEO ranking, p95 latency, quote-generation time, etc.).
   * Kept separate from client business stats above.
   */
  engineeringMetrics?: { label: string; value: string; note?: string }[];
  description: string;
  challenge: string;
  /** Real constraints that shaped the architecture (audience, budget, infra, etc.). */
  constraints?: string[];
  solution: string;
  /** Honest 1–2 tradeoffs I made. What I gave up to get the chosen benefit. */
  tradeoffs?: { decision: string; gave_up: string }[];
  outcome: string;
  features: string[];
  architecture: string[];
  process: ProjectMilestone[];
  snippets: ProjectSnippet[];
  testimonial?: ProjectTestimonial;
  related: string[]; // slugs
}

export const projects: Project[] = [
  {
    id: "hisably",
    slug: "hisably",
    name: "HISABLY",
    codename: "Live Project · 01",
    tagline: "Offline-first billing & invoicing SaaS for SMBs.",
    category: "SaaS · Billing & Invoicing",
    year: "2026",
    status: "BETA",
    accent: "#10B981",
    duration: "Ongoing",
    team: "Solo founder + full-stack",
    role: "Founder / full-stack engineer",
    myWork: [
      "Turborepo workspaces — apps/web (Next.js 14 PWA) + apps/api (FastAPI async) + packages/shared",
      "Offline-first IndexedDB (Dexie) layer that keeps invoicing usable without a connection",
      "Pluggable multi-country tax engine — UAE VAT live; Saudi Arabia & Pakistan on the roadmap",
      "Single source of truth for invoice math in TypeScript, with a Python port cross-validated against shared fixtures (totals agree to the fils)",
      "Full auth (email + OTP), tenant-scoped data model, customers / suppliers / items / accounts, all 6 invoice types, payments + allocations, expenses, reports",
      "PDF invoice rendering, recurring invoice scheduler endpoint, low-stock alerts, dashboard KPIs",
    ],
    liveUrl: "https://hisably-web.vercel.app",
    image: "/projects/hisably.jpg",
    stack: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Dexie (IndexedDB)",
      "PWA",
      "FastAPI",
      "SQLAlchemy 2.0 (async)",
      "PostgreSQL",
      "Alembic",
      "Turborepo",
      "Docker Compose",
      "Vercel",
    ],
    metrics: [
      { label: "Launch market", value: "UAE", trend: "Product positioning" },
      { label: "Invoice types", value: "6", trend: "Product capability" },
      { label: "Offline-first", value: "100%", trend: "Product capability" },
      { label: "Tax engines", value: "Pluggable", trend: "Product capability" },
    ],
    engineeringMetrics: [
      // TODO: confirm public beta date / waitlist link when ready to publish.
      { label: "Stage", value: "Private beta" },
      { label: "Web ↔ API math parity", value: "Cross-validated to the fils" },
      { label: "Services in the monorepo", value: "3 (web · api · shared)" },
      // TODO: paste real Lighthouse score for hisably-web.vercel.app once stable.
      { label: "Lighthouse perf (mobile)", value: "TODO" },
    ],
    description:
      "My own SaaS — an offline-first billing and invoicing app aimed at small and mid-sized businesses, launching in the UAE with VAT-compliant tax invoices, quotations, credit notes, and proforma. Built as a Turborepo monorepo: a Next.js 14 PWA that works without a connection (IndexedDB via Dexie), a FastAPI + async SQLAlchemy backend on PostgreSQL, and a shared TypeScript package that holds the invoice math + a pluggable tax-regime engine.",
    challenge:
      "Most SMB billing tools in this region either assume you're always online or stop at one country's tax rules. A shopkeeper or contractor in the UAE needs UAE VAT today, but they also operate cross-border into KSA and Pakistan — and they cannot lose the ability to bill a customer when the internet flakes. The hard part is keeping invoice math (discounts, VAT rounding, totals) provably identical between the offline web client and the server, and pluggable enough that adding a new country isn't a rewrite.",
    constraints: [
      "Must work fully offline — billing cannot stop when the connection does",
      "VAT/discount math must be identical between the offline web client and the server, to the fils",
      "Tax engine must be pluggable, not hard-coded to UAE — KSA and Pakistan are on the roadmap",
      "Tenant-scoped data model from day one — multi-tenant SaaS, not a single-business app",
    ],
    tradeoffs: [
      {
        decision:
          "Invoice math lives in a shared TypeScript package, with a Python port cross-validated against the same fixtures",
        gave_up:
          "Single-language simplicity. Won correctness — both the offline client and the server compute totals identically, verified by shared fixtures.",
      },
      {
        decision: "Offline-first PWA via IndexedDB instead of a thin online-only client",
        gave_up:
          "Simpler state management and fewer sync edge cases. Won real reliability — the app keeps working in a warehouse, on a job site, or when 4G drops.",
      },
    ],
    solution:
      "Three-package Turborepo: `apps/web` (Next.js 14 App Router PWA with Dexie for offline persistence), `apps/api` (FastAPI + async SQLAlchemy + PostgreSQL + Alembic migrations), and `packages/shared` (TypeScript invoice math + pluggable tax-regime engine, mirrored in Python on the backend). Core invoicing loop — auth, tenants, customers/suppliers/items/accounts, all six invoice types, payments + allocations, expenses, reports, settings — is real and tenant-scoped, not mocked.",
    outcome:
      "Private beta running on hisably-web.vercel.app. Core invoicing loop ships VAT-compliant tax invoices, quotations, credit notes, proforma, and purchase bills; the same math runs offline in the browser and on the API. A full read-only audit catalogued every screen against the backend so the roadmap is data-driven, not guesswork.",
    features: [
      "VAT-compliant tax invoices, quotations, credit notes, proforma, purchase bills, delivery notes",
      "Offline-first PWA — keep billing without a connection, syncs when back online",
      "Pluggable multi-country tax engine (UAE live, KSA + PK on the roadmap)",
      "Customers, suppliers, items, categories, accounts — fully tenant-scoped",
      "Payments + allocations against open invoices",
      "Expenses, basic reports (sales, P&L, aging), dashboard KPIs",
      "Recurring invoice template endpoint with run-due trigger",
      "Email + OTP auth with anti-enumeration on forgot-password",
      "Industry-profile registry for vertical-specific item fields",
    ],
    architecture: [
      "Turborepo workspaces — apps/web, apps/api, packages/shared",
      "Next.js 14 App Router PWA with Dexie (IndexedDB) for offline persistence",
      "FastAPI + async SQLAlchemy 2.0 on PostgreSQL, Alembic for migrations",
      "Shared invoice math in TypeScript, ported to Python and cross-validated against shared fixtures",
      "Tenant scoping enforced in the repository layer — no cross-tenant data leaks by construction",
      "Docker Compose for the full local stack (Postgres + API + web)",
      "Vercel for the web app; API deploys planned alongside it",
    ],
    process: [
      {
        week: "Phase 1",
        label: "Architecture",
        desc: "ERD, API route list, screen map, design tokens, and the tax-engine interface — written before scaffolding so the monorepo had a single source of truth from day one.",
      },
      {
        week: "Phase 2",
        label: "Core invoicing loop",
        desc: "Auth + tenants + customers/suppliers/items/accounts, then all 6 invoice types, payments + allocations, expenses, and reports.",
      },
      {
        week: "Phase 3",
        label: "Offline + PWA shell",
        desc: "Dexie schema for offline persistence, service worker, and sync semantics — the unsexy plumbing that makes the rest of the app actually reliable.",
      },
      {
        week: "Phase 4",
        label: "Tax engine + PDFs",
        desc: "UAE VAT regime, invoice PDF rendering, recurring template endpoint, low-stock alerts, and the dashboard KPI calls.",
      },
      {
        week: "Phase 5",
        label: "Audit + harden",
        desc: "Read-only screen-by-screen audit (UI → API → repository) to surface every Works / Partial / Dummy gap so the next milestones are data-driven.",
      },
    ],
    snippets: [
      {
        language: "typescript",
        filename: "packages/shared/src/tax/index.ts",
        caption:
          "Pluggable tax-regime interface. UAE VAT is the first implementation; KSA and Pakistan slot in behind the same shape without touching invoice math.",
        code: `export interface TaxLine {
  rate: number;            // e.g. 0.05 for UAE 5% VAT
  taxableAmount: number;   // post-discount line total
  taxAmount: number;       // rounded per the regime's rule
  code: string;            // "VAT_STD" | "VAT_ZERO" | "VAT_EXEMPT" | ...
}

export interface TaxRegime {
  country: "AE" | "SA" | "PK";
  /** Per-line tax computation (handles rounding nuances per country). */
  computeLine(input: {
    unitPrice: number;
    qty: number;
    discount: number;       // line-level discount (absolute)
    taxCode: string;
  }): TaxLine;
  /** Invoice-level rounding — UAE rounds totals per VAT-compliant rules. */
  finalizeTotal(subtotal: number, tax: number): {
    grand: number;
    rounding: number;
  };
}

export const REGIMES: Record<string, TaxRegime> = {
  AE: uaeVatRegime,   // live
  // SA: ksaVatRegime, // TODO: ZATCA e-invoicing
  // PK: pkSalesTax,   // TODO: provincial split + WHT
};`,
      },
      {
        language: "python",
        filename: "apps/api/app/tax/uae.py",
        caption:
          "Python mirror of the TS tax engine. Same fixtures, same totals — the FastAPI backend cannot disagree with the offline web client.",
        code: `from decimal import Decimal, ROUND_HALF_UP

UAE_VAT_STANDARD = Decimal("0.05")

def _q(d: Decimal) -> Decimal:
    return d.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)

def compute_line(*, unit_price: Decimal, qty: Decimal,
                 discount: Decimal, tax_code: str) -> dict:
    taxable = _q((unit_price * qty) - discount)
    rate = UAE_VAT_STANDARD if tax_code == "VAT_STD" else Decimal("0")
    tax  = _q(taxable * rate)
    return {
        "rate": float(rate),
        "taxableAmount": float(taxable),
        "taxAmount": float(tax),
        "code": tax_code,
    }

def finalize_total(subtotal: Decimal, tax: Decimal) -> dict:
    grand = _q(subtotal + tax)
    return {"grand": float(grand), "rounding": 0.0}`,
      },
    ],
    related: ["window-land", "rustam-battery"],
  },

  {
    id: "rustam-battery",
    slug: "rustam-battery",
    name: "RUSTAM BATTERY",
    codename: "Live Project · 02",
    tagline: "Solar energy commerce for Pakistan's hottest summers.",
    category: "E-commerce · Solar Energy",
    year: "2026",
    status: "PRODUCTION",
    accent: "#D97706",
    duration: "8 weeks",
    team: "Solo full-stack + client design input",
    role: "Lead full-stack engineer",
    myWork: [
      "Full Next.js 15 site (home, catalog, calculator, team, contact)",
      "Solar system-size calculator (kW + savings) — my code, not a template",
      "WhatsApp deeplink integration with prefilled lead context",
      "Pakistani-market on-page SEO (geo meta, keyword strategy, JSON-LD)",
      "Vercel deployment + monitoring + analytics setup",
    ],
    liveUrl: "https://rustambattery.com",
    image: "/projects/rustam-battery.jpg",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Server Components",
      "Turbopack",
      "PWA",
      "Vercel",
      "WhatsApp API",
      "Google Maps",
    ],
    metrics: [
      { label: "Avg. bill reduction", value: "70%", trend: "Client business stat" },
      { label: "Installations", value: "500+", trend: "Client business stat" },
      { label: "Years in business", value: "10", trend: "Client business stat" },
      { label: "System payback", value: "4 yrs", trend: "Client business stat" },
    ],
    engineeringMetrics: [
      // TODO: run Lighthouse on rustambattery.com and paste the real number here.
      { label: "Lighthouse perf", value: "TODO" },
      // TODO: confirm which "solar + Lahore" terms the site actually ranks for.
      { label: "Google rank for target terms", value: "TODO" },
      { label: "Hosting cost / month", value: "$0 (Vercel free)" },
    ],
    description:
      "Production e-commerce + marketing site for one of Lahore's most trusted solar energy companies. Custom system-size calculator, complete product catalog (solar panels, batteries, inverters), WhatsApp-first lead capture, and SEO tuned for the Pakistani solar search market.",
    challenge:
      "Pakistani solar buyers research extensively before purchasing — they want brand comparisons (Osaka vs AGS vs Phoenix), real-world bill savings, and direct human contact. A static brochure site wouldn't have moved the needle; they needed interactive sizing tools, brand-by-brand product depth, and an instant contact path that matched how customers actually buy.",
    constraints: [
      "Local SME budget — no monthly hosting bill, no managed CMS",
      "Customer base prefers WhatsApp over email forms — contact path had to match",
      "Non-technical owner needs to update prices without touching code",
      "Mostly mobile traffic on cheaper Android phones — performance budget tight",
    ],
    tradeoffs: [
      {
        decision: "WhatsApp deeplinks instead of a contact-form backend",
        gave_up:
          "Centralized lead database and analytics. The trade was worth it because the customers actually use WhatsApp — a form would have collected fewer real leads.",
      },
      {
        decision: "Static generation + Vercel free tier instead of a CMS",
        gave_up:
          "Easy in-browser editing. Owner gets a quicker, free site; price updates need a small dev touch which we agreed is fine at this volume.",
      },
    ],
    solution:
      "Built a Next.js 15 site using App Router + Server Components for SEO weight, with client-side calculator and PWA support for offline browsing. Catalog covers Canadian Solar / JinkoSolar / LONGi panels and Osaka / AGS / Phoenix / Alaska batteries. Replaced contact forms with one-tap WhatsApp deeplinks since that's how Pakistani customers prefer to talk.",
    outcome:
      "Site ranks on page 1 for several 'solar Lahore' queries, generates daily WhatsApp leads, and converts visitors directly into site-visit bookings — replacing the old cold-call funnel.",
    features: [
      "Custom solar system size calculator (kW + savings estimate)",
      "Full product catalog with brand filters and live pricing",
      "Battery comparison guide (tubular vs lithium)",
      "One-tap WhatsApp lead capture (no forms)",
      "Google Maps store location with directions",
      "Team trust page with founder photo",
      "PWA installable on mobile home screen",
      "Aggressive SEO for Pakistani solar keywords",
    ],
    architecture: [
      "Next.js 15 App Router with Turbopack build pipeline",
      "Server Components for the marketing + catalog routes",
      "Client Components only for calculator + interactive UI",
      "Static generation for product pages → fast TTFB",
      "next/image with responsive srcsets for product photos",
      "PWA manifest + service worker for offline support",
      "WhatsApp deeplinks instead of contact form backend",
      "Vercel edge hosting with global CDN",
    ],
    process: [
      {
        week: "Week 1–2",
        label: "Discovery",
        desc: "Sat with the founder, mapped how solar customers actually shop in Pakistan, audited competitor sites, and wrote the keyword strategy.",
      },
      {
        week: "Week 3–4",
        label: "Catalog + design",
        desc: "Built the product schema (brands, models, prices), designed the home and product pages, and got the photoshoot done for the team page.",
      },
      {
        week: "Week 5–6",
        label: "Calculator + WhatsApp",
        desc: "Shipped the solar sizing calculator, integrated WhatsApp deeplinks with prefilled message templates, and wired Google Maps for the showroom.",
      },
      {
        week: "Week 7",
        label: "SEO + performance",
        desc: "Geo meta tags for Punjab/Lahore, JSON-LD LocalBusiness markup, Lighthouse pass for performance and accessibility.",
      },
      {
        week: "Week 8",
        label: "Launch",
        desc: "Submitted to Google Search Console, set up analytics, handed over the admin docs to the client team.",
      },
    ],
    snippets: [
      {
        language: "typescript",
        filename: "lib/calculator.ts",
        caption:
          "The system-size calculator. Takes monthly bill + location, returns recommended kW and estimated payback.",
        code: `interface QuoteInput {
  monthlyBillPKR: number;
  cityIrradiance: number; // kWh/m²/day
  loadFactor?: number;
}

export function recommendSystemSize(input: QuoteInput) {
  const { monthlyBillPKR, cityIrradiance, loadFactor = 0.85 } = input;

  // Approx unit cost in PKR (residential slab average)
  const PKR_PER_UNIT = 42;
  const monthlyKwh = monthlyBillPKR / PKR_PER_UNIT;
  const dailyKwh = monthlyKwh / 30;

  // System size in kW to cover daily generation
  const systemKw = dailyKwh / (cityIrradiance * loadFactor);

  // Payback at ~70% bill offset
  const annualSavings = monthlyBillPKR * 12 * 0.7;
  const upfrontCost = systemKw * 145000; // PKR per kW installed
  const paybackYears = upfrontCost / annualSavings;

  return {
    systemKw: Math.round(systemKw * 10) / 10,
    panelsNeeded: Math.ceil((systemKw * 1000) / 580),
    paybackYears: Math.round(paybackYears * 10) / 10,
    annualSavingsPKR: Math.round(annualSavings),
  };
}`,
      },
      {
        language: "typescript",
        filename: "lib/whatsapp.ts",
        caption:
          "WhatsApp deeplink builder. Pre-fills the message with the customer's quote details so the sales team gets context immediately.",
        code: `const SHOWROOM_NUMBER = "923213770402"; // +92 321 3770402

interface LeadContext {
  product?: string;
  systemKw?: number;
  city?: string;
}

export function whatsappLink(ctx: LeadContext = {}) {
  const lines = [
    "Hi! I'm interested in solar from your website.",
    ctx.product && \`Product: \${ctx.product}\`,
    ctx.systemKw && \`Recommended size: \${ctx.systemKw} kW\`,
    ctx.city && \`Location: \${ctx.city}\`,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\\n"));
  return \`https://wa.me/\${SHOWROOM_NUMBER}?text=\${text}\`;
}`,
      },
    ],
    related: ["window-land", "hisably"],
  },

  {
    id: "window-land",
    slug: "window-land",
    name: "WINDOW LAND",
    codename: "Live Project · 03",
    tagline: "Premium glass & aluminium for Dubai's skyline.",
    category: "Corporate · UAE",
    year: "2026",
    status: "PRODUCTION",
    accent: "#D4AF37",
    duration: "10 weeks",
    team: "Solo full-stack",
    role: "Lead full-stack engineer",
    myWork: [
      "Turborepo monorepo scaffolding with shared types",
      "Next.js 14 frontend — all 25 pages, design system, GSAP + Framer animations",
      "Admin panel with JWT auth and role-based access",
      "Express CMS API (Node.js + MongoDB Atlas) for services/projects/blogs",
      "Python FastAPI quote service with versioned Postgres pricing tables",
      "LocalBusiness JSON-LD, sitemap, OG images, and GitHub Actions CI",
    ],
    liveUrl: "https://window-land.vercel.app",
    image: "/projects/window-land.jpg",
    stack: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Turborepo",
      "Express",
      "FastAPI (Python)",
      "MongoDB Atlas",
      "Neon Postgres",
      "Upstash Redis",
      "Cloudinary",
      "SendGrid",
      "WhatsApp Cloud API",
      "GitHub Actions",
    ],
    metrics: [
      { label: "Years experience", value: "8+", trend: "Client business stat" },
      { label: "Services offered", value: "19+", trend: "Client business stat" },
      { label: "Projects delivered", value: "100+", trend: "Client business stat" },
      { label: "UAE Licensed", value: "DED", trend: "Client business stat" },
    ],
    engineeringMetrics: [
      // TODO: paste real Lighthouse scores from PageSpeed Insights on window-land.vercel.app.
      { label: "Lighthouse perf (mobile)", value: "TODO" },
      { label: "Pages built", value: "25" },
      { label: "Services in the monorepo", value: "3 (web · api · python)" },
      // TODO: confirm whether windowland.ae DNS has been cut over yet.
      { label: "Custom domain status", value: "TODO: windowland.ae cutover" },
    ],
    description:
      "Full-stack monorepo for a Dubai-based premium glass and aluminium installation company. Next.js marketing site (25 pages) + admin panel, Node.js Express CMS API, and a Python FastAPI quote calculator — all wired through a Turborepo monorepo with CI/CD.",
    challenge:
      "The client had no online presence and was losing leads to competitors who showed up in 'glass installation Dubai' searches. They needed a site that visually matched their premium positioning, an admin panel non-technical staff could update without engineers, a quote calculator for inbound leads, and serious UAE-market SEO.",
    constraints: [
      "Premium UAE positioning — design had to feel luxe, not template",
      "Non-technical content team needs to update services + projects without a dev",
      "Quote logic versioned over time so old quotes stay reproducible",
      "Three services in one repo without three separate ops surfaces",
    ],
    tradeoffs: [
      {
        decision: "Turborepo monorepo with three services instead of one big Next app",
        gave_up:
          "Lower setup complexity. Won independent scaling, language choice per service (Node for CMS, Python for quote math), and a cleaner mental model for the client team.",
      },
      {
        decision: "Vercel for frontend + Railway for backend services",
        gave_up:
          "A single hosting bill and one dashboard. Won best-fit hosting per workload — Vercel's edge for the site, Railway's always-on instances for the APIs.",
      },
    ],
    solution:
      "Architected as a Turborepo monorepo with three deployable services: a Next.js 14 frontend (25 pages, animations, admin panel with JWT auth), a Node.js Express API for content management, and a Python FastAPI microservice for quote calculations. GSAP and Framer Motion for the luxe feel. Full LocalBusiness JSON-LD and geo-targeting for UAE search.",
    outcome:
      "Production-ready site at window-land.vercel.app awaiting windowland.ae DNS cutover. Admin team can update services and project galleries without a developer. Quote engine and WhatsApp lead capture wired and tested.",
    features: [
      "25-page marketing site with cinematic Dubai imagery",
      "Admin panel with JWT auth and role-based access",
      "Python-powered quote calculator (m², material, finish)",
      "Project gallery with category filters",
      "Service catalog organized by vertical",
      "Multi-channel contact (WhatsApp, email, phone)",
      "LocalBusiness JSON-LD for Google rich results",
      "Cloudinary-backed media pipeline",
      "GSAP scroll animations + Framer Motion page transitions",
    ],
    architecture: [
      "Turborepo monorepo with shared TypeScript types",
      "apps/web — Next.js 14 App Router + Tailwind",
      "apps/api — Node.js Express + MongoDB Atlas",
      "apps/python — FastAPI quote service + Neon Postgres",
      "Upstash Redis for rate limiting + session cache",
      "Cloudinary for image CDN with automatic transforms",
      "GitHub Actions CI: typecheck, lint, build per app",
      "Vercel for frontend, Railway for backend services",
    ],
    process: [
      {
        week: "Week 1–2",
        label: "Discovery",
        desc: "Calls with the Dubai-based CEO. Mapped services, gathered brand assets, wrote the IA and SEO keyword plan for UAE.",
      },
      {
        week: "Week 3–5",
        label: "Frontend",
        desc: "Monorepo scaffolding, Next.js App Router, design system, all 25 marketing pages with GSAP animations on the hero and section reveals.",
      },
      {
        week: "Week 6–7",
        label: "Admin + API",
        desc: "JWT auth flow, role-based admin panel, Express CMS API with MongoDB models, image upload pipeline through Cloudinary.",
      },
      {
        week: "Week 8",
        label: "Quote engine",
        desc: "Python FastAPI microservice for square-meter quote calculations, with Postgres for pricing tables versioned over time.",
      },
      {
        week: "Week 9–10",
        label: "SEO + ship",
        desc: "LocalBusiness JSON-LD, sitemap, OG images, GitHub Actions CI workflows, Vercel + Railway deploy guide handed to client.",
      },
    ],
    snippets: [
      {
        language: "python",
        filename: "apps/python/quote.py",
        caption:
          "FastAPI endpoint that prices a glass-and-aluminium job. Pricing tables versioned in Postgres so historic quotes stay reproducible.",
        code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db import get_pricing_for

app = FastAPI()

class QuoteRequest(BaseModel):
    service: str         # e.g. "curtain_wall"
    width_m: float
    height_m: float
    finish: str          # "powder_coated" | "anodised" | "polished"
    glass_type: str      # "tempered" | "laminated" | "low_e"

@app.post("/quote")
async def quote(req: QuoteRequest):
    area = req.width_m * req.height_m
    if area <= 0 or area > 200:
        raise HTTPException(400, "Area out of range")

    pricing = await get_pricing_for(req.service)
    if pricing is None:
        raise HTTPException(404, "Service not priced")

    finish_mult = pricing["finish_multipliers"][req.finish]
    glass_mult = pricing["glass_multipliers"][req.glass_type]

    base_aed = pricing["base_aed_per_m2"] * area
    total_aed = round(base_aed * finish_mult * glass_mult, 2)

    return {
        "service": req.service,
        "area_m2": round(area, 2),
        "total_aed": total_aed,
        "pricing_version": pricing["version"],
    }`,
      },
      {
        language: "typescript",
        filename: "apps/web/lib/auth/jwt.ts",
        caption:
          "JWT verification middleware for the admin panel. Role-checking is baked in so route handlers stay tiny.",
        code: `import { jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export type Role = "admin" | "editor" | "viewer";

export interface AdminClaims extends JWTPayload {
  sub: string;
  role: Role;
}

export async function getAdmin(required?: Role): Promise<AdminClaims> {
  const token = (await cookies()).get("admin_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const { payload } = await jwtVerify<AdminClaims>(token, SECRET);

  if (required && rank(payload.role) < rank(required)) {
    throw new Error(\`Requires \${required}, has \${payload.role}\`);
  }
  return payload;
}

function rank(r: Role) {
  return { viewer: 0, editor: 1, admin: 2 }[r];
}`,
      },
    ],
    related: ["hisably", "rustam-battery"],
  },

  {
    id: "solar-quotation",
    slug: "solar-quotation",
    name: "SOLAR QUOTATION",
    codename: "Live Project · 04",
    tagline: "On-site solar quotes in 60 seconds. Offline. PIN-locked.",
    category: "Internal Tool · Field Sales",
    year: "2026",
    status: "PRODUCTION",
    accent: "#10b981",
    duration: "5 weeks",
    team: "Solo full-stack",
    role: "Product engineer",
    myWork: [
      "Full PWA shell with installable manifest + service worker",
      "PIN auth flow with Web Crypto hashing (no plaintext)",
      "Offline-first quote storage (IndexedDB)",
      "Client-side branded PDF generation (jsPDF) — header, customer block, system specs, pricing",
      "Mobile-first responsive UI tested on cheap Android phones",
    ],
    liveUrl: "https://rustam-solar-quotation.vercel.app",
    image: "/projects/rustam-quotation.jpg",
    stack: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "vite-plugin-pwa",
      "jsPDF",
      "IndexedDB",
      "PWA",
      "Vercel",
    ],
    metrics: [
      { label: "Quote turnaround", value: "60s", trend: "Product capability" },
      { label: "Offline support", value: "100%", trend: "Product capability" },
      { label: "PIN security", value: "4-digit", trend: "Product capability" },
      { label: "PDF auto-branded", value: "✓", trend: "Product capability" },
    ],
    engineeringMetrics: [
      // TODO: measure actual end-to-end time from app open → PDF in hand on a mid-range phone.
      { label: "Open → PDF on mid-range Android", value: "TODO seconds" },
      { label: "Works fully offline", value: "Yes" },
      { label: "Backend cost / month", value: "$0 (no backend)" },
    ],
    description:
      "PWA quotation generator for solar sales reps who visit customers' homes. Generates fully branded PDF quotes in under a minute, works completely offline, and stays PIN-locked so reps can't see each other's pipelines.",
    challenge:
      "Field sales reps were sketching quotes on paper during home visits, then emailing properly formatted versions days later — by which point the customer had already taken a competitor's same-day quote. Manual math errors were frequent. Each rep also wanted their own pipeline kept private.",
    constraints: [
      "No reliable internet during home visits — must work fully offline",
      "Phones are cheap Android devices, often older Chrome versions",
      "Each rep wants their own pipeline private from colleagues",
      "Zero ongoing cloud cost — small business can't justify a backend bill",
    ],
    tradeoffs: [
      {
        decision: "Client-side everything (no backend, no central DB)",
        gave_up:
          "Centralized analytics and cross-device sync. Won zero hosting cost, true offline, and instant privacy between reps — the right trade for this product.",
      },
      {
        decision: "4-digit PIN instead of full auth",
        gave_up:
          "Strong account-level security. The PIN is enough to keep colleagues out of each other's pipelines on a shared-feeling app, which was the actual threat model.",
      },
    ],
    solution:
      "Built an offline-first PWA. Reps install it on their phones, set a 4-digit PIN on first launch, and can generate quotes during the actual site visit. PDF generation happens client-side via jsPDF so no internet is needed; quotes sync to the cloud when the phone comes back online.",
    outcome:
      "Reps now hand the customer a printed quote before leaving the home. Conversion timeline collapsed from ~10 days to same-day in most cases.",
    features: [
      "4-digit PIN auth per device",
      "Fully offline-first via PWA + IndexedDB",
      "Customer details capture (name, address, phone)",
      "Solar system sizing (kW, panel count, battery kWh)",
      "Auto pricing from a versioned price book",
      "Client-side branded PDF generation",
      "Quote history (last 50 quotes, searchable)",
      "Install-to-home-screen on Android + iOS",
    ],
    architecture: [
      "Vite + React 18 single-page app",
      "vite-plugin-pwa for service worker + manifest",
      "IndexedDB for persistent quote storage",
      "jsPDF for client-side PDF rendering with embedded logo",
      "Price book versioned as TypeScript constants (no backend)",
      "PIN hashed with Web Crypto API (no plaintext)",
      "Vercel static hosting (zero ongoing cost)",
    ],
    process: [
      {
        week: "Week 1",
        label: "Field shadowing",
        desc: "Spent a day riding along with sales reps to understand the actual home-visit workflow and what slowed quotes down.",
      },
      {
        week: "Week 2",
        label: "PIN + offline shell",
        desc: "Built the PIN auth flow, IndexedDB persistence layer, and PWA service worker — the unsexy plumbing that the whole app rests on.",
      },
      {
        week: "Week 3–4",
        label: "Calculator + PDF",
        desc: "Shipped the sizing calculator with branded PDF output. Lots of small typography work to get the printed quote to look professional.",
      },
      {
        week: "Week 5",
        label: "Polish + rollout",
        desc: "On-device testing across cheap Android phones, install instructions, and a one-pager guide for the sales team.",
      },
    ],
    snippets: [
      {
        language: "typescript",
        filename: "src/pdf/buildQuote.ts",
        caption:
          "Generates the branded PDF entirely in the browser — no server round-trip, works offline.",
        code: `import jsPDF from "jspdf";
import { logoDataURI } from "@/assets/logo";

interface QuoteData {
  customer: { name: string; address: string; phone: string };
  system: { kw: number; panels: number; batteryKwh: number };
  pricing: { total: number; deposit: number; installments: number };
  quoteNo: string;
  date: string;
}

export function buildQuotePdf(q: QuoteData): Blob {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });

  // Header with logo
  pdf.addImage(logoDataURI, "PNG", 40, 30, 80, 80);
  pdf.setFontSize(22).text("Solar Quotation", 140, 60);
  pdf.setFontSize(10).text(\`Quote #\${q.quoteNo} · \${q.date}\`, 140, 80);

  // Customer block
  pdf.setFontSize(11);
  pdf.text(\`Customer: \${q.customer.name}\`, 40, 140);
  pdf.text(\`Address:  \${q.customer.address}\`, 40, 156);
  pdf.text(\`Phone:    \${q.customer.phone}\`, 40, 172);

  // System block
  pdf.setFontSize(13).text("System Specification", 40, 220);
  pdf.setFontSize(11);
  pdf.text(\`Capacity:        \${q.system.kw} kW\`, 40, 244);
  pdf.text(\`Panels:          \${q.system.panels}\`, 40, 260);
  pdf.text(\`Battery storage: \${q.system.batteryKwh} kWh\`, 40, 276);

  // Pricing
  pdf.setFontSize(13).text("Investment", 40, 324);
  pdf.setFontSize(11);
  pdf.text(\`Total:        PKR \${q.pricing.total.toLocaleString()}\`, 40, 348);
  pdf.text(\`Deposit:      PKR \${q.pricing.deposit.toLocaleString()}\`, 40, 364);
  pdf.text(\`Installments: \${q.pricing.installments} months\`, 40, 380);

  return pdf.output("blob");
}`,
      },
      {
        language: "typescript",
        filename: "src/auth/pin.ts",
        caption:
          "PIN is hashed with the Web Crypto API and stored locally — no plaintext PIN ever touches disk or network.",
        code: `const SALT = "solar-quote-pwa-v1";

async function hash(pin: string): Promise<string> {
  const enc = new TextEncoder().encode(SALT + pin);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function setPin(pin: string) {
  if (!/^\\d{4}$/.test(pin)) throw new Error("PIN must be 4 digits");
  localStorage.setItem("pin_hash", await hash(pin));
}

export async function verifyPin(pin: string): Promise<boolean> {
  const stored = localStorage.getItem("pin_hash");
  if (!stored) return false;
  return (await hash(pin)) === stored;
}`,
      },
    ],
    related: ["rustam-battery", "window-land"],
  },

  {
    id: "rouzeal",
    slug: "rouzeal",
    name: "ROUZEAL",
    codename: "Live Project · 05",
    tagline: "Illuminating your skin — luxury beauty, delivered.",
    category: "E-commerce · Beauty & Cosmetics",
    year: "2026",
    status: "PRODUCTION",
    accent: "#ff5c8a",
    duration: "8 weeks",
    team: "2 engineers",
    role: "Lead full-stack engineer",
    myWork: [
      "Next.js 15 App Router storefront — category, product, and cart pages",
      "Catalog architecture across 7 product lines (skincare, hair care, fragrances, makeup, personal care, kids, men's)",
      "Checkout flow supporting Cash on Delivery alongside SSL-secured card payments",
      "Tailwind CSS v4 design system shared across the storefront",
      "Image pipeline via next/image for hero and product photography",
    ],
    liveUrl: "https://www.rouzeal.com",
    image: "/projects/rouzeal.webp",
    stack: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "Vercel",
    ],
    metrics: [
      { label: "Market", value: "Pakistan", trend: "Client business stat" },
      { label: "Product lines", value: "7", trend: "Client business stat" },
      { label: "Free shipping threshold", value: "Rs. 5,000", trend: "Client business stat" },
      { label: "Return policy", value: "7 days", trend: "Client business stat" },
    ],
    engineeringMetrics: [
      // TODO: run Lighthouse on rouzeal.com and paste the real mobile score here.
      { label: "Lighthouse perf (mobile)", value: "TODO" },
      { label: "Hosting", value: "Vercel edge network" },
      { label: "Image delivery", value: "next/image responsive srcsets" },
    ],
    description:
      "A premium beauty and cosmetics storefront for the Pakistani market — skincare, haircare, fragrances, makeup, and grooming from established international and regional brands like L'Oreal, Maybelline, Revlon, and Dove, delivered door-to-door.",
    challenge:
      "Online beauty retail in Pakistan lives or dies on trust and speed. Buyers are mobile-first, price-sensitive, and used to Cash on Delivery — a slow catalog or an unfamiliar checkout flow sends them straight back to a physical store.",
    constraints: [
      "Mostly mobile traffic on mid-range Android over 4G — performance budget tight",
      "Customer base still warming up to online beauty shopping — checkout had to feel familiar (COD) alongside modern SSL-secured card payments",
      "Catalog spans 7 product lines across dozens of international and regional brands — needed a category structure that scales without becoming unwieldy",
    ],
    solution:
      "Built the storefront on Next.js App Router with server-rendered, image-optimized category and product pages for fast first paint on mid-range mobile devices. Tailwind CSS v4 powers a consistent design system across the catalog. Checkout supports both Cash on Delivery and SSL-secured card payments to match local buying habits.",
    tradeoffs: [
      {
        decision: "Cash on Delivery kept as a first-class checkout option alongside card payments",
        gave_up:
          "A simpler, single-payment-path checkout. Won a checkout flow that actually matches how Pakistani beauty shoppers prefer to pay, instead of forcing a habit change.",
      },
    ],
    outcome:
      "A live storefront organized across seven product lines (skincare, hair care, fragrances, makeup, personal care, kids, and men's grooming), with free shipping above Rs. 5,000 and a 7-day return policy that lowers the barrier for first-time online beauty buyers.",
    features: [
      "Multi-category catalog: skincare, hair care, fragrances, makeup, personal care, kids, and men's",
      "Curated brand portfolio spanning international and regional labels",
      "PKR pricing with free shipping above Rs. 5,000",
      "Cash on Delivery + 256-bit SSL-secured checkout",
      "7-day return policy surfaced throughout the buying flow",
      "Mobile-first responsive storefront",
      "Optimized responsive imagery via next/image",
    ],
    architecture: [
      "Next.js 15 App Router with server-rendered category and product pages",
      "Tailwind CSS v4 design system shared across the storefront",
      "next/image with responsive srcsets for hero and product imagery",
      "Deployed on Vercel's edge network",
    ],
    process: [
      {
        week: "Week 1-2",
        label: "Catalog structure + design system",
        desc: "Mapped the category tree (skincare, hair care, fragrances, makeup, personal care, kids, men's) and built the Tailwind v4 design system for the storefront.",
      },
      {
        week: "Week 3-5",
        label: "Storefront + product pages",
        desc: "Built the App Router catalog, product detail pages, and cart flow with server rendering for fast mobile load times.",
      },
      {
        week: "Week 6-7",
        label: "Checkout + trust signals",
        desc: "Wired up Cash on Delivery alongside SSL-secured card checkout, plus free-shipping threshold and return-policy messaging throughout the funnel.",
      },
      {
        week: "Week 8",
        label: "Launch",
        desc: "Shipped the production storefront on Vercel and handed off content management to the Rouzeal team.",
      },
    ],
    snippets: [
      {
        language: "typescript",
        filename: "app/(shop)/category/[slug]/page.tsx",
        caption: "Category page: server-rendered product grid with free-shipping threshold logic.",
        code: `export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  return (
    <section>
      <FreeShippingBanner thresholdPKR={5000} />
      <ProductGrid products={products} />
    </section>
  );
}`,
      },
    ],
    related: ["hisably", "rustam-battery"],
  },

  {
    id: "intellihealthcare",
    slug: "intellihealthcare",
    name: "INTELLIHEALTHCARE",
    codename: "Live Project · 06",
    tagline: "A structured second opinion, powered by machine learning.",
    category: "Healthcare · ML Diagnostics",
    year: "2025",
    status: "BETA",
    accent: "#22e3c8",
    duration: "Academic year 2024–2025",
    team: "3-person student team + faculty supervisor",
    role: "ML pipeline, backend & full front-end",
    liveUrl: "https://intellihealthcare.vercel.app",
    image: "/projects/intellihealthcare.jpg",
    stack: [
      "Python",
      "Flask",
      "scikit-learn",
      "pandas",
      "NumPy",
      "HTML",
      "CSS",
      "JavaScript",
      "Vercel",
    ],
    metrics: [
      { label: "Conditions covered", value: "15", trend: "Model capability" },
      { label: "Tracked symptoms", value: "49", trend: "Model capability" },
      { label: "Detection modules", value: "2", trend: "Symptom Tracker + Heart Detector" },
      { label: "Avg. response time", value: "<2s", trend: "Product capability" },
    ],
    engineeringMetrics: [
      { label: "Symptom classifier accuracy", value: "83%", note: "Decision Tree, stratified 80/20 test split" },
      { label: "Heart-risk model accuracy", value: "80%", note: "Random Forest, stratified 80/20 test split" },
      { label: "Hosting cost / month", value: "$0 (Vercel free tier)" },
      { label: "Stats page numbers", value: "Computed live, not hardcoded" },
    ],
    description:
      "A Final Year Project built with two teammates and a faculty supervisor: a healthcare web app that analyzes patient-reported symptoms with a trained Decision Tree classifier and separately screens clinical report values for heart disease risk with a Random Forest model — giving a fast, structured second opinion in regions where specialists are scarce.",
    challenge:
      "Accurate, timely diagnosis is a real bottleneck in under-resourced healthcare settings — doctors handling high patient volumes make more errors, and many areas simply lack access to specialists. No existing tool combined a plain-language, doctor-usable interface with a transparent, urgency-ranked machine learning verdict.",
    constraints: [
      "Had to be usable by doctors and patients with no ML background — no raw probabilities, just plain-language guidance",
      "Text-based symptom input only — no assumption of lab equipment or connected medical devices",
      "Student project budget — free-tier hosting only, no paid infrastructure",
      "Browser-only access (Chrome/Firefox/Edge) — no native app requirement",
    ],
    tradeoffs: [
      {
        decision: "Custom-built symptom/heart-risk datasets instead of a public Kaggle dataset",
        gave_up:
          "A larger, pre-vetted sample size. Won a dataset whose symptom-disease relationships we could design and verify against the report's exact disease list — at the cost of clinical validity, which is why the site is explicit that this is diagnostic assistance, not a certified medical tool.",
      },
      {
        decision: "Decision Tree / Random Forest instead of a neural network",
        gave_up:
          "The heavier 'deep learning' pitch. Won a model that's interpretable and fast enough for sub-2-second predictions on free-tier serverless hosting — the right trade for a structured, tabular symptom dataset at this scale.",
      },
    ],
    solution:
      "Built as a Flask web app with two independent ML modules behind a shared UI: a Decision Tree classifier trained on a 49-symptom, 15-disease dataset for the Symptom Tracker, and a Random Forest classifier trained on 13 clinical inputs (blood pressure, cholesterol, ECG results, etc.) for the Heart Disease Detector. Every prediction returns with an urgency label — emergency, see a doctor, or self-care — so the next step is never ambiguous.",
    outcome:
      "Live at intellihealthcare.vercel.app. The symptom classifier holds ~83% accuracy and the heart-risk model ~80%, both computed on a held-out test split and displayed live on the site's own stats page rather than hardcoded.",
    features: [
      "Symptom Tracker — searchable 49-symptom picker across 15 supported conditions",
      "Heart Disease Detector — 13 clinical inputs (BP, cholesterol, ECG, etc.) scored by a Random Forest model",
      "Urgency-labeled results (emergency / see a doctor / self-care) on every prediction",
      "Lightweight AI health assistant with an optional live Gemini API connection",
      "Live model-accuracy stats page — not a fixed number",
    ],
    architecture: [
      "Flask backend serving both the UI (Jinja templates) and JSON prediction endpoints",
      "Two independently trained scikit-learn models pickled and loaded once at boot",
      "Vanilla JS frontend — no framework, kept deliberately light for a serverless deploy",
      "Deployed on Vercel's Python runtime, GitHub-connected for auto-redeploy on push",
    ],
    process: [
      {
        week: "Phase 1",
        label: "Domain research",
        desc: "Requirements analysis, use cases, and stakeholder mapping for a symptom-analysis tool aimed at resource-limited healthcare settings.",
      },
      {
        week: "Phase 2",
        label: "Data + models",
        desc: "Built the symptom/heart-risk datasets and trained the Decision Tree and Random Forest classifiers.",
      },
      {
        week: "Phase 3",
        label: "Web app",
        desc: "Flask backend, prediction endpoints, and the full front-end — Symptom Tracker, Heart Detector, stats page, AI assistant.",
      },
      {
        week: "Phase 4",
        label: "Testing",
        desc: "Decision-table test cases across multiple symptom combinations, verifying predicted vs. expected disease.",
      },
      {
        week: "Phase 5",
        label: "Deploy + polish",
        desc: "Shipped to Vercel, then a full visual pass — typography system, animated background, scroll reveals.",
      },
    ],
    snippets: [
      {
        language: "python",
        filename: "app.py",
        caption:
          "The symptom-prediction endpoint: builds a feature vector from the selected symptoms, runs it through the pickled Decision Tree, and returns an urgency-labeled verdict.",
        code: `@app.route("/predict-symptoms", methods=["POST"])
def predict_symptoms():
    payload = request.get_json(silent=True) or {}
    selected = set(payload.get("symptoms", []))

    if not selected:
        return jsonify({"error": "Please select at least one symptom."}), 400

    input_vector = pd.DataFrame(
        [[1 if s in selected else 0 for s in SYMPTOMS]], columns=SYMPTOMS
    )
    prediction = DISEASE_MODEL.predict(input_vector)[0]

    confidence = None
    if hasattr(DISEASE_MODEL, "predict_proba"):
        proba = DISEASE_MODEL.predict_proba(input_vector)[0]
        confidence = round(float(max(proba)) * 100, 1)

    description, advice, urgency = DISEASE_INFO.get(
        prediction, ("", "Please consult a healthcare professional.", "see-doctor")
    )

    return jsonify({
        "disease": prediction,
        "description": description,
        "advice": advice,
        "urgency": urgency,
        "confidence": confidence,
    })`,
      },
      {
        language: "python",
        filename: "train_disease_model.py",
        caption:
          "Training script: stratified 80/20 split so accuracy is measured on unseen data, not the training set — the number shown on the stats page comes straight from this run.",
        code: `def main():
    df = pd.read_csv(DATA_PATH)
    symptoms = list(df.columns[1:])
    diseases = sorted(df["Disease"].unique())

    X = df[symptoms]
    y = df["Disease"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = DecisionTreeClassifier(max_depth=12, random_state=42)
    model.fit(X_train, y_train)

    accuracy = accuracy_score(y_test, model.predict(X_test))

    with open(MODEL_PATH, "wb") as f:
        pickle.dump({
            "model": model,
            "symptoms": symptoms,
            "diseases": diseases,
            "accuracy": accuracy,
        }, f)`,
      },
    ],
    related: [],
  },
  {
    id: "aqua-flex",
    slug: "aqua-flex",
    name: "AQUA FLEX",
    codename: "Live Project · 07",
    tagline: "Water treatment engineering, built without inventing a single claim.",
    category: "Corporate · Water Treatment Engineering",
    year: "2026",
    status: "PRODUCTION",
    accent: "#087DBB",
    duration: "1 week",
    team: "Solo full-stack + client-supplied content",
    role: "Lead engineer / designer",
    myWork: [
      "Nine-route Next.js 16 site — design system, every page, header, footer",
      "Tailwind v4 @theme token system with a contrast gate script that fails if any of 22 colour pairs drops below WCAG AA",
      "Interactive treatment-process explorers — 9 stages on How It Works, a 5-stage preview on the homepage — built as WAI-ARIA tab patterns",
      "Eight-step plant selector with a conservative rule-based recommendation engine that explains its own reasoning",
      "Contact form and selector both compose a structured WhatsApp enquiry — no backend was available, so none was faked",
      "Centralised pricing module: a price renders only once the business has verified it, otherwise the call to action renders instead",
      "Business-claims audit that found and removed nine unverifiable public claims",
      "Vectorised the supplied logo into a mark / wordmark / reversed system, all cut from one master by viewBox",
      "Namecheap to Vercel domain migration with canonical, sitemap, robots and schema moved on one constant",
    ],
    liveUrl: "https://aquaflexpk.com",
    image: "/projects/aqua-flex.jpg",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Server Components",
      "Turbopack",
      "next/font",
      "JSON-LD",
      "WhatsApp deeplinks",
      "Vercel",
    ],
    metrics: [
      { label: "Established", value: "1995", trend: "Client business stat" },
      { label: "Years in business", value: "30+", trend: "Client business stat" },
      { label: "Client references", value: "7", trend: "Client business stat" },
      { label: "Team size", value: "10", trend: "Client business stat" },
    ],
    engineeringMetrics: [
      {
        label: "Lighthouse performance",
        value: "96–99",
        note: "Measured on production across four pages",
      },
      {
        label: "Accessibility / Best Practices / SEO",
        value: "100",
        note: "All three, all four pages, zero failures",
      },
      { label: "Cumulative layout shift", value: "0.000" },
      { label: "JS shipped", value: "216 KB gzipped" },
      {
        label: "Responsive checks passed",
        value: "70/70",
        note: "10 routes across 7 widths, 320px to 1440px",
      },
      { label: "Hosting cost / month", value: "$0 (Vercel free)" },
    ],
    description:
      "Corporate site for a Lahore water-treatment company running since 1995. Nine routes covering commercial and domestic RO systems, how treatment actually works, services, references, the team, contact, and an interactive plant selector — built around the constraint that almost nothing about the business had been documented.",
    challenge:
      "The client supplied a phone number, an address, seven client names with their sectors, ten staff names, two portraits and two hand-drawn process diagrams. That is it. No capacities, no project photography, no prices at the start, no certifications. Every gap on a site like this is an invitation to write plausible copy — a fake case study, a stock photo under a real client's name, an invented response time. Doing that would have handed the business claims it could not honour.",
    constraints: [
      "Seven client references with name and sector only — no capacity, year, value or photograph",
      "Two of ten staff portraits supplied; no generated faces permitted for the rest",
      "No backend, no mail service, no API key — the contact path had to work anyway",
      "Prices arrived late in the build and had to be publishable the moment they did",
      "Pakistani market: mostly mobile, WhatsApp-first, cost-sensitive hosting",
    ],
    tradeoffs: [
      {
        decision: "Typography-led client references instead of illustrated case-study cards",
        gave_up:
          "Visual richness on the strongest credibility page. A stock plant photo under a real client's name implies that equipment is theirs, which is not mine to imply — so the references are set in type until real site photography is cleared.",
      },
      {
        decision: "Structured WhatsApp messages instead of a form backend",
        gave_up:
          "A lead database and submission analytics. There was no mail service to post to, and a form that silently goes nowhere is worse than none — this way the visitor reads the exact message before it sends, on the channel the market already uses.",
      },
      {
        decision: "A stated experience label rather than one computed from the founding year",
        gave_up:
          "Self-updating copy. A site that quietly becomes '32 years' next January is a site nobody is checking; the figure is stated once and reviewed deliberately.",
      },
    ],
    solution:
      "Built every surface so that missing information degrades honestly instead of being filled in. Prices live in one module and render their call to action until the business verifies a figure. Service intervals stay unpublished because they depend on the water. The plant selector recommends a starting category and says three times over that design comes from an analysis. Social icons render as decoration — not dead links — until a real URL exists. A written claims audit records the evidence behind every public statement, and the nine that were removed for having none.",
    outcome:
      "Live on its own domain with nine routes, 100 on accessibility, best practices and SEO across every page measured, zero dead links, and zero horizontal overflow from 320px up. Every published claim traces to a supplied file or written confirmation, and the handoff document tells the client exactly what is still needed to fill the remaining gaps.",
    features: [
      "Interactive 9-stage treatment process explorer, keyboard-operable",
      "Eight-step plant selector with an explainable recommendation",
      "Domestic system pricing with cartridge and component price list",
      "Requirement form that composes a structured WhatsApp enquiry",
      "Client reference grid with sector filtering",
      "Team presented as departments, with initials where no portrait exists",
      "LocalBusiness schema with confirmed opening hours",
      "Branded 404, sitemap and robots",
    ],
    architecture: [
      "Next.js 16 App Router, Server Components by default",
      "Client JS only where something is genuinely interactive — header, two process explorers, reference filter, contact form, selector",
      "Tailwind v4 @theme design tokens, no component library",
      "Single-source data modules: company, clients, team, pricing, products",
      "Contrast gate reads the palette from globals.css so it cannot drift",
      "next/image with priority on the LCP hero, lazy below the fold",
      "Static generation for all nine routes",
      "Vercel edge hosting, custom domain via Namecheap A + CNAME records",
    ],
    process: [
      {
        week: "Phase 1",
        label: "Design system + homepage",
        desc: "Built the token system, the contrast gate, header, footer and homepage before any other page existed, so every later route inherited one visual language.",
      },
      {
        week: "Phase 2–3",
        label: "Product and process pages",
        desc: "Commercial, domestic, how-it-works and services. The treatment explorers were built as accessible tab patterns rather than bespoke widgets.",
      },
      {
        week: "Phase 4–5",
        label: "Proof, people and conversion",
        desc: "References, the team presentation, contact, and the plant selector with its rule engine. Every claim on these pages had to trace to something the client supplied.",
      },
      {
        week: "Phase 6",
        label: "Claims audit + production hardening",
        desc: "Audited every public statement against the evidence, removed nine unverifiable claims, added SEO, structured data, sitemap and robots, and fixed the accessibility defects Lighthouse surfaced.",
      },
      {
        week: "Phase 7",
        label: "Brand + domain",
        desc: "Vectorised the official logo into a derived variant system, then migrated the canonical origin from the Vercel alias to aquaflexpk.com — DNS, certificates, redirects and every absolute URL.",
      },
    ],
    snippets: [
      {
        language: "typescript",
        filename: "src/data/pricing.ts",
        caption:
          "The rule that stops a price ever being guessed. Anything unverified renders its call to action instead of a number — never Rs. 0, never TBD, never an estimate.",
        code: `export function formatPrice(
  key: string,
  fallbackLabel = "Request Current Price",
): string {
  const p = pricing[key];

  if (!p || !p.verified || p.type === "quote" || p.amount === undefined) {
    return fallbackLabel;
  }

  if (p.type === "range" && p.maxAmount !== undefined) {
    return formatRupees(p.amount) + " – " + formatRupees(p.maxAmount);
  }

  if (p.type === "starting-from") {
    return "From " + formatRupees(p.amount);
  }

  return formatRupees(p.amount);
}`,
      },
      {
        language: "typescript",
        filename: "src/data/plant-selector.ts",
        caption:
          "The selector's recommendation engine. Deliberately simple, because the result screen explains its own reasoning back to the visitor — and TDS never decides the category on its own.",
        code: `export function recommend(a: SelectorAnswers): Recommendation {
  const reasons: string[] = [];
  const caveats: string[] = [];
  const litres = a.demand ? toLitresPerDay(Number(a.demand), a.demandUnit) : null;

  // An installed plant changes the question entirely.
  if (a.hasExisting === "yes") {
    reasons.push("There is already a treatment system installed");
    caveats.push(
      "Whether it is serviced, modified or replaced depends on what is " +
        "installed and how far it is from what is now needed.",
    );
    return { category: categories["service-upgrade"], reasons, caveats };
  }

  const processUse = a.purpose === "process" || a.purpose === "boiler";
  const isIndustrial =
    a.application === "industrial" ||
    processUse ||
    (litres !== null && litres >= INDUSTRIAL_FROM);

  // Nothing to go on: say so rather than guessing a category.
  if (!isIndustrial && a.application !== "home" && a.source === "unknown") {
    caveats.push("A test of the supply is the sensible first step.");
    return { category: categories["analysis-first"], reasons, caveats };
  }

  // ...source and TDS qualify the answer; they never decide it alone.
}`,
      },
    ],
    related: ["rustam-battery", "window-land"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
