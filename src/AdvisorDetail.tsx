import { useParams } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, ArrowRight, Calendar, Share2, GraduationCap } from "lucide-react"
import Container from "./components/Container"
import SkeletonImage from "./components/SkeletonImage"
import { Link } from "./i18n/Link"
import { getAdvisorBySlug } from "./data/advisors"
import { UNIVERSITIES } from "./data/universities"
import NotFound from "./NotFound"

/**
 * /advisors/:slug — Full story page for one advisor.
 *
 * Sections:
 *   1. Hero: photo, name, role, booking CTA, share
 *   2. Education: full list of universities with logos
 *   3. Specializations: the advising topic chips
 *   4. Long-form bio (when supplied)
 *   5. Related advisors (future)
 */
export default function AdvisorDetail() {
  const { slug } = useParams<{ slug: string }>()
  const advisor = slug ? getAdvisorBySlug(slug) : undefined

  // Unknown slug → render the existing 404 page instead of a half-broken page
  if (!advisor) {
    return <NotFound />
  }

  const handleShare = async () => {
    if (typeof navigator === "undefined") return
    const url = window.location.href
    const text = `Meet ${advisor.name} on RYDN — ${advisor.description}.`
    // Use the Web Share API on supported devices (iOS, Android, modern desktops).
    // Falls back to copying the URL to the clipboard.
    if (navigator.share) {
      try {
        await navigator.share({ title: `${advisor.name} · RYDN`, text, url })
      } catch {
        /* user cancelled — fine */
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      alert("Link copied to clipboard")
    }
  }

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate -mt-20 pt-32 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl animate-float" />
        <div
          className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <Container>
          {/* Back link */}
          <Link
            to="/#advisors"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition mb-8"
          >
            <ArrowLeft size={16} /> All advisors
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
          >
            <div className="md:col-span-5 flex md:justify-end">
              <SkeletonImage
                src={advisor.photo}
                alt={advisor.name}
                shape="rounded-full"
                className="w-56 h-56 md:w-64 md:h-64 ring-8 ring-white/15 shadow-2xl"
              />
            </div>

            <div className="md:col-span-7 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold border border-white/20">
                <GraduationCap size={14} className="text-amber-300" />
                RYDN Advisor
              </span>
              <h1 className="font-display mt-5 text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05]">
                {advisor.name}
              </h1>
              <p className="mt-3 text-lg sm:text-xl text-white/85">
                {advisor.description}
              </p>

              {/* Booking + share row */}
              <div className="mt-8 flex flex-wrap gap-3">
                {advisor.bookingLink ? (
                  <a
                    href={advisor.bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
                  >
                    <Calendar size={18} />
                    Book with {advisor.name.split(" ")[0]}
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 text-white/70 px-6 py-3.5 font-semibold">
                    Booking coming soon
                  </span>
                )}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 font-semibold transition backdrop-blur"
                  aria-label="Share advisor profile"
                >
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== EDUCATION ===================== */}
      {advisor.universities && advisor.universities.length > 0 && (
        <section className="py-16 bg-slate-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
                Education
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center">
                {advisor.universities.length === 1
                  ? "Where they study"
                  : "Their academic journey"}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

              <div className="mt-10 flex items-center justify-center flex-wrap gap-x-10 gap-y-6">
                {advisor.universities.map((uniKey, idx) => {
                  const uni = UNIVERSITIES[uniKey]
                  if (!uni) return null
                  const baseHeight = 80
                  const finalHeight = Math.round(baseHeight * (uni.displayScale ?? 1))
                  return (
                    <div key={`${uniKey}-${idx}`} className="flex flex-col items-center gap-3">
                      <img
                        src={uni.logo}
                        alt={uni.name}
                        title={uni.name}
                        style={{ height: `${finalHeight}px` }}
                        className="w-auto object-contain"
                      />
                      <span className="text-sm font-semibold text-slate-700">{uni.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ===================== SPECIALIZATIONS ===================== */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              Specializations
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center">
              {advisor.name.split(" ")[0]} can help with
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {advisor.advisingTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="bg-sky-50 text-sky-700 px-5 py-2.5 rounded-full text-base font-semibold border border-sky-100"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== BIO ===================== */}
      {advisor.bio && advisor.bio.length > 0 && (
        <section className="py-16 bg-slate-50">
          <Container>
            <div className="max-w-3xl mx-auto">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
                About
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center">
                {advisor.name.split(" ")[0]}'s story
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

              <div className="mt-10 space-y-5 text-base md:text-lg text-slate-700 leading-relaxed">
                {advisor.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ===================== CLOSING CTA ===================== */}
      <section className="pb-24 pt-10">
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

            <h2 className="font-display text-3xl md:text-4xl font-semibold relative">
              Ready to book with {advisor.name.split(" ")[0]}?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-white/85 leading-relaxed relative">
              Sessions are free and 1-on-1. Pick a time that works for you.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              {advisor.bookingLink ? (
                <a
                  href={advisor.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-8 py-4 font-bold shadow-lg hover:shadow-xl transition"
                >
                  <Calendar size={18} />
                  Book with {advisor.name.split(" ")[0]}
                </a>
              ) : (
                <span className="inline-flex items-center rounded-full bg-white/10 border border-white/20 text-white/70 px-8 py-4 font-semibold">
                  Booking coming soon
                </span>
              )}
              <Link
                to="/#advisors"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 font-semibold text-white hover:bg-white/10 transition"
              >
                Browse other advisors <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
