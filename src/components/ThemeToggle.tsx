import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme/useTheme"
import { haptic } from "../lib/rydnNative"

type Props = {
  /** Use light-on-dark styling when this lives on top of the dark hero */
  transparent?: boolean
}

/**
 * Sun / Moon button — toggles dark mode.
 *
 * Lives in the navbar next to the language switcher. Also fires a native
 * iOS "selection" haptic so it feels native in the iOS app shell.
 */
export default function ThemeToggle({ transparent = false }: Props) {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={() => {
        haptic("selection")
        toggle()
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition " +
        (transparent
          ? "text-white/85 hover:text-white hover:bg-white/10"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white")
      }
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
