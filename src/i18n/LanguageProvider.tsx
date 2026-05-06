import { useEffect, useState, type ReactNode } from "react"
import { TRANSLATIONS, RTL_LANGS, type Lang } from "./translations"
import { LanguageContext } from "./languageContext"

const STORAGE_KEY = "rydn-lang"

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "en"
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null
    if (saved && saved in TRANSLATIONS) return saved
  } catch {
    /* localStorage may be unavailable */
  }
  const browser = (typeof navigator !== "undefined" && navigator.language?.slice(0, 2)) as Lang
  if (browser && browser in TRANSLATIONS) return browser
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang)

  // Keep <html lang="..."> and dir="rtl|ltr" in sync so search engines, screen
  // readers, and Tailwind RTL variants behave correctly.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
      document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr"
    }
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
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
