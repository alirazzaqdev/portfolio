import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/ui/Navbar";
import { siteConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Ali Razzaq — Full-Stack Software Developer in Lahore, Pakistan`,
    template: `%s — Ali Razzaq`,
  },
  description:
    "Ali Razzaq is a full-stack software developer based in Lahore, Pakistan, serving clients across Pakistan and the UAE. I build production web applications with Next.js, React, Python, Java, and AWS — for solar energy, glass & aluminium, and internal business tools.",
  applicationName: "Ali Razzaq Portfolio",
  keywords: [
    "Ali Razzaq",
    "Ali Razzaq developer",
    "full stack developer Lahore",
    "Next.js developer Pakistan",
    "freelance developer Pakistan UAE",
    "AI integration developer",
    "offline PWA developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `Ali Razzaq — Full-Stack Software Developer in Lahore, Pakistan`,
    description:
      "Full-stack software developer building production web apps with Next.js, React, Python, Java, and AWS.",
    siteName: "Ali Razzaq",
  },
  twitter: {
    card: "summary_large_image",
    title: `Ali Razzaq — Full-Stack Software Developer`,
    description:
      "Full-stack software developer based in Lahore, Pakistan. Next.js, React, Python, Java, AWS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ali Razzaq",
  alternateName: ["alirazzaq", "Ali"],
  url: siteConfig.url,
  image: `${siteConfig.url}/ali.jpg`,
  jobTitle: "Full-Stack Software Developer",
  description:
    "Full-stack software developer based in Lahore, Pakistan. Builds production web applications with Next.js, React, Python, Java, and AWS.",
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  workLocation: [
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Management and Technology",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
  },
  knowsAbout: [
    "Full-Stack Web Development",
    "Software Engineering",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "Node.js",
    "Express",
    "Django",
    "FastAPI",
    "AWS",
    "Vercel",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Docker",
    "PWA Development",
    "Turborepo Monorepos",
    "AI Integration (OpenAI, Claude)",
    "Prompt Engineering",
    "Ethical Hacking (CEHv13)",
    "Cisco Packet Tracer",
    "REST APIs",
    "System Design",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "AWS Certified Cloud Practitioner (CLF-C02)",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "Udemy" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Certified Ethical Hacking (CEHv13)",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "Corvit" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Python Essentials 1 (PCEP)",
      credentialCategory: "Certification",
      recognizedBy: {
        "@type": "Organization",
        name: "Cisco Networking Academy",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Getting Started with Cisco Packet Tracer",
      credentialCategory: "Course",
      recognizedBy: {
        "@type": "Organization",
        name: "Cisco Networking Academy",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Prompt Engineering for AI Bootcamp",
      credentialCategory: "Course",
      recognizedBy: { "@type": "Organization", name: "Udemy" },
    },
  ],
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.facebook,
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ali Razzaq",
  url: siteConfig.url,
  author: { "@type": "Person", name: "Ali Razzaq" },
  inLanguage: "en",
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ali Razzaq — Full-Stack Software Development",
  description:
    "Independent full-stack development for SME and corporate clients — production marketing sites, internal tools, offline PWAs, AI integration, and SEO/performance work.",
  url: siteConfig.url,
  image: `${siteConfig.url}/ali.jpg`,
  email: siteConfig.email,
  provider: { "@type": "Person", name: "Ali Razzaq" },
  areaServed: [
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  serviceType: [
    "Marketing & E-commerce Web Development",
    "Internal Tools & Offline PWAs",
    "Full-Stack Web Applications",
    "AI Integration (Claude, OpenAI)",
    "SEO & Performance Engineering",
  ],
  sameAs: [
    siteConfig.social.github,
    siteConfig.social.linkedin,
    siteConfig.social.facebook,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="relative min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
