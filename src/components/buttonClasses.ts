import { twMerge } from "tailwind-merge"
import type { Brand } from "../brand/brand"

export type ButtonVariant = "youth" | "med" | "academy" | "france" | "primary" | "secondary" | "ghost" | "ghostLight"

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Youth, gold family (the certificate gold), navy text.
  youth:
    "bg-gradient-to-r from-rydn-gold via-rydn-gold-light to-rydn-gold text-rydn-navy-deep hover:brightness-105 focus:ring-rydn-gold",
  // Med, emerald.
  med:
    "bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 text-white hover:from-emerald-600 hover:to-emerald-600 focus:ring-emerald-500",
  // Academy, amber.
  academy:
    "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-900 hover:from-amber-500 hover:to-orange-600 focus:ring-amber-400",
  // France, blue.
  france:
    "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white hover:from-blue-700 hover:to-blue-700 focus:ring-blue-500",
  // Neutral primary, navy (gold in dark mode so it stays visible).
  primary:
    "bg-rydn-navy text-white hover:bg-rydn-navy-deep focus:ring-rydn-navy dark:bg-rydn-gold dark:text-rydn-navy-deep dark:hover:bg-rydn-gold-light",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-slate-600",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-800",
  // Ghost for dark surfaces (navy heroes, dark CTAs).
  ghostLight:
    "bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/15 focus:ring-white/50",
}

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold cursor-pointer transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"

/** The variant for a brand, used when no explicit variant is passed. */
export function variantForBrand(brand: Brand): ButtonVariant {
  return brand
}

/** Shared class builder, so Router Links can use the same button system. */
export function buttonClasses(variant?: ButtonVariant, className = "") {
  return twMerge(BASE_CLASSES, VARIANT_CLASSES[variant ?? "youth"], className)
}
