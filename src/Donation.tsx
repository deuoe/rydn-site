import type { ComponentType, SVGProps } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Heart, Users, Handshake, Share2, GraduationCap, Mail } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"

// Live Zeffy donation page.
const DONATION_URL: string | null = "https://www.zeffy.com/en-CA/donation-form/support-us-28"

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

type SupportPath = {
  Icon: LucideIcon
  title: string
  body: string
  cta: string
  href: string
  external?: boolean
}

export default function Donation() {
  const supportPath = (
    Icon: LucideIcon,
    title: string,
    body: string,
    cta: string,
    href: string,
    external = false
  ): SupportPath => ({ Icon, title, body, cta, href, external })

  const ways: SupportPath[] = [
    supportPath(
      Users,
      "Become an Advisor",
      "Share your experience with students who are exploring the path you've already walked. Most of our advisors give just an hour or two a month.",
      "Apply to advise",
      "/become-advisor"
    ),
    supportPath(
      Handshake,
      "Partner with Us",
      "Schools, libraries, and community organizations: we run workshops and mentorship sessions in partnership with you.",
      "Start a partnership",
      "/partner-with-us"
    ),
    supportPath(
      GraduationCap,
      "Refer a Student",
      "Know a high-school or university student who could use guidance? Send them our way — every session is free.",
      "Send them to RYDN",
      "/"
    ),
    supportPath(
      Share2,
      "Spread the Word",
      "Follow us on social media and share our work with your community. Awareness is what helps us reach the students who need us most.",
      "Follow on Instagram",
      "https://instagram.com/rydn.ca",
      true
    ),
    supportPath(
      Mail,
      "Get in Touch",
      "Have an idea, a question, or another way you'd like to help? We'd love to hear from you.",
      "Email us",
      "mailto:info@rydn.ca",
      true
    ),
  ]

  return (
    <Container>
      {/* Hero */}
      <motion.section
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heading text="Support Our Mission" />
        <p className="mt-6 text-slate-700 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
          RYDN keeps mentorship <strong>free</strong> for every student we serve. We can do that
          because of people like you. Whether you give your time, your network, or a one-time
          donation — every contribution helps a student find direction.
        </p>
      </motion.section>

      {/* Donate block */}
      <motion.section
        className="mt-12 rounded-3xl bg-gradient-to-br from-sky-100 via-white to-sky-50 p-8 md:p-12 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white">
          <Heart size={28} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Make a Donation</h2>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto leading-relaxed">
          Your donation expands access to free mentorship, funds workshops, and helps us reach
          students who otherwise wouldn't have guidance. Every dollar goes directly into our programs.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {DONATION_URL ? (
            <a
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
            >
              Donate Now
            </a>
          ) : (
            <a
              href="mailto:info@rydn.ca?subject=I%27d%20like%20to%20donate%20to%20RYDN&body=Hi%20RYDN%20team%2C%0D%0A%0D%0AI%27d%20like%20to%20support%20your%20work.%20Could%20you%20share%20how%20I%20can%20give%3F%0D%0A%0D%0AThanks%21"
              className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-8 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
            >
              Donate Now
            </a>
          )}
          <a
            href="mailto:info@rydn.ca?subject=Donation%20question"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-semibold text-slate-900 border border-slate-300 transition hover:bg-slate-50"
          >
            Ask a question
          </a>
        </div>

        <p className="mt-6 text-sm text-slate-500 max-w-xl mx-auto">
          RYDN is an incorporated nonprofit in Canada. For questions about giving, e-transfer
          details, or recurring donations, email <a href="mailto:info@rydn.ca" className="underline decoration-sky-400 underline-offset-4 hover:text-sky-700">info@rydn.ca</a>.
        </p>
      </motion.section>

      {/* Other ways to support */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <Heading text="Other Ways to Help" />
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
            You don't have to give money to make a difference. Here are other ways to be part of RYDN.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ways.map(({ Icon, title, body, cta, href, external }, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition flex flex-col"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">{title}</h3>
              <p className="text-slate-600 leading-relaxed flex-1">{body}</p>

              <div className="mt-6">
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sky-700 font-semibold hover:text-sky-900 transition"
                  >
                    {cta} <span aria-hidden className="ml-1">→</span>
                  </a>
                ) : (
                  <Link
                    to={href}
                    className="inline-flex items-center text-sky-700 font-semibold hover:text-sky-900 transition"
                  >
                    {cta} <span aria-hidden className="ml-1">→</span>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Closing line */}
      <motion.section
        className="mt-16 mb-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-slate-700 max-w-2xl mx-auto leading-relaxed text-lg italic">
          Together, we can turn potential into opportunity.
        </p>
      </motion.section>
    </Container>
  )
}
