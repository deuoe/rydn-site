import { motion } from "motion/react"
import { Mail, Phone, Newspaper, Quote, Download, Copy, ExternalLink, Users, Globe, Award } from "lucide-react"
import { useState } from "react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import SkeletonImage from "./components/SkeletonImage"
import { Link } from "./i18n/Link"
import saraUrl from "./assets/images/Sara.jpg"
import sinaUrl from "./assets/images/Sina.jpeg"
import logoUrl from "./assets/images/logo.jpeg"

/**
 * /press — public press & media kit page.
 *
 * Designed to be copy-pastable by a journalist on deadline. Includes:
 *  - One-line, one-paragraph, and long-form descriptions
 *  - Quick stats
 *  - Founder snapshot with photos
 *  - Downloadable assets
 *  - Placeholder section for press coverage (filled in as it accumulates)
 *  - Press contact + boilerplate copy with a "Copy" button
 */

const QUICK_FACTS = [
  { label: "Founded", value: "2024" },
  { label: "Status", value: "Registered Canadian nonprofit" },
  { label: "Reach", value: "Canada + international students" },
  { label: "Languages", value: "EN · FR · ES · فارسی · עברית" },
  { label: "Universities", value: "York · U of T · McMaster · TMU · Seneca · George Brown · SFU" },
  { label: "Services", value: "Free 1-on-1 advising, workshops, AI matchmaker" },
  { label: "UN SDG alignment", value: "Goals 4, 5, 10, 17" },
  { label: "Pricing", value: "100% free for students. Always." },
]

const FOUNDERS = [
  {
    name: "Sara Roozbahani",
    role: "Co-founder & Executive Director",
    photo: saraUrl,
  },
  {
    name: "Sam Sina Ansari Movahed",
    role: "Co-founder & Director of Operations & Technology",
    photo: sinaUrl,
  },
]

const BOILERPLATE_SHORT =
  "RYDN (RooZ Youth Development Network) is a registered Canadian nonprofit that connects high school and CEGEP students with university-aged advisors for free 1-on-1 sessions, workshops, and an AI-powered advisor matchmaker. Services are multilingual (English, French, Spanish, Persian, Hebrew) and free for every student."

const BOILERPLATE_LONG =
  "RYDN (RooZ Youth Development Network) is a registered Canadian nonprofit founded in 2024 to make academic and career advising accessible to every student, regardless of background or income. The organization connects high school and early-university students with advisors who are only 2–3 years ahead of them academically — students at York University, the University of Toronto, McMaster, Toronto Metropolitan University, Seneca, George Brown, Simon Fraser, and beyond. All services are free, multilingual, and delivered through 1-on-1 advising sessions, group workshops, and an AI-powered advisor matchmaker available in five languages. RYDN is aligned with four UN Sustainable Development Goals (Quality Education, Gender Equality, Reduced Inequalities, and Partnerships for the Goals) and partners with school boards and community organizations across Ontario and beyond."

