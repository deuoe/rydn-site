import { motion } from "motion/react"
import { Sparkles, School, BookOpen, Globe2, Users, ArrowRight, Mail, CheckCircle2 } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"

const PARTNERSHIP_TYPES = [
  {
    Icon: School,
    title: "High Schools",
    body: "On-site or virtual workshops on university applications, career exploration, and study skills, tailored to your students.",
    color: "from-sky-400 to-indigo-500",
  },
  {
    Icon: BookOpen,
    title: "Libraries & Community Centres",
    body: "Public-facing programming for youth in your community — bilingual sessions, panels, and Q&As.",
    color: "from-amber-400 to-orange-500",
  },
  {
    Icon: Globe2,
    title: "International Schools",
    body: "Specialized sessions on Canadian university pathways for students considering studying in Canada.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    Icon: Users,
    title: "Student Organizations",
    body: "Co-host events with your club or society — speaker panels, application workshops, advising intros.",
    color: "from-violet-400 to-purple-500",
  },
]

const HOW_IT_WORKS = [
  "Reach out and tell us a bit about your students.",
  "We'll set up a quick call to understand your needs.",
  "We design a tailored session — content, length, format.",
  "We deliver the session online, in-person, or hybrid.",
]

const MAILTO =
  "mailto:info@rydn.ca?subject=Partnership inquiry - RYDN&body=Hi RYDN team,%0D%0A%0D%0AWe'd like to explore a partnership.%0D%0A%0D%0AOrganization name:%0D%0AYour role:%0D%0ALocation:%0D%0AEstimated number of students:%0D%0AWhat you're hoping to achieve:%0D%0A%0D%0AThanks!"

export default function PartnerWithUs() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -right-20 -z-10 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              For schools, libraries & organizations
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Bring RYDN to
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                your students.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              We collaborate with high schools, academies, libraries, and educational institutions across Canada and internationally to support students' academic and career exploration.
            </p>
            <a
              href={MAILTO}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-8 py-3.5 font-semibold hover:bg-amber-50 transition"
            >
              <Mail size={16} />
              Start a partnership
            </a>
          </motion.div>
        </Container>
      </section>

      {/* TYPES OF PARTNERSHIPS */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="Who we work with" text="Four ways to partner" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {PARTNERSHIP_TYPES.map(({ Icon, title, body, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white p-7 md:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-md`}>
                  <Icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-rydn-mesh">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">How it works</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
                Simple to set up. Flexible to deliver.
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                We meet you where you are. Whether you've got 20 students or 200, online or in-person, we'll build a session that fits.
              </p>
            </div>

            <ol className="lg:col-span-7 space-y-4">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
                >
                  <div className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                  <p className="pt-1.5 text-slate-700 leading-relaxed">{step}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="What's included" text="Everything you'd expect" />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Custom-tailored content for your students",
              "Bilingual delivery (English / French)",
              "Online, in-person, or hybrid",
              "Pre-event coordination call",
              "Q&A panel with current university students",
              "Follow-up resources for attendees",
              "All sessions are free — no cost to your organization",
              "Promotional materials available",
              "Dedicated point of contact",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm"
              >
                <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CLOSING CTA */}
      <section className="pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-emerald-900 to-sky-900 px-8 py-14 md:px-14 md:py-16 text-center text-white"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
            <Sparkles size={36} className="mx-auto text-amber-300 relative" />
            <h2 className="font-display mt-6 text-3xl md:text-5xl font-semibold leading-tight relative max-w-3xl mx-auto">
              Let's design something for your students.
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-white/85 leading-relaxed relative">
              Tell us about your organization and we'll get back within a few business days.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center relative">
              <a
                href={MAILTO}
                className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-8 py-4 font-semibold hover:bg-amber-50 transition"
              >
                <Mail size={16} className="mr-2" />
                Email our partnerships team
              </a>
              <a
                href="tel:+16474983938"
                className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur text-white border border-white/30 px-8 py-4 font-semibold hover:bg-white/20 transition"
              >
                Call (647) 498-3938
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
