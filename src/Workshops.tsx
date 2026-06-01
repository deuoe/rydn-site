import { Link } from "./i18n/Link"
import { motion } from "motion/react"
import { Calendar, MapPin, Sparkles, Video, ArrowRight, ExternalLink, Mail } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"

const FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSfWg443BHU5V5UPaNJiSz40sVgpkl4VCeP8sTC9pWn8uLinNw/viewform?usp=dialog"

type Workshop = {
  title: string
  subtitle?: string
  date: string // ISO YYYY-MM-DD for sorting
  displayDate: string // Friendly, e.g. "May 25, 2026"
  type: "Online" | "Hybrid" | "In-Person"
  location?: string
  link?: string
  topic?: string
}

const workshops: Workshop[] = [
  {
    title: "Top 6 Career Paths Explained by Students Living Them",
    subtitle: "Medicine, Business, Psychology, Pharmacy, Dental, Law",
    date: "2026-06-25",
    displayDate: "June 25, 2026",
    type: "Online",
    link: FORM_LINK,
    topic: "Career exploration",
  },
  {
    title: "How to Choose the RIGHT Career for You (Regret Free!)",
    date: "2026-07-12",
    displayDate: "July 12, 2026",
    type: "Online",
    link: FORM_LINK,
    topic: "Career exploration",
  },
  {
    title: "What You Should Be Doing RIGHT NOW as a High School Student",
    subtitle: "Hosted by a high school teacher (Grades 10–12)",
    date: "2026-08-05",
    displayDate: "August 5, 2026",
    type: "Hybrid",
    location: "Richmond Hill Central Library",
    link: FORM_LINK,
    topic: "High school",
  },
  {
    title: "How to Build a Strong Resume Before University",
    date: "2026-08-26",
    displayDate: "August 26, 2026",
    type: "Online",
    topic: "University prep",
  },
  {
    title: "What Nobody Tells You About University (Reality vs Expectations)",
    date: "2026-09-01",
    displayDate: "September 1, 2026",
    type: "Online",
    link: FORM_LINK,
    topic: "University prep",
  },
  {
    title: "Top Mistakes Students Make When Choosing Their Future",
    date: "2026-09-17",
    displayDate: "September 17, 2026",
    type: "Hybrid",
    location: "Richmond Hill Central Library",
    link: FORM_LINK,
    topic: "Career exploration",
  },
  {
    title: "Ask Me Anything: Healthcare Careers",
    subtitle: "Insights from students actively in the field",
    date: "2026-10-18",
    displayDate: "October 18, 2026",
    type: "Online",
    link: FORM_LINK,
    topic: "Healthcare",
  },
]

const TYPE_STYLES: Record<Workshop["type"], { bg: string; text: string; Icon: typeof Video }> = {
  Online: { bg: "bg-sky-50 border-sky-200", text: "text-sky-700", Icon: Video },
  Hybrid: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", Icon: MapPin },
  "In-Person": { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", Icon: MapPin },
}

function WorkshopCard({ w, idx }: { w: Workshop; idx: number }) {
  const typeStyle = TYPE_STYLES[w.type]
  const TypeIcon = typeStyle.Icon
  const dateObj = new Date(w.date + "T00:00:00")
  const month = dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
  const day = dateObj.getDate()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      viewport={{ once: true }}
      className="group card-ring rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden"
    >
      <div className="flex p-6 gap-5">
        {/* Date block */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white shadow-md">
          <span className="text-[10px] font-bold tracking-wider text-amber-300">{month}</span>
          <span className="font-display text-3xl font-semibold leading-none">{day}</span>
        </div>

        <div className="flex-1 min-w-0">
          <span
            className={
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border " +
              typeStyle.bg + " " + typeStyle.text
            }
          >
            <TypeIcon size={11} />
            {w.type}
          </span>
          {w.topic && (
            <span className="ml-2 inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {w.topic}
            </span>
          )}
          <h3 className="mt-2 text-lg font-bold text-slate-900 leading-snug">{w.title}</h3>
          {w.subtitle && (
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">{w.subtitle}</p>
          )}
          <p className="mt-2 text-xs text-slate-500">{w.displayDate}{w.location ? ` · ${w.location}` : ""}</p>
        </div>
      </div>

      <div className="mt-auto px-6 pb-6">
        {w.link ? (
          <a
            href={w.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-sky-600 transition"
          >
            Register <ExternalLink size={14} className="ml-2" />
          </a>
        ) : (
          <button
            disabled
            className="w-full inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-500 px-5 py-2.5 text-sm font-semibold cursor-not-allowed"
          >
            Registration opens soon
          </button>
        )}
      </div>
    </motion.article>
  )
}

export default function Workshops() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              Free workshops, all 2026
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Workshops that
              <br />
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                set you up.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Live, interactive sessions on academic strategy, career exploration, and university prep — taught by students currently living it.
            </p>
            <div className="mt-8 flex items-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2"><Calendar size={16} className="text-amber-300" /> {workshops.length} sessions scheduled</span>
              <span className="flex items-center gap-2"><Video size={16} className="text-sky-300" /> Online + in-person</span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* UPCOMING WORKSHOPS */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="Upcoming sessions" text="Save your seat" />
          <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            All workshops are free. Register through the form and you'll get a confirmation email with the link.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((w, i) => (
              <WorkshopCard key={i} w={w} idx={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* PARTNER CTA — moved out of hero into proper closing section */}
      <section className="pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-sky-50 border border-slate-200 p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">For schools & libraries</p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
                  Want a workshop at your school?
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  We tailor workshops for high schools, libraries, and community organizations across Canada and internationally — Canadian university pathways, study skills, and career exploration.
                </p>
              </div>
              <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:items-stretch">
                <Link
                  to="/partner-with-us"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-sky-600 transition"
                >
                  Partner with us <ArrowRight size={16} className="ml-2" />
                </Link>
                <a
                  href="mailto:info@rydn.ca?subject=Workshop request - RYDN&body=Hi RYDN team,%0D%0A%0D%0AWe'd like to host a workshop at our organization.%0D%0A%0D%0AOrganization name:%0D%0ALocation:%0D%0AEstimated attendees:%0D%0APreferred date:%0D%0A%0D%0AThanks!"
                  className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 border border-slate-200 px-6 py-3 font-semibold hover:bg-slate-50 transition"
                >
                  <Mail size={16} className="mr-2" />
                  Email us
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
