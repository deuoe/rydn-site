import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react"
import { Users, BookOpen, Compass, ArrowRight, Sparkles, ChevronDown, MessageSquare, Calendar, Rocket } from "lucide-react"
import Heading from "./components/Heading"
import Container from "./components/Container"
import Button from "./components/Button"
import { useTranslation } from "./i18n/useTranslation"
import leoUrl from "./assets/images/Leo.png"
import saharUrl from "./assets/images/Sahar.jpeg"
import saraUrl from "./assets/images/Sara.png"
import sinaUrl from "./assets/images/Sina.jpeg"
import homeHero from "./assets/images/home-hero.png"
import sadafUrl from "./assets/images/Sadaf.png"
import heliaUrl from "./assets/images/Helia.png"
import iliyaUrl from "./assets/images/Iliya.png"
import saracUrl from "./assets/images/SaraC.png"
import jenniferUrl from "./assets/images/Jennifer.jpeg"
import tinaUrl from "./assets/images/Tina.png"
import valentinaUrl from "./assets/images/Valentina.png"

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
/* Home page                           */
/* ----------------------------------- */
function HomePage() {
  const { t } = useTranslation()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState<{ name: string; bookingLink: string } | null>(null)
  const advisorsRef = useRef<HTMLDivElement>(null)

  const advisors = [
    { name: "Ilia", photo: leoUrl, description: "Bachelor of Commerce student", advisingTopics: ["Information Technology", "Soccer", "Business"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/WDGqbdBASEKfJ4bfCfkoEQ2" },
    { name: "Sahar", photo: saharUrl, description: "Bachelor of Arts student", advisingTopics: ["Psychology", "Political science", "LSAT preparation", "University applications"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/PaIUazNXTkqwJRQDQA9Rqg2" },
    { name: "Sara Roozbahani", photo: saraUrl, description: "Bachelor of Science student", advisingTopics: ["Pre-med advising", "MCAT", "Research", "University applications", "Psychology", "Study strategies"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/p_MxjUFix02viC9r-uO9Pg2" },
    { name: "Sam Sina", photo: sinaUrl, description: "Bachelor of Science student", advisingTopics: ["Biomedical Sciences", "Research and Article", "Tutoring", "Pharmacy School"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/9b_p31eCcEyWYRkSozwUhw2?ismsaljsauthenabled" },
    { name: "Sadaf", photo: sadafUrl, description: "Bachelor of Science student", advisingTopics: ["Biomedical Science", "DAT Preparation", "Pre-dent Advising"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/ynxd7Kn3y0esoVFbvnpfMw2" },
    { name: "Helia", photo: heliaUrl, description: "Bachelor of Science student", advisingTopics: ["Neuroscience", "MCAT Preparation", "Pre-med Advising"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/QLxjEWE6a0Chv3L9I-xj9g2" },
    { name: "Iliya", photo: iliyaUrl, description: "Bachelor of Science student", advisingTopics: ["Biomedical Science", "Pre-med Advising", "Personal training/fitness"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/z32K193SL0OAEB-b9HfH6Q2" },
    { name: "Sara", photo: saracUrl, description: "Bachelor of Arts student", advisingTopics: ["History", "English", "Nutrition", "Fitness training"] },
    { name: "Jennifer", photo: jenniferUrl, description: "Nursing student", advisingTopics: ["Nursing", "Studying strategies"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/vJPCy85x_kC5W0yDNMEIow2" },
    { name: "Tina", photo: tinaUrl, description: "Bachelor of Science student", advisingTopics: ["Pre-med advising", "Biomedical Science"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/zRAFcE2eLEGuWGtMwvxucA2" },
    { name: "Valentina", photo: valentinaUrl, description: "Bachelor of Science student", advisingTopics: ["Psychology", "French", "Biology", "Research", "Academic Exchange"], bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/E08RGS0aKUK55tj_wj7zYQ2" },
  ]

  const getTagHeight = (count: number) => {
    if (count > 5) return "min-h-[120px]"
    if (count > 3) return "min-h-[90px]"
    return "min-h-[72px]"
  }

  const shuffledAdvisors = shuffleArray(advisors)

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
              <Button
                onClick={() => advisorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="bg-white text-slate-900 hover:bg-sky-50 hover:text-sky-700 px-8 py-4 text-base"
              >
                {t("hero.ctaPrimary")} <ArrowRight size={18} className="ml-2" />
              </Button>
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
      {/* WHAT WE DO                                      */}
      {/* ============================================== */}
      <section className="relative py-20 bg-rydn-mesh">
        <Container>
          <Heading eyebrow="What we do" text="Three ways we help" />
          <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            Practical, accessible, student-centered.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { Icon: Users, title: "1-on-1 Mentorship", body: "Connect directly with advisors who provide personalized guidance on academics, university applications, and career decisions." },
              { Icon: BookOpen, title: "Workshops", body: "Interactive sessions on study strategies, career exploration, and navigating academic pathways." },
              { Icon: Compass, title: "Academic Guidance", body: "Our advisors help students explore fields, understand requirements, and build a clear direction." },
            ].map(({ Icon, title, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 text-sky-700">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================== */}
      {/* HOW IT WORKS                                    */}
      {/* ============================================== */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="How it works" text="Get started in 3 steps" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { Icon: Users, step: "01", title: "Browse advisors", body: "Find a mentor whose background and interests match yours." },
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
              Built by students, for students — relatable mentors who've recently walked the paths you're considering.
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
      {/* ADVISORS                                        */}
      {/* ============================================== */}
      <section ref={advisorsRef} className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Heading eyebrow="Our advisors" text="Meet your future mentor" />
            <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              Each advisor brings their own background. Find one whose journey lines up with yours.
            </p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {shuffledAdvisors.map((advisor, index) => (
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="card-ring w-full p-6 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center hover:shadow-xl transition"
                key={index}
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

                <div className={`flex flex-wrap gap-2 mb-5 justify-center ${getTagHeight(advisor.advisingTopics.length)}`}>
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
          </div>
        </Container>
      </section>

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
              Become part of the next generation of mentors
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
