/**
 * RYDN 2026 seal, a clean SVG recreation of the gold seal from the RYDN
 * internship certificate: double gold ring, "RYDN • 2026" on the top arc,
 * a four-point star at the centre, a small diamond at the bottom.
 *
 * Uses currentColor throughout, so the parent sets the colour with a text
 * utility (gold on navy, dark gold on white). The dashed decorative ring
 * rotates slowly; the seal text stays still and readable. Rotation is
 * disabled for visitors who ask for reduced motion (see index.css).
 */
export default function RydnSeal({
  className = "",
  spin = true,
  label = "RYDN 2026 seal",
}: {
  className?: string
  /** Slow rotation of the dashed ring. Defaults on. */
  spin?: boolean
  label?: string
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={label}
      className={className}
    >
      <defs>
        <path id="rydn-seal-arc" d="M 32,100 A 68,68 0 0 1 168,100" fill="none" />
      </defs>
      <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="89" fill="none" stroke="currentColor" strokeWidth="1" />
      <g className={spin ? "animate-seal-spin" : undefined}>
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 5" opacity="0.7" />
      </g>
      <text
        fontFamily="Fraunces, 'Noto Serif', serif"
        fontWeight="700"
        fontSize="15.5"
        letterSpacing="3"
        fill="currentColor"
      >
        <textPath href="#rydn-seal-arc" startOffset="50%" textAnchor="middle">
          RYDN &#8226; 2026
        </textPath>
      </text>
      <path d="M100,74 L106,94 L126,100 L106,106 L100,126 L94,106 L74,100 L94,94 Z" fill="currentColor" />
      <path d="M100,146 L104,152 L100,158 L96,152 Z" fill="currentColor" />
    </svg>
  )
}
