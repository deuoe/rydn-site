import { motion } from "motion/react"
import { BookOpen, Scale, Users2, Handshake, ExternalLink } from "lucide-react"
import Container from "./Container"
import Heading from "./Heading"

/**
 * UN Sustainable Development Goals (SDGs) that RYDN is explicitly aligned with.
 * Colors come from the official UN SDG style guide:
 *   https://www.un.org/sustainabledevelopment/news/communications-material/
 *
 * Showing these on the About page builds credibility with institutional
 * funders (Government of Canada, Trillium, Global Affairs Canada) that
 * explicitly score SDG alignment in their grant rubrics.
 */
const SDGs = [
  {
    number: 4,
    name: "Quality Education",
    color: "#C5192D",
    Icon: BookOpen,
    contribution:
      "Free 1-on-1 advising, workshops, and exam prep for MCAT / LSAT / DAT — directly advancing SDG 4.3 (equal access to tertiary education) and 4.4 (relevant skills for employment).",
  },
  {
    number: 5,
    name: "Gender Equality",
    color: "#FF3A21",
    Icon: Scale,
    contribution:
      "Actively recruiting and supporting female advisors and students across STEM, medicine, and law — advancing SDG 5.5 (women's full participation in leadership).",
  },
  {
    number: 10,
    name: "Reduced Inequalities",
    color: "#DD1367",
    Icon: Users2,
    contribution:
      "Multilingual support in English, French, Spanish, Persian, and Hebrew. Free for every student regardless of income — advancing SDG 10.2 and 10.3 (inclusion of all, equal opportunity).",
  },
  {
    number: 17,
    name: "Partnerships for the Goals",
    color: "#19486A",
    Icon: Handshake,
    contribution:
      "Direct partnerships with TDSB, YRDSB, community organizations, and universities to deliver mentorship at scale — advancing SDG 17.17 (effective public-private and civil society partnerships).",
  },
]

export default function SDGSection() {
  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <Heading
          eyebrow="United Nations"
          text="Aligned with the UN Sustainable Development Goals"
        />
        <p className="mt-6 max-w-3xl mx-auto text-center text-slate-600 leading-relaxed text-base md:text-lg">
          The 17 UN SDGs are a shared global blueprint for peace and prosperity, adopted by all
          193 UN member states. RYDN's work directly contributes to four of them.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SDGs.map((sdg, i) => (
            <motion.div
              key={sdg.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
            >
              {/* Top color block — UN official SDG color */}
              <div
                className="p-6 text-white flex items-start gap-4"
                style={{ backgroundColor: sdg.color }}
              >
                <div className="font-display text-5xl font-bold leading-none">
                  {sdg.number}
                </div>
                <div className="flex-1">
                  <sdg.Icon size={36} className="opacity-90" strokeWidth={2.5} />
                </div>
              </div>
              {/* White info block */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">
                  {sdg.name}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {sdg.contribution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://sdgs.un.org/goals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-sky-700 transition"
          >
            Learn more about the UN Sustainable Development Goals
            <ExternalLink size={14} />
          </a>
        </div>
      </Container>
    </section>
  )
}
