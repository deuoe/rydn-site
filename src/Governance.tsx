import { motion } from "motion/react"
import { Sparkles, FileText, Download, ShieldCheck, Users, Crown, BookOpen, Mail, Calendar } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import SkeletonImage from "./components/SkeletonImage"
import { Link } from "./i18n/Link"
import saraUrl from "./assets/images/Sara.jpg"
import sinaUrl from "./assets/images/Sina.jpeg"

/**
 * /governance — the home of RYDN's transparency and accountability documentation.
 * Funders, school partners, and prospective advisors all check this page.
 *
 * Sections:
 *   1. Hero
 *   2. Board of Directors (bios + photos)
 *   3. Policies & documents (downloadable .docx files)
 *   4. Board meeting practice (cadence, minutes retention, conflict-of-interest declarations)
 *   5. Contact box
 */

type BoardMember = {
  name: string
  role: string
  bio: string
  photo?: string
  initials: string
  accent: string // tailwind gradient classes
}

const BOARD: BoardMember[] = [
  {
    name: "Sara Roozbahani",
    role: "Founder & Executive Director",
    bio:
      "Sara co-founded RYDN with the conviction that every student deserves trusted, free advising — regardless of background, income, or first language. As Executive Director she sets the strategic direction, oversees programs, and represents RYDN to funders, school boards, and the wider education community across Canada.",
    photo: saraUrl,
    initials: "SR",
    accent: "from-rose-400 to-pink-500",
  },
  {
    name: "Sina Ansari Movahed",
    role: "Founder & Director of Operations & Technology",
    bio:
      "Sina co-founded RYDN to make academic and career advising free and accessible for every student. As Director of Operations & Technology he leads day-to-day operations, builds the platform that powers RYDN's advising and AI matchmaker, and stewards partnerships with schools and universities.",
    photo: sinaUrl,
    initials: "SA",
    accent: "from-sky-400 to-indigo-500",
  },
  {
    name: "Fereshteh Ansari Damavandi",
    role: "Director",
    bio:
      "Fereshteh joins the RYDN board to bring independent oversight and perspective to the organization's growth. Her role on the board helps ensure RYDN's decisions stay anchored to its mission of accessible, multilingual mentorship for Canadian students.",
    initials: "FA",
    accent: "from-amber-400 to-orange-500",
  },
]

type DocItem = {
  title: string
  description: string
  filename: string
  Icon: typeof FileText
  badge?: string
}

const DOCUMENTS: DocItem[] = [
  {
    title: "Code of Conduct for Advisors",
    description:
      "Standards of behaviour for everyone who advises students through RYDN, including boundaries with minors, mandatory reporting, confidentiality, and online safety.",
    filename: "RYDN_Code_of_Conduct_for_Advisors.docx",
    Icon: ShieldCheck,
    badge: "Required for all advisors",
  },
  {
    title: "Conflict of Interest Policy",
    description:
      "How directors, officers, staff, and key volunteers identify, disclose, and manage actual, potential, or perceived conflicts of interest.",
    filename: "RYDN_Conflict_of_Interest_Policy.docx",
    Icon: BookOpen,
    badge: "Annual disclosure required",
  },
  {
    title: "Board Meeting Minutes — Template",
    description:
      "Reusable template that the Secretary duplicates for every board meeting. Captures attendance, motions, action items, and conflict-of-interest declarations.",
    filename: "RYDN_Board_Meeting_Minutes_Template.docx",
    Icon: Calendar,
  },
]

