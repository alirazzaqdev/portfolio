export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  type: "Degree" | "Certification" | "Course" | "Award";
  /** Short 1-line description of what was covered. */
  description?: string;
  /** Hours of coursework, if known. */
  hours?: string;
  /** Public credential verification URL (Udemy, Coursera, etc.). */
  verifyUrl?: string;
  /** Local PDF inside /public (e.g. "/certs/aws.pdf"). Click target on the card. */
  filePath?: string;
  /** Local thumbnail image inside /public (e.g. "/certs/aws.jpg"). Shown as card banner. */
  image?: string;
}

/**
 * To add a new cert:
 * 1. Drop the PDF/image into public/certs/  (e.g. public/certs/aws-cp.pdf)
 * 2. Add an entry here and point filePath at "/certs/aws-cp.pdf"
 * 3. (Optional) verifyUrl is the issuer's public credential page
 */
export const certificates: Certificate[] = [
  {
    id: "ethical-hacking-cehv13",
    name: "Certified Ethical Hacking (CEHv13)",
    issuer: "Corvit",
    year: "2024",
    type: "Certification",
    hours: "1 month",
    description:
      "Ethical hacking and offensive security: reconnaissance, vulnerability scanning, exploitation, web app and network attacks, social engineering, and countermeasures. Certificate of Merit (Sr. No. 0272).",
    image: "/certs/ethical-hacking-cehv13.jpg",
    filePath: "/certs/ethical-hacking-cehv13.pdf",
  },
  {
    id: "cisco-packet-tracer",
    name: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "Course",
    description:
      "Hands-on network simulation: routing, switching, IP addressing, and topology design using Cisco's Packet Tracer environment.",
    image: "/certs/cisco-packet-tracer.jpg",
    filePath: "/certs/cisco-packet-tracer.pdf",
  },
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner (CLF-C02)",
    issuer: "Stephane Maarek · Udemy",
    year: "2026",
    type: "Certification",
    hours: "14.5 hrs",
    description:
      "Cloud fundamentals: AWS global infrastructure, core services (EC2, S3, RDS, Lambda), IAM, billing, and the well-architected framework.",
    image: "/certs/aws-cloud-practitioner.jpg",
    filePath: "/certs/aws-cloud-practitioner.pdf",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-2af2c67b-521d-4806-9e93-69b7d43d6943/",
  },
  {
    id: "prompt-engineering-ai",
    name: "Prompt Engineering for AI Bootcamp",
    issuer: "Mike Taylor & James Phoenix · Udemy",
    year: "2026",
    type: "Course",
    hours: "22.5 hrs",
    description:
      "End-to-end prompt engineering for production LLM apps: structured outputs, tool use, RAG patterns, evaluations, and cost control.",
    image: "/certs/prompt-engineering-ai.jpg",
    filePath: "/certs/prompt-engineering-ai.pdf",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-d59f69b4-fd1b-4f35-a9fe-6d60181c42bb/",
  },
  {
    id: "html-css-bootcamp",
    name: "The HTML & CSS Bootcamp",
    issuer: "Colt Steele · Udemy",
    year: "2026",
    type: "Course",
    hours: "37 hrs",
    description:
      "Modern HTML5 + CSS3 grounding: semantic markup, accessibility, Flexbox, Grid, responsive design, transitions, and animations.",
    image: "/certs/html-css-bootcamp.jpg",
    filePath: "/certs/html-css-bootcamp.pdf",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-4e5c9145-d32a-4407-9552-ebbcbfed8e63/",
  },
  {
    id: "python-essentials-1",
    name: "Python Essentials 1",
    issuer: "Cisco Networking Academy · Python Institute",
    year: "2026",
    type: "Certification",
    description:
      "PCEP-aligned essentials: language syntax, control flow, functions, modules, and core problem-solving in Python — the official Python Institute track.",
    image: "/certs/python-essentials-1.jpg",
    filePath: "/certs/python-essentials-1.pdf",
  },
  {
    id: "advanced-python",
    name: "Advanced Python Certification",
    issuer: "Programming Hub · Google Developers Launchpad",
    year: "2026",
    type: "Certification",
    description:
      "Advanced Python topics: decorators, generators, async/await, metaclasses, typing, and performance patterns for production code.",
    image: "/certs/advanced-python.jpg",
    filePath: "/certs/advanced-python.pdf",
  },
  {
    id: "python-3-cert",
    name: "Python 3 Certification",
    issuer: "Programming Hub · Google Developers Launchpad",
    year: "2026",
    type: "Certification",
    description:
      "Python 3 fundamentals: data structures, OOP, file I/O, error handling, and standard-library mastery for everyday scripting and backends.",
    image: "/certs/python-3-cert.jpg",
    filePath: "/certs/python-3-cert.pdf",
  },
  {
    id: "data-science-bootcamp",
    name: "The Data Science Course: Complete Data Science Bootcamp",
    issuer: "365 Careers · Udemy",
    year: "2026",
    type: "Course",
    hours: "32 hrs",
    description:
      "End-to-end data science workflow: probability and statistics, Python (NumPy, Pandas), data visualization, regression and classification, and an intro to deep learning with TensorFlow.",
    image: "/certs/data-science-bootcamp.jpg",
    filePath: "/certs/data-science-bootcamp.pdf",
    verifyUrl:
      "https://www.udemy.com/certificate/UC-f88f1313-f137-47bd-b49a-2f41edec8c65/",
  },
  {
    id: "digital-freedom-blueprint",
    name: "Digital Freedom Blueprint",
    issuer: "FK Marketing · Fahad Khokhar",
    year: "2026",
    type: "Course",
    hours: "90 days",
    description:
      "90-day program on building an online business: positioning, offers, organic acquisition, sales systems, and freelance/agency operations.",
    image: "/certs/digital-freedom-blueprint.jpg",
    filePath: "/certs/digital-freedom-blueprint.pdf",
  },
];
