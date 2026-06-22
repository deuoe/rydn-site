import type { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Variant = "primary" | "secondary" | "ghost"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-sky-600 focus:ring-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 dark:hover:border-slate-600",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-800",
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: Props) {
  const merged = twMerge(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold cursor-pointer transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2",
    VARIANT_CLASSES[variant],
    className
  )
  return (
    <button className={merged} {...props}>
      {children}
    </button>
  )
}
