export interface Testimonial {
  id: string;
  timestamp: string;
  rating: number;
  author: string;
  role: string;
  company: string;
  quote: string;
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    timestamp: "2025-09-14T10:32:00Z",
    rating: 5,
    author: "Sarah Chen",
    role: "CTO",
    company: "Northwind Capital",
    quote:
      "Ali rebuilt our reconciliation pipeline in three weeks. Cut what used to take five days down to under eight hours. He thinks like an owner — flagged three architectural risks we hadn't noticed and fixed two of them before we even prioritized.",
    project: "Treasury Pipeline",
  },
  {
    id: "t2",
    timestamp: "2025-08-02T15:18:00Z",
    rating: 5,
    author: "Marcus Webb",
    role: "Founder",
    company: "Helix Systems",
    quote:
      "Most contractors ship code. Ali ships systems — with monitoring, with docs, with a runbook. Our oncall actually thanked me for hiring him. I've never had that happen before.",
    project: "Backend Rewrite",
  },
  {
    id: "t3",
    timestamp: "2025-06-21T08:47:00Z",
    rating: 5,
    author: "Priya Nair",
    role: "Head of Engineering",
    company: "Ledgerline",
    quote:
      "We were burning $14k/month on a managed observability stack. Ali designed and shipped a self-hosted alternative that's now cheaper, faster, and easier to query. Paid for itself in 60 days.",
    project: "Observability Migration",
  },
  {
    id: "t4",
    timestamp: "2025-05-09T12:05:00Z",
    rating: 5,
    author: "Daniel Ortiz",
    role: "Product Lead",
    company: "Stitch.io",
    quote:
      "He integrated Claude into our editor and the cache hit rate is sitting at 78%. Token bill dropped by more than half month-over-month. Excellent communicator — async-friendly, no theatrics, just delivery.",
    project: "AI Integration",
  },
  {
    id: "t5",
    timestamp: "2025-03-28T19:22:00Z",
    rating: 5,
    author: "Aisha Khan",
    role: "VP Engineering",
    company: "Quanta Labs",
    quote:
      "Hired Ali for a one-week architecture review. Found a P0 race condition we'd been chasing for a quarter. Stayed on for the full backend rebuild after that. One of the strongest engineers I've worked with this year.",
    project: "Architecture Audit",
  },
  {
    id: "t6",
    timestamp: "2025-02-11T09:14:00Z",
    rating: 5,
    author: "Tom Reilly",
    role: "Solo Founder",
    company: "Cinder",
    quote:
      "I needed a full-stack person who could ship without holding my hand. Ali delivered the MVP, got it on AWS, and walked me through everything in a 90-minute Loom. Already lined him up for v2.",
    project: "MVP Build",
  },
];
