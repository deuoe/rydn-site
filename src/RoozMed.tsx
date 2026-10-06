/**
 * RoozMed — landing page for the paid IMAT / Italian medicine prep service.
 *
 * Phase 1: hero + 4 service cards + target-audience section + contact CTA.
 * Future phases will add pricing, Stripe checkout, question bank app, team,
 * testimonials, and translated versions. For now, this page lives at /med and
 * sits inside the shared Layout (navbar/footer) so the user can navigate back
 * to Youth or the gateway from here.
 *
 * Visual language: Italian tricolore. Green/white/red woven subtly into the
 * design — hero gradient, accent stripes, service icons. Deliberately feels
 * different from Youth so visitors immediately sense they're on a sister
 * brand, not just another section of RYDN.
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
  Mail,
  CheckCircle2,
} from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"

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
      "Structured, test-centric prep for the International Medical Admissions Test — the gateway exam for English-taught medicine in Italy.",
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
      "Personalised study plan — not a generic syllabus",
      "Direct messaging with your tutor between sessions",
    ],
    accent: "from-slate-700 to-slate-900",
  },
  {
    Icon: MessageSquare,
    title: "Admissions Consulting",
    body:
      "End-to-end guidance on the Italian application process — from university shortlisting to document legalisation, visa, and arrival.",
    bullets: [
      "University shortlist tailored to your score + budget",
      "Pre-enrollment paperwork review (Dichiarazione di Valore, visa, codice fiscale)",
      "First-year survival briefing before you fly",
    ],
    accent: "from-red-500 to-red-600",
  },
  {
    Icon: FileText,
    title: "Question Banks",
    body:
      "Thousands of IMAT-style practice questions with detailed explanations — the single most important resource after real past papers.",
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
    title: "Veterinary Medicine",
    blurb:
      "Dedicated vet programs for students pursuing veterinary careers through Italian universities.",
  },
]

export default function RoozMed() {
  // Deep-link hash scrolling: /med#services → smooth scroll to the services
  // section once the page has mounted. Lets the Navbar's "Services" link work
  // from any Med sub-page.
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      // Tiny delay so the page has painted before we scroll.
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
    }
  }, [hash])

  return (
    <>
      {/* =============================== HERO =============================== */}
      <section className="relative isolate -mt-20 pt-32 pb-24 overflow-hidden bg-slate-950">
        {/* Italian tricolore background wash — subtle */}
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

            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Your path to{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-white to-red-400 bg-clip-text text-transparent">
                Italian medicine.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Expert IMAT preparation, 1-on-1 tutoring, admissions consulting,
              and curated question banks — for students aiming at medicine,
              dentistry, and veterinary school in Italy.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="mailto:med@rydn.ca?subject=RooZ Med — I'm interested"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Mail size={18} />
                Get started
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 text-white px-7 py-3.5 font-semibold transition"
              >
                See what we offer
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Taught in English
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Globally recognised degrees
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Expert tutors & consultants
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* =============================== SERVICES =============================== */}
      <section id="services" className="py-20 bg-white dark:bg-slate-900">
        <Container>
          <Heading
            eyebrow="What we offer"
            text="Everything you need, in one place."
          />
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Whether you're starting from scratch or two months out from the
            IMAT, our team meets you where you are.
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
            The IMAT opens doors to multiple healthcare paths in Italy — all
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

      {/* =============================== CTA =============================== */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold border border-white/20">
              <Sparkles size={13} className="text-amber-300" />
              Ready to start?
            </span>
            <h2 className="font-display mt-6 text-4xl sm:text-5xl font-semibold tracking-tight">
              Let's build your IMAT plan.
            </h2>
            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              Tell us where you're starting from — we'll put together a free
              strategy call to map your path to Italian medicine.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="mailto:med@rydn.ca?subject=RooZ Med — I'd like to book a free strategy call"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Mail size={18} />
                Email med@rydn.ca
              </a>
              {/* Uses native RouterLink (not the brand-aware Link) so this
                  escapes the Med brand and goes to the actual gateway. */}
              <RouterLink
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 px-8 py-4 font-semibold transition"
              >
                <ArrowRight size={16} className="rotate-180" />
                Back to RooZ
              </RouterLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
