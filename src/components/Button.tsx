import type { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Variant = "primary" | "secondary" | "ghost"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-sky-600 focus:ring-sky-500",
  secondary:
    "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
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
