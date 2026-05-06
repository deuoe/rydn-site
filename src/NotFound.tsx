import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Sparkles, Calendar, Home, ArrowRight } from "lucide-react"
import Container from "./components/Container"
import { useTranslation } from "./i18n/useTranslation"

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="relative isolate -mt-20 pt-32 pb-20 min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900">
      <div className="grain -z-10" />
      <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
            <Sparkles size={14} className="text-amber-300" />
            {t("notFound.badge")}
          </span>

          <h1 className="font-display mt-6 text-6xl sm:text-7xl md:text-8xl font-semibold text-white leading-[1.05]">
            <span className="bg-gradient-to-r from-sky-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <p className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl text-white">
            {t("notFound.title")}
          </p>
          <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            {t("notFound.body")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/#advisors"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-900 px-8 py-4 font-bold shadow-xl hover:shadow-2xl transition animate-glow-pulse"
            >
              <Calendar size={18} />
              {t("notFound.bookCta")}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur text-white border border-white/30 px-8 py-4 font-semibold hover:bg-white/20 transition"
            >
              <Home size={16} />
              {t("notFound.homeCta")}
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
