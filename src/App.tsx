import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "motion/react"
import { Users, BookOpen, ArrowRight, Sparkles, ChevronDown, MessageSquare, Calendar, Rocket, Star, Quote, Handshake, Target, FileText, Plus, Mail } from "lucide-react"
import Heading from "./components/Heading"
import Container from "./components/Container"
import Button from "./components/Button"
import InstagramFeed from "./components/InstagramFeed"
import { FindMatchButton } from "./components/AIMatchmaker"
import { useTranslation } from "./i18n/useTranslation"
import leoUrl from "./assets/images/Leo.jpg"
import saharUrl from "./assets/images/Sahar.jpeg"
import saraUrl from "./assets/images/Sara.jpg"
import sinaUrl from "./assets/images/Sina.jpeg"
import homeHero from "./assets/images/home-hero.jpg"
import sadafUrl from "./assets/images/Sadaf.jpg"
import heliaUrl from "./assets/images/Helia.jpg"
import iliyaUrl from "./assets/images/Iliya.jpg"
import saracUrl from "./assets/images/SaraC.jpg"
import jenniferUrl from "./assets/images/Jennifer.jpeg"
import tinaUrl from "./assets/images/Tina.jpg"
import valentinaUrl from "./assets/images/Valentina.jpg"
import imanUrl from "./assets/images/Iman.png"

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

/* ----------------------------------- */
/* Animated number counter             */
/* ----------------------------------- */
function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  )
}

/* ----------------------------------- */
/* Testimonials marquee                */
/* ----------------------------------- */
type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  avatarColor: string
}

