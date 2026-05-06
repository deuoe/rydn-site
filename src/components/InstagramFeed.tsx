import { motion } from "motion/react"
import { ArrowRight, ImageIcon } from "lucide-react"
import { FaInstagram } from "react-icons/fa"
import { useTranslation } from "../i18n/useTranslation"
import Container from "./Container"
import Heading from "./Heading"

/**
 * INSTAGRAM FEED SECTION
 *
 * The placeholder tiles below link to the @rydn.ca Instagram profile. To go live:
 *
 *   OPTION A — Quick (5 minutes, recommended):
 *     1. Sign up free at https://lightwidget.com
 *     2. Connect your @rydn.ca Instagram account
 *     3. Copy the iframe embed code they give you
 *     4. Replace the <PlaceholderGrid /> below with their <iframe>
 *
 *   OPTION B — Manual screenshots:
 *     Replace each `caption` and `gradient` in TILES with a real
 *     {imageUrl, alt, postUrl} object and render <img> instead of the gradient.
 *
 *   OPTION C — Leave as-is:
 *     Tiles look intentional and link to your IG. Refresh whenever.
 */

const IG_HANDLE = "rydn.ca"
const IG_URL = "https://instagram.com/rydn.ca"

type Tile = { caption: string; gradient: string; emoji: string }

const TILES: Tile[] = [
  { caption: "Workshop highlight", gradient: "from-rose-400 via-pink-500 to-fuchsia-600", emoji: "🎓" },
  { caption: "Advisor spotlight", gradient: "from-sky-400 via-indigo-500 to-violet-600", emoji: "✨" },
  { caption: "Behind the scenes", gradient: "from-amber-400 via-orange-500 to-red-500", emoji: "📸" },
  { caption: "Student win", gradient: "from-emerald-400 via-teal-500 to-cyan-600", emoji: "🚀" },
  { caption: "Community moment", gradient: "from-violet-400 via-purple-500 to-pink-500", emoji: "💛" },
  { caption: "Latest event", gradient: "from-slate-700 via-slate-900 to-indigo-900", emoji: "🎤" },
]

export default function InstagramFeed() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 via-white to-violet-50">
      <Container>
        <Heading eyebrow={t("instagram.eyebrow")} text={t("instagram.title")} />
        <p className="mt-6 text-center text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
          {t("instagram.subtitle")}
        </p>

        {/* Handle / follow strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-pink-300 transition shadow-sm"
          >
            <FaInstagram className="h-4 w-4 text-pink-600" />
            @{IG_HANDLE}
          </a>
        </div>

        {/* Placeholder grid — see the comment block at the top of this file
            for instructions to replace these with real Instagram embeds. */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {TILES.map((tile, i) => (
            <motion.a
              key={i}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`group relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br ${tile.gradient} shadow-md hover:shadow-2xl transition-shadow`}
            >
              <div className="absolute inset-0 grain opacity-15" />
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

              <div className="relative h-full flex flex-col justify-between p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-3xl drop-shadow">{tile.emoji}</span>
                  <ImageIcon size={14} className="opacity-30" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-90">{tile.caption}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold opacity-75 group-hover:opacity-100 group-hover:gap-1.5 transition-all">
                    <FaInstagram className="h-3 w-3" />
                    @{IG_HANDLE}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Big follow CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white px-8 py-3.5 font-semibold shadow-md hover:shadow-xl transition"
          >
            <FaInstagram className="h-5 w-5" />
            {t("instagram.follow")}
            <ArrowRight size={16} />
          </a>
        </div>
      </Container>
    </section>
  )
}
