import { useEffect, useState, type ReactNode } from "react"
import { ThemeContext, type Theme } from "./themeContext"

const STORAGE_KEY = "rydn-theme"

/**
 * Initial theme detection rules, in priority order:
 *   1. User's saved choice in localStorage (sticky preference)
 *   2. OS preference (prefers-color-scheme media query)
 *   3. Light mode (safe default)
 */
function detectInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === "light" || saved === "dark") return saved
  } catch {
    /* localStorage may be unavailable in private browsing */
  }
  if (typeof window.matchMedia === "function") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
  }
  return "light"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(detectInitialTheme)

  // Apply the theme class to <html> and persist to localStorage whenever
  // it changes. Also sets `color-scheme` so native form controls + scrollbars
  // pick up the right defaults.
  useEffect(() => {
    if (typeof document === "undefined") return
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const setTheme = (next: Theme) => setThemeState(next)
  const toggle = () => setThemeState((t) => (t === "light" ? "dark" : "light"))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
