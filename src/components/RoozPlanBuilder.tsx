/**
 * RoozPlanBuilder, the "Build your own package" interactive wizard that sits
 * on the RooZ Med landing page. Visitors answer 4 short questions (plus an
 * optional free-text note) and the wizard recommends one of 4 tiered plans
 * (Spark / Standard / Guided / Complete) and offers them a free consultation.
 *
 * Why this exists: a static price list makes the service feel generic.
 * Letting the visitor BUILD their package makes it feel bespoke, which is
 * critical for a paid, premium service. BeMo and other admissions consulting
 * companies use the same multi-step pattern to great conversion effect.
 *
 * Recommendation engine (prioritised, strongest signal wins):
 *   1. Q3 priority says "IMAT and Italy together" or "managed in one place"
 *      -> always RooZ Complete
 *   2. Q3 priority says "keeping cost lower" -> always RooZ Spark
 *   3. Q2 needs include language support -> bump to Complete (language = Complete)
 *   4. Q1 journey = retake OR consistent but no score improvement -> bump up one tier
 *   5. Q3 priority = highly personalised 1-on-1 -> bump up one tier
 *   6. Otherwise base tier from Q4 support volume
 *
 * The lead capture is mailto-based for v1, so a plan recommendation reaches
 * Sam's inbox with all the student's selections AND their free-text context
 * pre-filled. Swap for Calendly / Cal.com / Stripe later.
 */
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Compass,
  Crown,
  Mail,
} from "lucide-react"

// =============================================================================
// Question option data, easy to edit without touching layout code.
// =============================================================================

type JourneyKey =
  | "not-started"
  | "no-plan"
  | "no-improvement"
  | "doing-well"
  | "retake"

const JOURNEYS: { key: JourneyKey; label: string }[] = [
  { key: "not-started", label: "I haven't started yet" },
  { key: "no-plan", label: "I've started studying, but I don't have a clear plan" },
  { key: "no-improvement", label: "I'm studying consistently, but my score isn't improving" },
  { key: "doing-well", label: "I'm already doing well and want to push my score higher" },
  { key: "retake", label: "I've taken the IMAT before and want a stronger second attempt" },
]

type NeedKey =
  | "study-planning"
  | "subject-tutoring"
  | "test-strategy"
  | "consistency"
  | "accountability"
  | "mock-analysis"
  | "university-guidance"
  | "language"
  | "assess-me"

const NEEDS: { key: NeedKey; label: string; blurb?: string }[] = [
  {
    key: "study-planning",
    label: "Study planning",
    blurb: "I'm not sure what to study, when to study it, or how to structure my weeks.",
  },
  {
    key: "subject-tutoring",
    label: "Subject tutoring",
    blurb: "Biology, Chemistry, Physics, Math, or Logic.",
  },
  {
    key: "test-strategy",
    label: "Test-taking strategy",
    blurb: "Timing, question selection, negative marking, pacing, and mock strategy.",
  },
  {
    key: "consistency",
    label: "Consistency",
    blurb: "I procrastinate, fall behind, or struggle to stick to my plan.",
  },
  {
    key: "accountability",
    label: "Accountability",
    blurb: "I want someone checking my progress and keeping me on track.",
  },
  {
    key: "mock-analysis",
    label: "Mock analysis",
    blurb: "I want help understanding where I'm losing marks and how to improve.",
  },
  {
    key: "university-guidance",
    label: "University guidance",
    blurb: "I need help comparing schools and deciding where to apply.",
  },
  {
    key: "language",
    label: "Language support",
    blurb: "Italian, English, or both.",
  },
  {
    key: "assess-me",
    label: "I'm not sure yet",
    blurb: "I want you to assess my situation and recommend what I need.",
  },
]

type SubjectKey = "biology" | "chemistry" | "physics" | "math" | "logic"
const SUBJECTS: { key: SubjectKey; label: string }[] = [
  { key: "biology", label: "Biology" },
  { key: "chemistry", label: "Chemistry" },
  { key: "physics", label: "Physics" },
  { key: "math", label: "Math" },
  { key: "logic", label: "Logic" },
]

type LanguageKey = "italian" | "english" | "both"
const LANGUAGES: { key: LanguageKey; label: string }[] = [
  { key: "italian", label: "Italian" },
  { key: "english", label: "English" },
  { key: "both", label: "Both" },
]

