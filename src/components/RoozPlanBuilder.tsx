/**
 * RoozPlanBuilder , the "Build your own package" interactive wizard that
 * sits on the RooZ Med landing page. Visitors answer 3 short questions, and
 * the wizard recommends one of 4 tiered plans (Spark / Standard / Guided /
 * Complete) and offers them a free consultation.
 *
 * Why this exists: a static price list makes the service feel generic. Letting
 * the visitor BUILD their package makes it feel bespoke, which is critical
 * for a paid, premium service. BeMo and other admissions consulting companies
 * use the same multi-step pattern to great conversion effect.
 *
 * The recommendation engine is deliberately simple: support level is the
 * primary driver, number of selected needs can bump the recommendation up one
 * tier when the visitor is clearly asking for a lot. The lead-capture is
 * mailto-based for v1 , swap for Calendly/Outlook/Stripe later.
 */
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Zap,
  Target,
  Compass,
  Crown,
  Mail,
} from "lucide-react"

// =============================================================================
// Question option data , easy to edit without touching layout code.
// =============================================================================

type ProgramKey = "medicine" | "dentistry" | "pharmacy"
type SupportKey = "occasional" | "weekly" | "manage" | "everything"
type NeedKey =
  | "imat"
  | "study-planning"
  | "accountability"
  | "italian"
  | "english"
  | "mock-analysis"
  | "italy-prep"

const PROGRAMS: { key: ProgramKey; label: string; icon: typeof Stethoscope }[] = [
  { key: "medicine", label: "Medicine", icon: Stethoscope },
  { key: "dentistry", label: "Dentistry", icon: Stethoscope },
  { key: "pharmacy", label: "Pharmacy", icon: Stethoscope },
]

const NEEDS: { key: NeedKey; label: string }[] = [
  { key: "imat", label: "IMAT tutoring" },
  { key: "study-planning", label: "Study planning" },
  { key: "accountability", label: "Accountability" },
  { key: "italian", label: "Italian" },
  { key: "english", label: "English" },
  { key: "mock-analysis", label: "Mock analysis" },
  { key: "italy-prep", label: "Italy preparation" },
]

const SUPPORT_LEVELS: { key: SupportKey; label: string; blurb: string }[] = [
  {
    key: "occasional",
    label: "Just occasional help",
    blurb: "I'm mostly self-directed and want expert guidance when I'm stuck.",
  },
  {
    key: "weekly",
    label: "Weekly support",
    blurb: "I want a weekly rhythm with tutoring and a study plan.",
  },
  {
    key: "manage",
    label: "Manage my preparation",
    blurb: "I want you to drive my prep. I'll show up and do the work.",
  },
  {
    key: "everything",
    label: "I want everything handled",
    blurb: "Prep, admissions, language, Italy relocation. The whole thing.",
  },
]

// =============================================================================
// Plan definitions , the 4 tiers the wizard can recommend.
// =============================================================================

