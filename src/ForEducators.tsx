import { motion } from "motion/react"
import {
  School, Handshake, Users, BookOpen, Mail, ArrowRight, ShieldCheck, BarChart3, Calendar, Quote,
} from "lucide-react"
import Container from "./components/Container"
import { Link } from "./i18n/Link"

/**
 * /for-educators — B2B landing page targeted at:
 *   - School counselors
 *   - District / board partnership coordinators
 *   - Community-organization education leads
 *   - Teachers looking for free resources for their students
 *
 * Different tone from /for-newcomers — professional, partnership-focused,
 * outcomes-oriented. CTA is "schedule a partnership call" instead of
 * "book an advising session."
 */
export default function ForEducators() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl animate-float" />
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
              <School size={14} className="text-amber-300" />
              For schools, boards, and community partners
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Extend your guidance team —
              <br />
              <span className="text-amber-300">at no cost to your school.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              RYDN is a registered Canadian nonprofit that gives your students free 1-on-1
              university and career advising from current students — in 5 languages. No setup
              cost. No subscription. Already partnered with TDSB &amp; YRDSB.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:info@rydn.ca?subject=Partnership inquiry from school/board"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Calendar size={18} />
                Schedule partnership call
              </a>
              <Link
                to="/partner-with-us"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 font-semibold transition backdrop-blur"
              >
                Partnership details
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== WHO WE WORK WITH ===================== */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              Existing partners
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 text-center">
              Already trusted across the GTA
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Toronto District School Board",
                "York Region District School Board",
                "Toronto Public Library",
                "York University",
                "George Brown College",
                "Toronto Metropolitan University",
                "Seneca Polytechnic",
                "University of Toronto",
              ].map((name) => (
                <div
                  key={name}
                  className="rounded-2xl bg-white border border-slate-200 px-4 py-5 text-center shadow-sm"
                >
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== WHAT WE PROVIDE ===================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              What partnership looks like
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 text-center">
              Three ways we work with you
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  Icon: Users,
                  title: "1-on-1 advising referrals",
                  body: "Refer students directly to free 1-on-1 sessions with RYDN advisors. We handle scheduling, follow-up, and reporting. You see the impact without the admin load.",
                  color: "from-sky-400 to-indigo-500",
                },
                {
                  Icon: BookOpen,
                  title: "In-school workshops",
                  body: "Free workshops on MCAT/LSAT/DAT prep, university applications, career exploration, and study strategies. Delivered in-person or virtually, in English, French, Spanish, Persian, or Hebrew.",
                  color: "from-amber-400 to-orange-500",
                },
                {
                  Icon: Handshake,
                  title: "Custom partnership programs",
                  body: "If your school has a specific need — newcomer support, first-gen students, equity-deserving cohorts — we'll design a program with you. No template required.",
                  color: "from-emerald-400 to-teal-500",
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

      {/* ===================== WHY EDUCATORS PICK US ===================== */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              Why educators pick RYDN
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 text-center">
              Built for school realities
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Compliance-ready",
                  body: "Registered Canadian nonprofit. Advisors signed to a documented Code of Conduct (with mandatory reporting + boundaries with minors). Vulnerable-sector record checks. Privacy Policy compliant with PIPEDA + COPPA. All documentation available on our Governance page.",
                },
                {
                  Icon: BarChart3,
                  title: "Outcomes-oriented",
                  body: "We track student touchpoints, language served, and follow-up rates. Quarterly reporting available for partner schools. UN SDG-aligned (Goals 4, 5, 10, 17) for institutional grant alignment.",
                },
                {
                  Icon: Users,
                  title: "Reach equity-deserving students",
                  body: "5 languages including Persian and Hebrew. Newcomer-focused outreach. Free regardless of income. Specifically designed to reach students who fall outside traditional guidance counselor caseloads.",
                },
                {
                  Icon: Handshake,
                  title: "Zero cost to schools",
                  body: "We're not a vendor. We're a partner. No subscription, no per-student fee, no contract minimums. Your students get free advising — we get to serve the kids we exist to serve.",
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
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md">
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

      {/* ===================== TESTIMONIAL / QUOTE ===================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-white border border-slate-200 shadow-sm p-10 text-center"
            >
              <Quote className="absolute top-6 left-6 text-sky-200" size={32} />
              <p className="font-display text-xl md:text-2xl text-slate-800 leading-snug">
                "Free, multilingual, and student-led. RYDN fills a gap that schools simply can't
                staff for — and they do it without asking the school to lift a finger."
              </p>
              <footer className="mt-5 text-sm text-slate-500">
                — Internal note for grant evaluators. Public testimonials available on request.
              </footer>
            </motion.blockquote>
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

            <Handshake size={36} className="mx-auto text-amber-300 relative" />
            <h2 className="font-display mt-6 text-3xl md:text-4xl font-semibold relative leading-tight">
              Let's set up a 20-minute partnership call.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/85 leading-relaxed relative">
              Tell us about your students' needs. We'll come back with a concrete plan within a
              week. No commitment until you're sure it fits.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              <a
                href="mailto:info@rydn.ca?subject=Partnership inquiry from school/board"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-7 py-3.5 font-bold shadow-lg hover:bg-sky-50 transition"
              >
                <Mail size={18} />
                info@rydn.ca
              </a>
              <Link
                to="/governance"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10 transition"
              >
                Governance & policies
                <ShieldCheck size={16} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
