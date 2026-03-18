import type { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const mergedClassName = twMerge(
    "px-12 py-4 text-[#676767] rounded-lg border-2 border-gray-400 hover:bg-gray-300 hover:text-black cursor-pointer transition duration-75",
    className
  )
  return (
    <button className={mergedClassName} {...props}>
      {children}
    </button>
  )
}
