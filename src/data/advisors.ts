/**
 * Advisor registry — single source of truth.
 *
 * Both the homepage grid and the individual advisor detail pages
 * (/advisors/:slug) import from here, so adding a new advisor or
 * updating their info only needs to happen in one place.
 */

import type { UniversityKey } from "./universities"

// Photos
import leoUrl from "../assets/images/Leo.jpg"
import saharUrl from "../assets/images/Sahar.jpeg"
import saraUrl from "../assets/images/Sara.jpg"
import sinaUrl from "../assets/images/Sina.jpeg"
import sadafUrl from "../assets/images/Sadaf.jpg"
import heliaUrl from "../assets/images/Helia.jpg"
import iliyaUrl from "../assets/images/Iliya.jpg"
import jenniferUrl from "../assets/images/Jennifer.jpeg"
import tinaUrl from "../assets/images/Tina.jpg"
import valentinaUrl from "../assets/images/Valentina.jpg"
import saracUrl from "../assets/images/SaraC.jpg"
import imanUrl from "../assets/images/Iman.png"
import pardisUrl from "../assets/images/Pardis.jpg"
import mahanUrl from "../assets/images/Mahan.png"

export type Category =
  | "preMed"
  | "sciences"
  | "preLaw"
  | "business"
  | "arts"
  | "language"
  | "psychNeuro"
  | "pharmacy"
  | "sports"
  | "it"
  | "gameDev"
  | "gaming"

export type Advisor = {
  /** URL slug — used in /advisors/<slug>. Keep lowercase and hyphenated. */
  slug: string
  /** Full display name */
  name: string
  /** Photo asset */
  photo: string
  /** Short tagline shown on the card */
  description: string
  /** Optional staff/role title (e.g. "Educational Programs Coordinator") shown
   *  as a distinct pill in addition to the generic "RYDN Advisor" badge. Use for
   *  advisors who also hold an operational role at RYDN. */
  title?: string
  /** Long-form bio shown on the advisor detail page. Markdown-style paragraphs. */
  bio?: string[]
  /** Topics the advisor specializes in */
  advisingTopics: string[]
  /** Appointlet/Outlook booking URL. Absent = "booking soon" */
  bookingLink?: string
  /** Filter categories — controls which homepage filter chip shows them */
  categories: Category[]
  /** Universities the advisor has attended (in chronological order) */
  universities?: UniversityKey[]
}

