/**
 * RoozMed, landing page for the paid IMAT / Italian medicine prep service.
 *
 * Phase 1 structure:
 *   1. Hero with the new "from first IMAT question to first day in Italy" copy
 *   2. The interactive Plan Builder wizard, the star of the page
 *   3. Service breakdown (what each plan can include)
 *   4. Program paths (medicine / dentistry / pharmacy)
 *   5. Free consultation CTA with mystery-gift framing
 *
 * Future phases will add pricing, Stripe checkout, question bank app, team,
 * testimonials, and translated versions. For now, this page lives at /med and
 * sits inside the shared Layout (brand-aware Navbar + Footer) so visitors can
 * navigate back to Youth or the gateway from here.
 *
 * Visual language: Italian tricolore. Green / white / red woven subtly into
 * the design, hero gradient, accent stripes, service icons. Deliberately
 * feels different from Youth so visitors immediately sense they're on a
 * sister brand, not just another section of RYDN.
 */
import { useEffect } from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { motion } from "motion/react"
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  Stethoscope,
  CheckCircle2,
  Gift,
  Calendar,
} from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import RoozPlanBuilder from "./components/RoozPlanBuilder"

type ServiceCard = {
  Icon: typeof BookOpen
  title: string
  body: string
  bullets: string[]
  accent: string
}

const SERVICES: ServiceCard[] = [
  {
    Icon: BookOpen,
    title: "IMAT Preparation",
    body:
      "Structured, test-centric prep for the International Medical Admissions Test, the gateway exam for English-taught medicine in Italy.",
    bullets: [
      "Full-syllabus coverage: biology, chemistry, physics, maths, logic",
      "Weekly timed mocks with full score breakdowns",
      "Up-to-date for the current test year",
    ],
    accent: "from-emerald-500 to-emerald-600",
  },
  {
    Icon: Users,
    title: "1-on-1 Tutoring",
    body:
      "Private sessions with instructors who've scored in the top percentile on the IMAT and currently study or teach at Italian medical universities.",
    bullets: [
      "Flexible scheduling across time zones",
      "Personalised study plan, not a generic syllabus",
      "Direct messaging with your tutor between sessions",
    ],
    accent: "from-slate-700 to-slate-900",
  },
  {
    Icon: MessageSquare,
    title: "Admissions Consulting",
    body:
      "End-to-end guidance on the Italian application process, from university shortlisting to document legalisation, visa, and arrival.",
    bullets: [
      "University shortlist tailored to your score and budget",
      "Pre-enrollment paperwork review (Dichiarazione di Valore, visa, codice fiscale)",
      "First-year survival briefing before you fly",
    ],
    accent: "from-red-500 to-red-600",
  },
  {
    Icon: FileText,
    title: "Question Banks",
    body:
      "Thousands of IMAT-style practice questions with detailed explanations, the single most important resource after real past papers.",
    bullets: [
      "Topic-tagged for targeted drilling",
      "Difficulty tiers from beginner to IMAT-exam-level",
      "Real past-paper archive with video walkthroughs",
    ],
    accent: "from-amber-500 to-orange-600",
  },
]

type ProgramPath = {
  Icon: typeof Stethoscope
  title: string
  blurb: string
}

const PROGRAMS: ProgramPath[] = [
  {
    Icon: Stethoscope,
    title: "Medicine (Medicina e Chirurgia)",
    blurb:
      "6-year English-taught MD programs at top Italian universities. The classic IMAT path.",
  },
  {
    Icon: Users,
    title: "Dentistry (Odontoiatria)",
    blurb:
      "6-year English-taught dental programs through the same IMAT application cycle.",
  },
  {
    Icon: BookOpen,
    title: "Pharmacy (Farmacia)",
    blurb:
      "Pharmacy programs in Italian universities for students pursuing clinical and research careers.",
  },
]

