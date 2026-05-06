import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ArrowDown } from "lucide-react"
import { useTranslation } from "../i18n/useTranslation"

const STORAGE_KEY = "rydn-ios-install-dismissed"
const DISMISS_DAYS = 14 // re-show after 2 weeks if dismissed

/**
 * Detect if the current device is iPhone/iPad/iPod running Safari.
 * Note: Chrome and Firefox on iOS still use WebKit, so we treat them the same —
 * Add to Home Screen works on all iOS browsers.
 */
function isIOS(): boolean {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent
  return /iPad|iPhone|iPod/.test(ua) && !/Windows/.test(ua)
}

/** Detect if the page is already running as an installed PWA. */
function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(display-mode: standalone)").matches) return true
  // iOS-specific
  const nav = window.navigator as Navigator & { standalone?: boolean }
  return nav.standalone === true
}

/** Banner that prompts iOS visitors to add the site to their home screen. */
export default function IOSInstallBanner() {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!isIOS()) return
    if (isStandalone()) return // already installed

    // Respect previous dismissal for DISMISS_DAYS
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const dismissedAt = Number(raw)
        const ageMs = Date.now() - dismissedAt
        if (ageMs < DISMISS_DAYS * 24 * 60 * 60 * 1000) return
      }
    } catch {
      /* localStorage may be unavailable */
    }

    // Wait a bit so it's not the first thing visitors see
    const timer = setTimeout(() => setShow(true), 6000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setShow(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed inset-x-3 bottom-3 z-50 lg:hidden"
          // Sits above the FloatingBookNow button (z-30) and below modals (z-50)
        >
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-sky-200/40 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-amber-200/30 blur-2xl" />

            <div className="relative p-4 pr-12">
              <div className="flex items-center gap-3">
                {/* App icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm shrink-0">
                  <img
                    src="/android-chrome-192x192.png"
                    alt="RYDN"
                    className="h-10 w-10 object-cover rounded-lg"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    {t("iosInstall.title")}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 leading-snug">
                    {t("iosInstall.step1")}{" "}
                    <span className="inline-flex items-center justify-center align-middle h-5 w-5 mx-1 rounded-md bg-sky-100 text-sky-700">
                      {/* Inline SVG of iOS share icon */}
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 16V4" />
                        <path d="m7 9 5-5 5 5" />
                        <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
                      </svg>
                    </span>
                    , {t("iosInstall.step2")}.
                  </p>
                </div>
              </div>

              {/* Subtle pointer arrow toward the bottom of the screen where Safari's nav lives */}
              <div className="mt-3 flex justify-center">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="text-sky-500"
                >
                  <ArrowDown size={18} />
                </motion.div>
              </div>
            </div>

            <button
              onClick={dismiss}
              aria-label={t("iosInstall.dismiss")}
              className="absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