type PriorityKey =
  | "cost"
  | "efficient"
  | "clear-plan"
  | "accountability"
  | "personalized"
  | "managed"
  | "italy"
  | "other"

const PRIORITIES: { key: PriorityKey; label: string }[] = [
  { key: "cost", label: "Keeping the overall cost lower" },
  { key: "efficient", label: "Improving my score as efficiently as possible" },
  { key: "clear-plan", label: "Having a clear plan so I always know what to do next" },
  { key: "accountability", label: "Having someone hold me accountable" },
  { key: "personalized", label: "Getting highly personalised one-on-one support" },
  { key: "managed", label: "Having my entire preparation managed in one place" },
  { key: "italy", label: "Preparing not only for IMAT, but also for studying and living in Italy" },
  { key: "other", label: "Something else" },
]

type SupportKey = "occasional" | "weekly" | "high-touch" | "intensive" | "not-sure"

const SUPPORT_LEVELS: { key: SupportKey; label: string; sub: string }[] = [
  { key: "occasional", label: "Occasional support", sub: "1,2 sessions per month" },
  { key: "weekly", label: "Weekly support", sub: "1 session per week" },
  { key: "high-touch", label: "High-touch support", sub: "2 sessions per week" },
  { key: "intensive", label: "Intensive support", sub: "3+ sessions per week" },
  { key: "not-sure", label: "I'm not sure", sub: "Recommend what fits my goals" },
]

// =============================================================================
// Plan definitions, the 4 tiers the wizard can recommend.
// =============================================================================

type PlanKey = "spark" | "standard" | "guided" | "complete"
type Plan = {
  key: PlanKey
  name: string
  tagline: string
  blurb: string
  features: string[]
  icon: typeof Zap
  accent: string
  priceHint: string
}

const PLANS: Record<PlanKey, Plan> = {
  spark: {
    key: "spark",
    name: "RooZ Spark",
    tagline: "Pay as you go",
    blurb:
      "The lightest touch. Perfect if you're self-directed and want expert help when it matters most.",
    features: [
      "Access to the RooZ question bank",
      "Occasional 1-on-1 tutoring sessions",
      "IMAT practice tests with explanations",
      "Email support",
    ],
    icon: Zap,
    accent: "from-sky-500 to-cyan-500",
    priceHint: "Lowest commitment, maximum value",
  },
  standard: {
    key: "standard",
    name: "RooZ Standard",
    tagline: "Weekly rhythm, clear plan",
    blurb:
      "A structured weekly plan with a tutor who knows your progress and keeps you on track.",
    features: [
      "Everything in Spark",
      "Weekly 1-on-1 tutoring",
      "Personalised study plan you always know what's next",
      "Monthly progress reviews",
      "Priority chat support",
    ],
    icon: Target,
    accent: "from-emerald-500 to-teal-500",
    priceHint: "Most popular. Balanced structure and freedom.",
  },
  guided: {
    key: "guided",
    name: "RooZ Guided",
    tagline: "We manage your prep",
    blurb:
      "Full-service academic management. You focus on learning; we handle the strategy, timeline, and admissions.",
    features: [
      "Everything in Standard",
      "Admissions consulting (university shortlist)",
      "Full mock exam analysis",
      "Weekly accountability check-ins",
      "Pre-application document review",
    ],
    icon: Compass,
    accent: "from-amber-500 to-orange-500",
    priceHint: "Recommended for most serious applicants",
  },
  complete: {
    key: "complete",
    name: "RooZ Complete",
    tagline: "The complete journey, start to finish",
    blurb:
      "The white-glove concierge. We prepare you for the exam, the application, the move, and the first year, all in one coordinated plan.",
    features: [
      "Everything in Guided",
      "English language prep (if needed)",
      "Italian language fundamentals",
      "Italy relocation guidance (visa, Codice Fiscale, housing)",
      "Dedicated personal advisor",
      "First-year survival briefing before you fly",
    ],
    icon: Crown,
    accent: "from-rose-500 via-red-500 to-rose-600",
    priceHint: "Our most comprehensive package",
  },
}

const TIER_ORDER: PlanKey[] = ["spark", "standard", "guided", "complete"]

