import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, Clock, Calendar, ArrowRight } from "lucide-react"
import Container from "./components/Container"
import { Link } from "./i18n/Link"
import SkeletonImage from "./components/SkeletonImage"
import {
  listArticlesNewestFirst,
  getAuthor,
  CATEGORY_LABELS,
  type ArticleCategory,
  type Article,
} from "./data/blog"

/**
 * /blog — index page. Featured article on top, filterable grid below.
 *
 * Design notes
 * - The newest article is "featured" — large card with cover photo.
 * - Filters use the same chip pattern as the homepage advisor filters
 *   for visual consistency.
 * - Each card shows category, read time, and date — the three signals
 *   that drive click-throughs in editorial design.
 */
export default function Blog() {
  const articles = listArticlesNewestFirst()
  const [filter, setFilter] = useState<ArticleCategory | "all">("all")

  const filtered =
    filter === "all" ? articles : articles.filter((a) => a.category === filter)
  const [featured, ...rest] = filtered

  // Derive the unique categories that actually have at least one article
  // (otherwise the chip row would show empty filters).
  const activeCategories = Array.from(
    new Set(articles.map((a) => a.category))
  ) as ArticleCategory[]

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate -mt-20 pt-32 pb-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl animate-float" />
        <div
          className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-500/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Sparkles size={14} className="text-amber-300" />
              Insights from RYDN advisors
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              The RYDN Blog.
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              Honest guides on pre-med, applications, study strategy, and the international
              student journey — written by advisors who walked it 2-3 years before you.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ===================== FILTER + ARTICLES ===================== */}
      <section className="py-16">
        <Container>
          {/* Filter chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="All articles"
              count={articles.length}
            />
            {activeCategories.map((cat) => (
              <FilterChip
                key={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
                label={CATEGORY_LABELS[cat]}
                count={articles.filter((a) => a.category === cat).length}
              />
            ))}
          </div>

          {/* Featured + grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {featured && <FeaturedArticleCard article={featured} />}

              {rest.length > 0 && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              )}

              {!featured && (
                <div className="text-center py-16 text-slate-500">
                  No articles in that category yet — check back soon.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </>
  )
}

// ============================================================
// Subcomponents
// ============================================================

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition border " +
        (active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-300 hover:border-sky-400 hover:text-sky-700")
      }
    >
      {label}
      <span
        className={
          "inline-flex items-center justify-center min-w-[1.5rem] h-5 px-1.5 rounded-full text-xs font-bold " +
          (active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600")
        }
      >
        {count}
      </span>
    </button>
  )
}

function FeaturedArticleCard({ article }: { article: Article }) {
  const author = getAuthor(article)
  return (
    <Link to={`/blog/${article.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-indigo-50 border border-slate-200 shadow-sm group-hover:shadow-xl transition"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Cover area (left on desktop) — uses a brand gradient + giant
              article title as a graphical "cover" since we don't have
              cover images yet. */}
          <div className="md:col-span-5 relative bg-gradient-to-br from-sky-500 via-indigo-600 to-indigo-800 p-8 md:p-12 flex flex-col justify-between min-h-[260px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold text-white border border-white/20">
                <Sparkles size={12} className="text-amber-300" />
                Featured · {CATEGORY_LABELS[article.category]}
              </span>
            </div>
            <div className="text-white/40 text-6xl md:text-8xl font-display font-bold leading-none mt-4">
              {String(article.title.charCodeAt(0) % 9 + 1)}
            </div>
          </div>

          {/* Article info (right on desktop) */}
          <div className="md:col-span-7 p-8 md:p-12 flex flex-col">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 leading-tight group-hover:text-sky-700 transition">
              {article.title}
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-base md:text-lg">
              {article.excerpt}
            </p>

            {/* Byline + metadata. Clicking the author photo or name jumps to
                their /advisors/:slug story page (when we have an advisor for
                this byline). Stops the outer article click via stopPropagation. */}
            <div className="mt-auto pt-6 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {author ? (
                  <Link
                    to={`/advisors/${author.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-3 group/byline"
                    aria-label={`Read ${author.name}'s story`}
                  >
                    {author.photo && (
                      <img
                        src={author.photo}
                        alt={author.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900 group-hover/byline:text-sky-700 transition">
                        {author.name}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <Calendar size={12} />
                        {formatDate(article.publishedDate)}
                        <span aria-hidden>·</span>
                        <Clock size={12} />
                        {article.readMinutes} min read
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {article.authorName ?? "RYDN team"}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <Calendar size={12} />
                      {formatDate(article.publishedDate)}
                      <span aria-hidden>·</span>
                      <Clock size={12} />
                      {article.readMinutes} min read
                    </p>
                  </div>
                )}
              </div>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 group-hover:text-sky-800">
                Read article
                <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

function ArticleCard({ article }: { article: Article }) {
  const author = getAuthor(article)
  return (
    <Link to={`/blog/${article.slug}`} className="group block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full rounded-3xl bg-white border border-slate-200 shadow-sm group-hover:shadow-xl transition flex flex-col overflow-hidden"
      >
        {/* Category strip */}
        <div className="px-6 pt-6">
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 px-3 py-1 text-xs font-semibold border border-sky-100">
            {CATEGORY_LABELS[article.category]}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 pt-3 pb-6 flex-1 flex flex-col">
          <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 leading-tight group-hover:text-sky-700 transition">
            {article.title}
          </h3>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>

          {/* Byline + meta. Author photo + name link to /advisors/:slug. */}
          <div className="mt-auto pt-5 flex items-center gap-3">
            {author ? (
              <Link
                to={`/advisors/${author.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-3 flex-1 min-w-0 group/byline"
                aria-label={`Read ${author.name}'s story`}
              >
                {author.photo ? (
                  <SkeletonImage
                    src={author.photo}
                    alt={author.name}
                    shape="rounded-full"
                    className="w-9 h-9 ring-2 ring-slate-100"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-200" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate group-hover/byline:text-sky-700 transition">
                    {author.name}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    {formatDate(article.publishedDate)}
                    <span aria-hidden>·</span>
                    <Clock size={11} />
                    {article.readMinutes} min
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-slate-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {article.authorName ?? "RYDN team"}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    {formatDate(article.publishedDate)}
                    <span aria-hidden>·</span>
                    <Clock size={11} />
                    {article.readMinutes} min
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

/** Format an ISO date string as "Jun 15, 2026" */
function formatDate(iso: string): string {
  try {
    const d = new Date(iso + "T12:00:00")
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })
  } catch {
    return iso
  }
}
