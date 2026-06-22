import { useState, type ImgHTMLAttributes } from "react"

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Tailwind classes for the SHAPE of the placeholder.
   *  Pass things like "rounded-full" for circular photos, "rounded-3xl"
   *  for advisor cards, "rounded-2xl" for hero images, etc.
   *  This must match the visual shape of the image so the skeleton
   *  feels seamless. */
  shape?: string
}

/**
 * Drop-in replacement for `<img>` that shows an animated grey
 * placeholder while the image is loading, then fades the real
 * image in over 300ms when it's ready.
 *
 * Reduces "empty-frame flicker" on the advisor grid, hero images,
 * and anywhere else heavy images live. Most useful on slow
 * connections or first paint.
 *
 * Usage:
 *   <SkeletonImage
 *     src={advisor.photo}
 *     alt={advisor.name}
 *     shape="rounded-full"
 *     className="w-32 h-32 object-cover"
 *   />
 */
export default function SkeletonImage({
  src,
  alt,
  className = "",
  shape = "",
  onLoad,
  onError,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className={`relative overflow-hidden ${shape} ${className}`}>
      {/* Skeleton: visible while loading, hidden after load */}
      {!loaded && !errored && (
        <div
          aria-hidden
          className={`absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse ${shape}`}
        />
      )}
      {/* Soft error fallback so we don't show forever-loading skeleton */}
      {errored && (
        <div
          aria-hidden
          className={`absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs ${shape}`}
        >
          ?
        </div>
      )}
      {/* Real image, fades in once loaded */}
      <img
        src={src}
        alt={alt}
        className={`block w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        onError={(e) => {
          setErrored(true)
          onError?.(e)
        }}
        loading="lazy"
        decoding="async"
        {...rest}
      />
    </div>
  )
}
