import { useState } from "react"
import SkeletonImage from "./SkeletonImage"
import { useBrand } from "../brand/brand"

type Props = {
  /** Photo URL. Missing or broken photos fall back to initials. */
  src?: string
  /** Person's name, used for alt text and the initials fallback */
  name: string
  /** Size, ring, margin etc. Applied to both the photo and the fallback. */
  className?: string
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? "?").slice(0, 2)
  return letters.toUpperCase()
}

/**
 * Circular person photo with a graceful fallback. When there's no photo, or
 * it fails to load, renders the person's initials on a brand-coloured
 * background instead of an empty circle.
 */
export default function Avatar({ src, name, className = "" }: Props) {
  const brand = useBrand()
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    const bg = brand === "med"
      ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
      : "bg-gradient-to-br from-sky-500 to-sky-700"
    return (
      <div
        role="img"
        aria-label={name}
        className={`@container flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white select-none ${bg} ${className}`}
      >
        {/* Scales with the avatar size via container query units */}
        <span aria-hidden className="text-[clamp(0.75rem,38cqw,4rem)] leading-none">
          {initialsOf(name)}
        </span>
      </div>
    )
  }

  return (
    <SkeletonImage
      src={src}
      alt={name}
      shape="rounded-full"
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