export default function Press() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copy = async (text: string, key: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch {
      /* user denied clipboard — fine */
    }
  }

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl animate-float" />
        <div
          className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-500/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Newspaper size={14} className="text-amber-300" />
              For journalists & media
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Press & Media Kit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Everything you need to write about RYDN — quick facts, founder bios, logos, and
              ready-to-quote language. Email <a className="underline hover:text-amber-300" href="mailto:info@rydn.ca">info@rydn.ca</a> for interviews or background.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ===================== QUICK FACTS ===================== */}
      <section className="py-16">
        <Container>
          <Heading eyebrow="At a glance" text="Quick facts" />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {QUICK_FACTS.map((fact) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {fact.label}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">{fact.value}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== BOILERPLATE COPY ===================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <Heading eyebrow="Description" text="Ready-to-quote copy" />
          <p className="mt-6 max-w-3xl mx-auto text-center text-slate-600 leading-relaxed">
            Use these verbatim. They've been fact-checked and approved by the RYDN board.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Quote size={18} className="text-sky-600" />
                  One-line description
                </h3>
                <button
                  onClick={() =>
                    copy(
                      "RYDN is a Canadian nonprofit that connects students with free 1-on-1 advisors only 2-3 years ahead of them.",
                      "oneline"
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 px-3 py-1.5 text-xs font-semibold transition"
                >
                  <Copy size={12} />
                  {copiedKey === "oneline" ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-slate-700 italic leading-relaxed">
                "RYDN is a Canadian nonprofit that connects students with free 1-on-1 advisors only
                2–3 years ahead of them."
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Quote size={18} className="text-sky-600" />
                  Short paragraph
                </h3>
                <button
                  onClick={() => copy(BOILERPLATE_SHORT, "short")}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 px-3 py-1.5 text-xs font-semibold transition"
                >
                  <Copy size={12} />
                  {copiedKey === "short" ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{BOILERPLATE_SHORT}</p>
            </div>

            <div className="md:col-span-2 rounded-3xl bg-white border border-slate-200 p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Quote size={18} className="text-sky-600" />
                  Long-form boilerplate
                </h3>
                <button
                  onClick={() => copy(BOILERPLATE_LONG, "long")}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 hover:bg-sky-50 hover:text-sky-700 px-3 py-1.5 text-xs font-semibold transition"
                >
                  <Copy size={12} />
                  {copiedKey === "long" ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed">{BOILERPLATE_LONG}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== FOUNDERS ===================== */}
      <section className="py-16">
        <Container>
          <Heading eyebrow="Founders" text="Available for interviews" />
          <p className="mt-6 max-w-3xl mx-auto text-center text-slate-600 leading-relaxed">
            Both founders are available for interviews on topics including international student
            experiences, multilingual mentorship, nonprofit operations, and AI in education.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {FOUNDERS.map((founder) => (
              <div
                key={founder.name}
                className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm flex flex-col items-center text-center"
              >
                <SkeletonImage
                  src={founder.photo}
                  alt={founder.name}
                  shape="rounded-full"
                  className="h-32 w-32 ring-4 ring-slate-100 shadow-md"
                />
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-sky-700">{founder.role}</p>
                <a
                  href="mailto:info@rydn.ca?subject=Press inquiry"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-sky-600 transition"
                >
                  <Mail size={14} />
                  Request interview
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            Full board bios available on the{" "}
            <Link to="/governance" className="text-sky-700 hover:underline font-semibold">
              Governance page
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* ===================== ASSETS / DOWNLOADS ===================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <Heading eyebrow="Downloads" text="Logos, photos & assets" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm flex flex-col">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200">
                <img src={logoUrl} alt="RYDN logo" className="h-10 w-auto" />
              </div>
              <h3 className="font-bold text-slate-900">RYDN logo</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                Right-click → "Save Image As" to download the primary logo.
              </p>
              <a
                href={logoUrl}
                download="RYDN_logo.jpg"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sky-600 transition"
              >
                <Download size={14} />
                Download logo
              </a>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm flex flex-col">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                <Users size={22} className="text-emerald-700" />
              </div>
              <h3 className="font-bold text-slate-900">Founder headshots</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                High-resolution photos of Sara Roozbahani and Sam Sina Ansari Movahed available on
                request.
              </p>
              <a
                href="mailto:info@rydn.ca?subject=Press: founder photos request"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sky-600 transition"
              >
                <Mail size={14} />
                Request photos
              </a>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm flex flex-col">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <Award size={22} className="text-indigo-700" />
              </div>
              <h3 className="font-bold text-slate-900">UN SDG alignment one-pager</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                Single-page PDF mapping RYDN's work to the four UN Sustainable Development Goals.
              </p>
              <a
                href="/rydn_sdg_alignment.pdf"
                download
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sky-600 transition"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== COVERAGE PLACEHOLDER ===================== */}
      <section className="py-16">
        <Container>
          <Heading eyebrow="In the news" text="RYDN coverage" />

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-10 text-center">
              <Newspaper size={36} className="mx-auto text-slate-400" />
              <p className="mt-4 text-slate-600 leading-relaxed">
                RYDN is a young organization — press coverage will appear here as it lands. If
                you're a journalist covering education, youth mentorship, immigration & newcomers,
                Canadian nonprofits, or international students, we'd love to talk.
              </p>
              <a
                href="mailto:info@rydn.ca?subject=Press inquiry"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-600 text-white px-6 py-3 text-sm font-semibold hover:bg-sky-700 transition"
              >
                <Mail size={14} />
                Pitch us a story
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 p-10 md:p-14 text-center text-white max-w-4xl mx-auto"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

            <Globe size={36} className="mx-auto text-amber-300 relative" />
            <h2 className="font-display mt-6 text-3xl md:text-4xl font-semibold relative">
              Press inquiries
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/85 leading-relaxed relative">
              For interviews, quotes, photos, fact-checking, or background on any RYDN topic.
              We respond within two business days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              <a
                href="mailto:info@rydn.ca?subject=Press inquiry"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-sky-50 transition"
              >
                <Mail size={16} />
                info@rydn.ca
              </a>
              <a
                href="tel:+16474983938"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                <Phone size={16} />
                (647) 498-3938
              </a>
              <a
                href="https://rydn.ca"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                <ExternalLink size={16} />
                rydn.ca
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