// TODO: Replace these placeholder testimonials with real student/parent quotes.
const TESTIMONIALS: Testimonial[] = [
  { quote: "Helped me figure out which pre-med path was actually right for me. Wish I'd done it sooner.", name: "Maya K.", role: "Grade 12 student", initials: "MK", avatarColor: "from-pink-400 to-rose-500" },
  { quote: "My advisor walked me through the entire MCAT timeline. Game changer.", name: "Daniel R.", role: "First-year pre-med", initials: "DR", avatarColor: "from-sky-400 to-blue-500" },
  { quote: "I thought I had to go to law school. After two sessions, I realized what I actually wanted.", name: "Aria S.", role: "Grade 11 student", initials: "AS", avatarColor: "from-amber-400 to-orange-500" },
  { quote: "Honestly the best free resource I've used. They listen, then actually help.", name: "Liam T.", role: "First-year university", initials: "LT", avatarColor: "from-emerald-400 to-teal-500" },
  { quote: "My advisor was a year ahead of me at the same school. The advice was so specific.", name: "Priya N.", role: "Grade 12 student", initials: "PN", avatarColor: "from-violet-400 to-purple-500" },
  { quote: "Workshop on biomedical careers opened my eyes to fields I didn't know existed.", name: "Nima B.", role: "Grade 11 student", initials: "NB", avatarColor: "from-indigo-400 to-blue-600" },
  { quote: "Booking was easy. The session was free. The plan I left with felt real.", name: "Sofia G.", role: "First-year university", initials: "SG", avatarColor: "from-fuchsia-400 to-pink-600" },
  { quote: "I'm a parent and I asked them tough questions. They were honest, not sales-y.", name: "Hassan M.", role: "Parent", initials: "HM", avatarColor: "from-cyan-400 to-sky-600" },
  { quote: "Best decision was just booking the call. Got accepted to my top choice.", name: "Layla F.", role: "First-year university", initials: "LF", avatarColor: "from-rose-400 to-red-500" },
  { quote: "I came in confused about everything. Left with a clear plan for the year.", name: "Owen P.", role: "Grade 12 student", initials: "OP", avatarColor: "from-teal-400 to-emerald-600" },
]

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex-shrink-0 w-[320px] sm:w-[380px] rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition p-6 mx-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map(i => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
        <Quote size={20} className="text-slate-200" aria-hidden />
      </div>
      <p className="text-slate-800 leading-relaxed mb-5 text-sm sm:text-base">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.avatarColor} text-white font-bold text-sm`}
          aria-hidden
        >
          {t.initials}
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
          <p className="text-slate-500 text-xs">{t.role}</p>
        </div>
      </div>
    </article>
  )
}

function MarqueeRow({ items, direction = "left" }: { items: Testimonial[]; direction?: "left" | "right" }) {
  // Duplicate the items so the loop seams together when transform resets.
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden">
      {/* Edge fade-outs so cards drift in/out smoothly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-slate-50 to-transparent" />
      <div className={"flex w-max " + (direction === "left" ? "animate-marquee" : "animate-marquee-reverse")}>
        {doubled.map((t, i) => (
          <ReviewCard t={t} key={i} />
        ))}
      </div>
    </div>
  )
}

function Testimonials() {
  const { t } = useTranslation()
  // Split testimonials into two rows.
  const half = Math.ceil(TESTIMONIALS.length / 2)
  const rowA = TESTIMONIALS.slice(0, half)
  const rowB = TESTIMONIALS.slice(half)

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <Container>
        <Heading eyebrow={t("testimonials.eyebrow")} text={t("testimonials.title")} />
        <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
          {t("testimonials.subtitle")}
        </p>
      </Container>

      {/* Marquees go full-bleed, outside the Container */}
      <div className="mt-14 space-y-6">
        <MarqueeRow items={rowA} direction="left" />
        <MarqueeRow items={rowB} direction="right" />
      </div>
    </section>
  )
}

/* ----------------------------------- */
/* Programs — bento grid               */
/* ----------------------------------- */
function ProgramsBento() {
  const { t } = useTranslation()
  return (
    <section className="py-20 bg-rydn-mesh">
      <Container>
        <Heading eyebrow={t("programs.eyebrow")} text={t("programs.title")} />
        <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
          {t("programs.subtitle")}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 md:auto-rows-[14rem] gap-4">
          {/* Card 1 — large feature: Advising */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 p-8 text-white shadow-lg"
          >
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-amber-400/20 blur-2xl" />
            <div className="relative flex flex-col h-full">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                <Users size={28} />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight">{t("programs.p1Title")}</h3>
              <p className="mt-4 text-white/85 leading-relaxed text-base md:text-lg max-w-md">{t("programs.p1Body")}</p>
              <div className="mt-auto pt-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                  Most popular
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Workshops */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
            className="md:col-span-2 relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 hover:shadow-xl transition shadow-sm"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t("programs.p2Title")}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{t("programs.p2Body")}</p>
          </motion.div>

          {/* Card 3 — Exam Prep */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 hover:shadow-xl transition shadow-sm"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Target size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t("programs.p3Title")}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed text-sm">{t("programs.p3Body")}</p>
          </motion.div>

          {/* Card 4 — University apps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-7 hover:shadow-xl transition shadow-sm"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t("programs.p4Title")}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed text-sm">{t("programs.p4Body")}</p>
          </motion.div>

          {/* Card 5 — Partnerships, full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-4 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white p-8 md:p-10 shadow-lg"
          >
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-amber-400/15 to-transparent" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="md:max-w-xl">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <Handshake size={24} />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold">{t("programs.p5Title")}</h3>
                <p className="mt-3 text-white/85 leading-relaxed">{t("programs.p5Body")}</p>
              </div>
              <Link
                to="/partner-with-us"
                className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-amber-100 transition shrink-0"
              >
                Partner with us <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

/* ----------------------------------- */
/* Partners — logo marquee             */
/* ----------------------------------- */
// TODO: Replace these text placeholders with real partner logos (PNG/SVG) once you have them.
const PARTNER_NAMES = [
  "Richmond Hill Public Library",
  "York Region DSB",
  "Markham Public Library",
  "Aurora Public Library",
  "Toronto Public Library",
  "Vaughan Public Library",
  "Newmarket Public Library",
  "York University",
]

function PartnerStrip() {
  const { t } = useTranslation()
  const doubled = [...PARTNER_NAMES, ...PARTNER_NAMES]
  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <Container className="text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {t("partners.eyebrow")}
        </p>
        <h2 className="mt-2 font-display text-xl md:text-2xl text-slate-700">
          {t("partners.title")}
        </h2>
      </Container>

      <div className="mt-10 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max animate-marquee">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="mx-8 flex items-center text-slate-400 hover:text-slate-700 transition"
            >
              <span className="font-display text-xl md:text-2xl whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------- */
/* FAQ accordion                       */
/* ----------------------------------- */
function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
      >
        <span className="font-semibold text-slate-900 text-base md:text-lg">{q}</span>
        <span
          className={
            "flex shrink-0 h-9 w-9 items-center justify-center rounded-full transition " +
            (isOpen ? "bg-sky-600 text-white rotate-45" : "bg-slate-100 text-slate-600")
          }
        >
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresenceFAQ isOpen={isOpen} answer={a} />
    </div>
  )
}

function AnimatePresenceFAQ({ isOpen, answer }: { isOpen: boolean; answer: string }) {
  return (
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-slate-600 leading-relaxed">
        {answer}
      </div>
    </motion.div>
  )
}

function FAQ() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const items = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
  ]

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
              {t("faq.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
              {t("faq.title")}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              {t("faq.subtitle")}
            </p>
            <a
              href="mailto:info@rydn.ca"
              className="mt-6 inline-flex items-center gap-2 text-sky-700 font-semibold hover:text-sky-900 transition"
            >
              <Mail size={16} />
              {t("faq.cta")}
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-3">
            {items.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ----------------------------------- */
/* Home page                           */
/* ----------------------------------- */
function HomePage() {
  const { t } = useTranslation()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState<{ name: string; bookingLink: string } | null>(null)
  const advisorsRef = useRef<HTMLDivElement>(null)

  // Handle deep links to /#advisors from other pages or from the navbar Book Now button
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#advisors") {
      setTimeout(() => {
        document.getElementById("advisors")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [])

  type Category =
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
    | "gaming"

  const advisors: { name: string; photo: string; description: string; advisingTopics: string[]; bookingLink?: string; categories: Category[] }[] = [
    { name: "Ilia", photo: leoUrl, description: "Bachelor of Commerce student", advisingTopics: ["Information Technology", "Soccer", "Business"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/WDGqbdBASEKfJ4bfCfkoEQ2", categories: ["business", "it", "sports"] },
    { name: "Sahar", photo: saharUrl, description: "Bachelor of Arts student", advisingTopics: ["Psychology", "Political science", "LSAT preparation", "University applications"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/PaIUazNXTkqwJRQDQA9Rqg2", categories: ["preLaw", "psychNeuro"] },
    { name: "Sara Roozbahani", photo: saraUrl, description: "Bachelor of Science student", advisingTopics: ["Pre-med advising", "MCAT", "Research", "University applications", "Psychology", "Study strategies"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/p_MxjUFix02viC9r-uO9Pg2", categories: ["preMed", "psychNeuro"] },
    { name: "Sam Sina", photo: sinaUrl, description: "Bachelor of Science student", advisingTopics: ["Biomedical Sciences", "Research and Article", "Tutoring", "Pharmacy School"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/9b_p31eCcEyWYRkSozwUhw2?ismsaljsauthenabled", categories: ["sciences", "pharmacy"] },
    { name: "Sadaf", photo: sadafUrl, description: "Bachelor of Science student", advisingTopics: ["Biomedical Science", "DAT Preparation", "Pre-dent Advising"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/ynxd7Kn3y0esoVFbvnpfMw2", categories: ["sciences"] },
    { name: "Helia", photo: heliaUrl, description: "Bachelor of Science student", advisingTopics: ["Neuroscience", "MCAT Preparation", "Pre-med Advising"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/QLxjEWE6a0Chv3L9I-xj9g2", categories: ["preMed", "psychNeuro"] },
    { name: "Iliya", photo: iliyaUrl, description: "Bachelor of Science student", advisingTopics: ["Biomedical Science", "Pre-med Advising", "Personal training/fitness"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/z32K193SL0OAEB-b9HfH6Q2", categories: ["preMed", "sports"] },
    { name: "Sara", photo: saracUrl, description: "Bachelor of Arts student", advisingTopics: ["History", "English", "Nutrition", "Fitness training"], categories: ["arts", "sports"] },
    { name: "Jennifer", photo: jenniferUrl, description: "Nursing student", advisingTopics: ["Nursing", "Studying strategies"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/vJPCy85x_kC5W0yDNMEIow2", categories: ["sciences"] },
    { name: "Tina", photo: tinaUrl, description: "Bachelor of Science student", advisingTopics: ["Pre-med advising", "Biomedical Science"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/zRAFcE2eLEGuWGtMwvxucA2", categories: ["preMed"] },
    { name: "Valentina", photo: valentinaUrl, description: "Bachelor of Science student", advisingTopics: ["Psychology", "French", "Biology", "Research", "Academic Exchange"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/E08RGS0aKUK55tj_wj7zYQ2", categories: ["sciences", "language", "psychNeuro"] },
    { name: "Iman", photo: imanUrl, description: "Bachelor of Arts student", advisingTopics: ["Psychology", "Gaming"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/Nl-k9rS70EiUi53ylFUU5A2", categories: ["gaming"] }
  ]

  const [activeFilter, setActiveFilter] = useState<Category | "all">("all")
  const filterCategories: { key: Category | "all"; labelKey: string }[] = [
    { key: "all", labelKey: "filters.all" },
    { key: "preMed", labelKey: "filters.preMed" },
    { key: "sciences", labelKey: "filters.sciences" },
    { key: "psychNeuro", labelKey: "filters.psychNeuro" },
    { key: "pharmacy", labelKey: "filters.pharmacy" },
    { key: "preLaw", labelKey: "filters.preLaw" },
    { key: "business", labelKey: "filters.business" },
    { key: "it", labelKey: "filters.it" },
    { key: "language", labelKey: "filters.language" },
    { key: "arts", labelKey: "filters.arts" },
    { key: "sports", labelKey: "filters.sports" },
  ]
  const counts = filterCategories.reduce<Record<string, number>>((acc, c) => {
    acc[c.key] = c.key === "all" ? advisors.length : advisors.filter(a => a.categories.includes(c.key as Category)).length
    return acc
  }, {})

  const getTagHeight = (count: number) => {
    if (count > 5) return "min-h-[96px]"
    if (count > 3) return "min-h-[60px]"
    return "min-h-[36px]"
  }

  const filteredAdvisors = activeFilter === "all" ? advisors : advisors.filter(a => a.categories.includes(activeFilter))
  const shuffledAdvisors = shuffleArray(filteredAdvisors)

  return (
    <>
      {/* ============================================== */}
      {/* HERO                                            */}
      {/* ============================================== */}
      <section className="relative isolate -mt-20 pt-20 min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-20 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${homeHero})` }}
        />
        {/* Gradient + grain overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900/85 via-slate-900/70 to-sky-900/60" />
        <div className="grain -z-10" />

        {/* Floating accent blobs */}
        <div className="absolute -top-24 -left-24 -z-10 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container className="relative">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              {t("hero.eyebrow")}
            </span>

            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05]">
              {t("hero.titleLine1")}
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                {t("hero.titleLine2")}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              {t("hero.subhead")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Primary: Book Now — eye-catching amber gradient with glow pulse */}
              <button
                onClick={() => advisorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-9 py-4 text-base font-bold shadow-xl hover:shadow-2xl transition focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-900 animate-glow-pulse"
              >
                <Calendar size={18} />
                {t("nav.bookNow")}
                <ArrowRight size={18} />
              </button>
              <Link
                to="/about-us"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/70 text-sm">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t("hero.trustNonprofit")}</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> {t("hero.trustFree")}</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> {t("hero.trustMultilingual")}</span>
            </div>
          </motion.div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          aria-hidden
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ============================================== */}
      {/* MISSION STRIP                                   */}
      {/* ============================================== */}
      <Container className="py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">{t("mission.eyebrow")}</p>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl text-slate-900 leading-snug max-w-4xl mx-auto">
            {t("mission.line1")} <span className="text-slate-400">{t("mission.line2")}</span> {t("mission.line3")}
          </p>
        </motion.div>
      </Container>

      {/* ============================================== */}
      {/* PROGRAMS — bento grid                           */}
      {/* ============================================== */}
      <ProgramsBento />

      {/* ============================================== */}
      {/* HOW IT WORKS                                    */}
      {/* ============================================== */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="How it works" text="Get started in 3 steps" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { Icon: Users, step: "01", title: "Browse advisors", body: "Find an advisor whose background and interests match yours." },
              { Icon: Calendar, step: "02", title: "Book a free session", body: "Pick a time that works for you. Sessions are free and online." },
              { Icon: Rocket, step: "03", title: "Move forward", body: "Walk away with a plan, clarity, and a person in your corner." },
            ].map(({ Icon, step, title, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="relative inline-flex">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30">
                    <Icon size={32} />
                  </div>
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">
                    {step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed max-w-xs mx-auto">{body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================== */}
      {/* WHY ROOZ — STATS                                */}
      {/* ============================================== */}
      <section className="py-20 bg-slate-900 text-white">
        <Container>
          <div className="text-center">
            <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">Why RYDN</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold">A growing community</h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              Built by students, for students — relatable advisors who've recently walked the paths you're considering.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: 25, suffix: "+", label: "Advisors", desc: "and growing" },
              { value: 11, suffix: "+", label: "Areas of advising", desc: "from medicine to law" },
              { value: 7, suffix: "", label: "Workshops planned", desc: "for the year" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-8 text-center"
              >
                <p className="font-display text-5xl md:text-6xl font-bold bg-gradient-to-br from-sky-300 to-amber-200 bg-clip-text text-transparent">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-lg font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================== */}
      {/* TESTIMONIALS                                    */}
      {/* ============================================== */}
      <Testimonials />

      {/* ============================================== */}
      {/* PARTNERS                                        */}
      {/* ============================================== */}
      <PartnerStrip />

      {/* ============================================== */}
      {/* ADVISORS                                        */}
      {/* ============================================== */}
      <section ref={advisorsRef} id="advisors" className="py-20 scroll-mt-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Heading eyebrow="Our advisors" text="Meet your future advisor" />
            <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              Each advisor brings their own background. Find one whose journey lines up with yours.
            </p>
          </motion.div>

          {/* AI Matchmaker CTA — sits between heading and filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center px-4"
          >
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-rose-50 shadow-sm">
              {/* Subtle decorative glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-fuchsia-300/30 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-300/30 blur-2xl" />

              <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-5 sm:p-6">
                {/* Sparkle icon badge */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 text-white shadow-md">
                  <Sparkles size={20} />
                </div>
                {/* Tagline */}
                <p className="flex-1 text-sm md:text-base text-slate-700 text-center sm:text-left leading-snug">
                  {t("matchmaker.ctaTagline")}
                </p>
                {/* Button */}
                <div className="shrink-0">
                  <FindMatchButton />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filter pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {filterCategories.map(c => {
              const active = activeFilter === c.key
              const count = counts[c.key]
              const disabled = count === 0
              return (
                <button
                  key={c.key}
                  disabled={disabled}
                  onClick={() => setActiveFilter(c.key)}
                  className={
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition border " +
                    (active
                      ? "bg-slate-900 text-white border-slate-900 shadow-md"
                      : disabled
                        ? "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
                        : "bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-sky-700 hover:shadow-sm")
                  }
                >
                  {t(c.labelKey)}
                  <span
                    className={
                      "inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-xs font-bold " +
                      (active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")
                    }
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <motion.div
            layout
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
          >
            <AnimatePresence mode="popLayout">
            {shuffledAdvisors.map((advisor) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="card-ring w-full p-6 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center hover:shadow-xl transition"
                key={advisor.name}
              >
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-sky-50"
                    src={advisor.photo}
                    alt={advisor.name}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold text-center text-slate-900">{advisor.name}</h3>
                <p className="mt-1 mb-4 text-slate-500 text-sm text-center leading-relaxed">{advisor.description}</p>

                <div className={`flex flex-wrap items-center gap-2 mb-5 justify-center ${getTagHeight(advisor.advisingTopics.length)}`}>
                  {advisor.advisingTopics.map((topic: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold border border-sky-100"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-auto w-full">
                  <Button
                    className="w-full"
                    variant={advisor.bookingLink ? "primary" : "secondary"}
                    onClick={() => {
                      if (advisor.bookingLink) {
                        setSelectedAdvisor({ name: advisor.name, bookingLink: advisor.bookingLink })
                      }
                    }}
                    disabled={!advisor.bookingLink}
                  >
                    {advisor.bookingLink ? `Book with ${advisor.name.split(" ")[0]}` : "Booking soon"}
                  </Button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* ============================================== */}
      {/* STORIES PREVIEW                                 */}
      {/* ============================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <Heading eyebrow={t("stories.eyebrow")} text={t("stories.title")} />
          <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            {t("stories.lede")}
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initials: "MK", student: "Maya K.", outcome: "Accepted to UofT Life Sciences", pull: "I thought I had to figure it all out alone.", gradient: "from-rose-400 via-pink-500 to-fuchsia-600", topic: "Pre-med" },
              { initials: "DR", student: "Daniel R.", outcome: "Accepted to law combined program", pull: "Sahar walked me through every line of my personal statement.", gradient: "from-amber-400 via-orange-500 to-red-500", topic: "Pre-law" },
              { initials: "AS", student: "Aria S.", outcome: "Switched intended major after one workshop", pull: "I realized I'd been chasing the wrong thing.", gradient: "from-emerald-400 via-teal-500 to-cyan-600", topic: "Career" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                <div className={`relative h-40 bg-gradient-to-br ${s.gradient} p-6 text-white flex flex-col justify-between`}>
                  <span className="self-start inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/15 backdrop-blur">
                    {s.topic}
                  </span>
                  <div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur font-bold text-sm mb-2">{s.initials}</div>
                    <p className="font-semibold">{s.student}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <Quote size={18} className="text-slate-200 mb-2" aria-hidden />
                  <p className="font-display text-lg text-slate-900 leading-snug">"{s.pull}"</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-600">{s.outcome}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-8 py-3.5 font-semibold hover:bg-sky-600 transition"
            >
              Read all stories <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>

      {/* ============================================== */}
      {/* INSTAGRAM FEED                                  */}
      {/* ============================================== */}
      <InstagramFeed />

      {/* ============================================== */}
      {/* FAQ                                             */}
      {/* ============================================== */}
      <FAQ />

      {/* ============================================== */}
      {/* CLOSING CTA BANNER                              */}
      {/* ============================================== */}
      <section className="relative py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 px-8 py-16 md:px-16 md:py-20 text-center text-white"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

            <Sparkles size={40} className="mx-auto text-amber-300" />
            <h2 className="font-display mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-3xl mx-auto">
              Become part of the next generation of advisors
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-white/85 text-base md:text-lg leading-relaxed">
              Whether you're a student looking for guidance, an advisor ready to give back, or an organization that wants to partner — there's a place for you here.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/become-advisor"
                className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-8 py-4 font-semibold hover:bg-sky-50 transition"
              >
                <MessageSquare size={18} className="mr-2" />
                Become an Advisor
              </Link>
              <Link
                to="/donation"
                className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur text-white border border-white/30 px-8 py-4 font-semibold hover:bg-white/20 transition"
              >
                Support RYDN <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ============================================== */}
      {/* MODALS                                          */}
      {/* ============================================== */}
      {selectedAdvisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 text-center"
          >
            <button
              className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              onClick={() => setSelectedAdvisor(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="font-display text-2xl font-bold mb-3 text-slate-900">
              Book with {selectedAdvisor.name.split(" ")[0]}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              You're about to open the booking calendar for {selectedAdvisor.name}.
              After selecting a time, you'll receive a confirmation email.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => {
                  window.open(selectedAdvisor.bookingLink, "_blank", "noopener,noreferrer")
                  setSelectedAdvisor(null)
                  setShowConfirmation(true)
                }}
              >
                Continue to booking <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button variant="secondary" onClick={() => setSelectedAdvisor(null)}>Cancel</Button>
            </div>
          </motion.div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
              <Sparkles size={28} />
            </div>
            <h3 className="font-display text-2xl font-bold mb-3 text-slate-900">You're all set</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              Thanks for booking with RYDN. Please complete your booking in the new tab.
              You'll receive a confirmation email shortly.
            </p>
            <Button onClick={() => setShowConfirmation(false)}>Got it</Button>
          </motion.div>
        </div>
      )}
    </>
  )
}

function App() {
  return <HomePage />
}

export default App
