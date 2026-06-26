import { useNavigate } from "react-router-dom"
import { useTranslation } from "./useTranslation"
import { LANGUAGES } from "./translations"

/**
 * Regex matching any supported language prefix at the start of a path.
 *
 * IMPORTANT: this is derived from LANGUAGES so adding a new language in
 * translations.ts is enough — we don't need to remember to update a separate
 * hardcoded list here. Previously this list was hand-maintained, which caused
 * a bug where switching languages on /zh/... routes produced /fr/zh/... instead
 * of /fr/... because "zh" wasn't recognized as a prefix to strip.
 */
const LANG_PREFIX = new RegExp(
  `^/(${LANGUAGES.map(l => l.code).join("|")})(/|$)`,
)

/**
 * Strip any language prefix from a path so we can prepend a different one.
 *   "/fr/about-us" → "/about-us"
 *   "/about-us"   → "/about-us"
 */
export function stripLangPrefix(path: string): string {
  return path.replace(LANG_PREFIX, "/")
}

/**
 * Add the current language prefix to a path. English (the default) gets no
 * prefix; every other language is mounted at /<code>/...
 *
 *   en + "/about-us"  → "/about-us"
 *   fr + "/about-us"  → "/fr/about-us"
 */
export function localizeHref(path: string, lang: string): string {
  // Anchors, mailto/tel, and external URLs are left untouched.
  if (!path || path.startsWith("#") || path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("http")) {
    return path
  }
  const stripped = stripLangPrefix(path.startsWith("/") ? path : `/${path}`)
  if (lang === "en") return stripped === "" ? "/" : stripped
  const tail = stripped === "/" ? "" : stripped
  return `/${lang}${tail}`
}

/**
 * Helper hooks. Components use these to build links and navigate calls that
 * stay in the user's current language.
 */
export function useLocalizedHref() {
  const { lang } = useTranslation()
  return (to: string) => localizeHref(to, lang)
}

export function useLocalizedNavigate() {
  const { lang } = useTranslation()
  const navigate = useNavigate()
  return (to: string) => navigate(localizeHref(to, lang))
}
