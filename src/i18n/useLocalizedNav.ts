import { useNavigate } from "react-router-dom"
import { useTranslation } from "./useTranslation"
import { LANGUAGES } from "./translations"
import { useBrand, BRANDS, type Brand } from "../brand/brand"

/**
 * Regex matching any supported language prefix at the start of a path.
 *
 * IMPORTANT: derived from LANGUAGES so adding a new language in translations.ts
 * is enough — no second list to update. Previously this was hand-maintained
 * which caused a bug where switching languages on /zh/... produced /fr/zh/...
 * instead of /fr/... because "zh" wasn't recognised as a prefix to strip.
 */
const LANG_PREFIX = new RegExp(
  `^/(${LANGUAGES.map((l) => l.code).join("|")})(/|$)`,
)

/** Regex matching any supported brand prefix at the start of a path. */
const BRAND_PREFIX = new RegExp(`^/(${BRANDS.join("|")})(/|$)`)

/**
 * Strip any language prefix from a path. Idempotent — safe to call on paths
 * that have no language.
 *   "/fr/youth/about-us" → "/youth/about-us"
 *   "/about-us"          → "/about-us"
 */
export function stripLangPrefix(path: string): string {
  return path.replace(LANG_PREFIX, "/")
}

/**
 * Strip any brand prefix from a path. Idempotent.
 *   "/youth/about-us" → "/about-us"
 *   "/med/pricing"    → "/pricing"
 *   "/about-us"       → "/about-us"
 */
export function stripBrandPrefix(path: string): string {
  return path.replace(BRAND_PREFIX, "/")
}

/**
 * Add the current language + brand prefix to a path. English (the default)
 * gets no language prefix. The brand is always prepended for in-site pages.
 *
 * Convention: on this smart <Link> helper, to="/" means "current brand's
 * homepage" (so /youth or /med depending on the active brand). This matches
 * the user's mental model — clicking the Youth logo on an inner Youth page
 * goes to the Youth home, not back to the brand picker.
 *
 * To link to the GATEWAY (/) itself, bypass this helper and use react-router-
 * dom's native <Link to="/"> directly — e.g. a "Back to RooZ" switch-brand
 * link in the footer.
 *
 * Examples with brand=youth, lang=en:
 *   "/"            → "/youth"              (brand homepage)
 *   "/about-us"    → "/youth/about-us"
 *   "/youth/foo"   → "/youth/foo"          (idempotent — strip + re-add)
 *   "/med/foo"     → "/youth/foo"          (brand override — rebuild under current brand)
 *
 * Examples with brand=med, lang=fr:
 *   "/"            → "/fr/med"             (Med homepage in French)
 *   "/pricing"     → "/fr/med/pricing"
 */
export function localizeHref(path: string, lang: string, brand: Brand): string {
  // Anchors, mailto/tel, and external URLs pass through unchanged.
  if (
    !path ||
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("http")
  ) {
    return path
  }

  // Normalise leading slash, then strip any existing language + brand prefixes
  // so we can rebuild under the current brand/lang. Treats "/" as brand home.
  const withSlash = path.startsWith("/") ? path : `/${path}`
  const noLang = stripLangPrefix(withSlash)
  const noBrand = stripBrandPrefix(noLang)

  const page = noBrand === "/" ? "" : noBrand
  const brandPart = `/${brand}`

  if (lang === "en") {
    return brandPart + page || "/"
  }
  return `/${lang}${brandPart}${page}`
}

/**
 * Helper hooks. Components use these to build links and navigate calls that
 * stay in the user's current language AND brand.
 */
export function useLocalizedHref() {
  const { lang } = useTranslation()
  const brand = useBrand()
  return (to: string) => localizeHref(to, lang, brand)
}

export function useLocalizedNavigate() {
  const { lang } = useTranslation()
  const brand = useBrand()
  const navigate = useNavigate()
  return (to: string) => navigate(localizeHref(to, lang, brand))
}
