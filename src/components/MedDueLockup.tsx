/**
 * MED DUE. wordmark, the Med signature as a designed lockup instead of
 * bare type: bold Fraunces letters with the tricolore gradient on DUE,
 * a tricolore rule underneath, and an optional script sign-off.
 */
export default function MedDueLockup({
  className = "",
  size = "md",
  withScript = false,
  tone = "dark",
}: {
  className?: string
  size?: "sm" | "md"
  /** Show the "It's due." script line under the rule. */
  withScript?: boolean
  /** "dark" is white text for navy surfaces, "light" is navy text on light
   *  surfaces (white in dark mode). */
  tone?: "dark" | "light"
}) {
  const textColor = tone === "dark" ? "text-white" : "text-rydn-navy dark:text-white"
  const scriptColor = tone === "dark" ? "text-white/80" : "text-rydn-slate-blue dark:text-white/80"
  const ruleWidth = size === "sm" ? "w-20" : "w-full"
  return (
    <div className={"inline-flex flex-col gap-1.5 " + className}>
      <p
        className={
          "font-display font-bold tracking-[0.15em] " +
          (size === "sm" ? "text-lg " : "text-2xl sm:text-3xl ") +
          textColor
        }
      >
        MED{" "}
        <span className="bg-gradient-to-r from-emerald-400 via-white to-red-400 bg-clip-text text-transparent">
          DUE.
        </span>
      </p>
      <div
        className={"h-1 rounded-full bg-gradient-to-r from-emerald-500 via-white to-red-500 " + ruleWidth}
        aria-hidden
      />
      {withScript && (
        <p className={"font-script " + (size === "sm" ? "text-xl " : "text-2xl ") + scriptColor}>
          It&apos;s due.
        </p>
      )}
    </div>
  )
}
