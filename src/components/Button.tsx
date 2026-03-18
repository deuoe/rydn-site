import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function Button({
  children,
  className,
}: {
  children: React.ReactNode
  className?: HTMLAttributes<HTMLButtonElement>["className"]
}) {
  const mergedClassName = twMerge(
    "px-12 py-4 text-[#676767] rounded-lg border-2 border-gray-300 hover:bg-gray-200 cursor-pointer transition duration-75",
    className
  )
  return <button className={mergedClassName}>{children}</button>
}
