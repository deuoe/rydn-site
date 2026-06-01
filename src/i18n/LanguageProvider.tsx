import { useEffect, type ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { TRANSLATIONS, RTL_LANGS, type Lang } from "./translations"
import { LanguageContext } from "./languageContext"
import { localizeHref, stripLangPrefix } from "./useLocalizedNav"

const STORAGE_KEY = "rydn-lang"
const SUPPORTED: Lang[] = ["en", "fr", "es", "fa", "he"]

/**
 * Pull the active language from the URL. The first path segment is treated
 * as a language code if it matches one of our supported codes; otherwise we
 * fall back to English (the default, served at the bare domain).
 */
function langFromPath(pathname: string): Lang {
  const first = pathname.split("/").filter(Boolean)[0]
  if (first && (SUPPORTED as string[]).includes(first)) {
    return first as Lang
  }
  return "en"
}

/**
 * Read the saved preference (or browser default). Used only on first visit
 * to optionally redirect a visitor to their preferred language URL.
 */
function detectPreferredLang(): Lang {
  if (typeof window === "undefined") return "en"
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null
    if (saved && SUPPORTED.includes(saved)) return saved
  } catch {
    /* localStorage may be unavailable */
  }
  const browser = (typeof navigator !== "undefined" && navigator.language?.slice(0, 2)) as Lang
  if (browser && SUPPORTED.includes(browser)) return browser
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  // The URL is the source of truth. /fr/about-us → fr, /about-us → en.
  const lang = langFromPath(location.pathname)

  // On very first visit (no language in URL yet), redirect once to the user's
  // preferred language if it isn't English. We only do this when the path is
  // the bare root — otherwise an explicit URL the user typed wins.
  useEffect(() => {
    if (typeof window === "undefined") return
    const isRoot = location.pathname === "/" || location.pathname === ""
    if (!isRoot) return
    const preferred = detectPreferredLang()
    if (preferred !== "en") {
      navigate(`/${preferred}`, { replace: true })
    }
    // We intentionally run this only on mount; subsequent navigation should
    // respect whatever path the user chose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep <html lang="..."> and dir="rtl|ltr" in sync. Also persist the
  // user's last choice so we can offer it as a preference on return visits.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
      document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr"
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  // setLang now navigates to the equivalent URL in the chosen language,
  // preserving whatever page the user is on.
  const setLang = (next: Lang) => {
    const currentPath = stripLangPrefix(location.pathname) || "/"
    const target = localizeHref(currentPath, next)
    navigate(target + location.search + location.hash)
  }

  // Tiny dot-path lookup: t("hero.eyebrow") → TRANSLATIONS[lang].hero.eyebrow
  const t = (path: string): string => {
    const parts = path.split(".")
    let cursor: unknown = TRANSLATIONS[lang]
    for (const p of parts) {
      if (typeof cursor === "object" && cursor !== null && p in (cursor as Record<string, unknown>)) {
        cursor = (cursor as Record<string, unknown>)[p]
      } else {
        return path // fall back to the key itself if the translation is missing
      }
    }
    return typeof cursor === "string" ? cursor : path
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
