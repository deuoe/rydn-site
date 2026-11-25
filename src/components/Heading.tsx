type Align = "center" | "left"
type Tone = "light" | "dark" | "formal"

export default function Heading({
  text,
  eyebrow,
  className = "",
  align = "center",
  tone = "light",
  index,
}: {
  text: string
  eyebrow?: string
  className?: string
  /** Section heading alignment. Left is used to vary the rhythm on long pages. */
  align?: Align
  /** "dark" is for navy surfaces, "formal" is the certificate-style header
   *  for institutional pages (navy eyebrow in italic serif, thin gold rule). */
  tone?: Tone
  /** Optional section number, rendered in gold before the eyebrow, e.g. "01". */
  index?: string
}) {
  const centered = align === "center"
  const formal = tone === "formal"
  const onDark = tone === "dark"

  return (
    <div className={(centered ? "text-center " : "text-left ") + className}>
      {eyebrow && (
        <p
          className={
            "mb-3 flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] " +
            (centered ? "justify-center " : "") +
            (formal
              ? "font-display normal-case italic tracking-normal text-rydn-gold-dark dark:text-rydn-gold text-base sm:text-lg"
              : onDark
                ? "text-rydn-gold-light"
                : "text-rydn-gold-dark dark:text-rydn-gold")
          }
        >
          {index && (
            <span
              className={
                "font-display text-base sm:text-lg font-bold " +
                (formal
                  ? "text-rydn-gold-dark dark:text-rydn-gold"
                  : onDark
                    ? "text-rydn-gold-light"
                    : "text-rydn-gold-dark dark:text-rydn-gold")
              }
            >
              {index}
            </span>
          )}
          {index && <span className="h-px w-6 bg-rydn-gold/60" aria-hidden />}
          {eyebrow}
        </p>
      )}
      <h2
        className={
          "font-display text-3xl sm:text-4xl md:text-5xl font-semibold " +
          (onDark ? "text-white" : "text-slate-900 dark:text-slate-100")
        }
      >
        {text}
      </h2>
      <div
        className={
          (centered ? "mx-auto " : "") +
          "mt-4 h-1 w-16 rounded-full " +
          (formal
            ? "h-px w-24 bg-gradient-to-r from-rydn-gold via-rydn-gold-light to-rydn-gold-dark"
            : "bg-gradient-to-r from-rydn-gold via-rydn-gold-light to-rydn-gold-dark")
        }
      />
    </div>
  )
}
