import { Opportunity } from "./types";

// Placeholder data: fake but representative, used until the FastAPI + Supabase
// backend is wired up. See PRODUCT.md "Evidence on Hand" — do not treat as real.
export const mockOpportunities: Opportunity[] = [
  {
    slug: "neom-ai-hackathon-2026",
    title: "NEOM AI Hackathon",
    organizer: "NEOM Tech & Digital",
    type: "hackathon",
    tags: ["AI", "Onsite", "Riyadh"],
    deadline: "2026-09-08",
    applyUrl: "https://example.com/neom-ai-hackathon",
    description:
      "A 48-hour hackathon focused on applied AI solutions for smart city infrastructure. Open to undergraduate and graduate students across Saudi universities. Teams of 2-5. Travel and accommodation covered for finalists.",
    lastVerifiedAt: "2026-09-01",
  },
  {
    slug: "stc-summer-internship-2027",
    title: "Summer Software Engineering Internship",
    organizer: "stc",
    type: "internship",
    tags: ["Internship", "Backend", "Riyadh"],
    deadline: "2026-09-10",
    applyUrl: "https://example.com/stc-internship",
    description:
      "12-week paid internship on stc's backend platform team. Open to Saudi nationals in their final two years of a Computer Science or related degree. Remote-friendly with two required onsite weeks.",
    lastVerifiedAt: "2026-08-29",
  },
  {
    slug: "misk-fullstack-bootcamp-cohort-9",
    title: "Full-Stack Web Development Bootcamp — Cohort 9",
    organizer: "Misk Academy",
    type: "bootcamp",
    tags: ["Bootcamp", "Web", "Remote"],
    deadline: "2026-09-20",
    applyUrl: "https://example.com/misk-fullstack-cohort-9",
    description:
      "16-week intensive bootcamp covering React, Node.js, and PostgreSQL. Free for accepted applicants, stipend provided. No prior professional experience required, but basic programming knowledge is expected.",
    lastVerifiedAt: "2026-09-02",
  },
  {
    slug: "sdaia-datathon-2026",
    title: "National Datathon",
    organizer: "SDAIA",
    type: "competition",
    tags: ["Data Science", "Onsite", "Jeddah"],
    deadline: "2026-09-30",
    applyUrl: "https://example.com/sdaia-datathon",
    description:
      "A national data science competition on public-sector open datasets. Cash prizes for the top three teams. Open to all currently enrolled university students, individual or team entries up to 4 people.",
    lastVerifiedAt: "2026-08-25",
  },
  {
    slug: "aramco-digital-fellowship-2027",
    title: "Aramco Digital Fellowship",
    organizer: "Aramco Digital",
    type: "program",
    tags: ["Fellowship", "Cloud", "Dhahran"],
    deadline: "2026-10-05",
    applyUrl: "https://example.com/aramco-digital-fellowship",
    description:
      "A 6-month fellowship pairing recent graduates with senior engineers on cloud infrastructure projects. Includes a mentorship track and a guaranteed final interview for full-time roles.",
    lastVerifiedAt: "2026-08-30",
  },
  {
    slug: "garage-startup-weekend-neom",
    title: "Startup Weekend NEOM",
    organizer: "Techstars",
    type: "hackathon",
    tags: ["Entrepreneurship", "Onsite", "NEOM"],
    deadline: "2026-10-12",
    applyUrl: "https://example.com/startup-weekend-neom",
    description:
      "54 hours to go from idea to pitch. Mentors from regional VC firms on site. Open to students and fresh graduates with no prior startup experience required.",
    lastVerifiedAt: "2026-08-20",
  },
  {
    slug: "hp-cybersecurity-camp-2026",
    title: "Cybersecurity Winter Camp",
    organizer: "HP Saudi Arabia",
    type: "bootcamp",
    tags: ["Security", "Onsite", "Riyadh"],
    deadline: "2026-11-01",
    applyUrl: "https://example.com/hp-cybersecurity-camp",
    description:
      "One-week intensive on network security fundamentals and CTF-style exercises. Laptops provided on site. Priority given to students who have completed an introductory networking course.",
    lastVerifiedAt: "2026-08-15",
  },
  {
    slug: "monsha-at-product-internship-2027",
    title: "Product Management Internship",
    organizer: "Monsha'at",
    type: "internship",
    tags: ["Internship", "Product", "Remote"],
    deadline: "2026-11-15",
    applyUrl: "https://example.com/monshaat-product-internship",
    description:
      "10-week remote internship supporting the product team on SME-focused digital services. Open to students in any major with strong written communication skills in Arabic and English.",
    lastVerifiedAt: "2026-08-22",
  },
];
