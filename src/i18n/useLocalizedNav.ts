import { useNavigate } from "react-router-dom"
import { useTranslation } from "./useTranslation"

const LANG_PREFIX = /^\/(en|fr|es|fa|he)(\/|$)/

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
