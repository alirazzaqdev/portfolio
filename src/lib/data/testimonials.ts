export interface Testimonial {
  id: string;
  timestamp: string;
  rating: number;
  author: string;
  role: string;
  company: string;
  quote: string;
  project?: string;
  /** Optional LinkedIn profile of the author for third-party verification. */
  authorLinkedIn?: string;
}

/**
 * REAL CLIENT TESTIMONIALS ONLY.
 *
 * The testimonials section on the home page auto-hides when this array is empty.
 *
 * The three placeholder objects below are commented out — they map to the three
 * real clients/projects on this site and exist as a checklist of who to ask:
 *
 * TODO: Get a 2–3 sentence testimonial from the owner of Rustam Battery
 *       about the website + the on-site quote tool.
 * TODO: Get a 2–3 sentence testimonial from Muhammad Waqas (CEO) at
 *       Window Land Dubai about the full-stack site + admin panel.
 * TODO: Get a short note from a Solar Quotation field-sales user
 *       about the on-site PWA quote flow.
 *
 * When a real quote arrives:
 *   1. Uncomment the matching block.
 *   2. Fill in `quote`, `author`, `role`, `company`, and (if possible)
 *      `authorLinkedIn` so visitors can verify the person is real.
 *   3. Set `timestamp` to the date you received the quote.
 *
 * Never write a testimonial that the client did not actually write.
 */
export const testimonials: Testimonial[] = [
  // {
  //   id: "rustam-battery",
  //   timestamp: "TODO",
  //   rating: 5,
  //   author: "TODO: Owner name",
  //   role: "Founder",
  //   company: "Rustam Battery & Solar Energy House",
  //   quote: "TODO: 2–3 sentences in their own words.",
  //   project: "Rustam Battery website",
  //   authorLinkedIn: "TODO",
  // },
  // {
  //   id: "window-land",
  //   timestamp: "TODO",
  //   rating: 5,
  //   author: "Muhammad Waqas",
  //   role: "CEO",
  //   company: "Window Land Glass & Aluminium, Dubai",
  //   quote: "TODO: 2–3 sentences in their own words.",
  //   project: "Window Land monorepo + admin panel",
  //   authorLinkedIn: "TODO",
  // },
  // {
  //   id: "solar-quotation",
  //   timestamp: "TODO",
  //   rating: 5,
  //   author: "TODO: Sales lead name",
  //   role: "Field Sales",
  //   company: "TODO: company name",
  //   quote: "TODO: short note from a real user of the PWA.",
  //   project: "Solar Quotation PWA",
  //   authorLinkedIn: "TODO",
  // },
];
