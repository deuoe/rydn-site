import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Heart, Sparkles, Users, Lightbulb, ArrowRight, Globe2, MapPin } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import { useTranslation } from "./i18n/useTranslation"
import aboutImg from "./assets/images/About Us.jpeg"

export default function AboutUs() {
  const { t } = useTranslation()

  const values = [
    { Icon: Heart, title: t("about.v1Title"), body: t("about.v1Body"), color: "from-rose-400 to-pink-500" },
    { Icon: Users, title: t("about.v2Title"), body: t("about.v2Body"), color: "from-sky-400 to-indigo-500" },
    { Icon: Lightbulb, title: t("about.v3Title"), body: t("about.v3Body"), color: "from-amber-400 to-orange-500" },
    { Icon: Sparkles, title: t("about.v4Title"), body: t("about.v4Body"), color: "from-emerald-400 to-teal-500" },
  ]

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
              {t("about.eyebrow")}
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              {t("about.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              {t("about.lede")}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ===================== STORY ===================== */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                {t("about.storyTitle")}
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
                {t("mission.line1")} <span className="text-slate-400">{t("mission.line2")}</span>
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />
            </div>

            <div className="lg:col-span-7 space-y-5 text-base md:text-lg text-slate-700 leading-relaxed">
              <p>{t("about.storyP1")}</p>
              <p>{t("about.storyP2")}</p>
              <p>{t("about.storyP3")}</p>
            </div>
          </div>

          {/* Photo banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 relative overflow-hidden rounded-3xl shadow-xl"
          >
            <img src={aboutImg} alt="Students working together" className="w-full h-72 md:h-[28rem] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <p className="font-display text-2xl md:text-4xl max-w-2xl leading-tight">
                "Mentorship should be approachable, relatable, and empowering."
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="py-20 bg-rydn-mesh">
        <Container>
          <Heading eyebrow={t("about.valuesTitle")} text={t("about.valuesTitle")} />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, body, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card-ring rounded-3xl bg-white p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-md`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">{body}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== BILINGUAL / LOCATION ===================== */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-sky-50 border border-slate-200 p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white mb-5 shadow-md">
                  <Globe2 size={22} />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-slate-900">
                  {t("about.bilingualTitle")}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {t("about.bilingualBody")}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-sky-600" />
                  Richmond Hill, Ontario, Canada
                </div>
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                {[
                  { code: "EN", label: "English" },
                  { code: "FR", label: "Français" },
                  { code: "ES", label: "Español" },
                ].map(({ code, label }) => (
                  <div
                    key={code}
                    className="rounded-2xl bg-white border border-slate-200 px-5 py-4 shadow-sm flex flex-col items-center min-w-[7rem]"
                  >
                    <span className="font-display text-2xl font-semibold text-slate-900">{code}</span>
                    <span className="text-xs text-slate-500 mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== CLOSING CTA ===================== */}
      <section className="pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 px-8 py-14 md:px-14 md:py-16 text-center text-white"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight relative">
              {t("about.ctaTitle")}
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center relative">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-white text-slate-900 px-8 py-4 font-semibold hover:bg-sky-50 transition"
              >
                {t("about.ctaButton")} <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/our-team"
                className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur text-white border border-white/30 px-8 py-4 font-semibold hover:bg-white/20 transition"
              >
                Meet our team
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
