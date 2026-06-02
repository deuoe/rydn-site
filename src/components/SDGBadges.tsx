/**
 * Compact row of SDG badges for the footer. Each badge is a small colored
 * square with the SDG number. Links to the UN SDG page in a new tab.
 *
 * Designed to be subtle — communicates institutional credibility without
 * dominating the footer.
 */
const SDGS = [
  { number: 4, color: "#C5192D", name: "Quality Education" },
  { number: 5, color: "#FF3A21", name: "Gender Equality" },
  { number: 10, color: "#DD1367", name: "Reduced Inequalities" },
  { number: 17, color: "#19486A", name: "Partnerships for the Goals" },
]

export default function SDGBadges() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        Aligned with UN SDGs
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {SDGS.map((sdg) => (
          <a
            key={sdg.number}
            href="https://sdgs.un.org/goals"
            target="_blank"
            rel="noopener noreferrer"
            title={`SDG ${sdg.number}: ${sdg.name}`}
            aria-label={`UN Sustainable Development Goal ${sdg.number}: ${sdg.name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white text-sm font-bold shadow-sm hover:scale-110 transition-transform"
            style={{ backgroundColor: sdg.color }}
          >
            {sdg.number}
          </a>
        ))}
      </div>
    </div>
  )
}
