import { useEffect, useRef, useState } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useTranslation } from "../i18n/useTranslation"
import { LANGUAGES } from "../i18n/translations"
import { haptic } from "../lib/rydnNative"

interface Props {
  /** Use light text/icon styling (over the dark hero) */
  transparent?: boolean
  /** Variant for the mobile menu list (full-width labelled buttons instead of a dropdown) */
  variant?: "dropdown" | "list"
}

export default function LanguageSwitcher({ transparent = false, variant = "dropdown" }: Props) {
  const { lang, setLang, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant !== "dropdown") return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [variant])

  // List variant: used in the mobile menu — flat list of language buttons.
  if (variant === "list") {
    return (
      <div className="px-1 pt-3">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {t("language.chooseLanguage")}
        </p>
        <div className="flex flex-col gap-1">
          {LANGUAGES.map(l => {
            const active = l.code === lang
            return (
              <button
                key={l.code}
                onClick={() => {
                  // Native iOS haptic tick when changing language (no-op on web)
                  haptic("selection")
                  setLang(l.code)
                }}
                className={
                  "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition " +
                  (active ? "bg-sky-50 text-sky-700" : "text-slate-700 hover:bg-slate-100")
                }
                aria-current={active ? "true" : undefined}
              >
                <span>{l.native}</span>
                {active && <Check size={16} className="text-sky-600" />}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Dropdown variant for desktop nav.
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.chooseLanguage")}
        className={
          "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition " +
          (transparent
            ? "text-white/85 hover:text-white hover:bg-white/10"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900")
        }
      >
        <Globe size={16} />
        <span className="uppercase">{lang}</span>
        <ChevronDown size={14} className={"transition " + (open ? "rotate-180" : "")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50"
          >
            <li className="px-4 pb-2 mb-1 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t("language.chooseLanguage")}
            </li>
            {LANGUAGES.map(l => {
              const active = l.code === lang
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    onClick={() => {
                      // Native iOS haptic tick when changing language (no-op on web)
                      haptic("selection")
                      setLang(l.code)
                      setOpen(false)
                    }}
                    className={
                      "w-full flex items-center gap-3 px-4 py-2 text-sm transition " +
                      (active
                        ? "bg-sky-50 text-sky-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50")
                    }
                  >
                    <Check
                      size={14}
                      className={active ? "text-sky-600" : "text-transparent"}
                      aria-hidden
                    />
                    <span>{l.native}</span>
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
