/**
 * Brand infrastructure for RooZ's four-sided site: Youth (/youth/*), Med
 * (/med/*), Academy (/academy/*) and France (/france/*).
 *
 * The current "brand" is derived from the URL — same pattern as how language
 * works. Any URL under /med or /<lang>/med is Med; everything else is Youth
 * (which is also the default when no brand is in the URL, like on the gateway).
 *
 * Internal <Link>s automatically produce brand-correct URLs via
 * useLocalizedHref — so a Link to "/about-us" rendered inside the Med pages
 * resolves to "/med/about-us", and the same Link inside Youth resolves to
 * "/youth/about-us". To navigate across brands (e.g. a "Switch to Med" link
 * from a Youth page), use react-router-dom's native <Link> with the absolute
 * path.
 */
import { useLocation } from "react-router-dom"
import { LANGUAGES } from "../i18n/translations"

export type Brand = "youth" | "med" | "academy" | "france"

/** All supported brand prefixes. If this list grows (e.g. RooZ Vet), update it
 *  here plus the BRAND_PREFIX regex in useLocalizedNav. */
export const BRANDS: Brand[] = ["youth", "med", "academy", "france"]

const LANG_CODES = LANGUAGES.map((l) => l.code)

/**
 * Pure function to extract the brand from a URL pathname. Used both by the
 * hook (for React components) and by non-React code (e.g., initial SSR-ish
 * decisions, link rewriting).
 *
 * Examples:
 *   "/"                     → "youth"  (gateway defaults to Youth)
 *   "/youth"                → "youth"
 *   "/youth/our-team"       → "youth"
 *   "/med"                  → "med"
 *   "/med/pricing"          → "med"
 *   "/academy"              → "academy"
 *   "/france"               → "france"
 *   "/fr/youth/about-us"    → "youth"
 *   "/fr/med"               → "med"
 *   "/fr/academy"           → "academy"
 *   "/fr"                   → "youth"  (bare lang root defaults to Youth)
 */
export function brandFromPath(path: string): Brand {
  const parts = path.split("/").filter(Boolean)
  if (parts.length === 0) return "youth"

  // The brand segment is the first segment, or the second after a language.
  const segment = LANG_CODES.includes(parts[0] as (typeof LANG_CODES)[number])
    ? parts[1]
    : parts[0]

  if (segment === "med") return "med"
  if (segment === "academy") return "academy"
  if (segment === "france") return "france"
  return "youth"
}

/** React hook — same semantics as brandFromPath, driven by the current location. */
export function useBrand(): Brand {
  const { pathname } = useLocation()
  return brandFromPath(pathname)
}
