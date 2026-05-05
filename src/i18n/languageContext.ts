import { createContext } from "react"
import type { Lang } from "./translations"

export type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (path: string) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
