export default function Paragraph({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={"max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-700 " + className}>
      {children}
    </p>
  )
}