function bumpUp(tier: PlanKey): PlanKey {
  const i = TIER_ORDER.indexOf(tier)
  return TIER_ORDER[Math.min(i + 1, TIER_ORDER.length - 1)]
}

// =============================================================================
// Recommendation engine
// =============================================================================

type Answers = {
  journey: JourneyKey | null
  needs: NeedKey[]
  subjects: SubjectKey[]
  language: LanguageKey | null
  priority: PriorityKey | null
  support: SupportKey | null
  note: string
}

function recommendPlan(a: Answers): PlanKey {
  // Hard overrides from Q3 (priority) always win
  if (a.priority === "italy") return "complete"
  if (a.priority === "managed") return "complete"
  if (a.priority === "cost") return "spark"

  // Base tier from Q4 (support volume)
  let base: PlanKey = "standard"
  switch (a.support) {
    case "occasional":
      base = "spark"
      break
    case "weekly":
      base = "standard"
      break
    case "high-touch":
      base = "guided"
      break
    case "intensive":
      base = "complete"
      break
    case "not-sure":
      base = "standard"
      break
  }

  // Needs include language support -> bump to Complete minimum (language is a
  // Complete-tier feature in our plan definitions).
  if (a.needs.includes("language")) {
    if (base === "spark" || base === "standard") return "complete"
  }

  // Journey signals that call for more support
  if (a.journey === "retake" || a.journey === "no-improvement") {
    base = bumpUp(base)
  }

  // "I want highly personalised 1-on-1" bumps up a tier
  if (a.priority === "personalized") {
    base = bumpUp(base)
  }

  // Lots of needs selected (5+) suggests broader scope
  if (a.needs.filter((n) => n !== "assess-me").length >= 5) {
    base = bumpUp(base)
  }

  return base
}

// =============================================================================
// UI, the wizard itself
// =============================================================================

type Props = {
  /** Optional id for anchor scrolling (default: "plan-builder") */
  id?: string
}

