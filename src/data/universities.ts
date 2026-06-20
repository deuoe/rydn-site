/**
 * University registry — central place to declare every university used on
 * advisor cards. Adding a new university is a 3-step process:
 *
 *   1. Drop the logo (PNG or SVG, transparent background) into
 *      `src/assets/images/universities/`. Horizontal orientation is
 *      preferred for inline display in the "Studies at" trust badge.
 *   2. Import it below.
 *   3. Add a new entry to UNIVERSITIES with a short key, the import, the
 *      full name, and the official short name.
 *
 * Then on the advisor itself, set `universities: ["yorku"]` (an array,
 * so an advisor can list multiple schools they've attended).
 */

import yorkULogo from "../assets/images/universities/YorkULogo_DIGITAL_Hor_RGB.png"
import georgeBrownLogo from "../assets/images/universities/George_Brown_Polytechnic_logo.svg"
import utorontoLogo from "../assets/images/universities/UofT_Logo.jpg"
import torontomuLogo from "../assets/images/universities/TMU-rgb.png"

export type UniversityKey =
  | "yorku"
  | "georgebrown"
  | "utoronto"
  | "torontomu"
  // Add new keys here as you add universities, e.g.:
  // | "mcmaster"
  // | "waterloo"
  // | "mcgill"
  // | "queens"
  // | "western"
  // | "ubc"

export type University = {
  /** Stable internal key — referenced by advisors */
  key: UniversityKey
  /** Imported PNG/SVG asset */
  logo: string
  /** Full official name shown on hover and in alt text */
  name: string
  /** Short conversational name — e.g., "York", "U of T" */
  short: string
  /** Whether the supplied logo is horizontal, vertical, or square */
  orientation?: "vertical" | "horizontal" | "square"
}

export const UNIVERSITIES: Record<UniversityKey, University> = {
  yorku: {
    key: "yorku",
    logo: yorkULogo,
    name: "York University",
    short: "York U",
    orientation: "horizontal",
  },
  georgebrown: {
    key: "georgebrown",
    logo: georgeBrownLogo,
    name: "George Brown College",
    short: "George Brown",
    orientation: "horizontal",
  },
  utoronto: {
    key: "utoronto",
    logo: utorontoLogo,
    name: "University of Toronto",
    short: "U of T",
    orientation: "horizontal",
  },
  torontomu: {
    key: "torontomu",
    logo: torontomuLogo,
    name: "Toronto Metropolitan University",
    short: "TMU",
    orientation: "horizontal",
  },
}
