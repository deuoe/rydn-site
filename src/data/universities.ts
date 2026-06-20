/**
 * University registry — central place to declare every university used on
 * advisor cards. Adding a new university is a 3-step process:
 *
 *   1. Drop the PNG (transparent background, vertical orientation if
 *      possible) into `src/assets/images/universities/`.
 *   2. Import it below.
 *   3. Add a new entry to UNIVERSITIES with a short key, the import, the
 *      full name, and the official short name.
 *
 * Then on the advisor itself, set `university: "yorku"` (or whichever key).
 */

import yorkULogo from "../assets/images/universities/YorkULogo_DIGITAL_Ver_RGB.png"

export type UniversityKey =
  | "yorku"
  // Add new keys here as you add universities, e.g.:
  // | "utoronto"
  // | "mcmaster"
  // | "waterloo"
  // | "mcgill"
  // | "queens"
  // | "western"
  // | "ubc"
  // | "torontomu"

export type University = {
  /** Stable internal key — referenced by advisors */
  key: UniversityKey
  /** Imported PNG/SVG asset */
  logo: string
  /** Full official name shown on hover and in alt text */
  name: string
  /** Short conversational name — e.g., "York", "U of T" */
  short: string
  /** Whether the supplied logo is the official vertical/portrait variant */
  orientation?: "vertical" | "horizontal"
}

export const UNIVERSITIES: Record<UniversityKey, University> = {
  yorku: {
    key: "yorku",
    logo: yorkULogo,
    name: "York University",
    short: "York U",
    orientation: "vertical",
  },
  // Add new universities here as we get logos for them.
}