export default function RoozPlanBuilder({ id = "plan-builder" }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [answers, setAnswers] = useState<Answers>({
    journey: null,
    needs: [],
    subjects: [],
    language: null,
    priority: null,
    support: null,
    note: "",
  })

  const update = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const toggleNeed = (key: NeedKey) => {
    setAnswers((prev) => ({
      ...prev,
      needs: prev.needs.includes(key)
        ? prev.needs.filter((n) => n !== key)
        : [...prev.needs, key],
    }))
  }

  const toggleSubject = (key: SubjectKey) => {
    setAnswers((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(key)
        ? prev.subjects.filter((s) => s !== key)
        : [...prev.subjects, key],
    }))
  }

  const canContinue = useMemo(() => {
    if (step === 1) return answers.journey !== null
    if (step === 2) return answers.needs.length > 0
    if (step === 3) return answers.priority !== null
    if (step === 4) return answers.support !== null
    return true
  }, [step, answers])

  const recommended = useMemo(() => recommendPlan(answers), [answers])
  const plan = PLANS[recommended]

  const reset = () => {
    setStep(1)
    setAnswers({
      journey: null,
      needs: [],
      subjects: [],
      language: null,
      priority: null,
      support: null,
      note: "",
    })
  }

  // Build a mailto that pre-fills every answer so Sam sees the full picture.
  const consultationMailto = useMemo(() => {
    const journeyLabel = answers.journey
      ? JOURNEYS.find((j) => j.key === answers.journey)?.label
      : "Not selected"
    const needsLabels = answers.needs.map((n) => {
      const need = NEEDS.find((x) => x.key === n)
      let s = "- " + (need?.label ?? n)
      if (n === "subject-tutoring" && answers.subjects.length) {
        const subjs = answers.subjects
          .map((s) => SUBJECTS.find((x) => x.key === s)?.label ?? s)
          .join(", ")
        s += ` (${subjs})`
      }
      if (n === "language" && answers.language) {
        const l = LANGUAGES.find((x) => x.key === answers.language)?.label ?? answers.language
        s += ` (${l})`
      }
      return s
    }).join("\n")
    const priorityLabel = answers.priority
      ? PRIORITIES.find((p) => p.key === answers.priority)?.label
      : "Not selected"
    const supportLabel = answers.support
      ? SUPPORT_LEVELS.find((s) => s.key === answers.support)?.label
      : "Not selected"

    const body = [
      `Hi RooZ Med team,`,
      ``,
      `I built a plan on your website and would like to book a free consultation.`,
      ``,
      `--- My selections ---`,
      `Where I am in my IMAT journey:`,
      `  ${journeyLabel}`,
      ``,
      `What I need help with:`,
      needsLabels || "  (none)",
      ``,
      `What matters most to me:`,
      `  ${priorityLabel}`,
      ``,
      `Support volume I'd like:`,
      `  ${supportLabel}`,
      ``,
      `Recommended plan: ${plan.name}`,
      ``,
      `My situation / anything else:`,
      answers.note ? `  ${answers.note}` : "  (none)",
      ``,
      `My time zone: `,
      `Best times to meet: `,
      ``,
      `Thanks!`,
    ].join("\n")

    return (
      "mailto:med@rydn.ca?subject=" +
      encodeURIComponent(`RooZ Med: Free consultation (${plan.name})`) +
      "&body=" +
      encodeURIComponent(body)
    )
  }, [answers, plan])

  return (
    <section
      id={id}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Subtle tricolore top-stripe */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-white to-red-500"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-emerald-200 dark:border-emerald-500/20">
            <Sparkles size={13} />
            Build your Med Due plan
          </span>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Answer a few questions.
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-slate-800 to-red-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-white dark:to-red-400">
              Get your personalised plan.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Tell us where you are, what you need, and how you like to work. We'll
            recommend the RooZ plan built for you.
          </p>
        </div>

        {/* Progress bar: 4 question pills + the result sparkle */}
        <div className="mt-12 flex items-center justify-center gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div
                className={
                  "flex items-center justify-center rounded-full h-9 w-9 text-sm font-bold transition " +
                  (step >= i
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500")
                }
              >
                {step > i ? <Check size={16} /> : i < 5 ? i : <Sparkles size={14} />}
              </div>
              {i < 5 && (
                <div
                  className={
                    "h-0.5 w-6 sm:w-10 rounded-full transition " +
                    (step > i ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800")
                  }
                />
              )}
            </div>
          ))}
        </div>

        {/* Wizard card */}
        <div className="mt-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 min-h-[520px] flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            {/* ===================== STEP 1: Journey ===================== */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1"
              >
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Step 1 of 4
                </p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  Where are you in your IMAT journey?
                </h3>
                <div className="mt-8 space-y-3">
                  {JOURNEYS.map((j) => {
                    const active = answers.journey === j.key
                    return (
                      <button
                        key={j.key}
                        type="button"
                        onClick={() => update("journey", j.key)}
                        className={
                          "flex items-start gap-4 w-full rounded-2xl border-2 p-4 text-left transition " +
                          (active
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm"
                            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40")
                        }
                      >
                        <span
                          className={
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition mt-0.5 " +
                            (active
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 dark:border-slate-600")
                          }
                        >
                          {active && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {j.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ===================== STEP 2: Needs ===================== */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1"
              >
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Step 2 of 4
                </p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  What do you need the most help with?
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Pick as many as apply.
                </p>
                <div className="mt-8 space-y-3">
                  {NEEDS.map((n) => {
                    const active = answers.needs.includes(n.key)
                    return (
                      <div key={n.key}>
                        <button
                          type="button"
                          onClick={() => toggleNeed(n.key)}
                          className={
                            "flex items-start gap-3 w-full rounded-2xl border-2 p-4 text-left transition " +
                            (active
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm"
                              : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40")
                          }
                        >
                          <span
                            className={
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition mt-0.5 " +
                              (active
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-slate-300 dark:border-slate-600")
                            }
                          >
                            {active && <Check size={14} />}
                          </span>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 dark:text-slate-100">
                              {n.label}
                            </p>
                            {n.blurb && (
                              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                                {n.blurb}
                              </p>
                            )}
                          </div>
                        </button>

                        {/* Inline sub-select: subject tutoring -> which subjects? */}
                        <AnimatePresence>
                          {active && n.key === "subject-tutoring" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 ml-9 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/5 border border-emerald-200/60 dark:border-emerald-500/20">
                                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                                  Which subjects?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {SUBJECTS.map((s) => {
                                    const sActive = answers.subjects.includes(s.key)
                                    return (
                                      <button
                                        key={s.key}
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          toggleSubject(s.key)
                                        }}
                                        className={
                                          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition border-2 " +
                                          (sActive
                                            ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-400")
                                        }
                                      >
                                        {sActive && <Check size={12} />}
                                        {s.label}
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Inline sub-select: language -> italian/english/both */}
                          {active && n.key === "language" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 ml-9 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/5 border border-emerald-200/60 dark:border-emerald-500/20">
                                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                                  Which language?
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {LANGUAGES.map((l) => {
                                    const lActive = answers.language === l.key
                                    return (
                                      <button
                                        key={l.key}
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          update("language", l.key)
                                        }}
                                        className={
                                          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition border-2 " +
                                          (lActive
                                            ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-emerald-400")
                                        }
                                      >
                                        {lActive && <Check size={12} />}
                                        {l.label}
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ===================== STEP 3: Priority ===================== */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1"
              >
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Step 3 of 4
                </p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  What matters most to you?
                </h3>
                <div className="mt-8 space-y-3">
                  {PRIORITIES.map((p) => {
                    const active = answers.priority === p.key
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => update("priority", p.key)}
                        className={
                          "flex items-start gap-4 w-full rounded-2xl border-2 p-4 text-left transition " +
                          (active
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm"
                            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40")
                        }
                      >
                        <span
                          className={
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition mt-0.5 " +
                            (active
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 dark:border-slate-600")
                          }
                        >
                          {active && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {p.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ===================== STEP 4: Support + free text ===================== */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1"
              >
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Step 4 of 4
                </p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  How much one-on-one support would you like?
                </h3>
                <div className="mt-6 space-y-3">
                  {SUPPORT_LEVELS.map((s) => {
                    const active = answers.support === s.key
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => update("support", s.key)}
                        className={
                          "flex items-start gap-4 w-full rounded-2xl border-2 p-4 text-left transition " +
                          (active
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm"
                            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40")
                        }
                      >
                        <span
                          className={
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition mt-0.5 " +
                            (active
                              ? "border-emerald-500 bg-emerald-500"
                              : "border-slate-300 dark:border-slate-600")
                          }
                        >
                          {active && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {s.label}
                          </p>
                          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                            {s.sub}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Optional free-text note */}
                <div className="mt-8">
                  <label
                    htmlFor="rooz-note"
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Anything about your situation? <span className="font-normal text-slate-500">(optional)</span>
                  </label>
                  <textarea
                    id="rooz-note"
                    rows={3}
                    value={answers.note}
                    onChange={(e) => update("note", e.target.value)}
                    placeholder="Context, test dates, universities you're considering, concerns..."
                    className="mt-2 w-full rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition resize-none"
                  />
                </div>
              </motion.div>
            )}

            {/* ===================== STEP 5: Result ===================== */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
              >
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-emerald-200 dark:border-emerald-500/20">
                    <Sparkles size={13} />
                    Your Med Due plan
                  </span>
                </div>

                <div className="mt-6 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-white to-emerald-50/60 dark:from-slate-900 dark:to-emerald-950/30 p-6 sm:p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${plan.accent} text-white shadow-lg`}
                    >
                      <plan.icon size={26} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-3xl font-semibold text-slate-900 dark:text-slate-100">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        {plan.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {plan.blurb}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2
                          size={18}
                          className="shrink-0 mt-0.5 text-emerald-500"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs text-slate-500 dark:text-slate-400 italic">
                    {plan.priceHint}
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <a
                      href={consultationMailto}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
                    >
                      <Mail size={18} />
                      Book my free consultation
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-7 py-3.5 font-semibold transition"
                    >
                      Build another plan
                    </button>
                  </div>
                </div>

                {/* Med Due signature at the bottom of the result */}
                <p className="mt-6 text-center text-xs tracking-[0.25em] uppercase text-slate-400 dark:text-slate-600">
                  Med Due.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons, hidden on the result step */}
          {step < 5 && (
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s))}
                disabled={step === 1}
                className={
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition " +
                  (step === 1
                    ? "text-slate-300 dark:text-slate-700 cursor-not-allowed"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800")
                }
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => ((s + 1) as 2 | 3 | 4 | 5))}
                disabled={!canContinue}
                className={
                  "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold shadow-md transition " +
                  (canContinue
                    ? "bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed")
                }
              >
                {step === 4 ? "See my plan" : "Continue"}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
