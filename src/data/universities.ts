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
  /**
   * Per-logo visual scaling so different university logos look balanced
   * next to each other. The base size of the "Studies at" badge is set by
   * how many universities the advisor lists (1 logo = 40px, 4 logos = 28px).
   * The final on-screen height = base × displayScale.
   *
   *   1.0  = default size, no adjustment
   *   0.85 = 15% smaller (use for logos that visually dominate)
   *   1.2  = 20% larger  (use for logos that visually look small / have lots
   *                       of internal whitespace, like crested wordmarks)
   *
   * Tune empirically by comparing cards side by side.
   */
  displayScale?: number
}

export const UNIVERSITIES: Record<UniversityKey, University> = {
  yorku: {
    key: "yorku",
    logo: yorkULogo,
    name: "York University",
    short: "York U",
    orientation: "horizontal",
    // York's "U" block visually dominates; shrink slightly so it doesn't
    // overpower compact logos like George Brown.
    displayScale: 0.78,
  },
  georgebrown: {
    key: "georgebrown",
    logo: georgeBrownLogo,
    name: "George Brown College",
    short: "George Brown",
    orientation: "horizontal",
    displayScale: 1.0,
  },
  utoronto: {
    key: "utoronto",
    logo: utorontoLogo,
    name: "University of Toronto",
    short: "U of T",
    orientation: "horizontal",
    // The U of T crest + wordmark has a lot of whitespace, so it visually
    // reads smaller than other logos at the same height. Scale up a bit.
    displayScale: 1.25,
  },
  torontomu: {
    key: "torontomu",
    logo: torontomuLogo,
    name: "Toronto Metropolitan University",
    short: "TMU",
    orientation: "horizontal",
    displayScale: 1.0,
  },
}
