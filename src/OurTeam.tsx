import { Link } from "./i18n/Link"
import { motion } from "motion/react"
import { Sparkles, ArrowRight, Crown, Heart } from "lucide-react"
import { FaLinkedinIn } from "react-icons/fa"
import Container from "./components/Container"
import Heading from "./components/Heading"
import saraUrl from "./assets/images/Sara.jpg"
import sinaUrl from "./assets/images/Sina.jpeg"
import iliaUrl from "./assets/images/Leo.jpg"
import saharUrl from "./assets/images/Sahar.jpeg"
import mohsenUrl from "./assets/images/Mohsen.jpg"

type Founder = {
  name: string
  role: string
  photo: string
  bio: string
}

type TeamMember = {
  name: string
  role: string
  photo: string
  color: string
}

const FOUNDERS: Founder[] = [
  {
    name: "Sara Roozbahani",
    role: "Founder & Executive Director",
    photo: saraUrl,
    bio: "Sara leads RYDN's vision and direction, championing accessible advising for every student.",
  },
  {
    name: "Sam Sina Ansari Movahed",
    role: "Founder & Director of Operations & Technology",
    photo: sinaUrl,
    bio: "Sam runs operations and builds the technology that powers RYDN's advising platform.",
  },
]

const CORE_TEAM: TeamMember[] = [
  { name: "Ilia", role: "Marketing & Social Media Manager", photo: iliaUrl, color: "from-rose-400 to-pink-500" },
  { name: "Mohsen", role: "Cybersecurity & Web Infrastructure Lead", photo: mohsenUrl, color: "from-sky-400 to-indigo-500" },
  { name: "Sahar", role: "Outreach & Student Coordination Manager", photo: saharUrl, color: "from-amber-400 to-orange-500" },
]

export default function OurTeam() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -right-20 -z-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-500/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              The people behind RYDN
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Our team.
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Students supporting students. Meet the founders, core team, and growing community making RYDN possible.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* FOUNDERS */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="Founders" text="Started by students, with a purpose" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {FOUNDERS.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-ring relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition p-8"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-amber-400 blur-sm opacity-60" />
                    <img
                      src={f.photo}
                      alt={f.name}
                      className="relative w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                      loading="lazy"
                    />
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-9 w-9 rounded-full bg-amber-400 text-slate-900 shadow-md">
                      <Crown size={16} />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-2xl font-semibold text-slate-900">{f.name}</h3>
                    <p className="mt-1 text-sky-600 font-semibold text-sm">{f.role}</p>
                    <p className="mt-4 text-slate-600 leading-relaxed">{f.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CORE TEAM */}
      <section className="py-20 bg-rydn-mesh">
        <Container>
          <Heading eyebrow="Core team" text="Building it day by day" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_TEAM.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition p-7 text-center"
              >
                <div className="relative inline-block">
                  <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${m.color} blur-sm opacity-50`} />
                  <img src={m.photo} alt={m.name} className="relative w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-md" loading="lazy" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{m.name}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{m.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Volunteer/advisor invitation card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 text-white p-8 md:p-12"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
              <div className="md:col-span-8">
                <Heart size={36} className="text-amber-300 mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
                  Plus 25+ advisors and a growing community of volunteers.
                </h2>
                <p className="mt-4 text-white/85 leading-relaxed max-w-2xl">
                  RYDN runs on people who care. If you're a student, a recent grad, or a professional with experience to share — there's a place for you here.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-3 md:items-end">
                <Link
                  to="/become-advisor"
                  className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-6 py-3 font-semibold hover:bg-sky-50 transition"
                >
                  Become an advisor <ArrowRight size={16} className="ml-2" />
                </Link>
                <a
                  href="https://www.linkedin.com/company/rooz-youth-development-network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur text-white border border-white/30 px-6 py-3 font-semibold hover:bg-white/20 transition"
                >
                  <FaLinkedinIn className="mr-2" />
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
