import { createContext } from "react"

export type Theme = "light" | "dark"

export type ThemeContextValue = {
  /** Current active theme */
  theme: Theme
  /** Explicit setter — pass "light" or "dark" */
  setTheme: (theme: Theme) => void
  /** Convenience: flip current theme */
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