export default function RoozMed() {
  // Deep-link hash scrolling: /med#plan-builder, /med#services, etc.
  // Lets the Navbar and in-page CTAs scroll to the right section on mount.
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
    }
  }, [hash])

  return (
    <>
      {/* =============================== HERO =============================== */}
      <section className="relative isolate -mt-20 pt-32 pb-24 overflow-hidden bg-slate-950">
        {/* Italian tricolore background wash, subtle */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-emerald-500/30 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-red-500/25 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="grain -z-10" />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Italian tricolore eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <span className="inline-flex gap-0.5">
                <span className="h-3 w-1 rounded-sm bg-emerald-500" />
                <span className="h-3 w-1 rounded-sm bg-white" />
                <span className="h-3 w-1 rounded-sm bg-red-500" />
              </span>
              Italian medical school admissions
            </span>

            <h1 className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.1]">
              From your first IMAT question
              <br />
              to your first day in{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-white to-red-400 bg-clip-text text-transparent">
                Italy, and beyond.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Coaching, tutoring, study resources, and English and Italian language
              support, all in one place from 75+ IMAT scorers.
            </p>

            {/* Signature phrase, the moment of brand reveal. The subtle italic
                footnote is the only time we spell out the pun; after this,
                "Med Due." stands on its own as a signature mark. */}
            <div className="mt-8 inline-flex flex-col gap-1">
              <p className="font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] text-white">
                MED <span className="bg-gradient-to-r from-emerald-400 via-white to-red-400 bg-clip-text text-transparent">DUE.</span>
              </p>
              <p className="text-xs sm:text-sm text-white/55 italic">
                It's due. (And in Italian, "due" means two.)
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#plan-builder"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Sparkles size={18} />
                Build my plan
              </a>
              <a
                href="#free-consultation"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 text-white px-7 py-3.5 font-semibold transition"
              >
                Free consultation
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                75+ IMAT scorers on the team
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Taught in English
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Globally recognised degrees
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* =============================== PLAN BUILDER (the star) =============================== */}
      <RoozPlanBuilder id="plan-builder" />

      {/* =============================== SERVICES =============================== */}
      <section id="services" className="py-20 bg-white dark:bg-slate-900">
        <Container>
          <Heading
            eyebrow="What's inside"
            text="Everything you need, in one place."
          />
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Whether you're starting from scratch or two months out from the IMAT,
            your plan can include any combination of these.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition p-8"
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-lg`}
                >
                  <s.Icon size={26} />
                </div>
                <h3 className="font-display mt-5 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {s.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.body}
                </p>
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-500"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* =============================== PROGRAM PATHS =============================== */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <Container>
          <Heading
            eyebrow="Who it's for"
            text="Three programs. One admissions cycle."
          />
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            The IMAT opens doors to multiple healthcare paths in Italy, all
            delivered in English, all leading to internationally recognised
            qualifications.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROGRAMS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition p-8 text-center"
              >
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-white to-red-500 text-slate-900 shadow-md">
                  <p.Icon size={26} />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {p.title}
                </h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {p.blurb}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* =============================== FREE CONSULTATION CTA =============================== */}
      <section
        id="free-consultation"
        className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white"
      >
        {/* Subtle animated glow in the background */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-1/4 h-96 bg-emerald-500/10 blur-3xl -z-10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <Gift size={13} />
              Mystery gift inside
            </span>
            <h2 className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Book your free
              <br />
              initial consultation.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-white/85 leading-relaxed">
              Book and attend your free initial consultation to receive a mystery
              gift valued at{" "}
              <span className="font-bold text-amber-300">$3,000</span>.
            </p>
            <p className="mt-3 text-base text-white/70">
              Tell us your time zone and the best times to meet, we'll confirm a
              slot that works for you within one business day.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:med@rydn.ca?subject=RooZ Med: Free initial consultation&body=Hi RooZ Med team,%0D%0A%0D%0AI'd like to book a free initial consultation.%0D%0A%0D%0AMy time zone: %0D%0ABest times to meet: %0D%0AWhat I'm preparing for (medicine / dentistry / pharmacy): %0D%0A%0D%0AThanks!"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Calendar size={18} />
                Book my consultation
              </a>
              <a
                href="#plan-builder"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 px-8 py-4 font-semibold transition"
              >
                <Sparkles size={16} />
                Build my plan first
              </a>
            </div>

            {/* Trust footer under the CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                No obligation
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                1-on-1 with a RooZ advisor
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                30 minutes
              </span>
            </div>

            {/* Med Due signature as section-end punctuation */}
            <p className="mt-10 text-xs tracking-[0.25em] uppercase text-white/40">
              Med Due.
            </p>

            {/* Switch brand escape hatch, native RouterLink */}
            <div className="mt-12">
              <RouterLink
                to="/"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition"
              >
                <ArrowRight size={14} className="rotate-180" />
                Back to RooZ
              </RouterLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
