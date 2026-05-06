import { motion } from "motion/react"
import { Sparkles, Mail, Phone, MapPin, Clock, MessageSquare, Send, ArrowRight } from "lucide-react"
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa"
import Container from "./components/Container"
import Heading from "./components/Heading"

const SOCIALS = [
  { Icon: FaInstagram, href: "https://instagram.com/rydn.ca", label: "Instagram" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/rooz-youth-development-network", label: "LinkedIn" },
  { Icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61578801275086", label: "Facebook" },
]

const CONTACT_REASONS = [
  { Icon: MessageSquare, title: "General questions", body: "Anything about our programs, advisors, or how we work.", mailto: "mailto:info@rydn.ca?subject=Question for RYDN" },
  { Icon: Send, title: "Partnerships", body: "Schools, libraries, organizations — let's talk.", mailto: "mailto:info@rydn.ca?subject=Partnership inquiry" },
  { Icon: Sparkles, title: "Press & media", body: "Interview requests, press kits, speaking invitations.", mailto: "mailto:info@rydn.ca?subject=Press inquiry" },
]

export default function ContactUs() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900 to-violet-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-400/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <Container>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              Get in touch
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Let's talk.
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Questions, ideas, or just want to say hi? We'd love to hear from you. Most emails get a reply within two business days.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* PRIMARY CONTACT */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Big email card */}
            <motion.a
              href="mailto:info@rydn.ca"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-7 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 p-8 md:p-12 text-white hover:shadow-2xl transition"
            >
              <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur mb-6">
                  <Mail size={26} className="text-amber-300" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Email us</p>
                <p className="font-display mt-2 text-3xl md:text-5xl font-semibold leading-tight break-all">
                  info@rydn.ca
                </p>
                <p className="mt-4 text-white/85 max-w-md">Send us a message and we'll get back within two business days.</p>
                <span className="mt-8 inline-flex items-center gap-2 text-amber-200 font-semibold group-hover:gap-3 transition-all">
                  Compose <ArrowRight size={16} />
                </span>
              </div>
            </motion.a>

            {/* Right column: phone + location + hours */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              <motion.a
                href="tel:+16474983938"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="group rounded-3xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
                  <Phone size={22} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Phone</p>
                <p className="font-display mt-1 text-2xl font-semibold text-slate-900">(647) 498-3938</p>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4">
                  <MapPin size={22} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Location</p>
                <p className="mt-1 text-base font-semibold text-slate-900">Richmond Hill</p>
                <p className="text-sm text-slate-500">Ontario, Canada</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white border border-slate-200 p-7 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 mb-4">
                  <Clock size={22} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Response time</p>
                <p className="mt-1 text-base font-semibold text-slate-900">~2 business days</p>
                <p className="text-sm text-slate-500">For most inquiries</p>
              </motion.div>
            </div>
          </div>

          {/* Reasons to contact */}
          <div className="mt-16">
            <Heading eyebrow="What can we help with" text="Every kind of question" />
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONTACT_REASONS.map(({ Icon, title, body, mailto }, i) => (
                <motion.a
                  key={i}
                  href={mailto}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="card-ring group rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 text-sky-700">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed text-sm">{body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sky-700 font-semibold text-sm group-hover:gap-2 transition-all">
                    Email us <ArrowRight size={13} />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SOCIAL */}
      <section className="pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-sky-50 border border-slate-200 p-8 md:p-12 text-center"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-slate-900">Or find us on social</h3>
            <p className="mt-3 text-slate-600">We share student resources, workshop news, and behind-the-scenes.</p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-sky-600 hover:text-white hover:border-sky-600 hover:shadow-md transition"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
