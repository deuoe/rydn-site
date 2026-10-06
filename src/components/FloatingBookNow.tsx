import { useLocation } from "react-router-dom"
import { Link } from "../i18n/Link"
import { stripLangPrefix, stripBrandPrefix } from "../i18n/useLocalizedNav"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Calendar, X } from "lucide-react"
import { useTranslation } from "../i18n/useTranslation"
import { haptic } from "../lib/rydnNative"

const DISMISS_KEY = "rydn:book-bar-dismissed"

/**
 * A sticky floating Book Now button that's always visible on mobile after the user
 * has scrolled past the hero. Designed for high-conversion ad traffic from
 * Instagram / Facebook / YouTube where the goal is to get to the advisor list fast.
 *
 * So it never sits on top of content the visitor is trying to use, the bar:
 *   - can be dismissed (remembered for the browser session)
 *   - hides while the footer (newsletter form) is on screen
 *   - hides while any text field has focus (mobile keyboard open)
 *   - renders an in-flow spacer so the end of the page can scroll clear of it
 */
export default function FloatingBookNow() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const [typing, setTyping] = useState(false)
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "1"
    } catch {
      return false
    }
  })

  // Strip BOTH lang and brand so /youth, /fr/youth, etc. all count as home.
  const cleanPath = stripBrandPrefix(stripLangPrefix(location.pathname))
  const onHome = cleanPath === "/" || cleanPath === ""

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return
    const io = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable='true']")
    const onFocusIn = (e: FocusEvent) => setTyping(isField(e.target))
    const onFocusOut = () => setTyping(false)
    document.addEventListener("focusin", onFocusIn)
    document.addEventListener("focusout", onFocusOut)
    return () => {
      document.removeEventListener("focusin", onFocusIn)
      document.removeEventListener("focusout", onFocusOut)
    }
  }, [])

  const show = scrolledPastHero && !footerVisible && !typing && !dismissed

  const dismiss = () => {
    haptic("selection")
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, "1")
    } catch {
      // Private mode etc. Dismissal still holds for this page view.
    }
  }

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
    <>
      {/* Scroll clearance: lets the last bit of the page scroll above the
          fixed bar + chat bubble on mobile. Desktop has no bottom bar. */}
      <div aria-hidden className="h-[calc(5.5rem+env(safe-area-inset-bottom))] lg:hidden" />

      {/* Right inset (5.25rem) leaves room for the chat bubble (h-14 + right-4
          + gap), which sits on the same bottom row on mobile. */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-4 right-[5.25rem] z-30 lg:hidden"
            style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <Link
              to={onHome ? "#advisors" : "/#advisors"}
              onClick={handleClick}
              className="flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-900 pl-6 pr-12 py-4 text-base font-bold shadow-2xl active:shadow-md active:translate-y-0.5 transition animate-glow-pulse"
            >
              <Calendar size={18} />
              {t("nav.bookNow")}
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Hide booking bar"
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-900/70 hover:text-slate-900 hover:bg-black/10 transition"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