export const ADVISORS: Advisor[] = [
  {
    slug: "ilia",
    name: "Ilia",
    photo: leoUrl,
    description: "Bachelor of Commerce student",
    advisingTopics: ["Information Technology", "Soccer", "Business"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/WDGqbdBASEKfJ4bfCfkoEQ2",
    categories: ["business", "it", "sports"],
    universities: ["yorku"],
  },
  {
    slug: "sahar",
    name: "Sahar",
    photo: saharUrl,
    description: "Bachelor of Arts student",
    advisingTopics: ["Psychology", "Political science", "LSAT preparation", "University applications"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/PaIUazNXTkqwJRQDQA9Rqg2",
    categories: ["preLaw", "psychNeuro"],
    universities: ["yorku"],
  },
  {
    slug: "sara-roozbahani",
    name: "Sara Roozbahani",
    photo: saraUrl,
    description: "Bachelor of Science student",
    advisingTopics: ["Pre-med advising", "MCAT", "Research", "University applications", "Psychology", "Study strategies"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/p_MxjUFix02viC9r-uO9Pg2",
    categories: ["preMed", "psychNeuro"],
    universities: ["seneca", "yorku"],
  },
  {
    slug: "sam-sina",
    name: "Sam Sina",
    photo: sinaUrl,
    description: "Bachelor of Science student",
    advisingTopics: ["Biomedical Sciences", "Research and Article", "Tutoring", "Pharmacy School"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/9b_p31eCcEyWYRkSozwUhw2?ismsaljsauthenabled",
    categories: ["sciences", "pharmacy"],
    universities: ["guilan", "georgebrown", "yorku"],
    bio: [
      "Sam co-founded RYDN after navigating the academic journey from Iran to Canada — first at the University of Guilan, then George Brown Polytechnic, and now Biomedical Sciences at York University. He's lived the international student path that most newcomer families are trying to figure out.",
      "Day to day, Sam leads operations and the technology that powers RYDN's advising platform — including the AI matchmaker, multilingual support, and partnerships with Canadian schools. He's also the person quietly answering messages on weekends.",
      "If you're a newcomer family, a high school student weighing pre-med vs. pharmacy, or anyone navigating university transfers, Sam has been there. Book a session — sessions are free and 1-on-1.",
    ],
  },
  {
    slug: "sadaf",
    name: "Sadaf",
    photo: sadafUrl,
    description: "Bachelor of Science student",
    title: "Educational Programs Coordinator",
    advisingTopics: ["Biomedical Science", "DAT Preparation", "Pre-dent Advising"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/ynxd7Kn3y0esoVFbvnpfMw2",
    categories: ["sciences"],
    universities: ["torontomu"],
    bio: [
      "Sadaf is a Biomedical Science student at Toronto Metropolitan University (TMU) — but her path there started somewhere most students haven't been: the dental chair. Before returning to school, she worked as a licensed dental hygienist for two years, treating patients hands-on and living what a career in oral health actually looks like day to day.",
      "At RYDN she serves as our Educational Programs Coordinator, helping design the workshops, study resources, and academic content that reach students across Canada. She brings the same organized, student-first energy to her 1-on-1 advising sessions — and she's genuinely one of the most driven people on the team.",
      "If you're weighing pre-med against pre-dental, wondering whether a dental hygiene diploma is worth it before university, prepping for the DAT, or trying to figure out how clinical experience factors into a competitive application — Sadaf has actually done both sides of it. Book a free session and ask her anything.",
    ],
  },
  {
    slug: "helia",
    name: "Helia",
    photo: heliaUrl,
    description: "Bachelor of Science student",
    advisingTopics: ["Neuroscience", "MCAT Preparation", "Pre-med Advising"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/QLxjEWE6a0Chv3L9I-xj9g2",
    categories: ["preMed", "psychNeuro"],
    universities: ["yorku"],
  },
  {
    slug: "iliya",
    name: "Iliya",
    photo: iliyaUrl,
    description: "Bachelor of Science student",
    advisingTopics: ["Biomedical Science", "Pre-med Advising", "Personal training/fitness"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/z32K193SL0OAEB-b9HfH6Q2",
    categories: ["preMed", "sports"],
    universities: ["yorku"],
  },
  {
    slug: "jennifer",
    name: "Jennifer",
    photo: jenniferUrl,
    description: "Nursing student",
    advisingTopics: ["Nursing", "Studying strategies"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/vJPCy85x_kC5W0yDNMEIow2",
    categories: ["sciences"],
    universities: ["seneca"],
  },
  {
    slug: "tina",
    name: "Tina",
    photo: tinaUrl,
    description: "Bachelor of Science student",
    advisingTopics: ["Pre-med advising", "Biomedical Science"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/zRAFcE2eLEGuWGtMwvxucA2",
    categories: ["preMed"],
    universities: ["yorku"],
  },
  {
    slug: "valentina",
    name: "Valentina",
    photo: valentinaUrl,
    description: "Bachelor of Science student",
    advisingTopics: ["Psychology", "French", "Biology", "Research", "Academic Exchange"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/E08RGS0aKUK55tj_wj7zYQ2",
    categories: ["sciences", "language", "psychNeuro"],
    universities: ["yorku"],
  },
  {
    slug: "iman",
    name: "Iman",
    photo: imanUrl,
    description: "Bachelor of Arts student",
    advisingTopics: ["Psychology", "Game Development"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/Nl-k9rS70EiUi53ylFUU5A2",
    categories: ["psychNeuro", "gameDev"],
    universities: ["yorku"],
  },
  {
    slug: "pardis",
    name: "Pardis",
    photo: pardisUrl,
    description: "Bachelor of Science student",
    advisingTopics: ["Health Sciences", "Pre-med", "BC med schools", "Uni/life balance", "study strategies"],
    bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/CTebHrhEMUeIKIhiR3JVGA2",
    categories: ["preMed", "sciences"],
    universities: ["sfu"],
  },
  {
    slug: "mahan",
    name: "Mahan",
    photo: mahanUrl,
    description: "Health Sciences student",
    advisingTopics: ["Health Sciences", "University Applications", "Pre-med advising"],
    categories: ["preMed", "sciences"],
    universities: ["utoronto"],
  },
  {
    slug: "sara-arts",
    name: "Sara",
    photo: saracUrl,
    description: "Bachelor of Arts student",
    advisingTopics: ["History", "English", "Nutrition", "Fitness training"],
    categories: ["arts", "sports"],
    universities: ["georgebrown", "yorku"],
  },
]

/** Look up an advisor by their slug. Returns undefined if not found. */
export function getAdvisorBySlug(slug: string): Advisor | undefined {
  return ADVISORS.find((a) => a.slug === slug)
}
