import { motion } from "motion/react"
import { Sparkles, Globe2, Heart, ShieldCheck, MessageCircle, ArrowRight, Calendar, GraduationCap } from "lucide-react"
import Container from "./components/Container"
import { Link } from "./i18n/Link"
import SkeletonImage from "./components/SkeletonImage"
import { getAdvisorBySlug } from "./data/advisors"

/**
 * /for-newcomers — English-language campaign landing page targeted at
 * newcomer / immigrant / international student families.
 *
 * Single-purpose page. One audience. One goal: book a free advising
 * session with an advisor who has walked the international-student path.
 *
 * Designed to be:
 *   - Shared as a Facebook/Instagram ad destination
 *   - Linked from grant applications
 *   - Sent to partner organizations serving newcomers
 *   - SEO-targeted for "newcomer student support Canada" queries
 */
export default function ForNewcomers() {
  const founder = getAdvisorBySlug("sam-sina")

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
              <Globe2 size={14} className="text-amber-300" />
              For newcomer families
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Coming to Canada to study?
              <br />
              <span className="text-amber-300">We've been there.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              RYDN connects newcomer and international students with university advisors who walked
              the same path — 2-3 years before you. Free, multilingual, and built by founders who
              navigated the journey themselves.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/#advisors"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Calendar size={18} />
                Find a free advisor
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 font-semibold transition backdrop-blur"
              >
                Learn how it works
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== FOUNDER STORY ===================== */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4">
              {founder?.photo && (
                <SkeletonImage
                  src={founder.photo}
                  alt={founder.name}
                  shape="rounded-3xl"
                  className="w-full h-full object-cover shadow-xl ring-4 ring-slate-100 aspect-square"
                />
              )}
            </div>
            <div className="md:col-span-8">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                Built by a newcomer, for newcomers
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Sam came to Canada from Iran.
                <br />
                <span className="text-slate-400">RYDN exists because of that.</span>
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />
              <p className="mt-6 text-base md:text-lg text-slate-700 leading-relaxed">
                Sam Sina, RYDN's co-founder, studied at the University of Guilan in Iran before
                transferring to George Brown Polytechnic and then York University in Canada. The
                journey was confusing, expensive, and often lonely. There was no one to ask the
                "small" questions that turned out not to be small at all.
              </p>
              <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
                RYDN exists so the next student doesn't have to figure it out alone.
              </p>

              <Link
                to="/advisors/sam-sina"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
              >
                Read Sam's full story
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== WHY US ===================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              Built for your journey
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 text-center">
              Why families choose RYDN
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  Icon: Heart,
                  title: "Always 100% free",
                  body: "No subscription, no hidden fees, no premium tier. Free for every student, regardless of background or income.",
                  color: "from-rose-400 to-pink-500",
                },
                {
                  Icon: Globe2,
                  title: "Multilingual support",
                  body: "Advising and chat in English, French, Spanish, Persian, and Hebrew. Talk to someone who understands your language and your context.",
                  color: "from-sky-400 to-indigo-500",
                },
                {
                  Icon: MessageCircle,
                  title: "Real students, not consultants",
                  body: "Our advisors are current university students or recent graduates. They've taken the MCAT, applied to programs, navigated transfers. Not paid consultants reading from a script.",
                  color: "from-emerald-400 to-teal-500",
                },
                {
                  Icon: ShieldCheck,
                  title: "Registered Canadian nonprofit",
                  body: "RYDN is a registered nonprofit aligned with four UN Sustainable Development Goals. No ads. No tracking. No data sale.",
                  color: "from-amber-400 to-orange-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md`}
                  >
                    <item.Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed text-base">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 text-center">
              Three steps. Always free.
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {[
                {
                  step: "01",
                  title: "Browse advisors",
                  body: "Search by field, school, or language. Find someone whose path matches yours.",
                  Icon: GraduationCap,
                },
                {
                  step: "02",
                  title: "Book a session",
                  body: "Pick a time that works. All sessions are 1-on-1, online, and confidential.",
                  Icon: Calendar,
                },
                {
                  step: "03",
                  title: "Walk away with a plan",
                  body: "Real advice from someone who's been there. Follow-up sessions are always free too.",
                  Icon: ArrowRight,
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-4xl font-bold text-slate-200">{s.step}</span>
                    <s.Icon size={26} className="text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== CLOSING CTA ===================== */}
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

            <Sparkles size={36} className="mx-auto text-amber-300 relative" />
            <h2 className="font-display mt-6 text-3xl md:text-5xl font-semibold relative leading-tight">
              Your next step starts with one free session.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/85 leading-relaxed relative">
              No commitment. No cost. Just a real conversation with someone who's been where you're
              going.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              <Link
                to="/#advisors"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Calendar size={18} />
                Find an advisor
              </Link>
              <Link
                to="/governance"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10 transition"
              >
                Why you can trust us
                <ShieldCheck size={16} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