type PlanKey = "spark" | "standard" | "guided" | "complete"
type Plan = {
  key: PlanKey
  name: string
  tagline: string
  blurb: string
  features: string[]
  icon: typeof Zap
  accent: string // Tailwind gradient classes
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
    priceHint: "Starting from the lowest commitment",
  },
  standard: {
    key: "standard",
    name: "RooZ Standard",
    tagline: "Weekly rhythm",
    blurb:
      "A structured weekly plan with a tutor who knows your progress and keeps you on track.",
    features: [
      "Everything in Spark",
      "Weekly 1-on-1 tutoring",
      "Personalised study plan",
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

// =============================================================================
// Recommendation engine
// =============================================================================

function recommendPlan(support: SupportKey | null, needs: NeedKey[]): PlanKey {
  if (!support) return "standard"
  const needCount = needs.length

  // Primary driver: support level. Needs count can bump up one tier when they
  // selected a lot of things (clear signal of a bigger scope).
  switch (support) {
    case "occasional":
      return needCount >= 4 ? "standard" : "spark"
    case "weekly":
      return needCount >= 5 ? "guided" : "standard"
    case "manage":
      return needCount >= 6 ? "complete" : "guided"
    case "everything":
      return "complete"
  }
}

// =============================================================================
// UI , the wizard itself
// =============================================================================

type Props = {
  /** Optional id for anchor scrolling (default: "plan-builder") */
  id?: string
}

export default function RoozPlanBuilder({ id = "plan-builder" }: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [program, setProgram] = useState<ProgramKey | null>(null)
  const [needs, setNeeds] = useState<NeedKey[]>([])
  const [support, setSupport] = useState<SupportKey | null>(null)

  const canContinue = useMemo(() => {
    if (step === 1) return program !== null
    if (step === 2) return needs.length > 0
    if (step === 3) return support !== null
    return true
  }, [step, program, needs, support])

  const recommended = useMemo(() => recommendPlan(support, needs), [support, needs])
  const plan = PLANS[recommended]

  const toggleNeed = (key: NeedKey) => {
    setNeeds((prev) =>
      prev.includes(key) ? prev.filter((n) => n !== key) : [...prev, key],
    )
  }

  const reset = () => {
    setStep(1)
    setProgram(null)
    setNeeds([])
    setSupport(null)
  }

  // Build a mailto link that pre-fills the user's selections so Sam/the Med
  // team sees everything they picked in the first email.
  const consultationMailto = useMemo(() => {
    const programLabel = program
      ? PROGRAMS.find((p) => p.key === program)?.label
      : "Not selected"
    const needsLabel = needs.length
      ? needs
          .map((n) => "• " + (NEEDS.find((need) => need.key === n)?.label ?? n))
          .join("\n")
      : "None selected"
    const supportLabel = support
      ? SUPPORT_LEVELS.find((s) => s.key === support)?.label
      : "Not selected"

    const body = [
      `Hi RooZ Med team,`,
      ``,
      `I built a plan on your website and would like to book a free consultation.`,
      ``,
      `--- My selections ---`,
      `Program: ${programLabel}`,
      `What I need:`,
      needsLabel,
      `Support level: ${supportLabel}`,
      `Recommended plan: ${plan.name}`,
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
  }, [program, needs, support, plan])

  return (
    <section
      id={id}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Subtle green/white/red tricolore wash in the background */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-white to-red-500"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-emerald-200 dark:border-emerald-500/20">
            <Sparkles size={13} />
            Build your own plan
          </span>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Answer 3 questions.
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-slate-800 to-red-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-white dark:to-red-400">
              Get your personalised package.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Tell us what you're preparing for and how much support you want.
            We'll recommend the RooZ plan built for you.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-12 flex items-center justify-center gap-2 sm:gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div
                className={
                  "flex items-center justify-center rounded-full h-9 w-9 text-sm font-bold transition " +
                  (step >= i
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500")
                }
              >
                {step > i ? <Check size={16} /> : i < 4 ? i : <Sparkles size={14} />}
              </div>
              {i < 4 && (
                <div
                  className={
                    "h-0.5 w-8 sm:w-14 rounded-full transition " +
                    (step > i ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800")
                  }
                />
              )}
            </div>
          ))}
        </div>

        {/* Wizard card */}
        <div className="mt-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 min-h-[460px] flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
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
                  Step 1 of 3
                </p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  What are you preparing for?
                </h3>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {PROGRAMS.map((p) => {
                    const active = program === p.key
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setProgram(p.key)}
                        className={
                          "relative rounded-2xl border-2 p-6 text-left transition " +
                          (active
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-md"
                            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40")
                        }
                      >
                        <p.icon
                          size={24}
                          className={
                            active
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-400"
                          }
                        />
                        <p className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
                          {p.label}
                        </p>
                        {active && (
                          <span className="absolute top-3 right-3 inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-white">
                            <Check size={14} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

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
                  Step 2 of 3
                </p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  What do you need help with?
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Pick as many as apply.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {NEEDS.map((n) => {
                    const active = needs.includes(n.key)
                    return (
                      <button
                        key={n.key}
                        type="button"
                        onClick={() => toggleNeed(n.key)}
                        className={
                          "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition " +
                          (active
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm"
                            : "border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/40")
                        }
                      >
                        <span
                          className={
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition " +
                            (active
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-slate-300 dark:border-slate-600")
                          }
                        >
                          {active && <Check size={14} />}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {n.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

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
                  Step 3 of 3
                </p>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100">
                  How much support do you want?
                </h3>
                <div className="mt-8 space-y-3">
                  {SUPPORT_LEVELS.map((s) => {
                    const active = support === s.key
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setSupport(s.key)}
                        className={
                          "flex items-start gap-4 w-full rounded-2xl border-2 p-5 text-left transition " +
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
                            {s.blurb}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1"
              >
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border border-emerald-200 dark:border-emerald-500/20">
                    <Sparkles size={13} />
                    Recommended for you
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons , hidden on the result step (step 4) */}
          {step < 4 && (
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
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
                onClick={() => setStep((s) => ((s + 1) as 2 | 3 | 4))}
                disabled={!canContinue}
                className={
                  "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold shadow-md transition " +
                  (canContinue
                    ? "bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed")
                }
              >
                {step === 3 ? "See my plan" : "Continue"}
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
