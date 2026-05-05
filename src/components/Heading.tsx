export default function Heading({
  text,
  eyebrow,
  className = "",
}: {
  text: string
  eyebrow?: string
  className?: string
}) {
  return (
    <div className={"text-center " + className}>
      {eyebrow && (
        <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900">
        {text}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />
    </div>
  )
}