export default function Governance() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              Transparency & accountability
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Governance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              The people who lead RYDN, the policies we operate under, and how we hold ourselves
              accountable to the students, schools, and funders who trust us.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ===================== BOARD OF DIRECTORS ===================== */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="Board of Directors" text="The people accountable for RYDN" />
          <p className="mt-6 max-w-3xl mx-auto text-center text-slate-600 leading-relaxed text-base md:text-lg">
            RYDN's Board of Directors sets strategic direction, approves the annual budget, and
            holds the organization accountable to its mission. The board meets regularly and keeps
            minutes for every meeting.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOARD.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
              >
                {/* Photo or initials avatar */}
                <div className="flex justify-center">
                  {member.photo ? (
                    <SkeletonImage
                      src={member.photo}
                      alt={member.name}
                      shape="rounded-full"
                      className="h-32 w-32 ring-4 ring-slate-100 shadow-md"
                    />
                  ) : (
                    <div
                      className={`h-32 w-32 rounded-full ring-4 ring-slate-100 shadow-md flex items-center justify-center bg-gradient-to-br ${member.accent} text-white font-display text-3xl font-bold`}
                    >
                      {member.initials}
                    </div>
                  )}
                </div>

                <div className="mt-5 text-center">
                  <h3 className="font-display text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-sky-700">{member.role}</p>
                </div>

                <p className="mt-5 text-sm text-slate-600 leading-relaxed flex-1">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Founder badge note */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-900">
              <Crown size={16} className="text-amber-600" />
              All current directors serve without compensation.
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== POLICIES & DOCUMENTS ===================== */}
      <section className="py-20 bg-rydn-mesh">
        <Container>
          <Heading eyebrow="Policies & documents" text="How we operate, in writing" />
          <p className="mt-6 max-w-3xl mx-auto text-center text-slate-600 leading-relaxed">
            These documents formalize how RYDN protects students, manages risk, and stays
            accountable to its board and the public. They are reviewed by the board at least
            annually.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCUMENTS.map((doc, i) => (
              <motion.div
                key={doc.filename}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md self-start">
                  <doc.Icon size={22} />
                </div>
                {doc.badge && (
                  <span className="self-start mb-3 inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                    {doc.badge}
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">
                  {doc.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                  {doc.description}
                </p>
                <a
                  href={`/${doc.filename}`}
                  download
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2.5 text-sm font-semibold hover:bg-sky-600 transition"
                >
                  <Download size={16} />
                  Download (.docx)
                </a>
              </motion.div>
            ))}
          </div>

          {/* Privacy policy + Terms link separately */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/privacy-policy"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition"
            >
              <FileText size={16} />
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700 transition"
            >
              <FileText size={16} />
              Terms of Service
            </Link>
          </div>
        </Container>
      </section>

      {/* ===================== HOW WE OPERATE ===================== */}
      <section className="py-20">
        <Container>
          <Heading eyebrow="Board practice" text="How we hold ourselves accountable" />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Calendar,
                title: "Regular meetings",
                body: "The Board meets at least quarterly. Special meetings are called when material decisions are required between regular meetings.",
              },
              {
                Icon: FileText,
                title: "Minutes for every meeting",
                body: "The Secretary records minutes for every board meeting, including motions, votes, action items, and any conflict-of-interest declarations. Minutes are retained for at least seven years.",
              },
              {
                Icon: ShieldCheck,
                title: "Annual disclosures",
                body: "Every director, officer, staff member, and key volunteer signs an annual Conflict of Interest disclosure. Background checks are renewed every three years for anyone working directly with minors.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white p-7 shadow-sm border border-slate-200"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md">
                  <item.Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 p-10 md:p-14 text-center text-white"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

            <Users size={36} className="mx-auto text-amber-300 relative" />
            <h2 className="font-display mt-6 text-3xl md:text-4xl font-semibold relative">
              Questions about governance?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/85 leading-relaxed relative">
              Funders, school partners, journalists, or anyone wanting to dig deeper — we're glad
              to share more. Reach out and we'll get back within two business days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              <a
                href="mailto:info@rydn.ca"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-sky-50 transition"
              >
                <Mail size={16} />
                info@rydn.ca
              </a>
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                About RYDN
              </Link>
            </div>

            <p className="mt-10 text-xs text-white/60 relative">
              RooZ Youth Development Network · Réseau de développement de la jeunesse RooZ · Registered Canadian nonprofit · Ontario Corp. No. 1001539743
            </p>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
