import { useLocation } from "react-router-dom"
import { Link } from "../i18n/Link"
import { stripLangPrefix } from "../i18n/useLocalizedNav"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Calendar } from "lucide-react"
import { useTranslation } from "../i18n/useTranslation"
import { haptic } from "../lib/rydnNative"

/**
 * A sticky floating Book Now button that's always visible on mobile after the user
 * has scrolled past the hero. Designed for high-conversion ad traffic from
 * Instagram / Facebook / YouTube where the goal is to get to the advisor list fast.
 */
export default function FloatingBookNow() {
  const { t } = useTranslation()
  const location = useLocation()
  const [show, setShow] = useState(false)

  const cleanPath = stripLangPrefix(location.pathname)
  const onHome = cleanPath === "/" || cleanPath === ""

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    // Native iOS haptic on Book Now tap (no-op on web)
    haptic("medium")
    if (onHome) {
      e.preventDefault()
      const advisors = document.getElementById("advisors")
      if (advisors) advisors.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-4 right-4 z-30 lg:hidden"
          style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <Link
            to={onHome ? "#advisors" : "/#advisors"}
            onClick={handleClick}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-900 px-6 py-4 text-base font-bold shadow-2xl active:shadow-md active:translate-y-0.5 transition animate-glow-pulse"
          >
            <Calendar size={18} />
            {t("nav.bookNow")}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
