import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Sparkles, ArrowRight, Calendar, Quote, GraduationCap, Stethoscope, Scale, FlaskConical, Briefcase, Brain, ImageIcon } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import { useTranslation } from "./i18n/useTranslation"

type Story = {
  studentName: string
  initials: string
  role: string
  outcome: string
  pull: string // Pull quote
  body: string
  Icon: typeof GraduationCap
  gradient: string
  topic: string
}

// TODO: Replace with real student stories (with their permission). Each
// story should ideally have: a photo, a name (or initials with permission),
// the path they were exploring, what they did with RYDN, and the outcome.
const STORIES: Story[] = [
  {
    studentName: "Maya K.",
    initials: "MK",
    role: "Now: First-year pre-med",
    outcome: "Accepted to UofT Life Sciences",
    pull: "I thought I had to figure it all out alone.",
    body: "Maya came to RYDN unsure whether to apply for life sciences or commerce. After three sessions with Sara, she had a written-out application timeline, a clearer reason for choosing pre-med, and a study plan for the MCAT.",
    Icon: Stethoscope,
    gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    topic: "Pre-med",
  },
  {
    studentName: "Daniel R.",
    initials: "DR",
    role: "Grade 12 → University of Western Ontario",
    outcome: "Accepted to law combined program",
    pull: "Sahar walked me through every line of my personal statement.",
    body: "Daniel was set on law school but didn't know how to write a personal statement that stood out. Working with Sahar, who had just gone through the LSAT, he rewrote his essay three times and got into his top choice.",
    Icon: Scale,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    topic: "Pre-law",
  },
  {
    studentName: "Aria S.",
    initials: "AS",
    role: "Grade 11 student",
    outcome: "Switched intended major after one workshop",
    pull: "I realized I'd been chasing the wrong thing.",
    body: "Aria attended RYDN's career exploration workshop thinking she wanted dentistry. By the end she'd discovered biomedical research — and a year later she's running a small lab project at her high school.",
    Icon: FlaskConical,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    topic: "Career exploration",
  },
  {
    studentName: "Liam T.",
    initials: "LT",
    role: "First-year university",
    outcome: "Built confidence through 1-on-1 sessions",
    pull: "I thought I was behind. Turns out I was on track.",
    body: "Liam felt overwhelmed in his first semester. RYDN paired him with a third-year student in the same program. Two sessions in, he had a study system, friends from the program, and a research opportunity.",
    Icon: Brain,
    gradient: "from-sky-400 via-indigo-500 to-violet-600",
    topic: "University transition",
  },
  {
    studentName: "Priya N.",
    initials: "PN",
    role: "Grade 12 → Pharmacy",
    outcome: "Got into U of Toronto Pharmacy direct-entry",
    pull: "I needed someone who'd just been through it.",
    body: "Priya wanted pharmacy but couldn't find anyone who could explain what the application actually looked like in 2025. Helia had just done it — she walked Priya through every form, every reference, every interview question.",
    Icon: GraduationCap,
    gradient: "from-violet-400 via-purple-500 to-pink-500",
    topic: "Health professions",
  },
  {
    studentName: "Owen P.",
    initials: "OP",
    role: "Grade 12 student",
    outcome: "Decided on commerce + co-op pathway",
    pull: "I came in confused about everything.",
    body: "Owen had no idea what to study. After a workshop and two advising sessions, he had narrowed it to commerce, picked Western for the co-op, and started a side project to put on his resume.",
    Icon: Briefcase,
    gradient: "from-slate-500 via-slate-700 to-slate-900",
    topic: "Business",
  },
]

const IMPACT_STATS = [
  { value: "25+", label: "Student advisors", desc: "across Canada" },
  { value: "11+", label: "Areas of advising", desc: "from medicine to law to arts" },
  { value: "7", label: "Workshops scheduled", desc: "for 2026 alone" },
  { value: "3", label: "Languages supported", desc: "EN · FR · ES" },
  { value: "100%", label: "Free for students", desc: "always" },
  { value: "0", label: "Barriers to access", desc: "no fees, no gatekeeping" },
]

function StoryCard({ s, idx }: { s: Story; idx: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.06 }}
      viewport={{ once: true }}
      className="group card-ring rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col"
    >
      {/* Photo placeholder zone — gradient + icon + initials, ready for a real photo later */}
      <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${s.gradient}`}>
        <div className="absolute inset-0 grain opacity-20" />
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />

        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur">
              <s.Icon size={12} />
              {s.topic}
            </span>
            {/* Photo placeholder pictogram - subtle hint that a photo could go here */}
            <span className="opacity-30" title="Photo placeholder">
              <ImageIcon size={16} />
            </span>
          </div>

          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur font-bold mb-3">
              {s.initials}
            </div>
            <h3 className="font-display text-2xl font-semibold leading-tight">{s.studentName}</h3>
            <p className="mt-1 text-sm text-white/85">{s.role}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <Quote size={20} className="text-slate-200 mb-2" aria-hidden />
        <p className="font-display text-lg text-slate-900 leading-snug">"{s.pull}"</p>
        <p className="mt-4 text-slate-600 leading-relaxed text-sm flex-1">{s.body}</p>

        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{s.outcome}</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Stories() {
  const { t } = useTranslation()

  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-rose-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -right-20 -z-10 h-96 w-96 rounded-full bg-rose-500/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              {t("stories.eyebrow")}
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              {t("stories.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              {t("stories.lede")}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* IMPACT STATS */}
      <section className="py-20">
        <Container>
          <Heading eyebrow={t("stories.impactTitle")} text={t("stories.impactSubtitle")} />

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {IMPACT_STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-br from-sky-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="mt-3 text-sm md:text-base font-bold text-slate-900">{s.label}</p>
                <p className="mt-1 text-xs md:text-sm text-slate-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED STORIES */}
      <section className="py-20 bg-rydn-mesh">
        <Container>
          <Heading eyebrow={t("stories.journeysTitle")} text={t("stories.journeysSubtitle")} />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORIES.map((s, i) => (
              <StoryCard key={i} s={s} idx={i} />
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-slate-400 italic">
            Names and photos shown above are placeholders pending real student approvals. Real stories coming soon.
          </p>
        </Container>
      </section>

      {/* CLOSING CTA */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 px-8 py-14 md:px-14 md:py-16 text-center text-white"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
            <Sparkles size={40} className="mx-auto text-amber-300 relative" />
            <h2 className="font-display mt-6 text-3xl md:text-5xl font-semibold leading-tight relative max-w-3xl mx-auto">
              {t("stories.ctaTitle")}
            </h2>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center relative">
              <Link
                to="/#advisors"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-900 px-8 py-4 font-bold hover:shadow-2xl transition animate-glow-pulse"
              >
                <Calendar size={18} />
                {t("stories.ctaButton")}
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
